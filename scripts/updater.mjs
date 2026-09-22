
import { context, getOctokit } from "@actions/github";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

// 镜像前缀：把原始 github 下载地址改写成走 ghcr.mcschematic.top 代理，
// 这样国内客户端能直连下载（tauri.conf.json 的第二个 endpoint 也是这个代理）。
const MIRROR_PREFIX = "https://ghcr.mcschematic.top/";

const octokit = getOctokit(process.env.GITHUB_TOKEN);
const owner = context.repo.owner;
const repo = context.repo.repo;
const tag =
  process.env.GITHUB_REF_NAME ||
  (context.ref || "").replace(/^refs\/tags\//, "") ||
  (context.payload && context.payload.release && context.payload.release.tag_name);

if (!tag) {
  console.error("无法确定当前发布标签（GITHUB_REF_NAME 为空），无法构造下载 URL");
  process.exit(1);
}

const ROOT = process.env.GITHUB_WORKSPACE || process.cwd();
const BUNDLE_ROOT = path.resolve(ROOT, "src-tauri/target/release/bundle");

// Tauri v2 各平台的更新器产物（带签名）命名约定：
//   macOS  ：<name>.app.tar.gz        + <name>.app.tar.gz.sig   （.dmg 是全新安装包，无 .sig）
//   Windows：<name>.exe / .msi        + <name>.exe.sig / .msi.sig
//   Linux  ：<name>.AppImage          + <name>.AppImage.sig
// 因此这里直接扫描 *.sig，去掉末尾 .sig 即为其对应的更新包文件。
// 同一平台可能产出多种格式（windows 同时有 nsis .exe 与 wix .msi），
// latest.json 每个平台只能有一个入口，按下面的优先级只挑一个写进更新清单。
function priorityFor(filename) {
  const l = filename.toLowerCase();
  if (l.endsWith(".exe")) return 0; // nsis 安装包（静默更新体验较好）
  if (l.endsWith(".msi")) return 1;
  if (l.endsWith(".app.tar.gz")) return 2; // macOS 更新器只认 .app.tar.gz
  if (l.endsWith(".appimage")) return 3; // Linux 更新器只认 .AppImage
  return 99;
}

function platformKeyFor(filename) {
  const lower = filename.toLowerCase();
  let arch = "x86_64";
  if (/aarch64/.test(lower) || /arm64/.test(lower)) arch = "aarch64";
  if (lower.endsWith(".msi") || lower.endsWith(".exe")) return `windows-${arch}`;
  if (lower.endsWith(".app.tar.gz")) return `darwin-${arch}`;
  if (lower.endsWith(".appimage")) return `linux-${arch}`;
  return null;
}

async function collectInstallers() {
  const platforms = {}; // key -> { file, sig, prio }
  let entries;
  try {
    entries = await readdir(BUNDLE_ROOT, { withFileTypes: true });
  } catch (e) {
    console.error(`找不到打包产物目录 ${BUNDLE_ROOT}: ${e.message}`);
    return platforms;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const sub = path.join(BUNDLE_ROOT, entry.name);
    let files;
    try {
      files = await readdir(sub);
    } catch {
      continue;
    }
    for (const f of files) {
      if (!f.toLowerCase().endsWith(".sig")) continue; // 只处理签名文件

      // 签名文件去掉末尾 .sig 即为其对应更新包
      const artifact = f.slice(0, -4);
      const key = platformKeyFor(artifact);
      if (!key) {
        console.warn(`[skip] ${f}: 无法从文件名推断平台，跳过`);
        continue;
      }
      let sig;
      try {
        sig = (await readFile(path.join(sub, f), "utf8")).trim();
      } catch {
        console.warn(`[skip] ${f}: 读取签名失败，跳过`);
        continue;
      }
      // 确认对应的更新包文件确实存在于同目录
      // （.dmg / .app 目录不会带 .sig，天然被排除）
      if (!files.includes(artifact)) {
        console.warn(`[skip] ${f}: 对应更新包 ${artifact} 缺失，跳过`);
        continue;
      }
      const prio = priorityFor(artifact);
      const prev = platforms[key];
      if (!prev || prio < prev.prio) {
        platforms[key] = { file: artifact, sig, prio };
      }
    }
  }
  return platforms;
}

const asText = (data) => (typeof data === "string" ? data : Buffer.from(data).toString("utf8"));

async function updateRelease() {
  const collected = await collectInstallers();
  const keys = Object.keys(collected);
  if (keys.length === 0) {
    console.error("未在打包产物中找到任何带 .sig 的安装包，无法生成 latest.json");
    process.exit(1);
  }

  // 版本优先取 tauri.conf.json，回退到 tag 去掉 v 前缀
  let version = tag.replace(/^v/, "");
  try {
    const conf = JSON.parse(
      await readFile(path.resolve(ROOT, "src-tauri/tauri.conf.json"), "utf8")
    );
    if (conf && conf.version) version = conf.version;
  } catch {
    /* 用 tag 兜底 */
  }

  const newPlatforms = {};
  for (const key of keys) {
    const { file, sig } = collected[key];
    const githubUrl = `https://github.com/${owner}/${repo}/releases/download/${tag}/${encodeURIComponent(file)}`;
    const url = `${MIRROR_PREFIX}${githubUrl}`;
    newPlatforms[key] = { signature: sig, url };
    console.log(`[platform] ${key} -> ${url}`);
  }

  // tag=updater 的 release 是客户端更新清单 latest.json 的固定投递点，
  // 仓库里可能被删掉 —— 不存在就建，否则这一步会 404 失败。
  let release;
  try {
    ({ data: release } = await octokit.rest.repos.getReleaseByTag({ owner, repo, tag: "updater" }));
  } catch (error) {
    if (error.status !== 404) throw error;
    ({ data: release } = await octokit.rest.repos.createRelease({
      owner, repo,
      tag_name: "updater",
      name: "updater",
      body: "自动更新清单（latest.json 由发布流程覆盖写入）",
      draft: false,
      prerelease: false,
    }));
    console.log("已创建 tag=updater 的 release: id=" + release.id);
  }

  // 合并重试：矩阵多平台并行上传同一份 latest.json 会互相覆盖，
  // 这里每次上传后回读校验本次 platform 是否都在，缺失则重试，保证最终收敛。
  const MAX_TRY = 5;
  for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
    let existing = null;
    const cur = release.assets.find((a) => a.name === "latest.json");
    if (cur) {
      try {
        const { data } = await octokit.rest.repos.getReleaseAsset({
          owner, repo, asset_id: cur.id,
          headers: { Accept: "application/octet-stream" },
        });
        existing = JSON.parse(asText(data));
      } catch (e) {
        console.warn("读取已有 latest.json 失败，将视作空：" + e.message);
      }
    }

    const merged = existing
      ? { ...existing, platforms: { ...existing.platforms, ...newPlatforms } }
      : {
          version,
          notes: "See the assets to download and install this version.",
          pub_date: new Date().toISOString(),
          platforms: newPlatforms,
        };

    const content = JSON.stringify(merged, null, 2);

    // 先删旧的 latest.json（可能多个，全部清掉）
    const oldOnes = release.assets.filter((a) => a.name === "latest.json");
    for (const a of oldOnes) {
      await octokit.rest.repos.deleteReleaseAsset({ owner, repo, asset_id: a.id });
    }
    await octokit.rest.repos.uploadReleaseAsset({
      owner, repo, release_id: release.id, name: "latest.json", data: content,
    });

    // 回读 release，确认本次 platform 已落盘
    const { data: refreshed } = await octokit.rest.repos.getRelease({
      owner, repo, release_id: release.id,
    });
    release = refreshed;
    const freshAsset = refreshed.assets.find((a) => a.name === "latest.json");
    let ok = false;
    if (freshAsset) {
      try {
        const { data } = await octokit.rest.repos.getReleaseAsset({
          owner, repo, asset_id: freshAsset.id,
          headers: { Accept: "application/octet-stream" },
        });
        const reloaded = JSON.parse(asText(data));
        ok = keys.every((k) => reloaded.platforms && reloaded.platforms[k]);
      } catch {
        /* ignore */
      }
    }
    if (ok) {
      console.log(`latest.json 已更新（共 ${Object.keys(merged.platforms).length} 个平台）`);
      return;
    }
    console.warn(`第 ${attempt} 次写入后平台未齐（疑似与其他矩阵任务竞争），3s 后重试…`);
    await new Promise((r) => setTimeout(r, 3000));
  }

  console.error("多次重试仍未能把所有平台写入 latest.json，请检查并行竞争");
  process.exit(1);
}

updateRelease().catch((err) => {
  console.error(err);
  process.exit(1);
});

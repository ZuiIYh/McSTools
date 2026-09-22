// fetch-node.mjs —— 为当前目标平台抓取官方 Node 运行时，落到 src-tauri/binaries/node[.exe]，
// 由 tauri.conf.json 的 bundle.resources("binaries/**/*") 打进安装包。
//
// 为什么要内置：模组装载器是 Node 脚本，运行期要靠 node 执行。以前直接依赖用户机装 Node，
// 没装就完全不可用。Rust 侧 mods.rs::node_binary() 已按
//   MCSTOOLS_NODE → <resource>/binaries/node[.exe] → <resource>/_up_/binaries/node[.exe]
//   → ProgramFiles/LOCALAPPDATA nodejs → PATH
// 的顺序探测，所以只要这个文件存在，无需改一行 Rust。
//
// 用法：
//   node scripts/fetch-node.mjs                    # 按当前平台抓取
//   node scripts/fetch-node.mjs --target=aarch64-apple-darwin
//   MCSTOOLS_SKIP_NODE=1 node ...                  # 跳过（本地不想下载时）
//   MCSTOOLS_REQUIRE_NODE=1 node ...               # 下载失败即让构建失败（CI 建议开启）
//
// 网络：若设置了 MCSTOOLS_PROXY / HTTPS_PROXY / https_proxy，会把代理透传给 curl。

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'src-tauri', 'binaries');

const NODE_VERSION = process.env.MCSTOOLS_NODE_VERSION || 'v22.11.0';
const REQUIRE = process.env.MCSTOOLS_REQUIRE_NODE === '1';

const argTarget = process.argv.find((a) => a.startsWith('--target='))?.slice('--target='.length);
const TRIPLE = argTarget || process.env.TAURI_TARGET_TRIPLE || process.env.CARGO_BUILD_TARGET || hostTriple();

/** Rust 目标三元组 → Node 官方分发包名 / 归档后缀 */
function nodeDist(triple) {
  const isWin = triple.includes('windows');
  const isArm = triple.startsWith('aarch64') || triple.startsWith('arm64');
  const arch = isArm ? 'arm64' : 'x64';
  const plat = isWin ? 'win' : triple.includes('apple') ? 'darwin' : 'linux';
  return { pkg: `${plat}-${arch}`, ext: plat === 'win' ? 'zip' : 'tar.gz', isWin };
}

function hostTriple() {
  const p = process.platform;
  const a = process.arch === 'arm64' ? 'aarch64' : 'x86_64';
  if (p === 'win32') return `${a}-pc-windows-msvc`;
  if (p === 'darwin') return `${a}-apple-darwin`;
  return `${a}-unknown-linux-gnu`;
}

function proxyArgs() {
  const p = process.env.MCSTOOLS_PROXY || process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY;
  return p ? ['-x', p] : [];
}

function log(msg) { console.log(`[fetch-node] ${msg}`); }

function download(url, dest) {
  log(`下载 ${url}`);
  execFileSync('curl', ['-fL', '--retry', '3', ...proxyArgs(), '-o', dest, url], { stdio: 'inherit' });
}

function extract(archive, dir) {
  // Windows 10+ 自带 bsdtar，可直接解 zip；Unix 直接用 tar。
  fs.mkdirSync(dir, { recursive: true });
  execFileSync('tar', ['-xf', archive, '-C', dir], { stdio: 'inherit' });
}

function findNode(binDir) {
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { const f = walk(p); if (f) return f; }
      else if (e.name === 'node.exe' || e.name === 'node') return p;
    }
    return null;
  };
  return walk(binDir);
}

function copyToOut(srcNode, triple) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const dst = path.join(OUT_DIR, triple.includes('windows') ? 'node.exe' : 'node');
  fs.copyFileSync(srcNode, dst);
  if (!triple.includes('windows')) fs.chmodSync(dst, 0o755);
  fs.writeFileSync(path.join(OUT_DIR, '.node-version'), NODE_VERSION, 'utf8');
  const mb = (fs.statSync(dst).size / 1048576).toFixed(1);
  log(`已内置 ${path.relative(ROOT, dst)}（${NODE_VERSION}, ${mb} MB）`);
}

/**
 * 保证 `src-tauri/binaries/` 存在且**至少有一个文件**。
 * 原因：tauri-build ≥2.6 把「resources glob 未匹配」升级为致命错误 —— 若下载失败/被跳过导致
 * 该目录为空，resources 通配匹配不到任何文件，打包会直接失败。放个说明文件兜底。
 */
function ensurePlaceholder() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const note = path.join(OUT_DIR, 'README.txt');
  if (!fs.existsSync(note)) {
    fs.writeFileSync(
      note,
      '此目录由 scripts/fetch-node.mjs 生成：内置的 Node 运行时（node / node.exe）放在这里，\n' +
        '由 tauri.conf.json 的 bundle.resources("binaries/**/*") 打进安装包。\n' +
        '该目录被 .gitignore 忽略；本文件仅用于保证 resources glob 始终能匹配到至少一个文件。\n',
      'utf8'
    );
  }
}

function main() {
  ensurePlaceholder();
  if (process.env.MCSTOOLS_SKIP_NODE === '1') { log('MCSTOOLS_SKIP_NODE=1，跳过'); return; }
  const { pkg, ext, isWin } = nodeDist(TRIPLE);
  const name = `node-${NODE_VERSION}-${pkg}`;

  const versionFile = path.join(OUT_DIR, '.node-version');
  const outNode = path.join(OUT_DIR, isWin ? 'node.exe' : 'node');
  if (fs.existsSync(outNode) && fs.existsSync(versionFile) && fs.readFileSync(versionFile, 'utf8').trim() === NODE_VERSION) {
    log(`已存在且版本匹配（${NODE_VERSION}），跳过`);
    return;
  }

  const cacheDir = path.join(os.homedir(), '.tauri', 'mcstools-node', `${NODE_VERSION}-${pkg}`);
  const cachedNode = fs.existsSync(cacheDir) ? findNode(cacheDir) : null;
  if (cachedNode) {
    log(`命中本地缓存 ${cacheDir}`);
    copyToOut(cachedNode, TRIPLE);
    return;
  }

  const url = `https://nodejs.org/dist/${NODE_VERSION}/${name}.${ext}`;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mcstools-node-'));
  const archive = path.join(tmpDir, `${name}.${ext}`);
  try {
    download(url, archive);
    extract(archive, tmpDir);
    const node = findNode(tmpDir);
    if (!node) throw new Error('归档里没找到 node 可执行文件');
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.copyFileSync(node, path.join(cacheDir, isWin ? 'node.exe' : 'node'));
    copyToOut(node, TRIPLE);
  } catch (e) {
    const msg = `内置 Node 失败：${e.message || e}`;
    if (REQUIRE) throw new Error(msg);
    log(`${msg}（构建继续，但用户机上无 Node 时模组功能不可用；设 MCSTOOLS_REQUIRE_NODE=1 可强制失败）`);
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { /* 清理失败无所谓 */ }
  }
}

main();

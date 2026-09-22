// stamp-base-id.mjs —— 给打包进安装包的编辑器镜像算一个内容指纹，写进
// src-tauri/data/editor/base-id.txt。
//
// 用途：应用把 <资源>/data/editor 播种到用户数据目录后，后续版本若镜像内容没变就**不刷新**
// 用户层（避免每次小版本升级都白拷 51MB / 8700 文件、并把模组覆盖层重置）。
// 只有指纹变了（镜像真的换了）才刷新并按需重套用模组。
//
// 指纹 = 所有文件的「相对路径 + 内容」的 sha256，排序后聚合，跨机器可复现（不依赖 mtime）。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EDITOR = path.join(ROOT, 'src-tauri', 'data', 'editor');
const OUT = path.join(EDITOR, 'base-id.txt');

function listFiles(dir, base = dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) listFiles(p, base, acc);
    else if (e.name !== 'base-id.txt' && e.name !== 'base-mods.txt') {
      // 两个都是本脚本的产物，必须排除，否则算出的指纹会随产物变化而自激
      acc.push(path.relative(base, p).split(path.sep).join('/'));
    }
  }
  return acc;
}

function main() {
  if (!fs.existsSync(EDITOR)) {
    // 不要因为镜像缺失就让整个构建失败：这里只清掉可能残留的旧指纹（避免误判「未变化」）。
    console.warn(`[base-id] 未找到 ${EDITOR}，跳过（本次构建不含编辑器镜像）`);
    try { if (fs.existsSync(OUT)) fs.rmSync(OUT); } catch { /* 清不掉也无所谓 */ }
    return;
  }
  const rels = listFiles(EDITOR).sort();
  const h = crypto.createHash('sha256');
  for (const rel of rels) {
    h.update(rel);
    h.update('\0');
    h.update(fs.readFileSync(path.join(EDITOR, rel)));
    h.update('\0');
  }
  const id = h.digest('hex').slice(0, 32);
  fs.writeFileSync(OUT, id, 'utf8');
  console.log(`[base-id] ${id}（${rels.length} 个文件） -> ${path.relative(ROOT, OUT)}`);

  // 同时记录「基线自带的模组」清单：运行期据此区分**内置模组**与**用户自装模组**。
  // 不能用「排除 create」这种硬编码 —— 基线里其实还有 create_connected，会被误判成用户模组。
  const modsDir = path.join(EDITOR, 'import', 'mods');
  const baked = fs.existsSync(modsDir)
    ? fs
        .readdirSync(modsDir)
        .filter((f) => f.endsWith('.manifest.json'))
        .map((f) => f.slice(0, -'.manifest.json'.length))
        .sort()
    : [];
  fs.writeFileSync(
    path.join(EDITOR, 'base-mods.txt'),
    baked.map((m) => m + '\n').join(''),
    'utf8'
  );
  console.log(`[base-mods] 基线自带 ${baked.length} 个模组：${baked.join(', ') || '(无)'}`);
}

main();

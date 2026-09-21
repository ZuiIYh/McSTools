// mod-fix-textures.mjs [--dry-run]
// 修复「已装载模组缺 3D 面贴图」：老版本装载器只把 PNG 拷进 images/，
// 但编辑器 3D 渲染走 block-textures/ + block-face-textures.json，缺文件就会渲染成粉色方块。
// 本脚本为每个已装载模组把 PNG 补拷进 block-textures/（幂等，只补缺失的）。
// 源文件优先级：import/mods/<ns>/ 缓存 → import/mods/<modid>/ → images/
import fs from 'node:fs';
import path from 'node:path';
import { IMAGES_DIR, BLOCK_TEXTURES_DIR, IMPORT_DIR, readManifest } from './mod-shared.mjs';

const dryRun = process.argv.includes('--dry-run');

function listManifests() {
  if (!fs.existsSync(IMPORT_DIR)) return [];
  return fs
    .readdirSync(IMPORT_DIR)
    .filter((f) => f.endsWith('.manifest.json'))
    .map((f) => f.replace(/\.manifest\.json$/, ''));
}

// 文件名形如 `create__brass_block.png`，前缀即命名空间，用来定位该方块自己的缓存目录
function nsOf(file) {
  const i = file.indexOf('__');
  return i > 0 ? file.slice(0, i) : null;
}

const mods = [];
let totalCopied = 0;
let totalOk = 0;
let totalMissing = 0;

if (!fs.existsSync(BLOCK_TEXTURES_DIR)) {
  if (!dryRun) fs.mkdirSync(BLOCK_TEXTURES_DIR, { recursive: true });
  console.log('已创建 block-textures 目录');
}

for (const modid of listManifests()) {
  const m = readManifest(modid);
  if (!m) continue;
  const files = m.imageFiles || [];
  let copied = 0;
  let ok = 0;
  let missing = 0;
  for (const f of files) {
    const dstTex = path.join(BLOCK_TEXTURES_DIR, f);
    if (fs.existsSync(dstTex)) { ok++; continue; }
    const ns = nsOf(f);
    const candidates = [
      ns ? path.join(IMPORT_DIR, ns, f) : null,
      path.join(IMPORT_DIR, modid, f),
      path.join(IMAGES_DIR, f),
    ].filter(Boolean);
    const src = candidates.find((p) => fs.existsSync(p));
    if (!src) { missing++; continue; }
    if (!dryRun) fs.copyFileSync(src, dstTex);
    copied++;
  }
  mods.push({ modid, files: files.length, alreadyOk: ok, copied, missing });
  totalCopied += copied;
  totalOk += ok;
  totalMissing += missing;
}

const summary = { ok: true, dryRun, mods, totalFiles: totalOk + totalCopied + totalMissing, totalCopied, totalOk, totalMissing };
console.log(JSON.stringify(summary, null, 2));
console.log('RESULT_JSON=' + JSON.stringify(summary));

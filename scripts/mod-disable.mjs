// mod-disable.mjs <modid> [--dry-run]
// 禁用模组：从编辑器方块库（DB/face/images）移出其方块，但保留缓存 PNG 与 manifest。
// 之后可一键 mod-enable 恢复，无需重新给 jar。
import { DB_PATH, FACE_PATH, IMAGES_DIR, BLOCK_TEXTURES_DIR, IMPORT_DIR, loadDb, saveDb, loadFace, saveFace, readManifest, removeEntries, removeFromFace } from './mod-shared.mjs';
import { revertModAtlas } from './mod-atlas.mjs';
import { revertModModels } from './mod-models.mjs';
import { syncRenderHints } from './mod-render-hints.mjs';
import fs from 'node:fs';
import path from 'node:path';

const modid = process.argv[2];
const dryRun = process.argv.includes('--dry-run');
if (!modid) { console.error('usage: mod-disable.mjs <modid> [--dry-run]'); process.exit(2); }

const manifest = readManifest(modid);
if (!manifest) { console.log('RESULT_JSON=' + JSON.stringify({ ok: false, reason: `manifest 不存在: ${modid}` })); process.exit(1); }
const alreadyDisabled = manifest.enabled === false;

const blockSet = new Set(manifest.blocks || []);
const db = loadDb();
const { kept, removed } = removeEntries(db, blockSet);
const face = loadFace();
const faceRemoved = removeFromFace(face, blockSet);
const imgsToDelete = (manifest.imageFiles || []).filter(f => fs.existsSync(path.join(IMAGES_DIR, f)));

// 3D 图集回滚：否则禁用后方块定义仍在图集里，重新启用会残留脏数据
const atlas = dryRun ? (revertModModels(modid, { dryRun: true }).note ? revertModAtlas(modid, { dryRun: true }) : revertModModels(modid, { dryRun: true })) : null;

const summary = { ok: true, modid, removed: removed.length, faceRemoved, imagesRemoved: imgsToDelete.length, alreadyDisabled, dryRun, atlas };
console.log(`将禁用 ${modid}: 移除 DB 条目 ${removed.length}, face 键 ${faceRemoved}, 删除 images PNG ${imgsToDelete.length}` + (dryRun ? '（dry-run，未修改）' : ''));

if (!dryRun && !alreadyDisabled) {
  saveDb(kept);
  saveFace(face);
  for (const f of imgsToDelete) {
    fs.rmSync(path.join(IMAGES_DIR, f), { force: true });
    fs.rmSync(path.join(BLOCK_TEXTURES_DIR, f), { force: true });
  }
  let ar = revertModModels(modid);
  if (ar.note) ar = revertModAtlas(modid);   // 没有几何占用时退回老式贴图回滚
  summary.atlas = ar;
  console.log('图集回滚: ' + (ar.ok ? `移除 ${ar.removed || 0}，剩余模组 ${ar.remainingMods ?? 0}` : ar.note || ar.error));
  manifest.enabled = false;
  fs.writeFileSync(path.join(IMPORT_DIR, `${modid}.manifest.json`), JSON.stringify(manifest, null, 2), 'utf8');
  // 渲染判定表也跟着收缩（否则残留的判定会把同名 id 的原版/其它方块判错）
  try { summary.renderHints = syncRenderHints().stats; } catch (e) { summary.renderHintsError = String((e && e.message) || e); }
  console.log(`已禁用 ${modid}（缓存保留，可 mod-enable 恢复）`);
}
console.log('RESULT_JSON=' + JSON.stringify(summary));

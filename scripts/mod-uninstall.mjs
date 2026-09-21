// mod-uninstall.mjs <modid> [--dry-run]
// 卸载模组：从编辑器方块库完全移除其方块，并删除缓存与 manifest。彻底消失，需重新 install 恢复。
import { DB_PATH, FACE_PATH, IMAGES_DIR, BLOCK_TEXTURES_DIR, IMPORT_DIR, loadDb, saveDb, loadFace, saveFace, readManifest, removeEntries, removeFromFace } from './mod-shared.mjs';
import { revertModAtlas } from './mod-atlas.mjs';
import { revertModModels } from './mod-models.mjs';
import fs from 'node:fs';
import path from 'node:path';

const modid = process.argv[2];
const dryRun = process.argv.includes('--dry-run');
if (!modid) { console.error('usage: mod-uninstall.mjs <modid> [--dry-run]'); process.exit(2); }

const manifest = readManifest(modid);
if (!manifest) { console.log('RESULT_JSON=' + JSON.stringify({ ok: false, reason: `manifest 不存在: ${modid}` })); process.exit(1); }

const blockSet = new Set(manifest.blocks || []);
const db = loadDb();
const { kept, removed } = removeEntries(db, blockSet);
const face = loadFace();
const faceRemoved = removeFromFace(face, blockSet);
const imgsToDelete = (manifest.imageFiles || []).filter(f => fs.existsSync(path.join(IMAGES_DIR, f)));
const cacheDir = path.join(IMPORT_DIR, modid);

const atlas = dryRun
  ? (revertModModels(modid, { dryRun: true }).note ? revertModAtlas(modid, { dryRun: true }) : revertModModels(modid, { dryRun: true }))
  : null;
const summary = { ok: true, modid, removed: removed.length, faceRemoved, imagesRemoved: imgsToDelete.length, cacheRemoved: fs.existsSync(cacheDir), dryRun, atlas };
console.log(`将卸载 ${modid}: 移除 DB 条目 ${removed.length}, face 键 ${faceRemoved}, 删除 images PNG ${imgsToDelete.length}, 删除缓存目录 ${fs.existsSync(cacheDir) ? '是' : '否'}` + (dryRun ? '（dry-run，未修改）' : ''));

if (!dryRun) {
  saveDb(kept);
  saveFace(face);
  for (const f of imgsToDelete) {
    fs.rmSync(path.join(IMAGES_DIR, f), { force: true });
    fs.rmSync(path.join(BLOCK_TEXTURES_DIR, f), { force: true });
  }
  let ar = revertModModels(modid);
  if (ar.note) ar = revertModAtlas(modid);
  summary.atlas = ar;
  console.log('图集回滚: ' + (ar.ok ? `移除 ${ar.removed || 0}，剩余模组 ${ar.remainingMods ?? 0}` : ar.note || ar.error));
  fs.rmSync(cacheDir, { recursive: true, force: true });
  fs.rmSync(path.join(IMPORT_DIR, `${modid}.manifest.json`), { force: true });
  console.log(`已卸载 ${modid}（彻底移除，重新 install 才可恢复）`);
}
console.log('RESULT_JSON=' + JSON.stringify(summary));

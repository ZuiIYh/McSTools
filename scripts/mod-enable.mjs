// mod-enable.mjs <modid> [--dry-run]
// 启用模组：将缓存 PNG 拷回 images/，并把 manifest.entries 原样放回 DB/face。
// 无需重新解析 jar，秒级完成。核心逻辑抽为 enableMod() 供 apply-installed-mods 复用。
import { DB_PATH, FACE_PATH, IMAGES_DIR, BLOCK_TEXTURES_DIR, IMPORT_DIR, loadDb, saveDb, loadFace, saveFace, readManifest, existingIds } from './mod-shared.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyModAtlas, resolveBlockTextures } from './mod-atlas.mjs';
import { applyModModels } from './mod-models.mjs';

export async function enableMod(modid, dryRun = false, opts = {}) {
  const manifest = readManifest(modid);
  if (!manifest) return { ok: false, reason: `manifest 不存在: ${modid}` };
  const cacheDir = path.join(IMPORT_DIR, modid);
  if (!fs.existsSync(cacheDir)) return { ok: false, reason: `缓存目录不存在: ${cacheDir}（无法恢复，可能需要重新 install）` };

  const db = loadDb();
  const face = loadFace();
  const exist = existingIds(db);
  const entries = manifest.entries || [];
  let added = 0, skipped = 0, copied = 0, missingPng = 0;
  for (const entry of entries) {
    const id = entry.minecraft_ids && entry.minecraft_ids[0] && entry.minecraft_ids[0].id;
    if (!id) continue;
    if (exist.has(id)) { skipped++; continue; }
    db.push(entry);
    face[id] = entry.image_filename;
    added++;
    const src = path.join(cacheDir, entry.image_filename);
    const dst = path.join(IMAGES_DIR, entry.image_filename);
    const dstTex = path.join(BLOCK_TEXTURES_DIR, entry.image_filename);
    if (fs.existsSync(src)) {
      // 两份都要恢复：images/ 供图标与平面贴图，block-textures/ 供 3D 面贴图
      if (!fs.existsSync(dst)) { fs.copyFileSync(src, dst); copied++; }
      if (!fs.existsSync(dstTex)) fs.copyFileSync(src, dstTex);
    } else missingPng++;
  }
  const msg = `启用 ${modid}: 新增 DB 条目 ${added}, 跳过已存在 ${skipped}, 恢复 PNG ${copied}` + (missingPng ? `, 缺缓存PNG ${missingPng}` : '') + (dryRun ? '（dry-run，未修改）' : '');
  // 3D 注入：优先移植真实几何（异形方块才不是立方体）；资源没缓存时退回整块贴图 + cube_all
  let atlas = null;
  if (!dryRun && opts.skipAtlas !== true) {
    const hasAssets = fs.existsSync(path.join(IMPORT_DIR, modid, 'assets'));
    if (hasAssets) {
      try {
        atlas = applyModModels(modid, manifest.blocks || []);
      } catch (e) {
        // 别静默吞掉：模型移植失败时会退化成整块贴图 + cube_all（异形方块全变立方体），
        // 保留堆栈以便定位，同时继续走下面的兜底注入。
        atlas = { ok: false, error: String((e && e.stack) || e) };
        console.error('模型移植失败，退化为整块贴图 + cube_all:', atlas.error);
      }
    }
    if (!atlas || !atlas.ok) {
      const modelError = atlas && atlas.error;
      try {
        let bt = manifest.blockTextures;
        if ((!Array.isArray(bt) || !bt.length) && (opts.jar || (manifest.source && fs.existsSync(manifest.source)))) {
          bt = (await resolveBlockTextures(modid, { jar: opts.jar })).blocks;
        }
        if (Array.isArray(bt) && bt.length) atlas = { ...applyModAtlas(modid, bt), modelError };
      } catch (e) {
        atlas = { ok: false, error: String((e && e.message) || e), modelError };
      }
    }
  }

  if (!dryRun) {
    saveDb(db);
    saveFace(face);
    manifest.enabled = true;
    fs.writeFileSync(path.join(IMPORT_DIR, `${modid}.manifest.json`), JSON.stringify(manifest, null, 2), 'utf8');
  }
  return { ok: true, added, skipped, copied, missingPng, msg, atlas };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const modid = process.argv[2];
  const dryRun = process.argv.includes('--dry-run');
  if (!modid) { console.error('usage: mod-enable.mjs <modid> [--dry-run]'); process.exit(2); }
  const jarIdx = process.argv.indexOf('--jar');
  const jar = jarIdx !== -1 ? process.argv[jarIdx + 1] : null;
  enableMod(modid, dryRun, { jar }).then((r) => {
    if (!r.ok) { console.error(r.reason); console.log('RESULT_JSON=' + JSON.stringify({ ok: false, reason: r.reason })); process.exit(1); }
    console.log(r.msg);
    if (r.atlas) {
      const a = r.atlas;
      console.log('图集: ' + (a.ok
        ? `注入 ${a.textures ?? a.tiles ?? 0} 格贴图 / ${a.blocks} 方块` +
          (a.ported != null ? `（真实几何 ${a.ported}，兜底立方体 ${a.fallback ?? 0}）` : '')
        : '失败 ' + a.error));
    }
    console.log('RESULT_JSON=' + JSON.stringify({ ok: true, modid, added: r.added, skipped: r.skipped, copied: r.copied, missingPng: r.missingPng, atlas: r.atlas, dryRun }));
  }).catch(e => {
    console.log('RESULT_JSON=' + JSON.stringify({ ok: false, error: String(e && e.message || e) }));
    process.exit(1);
  });
}

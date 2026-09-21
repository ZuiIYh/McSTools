// mod-enable.mjs <modid> [--dry-run]
// 启用模组：将缓存 PNG 拷回 images/，并把 manifest.entries 原样放回 DB/face。
// 无需重新解析 jar，秒级完成。核心逻辑抽为 enableMod() 供 apply-installed-mods 复用。
import { DB_PATH, FACE_PATH, IMAGES_DIR, BLOCK_TEXTURES_DIR, IMPORT_DIR, loadDb, saveDb, loadFace, saveFace, readManifest, existingIds } from './mod-shared.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveBlockTextures } from './mod-atlas.mjs';
import { applyRenderForMod, formatRenderLine } from './mod-apply-render.mjs';

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
  // 3D 注入：走与「导入」完全相同的后处理链路（几何+图集 → 渲染判定 → 自检）。
  // 只走其中一个入口才会出现「刚装的正常、禁用后再启用又坏了」。
  let render = null;
  if (!dryRun && opts.skipAtlas !== true) {
    const hasAssets = fs.existsSync(path.join(IMPORT_DIR, modid, 'assets'));
    let blockTextures = manifest.blockTextures;
    // 缓存里没登记贴图时，尽量从 jar/源包补一份，好在几何不可用时仍能退回 cube_all
    if ((!Array.isArray(blockTextures) || !blockTextures.length) &&
        (opts.jar || (manifest.source && fs.existsSync(manifest.source)))) {
      try {
        const bt = await resolveBlockTextures(modid, { jar: opts.jar });
        if (bt && Array.isArray(bt.blocks) && bt.blocks.length) blockTextures = bt.blocks;
      } catch (e) {
        console.error('解析贴图列表失败（继续尝试几何路径）:', (e && e.message) || e);
      }
    }
    try {
      render = applyRenderForMod(modid, manifest.blocks || [], { blockTextures, skipGeometry: !hasAssets });
      for (const w of render.warnings) console.error('  ⚠ ' + w);
    } catch (e) {
      // 这里再抛就是脚本级故障了，别让「启用」整体失败：方块库已写回，渲染可事后重刷
      console.error('渲染后处理失败（方块库已恢复，可在面板上点「重新生成」再试）:', String((e && e.stack) || e));
    }
  }

  if (!dryRun) {
    saveDb(db);
    saveFace(face);
    manifest.enabled = true;
    if (render && render.report) manifest.renderReport = render.report;
    fs.writeFileSync(path.join(IMPORT_DIR, `${modid}.manifest.json`), JSON.stringify(manifest, null, 2), 'utf8');
  }
  return {
    ok: true, added, skipped, copied, missingPng, msg,
    atlas: render && render.atlas,
    renderHints: render && render.renderHints,
    report: render && render.report,
    warnings: render ? render.warnings : [],
  };
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
    console.log('渲染后处理: ' + formatRenderLine({ atlas: r.atlas, renderHints: r.renderHints, report: r.report }));
    console.log('RESULT_JSON=' + JSON.stringify({ ok: true, modid, added: r.added, skipped: r.skipped, copied: r.copied, missingPng: r.missingPng, atlas: r.atlas, renderHints: r.renderHints ? r.renderHints.stats : null, renderReport: r.report, warnings: r.warnings, dryRun }));
  }).catch(e => {
    console.log('RESULT_JSON=' + JSON.stringify({ ok: false, error: String(e && e.message || e) }));
    process.exit(1);
  });
}

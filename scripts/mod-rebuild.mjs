#!/usr/bin/env node
// mod-rebuild.mjs <modid|--all> [--dry-run]
//
// 用已缓存的资产（import/mods/<modid>/assets/）**重新生成**该模组的完整渲染数据：
//   几何 + 图集 → 渲染判定（透明/挖空/整块）→ 导入自检（复刻渲染器规则）
// 不需要重新解包 jar（省 ~9 分钟）。应用面板上的「重新生成」按钮调的就是它。
//
// 适用场景：
//   - 升级了 mod-models / mod-atlas / mod-render-hints 的生成逻辑后，把已装模组原地重刷一遍；
//   - 排查「某批方块几何不对 / 洋红」时，先原地重刷再自检，不必动方块库（DB/images）。
//
// 说明：applyModModels 内部是幂等的 —— 先撤掉本模组的旧占用（uv / models / defs / props）再重建，
//       所以重复执行安全，不会叠加残留。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMPORT_DIR } from './mod-shared.mjs';
import { applyRenderForMod, formatRenderLine } from './mod-apply-render.mjs';

const MANIFEST_SUFFIX = '.manifest.json';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const wantAll = args.includes('--all');
const modid = args.find((a) => !a.startsWith('--'));

if (!modid && !wantAll) {
  console.error('usage: mod-rebuild.mjs <modid> [--dry-run]');
  console.error('       mod-rebuild.mjs --all [--dry-run]');
  process.exit(2);
}

/** 列出已安装模组的 manifest */
function installedModids() {
  if (!fs.existsSync(IMPORT_DIR)) return [];
  return fs.readdirSync(IMPORT_DIR)
    .filter((f) => f.endsWith(MANIFEST_SUFFIX))
    .map((f) => f.slice(0, -MANIFEST_SUFFIX.length))
    .sort();
}

/** 重刷单个模组；返回结构化结果（不抛，逐项失败不影响其它模组） */
function rebuildOne(id) {
  const mp = path.join(IMPORT_DIR, `${id}${MANIFEST_SUFFIX}`);
  if (!fs.existsSync(mp)) {
    return { ok: false, modid: id, reason: '找不到 manifest（该模组还没装过，请先用「模组装载」安装一次以生成缓存）' };
  }
  let man;
  try { man = JSON.parse(fs.readFileSync(mp, 'utf8')); }
  catch (e) { return { ok: false, modid: id, reason: 'manifest 解析失败：' + ((e && e.message) || e) }; }

  const blocks = Array.isArray(man.blocks) ? man.blocks : [];
  if (!blocks.length) return { ok: false, modid: id, reason: 'manifest.blocks 为空，无法重建' };

  // 缓存缺失时几何必然不可用 → 直接走整块贴图兜底（与导入时的降级路径一致）
  const hasAssets = fs.existsSync(path.join(IMPORT_DIR, id, 'assets'));

  const t0 = Date.now();
  let render;
  try {
    render = applyRenderForMod(id, blocks, {
      blockTextures: man.blockTextures,
      skipGeometry: !hasAssets,
      dryRun,
    });
  } catch (e) {
    return { ok: false, modid: id, reason: '重刷失败：' + String((e && e.stack) || e) };
  }
  const ms = Date.now() - t0;
  for (const w of render.warnings) console.error('  ⚠ ' + w);

  // 自检结果写回 manifest：面板/列表不重启也能看到有没有洋红风险
  if (!dryRun) {
    man.renderReport = render.report;
    man.rebuiltAt = new Date().toISOString();
    fs.writeFileSync(mp, JSON.stringify(man, null, 2), 'utf8');
  }

  return {
    ok: render.ok,
    modid: id,
    ms,
    blocks: blocks.length,
    hasAssets,
    dryRun,
    atlas: render.atlas,
    renderHints: render.renderHints ? render.renderHints.stats : null,
    report: render.report,
    warnings: render.warnings,
  };
}

const targets = wantAll ? installedModids() : [modid];
if (!targets.length) {
  console.log('没有已安装的模组可重刷。');
  console.log('RESULT_JSON=' + JSON.stringify({ ok: true, count: 0, results: [] }));
  process.exit(0);
}

const results = [];
for (const id of targets) {
  console.log(`[rebuild] modid=${id} dryRun=${dryRun}`);
  const r = rebuildOne(id);
  results.push(r);
  if (!r.ok) { console.error(`[rebuild] ${id} 失败：${r.reason}`); continue; }
  console.log('[rebuild] 完成 %d ms：%s%s', r.ms, formatRenderLine(r), r.hasAssets ? '' : '（缓存缺失，走整块贴图兜底）');
}

const failed = results.filter((r) => !r.ok);
const risky = results.filter((r) => r.ok && r.report && r.report.modBlocksNotRenderable > 0);
const summary = {
  ok: failed.length === 0,
  dryRun,
  count: results.length,
  failed: failed.map((r) => ({ modid: r.modid, reason: r.reason })),
  risky: risky.map((r) => ({ modid: r.modid, n: r.report.modBlocksNotRenderable, list: r.report.modBlocksNotRenderableList.slice(0, 10) })),
  results: results.map((r) => ({
    modid: r.modid, ok: r.ok, reason: r.reason,
    blocks: r.blocks, ms: r.ms, hasAssets: r.hasAssets,
    geometry: r.atlas ? { real: r.atlas.realGeometry, cubeEq: r.atlas.cubeGeom, fallback: r.atlas.fallback, air: r.atlas.air, textures: r.atlas.textures, capacity: r.atlas.capacity, overflow: r.atlas.overflow } : null,
    renderReport: r.report || null,
    warnings: r.warnings || [],
  })),
};
console.log('RESULT_JSON=' + JSON.stringify(summary));

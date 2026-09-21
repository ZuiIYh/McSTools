// mod-apply-render.mjs —— 模组方块「导入时自动处理」的统一入口
//
// 背景：方块的渲染正确性由三件事共同决定，缺任何一件都会出问题 ——
//   1) 几何 + 图集（applyModModels）：异形方块（管道/齿轮/皮带/脚手架…）靠它才不会退化成整块立方体；
//   2) 渲染提示（syncRenderHints）：透明 / 挖空 / 是否整块 —— 缺了玻璃会发黑、非整块会被剔面而断开；
//   3) 自检（verifyRender）：复刻渲染器规则扫一遍，确认没有方块的几何为 0 面或取不到图集内纹理（= 洋红）。
//
// 导入(install) / 启用(enable) / 重刷(rebuild) 必须走**同一条**链路。
// 否则会出现「刚装的模组正常，禁用后再启用又坏了」这类只在某个入口才暴露的问题。
import { applyModModels } from './mod-models.mjs';
import { applyModAtlas } from './mod-atlas.mjs';
import { syncRenderHints } from './mod-render-hints.mjs';
import { verifyRender } from './mod-verify-render.mjs';

/**
 * 对一个模组执行完整的渲染后处理（几何+图集 → 渲染提示 → 自检）。
 *
 * @param {string} modid 模组 id（方块 id 的命名空间前缀）
 * @param {string[]} blockIds 该模组的**全量**方块 id（不能只传新增的，否则会撤掉其余方块的 defs）
 * @param {{blockTextures?: Array<{blockId:string,texId:string,pngTarget:string}>, skipGeometry?: boolean}} [opts]
 *        blockTextures 仅在与几何都失败时用于退回「整块贴图 + cube_all」
 *        skipGeometry=true 表示资产缓存不存在（几何必然不可用），直接走整块贴图兜底
 * @returns {{ok:boolean, atlas:object|null, renderHints:object|null, report:object|null, warnings:string[]}}
 */
export function applyRenderForMod(modid, blockIds, opts = {}) {
  const warnings = [];
  const blockTextures = Array.isArray(opts.blockTextures) ? opts.blockTextures : null;

  // 1) 几何 + 图集
  let atlas = null;
  if (opts.skipGeometry === true) {
    // 没有资产缓存 → 几何一定不可用，直接整块贴图 + cube_all（比移植出空几何更稳）
    try {
      atlas = blockTextures && blockTextures.length
        ? applyModAtlas(modid, blockTextures)
        : { ok: false, error: '缺少资产缓存与贴图列表，无法注入图集' };
    } catch (e) {
      atlas = { ok: false, error: String((e && e.message) || e) };
    }
    if (atlas && atlas.ok === false) warnings.push('图集兜底注入失败：' + atlas.error);
  } else {
    try {
      atlas = applyModModels(modid, blockIds, { dryRun: opts.dryRun === true });
    } catch (e) {
      // 别静默吞掉：模型移植失败会退化成整块贴图 + cube_all（异形方块全变立方体），保留堆栈以便定位
      const modelError = String((e && e.stack) || e);
      warnings.push('模型移植失败，降级为整块贴图 + cube_all：' + modelError);
      try {
        atlas = blockTextures && blockTextures.length
          ? { ...applyModAtlas(modid, blockTextures), modelError }
          : { ok: false, error: modelError };
      } catch (e2) {
        atlas = { ok: false, error: modelError, fallbackError: String((e2 && e2.message) || e2) };
      }
    }
    if (atlas && atlas.ok === false && atlas.error) {
      warnings.push('图集/几何注入失败：' + atlas.error);
    }
  }
  if (atlas && atlas.fallback > 0) {
    warnings.push(`${atlas.fallback} 个方块没有任何可用几何，已回落 cube_all 兜底（不会洋红，但形状会偏方块）`);
  }
  if (atlas && atlas.overflow > 0) {
    warnings.push(`图集已满，${atlas.overflow} 张贴图溢出 —— 已自动换成最接近的已分配贴图（几何不受影响）`);
  }

  // 干跑：只估算几何/图集占用，不写盘，也就没有「新状态」可自检
  if (opts.dryRun === true) {
    return { ok: true, atlas, renderHints: null, report: null, warnings, dryRun: true };
  }

  // 2) 渲染提示：透明 / 挖空 / 是否整块（同时把判定内联进编辑器渲染器）
  let renderHints = null;
  try { renderHints = syncRenderHints(); }
  catch (e) { warnings.push('渲染提示同步失败（透明/挖空判定可能不对）：' + String((e && e.message) || e)); }
  if (renderHints && renderHints.patch && renderHints.patch.ok === false) {
    warnings.push('渲染提示补丁写入失败：' + (renderHints.patch.reason || renderHints.patch.error));
  }

  // 3) 导入自检：必须在上两步落盘之后调用（verifyRender 内部才读 mcmeta）
  let report = null;
  try { report = verifyRender(modid); }
  catch (e) { warnings.push('渲染自检失败：' + String((e && e.message) || e)); }
  if (report && report.modBlocksNotRenderable > 0) {
    warnings.push(`自检：${report.modBlocksNotRenderable} 个方块取不到图集内纹理（有洋红风险）→ ` +
      report.modBlocksNotRenderableList.slice(0, 5).join('; '));
  }

  return {
    ok: !(report && report.modBlocksNotRenderable > 0),
    atlas,
    renderHints,
    report,
    warnings,
  };
}

/** 把 applyRenderForMod 的结果压成一行人类可读的日志（CLI 用） */
export function formatRenderLine(res) {
  const parts = [];
  if (res.atlas && res.atlas.ok !== false) {
    const a = res.atlas;
    parts.push(`几何: 真实 ${a.realGeometry ?? a.ported ?? '?'} / 等价立方体 ${a.cubeGeom ?? 0} / 隐形 ${a.air ?? 0} / 兜底 ${a.fallback ?? 0}`);
    parts.push(`图集 ${a.textures ?? a.tiles ?? 0}/${a.capacity ?? '?'}` + (a.overflow ? `（溢出 ${a.overflow}）` : ''));
    if (a.texturesSubstituted) parts.push(`替代贴图 ${a.texturesSubstituted}`);
  }
  if (res.renderHints && res.renderHints.stats) {
    const s = res.renderHints.stats;
    parts.push(`渲染判定: ${s.blocks} 方块（非整块 ${s.notFullCube}, 透明 ${s.transparent}, 挖空 ${s.alphaTest}` +
      `, 半透明 ${s.blend ?? 0}, 混合+挖空 ${s.optionalAlpha ?? 0}）`);
  }
  if (res.report) {
    const r = res.report;
    parts.push(`自检: 可渲染 ${r.modBlocksRenderable} / 隐形 ${r.modBlocksInvisible} / 有风险 ${r.modBlocksNotRenderable}`);
  }
  return parts.join('，');
}

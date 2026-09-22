// mod-render-hints.mjs — 推导「模组方块渲染提示」并落盘 + 注入渲染器
//
// 为什么需要：编辑器渲染器把「是否整块 / 需透明 / 需挖空」硬编码成原版方块名后缀表
//   （见 patch-editor-render.mjs 头部注释）。模组方块不在表里，导致
//   ① 玻璃/镂空贴图的透明像素被当成不透明 → 发黑；② 非整块方块被当整块剔除邻面 → 连接段消失。
//
// 本脚本从**已经落盘的数据**（defs / models / atlas-uv / atlas.png）反推每个模组方块的真实特征，
// 结果写 mcmeta/mod-render-hints.json，再交给 patch-editor-render.mjs 内联进渲染器。
// 完全幂等、无状态：每次重算全表，不需要按模组记账。
//
// ── render_layer：材质判定只留一个枚举 ──────────────────────────────────────────
// 原先用「transparent / alphaTest」两个独立布尔描述材质，两者可以任意组合、边界互相打架，
// 而且缺少「半透明」这一档（贴图里 alpha 既不是 0 也不是 255 的像素 —— 彩色玻璃、发光管、
// 磨砂窗）。基岩版把这件事表达成一个枚举，我们照抄它的语义（官方 `netease:render_layer`
// 为 opaque/alpha/blend/optionalAlpha；微软 `minecraft:material_instances.render_method`
// 为 opaque/alpha_test/blend/double_sided）：
//
//   opaque        贴图无透明像素                          → 什么都不加
//   alpha         有全透明像素(a<8)   ≥5%                 → 挖空（渲染器 discard a=0）
//   blend         有半透明像素(8≤a<248) ≥5%               → 参与 alpha 混合
//   optionalAlpha 两者都有                                → 混合 + 挖空（局部透明，对应 optionalAlpha）
//
// 判定阈值 5% 与原实现一致（原 alphaTest 就是 zero≥5%），只是把「zero / mid 两种像素占比」
// 分开统计；几何层的 fullCube 与材质层是**正交**的，不参与本枚举。
//
// 兼容：hints 表里 renderLayer 只写非 opaque 的方块；同时仍写出由 renderLayer 派生的
//   transparent / alphaTest 两个布尔（老读者不受影响），读取方以 renderLayer 为准。
//
// 用法：
//   node scripts/mod-render-hints.mjs               # 重算并写盘 + 打补丁
//   node scripts/mod-render-hints.mjs --dry-run     # 只看结果，不写盘
//   node scripts/mod-render-hints.mjs --no-patch    # 只写 hints，不动渲染器
//   node scripts/mod-render-hints.mjs --json        # 输出 RESULT_JSON=

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MCMETA_DIR, ATLAS_PNG, ATLAS_UV, BLOCK_MODELS, BLOCK_DEFS, RENDER_HINTS, isMainModule } from './mod-shared.mjs';
import { decodePng } from './png.mjs';
import { applyRenderPatch } from './patch-editor-render.mjs';

const C = (t) => (String(t).startsWith('minecraft:') ? String(t).slice(10) : String(t));

// render_layer 枚举（与基岩版 render_layer / render_method 对齐）
export const RENDER_LAYER = { OPAQUE: 'opaque', ALPHA: 'alpha', BLEND: 'blend', OPTIONAL_ALPHA: 'optionalAlpha' };
// 透明像素阈值：完全透明占比 ≥5% 值得挖空；半透明占比 ≥5% 值得进混合通道
const ALPHA_T = 0.05;
const BLEND_T = 0.05;

export function readJson(p, dflt) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return dflt; }
}

// 渲染器的模型查表规则：键不带 minecraft: 前缀（带其它命名空间的保留）
export function lookup(tbl, id) {
  if (id == null) return undefined;
  if (id in tbl) return tbl[id];
  if (id.startsWith('minecraft:')) return tbl[id.slice(10)];
  return undefined;
}

// 展平 parent 链：子覆盖父的 textures；elements 取最近一个有 elements 的祖先
export function flatten(models, key, seen = new Set()) {
  const k = C(key);
  if (!k || seen.has(k)) return null;
  seen.add(k);
  const m = lookup(models, key);
  if (!m || typeof m !== 'object') return null;
  const par = m.parent ? flatten(models, m.parent, seen) : null;
  return {
    textures: { ...(par ? par.textures : {}), ...(m.textures || {}) },
    elements: m.elements && m.elements.length ? m.elements : par ? par.elements : null,
  };
}

// 该 defs 条目引用的全部模型键
export function modelRefs(def) {
  const out = [];
  const w = (o) => {
    if (o && typeof o === 'object') {
      if (typeof o.model === 'string') out.push(o.model);
      Object.values(o).forEach(w);
    }
  };
  if (def.variants) Object.values(def.variants).forEach(w);
  if (def.multipart) def.multipart.forEach((p) => w(p.apply));
  return [...new Set(out)];
}

// 是否"独占整块"：单个 element，无旋转，恰好 0→16，六面齐全
export function isFullCubeEl(elements) {
  if (!elements || elements.length !== 1) return false;
  const e = elements[0];
  if (e.rotation) return false;
  const f = e.from, t = e.to;
  if (!Array.isArray(f) || !Array.isArray(t)) return false;
  for (let i = 0; i < 3; i++) if (f[i] !== 0 || t[i] !== 16) return false;
  return ['down', 'up', 'north', 'south', 'east', 'west'].every((k) => e.faces && e.faces[k]);
}

// face.texture 只认槽名，沿 textures 表解引用（复刻渲染器 getTexture）
export function resolveTex(flat, ref) {
  let t = String(ref).startsWith('#') ? String(ref).slice(1) : String(ref);
  for (let g = 0; g < 10; g++) {
    const nx = flat.textures[t];
    if (nx === undefined) return t;
    t = String(nx);
    if (!t.startsWith('#')) return t;
    t = t.slice(1);
  }
  return t;
}

export function textureRefs(flat) {
  const out = [];
  for (const el of flat.elements || []) {
    for (const f of Object.values(el.faces || {})) {
      if (f && f.texture) out.push(resolveTex(flat, f.texture));
    }
  }
  return out;
}

/**
 * 由两种像素占比得出 render_layer。
 * @param {number} zero 完全透明(a<8)占比   @param {number} mid 半透明(8≤a<248)占比
 */
export function pickRenderLayer(zero, mid) {
  if (zero >= ALPHA_T && mid >= BLEND_T) return RENDER_LAYER.OPTIONAL_ALPHA;
  if (zero >= ALPHA_T) return RENDER_LAYER.ALPHA;
  if (mid >= BLEND_T) return RENDER_LAYER.BLEND;
  return RENDER_LAYER.OPAQUE;
}

// 计算全表。返回 { hints, stats }
export function computeRenderHints(opts = {}) {
  const defs = readJson(BLOCK_DEFS, {});
  const models = readJson(BLOCK_MODELS, {});
  const uv = readJson(ATLAS_UV, {});
  const atlas = opts.atlas || (fs.existsSync(ATLAS_PNG) ? decodePng(fs.readFileSync(ATLAS_PNG)) : null);

  // 贴图像素统计（同尺寸 16×16，缓存在闭包内避免重复统计）
  //   zero = a < 8        → 该挖空
  //   mid  = 8 ≤ a < 248  → 该混合
  const alphaCache = new Map();
  const pixStats = (tex) => {
    if (alphaCache.has(tex)) return alphaCache.get(tex);
    let r = { zero: 0, mid: 0, n: 0 };
    const e = lookup(uv, tex);
    if (e && Array.isArray(e) && atlas) {
      const [x, y, w, h] = e;
      const m = Math.max(1, Math.min(w, h));
      let z = 0, md = 0;
      for (let j = 0; j < m; j++) {
        for (let i = 0; i < m; i++) {
          const o = ((y + j) * atlas.w + (x + i)) * 4 + 3;
          if (o >= atlas.rgba.length) continue;
          const a = atlas.rgba[o];
          if (a < 8) z++; else if (a < 248) md++;
        }
      }
      r = { zero: z / (m * m), mid: md / (m * m), n: m * m };
    }
    alphaCache.set(tex, r);
    return r;
  };

  const hints = {};
  const stats = { blocks: 0, notFullCube: 0, transparent: 0, alphaTest: 0, blend: 0, optionalAlpha: 0, noDef: 0, noModel: 0 };
  for (const [id, def] of Object.entries(defs)) {
    if (!id.includes(':') || id.startsWith('minecraft:')) continue;   // 只管模组方块
    stats.blocks++;
    const refs = modelRefs(def);
    if (!refs.length) { stats.noModel++; continue; }
    let allFull = true, seenGeo = 0;
    const texs = new Set();
    for (const r of refs) {
      const flat = flatten(models, r);
      // 没有几何的引用（particle / 占位模型）不参与"整块"判定，否则会把整块方块误判成异形
      if (!flat || !flat.elements) continue;
      seenGeo++;
      if (!isFullCubeEl(flat.elements)) allFull = false;
      textureRefs(flat).forEach((t) => texs.add(t));
    }
    if (!seenGeo) allFull = false;   // 一个几何都没有 → 绝不当整块（免得剔掉邻面）
    let worstZero = 0, worstMid = 0, worstTex = '';
    for (const t of texs) {
      const s = pixStats(t);
      if (s.mid > worstMid) { worstMid = s.mid; worstTex = t; }
      if (s.zero > worstZero) worstZero = s.zero;
    }
    const glassy = /glass|window/i.test(id) || [...texs].some((t) => /glass|window/i.test(t));
    const layer = pickRenderLayer(worstZero, worstMid);
    const h = { renderLayer: layer };
    if (!allFull) h.fullCube = false;
    // 派生给渲染器的两个表：l = 挖空、o = 透明混合
    // blend / optionalAlpha 必须进 o，否则半透明像素会被当成实色画出来
    // （原实现只有「玻璃类且全透明≥10%」才进 o，彩色玻璃 / 发光管 / 磨砂窗因此完全不透明）
    if (layer === RENDER_LAYER.ALPHA || layer === RENDER_LAYER.OPTIONAL_ALPHA || (glassy && worstZero >= 0.1)) h.alphaTest = true;
    if (layer === RENDER_LAYER.BLEND || layer === RENDER_LAYER.OPTIONAL_ALPHA || (glassy && worstZero >= 0.1)) h.transparent = true;
    h._zero = Math.round(worstZero * 100);
    h._mid = Math.round(worstMid * 100);
    h._tex = worstTex;
    hints[id] = h;
    if (h.fullCube === false) stats.notFullCube++;
    if (h.transparent) stats.transparent++;
    if (h.alphaTest) stats.alphaTest++;
    if (layer === RENDER_LAYER.BLEND) stats.blend++;
    if (layer === RENDER_LAYER.OPTIONAL_ALPHA) stats.optionalAlpha++;
  }
  return { hints, stats, atlas: !!atlas, uvKeys: Object.keys(uv).length };
}

// 落盘（去掉 _ 前缀的调试字段）
export function writeRenderHints(hints) {
  const out = {};
  for (const k of Object.keys(hints).sort()) {
    const h = hints[k];
    const e = {};
    // renderLayer 只写非 opaque（多数方块都是 opaque，省体积；缺省即 opaque）
    if (h.renderLayer && h.renderLayer !== RENDER_LAYER.OPAQUE) e.renderLayer = h.renderLayer;
    if (h.fullCube === false) e.fullCube = false;
    if (h.transparent) e.transparent = true;
    if (h.alphaTest) e.alphaTest = true;
    e.alphaPct = h._zero ?? 0;
    e.blendPct = h._mid ?? 0;
    e.tex = h._tex || '';
    out[k] = e;
  }
  fs.mkdirSync(MCMETA_DIR, { recursive: true });
  fs.writeFileSync(RENDER_HINTS, JSON.stringify(out, null, 2), 'utf8');
  return out;
}

// 供生命周期脚本调用：重算 → 落盘 → 打补丁（同步，方便塞进同步的装载流程）
export function syncRenderHints(opts = {}) {
  const { hints, stats, atlas } = computeRenderHints(opts);
  if (!opts.dryRun) writeRenderHints(hints);
  let patch = null;
  if (opts.patch !== false && !opts.dryRun) {
    try { patch = applyRenderPatch(); }
    catch (e) { patch = { ok: false, error: String((e && e.message) || e) }; }
  }
  return { ok: true, stats, atlas, patch, dryRun: !!opts.dryRun };
}

const isMain = isMainModule(import.meta.url);
if (isMain) {
  const dryRun = process.argv.includes('--dry-run');
  const noPatch = process.argv.includes('--no-patch');
  const asJson = process.argv.includes('--json');
  const { hints, stats, atlas } = computeRenderHints();
  const table = dryRun ? null : writeRenderHints(hints);

  if (!dryRun && !noPatch) {
    const r = applyRenderPatch();
    if (!r.ok) console.error('渲染补丁失败: ' + (r.reason || r.error || '未知'));
    else if (r.changed) console.log(`渲染补丁已更新（${r.file}，提示表 ${r.hintBlocks} 个方块）`);
  }
  if (!asJson) {
    console.log(`模组方块 ${stats.blocks} 个：非整块 ${stats.notFullCube}，需透明 ${stats.transparent}，需挖空 ${stats.alphaTest}` +
      `，半透明 ${stats.blend}，混合+挖空 ${stats.optionalAlpha}` + (stats.noModel ? `，无模型引用 ${stats.noModel}` : ''));
    console.log(`图集: ${atlas ? '已读取' : '缺失（透明判定会退化为 0）'} | UV 条目 ${Object.keys(readJson(ATLAS_UV, {})).length}`);
    const rows = Object.entries(hints)
      .sort((a, b) => (b[1]._mid || 0) - (a[1]._mid || 0))
      .slice(0, 12);
    console.log('半透明像素最多的方块：');
    for (const [id, h] of rows) {
      console.log('  ' + id.padEnd(42), String(h._mid + '%').padStart(4),
        ('α' + h._zero + '%').padStart(5), h.renderLayer.padEnd(14),
        h.fullCube === false ? '异形' : '整块', h.transparent ? '透明' : '    ', h.alphaTest ? '挖空' : '');
    }
    console.log(dryRun ? '（dry-run，未写盘）' : '已写入 ' + RENDER_HINTS);
  }
  console.log('RESULT_JSON=' + JSON.stringify({ ok: true, stats, atlas, dryRun, hints: table || hints }));
}

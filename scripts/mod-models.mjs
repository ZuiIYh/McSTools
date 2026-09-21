#!/usr/bin/env node
// mod-models.mjs — 把模组的 blockstates / models 高保真移植进编辑器 3D 资源包
//
// 为什么需要它：
//   只给每个方块塞一张贴图 + cube_all 模型，异形方块（楼梯/半砖/栅栏/齿轮/传动杆…）
//   会全部渲染成实心立方体。真正的几何信息在模组自带的
//   assets/<ns>/blockstates/*.json 与 assets/<ns>/models/block/*.json 里，
//   而编辑器的 block-models.json 恰好就是**标准 MC 模型格式**（parent + textures + elements），
//   并且自带 stairs/slab/cube_column/template_wall_* 等原版父模型，可以照搬。
//
// 三条硬约束（勿踩）：
//   1) 图集容量：atlas.png 会被加载器向上取整到 pow2 再按此归一化 UV，所以**不能改图集尺寸**，
//      可用空间只有内容底部 (baseBottom) 以下的空白条带（实测 384 格）。超了就优雅降级。
//   2) 模型缺失会抛异常：渲染器 `throw Error("Cannot find block model ...")`，
//      因此 defs 里引用的每个模型都必须真的写进 block-models.json。
//   3) 变体匹配：`matchesVariant` 对空键 "" 恒为真，但取的是**第一个**匹配项
//      → 真实变体写前面，兜底 "" 写最后；multipart 保持原样（渲染器原生支持）。
//
// 贴图格子分配策略：先给每个方块保底一张（绝不回退成洋红），剩余格子按共享度降序分配。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, encodePng, resizeNearest } from './png.mjs';
import {
  MCMETA_DIR, ATLAS_PNG, ATLAS_UV, BLOCK_MODELS, BLOCK_DEFS, BLOCK_PROPS, ATLAS_REGISTRY, IMPORT_DIR,
} from './mod-shared.mjs';

export const TILE = 16;
const MAX_ATLAS_HEIGHT = 2048;
const BACKUP_DIR = path.join(MCMETA_DIR, '.mod-backup');
const BACKUP_FILES = ['atlas.png', 'atlas-uv.json', 'block-models.json', 'block-definitions.json', 'block-default-properties.json'];

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
function writeAtomic(p, buf) { const t = p + '.writing'; fs.writeFileSync(t, buf); fs.renameSync(t, p); }
const norm = (k) => String(k).replace(/^minecraft:/, '');
const sanitize = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 60);

function ensureBackup() {
  if (fs.existsSync(path.join(BACKUP_DIR, 'atlas.png'))) return false;
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  for (const f of BACKUP_FILES) {
    const s = path.join(MCMETA_DIR, f);
    if (fs.existsSync(s)) fs.copyFileSync(s, path.join(BACKUP_DIR, f));
  }
  return true;
}
function loadRegistry() {
  if (!fs.existsSync(ATLAS_REGISTRY)) return { version: 2, baseBottom: null, mods: {} };
  try { return { version: 2, baseBottom: null, mods: {}, ...readJson(ATLAS_REGISTRY) }; } catch { return { version: 2, baseBottom: null, mods: {} }; }
}
const saveRegistry = (r) => writeAtomic(ATLAS_REGISTRY, JSON.stringify(r, null, 2));

// ---------------- 读取模组资源 ----------------
function walkFiles(d, o = [], rel = '') {
  let e = []; try { e = fs.readdirSync(d, { withFileTypes: true }); } catch { return o; }
  for (const x of e) {
    if (x.isDirectory()) walkFiles(path.join(d, x.name), o, rel + x.name + '/');
    else o.push({ path: path.join(d, x.name), rel: rel + x.name });
  }
  return o;
}

/** 从缓存的 assets 目录（import/mods/<modid>/assets）读出 blockstates / models / 贴图索引 */
export function loadModAssets(modid, ns = modid) {
  const base = path.join(IMPORT_DIR, modid, 'assets', ns);
  if (!fs.existsSync(base)) throw new Error(`缺少缓存资源: ${base}（需要重新用 jar 安装一次）`);
  const blockstates = new Map();
  const models = new Map();
  const bsDir = path.join(base, 'blockstates');
  if (fs.existsSync(bsDir)) {
    for (const f of walkFiles(bsDir)) {
      if (f.rel.endsWith('.json')) blockstates.set(f.rel.replace(/\.json$/, ''), readJson(f.path));
    }
  }
  const mdDir = path.join(base, 'models', 'block');
  if (fs.existsSync(mdDir)) {
    for (const f of walkFiles(mdDir)) {
      if (f.rel.endsWith('.json')) models.set(`${ns}:block/` + f.rel.replace(/\.json$/, ''), readJson(f.path));
    }
  }
  const textureIndex = new Map();   // texId -> 绝对路径
  const txDir = path.join(base, 'textures');
  if (fs.existsSync(txDir)) {
    for (const f of walkFiles(txDir)) {
      if (f.rel.endsWith('.png')) textureIndex.set(`${ns}:` + f.rel.replace(/\.png$/, ''), f.path);
    }
  }
  return { blockstates, models, textureIndex };
}

// ---------------- MC 模型展平 ----------------
/** 沿 parent 链合并 textures，取出离叶子最近的 elements，并把 #变量 解析成具体贴图 ID */
export function flattenModel(key, modModels, editorModels) {
  const chain = [];
  let cur = key, guard = 0;
  while (cur && guard++ < 40) {
    const k = norm(cur);
    const m = modModels.has(k) ? modModels.get(k) : (editorModels[k] || editorModels[String(cur)]);
    if (!m) break;
    chain.push({ key: k, m });
    cur = m.parent ? String(m.parent) : null;
  }
  if (!chain.length) return null;

  const tex = {};
  for (const n of chain) Object.assign(tex, n.m.textures || {});
  const resolveVar = (v, d = 0) => {
    if (typeof v !== 'string' || !v.startsWith('#') || d > 8) return v;
    const k = v.slice(1);
    return k in tex ? resolveVar(tex[k], d + 1) : null;
  };
  for (const k of Object.keys(tex)) tex[k] = resolveVar(tex[k]);

  let elements = null, textureSize = null;
  for (let i = chain.length - 1; i >= 0; i--) {
    if (!elements && chain[i].m.elements) elements = chain[i].m.elements;
    if (!textureSize && chain[i].m.texture_size) textureSize = chain[i].m.texture_size;
    if (elements && textureSize) break;
  }
  if (!elements) return { textures: tex, elements: null, textureSize };

  // 渲染器不认 texture_size，UV 一律按 16 归一 → 非 16 的要把 uv 缩放回 16 空间
  const sx = textureSize ? 16 / textureSize[0] : 1;
  const sy = textureSize ? 16 / textureSize[1] : 1;
  const els = elements.map((el) => {
    const faces = {};
    for (const [fk, fv] of Object.entries(el.faces || {})) {
      const t = fv.texture && String(fv.texture).startsWith('#') ? resolveVar(fv.texture) : (fv.texture ? norm(fv.texture) : null);
      const face = { ...fv };
      if (t) face.texture = t; else delete face.texture;
      if (Array.isArray(fv.uv) && (sx !== 1 || sy !== 1)) {
        face.uv = [fv.uv[0] * sx, fv.uv[1] * sy, fv.uv[2] * sx, fv.uv[3] * sy];
      }
      faces[fk] = face;
    }
    return { ...el, faces };
  });
  return { textures: tex, elements: els, textureSize };
}

/** cube_all 等价：单个满立方体且六面同贴图（这种不必移植，省格子） */
function isCubeAll(f) {
  if (!f || !f.elements || f.elements.length !== 1) return false;
  const e = f.elements[0];
  if (!e.from || !e.to) return false;
  const [x0, y0, z0] = e.from, [x1, y1, z1] = e.to;
  if (x0 !== 0 || y0 !== 0 || z0 !== 0 || x1 !== 16 || y1 !== 16 || z1 !== 16) return false;
  const ts = new Set(Object.values(e.faces || {}).map((v) => v && v.texture));
  return ts.size === 1 && !ts.has(undefined);
}

export const modelKeyFor = (modid, modelId) => `block/mt_${sanitize(modid)}_${sanitize(norm(modelId))}`;

// ---------------- 几何构建 ----------------
/**
 * @returns {{ defs:Object, models:Object, texNeed:Map<string,{src:string,blocks:number}>,
 *             blockTex:Map<string,Set<string>>, ported:Set<string>, cube:Set<string>, missing:Array }}
 */
export function buildGeometry(modid, blockIds, assets, editorModels, fallbackTex = new Map(), airBlocks = new Set()) {
  const { blockstates, models: modModels, textureIndex } = assets;
  const outModels = {};
  const defs = {};
  const texNeed = new Map();      // texId -> {src, blocks}
  const blockTex = new Map();     // blockId -> Set(texId)
  const ported = new Set();
  const cube = new Set();
  const missing = [];
  const air = new Set();

  const noteTex = (blockId, texId) => {
    if (!texId) return;
    if (!blockTex.has(blockId)) blockTex.set(blockId, new Set());
    if (!blockTex.get(blockId).has(texId)) {
      blockTex.get(blockId).add(texId);
      const e = texNeed.get(texId) || { src: null, blocks: 0 };
      e.blocks++;
      texNeed.set(texId, e);
    }
  };

  // 解析失败的方块登记兜底贴图，保证它至少能渲染成带贴图的立方体而不是洋红
  const fail = (blockId) => {
    missing.push(blockId);
    const fb = fallbackTex.get(blockId);
    if (!fb) return;
    const t = norm(fb);
    noteTex(blockId, t);
    const e = texNeed.get(t) || { src: null, blocks: 0 };
    if (!e.src) e.src = textureIndex.get(t) || null;
    texNeed.set(t, e);
  };

  for (const blockId of blockIds) {
    const nsPrefix = `${modid}:`;

    // 隐形技术方块（copycat_panel / crushing_wheel_controller / fake_track / water_wheel_structure…）：
    // 模型链最终落到 minecraft:block/air，没有可解析贴图。直接指向 block/air（空网格 = 真隐形），
    // 既不占图集格子，也不会在蓝图里留一个洋红立方体。
    if (airBlocks.has(blockId) || airBlocks.has(blockId.replace(nsPrefix, ''))) {
      defs[blockId] = { variants: { '': [{ model: 'minecraft:block/air' }] } };
      // props 由 applyModModels 统一写（buildGeometry 里没有 props 局部变量）
      air.add(blockId);
      continue;
    }

    if (!blockId.startsWith(nsPrefix)) { fail(blockId); continue; }
    const name = blockId.slice(nsPrefix.length);
    const bs = blockstates.get(name);
    if (!bs) { fail(blockId); continue; }

    // 收集本方块所有变体引用的模型
    const refs = [];
    const collectRefs = (entry) => {
      const arr = Array.isArray(entry) ? entry : [entry];
      for (const e of arr) if (e && e.model) refs.push(e.model);
    };
    if (bs.variants) for (const v of Object.values(bs.variants)) collectRefs(v);
    if (bs.multipart) for (const p of bs.multipart) collectRefs(p.apply);
    if (!refs.length) { fail(blockId); continue; }

    const first = flattenModel(refs[0], modModels, editorModels);
    if (!first || !first.elements) { fail(blockId); continue; }

    // 逐个模型展平并写出（渲染器找不到模型会抛异常，必须全部落地）
    const keyOf = new Map();
    let ok = true;
    for (const ref of refs) {
      if (keyOf.has(ref)) continue;
      const f = flattenModel(ref, modModels, editorModels);
      if (!f || !f.elements) { ok = false; continue; }
      const mk = modelKeyFor(modid, ref);
      keyOf.set(ref, mk);
      outModels[mk] = { elements: f.elements };
      if (f.textures && f.textures.particle) outModels[mk].textures = { particle: norm(f.textures.particle) };
      for (const el of f.elements) {
        for (const fv of Object.values(el.faces || {})) {
          if (fv && fv.texture) {
            const t = norm(fv.texture);
            noteTex(blockId, t);
            const e = texNeed.get(t) || { src: null, blocks: 0 };
            if (!e.src) e.src = textureIndex.get(t) || (t.startsWith(`${modid}:`) ? null : null);
            texNeed.set(t, e);
          }
        }
      }
    }
    if (!ok) { fail(blockId); continue; }

    if (isCubeAll(first)) {
      cube.add(blockId);
      // 仍写成真实模型（等价但保持一份），只为贴图占格
    } else {
      ported.add(blockId);
    }

    // 写 defs：变体模型引用换成编辑器键，兜底 "" 放最后
    if (bs.variants) {
      const variants = {};
      for (const [k, v] of Object.entries(bs.variants)) {
        if (k === '') continue;
        const arr = Array.isArray(v) ? v : [v];
        variants[k] = arr.filter((e) => e && e.model && keyOf.has(e.model))
          .map((e) => ({ ...e, model: `minecraft:${keyOf.get(e.model)}` }));
      }
      // 兜底 "" 必须也换成编辑器键，否则 defs 里会残留原始 create:block/xxx（渲染器找不到会抛异常）
      const fb = (Array.isArray(bs.variants['']) ? bs.variants[''] : (bs.variants[''] ? [bs.variants['']] : []))
        .filter((e) => e && e.model && keyOf.has(e.model))
        .map((e) => ({ ...e, model: `minecraft:${keyOf.get(e.model)}` }));
      const firstVariant = Object.values(variants)[0];
      const finalFb = fb.length ? fb : (firstVariant ? [firstVariant[0]] : []);
      for (const e of finalFb) variants[''] = [{ ...e }];
      defs[blockId] = { variants };
    } else if (bs.multipart) {
      defs[blockId] = {
        multipart: bs.multipart
          .map((p) => {
            const arr = Array.isArray(p.apply) ? p.apply : [p.apply];
            const apply = arr.filter((e) => e && e.model && keyOf.has(e.model))
              .map((e) => ({ ...e, model: `minecraft:${keyOf.get(e.model)}` }));
            return apply.length ? { ...p, apply } : null;
          })
          .filter(Boolean),
      };
    }
  }
  return { defs, models: outModels, texNeed, blockTex, ported, cube, missing, air };
}

// ---------------- 图集写入 ----------------
function loadAtlasCanvas() {
  const dec = decodePng(fs.readFileSync(ATLAS_PNG));
  if (dec.h > MAX_ATLAS_HEIGHT) throw new Error(`图集高度 ${dec.h} 超过 ${MAX_ATLAS_HEIGHT}`);
  const canvas = Buffer.alloc(dec.w * MAX_ATLAS_HEIGHT * 4);
  dec.rgba.copy(canvas, 0, 0, dec.w * dec.h * 4);
  return { w: dec.w, contentH: dec.h, canvas };
}
function blit(dst, dstW, src, dx, dy) {
  for (let y = 0; y < TILE; y++) {
    const ty = dy + y; if (ty < 0 || ty >= MAX_ATLAS_HEIGHT) continue;
    for (let x = 0; x < TILE; x++) {
      const tx = dx + x; if (tx < 0 || tx >= dstW) continue;
      const s = (y * TILE + x) * 4, d = (ty * dstW + tx) * 4;
      dst[d] = src[s]; dst[d + 1] = src[s + 1]; dst[d + 2] = src[s + 2]; dst[d + 3] = src[s + 3];
    }
  }
}
function blank(dst, dstW, x, y) {
  for (let ty = y; ty < y + TILE && ty < MAX_ATLAS_HEIGHT; ty++)
    for (let tx = x; tx < x + TILE && tx < dstW; tx++) {
      const d = (ty * dstW + tx) * 4; dst[d] = 0; dst[d + 1] = 0; dst[d + 2] = 0; dst[d + 3] = 0;
    }
}
function tile16(p) {
  const dec = decodePng(fs.readFileSync(p));
  if (dec.w === TILE && dec.h === TILE) return dec.rgba;
  if (dec.w === TILE) return dec.rgba.subarray(0, TILE * TILE * 4);   // 动画竖条取第一帧
  const side = Math.min(dec.w, dec.h);
  return resizeNearest(dec.rgba.subarray(0, side * dec.w * 4), dec.w, side, TILE, TILE);
}

/**
 * 主入口：把模组几何 + 贴图写进编辑器资源包（幂等）。
 * @param {string} modid
 * @param {string[]} blockIds 需要处理的方块 ID
 * @param {{dryRun?:boolean, ns?:string}} [opts]
 */
export function applyModModels(modid, blockIds, opts = {}) {
  const { dryRun = false, ns = modid } = opts;
  const assets = loadModAssets(modid, ns);
  const editorModels = readJson(BLOCK_MODELS);
  // 兜底贴图取自 manifest 的 blockTextures（老装载器挑的那张），保证每个方块都有退路
  const fallbackTex = new Map();
  const airBlocks = new Set();
  const mp = path.join(IMPORT_DIR, `${modid}.manifest.json`);
  if (fs.existsSync(mp)) {
    try {
      const man = readJson(mp);
      for (const b of man.blockTextures || []) if (b && b.blockId && b.texId) fallbackTex.set(b.blockId, b.texId);
      for (const id of man.airBlocks || []) airBlocks.add(id);
    } catch { /* manifest 坏了就算了 */ }
  }
  const geo = buildGeometry(modid, blockIds, assets, editorModels, fallbackTex, airBlocks);

  const uv = readJson(ATLAS_UV);
  const models = readJson(BLOCK_MODELS);
  const defs = readJson(BLOCK_DEFS);
  const props = readJson(BLOCK_PROPS);
  const registry = loadRegistry();

  // 幂等：撤掉本模组旧占用
  const prev = registry.mods[modid];
  if (prev) {
    for (const k of Object.keys(prev.tiles || {})) delete uv[k];
    for (const m of prev.models || []) delete models[m];
    for (const b of prev.blockIds || []) { delete defs[b]; delete props[b]; }
    delete registry.mods[modid];
  }

  // ---- 格子分配：先保底每方块一张，再按共享度补齐 ----
  const atlas = loadAtlasCanvas();
  const baseBottom = registry.baseBottom ?? Math.min(
    Object.values(uv).reduce((m, v) => (Array.isArray(v) && v.length >= 4 ? Math.max(m, v[1] + Math.min(v[3], v[2])) : m), 0),
    atlas.contentH);
  const perRow = Math.floor(atlas.w / TILE);
  const rowCount = Math.floor((MAX_ATLAS_HEIGHT - baseBottom) / TILE);
  const capacity = perRow * rowCount;

  // 需要的模组贴图（原版贴图复用已有条目，不占格）
  const needed = [...geo.texNeed.entries()].filter(([t]) => t.startsWith(`${modid}:`) || !t.includes(':'));
  const modTex = needed.filter(([t, v]) => t.startsWith(`${modid}:`) && v.src);
  const noSrc = needed.filter(([t, v]) => !v.src && t.startsWith(`${modid}:`)).map(([t]) => t);

  // 保底：每个方块挑一张共享度最高的贴图
  const reserved = new Set();
  for (const [blockId, set] of geo.blockTex) {
    let best = null, bestN = -1;
    for (const t of set) {
      if (!t.startsWith(`${modid}:`) || !(geo.texNeed.get(t) || {}).src) continue;
      const n = geo.texNeed.get(t).blocks;
      if (n > bestN) { bestN = n; best = t; }
    }
    if (best) reserved.add(best);
  }
  // 其余按共享度降序
  const rest = modTex.map(([t, v]) => t).filter((t) => !reserved.has(t))
    .sort((a, b) => (geo.texNeed.get(b).blocks - geo.texNeed.get(a).blocks));
  const order = [...reserved, ...rest];
  const allocated = new Set(order.slice(0, capacity));
  const overflow = order.length - allocated.size;

  // 判断哪些方块能完整移植（其全部贴图都已分配或是原版已有条目）
  const canPort = (blockId) => {
    const set = geo.blockTex.get(blockId);
    if (!set) return false;
    for (const t of set) {
      if (t.startsWith(`${modid}:`)) { if (!allocated.has(t)) return false; }
      else if (!(t in uv)) return false;
    }
    return true;
  };

  if (dryRun) {
    let portedN = 0, fallbackN = 0, noneN = 0, airN = 0;
    for (const blockId of blockIds) {
      if (geo.air.has(blockId)) { airN++; continue; }
      if (canPort(blockId) && geo.defs[blockId]) { portedN++; continue; }
      const set = geo.blockTex.get(blockId);
      const has = set && ([...set].some((t) => allocated.has(t)) || [...set].some((t) => t in uv));
      if (has) fallbackN++; else noneN++;
    }
    return {
      ok: true, dryRun: true, modid,
      blocks: blockIds.length, ported: portedN, fallback: fallbackN, air: airN, uncovered: noneN,
      cube: geo.cube.size, missing: geo.missing.length,
      texturesNeeded: modTex.length, capacity, overflow, noSrc,
      models: Object.keys(geo.models).length,
      baseBottom, atlasSize: `${atlas.w}x${atlas.contentH}`,
    };
  }

  const backedUp = ensureBackup();
  // 磁盘快照含上一次本模组的占用，先剥离掉，剩下的才是「纯原版基线」
  const uvBefore = readJson(ATLAS_UV);
  const modelsBefore = readJson(BLOCK_MODELS);
  const defsBefore = readJson(BLOCK_DEFS);
  const propsBefore = readJson(BLOCK_PROPS);
  if (prev) {
    for (const k of Object.keys(prev.tiles || {})) delete uvBefore[k];
    for (const m of prev.models || []) delete modelsBefore[m];
    for (const b of prev.blockIds || []) { delete defsBefore[b]; delete propsBefore[b]; }
  }

  // ---- 写贴图 ----
  const tiles = {};
  let slot = 0, downscaled = 0;
  for (const texId of order) {
    if (!allocated.has(texId)) continue;
    if (slot >= capacity) break;
    const x = (slot % perRow) * TILE;
    const y = baseBottom + Math.floor(slot / perRow) * TILE;
    const src = geo.texNeed.get(texId).src;
    const dec = decodePng(fs.readFileSync(src));
    if (dec.w !== TILE || dec.h !== TILE) downscaled++;
    blit(atlas.canvas, atlas.w, tile16(src), x, y);
    uv[texId] = [x, y, TILE, TILE];
    tiles[texId] = [x, y, TILE, TILE];
    slot++;
  }

  // ---- 写模型 / 定义：每个方块要么用真实几何，要么兜底 cube_all（绝不留空 → 不会变洋红）----
  const pickTex = (blockId) => {
    const set = geo.blockTex.get(blockId);
    if (set) {
      for (const t of set) if (allocated.has(t)) return t;
      for (const t of set) if (t in uv) return t;      // 原版贴图可直接复用
    }
    return null;
  };
  const finalDefs = {};
  const fbModels = {};
  let written = 0, portedNow = 0, fallbackNow = 0, airNow = 0;
  for (const blockId of blockIds) {
    // 隐形方块：defs 指向 block/air，不占贴图格子，但仍要写进 registry 以便禁用时精确回滚
    if (geo.air.has(blockId)) {
      finalDefs[blockId] = geo.defs[blockId];
      airNow++; written++;
      continue;
    }
    if (canPort(blockId) && geo.defs[blockId]) {
      finalDefs[blockId] = geo.defs[blockId];
      if (geo.ported.has(blockId)) portedNow++;
      written++;
      continue;
    }
    const texId = pickTex(blockId);
    if (!texId) continue;
    const mk = `block/mt_${sanitize(modid)}_fb_${sanitize(texId)}`;
    fbModels[mk] = { parent: 'block/cube_all', textures: { all: texId } };
    finalDefs[blockId] = { variants: { '': [{ model: `minecraft:${mk}` }] } };
    fallbackNow++;
    written++;
  }

  const usedModelKeys = new Set();
  const collect = (e) => {
    const arr = Array.isArray(e) ? e : [e];
    for (const x of arr) if (x && typeof x.model === 'string') usedModelKeys.add(norm(x.model));
  };
  for (const d of Object.values(finalDefs)) {
    if (d.variants) for (const v of Object.values(d.variants)) collect(v);
    if (d.multipart) for (const p of d.multipart) collect(p.apply);
  }
  const modelNames = [];
  for (const [mk, mv] of Object.entries(geo.models)) {
    if (!usedModelKeys.has(mk)) continue;
    models[mk] = mv;
    modelNames.push(mk);
  }
  for (const [mk, mv] of Object.entries(fbModels)) {
    if (!usedModelKeys.has(mk)) continue;
    models[mk] = mv;
    modelNames.push(mk);
  }
  for (const [blockId, d] of Object.entries(finalDefs)) {
    defs[blockId] = d;
    props[blockId] = {};
  }

  // 原版条目零改动断言
  for (const [k, v] of Object.entries(uvBefore)) {
    if (k in uv && JSON.stringify(uv[k]) !== JSON.stringify(v)) throw new Error(`atlas-uv 原版条目被改写: ${k}`);
  }
  for (const [k, v] of Object.entries(modelsBefore)) {
    if (k in models && JSON.stringify(models[k]) !== JSON.stringify(v)) throw new Error(`block-models 原版条目被改写: ${k}`);
  }
  for (const [k, v] of Object.entries(defsBefore)) {
    if (k in defs && JSON.stringify(defs[k]) !== JSON.stringify(v)) throw new Error(`block-definitions 原版条目被改写: ${k}`);
  }

  let maxEnd = baseBottom;
  for (const r of Object.values(tiles)) maxEnd = Math.max(maxEnd, r[1] + r[3]);
  const newHeight = Math.max(baseBottom, maxEnd);

  registry.baseBottom = baseBottom;
  registry.mods[modid] = {
    tiles, models: modelNames, blockIds: Object.keys(finalDefs),
    at: new Date().toISOString(),
  };

  writeAtomic(ATLAS_PNG, encodePng(atlas.w, newHeight, atlas.canvas.subarray(0, atlas.w * newHeight * 4)));
  writeAtomic(ATLAS_UV, JSON.stringify(uv));
  writeAtomic(BLOCK_MODELS, JSON.stringify(models));
  writeAtomic(BLOCK_DEFS, JSON.stringify(defs));
  writeAtomic(BLOCK_PROPS, JSON.stringify(props));
  saveRegistry(registry);

  return {
    ok: true, modid, blocks: blockIds.length, defsWritten: written,
    ported: portedNow, fallback: fallbackNow, air: airNow,
    cube: geo.cube.size, missing: geo.missing.length,
    textures: Object.keys(tiles).length, capacity, overflow, downscaled,
    noSource: noSrc.length, atlasSize: `${atlas.w}x${newHeight}`, backedUp,
  };
}

/** 回滚（禁用/卸载） */
export function revertModModels(modid, opts = {}) {
  const { dryRun = false } = opts;
  const registry = loadRegistry();
  const entry = registry.mods[modid];
  if (!entry) return { ok: true, modid, removed: 0, note: '该模组未占用图集' };
  if (dryRun) return { ok: true, dryRun: true, modid, tiles: Object.keys(entry.tiles || {}).length, blocks: (entry.blockIds || []).length };

  const uv = readJson(ATLAS_UV);
  const models = readJson(BLOCK_MODELS);
  const defs = readJson(BLOCK_DEFS);
  const props = readJson(BLOCK_PROPS);
  const atlas = loadAtlasCanvas();

  for (const [k, r] of Object.entries(entry.tiles || {})) { delete uv[k]; blank(atlas.canvas, atlas.w, r[0], r[1]); }
  for (const m of entry.models || []) delete models[m];
  for (const b of entry.blockIds || []) { delete defs[b]; delete props[b]; }
  delete registry.mods[modid];

  const baseBottom = registry.baseBottom ?? atlas.contentH;
  let maxEnd = baseBottom;
  for (const e of Object.values(registry.mods)) for (const r of Object.values(e.tiles || {})) maxEnd = Math.max(maxEnd, r[1] + r[3]);
  const newHeight = Math.max(baseBottom, maxEnd, 1);

  writeAtomic(ATLAS_PNG, encodePng(atlas.w, newHeight, atlas.canvas.subarray(0, atlas.w * newHeight * 4)));
  writeAtomic(ATLAS_UV, JSON.stringify(uv));
  writeAtomic(BLOCK_MODELS, JSON.stringify(models));
  writeAtomic(BLOCK_DEFS, JSON.stringify(defs));
  writeAtomic(BLOCK_PROPS, JSON.stringify(props));
  saveRegistry(registry);
  return { ok: true, modid, removed: 1, atlasSize: `${atlas.w}x${newHeight}`, remainingMods: Object.keys(registry.mods).length };
}

// ---------------- CLI ----------------
const isMain = process.argv[1] && fileURLToPath(import.meta.url).toLowerCase() === path.resolve(process.argv[1]).toLowerCase();
if (isMain) {
  const argv = process.argv.slice(2);
  const args = { modid: null, revert: false, dryRun: false, ns: null };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === '--revert') args.revert = true;
    else if (x === '--dry-run') args.dryRun = true;
    else if (x === '--modid') args.modid = argv[++i];
    else if (x === '--ns') args.ns = argv[++i];
    else if (x.startsWith('--modid=')) args.modid = x.slice(8);
    else if (x.startsWith('--ns=')) args.ns = x.slice(5);
  }
  (async () => {
    try {
      if (!args.modid) throw new Error('缺少 --modid');
      let out;
      if (args.revert) out = revertModModels(args.modid, { dryRun: args.dryRun });
      else {
        const mp = path.join(IMPORT_DIR, `${args.modid}.manifest.json`);
        const manifest = fs.existsSync(mp) ? readJson(mp) : null;
        const blocks = manifest ? (manifest.blocks || []) : [];
        if (!blocks.length) throw new Error(`manifest 里没有方块清单: ${mp}`);
        out = applyModModels(args.modid, blocks, { dryRun: args.dryRun, ns: args.ns || undefined });
      }
      console.log('RESULT_JSON=' + JSON.stringify(out));
    } catch (e) {
      console.log('RESULT_JSON=' + JSON.stringify({ ok: false, error: String((e && e.message) || e) }));
      process.exitCode = 1;
    }
  })();
}

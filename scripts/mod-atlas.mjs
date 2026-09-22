#!/usr/bin/env node
// mod-atlas.mjs — 把模组贴图注入编辑器 3D 图集资源包（mcmeta/）
//
// 背景（务必先读）：
//   编辑器的 3D 预览**不逐方块读取 images/ 或 block-textures/ 的 PNG**，
//   而是读一份预烘焙资源包 mcmeta/：
//     atlas.png                      贴图图集（所有贴图拼成一张大图）
//     atlas-uv.json                  贴图 ID → 图集内 [x, y, w, h]
//     block-models.json              方块模型（parent + textures）
//     block-definitions.json         方块 blockstate 变体（方块 ID → 模型）
//     block-default-properties.json  方块默认属性
//   渲染器对**在 block-definitions 里找不到定义**的方块会兜底成纯洋红立方体
//   （渲染器源码里顶点色 `t = [1, 0, 1]`）。所以只往 images/ 与 block-textures/
//   拷 PNG 是不够的，必须同时扩展图集与模型/定义表。
//
// 三条硬约束：
//   1) 容量：可用条带 = 原版内容底部（通常 1992）到高度上限（默认 4096）。
//      加载器按 pow2(实际图片高) 现算 UV（chunk 7578），所以增高是安全的：原版像素不动、UV 一致重算。
//      详见 mod-models.mjs 中 MAX_ATLAS_HEIGHT 的注释，以及 .tmp/atlas-loader-sim.mjs 的逐像素断言。
//   2) 绝不覆盖原版条目：贴图 ID 与原版 atlas-uv 键冲突时改用私有别名 `modtex:*`，
//      模型里指向别名。写盘前还有一道「原版条目零改动」断言兜底。
//   3) 幂等：重复注入先撤销自己的旧占用；登记表 mcmeta/.mod-atlas.json 供禁用/卸载精确回滚。
//
// 每张贴图占 16x16 一格；非 16x16 的降采样到 16x16，动画竖条只取第一帧。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, encodePng, resizeNearest } from './png.mjs';
import { MCMETA_DIR, ATLAS_PNG, ATLAS_UV, BLOCK_MODELS, BLOCK_DEFS, BLOCK_PROPS, ATLAS_REGISTRY, IMPORT_DIR, isMainModule } from './mod-shared.mjs';

export const TILE = 16;
// 内容带高度上限。UV = 像素 / pow2(实际图片高)，增高只会让 H 2048→4096 并整体重算 UV，
// 原版不受影响（.tmp/atlas-loader-sim.mjs 逐像素验证）。容量 1992..4096 = 16768 格。
export const MAX_ATLAS_HEIGHT = Number(process.env.MOD_ATLAS_MAX_HEIGHT) || 4096;
const BACKUP_DIR = path.join(MCMETA_DIR, '.mod-backup');
const BACKUP_FILES = ['atlas.png', 'atlas-uv.json', 'block-models.json', 'block-definitions.json', 'block-default-properties.json'];

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

function writeAtomic(p, buf) {
  const tmp = p + '.writing';
  fs.writeFileSync(tmp, buf);
  fs.renameSync(tmp, p);
}

function ensureBackup() {
  if (fs.existsSync(path.join(BACKUP_DIR, 'atlas.png'))) return false;
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  for (const f of BACKUP_FILES) {
    const src = path.join(MCMETA_DIR, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(BACKUP_DIR, f));
  }
  return true;
}

function loadRegistry() {
  if (!fs.existsSync(ATLAS_REGISTRY)) return { version: 1, baseBottom: null, mods: {} };
  try { return { version: 1, baseBottom: null, mods: {}, ...readJson(ATLAS_REGISTRY) }; }
  catch { return { version: 1, baseBottom: null, mods: {} }; }
}
const saveRegistry = (r) => writeAtomic(ATLAS_REGISTRY, JSON.stringify(r, null, 2));

const sanitize = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 60);
// 模型表键沿用原版惯例：不带命名空间（如 block/cube_all）；defs 里的引用才带 minecraft: 前缀
const modelNameFor = (atlasId) => `block/mt_${sanitize(atlasId)}`;

function loadAtlasCanvas() {
  const dec = decodePng(fs.readFileSync(ATLAS_PNG));
  if (dec.h > MAX_ATLAS_HEIGHT) throw new Error(`atlas.png 高度 ${dec.h} 已超过上限 ${MAX_ATLAS_HEIGHT}（可用 MOD_ATLAS_MAX_HEIGHT 覆盖）`);
  const canvas = Buffer.alloc(dec.w * MAX_ATLAS_HEIGHT * 4);
  dec.rgba.copy(canvas, 0, 0, dec.w * dec.h * 4);
  return { w: dec.w, contentH: dec.h, canvas };
}

function blit(dst, dstW, src, dx, dy) {
  for (let y = 0; y < TILE; y++) {
    const ty = dy + y;
    if (ty < 0 || ty >= MAX_ATLAS_HEIGHT) continue;
    for (let x = 0; x < TILE; x++) {
      const tx = dx + x;
      if (tx < 0 || tx >= dstW) continue;
      const s = (y * TILE + x) * 4;
      const d = (ty * dstW + tx) * 4;
      dst[d] = src[s]; dst[d + 1] = src[s + 1]; dst[d + 2] = src[s + 2]; dst[d + 3] = src[s + 3];
    }
  }
}

function blank(dst, dstW, x, y) {
  for (let ty = y; ty < y + TILE && ty < MAX_ATLAS_HEIGHT; ty++) {
    for (let tx = x; tx < x + TILE && tx < dstW; tx++) {
      const d = (ty * dstW + tx) * 4;
      dst[d] = 0; dst[d + 1] = 0; dst[d + 2] = 0; dst[d + 3] = 0;
    }
  }
}

function resolvePngSource(modid, b) {
  if (b.pngSource && fs.existsSync(b.pngSource)) return b.pngSource;
  if (b.pngTarget) {
    const cached = path.join(IMPORT_DIR, modid, b.pngTarget);
    if (fs.existsSync(cached)) return cached;
  }
  return null;
}

function atlasContentBottom(uv) {
  let maxY = 0;
  for (const v of Object.values(uv)) if (Array.isArray(v) && v.length >= 4) maxY = Math.max(maxY, v[1] + v[3]);
  return maxY;
}

// 与上游条目冲突时改用私有别名，绝不覆盖
function pickAtlasId(texId, occupied) {
  if (!occupied.has(texId)) { occupied.add(texId); return texId; }
  const base = `modtex:${sanitize(texId)}`;
  let id = base, n = 2;
  while (occupied.has(id)) id = `${base}_${n++}`;
  occupied.add(id);
  return id;
}

// 写盘前的兜底断言：原版条目必须零改动
function assertNoClobber(before, after, label) {
  for (const k of Object.keys(before)) {
    if (!(k in after)) throw new Error(`${label} 原版条目被删除: ${k}`);
    if (JSON.stringify(before[k]) !== JSON.stringify(after[k])) throw new Error(`${label} 原版条目被改写: ${k}`);
  }
}

/**
 * 把某个模组的贴图/模型/定义写进图集资源包（幂等）。
 * @param {string} modid
 * @param {Array<{blockId:string,texId:string,pngTarget?:string,pngSource?:string}>} blocks
 * @param {{dryRun?:boolean}} [opts]
 */
export function applyModAtlas(modid, blocks, opts = {}) {
  const { dryRun = false } = opts;

  const uv = readJson(ATLAS_UV);
  const models = readJson(BLOCK_MODELS);
  const defs = readJson(BLOCK_DEFS);
  const props = readJson(BLOCK_PROPS);
  const registry = loadRegistry();

  // ---- 1) 幂等：先在内存里撤掉本模组的旧占用 ----
  const prev = registry.mods[modid];
  if (prev) {
    for (const key of Object.keys(prev.tiles || {})) delete uv[key];
    for (const m of prev.models || []) delete models[m];
    for (const b of prev.blockIds || []) { delete defs[b]; delete props[b]; }
    delete registry.mods[modid];
  }

  // ---- 2) 规划：texId → atlasId（冲突则别名），再按源 PNG 去重 ----
  const occupied = new Set(Object.keys(uv));   // 撤掉旧占用后的现存键，写回时不会再被覆盖
  const atlasIdOfTex = new Map();
  const srcOfAtlasId = new Map();
  const atlasIdOfBlock = new Map();
  const noPng = [];
  for (const b of blocks || []) {
    if (!b || !b.blockId || !b.texId) continue;
    const src = resolvePngSource(modid, b);
    if (!src) { noPng.push(b.blockId); continue; }
    let atlasId = atlasIdOfTex.get(b.texId);
    if (!atlasId) { atlasId = pickAtlasId(b.texId, occupied); atlasIdOfTex.set(b.texId, atlasId); }
    if (!srcOfAtlasId.has(atlasId)) srcOfAtlasId.set(atlasId, src);
    atlasIdOfBlock.set(b.blockId, atlasId);
  }
  if (!atlasIdOfTex.size) {
    return { ok: true, modid, tiles: 0, note: '该模组没有可注入的贴图', blocksWithoutPng: noPng.length };
  }

  // ---- 3) 容量 ----
  const atlas = loadAtlasCanvas();
  if (registry.baseBottom == null) registry.baseBottom = Math.min(atlasContentBottom(uv), atlas.contentH) || atlas.contentH;
  const baseBottom = registry.baseBottom;
  const perRow = Math.floor(atlas.w / TILE);
  const rowCount = Math.floor((MAX_ATLAS_HEIGHT - baseBottom) / TILE);
  const total = perRow * rowCount;
  const used = new Set();
  for (const entry of Object.values(registry.mods)) {
    for (const rect of Object.values(entry.tiles || {})) {
      const r = Math.floor((rect[1] - baseBottom) / TILE), c = Math.floor(rect[0] / TILE);
      if (r >= 0 && c >= 0 && r < rowCount && c < perRow) used.add(r * perRow + c);
    }
  }
  const freeSlots = [];
  for (let s = 0; s < total; s++) if (!used.has(s)) freeSlots.push(s);
  // 本模组的格子也要从空白条带里重新分配，因此需求 = 去重后的源 PNG 数
  const needTiles = srcOfAtlasId.size;
  if (freeSlots.length < needTiles) {
    throw new Error(
      `图集空余不足：需要 ${needTiles} 格，可用 ${freeSlots.length} 格（共 ${total} 格）。` +
      `图集已封顶 ${MAX_ATLAS_HEIGHT}px（可用 MOD_ATLAS_MAX_HEIGHT 提高上限，代价是运行时图集显存翻倍）。请先卸载其它模组。`);
  }

  if (dryRun) {
    return {
      ok: true, dryRun: true, modid, tiles: needTiles,
      textureIds: atlasIdOfTex.size, blocks: atlasIdOfBlock.size, blocksWithoutPng: noPng.length,
      aliased: [...atlasIdOfTex.values()].filter(v => v.startsWith('modtex:')).length,
      slotCapacity: total, slotFree: freeSlots.length, baseBottom, atlasSize: `${atlas.w}x${atlas.contentH}`,
    };
  }

  const backedUp = ensureBackup();
  // 磁盘现状快照（含上一次本模组的占用），先把本模组自己的痕迹摘掉，
  // 剩下的就是**纯原版基线**，用于最后的「原版条目零改动」断言。
  const uvBefore = readJson(ATLAS_UV);
  const modelsBefore = readJson(BLOCK_MODELS);
  const defsBefore = readJson(BLOCK_DEFS);
  const propsBefore = readJson(BLOCK_PROPS);
  if (prev) {
    for (const key of Object.keys(prev.tiles || {})) delete uvBefore[key];
    for (const m of prev.models || []) delete modelsBefore[m];
    for (const b of prev.blockIds || []) { delete defsBefore[b]; delete propsBefore[b]; }
  }

  // ---- 4) 贴图：按源 PNG 去重后逐格写入 ----
  const bySrc = new Map();
  for (const [atlasId, src] of srcOfAtlasId) {
    if (!bySrc.has(src)) bySrc.set(src, []);
    bySrc.get(src).push(atlasId);
  }

  const tiles = {};
  const modelNames = [];
  const nameToAtlasId = new Map();
  const modelNameOfAtlasId = new Map();   // defs 必须引用**去重后**的模型名，否则会指向别人的贴图
  let slotIdx = 0, downscaled = 0;

  for (const [src, atlasIds] of bySrc) {
    const slot = freeSlots[slotIdx++];
    const x = (slot % perRow) * TILE;
    const y = baseBottom + Math.floor(slot / perRow) * TILE;

    const dec = decodePng(fs.readFileSync(src));
    let pix;
    if (dec.w === TILE && dec.h === TILE) pix = dec.rgba;
    else if (dec.w === TILE) pix = dec.rgba.subarray(0, TILE * TILE * 4);          // 动画竖条取第一帧
    else {
      const side = Math.min(dec.w, dec.h);                                          // 取左上方形帧再缩放
      pix = resizeNearest(dec.rgba.subarray(0, side * dec.w * 4), dec.w, side, TILE, TILE);
      downscaled++;
    }
    blit(atlas.canvas, atlas.w, pix, x, y);

    for (const atlasId of atlasIds) {
      uv[atlasId] = [x, y, TILE, TILE];
      tiles[atlasId] = [x, y, TILE, TILE];

      let name = modelNameFor(atlasId);
      while (nameToAtlasId.has(name) && nameToAtlasId.get(name) !== atlasId) name += '_x';
      nameToAtlasId.set(name, atlasId);
      modelNameOfAtlasId.set(atlasId, name);
      modelNames.push(name);
      models[name] = { parent: 'block/cube_all', textures: { all: atlasId } };
    }
  }

  // ---- 5) 方块定义：键必须是带命名空间的方块 ID（如 create:andesite_block）。
  //      渲染器默认给无前缀键强加 minecraft:，所以需要 patch-editor-ns.mjs 放开命名空间。
  for (const [blockId, atlasId] of atlasIdOfBlock) {
    const model = modelNameOfAtlasId.get(atlasId);
    if (!tiles[atlasId] || !model) continue;
    defs[blockId] = { variants: { '': [{ model: `minecraft:${model}` }] } };
    props[blockId] = {};
  }

  // ---- 6) 兜底断言 + 写盘 ----
  // uvBefore 已剥离本模组上次占用，剩下的就是纯原版基线
  assertNoClobber(uvBefore, uv, 'atlas-uv');
  assertNoClobber(modelsBefore, models, 'block-models');
  assertNoClobber(defsBefore, defs, 'block-definitions');
  assertNoClobber(propsBefore, props, 'block-default-properties');

  let usedMaxEnd = baseBottom;
  for (const rect of Object.values(tiles)) usedMaxEnd = Math.max(usedMaxEnd, rect[1] + rect[3]);
  const newHeight = Math.max(baseBottom, usedMaxEnd);

  registry.baseBottom = baseBottom;
  registry.mods[modid] = {
    tiles, models: modelNames, blockIds: [...atlasIdOfBlock.keys()],
    textureIds: [...atlasIdOfTex.keys()], at: new Date().toISOString(),
  };

  writeAtomic(ATLAS_PNG, encodePng(atlas.w, newHeight, atlas.canvas.subarray(0, atlas.w * newHeight * 4)));
  writeAtomic(ATLAS_UV, JSON.stringify(uv));
  writeAtomic(BLOCK_MODELS, JSON.stringify(models));
  writeAtomic(BLOCK_DEFS, JSON.stringify(defs));
  writeAtomic(BLOCK_PROPS, JSON.stringify(props));
  saveRegistry(registry);

  return {
    ok: true, modid, tiles: needTiles, textureIds: atlasIdOfTex.size, blocks: atlasIdOfBlock.size,
    blocksWithoutPng: noPng.length, aliased: [...atlasIdOfTex.values()].filter(v => v.startsWith('modtex:')).length,
    atlasSize: `${atlas.w}x${newHeight}`, downscaled, slotCapacity: total,
    slotFree: freeSlots.length - needTiles, backedUp,
  };
}

/** 撤销某个模组在图集资源包里的全部痕迹（禁用 / 卸载时调用） */
export function revertModAtlas(modid, opts = {}) {
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

  for (const [atlasId, rect] of Object.entries(entry.tiles || {})) {
    delete uv[atlasId];
    blank(atlas.canvas, atlas.w, rect[0], rect[1]);
  }
  for (const m of entry.models || []) delete models[m];
  for (const b of entry.blockIds || []) { delete defs[b]; delete props[b]; }

  delete registry.mods[modid];
  const baseBottom = registry.baseBottom ?? atlas.contentH;
  let maxEnd = baseBottom;
  for (const e of Object.values(registry.mods)) {
    for (const rect of Object.values(e.tiles || {})) maxEnd = Math.max(maxEnd, rect[1] + rect[3]);
  }
  const newHeight = Math.max(baseBottom, maxEnd, 1);

  writeAtomic(ATLAS_PNG, encodePng(atlas.w, newHeight, atlas.canvas.subarray(0, atlas.w * newHeight * 4)));
  writeAtomic(ATLAS_UV, JSON.stringify(uv));
  writeAtomic(BLOCK_MODELS, JSON.stringify(models));
  writeAtomic(BLOCK_DEFS, JSON.stringify(defs));
  writeAtomic(BLOCK_PROPS, JSON.stringify(props));
  saveRegistry(registry);

  return { ok: true, modid, removed: 1, atlasSize: `${atlas.w}x${newHeight}`, remainingMods: Object.keys(registry.mods).length };
}

/** 从 manifest 取 blockId → texId 映射；缺失时回退重新解析原始 jar 并补写回 manifest */
export async function resolveBlockTextures(modid, { jar = null } = {}) {
  const mp = path.join(IMPORT_DIR, `${modid}.manifest.json`);
  if (!fs.existsSync(mp)) throw new Error(`找不到 manifest: ${mp}`);
  const manifest = readJson(mp);
  if (Array.isArray(manifest.blockTextures) && manifest.blockTextures.length) {
    return { manifest, blocks: manifest.blockTextures };
  }
  const jarPath = jar || (manifest.source && fs.existsSync(manifest.source) ? manifest.source : null);
  if (!jarPath) {
    throw new Error(`manifest 里没有 blockTextures，且原始 jar 已不可用（source=${manifest.source || '空'}）。请用 --jar 指定 jar。`);
  }
  const { extractJar, parseMod } = await import('./mod-loader.mjs');
  const dir = extractJar(jarPath);
  try {
    const parsed = parseMod(dir);
    const blocks = parsed.blocks
      .filter(b => b.modid === modid || parsed.modid === modid)
      .map(b => ({ blockId: b.blockId, texId: b.texId, pngTarget: b.pngTarget }));
    manifest.blockTextures = blocks;
    writeAtomic(mp, JSON.stringify(manifest, null, 2));
    return { manifest, blocks };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

export function atlasInfo() {
  const registry = loadRegistry();
  const atlas = loadAtlasCanvas();
  const baseBottom = registry.baseBottom ?? atlas.contentH;
  const perRow = Math.floor(atlas.w / TILE);
  const rowCount = Math.floor((MAX_ATLAS_HEIGHT - baseBottom) / TILE);
  const total = perRow * rowCount;
  const used = new Set();
  for (const e of Object.values(registry.mods)) for (const rect of Object.values(e.tiles || {})) used.add(rect.join(','));
  return {
    atlas: `${atlas.w}x${atlas.contentH}`, baseBottom, slotTotal: total, slotUsed: used.size,
    slotFree: total - used.size, perRow, rowCount,
    mods: Object.entries(registry.mods).map(([k, v]) => `${k}(${Object.keys(v.tiles || {}).length})`),
  };
}

/** 把编辑器 chunk 恢复成原版图集资源包（调试/回滚用） */
export function restoreBaseline() {
  const restored = [];
  for (const f of BACKUP_FILES) {
    const src = path.join(BACKUP_DIR, f);
    if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(MCMETA_DIR, f)); restored.push(f); }
  }
  if (fs.existsSync(ATLAS_REGISTRY)) fs.rmSync(ATLAS_REGISTRY);
  return { ok: true, restored };
}

// ---------------- CLI ----------------
const isMain = isMainModule(import.meta.url);
if (isMain) {
  const argv = process.argv.slice(2);
  const args = { modid: null, revert: false, dryRun: false, info: false, restore: false, jar: null };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === '--revert') args.revert = true;
    else if (x === '--dry-run') args.dryRun = true;
    else if (x === '--info') args.info = true;
    else if (x === '--restore-baseline') args.restore = true;
    else if (x === '--modid') args.modid = argv[++i];
    else if (x === '--jar') args.jar = argv[++i];
    else if (x.startsWith('--modid=')) args.modid = x.slice(8);
    else if (x.startsWith('--jar=')) args.jar = x.slice(6);
  }
  (async () => {
    try {
      let out;
      if (args.info) out = atlasInfo();
      else if (args.restore) out = restoreBaseline();
      else if (args.revert) {
        if (!args.modid) throw new Error('缺少 --modid');
        out = revertModAtlas(args.modid, { dryRun: args.dryRun });
      } else {
        if (!args.modid) throw new Error('缺少 --modid');
        const { blocks } = await resolveBlockTextures(args.modid, { jar: args.jar });
        out = applyModAtlas(args.modid, blocks, { dryRun: args.dryRun });
      }
      console.log('RESULT_JSON=' + JSON.stringify(out));
    } catch (e) {
      console.log('RESULT_JSON=' + JSON.stringify({ ok: false, error: String((e && e.message) || e) }));
      process.exitCode = 1;
    }
  })();
}

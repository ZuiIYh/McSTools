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
//   1) 图集容量：atlas.png 的高度**可以安全增长**（加载器按 pow2(实际图片高) 现算 UV，见下方长注释），
//      可用空间 = 原版内容底部 (baseBottom，实测 1992) 到高度上限之间的条带，默认 16768 格。
//      仍放不下的贴图由 substitute() 换成同类近似贴图（几何绝不受影响）。
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
import { bakeObjGeometry } from './mod-obj.mjs';
import { MCMETA_DIR, ATLAS_PNG, ATLAS_UV, BLOCK_MODELS, BLOCK_DEFS, BLOCK_PROPS, ATLAS_REGISTRY, IMPORT_DIR,
  modelKeyFor, crossModParentKey, deriveDefaultProps, isMainModule } from './mod-shared.mjs';

export const TILE = 16;
// 模组贴图内容带（baseBottom 以下）的高度上限。
//
// ★ 旧注释写「超过 2048 会让画布 pow2 高度翻倍，把全部原版 UV 算错」——**那个判断是错的**，
//   按渲染器源码（chunk 7578）纠正如下：
//     A = pow2(bitmap.width); H = pow2(bitmap.height);
//     canvas(A, H); ctx.drawImage(bitmap, 0, 0);            // 左上角对齐，不重采样
//     uv = [x/A, y/H, (x+w)/A, (y+h)/H]                     // 加载时按 pow2(实际尺寸) 现算
//   UV 是「像素 ÷ pow2(实际图片尺寸)」，不是烘焙好的定值。所以图片增高只会让 H 从 2048 变 4096，
//   所有 UV 被**一致地重算**；原版像素原地不动（左上角锚定）→ 原版方块完全不受影响。
//   TextureAtlas（chunk 9703）也只要求两轴是 2 的幂，且 part = 16/width 只与宽度有关。
//   已用 .tmp/atlas-loader-sim.mjs 对 2622 条原版条目做逐像素断言验证（增高前后均 ALL PASS）。
//
// 代价：一旦内容超过 2048px，运行时画布由 2048x2048 变 2048x4096（ImageData ≈16MB → 33MB）。
//   图集 PNG 仍按实际占用「懒增长」，没写满 2048 时不会多出一行像素、也没有额外开销。
// 容量：1992..4096 = 131 行 x 128 列 = 16768 格（旧上限只有 384 格）。
// 需要更多时用环境变量 MOD_ATLAS_MAX_HEIGHT=8192（显存再翻倍，谨慎）。
const MAX_ATLAS_HEIGHT = Number(process.env.MOD_ATLAS_MAX_HEIGHT) || 4096;
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
/**
 * Flywheel 的 OBJ 命名约定：模型 JSON 是空占位时，真实几何放在**同名 .obj**。
 * Flywheel 的 PartialModel 按「命名空间:block/xxx」路径去 load「models/block/xxx.obj」，
 * 所以 JSON 里既没有 loader 也没有 model 字段 —— 原来的 neoforge:obj 分支必然漏掉它们
 * （典型：create:block/track/ascending 对应 models/block/track/ascending.obj，蓝图里 44/76 个轨道变体）。
 * 只在链上没有任何 elements 时调用，且必须真的存在同名 .obj，否则返回 null。
 */
function bakeObjByConvention(chain, tex, assets) {
  if (!assets || !assets.objs) return null;
  for (const n of chain) {
    const rel = 'models/' + String(n.key).replace(/^[a-zA-Z0-9_.-]+:/, '') + '.obj';
    const objText = assets.objs.get(rel);
    if (!objText) continue;
    const mtlText = assets.mtls ? (assets.mtls.get(rel.replace(/\.obj$/i, '.mtl')) || null) : null;
    const els = bakeObjGeometry({ objText, mtlText, textures: tex, flipV: true });
    if (els && els.length) return els;
  }
  return null;
}

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
  // neoforge:obj 的外部几何：模型 JSON 里只有 textures，真实顶点在 .obj（材质槽在 .mtl）。
  // 键统一成「去掉命名空间后的相对路径」，如 models/block/blaze_burner/blaze_cage.obj
  const objs = new Map();
  const mtls = new Map();
  const objDir = path.join(base, 'models');
  if (fs.existsSync(objDir)) {
    for (const f of walkFiles(objDir)) {
      if (f.rel.endsWith('.obj')) objs.set('models/' + f.rel, fs.readFileSync(f.path, 'utf8'));
      else if (f.rel.endsWith('.mtl')) mtls.set('models/' + f.rel, fs.readFileSync(f.path, 'utf8'));
    }
  }
  return { blockstates, models, textureIndex, objs, mtls };
}

/**
 * 找出模型链里第一个 `loader: neoforge:obj` 的模型并烘焙真实几何，失败返回 null。
 * `model` 字段形如 `create:models/block/xxx/y.obj` → 去掉命名空间后查 assets.objs。
 */
function bakeObjFromChain(chain, tex, assets) {
  if (!assets || !assets.objs) return null;
  for (const n of chain) {
    const m = n.m;
    if (!m || !String(m.loader || '').includes('obj')) continue;
    const raw = m.model;
    if (typeof raw !== 'string' || !/\.obj$/i.test(raw)) continue;
    const rel = raw.replace(/^[a-zA-Z0-9_.-]+:/, '');
    const objText = assets.objs.get(rel);
    if (!objText) continue;
    const mtlText = assets.mtls ? (assets.mtls.get(rel.replace(/\.obj$/i, '.mtl')) || null) : null;
    const els = bakeObjGeometry({
      objText, mtlText, textures: tex,
      flipV: m.flip_v === undefined ? true : !!m.flip_v,
    });
    if (els && els.length) return els;
  }
  return null;
}

// ---------------- MC 模型展平 ----------------
/** 沿 parent 链合并 textures，取出离叶子最近的 elements，并把 #变量 解析成具体贴图 ID */
export function flattenModel(key, modModels, editorModels, assets) {
  const chain = [];
  let cur = key, guard = 0;
  while (cur && guard++ < 40) {
    const k = norm(cur);
    // 本模组 → 编辑器原版/已移植条目 → **跨模组 parent**（如 create_connected 继承 create:block/clutch/block）
    const xmod = crossModParentKey(k);
    const m = modModels.has(k) ? modModels.get(k)
      : (editorModels[k] || editorModels[String(cur)] || (xmod ? editorModels[xmod] : null));
    if (!m) break;
    chain.push({ key: k, m });
    cur = m.parent ? String(m.parent) : null;
  }
  if (!chain.length) return null;

  const tex = {};
  // neoforge:composite —— 几何不在顶层 elements，而是分散在 children.* 里。
  // 先把所有子层的 textures 并进来（子层槽名多为 0/1/2 这类数字，与父层不冲突），
  // 这样后面解析 face 的 "#0" 才能命中；elements 交给下面统一收集。
  const childLayers = [];
  for (const n of chain) {
    const ch = n.m && n.m.children;
    if (ch && typeof ch === 'object') {
      for (const c of Object.values(ch)) if (c && typeof c === 'object') childLayers.push(c);
    }
  }
  for (const c of childLayers) Object.assign(tex, c.textures || {});
  // ★ 语义：子模型覆盖父模型 → chain 是【叶子→根】，必须倒序合并，否则父层槽名会盖掉子层
  //   （典型：black_valve_handle 覆盖槽 3 = valve_handle_black，正序合并会退回父层的 _copper）
  for (let i = chain.length - 1; i >= 0; i--) Object.assign(tex, chain[i].m.textures || {});
  const resolveVar = (v, d = 0) => {
    if (typeof v !== 'string' || !v.startsWith('#') || d > 8) return v;
    const k = v.slice(1);
    return k in tex ? resolveVar(tex[k], d + 1) : null;
  };
  for (const k of Object.keys(tex)) tex[k] = resolveVar(tex[k]);

  let elements = null, textureSize = null, objBaked = false;
  // ★ 语义：子模型自带 elements 时【整体替换】父层的 → 从叶子向根扫，取最近的一个
  for (let i = 0; i < chain.length; i++) {
    if (!elements && chain[i].m.elements) elements = chain[i].m.elements;
    if (!textureSize && chain[i].m.texture_size) textureSize = chain[i].m.texture_size;
    if (elements && textureSize) break;
  }
  // composite 兜底：顶层没有 elements 时，把各个 children 的 elements 合并成一份
  if (!elements && childLayers.length) {
    const merged = [];
    for (const c of childLayers) if (Array.isArray(c.elements)) merged.push(...c.elements);
    if (merged.length) elements = merged;
  }
  // neoforge:obj 兜底：几何在外部 .obj 文件里（blaze_burner / 阀手轮 / 飞轮 / 水车 / 轨道…）。
  // 必须在 tex 已经解析完（上面的 resolveVar 循环）之后调用 —— MTL 的 `map_Kd #0` 要按槽名查这张表。
  if (!elements) {
    // ① JSON 里显式声明的 neoforge:obj  ② Flywheel 的「同名 .obj」约定
    const baked = bakeObjFromChain(chain, tex, assets) || bakeObjByConvention(chain, tex, assets);
    if (baked) { elements = baked; objBaked = true; }
  }
  if (!elements) return { textures: tex, elements: null, textureSize, objBaked: false };

  // 渲染器不认 texture_size，UV 一律按 16 归一 → 非 16 的要把 uv 缩放回 16 空间
  const sx = textureSize ? 16 / textureSize[0] : 1;
  const sy = textureSize ? 16 / textureSize[1] : 1;
  // ★ 渲染器 BlockModel.getTexture() 只按 textures 表的【槽名】解析 face.texture：
  //     t = t.startsWith("#") ? t.slice(1) : t;   // 去 #
  //     t = this.textures?.[t] ?? "";             // 无条件查表 —— 裸纹理 id 查不到 → 空串
  //   即 face.texture 写 "create:block/xxx" 会解析成空串，纹理解析失败 → 方块退回洋红兜底。
  //   所以必须把纹理登记成槽（优先复用原模型的 all / side / top 等槽名，保持与原版形态一致），
  //   并让 face 引用 "#槽名"。
  const reverse = new Map();
  for (const [k, v] of Object.entries(tex)) {
    if (typeof v === 'string' && v && !v.startsWith('#')) {
      const id = norm(v);
      tex[k] = id;
      reverse.set(id, k);
    }
  }
  let slotSeq = 0;
  const slotFor = (rawId) => {
    if (!rawId) return null;
    const id = norm(rawId);
    if (reverse.has(id)) return reverse.get(id);
    const s = `mtt${(slotSeq++).toString(36)}`;
    tex[s] = id;
    reverse.set(id, s);
    return s;
  };
  const els = elements.map((el) => {
    const faces = {};
    for (const [fk, fv] of Object.entries(el.faces || {})) {
      const t = fv.texture && String(fv.texture).startsWith('#') ? resolveVar(fv.texture) : (fv.texture ? norm(fv.texture) : null);
      const face = { ...fv };
      const slot = slotFor(t);
      if (slot) face.texture = `#${slot}`; else delete face.texture;
      if (Array.isArray(fv.uv) && (sx !== 1 || sy !== 1)) {
        face.uv = [fv.uv[0] * sx, fv.uv[1] * sy, fv.uv[2] * sx, fv.uv[3] * sy];
      }
      faces[fk] = face;
    }
    return { ...el, faces };
  });
  return { textures: tex, elements: els, textureSize, objBaked };
}

/**
 * 模型是否有可用几何。注意 `elements: []` 在 JS 里是 **truthy**，所以旧写法 `!f.elements`
 * 判不出空模型 —— Create 的 `block/belt/particle` 就是 `{"elements":[]}`（皮带真正的几何由
 * Flywheel 自定义渲染器出）。这种模型照样会被写进 block-models.json，渲染器拿到 0 个 quad 后
 * 直接退回洋红兜底立方体（chunk 545：`if (0 === e.quads.length) { ...; e = a() }`）。
 */
function hasGeom(f) {
  return !!(f && Array.isArray(f.elements) && f.elements.length > 0);
}

/**
 * 退化占位模型：几何同样交给自定义渲染器的方块（Create 的流体管道），jar 里的模型只是占位 ——
 * 单个 4→12 的小方块、只挂 1~2 个面，渲染出来就是个"小黑盒子"。
 * 判据收紧到「单元素 + 完全落在 [4,4,4]-[12,12,12] 内 + 面数 ≤ 2」，实测只命中 create 的
 * 30 个 fluid_pipe/* 占位模型，与窗格（from=[7,0,7] to=[9,16,9]）等正常薄片互不干扰。
 */
function isDegenerateCore(f) {
  if (!f || !Array.isArray(f.elements) || f.elements.length !== 1) return false;
  const e = f.elements[0];
  const a = e.from, b = e.to;
  if (![a, b].every((v) => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite))) return false;
  if (a[0] < 4 || a[1] < 4 || a[2] < 4 || b[0] > 12 || b[1] > 12 || b[2] > 12) return false;
  const n = Object.keys(e.faces || {}).length;
  return n > 0 && n <= 2;
}

/**
 * Create 流体管道的 blockstate 一共 30 个 multipart 条目，引用的模型全是「占位核心」
 * （4→12 的小方块、只挂 2 个面），真实几何由 Flywheel 出。但 `when` 条件精确说明了
 * 该条目代表**哪些方向的连接**（例如 lu_x 的 when 是 up=true & south=true，就是"上+南"的弯头）。
 * 所以按 `when` 合成正确的管子：核心立方体 + 已连接方向的 4px 短管；未连接的方向什么都不画
 * （呈现为封闭端）。
 *
 * ★ 贴图 UV 必须落在一个**不透明**的 tile 上。`pipes_connected.png` 是 32×32 的图集，
 * 右下半张是透明的；旧实现用 `[0,0,16,16]`（整张）取样，又恰逢 `create:fluid_pipe` 的
 * 渲染提示是 alphaTest ⇒ 管子被打成筛子。这里统一用 4×4 的不透明 tile。
 * 所有模型共用同一组「几何 + 贴图 + uv」，因此多个条目同时命中时重叠部分像素完全一致，
 * 不会出现 z-fighting 观感异常。
 */
const PIPE_DIRS = ['up', 'down', 'north', 'south', 'east', 'west'];
const PIPE_ARMS = {
  up: [4, 12, 4, 12, 16, 12],
  down: [4, 0, 4, 12, 4, 12],
  north: [4, 4, 0, 12, 12, 4],
  south: [4, 4, 12, 12, 12, 16],
  west: [0, 4, 4, 4, 12, 12],
  east: [12, 4, 4, 16, 12, 12],
};
const PIPE_CORE = [4, 4, 4, 12, 12, 12];
const PIPE_UV = [0, 0, 4, 4];

function pipeArms(f, dirs) {
  const slots = Object.keys(f.textures || {}).filter(
    (s) => typeof f.textures[s] === 'string' && f.textures[s] && !f.textures[s].startsWith('#'),
  );
  const slot = slots.find((s) => s !== 'particle') || slots[0] || null;
  const faces = () => {
    const o = {};
    for (const d of PIPE_DIRS) o[d] = slot ? { texture: `#${slot}`, uv: PIPE_UV.slice() } : { uv: PIPE_UV.slice() };
    return o;
  };
  const box = (a) => ({ from: [a[0], a[1], a[2]], to: [a[3], a[4], a[5]], faces: faces() });
  const els = [box(PIPE_CORE)];
  for (const d of PIPE_DIRS) if (dirs && dirs.has(d)) els.push(box(PIPE_ARMS[d]));
  f.elements = els;
  return f;
}

/**
 * 从 multipart 的 `when` 里取出「值为 true 的方向」——即该模型代表的连接方向。
 * 只有方向键参与，waterlogged 之类的其它属性忽略。
 */
function dirsFromWhen(when) {
  const s = new Set();
  if (!when) return s;
  for (const d of PIPE_DIRS) if (when[d] === 'true' || when[d] === true) s.add(d);
  return s;
}

/**
 * 把退化占位模型换成一根 8px 管径的六向细管十字（核心被六条臂完全包住，所以只出 6 条臂）。
 * 视觉上就是"每格都连通的管道"，比小黑盒子或实心立方体都更接近原版。
 * 面贴图一律写 "#槽名"，用模型自己的主贴图槽（优先 "0"、排除 particle）。
 */
function pipeCross(f) {
  const slots = Object.keys(f.textures || {}).filter((s) => typeof f.textures[s] === 'string' && f.textures[s]);
  const slot = slots.find((s) => s !== 'particle') || slots[0] || null;
  const faces = (keep) => {
    const o = {};
    for (const d of keep) o[d] = slot ? { texture: `#${slot}`, uv: [0, 0, 16, 16] } : { uv: [0, 0, 16, 16] };
    return o;
  };
  // 六条臂从核心 (4→12) 伸到方块边界；与核心相接的那一面省略（永远不可见）
  f.elements = [
    { from: [12, 4, 4], to: [16, 12, 12], faces: faces(['east', 'up', 'down', 'north', 'south']) },
    { from: [0, 4, 4], to: [4, 12, 12], faces: faces(['west', 'up', 'down', 'north', 'south']) },
    { from: [4, 12, 4], to: [12, 16, 12], faces: faces(['up', 'east', 'west', 'north', 'south']) },
    { from: [4, 0, 4], to: [12, 4, 12], faces: faces(['down', 'east', 'west', 'north', 'south']) },
    { from: [4, 4, 12], to: [12, 12, 16], faces: faces(['south', 'east', 'west', 'up', 'down']) },
    { from: [4, 4, 0], to: [12, 12, 4], faces: faces(['north', 'east', 'west', 'up', 'down']) },
  ];
  return f;
}

/**
 * 空几何占位模型的替补几何（真正的几何由自定义渲染器出，jar 里只有 textures、没有 elements）：
 *  - 模型名以 "particle" 结尾的占位（Create 皮带的带面）→ 一块薄板，看起来才像传送带；
 *  - 其余（无 elements 也无外部 .obj 的占位）→ 满立方体，与整体兜底观感一致。
 * 用模型自己的贴图槽（优先非 particle）。找不到任何可用贴图槽时返回 null，交回上层走 _fb_ 兜底。
 * ★ 关键：只替换这一个模型，**不**把整个方块判失败 —— 否则皮带连它正常的 belt_casing 变体会一起丢掉。
 * ★ neoforge:obj 的模型不走这里：flattenModel 会先把外部 .obj 烘焙成真实几何（见 mod-obj.mjs）。
 */
function synthGeom(f, ref) {
  if (!f) return null;
  // 「空气」占位模型（minecraft:block/air，只带一个 particle 槽）绝不能合成成实体方块：
  // 它表示「这里什么都没有」（如 create:track 的 shape=none）。合成几何会让它变成一个突兀的
  // 立方体（蓝图里轨道每空一段就冒出一个方块）。返回 null 让上层丢掉这一支 → 该变体渲染为空。
  if (/(^|:)block\/air$/.test(String(ref))) return null;
  const slots = Object.keys(f.textures || {}).filter((s) => typeof f.textures[s] === 'string' && f.textures[s] && !f.textures[s].startsWith('#'));
  const slot = slots.find((s) => s !== 'particle') || slots[0];
  if (!slot) return null;
  const face = () => ({ texture: `#${slot}`, uv: [0, 0, 16, 16] });
  const faces = { down: face(), up: face(), north: face(), south: face(), west: face(), east: face() };
  const box = /\/particle$/.test(String(ref)) ? { from: [0, 4, 0], to: [16, 6, 16] } : { from: [0, 0, 0], to: [16, 16, 16] };
  return [{ ...box, faces }];
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

export { modelKeyFor };   // 实现统一在 mod-shared.mjs（加载器解析跨模组 parent 用的是同一套）

// ---------------- 几何构建 ----------------
/**
 * @returns {{ defs:Object, models:Object, texNeed:Map<string,{src:string,blocks:number}>,
 *             blockTex:Map<string,Set<string>>, ported:Set<string>, cube:Set<string>, missing:Array }}
 */
/**
 * Flywheel 动态渲染方块的静态几何补映射（在**收集 refs 之前**改写 blockstate 里的模型引用）。
 *
 * 背景：create 的传送带 / 链式传动等由 Flywheel 在运行时绘制，静态资源包里对应变体只给一个
 * **空占位模型**（`create:block/belt/particle`，elements 为空）→ 我们只能合成一片 2px 薄板，
 * 于是蓝图里传送带的路径、连接、坡度全是错的（实测 163 条传送带里 127 条）。
 * 但包里**确实带着**按属性命名的真实静态模型，只是 blockstate 从不引用：
 *   part=start/middle/end/pulley  →  belt/start · belt/middle · belt/end · belt_pulley
 *   slope=horizontal              →  {dir}/{part}          （平带）
 *   slope=upward/downward         →  {dir}/diagonal_{part}  （45° 斜段，坐标自带斜度）
 *   slope=vertical/sideways       →  {dir}/{part} 并置 x=90（把平带立起来）
 *   part=pulley（任何 slope）      →  belt_pulley 并置 x=90（源模型是竖轴建模，Axis y 0..16，
 *                                     必须放平成横轴滚筒；朝向取同 facing 的 vertical 基准）
 * 后者的依据：包里**没有**竖直带面模型（belt/ 下只有 diagonal_* 与 *_bottom），而 casing 分支里
 * vertical 与 sideways 共用 `belt_casing/sideways_*`（一个竖板）；把平带模型立起来才是同形近似，
 * 直接套 diagonal_* 会得到 45° 斜段 —— 这正是「垂直/侧向传送带形状朝向全错」的原因。
 * ★ 朝向基准取同一属性组合（除 casing）下 `casing=true` 的 (x,y)：源里 casing=false 是 Flywheel
 *   占位，它的 y 与真实朝向**不总一致**（vertical 差一个象限，如 facing=north: 占位 180 / 真实 270）。
 * 这套命名与 casing 分支完全同构（belt_casing/{horizontal,diagonal,sideways}_{part}）。
 * 目标模型不存在就保持原样（其它模组以 /particle 结尾的占位不受影响）。
 */
function remapFlywheelStatic(bs, models) {
  if (!bs || !models) return 0;
  const propsOf = (key) => {
    const o = {};
    for (const kv of String(key).split(',')) {
      const i = kv.indexOf('=');
      if (i > 0) o[kv.slice(0, i)] = kv.slice(i + 1);
    }
    return o;
  };
  /** 归一化属性键（去掉 casing，按键名排序），用于找「同组合的 casing=true 兄弟项」 */
  const normKey = (o) =>
    Object.keys(o)
      .filter((k) => k !== 'casing' && o[k] !== undefined && !String(o[k]).includes('|') && !String(o[k]).includes(' '))
      .sort()
      .map((k) => `${k}=${o[k]}`)
      .join(',');
  /**
   * 静态模型只覆盖水平/斜向；casing=true 分支才是真实朝向基准：
   * 同一属性组合（除 casing）下 casing=true 的 (x,y) 与我们合成的带面必须一致，
   * 否则会出现「朝向差 90°」。vertical 尤为明显（占位模型的 y 与真实朝向差一个象限）。
   */
  const orient = new Map();
  if (bs.variants) {
    for (const [k, v] of Object.entries(bs.variants)) {
      const o = propsOf(k);
      if (o.casing !== 'true') continue;
      const e = Array.isArray(v) ? v[0] : v;
      if (!e || typeof e !== 'object') continue;
      orient.set(normKey(o), { x: e.x ?? 0, y: e.y ?? 0 });
    }
  }
  const fix = (entry, props) => {
    const arr = Array.isArray(entry) ? entry : [entry];
    let n = 0;
    for (const e of arr) {
      if (!e || typeof e.model !== 'string') continue;
      const m = e.model;
      if (!m.endsWith('/particle')) continue;
      const dir = m.slice(0, m.lastIndexOf('/'));            // create:block/belt
      const colon = dir.indexOf(':');
      const ns = colon >= 0 ? dir.slice(0, colon) : 'minecraft';
      const base = colon >= 0 ? dir.slice(colon + 1) : dir;  // block/belt
      const part = props && props.part;
      const slope = props && props.slope;
      if (!part) continue;
      // 立起来的带（vertical/sideways）在包里没有独立的带面模型，
      // 用平带模型（{base}/{part}）「立起 90°」近似；斜带用 diagonal_*。
      const upright = slope === 'vertical' || slope === 'sideways';
      const cand = [];
      if (part === 'pulley') cand.push(`${ns}:${base}_pulley`);
      else if (slope === 'horizontal' || upright) cand.push(`${ns}:${base}/${part}`);
      else cand.push(`${ns}:${base}/diagonal_${part}`);
      let ok = false;
      for (const c of cand) if (models.has(c)) { e.model = c; n++; ok = true; break; }
      if (!ok) continue;
      if (part === 'pulley') {
        // belt_pulley 是「竖轴建模」（Axis 元素 y 0..16，滚筒轴线沿 y），与 belt_casing/sideways_pulley
        // 同类；任何 slope 都要 x=90 放平成「横轴滚筒」。绝不能套 horizontal 的水平建模基准
        // （horizontal_pulley 是 y 0..11 躺着的、x=0），否则会渲染成「竖轴木柱」。
        // 朝向取同 facing 的 vertical 基准（sideways_pulley 的放平朝向）。
        const vref = orient.get(normKey({ ...props, slope: 'vertical' }));
        const yRot = ((Math.round((vref && vref.y) ?? 0) % 360) + 360) % 360;
        e.x = 90;
        e.y = yRot;
        // 带面的坐标/面名预变换与该 y 强相关（见 toPulleySpace / pulleyFaceMap）→
        // 每个朝向必须各建一份独立模型，否则 4 个朝向共用 belt_pulley 时带面只能对一个朝向正确。
        // yRot=270 沿用原模型键（不改名，避免已有 .mod-atlas.json 里的模型登记失配）；其余朝向另起键。
        const baseRef = `${ns}:${base}_pulley`;
        const srcModel = models.get(baseRef);
        if (srcModel && yRot !== 270) {
          const tagged = `${baseRef}__y${yRot}`;
          if (!models.has(tagged)) models.set(tagged, srcModel);
          e.model = tagged;
        }
      } else {
        const ref = orient.get(normKey(props));
        if (ref) {
          if (upright) {
            e.x = 90;              // 把平带立起来
            e.y = ref.y;           // 朝向取 casing 基准（源占位值 vertical 差 90°）
          } else {
            e.x = ref.x;
            e.y = ref.y;
          }
        }
      }
    }
    return n;
  };
  let n = 0;
  if (bs.variants) for (const [k, v] of Object.entries(bs.variants)) n += fix(v, propsOf(k));
  if (bs.multipart) for (const p of bs.multipart) n += fix(p.apply, p.when || {});
  return n;
}

/**
 * ★ 传送带带轮（belt_pulley）的「带面」合成：Create 的静态 pulley 模型**只有滚筒、没有带面**——
 *   带子绕过滚筒那段同样由 Flywheel 动态绘制，所以带子一到滚筒处就"断了"，只剩一个光滚筒。
 *   这里把带面（belt/middle、belt/middle_bottom）**预旋转到 pulley 的坐标系**后并入模型。
 *
 * ★★ 关键：pulley 变体的旋转是 x=90、**y=Y 随 facing 变化**
 *   （east 0 / south 90 / west 180 / north 270，取自同 facing 的 casting=true vertical 基准，见 remapFlywheelStatic）。
 *   渲染器按 T·Ry(-Y)·Rx(-90)·T⁻¹ 施加旋转（以方块中心 (8,8,8) 为原点），
 *   故带面要预变换取其逆 M⁻¹ = Rx(90)·Ry(Y)：
 *       M⁻¹(x,y,z) = (x·cosY + z·sinY, x·sinY − z·cosY, y)
 *   老实现写死了 Y=270 的逆 (-z,-x,y) —— 只有 facing=north 对得上，
 *   其余朝向的带面会整体多转 90°/180°/270°，正是「带轮到某些朝向就错位」的原因。
 *   因此这里按实际 Y 取逆，并且每个 Y 都要**各建一份模型**（见 remapFlywheelStatic 的 __yY 后缀），
 *   否则 4 个朝向共用一个模型时，只能对其中一个朝向正确。
 */
/** 带面并入 pulley 时用的坐标预变换（Y 为 pulley 变体的 y 旋转，单位度；实测 east 0 / south 90 / west 180 / north 270） */
const toPulleySpace = (p, Y) => {
  const d = [p[0] - 8, p[1] - 8, p[2] - 8];
  const q = ((Math.round(Y) % 360) + 360) % 360;
  let x, y;
  if (q === 0) { x = d[0]; y = -d[2]; }
  else if (q === 90) { x = d[2]; y = d[0]; }
  else if (q === 180) { x = -d[0]; y = d[2]; }
  else { x = -d[2]; y = -d[0]; }
  return [8 + x, 8 + y, 8 + d[1]];
};
/**
 * 带面并入 pulley 时的「面名映射」——必须与 toPulleySpace 用同一旋转：
 * 面法线先经 Ry(Y) 再经 Rx(90)（方向 (a,b,c) → (a,−c,b)）。up/down 恒落到 south/north。
 */
const pulleyFaceMap = (Y) => {
  const q = ((Math.round(Y) % 360) + 360) % 360;
  const map = { up: 'south', down: 'north' };
  if (q === 90) { map.east = 'up'; map.west = 'down'; map.south = 'east'; map.north = 'west'; }
  else if (q === 180) { map.east = 'west'; map.west = 'east'; map.south = 'up'; map.north = 'down'; }
  else if (q === 270) { map.east = 'down'; map.west = 'up'; map.south = 'west'; map.north = 'east'; }
  else { map.east = 'east'; map.west = 'west'; map.south = 'down'; map.north = 'up'; }
  return map;
};

export function buildGeometry(modid, blockIds, assets, editorModels, fallbackTex = new Map(), airBlocks = new Set()) {
  const { blockstates, models: modModels, textureIndex } = assets;
  const outModels = {};
  const defs = {};
  const texNeed = new Map();      // texId -> {src, blocks}
  const blockTex = new Map();     // blockId -> Set(texId)
  const ported = new Set();
  const cube = new Set();
  const objBaked = new Set();   // 几何来自 neoforge:obj 外部 .obj 的方块
  const missing = [];
  const air = new Set();
  const defaultProps = {};   // blockId -> 默认属性（渲染器 uO 的兜底来源）

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
    // Flywheel 动态渲染方块：把空占位 */particle 换成包里真实的静态模型（见 remapFlywheelStatic）
    remapFlywheelStatic(bs, assets.models);

    // 收集本方块所有变体引用的模型
    const refs = [];
    const collectRefs = (entry) => {
      const arr = Array.isArray(entry) ? entry : [entry];
      for (const e of arr) if (e && e.model) refs.push(e.model);
    };
    if (bs.variants) for (const v of Object.values(bs.variants)) collectRefs(v);
    if (bs.multipart) for (const p of bs.multipart) collectRefs(p.apply);
    if (!refs.length) { fail(blockId); continue; }

    // multipart 的 when → 该模型代表的连接方向（流体管道靠它合成正确的管形）
    const dirsOf = new Map();
    if (bs.multipart) {
      for (const p of bs.multipart) {
        const s = dirsFromWhen(p.when);
        if (!s.size) continue;
        const arr = Array.isArray(p.apply) ? p.apply : [p.apply];
        for (const e of arr) {
          if (!e || !e.model) continue;
          if (!dirsOf.has(e.model)) dirsOf.set(e.model, new Set());
          for (const d of s) dirsOf.get(e.model).add(d);
        }
      }
    }

    // 展平一个模型并就地修补退化情况：空几何 → 合成替补几何（薄板 / 立方体）；
    // 4→12 占位核心 → 细管十字。只有「一个可用贴图槽都没有」时才返回 null（上层走 _fb_ 兜底）。
    const readModel = (ref) => {
      const f = flattenModel(ref, modModels, editorModels, assets);
      if (!f) return null;
      if (!hasGeom(f)) {
        const els = synthGeom(f, ref);
        if (!els) return null;
        f.elements = els;
        return f;
      }
      // 退化占位模型（如 create:fluid_pipe 的 4→12 小方块）→ 按 when 合成管形，别渲染成小黑盒子
      if (isDegenerateCore(f)) {
        const dirs = dirsOf.get(ref);
        if (dirs && dirs.size) pipeArms(f, dirs);
        else pipeCross(f);
      }
      return f;
    };

    // 先把每个 ref 展平一次并缓存（readModel 要解析 JSON，别重复调用）
    const flat = new Map();
    for (const ref of refs) if (!flat.has(ref)) flat.set(ref, readModel(ref));
    // ★ 某个模型解析不了（典型：引用了**没装的模组**的模型 —— linked_throttle_lever 的
    //   `simulated:block/throttle_lever/block`）只该丢掉这一支，**不该让整个方块退化成整块立方体**：
    //   下面写 defs 时会按 keyOf 过滤，绝不会引用没落地的模型，所以丢弃是安全的。
    const first = refs.map((r) => flat.get(r)).find(Boolean);
    if (!first) { fail(blockId); continue; }
    if (first.objBaked) objBaked.add(blockId);

    // 逐个模型展平并写出（渲染器找不到模型会抛异常，必须全部落地）
    const keyOf = new Map();
    for (const ref of refs) {
      if (keyOf.has(ref)) continue;
      const f = flat.get(ref);
      if (!f) continue;                    // 解析不了 → 丢掉这一支（见上）
      const mk = modelKeyFor(modid, ref);
      keyOf.set(ref, mk);

      // ★ 传送带带段（casing=false 的 belt/{middle,end,start}）：包里另有一整套「下回程带」模型
      //   （{part}_bottom，贴图 create:block/belt_offset），但 blockstate **从不引用**它们。
      //   只渲染上带面时，带子就是一片悬空的 2px 薄板，观感上等于「带面没渲染」。
      //   这里把下回程带并进同一个模型，让带段成为完整带圈（上带面 + 下回程），朝向/坐标同源可直接合。
      let els = f.elements;
      const texSrc = {};
      for (const [slot, val] of Object.entries(f.textures || {})) {
        if (typeof val === 'string' && val) texSrc[slot] = norm(val);
      }
      const bm = /^([^\s:]+:block\/belt)\/(middle|end|start)$/.exec(ref);
      if (bm) {
        const refB = `${bm[1]}/${bm[2]}_bottom`;
        const fB = flat.get(refB) || readModel(refB);
        if (fB && Array.isArray(fB.elements) && fB.elements.length) {
          // 槽名可能撞车（上带面用 "0"、下回程带用 "1"，通常不撞）→ 撞了就挪到高位数字
          const slotMap = new Map();
          let nextSlot = 90;
          for (const [slot, val] of Object.entries(fB.textures || {})) {
            if (typeof val !== 'string' || !val) continue;
            const want = norm(val);
            const dup = Object.entries(texSrc).find(([, v]) => v === want);
            if (dup) { slotMap.set(slot, dup[0]); continue; }
            if (texSrc[slot] === undefined) { texSrc[slot] = want; slotMap.set(slot, slot); }
            else { const ns = String(nextSlot++); texSrc[ns] = want; slotMap.set(slot, ns); }
          }
          els = [...f.elements];
          for (const el of fB.elements) {
            const faces = {};
            for (const [dir, fv] of Object.entries(el.faces || {})) {
              if (!fv) continue;
              const raw = String(fv.texture || '');
              const slot = raw.startsWith('#') ? raw.slice(1) : raw;
              const ns = slotMap.get(slot);
              faces[dir] = ns !== undefined ? { ...fv, texture: '#' + ns } : { ...fv };
            }
            els.push({ ...el, faces });
          }
        }
      }

      // ★ 带轮（belt_pulley）：并入「预旋转到 pulley 坐标系」的带面（上带面 + 下回程带），
      //   让带子在滚筒处连续，而不是只剩一个光滚筒（见 toPulleySpace 注释）。
      // ref 形如 create:block/belt_pulley 或（按朝向分模型的）create:block/belt_pulley__y90
      const pm = /^([^\s:]+:block)\/belt_pulley(?:__y(\d+))?$/.exec(ref);
      if (pm) {
        const bandY = pm[2] !== undefined ? Number(pm[2]) : 270;
        const faceMap = pulleyFaceMap(bandY);
        let nextSlot2 = 90;
        // 注意：readModel 读的是**源**模型，belt/middle 在这里仍是只有上带面的 2 个元素，
        // 下回程带必须另取 belt/middle_bottom（上面 {part}_bottom 的合并只作用于带段自身的落地模型）
        for (const br of [`${pm[1]}/belt/middle`, `${pm[1]}/belt/middle_bottom`]) {
          const fb = flat.get(br) || readModel(br);
          if (!fb || !Array.isArray(fb.elements) || !fb.elements.length) continue;
          const slotMap = new Map();
          for (const [slot, val] of Object.entries(fb.textures || {})) {
            if (typeof val !== 'string' || !val) continue;
            const want = norm(val);
            const dup = Object.entries(texSrc).find(([, v]) => v === want);
            if (dup) { slotMap.set(slot, dup[0]); continue; }
            let ns = String(nextSlot2++);
            while (texSrc[ns] !== undefined) ns = String(nextSlot2++);
            texSrc[ns] = want;
            slotMap.set(slot, ns);
          }
          if (els === f.elements) els = [...f.elements];
          for (const el of fb.elements) {
            const a = toPulleySpace(el.from, bandY);
            const b = toPulleySpace(el.to, bandY);
            const faces = {};
            for (const [dir, fv] of Object.entries(el.faces || {})) {
              if (!fv) continue;
              const nd = faceMap[dir];
              if (!nd) continue;
              const raw = String(fv.texture || '');
              const slot = raw.startsWith('#') ? raw.slice(1) : raw;
              const ns = slotMap.get(slot);
              faces[nd] = ns !== undefined ? { ...fv, texture: '#' + ns } : { ...fv };
            }
            els.push({
              from: [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2])],
              to: [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2])],
              faces,
            });
          }
        }
      }

      outModels[mk] = { elements: els };
      // textures 槽表必须整份保留：face.texture 现在是 "#槽名"，只留 particle 会让纹理再次解析失败
      const texOut = {};
      for (const [slot, val] of Object.entries(texSrc)) {
        if (typeof val === 'string' && val) texOut[slot] = norm(val);
      }
      if (Object.keys(texOut).length) outModels[mk].textures = texOut;
      for (const el of els) {
        for (const fv of Object.values(el.faces || {})) {
          if (fv && fv.texture) {
            const raw = String(fv.texture);
            const slot = raw.startsWith('#') ? raw.slice(1) : raw;
            const t = norm(texOut[slot] || slot);
            noteTex(blockId, t);
            const e = texNeed.get(t) || { src: null, blocks: 0 };
            if (!e.src) e.src = textureIndex.get(t) || (t.startsWith(`${modid}:`) ? null : null);
            texNeed.set(t, e);
          }
        }
      }
    }
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
    // 默认属性：源 blockstate 的变体键 / multipart.when 是唯一可信来源
    defaultProps[blockId] = deriveDefaultProps(bs);
  }
  return { defs, models: outModels, texNeed, blockTex, ported, cube, missing, air, objBaked, defaultProps };
}

// ---------------- 图集写入 ----------------
function loadAtlasCanvas() {
  const dec = decodePng(fs.readFileSync(ATLAS_PNG));
  if (dec.h > MAX_ATLAS_HEIGHT) throw new Error(`图集高度 ${dec.h} 超过上限 ${MAX_ATLAS_HEIGHT}（可用 MOD_ATLAS_MAX_HEIGHT 覆盖）`);
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
  // ★ 只在**没被别的模组占住**的格子里分配。
  //   此前 slot 一律从 0 开始数，于是每导入一个新模组都会把先导入模组的贴图整片覆盖；
  //   更麻烦的是收尾按「本模组的最后一行」重算图集高度，会把先导入模组占用的行裁掉
  //   → 那些贴图落到图片边界之外，渲染器采样到空白，方块看上去「贴图丢了」。
  const usedSlots = new Set();
  for (const v of Object.values(uv)) {
    if (!Array.isArray(v) || v.length < 4) continue;
    if (v[1] < baseBottom) continue;               // baseBottom 以上是原版内容区
    const col = Math.floor(v[0] / TILE), row = Math.floor((v[1] - baseBottom) / TILE);
    if (v[0] - col * TILE !== 0 || v[1] - baseBottom - row * TILE !== 0) continue; // 非整格条目不参与
    usedSlots.add(row * perRow + col);
  }
  const freeSlots = [];
  for (let s = 0; s < perRow * rowCount; s++) if (!usedSlots.has(s)) freeSlots.push(s);
  const capacity = freeSlots.length;

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
  // 源贴图的透明类别：opaque=无透明像素 / cut=有全透明像素 / blend=有半透明像素。
  // ★ 格子有限，装不下的会被 substitute() 换成「别的贴图」。
  //   （旧上限 384 格 vs 需求 663 张 → 必然溢出；提上限后 create 可全量入图，此分支只在超上限时命中。）
  //   而「透明贴图被换成不透明贴图」是灾难性的：create:fluid_tank 的玻璃面用
  //   create:block/fluid_tank_window，它与 create:block/fluid_tank 的文件名公共前缀长达 10，
  //   于是被判为「强相似」而换成不透明金属贴图 → 玻璃整个消失、透明标记也永远打不上
  //   （alphaPct 恒为 0）。所以让**含透明像素的贴图优先占格**：透明的视觉不可替代，
  //   不透明贴图互相替换（颜色相近）损失小得多。
  const srcAlphaKind = new Map();
  const srcAlpha = (t) => {
    if (srcAlphaKind.has(t)) return srcAlphaKind.get(t);
    let kind = 'opaque';
    try {
      const v = geo.texNeed.get(t);
      if (v && v.src) {
        const d = decodePng(fs.readFileSync(v.src));
        const n = d.w * d.h;
        let z = 0, m = 0;
        for (let i = 0; i < n; i++) {
          const a = d.rgba[i * 4 + 3];
          if (a < 8) z++; else if (a < 248) m++;
        }
        if (m / n >= 0.05) kind = 'blend'; else if (z / n >= 0.05) kind = 'cut';
      }
    } catch { /* 解码失败 → 当作不透明 */ }
    srcAlphaKind.set(t, kind);
    return kind;
  };
  // 其余排序：透明贴图优先保真，其次按共享度降序
  const rest = modTex.map(([t]) => t).filter((t) => !reserved.has(t))
    .sort((a, b) => {
      const ta = srcAlpha(a) === 'opaque' ? 0 : 1;
      const tb = srcAlpha(b) === 'opaque' ? 0 : 1;
      if (ta !== tb) return tb - ta;      // 透明贴图排前面，优先占格
      return geo.texNeed.get(b).blocks - geo.texNeed.get(a).blocks;
    });
  // 总排序：① 含透明像素的贴图整体优先（视觉不可替代 —— 玻璃换成不透明就等于消失）
  //        ② 保底贴图次之（reserved：每方块共享度最高的一张，保证不至于整块无贴图）
  //        ③ 其余按共享度降序
  // 注意不能直接 [...reserved, ...rest]：reserved 是「每方块各挑一张」，数量可达数百，
  // 其中绝大多数是不透明贴图，会把透明贴图挤在后面（实测透明贴图只进 254/318）。
  const order = [...reserved, ...rest].sort((a, b) => {
    const ta = srcAlpha(a) === 'opaque' ? 0 : 1;
    const tb = srcAlpha(b) === 'opaque' ? 0 : 1;
    if (ta !== tb) return tb - ta;
    const ra = reserved.has(a) ? 1 : 0;
    const rb = reserved.has(b) ? 1 : 0;
    if (ra !== rb) return rb - ra;
    return geo.texNeed.get(b).blocks - geo.texNeed.get(a).blocks;
  });
  const allocated = new Set(order.slice(0, capacity));
  const overflow = order.length - allocated.size;
  // 透明贴图的保真情况（诊断：可用格子能否装下全部「含透明像素」的贴图）
  const alphaTexNeed = order.filter((t) => srcAlpha(t) !== 'opaque').length;
  const alphaTexInAtlas = order.slice(0, capacity).filter((t) => srcAlpha(t) !== 'opaque').length;

  if (dryRun) {
    let geoKept = 0, cubeNoTex = 0, missingN = 0, airN = 0, needSub = 0;
    for (const blockId of blockIds) {
      if (geo.air.has(blockId)) { airN++; continue; }
      // 新策略：只要模型移植成功就保留几何与变体，贴图缺口改由 substitute 补
      if (geo.defs[blockId]) { geoKept++; continue; }
      const set = geo.blockTex.get(blockId);
      const has = set && ([...set].some((t) => allocated.has(t)) || [...set].some((t) => t in uv));
      if (has) cubeNoTex++; else missingN++;
    }
    for (const [t] of geo.texNeed) if (t.startsWith(`${modid}:`) && !(t in uv) && !allocated.has(t)) needSub++;
    return {
      ok: true, dryRun: true, modid,
      blocks: blockIds.length,
      geometryKept: geoKept,          // 保留真实几何+变体（含贴图被替代的）
      cubeFallback: cubeNoTex + missingN, // 无几何可用，退成单变体立方体
      missingNoGeom: geo.missing.length,
      air: airN,
      texturesNeeded: modTex.length, capacity, overflow, noSrc,
      texturesSubstituted: needSub,    // 需要换成替代贴图的张数
      alphaTexNeed, alphaTexInAtlas,
      cube: geo.cube.size, cubeGeom: geo.cube.size,
      objBaked: geo.objBaked.size,
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
  let slotIdx = 0, downscaled = 0;
  for (const texId of order) {
    if (!allocated.has(texId)) continue;
    if (slotIdx >= freeSlots.length) break;
    const slot = freeSlots[slotIdx];     // ★ 取下一个**空闲**格，而非顺序递增的 slot
    const x = (slot % perRow) * TILE;
    const y = baseBottom + Math.floor(slot / perRow) * TILE;
    const src = geo.texNeed.get(texId).src;
    const dec = decodePng(fs.readFileSync(src));
    if (dec.w !== TILE || dec.h !== TILE) downscaled++;
    blit(atlas.canvas, atlas.w, tile16(src), x, y);
    uv[texId] = [x, y, TILE, TILE];
    tiles[texId] = [x, y, TILE, TILE];
    slotIdx++;
  }

  // ---- 图集格子的平均色 + 源贴图平均色 ----
  // 用途：名字毫不相干的溢出贴图（substitute 的 weak 分支）不再一律换成石头上，
  //       而是按平均色（含透明度覆盖）挑一张视觉最接近的，避免「紫色的粉碎轮」这种翻车。
  const tileMean = new Map();
  const tileHasAlpha = new Map();   // 图集内该格是否含透明像素 → substitute 判「同类透明特性」用
  for (const [k, v] of Object.entries(uv)) {
    if (!Array.isArray(v) || v.length < 4) continue;
    const [tx, ty, tw, th] = v;
    // 先判透明特性：出现任一 alpha<248 的像素即算「透明类」
    let hasA = false;
    for (let yy = ty; yy < ty + th && yy < MAX_ATLAS_HEIGHT && !hasA; yy++)
      for (let xx = tx; xx < tx + tw && xx < atlas.w; xx++)
        if (atlas.canvas[(yy * atlas.w + xx) * 4 + 3] < 248) { hasA = true; break; }
    tileHasAlpha.set(k, hasA);
    if (tw !== TILE || th !== TILE) continue;
    let r = 0, g = 0, b = 0, a = 0, n = 0;
    for (let yy = ty; yy < ty + TILE && yy < MAX_ATLAS_HEIGHT; yy++)
      for (let xx = tx; xx < tx + TILE && xx < atlas.w; xx++) {
        const o = (yy * atlas.w + xx) * 4;
        const al = atlas.canvas[o + 3] / 255;
        r += atlas.canvas[o] * al; g += atlas.canvas[o + 1] * al; b += atlas.canvas[o + 2] * al; a += al; n++;
      }
    tileMean.set(k, n ? [r / n, g / n, b / n, a / n] : [0, 0, 0, 0]);
  }
  const colorCands = [...tileMean.keys()];
  const srcMeanCache = new Map();
  const srcMean = (id) => {
    if (srcMeanCache.has(id)) return srcMeanCache.get(id);
    let out = [0, 0, 0, 0];
    try {
      const v = geo.texNeed.get(id);
      if (v && v.src) {
        const d = decodePng(fs.readFileSync(v.src));
        const step = Math.max(1, Math.floor(Math.min(d.w, d.h) / 16));
        let r = 0, g = 0, b = 0, a = 0, n = 0;
        for (let y = 0; y < d.h; y += step) for (let x = 0; x < d.w; x += step) {
          const o = (y * d.w + x) * 4;
          const al = d.rgba[o + 3] / 255;
          r += d.rgba[o] * al; g += d.rgba[o + 1] * al; b += d.rgba[o + 2] * al; a += al; n++;
        }
        if (n) out = [r / n, g / n, b / n, a / n];
      }
    } catch { /* 解码失败 → 保持全零 */ }
    srcMeanCache.set(id, out);
    return out;
  };

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
  let written = 0, portedNow = 0, cubeNow = 0, fallbackNow = 0, airNow = 0;
  for (const blockId of blockIds) {
    // 隐形方块：defs 指向 block/air，不占贴图格子，但仍要写进 registry 以便禁用时精确回滚
    if (geo.air.has(blockId)) {
      finalDefs[blockId] = geo.defs[blockId];
      airNow++; written++;
      continue;
    }
    // ★ 几何与变体不受图集预算限制。模型移植成功就写真实定义；
    //   放不下的贴图由下面的 substitute() 换成同目录/同命名空间的替代贴图。
    //   以前这里是 canPort(整块否决)——只要有一张贴图没挤进图集，就把该方块的
    //   全部变体丢掉换成一个 cube_all，于是隧道/红石链接/阈值开关这类方块在蓝图里
    //   "不连接"（几何与朝向全没了）。贴图预算绝不能毁掉几何。
    if (geo.defs[blockId]) {
      finalDefs[blockId] = geo.defs[blockId];
      if (geo.ported.has(blockId)) portedNow++; else cubeNow++;
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
  // ---- 贴图替代表：挤不进图集的贴图，换成同目录 / 同命名空间里最相近的已分配贴图 ----
  // 宁可牺牲那几张贴图的外观，也不丢掉几何与变体（否则方块会退化成立方体 → 蓝图里"不连接"）
  const uvKeys = Object.keys(uv);
  const uvSet = new Set(uvKeys);
  const GENERIC_UV = uvKeys.find((k) => /^block\/(smooth_stone|stone|dirt|cobblestone)$/.test(k))
    || uvKeys.find((k) => k.startsWith('block/'))
    || uvKeys[0];
  const commonPrefix = (a, b) => {
    const n = Math.min(a.length, b.length);
    let i = 0;
    while (i < n && a.charCodeAt(i) === b.charCodeAt(i)) i++;
    return i;
  };
  const subCache = new Map();
  const subKind = new Map(); // 原贴图 id → 'strong'（文件名像）| 'weak'（颜色像）
  const subAlpha = { ok: 0, crossed: 0 };   // 替代后透明特性是否保持（crossed = 被迫跨类）
  const basename = (s) => { const c = s.lastIndexOf('/'); return c >= 0 ? s.slice(c + 1) : s; };
  const substitute = (t) => {
    if (uvSet.has(t)) return t;
    if (subCache.has(t)) return subCache.get(t);
    const cut = t.lastIndexOf('/');
    const dir = cut > t.indexOf(':') ? t.slice(0, cut) : '';
    const nsEnd = t.indexOf(':');
    const ns = nsEnd >= 0 ? t.slice(0, nsEnd + 1) : '';
    const base = basename(t);
    // ★ 替代必须保持「透明特性同类」：透明贴图只能换透明贴图、不透明只换不透明。
    //   否则玻璃会被换成实心金属 —— create:fluid_tank 的玻璃面用 fluid_tank_window，
    //   它与 fluid_tank 的文件名公共前缀长达 10，被判「强相似」后换成不透明金属贴图，
    //   于是玻璃整片消失（透明标记也因此永远打不上，alphaPct 恒为 0）。
    const wantAlpha = srcAlpha(t) !== 'opaque';
    const sameKind = (k) => (tileHasAlpha.get(k) === true) === wantAlpha;
    // 打分：同目录优先 → 文件名公共前缀（视觉最相关）→ 全名公共前缀
    let best = null;
    const consider = (k, dirw, strict) => {
      if (strict && !sameKind(k)) return;
      const sBase = commonPrefix(basename(k), base);
      const sFull = commonPrefix(k, t);
      const score = dirw * 1e6 + sBase * 1e3 + sFull;
      if (!best || score > best.score) best = { k, score, sBase, dirw };
    };
    const scanByName = (strict) => {
      best = null;
      for (const k of uvKeys) {
        if (dir && k.startsWith(`${dir}/`)) consider(k, 2, strict);
        else if (ns && k.startsWith(ns)) consider(k, 1, strict);
      }
      return best;
    };
    scanByName(true);                 // 优先在同透明类别里找同名/同目录的
    if (!best) scanByName(false);     // 同类里没有 → 放开类别
    // ★ 关键：文件名完全不沾边（如 crushing_wheel_plates → crate_creative 只共 "cr"）
    //   就按平均色挑一张最接近的，而不是随机给个颜色完全不对的（紫色）箱子。
    //   注意 create 的贴图大量是扁平的 create:block/xxx（目录只有 2 段），
    //   这类「同目录」信号很弱（= 同模组），所以文件名要求更严（≥3 字符）；
    //   深层子目录（≥3 段，如 palettes/stone_types/cut/x）同目录基本同材质，放宽到 1 字符。
    const dirDepth = dir.split('/').length;
    const related = best && (best.sBase >= 4
      || (best.dirw === 2 && best.sBase >= (dirDepth >= 3 ? 1 : 3)));
    let out;
    if (related) {
      out = best.k;
    } else {
      const want = srcMean(t);
      const colorDist = (k) => {
        const c = tileMean.get(k);
        const dr = c[0] - want[0], dg = c[1] - want[1], db = c[2] - want[2], da = (c[3] - want[3]) * 255;
        return dr * dr + dg * dg + db * db + 4 * da * da;
      };
      const scanColor = (strict, local) => {
        let pick = null, bestD = Infinity;
        for (const k of colorCands) {
          if (strict && !sameKind(k)) continue;
          if (local && !((dir && k.startsWith(`${dir}/`)) || (ns && k.startsWith(ns)))) continue;
          const d = colorDist(k);
          if (d < bestD) { bestD = d; pick = k; }
        }
        return pick;
      };
      // 优先级：同目录/同命名空间 + 同透明特性 → 同目录/同命名空间 → 全局 + 同透明特性 → 全局。
      // 最后一层"局部优先"很关键：create 的金属罐壁（create:block/fluid_tank）若直接全局找最近色，
      // 会被换成原版 block/chiseled_copper —— 颜色接近但风格完全不是一套。
      const pick = scanColor(true, true) || scanColor(false, true)
        || scanColor(true, false) || scanColor(false, false);
      // 透明源绝不允许退回 GENERIC_UV（石头）→ 宁可选图集里任意一张透明贴图
      const finalPick = pick || (wantAlpha ? uvKeys.find((k) => tileHasAlpha.get(k) === true) : null);
      out = finalPick || GENERIC_UV || (best && best.k) || t;
    }
    if (out !== t) {
      subKind.set(t, related ? 'strong' : 'weak');
      if ((tileHasAlpha.get(out) === true) === wantAlpha) subAlpha.ok++; else subAlpha.crossed++;
    }
    subCache.set(t, out);
    return out;
  };

  // ★ 只有「面真正会用到的贴图」才需要替代 —— 即 texNeed 里的（它正是按面收集的）。
  //   模型 textures 里没人引用的槽位（particle、备用变体槽 0/1_2/…）即使不在图集里也完全无害：
  //   渲染器只按 elements 的面去取贴图。以前对这些槽位也做替代，于是 create 明明 0 溢出、
  //   面引用 100% 命中，报告里却写着「替代贴图 42」（其中 33 次是 particle 槽），把真正
  //   需要关注的替代淹没了。改按 texNeed 判定，这个数字才有意义。
  const needSet = new Set(geo.texNeed.keys());
  const needNormSet = new Set([...needSet].map(norm));
  const isNeeded = (v) => needSet.has(v) || needNormSet.has(norm(v));
  let substituted = 0, subStrong = 0, subWeak = 0;
  const subSeen = new Map();   // 源贴图 id → 被替代的模型槽位次数（诊断：谁没进图集）
  const modelNames = [];
  for (const [mk, mv] of Object.entries(geo.models)) {
    if (!usedModelKeys.has(mk)) continue;
    if (mv.textures) {
      const nt = {};
      for (const [slot, val] of Object.entries(mv.textures)) {
        const s = isNeeded(val) ? substitute(val) : val;   // 没人引用的槽位保持原样，不计入替代
        if (s !== val) { substituted++; subSeen.set(val, (subSeen.get(val) || 0) + 1); if (subKind.get(val) === 'strong') subStrong++; else subWeak++; }
        nt[slot] = s;
      }
      models[mk] = { ...mv, textures: nt };
    } else {
      models[mk] = mv;
    }
    modelNames.push(mk);
  }
  for (const [mk, mv] of Object.entries(fbModels)) {
    if (!usedModelKeys.has(mk)) continue;
    models[mk] = mv;
    modelNames.push(mk);
  }
  for (const [blockId, d] of Object.entries(finalDefs)) {
    defs[blockId] = d;
    // 默认属性由源 blockstate 推导（此前恒为 {}，让「属性不全 / 完全没带属性」的调用路径渲染不出来）
    props[blockId] = (geo.defaultProps && geo.defaultProps[blockId]) || {};
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

  // 图集高度 = max(本模组最后一行, 其它模组已占用的最后一行, 现有图片高度) —— **只增不减**。
  // 一旦某次重算让高度变矮，超出新高度的那些已落盘贴图就落到图片边界之外，
  // 渲染器采样到 canvas 空白 → 方块贴图整片消失（曾把 create 的 256 张贴图裁掉）。
  let maxEnd = baseBottom;
  for (const r of Object.values(tiles)) maxEnd = Math.max(maxEnd, r[1] + r[3]);
  for (const v of Object.values(uv)) {
    if (!Array.isArray(v) || v.length < 4 || v[1] < baseBottom) continue;
    maxEnd = Math.max(maxEnd, v[1] + Math.min(v[3], v[2]));
  }
  const newHeight = Math.max(baseBottom, atlas.contentH, maxEnd);

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
    // geometryKept = 保留真实几何与变体的方块数（含贴图被替代的）
    // cubeFallback = 无几何可用（OBJ/复合加载器/占位模型）而退成单变体立方体的方块数
    geometryKept: portedNow + cubeNow, cubeFallback: fallbackNow,
    realGeometry: portedNow, cubeGeom: cubeNow,
    fallback: fallbackNow, air: airNow,
    cube: geo.cube.size, missing: geo.missing.length,
    objBaked: geo.objBaked.size,
    textures: Object.keys(tiles).length, capacity, overflow, downscaled,
    texturesSubstituted: substituted,
    substituteStrong: subStrong, substituteWeak: subWeak,
    substituteKeepAlpha: subAlpha.ok, substituteCrossAlpha: subAlpha.crossed,
    substituteIds: [...subSeen.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([k, n]) => `${k} x${n}`),
    alphaTexNeed, alphaTexInAtlas,
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
  // 同样只增不减（见上方注释）：撤掉一个模组不该让其它模组的贴图掉出图片边界
  const newHeight = Math.max(baseBottom, atlas.contentH, maxEnd, 1);

  writeAtomic(ATLAS_PNG, encodePng(atlas.w, newHeight, atlas.canvas.subarray(0, atlas.w * newHeight * 4)));
  writeAtomic(ATLAS_UV, JSON.stringify(uv));
  writeAtomic(BLOCK_MODELS, JSON.stringify(models));
  writeAtomic(BLOCK_DEFS, JSON.stringify(defs));
  writeAtomic(BLOCK_PROPS, JSON.stringify(props));
  saveRegistry(registry);
  return { ok: true, modid, removed: 1, atlasSize: `${atlas.w}x${newHeight}`, remainingMods: Object.keys(registry.mods).length };
}

// ---------------- CLI ----------------
const isMain = isMainModule(import.meta.url);
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

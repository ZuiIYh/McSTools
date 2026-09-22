// mod-shared.mjs — 模组装载器生命周期脚本的公共依赖
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 定位编辑器「数据目录」（即 `data/`）—— 本文件是**唯一真源**，其余 mod-*.mjs 必须复用这里的导出，
 * 不要再各自 `path.resolve(__dirname,'..')` 拼一遍。
 *
 * 为什么不能直接拼 `ROOT/src-tauri/data`：那套路径只在**仓库里**成立。
 * 打包后 Tauri 把 `../scripts/**`（src-tauri 之外的资源）放进 `<安装目录>/_up_/scripts/`，
 * 于是 `resolve(__dirname,'..')` = `<安装目录>/_up_`，再拼 `src-tauri/data`
 * 指向一个根本不存在的目录 —— 表现为面板报「找不到装载器脚本」之后紧接着的所有操作全废。
 *
 * 解析顺序（每个候选都用哨兵 `<data>/editor/web/index.html` 校验，防止选中同名的空目录）：
 *   1. 环境变量 `MCSTOOLS_DATA_ROOT`：Rust 侧用 Tauri 的路径解析器算好后注入，最可靠；
 *   2. 仓库布局：`<repo>/scripts` → `<repo>/src-tauri/data`；
 *   3. 打包布局：`<install>/_up_/scripts` → `<install>/data`；
 *   4. 兜底：脚本目录与 `data/` 同级。
 */
function resolveDataRoot() {
  const raw = [
    process.env.MCSTOOLS_DATA_ROOT,
    path.resolve(__dirname, '..', 'src-tauri', 'data'), // 仓库布局
    path.resolve(__dirname, '..', '..', 'data'),        // 打包布局（_up_/scripts）
    path.resolve(__dirname, '..', 'data'),              // 兜底
  ];
  const candidates = raw.filter((c) => typeof c === 'string' && c.length > 0);
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(path.join(candidate, 'editor', 'web', 'index.html'))) return candidate;
    } catch { /* 非法路径直接跳过 */ }
  }
  throw new Error(
    '找不到编辑器数据目录（data/），已尝试：\n  ' + candidates.join('\n  ') +
    '\n开发期请在仓库根目录运行；安装版请确认安装完整（卸载后重装）。'
  );
}

export const DATA_ROOT = resolveDataRoot();
/** 被 OfflineServer 当作站点根目录对外提供服务的那份 web 产物 */
export const EDITOR_WEB_DIR = path.join(DATA_ROOT, 'editor', 'web');
const BLOCKID = path.join(EDITOR_WEB_DIR, 'uploads', 'buildings', 'blockID');
export const DB_PATH = path.join(BLOCKID, 'minecraft_blocks_database.json');
export const FACE_PATH = path.join(BLOCKID, 'block-face-textures.json');
export const IMAGES_DIR = path.join(BLOCKID, 'images');
// 3D 面贴图目录：编辑器 h() 用 `block-textures/` + block-face-textures.json[blockId] 取面贴图，
// 与 images/（图标/平面贴图）是两套，方块必须两边都有 PNG，否则 3D 渲染会变粉色缺贴图。
export const BLOCK_TEXTURES_DIR = path.join(BLOCKID, 'block-textures');
// 3D 真正用的资源包（预烘焙）：编辑器渲染器读 `mcmeta/atlas.png` + atlas-uv.json +
// block-models.json + block-definitions.json，而不是逐方块读 PNG。
// 只改 images/block-textures 无法让模组方块上色 —— 必须同时扩展这里的图集与模型表。
export const MCMETA_DIR = path.join(BLOCKID, 'mcmeta');
export const ATLAS_PNG = path.join(MCMETA_DIR, 'atlas.png');
export const ATLAS_UV = path.join(MCMETA_DIR, 'atlas-uv.json');
export const BLOCK_MODELS = path.join(MCMETA_DIR, 'block-models.json');
export const BLOCK_DEFS = path.join(MCMETA_DIR, 'block-definitions.json');
export const BLOCK_PROPS = path.join(MCMETA_DIR, 'block-default-properties.json');
// 模组图集占用登记表：记录每个模组占用的图集格子 / 模型 / 定义，供禁用、卸载时精确回滚
export const ATLAS_REGISTRY = path.join(MCMETA_DIR, '.mod-atlas.json');
// 模组方块渲染提示表（是否整块 / 需透明 / 需挖空），由 patch-editor-render.mjs 内联进渲染器。
// 编辑器把这三类判定硬编码成原版方块名后缀表，模组方块不在表里 → 玻璃贴图发黑、非整块被当整块剔除面。
export const RENDER_HINTS = path.join(MCMETA_DIR, 'mod-render-hints.json');
export const IMPORT_DIR = path.join(DATA_ROOT, 'editor', 'import', 'mods');

// ---------------- 模型键名规则（唯一真源） ----------------
// 模组模型移植进编辑器 block-models.json 后的键名。mod-models 的 modelKeyFor 就是它，
// 加载器/模型层解析**跨模组 parent** 时也用它反查，所以必须只有一处实现。
export const sanitizeModelKey = (s) => {
  const t = String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  if (t.length <= 54) return t;
  // ★ 直接截断会**撞键**：..._block_powered_vertical 与 ..._block_powered_vertical_locked
  //   都会被截成 ..._block_powered_vert → 两个模型写进同一个键，变体渲染成同一份几何。
  //   保留可读前缀 + 4~5 位内容哈希，保证一一对应。
  let h = 0x811c9dc5;
  for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return `${t.slice(0, 54)}_${h.toString(36).slice(0, 5)}`;
};
export const modelKeyFor = (modid, modelId) =>
  `block/mt_${sanitizeModelKey(modid)}_${sanitizeModelKey(String(modelId).replace(/^minecraft:/, ''))}`;
/** 别的模组的 parent 引用 → 它移植后的模型键；原版（minecraft:）返回 null（编辑器本来就有） */
export const crossModParentKey = (ref) => {
  const s = String(ref || '');
  const ns = s.includes(':') ? s.slice(0, s.indexOf(':')) : 'minecraft';
  return ns && ns !== 'minecraft' ? modelKeyFor(ns, s) : null;
};

export function loadDb() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }
export function saveDb(db) { fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8'); }
export function loadFace() { return JSON.parse(fs.readFileSync(FACE_PATH, 'utf8')); }
export function saveFace(face) { fs.writeFileSync(FACE_PATH, JSON.stringify(face, null, 2), 'utf8'); }
export function readManifest(modid) {
  const p = path.join(IMPORT_DIR, `${modid}.manifest.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// 从 DB 中移除 minecraft_ids[].id ∈ blockSet 的条目，返回 { kept, removed }
export function removeEntries(db, blockSet) {
  const kept = [];
  const removed = [];
  for (const e of db) {
    if ((e.minecraft_ids || []).some(m => blockSet.has(m.id))) removed.push(e);
    else kept.push(e);
  }
  return { kept, removed };
}

// 从 face 对象中删除 blockSet 的键，返回删除数量
export function removeFromFace(face, blockSet) {
  let n = 0;
  for (const k of Object.keys(face)) {
    if (blockSet.has(k)) { delete face[k]; n++; }
  }
  return n;
}

// 当前 DB 中已存在的 id 集合
export function existingIds(db) {
  const s = new Set();
  for (const e of db) for (const m of (e.minecraft_ids || [])) s.add(m.id);
  return s;
}

/**
 * 从源 blockstate 推导方块的**默认属性**（与 vanilla 的 block-default-properties.json 同构）。
 *
 * 为什么必须有：渲染器（8652）的 `uO(props, defaults)` 只在实例属性**缺失**时用默认值补齐，
 * 而 9703 的 `matchesVariant` 要求变体键里的**每个** `key=value` 都在属性对象里存在且相等；
 * 缺一个 → 该变体不匹配，全不匹配 → `getModelVariants` 返回 `[]` → `getMesh` 产出 0 面
 * → `w()` 落洋红兜底、`k()`（单方块预览，直接传 `{}`）返回 null。
 * 我们以前给模组方块写空 `{}`，于是「属性不全 / 完全没带属性」的调用路径全都渲染不出来。
 *
 * 取值策略：
 *   1) 从 `variants` 的键与 `multipart[].when`（含 OR/AND 与 `a|b` 候选）统计每个属性值与频次；
 *   2) 每属性先试「偏好值」（false / north / y / lower …，贴近 vanilla 默认），否则取众数；
 *   3) 若这组值能命中至少一个变体键或 when 分支 → 直接采用（等价于 vanilla 的「完整默认值」）；
 *   4) 否则退回「最具代表性的单个状态」：各属性值频次之和最高、且条件最少的那个键。
 *
 * 只产出**源 blockstate 里真实出现过**的属性，绝不会凭空造出匹配不上的键。
 * @param {object} bs 源 blockstate
 * @returns {Record<string,string>}
 */
export function deriveDefaultProps(bs) {
  if (!bs || typeof bs !== 'object') return {};
  const counts = new Map();   // prop -> Map(val -> count)
  const combos = [];          // 候选状态：{ prop: val }
  const bump = (p, v) => {
    if (!counts.has(p)) counts.set(p, new Map());
    const m = counts.get(p);
    m.set(v, (m.get(v) || 0) + 1);
  };
  const addKey = (str) => {
    const o = {};
    for (const kv of String(str).split(',')) {
      const i = kv.indexOf('=');
      if (i <= 0) continue;
      const p = kv.slice(0, i).trim();
      const v = kv.slice(i + 1).trim();
      if (!p || !v || v.includes('|')) continue;   // 空键 ''、含候选分隔符的键跳过
      if (p in o) continue;
      o[p] = v;
      bump(p, v);
    }
    if (Object.keys(o).length) combos.push(o);
  };
  const addWhen = (w) => {
    if (!w || typeof w !== 'object') return;
    if (Array.isArray(w.OR)) { for (const x of w.OR) addWhen(x); return; }
    if (Array.isArray(w.AND)) { for (const x of w.AND) addWhen(x); return; }
    const o = {};
    for (const [p, raw] of Object.entries(w)) {
      const v = String(raw).split('|')[0].trim();   // "true|false" 取第一个候选
      if (!p || !v) continue;
      o[p] = v;
      bump(p, v);
    }
    if (Object.keys(o).length) combos.push(o);
  };
  for (const k of Object.keys(bs.variants || {})) addKey(k);
  for (const p of bs.multipart || []) addWhen(p.when);
  if (!counts.size) return {};

  const rank = (v) => (v === 'false' ? 0 : v === 'none' ? 1 : v === 'true' ? 9 : 5);
  const PREFER = {
    facing: ['north', 'up', 'down'], face: ['floor', 'wall'], axis: ['y', 'x', 'z'],
    half: ['lower', 'bottom'], hinge: ['left'], rotation: ['0'],
    part: ['none', 'middle'], shape: ['straight', 'single'], slope: ['horizontal'],
  };
  const prefer = (p, vals) => {
    const all = [...vals.keys()];
    if (all.every((v) => v === 'true' || v === 'false') && vals.has('false')) return 'false';
    for (const v of PREFER[p] || []) if (vals.has(v)) return v;
    let best = null, bestN = -1;
    for (const [v, n] of vals) {
      if (n > bestN || (n === bestN && rank(v) < rank(best))) { best = v; bestN = n; }
    }
    return best;
  };

  const per = {};
  for (const [p, m] of counts) per[p] = prefer(p, m);

  const hits = (o) => combos.some((c) => Object.entries(c).every(([p, v]) => o[p] === v));
  if (hits(per)) return per;

  // 退回：频次之和最高的候选键（并列时条件更少的优先 —— 匹配面更大）
  let best = null, bestScore = -1, bestN = Infinity;
  for (const c of combos) {
    let s = 0;
    for (const [p, v] of Object.entries(c)) s += (counts.get(p) || new Map()).get(v) || 0;
    const n = Object.keys(c).length;
    if (s > bestScore || (s === bestScore && n < bestN)) { best = c; bestScore = s; bestN = n; }
  }
  return best ? { ...per, ...best } : per;
}

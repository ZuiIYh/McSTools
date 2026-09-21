import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { applyRenderForMod, formatRenderLine } from './mod-apply-render.mjs';
import { encodePng } from './png.mjs';
import { extractZipSelective, MOD_ASSET_RE } from './zip.mjs';
import { crossModParentKey } from './mod-shared.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const BLOCKID = path.join(ROOT, 'src-tauri', 'data', 'editor', 'web', 'uploads', 'buildings', 'blockID');
const DB_PATH = path.join(BLOCKID, 'minecraft_blocks_database.json');
const FACE_PATH = path.join(BLOCKID, 'block-face-textures.json');
const IMAGES_DIR = path.join(BLOCKID, 'images');
// 3D 面贴图目录，必须与 images/ 同步，否则 3D 渲染取不到贴图会变粉色
const BLOCK_TEXTURES_DIR = path.join(BLOCKID, 'block-textures');
const IMPORT_DIR = path.join(ROOT, 'src-tauri', 'data', 'editor', 'import', 'mods');
// 隐形技术方块（copycat_panel / crushing_wheel_controller / fake_track / water_wheel_structure 等）
// 没有任何可解析贴图，共用一个 16×16 全透明图标，避免它们只能拿到洋红兜底。
const AIR_ICON = 'mod_air.png';

function parseArgs(argv) {
  const a = { dryRun: false, apply: false, source: null, jar: null };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === '--dry-run') a.dryRun = true;
    else if (x === '--apply') a.apply = true;
    else if (x.startsWith('--source=')) a.source = x.slice('--source='.length);
    else if (x.startsWith('--jar=')) a.jar = x.slice('--jar='.length);
    else if (x === '--source') a.source = argv[++i];
    else if (x === '--jar') a.jar = argv[++i];
    else if (!x.startsWith('--') && !a.jar && !a.source) a.jar = x;
  }
  return a;
}

/**
 * 解开模组 jar —— **只抽** assets 下的 blockstates / models / textures / lang。
 *
 * 旧实现把 jar 复制成 .zip 再交给 PowerShell `Expand-Archive` 解**整包**：
 *   ① 慢（实测 Forge 模组 jar ~9 分钟，解出来的 data/、类文件、META-INF 全都没人用）
 *   ② 抽不到 lang/（当时缓存白名单里就没有它），于是 643 个方块的中文名全空
 * jar 本身就是 zip，直接用 Node 读中央目录、按需 inflate 即可：
 *   实测 3000 条目 ~1.5s，且顺带把 lang 带回来（中文名的唯一来源）。
 */
export function extractJar(jarPath, filter = MOD_ASSET_RE) {
  const buf = fs.readFileSync(jarPath);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-mod-'));
  try {
    extractZipSelective(buf, dir, (n) => filter.test(n));
    return dir;
  } catch (e) {
    fs.rmSync(dir, { recursive: true, force: true });
    throw new Error(`解包 jar 失败（${path.basename(jarPath)}）: ${e.message}`);
  }
}

function loadLang(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return {}; }
}

function titleCase(s) {
  return s.split('_').map(w => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');
}

// 16×16 全透明 PNG（惰性构建并缓存），给无贴图的隐形方块当图标
let _airPng = null;
function airPng() {
  if (!_airPng) _airPng = encodePng(16, 16, Buffer.alloc(16 * 16 * 4));
  return _airPng;
}

function collectModels(bs) {
  const out = new Set();
  if (bs && bs.variants) {
    for (const k of Object.keys(bs.variants)) {
      const v = bs.variants[k];
      if (Array.isArray(v)) v.forEach(x => x && x.model && out.add(x.model));
      else if (v && v.model) out.add(v.model);
    }
  }
  if (bs && bs.multipart) {
    for (const part of bs.multipart) {
      const c = part.apply || part.case;
      if (Array.isArray(c)) c.forEach(x => x && x.model && out.add(x.model));
      else if (c && c.model) out.add(c.model);
    }
  }
  return [...out];
}

// ---------------- 贴图解析（健壮版） ----------------
// 老版本有三个坑，都会把**有贴图的方块**误判成「无贴图」而整块丢弃 → 蓝图里渲染成洋红：
//   1) 无命名空间的贴图引用默认是 `minecraft:`，不是模组自身命名空间
//      （`block/piston_side` → minecraft，不是 create）
//   2) `#变量` 要先沿 textures 表解引用（窗格的 `particle:"#pane"` 曾直接去找 `#pane.png`）
//   3) 只挑 all/side/top/bottom/particle/first 一个键，而齿轮/管道的贴图键是 `0`/`1_2`/`3` 这类
const EDITOR_MODELS_PATH = path.join(BLOCKID, 'mcmeta', 'block-models.json');
let _editorModels = null;
function editorModels() {
  if (_editorModels) return _editorModels;
  try { _editorModels = JSON.parse(fs.readFileSync(EDITOR_MODELS_PATH, 'utf8')); } catch { _editorModels = {}; }
  return _editorModels;
}

function derefVar(tex, v, d = 0) {
  if (typeof v !== 'string' || !v.startsWith('#') || d > 8) return v;
  const k = v.slice(1);
  return k in tex ? derefVar(tex, tex[k], d + 1) : null;
}

/** 展平 parent 链：模组模型优先，缺失时落到编辑器内置的原版模型；合并 textures 并解析 #变量 */
function flattenModModel(extractedDir, modelId, seen = new Set()) {
  if (!modelId || seen.has(modelId)) return null;
  seen.add(modelId);
  const [ns, mp] = modelId.includes(':') ? modelId.split(':') : ['minecraft', modelId];
  let m = null;
  const modPath = path.join(extractedDir, 'assets', ns, 'models', mp + '.json');
  if (fs.existsSync(modPath)) { try { m = JSON.parse(fs.readFileSync(modPath, 'utf8')); } catch { m = null; } }
  if (!m) {
    const em = editorModels();
    // 跨模组 parent：create_connected 大量继承 create 的模型（clutch/gearshift 的几何全在父层），
    // 只按原键名查必然落空 → 方块被判成「无几何」。
    const xmod = crossModParentKey(`${ns}:${mp}`);
    m = em[`${ns}:${mp}`] || em[mp] || (xmod ? em[xmod] : null) || null;
  }
  if (!m) return null;
  let base = { textures: {}, elements: null };
  if (m.parent) {
    const p = flattenModModel(extractedDir, String(m.parent), seen);
    if (p) base = { textures: { ...p.textures }, elements: p.elements };
  }
  return { textures: { ...base.textures, ...(m.textures || {}) }, elements: m.elements || base.elements };
}

/**
 * 其它**已导入模组**资产缓存里的贴图索引：`<ns>:<相对路径>` → 绝对路径（懒构建，只扫一次）。
 *
 * 为什么需要它：模组之间会跨命名空间复用贴图。create_connected 有 15 个方块的模型 100% 引用
 * `create:block/*`（gearbox / axis / cogwheel / vault / redstone_bridge…）—— 只在自己 jar 里找必然
 * 全部落空，于是这些**明明有几何**的方块被判成「无贴图的隐形技术方块」→ 定义指向 block/air
 * → 编辑器里整块不显示（用户看到的「有些贴图加载不出来」）。create 已导入，它的缓存里就有这些
 * PNG，而且多数已经在图集里，可以直接复用。
 */
let _texIndex = null;
function otherModTexIndex() {
  if (_texIndex) return _texIndex;
  _texIndex = new Map();
  try {
    if (!fs.existsSync(IMPORT_DIR)) return _texIndex;
    for (const d of fs.readdirSync(IMPORT_DIR)) {
      const base = path.join(IMPORT_DIR, d, 'assets');
      if (!fs.existsSync(base)) continue;
      for (const ns of fs.readdirSync(base)) {
        const tdir = path.join(base, ns, 'textures');
        if (!fs.existsSync(tdir)) continue;
        const walk = (dir, rel) => {
          let es; try { es = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
          for (const e of es) {
            const p = path.join(dir, e.name);
            if (e.isDirectory()) walk(p, `${rel}${e.name}/`);
            else if (e.name.endsWith('.png')) {
              const k = `${ns}:${rel}${e.name.slice(0, -4)}`;
              if (!_texIndex.has(k)) _texIndex.set(k, p);
            }
          }
        };
        walk(tdir, '');
      }
    }
  } catch { /* 索引失败就当没有，退回原行为 */ }
  return _texIndex;
}

/** 贴图 ID → 磁盘 PNG：① 本模组 jar ② 其它已导入模组的缓存（跨模组依赖）③ 编辑器已落盘的原版贴图 */
function texFileFor(extractedDir, texId) {
  if (typeof texId !== 'string' || !texId || texId.startsWith('#')) return null;
  const [ns, tp] = texId.includes(':') ? texId.split(':') : ['minecraft', texId];
  const modFile = path.join(extractedDir, 'assets', ns, 'textures', tp + '.png');
  if (fs.existsSync(modFile)) return { texId: `${ns}:${tp}`, pngSource: modFile };
  // 跨模组：按「命名空间 + 完整相对路径」精确命中，比下面按 basename 猜的原版兜底可靠
  const other = otherModTexIndex().get(`${ns}:${tp}`);
  if (other) return { texId: `${ns}:${tp}`, pngSource: other, crossMod: true };
  // 原版贴图：编辑器把贴图平铺在 block-textures/<basename>.png
  const van = path.join(BLOCK_TEXTURES_DIR, path.posix.basename(tp) + '.png');
  if (fs.existsSync(van)) return { texId: `${ns}:${tp}`, pngSource: van };
  return null;
}

/**
 * 从一个方块的全部变体模型里挑一张**真实存在**的贴图。
 * 优先级：模组自己的贴图 > 原版贴图 > particle（最后兜底）。
 */
function pickBlockTexture(extractedDir, modelIds, modNs) {
  const mine = [], any = [], particle = [];
  for (const mid of modelIds) {
    const f = flattenModModel(extractedDir, mid);
    if (!f) continue;
    for (const [key, raw] of Object.entries(f.textures)) {
      const hit = texFileFor(extractedDir, derefVar(f.textures, raw));
      if (!hit) continue;
      if (key === 'particle') particle.push(hit);
      else if (hit.texId.startsWith(`${modNs}:`)) mine.push(hit);
      else any.push(hit);
    }
  }
  return mine[0] || any[0] || particle[0] || null;
}

export function parseMod(extractedDir) {
  const assetsDir = path.join(extractedDir, 'assets');
  if (!fs.existsSync(assetsDir)) return { ok: false, reason: 'no assets/ dir' };
  const namespaces = fs.readdirSync(assetsDir).filter(n =>
    fs.statSync(path.join(assetsDir, n)).isDirectory());
  const blocks = [];
  const missing = [];
  const airBlocks = [];
  const noTextureBlocks = [];   // 有几何但一张贴图都没解析到（会由 substitute 兜底，值得盯）
  const seenBlockIds = new Set();
  for (const ns of namespaces) {
    const bsDir = path.join(assetsDir, ns, 'blockstates');
    if (!fs.existsSync(bsDir)) continue;
    // en_us 提供英文名、zh_cn 提供中文名；两者键名一致（`block.<ns>.<name>`，语言键不随语言变化）。
    // 之前只读 en_us 且缓存里根本没有 lang/ → 英文名全靠 titleCase 从 id 猜、中文名恒空。
    const langDir = path.join(assetsDir, ns, 'lang');
    const langEn = loadLang(path.join(langDir, 'en_us.json'));
    const langZh = loadLang(path.join(langDir, 'zh_cn.json'));
    const langName = (dict, n) => dict[`block.${ns}.${n}`] || dict[`${ns}.${n}`] ||
                                  dict[`tile.${ns}.${n}`] || '';
    const files = fs.readdirSync(bsDir).filter(f => f.toLowerCase().endsWith('.json'));
    for (const f of files) {
      const name = f.slice(0, -5);
      const blockId = `${ns}:${name}`;
      if (seenBlockIds.has(blockId)) continue;
      let bs;
      try { bs = JSON.parse(fs.readFileSync(path.join(bsDir, f), 'utf8')); } catch { continue; }
      const modelIds = collectModels(bs);
      const hit = pickBlockTexture(extractedDir, modelIds, ns);
      const english = langName(langEn, name) || titleCase(name);
      const chinese = langName(langZh, name);
      // ★ 隐形技术方块只能靠**几何**判定：模型链展平后一个 element 都没有才算真隐形
      //   （block/air、block/barrier、只有 particle 贴图的占位模型 —— 如 copycat_*、
      //     wrapped_copycat_*、fan_*_catalyst、crushing_wheel_controller）。
      //   以前拿「有没有本模组自己的贴图」当判据 → 跨模组复用贴图的方块全被判成隐形，
      //   编辑器里什么都不显示（create_connected 有 15 个这样的方块）。
      //   真隐形仍要注册：不注册渲染器会给它一个洋红兜底立方体，蓝图里非常显眼。
      const hasGeometry = modelIds.some((mid) => {
        const fm = flattenModModel(extractedDir, mid);
        return !!(fm && Array.isArray(fm.elements) && fm.elements.length > 0);
      });
      if (!hasGeometry) {
        blocks.push({ blockId, modid: ns, name, texId: null, pngSource: null,
                      pngTarget: AIR_ICON, english, chinese, invisible: true,
                      srcModels: modelIds });
        seenBlockIds.add(blockId);
        airBlocks.push(blockId);
        continue;
      }
      // 有几何 → 一定是可见方块。贴图可能来自别的模组（crossMod）；万一一张都找不到，
      // 几何照样移植，缺的贴图由 mod-models 的 substitute() 用图集内近似的补上（不会洋红）。
      if (!hit) noTextureBlocks.push(`${blockId}（几何 ${modelIds.length} 个模型，但一张贴图都没解析到）`);
      const pngBase = hit ? path.basename(hit.texId.split('/').pop()) : null;
      const pngTarget = hit ? `${ns}__${pngBase}.png` : AIR_ICON;
      blocks.push({ blockId, modid: ns, name, texId: hit ? hit.texId : null,
                    pngSource: hit ? hit.pngSource : null, pngTarget, english, chinese });
      seenBlockIds.add(blockId);
    }
  }
  const modid = namespaces.find(n => n !== 'minecraft') || namespaces[0] || null;
  return { ok: true, namespaces, modid, blocks, missing, airBlocks, noTextureBlocks };
}

/**
 * 缓存模组自带的 blockstates / models / textures 到 import/mods/<modid>/assets/<ns>/
 * 之后 enable 时可直接复用，不必重新解包 jar（解包一个 Forge jar 要好几分钟）。
 */
export function cacheModAssets(extractedDir, modid, ns = modid) {
  const src = path.join(extractedDir, 'assets', ns);
  if (!fs.existsSync(src)) return { copied: 0, note: `jar 里没有 assets/${ns}` };
  const dst = path.join(IMPORT_DIR, modid, 'assets', ns);
  // 以缓存目录自身为源重跑安装时（--source=import/mods/<modid>），src 与 dst 会重合，
  // copyFileSync 自我拷贝会把文件截断 —— 直接跳过。
  if (path.resolve(src) === path.resolve(dst)) return { copied: 0, note: '源即缓存，跳过' };
  let copied = 0;
  const copyRel = (rel) => {
    const s = path.join(src, rel);
    if (!fs.existsSync(s)) return;
    (function walk(a, b) {
      fs.mkdirSync(b, { recursive: true });
      for (const e of fs.readdirSync(a, { withFileTypes: true })) {
        const sa = path.join(a, e.name), sb = path.join(b, e.name);
        if (e.isDirectory()) walk(sa, sb);
        else { fs.copyFileSync(sa, sb); copied++; }
      }
    })(s, path.join(dst, rel));
  };
  // ★ 缓存集合必须与 extractJar 的抽取集合**完全一致**（blockstates/models/textures/lang）：
  // 禁用后用 `--source=import/mods/<modid>` 重新启用时，parseMod 读的就是这里 —— 少一个目录，
  // 「启用」的结果就和「首次导入」不一样（此前缺 lang → 重新启用后中文名全空；缺 models/item
  // 则 parent 指向 item 模型的方块会解析退化）。
  for (const r of ['blockstates', 'models', 'textures', 'lang']) copyRel(r);
  return { copied, dir: dst };
}

/** 读已有 manifest 里记录的原始 jar 路径（没有则 null） */
function readSourceJar(modid) {
  try {
    const p = path.join(IMPORT_DIR, `${modid}.manifest.json`);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, 'utf8')).sourceJar || null;
  } catch { return null; }
}

function applyMod(result, args, extractedDir = null) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  fs.mkdirSync(BLOCK_TEXTURES_DIR, { recursive: true });
  fs.mkdirSync(IMPORT_DIR, { recursive: true });
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const face = JSON.parse(fs.readFileSync(FACE_PATH, 'utf8'));
  const modid = result.namespaces.find(n => n !== 'minecraft') || result.namespaces[0] || 'mod';
  // 重装 = 该模组方块库**全量刷新**。必须先把旧的 MOD:<modid> 条目摘掉，否则：
  //   「已有方块」会被 existingIds 跳过而不写进 manifest.entries，
  //   于是 禁用→启用 只能还原新增的那几个 → 其余方块从调色板永久消失。
  const keptOld = db.filter(e => e.version !== `MOD:${modid}`);
  const purged = db.length - keptOld.length;
  db.length = 0;
  for (const e of keptOld) db.push(e);

  let maxIndex = db.reduce((m, e) => Math.max(m, Number(e.index) || 0), 0);
  const existingIds = new Set();
  for (const e of db) for (const mid of (e.minecraft_ids || [])) existingIds.add(mid.id);
  const newEntries = [];
  const blockIds = [];
  const imageFiles = [];
  const blockTextures = [];
  for (const b of result.blocks) {
    // 图集映射要覆盖该模组**全部**方块（含此前已注册过的），否则重复安装后新增方块会缺图集条目
    blockTextures.push({ blockId: b.blockId, texId: b.texId, pngTarget: b.pngTarget });
    if (existingIds.has(b.blockId)) continue;
    maxIndex += 1;
    const entry = {
      index: maxIndex,
      chinese_name: b.chinese,
      english_name: b.english,
      image_filename: b.pngTarget,
      numeric_id: '',
      version: `MOD:${b.modid}`,
      minecraft_ids: [{ id: b.blockId, version_range: '*' }]
    };
    newEntries.push(entry);
    blockIds.push(b.blockId);
    imageFiles.push(b.pngTarget);
    // 隐形方块没有源 PNG，落一份 16×16 全透明图标（否则 copyFileSync 会抛）
    const writePng = (dest) => {
      if (fs.existsSync(dest)) return;
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (b.pngSource) fs.copyFileSync(b.pngSource, dest);
      else fs.writeFileSync(dest, airPng());
    };
    writePng(path.join(IMAGES_DIR, b.pngTarget));
    writePng(path.join(BLOCK_TEXTURES_DIR, b.pngTarget));
    // 缓存到 import/mods/<modid>/，供禁用后一键启用、换镜像自愈（不依赖重新给 jar）
    writePng(path.join(IMPORT_DIR, b.modid, b.pngTarget));
    face[b.blockId] = b.pngTarget;
  }
  for (const e of newEntries) db.push(e);
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  fs.writeFileSync(FACE_PATH, JSON.stringify(face, null, 2), 'utf8');
  // 必须用**全量**方块喂给模型层：applyModModels 会先撤掉本模组的旧占用再重建，
  // 若只传新增方块，重装一次就会把其余方块的 defs 全删掉（→ 洋红）。
  const allBlocks = result.blocks.map(b => b.blockId);
  const manifest = {
    modid,
    source: args.jar || args.source || '',
    // 原始 jar 的绝对路径。`source` 在「用缓存目录重装」时会退化成缓存路径，
    // 于是原 jar 位置就丢了 —— 而补 lang、换版本重装都需要它。
    // 用缓存目录重装时沿用旧值，别把它清成 null。
    sourceJar: args.jar || readSourceJar(modid),
    enabled: true,
    blocks: allBlocks,
    imageFiles,
    blockTextures, // blockId → texId → pngTarget：供图集注入 / 禁用后重新启用时重建
    airBlocks: result.airBlocks || [], // 无贴图的隐形技术方块，模型层会指向 block/air
    entries: newEntries, // 完整 DB 条目，供 enable 原样恢复（无需重新解析 jar）
    generatedAt: new Date().toISOString()
  };
  fs.writeFileSync(path.join(IMPORT_DIR, `${modid}.manifest.json`),
    JSON.stringify(manifest, null, 2), 'utf8');

  // 缓存模组自带的 blockstates/models/textures —— 之后 enable 无需重新解包 jar（解包很慢）
  if (extractedDir) {
    try { cacheModAssets(extractedDir, modid); }
    catch (e) { console.warn('缓存模组资源失败（不影响方块库，但异形几何将不可用）:', e.message); }
  }

  // 关键：几何 + 图集 + 渲染判定 + 自检 一次性做完。
  // 缺任何一步都会出问题：几何缺失 → 异形方块退化成整块立方体；缺渲染判定 → 玻璃发黑/非整块被剔面；
  // 缺自检 → 只能等到在编辑器里看到洋红才发现。
  const render = applyRenderForMod(modid, allBlocks, { blockTextures });
  for (const w of render.warnings) console.error('  ⚠ ' + w);

  // 自检结果落进 manifest：UI 不重启也能看到有没有洋红风险
  manifest.renderReport = render.report;
  fs.writeFileSync(path.join(IMPORT_DIR, `${modid}.manifest.json`),
    JSON.stringify(manifest, null, 2), 'utf8');

  return { added: newEntries.length, copied: imageFiles.length, modid, purged, ...render };
}

// 作为库被 mod-atlas.mjs import 时不执行 CLI
const isMain = process.argv[1] && fileURLToPath(import.meta.url).toLowerCase() === path.resolve(process.argv[1]).toLowerCase();
if (isMain) main();

function main() {
const args = parseArgs(process.argv.slice(2));
let extractedDir = null, cleanup = false;
try {
  if (args.jar) { extractedDir = extractJar(args.jar); cleanup = true; }
  else if (args.source) extractedDir = args.source;
  else {
    console.error('usage: mod-loader.mjs [--jar=path.jar | --source=dir] [--dry-run|--apply]');
    process.exit(2);
  }

  const result = parseMod(extractedDir);
  if (!result.ok) {
    console.log('RESULT_JSON=' + JSON.stringify({ ok: false, reason: result.reason }));
    process.exit(1);
  }

  const summary = {
    ok: true,
    modid: result.modid,
    namespaces: result.namespaces,
    blocksCount: result.blocks.length,
    missingCount: result.missing.length,
    airBlockCount: result.airBlocks.length,
    airBlocks: result.airBlocks,
    noTextureBlocks: result.noTextureBlocks || [],
    blocks: result.blocks.map(b => ({ id: b.blockId, name: b.english })),
    missing: result.missing
  };

  if (args.apply) {
    const ap = applyMod(result, args, extractedDir);
    summary.added = ap.added;
    summary.copied = ap.copied;
    summary.modid = ap.modid;
    summary.atlas = ap.atlas;
    summary.renderHints = ap.renderHints ? ap.renderHints.stats : null;
    summary.renderReport = ap.report;   // 导入自检结果：可渲染 / 隐形 / 有洋红风险
    summary.warnings = ap.warnings;
    console.log(`已应用: 新增 ${ap.added} 条目, 拷贝 ${ap.copied} 张 PNG, manifest=${ap.modid}`);
    console.log('渲染后处理: ' + formatRenderLine(ap));
    if (ap.atlas && ap.atlas.atlasSize) {
      console.log(`  图集尺寸 ${ap.atlas.atlasSize}, 降采样 ${ap.atlas.downscaled ?? 0} 张`);
    }
    if (ap.report && ap.report.modBlocksNotRenderable === 0) {
      console.log('  ✔ 导入自检通过：没有方块取不到图集内纹理（无洋红风险）');
    }
  } else {
    console.log('（dry-run 预览，未修改任何文件）');
  }
  console.log('RESULT_JSON=' + JSON.stringify(summary));
} finally {
  if (cleanup && extractedDir) fs.rmSync(extractedDir, { recursive: true, force: true });
}
}

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { applyRenderForMod, formatRenderLine } from './mod-apply-render.mjs';
import { encodePng } from './png.mjs';

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

export function extractJar(jarPath) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-mod-'));
  // Expand-Archive 只认 .zip 扩展名，直接喂 .jar 会报「不支持该档案文件格式」。
  // 因此先把 jar 复制成 .zip 再解。
  let archive = jarPath;
  let tmpZip = null;
  if (path.extname(jarPath).toLowerCase() !== '.zip') {
    tmpZip = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'mc-mod-zip-')), 'mod.zip');
    fs.copyFileSync(jarPath, tmpZip);
    archive = tmpZip;
  }
  const ps = `Expand-Archive -LiteralPath '${archive.replace(/'/g, "''")}' -DestinationPath '${dir}' -Force`;
  const r = spawnSync('powershell.exe', ['-NoProfile', '-Command', ps], { stdio: 'pipe' });
  if (r.status !== 0) throw new Error('Expand-Archive failed: ' + (r.stderr || r.stdout));
  if (tmpZip) fs.rmSync(path.dirname(tmpZip), { recursive: true, force: true });
  return dir;
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
    m = em[`${ns}:${mp}`] || em[mp] || null;
  }
  if (!m) return null;
  let base = { textures: {}, elements: null };
  if (m.parent) {
    const p = flattenModModel(extractedDir, String(m.parent), seen);
    if (p) base = { textures: { ...p.textures }, elements: p.elements };
  }
  return { textures: { ...base.textures, ...(m.textures || {}) }, elements: m.elements || base.elements };
}

/** 贴图 ID → 磁盘 PNG。先找模组 jar，再退回编辑器已落盘的原版贴图（block-textures/） */
function texFileFor(extractedDir, texId) {
  if (typeof texId !== 'string' || !texId || texId.startsWith('#')) return null;
  const [ns, tp] = texId.includes(':') ? texId.split(':') : ['minecraft', texId];
  const modFile = path.join(extractedDir, 'assets', ns, 'textures', tp + '.png');
  if (fs.existsSync(modFile)) return { texId: `${ns}:${tp}`, pngSource: modFile };
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
  const seenBlockIds = new Set();
  for (const ns of namespaces) {
    const bsDir = path.join(assetsDir, ns, 'blockstates');
    if (!fs.existsSync(bsDir)) continue;
    const lang = loadLang(path.join(assetsDir, ns, 'lang', 'en_us.json'));
    const files = fs.readdirSync(bsDir).filter(f => f.toLowerCase().endsWith('.json'));
    for (const f of files) {
      const name = f.slice(0, -5);
      const blockId = `${ns}:${name}`;
      if (seenBlockIds.has(blockId)) continue;
      let bs;
      try { bs = JSON.parse(fs.readFileSync(path.join(bsDir, f), 'utf8')); } catch { continue; }
      const modelIds = collectModels(bs);
      const hit = pickBlockTexture(extractedDir, modelIds, ns);
      const english = lang[`block.${ns}.${name}`] || lang[`${ns}.${name}`] ||
                      lang[`tile.${ns}.${name}`] || titleCase(name);
      if (!hit) {
        // 没有任何可解析贴图 —— 实测全部是**隐形技术方块**（模型链最终落到 minecraft:block/air，
        // 如 copycat_panel / crushing_wheel_controller / fake_track / water_wheel_structure）。
        // 仍要注册：不注册的话渲染器会给它一个洋红兜底立方体，蓝图里非常显眼。
        // 注册为 invisible，由 mod-models.mjs 把定义指向 block/air（空网格 = 真隐形）。
        blocks.push({ blockId, modid: ns, name, texId: null, pngSource: null,
                      pngTarget: AIR_ICON, english, chinese: '', invisible: true,
                      srcModels: modelIds });
        seenBlockIds.add(blockId);
        airBlocks.push(blockId);
        continue;
      }
      const pngBase = path.basename(hit.texId.split('/').pop());
      const pngTarget = `${ns}__${pngBase}.png`;
      blocks.push({ blockId, modid: ns, name, texId: hit.texId,
                    pngSource: hit.pngSource, pngTarget, english, chinese: '' });
      seenBlockIds.add(blockId);
    }
  }
  const modid = namespaces.find(n => n !== 'minecraft') || namespaces[0] || null;
  return { ok: true, namespaces, modid, blocks, missing, airBlocks };
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
  for (const r of ['blockstates', 'models/block', 'textures/block', 'textures/fluid']) copyRel(r);
  return { copied, dir: dst };
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

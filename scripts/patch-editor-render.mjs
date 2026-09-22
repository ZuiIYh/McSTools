#!/usr/bin/env node
// patch-editor-render.mjs — 让编辑器渲染器认识「模组方块」的透明 / 挖空 / 整块判定
//
// 问题：编辑器把这三类判定硬编码成**原版方块名后缀表**，都写在同一个模块里
//   （chunk 8652 模块 46397）：
//     n (导出 dH) = 非整块表 → isFullCube(e) = !a9(e, n)，决定要不要对相邻方块做面剔除
//     l (导出 bD) = 需 alphaTest（挖空）
//     o (导出 cO) = 需透明（玻璃类）
//   判定函数 i(e, t) = !EXCLUDE.has(e.replace("minecraft:","")) && t.some(s => r.includes(s))
//   —— 按**子串**匹配方块 id。模组方块（create:xxx / create_connected:xxx …）一个都不命中，于是：
//     1) 玻璃/镂空贴图里 a=0 的像素被当不透明画出来 → 整片发黑
//        （实测：fluid_tank 窗 88% 透明、shaft 轴面 94%、fluid_pipe 31%、blaze_burner 59%）
//     2) 非整块的模组方块（管道/传送带/水箱…）被判成整块，渲染器对它做面剔除，
//        相邻方块的面互相吃掉 → 连接段消失、和邻块糊成一片，看起来"没连在一起"
//
// 修法：不逐条往三张表里塞方块名（每次装卸模组都要重写），而是插一小段固定代码：
//   渲染前把 mcmeta/mod-render-hints.json 的判定结果并进 n / l / o，
//   于是材质（8652:161-162、7879:10-13）与面剔除（8652:77/119/127）同时被修正。
//
// 判定来源：mod-render-hints.mjs 先算出每个方块的 render_layer 枚举（opaque/alpha/blend/
//   optionalAlpha，语义对齐基岩版 netease:render_layer 与微软 render_method），再派生成这里
//   需要的 l（挖空 = alpha/optionalAlpha）与 o（透明混合 = blend/optionalAlpha）。渲染器本身
//   没有枚举概念，只有两张布尔表，所以映射放在这一层，渲染器不用改。
//
// 用法：
//   node scripts/patch-editor-render.mjs            # 查看状态
//   node scripts/patch-editor-render.mjs --apply    # 按当前 hints 表打补丁
//   node scripts/patch-editor-render.mjs --revert   # 移除本补丁
//   node scripts/patch-editor-render.mjs --check    # 守门：与 hints 表不一致则退出码 1
//   node scripts/patch-editor-render.mjs --json     # 输出 RESULT_JSON=

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDITOR_WEB_DIR, RENDER_HINTS } from './mod-shared.mjs';

// 用 mod-shared 解析出的 web 目录，而不是自己按仓库布局拼 ——
// 这个补丁会在「安装/启用/禁用」时被 mod-render-hints.mjs 调到（applyRenderPatch），
// 打包后脚本位于 `<安装目录>/_up_/scripts`，自拼 `../src-tauri/data/editor/web` 必然落空。
const WEB = EDITOR_WEB_DIR;
const CHUNKS = path.join(WEB, '_next', 'static', 'chunks');

const MARK_S = '/*modrh-start*/';
const MARK_E = '/*modrh-end*/';
export const MARK_RE = /\/\*modrh-start\*\/[\s\S]*?\/\*modrh-end\*\//;
// 模块 46397 的唯一锚点：紧跟其后那个 function i(e, t) —— 全 chunk 仅一处
const MODULE = '46397: (e, t, r) => {';
const ANCHOR = 'function i(e, t) {';

function walkJs(dir, out = []) {
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkJs(p, out);
    else if (e.name.endsWith('.js')) out.push(p);
  }
  return out;
}

export function loadHints() {
  if (!fs.existsSync(RENDER_HINTS)) return {};
  try {
    const j = JSON.parse(fs.readFileSync(RENDER_HINTS, 'utf8'));
    return j && typeof j === 'object' ? j : {};
  } catch { return {}; }
}

// 只认模组方块（带命名空间且非 minecraft:），原版行为保持一模一样
//
// render_layer 是单一事实来源（见 mod-render-hints.mjs 头部枚举说明）：
//   blend / optionalAlpha → 需要透明混合（o 表）
//   alpha / optionalAlpha → 需要挖空（l 表）
// 落盘时已经派生好 transparent / alphaTest 两个布尔，这里再按 renderLayer 兜一次，
// 这样即便有人只手写 renderLayer 也能正确生效；完全没有 renderLayer 的旧表则按旧布尔走。
export function hintTable(hints) {
  const out = {};
  for (const k of Object.keys(hints).sort()) {
    if (!k.includes(':') || k.startsWith('minecraft:')) continue;
    const h = hints[k] || {};
    const layer = typeof h.renderLayer === 'string' ? h.renderLayer : null;
    let transparent = !!h.transparent;
    let alphaTest = !!h.alphaTest;
    if (layer) {
      if (layer === 'blend' || layer === 'optionalAlpha') transparent = true;
      if (layer === 'alpha' || layer === 'optionalAlpha') alphaTest = true;
    }
    const e = {};
    if (h.fullCube === false) e.fullCube = false;
    if (transparent) e.transparent = true;
    if (alphaTest) e.alphaTest = true;
    if (h.doubleSide) e.doubleSide = true;
    if (Object.keys(e).length) out[k] = e;
  }
  return out;
}

export function renderSnippet(hints) {
  return (
    MARK_S +
    ';(function(){var H=' + JSON.stringify(hintTable(hints)) + ';' +
    'try{self.__MODRENDER_HINTS=H}catch(e){}' +
    'for(var k in H){var h=H[k]||{};' +
    'if(h.doubleSide)a.add(k);' +
    'if(h.fullCube===false&&n.indexOf(k)<0)n.push(k);' +
    'if(h.transparent&&o.indexOf(k)<0)o.push(k);' +
    'if(h.alphaTest&&l.indexOf(k)<0)l.push(k);' +
    '}})();' +
    MARK_E
  );
}

export function findTarget() {
  for (const f of walkJs(CHUNKS)) {
    const s = fs.readFileSync(f, 'utf8');
    const m = s.indexOf(MODULE);
    if (m < 0) continue;
    const a = s.indexOf(ANCHOR, m);
    if (a < 0) continue;
    return { file: f, src: s, at: a };
  }
  return null;
}

// 按当前 hints 表同步补丁（幂等）。返回 { ok, ... }
export function applyRenderPatch() {
  const hints = loadHints();
  const want = renderSnippet(hints);
  const wantCount = Object.keys(hintTable(hints)).length;
  const target = findTarget();
  if (!target) return { ok: false, reason: '找不到编辑器渲染 chunk（模块 46397）' };
  const cur = MARK_RE.exec(target.src);
  const curText = cur ? cur[0] : null;
  let changed = false;
  if (wantCount === 0) {
    if (curText) { fs.writeFileSync(target.file, target.src.replace(MARK_RE, ''), 'utf8'); changed = true; }
  } else if (curText !== want) {
    if (curText) fs.writeFileSync(target.file, target.src.replace(MARK_RE, want), 'utf8');
    else fs.writeFileSync(target.file, target.src.slice(0, target.at) + want + target.src.slice(target.at), 'utf8');
    changed = true;
  }
  return { ok: true, file: path.relative(WEB, target.file), hintBlocks: wantCount, changed };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const argv = process.argv.slice(2);
  const apply = argv.includes('--apply');
  const revert = argv.includes('--revert');
  const check = argv.includes('--check');
  const asJson = argv.includes('--json');

  const hints = loadHints();
  const want = renderSnippet(hints);
  const wantCount = Object.keys(hintTable(hints)).length;
  const target = findTarget();

  if (!target) {
    const res = { ok: false, reason: '找不到编辑器渲染 chunk（模块 46397）—— 请确认镜像已就位', hints: wantCount };
    if (asJson) console.log('RESULT_JSON=' + JSON.stringify(res));
    else console.error(res.reason);
    process.exit(2);
  }

  const cur = MARK_RE.exec(target.src);
  const curText = cur ? cur[0] : null;
  let changed = false;

  if (apply) {
    const r = applyRenderPatch();
    changed = !!r.changed;
  } else if (revert) {
    if (curText) { fs.writeFileSync(target.file, target.src.replace(MARK_RE, ''), 'utf8'); changed = true; }
  }

  const now = MARK_RE.exec(fs.readFileSync(target.file, 'utf8'));
  const ok = wantCount === 0 ? !now : !!now && now[0] === want;
  const res = {
    ok,
    mode: apply ? 'apply' : revert ? 'revert' : 'status',
    file: path.relative(WEB, target.file),
    hintBlocks: wantCount,
    patched: !!now,
    upToDate: !!now && now[0] === want,
    changed,
  };

  if (asJson) console.log('RESULT_JSON=' + JSON.stringify(res));
  else {
    console.log(`渲染补丁: ${res.file}`);
    console.log(`  提示表方块 ${wantCount} 个 | 补丁${res.patched ? '在位' : '未打'}` + (res.patched ? (res.upToDate ? '（与提示表一致）' : '（与提示表不一致）') : ''));
    if (apply) console.log(res.changed ? '  已写入' : '  已是最新，无需改动');
    if (revert) console.log(res.changed ? '  已移除' : '  本来就没有');
    if (check) console.error(ok ? '  检查通过' : '检查未通过：模组方块的透明/挖空/整块判定尚未接入渲染器。');
  }

  if (check && !ok) process.exit(1);
}

#!/usr/bin/env node
// patch-editor-ns.mjs — 放开编辑器渲染器的方块命名空间限制
//
// 问题：编辑器加载 mcmeta/block-definitions.json 等表时这样归一化键：
//     let n = t.startsWith("minecraft:") ? t : "minecraft:".concat(t);
//   → `create:andesite_block` 被改写成 `minecraft:create:andesite_block`，
//     而渲染时按 blockstate.toString()（= `create:andesite_block`）查表 → 永远查不到
//     → 落到兜底网格（顶点色 [1, 0, 1] 的纯洋红立方体）。
//   同一个库里 atlas-uv.json 的归一化用的却是 `t.includes(":")`（保留命名空间），
//   说明上游本就打算支持带命名空间的贴图，只是这 5 处写成了 startsWith 特例。
//
// 处理：把这 5 处（2 个 chunk）的判据由
//     `X.startsWith("minecraft:") ? X : "minecraft:".concat(X)`
//   改为
//     `X.includes(":") ? X : /*modns*/"minecraft:".concat(X)`
//   这是**严格放宽**：无冒号的键（acacia_button / block/stone / item/generated）行为完全不变，
//   只有本就带命名空间的键被保留原样（此前它们全被改坏）。
//
// ⚠️ 为什么要 `/*modns*/` 标记：上游自己就有若干 `X.includes(":") ? X : "minecraft:".concat(X)`
//   （atlas-uv 的命名空间保留），与补丁后的文本**完全同形**。没有标记就无法区分，
//   --check 会误判通过、--revert 会把上游那几处合法代码改坏。
//
// 用法：
//   node scripts/patch-editor-ns.mjs            # 查看状态
//   node scripts/patch-editor-ns.mjs --apply    # 打补丁
//   node scripts/patch-editor-ns.mjs --revert   # 只回滚本补丁（带标记的）
//   node scripts/patch-editor-ns.mjs --check    # 守门：未打补丁则退出码 1
//   node scripts/patch-editor-ns.mjs --json     # 输出 RESULT_JSON=

import fs from 'node:fs';
import path from 'node:path';
import { EDITOR_WEB_DIR, MCMETA_DIR } from './mod-shared.mjs';

const WEB = EDITOR_WEB_DIR;
const CHUNKS = path.join(WEB, '_next', 'static', 'chunks');
const MARK = '/*modns*/';

const ID = '([A-Za-z0-9_$]+)';
const RE_FWD = new RegExp(`${ID}\\.startsWith\\("minecraft:"\\)\\s*\\?\\s*\\1\\s*:\\s*"minecraft:"\\.concat\\(\\1\\)`, 'g');
const RE_MARKED = new RegExp(`${ID}\\.includes\\(":"\\)\\s*\\?\\s*\\1\\s*:\\s*\\/\\*modns\\*\\/"minecraft:"\\.concat\\(\\1\\)`, 'g');

const fwdReplace = (_m, id) => `${id}.includes(":") ? ${id} : ${MARK}"minecraft:".concat(${id})`;
const revReplace = (_m, id) => `${id}.startsWith("minecraft:") ? ${id} : "minecraft:".concat(${id})`;

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

const argv = process.argv.slice(2);
const apply = argv.includes('--apply');
const revert = argv.includes('--revert');
const check = argv.includes('--check');
const asJson = argv.includes('--json');

if (!fs.existsSync(MCMETA_DIR)) {
  console.error(`找不到编辑器目录：${MCMETA_DIR}`);
  process.exit(2);
}

let pending = 0, marked = 0, changed = 0;
const details = [];
for (const f of walkJs(CHUNKS)) {
  const s = fs.readFileSync(f, 'utf8');
  const need = (s.match(RE_FWD) || []).length;
  const done = (s.match(RE_MARKED) || []).length;
  if (!need && !done) continue;
  const rel = path.relative(WEB, f);
  pending += need;
  marked += done;
  if (apply && need) {
    fs.writeFileSync(f, s.replace(RE_FWD, fwdReplace), 'utf8');
    changed += need;
    details.push({ file: rel, patched: need, alreadyMarked: done });
  } else if (revert && done) {
    fs.writeFileSync(f, s.replace(RE_MARKED, revReplace), 'utf8');
    changed += done;
    details.push({ file: rel, reverted: done });
  } else {
    details.push({ file: rel, pending: need, marked: done });
  }
}

const stillPending = apply ? 0 : revert ? pending : pending;
const stillMarked = apply ? marked + changed : revert ? marked - changed : marked;
const ok = stillPending === 0 && stillMarked > 0;
const result = {
  ok, mode: apply ? 'apply' : revert ? 'revert' : 'status',
  pending: stillPending, marked: stillMarked, changed, files: details,
};

if (asJson) console.log('RESULT_JSON=' + JSON.stringify(result));
else {
  for (const d of details) {
    const bits = [];
    if (d.pending) bits.push(`待打补丁 ${d.pending} 处`);
    if (d.marked) bits.push(`已打补丁 ${d.marked} 处`);
    if (d.alreadyMarked) bits.push(`（另有已打补丁 ${d.alreadyMarked} 处）`);
    if (d.patched) bits.push(`本次打补丁 ${d.patched} 处`);
    if (d.reverted) bits.push(`本次回滚 ${d.reverted} 处`);
    console.log(`  ${d.file}: ${bits.join(', ')}`);
  }
  if (!details.length) console.log('未找到编辑器 chunk（先确认镜像已就位）');
  console.log(apply ? `已打补丁 ${changed} 处` : revert ? `已回滚 ${changed} 处` : `待打补丁 ${pending} 处 / 已打补丁 ${marked} 处`);
  if (check && !ok) console.error('检查未通过：方块命名空间限制尚未放开，模组方块会渲染成洋红。');
}

if (check && !ok) process.exit(1);

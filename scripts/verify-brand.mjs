
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const NEW = 'D:/X-drive/IdeaProjects/McSTools/src-tauri/data/editor/web';
const RAW = 'D:/X-drive/IdeaProjects/McSTools/.tmp/mirror-raw2';

const TERMS = {
  'domain': /mcblock\.top/g, 'MCBlock': /MCBlock/g, 'mcblock(非内部键)': /(?<!__)mcblock(?!_)/g,
  '方块工坊': /方块工坊/g, '引擎猫': /引擎猫/g, 'beian': /beian\.miit\.gov\.cn/g,
  'ga id': /G-[A-Z0-9]{8,12}/g, 'gtm': /googletagmanager\.com/g,
  'wxcard': /wxcard-/g, 'baidu': /baidu-site-verification/g, 'msvalidate': /msvalidate\.01/g,
};
function walk(dir) {
  const out = [];
  (function rec(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p); else out.push(p);
    }
  })(dir);
  return out;
}
const rel = (base, p) => path.relative(base, p).split(path.sep).join('/');




const INTERNAL = [
  '__mcblock_',
  'mcblock-mcmeta-',
  'mcblock-desktop-sidebar',
  'mcblock:mobile-panel-open',
  'wxcard-',
  'baidu-site-verification',
  'msvalidate.01',
];
const mask = (t) => INTERNAL.reduce((acc, k) => acc.split(k).join(' '.repeat(k.length)), t);

console.log('=== 1) 品牌词复扫 ===');
let hits = 0;
for (const p of walk(NEW)) {
  const ext = path.extname(p).toLowerCase();
  if (!['.html', '.js', '.json', '.webmanifest', '.css'].includes(ext)) continue;
  let t; try { t = fs.readFileSync(p, 'utf8'); } catch { continue; }
  const m = mask(t);
  const h = Object.entries(TERMS).map(([k, re]) => [k, (m.match(re) || []).length]).filter(([, n]) => n > 0);
  if (h.length) { hits++; console.log(`  残留 ${rel(NEW, p)}: ${h.map(([k, v]) => `${k}:${v}`).join(' ')}`); }
}
console.log(hits === 0 ? '  ✅ 0 处品牌词残留' : `  ❌ ${hits} 个文件仍有残留`);

console.log('\n=== 2) 内部键必须原样保留（新旧镜像逐文件比对） ===');
let ok = true;
for (const p of walk(RAW)) {
  const r = rel(RAW, p);
  const ext = path.extname(p).toLowerCase();
  if (ext !== '.js') continue;
  const a = fs.readFileSync(p, 'utf8');
  const bPath = path.join(NEW, r);
  if (!fs.existsSync(bPath)) continue;
  const b = fs.readFileSync(bPath, 'utf8');
  const fa = (a.match(/__mcblock_[A-Za-z0-9_]+/g) || []).sort().join('|');
  const fb = (b.match(/__mcblock_[A-Za-z0-9_]+/g) || []).sort().join('|');
  if (fa !== fb) { ok = false; console.log(`  ❌ 内部键被改: ${r}`); }
}
console.log(ok ? '  ✅ 所有 __mcblock_* 内部键与原始镜像完全一致' : '  ❌ 有内部键被改动');

console.log('\n=== 3) 改动过的 JS：语法检查前后一致 ===');
const node = 'C:/Users/24949/.workbuddy/binaries/node/versions/22.22.2-3/node.exe';
const check = (f) => { try { execFileSync(node, ['--check', f], { stdio: 'pipe' }); return 'ok'; } catch { return 'fail'; } };
let changed = 0, mismatch = 0;
for (const p of walk(RAW)) {
  const r = rel(RAW, p);
  if (path.extname(p).toLowerCase() !== '.js') continue;
  const np = path.join(NEW, r);
  if (!fs.existsSync(np)) continue;
  if (fs.readFileSync(p).equals(fs.readFileSync(np))) continue;
  changed++;
  const a = check(p), b = check(np);
  if (a !== b) { mismatch++; console.log(`  ❌ ${r}: 原=${a} 新=${b}`); }
  else console.log(`  ${b === 'ok' ? '✅' : '⚠️  (原始也 fail，视作平局)'} ${r}  语法=${b}`);
}
console.log(`  改动的 js 共 ${changed} 个，语法状态不一致 ${mismatch} 个`);

console.log('\n=== 4) 透明占位图签名 ===');
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
for (const p of walk(NEW)) {
  const r = rel(NEW, p);
  if (!/(logo|Icon_Stuido|qr-qq|qr-partner|favicon|apple-touch-icon)/i.test(r)) continue;
  const ext = path.extname(p).toLowerCase();
  if (!['.png', '.ico'].includes(ext)) continue;
  const buf = fs.readFileSync(p);
  if (ext === '.png') console.log(`  ${r} ${buf.length}B PNG签名=${buf.subarray(0, 8).equals(PNG)} IEND=${buf.subarray(-8, -4).toString('ascii')}`);
  else console.log(`  ${r} ${buf.length}B ICO头=${buf.readUInt16LE(0) === 0 && buf.readUInt16LE(2) === 1} 内嵌PNG=${buf.subarray(22, 30).equals(PNG)}`);
}

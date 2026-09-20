
import fs from 'node:fs';
import path from 'node:path';

const A = process.argv[2] || 'D:\\X-drive\\IdeaProjects\\MCBlock蓝图编辑\\MCBlock-Studio-源码版\\site';
const B = process.argv[3] || 'D:\\X-drive\\IdeaProjects\\McSTools\\src-tauri\\data\\editor\\web';

const walk = (dir, out = []) => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const relOf = (root, p) => path.relative(root, p).replace(/\\/g, '/');
const mapOf = (root) => {
  const m = new Map();
  for (const f of walk(root)) {
    let size = 0;
    try { size = fs.statSync(f).size; } catch {}
    m.set(relOf(root, f), size);
  }
  return m;
};

const a = mapOf(A);
const b = mapOf(B);
console.log(`A(旧=源码版site) files=${a.size}   B(新=离线版web) files=${b.size}`);

const onlyA = [...a.keys()].filter((k) => !b.has(k));
const onlyB = [...b.keys()].filter((k) => !a.has(k));
console.log(`\nonly in A (${onlyA.length}):`);
onlyA.slice(0, 50).forEach((k) => console.log('  - ' + k));
console.log(`\nonly in B (${onlyB.length}):`);
onlyB.slice(0, 50).forEach((k) => console.log('  + ' + k));


const fa = onlyA.filter((k) => k.startsWith('_next/'));
const fb = onlyB.filter((k) => k.startsWith('_next/'));
console.log(`\n_next only in A (${fa.length}):`);
fa.slice(0, 60).forEach((k) => console.log('  - ' + k + `  ${a.get(k)}B`));
console.log(`\n_next only in B (${fb.length}):`);
fb.slice(0, 60).forEach((k) => console.log('  + ' + k + `  ${b.get(k)}B`));


const diffSize = [...a.keys()].filter((k) => b.has(k) && a.get(k) !== b.get(k));
console.log(`\nsame name, different size (${diffSize.length}):`);
diffSize.slice(0, 40).forEach((k) => console.log(`  ~ ${k}  ${a.get(k)} -> ${b.get(k)}`));


const pick = (root, file) => {
  const p = path.join(root, file);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};
const refs = (html) => {
  const s = new Set();
  for (const m of html.matchAll(/(?:src|href)="(\/_next\/[^"]+)"/g)) s.add(m[1]);
  for (const m of html.matchAll(/"(\/_next\/[^"]+)"/g)) s.add(m[1]);
  return [...s];
};
for (const page of ['studio/editor/index.html', 'index.html']) {
  const ra = refs(pick(A, page));
  const rb = refs(pick(B, page));
  console.log(`\nrefs of ${page}:  A=${ra.length}  B=${rb.length}`);
  const missingInB = rb.filter((r) => !fs.existsSync(path.join(B, r.replace(/^\//, ''))));
  console.log(`  B refs not on disk (${missingInB.length}):`, missingInB.slice(0, 10).join(', '));
}



import fs from 'node:fs';
import path from 'node:path';

const SITE = 'D:\\X-drive\\IdeaProjects\\MCBlock蓝图编辑\\MCBlock-Studio-源码版\\site';
const WEB = 'D:\\X-drive\\IdeaProjects\\McSTools\\src-tauri\\data\\editor\\web';
const ENTRY = 'D:\\X-drive\\IdeaProjects\\McSTools\\.tmp\\entry-page.html';

let copied = 0;
let failed = 0;
const failures = [];

const walk = (dir, base, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else out.push(p);
  }
  return out;
};

for (const src of walk(SITE)) {
  const rel = path.relative(SITE, src);
  const dst = path.join(WEB, rel);
  try {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    copied++;
  } catch (e) {
    failed++;
    if (failures.length < 10) failures.push(rel + ' :: ' + e.message);
  }
}

console.log(`copied=${copied} failed=${failed}`);
failures.forEach((f) => console.log('  ! ' + f));


if (fs.existsSync(ENTRY)) {
  fs.copyFileSync(ENTRY, path.join(WEB, 'index.html'));
  console.log('entry page restored, size =', fs.statSync(path.join(WEB, 'index.html')).size);
} else {
  console.log('!! entry page backup missing');
}

const size = (p) => (fs.existsSync(p) ? fs.statSync(p).size : -1);
console.log('studio/editor/index.html =', size(path.join(WEB, 'studio', 'editor', 'index.html')));
console.log('chunk 4180 =', size(path.join(WEB, '_next', 'static', 'chunks', '4180.48758e1c562b9fbd.js')));
console.log('chunk 6260 =', size(path.join(WEB, '_next', 'static', 'chunks', '6260-669e0e1261bc8740.js')));

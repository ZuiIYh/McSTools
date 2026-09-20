




import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = 'D:/X-drive/IdeaProjects/McSTools/src-tauri/data/editor/web';
const APPLY = process.argv.includes('--apply');

 
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = -1;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function transparentPng(w = 1, h = 1) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc(h * (1 + w * 4), 0);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
function transparentIco() {
  const png = transparentPng(1, 1);
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0); dir.writeUInt16LE(1, 2); dir.writeUInt16LE(1, 4);
  const e = Buffer.alloc(16);
  e[0] = 1; e[1] = 1; e[2] = 0; e[3] = 0;
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8); e.writeUInt32LE(22, 12);
  return Buffer.concat([dir, e, png]);
}

 
const RULES = [
  ['/* MCBlock Studio offline build: analytics disabled */', '/* offline build: analytics disabled */'],
  
  
  
  [/(\\*")mcblock(\\*")/g, '$1$2'],
  
  
  [/(\\*"gaId\\*":\\*")G-[A-Z0-9]+(\\*")/g, '$1$2'],
  ['https://www.googletagmanager.com/gtm.js', '/__offline-noop.js'],
  ['https://www.googletagmanager.com/gtag/js?id=G-P5QMJ6H9ZH', '/__offline-noop.js'],
  ['https://www.googletagmanager.com/gtag/js?id=', '/__offline-noop.js?id='],
  ['https://www.googletagmanager.com/gtag/js', '/__offline-noop.js'],
  ['https://beian.miit.gov.cn/', '#'],
  ['MCBlock 方块工坊', '投影编辑器'],
  ['MCBlock Studio', '投影编辑器'],
  ['MCBlock Export', '投影导出'],
  ['长沙引擎猫科技有限公司', ''],
  ['方块工坊', ''],
  ['MCBlock', '投影编辑器'],
  ['mcblock.top', 'localhost'],
  [/mcblock-(work|export)/g, 'blueprint'],
];

const FORBIDDEN = /__mcblock_/;

function applyRules(t) {
  let out = t, count = 0;
  for (const [from, to] of RULES) {
    const before = out;
    out = typeof from === 'string' ? out.split(from).join(to) : out.replace(from, to);
    if (out !== before) count++;
  }
  return { out, rulesHit: count };
}

function scrubHtml(t) {
  let out = t, n = 0;
  const wrap = (re, fn) => { out = out.replace(re, (m) => { const r = fn(m); if (r !== m) n++; return r; }); };
  const META_NAMES = /^(og:|twitter:|wxcard-|baidu-site-verification|msvalidate\.01|keywords|description|author|creator|publisher)/i;
  wrap(/<meta\b[^>]*>/gi, (m) => {
    const nm = /(?:name|property)=["']([^"']+)["']/i.exec(m);
    if (!nm || !META_NAMES.test(nm[1])) return m;
    return m.replace(/content=["'][^"']*["']/i, 'content=""');
  });
  wrap(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, (m) => m.replace(/href=["'][^"']*["']/i, 'href=""'));
  wrap(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, () => '<script type="application/ld+json"></script>');
  wrap(/<title[^>]*>[\s\S]*?<\/title>/i, () => '<title>投影编辑器</title>');
  return { out, metaEdits: n };
}




function scrubFlightMeta(t) {
  let out = t;
  let n = 0;
  out = out.replace(
    /(\\*"name\\*":\\*"(?:keywords|description|author|creator|publisher)\\*",\\*"content\\*":\\*")(?:[^"\\]|\\.)*?(\\*")/g,
    (_m, head, tail) => {
      n++;
      return head + tail;
    },
  );
  return { out, flightEdits: n };
}

function scrubManifest(t) {
  try {
    const j = JSON.parse(t);
    j.name = '投影编辑器'; j.short_name = '投影编辑器';
    if (j.description) j.description = '本机离线版投影编辑器';
    return { out: JSON.stringify(j, null, 2), ok: true };
  } catch { return { out: t, ok: false }; }
}

 
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
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

const BRAND_IMG = [/logo/i, /Icon_Stuido/i, /qr-qq/i, /qr-partner/i, /favicon/i, /apple-touch-icon/i];
const IMG_EXT = ['.png', '.ico'];

const report = { text: [], img: [], manifest: [], skipped: [] };
let totalEdits = 0;

for (const p of walk(ROOT)) {
  const r = rel(p);
  const ext = path.extname(p).toLowerCase();

  if (IMG_EXT.includes(ext) && BRAND_IMG.some((re) => re.test(r))) {
    const buf = ext === '.ico' ? transparentIco() : transparentPng(1, 1);
    if (APPLY) fs.writeFileSync(p, buf);
    report.img.push(`${r}  ${fs.statSync(p).size}B -> ${buf.length}B`);
    totalEdits++;
    continue;
  }

  if (!['.html', '.js', '.json', '.webmanifest'].includes(ext)) continue;

  let txt;
  try { txt = fs.readFileSync(p, 'utf8'); } catch { report.skipped.push(r); continue; }
  let out = txt;
  const tags = [];

  if (r === 'site.webmanifest') {
    const { out: o, ok } = scrubManifest(out);
    if (ok) { out = o; tags.push('manifest'); }
  }
  if (ext === '.html') {
    const { out: o, metaEdits } = scrubHtml(out);
    out = o;
    if (metaEdits) tags.push(`meta:${metaEdits}`);
  }
  const { out: o2, rulesHit } = applyRules(out);
  out = o2;
  if (rulesHit) tags.push(`rules:${rulesHit}`);
  const { out: o3, flightEdits } = scrubFlightMeta(out);
  out = o3;
  if (flightEdits) tags.push(`flight:${flightEdits}`);

  if (out === txt) continue;
  if (FORBIDDEN.test(out) && !FORBIDDEN.test(txt)) {
    console.log(`!! 误伤内部键，放弃: ${r}`);
    continue;
  }
  if (APPLY) fs.writeFileSync(p, out, 'utf8');
  report.text.push(`${r}  [${tags.join(' ')}]`);
  totalEdits++;
}

console.log(`模式: ${APPLY ? 'APPLY（已写盘）' : 'DRY-RUN（未改动）'}`);
console.log(`\n=== 品牌图片替换为透明占位 (${report.img.length}) ===`);
report.img.forEach((s) => console.log('  ' + s));
console.log(`\n=== 文本清理 (${report.text.length}) ===`);
report.text.forEach((s) => console.log('  ' + s));
console.log(`\n合计改动 ${totalEdits} 个文件`);

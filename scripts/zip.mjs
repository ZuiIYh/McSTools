// 极简 ZIP 读取器：只做「列目录」与「按需解出若干条目」。
// 用途：模组 jar 本质是 zip，而安装只需要 assets 下的 4 个目录，
// 没必要（也不能）让 PowerShell Expand-Archive 把整个 jar 展开。
// 不依赖第三方库 —— Node 内置 zlib 足以处理 deflate。
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';

const EOCD_SIG = 0x06054b50;
const CEN_SIG = 0x02014b50;
const LOC_SIG = 0x04034b50;

/**
 * 读中央目录。EOCD 在文件尾部（可能有最长 65535 的注释），从后往前找。
 * 返回 [{ name, method, compSize, uncompSize, locOff, isDir }]
 */
export function readCentralDirectory(buf) {
  let eocd = -1;
  const floor = Math.max(0, buf.length - 65535 - 22);
  for (let i = buf.length - 22; i >= floor; i--) {
    if (buf.readUInt32LE(i) === EOCD_SIG) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('不是有效的 ZIP：找不到 EOCD 记录');
  const total = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const out = [];
  for (let n = 0; n < total; n++) {
    if (off + 46 > buf.length || buf.readUInt32LE(off) !== CEN_SIG) {
      throw new Error(`中央目录损坏（第 ${n} 条 @${off}）`);
    }
    const method = buf.readUInt16LE(off + 10);
    const compSize = buf.readUInt32LE(off + 20);
    const uncompSize = buf.readUInt32LE(off + 24);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commentLen = buf.readUInt16LE(off + 32);
    const locOff = buf.readUInt32LE(off + 42);
    // 路径一律 ASCII（assets/<ns>/...），UTF-8 与 CP437 对 ASCII 等价，无需判 flag bit 11
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen);
    out.push({ name, method, compSize, uncompSize, locOff, isDir: name.endsWith('/') });
    off += 46 + nameLen + extraLen + commentLen;
  }
  return out;
}

/** 解出单个条目内容。压缩大小以中央目录为准（本地头在 data descriptor 场景下可能写 0）。 */
export function readEntry(buf, entry) {
  const { locOff } = entry;
  if (locOff + 30 > buf.length || buf.readUInt32LE(locOff) !== LOC_SIG) {
    throw new Error(`本地头损坏: ${entry.name}`);
  }
  const nameLen = buf.readUInt16LE(locOff + 26);
  const extraLen = buf.readUInt16LE(locOff + 28);
  const start = locOff + 30 + nameLen + extraLen;
  const raw = buf.subarray(start, start + entry.compSize);
  if (entry.method === 0) return Buffer.from(raw);
  if (entry.method === 8) return zlib.inflateRawSync(raw);
  throw new Error(`不支持的压缩方法 ${entry.method} @${entry.name}`);
}

/**
 * 按 predicate 选择性解压到 destDir。
 * 防目录穿越（条目名里出现 .. 或空段一律拒绝）。
 * 返回 { extracted, skipped, names }
 */
export function extractZipSelective(buf, destDir, predicate) {
  const entries = readCentralDirectory(buf);
  const names = [];
  let skipped = 0;
  for (const e of entries) {
    if (e.isDir) continue;
    if (!predicate(e.name)) { skipped++; continue; }
    const parts = e.name.split('/');
    if (parts.some((p) => p === '..' || p === '')) { skipped++; continue; }
    const dest = path.join(destDir, ...parts);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, readEntry(buf, e));
    names.push(e.name);
  }
  return { extracted: names.length, skipped, names };
}

/** 模组 jar 里安装流程真正用到的路径（其余一律不抽） */
export const MOD_ASSET_RE = /^(pack\.mcmeta|pack\.png|assets\/[^/]+\/(blockstates|models|textures|lang)\/.+)$/;

// png.mjs — 无依赖 PNG 解码 / 编码 / 缩放
// 用途：向编辑器 3D 图集 mcmeta/atlas.png 里注入模组贴图（需要解码 → 改像素 → 重新编码）。
// 支持解码：色型 0/2/3/4/6，位深 1/2/4/8/16，tRNS 透明色；不支持隔行（interlace）。
// 统一输出 RGBA8；编码固定 RGBA8(colorType 6, depth 8) 非隔行。
import zlib from 'node:zlib';

const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

export function decodePng(buf) {
  if (buf.length < 8 || !buf.subarray(0, 8).equals(SIG)) throw new Error('不是有效的 PNG');
  let off = 8;
  let w = 0, h = 0, bitDepth = 0, colorType = 0, interlace = 0;
  let palette = null, trns = null;
  const idat = [];
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === 'PLTE') palette = Buffer.from(data);
    else if (type === 'tRNS') trns = Buffer.from(data);
    else if (type === 'IDAT') idat.push(Buffer.from(data));
    else if (type === 'IEND') break;
    off += 12 + len;
  }
  if (!w || !h) throw new Error('PNG 缺少 IHDR');
  if (interlace !== 0) throw new Error('暂不支持隔行(interlace) PNG');
  if (![1, 2, 4, 8, 16].includes(bitDepth)) throw new Error('不支持的位深 ' + bitDepth);

  const channels = colorType === 0 ? 1 : colorType === 2 ? 3 : colorType === 3 ? 1 : colorType === 4 ? 2 : colorType === 6 ? 4 : 0;
  if (!channels) throw new Error('不支持的色型 ' + colorType);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bitsPerPixel = channels * bitDepth;
  const bpp = Math.max(1, Math.ceil(bitsPerPixel / 8));
  const stride = Math.ceil((w * bitsPerPixel) / 8);
  const flat = Buffer.alloc(h * stride);
  let pos = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;
    const prev = y > 0 ? flat.subarray((y - 1) * stride, y * stride) : null;
    const cur = flat.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 0xff;
    }
  }

  const rgba = Buffer.alloc(w * h * 4);
  const maxVal = (1 << bitDepth) - 1;
  const scale = (v) => bitDepth === 8 ? v : bitDepth === 16 ? v : Math.round((v * 255) / maxVal);

  // 注意：位偏移必须按“位”算（bitsPerPixel/channels 是位，不是字节），且必须加上行偏移。
  const sample = (rowOff, x, ch) => {
    const bitOff = x * bitsPerPixel + ch * bitDepth;
    if (bitDepth === 16) return flat.readUInt16BE(rowOff + (bitOff >> 3));
    if (bitDepth === 8) return flat[rowOff + (bitOff >> 3)];
    const byte = flat[rowOff + (bitOff >> 3)];
    const shift = 8 - bitDepth - (bitOff & 7);
    return (byte >> shift) & maxVal;
  };

  for (let y = 0; y < h; y++) {
    const rowOff = y * stride;
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4;
      if (colorType === 3) {
        let idx;
        if (bitDepth === 8) idx = flat[rowOff + x];
        else {
          const per = 8 / bitDepth;
          const byte = flat[rowOff + Math.floor(x / per)];
          const shift = 8 - bitDepth * ((x % per) + 1);
          idx = (byte >> shift) & maxVal;
        }
        const n = palette ? palette.length / 3 : 0;
        if (idx < n) {
          rgba[o] = palette[idx * 3];
          rgba[o + 1] = palette[idx * 3 + 1];
          rgba[o + 2] = palette[idx * 3 + 2];
        }
        rgba[o + 3] = trns && idx < trns.length ? trns[idx] : 255;
        continue;
      }
      if (colorType === 0 || colorType === 4) {
        const g = scale(sample(rowOff, x, 0));
        rgba[o] = rgba[o + 1] = rgba[o + 2] = g;
        if (colorType === 4) rgba[o + 3] = scale(sample(rowOff, x, 1));
        else if (trns && trns.length >= 2) rgba[o + 3] = sample(rowOff, x, 0) === trns.readUInt16BE(0) ? 0 : 255;
        else rgba[o + 3] = 255;
        continue;
      }
      rgba[o] = scale(sample(rowOff, x, 0));
      rgba[o + 1] = scale(sample(rowOff, x, 1));
      rgba[o + 2] = scale(sample(rowOff, x, 2));
      rgba[o + 3] = colorType === 6 ? scale(sample(rowOff, x, 3)) : 255;
    }
  }
  return { w, h, rgba, bitDepth, colorType };
}

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
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0);
  return Buffer.concat([head, data, crcBuf]);
}

export function encodePng(w, h, rgba, { level = 9 } = {}) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // RGBA
  ihdr[10] = 0;  // deflate
  ihdr[11] = 0;  // adaptive filtering
  ihdr[12] = 0;  // non-interlaced
  const stride = w * 4;
  const raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const idat = zlib.deflateSync(raw, { level });
  return Buffer.concat([SIG, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

// 最近邻缩放（像素风贴图放大/缩小都不会引入插值偏色）
export function resizeNearest(rgba, sw, sh, dw, dh) {
  if (sw === dw && sh === dh) return Buffer.from(rgba);
  const out = Buffer.alloc(dw * dh * 4);
  for (let y = 0; y < dh; y++) {
    const sy = Math.min(sh - 1, Math.floor((y * sh) / dh));
    for (let x = 0; x < dw; x++) {
      const sx = Math.min(sw - 1, Math.floor((x * sw) / dw));
      const s = (sy * sw + sx) * 4;
      const d = (y * dw + x) * 4;
      out[d] = rgba[s]; out[d + 1] = rgba[s + 1]; out[d + 2] = rgba[s + 2]; out[d + 3] = rgba[s + 3];
    }
  }
  return out;
}

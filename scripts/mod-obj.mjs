// mod-obj.mjs — neoforge:obj 模型的几何烘焙
//
// 背景：Create 有一批方块的真实几何不在 jar 的 block model JSON 里，而是由 `.obj` 文件提供：
//   { "parent": "block/block", "loader": "neoforge:obj", "flip_v": true,
//     "model": "create:models/block/blaze_burner/blaze_cage.obj",
//     "textures": { "0": "create:block/blaze_heater_brazier", "particle": "..." } }
// 展平后拿不到 `elements` → 旧实现走「空几何」兜底 → 整块渲染成一个实心立方体
// （blaze_burner 就是这样：一个 16×16×16 的炉壁贴图立方体）。受影响的 23 个 create 方块：
// blaze_burner / lit_blaze_burner、16 个阀门手轮、crushing_wheel、flywheel、large_water_wheel、
// track（8 个变体）。
//
// 编辑器渲染器的网格构建（chunk 9703 `BlockModel.getElementMesh`）只认 MC Java 的 element 结构：
//   · 一个 element = 轴对齐长方体 `from`/`to`，可选 `rotation{origin, axis, angle, rescale}`
//   · 只取 up/down/north/south/east/west 六个方向的面；面贴图必须写 "#槽名"
// 所以这里把 OBJ 的每个多边形烘焙成一个 element，三种策略：
//   ① 法线轴对齐（实测 9343 面里 7015 面）→ 六个面齐全的盒体合并回一个 element，其余出零厚薄板
//   ② 法线斜置但落在某个坐标平面内（Create 几乎全是 45° 倒角 / 桨叶，maxDev 恒为 0.293 = 1-1/√2）
//      → 用 `element.rotation` **精确**还原（局部是轴对齐薄板，绕一个轴旋转）
//   ③ 其余自由斜置 → 吸附到最近轴出薄板（近似兜底）
//
// 坐标：OBJ 的 (x,y,z) 直接映射到 MC 的 (x,y,z)，乘 16 换到像素空间（NeoForge 的 OBJ loader
// 不做自动缩放 —— Create 的多方块水车专门有 block_extension 模型，说明 OBJ 就是按方块空间写的）；
// `flip_v`（缺省 true）只作用于 UV。
//
// ★ UV 不能简单取 min/max：渲染器把 uv 矩形的 4 个分量固定分配给「某个轴的某一端」上的顶点，
//   顺序写错整张贴图就会镜像/旋转。每个面的对应关系见 RECT_ASSOC（由 chunk 9703 的 6 个面
//   顶点顺序 + 默认 uv 数组反推，脚本见 .tmp/uv-convention.mjs）。

const OTHER = [[1, 2], [2, 0], [0, 1]];   // 轴 d 的另两轴顺序：(u, v)
const AXIS = ['x', 'y', 'z'];
const FACE_POS = ['east', 'up', 'south']; // +x, +y, +z
const FACE_NEG = ['west', 'down', 'north'];
/** 轴对齐判定：法线与最近坐标轴的偏差阈值（1 - |max 分量| < 该值即视为轴对齐） */
const AXIS_EPS = 0.005;
/** 斜置薄板的撑厚（像素）：只为避免两侧面完全共面，远小于 1 像素 */
const MIN_THICK = 0.4;

/**
 * 渲染器的面 uv 约定：rect = [u0, v0, u1, v1]，每项 = [轴号(0=x,1=y,2=z), 端(0=min,1=max)]。
 * 即 rect[0] 取「该轴最小侧」顶点的 u、rect[1] 取「某轴某端」顶点的 v，以此类推。
 *
 * ⚠️ 本表**直接从渲染器 chunk 9703 的 getElementMesh 推出**，不要再用暴力枚举反推
 *    （旧表就是这样反推出来的，六个面的 v 分量端号全反 → 所有 OBJ 方块贴图上下颠倒）。
 *
 * 推导依据（from=[p,d,m], to=[M,v,x]；uv 角序表 c[0]=[0,3,2,3,2,1,0,1]，即
 *   顶点0←(r0,r3) 顶点1←(r2,r3) 顶点2←(r2,r1) 顶点3←(r0,r1)，r=[u0,v0,u1,v1]）：
 *   up    顶点0=(x-min,·,z-max) 顶点2=(x-max,·,z-min)  → u:x-min/x-max  v:z-min/z-max
 *   down  顶点0=(x-min,·,z-min) 顶点2=(x-max,·,z-max)  → u:x-min/x-max  v:z-max/z-min
 *   south 顶点0=(x-min,y-min,·) 顶点2=(x-max,y-max,·)  → u:x-min/x-max  v:y-max/y-min
 *   north 顶点0=(x-max,y-min,·) 顶点2=(x-min,y-max,·)  → u:x-max/x-min  v:y-max/y-min
 *   east  顶点0=(·,y-min,z-max) 顶点2=(·,y-max,z-min)  → u:z-max/z-min  v:y-max/y-min
 *   west  顶点0=(·,y-min,z-min) 顶点2=(·,y-max,z-max)  → u:z-min/z-max  v:y-max/y-min
 */
const RECT_ASSOC = {
  up: [[0, 0], [2, 0], [0, 1], [2, 1]],
  down: [[0, 0], [2, 1], [0, 1], [2, 0]],
  south: [[0, 0], [1, 1], [0, 1], [1, 0]],
  north: [[0, 1], [1, 1], [0, 0], [1, 0]],
  east: [[2, 1], [1, 1], [2, 0], [1, 0]],
  west: [[2, 0], [1, 1], [2, 1], [1, 0]],
};

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const vlen = (a) => Math.hypot(a[0], a[1], a[2]);
const unit = (a) => { const l = vlen(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const r3 = (x) => Math.round(x * 1000) / 1000;

/** 罗德里格旋转：把 v 绕坐标轴 axis 旋转 theta 弧度 */
function rotAxis(axis, theta, v) {
  const k = [0, 0, 0]; k[axis] = 1;
  const c = Math.cos(theta), s = Math.sin(theta);
  const kv = cross(k, v), kd = v[axis];
  return [
    v[0] * c + kv[0] * s + k[0] * kd * (1 - c),
    v[1] * c + kv[1] * s + k[1] * kd * (1 - c),
    v[2] * c + kv[2] * s + k[2] * kd * (1 - c),
  ];
}

/** Newell 法：任意多边形（含非平面）的法线，方向与 OBJ 顶点绕序一致（外侧） */
function newell(pts) {
  const n = [0, 0, 0];
  for (let i = 0; i < pts.length; i++) {
    const c = pts[i], d = pts[(i + 1) % pts.length];
    n[0] += (c[1] - d[1]) * (c[2] + d[2]);
    n[1] += (c[2] - d[2]) * (c[0] + d[0]);
    n[2] += (c[0] - d[0]) * (c[1] + d[1]);
  }
  return unit(n);
}

const bbox3 = (pts) => {
  const b = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  for (const p of pts) for (let i = 0; i < 3; i++) {
    if (p[i] < b[i]) b[i] = p[i];
    if (p[i] > b[i + 3]) b[i + 3] = p[i];
  }
  return b;
};

/** 解析 OBJ：v / vt / f（支持 `v/vt`、`v//vn`、`v`、负索引） */
export function parseObj(text) {
  const v = [], vt = [];
  const faces = [];
  let mat = null;
  for (const raw of String(text).split(/\r?\n/)) {
    const t = raw.trim();
    if (!t || t[0] === '#') continue;
    const p = t.split(/\s+/);
    if (p[0] === 'v' && p.length >= 4) v.push([+p[1], +p[2], +p[3]]);
    else if (p[0] === 'vt' && p.length >= 3) vt.push([+p[1], +p[2]]);
    else if (p[0] === 'usemtl') mat = p[1] ?? null;
    else if (p[0] === 'f') {
      const idx = [];
      for (let i = 1; i < p.length; i++) {
        const tok = p[i].split('/');
        const vi = parseInt(tok[0], 10);
        const ti = tok.length > 1 && tok[1] !== '' ? parseInt(tok[1], 10) : -1;
        idx.push({ v: vi < 0 ? v.length + vi : vi - 1, vt: ti < 0 ? -1 : ti - 1 });
      }
      if (idx.length >= 3) faces.push({ mat, idx });
    }
  }
  return { v, vt, faces };
}

/**
 * 解析 MTL：`newmtl <名>` + `map_Kd #<槽名>`。
 * NeoForge 用 `#槽名` 指向模型 JSON 的 textures 表（这里 `#0` → textures["0"]）。
 */
export function parseMtl(text) {
  const m = new Map();
  let cur = null;
  for (const raw of String(text).split(/\r?\n/)) {
    const t = raw.trim();
    if (!t || t[0] === '#') continue;
    const p = t.split(/\s+/);
    if (p[0] === 'newmtl') cur = p[1] ?? null;
    else if (p[0] === 'map_Kd' && cur) {
      const val = p[1] ?? '';
      if (val.startsWith('#')) m.set(cur, val.slice(1));
    }
  }
  return m;
}

/** uv 兜底：直接取 4 个角 vt 的包围矩形（不保证朝向，只在按轴端取不到时用） */
function uvMinMax(uvs, flipV) {
  if (!uvs.some(Boolean)) return null;
  const us = [], vs = [];
  for (const t of uvs) {
    if (!t) continue;
    us.push(t[0] * 16);
    vs.push((flipV ? 1 - t[1] : t[1]) * 16);
  }
  if (!us.length) return null;
  return [r3(Math.min(...us)), r3(Math.min(...vs)), r3(Math.max(...us)), r3(Math.max(...vs))];
}

/**
 * 按渲染器的面 uv 约定装配 uv 矩形（见 RECT_ASSOC）。
 * 对每个 rect 分量，取「指定轴端」那个顶点的 vt；若同一端上的顶点 vt 不一致
 * （说明 UV 没沿该轴对齐），返回 null 交给调用方退回 uvMinMax。
 */
function uvRectFor(faceName, pts, uvs, flipV) {
  const A = RECT_ASSOC[faceName];
  if (!A || !pts.length || pts.length !== uvs.length) return null;
  const pick = (spec, isU) => {
    const [ax, end] = spec;
    const vals = pts.map((p) => p[ax]);
    const target = end === 0 ? Math.min(...vals) : Math.max(...vals);
    const got = [];
    for (let i = 0; i < pts.length; i++) {
      if (Math.abs(pts[i][ax] - target) > 1e-4) continue;
      const t = uvs[i];
      if (!t) return null;
      got.push((isU ? t[0] : (flipV ? 1 - t[1] : t[1])) * 16);
    }
    if (!got.length) return null;
    if (got.some((x) => Math.abs(x - got[0]) > 0.02)) return null;
    return r3(got[0]);
  };
  const r = [pick(A[0], true), pick(A[1], false), pick(A[2], true), pick(A[3], false)];
  return r.some((x) => x === null) ? null : r;
}

/**
 * 最近一次烘焙的统计（诊断用）：面数、按渲染器约定装配 uv 的面数、退回 min/max 的面数、
 * 合并出的盒体数、零厚薄板数、旋转薄板数、吸附兜底数。
 */
export const lastBakeStats = {};

/**
 * 把一个 neoforge:obj 模型烘焙成 MC element 数组。
 *
 * @param {{ objText:string, mtlText?:string, textures:Object<string,string>,
 *           flipV?:boolean, scale?:number }} o
 *        textures 必须是**已解析**的槽表（值是真实贴图 id，不含 #）。
 * @returns {Array|null} elements；无可用贴图槽或无面时返回 null（交回上层走兜底）
 */
export function bakeObjGeometry({ objText, mtlText, textures, flipV = true, scale = 16 }) {
  const st = { faces: 0, assocUv: 0, fallbackUv: 0, boxes: 0, plates: 0, rotated: 0, snapped: 0, noTex: 0 };
  Object.assign(lastBakeStats, st);
  const fail = () => { Object.assign(lastBakeStats, st); return null; };
  const slots = Object.entries(textures || {})
    .filter(([, val]) => typeof val === 'string' && val && !val.startsWith('#'));
  const defaultSlot = (slots.find(([k]) => k !== 'particle') || slots[0] || [])[0] || null;
  if (!defaultSlot) return fail();

  const obj = parseObj(objText);
  if (!obj.faces.length) return fail();
  const matSlot = mtlText ? parseMtl(mtlText) : new Map();

  // ---- 1. 面 → 归一化描述 ----
  const axisItems = [];
  const tiltItems = [];
  for (const fa of obj.faces) {
    const pts = [];
    const uvs = [];
    for (const x of fa.idx) {
      const p = obj.v[x.v];
      if (!p) continue;
      pts.push([p[0] * scale, p[1] * scale, p[2] * scale]);
      uvs.push(x.vt >= 0 ? obj.vt[x.vt] : null);
    }
    if (pts.length < 3) continue;

    const mtlSlot = fa.mat ? matSlot.get(fa.mat) : null;
    const slotKey = mtlSlot && textures[mtlSlot] ? mtlSlot : defaultSlot;
    const tex = textures[slotKey];
    if (!tex) continue;

    const bb = bbox3(pts);
    const n = newell(pts);
    const dev = 1 - Math.max(Math.abs(n[0]), Math.abs(n[1]), Math.abs(n[2]));
    const item = { P: pts, uvs, bb, n, tex, flipV };
    if (dev < AXIS_EPS) {
      let d = 0;
      for (let i = 1; i < 3; i++) if (Math.abs(n[i]) > Math.abs(n[d])) d = i;
      const s = n[d] >= 0 ? '+' : '-';
      const [u, v] = OTHER[d];
      item.d = d; item.s = s;
      item.c = s === '+' ? bb[d + 3] : bb[d];
      item.u0 = bb[u]; item.u1 = bb[u + 3];
      item.v0 = bb[v]; item.v1 = bb[v + 3];
      axisItems.push(item);
    } else {
      tiltItems.push(item);
    }
  }

  // ---- 2. 六个面齐全的盒体合并回一个 element（省 6 倍体积） ----
  const kOf = (d, s, c, u0, u1, v0, v1) => `${d}${s}${r3(c)}|${r3(u0)},${r3(u1)},${r3(v0)},${r3(v1)}`;
  const byKey = new Map();
  const byRect = new Map();
  for (const it of axisItems) {
    byKey.set(kOf(it.d, it.s, it.c, it.u0, it.u1, it.v0, it.v1), it);
    const rk = `${it.d}|${r3(it.u0)},${r3(it.u1)},${r3(it.v0)},${r3(it.v1)}`;
    if (!byRect.has(rk)) byRect.set(rk, []);
    byRect.get(rk).push(it);
  }

  const used = new Set();
  const elements = [];
  const faceDef = (name, it, pts, uvs) => {
    const f = { texture: it.tex };
    st.faces++;
    const viaAssoc = uvRectFor(name, pts || it.P, uvs || it.uvs, it.flipV);
    const uv = viaAssoc || uvMinMax(uvs || it.uvs, it.flipV);
    if (viaAssoc) st.assocUv++; else st.fallbackUv++;
    if (uv) f.uv = uv;
    return f;
  };

  for (const it of axisItems) {
    if (it.s !== '+' || used.has(it)) continue;
    const [u, v] = OTHER[it.d];
    const rk = `${it.d}|${r3(it.u0)},${r3(it.u1)},${r3(it.v0)},${r3(it.v1)}`;
    const opp = (byRect.get(rk) || [])
      .filter((x) => x.s === '-' && !used.has(x) && x.c < it.c - 1e-6)
      .sort((a, b) => b.c - a.c)[0];
    if (!opp) continue;

    const box = [0, 0, 0, 0, 0, 0];
    box[it.d * 2] = r3(opp.c); box[it.d * 2 + 1] = r3(it.c);
    box[u * 2] = r3(it.u0); box[u * 2 + 1] = r3(it.u1);
    box[v * 2] = r3(it.v0); box[v * 2 + 1] = r3(it.v1);

    const six = [];
    let complete = true;
    for (let d2 = 0; d2 < 3 && complete; d2++) {
      const [u2, v2] = OTHER[d2];
      for (const s2 of ['-', '+']) {
        const c2 = s2 === '+' ? box[d2 * 2 + 1] : box[d2 * 2];
        const hit = byKey.get(kOf(d2, s2, c2, box[u2 * 2], box[u2 * 2 + 1], box[v2 * 2], box[v2 * 2 + 1]));
        if (!hit || used.has(hit)) { complete = false; break; }
        six.push(hit);
      }
    }
    if (!complete) continue;
    for (const x of six) used.add(x);
    const faces = {};
    for (const x of six) {
      const name = x.s === '+' ? FACE_POS[x.d] : FACE_NEG[x.d];
      faces[name] = faceDef(name, x);
    }
    st.boxes++;
    elements.push({ from: [box[0], box[2], box[4]], to: [box[1], box[3], box[5]], faces });
  }

  // ---- 3. 剩下的轴对齐面 → 零厚度薄板（只出朝外那一面） ----
  for (const it of axisItems) {
    if (used.has(it)) continue;
    const [u, v] = OTHER[it.d];
    const box = [0, 0, 0, 0, 0, 0];
    box[it.d * 2] = r3(it.c); box[it.d * 2 + 1] = r3(it.c);
    box[u * 2] = r3(it.u0); box[u * 2 + 1] = r3(it.u1);
    box[v * 2] = r3(it.v0); box[v * 2 + 1] = r3(it.v1);
    const name = it.s === '+' ? FACE_POS[it.d] : FACE_NEG[it.d];
    st.plates++;
    elements.push({
      from: [box[0], box[2], box[4]], to: [box[1], box[3], box[5]],
      faces: { [name]: faceDef(name, it) },
    });
  }

  // ---- 4. 斜置面：落在坐标平面内 → 精确旋转薄板；其余 → 吸附兜底 ----
  for (const it of tiltItems) {
    const n = it.n;
    const zeros = [0, 1, 2].filter((a) => Math.abs(n[a]) < AXIS_EPS);
    let el = null;
    if (zeros.length === 1) {
      const ax = zeros[0];
      const [b] = OTHER[ax];
      const eax = [0, 0, 0]; eax[ax] = 1;
      const eb = [0, 0, 0]; eb[b] = 1;
      const theta = Math.atan2(dot(n, cross(eax, eb)), dot(n, eb));
      if (vlen(sub(rotAxis(ax, theta, eb), n)) < 0.02) {
        const origin = it.P.reduce((a, p) => add(a, p), [0, 0, 0]).map((x) => x / it.P.length);
        const local = it.P.map((p) => add(origin, rotAxis(ax, -theta, sub(p, origin))));
        const lb = bbox3(local);
        const mid = (lb[b] + lb[b + 3]) / 2;
        lb[b] = mid - MIN_THICK / 2; lb[b + 3] = mid + MIN_THICK / 2;
        const pName = FACE_POS[b], nName = FACE_NEG[b];
        el = {
          // bbox3 布局是 [x0,y0,z0,x1,y1,z1]（min 三个在前、max 三个在后），
          // 不是 [x0,x1,y0,y1,z0,z1]。取错了会让三轴互换、撑厚打错轴 → 几何乱飞。
          from: [r3(lb[0]), r3(lb[1]), r3(lb[2])],
          to: [r3(lb[3]), r3(lb[4]), r3(lb[5])],
          rotation: { origin: origin.map(r3), axis: AXIS[ax], angle: r3(theta * 180 / Math.PI), rescale: false },
          faces: {
            [pName]: faceDef(pName, it, local, it.uvs),
            [nName]: faceDef(nName, it, local, it.uvs),
          },
        };
        st.rotated++;
      }
    }
    if (!el) {  // 吸附到最近轴，出零厚度薄板（近似兜底）
      let d = 0;
      for (let i = 1; i < 3; i++) if (Math.abs(n[i]) > Math.abs(n[d])) d = i;
      const c = r3((it.bb[d] + it.bb[d + 3]) / 2);
      // 同上：bbox3 是 [x0,y0,z0,x1,y1,z1] 布局
      const from = [it.bb[0], it.bb[1], it.bb[2]];
      const to = [it.bb[3], it.bb[4], it.bb[5]];
      from[d] = c; to[d] = c;
      const name = n[d] >= 0 ? FACE_POS[d] : FACE_NEG[d];
      st.snapped++;
      el = { from: from.map(r3), to: to.map(r3), faces: { [name]: faceDef(name, it) } };
    }
    elements.push(el);
  }

  // ---- 5. 去重 ----
  const seen = new Set();
  const out = [];
  for (const el of elements) {
    const k = JSON.stringify(el);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(el);
  }
  Object.assign(lastBakeStats, st);
  return out.length ? out : null;
}

"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8652],
  {
    8652: (e, t, r) => {
      r.d(t, { ae: () => p, hG: () => k, hu: () => g, qA: () => w });
      var n = r(85339),
        l = r(85250),
        o = r(82084),
        a = r(37578),
        s = r(46397),
        c = r(28857),
        i = r(55822);
      let u = {
        up: [0, 1, 0],
        down: [0, -1, 0],
        north: [0, 0, -1],
        south: [0, 0, 1],
        east: [1, 0, 0],
        west: [-1, 0, 0],
      };
      function f(e) {
        return !(0, s.a9)(e, s.dH);
      }
      let _ = {
        grass_block: [0.569, 0.741, 0.349],
        short_grass: [0.569, 0.741, 0.349],
        grass: [0.569, 0.741, 0.349],
        tall_grass: [0.569, 0.741, 0.349],
        fern: [0.569, 0.741, 0.349],
        large_fern: [0.569, 0.741, 0.349],
        potted_fern: [0.569, 0.741, 0.349],
        sugar_cane: [0.569, 0.741, 0.349],
        oak_leaves: [0.467, 0.671, 0.184],
        jungle_leaves: [0.467, 0.671, 0.184],
        acacia_leaves: [0.467, 0.671, 0.184],
        dark_oak_leaves: [0.467, 0.671, 0.184],
        mangrove_leaves: [0.467, 0.671, 0.184],
        vine: [0.467, 0.671, 0.184],
        spruce_leaves: [0.38, 0.6, 0.38],
        birch_leaves: [0.502, 0.655, 0.333],
        azalea_leaves: [0.467, 0.671, 0.184],
        flowering_azalea_leaves: [0.467, 0.671, 0.184],
      };
      function d(e) {
        var t;
        return null != (t = _[e.replace("minecraft:", "")]) ? t : null;
      }
      function h(e, t) {
        for (let r of e.quads)
          for (let e of r.vertices()) {
            let r = e.color;
            r && (r[0] < 0.99 || r[1] < 0.99 || r[2] < 0.99) && (e.color = t);
          }
      }
      function p(e, t) {
        let { blockDefinitions: r, blockModels: n, atlas: i } = t,
          _ = new Map();
        for (let t of e.blocks) {
          let e = "".concat(t.position[0], ",").concat(t.position[1], ",").concat(t.position[2]);
          _.set(e, t);
        }
        let p = e.totalBlockCount > 5e3,
          w = new Set();
        if (p)
          for (let t of e.blocks) {
            if (!f(t.blockId)) continue;
            let [e, r, n] = t.position,
              l = !0;
            for (let [t, o, a] of Object.values(u)) {
              let s = _.get(
                ""
                  .concat(e + t, ",")
                  .concat(r + o, ",")
                  .concat(n + a),
              );
              if (!s || !f(s.blockId)) {
                l = !1;
                break;
              }
            }
            l && w.add("".concat(e, ",").concat(r, ",").concat(n));
          }
        let g = new Map();
        for (let a of e.blocks) {
          let e,
            s = "".concat(a.position[0], ",").concat(a.position[1], ",").concat(a.position[2]);
          if (p && w.has(s)) continue;
          let [b, v, y] = a.position,
            M = a.blockId,
            T = (0, c.yN)(a, _),
            I = (0, c.uO)(T, t.defaultBlockProperties.get(M));
          if ((0, c.vD)(M)) {
            let e = (0, c.mD)(M, I, i),
              t = l.vt();
            (l.Tl(t, t, [b, v, y]), e.transform(t), e.computeNormals());
            let r = new o.Mi(b, v, y);
            for (let t of e.quads)
              t.forEach((e) => {
                e.blockPos = r;
              });
            g.has(M) || g.set(M, { quads: [], positions: [] });
            let n = g.get(M);
            (n.quads.push(...e.quads), n.positions.push(a.position));
            continue;
          }
          let q = o.gw.parse(M),
            x = r.getBlockDefinition(q),
            N = M.replace("minecraft:", ""),
            O = /(^|_)banner$/.test(N) || /(^|_)wall_banner$/.test(N),
            P = O ? null : (0, c.e7)(M, I, i);
          if ((0, c.a4)(M)) e = (0, c.nf)(I, i);
          else if (O) {
            var k;
            e = null != (k = (0, c.jX)(M, I, i)) ? k : m();
          } else if (P) e = P;
          else if (x) {
            let t = {};
            if (f(M))
              for (let e of o.OP.ALL) {
                let [r, n, l] = u[e],
                  o = ""
                    .concat(b + r, ",")
                    .concat(v + n, ",")
                    .concat(y + l),
                  a = _.get(o);
                a && f(a.blockId) && (t[e] = !0);
              }
            try {
              e = x.getMesh(q, I, i, n, t);
            } catch (t) {
              e = m();
            }
          } else e = m();
          if (0 === e.quads.length) {
            let t = (0, c.jX)(M, I, i);
            if (!t) continue;
            e = t;
          }
          let j = d(M);
          j && h(e, j);
          let z = l.vt();
          (l.Tl(z, z, [b, v, y]), e.transform(z), e.computeNormals());
          let S = new o.Mi(b, v, y);
          for (let t of e.quads)
            t.forEach((e) => {
              e.blockPos = S;
            });
          g.has(M) || g.set(M, { quads: [], positions: [] });
          let A = g.get(M);
          (A.quads.push(...e.quads), A.positions.push(a.position));
        }
        let v = [];
        for (let [e, { quads: t, positions: r }] of g.entries()) {
          if (0 === t.length) continue;
          let n = b(t);
          v.push({
            blockId: e,
            geometry: n,
            blockPositions: r,
            needsAlphaTest: (0, s.a9)(e, s.bD),
            needsTransparent: (0, s.a9)(e, s.cO) || (0, c.vD)(e),
            animationInfo: (0, a.ae)(e),
          });
        }
        return v;
      }
      function b(e) {
        let t = 4 * e.length,
          r = 6 * e.length,
          l = new Float32Array(3 * t),
          o = new Float32Array(2 * t),
          a = new Float32Array(3 * t),
          s = new Float32Array(3 * t),
          c = new Float32Array(3 * t),
          i = new Uint32Array(r);
        for (let t = 0; t < e.length; t++) {
          let r = e[t].vertices(),
            n = 4 * t,
            h = 6 * t;
          for (let e = 0; e < 4; e++) {
            var u, f, _, d;
            let t = r[e],
              i = (n + e) * 3,
              h = (n + e) * 2;
            ((l[i] = t.pos.x),
              (l[i + 1] = t.pos.y),
              (l[i + 2] = t.pos.z),
              t.texture && ((o[h] = t.texture[0]), (o[h + 1] = t.texture[1])),
              t.normal && ((a[i] = t.normal.x), (a[i + 1] = t.normal.y), (a[i + 2] = t.normal.z)));
            let p = null != (u = t.color) ? u : [1, 1, 1];
            ((s[i] = null != (f = p[0]) ? f : 1),
              (s[i + 1] = null != (_ = p[1]) ? _ : 1),
              (s[i + 2] = null != (d = p[2]) ? d : 1),
              t.blockPos &&
                ((c[i] = t.blockPos.x), (c[i + 1] = t.blockPos.y), (c[i + 2] = t.blockPos.z)));
          }
          ((i[h] = n),
            (i[h + 1] = n + 1),
            (i[h + 2] = n + 2),
            (i[h + 3] = n),
            (i[h + 4] = n + 2),
            (i[h + 5] = n + 3));
        }
        let h = new n.LoY();
        return (
          h.setAttribute("position", new n.THS(l, 3)),
          h.setAttribute("uv", new n.THS(o, 2)),
          h.setAttribute("normal", new n.THS(a, 3)),
          h.setAttribute("color", new n.THS(s, 3)),
          h.setAttribute("blockPos", new n.THS(c, 3)),
          h.setIndex(new n.THS(i, 1)),
          h
        );
      }
      function m() {
        let e = [],
          t = [1, 0, 1];
        for (let r of [
          {
            verts: [
              [0, 1, 0],
              [0, 1, 1],
              [1, 1, 1],
              [1, 1, 0],
            ],
            normal: [0, 1, 0],
          },
          {
            verts: [
              [0, 0, 1],
              [0, 0, 0],
              [1, 0, 0],
              [1, 0, 1],
            ],
            normal: [0, -1, 0],
          },
          {
            verts: [
              [1, 1, 0],
              [1, 0, 0],
              [0, 0, 0],
              [0, 1, 0],
            ],
            normal: [0, 0, -1],
          },
          {
            verts: [
              [0, 1, 1],
              [0, 0, 1],
              [1, 0, 1],
              [1, 1, 1],
            ],
            normal: [0, 0, 1],
          },
          {
            verts: [
              [1, 1, 1],
              [1, 0, 1],
              [1, 0, 0],
              [1, 1, 0],
            ],
            normal: [1, 0, 0],
          },
          {
            verts: [
              [0, 1, 0],
              [0, 0, 0],
              [0, 0, 1],
              [0, 1, 1],
            ],
            normal: [-1, 0, 0],
          },
        ]) {
          let n = r.verts.map((e) => {
            let [n, l, a] = e,
              s = new o.Mi(n, l, a),
              c = new o.Mi(r.normal[0], r.normal[1], r.normal[2]);
            return new o.Li(s, t, void 0, void 0, c, void 0);
          });
          e.push(new o.kO(n[0], n[1], n[2], n[3]));
        }
        return new o.e(e);
      }
      function w(e, t, r) {
        let n,
          { blockDefinitions: l, blockModels: a, atlas: s } = r,
          u = (0, c.uO)(t, r.defaultBlockProperties.get(e)),
          f = !1,
          _ = (0, i.HP)(e) ? null : (0, c.e7)(e, u, s);
        if ((0, c.a4)(e)) n = (0, c.nf)(u, s);
        else if ((0, i.HP)(e)) {
          var p;
          n = null != (p = (0, c.jX)(e, u, s)) ? p : m();
        } else if (_) n = _;
        else if ((0, c.vD)(e)) n = (0, c.mD)(e, u, s);
        else {
          let t = o.gw.parse(e),
            r = l.getBlockDefinition(t);
          if (r)
            try {
              n = r.getMesh(t, u, s, a, {});
            } catch (e) {
              ((n = m()), (f = !0));
            }
          else ((n = m()), (f = !0));
        }
        if (0 === n.quads.length) {
          let t = (0, c.jX)(e, u, s);
          t ? ((n = t), (f = !1)) : ((n = m()), (f = !0));
        }
        let w = d(e);
        (w && h(n, w), n.computeNormals());
        let g = b(n.quads);
        return ((g.userData.magentaFallback = f), g);
      }
      function g(e, t) {
        let r = e.includes(":") ? e : /*modns*/"minecraft:".concat(e),
          n = t.blockModels.getBlockModel(o.gw.parse(r));
        if (!n) return null;
        let l = n.getMesh(t.atlas, {});
        return 0 === l.quads.length ? null : (l.computeNormals(), b(l.quads));
      }
      function k(e, t, r) {
        let n,
          a = r.blockModels.getBlockModel(o.gw.parse(e));
        if (!a) return null;
        let s = (0, c.uO)({}, r.defaultBlockProperties.get(t)),
          i = o.IM[o.gw.parse(t).path];
        try {
          n = a.getMesh(r.atlas, {}, null == i ? void 0 : i(s));
        } catch (e) {
          return null;
        }
        if (0 === n.quads.length) return null;
        let u = d(t);
        return (
          u && h(n, u),
          n.transform(l.CV(l.vt(), [1 / 16, 1 / 16, 1 / 16])),
          n.computeNormals(),
          b(n.quads)
        );
      }
    },
    28857: (e, t, r) => {
      r.d(t, {
        a4: () => O,
        e7: () => R,
        jX: () => F,
        mD: () => b,
        nf: () => P,
        qv: () => m,
        uO: () => U,
        vD: () => i,
        wd: () => w,
        yN: () => d,
      });
      var n = r(85250),
        l = r(82084),
        o = r(55822);
      let a = new Set([
          "minecraft:water",
          "minecraft:lava",
          "minecraft:flowing_water",
          "minecraft:flowing_lava",
        ]),
        s = {
          up: "__mcblock_fluid_face_up",
          down: "__mcblock_fluid_face_down",
          north: "__mcblock_fluid_face_north",
          south: "__mcblock_fluid_face_south",
          east: "__mcblock_fluid_face_east",
          west: "__mcblock_fluid_face_west",
        },
        c = {
          northWest: "__mcblock_fluid_h_nw",
          northEast: "__mcblock_fluid_h_ne",
          southEast: "__mcblock_fluid_h_se",
          southWest: "__mcblock_fluid_h_sw",
        };
      function i(e) {
        return a.has(e);
      }
      function u(e) {
        return e.includes("water") ? "water" : e.includes("lava") ? "lava" : null;
      }
      function f(e, t, r) {
        return "".concat(e, ",").concat(t, ",").concat(r);
      }
      function _(e, t) {
        if (!t) return !1;
        let r = u(e);
        return null !== r && u(t.blockId) === r;
      }
      function d(e, t) {
        var r;
        let n = e.properties || {},
          l = i(e.blockId),
          a = (0, o.HP)(e.blockId) ? (null == (r = e.renderData) ? void 0 : r.banner) : void 0;
        if (!l && !a) return n;
        let u = { ...n };
        if (l) {
          let [r, n, l] = e.position,
            o = {
              up: t.get(f(r, n + 1, l)),
              down: t.get(f(r, n - 1, l)),
              north: t.get(f(r, n, l - 1)),
              south: t.get(f(r, n, l + 1)),
              east: t.get(f(r + 1, n, l)),
              west: t.get(f(r - 1, n, l)),
            };
          for (let t of Object.keys(s)) u[s[t]] = _(e.blockId, o[t]) ? "false" : "true";
          ((u[c.northWest] = p(
            h(e, t, [
              [0, 0],
              [-1, 0],
              [0, -1],
              [-1, -1],
            ]),
          )),
            (u[c.northEast] = p(
              h(e, t, [
                [0, 0],
                [1, 0],
                [0, -1],
                [1, -1],
              ]),
            )),
            (u[c.southEast] = p(
              h(e, t, [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
              ]),
            )),
            (u[c.southWest] = p(
              h(e, t, [
                [0, 0],
                [-1, 0],
                [0, 1],
                [-1, 1],
              ]),
            )));
        }
        if (a) {
          a.baseColor && (u[o.Rf] = a.baseColor);
          let e = (0, o.am)(a.patterns);
          e && (u[o.X1] = e);
        }
        return u;
      }
      function h(e, t, r) {
        var n, l;
        let [o, a, s] = e.position,
          c = 0,
          i = 0;
        for (let [l, u] of r) {
          let r = 0 === l && 0 === u ? e : t.get(f(o + l, a, s + u));
          if (!_(e.blockId, r)) continue;
          if (_(e.blockId, t.get(f(o + l, a + 1, s + u)))) return 1;
          let d = g(null != (n = null == r ? void 0 : r.properties) ? n : {}),
            h = d >= 0.8 ? 10 : 1;
          ((c += d * h), (i += h));
        }
        return i > 0 ? c / i : g(null != (l = e.properties) ? l : {});
      }
      function p(e) {
        return Math.max(0, Math.min(1, e)).toFixed(4);
      }
      function b(e) {
        var t;
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 ? arguments[2] : void 0,
          o = arguments.length > 3 ? arguments[3] : void 0,
          a = [],
          i = e.includes("water"),
          u = i ? [0.2, 0.4, 0.9] : [0.9, 0.5, 0.1],
          f = g(r),
          _ = k(r, c.northWest, f),
          d = k(r, c.northEast, f),
          h = k(r, c.southEast, f),
          p = k(r, c.southWest, f),
          b = v(n, i ? "minecraft:block/water_still" : "minecraft:block/lava_still"),
          m =
            null != (t = v(n, i ? "minecraft:block/water_flow" : "minecraft:block/lava_flow"))
              ? t
              : b,
          w = [];
        for (let e of [
          {
            face: "up",
            verts: [
              [0, _, 0],
              [0, p, 1],
              [1, h, 1],
              [1, d, 0],
            ],
            normal: [0, 1, 0],
            uv: b,
          },
          {
            face: "down",
            verts: [
              [0, 0, 1],
              [0, 0, 0],
              [1, 0, 0],
              [1, 0, 1],
            ],
            normal: [0, -1, 0],
            uv: b,
          },
          {
            face: "north",
            verts: [
              [1, d, 0],
              [1, 0, 0],
              [0, 0, 0],
              [0, _, 0],
            ],
            normal: [0, 0, -1],
            uv: m,
          },
          {
            face: "south",
            verts: [
              [0, p, 1],
              [0, 0, 1],
              [1, 0, 1],
              [1, h, 1],
            ],
            normal: [0, 0, 1],
            uv: m,
          },
          {
            face: "east",
            verts: [
              [1, h, 1],
              [1, 0, 1],
              [1, 0, 0],
              [1, d, 0],
            ],
            normal: [1, 0, 0],
            uv: m,
          },
          {
            face: "west",
            verts: [
              [0, _, 0],
              [0, 0, 0],
              [0, 0, 1],
              [0, p, 1],
            ],
            normal: [-1, 0, 0],
            uv: m,
          },
        ]) {
          let t = "false" === r[s[e.face]],
            n = "up" === e.face && t && (null == o ? void 0 : o.keepTopFace) === !0;
          if (t && !n) continue;
          let c = (function (e) {
              if (!e) return [void 0, void 0, void 0, void 0];
              let [t, r, n, l] = e;
              return [
                [t, r],
                [t, l],
                [n, l],
                [n, r],
              ];
            })(e.uv),
            i = e.verts.map((t, r) => {
              let [n, o, a] = t,
                s = new l.Mi(n, o, a),
                i = new l.Mi(e.normal[0], e.normal[1], e.normal[2]);
              return new l.Li(s, u, c[r], void 0, i, void 0);
            }),
            f = new l.kO(i[0], i[1], i[2], i[3]);
          n ? w.push(f) : a.push(f);
        }
        return new l.e([...a, ...w]);
      }
      let m = 1;
      function w(e, t) {
        return (null == t ? void 0 : t.keepTopFace) === !0 && "false" === e[s.up];
      }
      function g(e) {
        var t;
        let r = Number.parseInt(null != (t = e.level) ? t : "0", 10);
        return !Number.isFinite(r) || r <= 0 ? 8 / 9 : r >= 8 ? 1 : Math.max(1 / 9, (8 - r) / 9);
      }
      function k(e, t, r) {
        var n;
        let l = Number.parseFloat(null != (n = e[t]) ? n : "");
        return Number.isFinite(l) ? Math.max(0, Math.min(1, l)) : r;
      }
      function v(e, t) {
        if (!e) return null;
        try {
          let r = e.getTextureUV(l.gw.parse(t));
          return r && 4 === r.length ? [r[0], r[1], r[2], r[3]] : null;
        } catch (e) {
          return null;
        }
      }
      let y = [5.5, 0.25, 10.5, 10.25],
        M = [0.25, 0.25, 5.25, 10.25],
        T = [0, 0.25, 0.25, 10.25],
        I = [5.25, 0.25, 5.5, 10.25],
        q = [0.25, 0, 5.25, 0.25],
        x = [5.25, 0, 10.25, 0.25];
      function N(e, t, r) {
        let n = v(e, t);
        if (!n) return null;
        let [l, o, a, s] = n,
          c = (a - l) / 16,
          i = (s - o) / 16;
        return [l + r[0] * c, o + r[1] * i, l + r[2] * c, o + r[3] * i];
      }
      function O(e) {
        return "minecraft:redstone_wire" === e || "minecraft:redstone" === e;
      }
      function P() {
        var e, t, r, n;
        let o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          a = arguments.length > 1 ? arguments[1] : void 0,
          s = (function (e) {
            let t = z(e);
            if (0 === t) return [0.42, 0.03, 0.02];
            let r = t / 15;
            return [0.72 + 0.28 * r, 0.06 + 0.1 * r, 0.03 + 0.03 * r];
          })(o.power),
          c = (function (e) {
            let t = z(e);
            if (0 === t) return [0.35, 0.02, 0.015];
            let r = t / 15;
            return [0.95 + 0.05 * r, 0.11 + 0.14 * r, 0.06 + 0.05 * r];
          })(o.power),
          i =
            null != (e = v(a, "minecraft:block/redstone_dust_dot"))
              ? e
              : (function (e) {
                  if (!e) return null;
                  for (let t of [
                    "minecraft:block/white_stained_glass",
                    "minecraft:block/quartz_block",
                    "minecraft:block/white_wool",
                  ])
                    try {
                      let r = e.getTextureUV(l.gw.parse(t));
                      if (r && 4 === r.length) return [r[0], r[1], r[2], r[3]];
                    } catch (e) {}
                  return null;
                })(a),
          u = null != (t = v(a, "minecraft:block/redstone_dust_line0")) ? t : i,
          f = null != (r = v(a, "minecraft:block/redstone_dust_line1")) ? r : u,
          _ = null != (n = v(a, "minecraft:block/redstone_dust_overlay")) ? n : null,
          d = [],
          h = 5 / 16,
          p = 11 / 16,
          b = 6 / 16,
          m = 1 / 64,
          w = 1 / 48,
          g = { north: j(o.north), south: j(o.south), east: j(o.east), west: j(o.west) },
          k = Object.values(g).some((e) => "none" !== e);
        return (
          S(d, h, h, p, p, m, s, i),
          k
            ? ("none" !== g.north && S(d, b, 0, 0.625, h, m, s, u),
              "none" !== g.south && S(d, b, p, 0.625, 1, m, s, u),
              "none" !== g.west && S(d, 0, b, h, 0.625, m, s, f),
              "none" !== g.east && S(d, p, b, 1, 0.625, m, s, f),
              _ && z(o.power) > 0 && S(d, h, h, p, p, w, c, _))
            : _ && S(d, h, h, p, p, w, c, _),
          "up" === g.north && A(d, "north", b, 0.625, s, u),
          "up" === g.south && A(d, "south", b, 0.625, s, u),
          "up" === g.west && A(d, "west", b, 0.625, s, f),
          "up" === g.east && A(d, "east", b, 0.625, s, f),
          new l.e(d)
        );
      }
      function j(e) {
        return "side" === e || "up" === e ? e : "none";
      }
      function z(e) {
        return Math.max(0, Math.min(15, Number.parseInt(null != e ? e : "0", 10) || 0));
      }
      function S(e, t, r, n, l, o, a, s) {
        $(e, t, o, r, n, o, l, "top", a, s);
      }
      function A(e, t, r, n, l, o) {
        let a = 1 / 64;
        switch (t) {
          case "north":
            $(e, r, 1 / 64, a, n, 1, a, "back", l, o);
            break;
          case "south":
            $(e, r, 1 / 64, 1 - a, n, 1, 1 - a, "front", l, o);
            break;
          case "west":
            $(e, a, 1 / 64, r, a, 1, n, "left", l, o);
            break;
          case "east":
            $(e, 1 - a, 1 / 64, r, 1 - a, 1, n, "right", l, o);
        }
      }
      let D = new Set([
          "skeleton_skull",
          "skeleton_wall_skull",
          "wither_skeleton_skull",
          "wither_skeleton_wall_skull",
          "zombie_head",
          "zombie_wall_head",
          "creeper_head",
          "creeper_wall_head",
          "player_head",
          "player_wall_head",
          "piglin_head",
          "piglin_wall_head",
          "dragon_head",
          "dragon_wall_head",
        ]),
        X = {
          chest: [0.6, 0.4, 0.2],
          trapped_chest: [0.6, 0.4, 0.2],
          ender_chest: [0.1, 0.2, 0.3],
          shulker_box: [0.6, 0.3, 0.6],
          bed: [0.7, 0.2, 0.2],
          banner: [0.9, 0.9, 0.9],
          head: [0.7, 0.6, 0.5],
          skull: [0.8, 0.8, 0.7],
          sign: [0.6, 0.5, 0.3],
          wall_sign: [0.6, 0.5, 0.3],
          hanging_sign: [0.6, 0.5, 0.3],
          bell: [0.8, 0.7, 0.2],
          conduit: [0.5, 0.7, 0.8],
          enchanting_table: [0.3, 0.1, 0.1],
          lectern: [0.6, 0.4, 0.2],
          brewing_stand: [0.4, 0.4, 0.4],
          decorated_pot: [0.7, 0.5, 0.3],
          campfire: [0.5, 0.3, 0.1],
          soul_campfire: [0.2, 0.4, 0.5],
          piston_head: [0.6, 0.6, 0.5],
          moving_piston: [0.6, 0.6, 0.5],
          end_portal_frame: [0.3, 0.5, 0.3],
          end_portal: [0.05, 0.05, 0.1],
          end_gateway: [0.05, 0.05, 0.1],
          spawner: [0.2, 0.2, 0.3],
          wall_banner: [0.9, 0.9, 0.9],
          flower_pot: [0.6, 0.3, 0.2],
        },
        E = {
          chest: [1 / 16, 0, 1 / 16, 0.875, 0.875, 0.875],
          trapped_chest: [1 / 16, 0, 1 / 16, 0.875, 0.875, 0.875],
          ender_chest: [1 / 16, 0, 1 / 16, 0.875, 0.875, 0.875],
          shulker_box: [1 / 16, 0, 1 / 16, 0.875, 0.875, 0.875],
          bed: [0, 0, 0, 1, 9 / 16, 1],
          head: [0.25, 0, 0.25, 0.5, 0.5, 0.5],
          skull: [0.25, 0, 0.25, 0.5, 0.5, 0.5],
          sign: [0, 0, 7 / 16, 1, 1, 2 / 16],
          wall_sign: [0, 4.5 / 16, 0, 1, 0.5, 2 / 16],
          hanging_sign: [1 / 16, 0, 7 / 16, 0.875, 0.625, 2 / 16],
          bell: [5 / 16, 1 / 16, 5 / 16, 6 / 16, 9 / 16, 6 / 16],
          conduit: [5 / 16, 5 / 16, 5 / 16, 6 / 16, 6 / 16, 6 / 16],
          enchanting_table: [0, 0, 0, 1, 0.75, 1],
          lectern: [0, 0, 0, 1, 0.875, 1],
          brewing_stand: [0.25, 0, 0.25, 0.5, 0.875, 0.5],
          flower_pot: [5 / 16, 0, 5 / 16, 6 / 16, 6 / 16, 6 / 16],
          campfire: [0, 0, 0, 1, 7 / 16, 1],
          soul_campfire: [0, 0, 0, 1, 7 / 16, 1],
          decorated_pot: [2 / 16, 0, 2 / 16, 0.75, 0.75, 0.75],
          end_portal_frame: [0, 0, 0, 1, 13 / 16, 1],
          end_portal: [0, 0, 0, 1, 0.75, 1],
        };
      function F(e, t, r) {
        let a = e.replace("minecraft:", "");
        if (D.has(a.replace("minecraft:", "")) && r)
          return (function (e, t, r) {
            let o,
              a = e.replace("minecraft:", "");
            o =
              "dragon_head" === a || "dragon_wall_head" === a
                ? l.y6.dragonHeadRenderer()(r)
                : "piglin_head" === a || "piglin_wall_head" === a
                  ? l.y6.piglinHeadRenderer()(r)
                  : (() => {
                      switch (a) {
                        case "skeleton_skull":
                        case "skeleton_wall_skull":
                          return l.y6.headRenderer(l.gw.create("skeleton/skeleton"), 2);
                        case "wither_skeleton_skull":
                        case "wither_skeleton_wall_skull":
                          return l.y6.headRenderer(l.gw.create("skeleton/wither_skeleton"), 2);
                        case "creeper_head":
                        case "creeper_wall_head":
                          return l.y6.headRenderer(l.gw.create("creeper/creeper"), 2);
                        case "zombie_head":
                        case "zombie_wall_head":
                          return l.y6.headRenderer(l.gw.create("zombie/zombie"), 1);
                        case "player_head":
                        case "player_wall_head":
                          return l.y6.headRenderer(l.gw.create("player/wide/steve"), 1);
                        default:
                          throw Error("Unsupported skull block: ".concat(e));
                      }
                    })()(r);
            let s = a.includes("_wall_"),
              c = s ? B(t.facing) : W(t.rotation),
              i = n.vt();
            (n.Tl(i, i, [8, 8, 8]),
              n.Z8(i, i, (c * Math.PI) / 180),
              n.Tl(i, i, [-8, -8, -8]),
              s && n.Tl(i, i, [0, 4, -4]),
              o.transform(i));
            let u = n.vt();
            return (n.hs(u, u, [1 / 16, 1 / 16, 1 / 16]), o.transform(u), o);
          })(e, null != t ? t : {}, r);
        if ("conduit" === a && r) {
          var s = r;
          let e = l.y6.conduitRenderer(s),
            t = n.vt();
          return (n.hs(t, t, [1 / 16, 1 / 16, 1 / 16]), e.transform(t), e);
        }
        if (/(^|_)banner$/.test(a) || /(^|_)wall_banner$/.test(a))
          return (function (e, t, r) {
            var a, s, c;
            let i,
              u,
              f,
              _,
              d,
              h,
              p,
              b = e.replace("minecraft:", "").includes("wall_banner"),
              m = (function (e, t) {
                var r, n;
                let l = (0, o.rm)(null == t ? void 0 : t[o.Rf]);
                if (l) return null != (r = o.tX[l]) ? r : o.tX.white;
                let a = e.replace("minecraft:", "").match(/^([a-z_]+?)_(wall_)?banner$/);
                if (a) {
                  let e = a[1];
                  return null != (n = o.tX[e]) ? n : o.tX.white;
                }
                return o.tX.white;
              })(e, t),
              w = [0.45, 0.3, 0.2],
              g = null;
            if (r)
              for (let e of ["minecraft:block/white_stained_glass", "minecraft:block/oak_planks"])
                try {
                  let t = r.getTextureUV(l.gw.parse(e));
                  if (t && 4 === t.length) {
                    g = [t[0], t[1], t[2], t[3]];
                    break;
                  }
                } catch (e) {}
            let k = g,
              v = (e) => {
                var t;
                return null != (t = N(r, "minecraft:entity/banner/base", e)) ? t : g;
              },
              O = [];
            (b
              ? ((i = 1 / 12),
                (u = 11 / 12),
                (f = -0.8),
                (_ = 13 / 15),
                (d = 5 / 48),
                (h = 7 / 48),
                (p = [1 / 12, 47 / 60, 1 / 48, 11 / 12, 13 / 15, 5 / 48]))
              : ((i = 1 / 12),
                (u = 11 / 12),
                (f = 1 / 6),
                (_ = 11 / 6),
                (d = 13 / 24),
                (h = 7 / 12),
                (p = [1 / 12, 7 / 4, 11 / 24, 11 / 12, 11 / 6, 13 / 24])),
              $(O, i, f, h, u, _, h, "front", m, v(y)),
              $(O, i, f, d, u, _, d, "back", m, v(M)),
              $(O, i, _, d, u, _, h, "top", m, v(q)),
              $(O, i, f, d, u, f, h, "bottom", m, v(x)),
              $(O, i, f, d, i, _, h, "left", m, v(T)),
              $(O, u, f, d, u, _, h, "right", m, v(I)));
            let P = (0, o.jL)(t[o.X1]);
            for (let e = 0; e < P.length; e++) {
              let t = P[e],
                n = null != (a = o.tX[t.color]) ? a : o.tX.white,
                l = "minecraft:entity/banner/".concat(t.pattern),
                s = N(r, l, y),
                c = N(r, l, M);
              if (!s && !c) continue;
              let p = (e + 1) * 8e-4;
              (s && $(O, i, f, h + p, u, _, h + p, "front", n, s),
                c && $(O, i, f, d - p, u, _, d - p, "back", n, c));
            }
            (C(O, p[0], p[1], p[2], p[3], p[4], p[5], w, k),
              b || C(O, 11 / 24, 0, 11 / 24, 13 / 24, 7 / 4, 13 / 24, w, k));
            let j = new l.e(O),
              z = ((s = b), (c = t), s ? B(c.facing) : W(c.rotation));
            if (0 !== z) {
              let e = (z * Math.PI) / 180,
                t = n.vt(),
                r = b ? 0.5 : 1.5;
              (n.Tl(t, t, [0.5, r, 0.5]),
                n.Z8(t, t, e),
                n.Tl(t, t, [-0.5, -r, -0.5]),
                j.transform(t));
            }
            return j;
          })(e, null != t ? t : {}, r);
        for (let [e, t] of Object.entries(X))
          if (a.includes(e)) {
            let r = E[e];
            if (r) return L(t, r[0], r[1], r[2], r[3], r[4], r[5]);
            return L(t, 0, 0, 0, 1, 1, 1);
          }
        return null;
      }
      let H = [
        "oak",
        "spruce",
        "birch",
        "jungle",
        "acacia",
        "dark_oak",
        "mangrove",
        "cherry",
        "bamboo",
        "crimson",
        "warped",
        "pale_oak",
      ];
      function R(e) {
        var t, r;
        let o,
          a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          s = arguments.length > 2 ? arguments[2] : void 0;
        if (!s) return null;
        let c = (function (e) {
          let t = e.replace("minecraft:", ""),
            r = /^([a-z_]+)_hanging_sign$/.exec(t);
          if (r && H.includes(r[1])) return { wood: r[1], hanging: !0 };
          let n = /^([a-z_]+)_sign$/.exec(t);
          return n && H.includes(n[1]) ? { wood: n[1], hanging: !1 } : null;
        })(e);
        if (!c) return null;
        try {
          if (c.hanging) {
            let e = "true" === String(null != (t = a.attached) ? t : "false");
            o = l.y6.hangingSignRenderer(l.gw.create(c.wood))(e, s);
          } else o = l.y6.signRenderer(l.gw.create(c.wood))(s);
        } catch (e) {
          return null;
        }
        if (!o || 0 === o.quads.length) return null;
        let i = Number.parseInt(null != (r = a.rotation) ? r : "0", 10),
          u = 180 - (Number.isFinite(i) ? i : 0) * 22.5,
          f = n.vt();
        (n.Tl(f, f, [8, 8, 8]),
          n.Z8(f, f, (u * Math.PI) / 180),
          n.hs(f, f, [2 / 3, 2 / 3, 2 / 3]),
          n.Tl(f, f, [-8, -8, -8]),
          o.transform(f));
        let _ = n.vt();
        return (n.hs(_, _, [1 / 16, 1 / 16, 1 / 16]), o.transform(_), o);
      }
      function L(e, t, r, n, o, a, s) {
        let c = [],
          i = t + o,
          u = r + a,
          f = n + s;
        for (let o of [
          {
            verts: [
              [t, u, n],
              [t, u, f],
              [i, u, f],
              [i, u, n],
            ],
            normal: [0, 1, 0],
          },
          {
            verts: [
              [t, r, f],
              [t, r, n],
              [i, r, n],
              [i, r, f],
            ],
            normal: [0, -1, 0],
          },
          {
            verts: [
              [i, u, n],
              [i, r, n],
              [t, r, n],
              [t, u, n],
            ],
            normal: [0, 0, -1],
          },
          {
            verts: [
              [t, u, f],
              [t, r, f],
              [i, r, f],
              [i, u, f],
            ],
            normal: [0, 0, 1],
          },
          {
            verts: [
              [i, u, f],
              [i, r, f],
              [i, r, n],
              [i, u, n],
            ],
            normal: [1, 0, 0],
          },
          {
            verts: [
              [t, u, n],
              [t, r, n],
              [t, r, f],
              [t, u, f],
            ],
            normal: [-1, 0, 0],
          },
        ]) {
          let t = o.verts.map((t) => {
            let [r, n, a] = t,
              s = new l.Mi(r, n, a),
              c = new l.Mi(o.normal[0], o.normal[1], o.normal[2]);
            return new l.Li(s, e, void 0, void 0, c, void 0);
          });
          c.push(new l.kO(t[0], t[1], t[2], t[3]));
        }
        return new l.e(c);
      }
      function B(e) {
        switch (null != e ? e : "south") {
          case "south":
          default:
            return 0;
          case "east":
            return 90;
          case "north":
            return 180;
          case "west":
            return 270;
        }
      }
      function W(e) {
        let t = parseInt(null != e ? e : "0", 10);
        return Number.isNaN(t) ? 0 : -(22.5 * t);
      }
      function $(e, t, r, n, o, a, s, c, i, u) {
        let f,
          _,
          d,
          [h, p, b, m] = null != u ? u : [0, 0, 0, 0],
          w = u
            ? [
                [h, p],
                [h, m],
                [b, m],
                [b, p],
              ]
            : [void 0, void 0, void 0, void 0];
        switch (c) {
          case "front":
            ((f = [
              [t, a, s],
              [t, r, s],
              [o, r, s],
              [o, a, s],
            ]),
              (_ = [0, 0, 1]),
              (d = w));
            break;
          case "back":
            ((f = [
              [o, a, n],
              [o, r, n],
              [t, r, n],
              [t, a, n],
            ]),
              (_ = [0, 0, -1]),
              (d = u
                ? [
                    [b, p],
                    [b, m],
                    [h, m],
                    [h, p],
                  ]
                : [void 0, void 0, void 0, void 0]));
            break;
          case "top":
            ((f = [
              [t, a, n],
              [t, a, s],
              [o, a, s],
              [o, a, n],
            ]),
              (_ = [0, 1, 0]),
              (d = w));
            break;
          case "bottom":
            ((f = [
              [t, r, s],
              [t, r, n],
              [o, r, n],
              [o, r, s],
            ]),
              (_ = [0, -1, 0]),
              (d = w));
            break;
          case "left":
            ((f = [
              [t, a, n],
              [t, r, n],
              [t, r, s],
              [t, a, s],
            ]),
              (_ = [-1, 0, 0]),
              (d = w));
            break;
          case "right":
            ((f = [
              [o, a, s],
              [o, r, s],
              [o, r, n],
              [o, a, n],
            ]),
              (_ = [1, 0, 0]),
              (d = w));
        }
        let g = f.map((e, t) => {
          let r = new l.Mi(e[0], e[1], e[2]),
            n = new l.Mi(_[0], _[1], _[2]);
          return new l.Li(r, i, d[t], void 0, n, void 0);
        });
        e.push(new l.kO(g[0], g[1], g[2], g[3]));
      }
      function C(e, t, r, n, o, a, s, c, i) {
        let u = Math.abs(o - t),
          f = Math.abs(a - r),
          _ = Math.abs(s - n);
        for (let d of [
          {
            verts: [
              [t, a, n],
              [t, a, s],
              [o, a, s],
              [o, a, n],
            ],
            normal: [0, 1, 0],
            w: u,
            h: _,
          },
          {
            verts: [
              [t, r, s],
              [t, r, n],
              [o, r, n],
              [o, r, s],
            ],
            normal: [0, -1, 0],
            w: u,
            h: _,
          },
          {
            verts: [
              [o, a, n],
              [o, r, n],
              [t, r, n],
              [t, a, n],
            ],
            normal: [0, 0, -1],
            w: u,
            h: f,
          },
          {
            verts: [
              [t, a, s],
              [t, r, s],
              [o, r, s],
              [o, a, s],
            ],
            normal: [0, 0, 1],
            w: u,
            h: f,
          },
          {
            verts: [
              [o, a, s],
              [o, r, s],
              [o, r, n],
              [o, a, n],
            ],
            normal: [1, 0, 0],
            w: _,
            h: f,
          },
          {
            verts: [
              [t, a, n],
              [t, r, n],
              [t, r, s],
              [t, a, s],
            ],
            normal: [-1, 0, 0],
            w: _,
            h: f,
          },
        ]) {
          let t = (function (e, t, r) {
              if (!e || !(t > 0) || !(r > 0)) return e;
              let [n, l, o, a] = e,
                s = o - n,
                c = a - l,
                i = t / r,
                u = s,
                f = c;
              i >= 1 ? (f = c / i) : (u = s * i);
              let _ = (n + o) / 2,
                d = (l + a) / 2;
              return [_ - u / 2, d - f / 2, _ + u / 2, d + f / 2];
            })(i, d.w, d.h),
            [r, n, o, a] = null != t ? t : [0, 0, 0, 0],
            s = t
              ? [
                  [r, n],
                  [r, a],
                  [o, a],
                  [o, n],
                ]
              : [void 0, void 0, void 0, void 0],
            u = d.verts.map((e, t) => {
              let [r, n, o] = e,
                a = new l.Mi(r, n, o),
                i = new l.Mi(d.normal[0], d.normal[1], d.normal[2]);
              return new l.Li(a, c, s[t], void 0, i, void 0);
            });
          e.push(new l.kO(u[0], u[1], u[2], u[3]));
        }
      }
      function U(e, t) {
        if (!t) return e;
        if (Object.keys(e).length > 0) {
          let r = !1,
            n = { ...e };
          for (let [e, l] of Object.entries(t)) e in n || ((n[e] = l), (r = !0));
          return r ? n : e;
        }
        return { ...t };
      }
    },
    46397: (e, t, r) => {
      r.d(t, {
        D9: () => b,
        a9: () => i,
        bD: () => l,
        cO: () => o,
        d: () => s,
        dH: () => n,
        nK: () => u,
      });
      let n = [
          "leaves",
          "glass",
          "slab",
          "stair",
          "fence",
          "wall",
          "pane",
          "door",
          "trapdoor",
          "gate",
          "torch",
          "lantern",
          "chain",
          "candle",
          "flower",
          "allium",
          "orchid",
          "tulip",
          "daisy",
          "cornflower",
          "lily",
          "poppy",
          "dandelion",
          "sunflower",
          "lilac",
          "peony",
          "rose_bush",
          "petal",
          "bluet",
          "dead_bush",
          "pitcher",
          "grass",
          "fern",
          "sapling",
          "bamboo",
          "sugar_cane",
          "cactus",
          "kelp",
          "seagrass",
          "vine",
          "hanging",
          "dripleaf",
          "azalea",
          "spore_blossom",
          "moss_carpet",
          "water",
          "lava",
          "ice",
          "honey_block",
          "slime_block",
          "fire",
          "soul_fire",
          "nether_portal",
          "end_portal",
          "rail",
          "sign",
          "banner",
          "carpet",
          "pressure_plate",
          "button",
          "lever",
          "redstone",
          "repeater",
          "comparator",
          "tripwire",
          "mushroom",
          "fungus",
          "nether_sprouts",
          "nether_wart",
          "roots",
          "propagule",
          "snow_layer",
          "snow",
          "sculk_vein",
          "sculk_sensor",
          "amethyst_cluster",
          "amethyst_bud",
          "pointed_dripstone",
          "lightning_rod",
          "end_rod",
          "iron_bars",
          "coral",
          "sea_pickle",
          "turtle_egg",
          "frogspawn",
          "campfire",
          "soul_campfire",
          "brewing_stand",
          "bell",
          "grindstone",
          "ladder",
          "scaffolding",
          "web",
          "cobweb",
          "head",
          "skull",
          "pot",
          "decorated_pot",
          "armor_stand",
          "crops",
          "wheat",
          "carrots",
          "potatoes",
          "beetroots",
          "melon_stem",
          "pumpkin_stem",
          "sweet_berry",
          "cave_vines",
          "glow_lichen",
          "cocoa",
          "chest",
          "ender_chest",
          "trapped_chest",
          "shulker_box",
          "enchanting_table",
          "anvil",
          "hopper",
          "cauldron",
          "composter",
          "bed",
          "cake",
          "tinted_glass",
          "conduit",
        ],
        l = [
          "leaves",
          "vine",
          "hanging",
          "grass",
          "fern",
          "sapling",
          "bamboo",
          "flower",
          "allium",
          "orchid",
          "tulip",
          "daisy",
          "cornflower",
          "lily",
          "poppy",
          "dandelion",
          "sunflower",
          "lilac",
          "peony",
          "rose_bush",
          "petal",
          "bluet",
          "dead_bush",
          "pitcher",
          "sugar_cane",
          "kelp",
          "seagrass",
          "dripleaf",
          "azalea",
          "spore_blossom",
          "mushroom",
          "fungus",
          "nether_sprouts",
          "nether_wart",
          "roots",
          "propagule",
          "coral",
          "crops",
          "wheat",
          "carrots",
          "potatoes",
          "beetroots",
          "sweet_berry",
          "cave_vines",
          "glow_lichen",
          "cocoa",
          "moss_carpet",
          "sculk_vein",
          "cobweb",
          "web",
          "ladder",
          "rail",
          "iron_bars",
          "chain",
          "lantern",
          "torch",
          "campfire",
          "soul_campfire",
          "fire",
          "soul_fire",
          "nether_portal",
          "amethyst_bud",
          "amethyst_cluster",
          "brewing_stand",
          "candle",
          "sign",
          "door",
          "trapdoor",
          "banner",
          "head",
          "skull",
          "tripwire",
          "pressure_plate",
          "button",
          "lever",
          "end_rod",
          "lightning_rod",
          "pointed_dripstone",
          "scaffolding",
          "hopper",
          "carpet",
        ],
        o = ["water", "ice", "glass", "tinted_glass", "honey_block", "slime_block"],
        a = new Set([
          "fire",
          "soul_fire",
          "redstone_torch",
          "redstone_wall_torch",
          "tripwire_hook",
          "bamboo_shelf",
        ]);
      function s(e) {
        return a.has(e.replace("minecraft:", ""));
      }
      let c = new Set([
        "snow_block",
        "packed_ice",
        "blue_ice",
        "redstone_block",
        "red_mushroom_block",
        "brown_mushroom_block",
        "mushroom_stem",
        "coral_block",
        "dead_brain_coral_block",
        "dead_bubble_coral_block",
        "dead_fire_coral_block",
        "dead_horn_coral_block",
        "dead_tube_coral_block",
        "brain_coral_block",
        "bubble_coral_block",
        "fire_coral_block",
        "horn_coral_block",
        "tube_coral_block",
      ]);
      /*modrh-start*/;(function(){var H={"create:acacia_window":{"transparent":true,"alphaTest":true},"create:acacia_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:adjustable_chain_gearshift":{"fullCube":false},"create:analog_lever":{"fullCube":false,"alphaTest":true},"create:andesite_bars":{"fullCube":false,"alphaTest":true},"create:andesite_belt_funnel":{"fullCube":false,"alphaTest":true},"create:andesite_door":{"fullCube":false,"alphaTest":true},"create:andesite_encased_cogwheel":{"fullCube":false,"alphaTest":true},"create:andesite_encased_large_cogwheel":{"fullCube":false,"alphaTest":true},"create:andesite_encased_shaft":{"fullCube":false},"create:andesite_funnel":{"fullCube":false,"alphaTest":true},"create:andesite_ladder":{"fullCube":false,"alphaTest":true},"create:andesite_scaffolding":{"fullCube":false,"alphaTest":true},"create:andesite_table_cloth":{"fullCube":false,"alphaTest":true},"create:andesite_tunnel":{"fullCube":false,"transparent":true,"alphaTest":true},"create:bamboo_window":{"transparent":true,"alphaTest":true},"create:bamboo_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:basin":{"fullCube":false,"alphaTest":true},"create:belt":{"fullCube":false,"alphaTest":true},"create:birch_window":{"transparent":true},"create:birch_window_pane":{"fullCube":false,"transparent":true},"create:black_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:black_postbox":{"fullCube":false,"alphaTest":true},"create:black_sail":{"fullCube":false,"alphaTest":true},"create:black_seat":{"fullCube":false,"alphaTest":true},"create:black_table_cloth":{"fullCube":false,"alphaTest":true},"create:black_toolbox":{"fullCube":false,"alphaTest":true},"create:black_valve_handle":{"fullCube":false,"alphaTest":true},"create:blaze_burner":{"fullCube":false,"alphaTest":true},"create:blue_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:blue_postbox":{"fullCube":false,"alphaTest":true},"create:blue_sail":{"fullCube":false,"alphaTest":true},"create:blue_seat":{"fullCube":false,"alphaTest":true},"create:blue_table_cloth":{"fullCube":false,"alphaTest":true},"create:blue_toolbox":{"fullCube":false,"alphaTest":true},"create:blue_valve_handle":{"fullCube":false,"alphaTest":true},"create:brass_bars":{"fullCube":false,"alphaTest":true},"create:brass_belt_funnel":{"fullCube":false,"alphaTest":true},"create:brass_door":{"fullCube":false,"alphaTest":true},"create:brass_encased_cogwheel":{"fullCube":false,"alphaTest":true},"create:brass_encased_large_cogwheel":{"fullCube":false,"alphaTest":true},"create:brass_encased_shaft":{"fullCube":false},"create:brass_funnel":{"fullCube":false,"alphaTest":true},"create:brass_ladder":{"fullCube":false,"alphaTest":true},"create:brass_scaffolding":{"fullCube":false,"alphaTest":true},"create:brass_table_cloth":{"fullCube":false,"alphaTest":true},"create:brass_tunnel":{"fullCube":false,"transparent":true,"alphaTest":true},"create:brown_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:brown_postbox":{"fullCube":false,"alphaTest":true},"create:brown_sail":{"fullCube":false,"alphaTest":true},"create:brown_seat":{"fullCube":false,"alphaTest":true},"create:brown_table_cloth":{"fullCube":false,"alphaTest":true},"create:brown_toolbox":{"fullCube":false,"alphaTest":true},"create:brown_valve_handle":{"fullCube":false,"alphaTest":true},"create:cart_assembler":{"fullCube":false,"alphaTest":true},"create:chain_conveyor":{"fullCube":false},"create:cherry_window":{"transparent":true,"alphaTest":true},"create:cherry_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:chute":{"fullCube":false,"alphaTest":true},"create:clipboard":{"fullCube":false,"alphaTest":true},"create:clockwork_bearing":{"fullCube":false},"create:clutch":{"fullCube":false,"alphaTest":true},"create:cogwheel":{"fullCube":false,"alphaTest":true},"create:contraption_controls":{"fullCube":false,"alphaTest":true},"create:controller_rail":{"fullCube":false,"alphaTest":true},"create:controls":{"fullCube":false,"alphaTest":true},"create:copper_backtank":{"fullCube":false,"alphaTest":true},"create:copper_bars":{"fullCube":false,"alphaTest":true},"create:copper_door":{"fullCube":false,"alphaTest":true},"create:copper_ladder":{"fullCube":false,"alphaTest":true},"create:copper_scaffolding":{"fullCube":false,"alphaTest":true},"create:copper_shingle_slab":{"fullCube":false},"create:copper_shingle_stairs":{"fullCube":false},"create:copper_table_cloth":{"fullCube":false,"alphaTest":true},"create:copper_tile_slab":{"fullCube":false},"create:copper_tile_stairs":{"fullCube":false},"create:copper_valve_handle":{"fullCube":false,"alphaTest":true},"create:copycat_bars":{"fullCube":false,"alphaTest":true},"create:copycat_base":{"alphaTest":true},"create:copycat_panel":{"fullCube":false},"create:copycat_step":{"fullCube":false},"create:creative_crate":{"fullCube":false,"alphaTest":true},"create:creative_fluid_tank":{"fullCube":false,"transparent":true,"alphaTest":true},"create:creative_motor":{"fullCube":false,"alphaTest":true},"create:crimson_window":{"transparent":true,"alphaTest":true},"create:crimson_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:crushing_wheel":{"fullCube":false,"alphaTest":true},"create:crushing_wheel_controller":{"fullCube":false},"create:cuckoo_clock":{"fullCube":false,"alphaTest":true},"create:cut_andesite_brick_slab":{"fullCube":false},"create:cut_andesite_brick_stairs":{"fullCube":false},"create:cut_andesite_brick_wall":{"fullCube":false},"create:cut_andesite_slab":{"fullCube":false},"create:cut_andesite_stairs":{"fullCube":false},"create:cut_andesite_wall":{"fullCube":false},"create:cut_asurine_brick_slab":{"fullCube":false},"create:cut_asurine_brick_stairs":{"fullCube":false},"create:cut_asurine_brick_wall":{"fullCube":false},"create:cut_asurine_slab":{"fullCube":false},"create:cut_asurine_stairs":{"fullCube":false},"create:cut_asurine_wall":{"fullCube":false},"create:cut_calcite_brick_slab":{"fullCube":false},"create:cut_calcite_brick_stairs":{"fullCube":false},"create:cut_calcite_brick_wall":{"fullCube":false},"create:cut_calcite_slab":{"fullCube":false},"create:cut_calcite_stairs":{"fullCube":false},"create:cut_calcite_wall":{"fullCube":false},"create:cut_crimsite_brick_slab":{"fullCube":false},"create:cut_crimsite_brick_stairs":{"fullCube":false},"create:cut_crimsite_brick_wall":{"fullCube":false},"create:cut_crimsite_slab":{"fullCube":false},"create:cut_crimsite_stairs":{"fullCube":false},"create:cut_crimsite_wall":{"fullCube":false},"create:cut_deepslate_brick_slab":{"fullCube":false},"create:cut_deepslate_brick_stairs":{"fullCube":false},"create:cut_deepslate_brick_wall":{"fullCube":false},"create:cut_deepslate_slab":{"fullCube":false},"create:cut_deepslate_stairs":{"fullCube":false},"create:cut_deepslate_wall":{"fullCube":false},"create:cut_diorite_brick_slab":{"fullCube":false},"create:cut_diorite_brick_stairs":{"fullCube":false},"create:cut_diorite_brick_wall":{"fullCube":false},"create:cut_diorite_slab":{"fullCube":false},"create:cut_diorite_stairs":{"fullCube":false},"create:cut_diorite_wall":{"fullCube":false},"create:cut_dripstone_brick_slab":{"fullCube":false},"create:cut_dripstone_brick_stairs":{"fullCube":false},"create:cut_dripstone_brick_wall":{"fullCube":false},"create:cut_dripstone_slab":{"fullCube":false},"create:cut_dripstone_stairs":{"fullCube":false},"create:cut_dripstone_wall":{"fullCube":false},"create:cut_granite_brick_slab":{"fullCube":false},"create:cut_granite_brick_stairs":{"fullCube":false},"create:cut_granite_brick_wall":{"fullCube":false},"create:cut_granite_slab":{"fullCube":false},"create:cut_granite_stairs":{"fullCube":false},"create:cut_granite_wall":{"fullCube":false},"create:cut_limestone_brick_slab":{"fullCube":false},"create:cut_limestone_brick_stairs":{"fullCube":false},"create:cut_limestone_brick_wall":{"fullCube":false},"create:cut_limestone_slab":{"fullCube":false},"create:cut_limestone_stairs":{"fullCube":false},"create:cut_limestone_wall":{"fullCube":false},"create:cut_ochrum_brick_slab":{"fullCube":false},"create:cut_ochrum_brick_stairs":{"fullCube":false},"create:cut_ochrum_brick_wall":{"fullCube":false},"create:cut_ochrum_slab":{"fullCube":false},"create:cut_ochrum_stairs":{"fullCube":false},"create:cut_ochrum_wall":{"fullCube":false},"create:cut_scorchia_brick_slab":{"fullCube":false},"create:cut_scorchia_brick_stairs":{"fullCube":false},"create:cut_scorchia_brick_wall":{"fullCube":false},"create:cut_scorchia_slab":{"fullCube":false},"create:cut_scorchia_stairs":{"fullCube":false},"create:cut_scorchia_wall":{"fullCube":false},"create:cut_scoria_brick_slab":{"fullCube":false},"create:cut_scoria_brick_stairs":{"fullCube":false},"create:cut_scoria_brick_wall":{"fullCube":false},"create:cut_scoria_slab":{"fullCube":false},"create:cut_scoria_stairs":{"fullCube":false},"create:cut_scoria_wall":{"fullCube":false},"create:cut_tuff_brick_slab":{"fullCube":false},"create:cut_tuff_brick_stairs":{"fullCube":false},"create:cut_tuff_brick_wall":{"fullCube":false},"create:cut_tuff_slab":{"fullCube":false},"create:cut_tuff_stairs":{"fullCube":false},"create:cut_tuff_wall":{"fullCube":false},"create:cut_veridium_brick_slab":{"fullCube":false},"create:cut_veridium_brick_stairs":{"fullCube":false},"create:cut_veridium_brick_wall":{"fullCube":false},"create:cut_veridium_slab":{"fullCube":false},"create:cut_veridium_stairs":{"fullCube":false},"create:cut_veridium_wall":{"fullCube":false},"create:cyan_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:cyan_postbox":{"fullCube":false,"alphaTest":true},"create:cyan_sail":{"fullCube":false,"alphaTest":true},"create:cyan_seat":{"fullCube":false,"alphaTest":true},"create:cyan_table_cloth":{"fullCube":false,"alphaTest":true},"create:cyan_toolbox":{"fullCube":false,"alphaTest":true},"create:cyan_valve_handle":{"fullCube":false,"alphaTest":true},"create:dark_oak_window":{"transparent":true,"alphaTest":true},"create:dark_oak_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:deployer":{"fullCube":false},"create:depot":{"fullCube":false,"alphaTest":true},"create:desk_bell":{"fullCube":false,"alphaTest":true},"create:display_board":{"fullCube":false,"alphaTest":true},"create:display_link":{"fullCube":false,"transparent":true,"alphaTest":true},"create:elevator_contact":{"fullCube":false},"create:elevator_pulley":{"fullCube":false},"create:encased_chain_drive":{"fullCube":false},"create:encased_fan":{"fullCube":false,"alphaTest":true},"create:encased_fluid_pipe":{"fullCube":false},"create:exposed_copper_shingle_slab":{"fullCube":false},"create:exposed_copper_shingle_stairs":{"fullCube":false},"create:exposed_copper_tile_slab":{"fullCube":false},"create:exposed_copper_tile_stairs":{"fullCube":false},"create:fake_track":{"fullCube":false},"create:fluid_pipe":{"fullCube":false,"alphaTest":true},"create:fluid_tank":{"fullCube":false,"transparent":true,"alphaTest":true},"create:fluid_valve":{"fullCube":false,"alphaTest":true},"create:flywheel":{"fullCube":false,"alphaTest":true},"create:framed_glass":{"transparent":true,"alphaTest":true},"create:framed_glass_door":{"fullCube":false,"transparent":true,"alphaTest":true},"create:framed_glass_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:framed_glass_trapdoor":{"fullCube":false,"transparent":true,"alphaTest":true},"create:gantry_carriage":{"fullCube":false,"alphaTest":true},"create:gantry_shaft":{"fullCube":false,"alphaTest":true},"create:gearbox":{"fullCube":false},"create:gearshift":{"fullCube":false,"alphaTest":true},"create:glass_fluid_pipe":{"fullCube":false,"transparent":true,"alphaTest":true},"create:gray_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:gray_postbox":{"fullCube":false,"alphaTest":true},"create:gray_sail":{"fullCube":false,"alphaTest":true},"create:gray_seat":{"fullCube":false,"alphaTest":true},"create:gray_table_cloth":{"fullCube":false,"alphaTest":true},"create:gray_toolbox":{"fullCube":false,"alphaTest":true},"create:gray_valve_handle":{"fullCube":false,"alphaTest":true},"create:green_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:green_postbox":{"fullCube":false,"alphaTest":true},"create:green_sail":{"fullCube":false,"alphaTest":true},"create:green_seat":{"fullCube":false,"alphaTest":true},"create:green_table_cloth":{"fullCube":false,"alphaTest":true},"create:green_toolbox":{"fullCube":false,"alphaTest":true},"create:green_valve_handle":{"fullCube":false,"alphaTest":true},"create:hand_crank":{"fullCube":false,"alphaTest":true},"create:haunted_bell":{"fullCube":false,"alphaTest":true},"create:horizontal_framed_glass":{"transparent":true,"alphaTest":true},"create:horizontal_framed_glass_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:hose_pulley":{"fullCube":false,"alphaTest":true},"create:industrial_iron_window":{"transparent":true,"alphaTest":true},"create:industrial_iron_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:item_drain":{"fullCube":false,"alphaTest":true},"create:item_hatch":{"fullCube":false,"alphaTest":true},"create:jungle_window":{"transparent":true,"alphaTest":true},"create:jungle_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:large_bogey":{"fullCube":false},"create:large_cogwheel":{"fullCube":false,"alphaTest":true},"create:large_water_wheel":{"fullCube":false,"alphaTest":true},"create:lectern_controller":{"fullCube":false},"create:light_blue_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:light_blue_postbox":{"fullCube":false,"alphaTest":true},"create:light_blue_sail":{"fullCube":false,"alphaTest":true},"create:light_blue_seat":{"fullCube":false,"alphaTest":true},"create:light_blue_table_cloth":{"fullCube":false,"alphaTest":true},"create:light_blue_toolbox":{"fullCube":false,"alphaTest":true},"create:light_blue_valve_handle":{"fullCube":false,"alphaTest":true},"create:light_gray_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:light_gray_postbox":{"fullCube":false,"alphaTest":true},"create:light_gray_sail":{"fullCube":false,"alphaTest":true},"create:light_gray_seat":{"fullCube":false,"alphaTest":true},"create:light_gray_table_cloth":{"fullCube":false,"alphaTest":true},"create:light_gray_toolbox":{"fullCube":false,"alphaTest":true},"create:light_gray_valve_handle":{"fullCube":false,"alphaTest":true},"create:lime_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:lime_postbox":{"fullCube":false,"alphaTest":true},"create:lime_sail":{"fullCube":false,"alphaTest":true},"create:lime_seat":{"fullCube":false,"alphaTest":true},"create:lime_table_cloth":{"fullCube":false,"alphaTest":true},"create:lime_toolbox":{"fullCube":false,"alphaTest":true},"create:lime_valve_handle":{"fullCube":false,"alphaTest":true},"create:lit_blaze_burner":{"fullCube":false,"alphaTest":true},"create:magenta_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:magenta_postbox":{"fullCube":false,"alphaTest":true},"create:magenta_sail":{"fullCube":false,"alphaTest":true},"create:magenta_seat":{"fullCube":false,"alphaTest":true},"create:magenta_table_cloth":{"fullCube":false,"alphaTest":true},"create:magenta_toolbox":{"fullCube":false,"alphaTest":true},"create:magenta_valve_handle":{"fullCube":false,"alphaTest":true},"create:mangrove_window":{"transparent":true,"alphaTest":true},"create:mangrove_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:mechanical_arm":{"fullCube":false},"create:mechanical_bearing":{"fullCube":false},"create:mechanical_crafter":{"fullCube":false,"alphaTest":true},"create:mechanical_drill":{"fullCube":false},"create:mechanical_harvester":{"fullCube":false},"create:mechanical_mixer":{"fullCube":false,"alphaTest":true},"create:mechanical_piston":{"fullCube":false,"alphaTest":true},"create:mechanical_piston_head":{"fullCube":false},"create:mechanical_plough":{"fullCube":false},"create:mechanical_press":{"fullCube":false,"alphaTest":true},"create:mechanical_pump":{"fullCube":false,"alphaTest":true},"create:mechanical_saw":{"fullCube":false},"create:metal_bracket":{"fullCube":false,"alphaTest":true},"create:metal_girder":{"fullCube":false,"alphaTest":true},"create:metal_girder_encased_shaft":{"fullCube":false,"alphaTest":true},"create:millstone":{"fullCube":false,"alphaTest":true},"create:minecart_anchor":{"fullCube":false},"create:mysterious_cuckoo_clock":{"fullCube":false,"alphaTest":true},"create:netherite_backtank":{"fullCube":false,"alphaTest":true},"create:nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:nozzle":{"fullCube":false,"alphaTest":true},"create:oak_window":{"transparent":true,"alphaTest":true},"create:oak_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:orange_postbox":{"fullCube":false,"alphaTest":true},"create:orange_sail":{"fullCube":false,"alphaTest":true},"create:orange_seat":{"fullCube":false,"alphaTest":true},"create:orange_table_cloth":{"fullCube":false,"alphaTest":true},"create:orange_toolbox":{"fullCube":false,"alphaTest":true},"create:orange_valve_handle":{"fullCube":false,"alphaTest":true},"create:ornate_iron_window":{"transparent":true,"alphaTest":true},"create:ornate_iron_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:oxidized_copper_shingle_slab":{"fullCube":false},"create:oxidized_copper_shingle_stairs":{"fullCube":false},"create:oxidized_copper_tile_slab":{"fullCube":false},"create:oxidized_copper_tile_stairs":{"fullCube":false},"create:package_frogport":{"fullCube":false},"create:packager":{"fullCube":false,"alphaTest":true},"create:peculiar_bell":{"fullCube":false,"alphaTest":true},"create:pink_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:pink_postbox":{"fullCube":false,"alphaTest":true},"create:pink_sail":{"fullCube":false,"alphaTest":true},"create:pink_seat":{"fullCube":false,"alphaTest":true},"create:pink_table_cloth":{"fullCube":false,"alphaTest":true},"create:pink_toolbox":{"fullCube":false,"alphaTest":true},"create:pink_valve_handle":{"fullCube":false,"alphaTest":true},"create:piston_extension_pole":{"fullCube":false,"alphaTest":true},"create:placard":{"fullCube":false,"alphaTest":true},"create:polished_cut_andesite_slab":{"fullCube":false},"create:polished_cut_andesite_stairs":{"fullCube":false},"create:polished_cut_andesite_wall":{"fullCube":false},"create:polished_cut_asurine_slab":{"fullCube":false},"create:polished_cut_asurine_stairs":{"fullCube":false},"create:polished_cut_asurine_wall":{"fullCube":false},"create:polished_cut_calcite_slab":{"fullCube":false},"create:polished_cut_calcite_stairs":{"fullCube":false},"create:polished_cut_calcite_wall":{"fullCube":false},"create:polished_cut_crimsite_slab":{"fullCube":false},"create:polished_cut_crimsite_stairs":{"fullCube":false},"create:polished_cut_crimsite_wall":{"fullCube":false},"create:polished_cut_deepslate_slab":{"fullCube":false},"create:polished_cut_deepslate_stairs":{"fullCube":false},"create:polished_cut_deepslate_wall":{"fullCube":false},"create:polished_cut_diorite_slab":{"fullCube":false},"create:polished_cut_diorite_stairs":{"fullCube":false},"create:polished_cut_diorite_wall":{"fullCube":false},"create:polished_cut_dripstone_slab":{"fullCube":false},"create:polished_cut_dripstone_stairs":{"fullCube":false},"create:polished_cut_dripstone_wall":{"fullCube":false},"create:polished_cut_granite_slab":{"fullCube":false},"create:polished_cut_granite_stairs":{"fullCube":false},"create:polished_cut_granite_wall":{"fullCube":false},"create:polished_cut_limestone_slab":{"fullCube":false},"create:polished_cut_limestone_stairs":{"fullCube":false},"create:polished_cut_limestone_wall":{"fullCube":false},"create:polished_cut_ochrum_slab":{"fullCube":false},"create:polished_cut_ochrum_stairs":{"fullCube":false},"create:polished_cut_ochrum_wall":{"fullCube":false},"create:polished_cut_scorchia_slab":{"fullCube":false},"create:polished_cut_scorchia_stairs":{"fullCube":false},"create:polished_cut_scorchia_wall":{"fullCube":false},"create:polished_cut_scoria_slab":{"fullCube":false},"create:polished_cut_scoria_stairs":{"fullCube":false},"create:polished_cut_scoria_wall":{"fullCube":false},"create:polished_cut_tuff_slab":{"fullCube":false},"create:polished_cut_tuff_stairs":{"fullCube":false},"create:polished_cut_tuff_wall":{"fullCube":false},"create:polished_cut_veridium_slab":{"fullCube":false},"create:polished_cut_veridium_stairs":{"fullCube":false},"create:polished_cut_veridium_wall":{"fullCube":false},"create:portable_fluid_interface":{"fullCube":false,"alphaTest":true},"create:portable_storage_interface":{"fullCube":false,"alphaTest":true},"create:powered_latch":{"fullCube":false,"alphaTest":true},"create:powered_shaft":{"fullCube":false,"alphaTest":true},"create:powered_toggle_latch":{"fullCube":false,"alphaTest":true},"create:pulley_magnet":{"fullCube":false,"alphaTest":true},"create:pulse_extender":{"fullCube":false,"alphaTest":true},"create:pulse_repeater":{"fullCube":false,"alphaTest":true},"create:pulse_timer":{"fullCube":false,"alphaTest":true},"create:purple_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:purple_postbox":{"fullCube":false,"alphaTest":true},"create:purple_sail":{"fullCube":false,"alphaTest":true},"create:purple_seat":{"fullCube":false,"alphaTest":true},"create:purple_table_cloth":{"fullCube":false,"alphaTest":true},"create:purple_toolbox":{"fullCube":false,"alphaTest":true},"create:purple_valve_handle":{"fullCube":false,"alphaTest":true},"create:radial_chassis":{"fullCube":false},"create:red_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:red_postbox":{"fullCube":false,"alphaTest":true},"create:red_sail":{"fullCube":false,"alphaTest":true},"create:red_seat":{"fullCube":false,"alphaTest":true},"create:red_table_cloth":{"fullCube":false,"alphaTest":true},"create:red_toolbox":{"fullCube":false,"alphaTest":true},"create:red_valve_handle":{"fullCube":false,"alphaTest":true},"create:redstone_contact":{"fullCube":false},"create:redstone_link":{"fullCube":false,"alphaTest":true},"create:redstone_requester":{"fullCube":false,"alphaTest":true},"create:repackager":{"fullCube":false,"alphaTest":true},"create:rope":{"fullCube":false},"create:rope_pulley":{"fullCube":false,"alphaTest":true},"create:rotation_speed_controller":{"fullCube":false,"alphaTest":true},"create:sail_frame":{"fullCube":false,"alphaTest":true},"create:schematic_table":{"fullCube":false,"alphaTest":true},"create:schematicannon":{"fullCube":false,"alphaTest":true},"create:sequenced_gearshift":{"fullCube":false},"create:shaft":{"fullCube":false,"alphaTest":true},"create:small_andesite_brick_slab":{"fullCube":false},"create:small_andesite_brick_stairs":{"fullCube":false},"create:small_andesite_brick_wall":{"fullCube":false},"create:small_asurine_brick_slab":{"fullCube":false},"create:small_asurine_brick_stairs":{"fullCube":false},"create:small_asurine_brick_wall":{"fullCube":false},"create:small_bogey":{"fullCube":false},"create:small_calcite_brick_slab":{"fullCube":false},"create:small_calcite_brick_stairs":{"fullCube":false},"create:small_calcite_brick_wall":{"fullCube":false},"create:small_crimsite_brick_slab":{"fullCube":false},"create:small_crimsite_brick_stairs":{"fullCube":false},"create:small_crimsite_brick_wall":{"fullCube":false},"create:small_deepslate_brick_slab":{"fullCube":false},"create:small_deepslate_brick_stairs":{"fullCube":false},"create:small_deepslate_brick_wall":{"fullCube":false},"create:small_diorite_brick_slab":{"fullCube":false},"create:small_diorite_brick_stairs":{"fullCube":false},"create:small_diorite_brick_wall":{"fullCube":false},"create:small_dripstone_brick_slab":{"fullCube":false},"create:small_dripstone_brick_stairs":{"fullCube":false},"create:small_dripstone_brick_wall":{"fullCube":false},"create:small_granite_brick_slab":{"fullCube":false},"create:small_granite_brick_stairs":{"fullCube":false},"create:small_granite_brick_wall":{"fullCube":false},"create:small_limestone_brick_slab":{"fullCube":false},"create:small_limestone_brick_stairs":{"fullCube":false},"create:small_limestone_brick_wall":{"fullCube":false},"create:small_ochrum_brick_slab":{"fullCube":false},"create:small_ochrum_brick_stairs":{"fullCube":false},"create:small_ochrum_brick_wall":{"fullCube":false},"create:small_scorchia_brick_slab":{"fullCube":false},"create:small_scorchia_brick_stairs":{"fullCube":false},"create:small_scorchia_brick_wall":{"fullCube":false},"create:small_scoria_brick_slab":{"fullCube":false},"create:small_scoria_brick_stairs":{"fullCube":false},"create:small_scoria_brick_wall":{"fullCube":false},"create:small_tuff_brick_slab":{"fullCube":false},"create:small_tuff_brick_stairs":{"fullCube":false},"create:small_tuff_brick_wall":{"fullCube":false},"create:small_veridium_brick_slab":{"fullCube":false},"create:small_veridium_brick_stairs":{"fullCube":false},"create:small_veridium_brick_wall":{"fullCube":false},"create:smart_chute":{"fullCube":false,"alphaTest":true},"create:smart_fluid_pipe":{"fullCube":false,"alphaTest":true},"create:speedometer":{"fullCube":false,"alphaTest":true},"create:spout":{"fullCube":false,"alphaTest":true},"create:spruce_window":{"transparent":true,"alphaTest":true},"create:spruce_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:steam_engine":{"fullCube":false,"alphaTest":true},"create:steam_whistle":{"fullCube":false,"alphaTest":true},"create:steam_whistle_extension":{"fullCube":false,"alphaTest":true},"create:sticker":{"fullCube":false,"alphaTest":true},"create:sticky_mechanical_piston":{"fullCube":false,"alphaTest":true},"create:stock_link":{"fullCube":false,"transparent":true,"alphaTest":true},"create:stock_ticker":{"fullCube":false,"alphaTest":true},"create:stockpile_switch":{"fullCube":false},"create:stressometer":{"fullCube":false,"alphaTest":true},"create:tiled_glass":{"transparent":true,"alphaTest":true},"create:tiled_glass_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:track":{"fullCube":false,"alphaTest":true},"create:track_signal":{"fullCube":false},"create:track_station":{"fullCube":false,"alphaTest":true},"create:train_door":{"fullCube":false,"alphaTest":true},"create:train_trapdoor":{"fullCube":false,"alphaTest":true},"create:turntable":{"fullCube":false,"alphaTest":true},"create:vertical_framed_glass":{"transparent":true,"alphaTest":true},"create:vertical_framed_glass_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:warped_window":{"transparent":true,"alphaTest":true},"create:warped_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:water_wheel":{"fullCube":false,"alphaTest":true},"create:water_wheel_structure":{"fullCube":false},"create:waxed_copper_shingle_slab":{"fullCube":false},"create:waxed_copper_shingle_stairs":{"fullCube":false},"create:waxed_copper_tile_slab":{"fullCube":false},"create:waxed_copper_tile_stairs":{"fullCube":false},"create:waxed_exposed_copper_shingle_slab":{"fullCube":false},"create:waxed_exposed_copper_shingle_stairs":{"fullCube":false},"create:waxed_exposed_copper_tile_slab":{"fullCube":false},"create:waxed_exposed_copper_tile_stairs":{"fullCube":false},"create:waxed_oxidized_copper_shingle_slab":{"fullCube":false},"create:waxed_oxidized_copper_shingle_stairs":{"fullCube":false},"create:waxed_oxidized_copper_tile_slab":{"fullCube":false},"create:waxed_oxidized_copper_tile_stairs":{"fullCube":false},"create:waxed_weathered_copper_shingle_slab":{"fullCube":false},"create:waxed_weathered_copper_shingle_stairs":{"fullCube":false},"create:waxed_weathered_copper_tile_slab":{"fullCube":false},"create:waxed_weathered_copper_tile_stairs":{"fullCube":false},"create:weathered_copper_shingle_slab":{"fullCube":false},"create:weathered_copper_shingle_stairs":{"fullCube":false},"create:weathered_copper_tile_slab":{"fullCube":false},"create:weathered_copper_tile_stairs":{"fullCube":false},"create:weathered_iron_window":{"transparent":true},"create:weathered_iron_window_pane":{"fullCube":false,"transparent":true,"alphaTest":true},"create:weighted_ejector":{"fullCube":false,"alphaTest":true},"create:white_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:white_postbox":{"fullCube":false,"alphaTest":true},"create:white_sail":{"fullCube":false,"alphaTest":true},"create:white_seat":{"fullCube":false,"alphaTest":true},"create:white_table_cloth":{"fullCube":false,"alphaTest":true},"create:white_toolbox":{"fullCube":false,"alphaTest":true},"create:white_valve_handle":{"fullCube":false,"alphaTest":true},"create:windmill_bearing":{"fullCube":false},"create:wooden_bracket":{"fullCube":false,"alphaTest":true},"create:yellow_nixie_tube":{"fullCube":false,"transparent":true,"alphaTest":true},"create:yellow_postbox":{"fullCube":false,"alphaTest":true},"create:yellow_sail":{"fullCube":false,"alphaTest":true},"create:yellow_seat":{"fullCube":false,"alphaTest":true},"create:yellow_table_cloth":{"fullCube":false,"alphaTest":true},"create:yellow_toolbox":{"fullCube":false,"alphaTest":true},"create:yellow_valve_handle":{"fullCube":false,"alphaTest":true},"create_connected:black_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:blue_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:brake":{"fullCube":false,"alphaTest":true},"create_connected:brass_chute":{"fullCube":false,"alphaTest":true},"create_connected:brass_gearbox":{"fullCube":false},"create_connected:brown_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:centrifugal_clutch":{"fullCube":false,"alphaTest":true},"create_connected:copycat_beam":{"fullCube":false},"create_connected:copycat_block":{"fullCube":false},"create_connected:copycat_board":{"fullCube":false},"create_connected:copycat_fence":{"fullCube":false},"create_connected:copycat_fence_gate":{"fullCube":false},"create_connected:copycat_slab":{"fullCube":false},"create_connected:copycat_stairs":{"fullCube":false},"create_connected:copycat_vertical_step":{"fullCube":false},"create_connected:copycat_wall":{"fullCube":false},"create_connected:crank_wheel":{"fullCube":false,"alphaTest":true},"create_connected:creative_fluid_vessel":{"fullCube":false,"transparent":true,"alphaTest":true},"create_connected:cross_connector":{"fullCube":false},"create_connected:cyan_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dashboard":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_amber_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_aqua_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_beige_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_coral_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_forest_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_ginger_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_indigo_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_maroon_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_mint_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_navy_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_olive_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_rose_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_slate_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_tan_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_teal_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:dye_depot_verdant_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:empty_fan_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:encased_chain_cogwheel":{"fullCube":false,"alphaTest":true},"create_connected:fan_blasting_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_chocolate_coating_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_ending_catalyst_dragon_head":{"fullCube":false,"alphaTest":true},"create_connected:fan_ending_catalyst_dragons_breath":{"fullCube":false,"alphaTest":true},"create_connected:fan_enriched_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_exploding_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_freezing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_glooming_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_haunting_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_honey_coating_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_purifying_catalyst":{"fullCube":false},"create_connected:fan_resonance_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_sanding_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_sculking_catalyst":{"fullCube":false},"create_connected:fan_seething_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_smoking_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_soul_stripping_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_splashing_catalyst":{"fullCube":false},"create_connected:fan_transmutation_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fan_withering_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:fluid_vessel":{"fullCube":false,"transparent":true,"alphaTest":true},"create_connected:freewheel_clutch":{"fullCube":false,"alphaTest":true},"create_connected:gray_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:green_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:inventory_access_port":{"fullCube":false},"create_connected:inventory_bridge":{"fullCube":false},"create_connected:inverted_clutch":{"fullCube":false,"alphaTest":true},"create_connected:inverted_gearshift":{"fullCube":false,"alphaTest":true},"create_connected:kinetic_battery":{"fullCube":false,"alphaTest":true},"create_connected:kinetic_bridge":{"fullCube":false,"alphaTest":true},"create_connected:kinetic_bridge_destination":{"fullCube":false,"alphaTest":true},"create_connected:large_crank_wheel":{"fullCube":false,"alphaTest":true},"create_connected:light_blue_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:light_gray_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:lime_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:linked_acacia_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_analog_lever":{"fullCube":false,"alphaTest":true},"create_connected:linked_bamboo_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_birch_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_cherry_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_crimson_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_dark_oak_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_jungle_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_lever":{"fullCube":false,"alphaTest":true},"create_connected:linked_mangrove_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_oak_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_polished_blackstone_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_spruce_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_stone_button":{"fullCube":false,"alphaTest":true},"create_connected:linked_throttle_lever":{"fullCube":false,"alphaTest":true},"create_connected:linked_warped_button":{"fullCube":false,"alphaTest":true},"create_connected:magenta_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:orange_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:overstress_clutch":{"fullCube":false,"alphaTest":true},"create_connected:parallel_gearbox":{"fullCube":false},"create_connected:pink_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:purple_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:red_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:sequenced_pulse_generator":{"fullCube":false,"alphaTest":true},"create_connected:shear_pin":{"fullCube":false,"alphaTest":true},"create_connected:six_way_gearbox":{"fullCube":false,"alphaTest":true},"create_connected:white_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true},"create_connected:wrapped_copycat_fence":{"fullCube":false},"create_connected:wrapped_copycat_fence_gate":{"fullCube":false},"create_connected:wrapped_copycat_stairs":{"fullCube":false},"create_connected:wrapped_copycat_wall":{"fullCube":false},"create_connected:yellow_fan_dyeing_catalyst":{"fullCube":false,"alphaTest":true}};try{self.__MODRENDER_HINTS=H}catch(e){}for(var k in H){var h=H[k]||{};if(h.doubleSide)a.add(k);if(h.fullCube===false&&n.indexOf(k)<0)n.push(k);if(h.transparent&&o.indexOf(k)<0)o.push(k);if(h.alphaTest&&l.indexOf(k)<0)l.push(k);}})();/*modrh-end*/function i(e, t) {
        let r = e.replace("minecraft:", "");
        return !c.has(r) && t.some((e) => r.includes(e));
      }
      let u = [
          "glowstone",
          "sea_lantern",
          "lava",
          "magma_block",
          "shroomlight",
          "jack_o_lantern",
          "soul_lantern",
          "lantern",
          "soul_torch",
          "torch",
          "soul_campfire",
          "campfire",
          "redstone_lamp",
          "end_rod",
          "beacon",
          "conduit",
          "glow_lichen",
          "pearlescent_froglight",
          "verdant_froglight",
          "ochre_froglight",
          "amethyst_cluster",
          "copper_bulb",
          "candle",
          "soul_fire",
          "fire",
          "nether_portal",
          "end_portal",
          "crying_obsidian",
          "respawn_anchor",
          "sculk_catalyst",
          "sculk_sensor",
          "blast_furnace",
          "furnace",
          "smoker",
          "redstone_ore",
        ],
        f = {
          glowstone: "#ffcc33",
          sea_lantern: "#aaddff",
          lava: "#ff6600",
          magma_block: "#cc4400",
          shroomlight: "#ffaa44",
          jack_o_lantern: "#ff9922",
          soul_lantern: "#55cccc",
          lantern: "#ffbb44",
          soul_torch: "#55cccc",
          torch: "#ffbb44",
          soul_campfire: "#55cccc",
          campfire: "#ff8833",
          redstone_lamp: "#ff6644",
          end_rod: "#eeddff",
          beacon: "#aaeeff",
          conduit: "#66ccdd",
          glow_lichen: "#88cc88",
          pearlescent_froglight: "#eeccff",
          verdant_froglight: "#88ee88",
          ochre_froglight: "#eedd88",
          amethyst_cluster: "#bb88ff",
          copper_bulb: "#ff8855",
          candle: "#ffbb44",
          soul_fire: "#55cccc",
          fire: "#ff6600",
          nether_portal: "#9944ff",
          end_portal: "#6633cc",
          crying_obsidian: "#8844cc",
          respawn_anchor: "#aa44cc",
          sculk_catalyst: "#44bbbb",
          sculk_sensor: "#44bbbb",
          blast_furnace: "#ff7722",
          furnace: "#ff7722",
          smoker: "#ff7722",
          redstone_ore: "#ff3322",
        },
        _ = ["fire_coral", "dead_fire_coral", "torchflower", "end_portal_frame"],
        d = [
          "redstone_lamp",
          "copper_bulb",
          "soul_campfire",
          "campfire",
          "candle",
          "blast_furnace",
          "furnace",
          "smoker",
          "redstone_ore",
        ],
        h = {
          lava: 1.35,
          fire: 1.25,
          soul_fire: 1.25,
          nether_portal: 1.2,
          beacon: 1.2,
          conduit: 1.15,
          candle: 0.65,
          glow_lichen: 0.7,
          amethyst_cluster: 0.75,
          sculk_sensor: 0.8,
          sculk_catalyst: 0.8,
        },
        p = {
          magma_block: { threshold: 0.36, softness: 0.18 },
          jack_o_lantern: { threshold: 0.46, softness: 0.2 },
          soul_lantern: { threshold: 0.38, softness: 0.22 },
          lantern: { threshold: 0.62, softness: 0.18 },
          soul_torch: { threshold: 0.36, softness: 0.22 },
          torch: { threshold: 0.56, softness: 0.18 },
          soul_campfire: { threshold: 0.36, softness: 0.22 },
          campfire: { threshold: 0.52, softness: 0.2 },
          redstone_lamp: { threshold: 0.44, softness: 0.22 },
          end_rod: { threshold: 0.32, softness: 0.2 },
          glow_lichen: { threshold: 0.42, softness: 0.24 },
          amethyst_cluster: { threshold: 0.42, softness: 0.22 },
          copper_bulb: { threshold: 0.46, softness: 0.2 },
          candle: { threshold: 0.54, softness: 0.2 },
          crying_obsidian: { threshold: 0.28, softness: 0.22 },
          respawn_anchor: { threshold: 0.36, softness: 0.22 },
          sculk_catalyst: { threshold: 0.3, softness: 0.24 },
          sculk_sensor: { threshold: 0.3, softness: 0.24 },
          blast_furnace: { threshold: 0.5, softness: 0.2 },
          furnace: { threshold: 0.5, softness: 0.2 },
          smoker: { threshold: 0.48, softness: 0.2 },
          redstone_ore: { threshold: 0.48, softness: 0.22 },
        };
      function b(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = e.replace("minecraft:", "");
        if (_.some((e) => r.includes(e))) return m();
        for (let e of u)
          if (r.includes(e)) {
            var n, l, o, a;
            if (
              !(function (e, t) {
                return "respawn_anchor" === e && void 0 !== t.charges
                  ? Number.parseInt(t.charges, 10) > 0
                  : !d.some((t) => e.includes(t)) || void 0 === t.lit || "true" === t.lit;
              })(r, t)
            )
              return m();
            let s = p[e];
            return {
              needsEmissive: !0,
              color: null != (n = f[e]) ? n : null,
              intensityMultiplier: null != (l = h[e]) ? l : 1,
              luminanceThreshold: null != (o = null == s ? void 0 : s.threshold) ? o : 0,
              luminanceSoftness: null != (a = null == s ? void 0 : s.softness) ? a : 0.2,
            };
          }
        return m();
      }
      function m() {
        return {
          needsEmissive: !1,
          color: null,
          intensityMultiplier: 1,
          luminanceThreshold: 0,
          luminanceSoftness: 0.2,
        };
      }
    },
  },
]);

"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2084, 9703],
  {
    19023: (t, e, r) => {
      r.d(e, {
        Ew: () => s.Ew,
        Hj: () => s.Hj,
        MV: () => s.MV,
        Mi: () => l.M,
        NF: () => i.NF,
        Tj: () => s.Tj,
        Vc: () => i.Vc,
        Vk: () => s.Vk,
        fV: () => a.fV,
        hc: () => a.hc,
        iB: () => s.iB,
        k4: () => s.k4,
        lM: () => a.lM,
        mu: () => n.m,
        ob: () => a.ob,
        pT: () => s.pT,
        qE: () => s.qE,
        r6: () => s.r6,
        sb: () => s.sb,
        vz: () => s.vz,
      });
      var n = r(73880),
        a = r(84678),
        i = r(49517),
        s = r(96185),
        l = r(26890);
    },
    23273: (t, e, r) => {
      (r.d(e, {
        EU: () => a.EU,
        GJ: () => a.GJ,
        Gz: () => a.Gz,
        Jp: () => a.Jp,
        Nt: () => a.Nt,
        PP: () => a.PP,
        QT: () => a.QT,
        QU: () => a.QU,
        TD: () => n.T,
        Uq: () => a.Uq,
        l0: () => a.l0,
        pT: () => a.pT,
        t$: () => a.t$,
        zj: () => a.zj,
      }),
        r(67882));
      var n = r(14916);
      r(85957);
      var a = r(69185);
    },
    29849: (t, e, r) => {
      r.d(e, { z: () => g });
      var n = r(85250),
        a = r(50923),
        i = r(97633),
        s = r(45723),
        l = r(19023),
        u = r(31206),
        o = r(3420);
      let c = {
          0: [0, 3, 2, 3, 2, 1, 0, 1],
          90: [2, 3, 2, 1, 0, 1, 0, 3],
          180: [2, 1, 0, 1, 0, 3, 2, 3],
          270: [0, 1, 0, 3, 2, 3, 2, 1],
        },
        h = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] },
        f = {
          x: [1, 1.41421356237, 1.41421356237],
          y: [1.41421356237, 1, 1.41421356237],
          z: [1.41421356237, 1.41421356237, 1],
        };
      class g {
        parent;
        textures;
        elements;
        display;
        guiLight;
        static BUILTIN_GENERATED = s.gw.create("builtin/generated");
        static GENERATED_LAYERS = ["layer0", "layer1", "layer2", "layer3", "layer4"];
        generationMarker = !1;
        constructor(t, e, r, n, a) {
          ((this.parent = t),
            (this.textures = e),
            (this.elements = r),
            (this.display = n),
            (this.guiLight = a));
        }
        getDisplayTransform(t) {
          let e = this.display?.[t],
            r = n.vt();
          return (
            n.Tl(r, r, [8, 8, 8]),
            e?.translation && n.Tl(r, r, e.translation),
            e?.rotation &&
              (n.eL(r, r, (e.rotation[0] * Math.PI) / 180),
              n.Z8(r, r, (e.rotation[1] * Math.PI) / 180),
              n.Qr(r, r, (-e.rotation[2] * Math.PI) / 180)),
            e?.scale && n.hs(r, r, e.scale),
            n.Tl(r, r, [-8, -8, -8]),
            r
          );
        }
        getMesh(t, e, r) {
          let n = new u.e(),
            a = (t) =>
              void 0 === r || void 0 === t || t < 0 ? [1, 1, 1] : "function" == typeof r ? r(t) : r;
          for (let r of this.elements ?? []) n.merge(this.getElementMesh(r, t, e, a));
          return n;
        }
        getElementMesh(t, e, r, s) {
          let g = new u.e(),
            [p, d, m] = t.from,
            [M, v, x] = t.to,
            y = (t, r, n) => {
              let a = o.k.fromPoints(
                  new l.Mi(n[0], n[1], n[2]),
                  new l.Mi(n[3], n[4], n[5]),
                  new l.Mi(n[6], n[7], n[8]),
                  new l.Mi(n[9], n[10], n[11]),
                ),
                i = s(t.tintindex);
              a.setColor(i);
              let [u, h, f, p] = e.getTextureUV(this.getTexture(t.texture)),
                d = (f - u) / 16,
                m = (p - h) / 16;
              ((r[0] = (t.uv?.[0] ?? r[0]) * d),
                (r[1] = (t.uv?.[1] ?? r[1]) * m),
                (r[2] = (t.uv?.[2] ?? r[2]) * d),
                (r[3] = (t.uv?.[3] ?? r[3]) * m));
              let M = c[t.rotation ?? 0];
              (a.setTexture(
                [
                  u + r[M[0]],
                  h + r[M[1]],
                  u + r[M[2]],
                  h + r[M[3]],
                  u + r[M[4]],
                  h + r[M[5]],
                  u + r[M[6]],
                  h + r[M[7]],
                ],
                [
                  u + Math.min(r[0], r[2]),
                  h + Math.min(r[1], r[3]),
                  u + Math.max(r[0], r[2]),
                  h + Math.max(r[1], r[3]),
                ],
              ),
                g.quads.push(a));
            };
          (!t.faces?.up?.texture ||
            (t.faces.up.cullface && r[t.faces.up.cullface]) ||
            y(t.faces.up, [p, 16 - x, M, 16 - m], [p, v, x, M, v, x, M, v, m, p, v, m]),
            !t.faces?.down?.texture ||
              (t.faces.down.cullface && r[t.faces.down.cullface]) ||
              y(
                t.faces.down,
                [16 - x, 16 - M, 16 - m, 16 - p],
                [p, d, m, M, d, m, M, d, x, p, d, x],
              ),
            !t.faces?.south?.texture ||
              (t.faces.south.cullface && r[t.faces.south.cullface]) ||
              y(t.faces.south, [p, 16 - v, M, 16 - d], [p, d, x, M, d, x, M, v, x, p, v, x]),
            !t.faces?.north?.texture ||
              (t.faces.north.cullface && r[t.faces.north.cullface]) ||
              y(
                t.faces.north,
                [16 - M, 16 - v, 16 - p, 16 - d],
                [M, d, m, p, d, m, p, v, m, M, v, m],
              ),
            !t.faces?.east?.texture ||
              (t.faces.east.cullface && r[t.faces.east.cullface]) ||
              y(
                t.faces.east,
                [16 - x, 16 - v, 16 - m, 16 - d],
                [M, d, x, M, d, m, M, v, m, M, v, x],
              ),
            !t.faces?.west?.texture ||
              (t.faces.west.cullface && r[t.faces.west.cullface]) ||
              y(t.faces.west, [m, 16 - v, x, 16 - d], [p, d, m, p, d, x, p, v, x, p, v, m]));
          let w = n.vt();
          if (t.rotation) {
            let e = a.fA(...t.rotation.origin);
            (n.Tl(w, w, e),
              n.e$(w, w, i.DF(t.rotation.angle), h[t.rotation.axis]),
              t.rotation.rescale && n.hs(w, w, f[t.rotation.axis]),
              a.ze(e, e),
              n.Tl(w, w, e));
          }
          return g.transform(w);
        }
        getTexture(t) {
          for (
            t = t.startsWith("#") ? t.slice(1) : t, t = this.textures?.[t] ?? "";
            t.startsWith("#");
          )
            t = this.textures?.[t.slice(1)] ?? "";
          return s.gw.parse(t);
        }
        flatten(t) {
          if (!this.parent) return;
          if (this.parent.equals(g.BUILTIN_GENERATED)) {
            this.generationMarker = !0;
            return;
          }
          let e = this.getParent(t);
          if (!e) {
            (console.warn(`parent ${this.parent} does not exist!`), (this.parent = void 0));
            return;
          }
          if (
            (e.flatten(t),
            this.elements || (this.elements = e.elements),
            this.textures || (this.textures = {}),
            Object.keys(e.textures ?? {}).forEach((t) => {
              this.textures[t] || (this.textures[t] = e.textures[t]);
            }),
            this.display || (this.display = {}),
            Object.keys(e.display ?? {}).forEach((t) => {
              this.display[t]
                ? Object.keys(e.display[t] ?? {}).forEach((r) => {
                    this.display[t][r] || (this.display[t][r] = e.display[t][r]);
                  })
                : (this.display[t] = e.display[t]);
            }),
            this.guiLight || (this.guiLight = e.guiLight),
            e.generationMarker && (this.generationMarker = !0),
            this.generationMarker && (this.elements?.length ?? 0) === 0)
          )
            for (let t = 0; t < g.GENERATED_LAYERS.length; t += 1) {
              let e = g.GENERATED_LAYERS[t];
              if (!Object.hasOwn(this.textures, e)) break;
              (this.elements || (this.elements = []),
                this.elements.push({
                  from: [0, 0, 0],
                  to: [16, 16, 0],
                  faces: { south: { texture: `#${e}`, tintindex: t } },
                }));
            }
          this.parent = void 0;
        }
        getParent(t) {
          return this.parent ? t.getBlockModel(this.parent) : null;
        }
        static fromJson(t) {
          return new g(
            void 0 === t.parent ? void 0 : s.gw.parse(t.parent),
            t.textures,
            t.elements,
            t.display,
          );
        }
      }
    },
    69185: (t, e, r) => {
      (r.d(e, {
        EU: () => a.E,
        GJ: () => i.G,
        Gz: () => p.G,
        Jp: () => c.J,
        Nt: () => l.N,
        PP: () => o.P,
        QT: () => u.Q,
        QU: () => s.Q,
        Uq: () => f.U,
        l0: () => h.l,
        pT: () => g.p,
        t$: () => d.t,
        zj: () => n.z,
      }),
        r(36595));
      var n = r(4215),
        a = r(84224),
        i = r(19696),
        s = r(31388);
      r(64362);
      var l = r(78969),
        u = r(51190),
        o = r(18023),
        c = r(73165),
        h = r(96667),
        f = r(59276),
        g = r(7853),
        p = r(40436);
      r(40623);
      var d = r(22749);
      r(61955);
    },
    82084: (t, e, r) => {
      r.d(e, {
        fV: () => a.fV,
        IM: () => s.I,
        Ts: () => h,
        zg: () => f.z,
        IX: () => n.IX,
        F7: () => v.F7,
        OP: () => n.OP,
        gw: () => n.gw,
        LM: () => M.LM,
        Vc: () => a.Vc,
        e: () => c.e,
        zj: () => i.zj,
        EU: () => i.EU,
        GJ: () => i.GJ,
        QU: () => i.QU,
        TD: () => i.TD,
        Nt: () => i.Nt,
        QT: () => i.QT,
        PP: () => i.PP,
        Jp: () => i.Jp,
        l0: () => i.l0,
        Uq: () => i.Uq,
        pT: () => i.pT,
        Gz: () => i.Gz,
        t$: () => i.t$,
        lM: () => a.lM,
        Yl: () => v.Yl,
        ob: () => a.ob,
        kO: () => g.k,
        y6: () => p.y,
        Lw: () => d,
        Mi: () => a.Mi,
        Li: () => m.L,
        NF: () => a.NF,
        EB: () => M.EB,
      });
      var n = r(45723),
        a = r(19023),
        i = r(23273),
        s = r(39080),
        l = r(85250),
        u = r(97633),
        o = r(73475),
        c = r(31206);
      class h {
        variants;
        multipart;
        constructor(t, e) {
          ((this.variants = t), (this.multipart = e));
        }
        getModelVariants(t) {
          if (this.variants) {
            let e = Object.keys(this.variants).filter((e) => this.matchesVariant(e, t));
            if (0 === e.length) return [];
            let r = this.variants[e[0]];
            return [Array.isArray(r) ? r[0] : r];
          }
          return this.multipart
            ? this.multipart
                .filter((e) => !e.when || this.matchesCase(e.when, t))
                .map((t) => (Array.isArray(t.apply) ? t.apply[0] : t.apply))
            : [];
        }
        getMesh(t, e, r, a, i) {
          let h = this.getModelVariants(e),
            f = new c.e();
          for (let c of h) {
            let h = o.V.rotate(i, c.x ?? 0, c.y ?? 0),
              g = a.getBlockModel(n.gw.parse(c.model));
            if (!g) throw Error(`Cannot find block model ${c.model}`);
            let p = t ? s.I[t.path]?.(e) : void 0,
              d = g.getMesh(r, h, p);
            if (c.x || c.y) {
              let t = l.vt();
              (l.Tl(t, t, [8, 8, 8]),
                l.Z8(t, t, -u.DF(c.y ?? 0)),
                l.eL(t, t, -u.DF(c.x ?? 0)),
                l.Tl(t, t, [-8, -8, -8]),
                d.transform(t));
            }
            f.merge(d);
          }
          let g = l.vt();
          return (l.hs(g, g, [0.0625, 0.0625, 0.0625]), f.transform(g));
        }
        matchesVariant(t, e) {
          return t.split(",").every((t) => {
            let [r, n] = t.split("=");
            return e[r] === n;
          });
        }
        matchesCase(t, e) {
          return Array.isArray(t.OR)
            ? t.OR.some((t) => this.matchesCase(t, e))
            : Array.isArray(t.AND)
              ? t.AND.every((t) => this.matchesCase(t, e))
              : Object.keys(t).every((r) => t[r].split("|").includes(e[r]));
        }
        static fromJson(t) {
          return new h(t.variants, t.multipart);
        }
      }
      var f = r(29849);
      (r(16947), r(29169), r(47795), r(19881), r(63281));
      var g = r(3420),
        p = r(21337);
      r(94619);
      class d {
        img;
        idMap;
        part;
        constructor(t, e) {
          if (((this.img = t), (this.idMap = e), !(0, a.r6)(t.width) || !(0, a.r6)(t.height)))
            throw Error(
              `Expected texture atlas dimensions to be powers of two, got ${t.width}x${t.height}.`,
            );
          this.part = 16 / t.width;
        }
        getTextureAtlas() {
          return this.img;
        }
        getTextureUV(t) {
          return this.idMap[t.toString()] ?? [0, 0, this.part, this.part];
        }
        getPixelSize() {
          return this.part / 16;
        }
        static async fromBlobs(t) {
          let e = Math.sqrt(Object.keys(t).length + 1),
            r = (0, a.Hj)(e),
            n = 16 * r,
            i = 1 / r,
            s = document.createElement("canvas");
          ((s.width = n), (s.height = n));
          let l = s.getContext("2d");
          this.drawInvalidTexture(l);
          let u = {},
            o = 1;
          return (
            await Promise.all(
              Object.keys(t).map(async (e) => {
                let n = o % r,
                  a = Math.floor(o / r);
                ((o += 1), (u[e] = [i * n, i * a, i * n + i, i * a + i]));
                let s = await createImageBitmap(t[e]);
                l.drawImage(s, 0, 0, 16, 16, 16 * n, 16 * a, 16, 16);
              }),
            ),
            new d(l.getImageData(0, 0, n, n), u)
          );
        }
        static empty() {
          let t = document.createElement("canvas");
          ((t.width = 16), (t.height = 16));
          let e = t.getContext("2d");
          return (d.drawInvalidTexture(e), new d(e.getImageData(0, 0, 16, 16), {}));
        }
        static drawInvalidTexture(t) {
          ((t.fillStyle = "black"),
            t.fillRect(0, 0, 16, 16),
            (t.fillStyle = "magenta"),
            t.fillRect(0, 0, 8, 8),
            t.fillRect(8, 8, 8, 8));
        }
      }
      var m = r(98169);
      r(99498);
      var M = r(13402),
        v = r(65808);
    },
    85250: (t, e, r) => {
      r.d(e, {
        C: () => i,
        CV: () => f,
        Qr: () => h,
        Tl: () => s,
        Z8: () => c,
        e$: () => u,
        eL: () => o,
        fN: () => g,
        hs: () => l,
        v3: () => p,
        vt: () => a,
      });
      var n = r(97633);
      function a() {
        var t = new n.tb(16);
        return (
          n.tb != Float32Array &&
            ((t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0)),
          (t[0] = 1),
          (t[5] = 1),
          (t[10] = 1),
          (t[15] = 1),
          t
        );
      }
      function i(t, e) {
        return (
          (t[0] = e[0]),
          (t[1] = e[1]),
          (t[2] = e[2]),
          (t[3] = e[3]),
          (t[4] = e[4]),
          (t[5] = e[5]),
          (t[6] = e[6]),
          (t[7] = e[7]),
          (t[8] = e[8]),
          (t[9] = e[9]),
          (t[10] = e[10]),
          (t[11] = e[11]),
          (t[12] = e[12]),
          (t[13] = e[13]),
          (t[14] = e[14]),
          (t[15] = e[15]),
          t
        );
      }
      function s(t, e, r) {
        var n,
          a,
          i,
          s,
          l,
          u,
          o,
          c,
          h,
          f,
          g,
          p,
          d = r[0],
          m = r[1],
          M = r[2];
        return (
          e === t
            ? ((t[12] = e[0] * d + e[4] * m + e[8] * M + e[12]),
              (t[13] = e[1] * d + e[5] * m + e[9] * M + e[13]),
              (t[14] = e[2] * d + e[6] * m + e[10] * M + e[14]),
              (t[15] = e[3] * d + e[7] * m + e[11] * M + e[15]))
            : ((n = e[0]),
              (a = e[1]),
              (i = e[2]),
              (s = e[3]),
              (l = e[4]),
              (u = e[5]),
              (o = e[6]),
              (c = e[7]),
              (h = e[8]),
              (f = e[9]),
              (g = e[10]),
              (p = e[11]),
              (t[0] = n),
              (t[1] = a),
              (t[2] = i),
              (t[3] = s),
              (t[4] = l),
              (t[5] = u),
              (t[6] = o),
              (t[7] = c),
              (t[8] = h),
              (t[9] = f),
              (t[10] = g),
              (t[11] = p),
              (t[12] = n * d + l * m + h * M + e[12]),
              (t[13] = a * d + u * m + f * M + e[13]),
              (t[14] = i * d + o * m + g * M + e[14]),
              (t[15] = s * d + c * m + p * M + e[15])),
          t
        );
      }
      function l(t, e, r) {
        var n = r[0],
          a = r[1],
          i = r[2];
        return (
          (t[0] = e[0] * n),
          (t[1] = e[1] * n),
          (t[2] = e[2] * n),
          (t[3] = e[3] * n),
          (t[4] = e[4] * a),
          (t[5] = e[5] * a),
          (t[6] = e[6] * a),
          (t[7] = e[7] * a),
          (t[8] = e[8] * i),
          (t[9] = e[9] * i),
          (t[10] = e[10] * i),
          (t[11] = e[11] * i),
          (t[12] = e[12]),
          (t[13] = e[13]),
          (t[14] = e[14]),
          (t[15] = e[15]),
          t
        );
      }
      function u(t, e, r, a) {
        var i,
          s,
          l,
          u,
          o,
          c,
          h,
          f,
          g,
          p,
          d,
          m,
          M,
          v,
          x,
          y,
          w,
          E,
          T,
          I,
          B,
          k,
          b,
          A,
          N = a[0],
          V = a[1],
          z = a[2],
          P = Math.sqrt(N * N + V * V + z * z);
        return P < n.p8
          ? null
          : ((N *= P = 1 / P),
            (V *= P),
            (z *= P),
            (i = Math.sin(r)),
            (l = 1 - (s = Math.cos(r))),
            (u = e[0]),
            (o = e[1]),
            (c = e[2]),
            (h = e[3]),
            (f = e[4]),
            (g = e[5]),
            (p = e[6]),
            (d = e[7]),
            (m = e[8]),
            (M = e[9]),
            (v = e[10]),
            (x = e[11]),
            (y = N * N * l + s),
            (w = V * N * l + z * i),
            (E = z * N * l - V * i),
            (T = N * V * l - z * i),
            (I = V * V * l + s),
            (B = z * V * l + N * i),
            (k = N * z * l + V * i),
            (b = V * z * l - N * i),
            (A = z * z * l + s),
            (t[0] = u * y + f * w + m * E),
            (t[1] = o * y + g * w + M * E),
            (t[2] = c * y + p * w + v * E),
            (t[3] = h * y + d * w + x * E),
            (t[4] = u * T + f * I + m * B),
            (t[5] = o * T + g * I + M * B),
            (t[6] = c * T + p * I + v * B),
            (t[7] = h * T + d * I + x * B),
            (t[8] = u * k + f * b + m * A),
            (t[9] = o * k + g * b + M * A),
            (t[10] = c * k + p * b + v * A),
            (t[11] = h * k + d * b + x * A),
            e !== t && ((t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
            t);
      }
      function o(t, e, r) {
        var n = Math.sin(r),
          a = Math.cos(r),
          i = e[4],
          s = e[5],
          l = e[6],
          u = e[7],
          o = e[8],
          c = e[9],
          h = e[10],
          f = e[11];
        return (
          e !== t &&
            ((t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15])),
          (t[4] = i * a + o * n),
          (t[5] = s * a + c * n),
          (t[6] = l * a + h * n),
          (t[7] = u * a + f * n),
          (t[8] = o * a - i * n),
          (t[9] = c * a - s * n),
          (t[10] = h * a - l * n),
          (t[11] = f * a - u * n),
          t
        );
      }
      function c(t, e, r) {
        var n = Math.sin(r),
          a = Math.cos(r),
          i = e[0],
          s = e[1],
          l = e[2],
          u = e[3],
          o = e[8],
          c = e[9],
          h = e[10],
          f = e[11];
        return (
          e !== t &&
            ((t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15])),
          (t[0] = i * a - o * n),
          (t[1] = s * a - c * n),
          (t[2] = l * a - h * n),
          (t[3] = u * a - f * n),
          (t[8] = i * n + o * a),
          (t[9] = s * n + c * a),
          (t[10] = l * n + h * a),
          (t[11] = u * n + f * a),
          t
        );
      }
      function h(t, e, r) {
        var n = Math.sin(r),
          a = Math.cos(r),
          i = e[0],
          s = e[1],
          l = e[2],
          u = e[3],
          o = e[4],
          c = e[5],
          h = e[6],
          f = e[7];
        return (
          e !== t &&
            ((t[8] = e[8]),
            (t[9] = e[9]),
            (t[10] = e[10]),
            (t[11] = e[11]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15])),
          (t[0] = i * a + o * n),
          (t[1] = s * a + c * n),
          (t[2] = l * a + h * n),
          (t[3] = u * a + f * n),
          (t[4] = o * a - i * n),
          (t[5] = c * a - s * n),
          (t[6] = h * a - l * n),
          (t[7] = f * a - u * n),
          t
        );
      }
      function f(t, e) {
        return (
          (t[0] = e[0]),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 0),
          (t[5] = e[1]),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 0),
          (t[9] = 0),
          (t[10] = e[2]),
          (t[11] = 0),
          (t[12] = 0),
          (t[13] = 0),
          (t[14] = 0),
          (t[15] = 1),
          t
        );
      }
      var g = function (t, e, r, n, a) {
          var i = 1 / Math.tan(e / 2);
          if (
            ((t[0] = i / r),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = i),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[11] = -1),
            (t[12] = 0),
            (t[13] = 0),
            (t[15] = 0),
            null != a && a !== 1 / 0)
          ) {
            var s = 1 / (n - a);
            ((t[10] = (a + n) * s), (t[14] = 2 * a * n * s));
          } else ((t[10] = -1), (t[14] = -2 * n));
          return t;
        },
        p = function (t, e, r, n, a, i, s) {
          var l = 1 / (e - r),
            u = 1 / (n - a),
            o = 1 / (i - s);
          return (
            (t[0] = -2 * l),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = -2 * u),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 2 * o),
            (t[11] = 0),
            (t[12] = (e + r) * l),
            (t[13] = (a + n) * u),
            (t[14] = (s + i) * o),
            (t[15] = 1),
            t
          );
        };
    },
    96185: (t, e, r) => {
      function n(t) {
        return t * t;
      }
      function a(t, e, r) {
        return Math.max(e, Math.min(r, t));
      }
      r.d(e, {
        El: () => M,
        Ew: () => n,
        Hj: () => w,
        MV: () => h,
        TF: () => f,
        Tj: () => g,
        Vk: () => p,
        iB: () => s,
        k4: () => I,
        kE: () => x,
        nX: () => l,
        pT: () => c,
        qE: () => a,
        r6: () => y,
        sA: () => v,
        sb: () => E,
        t$: () => m,
        uE: () => i,
        vz: () => T,
        y8: () => d,
      });
      function i(t, e, r) {
        return Math.fround(e + Math.fround(t * Math.fround(r - e)));
      }
      function s(t, e, r, n, a, i) {
        var s;
        return (s = r + t * (n - r)) + e * (a + t * (i - a) - s);
      }
      function l(t, e, r, n, a, i, l, u, o, c, h) {
        var f;
        return (f = s(t, e, n, a, i, l)) + r * (s(t, e, u, o, c, h) - f);
      }
      function u(t, e, r) {
        return 0 === t ? e() : 1 === t ? r() : e() + t * (r() - e());
      }
      function o(t, e, r, n, a, i) {
        return u(
          e,
          () => u(t, r, n),
          () => u(t, a, i),
        );
      }
      function c(t, e, r, n, a, i, s, l, c, h, f) {
        return u(
          r,
          () => o(t, e, n, a, i, s),
          () => o(t, e, l, c, h, f),
        );
      }
      function h(t, e, r) {
        return r < 0 ? t : r > 1 ? e : t + r * (e - t);
      }
      function f(t) {
        return t * t * t * (t * (6 * t - 15) + 10);
      }
      function g(t, e, r, n, a) {
        return n + ((t - e) / (r - e)) * (a - n);
      }
      function p(t, e, r, n, a) {
        return h(n, a, (t - e) / (r - e));
      }
      function d(t) {
        return a(Math.floor(t), -0x80000000, 0x7fffffff);
      }
      function m(t) {
        return a(Math.floor(t), -0x8000000000000000, 0x8000000000000000);
      }
      function M(t, e, r) {
        let n = e - t;
        for (; n > 0;) {
          let e = Math.floor(n / 2),
            a = t + e;
          if (r(a)) {
            n = e;
            continue;
          }
          ((t = a + 1), (n -= e + 1));
        }
        return t;
      }
      function v(t, e, r) {
        let n = BigInt(3129871 * t) ^ (BigInt(r) * BigInt(0x6ebfff5)) ^ BigInt(e);
        return (n = n * n * BigInt(0x285b825) + n * BigInt(11)) >> BigInt(16);
      }
      function x(t, e, r, n, a, i, s, l) {
        return (
          (BigInt(t) << BigInt(56)) |
          (BigInt(e) << BigInt(48)) |
          (BigInt(r) << BigInt(40)) |
          (BigInt(n) << BigInt(32)) |
          (BigInt(a) << BigInt(24)) |
          (BigInt(i) << BigInt(16)) |
          (BigInt(s) << BigInt(8)) |
          BigInt(l)
        );
      }
      function y(t) {
        return (t & (t - 1)) == 0;
      }
      function w(t) {
        return (
          (t -= 1),
          (t |= t >> 1),
          (t |= t >> 2),
          (t |= t >> 4),
          (t |= t >> 8),
          (t |= t >> 18),
          (t |= t >> 32) + 1
        );
      }
      function E(t, e, r) {
        return t.nextInt(r - e + 1) + e;
      }
      function T(t, e, r) {
        return e >= r ? e : t.nextInt(r - e + 1) + e;
      }
      function I(t, e) {
        for (var r = t.length; r > 1; r--) {
          let n = e.nextInt(r),
            a = t[n];
          ((t[n] = t[r - 1]), (t[r - 1] = a));
        }
      }
    },
  },
]);

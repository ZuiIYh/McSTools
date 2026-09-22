"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7578],
  {
    37578: (t, e, n) => {
      n.d(e, {
        ae: () => O,
        b3: () => k,
        NS: () => T,
        c2: () => M,
        Oe: () => v,
        nV: () => _,
        y6: () => p,
      });
      var r = n(82084),
        a = n(85339),
        o = n(55671);
      let i = new Set([
          "minecraft:item/generated",
          "minecraft:item/handheld",
          "minecraft:item/handheld_rod",
          "minecraft:item/handheld_mace",
          "minecraft:builtin/generated",
        ]),
        l = (t) => (t.includes(":") ? t : /*modns*/"minecraft:".concat(t)),
        c = "/uploads/buildings/blockID/mcmeta",
        s = {
          "minecraft:nether_portal": ["minecraft:block/nether_portal"],
          "minecraft:fire": ["minecraft:block/fire_0", "minecraft:block/fire_1"],
          "minecraft:soul_fire": ["minecraft:block/soul_fire_0", "minecraft:block/soul_fire_1"],
          "minecraft:lava": ["minecraft:block/lava_still", "minecraft:block/lava_flow"],
          "minecraft:flowing_lava": ["minecraft:block/lava_still", "minecraft:block/lava_flow"],
        },
        f = null,
        u = null,
        m = null,
        w = new Map(),
        h = new Map(),
        g = new Map(),
        y = new Map(),
        d = new Map(),
        b = ["_e", "_emissive", "_emission", "_lightmask", "_light_mask", "_mask", "_bloom"];
      function p() {
        return (
          f ||
          (f = z().catch((t) => {
            throw ((f = null), t);
          }))
        );
      }
      function v() {
        return u;
      }
      function k() {
        return m;
      }
      function _(t) {
        return y.has(t.includes(":") ? t : "minecraft:".concat(t));
      }
      function M(t) {
        let e = t instanceof Error ? t.message : String(t || "");
        return e.startsWith("MC 方块资源加载失败")
          ? e
          : e
            ? "MC 方块资源加载失败：".concat(e)
            : "MC 方块资源加载失败：网络连接中断，请刷新页面或稍后重试。";
      }
      function O(t) {
        let e = j(t),
          n = s[e];
        if (n) {
          var r = n;
          let t = Array.from(new Set(r)),
            e = t
              .map((t) => w.get(t))
              .filter((t) => !!t)
              .sort((t, e) => e.frameCount - t.frameCount);
          if (!e[0]) return null;
          let a = t.flatMap((t) => {
            var e, n;
            return null != (n = null == (e = w.get(t)) ? void 0 : e.regions) ? n : [];
          });
          return { ...e[0], textureIds: t, regions: a };
        }
        let a = h.get(e);
        return a || null;
      }
      function T(t) {
        var e;
        return null != (e = d.get(j(t))) ? e : [];
      }
      function j(t) {
        var e;
        let n = String(t || "")
          .trim()
          .toLowerCase();
        if (!n) return "minecraft:air";
        let r = n.includes(":") ? n : "minecraft:".concat(n);
        return null != (e = o.ic[r]) ? e : r;
      }
      function S(t) {
        let e = String(t || "")
          .trim()
          .replace(/^#/, "");
        return e ? (e.includes(":") ? e : e.includes("/") ? "minecraft:".concat(e) : "") : "";
      }
      function C(t) {
        return String(t || "")
          .trim()
          .replace(/^minecraft:/, "");
      }
      function E(t, e) {
        if (t && "object" == typeof t)
          for (let n of ("string" == typeof t.model && e.add(C(t.model)), Object.values(t)))
            E(n, e);
      }
      function x(t, e) {
        let n = t.trim(),
          r = new Set();
        for (; n.startsWith("#");) {
          let t = n.slice(1);
          if (r.has(t)) return "";
          r.add(t);
          let a = e[t];
          if ("string" != typeof a) return "";
          n = a.trim();
        }
        return S(n);
      }
      function I(t, e, n, r) {
        let a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : new Set(),
          o = C(t);
        if (!o || a.has(o)) return;
        a.add(o);
        let i = e[o];
        if (!i || "object" != typeof i) return;
        let l = { ...(i.textures && "object" == typeof i.textures ? i.textures : {}), ...n };
        for (let t of Object.values(l))
          if ("string" == typeof t) {
            let e = x(t, l);
            e && r.add(e);
          }
        (!(function t(e, n, r) {
          if (!e || "object" != typeof e) return;
          let a = e.texture;
          if ("string" == typeof a) {
            let t = x(a, n);
            t && r.add(t);
          }
          for (let a of Object.values(e)) t(a, n, r);
        })(i.elements, l, r),
          "string" == typeof i.parent && I(i.parent, e, l, r, a));
      }
      function A(t) {
        return new Promise((e) => setTimeout(e, t));
      }
      function H(t) {
        return t.split("/").pop() || t;
      }
      function L(t) {
        return new URL(t, window.location.origin).toString();
      }
      async function R() {
        if (!("caches" in window)) return null;
        try {
          return await window.caches.open("mcblock-mcmeta-20260226-v1");
        } catch (t) {
          return null;
        }
      }
      async function N(t, e) {
        let n = await t.text();
        try {
          return {
            value: JSON.parse(n),
            body: n,
            contentType: t.headers.get("content-type") || "application/json; charset=utf-8",
          };
        } catch (t) {
          throw Error("资源 JSON 解析失败: ".concat(H(e)));
        }
      }
      async function P(t) {
        let e = await t.blob();
        return {
          value: e,
          body: e,
          contentType: t.headers.get("content-type") || e.type || "application/octet-stream",
        };
      }
      async function U(t, e) {
        let n = await R();
        if (!n) return null;
        let r = L(t);
        try {
          let a = await n.match(r);
          if (!a) return null;
          return (await e(a, t)).value;
        } catch (t) {
          return (await n.delete(r).catch(() => {}), null);
        }
      }
      async function W(t, e) {
        let n = await R();
        if (!n) return;
        let r = new Headers();
        r.set("Content-Type", e.contentType);
        try {
          await n.put(L(t), new Response(e.body, { headers: r }));
        } catch (t) {}
      }
      function D(t) {
        return t instanceof Error
          ? "AbortError" === t.name
            ? "请求超时"
            : t.message || t.name
          : String(t || "未知错误");
      }
      async function F(t, e) {
        let n = new AbortController(),
          r = setTimeout(() => n.abort(), e);
        try {
          return await fetch(t, {
            method: "HEAD",
            signal: n.signal,
            credentials: "same-origin",
            cache: "no-cache",
          });
        } finally {
          clearTimeout(r);
        }
      }
      async function V(t, e, n) {
        let r = null;
        for (let a = 0; a <= 2; a++) {
          let o = new AbortController(),
            i = setTimeout(() => o.abort(), 15e3);
          try {
            let r = await fetch(t, {
              signal: o.signal,
              credentials: "same-origin",
              cache: "no-cache",
              headers: { Range: "bytes=".concat(e, "-").concat(n) },
            });
            if (!r.ok) throw Error("HTTP ".concat(r.status));
            let a = await r.arrayBuffer();
            return { status: r.status, headers: r.headers, bytes: new Uint8Array(a) };
          } catch (t) {
            ((r = t), a < 2 && (await A(250 * (a + 1))));
          } finally {
            clearTimeout(i);
          }
        }
        throw Error("分段下载失败: ".concat(D(r)));
      }
      async function B(t) {
        let e = await F(t, 1e4);
        if (!e.ok) throw Error("HEAD HTTP ".concat(e.status));
        let n = Number(e.headers.get("content-length") || 0);
        if (!Number.isFinite(n) || n <= 0) throw Error("缺少 Content-Length");
        let r = e.headers.get("content-type") || "application/octet-stream",
          a = new Uint8Array(n),
          o = 0;
        for (; o < n;) {
          let e = Math.min(o + 262144 - 1, n - 1),
            i = await V(t, o, e);
          if (200 === i.status && 0 === o) {
            let t = new Headers();
            return (
              t.set("Content-Type", i.headers.get("content-type") || r),
              new Response(
                i.bytes.buffer.slice(i.bytes.byteOffset, i.bytes.byteOffset + i.bytes.byteLength),
                { headers: t },
              )
            );
          }
          if (206 !== i.status) throw Error("Range HTTP ".concat(i.status));
          if ((a.set(i.bytes, o), (o += i.bytes.byteLength), 0 === i.bytes.byteLength))
            throw Error("分段下载返回空内容");
        }
        let i = new Headers();
        return (
          i.set("Content-Type", r),
          new Response(a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength), { headers: i })
        );
      }
      async function J(t, e) {
        let n = await U(t, e);
        if (null != n) return n;
        let r = null,
          a = !1;
        for (let n = 0; n <= 2; n++) {
          let o = new AbortController(),
            i = setTimeout(() => o.abort(), 25e3);
          try {
            let n = await fetch(t, {
              signal: o.signal,
              credentials: "same-origin",
              cache: "no-cache",
            });
            if (!n.ok) throw Error("HTTP ".concat(n.status));
            let r = await e(n, t);
            return (W(t, r), r.value);
          } catch (o) {
            if (((r = o), !a)) {
              a = !0;
              try {
                let n = await B(t),
                  r = await e(n, t);
                return (W(t, r), r.value);
              } catch (t) {
                r = t;
              }
            }
            n < 2 && (await A(350 * (n + 1)));
          } finally {
            clearTimeout(i);
          }
        }
        let o = await U(t, e);
        if (null != o) return o;
        if (!a)
          try {
            let n = await B(t),
              r = await e(n, t);
            return (W(t, r), r.value);
          } catch (t) {
            r = t;
          }
        throw Error(
          "MC 方块资源加载失败："
            .concat(H(t), " 多次请求未成功（")
            .concat(D(r), "）。请刷新页面或稍后重新导入投影。"),
        );
      }
      async function z() {
        let t = async (t) => J(t, N),
          e = async (t) => J(t, P),
          n = await t("".concat(c, "/block-definitions.json")),
          s = await t("".concat(c, "/block-models.json")),
          f = await t("".concat(c, "/atlas-uv.json")),
          p = await e("".concat(c, "/atlas.png")),
          v = await t("".concat(c, "/block-default-properties.json")),
          k = new Map();
        for (let [t, e] of Object.entries(n)) {
          let n = t.includes(":") ? t : /*modns*/"minecraft:".concat(t);
          try {
            let t = r.Ts.fromJson(e);
            k.set(n, t);
          } catch (t) {}
        }
        for (let [t, e] of Object.entries(o.ic)) !k.has(t) && k.has(e) && k.set(t, k.get(e));
        let _ = new Map();
        for (let [t, e] of Object.entries(v)) {
          let n = t.includes(":") ? t : /*modns*/"minecraft:".concat(t);
          _.set(n, e);
        }
        for (let [t, e] of Object.entries(o.ic)) !_.has(t) && _.has(e) && _.set(t, { ..._.get(e) });
        let M = new Map();
        for (let [t, e] of Object.entries(s)) {
          let n = t.includes(":") ? t : /*modns*/"minecraft:".concat(t);
          try {
            let t = r.zg.fromJson(e);
            M.set(n, t);
          } catch (t) {}
        }
        let O = (function (t) {
            let e = new Map();
            for (let [n, r] of Object.entries(t)) {
              let t = null == r ? void 0 : r.parent;
              "string" == typeof t && t && e.set(l(n), l(t));
            }
            let n = function (t) {
                let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (i.has(t)) return !0;
                if (r > 8) return !1;
                let a = e.get(t);
                return !!a && n(a, r + 1);
              },
              r = new Set();
            for (let e of Object.keys(t))
              e.startsWith("item/") && n(l(e)) && r.add("minecraft:".concat(e.slice(5)));
            return r;
          })(s),
          T = {
            getBlockModel(t) {
              var e;
              return null != (e = M.get(t.toString())) ? e : null;
            },
          };
        for (let t of M.values())
          try {
            t.flatten(T);
          } catch (t) {}
        let C = await createImageBitmap(p),
          x = (t) => {
            let e = 1;
            for (; e < t;) e <<= 1;
            return e;
          },
          A = x(C.width),
          H = x(C.height),
          L = document.createElement("canvas");
        ((L.width = A), (L.height = H));
        let R = L.getContext("2d");
        R.drawImage(C, 0, 0);
        let U = R.getImageData(0, 0, A, H),
          W = {};
        for (let [t, e] of ((y = new Map()), Object.entries(f))) {
          let n = e[2],
            r = Math.min(e[3], e[2]),
            a = [e[0] / A, e[1] / H, (e[0] + n) / A, (e[1] + r) / H],
            o = t.includes(":") ? t : "minecraft:".concat(t);
          ((W[o] = a), y.set(o, { textureId: o, u0: a[0], v0: a[1], u1: a[2], v1: a[3] }));
        }
        let D = new r.Lw(U, W);
        for (let [t, e] of ((w = new Map()), Object.entries(f)))
          if (e[3] > e[2]) {
            let n = e[2],
              r = Math.floor(e[3] / n),
              a = t.includes(":") ? t : "minecraft:".concat(t),
              o = {
                textureId: a,
                u0: e[0] / A,
                v0: e[1] / H,
                u1: (e[0] + n) / A,
                v1: (e[1] + n) / H,
                frameCount: r,
                vOffsetPerFrame: n / H,
              };
            w.set(a, { frameCount: r, vOffsetPerFrame: n / H, textureIds: [a], regions: [o] });
          }
        for (let [t, e] of ((g = (function (t, e, n) {
          let r = new Map();
          for (let [a, o] of Object.entries(t)) {
            let t = new Set();
            E(o, t);
            let i = new Set();
            for (let n of t) I(n, e, {}, i);
            let l = [...i].filter((t) => n.has(t)).sort();
            l.length > 0 && r.set(j(a), l);
          }
          return r;
        })(n, s, new Set(w.keys()))),
        (h = new Map()),
        g)) {
          let n = e
            .map((t) => w.get(t))
            .filter((t) => !!t)
            .sort((t, e) => e.frameCount - t.frameCount);
          if (n[0]) {
            let r = e.flatMap((t) => {
              var e, n;
              return null != (n = null == (e = w.get(t)) ? void 0 : e.regions) ? n : [];
            });
            h.set(t, { ...n[0], textureIds: e, regions: r });
          }
        }
        return (
          (d = (function (t, e, n) {
            let r = new Map();
            for (let [a, o] of Object.entries(t)) {
              let t = new Set();
              E(o, t);
              let i = new Set();
              for (let n of t) I(n, e, {}, i);
              let l = new Map();
              for (let t of i) {
                let e = (function (t, e) {
                  let n = S(t),
                    r = e.get(n);
                  if (!r) return null;
                  for (let t of b) {
                    let a = "".concat(n).concat(t),
                      o = e.get(a);
                    if (o)
                      return {
                        sourceTextureId: n,
                        maskTextureId: a,
                        sourceU0: r.u0,
                        sourceV0: r.v0,
                        sourceU1: r.u1,
                        sourceV1: r.v1,
                        maskU0: o.u0,
                        maskV0: o.v0,
                        maskU1: o.u1,
                        maskV1: o.v1,
                      };
                  }
                  return null;
                })(t, n);
                e && l.set("".concat(e.sourceTextureId, "|").concat(e.maskTextureId), e);
              }
              l.size > 0 && r.set(j(a), Array.from(l.values()));
            }
            return r;
          })(n, s, y)),
          ((m = new a.GOR(L)).magFilter = a.hxR),
          (m.minFilter = a.Cfg),
          (m.generateMipmaps = !0),
          (m.colorSpace = a.er$),
          (m.flipY = !1),
          (u = {
            blockDefinitions: {
              getBlockDefinition(t) {
                var e;
                return null != (e = k.get(t.toString())) ? e : null;
              },
            },
            blockIds: new Set(k.keys()),
            blockModels: T,
            atlas: D,
            defaultBlockProperties: _,
            animatedTexturesByBlockId: g,
            emissionLightMasksByBlockId: d,
            flatIconItemIds: O,
          })
        );
      }
    },
  },
]);

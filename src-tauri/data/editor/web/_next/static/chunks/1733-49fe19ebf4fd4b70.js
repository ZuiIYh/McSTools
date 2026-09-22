"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1733],
  {
    1733: (t, e, i) => {
      let n;
      i.d(e, { P: () => rp });
      var s = i(12115);
      let r = [
          "transformPerspective",
          "x",
          "y",
          "z",
          "translateX",
          "translateY",
          "translateZ",
          "scale",
          "scaleX",
          "scaleY",
          "rotate",
          "rotateX",
          "rotateY",
          "rotateZ",
          "skew",
          "skewX",
          "skewY",
        ],
        o = new Set(r),
        a = (t) => (180 * t) / Math.PI,
        l = (t) => u(a(Math.atan2(t[1], t[0]))),
        h = {
          x: 4,
          y: 5,
          translateX: 4,
          translateY: 5,
          scaleX: 0,
          scaleY: 3,
          scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
          rotate: l,
          rotateZ: l,
          skewX: (t) => a(Math.atan(t[1])),
          skewY: (t) => a(Math.atan(t[2])),
          skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
        },
        u = (t) => ((t %= 360) < 0 && (t += 360), t),
        d = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
        c = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
        p = {
          x: 12,
          y: 13,
          z: 14,
          translateX: 12,
          translateY: 13,
          translateZ: 14,
          scaleX: d,
          scaleY: c,
          scale: (t) => (d(t) + c(t)) / 2,
          rotateX: (t) => u(a(Math.atan2(t[6], t[5]))),
          rotateY: (t) => u(a(Math.atan2(-t[2], t[0]))),
          rotateZ: l,
          rotate: l,
          skewX: (t) => a(Math.atan(t[4])),
          skewY: (t) => a(Math.atan(t[1])),
          skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
        };
      function m(t) {
        return +!!t.includes("scale");
      }
      function f(t, e) {
        let i, n;
        if (!t || "none" === t) return m(e);
        let s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
        if (s) ((i = p), (n = s));
        else {
          let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
          ((i = h), (n = e));
        }
        if (!n) return m(e);
        let r = i[e],
          o = n[1].split(",").map(v);
        return "function" == typeof r ? r(o) : o[r];
      }
      function v(t) {
        return parseFloat(t.trim());
      }
      let g = (t) => (e) => "string" == typeof e && e.startsWith(t),
        y = g("--"),
        x = g("var(--"),
        T = (t) => !!x(t) && w.test(t.split("/*")[0].trim()),
        w = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
      function P(t) {
        let { top: e, left: i, right: n, bottom: s } = t;
        return { x: { min: i, max: n }, y: { min: e, max: s } };
      }
      let b = (t, e, i) => t + (e - t) * i;
      function S(t) {
        return void 0 === t || 1 === t;
      }
      function A(t) {
        let { scale: e, scaleX: i, scaleY: n } = t;
        return !S(e) || !S(i) || !S(n);
      }
      function M(t) {
        return A(t) || V(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
      }
      function V(t) {
        var e, i;
        return ((e = t.x) && "0%" !== e) || ((i = t.y) && "0%" !== i);
      }
      function E(t, e, i, n, s) {
        return (void 0 !== s && (t = n + s * (t - n)), n + i * (t - n) + e);
      }
      function C(t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
          n = arguments.length > 3 ? arguments[3] : void 0,
          s = arguments.length > 4 ? arguments[4] : void 0;
        ((t.min = E(t.min, e, i, n, s)), (t.max = E(t.max, e, i, n, s)));
      }
      function D(t, e) {
        let { x: i, y: n } = e;
        (C(t.x, i.translate, i.scale, i.originPoint), C(t.y, n.translate, n.scale, n.originPoint));
      }
      function k(t, e) {
        ((t.min = t.min + e), (t.max = t.max + e));
      }
      function R(t, e, i, n) {
        let s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0.5,
          r = b(t.min, t.max, s);
        C(t, e, i, r, n);
      }
      function L(t, e) {
        (R(t.x, e.x, e.scaleX, e.scale, e.originX), R(t.y, e.y, e.scaleY, e.scale, e.originY));
      }
      function j(t, e) {
        return P(
          (function (t, e) {
            if (!e) return t;
            let i = e({ x: t.left, y: t.top }),
              n = e({ x: t.right, y: t.bottom });
            return { top: i.y, left: i.x, bottom: n.y, right: n.x };
          })(t.getBoundingClientRect(), e),
        );
      }
      let F = (t) => !!(t && t.getVelocity),
        B = new Set(["width", "height", "top", "left", "right", "bottom", ...r]),
        O = (t, e, i) => (i > e ? e : i < t ? t : i),
        I = { test: (t) => "number" == typeof t, parse: parseFloat, transform: (t) => t },
        U = { ...I, transform: (t) => O(0, 1, t) },
        N = { ...I, default: 1 },
        W = (t) => ({
          test: (e) => "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length,
          parse: parseFloat,
          transform: (e) => `${e}${t}`,
        }),
        Y = W("deg"),
        z = W("%"),
        H = W("px"),
        X = W("vh"),
        K = W("vw"),
        $ = { ...z, parse: (t) => z.parse(t) / 100, transform: (t) => z.transform(100 * t) },
        q = (t) => (e) => e.test(t),
        G = [I, H, z, Y, K, X, { test: (t) => "auto" === t, parse: (t) => t }],
        _ = (t) => G.find(q(t)),
        Z = () => {},
        Q = () => {},
        J = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
        tt = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
        te = (t) => t === I || t === H,
        ti = new Set(["x", "y", "z"]),
        tn = r.filter((t) => !ti.has(t)),
        ts = {
          width: ({ x: t }, { paddingLeft: e = "0", paddingRight: i = "0" }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          height: ({ y: t }, { paddingTop: e = "0", paddingBottom: i = "0" }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          top: (t, { top: e }) => parseFloat(e),
          left: (t, { left: e }) => parseFloat(e),
          bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
          right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
          x: (t, { transform: e }) => f(e, "x"),
          y: (t, { transform: e }) => f(e, "y"),
        };
      ((ts.translateX = ts.x), (ts.translateY = ts.y));
      let tr = (t) => t,
        to = {},
        ta = [
          "setup",
          "read",
          "resolveKeyframes",
          "preUpdate",
          "update",
          "preRender",
          "render",
          "postRender",
        ],
        tl = { value: null, addProjectionMetrics: null };
      function th(t, e) {
        let i = !1,
          n = !0,
          s = { delta: 0, timestamp: 0, isProcessing: !1 },
          r = () => (i = !0),
          o = ta.reduce(
            (t, i) => (
              (t[i] = (function (t, e) {
                let i = new Set(),
                  n = new Set(),
                  s = !1,
                  r = !1,
                  o = new WeakSet(),
                  a = { delta: 0, timestamp: 0, isProcessing: !1 },
                  l = 0;
                function h(e) {
                  (o.has(e) && (u.schedule(e), t()), l++, e(a));
                }
                let u = {
                  schedule: (t, e = !1, r = !1) => {
                    let a = r && s ? i : n;
                    return (e && o.add(t), a.has(t) || a.add(t), t);
                  },
                  cancel: (t) => {
                    (n.delete(t), o.delete(t));
                  },
                  process: (t) => {
                    if (((a = t), s)) {
                      r = !0;
                      return;
                    }
                    ((s = !0),
                      ([i, n] = [n, i]),
                      i.forEach(h),
                      e && tl.value && tl.value.frameloop[e].push(l),
                      (l = 0),
                      i.clear(),
                      (s = !1),
                      r && ((r = !1), u.process(t)));
                  },
                };
                return u;
              })(r, e ? i : void 0)),
              t
            ),
            {},
          ),
          {
            setup: a,
            read: l,
            resolveKeyframes: h,
            preUpdate: u,
            update: d,
            preRender: c,
            render: p,
            postRender: m,
          } = o,
          f = () => {
            let r = to.useManualTiming ? s.timestamp : performance.now();
            ((i = !1),
              to.useManualTiming ||
                (s.delta = n ? 1e3 / 60 : Math.max(Math.min(r - s.timestamp, 40), 1)),
              (s.timestamp = r),
              (s.isProcessing = !0),
              a.process(s),
              l.process(s),
              h.process(s),
              u.process(s),
              d.process(s),
              c.process(s),
              p.process(s),
              m.process(s),
              (s.isProcessing = !1),
              i && e && ((n = !1), t(f)));
          };
        return {
          schedule: ta.reduce((e, r) => {
            let a = o[r];
            return (
              (e[r] = (e, r = !1, o = !1) => (
                !i && ((i = !0), (n = !0), s.isProcessing || t(f)),
                a.schedule(e, r, o)
              )),
              e
            );
          }, {}),
          cancel: (t) => {
            for (let e = 0; e < ta.length; e++) o[ta[e]].cancel(t);
          },
          state: s,
          steps: o,
        };
      }
      let {
          schedule: tu,
          cancel: td,
          state: tc,
          steps: tp,
        } = th("undefined" != typeof requestAnimationFrame ? requestAnimationFrame : tr, !0),
        tm = new Set(),
        tf = !1,
        tv = !1,
        tg = !1;
      function ty() {
        if (tv) {
          let t = Array.from(tm).filter((t) => t.needsMeasurement),
            e = new Set(t.map((t) => t.element)),
            i = new Map();
          (e.forEach((t) => {
            let e = (function (t) {
              let e = [];
              return (
                tn.forEach((i) => {
                  let n = t.getValue(i);
                  void 0 !== n && (e.push([i, n.get()]), n.set(+!!i.startsWith("scale")));
                }),
                e
              );
            })(t);
            e.length && (i.set(t, e), t.render());
          }),
            t.forEach((t) => t.measureInitialState()),
            e.forEach((t) => {
              t.render();
              let e = i.get(t);
              e &&
                e.forEach(([e, i]) => {
                  t.getValue(e)?.set(i);
                });
            }),
            t.forEach((t) => t.measureEndState()),
            t.forEach((t) => {
              void 0 !== t.suspendedScrollY && window.scrollTo(0, t.suspendedScrollY);
            }));
        }
        ((tv = !1), (tf = !1), tm.forEach((t) => t.complete(tg)), tm.clear());
      }
      function tx() {
        tm.forEach((t) => {
          (t.readKeyframes(), t.needsMeasurement && (tv = !0));
        });
      }
      class tT {
        constructor(t, e, i, n, s, r = !1) {
          ((this.state = "pending"),
            (this.isAsync = !1),
            (this.needsMeasurement = !1),
            (this.unresolvedKeyframes = [...t]),
            (this.onComplete = e),
            (this.name = i),
            (this.motionValue = n),
            (this.element = s),
            (this.isAsync = r));
        }
        scheduleResolve() {
          ((this.state = "scheduled"),
            this.isAsync
              ? (tm.add(this), tf || ((tf = !0), tu.read(tx), tu.resolveKeyframes(ty)))
              : (this.readKeyframes(), this.complete()));
        }
        readKeyframes() {
          let { unresolvedKeyframes: t, name: e, element: i, motionValue: n } = this;
          if (null === t[0]) {
            let s = n?.get(),
              r = t[t.length - 1];
            if (void 0 !== s) t[0] = s;
            else if (i && e) {
              let n = i.readValue(e, r);
              null != n && (t[0] = n);
            }
            (void 0 === t[0] && (t[0] = r), n && void 0 === s && n.set(t[0]));
          }
          for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
        }
        setFinalKeyframe() {}
        measureInitialState() {}
        renderEndStyles() {}
        measureEndState() {}
        complete(t = !1) {
          ((this.state = "complete"),
            this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
            tm.delete(this));
        }
        cancel() {
          "scheduled" === this.state && (tm.delete(this), (this.state = "pending"));
        }
        resume() {
          "pending" === this.state && this.scheduleResolve();
        }
      }
      let tw = (t) => /^0[^.\s]+$/u.test(t),
        tP = (t) => Math.round(1e5 * t) / 1e5,
        tb = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
        tS =
          /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
        tA = (t, e) => (i) =>
          !!(
            ("string" == typeof i && tS.test(i) && i.startsWith(t)) ||
            (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
          ),
        tM = (t, e, i) => (n) => {
          if ("string" != typeof n) return n;
          let [s, r, o, a] = n.match(tb);
          return {
            [t]: parseFloat(s),
            [e]: parseFloat(r),
            [i]: parseFloat(o),
            alpha: void 0 !== a ? parseFloat(a) : 1,
          };
        },
        tV = { ...I, transform: (t) => Math.round(O(0, 255, t)) },
        tE = {
          test: tA("rgb", "red"),
          parse: tM("red", "green", "blue"),
          transform: ({ red: t, green: e, blue: i, alpha: n = 1 }) =>
            "rgba(" +
            tV.transform(t) +
            ", " +
            tV.transform(e) +
            ", " +
            tV.transform(i) +
            ", " +
            tP(U.transform(n)) +
            ")",
        },
        tC = {
          test: tA("#"),
          parse: function (t) {
            let e = "",
              i = "",
              n = "",
              s = "";
            return (
              t.length > 5
                ? ((e = t.substring(1, 3)),
                  (i = t.substring(3, 5)),
                  (n = t.substring(5, 7)),
                  (s = t.substring(7, 9)))
                : ((e = t.substring(1, 2)),
                  (i = t.substring(2, 3)),
                  (n = t.substring(3, 4)),
                  (s = t.substring(4, 5)),
                  (e += e),
                  (i += i),
                  (n += n),
                  (s += s)),
              {
                red: parseInt(e, 16),
                green: parseInt(i, 16),
                blue: parseInt(n, 16),
                alpha: s ? parseInt(s, 16) / 255 : 1,
              }
            );
          },
          transform: tE.transform,
        },
        tD = {
          test: tA("hsl", "hue"),
          parse: tM("hue", "saturation", "lightness"),
          transform: ({ hue: t, saturation: e, lightness: i, alpha: n = 1 }) =>
            "hsla(" +
            Math.round(t) +
            ", " +
            z.transform(tP(e)) +
            ", " +
            z.transform(tP(i)) +
            ", " +
            tP(U.transform(n)) +
            ")",
        },
        tk = {
          test: (t) => tE.test(t) || tC.test(t) || tD.test(t),
          parse: (t) => (tE.test(t) ? tE.parse(t) : tD.test(t) ? tD.parse(t) : tC.parse(t)),
          transform: (t) =>
            "string" == typeof t ? t : t.hasOwnProperty("red") ? tE.transform(t) : tD.transform(t),
          getAnimatableNone: (t) => {
            let e = tk.parse(t);
            return ((e.alpha = 0), tk.transform(e));
          },
        },
        tR =
          /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
        tL = "number",
        tj = "color",
        tF =
          /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
      function tB(t) {
        let e = t.toString(),
          i = [],
          n = { color: [], number: [], var: [] },
          s = [],
          r = 0,
          o = e
            .replace(
              tF,
              (t) => (
                tk.test(t)
                  ? (n.color.push(r), s.push(tj), i.push(tk.parse(t)))
                  : t.startsWith("var(")
                    ? (n.var.push(r), s.push("var"), i.push(t))
                    : (n.number.push(r), s.push(tL), i.push(parseFloat(t))),
                ++r,
                "${}"
              ),
            )
            .split("${}");
        return { values: i, split: o, indexes: n, types: s };
      }
      function tO(t) {
        return tB(t).values;
      }
      function tI(t) {
        let { split: e, types: i } = tB(t),
          n = e.length;
        return (t) => {
          let s = "";
          for (let r = 0; r < n; r++)
            if (((s += e[r]), void 0 !== t[r])) {
              let e = i[r];
              e === tL ? (s += tP(t[r])) : e === tj ? (s += tk.transform(t[r])) : (s += t[r]);
            }
          return s;
        };
      }
      let tU = (t) => ("number" == typeof t ? 0 : tk.test(t) ? tk.getAnimatableNone(t) : t),
        tN = {
          test: function (t) {
            return (
              isNaN(t) &&
              "string" == typeof t &&
              (t.match(tb)?.length || 0) + (t.match(tR)?.length || 0) > 0
            );
          },
          parse: tO,
          createTransformer: tI,
          getAnimatableNone: function (t) {
            let e = tO(t);
            return tI(t)(e.map(tU));
          },
        },
        tW = new Set(["brightness", "contrast", "saturate", "opacity"]);
      function tY(t) {
        let [e, i] = t.slice(0, -1).split("(");
        if ("drop-shadow" === e) return t;
        let [n] = i.match(tb) || [];
        if (!n) return t;
        let s = i.replace(n, ""),
          r = +!!tW.has(e);
        return (n !== i && (r *= 100), e + "(" + r + s + ")");
      }
      let tz = /\b([a-z-]*)\(.*?\)/gu,
        tH = {
          ...tN,
          getAnimatableNone: (t) => {
            let e = t.match(tz);
            return e ? e.map(tY).join(" ") : t;
          },
        },
        tX = { ...I, transform: Math.round },
        tK = {
          borderWidth: H,
          borderTopWidth: H,
          borderRightWidth: H,
          borderBottomWidth: H,
          borderLeftWidth: H,
          borderRadius: H,
          radius: H,
          borderTopLeftRadius: H,
          borderTopRightRadius: H,
          borderBottomRightRadius: H,
          borderBottomLeftRadius: H,
          width: H,
          maxWidth: H,
          height: H,
          maxHeight: H,
          top: H,
          right: H,
          bottom: H,
          left: H,
          padding: H,
          paddingTop: H,
          paddingRight: H,
          paddingBottom: H,
          paddingLeft: H,
          margin: H,
          marginTop: H,
          marginRight: H,
          marginBottom: H,
          marginLeft: H,
          backgroundPositionX: H,
          backgroundPositionY: H,
          rotate: Y,
          rotateX: Y,
          rotateY: Y,
          rotateZ: Y,
          scale: N,
          scaleX: N,
          scaleY: N,
          scaleZ: N,
          skew: Y,
          skewX: Y,
          skewY: Y,
          distance: H,
          translateX: H,
          translateY: H,
          translateZ: H,
          x: H,
          y: H,
          z: H,
          perspective: H,
          transformPerspective: H,
          opacity: U,
          originX: $,
          originY: $,
          originZ: H,
          zIndex: tX,
          fillOpacity: U,
          strokeOpacity: U,
          numOctaves: tX,
        },
        t$ = {
          ...tK,
          color: tk,
          backgroundColor: tk,
          outlineColor: tk,
          fill: tk,
          stroke: tk,
          borderColor: tk,
          borderTopColor: tk,
          borderRightColor: tk,
          borderBottomColor: tk,
          borderLeftColor: tk,
          filter: tH,
          WebkitFilter: tH,
        },
        tq = (t) => t$[t];
      function tG(t, e) {
        let i = tq(t);
        return (i !== tH && (i = tN), i.getAnimatableNone ? i.getAnimatableNone(e) : void 0);
      }
      let t_ = new Set(["auto", "none", "0"]);
      class tZ extends tT {
        constructor(t, e, i, n, s) {
          super(t, e, i, n, s, !0);
        }
        readKeyframes() {
          let { unresolvedKeyframes: t, element: e, name: i } = this;
          if (!e || !e.current) return;
          super.readKeyframes();
          for (let i = 0; i < t.length; i++) {
            let n = t[i];
            if ("string" == typeof n && T((n = n.trim()))) {
              let s = (function t(e, i, n = 1) {
                Q(
                  n <= 4,
                  `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
                  "max-css-var-depth",
                );
                let [s, r] = (function (t) {
                  let e = tt.exec(t);
                  if (!e) return [,];
                  let [, i, n, s] = e;
                  return [`--${i ?? n}`, s];
                })(e);
                if (!s) return;
                let o = window.getComputedStyle(i).getPropertyValue(s);
                if (o) {
                  let t = o.trim();
                  return J(t) ? parseFloat(t) : t;
                }
                return T(r) ? t(r, i, n + 1) : r;
              })(n, e.current);
              (void 0 !== s && (t[i] = s), i === t.length - 1 && (this.finalKeyframe = n));
            }
          }
          if ((this.resolveNoneKeyframes(), !B.has(i) || 2 !== t.length)) return;
          let [n, s] = t,
            r = _(n),
            o = _(s);
          if (r !== o)
            if (te(r) && te(o))
              for (let e = 0; e < t.length; e++) {
                let i = t[e];
                "string" == typeof i && (t[e] = parseFloat(i));
              }
            else ts[i] && (this.needsMeasurement = !0);
        }
        resolveNoneKeyframes() {
          let { unresolvedKeyframes: t, name: e } = this,
            i = [];
          for (let e = 0; e < t.length; e++) {
            var n;
            (null === t[e] ||
              ("number" == typeof (n = t[e])
                ? 0 === n
                : null === n || "none" === n || "0" === n || tw(n))) &&
              i.push(e);
          }
          i.length &&
            (function (t, e, i) {
              let n,
                s = 0;
              for (; s < t.length && !n;) {
                let e = t[s];
                ("string" == typeof e && !t_.has(e) && tB(e).values.length && (n = t[s]), s++);
              }
              if (n && i) for (let s of e) t[s] = tG(i, n);
            })(t, i, e);
        }
        measureInitialState() {
          let { element: t, unresolvedKeyframes: e, name: i } = this;
          if (!t || !t.current) return;
          ("height" === i && (this.suspendedScrollY = window.pageYOffset),
            (this.measuredOrigin = ts[i](
              t.measureViewportBox(),
              window.getComputedStyle(t.current),
            )),
            (e[0] = this.measuredOrigin));
          let n = e[e.length - 1];
          void 0 !== n && t.getValue(i, n).jump(n, !1);
        }
        measureEndState() {
          let { element: t, name: e, unresolvedKeyframes: i } = this;
          if (!t || !t.current) return;
          let n = t.getValue(e);
          n && n.jump(this.measuredOrigin, !1);
          let s = i.length - 1,
            r = i[s];
          ((i[s] = ts[e](t.measureViewportBox(), window.getComputedStyle(t.current))),
            null !== r && void 0 === this.finalKeyframe && (this.finalKeyframe = r),
            this.removedTransforms?.length &&
              this.removedTransforms.forEach(([e, i]) => {
                t.getValue(e).set(i);
              }),
            this.resolveNoneKeyframes());
        }
      }
      function tQ(t, e) {
        -1 === t.indexOf(e) && t.push(e);
      }
      function tJ(t, e) {
        let i = t.indexOf(e);
        i > -1 && t.splice(i, 1);
      }
      class t0 {
        constructor() {
          this.subscriptions = [];
        }
        add(t) {
          return (tQ(this.subscriptions, t), () => tJ(this.subscriptions, t));
        }
        notify(t, e, i) {
          let n = this.subscriptions.length;
          if (n)
            if (1 === n) this.subscriptions[0](t, e, i);
            else
              for (let s = 0; s < n; s++) {
                let n = this.subscriptions[s];
                n && n(t, e, i);
              }
        }
        getSize() {
          return this.subscriptions.length;
        }
        clear() {
          this.subscriptions.length = 0;
        }
      }
      function t1() {
        n = void 0;
      }
      let t2 = {
          now: () => (
            void 0 === n &&
              t2.set(tc.isProcessing || to.useManualTiming ? tc.timestamp : performance.now()),
            n
          ),
          set: (t) => {
            ((n = t), queueMicrotask(t1));
          },
        },
        t3 = { current: void 0 };
      class t5 {
        constructor(t, e = {}) {
          ((this.canTrackVelocity = null),
            (this.events = {}),
            (this.updateAndNotify = (t) => {
              let e = t2.now();
              if (
                (this.updatedAt !== e && this.setPrevFrameValue(),
                (this.prev = this.current),
                this.setCurrent(t),
                this.current !== this.prev &&
                  (this.events.change?.notify(this.current), this.dependents))
              )
                for (let t of this.dependents) t.dirty();
            }),
            (this.hasAnimated = !1),
            this.setCurrent(t),
            (this.owner = e.owner));
        }
        setCurrent(t) {
          ((this.current = t),
            (this.updatedAt = t2.now()),
            null === this.canTrackVelocity &&
              void 0 !== t &&
              (this.canTrackVelocity = !isNaN(parseFloat(this.current))));
        }
        setPrevFrameValue(t = this.current) {
          ((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt));
        }
        onChange(t) {
          return this.on("change", t);
        }
        on(t, e) {
          this.events[t] || (this.events[t] = new t0());
          let i = this.events[t].add(e);
          return "change" === t
            ? () => {
                (i(),
                  tu.read(() => {
                    this.events.change.getSize() || this.stop();
                  }));
              }
            : i;
        }
        clearListeners() {
          for (let t in this.events) this.events[t].clear();
        }
        attach(t, e) {
          ((this.passiveEffect = t), (this.stopPassiveEffect = e));
        }
        set(t) {
          this.passiveEffect
            ? this.passiveEffect(t, this.updateAndNotify)
            : this.updateAndNotify(t);
        }
        setWithVelocity(t, e, i) {
          (this.set(e),
            (this.prev = void 0),
            (this.prevFrameValue = t),
            (this.prevUpdatedAt = this.updatedAt - i));
        }
        jump(t, e = !0) {
          (this.updateAndNotify(t),
            (this.prev = t),
            (this.prevUpdatedAt = this.prevFrameValue = void 0),
            e && this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect());
        }
        dirty() {
          this.events.change?.notify(this.current);
        }
        addDependent(t) {
          (this.dependents || (this.dependents = new Set()), this.dependents.add(t));
        }
        removeDependent(t) {
          this.dependents && this.dependents.delete(t);
        }
        get() {
          return (t3.current && t3.current.push(this), this.current);
        }
        getPrevious() {
          return this.prev;
        }
        getVelocity() {
          var t;
          let e = t2.now();
          if (!this.canTrackVelocity || void 0 === this.prevFrameValue || e - this.updatedAt > 30)
            return 0;
          let i = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
          return (
            (t = parseFloat(this.current) - parseFloat(this.prevFrameValue)),
            i ? (1e3 / i) * t : 0
          );
        }
        start(t) {
          return (
            this.stop(),
            new Promise((e) => {
              ((this.hasAnimated = !0),
                (this.animation = t(e)),
                this.events.animationStart && this.events.animationStart.notify());
            }).then(() => {
              (this.events.animationComplete && this.events.animationComplete.notify(),
                this.clearAnimation());
            })
          );
        }
        stop() {
          (this.animation &&
            (this.animation.stop(),
            this.events.animationCancel && this.events.animationCancel.notify()),
            this.clearAnimation());
        }
        isAnimating() {
          return !!this.animation;
        }
        clearAnimation() {
          delete this.animation;
        }
        destroy() {
          (this.dependents?.clear(),
            this.events.destroy?.notify(),
            this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect());
        }
      }
      function t4(t, e) {
        return new t5(t, e);
      }
      let t9 = [...G, tk, tN],
        { schedule: t6 } = th(queueMicrotask, !1),
        t7 = {
          animation: [
            "animate",
            "variants",
            "whileHover",
            "whileTap",
            "exit",
            "whileInView",
            "whileFocus",
            "whileDrag",
          ],
          exit: ["exit"],
          drag: ["drag", "dragControls"],
          focus: ["whileFocus"],
          hover: ["whileHover", "onHoverStart", "onHoverEnd"],
          tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
          pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
          inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
          layout: ["layout", "layoutId"],
        },
        t8 = {};
      for (let t in t7) t8[t] = { isEnabled: (e) => t7[t].some((t) => !!e[t]) };
      let et = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
        ee = () => ({ x: et(), y: et() }),
        ei = () => ({ min: 0, max: 0 }),
        en = () => ({ x: ei(), y: ei() });
      var es = i(33577);
      let er = { current: null },
        eo = { current: !1 },
        ea = new WeakMap();
      function el(t) {
        return null !== t && "object" == typeof t && "function" == typeof t.start;
      }
      function eh(t) {
        return "string" == typeof t || Array.isArray(t);
      }
      let eu = [
          "animate",
          "whileInView",
          "whileFocus",
          "whileHover",
          "whileTap",
          "whileDrag",
          "exit",
        ],
        ed = ["initial", ...eu];
      function ec(t) {
        return el(t.animate) || ed.some((e) => eh(t[e]));
      }
      function ep(t) {
        return !!(ec(t) || t.variants);
      }
      function em(t) {
        let e = [{}, {}];
        return (
          null == t ||
            t.values.forEach((t, i) => {
              ((e[0][i] = t.get()), (e[1][i] = t.getVelocity()));
            }),
          e
        );
      }
      function ef(t, e, i, n) {
        if ("function" == typeof e) {
          let [s, r] = em(n);
          e = e(void 0 !== i ? i : t.custom, s, r);
        }
        if (("string" == typeof e && (e = t.variants && t.variants[e]), "function" == typeof e)) {
          let [s, r] = em(n);
          e = e(void 0 !== i ? i : t.custom, s, r);
        }
        return e;
      }
      let ev = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete",
      ];
      class eg {
        scrapeMotionValuesFromProps(t, e, i) {
          return {};
        }
        mount(t) {
          var e;
          ((this.current = t),
            ea.set(t, this),
            this.projection && !this.projection.instance && this.projection.mount(t),
            this.parent &&
              this.isVariantNode &&
              !this.isControllingVariants &&
              (this.removeFromVariantTree = this.parent.addVariantChild(this)),
            this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
            eo.current ||
              (function () {
                if (((eo.current = !0), es.B))
                  if (window.matchMedia) {
                    let t = window.matchMedia("(prefers-reduced-motion)"),
                      e = () => (er.current = t.matches);
                    (t.addEventListener("change", e), e());
                  } else er.current = !1;
              })(),
            (this.shouldReduceMotion =
              "never" !== this.reducedMotionConfig &&
              ("always" === this.reducedMotionConfig || er.current)),
            null == (e = this.parent) || e.addChild(this),
            this.update(this.props, this.presenceContext));
        }
        unmount() {
          var t;
          for (let e in (this.projection && this.projection.unmount(),
          td(this.notifyUpdate),
          td(this.render),
          this.valueSubscriptions.forEach((t) => t()),
          this.valueSubscriptions.clear(),
          this.removeFromVariantTree && this.removeFromVariantTree(),
          null == (t = this.parent) || t.removeChild(this),
          this.events))
            this.events[e].clear();
          for (let t in this.features) {
            let e = this.features[t];
            e && (e.unmount(), (e.isMounted = !1));
          }
          this.current = null;
        }
        addChild(t) {
          (this.children.add(t),
            null != this.enteringChildren || (this.enteringChildren = new Set()),
            this.enteringChildren.add(t));
        }
        removeChild(t) {
          (this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t));
        }
        bindToMotionValue(t, e) {
          let i;
          this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
          let n = o.has(t);
          n && this.onBindTransform && this.onBindTransform();
          let s = e.on("change", (e) => {
            ((this.latestValues[t] = e),
              this.props.onUpdate && tu.preRender(this.notifyUpdate),
              n && this.projection && (this.projection.isTransformDirty = !0),
              this.scheduleRender());
          });
          (window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, t, e)),
            this.valueSubscriptions.set(t, () => {
              (s(), i && i(), e.owner && e.stop());
            }));
        }
        sortNodePosition(t) {
          return this.current && this.sortInstanceNodePosition && this.type === t.type
            ? this.sortInstanceNodePosition(this.current, t.current)
            : 0;
        }
        updateFeatures() {
          let t = "animation";
          for (t in t8) {
            let e = t8[t];
            if (!e) continue;
            let { isEnabled: i, Feature: n } = e;
            if (
              (!this.features[t] && n && i(this.props) && (this.features[t] = new n(this)),
              this.features[t])
            ) {
              let e = this.features[t];
              e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
            }
          }
        }
        triggerBuild() {
          this.build(this.renderState, this.latestValues, this.props);
        }
        measureViewportBox() {
          return this.current ? this.measureInstanceViewportBox(this.current, this.props) : en();
        }
        getStaticValue(t) {
          return this.latestValues[t];
        }
        setStaticValue(t, e) {
          this.latestValues[t] = e;
        }
        update(t, e) {
          ((t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
            (this.prevProps = this.props),
            (this.props = t),
            (this.prevPresenceContext = this.presenceContext),
            (this.presenceContext = e));
          for (let e = 0; e < ev.length; e++) {
            let i = ev[e];
            this.propEventSubscriptions[i] &&
              (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
            let n = t["on" + i];
            n && (this.propEventSubscriptions[i] = this.on(i, n));
          }
          ((this.prevMotionValues = (function (t, e, i) {
            for (let n in e) {
              let s = e[n],
                r = i[n];
              if (F(s)) t.addValue(n, s);
              else if (F(r)) t.addValue(n, t4(s, { owner: t }));
              else if (r !== s)
                if (t.hasValue(n)) {
                  let e = t.getValue(n);
                  !0 === e.liveStyle ? e.jump(s) : e.hasAnimated || e.set(s);
                } else {
                  let e = t.getStaticValue(n);
                  t.addValue(n, t4(void 0 !== e ? e : s, { owner: t }));
                }
            }
            for (let n in i) void 0 === e[n] && t.removeValue(n);
            return e;
          })(
            this,
            this.scrapeMotionValuesFromProps(t, this.prevProps, this),
            this.prevMotionValues,
          )),
            this.handleChildMotionValue && this.handleChildMotionValue());
        }
        getProps() {
          return this.props;
        }
        getVariant(t) {
          return this.props.variants ? this.props.variants[t] : void 0;
        }
        getDefaultTransition() {
          return this.props.transition;
        }
        getTransformPagePoint() {
          return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
          return this.isVariantNode
            ? this
            : this.parent
              ? this.parent.getClosestVariantNode()
              : void 0;
        }
        addVariantChild(t) {
          let e = this.getClosestVariantNode();
          if (e)
            return (
              e.variantChildren && e.variantChildren.add(t),
              () => e.variantChildren.delete(t)
            );
        }
        addValue(t, e) {
          let i = this.values.get(t);
          e !== i &&
            (i && this.removeValue(t),
            this.bindToMotionValue(t, e),
            this.values.set(t, e),
            (this.latestValues[t] = e.get()));
        }
        removeValue(t) {
          this.values.delete(t);
          let e = this.valueSubscriptions.get(t);
          (e && (e(), this.valueSubscriptions.delete(t)),
            delete this.latestValues[t],
            this.removeValueFromRenderState(t, this.renderState));
        }
        hasValue(t) {
          return this.values.has(t);
        }
        getValue(t, e) {
          if (this.props.values && this.props.values[t]) return this.props.values[t];
          let i = this.values.get(t);
          return (
            void 0 === i &&
              void 0 !== e &&
              ((i = t4(null === e ? void 0 : e, { owner: this })), this.addValue(t, i)),
            i
          );
        }
        readValue(t, e) {
          var i;
          let n =
            void 0 === this.latestValues[t] && this.current
              ? null != (i = this.getBaseTargetFromProps(this.props, t))
                ? i
                : this.readValueFromInstance(this.current, t, this.options)
              : this.latestValues[t];
          if (null != n) {
            if ("string" == typeof n && (J(n) || tw(n))) n = parseFloat(n);
            else {
              let i;
              ((i = n), !t9.find(q(i)) && tN.test(e) && (n = tG(t, e)));
            }
            this.setBaseTarget(t, F(n) ? n.get() : n);
          }
          return F(n) ? n.get() : n;
        }
        setBaseTarget(t, e) {
          this.baseTarget[t] = e;
        }
        getBaseTarget(t) {
          let e,
            { initial: i } = this.props;
          if ("string" == typeof i || "object" == typeof i) {
            var n;
            let s = ef(this.props, i, null == (n = this.presenceContext) ? void 0 : n.custom);
            s && (e = s[t]);
          }
          if (i && void 0 !== e) return e;
          let s = this.getBaseTargetFromProps(this.props, t);
          return void 0 === s || F(s)
            ? void 0 !== this.initialValues[t] && void 0 === e
              ? void 0
              : this.baseTarget[t]
            : s;
        }
        on(t, e) {
          return (this.events[t] || (this.events[t] = new t0()), this.events[t].add(e));
        }
        notify(t) {
          for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
            i[n - 1] = arguments[n];
          this.events[t] && this.events[t].notify(...i);
        }
        scheduleRenderMicrotask() {
          t6.render(this.render);
        }
        constructor(
          {
            parent: t,
            props: e,
            presenceContext: i,
            reducedMotionConfig: n,
            blockInitialAnimation: s,
            visualState: r,
          },
          o = {},
        ) {
          ((this.current = null),
            (this.children = new Set()),
            (this.isVariantNode = !1),
            (this.isControllingVariants = !1),
            (this.shouldReduceMotion = null),
            (this.values = new Map()),
            (this.KeyframeResolver = tT),
            (this.features = {}),
            (this.valueSubscriptions = new Map()),
            (this.prevMotionValues = {}),
            (this.events = {}),
            (this.propEventSubscriptions = {}),
            (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
            (this.render = () => {
              this.current &&
                (this.triggerBuild(),
                this.renderInstance(
                  this.current,
                  this.renderState,
                  this.props.style,
                  this.projection,
                ));
            }),
            (this.renderScheduledAt = 0),
            (this.scheduleRender = () => {
              let t = t2.now();
              this.renderScheduledAt < t &&
                ((this.renderScheduledAt = t), tu.render(this.render, !1, !0));
            }));
          let { latestValues: a, renderState: l } = r;
          ((this.latestValues = a),
            (this.baseTarget = { ...a }),
            (this.initialValues = e.initial ? { ...a } : {}),
            (this.renderState = l),
            (this.parent = t),
            (this.props = e),
            (this.presenceContext = i),
            (this.depth = t ? t.depth + 1 : 0),
            (this.reducedMotionConfig = n),
            (this.options = o),
            (this.blockInitialAnimation = !!s),
            (this.isControllingVariants = ec(e)),
            (this.isVariantNode = ep(e)),
            this.isVariantNode && (this.variantChildren = new Set()),
            (this.manuallyAnimateOnMount = !!(t && t.current)));
          let { willChange: h, ...u } = this.scrapeMotionValuesFromProps(e, {}, this);
          for (let t in u) {
            let e = u[t];
            void 0 !== a[t] && F(e) && e.set(a[t]);
          }
        }
      }
      class ey extends eg {
        sortInstanceNodePosition(t, e) {
          return 2 & t.compareDocumentPosition(e) ? 1 : -1;
        }
        getBaseTargetFromProps(t, e) {
          return t.style ? t.style[e] : void 0;
        }
        removeValueFromRenderState(t, e) {
          let { vars: i, style: n } = e;
          (delete i[t], delete n[t]);
        }
        handleChildMotionValue() {
          this.childSubscription && (this.childSubscription(), delete this.childSubscription);
          let { children: t } = this.props;
          F(t) &&
            (this.childSubscription = t.on("change", (t) => {
              this.current && (this.current.textContent = "".concat(t));
            }));
        }
        constructor() {
          (super(...arguments), (this.KeyframeResolver = tZ));
        }
      }
      let ex = (t, e) => (e && "number" == typeof t ? e.transform(t) : t),
        eT = {
          x: "translateX",
          y: "translateY",
          z: "translateZ",
          transformPerspective: "perspective",
        },
        ew = r.length;
      function eP(t, e, i) {
        let { style: n, vars: s, transformOrigin: a } = t,
          l = !1,
          h = !1;
        for (let t in e) {
          let i = e[t];
          if (o.has(t)) {
            l = !0;
            continue;
          }
          if (y(t)) {
            s[t] = i;
            continue;
          }
          {
            let e = ex(i, tK[t]);
            t.startsWith("origin") ? ((h = !0), (a[t] = e)) : (n[t] = e);
          }
        }
        if (
          (!e.transform &&
            (l || i
              ? (n.transform = (function (t, e, i) {
                  let n = "",
                    s = !0;
                  for (let o = 0; o < ew; o++) {
                    let a = r[o],
                      l = t[a];
                    if (void 0 === l) continue;
                    let h = !0;
                    if (
                      !(h =
                        "number" == typeof l
                          ? l === +!!a.startsWith("scale")
                          : 0 === parseFloat(l)) ||
                      i
                    ) {
                      let t = ex(l, tK[a]);
                      if (!h) {
                        s = !1;
                        let e = eT[a] || a;
                        n += "".concat(e, "(").concat(t, ") ");
                      }
                      i && (e[a] = t);
                    }
                  }
                  return ((n = n.trim()), i ? (n = i(e, s ? "" : n)) : s && (n = "none"), n);
                })(e, t.transform, i))
              : n.transform && (n.transform = "none")),
          h)
        ) {
          let { originX: t = "50%", originY: e = "50%", originZ: i = 0 } = a;
          n.transformOrigin = "".concat(t, " ").concat(e, " ").concat(i);
        }
      }
      function eb(t, e, i, n) {
        let s,
          { style: r, vars: o } = e,
          a = t.style;
        for (s in r) a[s] = r[s];
        for (s in (null == n || n.applyProjectionStyles(a, i), o)) a.setProperty(s, o[s]);
      }
      function eS(t, e) {
        return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
      }
      let eA = {
          correct: (t, e) => {
            if (!e.target) return t;
            if ("string" == typeof t)
              if (!H.test(t)) return t;
              else t = parseFloat(t);
            let i = eS(t, e.target.x),
              n = eS(t, e.target.y);
            return "".concat(i, "% ").concat(n, "%");
          },
        },
        eM = {
          borderRadius: {
            ...eA,
            applyTo: [
              "borderTopLeftRadius",
              "borderTopRightRadius",
              "borderBottomLeftRadius",
              "borderBottomRightRadius",
            ],
          },
          borderTopLeftRadius: eA,
          borderTopRightRadius: eA,
          borderBottomLeftRadius: eA,
          borderBottomRightRadius: eA,
          boxShadow: {
            correct: (t, e) => {
              let { treeScale: i, projectionDelta: n } = e,
                s = tN.parse(t);
              if (s.length > 5) return t;
              let r = tN.createTransformer(t),
                o = +("number" != typeof s[0]),
                a = n.x.scale * i.x,
                l = n.y.scale * i.y;
              ((s[0 + o] /= a), (s[1 + o] /= l));
              let h = b(a, l, 0.5);
              return (
                "number" == typeof s[2 + o] && (s[2 + o] /= h),
                "number" == typeof s[3 + o] && (s[3 + o] /= h),
                r(s)
              );
            },
          },
        };
      function eV(t, e) {
        let { layout: i, layoutId: n } = e;
        return (
          o.has(t) ||
          t.startsWith("origin") ||
          ((i || void 0 !== n) && (!!eM[t] || "opacity" === t))
        );
      }
      function eE(t, e, i) {
        let { style: n } = t,
          s = {};
        for (let o in n) {
          var r;
          (F(n[o]) ||
            (e.style && F(e.style[o])) ||
            eV(o, t) ||
            (null == i || null == (r = i.getValue(o)) ? void 0 : r.liveStyle) !== void 0) &&
            (s[o] = n[o]);
        }
        return s;
      }
      class eC extends ey {
        readValueFromInstance(t, e) {
          var i;
          if (o.has(e))
            return (null == (i = this.projection) ? void 0 : i.isProjecting)
              ? m(e)
              : ((t, e) => {
                  let { transform: i = "none" } = getComputedStyle(t);
                  return f(i, e);
                })(t, e);
          {
            let i = window.getComputedStyle(t),
              n = (y(e) ? i.getPropertyValue(e) : i[e]) || 0;
            return "string" == typeof n ? n.trim() : n;
          }
        }
        measureInstanceViewportBox(t, e) {
          let { transformPagePoint: i } = e;
          return j(t, i);
        }
        build(t, e, i) {
          eP(t, e, i.transformTemplate);
        }
        scrapeMotionValuesFromProps(t, e, i) {
          return eE(t, e, i);
        }
        constructor() {
          (super(...arguments), (this.type = "html"), (this.renderInstance = eb));
        }
      }
      let eD = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
        ek = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
        eR = { offset: "strokeDashoffset", array: "strokeDasharray" };
      function eL(t, e, i, n, s) {
        var r, o;
        let {
          attrX: a,
          attrY: l,
          attrScale: h,
          pathLength: u,
          pathSpacing: d = 1,
          pathOffset: c = 0,
          ...p
        } = e;
        if ((eP(t, p, n), i)) {
          t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
          return;
        }
        ((t.attrs = t.style), (t.style = {}));
        let { attrs: m, style: f } = t;
        (m.transform && ((f.transform = m.transform), delete m.transform),
          (f.transform || m.transformOrigin) &&
            ((f.transformOrigin = null != (r = m.transformOrigin) ? r : "50% 50%"),
            delete m.transformOrigin),
          f.transform &&
            ((f.transformBox = null != (o = null == s ? void 0 : s.transformBox) ? o : "fill-box"),
            delete m.transformBox),
          void 0 !== a && (m.x = a),
          void 0 !== l && (m.y = l),
          void 0 !== h && (m.scale = h),
          void 0 !== u &&
            (function (t, e) {
              let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                s = !(arguments.length > 4) || void 0 === arguments[4] || arguments[4];
              t.pathLength = 1;
              let r = s ? ek : eR;
              t[r.offset] = H.transform(-n);
              let o = H.transform(e),
                a = H.transform(i);
              t[r.array] = "".concat(o, " ").concat(a);
            })(m, u, d, c, !1));
      }
      let ej = new Set([
          "baseFrequency",
          "diffuseConstant",
          "kernelMatrix",
          "kernelUnitLength",
          "keySplines",
          "keyTimes",
          "limitingConeAngle",
          "markerHeight",
          "markerWidth",
          "numOctaves",
          "targetX",
          "targetY",
          "surfaceScale",
          "specularConstant",
          "specularExponent",
          "stdDeviation",
          "tableValues",
          "viewBox",
          "gradientTransform",
          "pathLength",
          "startOffset",
          "textLength",
          "lengthAdjust",
        ]),
        eF = (t) => "string" == typeof t && "svg" === t.toLowerCase();
      function eB(t, e, i) {
        let n = eE(t, e, i);
        for (let i in t)
          (F(t[i]) || F(e[i])) &&
            (n[-1 !== r.indexOf(i) ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i] =
              t[i]);
        return n;
      }
      class eO extends ey {
        getBaseTargetFromProps(t, e) {
          return t[e];
        }
        readValueFromInstance(t, e) {
          if (o.has(e)) {
            let t = tq(e);
            return (t && t.default) || 0;
          }
          return ((e = ej.has(e) ? e : eD(e)), t.getAttribute(e));
        }
        scrapeMotionValuesFromProps(t, e, i) {
          return eB(t, e, i);
        }
        build(t, e, i) {
          eL(t, e, this.isSVGTag, i.transformTemplate, i.style);
        }
        renderInstance(t, e, i, n) {
          for (let i in (eb(t, e, void 0, n), e.attrs))
            t.setAttribute(ej.has(i) ? i : eD(i), e.attrs[i]);
        }
        mount(t) {
          ((this.isSVGTag = eF(t.tagName)), super.mount(t));
        }
        constructor() {
          (super(...arguments),
            (this.type = "svg"),
            (this.isSVGTag = !1),
            (this.measureInstanceViewportBox = en));
        }
      }
      let eI = [
        "animate",
        "circle",
        "defs",
        "desc",
        "ellipse",
        "g",
        "image",
        "line",
        "filter",
        "marker",
        "mask",
        "metadata",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "rect",
        "stop",
        "switch",
        "symbol",
        "svg",
        "text",
        "tspan",
        "use",
        "view",
      ];
      function eU(t) {
        if ("string" != typeof t || t.includes("-"));
        else if (eI.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
        return !1;
      }
      var eN = i(95155),
        eW = i(60296);
      let eY = (0, s.createContext)({ strict: !1 });
      var ez = i(53127);
      let eH = (0, s.createContext)({});
      function eX(t) {
        return Array.isArray(t) ? t.join(" ") : t;
      }
      let eK = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
      function e$(t, e, i) {
        for (let n in e) F(e[n]) || eV(n, i) || (t[n] = e[n]);
      }
      let eq = () => ({ ...eK(), attrs: {} }),
        eG = new Set([
          "animate",
          "exit",
          "variants",
          "initial",
          "style",
          "values",
          "variants",
          "transition",
          "transformTemplate",
          "custom",
          "inherit",
          "onBeforeLayoutMeasure",
          "onAnimationStart",
          "onAnimationComplete",
          "onUpdate",
          "onDragStart",
          "onDrag",
          "onDragEnd",
          "onMeasureDragConstraints",
          "onDirectionLock",
          "onDragTransitionEnd",
          "_dragX",
          "_dragY",
          "onHoverStart",
          "onHoverEnd",
          "onViewportEnter",
          "onViewportLeave",
          "globalTapTarget",
          "ignoreStrict",
          "viewport",
        ]);
      function e_(t) {
        return (
          t.startsWith("while") ||
          (t.startsWith("drag") && "draggable" !== t) ||
          t.startsWith("layout") ||
          t.startsWith("onTap") ||
          t.startsWith("onPan") ||
          t.startsWith("onLayout") ||
          eG.has(t)
        );
      }
      let eZ = (t) => !e_(t);
      try {
        !(function (t) {
          "function" == typeof t && (eZ = (e) => (e.startsWith("on") ? !e_(e) : t(e)));
        })(require("@emotion/is-prop-valid").default);
      } catch (t) {}
      var eQ = i(59686),
        eJ = i(94416);
      function e0(t) {
        return F(t) ? t.get() : t;
      }
      let e1 = (t) => (e, i) => {
          let n = (0, s.useContext)(eH),
            r = (0, s.useContext)(eQ.t),
            o = () =>
              (function (t, e, i, n) {
                let { scrapeMotionValuesFromProps: s, createRenderState: r } = t;
                return {
                  latestValues: (function (t, e, i, n) {
                    let s = {},
                      r = n(t, {});
                    for (let t in r) s[t] = e0(r[t]);
                    let { initial: o, animate: a } = t,
                      l = ec(t),
                      h = ep(t);
                    e &&
                      h &&
                      !l &&
                      !1 !== t.inherit &&
                      (void 0 === o && (o = e.initial), void 0 === a && (a = e.animate));
                    let u = !!i && !1 === i.initial,
                      d = (u = u || !1 === o) ? a : o;
                    if (d && "boolean" != typeof d && !el(d)) {
                      let e = Array.isArray(d) ? d : [d];
                      for (let i = 0; i < e.length; i++) {
                        let n = ef(t, e[i]);
                        if (n) {
                          let { transitionEnd: t, transition: e, ...i } = n;
                          for (let t in i) {
                            let e = i[t];
                            if (Array.isArray(e)) {
                              let t = u ? e.length - 1 : 0;
                              e = e[t];
                            }
                            null !== e && (s[t] = e);
                          }
                          for (let e in t) s[e] = t[e];
                        }
                      }
                    }
                    return s;
                  })(e, i, n, s),
                  renderState: r(),
                };
              })(t, e, n, r);
          return i ? o() : (0, eJ.M)(o);
        },
        e2 = e1({ scrapeMotionValuesFromProps: eE, createRenderState: eK }),
        e3 = e1({ scrapeMotionValuesFromProps: eB, createRenderState: eq }),
        e5 = Symbol.for("motionComponentSymbol");
      function e4(t) {
        return t && "object" == typeof t && Object.prototype.hasOwnProperty.call(t, "current");
      }
      let e9 = "data-" + eD("framerAppearId"),
        e6 = (0, s.createContext)({});
      var e7 = i(86553);
      function e8(t) {
        var e, i;
        let { forwardMotionProps: n = !1 } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = arguments.length > 2 ? arguments[2] : void 0,
          o = arguments.length > 3 ? arguments[3] : void 0;
        r &&
          (function (t) {
            for (let e in t) t8[e] = { ...t8[e], ...t[e] };
          })(r);
        let a = eU(t) ? e3 : e2;
        function l(e, i) {
          var r;
          let l,
            h = {
              ...(0, s.useContext)(ez.Q),
              ...e,
              layoutId: (function (t) {
                let { layoutId: e } = t,
                  i = (0, s.useContext)(eW.L).id;
                return i && void 0 !== e ? i + "-" + e : e;
              })(e),
            },
            { isStatic: u } = h,
            d = (function (t) {
              let { initial: e, animate: i } = (function (t, e) {
                if (ec(t)) {
                  let { initial: e, animate: i } = t;
                  return { initial: !1 === e || eh(e) ? e : void 0, animate: eh(i) ? i : void 0 };
                }
                return !1 !== t.inherit ? e : {};
              })(t, (0, s.useContext)(eH));
              return (0, s.useMemo)(() => ({ initial: e, animate: i }), [eX(e), eX(i)]);
            })(e),
            c = a(e, u);
          if (!u && es.B) {
            (0, s.useContext)(eY).strict;
            let e = (function (t) {
              let { drag: e, layout: i } = t8;
              if (!e && !i) return {};
              let n = { ...e, ...i };
              return {
                MeasureLayout:
                  (null == e ? void 0 : e.isEnabled(t)) || (null == i ? void 0 : i.isEnabled(t))
                    ? n.MeasureLayout
                    : void 0,
                ProjectionNode: n.ProjectionNode,
              };
            })(h);
            ((l = e.MeasureLayout),
              (d.visualElement = (function (t, e, i, n, r) {
                var o, a, l, h;
                let { visualElement: u } = (0, s.useContext)(eH),
                  d = (0, s.useContext)(eY),
                  c = (0, s.useContext)(eQ.t),
                  p = (0, s.useContext)(ez.Q).reducedMotion,
                  m = (0, s.useRef)(null);
                ((n = n || d.renderer),
                  !m.current &&
                    n &&
                    (m.current = n(t, {
                      visualState: e,
                      parent: u,
                      props: i,
                      presenceContext: c,
                      blockInitialAnimation: !!c && !1 === c.initial,
                      reducedMotionConfig: p,
                    })));
                let f = m.current,
                  v = (0, s.useContext)(e6);
                f &&
                  !f.projection &&
                  r &&
                  ("html" === f.type || "svg" === f.type) &&
                  (function (t, e, i, n) {
                    let {
                      layoutId: s,
                      layout: r,
                      drag: o,
                      dragConstraints: a,
                      layoutScroll: l,
                      layoutRoot: h,
                      layoutCrossfade: u,
                    } = e;
                    ((t.projection = new i(
                      t.latestValues,
                      e["data-framer-portal-id"]
                        ? void 0
                        : (function t(e) {
                            if (e)
                              return !1 !== e.options.allowProjection ? e.projection : t(e.parent);
                          })(t.parent),
                    )),
                      t.projection.setOptions({
                        layoutId: s,
                        layout: r,
                        alwaysMeasureLayout: !!o || (a && e4(a)),
                        visualElement: t,
                        animationType: "string" == typeof r ? r : "both",
                        initialPromotionConfig: n,
                        crossfade: u,
                        layoutScroll: l,
                        layoutRoot: h,
                      }));
                  })(m.current, i, r, v);
                let g = (0, s.useRef)(!1);
                (0, s.useInsertionEffect)(() => {
                  f && g.current && f.update(i, c);
                });
                let y = i[e9],
                  x = (0, s.useRef)(
                    !!y &&
                      !(null == (o = (a = window).MotionHandoffIsComplete)
                        ? void 0
                        : o.call(a, y)) &&
                      (null == (l = (h = window).MotionHasOptimisedAnimation)
                        ? void 0
                        : l.call(h, y)),
                  );
                return (
                  (0, e7.E)(() => {
                    f &&
                      ((g.current = !0),
                      (window.MotionIsMounted = !0),
                      f.updateFeatures(),
                      f.scheduleRenderMicrotask(),
                      x.current && f.animationState && f.animationState.animateChanges());
                  }),
                  (0, s.useEffect)(() => {
                    f &&
                      (!x.current && f.animationState && f.animationState.animateChanges(),
                      x.current &&
                        (queueMicrotask(() => {
                          var t, e;
                          null == (t = (e = window).MotionHandoffMarkAsComplete) || t.call(e, y);
                        }),
                        (x.current = !1)),
                      (f.enteringChildren = void 0));
                  }),
                  f
                );
              })(t, c, h, o, e.ProjectionNode)));
          }
          return (0, eN.jsxs)(eH.Provider, {
            value: d,
            children: [
              l && d.visualElement
                ? (0, eN.jsx)(l, { visualElement: d.visualElement, ...h })
                : null,
              (function (t, e, i, n, r) {
                let { latestValues: o } = n,
                  a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
                  l = (
                    eU(t)
                      ? function (t, e, i, n) {
                          let r = (0, s.useMemo)(() => {
                            let i = eq();
                            return (
                              eL(i, e, eF(n), t.transformTemplate, t.style),
                              { ...i.attrs, style: { ...i.style } }
                            );
                          }, [e]);
                          if (t.style) {
                            let e = {};
                            (e$(e, t.style, t), (r.style = { ...e, ...r.style }));
                          }
                          return r;
                        }
                      : function (t, e) {
                          let i = {},
                            n = (function (t, e) {
                              let i = t.style || {},
                                n = {};
                              return (
                                e$(n, i, t),
                                Object.assign(
                                  n,
                                  (function (t, e) {
                                    let { transformTemplate: i } = t;
                                    return (0, s.useMemo)(() => {
                                      let t = eK();
                                      return (eP(t, e, i), Object.assign({}, t.vars, t.style));
                                    }, [e]);
                                  })(t, e),
                                ),
                                n
                              );
                            })(t, e);
                          return (
                            t.drag &&
                              !1 !== t.dragListener &&
                              ((i.draggable = !1),
                              (n.userSelect = n.WebkitUserSelect = n.WebkitTouchCallout = "none"),
                              (n.touchAction =
                                !0 === t.drag
                                  ? "none"
                                  : "pan-".concat("x" === t.drag ? "y" : "x"))),
                            void 0 === t.tabIndex &&
                              (t.onTap || t.onTapStart || t.whileTap) &&
                              (i.tabIndex = 0),
                            (i.style = n),
                            i
                          );
                        }
                  )(e, o, r, t),
                  h = (function (t, e, i) {
                    let n = {};
                    for (let s in t)
                      ("values" !== s || "object" != typeof t.values) &&
                        (eZ(s) ||
                          (!0 === i && e_(s)) ||
                          (!e && !e_(s)) ||
                          (t.draggable && s.startsWith("onDrag"))) &&
                        (n[s] = t[s]);
                    return n;
                  })(e, "string" == typeof t, a),
                  u = t !== s.Fragment ? { ...h, ...l, ref: i } : {},
                  { children: d } = e,
                  c = (0, s.useMemo)(() => (F(d) ? d.get() : d), [d]);
                return (0, s.createElement)(t, { ...u, children: c });
              })(
                t,
                e,
                ((r = d.visualElement),
                (0, s.useCallback)(
                  (t) => {
                    (t && c.onMount && c.onMount(t),
                      r && (t ? r.mount(t) : r.unmount()),
                      i && ("function" == typeof i ? i(t) : e4(i) && (i.current = t)));
                  },
                  [r],
                )),
                c,
                u,
                n,
              ),
            ],
          });
        }
        l.displayName = "motion.".concat(
          "string" == typeof t
            ? t
            : "create(".concat(
                null != (i = null != (e = t.displayName) ? e : t.name) ? i : "",
                ")",
              ),
        );
        let h = (0, s.forwardRef)(l);
        return ((h[e5] = t), h);
      }
      function it(t, e, i) {
        let n = t.getProps();
        return ef(n, e, void 0 !== i ? i : n.custom, t);
      }
      function ie(t, e) {
        return t?.[e] ?? t?.default ?? t;
      }
      let ii = (t) => Array.isArray(t);
      function is(t, e) {
        let i = t.getValue("willChange");
        if (F(i) && i.add) return i.add(e);
        if (!i && to.WillChange) {
          let i = new to.WillChange("auto");
          (t.addValue("willChange", i), i.add(e));
        }
      }
      function ir(t) {
        ((t.duration = 0), (t.type = "keyframes"));
      }
      let io = (t, e) => (i) => e(t(i)),
        ia = (...t) => t.reduce(io),
        il = (t) => 1e3 * t,
        ih = { layout: 0, mainThread: 0, waapi: 0 };
      function iu(t, e, i) {
        return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
          ? t + (e - t) * 6 * i
          : i < 0.5
            ? e
            : i < 2 / 3
              ? t + (e - t) * (2 / 3 - i) * 6
              : t;
      }
      function id(t, e) {
        return (i) => (i > 0 ? e : t);
      }
      let ic = (t, e, i) => {
          let n = t * t,
            s = i * (e * e - n) + n;
          return s < 0 ? 0 : Math.sqrt(s);
        },
        ip = [tC, tE, tD];
      function im(t) {
        let e = ip.find((e) => e.test(t));
        if (
          (Z(
            !!e,
            `'${t}' is not an animatable color. Use the equivalent color code instead.`,
            "color-not-animatable",
          ),
          !e)
        )
          return !1;
        let i = e.parse(t);
        return (
          e === tD &&
            (i = (function ({ hue: t, saturation: e, lightness: i, alpha: n }) {
              ((t /= 360), (i /= 100));
              let s = 0,
                r = 0,
                o = 0;
              if ((e /= 100)) {
                let n = i < 0.5 ? i * (1 + e) : i + e - i * e,
                  a = 2 * i - n;
                ((s = iu(a, n, t + 1 / 3)), (r = iu(a, n, t)), (o = iu(a, n, t - 1 / 3)));
              } else s = r = o = i;
              return {
                red: Math.round(255 * s),
                green: Math.round(255 * r),
                blue: Math.round(255 * o),
                alpha: n,
              };
            })(i)),
          i
        );
      }
      let iv = (t, e) => {
          let i = im(t),
            n = im(e);
          if (!i || !n) return id(t, e);
          let s = { ...i };
          return (t) => (
            (s.red = ic(i.red, n.red, t)),
            (s.green = ic(i.green, n.green, t)),
            (s.blue = ic(i.blue, n.blue, t)),
            (s.alpha = b(i.alpha, n.alpha, t)),
            tE.transform(s)
          );
        },
        ig = new Set(["none", "hidden"]);
      function iy(t, e) {
        return (i) => b(t, e, i);
      }
      function ix(t) {
        return "number" == typeof t
          ? iy
          : "string" == typeof t
            ? T(t)
              ? id
              : tk.test(t)
                ? iv
                : iP
            : Array.isArray(t)
              ? iT
              : "object" == typeof t
                ? tk.test(t)
                  ? iv
                  : iw
                : id;
      }
      function iT(t, e) {
        let i = [...t],
          n = i.length,
          s = t.map((t, i) => ix(t)(t, e[i]));
        return (t) => {
          for (let e = 0; e < n; e++) i[e] = s[e](t);
          return i;
        };
      }
      function iw(t, e) {
        let i = { ...t, ...e },
          n = {};
        for (let s in i) void 0 !== t[s] && void 0 !== e[s] && (n[s] = ix(t[s])(t[s], e[s]));
        return (t) => {
          for (let e in n) i[e] = n[e](t);
          return i;
        };
      }
      let iP = (t, e) => {
        let i = tN.createTransformer(e),
          n = tB(t),
          s = tB(e);
        return n.indexes.var.length === s.indexes.var.length &&
          n.indexes.color.length === s.indexes.color.length &&
          n.indexes.number.length >= s.indexes.number.length
          ? (ig.has(t) && !s.values.length) || (ig.has(e) && !n.values.length)
            ? (function (t, e) {
                return ig.has(t) ? (i) => (i <= 0 ? t : e) : (i) => (i >= 1 ? e : t);
              })(t, e)
            : ia(
                iT(
                  (function (t, e) {
                    let i = [],
                      n = { color: 0, var: 0, number: 0 };
                    for (let s = 0; s < e.values.length; s++) {
                      let r = e.types[s],
                        o = t.indexes[r][n[r]],
                        a = t.values[o] ?? 0;
                      ((i[s] = a), n[r]++);
                    }
                    return i;
                  })(n, s),
                  s.values,
                ),
                i,
              )
          : (Z(
              !0,
              `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
              "complex-values-different",
            ),
            id(t, e));
      };
      function ib(t, e, i) {
        return "number" == typeof t && "number" == typeof e && "number" == typeof i
          ? b(t, e, i)
          : ix(t)(t, e);
      }
      let iS = (t) => {
          let e = ({ timestamp: e }) => t(e);
          return {
            start: (t = !0) => tu.update(e, t),
            stop: () => td(e),
            now: () => (tc.isProcessing ? tc.timestamp : t2.now()),
          };
        },
        iA = (t, e, i = 10) => {
          let n = "",
            s = Math.max(Math.round(e / i), 2);
          for (let e = 0; e < s; e++) n += Math.round(1e4 * t(e / (s - 1))) / 1e4 + ", ";
          return `linear(${n.substring(0, n.length - 2)})`;
        };
      function iM(t) {
        let e = 0,
          i = t.next(e);
        for (; !i.done && e < 2e4;) ((e += 50), (i = t.next(e)));
        return e >= 2e4 ? 1 / 0 : e;
      }
      function iV(t, e, i) {
        var n, s;
        let r = Math.max(e - 5, 0);
        return ((n = i - t(r)), (s = e - r) ? (1e3 / s) * n : 0);
      }
      let iE = {
        stiffness: 100,
        damping: 10,
        mass: 1,
        velocity: 0,
        duration: 800,
        bounce: 0.3,
        visualDuration: 0.3,
        restSpeed: { granular: 0.01, default: 2 },
        restDelta: { granular: 0.005, default: 0.5 },
        minDuration: 0.01,
        maxDuration: 10,
        minDamping: 0.05,
        maxDamping: 1,
      };
      function iC(t, e) {
        return t * Math.sqrt(1 - e * e);
      }
      let iD = ["duration", "bounce"],
        ik = ["stiffness", "damping", "mass"];
      function iR(t, e) {
        return e.some((e) => void 0 !== t[e]);
      }
      function iL(t = iE.visualDuration, e = iE.bounce) {
        let i,
          n = "object" != typeof t ? { visualDuration: t, keyframes: [0, 1], bounce: e } : t,
          { restSpeed: s, restDelta: r } = n,
          o = n.keyframes[0],
          a = n.keyframes[n.keyframes.length - 1],
          l = { done: !1, value: o },
          {
            stiffness: h,
            damping: u,
            mass: d,
            duration: c,
            velocity: p,
            isResolvedFromDuration: m,
          } = (function (t) {
            let e = {
              velocity: iE.velocity,
              stiffness: iE.stiffness,
              damping: iE.damping,
              mass: iE.mass,
              isResolvedFromDuration: !1,
              ...t,
            };
            if (!iR(t, ik) && iR(t, iD))
              if (t.visualDuration) {
                let i = (2 * Math.PI) / (1.2 * t.visualDuration),
                  n = i * i,
                  s = 2 * O(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(n);
                e = { ...e, mass: iE.mass, stiffness: n, damping: s };
              } else {
                let i = (function ({
                  duration: t = iE.duration,
                  bounce: e = iE.bounce,
                  velocity: i = iE.velocity,
                  mass: n = iE.mass,
                }) {
                  let s, r;
                  Z(
                    t <= il(iE.maxDuration),
                    "Spring duration must be 10 seconds or less",
                    "spring-duration-limit",
                  );
                  let o = 1 - e;
                  ((o = O(iE.minDamping, iE.maxDamping, o)),
                    (t = O(iE.minDuration, iE.maxDuration, t / 1e3)),
                    o < 1
                      ? ((s = (e) => {
                          let n = e * o,
                            s = n * t;
                          return 0.001 - ((n - i) / iC(e, o)) * Math.exp(-s);
                        }),
                        (r = (e) => {
                          let n = e * o * t,
                            r = Math.pow(o, 2) * Math.pow(e, 2) * t,
                            a = Math.exp(-n),
                            l = iC(Math.pow(e, 2), o);
                          return ((n * i + i - r) * a * (-s(e) + 0.001 > 0 ? -1 : 1)) / l;
                        }))
                      : ((s = (e) => -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                        (r = (e) => t * t * (i - e) * Math.exp(-e * t))));
                  let a = (function (t, e, i) {
                    let n = i;
                    for (let i = 1; i < 12; i++) n -= t(n) / e(n);
                    return n;
                  })(s, r, 5 / t);
                  if (((t = il(t)), isNaN(a)))
                    return { stiffness: iE.stiffness, damping: iE.damping, duration: t };
                  {
                    let e = Math.pow(a, 2) * n;
                    return { stiffness: e, damping: 2 * o * Math.sqrt(n * e), duration: t };
                  }
                })(t);
                (e = { ...e, ...i, mass: iE.mass }).isResolvedFromDuration = !0;
              }
            return e;
          })({ ...n, velocity: -((n.velocity || 0) / 1e3) }),
          f = p || 0,
          v = u / (2 * Math.sqrt(h * d)),
          g = a - o,
          y = Math.sqrt(h / d) / 1e3,
          x = 5 > Math.abs(g);
        if (
          (s || (s = x ? iE.restSpeed.granular : iE.restSpeed.default),
          r || (r = x ? iE.restDelta.granular : iE.restDelta.default),
          v < 1)
        ) {
          let t = iC(y, v);
          i = (e) =>
            a -
            Math.exp(-v * y * e) * (((f + v * y * g) / t) * Math.sin(t * e) + g * Math.cos(t * e));
        } else if (1 === v) i = (t) => a - Math.exp(-y * t) * (g + (f + y * g) * t);
        else {
          let t = y * Math.sqrt(v * v - 1);
          i = (e) => {
            let i = Math.exp(-v * y * e),
              n = Math.min(t * e, 300);
            return a - (i * ((f + v * y * g) * Math.sinh(n) + t * g * Math.cosh(n))) / t;
          };
        }
        let T = {
          calculatedDuration: (m && c) || null,
          next: (t) => {
            let e = i(t);
            if (m) l.done = t >= c;
            else {
              let n = 0 === t ? f : 0;
              v < 1 && (n = 0 === t ? il(f) : iV(i, t, e));
              let o = Math.abs(a - e) <= r;
              l.done = Math.abs(n) <= s && o;
            }
            return ((l.value = l.done ? a : e), l);
          },
          toString: () => {
            let t = Math.min(iM(T), 2e4),
              e = iA((e) => T.next(t * e).value, t, 30);
            return t + "ms " + e;
          },
          toTransition: () => {},
        };
        return T;
      }
      function ij({
        keyframes: t,
        velocity: e = 0,
        power: i = 0.8,
        timeConstant: n = 325,
        bounceDamping: s = 10,
        bounceStiffness: r = 500,
        modifyTarget: o,
        min: a,
        max: l,
        restDelta: h = 0.5,
        restSpeed: u,
      }) {
        let d,
          c,
          p = t[0],
          m = { done: !1, value: p },
          f = i * e,
          v = p + f,
          g = void 0 === o ? v : o(v);
        g !== v && (f = g - p);
        let y = (t) => -f * Math.exp(-t / n),
          x = (t) => g + y(t),
          T = (t) => {
            let e = y(t),
              i = x(t);
            ((m.done = Math.abs(e) <= h), (m.value = m.done ? g : i));
          },
          w = (t) => {
            let e;
            if (((e = m.value), (void 0 !== a && e < a) || (void 0 !== l && e > l))) {
              var i;
              ((d = t),
                (c = iL({
                  keyframes: [
                    m.value,
                    ((i = m.value),
                    void 0 === a ? l : void 0 === l || Math.abs(a - i) < Math.abs(l - i) ? a : l),
                  ],
                  velocity: iV(x, t, m.value),
                  damping: s,
                  stiffness: r,
                  restDelta: h,
                  restSpeed: u,
                })));
            }
          };
        return (
          w(0),
          {
            calculatedDuration: null,
            next: (t) => {
              let e = !1;
              return (c || void 0 !== d || ((e = !0), T(t), w(t)), void 0 !== d && t >= d)
                ? c.next(t - d)
                : (e || T(t), m);
            },
          }
        );
      }
      iL.applyToOptions = (t) => {
        let e = (function (t, e = 100, i) {
          let n = i({ ...t, keyframes: [0, e] }),
            s = Math.min(iM(n), 2e4);
          return { type: "keyframes", ease: (t) => n.next(s * t).value / e, duration: s / 1e3 };
        })(t, 100, iL);
        return ((t.ease = e.ease), (t.duration = il(e.duration)), (t.type = "keyframes"), t);
      };
      let iF = (t, e, i) => (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
      function iB(t, e, i, n) {
        return t === e && i === n
          ? tr
          : (s) =>
              0 === s || 1 === s
                ? s
                : iF(
                    (function (t, e, i, n, s) {
                      let r,
                        o,
                        a = 0;
                      do (r = iF((o = e + (i - e) / 2), n, s) - t) > 0 ? (i = o) : (e = o);
                      while (Math.abs(r) > 1e-7 && ++a < 12);
                      return o;
                    })(s, 0, 1, t, i),
                    e,
                    n,
                  );
      }
      let iO = iB(0.42, 0, 1, 1),
        iI = iB(0, 0, 0.58, 1),
        iU = iB(0.42, 0, 0.58, 1),
        iN = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
        iW = (t) => (e) => 1 - t(1 - e),
        iY = iB(0.33, 1.53, 0.69, 0.99),
        iz = iW(iY),
        iH = iN(iz),
        iX = (t) => ((t *= 2) < 1 ? 0.5 * iz(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)))),
        iK = (t) => 1 - Math.sin(Math.acos(t)),
        i$ = iW(iK),
        iq = iN(iK),
        iG = (t) => Array.isArray(t) && "number" == typeof t[0],
        i_ = {
          linear: tr,
          easeIn: iO,
          easeInOut: iU,
          easeOut: iI,
          circIn: iK,
          circInOut: iq,
          circOut: i$,
          backIn: iz,
          backInOut: iH,
          backOut: iY,
          anticipate: iX,
        },
        iZ = (t) => {
          if (iG(t)) {
            Q(
              4 === t.length,
              "Cubic bezier arrays must contain four numerical values.",
              "cubic-bezier-length",
            );
            let [e, i, n, s] = t;
            return iB(e, i, n, s);
          }
          return "string" == typeof t
            ? (Q(void 0 !== i_[t], `Invalid easing type '${t}'`, "invalid-easing-type"), i_[t])
            : t;
        },
        iQ = (t, e, i) => {
          let n = e - t;
          return 0 === n ? 1 : (i - t) / n;
        };
      function iJ({ duration: t = 300, keyframes: e, times: i, ease: n = "easeInOut" }) {
        var s;
        let r = Array.isArray(n) && "number" != typeof n[0] ? n.map(iZ) : iZ(n),
          o = { done: !1, value: e[0] },
          a = (function (t, e, { clamp: i = !0, ease: n, mixer: s } = {}) {
            let r = t.length;
            if (
              (Q(
                r === e.length,
                "Both input and output ranges must be the same length",
                "range-length",
              ),
              1 === r)
            )
              return () => e[0];
            if (2 === r && e[0] === e[1]) return () => e[1];
            let o = t[0] === t[1];
            t[0] > t[r - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
            let a = (function (t, e, i) {
                let n = [],
                  s = i || to.mix || ib,
                  r = t.length - 1;
                for (let i = 0; i < r; i++) {
                  let r = s(t[i], t[i + 1]);
                  (e && (r = ia(Array.isArray(e) ? e[i] || tr : e, r)), n.push(r));
                }
                return n;
              })(e, n, s),
              l = a.length,
              h = (i) => {
                if (o && i < t[0]) return e[0];
                let n = 0;
                if (l > 1) for (; n < t.length - 2 && !(i < t[n + 1]); n++);
                let s = iQ(t[n], t[n + 1], i);
                return a[n](s);
              };
            return i ? (e) => h(O(t[0], t[r - 1], e)) : h;
          })(
            ((s =
              i && i.length === e.length
                ? i
                : (function (t) {
                    let e = [0];
                    return (
                      !(function (t, e) {
                        let i = t[t.length - 1];
                        for (let n = 1; n <= e; n++) {
                          let s = iQ(0, e, n);
                          t.push(b(i, 1, s));
                        }
                      })(e, t.length - 1),
                      e
                    );
                  })(e)),
            s.map((e) => e * t)),
            e,
            { ease: Array.isArray(r) ? r : e.map(() => r || iU).splice(0, e.length - 1) },
          );
        return { calculatedDuration: t, next: (e) => ((o.value = a(e)), (o.done = e >= t), o) };
      }
      let i0 = (t) => null !== t;
      function i1(t, { repeat: e, repeatType: i = "loop" }, n, s = 1) {
        let r = t.filter(i0),
          o = s < 0 || (e && "loop" !== i && e % 2 == 1) ? 0 : r.length - 1;
        return o && void 0 !== n ? n : r[o];
      }
      let i2 = { decay: ij, inertia: ij, tween: iJ, keyframes: iJ, spring: iL };
      function i3(t) {
        "string" == typeof t.type && (t.type = i2[t.type]);
      }
      class i5 {
        constructor() {
          this.updateFinished();
        }
        get finished() {
          return this._finished;
        }
        updateFinished() {
          this._finished = new Promise((t) => {
            this.resolve = t;
          });
        }
        notifyFinished() {
          this.resolve();
        }
        then(t, e) {
          return this.finished.then(t, e);
        }
      }
      let i4 = (t) => t / 100;
      class i9 extends i5 {
        constructor(t) {
          (super(),
            (this.state = "idle"),
            (this.startTime = null),
            (this.isStopped = !1),
            (this.currentTime = 0),
            (this.holdTime = null),
            (this.playbackSpeed = 1),
            (this.stop = () => {
              let { motionValue: t } = this.options;
              (t && t.updatedAt !== t2.now() && this.tick(t2.now()),
                (this.isStopped = !0),
                "idle" !== this.state && (this.teardown(), this.options.onStop?.()));
            }),
            ih.mainThread++,
            (this.options = t),
            this.initAnimation(),
            this.play(),
            !1 === t.autoplay && this.pause());
        }
        initAnimation() {
          let { options: t } = this;
          i3(t);
          let {
              type: e = iJ,
              repeat: i = 0,
              repeatDelay: n = 0,
              repeatType: s,
              velocity: r = 0,
            } = t,
            { keyframes: o } = t,
            a = e || iJ;
          a !== iJ &&
            "number" != typeof o[0] &&
            ((this.mixKeyframes = ia(i4, ib(o[0], o[1]))), (o = [0, 100]));
          let l = a({ ...t, keyframes: o });
          ("mirror" === s &&
            (this.mirroredGenerator = a({ ...t, keyframes: [...o].reverse(), velocity: -r })),
            null === l.calculatedDuration && (l.calculatedDuration = iM(l)));
          let { calculatedDuration: h } = l;
          ((this.calculatedDuration = h),
            (this.resolvedDuration = h + n),
            (this.totalDuration = this.resolvedDuration * (i + 1) - n),
            (this.generator = l));
        }
        updateTime(t) {
          let e = Math.round(t - this.startTime) * this.playbackSpeed;
          null !== this.holdTime ? (this.currentTime = this.holdTime) : (this.currentTime = e);
        }
        tick(t, e = !1) {
          let {
            generator: i,
            totalDuration: n,
            mixKeyframes: s,
            mirroredGenerator: r,
            resolvedDuration: o,
            calculatedDuration: a,
          } = this;
          if (null === this.startTime) return i.next(0);
          let {
            delay: l = 0,
            keyframes: h,
            repeat: u,
            repeatType: d,
            repeatDelay: c,
            type: p,
            onUpdate: m,
            finalKeyframe: f,
          } = this.options;
          (this.speed > 0
            ? (this.startTime = Math.min(this.startTime, t))
            : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)),
            e ? (this.currentTime = t) : this.updateTime(t));
          let v = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1),
            g = this.playbackSpeed >= 0 ? v < 0 : v > n;
          ((this.currentTime = Math.max(v, 0)),
            "finished" === this.state && null === this.holdTime && (this.currentTime = n));
          let y = this.currentTime,
            x = i;
          if (u) {
            let t = Math.min(this.currentTime, n) / o,
              e = Math.floor(t),
              i = t % 1;
            (!i && t >= 1 && (i = 1),
              1 === i && e--,
              (e = Math.min(e, u + 1)) % 2 &&
                ("reverse" === d ? ((i = 1 - i), c && (i -= c / o)) : "mirror" === d && (x = r)),
              (y = O(0, 1, i) * o));
          }
          let T = g ? { done: !1, value: h[0] } : x.next(y);
          s && (T.value = s(T.value));
          let { done: w } = T;
          g ||
            null === a ||
            (w = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
          let P =
            null === this.holdTime &&
            ("finished" === this.state || ("running" === this.state && w));
          return (
            P && p !== ij && (T.value = i1(h, this.options, f, this.speed)),
            m && m(T.value),
            P && this.finish(),
            T
          );
        }
        then(t, e) {
          return this.finished.then(t, e);
        }
        get duration() {
          return this.calculatedDuration / 1e3;
        }
        get iterationDuration() {
          let { delay: t = 0 } = this.options || {};
          return this.duration + t / 1e3;
        }
        get time() {
          return this.currentTime / 1e3;
        }
        set time(t) {
          ((t = il(t)),
            (this.currentTime = t),
            null === this.startTime || null !== this.holdTime || 0 === this.playbackSpeed
              ? (this.holdTime = t)
              : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed),
            this.driver?.start(!1));
        }
        get speed() {
          return this.playbackSpeed;
        }
        set speed(t) {
          this.updateTime(t2.now());
          let e = this.playbackSpeed !== t;
          ((this.playbackSpeed = t), e && (this.time = this.currentTime / 1e3));
        }
        play() {
          if (this.isStopped) return;
          let { driver: t = iS, startTime: e } = this.options;
          (this.driver || (this.driver = t((t) => this.tick(t))), this.options.onPlay?.());
          let i = this.driver.now();
          ("finished" === this.state
            ? (this.updateFinished(), (this.startTime = i))
            : null !== this.holdTime
              ? (this.startTime = i - this.holdTime)
              : this.startTime || (this.startTime = e ?? i),
            "finished" === this.state &&
              this.speed < 0 &&
              (this.startTime += this.calculatedDuration),
            (this.holdTime = null),
            (this.state = "running"),
            this.driver.start());
        }
        pause() {
          ((this.state = "paused"), this.updateTime(t2.now()), (this.holdTime = this.currentTime));
        }
        complete() {
          ("running" !== this.state && this.play(),
            (this.state = "finished"),
            (this.holdTime = null));
        }
        finish() {
          (this.notifyFinished(),
            this.teardown(),
            (this.state = "finished"),
            this.options.onComplete?.());
        }
        cancel() {
          ((this.holdTime = null),
            (this.startTime = 0),
            this.tick(0),
            this.teardown(),
            this.options.onCancel?.());
        }
        teardown() {
          ((this.state = "idle"),
            this.stopDriver(),
            (this.startTime = this.holdTime = null),
            ih.mainThread--);
        }
        stopDriver() {
          this.driver && (this.driver.stop(), (this.driver = void 0));
        }
        sample(t) {
          return ((this.startTime = 0), this.tick(t, !0));
        }
        attachTimeline(t) {
          return (
            this.options.allowFlatten &&
              ((this.options.type = "keyframes"),
              (this.options.ease = "linear"),
              this.initAnimation()),
            this.driver?.stop(),
            t.observe(this)
          );
        }
      }
      function i6(t) {
        let e;
        return () => (void 0 === e && (e = t()), e);
      }
      let i7 = i6(() => void 0 !== window.ScrollTimeline),
        i8 = {},
        nt = (function (t, e) {
          let i = i6(t);
          return () => i8[e] ?? i();
        })(() => {
          try {
            document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
          } catch (t) {
            return !1;
          }
          return !0;
        }, "linearEasing"),
        ne = ([t, e, i, n]) => `cubic-bezier(${t}, ${e}, ${i}, ${n})`,
        ni = {
          linear: "linear",
          ease: "ease",
          easeIn: "ease-in",
          easeOut: "ease-out",
          easeInOut: "ease-in-out",
          circIn: ne([0, 0.65, 0.55, 1]),
          circOut: ne([0.55, 0, 1, 0.45]),
          backIn: ne([0.31, 0.01, 0.66, -0.59]),
          backOut: ne([0.33, 1.53, 0.69, 0.99]),
        };
      function nn(t) {
        return "function" == typeof t && "applyToOptions" in t;
      }
      class ns extends i5 {
        constructor(t) {
          if ((super(), (this.finishedTime = null), (this.isStopped = !1), !t)) return;
          let {
            element: e,
            name: i,
            keyframes: n,
            pseudoElement: s,
            allowFlatten: r = !1,
            finalKeyframe: o,
            onComplete: a,
          } = t;
          ((this.isPseudoElement = !!s),
            (this.allowFlatten = r),
            (this.options = t),
            Q(
              "string" != typeof t.type,
              'Mini animate() doesn\'t support "type" as a string.',
              "mini-spring",
            ));
          let l = (function ({ type: t, ...e }) {
            return nn(t) && nt()
              ? t.applyToOptions(e)
              : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
          })(t);
          ((this.animation = (function (
            t,
            e,
            i,
            {
              delay: n = 0,
              duration: s = 300,
              repeat: r = 0,
              repeatType: o = "loop",
              ease: a = "easeOut",
              times: l,
            } = {},
            h,
          ) {
            let u = { [e]: i };
            l && (u.offset = l);
            let d = (function t(e, i) {
              if (e)
                return "function" == typeof e
                  ? nt()
                    ? iA(e, i)
                    : "ease-out"
                  : iG(e)
                    ? ne(e)
                    : Array.isArray(e)
                      ? e.map((e) => t(e, i) || ni.easeOut)
                      : ni[e];
            })(a, s);
            (Array.isArray(d) && (u.easing = d), tl.value && ih.waapi++);
            let c = {
              delay: n,
              duration: s,
              easing: Array.isArray(d) ? "linear" : d,
              fill: "both",
              iterations: r + 1,
              direction: "reverse" === o ? "alternate" : "normal",
            };
            h && (c.pseudoElement = h);
            let p = t.animate(u, c);
            return (
              tl.value &&
                p.finished.finally(() => {
                  ih.waapi--;
                }),
              p
            );
          })(e, i, n, l, s)),
            !1 === l.autoplay && this.animation.pause(),
            (this.animation.onfinish = () => {
              if (((this.finishedTime = this.time), !s)) {
                let t = i1(n, this.options, o, this.speed);
                (this.updateMotionValue
                  ? this.updateMotionValue(t)
                  : (function (t, e, i) {
                      e.startsWith("--") ? t.style.setProperty(e, i) : (t.style[e] = i);
                    })(e, i, t),
                  this.animation.cancel());
              }
              (a?.(), this.notifyFinished());
            }));
        }
        play() {
          this.isStopped ||
            (this.animation.play(), "finished" === this.state && this.updateFinished());
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.finish?.();
        }
        cancel() {
          try {
            this.animation.cancel();
          } catch (t) {}
        }
        stop() {
          if (this.isStopped) return;
          this.isStopped = !0;
          let { state: t } = this;
          "idle" !== t &&
            "finished" !== t &&
            (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
            this.isPseudoElement || this.cancel());
        }
        commitStyles() {
          this.isPseudoElement || this.animation.commitStyles?.();
        }
        get duration() {
          return Number(this.animation.effect?.getComputedTiming?.().duration || 0) / 1e3;
        }
        get iterationDuration() {
          let { delay: t = 0 } = this.options || {};
          return this.duration + t / 1e3;
        }
        get time() {
          return (Number(this.animation.currentTime) || 0) / 1e3;
        }
        set time(t) {
          ((this.finishedTime = null), (this.animation.currentTime = il(t)));
        }
        get speed() {
          return this.animation.playbackRate;
        }
        set speed(t) {
          (t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t));
        }
        get state() {
          return null !== this.finishedTime ? "finished" : this.animation.playState;
        }
        get startTime() {
          return Number(this.animation.startTime);
        }
        set startTime(t) {
          this.animation.startTime = t;
        }
        attachTimeline({ timeline: t, observe: e }) {
          return (this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }),
          (this.animation.onfinish = null),
          t && i7())
            ? ((this.animation.timeline = t), tr)
            : e(this);
        }
      }
      let nr = { anticipate: iX, backInOut: iH, circInOut: iq };
      class no extends ns {
        constructor(t) {
          (!(function (t) {
            "string" == typeof t.ease && t.ease in nr && (t.ease = nr[t.ease]);
          })(t),
            i3(t),
            super(t),
            t.startTime && (this.startTime = t.startTime),
            (this.options = t));
        }
        updateMotionValue(t) {
          let { motionValue: e, onUpdate: i, onComplete: n, element: s, ...r } = this.options;
          if (!e) return;
          if (void 0 !== t) return void e.set(t);
          let o = new i9({ ...r, autoplay: !1 }),
            a = il(this.finishedTime ?? this.time);
          (e.setWithVelocity(o.sample(a - 10).value, o.sample(a).value, 10), o.stop());
        }
      }
      let na = (t, e) =>
          "zIndex" !== e &&
          !!(
            "number" == typeof t ||
            Array.isArray(t) ||
            ("string" == typeof t && (tN.test(t) || "0" === t) && !t.startsWith("url("))
          ),
        nl = new Set(["opacity", "clipPath", "filter", "transform"]),
        nh = i6(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
      class nu extends i5 {
        constructor({
          autoplay: t = !0,
          delay: e = 0,
          type: i = "keyframes",
          repeat: n = 0,
          repeatDelay: s = 0,
          repeatType: r = "loop",
          keyframes: o,
          name: a,
          motionValue: l,
          element: h,
          ...u
        }) {
          (super(),
            (this.stop = () => {
              (this._animation && (this._animation.stop(), this.stopTimeline?.()),
                this.keyframeResolver?.cancel());
            }),
            (this.createdAt = t2.now()));
          let d = {
              autoplay: t,
              delay: e,
              type: i,
              repeat: n,
              repeatDelay: s,
              repeatType: r,
              name: a,
              motionValue: l,
              element: h,
              ...u,
            },
            c = h?.KeyframeResolver || tT;
          ((this.keyframeResolver = new c(
            o,
            (t, e, i) => this.onKeyframesResolved(t, e, d, !i),
            a,
            l,
            h,
          )),
            this.keyframeResolver?.scheduleResolve());
        }
        onKeyframesResolved(t, e, i, n) {
          this.keyframeResolver = void 0;
          let { name: s, type: r, velocity: o, delay: a, isHandoff: l, onUpdate: h } = i;
          ((this.resolvedAt = t2.now()),
            !(function (t, e, i, n) {
              let s = t[0];
              if (null === s) return !1;
              if ("display" === e || "visibility" === e) return !0;
              let r = t[t.length - 1],
                o = na(s, e),
                a = na(r, e);
              return (
                Z(
                  o === a,
                  `You are trying to animate ${e} from "${s}" to "${r}". "${o ? r : s}" is not an animatable value.`,
                  "value-not-animatable",
                ),
                !!o &&
                  !!a &&
                  ((function (t) {
                    let e = t[0];
                    if (1 === t.length) return !0;
                    for (let i = 0; i < t.length; i++) if (t[i] !== e) return !0;
                  })(t) ||
                    (("spring" === i || nn(i)) && n))
              );
            })(t, s, r, o) &&
              ((to.instantAnimations || !a) && h?.(i1(t, i, e)),
              (t[0] = t[t.length - 1]),
              ir(i),
              (i.repeat = 0)));
          let u = {
              startTime: n
                ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
                  ? this.resolvedAt
                  : this.createdAt
                : void 0,
              finalKeyframe: e,
              ...i,
              keyframes: t,
            },
            d =
              !l &&
              (function (t) {
                let {
                  motionValue: e,
                  name: i,
                  repeatDelay: n,
                  repeatType: s,
                  damping: r,
                  type: o,
                } = t;
                if (!(e?.owner?.current instanceof HTMLElement)) return !1;
                let { onUpdate: a, transformTemplate: l } = e.owner.getProps();
                return (
                  nh() &&
                  i &&
                  nl.has(i) &&
                  ("transform" !== i || !l) &&
                  !a &&
                  !n &&
                  "mirror" !== s &&
                  0 !== r &&
                  "inertia" !== o
                );
              })(u)
                ? new no({ ...u, element: u.motionValue.owner.current })
                : new i9(u);
          (d.finished.then(() => this.notifyFinished()).catch(tr),
            this.pendingTimeline &&
              ((this.stopTimeline = d.attachTimeline(this.pendingTimeline)),
              (this.pendingTimeline = void 0)),
            (this._animation = d));
        }
        get finished() {
          return this._animation ? this.animation.finished : this._finished;
        }
        then(t, e) {
          return this.finished.finally(t).then(() => {});
        }
        get animation() {
          return (
            this._animation || (this.keyframeResolver?.resume(), (tg = !0), tx(), ty(), (tg = !1)),
            this._animation
          );
        }
        get duration() {
          return this.animation.duration;
        }
        get iterationDuration() {
          return this.animation.iterationDuration;
        }
        get time() {
          return this.animation.time;
        }
        set time(t) {
          this.animation.time = t;
        }
        get speed() {
          return this.animation.speed;
        }
        get state() {
          return this.animation.state;
        }
        set speed(t) {
          this.animation.speed = t;
        }
        get startTime() {
          return this.animation.startTime;
        }
        attachTimeline(t) {
          return (
            this._animation
              ? (this.stopTimeline = this.animation.attachTimeline(t))
              : (this.pendingTimeline = t),
            () => this.stop()
          );
        }
        play() {
          this.animation.play();
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.complete();
        }
        cancel() {
          (this._animation && this.animation.cancel(), this.keyframeResolver?.cancel());
        }
      }
      let nd = (t) => null !== t,
        nc = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
        np = { type: "keyframes", duration: 0.8 },
        nm = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
        nf = function (t, e, i) {
          let n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            s = arguments.length > 4 ? arguments[4] : void 0,
            r = arguments.length > 5 ? arguments[5] : void 0;
          return (a) => {
            let l = ie(n, t) || {},
              h = l.delay || n.delay || 0,
              { elapsed: u = 0 } = n;
            u -= il(h);
            let d = {
              keyframes: Array.isArray(i) ? i : [null, i],
              ease: "easeOut",
              velocity: e.getVelocity(),
              ...l,
              delay: -u,
              onUpdate: (t) => {
                (e.set(t), l.onUpdate && l.onUpdate(t));
              },
              onComplete: () => {
                (a(), l.onComplete && l.onComplete());
              },
              name: t,
              motionValue: e,
              element: r ? void 0 : s,
            };
            (!(function (t) {
              let {
                when: e,
                delay: i,
                delayChildren: n,
                staggerChildren: s,
                staggerDirection: r,
                repeat: o,
                repeatType: a,
                repeatDelay: l,
                from: h,
                elapsed: u,
                ...d
              } = t;
              return !!Object.keys(d).length;
            })(l) &&
              Object.assign(
                d,
                ((t, e) => {
                  let { keyframes: i } = e;
                  return i.length > 2
                    ? np
                    : o.has(t)
                      ? t.startsWith("scale")
                        ? {
                            type: "spring",
                            stiffness: 550,
                            damping: 0 === i[1] ? 2 * Math.sqrt(550) : 30,
                            restSpeed: 10,
                          }
                        : nc
                      : nm;
                })(t, d),
              ),
              d.duration && (d.duration = il(d.duration)),
              d.repeatDelay && (d.repeatDelay = il(d.repeatDelay)),
              void 0 !== d.from && (d.keyframes[0] = d.from));
            let c = !1;
            if (
              ((!1 !== d.type && (0 !== d.duration || d.repeatDelay)) ||
                (ir(d), 0 === d.delay && (c = !0)),
              (to.instantAnimations || to.skipAnimations) && ((c = !0), ir(d), (d.delay = 0)),
              (d.allowFlatten = !l.type && !l.ease),
              c && !r && void 0 !== e.get())
            ) {
              let t = (function (t, e, i) {
                let { repeat: n, repeatType: s = "loop" } = e,
                  r = t.filter(nd),
                  o = n && "loop" !== s && n % 2 == 1 ? 0 : r.length - 1;
                return r[o];
              })(d.keyframes, l);
              if (void 0 !== t)
                return void tu.update(() => {
                  (d.onUpdate(t), d.onComplete());
                });
            }
            return l.isSync ? new i9(d) : new nu(d);
          };
        };
      function nv(t, e) {
        let {
            delay: i = 0,
            transitionOverride: n,
            type: s,
          } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          { transition: r = t.getDefaultTransition(), transitionEnd: o, ...a } = e;
        n && (r = n);
        let l = [],
          h = s && t.animationState && t.animationState.getState()[s];
        for (let e in a) {
          var u;
          let n = t.getValue(e, null != (u = t.latestValues[e]) ? u : null),
            s = a[e];
          if (
            void 0 === s ||
            (h &&
              (function (t, e) {
                let { protectedKeys: i, needsAnimating: n } = t,
                  s = i.hasOwnProperty(e) && !0 !== n[e];
                return ((n[e] = !1), s);
              })(h, e))
          )
            continue;
          let o = { delay: i, ...ie(r || {}, e) },
            d = n.get();
          if (void 0 !== d && !n.isAnimating && !Array.isArray(s) && s === d && !o.velocity)
            continue;
          let c = !1;
          if (window.MotionHandoffAnimation) {
            let i = t.props[e9];
            if (i) {
              let t = window.MotionHandoffAnimation(i, e, tu);
              null !== t && ((o.startTime = t), (c = !0));
            }
          }
          (is(t, e),
            n.start(nf(e, n, s, t.shouldReduceMotion && B.has(e) ? { type: !1 } : o, t, c)));
          let p = n.animation;
          p && l.push(p);
        }
        return (
          o &&
            Promise.all(l).then(() => {
              tu.update(() => {
                o &&
                  (function (t, e) {
                    let { transitionEnd: i = {}, transition: n = {}, ...s } = it(t, e) || {};
                    for (let e in (s = { ...s, ...i })) {
                      var r;
                      let i = ii((r = s[e])) ? r[r.length - 1] || 0 : r;
                      t.hasValue(e) ? t.getValue(e).set(i) : t.addValue(e, t4(i));
                    }
                  })(t, o);
              });
            }),
          l
        );
      }
      function ng(t, e, i) {
        let n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
          s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
          r = Array.from(t)
            .sort((t, e) => t.sortNodePosition(e))
            .indexOf(e),
          o = t.size,
          a = (o - 1) * n;
        return "function" == typeof i ? i(r, o) : 1 === s ? r * n : a - r * n;
      }
      function ny(t, e) {
        var i;
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          s = it(
            t,
            e,
            "exit" === n.type ? (null == (i = t.presenceContext) ? void 0 : i.custom) : void 0,
          ),
          { transition: r = t.getDefaultTransition() || {} } = s || {};
        n.transitionOverride && (r = n.transitionOverride);
        let o = s ? () => Promise.all(nv(t, s, n)) : () => Promise.resolve(),
          a =
            t.variantChildren && t.variantChildren.size
              ? function () {
                  let i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    { delayChildren: s = 0, staggerChildren: o, staggerDirection: a } = r;
                  return (function (t, e) {
                    let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                      n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                      s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                      r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1,
                      o = arguments.length > 6 ? arguments[6] : void 0,
                      a = [];
                    for (let l of t.variantChildren)
                      (l.notify("AnimationStart", e),
                        a.push(
                          ny(l, e, {
                            ...o,
                            delay:
                              i +
                              ("function" == typeof n ? 0 : n) +
                              ng(t.variantChildren, l, n, s, r),
                          }).then(() => l.notify("AnimationComplete", e)),
                        ));
                    return Promise.all(a);
                  })(t, e, i, s, o, a, n);
                }
              : () => Promise.resolve(),
          { when: l } = r;
        if (!l) return Promise.all([o(), a(n.delay)]);
        {
          let [t, e] = "beforeChildren" === l ? [o, a] : [a, o];
          return t().then(() => e());
        }
      }
      function nx(t, e) {
        if (!Array.isArray(e)) return !1;
        let i = e.length;
        if (i !== t.length) return !1;
        for (let n = 0; n < i; n++) if (e[n] !== t[n]) return !1;
        return !0;
      }
      let nT = ed.length,
        nw = [...eu].reverse(),
        nP = eu.length;
      function nb() {
        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return { isActive: t, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
      }
      function nS() {
        return {
          animate: nb(!0),
          whileInView: nb(),
          whileHover: nb(),
          whileTap: nb(),
          whileDrag: nb(),
          whileFocus: nb(),
          exit: nb(),
        };
      }
      class nA {
        update() {}
        constructor(t) {
          ((this.isMounted = !1), (this.node = t));
        }
      }
      class nM extends nA {
        updateAnimationControlsSubscription() {
          let { animate: t } = this.node.getProps();
          el(t) && (this.unmountControls = t.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          let { animate: t } = this.node.getProps(),
            { animate: e } = this.node.prevProps || {};
          t !== e && this.updateAnimationControlsSubscription();
        }
        unmount() {
          var t;
          (this.node.animationState.reset(), null == (t = this.unmountControls) || t.call(this));
        }
        constructor(t) {
          (super(t),
            t.animationState ||
              (t.animationState = (function (t) {
                let e = (e) =>
                    Promise.all(
                      e.map((e) => {
                        let { animation: i, options: n } = e;
                        return (function (t, e) {
                          let i,
                            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                          if ((t.notify("AnimationStart", e), Array.isArray(e)))
                            i = Promise.all(e.map((e) => ny(t, e, n)));
                          else if ("string" == typeof e) i = ny(t, e, n);
                          else {
                            let s = "function" == typeof e ? it(t, e, n.custom) : e;
                            i = Promise.all(nv(t, s, n));
                          }
                          return i.then(() => {
                            t.notify("AnimationComplete", e);
                          });
                        })(t, i, n);
                      }),
                    ),
                  i = nS(),
                  n = !0,
                  s = (e) => (i, n) => {
                    var s;
                    let r = it(
                      t,
                      n,
                      "exit" === e ? (null == (s = t.presenceContext) ? void 0 : s.custom) : void 0,
                    );
                    if (r) {
                      let { transition: t, transitionEnd: e, ...n } = r;
                      i = { ...i, ...n, ...e };
                    }
                    return i;
                  };
                function r(r) {
                  let { props: o } = t,
                    a =
                      (function t(e) {
                        if (!e) return;
                        if (!e.isControllingVariants) {
                          let i = (e.parent && t(e.parent)) || {};
                          return (void 0 !== e.props.initial && (i.initial = e.props.initial), i);
                        }
                        let i = {};
                        for (let t = 0; t < nT; t++) {
                          let n = ed[t],
                            s = e.props[n];
                          (eh(s) || !1 === s) && (i[n] = s);
                        }
                        return i;
                      })(t.parent) || {},
                    l = [],
                    h = new Set(),
                    u = {},
                    d = 1 / 0;
                  for (let e = 0; e < nP; e++) {
                    var c, p;
                    let m = nw[e],
                      f = i[m],
                      v = void 0 !== o[m] ? o[m] : a[m],
                      g = eh(v),
                      y = m === r ? f.isActive : null;
                    !1 === y && (d = e);
                    let x = v === a[m] && v !== o[m] && g;
                    if (
                      (x && n && t.manuallyAnimateOnMount && (x = !1),
                      (f.protectedKeys = { ...u }),
                      (!f.isActive && null === y) ||
                        (!v && !f.prevProp) ||
                        el(v) ||
                        "boolean" == typeof v)
                    )
                      continue;
                    let T =
                        ((c = f.prevProp),
                        "string" == typeof (p = v) ? p !== c : !!Array.isArray(p) && !nx(p, c)),
                      w = T || (m === r && f.isActive && !x && g) || (e > d && g),
                      P = !1,
                      b = Array.isArray(v) ? v : [v],
                      S = b.reduce(s(m), {});
                    !1 === y && (S = {});
                    let { prevResolvedValues: A = {} } = f,
                      M = { ...A, ...S },
                      V = (e) => {
                        ((w = !0), h.has(e) && ((P = !0), h.delete(e)), (f.needsAnimating[e] = !0));
                        let i = t.getValue(e);
                        i && (i.liveStyle = !1);
                      };
                    for (let t in M) {
                      let e = S[t],
                        i = A[t];
                      if (!u.hasOwnProperty(t))
                        (ii(e) && ii(i) ? nx(e, i) : e === i)
                          ? void 0 !== e && h.has(t)
                            ? V(t)
                            : (f.protectedKeys[t] = !0)
                          : null != e
                            ? V(t)
                            : h.add(t);
                    }
                    ((f.prevProp = v),
                      (f.prevResolvedValues = S),
                      f.isActive && (u = { ...u, ...S }),
                      n && t.blockInitialAnimation && (w = !1));
                    let E = x && T,
                      C = !E || P;
                    w &&
                      C &&
                      l.push(
                        ...b.map((e) => {
                          let i = { type: m };
                          if (
                            "string" == typeof e &&
                            n &&
                            !E &&
                            t.manuallyAnimateOnMount &&
                            t.parent
                          ) {
                            let { parent: n } = t,
                              s = it(n, e);
                            if (n.enteringChildren && s) {
                              let { delayChildren: e } = s.transition || {};
                              i.delay = ng(n.enteringChildren, t, e);
                            }
                          }
                          return { animation: e, options: i };
                        }),
                      );
                  }
                  if (h.size) {
                    let e = {};
                    if ("boolean" != typeof o.initial) {
                      let i = it(t, Array.isArray(o.initial) ? o.initial[0] : o.initial);
                      i && i.transition && (e.transition = i.transition);
                    }
                    (h.forEach((i) => {
                      let n = t.getBaseTarget(i),
                        s = t.getValue(i);
                      (s && (s.liveStyle = !0), (e[i] = null != n ? n : null));
                    }),
                      l.push({ animation: e }));
                  }
                  let m = !!l.length;
                  return (
                    n &&
                      (!1 === o.initial || o.initial === o.animate) &&
                      !t.manuallyAnimateOnMount &&
                      (m = !1),
                    (n = !1),
                    m ? e(l) : Promise.resolve()
                  );
                }
                return {
                  animateChanges: r,
                  setActive: function (e, n) {
                    var s;
                    if (i[e].isActive === n) return Promise.resolve();
                    (null == (s = t.variantChildren) ||
                      s.forEach((t) => {
                        var i;
                        return null == (i = t.animationState) ? void 0 : i.setActive(e, n);
                      }),
                      (i[e].isActive = n));
                    let o = r(e);
                    for (let t in i) i[t].protectedKeys = {};
                    return o;
                  },
                  setAnimateFunction: function (i) {
                    e = i(t);
                  },
                  getState: () => i,
                  reset: () => {
                    i = nS();
                  },
                };
              })(t)));
        }
      }
      let nV = 0;
      class nE extends nA {
        update() {
          if (!this.node.presenceContext) return;
          let { isPresent: t, onExitComplete: e } = this.node.presenceContext,
            { isPresent: i } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || t === i) return;
          let n = this.node.animationState.setActive("exit", !t);
          e &&
            !t &&
            n.then(() => {
              e(this.id);
            });
        }
        mount() {
          let { register: t, onExitComplete: e } = this.node.presenceContext || {};
          (e && e(this.id), t && (this.unmount = t(this.id)));
        }
        unmount() {}
        constructor() {
          (super(...arguments), (this.id = nV++));
        }
      }
      let nC = { x: !1, y: !1 };
      function nD(t, e, i) {
        let n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : { passive: !0 };
        return (t.addEventListener(e, i, n), () => t.removeEventListener(e, i));
      }
      let nk = (t) =>
        "mouse" === t.pointerType
          ? "number" != typeof t.button || t.button <= 0
          : !1 !== t.isPrimary;
      function nR(t) {
        return { point: { x: t.pageX, y: t.pageY } };
      }
      function nL(t, e, i, n) {
        return nD(t, e, (t) => nk(t) && i(t, nR(t)), n);
      }
      function nj(t) {
        return t.max - t.min;
      }
      function nF(t, e, i) {
        let n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0.5;
        ((t.origin = n),
          (t.originPoint = b(e.min, e.max, t.origin)),
          (t.scale = nj(i) / nj(e)),
          (t.translate = b(i.min, i.max, t.origin) - t.originPoint),
          ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) && (t.scale = 1),
          ((t.translate >= -0.01 && t.translate <= 0.01) || isNaN(t.translate)) &&
            (t.translate = 0));
      }
      function nB(t, e, i, n) {
        (nF(t.x, e.x, i.x, n ? n.originX : void 0), nF(t.y, e.y, i.y, n ? n.originY : void 0));
      }
      function nO(t, e, i) {
        ((t.min = i.min + e.min), (t.max = t.min + nj(e)));
      }
      function nI(t, e, i) {
        ((t.min = e.min - i.min), (t.max = t.min + nj(e)));
      }
      function nU(t, e, i) {
        (nI(t.x, e.x, i.x), nI(t.y, e.y, i.y));
      }
      function nN(t) {
        return [t("x"), t("y")];
      }
      let nW = (t) => {
          let { current: e } = t;
          return e ? e.ownerDocument.defaultView : null;
        },
        nY = (t, e) => Math.abs(t - e);
      class nz {
        updateHandlers(t) {
          this.handlers = t;
        }
        end() {
          (this.removeListeners && this.removeListeners(), td(this.updatePoint));
        }
        constructor(
          t,
          e,
          {
            transformPagePoint: i,
            contextWindow: n = window,
            dragSnapToOrigin: s = !1,
            distanceThreshold: r = 3,
          } = {},
        ) {
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.contextWindow = window),
            (this.updatePoint = () => {
              if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
              let t = nK(this.lastMoveEventInfo, this.history),
                e = null !== this.startEvent,
                i =
                  (function (t, e) {
                    return Math.sqrt(nY(t.x, e.x) ** 2 + nY(t.y, e.y) ** 2);
                  })(t.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
              if (!e && !i) return;
              let { point: n } = t,
                { timestamp: s } = tc;
              this.history.push({ ...n, timestamp: s });
              let { onStart: r, onMove: o } = this.handlers;
              (e || (r && r(this.lastMoveEvent, t), (this.startEvent = this.lastMoveEvent)),
                o && o(this.lastMoveEvent, t));
            }),
            (this.handlePointerMove = (t, e) => {
              ((this.lastMoveEvent = t),
                (this.lastMoveEventInfo = nH(e, this.transformPagePoint)),
                tu.update(this.updatePoint, !0));
            }),
            (this.handlePointerUp = (t, e) => {
              this.end();
              let { onEnd: i, onSessionEnd: n, resumeAnimation: s } = this.handlers;
              if (
                (this.dragSnapToOrigin && s && s(), !(this.lastMoveEvent && this.lastMoveEventInfo))
              )
                return;
              let r = nK(
                "pointercancel" === t.type
                  ? this.lastMoveEventInfo
                  : nH(e, this.transformPagePoint),
                this.history,
              );
              (this.startEvent && i && i(t, r), n && n(t, r));
            }),
            !nk(t))
          )
            return;
          ((this.dragSnapToOrigin = s),
            (this.handlers = e),
            (this.transformPagePoint = i),
            (this.distanceThreshold = r),
            (this.contextWindow = n || window));
          let o = nH(nR(t), this.transformPagePoint),
            { point: a } = o,
            { timestamp: l } = tc;
          this.history = [{ ...a, timestamp: l }];
          let { onSessionStart: h } = e;
          (h && h(t, nK(o, this.history)),
            (this.removeListeners = ia(
              nL(this.contextWindow, "pointermove", this.handlePointerMove),
              nL(this.contextWindow, "pointerup", this.handlePointerUp),
              nL(this.contextWindow, "pointercancel", this.handlePointerUp),
            )));
        }
      }
      function nH(t, e) {
        return e ? { point: e(t.point) } : t;
      }
      function nX(t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }
      function nK(t, e) {
        let { point: i } = t;
        return {
          point: i,
          delta: nX(i, n$(e)),
          offset: nX(i, e[0]),
          velocity: (function (t, e) {
            if (t.length < 2) return { x: 0, y: 0 };
            let i = t.length - 1,
              n = null,
              s = n$(t);
            for (; i >= 0 && ((n = t[i]), !(s.timestamp - n.timestamp > il(0.1)));) i--;
            if (!n) return { x: 0, y: 0 };
            let r = (s.timestamp - n.timestamp) / 1e3;
            if (0 === r) return { x: 0, y: 0 };
            let o = { x: (s.x - n.x) / r, y: (s.y - n.y) / r };
            return (o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o);
          })(e, 0.1),
        };
      }
      function n$(t) {
        return t[t.length - 1];
      }
      function nq(t, e, i) {
        return {
          min: void 0 !== e ? t.min + e : void 0,
          max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
        };
      }
      function nG(t, e) {
        let i = e.min - t.min,
          n = e.max - t.max;
        return (e.max - e.min < t.max - t.min && ([i, n] = [n, i]), { min: i, max: n });
      }
      function n_(t, e, i) {
        return { min: nZ(t, e), max: nZ(t, i) };
      }
      function nZ(t, e) {
        return "number" == typeof t ? t : t[e] || 0;
      }
      let nQ = new WeakMap();
      class nJ {
        start(t) {
          let { snapToCursor: e = !1, distanceThreshold: i } =
              arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            { presenceContext: n } = this.visualElement;
          if (n && !1 === n.isPresent) return;
          let s = (t) => {
              let { dragSnapToOrigin: i } = this.getProps();
              (i ? this.pauseAnimation() : this.stopAnimation(),
                e && this.snapToCursor(nR(t).point));
            },
            r = (t, e) => {
              let { drag: i, dragPropagation: n, onDragStart: s } = this.getProps();
              if (
                i &&
                !n &&
                (this.openDragLock && this.openDragLock(),
                (this.openDragLock = (function (t) {
                  if ("x" === t || "y" === t)
                    if (nC[t]) return null;
                    else
                      return (
                        (nC[t] = !0),
                        () => {
                          nC[t] = !1;
                        }
                      );
                  return nC.x || nC.y
                    ? null
                    : ((nC.x = nC.y = !0),
                      () => {
                        nC.x = nC.y = !1;
                      });
                })(i)),
                !this.openDragLock)
              )
                return;
              ((this.latestPointerEvent = t),
                (this.latestPanInfo = e),
                (this.isDragging = !0),
                (this.currentDirection = null),
                this.resolveConstraints(),
                this.visualElement.projection &&
                  ((this.visualElement.projection.isAnimationBlocked = !0),
                  (this.visualElement.projection.target = void 0)),
                nN((t) => {
                  let e = this.getAxisMotionValue(t).get() || 0;
                  if (z.test(e)) {
                    let { projection: i } = this.visualElement;
                    if (i && i.layout) {
                      let n = i.layout.layoutBox[t];
                      n && (e = nj(n) * (parseFloat(e) / 100));
                    }
                  }
                  this.originPoint[t] = e;
                }),
                s && tu.postRender(() => s(t, e)),
                is(this.visualElement, "transform"));
              let { animationState: r } = this.visualElement;
              r && r.setActive("whileDrag", !0);
            },
            o = (t, e) => {
              ((this.latestPointerEvent = t), (this.latestPanInfo = e));
              let {
                dragPropagation: i,
                dragDirectionLock: n,
                onDirectionLock: s,
                onDrag: r,
              } = this.getProps();
              if (!i && !this.openDragLock) return;
              let { offset: o } = e;
              if (n && null === this.currentDirection) {
                ((this.currentDirection = (function (t) {
                  let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10,
                    i = null;
                  return (Math.abs(t.y) > e ? (i = "y") : Math.abs(t.x) > e && (i = "x"), i);
                })(o)),
                  null !== this.currentDirection && s && s(this.currentDirection));
                return;
              }
              (this.updateAxis("x", e.point, o),
                this.updateAxis("y", e.point, o),
                this.visualElement.render(),
                r && r(t, e));
            },
            a = (t, e) => {
              ((this.latestPointerEvent = t),
                (this.latestPanInfo = e),
                this.stop(t, e),
                (this.latestPointerEvent = null),
                (this.latestPanInfo = null));
            },
            l = () =>
              nN((t) => {
                var e;
                return (
                  "paused" === this.getAnimationState(t) &&
                  (null == (e = this.getAxisMotionValue(t).animation) ? void 0 : e.play())
                );
              }),
            { dragSnapToOrigin: h } = this.getProps();
          this.panSession = new nz(
            t,
            { onSessionStart: s, onStart: r, onMove: o, onSessionEnd: a, resumeAnimation: l },
            {
              transformPagePoint: this.visualElement.getTransformPagePoint(),
              dragSnapToOrigin: h,
              distanceThreshold: i,
              contextWindow: nW(this.visualElement),
            },
          );
        }
        stop(t, e) {
          let i = t || this.latestPointerEvent,
            n = e || this.latestPanInfo,
            s = this.isDragging;
          if ((this.cancel(), !s || !n || !i)) return;
          let { velocity: r } = n;
          this.startAnimation(r);
          let { onDragEnd: o } = this.getProps();
          o && tu.postRender(() => o(i, n));
        }
        cancel() {
          this.isDragging = !1;
          let { projection: t, animationState: e } = this.visualElement;
          (t && (t.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            (this.panSession = void 0));
          let { dragPropagation: i } = this.getProps();
          (!i && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
            e && e.setActive("whileDrag", !1));
        }
        updateAxis(t, e, i) {
          let { drag: n } = this.getProps();
          if (!i || !n0(t, n, this.currentDirection)) return;
          let s = this.getAxisMotionValue(t),
            r = this.originPoint[t] + i[t];
          (this.constraints &&
            this.constraints[t] &&
            (r = (function (t, e, i) {
              let { min: n, max: s } = e;
              return (
                void 0 !== n && t < n
                  ? (t = i ? b(n, t, i.min) : Math.max(t, n))
                  : void 0 !== s && t > s && (t = i ? b(s, t, i.max) : Math.min(t, s)),
                t
              );
            })(r, this.constraints[t], this.elastic[t])),
            s.set(r));
        }
        resolveConstraints() {
          var t;
          let { dragConstraints: e, dragElastic: i } = this.getProps(),
            n =
              this.visualElement.projection && !this.visualElement.projection.layout
                ? this.visualElement.projection.measure(!1)
                : null == (t = this.visualElement.projection)
                  ? void 0
                  : t.layout,
            s = this.constraints;
          (e && e4(e)
            ? this.constraints || (this.constraints = this.resolveRefConstraints())
            : e && n
              ? (this.constraints = (function (t, e) {
                  let { top: i, left: n, bottom: s, right: r } = e;
                  return { x: nq(t.x, n, r), y: nq(t.y, i, s) };
                })(n.layoutBox, e))
              : (this.constraints = !1),
            (this.elastic = (function () {
              let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0.35;
              return (
                !1 === t ? (t = 0) : !0 === t && (t = 0.35),
                { x: n_(t, "left", "right"), y: n_(t, "top", "bottom") }
              );
            })(i)),
            s !== this.constraints &&
              n &&
              this.constraints &&
              !this.hasMutatedConstraints &&
              nN((t) => {
                !1 !== this.constraints &&
                  this.getAxisMotionValue(t) &&
                  (this.constraints[t] = (function (t, e) {
                    let i = {};
                    return (
                      void 0 !== e.min && (i.min = e.min - t.min),
                      void 0 !== e.max && (i.max = e.max - t.min),
                      i
                    );
                  })(n.layoutBox[t], this.constraints[t]));
              }));
        }
        resolveRefConstraints() {
          var t;
          let { dragConstraints: e, onMeasureDragConstraints: i } = this.getProps();
          if (!e || !e4(e)) return !1;
          let n = e.current;
          Q(
            null !== n,
            "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
            "drag-constraints-ref",
          );
          let { projection: s } = this.visualElement;
          if (!s || !s.layout) return !1;
          let r = (function (t, e, i) {
              let n = j(t, i),
                { scroll: s } = e;
              return (s && (k(n.x, s.offset.x), k(n.y, s.offset.y)), n);
            })(n, s.root, this.visualElement.getTransformPagePoint()),
            o = ((t = s.layout.layoutBox), { x: nG(t.x, r.x), y: nG(t.y, r.y) });
          if (i) {
            let t = i(
              (function (t) {
                let { x: e, y: i } = t;
                return { top: i.min, right: e.max, bottom: i.max, left: e.min };
              })(o),
            );
            ((this.hasMutatedConstraints = !!t), t && (o = P(t)));
          }
          return o;
        }
        startAnimation(t) {
          let {
              drag: e,
              dragMomentum: i,
              dragElastic: n,
              dragTransition: s,
              dragSnapToOrigin: r,
              onDragTransitionEnd: o,
            } = this.getProps(),
            a = this.constraints || {};
          return Promise.all(
            nN((o) => {
              if (!n0(o, e, this.currentDirection)) return;
              let l = (a && a[o]) || {};
              r && (l = { min: 0, max: 0 });
              let h = {
                type: "inertia",
                velocity: i ? t[o] : 0,
                bounceStiffness: n ? 200 : 1e6,
                bounceDamping: n ? 40 : 1e7,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...s,
                ...l,
              };
              return this.startAxisValueAnimation(o, h);
            }),
          ).then(o);
        }
        startAxisValueAnimation(t, e) {
          let i = this.getAxisMotionValue(t);
          return (is(this.visualElement, t), i.start(nf(t, i, 0, e, this.visualElement, !1)));
        }
        stopAnimation() {
          nN((t) => this.getAxisMotionValue(t).stop());
        }
        pauseAnimation() {
          nN((t) => {
            var e;
            return null == (e = this.getAxisMotionValue(t).animation) ? void 0 : e.pause();
          });
        }
        getAnimationState(t) {
          var e;
          return null == (e = this.getAxisMotionValue(t).animation) ? void 0 : e.state;
        }
        getAxisMotionValue(t) {
          let e = "_drag".concat(t.toUpperCase()),
            i = this.visualElement.getProps();
          return i[e] || this.visualElement.getValue(t, (i.initial ? i.initial[t] : void 0) || 0);
        }
        snapToCursor(t) {
          nN((e) => {
            let { drag: i } = this.getProps();
            if (!n0(e, i, this.currentDirection)) return;
            let { projection: n } = this.visualElement,
              s = this.getAxisMotionValue(e);
            if (n && n.layout) {
              let { min: i, max: r } = n.layout.layoutBox[e];
              s.set(t[e] - b(i, r, 0.5));
            }
          });
        }
        scalePositionWithinConstraints() {
          if (!this.visualElement.current) return;
          let { drag: t, dragConstraints: e } = this.getProps(),
            { projection: i } = this.visualElement;
          if (!e4(e) || !i || !this.constraints) return;
          this.stopAnimation();
          let n = { x: 0, y: 0 };
          nN((t) => {
            let e = this.getAxisMotionValue(t);
            if (e && !1 !== this.constraints) {
              let i = e.get();
              n[t] = (function (t, e) {
                let i = 0.5,
                  n = nj(t),
                  s = nj(e);
                return (
                  s > n
                    ? (i = iQ(e.min, e.max - n, t.min))
                    : n > s && (i = iQ(t.min, t.max - s, e.min)),
                  O(0, 1, i)
                );
              })({ min: i, max: i }, this.constraints[t]);
            }
          });
          let { transformTemplate: s } = this.visualElement.getProps();
          ((this.visualElement.current.style.transform = s ? s({}, "") : "none"),
            i.root && i.root.updateScroll(),
            i.updateLayout(),
            this.resolveConstraints(),
            nN((e) => {
              if (!n0(e, t, null)) return;
              let i = this.getAxisMotionValue(e),
                { min: s, max: r } = this.constraints[e];
              i.set(b(s, r, n[e]));
            }));
        }
        addListeners() {
          if (!this.visualElement.current) return;
          nQ.set(this.visualElement, this);
          let t = nL(this.visualElement.current, "pointerdown", (t) => {
              let { drag: e, dragListener: i = !0 } = this.getProps();
              e && i && this.start(t);
            }),
            e = () => {
              let { dragConstraints: t } = this.getProps();
              e4(t) && t.current && (this.constraints = this.resolveRefConstraints());
            },
            { projection: i } = this.visualElement,
            n = i.addEventListener("measure", e);
          (i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), tu.read(e));
          let s = nD(window, "resize", () => this.scalePositionWithinConstraints()),
            r = i.addEventListener("didUpdate", (t) => {
              let { delta: e, hasLayoutChanged: i } = t;
              this.isDragging &&
                i &&
                (nN((t) => {
                  let i = this.getAxisMotionValue(t);
                  i && ((this.originPoint[t] += e[t].translate), i.set(i.get() + e[t].translate));
                }),
                this.visualElement.render());
            });
          return () => {
            (s(), t(), n(), r && r());
          };
        }
        getProps() {
          let t = this.visualElement.getProps(),
            {
              drag: e = !1,
              dragDirectionLock: i = !1,
              dragPropagation: n = !1,
              dragConstraints: s = !1,
              dragElastic: r = 0.35,
              dragMomentum: o = !0,
            } = t;
          return {
            ...t,
            drag: e,
            dragDirectionLock: i,
            dragPropagation: n,
            dragConstraints: s,
            dragElastic: r,
            dragMomentum: o,
          };
        }
        constructor(t) {
          ((this.openDragLock = null),
            (this.isDragging = !1),
            (this.currentDirection = null),
            (this.originPoint = { x: 0, y: 0 }),
            (this.constraints = !1),
            (this.hasMutatedConstraints = !1),
            (this.elastic = en()),
            (this.latestPointerEvent = null),
            (this.latestPanInfo = null),
            (this.visualElement = t));
        }
      }
      function n0(t, e, i) {
        return (!0 === e || e === t) && (null === i || i === t);
      }
      class n1 extends nA {
        mount() {
          let { dragControls: t } = this.node.getProps();
          (t && (this.removeGroupControls = t.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || tr));
        }
        unmount() {
          (this.removeGroupControls(), this.removeListeners());
        }
        constructor(t) {
          (super(t),
            (this.removeGroupControls = tr),
            (this.removeListeners = tr),
            (this.controls = new nJ(t)));
        }
      }
      let n2 = (t) => (e, i) => {
        t && tu.postRender(() => t(e, i));
      };
      class n3 extends nA {
        onPointerDown(t) {
          this.session = new nz(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: nW(this.node),
          });
        }
        createPanHandlers() {
          let { onPanSessionStart: t, onPanStart: e, onPan: i, onPanEnd: n } = this.node.getProps();
          return {
            onSessionStart: n2(t),
            onStart: n2(e),
            onMove: i,
            onEnd: (t, e) => {
              (delete this.session, n && tu.postRender(() => n(t, e)));
            },
          };
        }
        mount() {
          this.removePointerDownListener = nL(this.node.current, "pointerdown", (t) =>
            this.onPointerDown(t),
          );
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          (this.removePointerDownListener(), this.session && this.session.end());
        }
        constructor() {
          (super(...arguments), (this.removePointerDownListener = tr));
        }
      }
      var n5 = i(75601);
      let n4 = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 },
        n9 = !1;
      class n6 extends s.Component {
        componentDidMount() {
          let { visualElement: t, layoutGroup: e, switchLayoutGroup: i, layoutId: n } = this.props,
            { projection: s } = t;
          (s &&
            (e.group && e.group.add(s),
            i && i.register && n && i.register(s),
            n9 && s.root.didUpdate(),
            s.addEventListener("animationComplete", () => {
              this.safeToRemove();
            }),
            s.setOptions({ ...s.options, onExitComplete: () => this.safeToRemove() })),
            (n4.hasEverUpdated = !0));
        }
        getSnapshotBeforeUpdate(t) {
          let { layoutDependency: e, visualElement: i, drag: n, isPresent: s } = this.props,
            { projection: r } = i;
          return (
            r &&
              ((r.isPresent = s),
              (n9 = !0),
              n || t.layoutDependency !== e || void 0 === e || t.isPresent !== s
                ? r.willUpdate()
                : this.safeToRemove(),
              t.isPresent !== s &&
                (s
                  ? r.promote()
                  : r.relegate() ||
                    tu.postRender(() => {
                      let t = r.getStack();
                      (t && t.members.length) || this.safeToRemove();
                    }))),
            null
          );
        }
        componentDidUpdate() {
          let { projection: t } = this.props.visualElement;
          t &&
            (t.root.didUpdate(),
            t6.postRender(() => {
              !t.currentAnimation && t.isLead() && this.safeToRemove();
            }));
        }
        componentWillUnmount() {
          let { visualElement: t, layoutGroup: e, switchLayoutGroup: i } = this.props,
            { projection: n } = t;
          ((n9 = !0),
            n &&
              (n.scheduleCheckAfterUnmount(),
              e && e.group && e.group.remove(n),
              i && i.deregister && i.deregister(n)));
        }
        safeToRemove() {
          let { safeToRemove: t } = this.props;
          t && t();
        }
        render() {
          return null;
        }
      }
      function n7(t) {
        let [e, i] = (0, n5.xQ)(),
          n = (0, s.useContext)(eW.L);
        return (0, eN.jsx)(n6, {
          ...t,
          layoutGroup: n,
          switchLayoutGroup: (0, s.useContext)(e6),
          isPresent: e,
          safeToRemove: i,
        });
      }
      var n8 = i(73142);
      function st(t) {
        return (0, n8.G)(t) && "ownerSVGElement" in t;
      }
      let se = (t, e) => t.depth - e.depth;
      class si {
        add(t) {
          (tQ(this.children, t), (this.isDirty = !0));
        }
        remove(t) {
          (tJ(this.children, t), (this.isDirty = !0));
        }
        forEach(t) {
          (this.isDirty && this.children.sort(se), (this.isDirty = !1), this.children.forEach(t));
        }
        constructor() {
          ((this.children = []), (this.isDirty = !1));
        }
      }
      let sn = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
        ss = sn.length,
        sr = (t) => ("string" == typeof t ? parseFloat(t) : t),
        so = (t) => "number" == typeof t || H.test(t);
      function sa(t, e) {
        return void 0 !== t[e] ? t[e] : t.borderRadius;
      }
      let sl = su(0, 0.5, i$),
        sh = su(0.5, 0.95, tr);
      function su(t, e, i) {
        return (n) => (n < t ? 0 : n > e ? 1 : i(iQ(t, e, n)));
      }
      function sd(t, e) {
        ((t.min = e.min), (t.max = e.max));
      }
      function sc(t, e) {
        (sd(t.x, e.x), sd(t.y, e.y));
      }
      function sp(t, e) {
        ((t.translate = e.translate),
          (t.scale = e.scale),
          (t.originPoint = e.originPoint),
          (t.origin = e.origin));
      }
      function sm(t, e, i, n, s) {
        return (
          (t -= e),
          (t = n + (1 / i) * (t - n)),
          void 0 !== s && (t = n + (1 / s) * (t - n)),
          t
        );
      }
      function sf(t, e, i, n, s) {
        let [r, o, a] = i;
        !(function (t) {
          let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
            n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0.5,
            s = arguments.length > 4 ? arguments[4] : void 0,
            r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : t,
            o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : t;
          if (
            (z.test(e) && ((e = parseFloat(e)), (e = b(o.min, o.max, e / 100) - o.min)),
            "number" != typeof e)
          )
            return;
          let a = b(r.min, r.max, n);
          (t === r && (a -= e), (t.min = sm(t.min, e, i, a, s)), (t.max = sm(t.max, e, i, a, s)));
        })(t, e[r], e[o], e[a], e.scale, n, s);
      }
      let sv = ["x", "scaleX", "originX"],
        sg = ["y", "scaleY", "originY"];
      function sy(t, e, i, n) {
        (sf(t.x, e, sv, i ? i.x : void 0, n ? n.x : void 0),
          sf(t.y, e, sg, i ? i.y : void 0, n ? n.y : void 0));
      }
      function sx(t) {
        return 0 === t.translate && 1 === t.scale;
      }
      function sT(t) {
        return sx(t.x) && sx(t.y);
      }
      function sw(t, e) {
        return t.min === e.min && t.max === e.max;
      }
      function sP(t, e) {
        return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
      }
      function sb(t, e) {
        return sP(t.x, e.x) && sP(t.y, e.y);
      }
      function sS(t) {
        return nj(t.x) / nj(t.y);
      }
      function sA(t, e) {
        return (
          t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint
        );
      }
      class sM {
        add(t) {
          (tQ(this.members, t), t.scheduleRender());
        }
        remove(t) {
          if (
            (tJ(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead)
          ) {
            let t = this.members[this.members.length - 1];
            t && this.promote(t);
          }
        }
        relegate(t) {
          let e,
            i = this.members.findIndex((e) => t === e);
          if (0 === i) return !1;
          for (let t = i; t >= 0; t--) {
            let i = this.members[t];
            if (!1 !== i.isPresent) {
              e = i;
              break;
            }
          }
          return !!e && (this.promote(e), !0);
        }
        promote(t, e) {
          let i = this.lead;
          if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
            (i.instance && i.scheduleRender(),
              t.scheduleRender(),
              (t.resumeFrom = i),
              e && (t.resumeFrom.preserveOpacity = !0),
              i.snapshot &&
                ((t.snapshot = i.snapshot),
                (t.snapshot.latestValues = i.animationValues || i.latestValues)),
              t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
            let { crossfade: n } = t.options;
            !1 === n && i.hide();
          }
        }
        exitAnimationComplete() {
          this.members.forEach((t) => {
            let { options: e, resumingFrom: i } = t;
            (e.onExitComplete && e.onExitComplete(),
              i && i.options.onExitComplete && i.options.onExitComplete());
          });
        }
        scheduleRender() {
          this.members.forEach((t) => {
            t.instance && t.scheduleRender(!1);
          });
        }
        removeLeadSnapshot() {
          this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
        }
        constructor() {
          this.members = [];
        }
      }
      let sV = { nodes: 0, calculatedTargetDeltas: 0, calculatedProjections: 0 },
        sE = ["", "X", "Y", "Z"],
        sC = 0;
      function sD(t, e, i, n) {
        let { latestValues: s } = e;
        s[t] && ((i[t] = s[t]), e.setStaticValue(t, 0), n && (n[t] = 0));
      }
      function sk(t) {
        let {
          attachResizeListener: e,
          defaultParent: i,
          measureScroll: n,
          checkIsScrollRoot: s,
          resetTransform: r,
        } = t;
        return class {
          addEventListener(t, e) {
            return (
              this.eventHandlers.has(t) || this.eventHandlers.set(t, new t0()),
              this.eventHandlers.get(t).add(e)
            );
          }
          notifyListeners(t) {
            for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
              i[n - 1] = arguments[n];
            let s = this.eventHandlers.get(t);
            s && s.notify(...i);
          }
          hasListeners(t) {
            return this.eventHandlers.has(t);
          }
          mount(t) {
            if (this.instance) return;
            ((this.isSVG = st(t) && !(st(t) && "svg" === t.tagName)), (this.instance = t));
            let { layoutId: i, layout: n, visualElement: s } = this.options;
            if (
              (s && !s.current && s.mount(t),
              this.root.nodes.add(this),
              this.parent && this.parent.children.add(this),
              this.root.hasTreeAnimated && (n || i) && (this.isLayoutDirty = !0),
              e)
            ) {
              let i,
                n = 0,
                s = () => (this.root.updateBlockedByResize = !1);
              (tu.read(() => {
                n = window.innerWidth;
              }),
                e(t, () => {
                  let t = window.innerWidth;
                  t !== n &&
                    ((n = t),
                    (this.root.updateBlockedByResize = !0),
                    i && i(),
                    (i = (function (t, e) {
                      let i = t2.now(),
                        n = (e) => {
                          let { timestamp: s } = e,
                            r = s - i;
                          r >= 250 && (td(n), t(r - 250));
                        };
                      return (tu.setup(n, !0), () => td(n));
                    })(s, 250)),
                    n4.hasAnimatedSinceResize &&
                      ((n4.hasAnimatedSinceResize = !1), this.nodes.forEach(sN)));
                }));
            }
            (i && this.root.registerSharedNode(i, this),
              !1 !== this.options.animate &&
                s &&
                (i || n) &&
                this.addEventListener("didUpdate", (t) => {
                  let { delta: e, hasLayoutChanged: i, hasRelativeLayoutChanged: n, layout: r } = t;
                  if (this.isTreeAnimationBlocked()) {
                    ((this.target = void 0), (this.relativeTarget = void 0));
                    return;
                  }
                  let o = this.options.transition || s.getDefaultTransition() || sq,
                    { onLayoutAnimationStart: a, onLayoutAnimationComplete: l } = s.getProps(),
                    h = !this.targetLayout || !sb(this.targetLayout, r),
                    u = !i && n;
                  if (
                    this.options.layoutRoot ||
                    this.resumeFrom ||
                    u ||
                    (i && (h || !this.currentAnimation))
                  ) {
                    this.resumeFrom &&
                      ((this.resumingFrom = this.resumeFrom),
                      (this.resumingFrom.resumingFrom = void 0));
                    let t = { ...ie(o, "layout"), onPlay: a, onComplete: l };
                    ((s.shouldReduceMotion || this.options.layoutRoot) &&
                      ((t.delay = 0), (t.type = !1)),
                      this.startAnimation(t),
                      this.setAnimationOrigin(e, u));
                  } else
                    (i || sN(this),
                      this.isLead() &&
                        this.options.onExitComplete &&
                        this.options.onExitComplete());
                  this.targetLayout = r;
                }));
          }
          unmount() {
            (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
            let t = this.getStack();
            (t && t.remove(this),
              this.parent && this.parent.children.delete(this),
              (this.instance = void 0),
              this.eventHandlers.clear(),
              td(this.updateProjection));
          }
          blockUpdate() {
            this.updateManuallyBlocked = !0;
          }
          unblockUpdate() {
            this.updateManuallyBlocked = !1;
          }
          isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
          }
          isTreeAnimationBlocked() {
            return (
              this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1
            );
          }
          startUpdate() {
            !this.isUpdateBlocked() &&
              ((this.isUpdating = !0), this.nodes && this.nodes.forEach(sz), this.animationId++);
          }
          getTransformTemplate() {
            let { visualElement: t } = this.options;
            return t && t.getProps().transformTemplate;
          }
          willUpdate() {
            let t = !(arguments.length > 0) || void 0 === arguments[0] || arguments[0];
            if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
              this.options.onExitComplete && this.options.onExitComplete();
              return;
            }
            if (
              (window.MotionCancelOptimisedAnimation &&
                !this.hasCheckedOptimisedAppear &&
                (function t(e) {
                  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
                  let { visualElement: i } = e.options;
                  if (!i) return;
                  let n = i.props[e9];
                  if (window.MotionHasOptimisedAnimation(n, "transform")) {
                    let { layout: t, layoutId: i } = e.options;
                    window.MotionCancelOptimisedAnimation(n, "transform", tu, !(t || i));
                  }
                  let { parent: s } = e;
                  s && !s.hasCheckedOptimisedAppear && t(s);
                })(this),
              this.root.isUpdating || this.root.startUpdate(),
              this.isLayoutDirty)
            )
              return;
            this.isLayoutDirty = !0;
            for (let t = 0; t < this.path.length; t++) {
              let e = this.path[t];
              ((e.shouldResetTransform = !0),
                e.updateScroll("snapshot"),
                e.options.layoutRoot && e.willUpdate(!1));
            }
            let { layoutId: e, layout: i } = this.options;
            if (void 0 === e && !i) return;
            let n = this.getTransformTemplate();
            ((this.prevTransformTemplateValue = n ? n(this.latestValues, "") : void 0),
              this.updateSnapshot(),
              t && this.notifyListeners("willUpdate"));
          }
          update() {
            if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
              (this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(sO));
              return;
            }
            if (this.animationId <= this.animationCommitId) return void this.nodes.forEach(sI);
            ((this.animationCommitId = this.animationId),
              this.isUpdating
                ? ((this.isUpdating = !1),
                  this.nodes.forEach(sU),
                  this.nodes.forEach(sR),
                  this.nodes.forEach(sL))
                : this.nodes.forEach(sI),
              this.clearAllSnapshots());
            let t = t2.now();
            ((tc.delta = O(0, 1e3 / 60, t - tc.timestamp)),
              (tc.timestamp = t),
              (tc.isProcessing = !0),
              tp.update.process(tc),
              tp.preRender.process(tc),
              tp.render.process(tc),
              (tc.isProcessing = !1));
          }
          didUpdate() {
            this.updateScheduled || ((this.updateScheduled = !0), t6.read(this.scheduleUpdate));
          }
          clearAllSnapshots() {
            (this.nodes.forEach(sB), this.sharedNodes.forEach(sH));
          }
          scheduleUpdateProjection() {
            this.projectionUpdateScheduled ||
              ((this.projectionUpdateScheduled = !0), tu.preRender(this.updateProjection, !1, !0));
          }
          scheduleCheckAfterUnmount() {
            tu.postRender(() => {
              this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
            });
          }
          updateSnapshot() {
            !this.snapshot &&
              this.instance &&
              ((this.snapshot = this.measure()),
              !this.snapshot ||
                nj(this.snapshot.measuredBox.x) ||
                nj(this.snapshot.measuredBox.y) ||
                (this.snapshot = void 0));
          }
          updateLayout() {
            if (
              !this.instance ||
              (this.updateScroll(),
              !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
            )
              return;
            if (this.resumeFrom && !this.resumeFrom.instance)
              for (let t = 0; t < this.path.length; t++) this.path[t].updateScroll();
            let t = this.layout;
            ((this.layout = this.measure(!1)),
              this.layoutVersion++,
              (this.layoutCorrected = en()),
              (this.isLayoutDirty = !1),
              (this.projectionDelta = void 0),
              this.notifyListeners("measure", this.layout.layoutBox));
            let { visualElement: e } = this.options;
            e && e.notify("LayoutMeasure", this.layout.layoutBox, t ? t.layoutBox : void 0);
          }
          updateScroll() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "measure",
              e = !!(this.options.layoutScroll && this.instance);
            if (
              (this.scroll &&
                this.scroll.animationId === this.root.animationId &&
                this.scroll.phase === t &&
                (e = !1),
              e && this.instance)
            ) {
              let e = s(this.instance);
              this.scroll = {
                animationId: this.root.animationId,
                phase: t,
                isRoot: e,
                offset: n(this.instance),
                wasRoot: this.scroll ? this.scroll.isRoot : e,
              };
            }
          }
          resetTransform() {
            if (!r) return;
            let t =
                this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
              e = this.projectionDelta && !sT(this.projectionDelta),
              i = this.getTransformTemplate(),
              n = i ? i(this.latestValues, "") : void 0,
              s = n !== this.prevTransformTemplateValue;
            t &&
              this.instance &&
              (e || M(this.latestValues) || s) &&
              (r(this.instance, n), (this.shouldResetTransform = !1), this.scheduleRender());
          }
          measure() {
            var t;
            let e = !(arguments.length > 0) || void 0 === arguments[0] || arguments[0],
              i = this.measurePageBox(),
              n = this.removeElementScroll(i);
            return (
              e && (n = this.removeTransform(n)),
              sZ((t = n).x),
              sZ(t.y),
              {
                animationId: this.root.animationId,
                measuredBox: i,
                layoutBox: n,
                latestValues: {},
                source: this.id,
              }
            );
          }
          measurePageBox() {
            var t;
            let { visualElement: e } = this.options;
            if (!e) return en();
            let i = e.measureViewportBox();
            if (!((null == (t = this.scroll) ? void 0 : t.wasRoot) || this.path.some(sJ))) {
              let { scroll: t } = this.root;
              t && (k(i.x, t.offset.x), k(i.y, t.offset.y));
            }
            return i;
          }
          removeElementScroll(t) {
            var e;
            let i = en();
            if ((sc(i, t), null == (e = this.scroll) ? void 0 : e.wasRoot)) return i;
            for (let e = 0; e < this.path.length; e++) {
              let n = this.path[e],
                { scroll: s, options: r } = n;
              n !== this.root &&
                s &&
                r.layoutScroll &&
                (s.wasRoot && sc(i, t), k(i.x, s.offset.x), k(i.y, s.offset.y));
            }
            return i;
          }
          applyTransform(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              i = en();
            sc(i, t);
            for (let t = 0; t < this.path.length; t++) {
              let n = this.path[t];
              (!e &&
                n.options.layoutScroll &&
                n.scroll &&
                n !== n.root &&
                L(i, { x: -n.scroll.offset.x, y: -n.scroll.offset.y }),
                M(n.latestValues) && L(i, n.latestValues));
            }
            return (M(this.latestValues) && L(i, this.latestValues), i);
          }
          removeTransform(t) {
            let e = en();
            sc(e, t);
            for (let t = 0; t < this.path.length; t++) {
              let i = this.path[t];
              if (!i.instance || !M(i.latestValues)) continue;
              A(i.latestValues) && i.updateSnapshot();
              let n = en();
              (sc(n, i.measurePageBox()),
                sy(e, i.latestValues, i.snapshot ? i.snapshot.layoutBox : void 0, n));
            }
            return (M(this.latestValues) && sy(e, this.latestValues), e);
          }
          setTargetDelta(t) {
            ((this.targetDelta = t),
              this.root.scheduleUpdateProjection(),
              (this.isProjectionDirty = !0));
          }
          setOptions(t) {
            this.options = {
              ...this.options,
              ...t,
              crossfade: void 0 === t.crossfade || t.crossfade,
            };
          }
          clearMeasurements() {
            ((this.scroll = void 0),
              (this.layout = void 0),
              (this.snapshot = void 0),
              (this.prevTransformTemplateValue = void 0),
              (this.targetDelta = void 0),
              (this.target = void 0),
              (this.isLayoutDirty = !1));
          }
          forceRelativeParentToResolveTarget() {
            this.relativeParent &&
              this.relativeParent.resolvedRelativeTargetAt !== tc.timestamp &&
              this.relativeParent.resolveTargetDelta(!0);
          }
          resolveTargetDelta() {
            var t, e, i, n;
            let s = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              r = this.getLead();
            (this.isProjectionDirty || (this.isProjectionDirty = r.isProjectionDirty),
              this.isTransformDirty || (this.isTransformDirty = r.isTransformDirty),
              this.isSharedProjectionDirty ||
                (this.isSharedProjectionDirty = r.isSharedProjectionDirty));
            let o = !!this.resumingFrom || this !== r;
            if (!(
              s ||
              (o && this.isSharedProjectionDirty) ||
              this.isProjectionDirty ||
              (null == (t = this.parent) ? void 0 : t.isProjectionDirty) ||
              this.attemptToResolveRelativeTarget ||
              this.root.updateBlockedByResize
            ))
              return;
            let { layout: a, layoutId: l } = this.options;
            if (!this.layout || !(a || l)) return;
            this.resolvedRelativeTargetAt = tc.timestamp;
            let h = this.getClosestProjectingParent();
            (h &&
              this.linkedParentVersion !== h.layoutVersion &&
              !h.options.layoutRoot &&
              this.removeRelativeTarget(),
              this.targetDelta ||
                this.relativeTarget ||
                (h && h.layout
                  ? this.createRelativeTarget(h, this.layout.layoutBox, h.layout.layoutBox)
                  : this.removeRelativeTarget()),
              (this.relativeTarget || this.targetDelta) &&
                ((this.target || ((this.target = en()), (this.targetWithTransforms = en())),
                this.relativeTarget &&
                  this.relativeTargetOrigin &&
                  this.relativeParent &&
                  this.relativeParent.target)
                  ? (this.forceRelativeParentToResolveTarget(),
                    (e = this.target),
                    (i = this.relativeTarget),
                    (n = this.relativeParent.target),
                    nO(e.x, i.x, n.x),
                    nO(e.y, i.y, n.y))
                  : this.targetDelta
                    ? (this.resumingFrom
                        ? (this.target = this.applyTransform(this.layout.layoutBox))
                        : sc(this.target, this.layout.layoutBox),
                      D(this.target, this.targetDelta))
                    : sc(this.target, this.layout.layoutBox),
                this.attemptToResolveRelativeTarget &&
                  ((this.attemptToResolveRelativeTarget = !1),
                  h &&
                  !!h.resumingFrom == !!this.resumingFrom &&
                  !h.options.layoutScroll &&
                  h.target &&
                  1 !== this.animationProgress
                    ? this.createRelativeTarget(h, this.target, h.target)
                    : (this.relativeParent = this.relativeTarget = void 0)),
                tl.value && sV.calculatedTargetDeltas++));
          }
          getClosestProjectingParent() {
            if (!(!this.parent || A(this.parent.latestValues) || V(this.parent.latestValues)))
              if (this.parent.isProjecting()) return this.parent;
              else return this.parent.getClosestProjectingParent();
          }
          isProjecting() {
            return !!(
              (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
              this.layout
            );
          }
          createRelativeTarget(t, e, i) {
            ((this.relativeParent = t),
              (this.linkedParentVersion = t.layoutVersion),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = en()),
              (this.relativeTargetOrigin = en()),
              nU(this.relativeTargetOrigin, e, i),
              sc(this.relativeTarget, this.relativeTargetOrigin));
          }
          removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = void 0;
          }
          calcProjection() {
            var t;
            let e = this.getLead(),
              i = !!this.resumingFrom || this !== e,
              n = !0;
            if (
              ((this.isProjectionDirty ||
                (null == (t = this.parent) ? void 0 : t.isProjectionDirty)) &&
                (n = !1),
              i && (this.isSharedProjectionDirty || this.isTransformDirty) && (n = !1),
              this.resolvedRelativeTargetAt === tc.timestamp && (n = !1),
              n)
            )
              return;
            let { layout: s, layoutId: r } = this.options;
            if (
              ((this.isTreeAnimating = !!(
                (this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation
              )),
              this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
              !this.layout || !(s || r))
            )
              return;
            sc(this.layoutCorrected, this.layout.layoutBox);
            let o = this.treeScale.x,
              a = this.treeScale.y;
            (!(function (t, e, i) {
              let n,
                s,
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                o = i.length;
              if (o) {
                e.x = e.y = 1;
                for (let a = 0; a < o; a++) {
                  s = (n = i[a]).projectionDelta;
                  let { visualElement: o } = n.options;
                  (!o || !o.props.style || "contents" !== o.props.style.display) &&
                    (r &&
                      n.options.layoutScroll &&
                      n.scroll &&
                      n !== n.root &&
                      L(t, { x: -n.scroll.offset.x, y: -n.scroll.offset.y }),
                    s && ((e.x *= s.x.scale), (e.y *= s.y.scale), D(t, s)),
                    r && M(n.latestValues) && L(t, n.latestValues));
                }
                (e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
                  e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1));
              }
            })(this.layoutCorrected, this.treeScale, this.path, i),
              e.layout &&
                !e.target &&
                (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
                ((e.target = e.layout.layoutBox), (e.targetWithTransforms = en())));
            let { target: l } = e;
            if (!l) {
              this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
              return;
            }
            (this.projectionDelta && this.prevProjectionDelta
              ? (sp(this.prevProjectionDelta.x, this.projectionDelta.x),
                sp(this.prevProjectionDelta.y, this.projectionDelta.y))
              : this.createProjectionDeltas(),
              nB(this.projectionDelta, this.layoutCorrected, l, this.latestValues),
              (this.treeScale.x === o &&
                this.treeScale.y === a &&
                sA(this.projectionDelta.x, this.prevProjectionDelta.x) &&
                sA(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
                ((this.hasProjected = !0),
                this.scheduleRender(),
                this.notifyListeners("projectionUpdate", l)),
              tl.value && sV.calculatedProjections++);
          }
          hide() {
            this.isVisible = !1;
          }
          show() {
            this.isVisible = !0;
          }
          scheduleRender() {
            var t;
            let e = !(arguments.length > 0) || void 0 === arguments[0] || arguments[0];
            if ((null == (t = this.options.visualElement) || t.scheduleRender(), e)) {
              let t = this.getStack();
              t && t.scheduleRender();
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
          }
          createProjectionDeltas() {
            ((this.prevProjectionDelta = ee()),
              (this.projectionDelta = ee()),
              (this.projectionDeltaWithTransform = ee()));
          }
          setAnimationOrigin(t) {
            let e,
              i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = this.snapshot,
              s = n ? n.latestValues : {},
              r = { ...this.latestValues },
              o = ee();
            ((this.relativeParent && this.relativeParent.options.layoutRoot) ||
              (this.relativeTarget = this.relativeTargetOrigin = void 0),
              (this.attemptToResolveRelativeTarget = !i));
            let a = en(),
              l = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
              h = this.getStack(),
              u = !h || h.members.length <= 1,
              d = !!(l && !u && !0 === this.options.crossfade && !this.path.some(s$));
            ((this.animationProgress = 0),
              (this.mixTargetDelta = (i) => {
                let n = i / 1e3;
                if (
                  (sX(o.x, t.x, n),
                  sX(o.y, t.y, n),
                  this.setTargetDelta(o),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.layout &&
                    this.relativeParent &&
                    this.relativeParent.layout)
                ) {
                  var h, c, p, m, f, v;
                  (nU(a, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
                    (p = this.relativeTarget),
                    (m = this.relativeTargetOrigin),
                    (f = a),
                    (v = n),
                    sK(p.x, m.x, f.x, v),
                    sK(p.y, m.y, f.y, v),
                    e &&
                      ((h = this.relativeTarget), (c = e), sw(h.x, c.x) && sw(h.y, c.y)) &&
                      (this.isProjectionDirty = !1),
                    e || (e = en()),
                    sc(e, this.relativeTarget));
                }
                (l &&
                  ((this.animationValues = r),
                  (function (t, e, i, n, s, r) {
                    var o, a, l, h;
                    s
                      ? ((t.opacity = b(0, null != (o = i.opacity) ? o : 1, sl(n))),
                        (t.opacityExit = b(null != (a = e.opacity) ? a : 1, 0, sh(n))))
                      : r &&
                        (t.opacity = b(
                          null != (l = e.opacity) ? l : 1,
                          null != (h = i.opacity) ? h : 1,
                          n,
                        ));
                    for (let s = 0; s < ss; s++) {
                      let r = "border".concat(sn[s], "Radius"),
                        o = sa(e, r),
                        a = sa(i, r);
                      (void 0 !== o || void 0 !== a) &&
                        (o || (o = 0),
                        a || (a = 0),
                        0 === o || 0 === a || so(o) === so(a)
                          ? ((t[r] = Math.max(b(sr(o), sr(a), n), 0)),
                            (z.test(a) || z.test(o)) && (t[r] += "%"))
                          : (t[r] = a));
                    }
                    (e.rotate || i.rotate) && (t.rotate = b(e.rotate || 0, i.rotate || 0, n));
                  })(r, s, this.latestValues, n, d, u)),
                  this.root.scheduleUpdateProjection(),
                  this.scheduleRender(),
                  (this.animationProgress = n));
              }),
              this.mixTargetDelta(1e3 * !!this.options.layoutRoot));
          }
          startAnimation(t) {
            var e, i, n;
            (this.notifyListeners("animationStart"),
              null == (e = this.currentAnimation) || e.stop(),
              null == (n = this.resumingFrom) || null == (i = n.currentAnimation) || i.stop(),
              this.pendingAnimation &&
                (td(this.pendingAnimation), (this.pendingAnimation = void 0)),
              (this.pendingAnimation = tu.update(() => {
                ((n4.hasAnimatedSinceResize = !0),
                  ih.layout++,
                  this.motionValue || (this.motionValue = t4(0)),
                  (this.currentAnimation = (function (t, e, i) {
                    let n = F(t) ? t : t4(t);
                    return (n.start(nf("", n, e, i)), n.animation);
                  })(this.motionValue, [0, 1e3], {
                    ...t,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: (e) => {
                      (this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e));
                    },
                    onStop: () => {
                      ih.layout--;
                    },
                    onComplete: () => {
                      (ih.layout--, t.onComplete && t.onComplete(), this.completeAnimation());
                    },
                  })),
                  this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                  (this.pendingAnimation = void 0));
              })));
          }
          completeAnimation() {
            this.resumingFrom &&
              ((this.resumingFrom.currentAnimation = void 0),
              (this.resumingFrom.preserveOpacity = void 0));
            let t = this.getStack();
            (t && t.exitAnimationComplete(),
              (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
              this.notifyListeners("animationComplete"));
          }
          finishAnimation() {
            (this.currentAnimation &&
              (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()),
              this.completeAnimation());
          }
          applyTransformsToTarget() {
            let t = this.getLead(),
              { targetWithTransforms: e, target: i, layout: n, latestValues: s } = t;
            if (e && i && n) {
              if (
                this !== t &&
                this.layout &&
                n &&
                sQ(this.options.animationType, this.layout.layoutBox, n.layoutBox)
              ) {
                i = this.target || en();
                let e = nj(this.layout.layoutBox.x);
                ((i.x.min = t.target.x.min), (i.x.max = i.x.min + e));
                let n = nj(this.layout.layoutBox.y);
                ((i.y.min = t.target.y.min), (i.y.max = i.y.min + n));
              }
              (sc(e, i),
                L(e, s),
                nB(this.projectionDeltaWithTransform, this.layoutCorrected, e, s));
            }
          }
          registerSharedNode(t, e) {
            (this.sharedNodes.has(t) || this.sharedNodes.set(t, new sM()),
              this.sharedNodes.get(t).add(e));
            let i = e.options.initialPromotionConfig;
            e.promote({
              transition: i ? i.transition : void 0,
              preserveFollowOpacity:
                i && i.shouldPreserveFollowOpacity ? i.shouldPreserveFollowOpacity(e) : void 0,
            });
          }
          isLead() {
            let t = this.getStack();
            return !t || t.lead === this;
          }
          getLead() {
            var t;
            let { layoutId: e } = this.options;
            return (e && (null == (t = this.getStack()) ? void 0 : t.lead)) || this;
          }
          getPrevLead() {
            var t;
            let { layoutId: e } = this.options;
            return e ? (null == (t = this.getStack()) ? void 0 : t.prevLead) : void 0;
          }
          getStack() {
            let { layoutId: t } = this.options;
            if (t) return this.root.sharedNodes.get(t);
          }
          promote() {
            let {
                needsReset: t,
                transition: e,
                preserveFollowOpacity: i,
              } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = this.getStack();
            (n && n.promote(this, i),
              t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
              e && this.setOptions({ transition: e }));
          }
          relegate() {
            let t = this.getStack();
            return !!t && t.relegate(this);
          }
          resetSkewAndRotation() {
            let { visualElement: t } = this.options;
            if (!t) return;
            let e = !1,
              { latestValues: i } = t;
            if (
              ((i.z || i.rotate || i.rotateX || i.rotateY || i.rotateZ || i.skewX || i.skewY) &&
                (e = !0),
              !e)
            )
              return;
            let n = {};
            i.z && sD("z", t, n, this.animationValues);
            for (let e = 0; e < sE.length; e++)
              (sD("rotate".concat(sE[e]), t, n, this.animationValues),
                sD("skew".concat(sE[e]), t, n, this.animationValues));
            for (let e in (t.render(), n))
              (t.setStaticValue(e, n[e]), this.animationValues && (this.animationValues[e] = n[e]));
            t.scheduleRender();
          }
          applyProjectionStyles(t, e) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) {
              t.visibility = "hidden";
              return;
            }
            let i = this.getTransformTemplate();
            if (this.needsReset) {
              ((this.needsReset = !1),
                (t.visibility = ""),
                (t.opacity = ""),
                (t.pointerEvents = e0(null == e ? void 0 : e.pointerEvents) || ""),
                (t.transform = i ? i(this.latestValues, "") : "none"));
              return;
            }
            let n = this.getLead();
            if (!this.projectionDelta || !this.layout || !n.target) {
              (this.options.layoutId &&
                ((t.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1),
                (t.pointerEvents = e0(null == e ? void 0 : e.pointerEvents) || "")),
                this.hasProjected &&
                  !M(this.latestValues) &&
                  ((t.transform = i ? i({}, "") : "none"), (this.hasProjected = !1)));
              return;
            }
            t.visibility = "";
            let s = n.animationValues || n.latestValues;
            this.applyTransformsToTarget();
            let r = (function (t, e, i) {
              let n = "",
                s = t.x.translate / e.x,
                r = t.y.translate / e.y,
                o = (null == i ? void 0 : i.z) || 0;
              if (
                ((s || r || o) &&
                  (n = "translate3d(".concat(s, "px, ").concat(r, "px, ").concat(o, "px) ")),
                (1 !== e.x || 1 !== e.y) &&
                  (n += "scale(".concat(1 / e.x, ", ").concat(1 / e.y, ") ")),
                i)
              ) {
                let {
                  transformPerspective: t,
                  rotate: e,
                  rotateX: s,
                  rotateY: r,
                  skewX: o,
                  skewY: a,
                } = i;
                (t && (n = "perspective(".concat(t, "px) ").concat(n)),
                  e && (n += "rotate(".concat(e, "deg) ")),
                  s && (n += "rotateX(".concat(s, "deg) ")),
                  r && (n += "rotateY(".concat(r, "deg) ")),
                  o && (n += "skewX(".concat(o, "deg) ")),
                  a && (n += "skewY(".concat(a, "deg) ")));
              }
              let a = t.x.scale * e.x,
                l = t.y.scale * e.y;
              return (
                (1 !== a || 1 !== l) && (n += "scale(".concat(a, ", ").concat(l, ")")),
                n || "none"
              );
            })(this.projectionDeltaWithTransform, this.treeScale, s);
            (i && (r = i(s, r)), (t.transform = r));
            let { x: o, y: a } = this.projectionDelta;
            if (
              ((t.transformOrigin = "".concat(100 * o.origin, "% ").concat(100 * a.origin, "% 0")),
              n.animationValues)
            ) {
              var l, h;
              t.opacity =
                n === this
                  ? null != (h = null != (l = s.opacity) ? l : this.latestValues.opacity)
                    ? h
                    : 1
                  : this.preserveOpacity
                    ? this.latestValues.opacity
                    : s.opacityExit;
            } else
              t.opacity =
                n === this
                  ? void 0 !== s.opacity
                    ? s.opacity
                    : ""
                  : void 0 !== s.opacityExit
                    ? s.opacityExit
                    : 0;
            for (let e in eM) {
              if (void 0 === s[e]) continue;
              let { correct: i, applyTo: o, isCSSVariable: a } = eM[e],
                l = "none" === r ? s[e] : i(s[e], n);
              if (o) {
                let e = o.length;
                for (let i = 0; i < e; i++) t[o[i]] = l;
              } else a ? (this.options.visualElement.renderState.vars[e] = l) : (t[e] = l);
            }
            this.options.layoutId &&
              (t.pointerEvents =
                n === this ? e0(null == e ? void 0 : e.pointerEvents) || "" : "none");
          }
          clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
          }
          resetTree() {
            (this.root.nodes.forEach((t) => {
              var e;
              return null == (e = t.currentAnimation) ? void 0 : e.stop();
            }),
              this.root.nodes.forEach(sO),
              this.root.sharedNodes.clear());
          }
          constructor(t = {}, e = null == i ? void 0 : i()) {
            ((this.id = sC++),
              (this.animationId = 0),
              (this.animationCommitId = 0),
              (this.children = new Set()),
              (this.options = {}),
              (this.isTreeAnimating = !1),
              (this.isAnimationBlocked = !1),
              (this.isLayoutDirty = !1),
              (this.isProjectionDirty = !1),
              (this.isSharedProjectionDirty = !1),
              (this.isTransformDirty = !1),
              (this.updateManuallyBlocked = !1),
              (this.updateBlockedByResize = !1),
              (this.isUpdating = !1),
              (this.isSVG = !1),
              (this.needsReset = !1),
              (this.shouldResetTransform = !1),
              (this.hasCheckedOptimisedAppear = !1),
              (this.treeScale = { x: 1, y: 1 }),
              (this.eventHandlers = new Map()),
              (this.hasTreeAnimated = !1),
              (this.layoutVersion = 0),
              (this.updateScheduled = !1),
              (this.scheduleUpdate = () => this.update()),
              (this.projectionUpdateScheduled = !1),
              (this.checkUpdateFailed = () => {
                this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
              }),
              (this.updateProjection = () => {
                ((this.projectionUpdateScheduled = !1),
                  tl.value && (sV.nodes = sV.calculatedTargetDeltas = sV.calculatedProjections = 0),
                  this.nodes.forEach(sj),
                  this.nodes.forEach(sW),
                  this.nodes.forEach(sY),
                  this.nodes.forEach(sF),
                  tl.addProjectionMetrics && tl.addProjectionMetrics(sV));
              }),
              (this.resolvedRelativeTargetAt = 0),
              (this.linkedParentVersion = 0),
              (this.hasProjected = !1),
              (this.isVisible = !0),
              (this.animationProgress = 0),
              (this.sharedNodes = new Map()),
              (this.latestValues = t),
              (this.root = e ? e.root || e : this),
              (this.path = e ? [...e.path, e] : []),
              (this.parent = e),
              (this.depth = e ? e.depth + 1 : 0));
            for (let t = 0; t < this.path.length; t++) this.path[t].shouldResetTransform = !0;
            this.root === this && (this.nodes = new si());
          }
        };
      }
      function sR(t) {
        t.updateLayout();
      }
      function sL(t) {
        var e;
        let i = (null == (e = t.resumeFrom) ? void 0 : e.snapshot) || t.snapshot;
        if (t.isLead() && t.layout && i && t.hasListeners("didUpdate")) {
          let { layoutBox: e, measuredBox: n } = t.layout,
            { animationType: s } = t.options,
            r = i.source !== t.layout.source;
          "size" === s
            ? nN((t) => {
                let n = r ? i.measuredBox[t] : i.layoutBox[t],
                  s = nj(n);
                ((n.min = e[t].min), (n.max = n.min + s));
              })
            : sQ(s, i.layoutBox, e) &&
              nN((n) => {
                let s = r ? i.measuredBox[n] : i.layoutBox[n],
                  o = nj(e[n]);
                ((s.max = s.min + o),
                  t.relativeTarget &&
                    !t.currentAnimation &&
                    ((t.isProjectionDirty = !0),
                    (t.relativeTarget[n].max = t.relativeTarget[n].min + o)));
              });
          let o = ee();
          nB(o, e, i.layoutBox);
          let a = ee();
          r ? nB(a, t.applyTransform(n, !0), i.measuredBox) : nB(a, e, i.layoutBox);
          let l = !sT(o),
            h = !1;
          if (!t.resumeFrom) {
            let n = t.getClosestProjectingParent();
            if (n && !n.resumeFrom) {
              let { snapshot: s, layout: r } = n;
              if (s && r) {
                let o = en();
                nU(o, i.layoutBox, s.layoutBox);
                let a = en();
                (nU(a, e, r.layoutBox),
                  sb(o, a) || (h = !0),
                  n.options.layoutRoot &&
                    ((t.relativeTarget = a), (t.relativeTargetOrigin = o), (t.relativeParent = n)));
              }
            }
          }
          t.notifyListeners("didUpdate", {
            layout: e,
            snapshot: i,
            delta: a,
            layoutDelta: o,
            hasLayoutChanged: l,
            hasRelativeLayoutChanged: h,
          });
        } else if (t.isLead()) {
          let { onExitComplete: e } = t.options;
          e && e();
        }
        t.options.transition = void 0;
      }
      function sj(t) {
        (tl.value && sV.nodes++,
          t.parent &&
            (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
            t.isSharedProjectionDirty ||
              (t.isSharedProjectionDirty = !!(
                t.isProjectionDirty ||
                t.parent.isProjectionDirty ||
                t.parent.isSharedProjectionDirty
              )),
            t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty)));
      }
      function sF(t) {
        t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
      }
      function sB(t) {
        t.clearSnapshot();
      }
      function sO(t) {
        t.clearMeasurements();
      }
      function sI(t) {
        t.isLayoutDirty = !1;
      }
      function sU(t) {
        let { visualElement: e } = t.options;
        (e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
          t.resetTransform());
      }
      function sN(t) {
        (t.finishAnimation(),
          (t.targetDelta = t.relativeTarget = t.target = void 0),
          (t.isProjectionDirty = !0));
      }
      function sW(t) {
        t.resolveTargetDelta();
      }
      function sY(t) {
        t.calcProjection();
      }
      function sz(t) {
        t.resetSkewAndRotation();
      }
      function sH(t) {
        t.removeLeadSnapshot();
      }
      function sX(t, e, i) {
        ((t.translate = b(e.translate, 0, i)),
          (t.scale = b(e.scale, 1, i)),
          (t.origin = e.origin),
          (t.originPoint = e.originPoint));
      }
      function sK(t, e, i, n) {
        ((t.min = b(e.min, i.min, n)), (t.max = b(e.max, i.max, n)));
      }
      function s$(t) {
        return t.animationValues && void 0 !== t.animationValues.opacityExit;
      }
      let sq = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
        sG = (t) =>
          "undefined" != typeof navigator &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().includes(t),
        s_ = sG("applewebkit/") && !sG("chrome/") ? Math.round : tr;
      function sZ(t) {
        ((t.min = s_(t.min)), (t.max = s_(t.max)));
      }
      function sQ(t, e, i) {
        return "position" === t || ("preserve-aspect" === t && !(0.2 >= Math.abs(sS(e) - sS(i))));
      }
      function sJ(t) {
        var e;
        return t !== t.root && (null == (e = t.scroll) ? void 0 : e.wasRoot);
      }
      let s0 = sk({
          attachResizeListener: (t, e) => nD(t, "resize", e),
          measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
          }),
          checkIsScrollRoot: () => !0,
        }),
        s1 = { current: void 0 },
        s2 = sk({
          measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
          defaultParent: () => {
            if (!s1.current) {
              let t = new s0({});
              (t.mount(window), t.setOptions({ layoutScroll: !0 }), (s1.current = t));
            }
            return s1.current;
          },
          resetTransform: (t, e) => {
            t.style.transform = void 0 !== e ? e : "none";
          },
          checkIsScrollRoot: (t) => "fixed" === window.getComputedStyle(t).position,
        });
      function s3(t, e) {
        let i = (function (t, e, i) {
            if (t instanceof EventTarget) return [t];
            if ("string" == typeof t) {
              let e = document,
                i = void 0 ?? e.querySelectorAll(t);
              return i ? Array.from(i) : [];
            }
            return Array.from(t);
          })(t),
          n = new AbortController();
        return [i, { passive: !0, ...e, signal: n.signal }, () => n.abort()];
      }
      function s5(t) {
        return !("touch" === t.pointerType || nC.x || nC.y);
      }
      function s4(t, e, i) {
        let { props: n } = t;
        t.animationState && n.whileHover && t.animationState.setActive("whileHover", "Start" === i);
        let s = n["onHover" + i];
        s && tu.postRender(() => s(e, nR(e)));
      }
      class s9 extends nA {
        mount() {
          let { current: t } = this.node;
          t &&
            (this.unmount = (function (t, e, i = {}) {
              let [n, s, r] = s3(t, i),
                o = (t) => {
                  if (!s5(t)) return;
                  let { target: i } = t,
                    n = e(i, t);
                  if ("function" != typeof n || !i) return;
                  let r = (t) => {
                    s5(t) && (n(t), i.removeEventListener("pointerleave", r));
                  };
                  i.addEventListener("pointerleave", r, s);
                };
              return (
                n.forEach((t) => {
                  t.addEventListener("pointerenter", o, s);
                }),
                r
              );
            })(t, (t, e) => (s4(this.node, e, "Start"), (t) => s4(this.node, t, "End"))));
        }
        unmount() {}
      }
      class s6 extends nA {
        onFocus() {
          let t = !1;
          try {
            t = this.node.current.matches(":focus-visible");
          } catch (e) {
            t = !0;
          }
          t &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !0), (this.isActive = !0));
        }
        onBlur() {
          this.isActive &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !1), (this.isActive = !1));
        }
        mount() {
          this.unmount = ia(
            nD(this.node.current, "focus", () => this.onFocus()),
            nD(this.node.current, "blur", () => this.onBlur()),
          );
        }
        unmount() {}
        constructor() {
          (super(...arguments), (this.isActive = !1));
        }
      }
      var s7 = i(81402);
      let s8 = (t, e) => !!e && (t === e || s8(t, e.parentElement)),
        rt = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]),
        re = new WeakSet();
      function ri(t) {
        return (e) => {
          "Enter" === e.key && t(e);
        };
      }
      function rn(t, e) {
        t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
      }
      function rs(t) {
        return nk(t) && !(nC.x || nC.y);
      }
      function rr(t, e, i) {
        let { props: n } = t;
        if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
        t.animationState && n.whileTap && t.animationState.setActive("whileTap", "Start" === i);
        let s = n["onTap" + ("End" === i ? "" : i)];
        s && tu.postRender(() => s(e, nR(e)));
      }
      class ro extends nA {
        mount() {
          let { current: t } = this.node;
          t &&
            (this.unmount = (function (t, e, i = {}) {
              let [n, s, r] = s3(t, i),
                o = (t) => {
                  let n = t.currentTarget;
                  if (!rs(t)) return;
                  re.add(n);
                  let r = e(n, t),
                    o = (t, e) => {
                      (window.removeEventListener("pointerup", a),
                        window.removeEventListener("pointercancel", l),
                        re.has(n) && re.delete(n),
                        rs(t) && "function" == typeof r && r(t, { success: e }));
                    },
                    a = (t) => {
                      o(t, n === window || n === document || i.useGlobalTarget || s8(n, t.target));
                    },
                    l = (t) => {
                      o(t, !1);
                    };
                  (window.addEventListener("pointerup", a, s),
                    window.addEventListener("pointercancel", l, s));
                };
              return (
                n.forEach((t) => {
                  ((i.useGlobalTarget ? window : t).addEventListener("pointerdown", o, s),
                  (0, s7.s)(t)) &&
                    (t.addEventListener("focus", (t) =>
                      ((t, e) => {
                        let i = t.currentTarget;
                        if (!i) return;
                        let n = ri(() => {
                          if (re.has(i)) return;
                          rn(i, "down");
                          let t = ri(() => {
                            rn(i, "up");
                          });
                          (i.addEventListener("keyup", t, e),
                            i.addEventListener("blur", () => rn(i, "cancel"), e));
                        });
                        (i.addEventListener("keydown", n, e),
                          i.addEventListener("blur", () => i.removeEventListener("keydown", n), e));
                      })(t, s),
                    ),
                    rt.has(t.tagName) ||
                      -1 !== t.tabIndex ||
                      t.hasAttribute("tabindex") ||
                      (t.tabIndex = 0));
                }),
                r
              );
            })(
              t,
              (t, e) => (
                rr(this.node, e, "Start"),
                (t, e) => {
                  let { success: i } = e;
                  return rr(this.node, t, i ? "End" : "Cancel");
                }
              ),
              { useGlobalTarget: this.node.props.globalTapTarget },
            ));
        }
        unmount() {}
      }
      let ra = new WeakMap(),
        rl = new WeakMap(),
        rh = (t) => {
          let e = ra.get(t.target);
          e && e(t);
        },
        ru = (t) => {
          t.forEach(rh);
        },
        rd = { some: 0, all: 1 };
      class rc extends nA {
        startObserver() {
          this.unmount();
          let { viewport: t = {} } = this.node.getProps(),
            { root: e, margin: i, amount: n = "some", once: s } = t,
            r = {
              root: e ? e.current : void 0,
              rootMargin: i,
              threshold: "number" == typeof n ? n : rd[n],
            },
            o = (t) => {
              let { isIntersecting: e } = t;
              if (this.isInView === e || ((this.isInView = e), s && !e && this.hasEnteredView))
                return;
              (e && (this.hasEnteredView = !0),
                this.node.animationState && this.node.animationState.setActive("whileInView", e));
              let { onViewportEnter: i, onViewportLeave: n } = this.node.getProps(),
                r = e ? i : n;
              r && r(t);
            };
          var a = this.node.current;
          let l = (function (t) {
            let { root: e, ...i } = t,
              n = e || document;
            rl.has(n) || rl.set(n, {});
            let s = rl.get(n),
              r = JSON.stringify(i);
            return (s[r] || (s[r] = new IntersectionObserver(ru, { root: e, ...i })), s[r]);
          })(r);
          return (
            ra.set(a, o),
            l.observe(a),
            () => {
              (ra.delete(a), l.unobserve(a));
            }
          );
        }
        mount() {
          this.startObserver();
        }
        update() {
          if ("undefined" == typeof IntersectionObserver) return;
          let { props: t, prevProps: e } = this.node;
          ["amount", "margin", "root"].some(
            (function (t) {
              let { viewport: e = {} } = t,
                { viewport: i = {} } =
                  arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (t) => e[t] !== i[t];
            })(t, e),
          ) && this.startObserver();
        }
        unmount() {}
        constructor() {
          (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
        }
      }
      let rp = (function (t, e) {
        if ("undefined" == typeof Proxy) return e8;
        let i = new Map(),
          n = (i, n) => e8(i, n, t, e);
        return new Proxy((t, e) => n(t, e), {
          get: (s, r) =>
            "create" === r ? n : (i.has(r) || i.set(r, e8(r, void 0, t, e)), i.get(r)),
        });
      })(
        {
          animation: { Feature: nM },
          exit: { Feature: nE },
          inView: { Feature: rc },
          tap: { Feature: ro },
          focus: { Feature: s6 },
          hover: { Feature: s9 },
          pan: { Feature: n3 },
          drag: { Feature: n1, ProjectionNode: s2, MeasureLayout: n7 },
          layout: { ProjectionNode: s2, MeasureLayout: n7 },
        },
        (t, e) => (eU(t) ? new eO(e) : new eC(e, { allowProjection: t !== s.Fragment })),
      );
    },
    33577: (t, e, i) => {
      i.d(e, { B: () => n });
      let n = "undefined" != typeof window;
    },
    53127: (t, e, i) => {
      i.d(e, { Q: () => n });
      let n = (0, i(12115).createContext)({
        transformPagePoint: (t) => t,
        isStatic: !1,
        reducedMotion: "never",
      });
    },
    59686: (t, e, i) => {
      i.d(e, { t: () => n });
      let n = (0, i(12115).createContext)(null);
    },
    60296: (t, e, i) => {
      i.d(e, { L: () => n });
      let n = (0, i(12115).createContext)({});
    },
    73142: (t, e, i) => {
      i.d(e, { G: () => n });
      function n(t) {
        return "object" == typeof t && null !== t;
      }
    },
    75601: (t, e, i) => {
      i.d(e, { xQ: () => r });
      var n = i(12115),
        s = i(59686);
      function r() {
        let t = !(arguments.length > 0) || void 0 === arguments[0] || arguments[0],
          e = (0, n.useContext)(s.t);
        if (null === e) return [!0, null];
        let { isPresent: i, onExitComplete: r, register: o } = e,
          a = (0, n.useId)();
        (0, n.useEffect)(() => {
          if (t) return o(a);
        }, [t]);
        let l = (0, n.useCallback)(() => t && r && r(a), [a, r, t]);
        return !i && r ? [!1, l] : [!0];
      }
    },
    81402: (t, e, i) => {
      i.d(e, { s: () => s });
      var n = i(73142);
      function s(t) {
        return (0, n.G)(t) && "offsetHeight" in t;
      }
    },
    86553: (t, e, i) => {
      i.d(e, { E: () => s });
      var n = i(12115);
      let s = i(33577).B ? n.useLayoutEffect : n.useEffect;
    },
    94416: (t, e, i) => {
      i.d(e, { M: () => s });
      var n = i(12115);
      function s(t) {
        let e = (0, n.useRef)(null);
        return (null === e.current && (e.current = t()), e.current);
      }
    },
  },
]);

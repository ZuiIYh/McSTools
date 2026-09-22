"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4053],
  {
    2821: (e, r, o) => {
      o.d(r, { $: () => t });
      function t() {
        for (var e, r, o = 0, t = "", l = arguments.length; o < l; o++)
          (e = arguments[o]) &&
            (r = (function e(r) {
              var o,
                t,
                l = "";
              if ("string" == typeof r || "number" == typeof r) l += r;
              else if ("object" == typeof r)
                if (Array.isArray(r)) {
                  var a = r.length;
                  for (o = 0; o < a; o++) r[o] && (t = e(r[o])) && (l && (l += " "), (l += t));
                } else for (t in r) r[t] && (l && (l += " "), (l += t));
              return l;
            })(e)) &&
            (t && (t += " "), (t += r));
        return t;
      }
    },
    30313: (e, r, o) => {
      o.d(r, { A: () => a });
      var t = o(12115),
        l = {
          outline: {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          filled: {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "currentColor",
            stroke: "none",
          },
        };
      let a = (e, r, o, a) => {
        let n = (0, t.forwardRef)((o, n) => {
          let {
            color: s = "currentColor",
            size: i = 24,
            stroke: d = 2,
            title: c,
            className: m,
            children: p,
            ...u
          } = o;
          return (0, t.createElement)(
            "svg",
            {
              ref: n,
              ...l[e],
              width: i,
              height: i,
              className: ["tabler-icon", "tabler-icon-".concat(r), m].join(" "),
              ...("filled" === e ? { fill: s } : { strokeWidth: d, stroke: s }),
              ...u,
            },
            [
              c && (0, t.createElement)("title", { key: "svg-title" }, c),
              ...a.map((e) => {
                let [r, o] = e;
                return (0, t.createElement)(r, o);
              }),
              ...(Array.isArray(p) ? p : [p]),
            ],
          );
        });
        return ((n.displayName = "".concat(o)), n);
      };
    },
    75889: (e, r, o) => {
      o.d(r, { QP: () => ei });
      let t = (e = new Map(), r = null, o) => ({ nextPart: e, validators: r, classGroupId: o }),
        l = [],
        a = (e, r, o) => {
          if (0 == e.length - r) return o.classGroupId;
          let t = e[r],
            l = o.nextPart.get(t);
          if (l) {
            let o = a(e, r + 1, l);
            if (o) return o;
          }
          let n = o.validators;
          if (null === n) return;
          let s = 0 === r ? e.join("-") : e.slice(r).join("-"),
            i = n.length;
          for (let e = 0; e < i; e++) {
            let r = n[e];
            if (r.validator(s)) return r.classGroupId;
          }
        },
        n = (e, r) => {
          let o = t();
          for (let t in e) s(e[t], o, t, r);
          return o;
        },
        s = (e, r, o, t) => {
          let l = e.length;
          for (let a = 0; a < l; a++) i(e[a], r, o, t);
        },
        i = (e, r, o, t) =>
          "string" == typeof e
            ? void d(e, r, o)
            : "function" == typeof e
              ? void c(e, r, o, t)
              : void m(e, r, o, t),
        d = (e, r, o) => {
          ("" === e ? r : p(r, e)).classGroupId = o;
        },
        c = (e, r, o, t) => {
          if (u(e)) return void s(e(t), r, o, t);
          (null === r.validators && (r.validators = []),
            r.validators.push({ classGroupId: o, validator: e }));
        },
        m = (e, r, o, t) => {
          let l = Object.entries(e),
            a = l.length;
          for (let e = 0; e < a; e++) {
            let [a, n] = l[e];
            s(n, p(r, a), o, t);
          }
        },
        p = (e, r) => {
          let o = e,
            l = r.split("-"),
            a = l.length;
          for (let e = 0; e < a; e++) {
            let r = l[e],
              a = o.nextPart.get(r);
            (a || ((a = t()), o.nextPart.set(r, a)), (o = a));
          }
          return o;
        },
        u = (e) => "isThemeGetter" in e && !0 === e.isThemeGetter,
        b = [],
        f = (e, r, o, t, l) => ({
          modifiers: e,
          hasImportantModifier: r,
          baseClassName: o,
          maybePostfixModifierPosition: t,
          isExternal: l,
        }),
        g = /\s+/,
        h = (e) => {
          let r;
          if ("string" == typeof e) return e;
          let o = "";
          for (let t = 0; t < e.length; t++) e[t] && (r = h(e[t])) && (o && (o += " "), (o += r));
          return o;
        },
        k = [],
        w = (e) => {
          let r = (r) => r[e] || k;
          return ((r.isThemeGetter = !0), r);
        },
        x = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
        v = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
        y = /^\d+\/\d+$/,
        z = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
        j =
          /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
        C = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
        G = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
        N =
          /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
        W = (e) => y.test(e),
        $ = (e) => !!e && !Number.isNaN(Number(e)),
        I = (e) => !!e && Number.isInteger(Number(e)),
        O = (e) => e.endsWith("%") && $(e.slice(0, -1)),
        A = (e) => z.test(e),
        E = () => !0,
        M = (e) => j.test(e) && !C.test(e),
        S = () => !1,
        _ = (e) => G.test(e),
        P = (e) => N.test(e),
        T = (e) => !B(e) && !H(e),
        q = (e) => Z(e, et, S),
        B = (e) => x.test(e),
        L = (e) => Z(e, el, M),
        Q = (e) => Z(e, ea, $),
        R = (e) => Z(e, er, S),
        D = (e) => Z(e, eo, P),
        F = (e) => Z(e, es, _),
        H = (e) => v.test(e),
        J = (e) => ee(e, el),
        K = (e) => ee(e, en),
        U = (e) => ee(e, er),
        V = (e) => ee(e, et),
        X = (e) => ee(e, eo),
        Y = (e) => ee(e, es, !0),
        Z = (e, r, o) => {
          let t = x.exec(e);
          return !!t && (t[1] ? r(t[1]) : o(t[2]));
        },
        ee = (e, r, o = !1) => {
          let t = v.exec(e);
          return !!t && (t[1] ? r(t[1]) : o);
        },
        er = (e) => "position" === e || "percentage" === e,
        eo = (e) => "image" === e || "url" === e,
        et = (e) => "length" === e || "size" === e || "bg-size" === e,
        el = (e) => "length" === e,
        ea = (e) => "number" === e,
        en = (e) => "family-name" === e,
        es = (e) => "shadow" === e;
      Symbol.toStringTag;
      let ei = ((e, ...r) => {
        let o,
          t,
          s,
          i,
          d = (e) => {
            let r = t(e);
            if (r) return r;
            let l = ((e, r) => {
              let {
                  parseClassName: o,
                  getClassGroupId: t,
                  getConflictingClassGroupIds: l,
                  sortModifiers: a,
                } = r,
                n = [],
                s = e.trim().split(g),
                i = "";
              for (let e = s.length - 1; e >= 0; e -= 1) {
                let r = s[e],
                  {
                    isExternal: d,
                    modifiers: c,
                    hasImportantModifier: m,
                    baseClassName: p,
                    maybePostfixModifierPosition: u,
                  } = o(r);
                if (d) {
                  i = r + (i.length > 0 ? " " + i : i);
                  continue;
                }
                let b = !!u,
                  f = t(b ? p.substring(0, u) : p);
                if (!f) {
                  if (!b || !(f = t(p))) {
                    i = r + (i.length > 0 ? " " + i : i);
                    continue;
                  }
                  b = !1;
                }
                let g = 0 === c.length ? "" : 1 === c.length ? c[0] : a(c).join(":"),
                  h = m ? g + "!" : g,
                  k = h + f;
                if (n.indexOf(k) > -1) continue;
                n.push(k);
                let w = l(f, b);
                for (let e = 0; e < w.length; ++e) {
                  let r = w[e];
                  n.push(h + r);
                }
                i = r + (i.length > 0 ? " " + i : i);
              }
              return i;
            })(e, o);
            return (s(e, l), l);
          };
        return (
          (i = (c) => (
            (t = (o = ((e) => ({
              cache: ((e) => {
                if (e < 1) return { get: () => void 0, set: () => {} };
                let r = 0,
                  o = Object.create(null),
                  t = Object.create(null),
                  l = (l, a) => {
                    ((o[l] = a), ++r > e && ((r = 0), (t = o), (o = Object.create(null))));
                  };
                return {
                  get(e) {
                    let r = o[e];
                    return void 0 !== r ? r : void 0 !== (r = t[e]) ? (l(e, r), r) : void 0;
                  },
                  set(e, r) {
                    e in o ? (o[e] = r) : l(e, r);
                  },
                };
              })(e.cacheSize),
              parseClassName: ((e) => {
                let { prefix: r, experimentalParseClassName: o } = e,
                  t = (e) => {
                    let r,
                      o = [],
                      t = 0,
                      l = 0,
                      a = 0,
                      n = e.length;
                    for (let s = 0; s < n; s++) {
                      let n = e[s];
                      if (0 === t && 0 === l) {
                        if (":" === n) {
                          (o.push(e.slice(a, s)), (a = s + 1));
                          continue;
                        }
                        if ("/" === n) {
                          r = s;
                          continue;
                        }
                      }
                      "[" === n ? t++ : "]" === n ? t-- : "(" === n ? l++ : ")" === n && l--;
                    }
                    let s = 0 === o.length ? e : e.slice(a),
                      i = s,
                      d = !1;
                    return (
                      s.endsWith("!")
                        ? ((i = s.slice(0, -1)), (d = !0))
                        : s.startsWith("!") && ((i = s.slice(1)), (d = !0)),
                      f(o, d, i, r && r > a ? r - a : void 0)
                    );
                  };
                if (r) {
                  let e = r + ":",
                    o = t;
                  t = (r) => (r.startsWith(e) ? o(r.slice(e.length)) : f(b, !1, r, void 0, !0));
                }
                if (o) {
                  let e = t;
                  t = (r) => o({ className: r, parseClassName: e });
                }
                return t;
              })(e),
              sortModifiers: ((e) => {
                let r = new Map();
                return (
                  e.orderSensitiveModifiers.forEach((e, o) => {
                    r.set(e, 1e6 + o);
                  }),
                  (e) => {
                    let o = [],
                      t = [];
                    for (let l = 0; l < e.length; l++) {
                      let a = e[l],
                        n = "[" === a[0],
                        s = r.has(a);
                      n || s
                        ? (t.length > 0 && (t.sort(), o.push(...t), (t = [])), o.push(a))
                        : t.push(a);
                    }
                    return (t.length > 0 && (t.sort(), o.push(...t)), o);
                  }
                );
              })(e),
              ...((e) => {
                let r = ((e) => {
                    let { theme: r, classGroups: o } = e;
                    return n(o, r);
                  })(e),
                  { conflictingClassGroups: o, conflictingClassGroupModifiers: t } = e;
                return {
                  getClassGroupId: (e) => {
                    if (e.startsWith("[") && e.endsWith("]"))
                      return ((e) =>
                        -1 === e.slice(1, -1).indexOf(":")
                          ? void 0
                          : (() => {
                              let r = e.slice(1, -1),
                                o = r.indexOf(":"),
                                t = r.slice(0, o);
                              return t ? "arbitrary.." + t : void 0;
                            })())(e);
                    let o = e.split("-"),
                      t = +("" === o[0] && o.length > 1);
                    return a(o, t, r);
                  },
                  getConflictingClassGroupIds: (e, r) => {
                    if (r) {
                      let r = t[e],
                        a = o[e];
                      return r
                        ? a
                          ? ((e, r) => {
                              let o = Array(e.length + r.length);
                              for (let r = 0; r < e.length; r++) o[r] = e[r];
                              for (let t = 0; t < r.length; t++) o[e.length + t] = r[t];
                              return o;
                            })(a, r)
                          : r
                        : a || l;
                    }
                    return o[e] || l;
                  },
                };
              })(e),
            }))(r.reduce((e, r) => r(e), e()))).cache.get),
            (s = o.cache.set),
            (i = d),
            d(c)
          )),
          (...e) =>
            i(
              ((...e) => {
                let r,
                  o,
                  t = 0,
                  l = "";
                for (; t < e.length;) (r = e[t++]) && (o = h(r)) && (l && (l += " "), (l += o));
                return l;
              })(...e),
            )
        );
      })(() => {
        let e = w("color"),
          r = w("font"),
          o = w("text"),
          t = w("font-weight"),
          l = w("tracking"),
          a = w("leading"),
          n = w("breakpoint"),
          s = w("container"),
          i = w("spacing"),
          d = w("radius"),
          c = w("shadow"),
          m = w("inset-shadow"),
          p = w("text-shadow"),
          u = w("drop-shadow"),
          b = w("blur"),
          f = w("perspective"),
          g = w("aspect"),
          h = w("ease"),
          k = w("animate"),
          x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
          v = () => [
            "center",
            "top",
            "bottom",
            "left",
            "right",
            "top-left",
            "left-top",
            "top-right",
            "right-top",
            "bottom-right",
            "right-bottom",
            "bottom-left",
            "left-bottom",
          ],
          y = () => [...v(), H, B],
          z = () => ["auto", "hidden", "clip", "visible", "scroll"],
          j = () => ["auto", "contain", "none"],
          C = () => [H, B, i],
          G = () => [W, "full", "auto", ...C()],
          N = () => [I, "none", "subgrid", H, B],
          M = () => ["auto", { span: ["full", I, H, B] }, I, H, B],
          S = () => [I, "auto", H, B],
          _ = () => ["auto", "min", "max", "fr", H, B],
          P = () => [
            "start",
            "end",
            "center",
            "between",
            "around",
            "evenly",
            "stretch",
            "baseline",
            "center-safe",
            "end-safe",
          ],
          Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
          ee = () => ["auto", ...C()],
          er = () => [
            W,
            "auto",
            "full",
            "dvw",
            "dvh",
            "lvw",
            "lvh",
            "svw",
            "svh",
            "min",
            "max",
            "fit",
            ...C(),
          ],
          eo = () => [e, H, B],
          et = () => [...v(), U, R, { position: [H, B] }],
          el = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
          ea = () => ["auto", "cover", "contain", V, q, { size: [H, B] }],
          en = () => [O, J, L],
          es = () => ["", "none", "full", d, H, B],
          ei = () => ["", $, J, L],
          ed = () => ["solid", "dashed", "dotted", "double"],
          ec = () => [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity",
          ],
          em = () => [$, O, U, R],
          ep = () => ["", "none", b, H, B],
          eu = () => ["none", $, H, B],
          eb = () => ["none", $, H, B],
          ef = () => [$, H, B],
          eg = () => [W, "full", ...C()];
        return {
          cacheSize: 500,
          theme: {
            animate: ["spin", "ping", "pulse", "bounce"],
            aspect: ["video"],
            blur: [A],
            breakpoint: [A],
            color: [E],
            container: [A],
            "drop-shadow": [A],
            ease: ["in", "out", "in-out"],
            font: [T],
            "font-weight": [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
            ],
            "inset-shadow": [A],
            leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
            perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
            radius: [A],
            shadow: [A],
            spacing: ["px", $],
            text: [A],
            "text-shadow": [A],
            tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
          },
          classGroups: {
            aspect: [{ aspect: ["auto", "square", W, B, H, g] }],
            container: ["container"],
            columns: [{ columns: [$, B, H, s] }],
            "break-after": [{ "break-after": x() }],
            "break-before": [{ "break-before": x() }],
            "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
            "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
            box: [{ box: ["border", "content"] }],
            display: [
              "block",
              "inline-block",
              "inline",
              "flex",
              "inline-flex",
              "table",
              "inline-table",
              "table-caption",
              "table-cell",
              "table-column",
              "table-column-group",
              "table-footer-group",
              "table-header-group",
              "table-row-group",
              "table-row",
              "flow-root",
              "grid",
              "inline-grid",
              "contents",
              "list-item",
              "hidden",
            ],
            sr: ["sr-only", "not-sr-only"],
            float: [{ float: ["right", "left", "none", "start", "end"] }],
            clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
            isolation: ["isolate", "isolation-auto"],
            "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
            "object-position": [{ object: y() }],
            overflow: [{ overflow: z() }],
            "overflow-x": [{ "overflow-x": z() }],
            "overflow-y": [{ "overflow-y": z() }],
            overscroll: [{ overscroll: j() }],
            "overscroll-x": [{ "overscroll-x": j() }],
            "overscroll-y": [{ "overscroll-y": j() }],
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            inset: [{ inset: G() }],
            "inset-x": [{ "inset-x": G() }],
            "inset-y": [{ "inset-y": G() }],
            start: [{ start: G() }],
            end: [{ end: G() }],
            top: [{ top: G() }],
            right: [{ right: G() }],
            bottom: [{ bottom: G() }],
            left: [{ left: G() }],
            visibility: ["visible", "invisible", "collapse"],
            z: [{ z: [I, "auto", H, B] }],
            basis: [{ basis: [W, "full", "auto", s, ...C()] }],
            "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
            "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
            flex: [{ flex: [$, W, "auto", "initial", "none", B] }],
            grow: [{ grow: ["", $, H, B] }],
            shrink: [{ shrink: ["", $, H, B] }],
            order: [{ order: [I, "first", "last", "none", H, B] }],
            "grid-cols": [{ "grid-cols": N() }],
            "col-start-end": [{ col: M() }],
            "col-start": [{ "col-start": S() }],
            "col-end": [{ "col-end": S() }],
            "grid-rows": [{ "grid-rows": N() }],
            "row-start-end": [{ row: M() }],
            "row-start": [{ "row-start": S() }],
            "row-end": [{ "row-end": S() }],
            "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
            "auto-cols": [{ "auto-cols": _() }],
            "auto-rows": [{ "auto-rows": _() }],
            gap: [{ gap: C() }],
            "gap-x": [{ "gap-x": C() }],
            "gap-y": [{ "gap-y": C() }],
            "justify-content": [{ justify: [...P(), "normal"] }],
            "justify-items": [{ "justify-items": [...Z(), "normal"] }],
            "justify-self": [{ "justify-self": ["auto", ...Z()] }],
            "align-content": [{ content: ["normal", ...P()] }],
            "align-items": [{ items: [...Z(), { baseline: ["", "last"] }] }],
            "align-self": [{ self: ["auto", ...Z(), { baseline: ["", "last"] }] }],
            "place-content": [{ "place-content": P() }],
            "place-items": [{ "place-items": [...Z(), "baseline"] }],
            "place-self": [{ "place-self": ["auto", ...Z()] }],
            p: [{ p: C() }],
            px: [{ px: C() }],
            py: [{ py: C() }],
            ps: [{ ps: C() }],
            pe: [{ pe: C() }],
            pt: [{ pt: C() }],
            pr: [{ pr: C() }],
            pb: [{ pb: C() }],
            pl: [{ pl: C() }],
            m: [{ m: ee() }],
            mx: [{ mx: ee() }],
            my: [{ my: ee() }],
            ms: [{ ms: ee() }],
            me: [{ me: ee() }],
            mt: [{ mt: ee() }],
            mr: [{ mr: ee() }],
            mb: [{ mb: ee() }],
            ml: [{ ml: ee() }],
            "space-x": [{ "space-x": C() }],
            "space-x-reverse": ["space-x-reverse"],
            "space-y": [{ "space-y": C() }],
            "space-y-reverse": ["space-y-reverse"],
            size: [{ size: er() }],
            w: [{ w: [s, "screen", ...er()] }],
            "min-w": [{ "min-w": [s, "screen", "none", ...er()] }],
            "max-w": [{ "max-w": [s, "screen", "none", "prose", { screen: [n] }, ...er()] }],
            h: [{ h: ["screen", "lh", ...er()] }],
            "min-h": [{ "min-h": ["screen", "lh", "none", ...er()] }],
            "max-h": [{ "max-h": ["screen", "lh", ...er()] }],
            "font-size": [{ text: ["base", o, J, L] }],
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            "font-style": ["italic", "not-italic"],
            "font-weight": [{ font: [t, H, Q] }],
            "font-stretch": [
              {
                "font-stretch": [
                  "ultra-condensed",
                  "extra-condensed",
                  "condensed",
                  "semi-condensed",
                  "normal",
                  "semi-expanded",
                  "expanded",
                  "extra-expanded",
                  "ultra-expanded",
                  O,
                  B,
                ],
              },
            ],
            "font-family": [{ font: [K, B, r] }],
            "fvn-normal": ["normal-nums"],
            "fvn-ordinal": ["ordinal"],
            "fvn-slashed-zero": ["slashed-zero"],
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
            tracking: [{ tracking: [l, H, B] }],
            "line-clamp": [{ "line-clamp": [$, "none", H, Q] }],
            leading: [{ leading: [a, ...C()] }],
            "list-image": [{ "list-image": ["none", H, B] }],
            "list-style-position": [{ list: ["inside", "outside"] }],
            "list-style-type": [{ list: ["disc", "decimal", "none", H, B] }],
            "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
            "placeholder-color": [{ placeholder: eo() }],
            "text-color": [{ text: eo() }],
            "text-decoration": ["underline", "overline", "line-through", "no-underline"],
            "text-decoration-style": [{ decoration: [...ed(), "wavy"] }],
            "text-decoration-thickness": [{ decoration: [$, "from-font", "auto", H, L] }],
            "text-decoration-color": [{ decoration: eo() }],
            "underline-offset": [{ "underline-offset": [$, "auto", H, B] }],
            "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
            indent: [{ indent: C() }],
            "vertical-align": [
              {
                align: [
                  "baseline",
                  "top",
                  "middle",
                  "bottom",
                  "text-top",
                  "text-bottom",
                  "sub",
                  "super",
                  H,
                  B,
                ],
              },
            ],
            whitespace: [
              { whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] },
            ],
            break: [{ break: ["normal", "words", "all", "keep"] }],
            wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
            hyphens: [{ hyphens: ["none", "manual", "auto"] }],
            content: [{ content: ["none", H, B] }],
            "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
            "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
            "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
            "bg-position": [{ bg: et() }],
            "bg-repeat": [{ bg: el() }],
            "bg-size": [{ bg: ea() }],
            "bg-image": [
              {
                bg: [
                  "none",
                  {
                    linear: [{ to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, I, H, B],
                    radial: ["", H, B],
                    conic: [I, H, B],
                  },
                  X,
                  D,
                ],
              },
            ],
            "bg-color": [{ bg: eo() }],
            "gradient-from-pos": [{ from: en() }],
            "gradient-via-pos": [{ via: en() }],
            "gradient-to-pos": [{ to: en() }],
            "gradient-from": [{ from: eo() }],
            "gradient-via": [{ via: eo() }],
            "gradient-to": [{ to: eo() }],
            rounded: [{ rounded: es() }],
            "rounded-s": [{ "rounded-s": es() }],
            "rounded-e": [{ "rounded-e": es() }],
            "rounded-t": [{ "rounded-t": es() }],
            "rounded-r": [{ "rounded-r": es() }],
            "rounded-b": [{ "rounded-b": es() }],
            "rounded-l": [{ "rounded-l": es() }],
            "rounded-ss": [{ "rounded-ss": es() }],
            "rounded-se": [{ "rounded-se": es() }],
            "rounded-ee": [{ "rounded-ee": es() }],
            "rounded-es": [{ "rounded-es": es() }],
            "rounded-tl": [{ "rounded-tl": es() }],
            "rounded-tr": [{ "rounded-tr": es() }],
            "rounded-br": [{ "rounded-br": es() }],
            "rounded-bl": [{ "rounded-bl": es() }],
            "border-w": [{ border: ei() }],
            "border-w-x": [{ "border-x": ei() }],
            "border-w-y": [{ "border-y": ei() }],
            "border-w-s": [{ "border-s": ei() }],
            "border-w-e": [{ "border-e": ei() }],
            "border-w-t": [{ "border-t": ei() }],
            "border-w-r": [{ "border-r": ei() }],
            "border-w-b": [{ "border-b": ei() }],
            "border-w-l": [{ "border-l": ei() }],
            "divide-x": [{ "divide-x": ei() }],
            "divide-x-reverse": ["divide-x-reverse"],
            "divide-y": [{ "divide-y": ei() }],
            "divide-y-reverse": ["divide-y-reverse"],
            "border-style": [{ border: [...ed(), "hidden", "none"] }],
            "divide-style": [{ divide: [...ed(), "hidden", "none"] }],
            "border-color": [{ border: eo() }],
            "border-color-x": [{ "border-x": eo() }],
            "border-color-y": [{ "border-y": eo() }],
            "border-color-s": [{ "border-s": eo() }],
            "border-color-e": [{ "border-e": eo() }],
            "border-color-t": [{ "border-t": eo() }],
            "border-color-r": [{ "border-r": eo() }],
            "border-color-b": [{ "border-b": eo() }],
            "border-color-l": [{ "border-l": eo() }],
            "divide-color": [{ divide: eo() }],
            "outline-style": [{ outline: [...ed(), "none", "hidden"] }],
            "outline-offset": [{ "outline-offset": [$, H, B] }],
            "outline-w": [{ outline: ["", $, J, L] }],
            "outline-color": [{ outline: eo() }],
            shadow: [{ shadow: ["", "none", c, Y, F] }],
            "shadow-color": [{ shadow: eo() }],
            "inset-shadow": [{ "inset-shadow": ["none", m, Y, F] }],
            "inset-shadow-color": [{ "inset-shadow": eo() }],
            "ring-w": [{ ring: ei() }],
            "ring-w-inset": ["ring-inset"],
            "ring-color": [{ ring: eo() }],
            "ring-offset-w": [{ "ring-offset": [$, L] }],
            "ring-offset-color": [{ "ring-offset": eo() }],
            "inset-ring-w": [{ "inset-ring": ei() }],
            "inset-ring-color": [{ "inset-ring": eo() }],
            "text-shadow": [{ "text-shadow": ["none", p, Y, F] }],
            "text-shadow-color": [{ "text-shadow": eo() }],
            opacity: [{ opacity: [$, H, B] }],
            "mix-blend": [{ "mix-blend": [...ec(), "plus-darker", "plus-lighter"] }],
            "bg-blend": [{ "bg-blend": ec() }],
            "mask-clip": [
              { "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"] },
              "mask-no-clip",
            ],
            "mask-composite": [{ mask: ["add", "subtract", "intersect", "exclude"] }],
            "mask-image-linear-pos": [{ "mask-linear": [$] }],
            "mask-image-linear-from-pos": [{ "mask-linear-from": em() }],
            "mask-image-linear-to-pos": [{ "mask-linear-to": em() }],
            "mask-image-linear-from-color": [{ "mask-linear-from": eo() }],
            "mask-image-linear-to-color": [{ "mask-linear-to": eo() }],
            "mask-image-t-from-pos": [{ "mask-t-from": em() }],
            "mask-image-t-to-pos": [{ "mask-t-to": em() }],
            "mask-image-t-from-color": [{ "mask-t-from": eo() }],
            "mask-image-t-to-color": [{ "mask-t-to": eo() }],
            "mask-image-r-from-pos": [{ "mask-r-from": em() }],
            "mask-image-r-to-pos": [{ "mask-r-to": em() }],
            "mask-image-r-from-color": [{ "mask-r-from": eo() }],
            "mask-image-r-to-color": [{ "mask-r-to": eo() }],
            "mask-image-b-from-pos": [{ "mask-b-from": em() }],
            "mask-image-b-to-pos": [{ "mask-b-to": em() }],
            "mask-image-b-from-color": [{ "mask-b-from": eo() }],
            "mask-image-b-to-color": [{ "mask-b-to": eo() }],
            "mask-image-l-from-pos": [{ "mask-l-from": em() }],
            "mask-image-l-to-pos": [{ "mask-l-to": em() }],
            "mask-image-l-from-color": [{ "mask-l-from": eo() }],
            "mask-image-l-to-color": [{ "mask-l-to": eo() }],
            "mask-image-x-from-pos": [{ "mask-x-from": em() }],
            "mask-image-x-to-pos": [{ "mask-x-to": em() }],
            "mask-image-x-from-color": [{ "mask-x-from": eo() }],
            "mask-image-x-to-color": [{ "mask-x-to": eo() }],
            "mask-image-y-from-pos": [{ "mask-y-from": em() }],
            "mask-image-y-to-pos": [{ "mask-y-to": em() }],
            "mask-image-y-from-color": [{ "mask-y-from": eo() }],
            "mask-image-y-to-color": [{ "mask-y-to": eo() }],
            "mask-image-radial": [{ "mask-radial": [H, B] }],
            "mask-image-radial-from-pos": [{ "mask-radial-from": em() }],
            "mask-image-radial-to-pos": [{ "mask-radial-to": em() }],
            "mask-image-radial-from-color": [{ "mask-radial-from": eo() }],
            "mask-image-radial-to-color": [{ "mask-radial-to": eo() }],
            "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
            "mask-image-radial-size": [
              { "mask-radial": [{ closest: ["side", "corner"], farthest: ["side", "corner"] }] },
            ],
            "mask-image-radial-pos": [{ "mask-radial-at": v() }],
            "mask-image-conic-pos": [{ "mask-conic": [$] }],
            "mask-image-conic-from-pos": [{ "mask-conic-from": em() }],
            "mask-image-conic-to-pos": [{ "mask-conic-to": em() }],
            "mask-image-conic-from-color": [{ "mask-conic-from": eo() }],
            "mask-image-conic-to-color": [{ "mask-conic-to": eo() }],
            "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
            "mask-origin": [
              { "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"] },
            ],
            "mask-position": [{ mask: et() }],
            "mask-repeat": [{ mask: el() }],
            "mask-size": [{ mask: ea() }],
            "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
            "mask-image": [{ mask: ["none", H, B] }],
            filter: [{ filter: ["", "none", H, B] }],
            blur: [{ blur: ep() }],
            brightness: [{ brightness: [$, H, B] }],
            contrast: [{ contrast: [$, H, B] }],
            "drop-shadow": [{ "drop-shadow": ["", "none", u, Y, F] }],
            "drop-shadow-color": [{ "drop-shadow": eo() }],
            grayscale: [{ grayscale: ["", $, H, B] }],
            "hue-rotate": [{ "hue-rotate": [$, H, B] }],
            invert: [{ invert: ["", $, H, B] }],
            saturate: [{ saturate: [$, H, B] }],
            sepia: [{ sepia: ["", $, H, B] }],
            "backdrop-filter": [{ "backdrop-filter": ["", "none", H, B] }],
            "backdrop-blur": [{ "backdrop-blur": ep() }],
            "backdrop-brightness": [{ "backdrop-brightness": [$, H, B] }],
            "backdrop-contrast": [{ "backdrop-contrast": [$, H, B] }],
            "backdrop-grayscale": [{ "backdrop-grayscale": ["", $, H, B] }],
            "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [$, H, B] }],
            "backdrop-invert": [{ "backdrop-invert": ["", $, H, B] }],
            "backdrop-opacity": [{ "backdrop-opacity": [$, H, B] }],
            "backdrop-saturate": [{ "backdrop-saturate": [$, H, B] }],
            "backdrop-sepia": [{ "backdrop-sepia": ["", $, H, B] }],
            "border-collapse": [{ border: ["collapse", "separate"] }],
            "border-spacing": [{ "border-spacing": C() }],
            "border-spacing-x": [{ "border-spacing-x": C() }],
            "border-spacing-y": [{ "border-spacing-y": C() }],
            "table-layout": [{ table: ["auto", "fixed"] }],
            caption: [{ caption: ["top", "bottom"] }],
            transition: [
              { transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", H, B] },
            ],
            "transition-behavior": [{ transition: ["normal", "discrete"] }],
            duration: [{ duration: [$, "initial", H, B] }],
            ease: [{ ease: ["linear", "initial", h, H, B] }],
            delay: [{ delay: [$, H, B] }],
            animate: [{ animate: ["none", k, H, B] }],
            backface: [{ backface: ["hidden", "visible"] }],
            perspective: [{ perspective: [f, H, B] }],
            "perspective-origin": [{ "perspective-origin": y() }],
            rotate: [{ rotate: eu() }],
            "rotate-x": [{ "rotate-x": eu() }],
            "rotate-y": [{ "rotate-y": eu() }],
            "rotate-z": [{ "rotate-z": eu() }],
            scale: [{ scale: eb() }],
            "scale-x": [{ "scale-x": eb() }],
            "scale-y": [{ "scale-y": eb() }],
            "scale-z": [{ "scale-z": eb() }],
            "scale-3d": ["scale-3d"],
            skew: [{ skew: ef() }],
            "skew-x": [{ "skew-x": ef() }],
            "skew-y": [{ "skew-y": ef() }],
            transform: [{ transform: [H, B, "", "none", "gpu", "cpu"] }],
            "transform-origin": [{ origin: y() }],
            "transform-style": [{ transform: ["3d", "flat"] }],
            translate: [{ translate: eg() }],
            "translate-x": [{ "translate-x": eg() }],
            "translate-y": [{ "translate-y": eg() }],
            "translate-z": [{ "translate-z": eg() }],
            "translate-none": ["translate-none"],
            accent: [{ accent: eo() }],
            appearance: [{ appearance: ["none", "auto"] }],
            "caret-color": [{ caret: eo() }],
            "color-scheme": [
              { scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"] },
            ],
            cursor: [
              {
                cursor: [
                  "auto",
                  "default",
                  "pointer",
                  "wait",
                  "text",
                  "move",
                  "help",
                  "not-allowed",
                  "none",
                  "context-menu",
                  "progress",
                  "cell",
                  "crosshair",
                  "vertical-text",
                  "alias",
                  "copy",
                  "no-drop",
                  "grab",
                  "grabbing",
                  "all-scroll",
                  "col-resize",
                  "row-resize",
                  "n-resize",
                  "e-resize",
                  "s-resize",
                  "w-resize",
                  "ne-resize",
                  "nw-resize",
                  "se-resize",
                  "sw-resize",
                  "ew-resize",
                  "ns-resize",
                  "nesw-resize",
                  "nwse-resize",
                  "zoom-in",
                  "zoom-out",
                  H,
                  B,
                ],
              },
            ],
            "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
            "pointer-events": [{ "pointer-events": ["auto", "none"] }],
            resize: [{ resize: ["none", "", "y", "x"] }],
            "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
            "scroll-m": [{ "scroll-m": C() }],
            "scroll-mx": [{ "scroll-mx": C() }],
            "scroll-my": [{ "scroll-my": C() }],
            "scroll-ms": [{ "scroll-ms": C() }],
            "scroll-me": [{ "scroll-me": C() }],
            "scroll-mt": [{ "scroll-mt": C() }],
            "scroll-mr": [{ "scroll-mr": C() }],
            "scroll-mb": [{ "scroll-mb": C() }],
            "scroll-ml": [{ "scroll-ml": C() }],
            "scroll-p": [{ "scroll-p": C() }],
            "scroll-px": [{ "scroll-px": C() }],
            "scroll-py": [{ "scroll-py": C() }],
            "scroll-ps": [{ "scroll-ps": C() }],
            "scroll-pe": [{ "scroll-pe": C() }],
            "scroll-pt": [{ "scroll-pt": C() }],
            "scroll-pr": [{ "scroll-pr": C() }],
            "scroll-pb": [{ "scroll-pb": C() }],
            "scroll-pl": [{ "scroll-pl": C() }],
            "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
            "snap-stop": [{ snap: ["normal", "always"] }],
            "snap-type": [{ snap: ["none", "x", "y", "both"] }],
            "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
            touch: [{ touch: ["auto", "none", "manipulation"] }],
            "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
            "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
            "touch-pz": ["touch-pinch-zoom"],
            select: [{ select: ["none", "text", "all", "auto"] }],
            "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", H, B] }],
            fill: [{ fill: ["none", ...eo()] }],
            "stroke-w": [{ stroke: [$, J, L, Q] }],
            stroke: [{ stroke: ["none", ...eo()] }],
            "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
          },
          conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            size: ["w", "h"],
            "font-size": ["leading"],
            "fvn-normal": [
              "fvn-ordinal",
              "fvn-slashed-zero",
              "fvn-figure",
              "fvn-spacing",
              "fvn-fraction",
            ],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            "line-clamp": ["display", "overflow"],
            rounded: [
              "rounded-s",
              "rounded-e",
              "rounded-t",
              "rounded-r",
              "rounded-b",
              "rounded-l",
              "rounded-ss",
              "rounded-se",
              "rounded-ee",
              "rounded-es",
              "rounded-tl",
              "rounded-tr",
              "rounded-br",
              "rounded-bl",
            ],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": [
              "border-w-x",
              "border-w-y",
              "border-w-s",
              "border-w-e",
              "border-w-t",
              "border-w-r",
              "border-w-b",
              "border-w-l",
            ],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": [
              "border-color-x",
              "border-color-y",
              "border-color-s",
              "border-color-e",
              "border-color-t",
              "border-color-r",
              "border-color-b",
              "border-color-l",
            ],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            translate: ["translate-x", "translate-y", "translate-none"],
            "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
            "scroll-m": [
              "scroll-mx",
              "scroll-my",
              "scroll-ms",
              "scroll-me",
              "scroll-mt",
              "scroll-mr",
              "scroll-mb",
              "scroll-ml",
            ],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": [
              "scroll-px",
              "scroll-py",
              "scroll-ps",
              "scroll-pe",
              "scroll-pt",
              "scroll-pr",
              "scroll-pb",
              "scroll-pl",
            ],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"],
          },
          conflictingClassGroupModifiers: { "font-size": ["leading"] },
          orderSensitiveModifiers: [
            "*",
            "**",
            "after",
            "backdrop",
            "before",
            "details-content",
            "file",
            "first-letter",
            "first-line",
            "marker",
            "placeholder",
            "selection",
          ],
        };
      });
    },
  },
]);

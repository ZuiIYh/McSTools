"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6198],
  {
    432: (e, r, a) => {
      a.d(r, { ZV: () => d });
      var n = a(44478),
        l = a(99729),
        t = a(73610),
        c = a(83818),
        i = a(46735);
      let s = {
        beginner: {
          color: "bg-brand-primary text-text-on-brand border-2 border-border-hard",
          icon: l.A,
          bgColor: "bg-brand-primary",
        },
        intermediate: {
          color: "bg-warning text-text-on-brand border-2 border-border-hard",
          icon: t.A,
          bgColor: "bg-warning",
        },
        advanced: {
          color: "bg-error text-white border-2 border-border-hard",
          icon: c.A,
          bgColor: "bg-error",
        },
        expert: {
          color: "bg-difficulty-expert text-white border-2 border-border-hard",
          icon: i.A,
          bgColor: "bg-difficulty-expert",
        },
      };
      function o(e) {
        let r = (0, n.g)(e),
          a = s[r.key];
        return { label: r.label, ...a };
      }
      function d(e) {
        return e >= 1e4
          ? "".concat((e / 1e4).toFixed(1), "万")
          : e >= 1e3
            ? "".concat((e / 1e3).toFixed(1), "K")
            : e.toString();
      }
      (o("easy"),
        o("beginner"),
        o("medium"),
        o("intermediate"),
        o("hard"),
        o("advanced"),
        o("expert"));
    },
    25016: (e, r, a) => {
      a.d(r, { cn: () => t });
      var n = a(2821),
        l = a(75889);
      function t() {
        for (var e = arguments.length, r = Array(e), a = 0; a < e; a++) r[a] = arguments[a];
        return (0, l.QP)((0, n.$)(r));
      }
    },
    42688: (e, r, a) => {
      a.d(r, { A: () => c, V: () => t });
      var n = a(95155);
      let l = [
        "#E95F56",
        "#C55BB8",
        "#6366F1",
        "#3B82F6",
        "#0EA5E9",
        "#14B8A6",
        "#22C55E",
        "#EAB308",
        "#F97316",
        "#8B5CF6",
      ];
      function t(e) {
        if (!e) return "#4A4566";
        let r = 0;
        for (let a = 0; a < e.length; a++) r = (31 * r + e.charCodeAt(a)) >>> 0;
        return l[r % l.length];
      }
      function c(e) {
        let { name: r, size: a = 17 } = e;
        return (0, n.jsx)("span", {
          className: "uc-av",
          style: { width: a, height: a, background: t(r), fontSize: Math.round(0.59 * a) },
          "aria-hidden": !0,
          children: r ? r.charAt(0) : "?",
        });
      }
    },
    44478: (e, r, a) => {
      a.d(r, { g: () => t });
      let n = {
          easy: "beginner",
          beginner: "beginner",
          medium: "intermediate",
          intermediate: "intermediate",
          hard: "advanced",
          advanced: "advanced",
          expert: "expert",
        },
        l = {
          beginner: {
            key: "beginner",
            label: "新手",
            bg: "var(--color-brand-primary)",
            fg: "#0B1503",
          },
          intermediate: {
            key: "intermediate",
            label: "进阶",
            bg: "var(--color-warning)",
            fg: "#0B1503",
          },
          advanced: { key: "advanced", label: "高级", bg: "var(--color-error)", fg: "#FFFFFF" },
          expert: {
            key: "expert",
            label: "大师",
            bg: "var(--color-difficulty-expert)",
            fg: "#FFFFFF",
          },
        };
      function t(e) {
        var r;
        return l[null != (r = n[null != e ? e : ""]) ? r : "beginner"];
      }
    },
    51750: (e, r, a) => {
      a.d(r, { y: () => i });
      var n = a(95155),
        l = a(64991),
        t = a(25016);
      let c = { xs: 16, sm: 28, md: 44, lg: 60, xl: 80 };
      function i(e) {
        let { size: r = "md", className: a, label: i } = e;
        return (0, n.jsxs)("span", {
          className: (0, t.cn)("mcb-loader", a),
          "data-size": r,
          style: { "--mcb-loader-box": "".concat(c[r], "px") },
          role: "status",
          "aria-label": null != i ? i : "加载中",
          children: [
            (0, n.jsx)(l.A, { className: "mcb-loader-icon" }),
            (0, n.jsx)("span", { className: "sr-only", children: null != i ? i : "加载中" }),
          ],
        });
      }
    },
    69605: (e, r, a) => {
      a.d(r, { A: () => x });
      var n = a(95155),
        l = a(12115),
        t = a(52619),
        c = a.n(t),
        i = a(26260),
        s = a(44460),
        o = a(42688),
        d = a(44478),
        u = a(432);
      let b = (0, n.jsx)("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        children: (0, n.jsx)("path", {
          d: "M12 21s-7.5-4.8-10-9.3C.6 8.3 2.6 4.5 6.4 4.5c2.2 0 3.7 1.2 4.6 2.6.9-1.4 2.4-2.6 4.6-2.6 3.8 0 5.8 3.8 4.4 7.2C19.5 16.2 12 21 12 21z",
        }),
      });
      function h(e) {
        var r;
        let { b: a } = e,
          [t, c] = (0, l.useState)(!1),
          i = {};
        return (
          a.viewBox && (i.objectViewBox = a.viewBox),
          (0, n.jsxs)(n.Fragment, {
            children: [
              a.coverImage &&
                (0, n.jsx)("img", {
                  src: a.coverImage,
                  alt: a.name,
                  loading: "lazy",
                  decoding: "async",
                  className: "uc-img-fade".concat(t ? " uc-in" : ""),
                  style: i,
                  ref: (e) => {
                    e && e.complete && e.naturalWidth > 0 && c(!0);
                  },
                  onLoad: () => c(!0),
                }),
              !!(r = a.createdAt) &&
                Date.now() - new Date(r).getTime() < 12096e5 &&
                (0, n.jsx)("div", {
                  className: "uc-badges",
                  children: (0, n.jsx)("span", { className: "uc-newtag", children: "NEW" }),
                }),
              "number" == typeof a.height &&
                a.height > 0 &&
                (0, n.jsxs)("span", {
                  className: "uc-lay",
                  children: ["建筑高度 ", (0, n.jsx)("b", { children: a.height }), " 格"],
                }),
            ],
          })
        );
      }
      function m(e) {
        let { b: r, className: a } = e;
        return (0, n.jsxs)("div", {
          className: a,
          children: [
            (0, n.jsx)(o.A, { name: r.projectionAuthor }),
            (0, n.jsx)("span", {
              style: r.projectionAuthor ? void 0 : { color: "var(--color-text-disabled)" },
              children: r.projectionAuthor || "未知作者",
            }),
            "number" == typeof r.blockCount &&
              r.blockCount > 0 &&
              (0, n.jsxs)(n.Fragment, {
                children: [
                  " \xb7 ",
                  (0, n.jsx)("b", { children: (0, u.ZV)(r.blockCount) }),
                  " 方块",
                ],
              }),
            "number" == typeof r.learnCount &&
              r.learnCount > 0 &&
              (0, n.jsxs)("span", {
                className: "uc-lc",
                children: [
                  (0, n.jsxs)("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: [
                      (0, n.jsx)("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }),
                      (0, n.jsx)("circle", { cx: "9", cy: "7", r: "4" }),
                    ],
                  }),
                  (0, n.jsx)("b", { children: (0, u.ZV)(r.learnCount) }),
                  " 在学",
                ],
              }),
          ],
        });
      }
      function x(e) {
        let { building: r, variant: a = "clean", onFavoriteToggle: t } = e,
          o = (0, d.g)(r.difficulty),
          {
            on: u,
            toggle: x,
            busy: g,
          } = (function (e, r) {
            let { promptLogin: a } = (0, i.E)(),
              [n, t] = (0, l.useState)(!!e.isFavorited),
              [c, s] = (0, l.useState)(!1);
            (0, l.useEffect)(() => {
              t(!!e.isFavorited);
            }, [e.isFavorited]);
            let o = (0, l.useCallback)(
              async (l) => {
                if ((l.preventDefault(), l.stopPropagation(), c)) return;
                s(!0);
                let i = !n;
                t(i);
                try {
                  var o;
                  let n = await fetch("/api/buildings/".concat(e.id, "/favorite"), {
                    method: i ? "POST" : "DELETE",
                  });
                  if (401 === n.status) {
                    (t(!i), a({ action: "收藏建筑" }));
                    return;
                  }
                  if (!n.ok) return void t(!i);
                  let l = await n.json().catch(() => null),
                    c =
                      (null == l ? void 0 : l.success) &&
                      "boolean" == typeof (null == l || null == (o = l.data) ? void 0 : o.favorited)
                        ? l.data.favorited
                        : i;
                  (t(c), null == r || r(e.id, c));
                } catch (e) {
                  t(!i);
                } finally {
                  s(!1);
                }
              },
              [a, n, c, e.id, r],
            );
            return { on: n, toggle: o, busy: c };
          })(r, t),
          v = null != r.tintHue ? { "--uc-tint": "hsl(".concat(r.tintHue, " 9% 11%)") } : void 0,
          f = "/buildings/".concat(r.id);
        return "immersive" === a
          ? (0, n.jsxs)(c(), {
              href: f,
              className: "uc-card uc-card--immersive",
              style: v,
              children: [
                (0, n.jsx)("div", { className: "uc-pic", children: (0, n.jsx)(h, { b: r }) }),
                (0, n.jsxs)("div", {
                  className: "uc-imm-bar",
                  children: [
                    (0, n.jsxs)("div", {
                      className: "uc-trow",
                      children: [
                        (0, n.jsxs)("div", {
                          className: "uc-ttl",
                          children: [
                            r.name,
                            (0, n.jsx)("span", { className: "uc-arr", children: "→" }),
                          ],
                        }),
                        (0, n.jsxs)("span", {
                          className: "uc-diff",
                          children: [
                            (0, n.jsx)("span", {
                              className: "uc-dot",
                              style: { background: o.bg },
                            }),
                            o.label,
                          ],
                        }),
                      ],
                    }),
                    (0, n.jsx)(m, { b: r, className: "uc-imm-more" }),
                  ],
                }),
              ],
            })
          : (0, n.jsxs)("article", {
              className: "uc-card",
              style: v,
              children: [
                (0, n.jsxs)(c(), {
                  href: f,
                  className: "uc-card-link",
                  children: [
                    (0, n.jsx)("div", { className: "uc-pic", children: (0, n.jsx)(h, { b: r }) }),
                    (0, n.jsxs)("div", {
                      className: "uc-body",
                      children: [
                        (0, n.jsxs)("div", {
                          className: "uc-trow",
                          children: [
                            (0, n.jsxs)("div", {
                              className: "uc-ttl",
                              children: [
                                r.name,
                                (0, n.jsx)("span", { className: "uc-arr", children: "→" }),
                              ],
                            }),
                            (0, n.jsxs)("span", {
                              className: "uc-diff",
                              children: [
                                (0, n.jsx)("span", {
                                  className: "uc-dot",
                                  style: { background: o.bg },
                                }),
                                o.label,
                              ],
                            }),
                          ],
                        }),
                        (0, n.jsx)(m, { b: r, className: "uc-auth" }),
                      ],
                    }),
                  ],
                }),
                (0, n.jsx)(s.K, {
                  label: u ? "取消收藏" : "收藏",
                  size: "xs",
                  variant: "secondary",
                  className: "uc-fav".concat(u ? " uc-on" : ""),
                  onClick: x,
                  disabled: g,
                  "aria-pressed": u,
                  children: b,
                }),
              ],
            });
      }
    },
    75377: (e, r, a) => {
      function n(e) {
        let r = 0;
        for (let a = 0; a < e.length; a++) r += e.charCodeAt(a);
        return ((r % 360) + 360) % 360;
      }
      function l(e) {
        var r, a, l, t, c, i, s, o;
        return {
          id: e.id,
          name: e.name,
          coverImage: null != (r = e.coverImage) ? r : null,
          difficulty: null != (a = e.difficulty) ? a : null,
          projectionAuthor: null != (l = e.projectionAuthor) ? l : null,
          blockCount: null != (t = e.blockCount) ? t : null,
          height: null != (c = e.height) ? c : null,
          learnCount: null != (i = e.learnCount) ? i : null,
          createdAt: null != (s = e.createdAt) ? s : null,
          isFavorited: null != (o = e.isFavorited) && o,
          viewBox: null,
          tintHue: n(e.id),
        };
      }
      function t(e) {
        return e.map(l);
      }
      a.d(r, { DN: () => n, Wb: () => l, hR: () => t });
    },
  },
]);

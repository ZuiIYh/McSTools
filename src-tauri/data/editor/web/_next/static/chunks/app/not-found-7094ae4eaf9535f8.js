(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4345],
  {
    26337: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "help-circle", "HelpCircle", [
        ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
        ["path", { d: "M12 16v.01", key: "svg-1" }],
        ["path", { d: "M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483", key: "svg-2" }],
      ]);
    },
    30313: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => i });
      var a = r(12115),
        s = {
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
      let i = (e, t, r, i) => {
        let l = (0, a.forwardRef)((r, l) => {
          let {
            color: d = "currentColor",
            size: n = 24,
            stroke: o = 2,
            title: c,
            className: h,
            children: x,
            ...m
          } = r;
          return (0, a.createElement)(
            "svg",
            {
              ref: l,
              ...s[e],
              width: n,
              height: n,
              className: ["tabler-icon", "tabler-icon-".concat(t), h].join(" "),
              ...("filled" === e ? { fill: d } : { strokeWidth: o, stroke: d }),
              ...m,
            },
            [
              c && (0, a.createElement)("title", { key: "svg-title" }, c),
              ...i.map((e) => {
                let [t, r] = e;
                return (0, a.createElement)(t, r);
              }),
              ...(Array.isArray(x) ? x : [x]),
            ],
          );
        });
        return ((l.displayName = "".concat(r)), l);
      };
    },
    33293: (e, t, r) => {
      "use strict";
      (r.r(t), r.d(t, { default: () => h }));
      var a = r(95155),
        s = r(1733),
        i = r(52619),
        l = r.n(i),
        d = r(85501),
        n = r(78013),
        o = r(26337),
        c = r(67812);
      function h() {
        return (0, a.jsx)("div", {
          className: "min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12",
          children: (0, a.jsx)("div", {
            className: "max-w-2xl w-full",
            children: (0, a.jsxs)(s.P.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "text-center",
              children: [
                (0, a.jsx)(s.P.div, {
                  initial: { scale: 0.8, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.2 },
                  className: "mb-8",
                  children: (0, a.jsx)("h1", {
                    className:
                      "text-[120px] sm:text-[180px] font-black text-brand-primary leading-none",
                    children: "404",
                  }),
                }),
                (0, a.jsxs)(s.P.div, {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.4 },
                  className: "mb-8",
                  children: [
                    (0, a.jsx)("h2", {
                      className:
                        "text-2xl sm:text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide",
                      children: "页面未找到",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-lg text-text-secondary mb-2",
                      children: "抱歉，您访问的页面不存在或已被移除",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-sm text-text-muted",
                      children: "请检查URL是否正确，或返回首页继续浏览",
                    }),
                  ],
                }),
                (0, a.jsxs)(s.P.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.6 },
                  className: "flex flex-col sm:flex-row gap-4 justify-center mb-12",
                  children: [
                    (0, a.jsxs)(l(), {
                      href: "/",
                      className:
                        "inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-cta text-text-on-brand border-2 border-border-hard rounded-md shadow-block hover:shadow-block-hover hover:-translate-x-1 hover:-translate-y-1 transition-all duration-fast font-bold uppercase tracking-wide",
                      children: [(0, a.jsx)(d.A, { size: 20 }), "返回首页"],
                    }),
                    (0, a.jsxs)(l(), {
                      href: "/buildings",
                      className:
                        "inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-card text-text-primary border-2 border-border-hard rounded-md shadow-block hover:shadow-block-hover hover:-translate-x-1 hover:-translate-y-1 transition-all duration-fast font-bold",
                      children: [(0, a.jsx)(n.A, { size: 20 }), "开始学习"],
                    }),
                  ],
                }),
                (0, a.jsxs)(s.P.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.8 },
                  className:
                    "bg-bg-card border-2 border-border-hard rounded-lg shadow-block p-6 sm:p-8",
                  children: [
                    (0, a.jsx)("h3", {
                      className: "text-lg font-bold text-text-primary mb-4 uppercase tracking-wide",
                      children: "您可能在寻找",
                    }),
                    (0, a.jsxs)("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                      children: [
                        (0, a.jsxs)(l(), {
                          href: "/buildings",
                          className:
                            "flex items-center gap-3 p-4 rounded-md border-2 border-border-soft bg-bg-elevated hover:border-brand-primary hover:-translate-y-0.5 transition-all duration-fast text-left group",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "w-10 h-10 bg-brand-primary/20 border-2 border-border-hard rounded-md flex items-center justify-center flex-shrink-0",
                              children: (0, a.jsx)(n.A, {
                                size: 20,
                                className: "text-brand-primary",
                              }),
                            }),
                            (0, a.jsxs)("div", {
                              children: [
                                (0, a.jsx)("h4", {
                                  className: "font-bold text-text-primary",
                                  children: "建筑库",
                                }),
                                (0, a.jsx)("p", {
                                  className: "text-sm text-text-muted",
                                  children: "481个精选作品",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)(l(), {
                          href: "/help",
                          className:
                            "flex items-center gap-3 p-4 rounded-md border-2 border-border-soft bg-bg-elevated hover:border-info hover:-translate-y-0.5 transition-all duration-fast text-left group",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "w-10 h-10 bg-info/20 border-2 border-border-hard rounded-md flex items-center justify-center flex-shrink-0",
                              children: (0, a.jsx)(o.A, { size: 20, className: "text-info" }),
                            }),
                            (0, a.jsxs)("div", {
                              children: [
                                (0, a.jsx)("h4", {
                                  className: "font-bold text-text-primary",
                                  children: "帮助中心",
                                }),
                                (0, a.jsx)("p", {
                                  className: "text-sm text-text-muted",
                                  children: "常见问题解答",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)(l(), {
                          href: "/about",
                          className:
                            "flex items-center gap-3 p-4 rounded-md border-2 border-border-soft bg-bg-elevated hover:border-difficulty-expert hover:-translate-y-0.5 transition-all duration-fast text-left group",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "w-10 h-10 bg-difficulty-expert/20 border-2 border-border-hard rounded-md flex items-center justify-center flex-shrink-0",
                              children: (0, a.jsx)(c.A, {
                                size: 20,
                                className: "text-difficulty-expert",
                              }),
                            }),
                            (0, a.jsxs)("div", {
                              children: [
                                (0, a.jsx)("h4", {
                                  className: "font-bold text-text-primary",
                                  children: "关于我们",
                                }),
                                (0, a.jsx)("p", {
                                  className: "text-sm text-text-muted",
                                  children: "了解投影编辑器",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)(s.P.div, {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 1 },
                  className: "mt-8 text-sm text-text-muted",
                  children: (0, a.jsx)("p", {
                    children: "如果问题持续，请联系客服：support@localhost",
                  }),
                }),
              ],
            }),
          }),
        });
      }
    },
    67812: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "info-circle", "InfoCircle", [
        ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
        ["path", { d: "M12 9h.01", key: "svg-1" }],
        ["path", { d: "M11 12h1v4h1", key: "svg-2" }],
      ]);
    },
    78013: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "book-2", "Book2", [
        ["path", { d: "M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12", key: "svg-0" }],
        ["path", { d: "M19 16h-12a2 2 0 0 0 -2 2", key: "svg-1" }],
        ["path", { d: "M9 8h6", key: "svg-2" }],
      ]);
    },
    85501: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "home", "Home", [
        ["path", { d: "M5 12l-2 0l9 -9l9 9l-2 0", key: "svg-0" }],
        ["path", { d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7", key: "svg-1" }],
        ["path", { d: "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6", key: "svg-2" }],
      ]);
    },
    94560: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 33293));
    },
  },
  (e) => {
    (e.O(0, [2619, 1733, 8441, 7391, 7358], () => e((e.s = 94560))), (_N_E = e.O()));
  },
]);

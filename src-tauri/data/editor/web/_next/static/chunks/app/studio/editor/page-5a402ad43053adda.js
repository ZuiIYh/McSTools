(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4483],
  {
    1150: (e, r, s) => {
      "use strict";
      (Object.defineProperty(r, "__esModule", { value: !0 }),
        Object.defineProperty(r, "default", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }));
      let l = s(95155),
        a = s(12115),
        t = s(24437);
      function n(e) {
        return { default: e && "default" in e ? e.default : e };
      }
      s(36552);
      let d = { loader: () => Promise.resolve(n(() => null)), loading: null, ssr: !0 },
        i = function (e) {
          let r = { ...d, ...e },
            s = (0, a.lazy)(() => r.loader().then(n)),
            i = r.loading;
          function o(e) {
            let n = i ? (0, l.jsx)(i, { isLoading: !0, pastDelay: !0, error: null }) : null,
              d = !r.ssr || !!r.loading,
              o = d ? a.Suspense : a.Fragment,
              c = r.ssr
                ? (0, l.jsxs)(l.Fragment, { children: [null, (0, l.jsx)(s, { ...e })] })
                : (0, l.jsx)(t.BailoutToCSR, {
                    reason: "next/dynamic",
                    children: (0, l.jsx)(s, { ...e }),
                  });
            return (0, l.jsx)(o, { ...(d ? { fallback: n } : {}), children: c });
          }
          return ((o.displayName = "LoadableComponent"), o);
        };
    },
    5567: (e, r, s) => {
      "use strict";
      (s.r(r), s.d(r, { default: () => i }));
      var l = s(95155),
        a = s(67909),
        t = s(51750);
      function n() {
        return (0, l.jsxs)("div", {
          className: "h-screen bg-bg-primary flex flex-col overflow-hidden",
          children: [
            (0, l.jsxs)("div", {
              className:
                "h-12 bg-bg-card border-b-2 border-border-hard flex items-center px-[9px] lg:px-3 shrink-0 gap-[7px] lg:gap-2.5",
              children: [
                (0, l.jsx)("div", {
                  className: "w-8 h-8 sk-blk border-2 border-border-hard shadow-block shrink-0",
                }),
                (0, l.jsx)("div", { className: "w-0.5 h-6 bg-border-hard shrink-0" }),
                (0, l.jsx)("div", { className: "h-4 w-32 sk-blk shrink-0" }),
                (0, l.jsx)("div", { className: "w-0.5 h-6 bg-border-hard shrink-0" }),
                (0, l.jsxs)("div", {
                  className: "flex gap-1.5",
                  children: [
                    (0, l.jsx)("div", { className: "w-8 h-8 sk-blk border-2 border-border-hard" }),
                    (0, l.jsx)("div", { className: "w-8 h-8 sk-deep border-2 border-border-hard" }),
                  ],
                }),
                (0, l.jsx)("div", { className: "flex-1" }),
                (0, l.jsxs)("div", {
                  className: "flex gap-1.5",
                  children: [
                    (0, l.jsx)("div", { className: "h-8 w-16 sk-blk border-2 border-border-hard" }),
                    (0, l.jsx)("div", { className: "h-8 w-16 sk-blk border-2 border-border-hard" }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "flex-1 flex overflow-hidden min-h-0",
              children: [
                (0, l.jsxs)("div", {
                  className: "flex-1 relative min-w-0 bg-bg-canvas",
                  children: [
                    (0, l.jsx)("div", {
                      className: "absolute inset-0 flex items-center justify-center",
                      children: (0, l.jsxs)("div", {
                        className: "flex flex-col items-center gap-3",
                        children: [
                          (0, l.jsx)(t.y, { size: "md" }),
                          (0, l.jsx)("div", { className: "h-4 w-28 sk-blk" }),
                        ],
                      }),
                    }),
                    (0, l.jsx)("div", {
                      className:
                        "hidden lg:flex absolute left-3.5 top-1/2 -translate-y-1/2 flex-col gap-0.5 bg-black/60 border-2 border-white/[0.08] p-1.5 z-10",
                      children: [0, 1, -1, 2, 3, 4, -1, 5, 6, 7, -1, 8].map((e, r) =>
                        -1 === e
                          ? (0, l.jsx)("div", { className: "h-0.5 bg-white/[0.08] my-0.5" }, r)
                          : (0, l.jsx)(
                              "div",
                              {
                                className:
                                  "w-9 h-9 bg-white/[0.06] border border-white/[0.06] animate-pulse",
                              },
                              r,
                            ),
                      ),
                    }),
                  ],
                }),
                (0, l.jsxs)("div", {
                  className:
                    "hidden lg:flex w-[280px] 2xl:w-[312px] bg-bg-card border-l-2 border-border-hard flex-col shrink-0",
                  children: [
                    (0, l.jsxs)("div", {
                      className: "p-3.5 border-b-2 border-border-hard",
                      children: [
                        (0, l.jsx)("div", { className: "h-3 w-14 sk-deep mb-3" }),
                        (0, l.jsx)("div", { className: "h-8 sk-blk border-2 border-border-hard" }),
                      ],
                    }),
                    (0, l.jsx)("div", {
                      className: "p-3.5 flex-1 flex flex-col gap-1 overflow-hidden",
                      children: Array.from({ length: 6 }).map((e, r) =>
                        (0, l.jsxs)(
                          "div",
                          {
                            className: "flex items-center gap-2 py-1.5 px-2 bg-bg-inset",
                            children: [
                              (0, l.jsx)("div", {
                                className: "w-6 h-6 sk-deep border-2 border-border-hard shrink-0",
                              }),
                              (0, l.jsxs)("div", {
                                className: "flex-1 flex flex-col gap-1",
                                children: [
                                  (0, l.jsx)("div", { className: "h-3 w-16 sk-deep" }),
                                  (0, l.jsx)("div", { className: "h-2.5 w-10 sk-deep" }),
                                ],
                              }),
                            ],
                          },
                          r,
                        ),
                      ),
                    }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              className:
                "flex h-6 bg-bg-card border-t-2 border-border-hard items-center px-[11px] lg:px-3 gap-3 lg:gap-3.5 shrink-0",
              children: [
                Array.from({ length: 4 }).map((e, r) =>
                  (0, l.jsx)("div", { className: "h-2.5 w-20 sk-blk" }, r),
                ),
                (0, l.jsx)("div", { className: "flex-1" }),
                (0, l.jsx)("div", { className: "h-2.5 w-14 sk-blk" }),
              ],
            }),
          ],
        });
      }
      let d = (0, a.default)(
        () =>
          Promise.all([
            s.e(5452),
            s.e(5033),
            s.e(1831),
            s.e(9367),
            s.e(8413),
            s.e(4664),
            s.e(6413),
            s.e(8683),
            s.e(2619),
            s.e(1733),
            s.e(8303),
            s.e(8304),
            s.e(9074),
            s.e(9703),
            s.e(1379),
            s.e(5535),
            s.e(3127),
            s.e(9033),
            s.e(6559),
            s.e(5340),
            s.e(6260),
            s.e(7578),
            s.e(8652),
            s.e(7500),
            s.e(7879),
            s.e(4628),
            s.e(2378),
            s.e(8203),
            s.e(2925),
            s.e(4180),
          ]).then(s.bind(s, 63092)),
        {
          loadableGenerated: { webpack: () => [63092] },
          ssr: !1,
          loading: () => (0, l.jsx)(n, {}),
        },
      );
      function i() {
        return (0, l.jsx)(d, {});
      }
    },
    8567: (e, r, s) => {
      "use strict";
      (Object.defineProperty(r, "__esModule", { value: !0 }),
        Object.defineProperty(r, "workAsyncStorage", {
          enumerable: !0,
          get: function () {
            return l.workAsyncStorageInstance;
          },
        }));
      let l = s(17828);
    },
    17828: (e, r, s) => {
      "use strict";
      (Object.defineProperty(r, "__esModule", { value: !0 }),
        Object.defineProperty(r, "workAsyncStorageInstance", {
          enumerable: !0,
          get: function () {
            return l;
          },
        }));
      let l = (0, s(64054).createAsyncLocalStorage)();
    },
    24437: (e, r, s) => {
      "use strict";
      function l(e) {
        let { reason: r, children: s } = e;
        return s;
      }
      (Object.defineProperty(r, "__esModule", { value: !0 }),
        Object.defineProperty(r, "BailoutToCSR", {
          enumerable: !0,
          get: function () {
            return l;
          },
        }),
        s(24553));
    },
    25016: (e, r, s) => {
      "use strict";
      s.d(r, { cn: () => t });
      var l = s(2821),
        a = s(75889);
      function t() {
        for (var e = arguments.length, r = Array(e), s = 0; s < e; s++) r[s] = arguments[s];
        return (0, a.QP)((0, l.$)(r));
      }
    },
    36552: (e, r, s) => {
      "use strict";
      function l(e) {
        let { moduleIds: r } = e;
        return null;
      }
      (Object.defineProperty(r, "__esModule", { value: !0 }),
        Object.defineProperty(r, "PreloadChunks", {
          enumerable: !0,
          get: function () {
            return l;
          },
        }),
        s(95155),
        s(47650),
        s(8567),
        s(77278));
    },
    51750: (e, r, s) => {
      "use strict";
      s.d(r, { y: () => d });
      var l = s(95155),
        a = s(64991),
        t = s(25016);
      let n = { xs: 16, sm: 28, md: 44, lg: 60, xl: 80 };
      function d(e) {
        let { size: r = "md", className: s, label: d } = e;
        return (0, l.jsxs)("span", {
          className: (0, t.cn)("mcb-loader", s),
          "data-size": r,
          style: { "--mcb-loader-box": "".concat(n[r], "px") },
          role: "status",
          "aria-label": null != d ? d : "加载中",
          children: [
            (0, l.jsx)(a.A, { className: "mcb-loader-icon" }),
            (0, l.jsx)("span", { className: "sr-only", children: null != d ? d : "加载中" }),
          ],
        });
      }
    },
    64054: (e, r) => {
      "use strict";
      (Object.defineProperty(r, "__esModule", { value: !0 }),
        !(function (e, r) {
          for (var s in r) Object.defineProperty(e, s, { enumerable: !0, get: r[s] });
        })(r, {
          bindSnapshot: function () {
            return n;
          },
          createAsyncLocalStorage: function () {
            return t;
          },
          createSnapshot: function () {
            return d;
          },
        }));
      let s = Object.defineProperty(
        Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"),
        "__NEXT_ERROR_CODE",
        { value: "E504", enumerable: !1, configurable: !0 },
      );
      class l {
        disable() {
          throw s;
        }
        getStore() {}
        run() {
          throw s;
        }
        exit() {
          throw s;
        }
        enterWith() {
          throw s;
        }
        static bind(e) {
          return e;
        }
      }
      let a = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function t() {
        return a ? new a() : new l();
      }
      function n(e) {
        return a ? a.bind(e) : l.bind(e);
      }
      function d() {
        return a
          ? a.snapshot()
          : function (e, ...r) {
              return e(...r);
            };
      }
    },
    64991: (e, r, s) => {
      "use strict";
      s.d(r, { A: () => l });
      let l = (0, s(30313).A)("outline", "cube", "Cube", [
        [
          "path",
          {
            d: "M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718",
            key: "svg-0",
          },
        ],
        ["path", { d: "M12 22v-10", key: "svg-1" }],
        ["path", { d: "M12 12l8.73 -5.04", key: "svg-2" }],
        ["path", { d: "M3.27 6.96l8.73 5.04", key: "svg-3" }],
      ]);
    },
    67909: (e, r, s) => {
      "use strict";
      s.d(r, { default: () => a.a });
      var l = s(86278),
        a = s.n(l);
    },
    71272: (e, r, s) => {
      Promise.resolve().then(s.bind(s, 5567));
    },
    86278: (e, r, s) => {
      "use strict";
      (Object.defineProperty(r, "__esModule", { value: !0 }),
        Object.defineProperty(r, "default", {
          enumerable: !0,
          get: function () {
            return a;
          },
        }));
      let l = s(28140)._(s(1150));
      function a(e, r) {
        var s;
        let a = {};
        "function" == typeof e && (a.loader = e);
        let t = { ...a, ...r };
        return (0, l.default)({
          ...t,
          modules: null == (s = t.loadableGenerated) ? void 0 : s.modules,
        });
      }
      ("function" == typeof r.default || ("object" == typeof r.default && null !== r.default)) &&
        void 0 === r.default.__esModule &&
        (Object.defineProperty(r.default, "__esModule", { value: !0 }),
        Object.assign(r.default, r),
        (e.exports = r.default));
    },
  },
  (e) => {
    (e.O(0, [4053, 8441, 7391, 7358], () => e((e.s = 71272))), (_N_E = e.O()));
  },
]);

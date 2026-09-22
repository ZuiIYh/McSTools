(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8039],
  {
    12066: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 49567));
    },
    30313: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => n });
      var s = r(12115),
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
      let n = (e, t, r, n) => {
        let i = (0, s.forwardRef)((r, i) => {
          let {
            color: o = "currentColor",
            size: a = 24,
            stroke: c = 2,
            title: d,
            className: h,
            children: u,
            ...m
          } = r;
          return (0, s.createElement)(
            "svg",
            {
              ref: i,
              ...l[e],
              width: a,
              height: a,
              className: ["tabler-icon", "tabler-icon-".concat(t), h].join(" "),
              ...("filled" === e ? { fill: o } : { strokeWidth: c, stroke: o }),
              ...m,
            },
            [
              d && (0, s.createElement)("title", { key: "svg-title" }, d),
              ...n.map((e) => {
                let [t, r] = e;
                return (0, s.createElement)(t, r);
              }),
              ...(Array.isArray(u) ? u : [u]),
            ],
          );
        });
        return ((i.displayName = "".concat(r)), i);
      };
    },
    49567: (e, t, r) => {
      "use strict";
      (r.r(t), r.d(t, { default: () => o }));
      var s = r(95155),
        l = r(27122),
        n = r(12115),
        i = r(64991);
      function o(e) {
        let { error: t, reset: r } = e;
        return (
          (0, n.useEffect)(() => {
            (l.Cp(t), console.error("全局错误:", t));
          }, [t]),
          (0, s.jsx)("div", {
            className: "min-h-[60vh] flex items-center justify-center px-4",
            children: (0, s.jsxs)("div", {
              className: "text-center max-w-md",
              children: [
                (0, s.jsx)("div", {
                  className: "text-6xl mb-4 text-error",
                  children: (0, s.jsx)(i.A, { size: 16 }),
                }),
                (0, s.jsx)("h2", {
                  className: "text-xl font-semibold text-foreground mb-2",
                  children: "页面出了点问题",
                }),
                (0, s.jsx)("p", {
                  className: "text-muted-foreground mb-6",
                  children: t.message || "发生了意外错误，请稍后重试",
                }),
                (0, s.jsx)("button", {
                  onClick: r,
                  className:
                    "px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
                  children: "重新加载",
                }),
              ],
            }),
          })
        );
      }
    },
    64991: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => s });
      let s = (0, r(30313).A)("outline", "cube", "Cube", [
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
  },
  (e) => {
    (e.O(0, [8441, 7391, 7358], () => e((e.s = 12066))), (_N_E = e.O()));
  },
]);

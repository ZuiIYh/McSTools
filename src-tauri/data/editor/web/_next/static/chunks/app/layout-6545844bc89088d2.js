(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7177],
  {
    214: (e, t, r) => {
      "use strict";
      r.d(t, { BetaFeedbackFab: () => j });
      var a = r(95155),
        n = r(12115),
        s = r(20063),
        i = r(36489),
        l = r(71442),
        o = r(80645),
        d = r(97003),
        c = r(44460),
        x = r(33789),
        h = r(26260);
      let u = (0, r(30313).A)("outline", "bug", "Bug", [
        ["path", { d: "M9 9v-1a3 3 0 0 1 6 0v1", key: "svg-0" }],
        ["path", { d: "M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3", key: "svg-1" }],
        ["path", { d: "M3 13l4 0", key: "svg-2" }],
        ["path", { d: "M17 13l4 0", key: "svg-3" }],
        ["path", { d: "M12 20l0 -6", key: "svg-4" }],
        ["path", { d: "M4 19l3.35 -2", key: "svg-5" }],
        ["path", { d: "M20 19l-3.35 -2", key: "svg-6" }],
        ["path", { d: "M4 7l3.75 2.4", key: "svg-7" }],
        ["path", { d: "M20 7l-3.75 2.4", key: "svg-8" }],
      ]);
      var m = r(99099),
        b = r(44748),
        p = r(16114);
      let g = ["/admin", "/studio/editor"],
        f = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        v = {
          action: "错误反馈",
          description:
            "提交错误反馈需要登录，方便我们追踪问题进度并通过邮箱回复你。注册一个账号即可，全程免费。",
        };
      function j() {
        var e, t, r;
        let j = (0, s.usePathname)(),
          { data: y } = (0, i.useSession)(),
          { requireLogin: w, promptLogin: N } = (0, h.E)(),
          [k, A] = (0, n.useState)(!1),
          [C, M] = (0, n.useState)(""),
          [z, S] = (0, n.useState)(""),
          [_, B] = (0, n.useState)(""),
          [E, P] = (0, n.useState)(""),
          [L, F] = (0, n.useState)(0),
          [W, U] = (0, n.useState)(!1),
          [I, q] = (0, n.useState)(null),
          [T, O] = (0, n.useState)(null),
          [D, R] = (0, n.useState)(!1),
          H = (0, n.useCallback)(() => {
            (M(""), S(""), B(""), P(""), F((e) => e + 1), O(null));
          }, []),
          $ = async () => {
            var e, t;
            let r = await (0, i.getSession)(),
              a =
                (null == r || null == (e = r.user) ? void 0 : e.email) ||
                (null == y || null == (t = y.user) ? void 0 : t.email) ||
                "";
            (B((e) => (e.trim() ? e : a)), q(null), A(!0));
          },
          Q = () => {
            w({ ...v, onSuccess: $ }) && $();
          };
        if (g.some((e) => (null == j ? void 0 : j.startsWith(e)))) return null;
        let K = async (e) => {
          if ((e.preventDefault(), O(null), !C || C.trim().length < 4))
            return O("问题简述至少 4 字");
          if (C.length > 200) return O("问题简述不得超过 200 字");
          if (!z || z.trim().length < 10) return O("详细描述至少 10 字");
          if (z.length > 5e3) return O("详细描述不得超过 5000 字");
          if (!_.trim()) return O("请填写联系邮箱");
          if (!f.test(_.trim())) return O("邮箱格式有误，请填写真实邮箱");
          if (!E || E.length < 3) return O("请输入图形验证码");
          U(!0);
          try {
            var t, r, a, n, s;
            let e = (function (e, t, r) {
                let a = "undefined" != typeof navigator ? navigator.userAgent : "",
                  n = "".concat(window.innerWidth, " \xd7 ").concat(window.innerHeight),
                  s = new Date().toLocaleString("sv-SE").replace("T", " ");
                return "\n\n--- 自动诊断 ---\n页面："
                  .concat(e || "/", "\n登录：")
                  .concat(t ? "已登录 (".concat(r || t, ")") : "未登录", "\n浏览器：")
                  .concat(a, "\n屏幕：")
                  .concat(n, "\n时间：")
                  .concat(s);
              })(
                j,
                null == y || null == (t = y.user) ? void 0 : t.id,
                null == y || null == (r = y.user) ? void 0 : r.name,
              ),
              i = await fetch("/api/feedbacks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  category: "beta_feedback",
                  subject: C.trim(),
                  content: z.trim() + e,
                  contactEmail: _.trim(),
                  captcha: E,
                }),
              }),
              l = await i.json();
            l.success
              ? (A(!1), q(l.data.id), H())
              : (null == (a = l.error) ? void 0 : a.code) === "UNAUTHORIZED"
                ? (A(!1), N({ ...v, onSuccess: $ }))
                : (O((null == (n = l.error) ? void 0 : n.message) || "提交失败"),
                  (null == (s = l.error) ? void 0 : s.code) === "CAPTCHA_INVALID" &&
                    (P(""), F((e) => e + 1)));
          } catch (e) {
            O("网络错误，请稍后重试");
          } finally {
            U(!1);
          }
        };
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)("div", {
              className:
                "fixed bottom-6 right-6 z-[100] hidden md:flex flex-col items-center gap-1.5",
              children: (0, a.jsxs)(d.$, {
                type: "button",
                onClick: Q,
                size: "sm",
                variant: "primary",
                className: "w-[116px]",
                title: "提交内测错误反馈",
                "aria-label": "打开内测错误反馈表单",
                children: [(0, a.jsx)(u, { size: 12 }), "错误反馈"],
              }),
            }),
            (0, a.jsxs)("div", {
              className:
                "fixed bottom-[72px] right-3 z-[100] flex md:hidden flex-col items-end gap-1.5",
              children: [
                D &&
                  (0, a.jsxs)(d.$, {
                    type: "button",
                    onClick: () => {
                      (Q(), R(!1));
                    },
                    size: "sm",
                    variant: "primary",
                    className: "w-[100px]",
                    children: [(0, a.jsx)(u, { size: 10 }), "错误反馈"],
                  }),
                (0, a.jsx)(c.K, {
                  type: "button",
                  onClick: () => R(!D),
                  size: "sm",
                  variant: "secondary",
                  label: D ? "收起反馈面板" : "展开反馈面板",
                  children: D ? (0, a.jsx)(m.A, { size: 16 }) : (0, a.jsx)(u, { size: 16 }),
                }),
              ],
            }),
            (0, a.jsx)(l.a, {
              open: !!I && !k,
              onClose: () => q(null),
              size: "sm",
              children: (0, a.jsxs)("div", {
                className: "text-center py-4",
                children: [
                  (0, a.jsx)("div", {
                    className:
                      "w-14 h-14 mx-auto mb-4 bg-brand-primary text-text-on-brand border-2 border-border-hard rounded shadow-block flex items-center justify-center",
                    children: (0, a.jsx)("svg", {
                      className: "w-7 h-7",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "3",
                      children: (0, a.jsx)("path", { d: "M5 13l4 4L19 7" }),
                    }),
                  }),
                  (0, a.jsx)("h3", {
                    className: "text-xl font-extrabold text-text-primary mb-1",
                    children: "报告已收到",
                  }),
                  (0, a.jsxs)("p", {
                    className: "text-sm text-text-secondary mb-1",
                    children: [
                      "工单号 ",
                      (0, a.jsx)("code", {
                        className:
                          "px-2 py-0.5 bg-bg-card border-2 border-border-hard rounded-sm font-mono text-xs text-text-primary",
                        children: I,
                      }),
                    ],
                  }),
                  (0, a.jsx)("p", {
                    className: "text-xs text-text-muted mb-5",
                    children: "已发送到管理员邮箱 \xb7 我们会尽快排查修复",
                  }),
                  (0, a.jsx)(l.y, { variant: "primary", onClick: () => q(null), children: "关闭" }),
                ],
              }),
            }),
            (0, a.jsxs)(l.a, {
              open: k,
              onClose: () => A(!1),
              title: "内测错误反馈",
              size: "md",
              children: [
                (0, a.jsxs)("div", {
                  className:
                    "flex gap-3 items-start p-4 -mx-6 -mt-4 mb-4 bg-warning/15 border-b-2 border-border-hard",
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "w-7 h-7 shrink-0 bg-warning text-bg-primary border-2 border-border-hard rounded-sm shadow-[2px_2px_0_rgba(0,0,0,0.5)] flex items-center justify-center",
                      children: (0, a.jsx)(b.A, { size: 14 }),
                    }),
                    (0, a.jsxs)("div", {
                      className: "flex-1",
                      children: [
                        (0, a.jsxs)("p", {
                          className: "text-sm text-text-secondary leading-relaxed",
                          children: [
                            (0, a.jsx)("strong", {
                              className: "text-text-primary",
                              children: "网站正在内测中",
                            }),
                            "，遇到任何 Bug、体验问题，或有好的建议，欢迎填写表单告诉我们。谢谢大家",
                          ],
                        }),
                        (0, a.jsx)("p", {
                          className: "text-[11px] text-text-muted font-bold mt-1 text-right",
                          children: "—— 开发组敬上",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)("form", {
                  onSubmit: K,
                  className: "space-y-4",
                  children: [
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsxs)("label", {
                          className:
                            "flex items-baseline gap-1 text-sm font-bold text-text-primary mb-2 uppercase tracking-wide",
                          children: [
                            "问题简述 ",
                            (0, a.jsx)("span", { className: "text-error", children: "*" }),
                            (0, a.jsxs)("span", {
                              className:
                                "ml-auto font-normal text-text-muted normal-case tracking-normal text-xs",
                              children: [C.length, "/200"],
                            }),
                          ],
                        }),
                        (0, a.jsx)(x.p, {
                          value: C,
                          onChange: (e) => M(e.target.value),
                          maxLength: 200,
                          placeholder: "例：点击登录按钮后页面白屏",
                          inputSize: "sm",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsxs)("label", {
                          className:
                            "flex items-baseline gap-1 text-sm font-bold text-text-primary mb-2 uppercase tracking-wide",
                          children: [
                            "详细描述 ",
                            (0, a.jsx)("span", { className: "text-error", children: "*" }),
                            (0, a.jsxs)("span", {
                              className:
                                "ml-auto font-normal text-text-muted normal-case tracking-normal text-xs",
                              children: [z.length, "/5000"],
                            }),
                          ],
                        }),
                        (0, a.jsx)("textarea", {
                          value: z,
                          onChange: (e) => S(e.target.value),
                          rows: 3,
                          maxLength: 5e3,
                          placeholder: "出了什么问题？你当时在做什么？期望的结果是什么？",
                          className:
                            "w-full rounded border-2 border-border-hard bg-bg-card text-text-primary placeholder:text-text-muted px-3 py-2 text-sm transition-colors duration-fast focus:outline-none focus:border-brand-primary resize-y",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsxs)("label", {
                          className:
                            "flex items-baseline gap-1 text-sm font-bold text-text-primary mb-2 uppercase tracking-wide",
                          children: [
                            "联系邮箱 ",
                            (0, a.jsx)("span", { className: "text-error", children: "*" }),
                            (0, a.jsx)("span", {
                              className:
                                "ml-auto font-normal text-text-muted normal-case tracking-normal text-xs",
                              children: "用于回复你",
                            }),
                          ],
                        }),
                        (0, a.jsx)(x.p, {
                          type: "email",
                          value: _,
                          onChange: (e) => B(e.target.value),
                          maxLength: 100,
                          placeholder: "you@example.com",
                          inputSize: "sm",
                          autoComplete: "email",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-[11px] text-text-muted mt-1.5",
                          children: (null == y || null == (e = y.user) ? void 0 : e.email)
                            ? "已自动填入账号邮箱，可修改 \xb7 处理结果会发送到这里"
                            : "请填写真实邮箱 \xb7 问题处理结果会发送到这里",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("details", {
                      className:
                        "bg-bg-card border-2 border-border-hard rounded shadow-inset overflow-hidden",
                      children: [
                        (0, a.jsxs)("summary", {
                          className:
                            "px-3 py-2 text-[11px] font-bold text-text-muted uppercase tracking-wide cursor-pointer flex items-center gap-1.5 hover:text-text-secondary [&::-webkit-details-marker]:hidden list-none",
                          children: [
                            (0, a.jsx)(u, { size: 12 }),
                            "自动附加诊断信息",
                            (0, a.jsx)("svg", {
                              className:
                                "w-2.5 h-2.5 ml-auto transition-transform [[open]>&]:rotate-180",
                              viewBox: "0 0 10 6",
                              children: (0, a.jsx)("path", {
                                d: "M1 1l4 4 4-4",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                fill: "none",
                              }),
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className:
                            "px-3 pb-2.5 border-t border-border-soft text-[11px] font-mono text-text-muted leading-[1.9]",
                          children: [
                            (0, a.jsx)("span", {
                              className: "text-text-secondary font-semibold",
                              children: "页面",
                            }),
                            " ",
                            j,
                            (0, a.jsx)("br", {}),
                            (0, a.jsx)("span", {
                              className: "text-text-secondary font-semibold",
                              children: "登录",
                            }),
                            " 已登录 (",
                            (null == y || null == (t = y.user) ? void 0 : t.name) ||
                              (null == y || null == (r = y.user) ? void 0 : r.id),
                            ")",
                            (0, a.jsx)("br", {}),
                            (0, a.jsx)("span", {
                              className: "text-text-secondary font-semibold",
                              children: "浏览器",
                            }),
                            " ",
                            "undefined" != typeof navigator
                              ? navigator.userAgent.slice(0, 80) + "…"
                              : "",
                            (0, a.jsx)("br", {}),
                            (0, a.jsx)("span", {
                              className: "text-text-secondary font-semibold",
                              children: "屏幕",
                            }),
                            " ",
                            "".concat(window.innerWidth, " \xd7 ").concat(window.innerHeight),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)(o.$, { value: E, onChange: P }, L),
                    T &&
                      (0, a.jsx)("div", {
                        className:
                          "p-3 bg-error/15 border-2 border-error rounded text-sm font-bold text-error",
                        children: T,
                      }),
                    (0, a.jsxs)("div", {
                      className: "flex gap-2 pt-3 border-t-2 border-border-hard",
                      children: [
                        (0, a.jsxs)(l.y, {
                          type: "submit",
                          variant: "primary",
                          size: "lg",
                          loading: W,
                          loadingLabel: "提交中",
                          className: "flex-1",
                          children: [(0, a.jsx)(p.A, { size: 16 }), "提交报告"],
                        }),
                        (0, a.jsx)(l.y, {
                          type: "button",
                          onClick: () => A(!1),
                          variant: "ghost",
                          size: "lg",
                          children: "取消",
                        }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "text-[11px] text-text-disabled text-center",
                      children: "提交即同意记录页面诊断信息用于排查",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
    7237: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "bolt", "Bolt", [
        ["path", { d: "M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11", key: "svg-0" }],
      ]);
    },
    16010: (e, t, r) => {
      "use strict";
      r.d(t, { d: () => n });
      let a = "/static";
      function n(e) {
        return a ? "".concat(a).concat(e) : e;
      }
    },
    16114: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "send", "Send", [
        ["path", { d: "M10 14l11 -11", key: "svg-0" }],
        [
          "path",
          {
            d: "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5",
            key: "svg-1",
          },
        ],
      ]);
    },
    19461: (e, t, r) => {
      "use strict";
      r.d(t, { AnalyticsProvider: () => s });
      var a = r(12115),
        n = r(98901);
      function s() {
        return (
          (0, a.useEffect)(() => {
            (0, n.Bu)();
          }, []),
          null
        );
      }
    },
    21632: (e, t, r) => {
      (Promise.resolve().then(r.t.bind(r, 41290, 23)),
        Promise.resolve().then(r.bind(r, 48839)),
        Promise.resolve().then(r.bind(r, 19461)),
        Promise.resolve().then(r.bind(r, 48317)),
        Promise.resolve().then(r.bind(r, 214)),
        Promise.resolve().then(r.bind(r, 91315)),
        Promise.resolve().then(r.t.bind(r, 35214, 23)));
    },
    25016: (e, t, r) => {
      "use strict";
      r.d(t, { cn: () => s });
      var a = r(2821),
        n = r(75889);
      function s() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return (0, n.QP)((0, a.$)(t));
      }
    },
    25828: (e, t, r) => {
      "use strict";
      r.d(t, { E: () => d });
      var a = r(95155),
        n = r(12115),
        s = r(25016);
      let i = {
          neutral: "border-border-hard bg-bg-inset text-text-primary",
          brand: "border-brand-primary bg-brand-primary/15 text-brand-primary",
          success: "border-success bg-success/15 text-success",
          warning: "border-warning bg-warning/15 text-warning",
          danger: "border-error bg-error/15 text-error",
          info: "border-info bg-info/15 text-info",
          expert: "border-difficulty-expert bg-difficulty-expert/15 text-difficulty-expert",
          free: "border-tag-free bg-tag-free/15 text-tag-free",
          featured: "border-tag-featured bg-tag-featured/15 text-tag-featured",
          beginner: "border-tag-beginner bg-tag-beginner/15 text-tag-beginner",
          master: "border-tag-master bg-tag-master/15 text-tag-master",
          category: "border-tag-category bg-tag-category/15 text-tag-category",
          accent: "border-brand-accent bg-brand-accent/15 text-brand-accent",
        },
        l = {
          neutral: "border-border-hard bg-bg-inset text-text-primary",
          brand: "border-border-hard bg-brand-primary text-text-on-brand",
          success: "border-border-hard bg-success text-text-on-brand",
          warning: "border-border-hard bg-warning text-text-on-brand",
          danger: "border-border-hard bg-error text-text-primary",
          info: "border-border-hard bg-info text-text-primary",
          expert: "border-border-hard bg-difficulty-expert text-text-primary",
          free: "border-border-hard bg-tag-free text-text-on-brand",
          featured: "border-border-hard bg-tag-featured text-text-on-brand",
          beginner: "border-border-hard bg-tag-beginner text-text-primary",
          master: "border-border-hard bg-tag-master text-text-primary",
          category: "border-border-hard bg-tag-category text-text-on-brand",
          accent: "border-border-hard bg-brand-accent text-text-on-brand",
        },
        o = {
          sm: "h-6 px-2 text-xs [&_svg]:h-3 [&_svg]:w-3",
          md: "h-7 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
        },
        d = n.forwardRef((e, t) => {
          let {
            tone: r = "neutral",
            variant: n = "soft",
            size: d = "sm",
            icon: c,
            className: x,
            children: h,
            ...u
          } = e;
          return (0, a.jsxs)("span", {
            ref: t,
            className: (0, s.cn)(
              "box-border inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-none border-2 font-body font-bold leading-none shadow-none",
              o[d],
              "solid" === n ? l[r] : i[r],
              "solid" === n && "shadow-block-xs",
              x,
            ),
            tabIndex: -1,
            "data-control-kind": "badge",
            "data-control-size": d,
            "data-control-variant": n,
            ...u,
            children: [c, h],
          });
        });
      d.displayName = "Badge";
    },
    35214: (e) => {
      e.exports = {
        style: { fontFamily: "'notoSansSC', 'notoSansSC Fallback'" },
        className: "__className_ba86f5",
        variable: "__variable_ba86f5",
      };
    },
    35440: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "puzzle", "Puzzle", [
        [
          "path",
          {
            d: "M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1",
            key: "svg-0",
          },
        ],
      ]);
    },
    41290: () => {},
    42688: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => i, V: () => s });
      var a = r(95155);
      let n = [
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
      function s(e) {
        if (!e) return "#4A4566";
        let t = 0;
        for (let r = 0; r < e.length; r++) t = (31 * t + e.charCodeAt(r)) >>> 0;
        return n[t % n.length];
      }
      function i(e) {
        let { name: t, size: r = 17 } = e;
        return (0, a.jsx)("span", {
          className: "uc-av",
          style: { width: r, height: r, background: s(t), fontSize: Math.round(0.59 * r) },
          "aria-hidden": !0,
          children: t ? t.charAt(0) : "?",
        });
      }
    },
    48317: (e, t, r) => {
      "use strict";
      r.d(t, { ConditionalGoogleAnalytics: () => l });
      var a = r(95155),
        n = r(76784),
        s = r(20063),
        i = r(98901);
      function l(e) {
        let { gaId: t } = e,
          r = (0, s.usePathname)();
        return !t || (0, i.wg)(r) ? null : (0, a.jsx)(n.GoogleAnalytics, { gaId: t });
      }
    },
    48839: (e, t, r) => {
      "use strict";
      r.d(t, { Providers: () => o });
      var a = r(95155),
        n = r(36489),
        s = r(26260),
        i = r(53486),
        l = r(22355);
      function o(e) {
        let { children: t } = e;
        return (0, a.jsx)(n.SessionProvider, {
          children: (0, a.jsx)(i.a, {
            children: (0, a.jsx)(s.m, { children: (0, a.jsx)(l.qO, { children: t }) }),
          }),
        });
      }
    },
    51750: (e, t, r) => {
      "use strict";
      r.d(t, { y: () => l });
      var a = r(95155),
        n = r(64991),
        s = r(25016);
      let i = { xs: 16, sm: 28, md: 44, lg: 60, xl: 80 };
      function l(e) {
        let { size: t = "md", className: r, label: l } = e;
        return (0, a.jsxs)("span", {
          className: (0, s.cn)("mcb-loader", r),
          "data-size": t,
          style: { "--mcb-loader-box": "".concat(i[t], "px") },
          role: "status",
          "aria-label": null != l ? l : "加载中",
          children: [
            (0, a.jsx)(n.A, { className: "mcb-loader-icon" }),
            (0, a.jsx)("span", { className: "sr-only", children: null != l ? l : "加载中" }),
          ],
        });
      }
    },
    54620: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "layout-dashboard", "LayoutDashboard", [
        [
          "path",
          {
            d: "M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1",
            key: "svg-0",
          },
        ],
        [
          "path",
          {
            d: "M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1",
            key: "svg-1",
          },
        ],
        [
          "path",
          {
            d: "M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1",
            key: "svg-2",
          },
        ],
        [
          "path",
          {
            d: "M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1",
            key: "svg-3",
          },
        ],
      ]);
    },
    58255: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "settings", "Settings", [
        [
          "path",
          {
            d: "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065",
            key: "svg-0",
          },
        ],
        ["path", { d: "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-1" }],
      ]);
    },
    69381: (e, t, r) => {
      "use strict";
      r.d(t, { x: () => o });
      var a = r(95155),
        n = r(12115),
        s = r(25016);
      let i = {
          danger: "bg-error text-text-primary",
          brand: "bg-brand-primary text-text-on-brand",
          neutral: "bg-bg-deep text-text-primary",
        },
        l = { sm: "h-[18px] min-w-[18px] px-1 text-[10px]", md: "h-5 min-w-5 px-1.5 text-[11px]" },
        o = n.forwardRef((e, t) => {
          let { tone: r = "danger", size: n = "sm", className: o, children: d, ...c } = e;
          return (0, a.jsx)("span", {
            ref: t,
            className: (0, s.cn)(
              "box-border inline-flex items-center justify-center rounded-none border-[1.5px] border-border-hard font-body font-extrabold leading-none shadow-none",
              i[r],
              l[n],
              o,
            ),
            tabIndex: -1,
            "data-control-kind": "count",
            "data-control-size": n,
            "data-control-variant": r,
            ...c,
            children: d,
          });
        });
      o.displayName = "CountBadge";
    },
    73768: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "building", "Building", [
        ["path", { d: "M3 21l18 0", key: "svg-0" }],
        ["path", { d: "M9 8l1 0", key: "svg-1" }],
        ["path", { d: "M9 12l1 0", key: "svg-2" }],
        ["path", { d: "M9 16l1 0", key: "svg-3" }],
        ["path", { d: "M14 8l1 0", key: "svg-4" }],
        ["path", { d: "M14 12l1 0", key: "svg-5" }],
        ["path", { d: "M14 16l1 0", key: "svg-6" }],
        ["path", { d: "M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16", key: "svg-7" }],
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
    90908: (e, t, r) => {
      "use strict";
      r.d(t, { _: () => m });
      var a = r(95155),
        n = r(12115),
        s = r(26497),
        i = r(1733),
        l = r(47650),
        o = r(2186),
        d = r(51750),
        c = r(44460);
      let x = {
          xs: { width: "w-[240px]", height: "h-[200px]" },
          sm: { width: "w-[280px]", height: "h-[240px]" },
          md: { width: "w-[320px]", height: "h-[280px]" },
          lg: { width: "w-[400px]", height: "h-[350px]" },
          xl: { width: "w-[480px]", height: "h-[420px]" },
          fullscreen: { width: "w-full", height: "h-full" },
        },
        h = {
          right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
          left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
          top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
          bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
        },
        u = {
          right: "right-0 top-0 bottom-0",
          left: "left-0 top-0 bottom-0",
          top: "left-0 right-0 top-0",
          bottom: "left-0 right-0 bottom-[52px]",
        };
      function m(e) {
        let {
            id: t,
            open: r,
            onClose: m,
            title: b,
            subtitle: p,
            icon: g,
            children: f,
            position: v = "right",
            size: j = "md",
            variant: y = "default",
            color: w = "green",
            footer: N,
            showOverlay: k = !0,
            closeOnOverlayClick: A = !0,
            closeOnEsc: C = !0,
            showCloseButton: M = !0,
            loading: z = !1,
            className: S = "",
            bodyClassName: _ = "",
            avoidBottomNavigation: B = !0,
            portalTarget: E,
          } = e,
          P = (0, n.useCallback)(
            (e) => {
              "Escape" === e.key && C && !z && m();
            },
            [m, C, z],
          );
        (0, n.useEffect)(() => {
          if (r)
            return (
              document.addEventListener("keydown", P),
              (document.body.style.overflow = "hidden"),
              () => {
                (document.removeEventListener("keydown", P), (document.body.style.overflow = ""));
              }
            );
        }, [r, P]);
        let L = "left" === v || "right" === v ? x[j].width : x[j].height,
          F = { green: "border-brand-primary", orange: "border-warning", blue: "border-info" },
          W = "\n    fixed bg-bg-card flex flex-col z-[1001] shadow-block\n    "
            .concat("bottom" === v && !B ? "left-0 right-0 bottom-0" : u[v], "\n    ")
            .concat(L, "\n    ")
            .concat("rounded" === y ? "rounded-none m-cn-4" : "", "\n    ")
            .concat(
              "bordered" === y && "right" === v ? "border-l-[3px] ".concat(F[w]) : "",
              "\n    ",
            )
            .concat(
              "bordered" === y && "left" === v ? "border-r-[3px] ".concat(F[w]) : "",
              "\n    ",
            )
            .concat("bordered" === y && "top" === v ? "border-b-[3px] ".concat(F[w]) : "", "\n    ")
            .concat(
              "bordered" === y && "bottom" === v ? "border-t-[3px] ".concat(F[w]) : "",
              "\n    ",
            )
            .concat(
              "bottom" === v && "bordered" !== y ? "border-t-2 border-border-hard" : "",
              "\n    ",
            )
            .concat(z ? "pointer-events-none" : "", "\n    ")
            .concat(S, "\n  ")
            .trim(),
          U = "\n    flex items-center justify-between px-6 py-4 flex-shrink-0\n    "
            .concat("minimal" === y ? "" : "border-b-2 border-border-soft", "\n    ")
            .concat(
              { green: "bg-brand-primary/5", orange: "bg-warning/5", blue: "bg-info/5" }[w],
              "\n  ",
            )
            .trim(),
          I = "\n    px-6 py-4 flex-shrink-0 flex gap-2 justify-end\n    "
            .concat("minimal" === y ? "" : "border-t-2 border-border-soft", "\n  ")
            .trim(),
          q = h[v];
        return (0, l.createPortal)(
          (0, a.jsx)(s.N, {
            children:
              r &&
              (0, a.jsxs)(a.Fragment, {
                children: [
                  k &&
                    (0, a.jsx)(i.P.div, {
                      className: "fixed inset-0 z-[1000] ".concat(
                        "bottom" === v ? "bg-black/60" : "bg-black/50",
                      ),
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      transition: { duration: 0.2 },
                      onClick: () => {
                        A && !z && m();
                      },
                    }),
                  (0, a.jsxs)(i.P.div, {
                    id: t,
                    className: W,
                    initial: q.initial,
                    animate: q.animate,
                    exit: q.exit,
                    transition:
                      "bottom" === v
                        ? { duration: 0.2, ease: "easeOut" }
                        : { type: "spring", damping: 30, stiffness: 300 },
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": b ? "drawer-title" : void 0,
                    children: [
                      (b || M) &&
                        (0, a.jsxs)("div", {
                          className: U,
                          children: [
                            (0, a.jsxs)("div", {
                              className: "flex items-center gap-3",
                              children: [
                                g &&
                                  (0, a.jsx)("div", {
                                    className:
                                      "w-8 h-8 flex items-center justify-center rounded-none ".concat(
                                        {
                                          green: "bg-brand-primary/10 text-brand-primary",
                                          orange: "bg-warning/10 text-warning",
                                          blue: "bg-info/10 text-info",
                                        }[w],
                                      ),
                                    children: g,
                                  }),
                                (0, a.jsxs)("div", {
                                  children: [
                                    b &&
                                      (0, a.jsx)("div", {
                                        id: "drawer-title",
                                        className: "text-base font-bold text-text-primary",
                                        children: b,
                                      }),
                                    p &&
                                      (0, a.jsx)("div", {
                                        className: "text-[13px] text-text-muted mt-0.5",
                                        children: p,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            M &&
                              (0, a.jsx)(c.K, {
                                onClick: m,
                                disabled: z,
                                label: "关闭",
                                size: "xs",
                                variant: "secondary",
                                className:
                                  "bg-bg-card text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
                                children: (0, a.jsx)(o.A, { size: 20 }),
                              }),
                          ],
                        }),
                      (0, a.jsx)("div", {
                        className:
                          "flex-1 px-6 py-4 text-text-secondary text-sm leading-relaxed overflow-y-auto cn4-scroll ".concat(
                            _,
                          ),
                        children: z
                          ? (0, a.jsx)("div", {
                              className:
                                "absolute inset-0 bg-bg-elevated/80 flex items-center justify-center",
                              children: (0, a.jsx)(d.y, { size: "md" }),
                            })
                          : f,
                      }),
                      N && (0, a.jsx)("div", { className: I, children: N }),
                    ],
                  }),
                ],
              }),
          }),
          null != E ? E : document.body,
        );
      }
    },
    91315: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => eb });
      var a = r(95155),
        n = r(12115);
      let s = (0, n.createContext)({ expanded: !1, setExpanded: () => {}, toggle: () => {} }),
        i = "mcblock-desktop-sidebar";
      var l = r(52619),
        o = r.n(l),
        d = r(15239),
        c = r(20063),
        x = r(36489),
        h = r(22355),
        u = r(85501),
        m = r(73768),
        b = r(30313);
      let p = (0, b.A)("outline", "brush", "Brush", [
        ["path", { d: "M3 21v-4a4 4 0 1 1 4 4h-4", key: "svg-0" }],
        ["path", { d: "M21 3a16 16 0 0 0 -12.8 10.2", key: "svg-1" }],
        ["path", { d: "M21 3a16 16 0 0 1 -10.2 12.8", key: "svg-2" }],
        ["path", { d: "M10.6 9a9 9 0 0 1 4.4 4.4", key: "svg-3" }],
      ]);
      var g = r(79350),
        f = r(95585),
        v = r(57391),
        j = r(69950),
        y = r(65633);
      let w = [
        { icon: u.A, label: "首页", href: "/", tip: "首页" },
        { icon: m.A, label: "建筑库", href: "/buildings", tip: "建筑库" },
        { icon: p, label: "投影编辑", href: "/studio", tip: "投影编辑器 \xb7 查看与编辑投影文件" },
        { icon: g.A, label: "壁纸站", href: "/wallpapers", tip: "壁纸站" },
      ];
      function N() {
        var e, t, r, i, l, u, m, b, p, g;
        let { expanded: N, toggle: C } = (0, n.useContext)(s),
          M = (0, c.usePathname)(),
          z = (0, c.useRouter)(),
          { data: S, status: _ } = (0, x.useSession)(),
          { unreadCount: B } = (0, h.U4)(),
          E = M.startsWith("/studio/editor"),
          P = /^\/buildings\/[^/]+/.test(M),
          L = ["/login", "/register", "/forgot-password"].includes(M),
          F = M.startsWith("/admin");
        if (E || P || L || F) return null;
        let W = async () => {
            (await (0, x.signOut)({ redirect: !1 }), z.push("/"));
          },
          U = N ? "w-[220px]" : "w-[64px]";
        return (0, a.jsxs)("aside", {
          className: "".concat(
            U,
            " h-screen fixed left-0 top-0 z-sticky bg-bg-card border-r-2 border-border-hard flex flex-col overflow-hidden transition-[width] duration-200",
          ),
          children: [
            (0, a.jsx)("button", {
              onClick: C,
              "aria-label": N ? "收起侧栏" : "展开侧栏",
              className:
                "absolute top-5 -right-3 w-6 h-6 rounded-full bg-bg-card border-2 border-border-hard text-text-secondary flex items-center justify-center shadow-block hover:bg-brand-cta hover:text-text-on-brand hover:scale-110 transition-all duration-200 z-10",
              children: (0, a.jsx)(f.A, {
                className: "w-3 h-3 transition-transform duration-200 ".concat(
                  N ? "rotate-180" : "",
                ),
              }),
            }),
            (0, a.jsxs)("div", {
              className: "flex flex-col h-full w-full px-3 py-3",
              children: [
                (0, a.jsxs)(o(), {
                  href: "/",
                  className:
                    "group flex items-center gap-2.5 p-1 mb-3 rounded hover:bg-white/5 transition-colors duration-150 relative",
                  title: N ? void 0 : "投影编辑器",
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "w-9 h-9 shrink-0 bg-brand-cta border-2 border-border-hard rounded shadow-block flex items-center justify-center transition-transform duration-200 group-hover:rotate-[-8deg] group-hover:scale-105",
                      children: (0, a.jsx)(d.default, {
                        src: "/favicon.ico",
                        alt: "投影编辑器",
                        width: 22,
                        height: 22,
                        className: "w-[22px] h-[22px] object-contain brightness-[10]",
                        priority: !0,
                      }),
                    }),
                    N &&
                      (0, a.jsxs)("div", {
                        className: "flex flex-col leading-tight min-w-0 overflow-hidden",
                        children: [
                          (0, a.jsx)("span", {
                            className: "text-sm font-extrabold text-text-primary",
                            children: "投影编辑器",
                          }),
                          (0, a.jsx)("span", {
                            className: "text-[10px] text-text-muted",
                            children: "",
                          }),
                        ],
                      }),
                  ],
                }),
                (0, a.jsx)("div", { className: "h-[2px] w-full bg-border-soft mb-1.5" }),
                (0, a.jsxs)("nav", {
                  className:
                    "flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden scrollbar-none",
                  children: [
                    w.map((e) => {
                      var t;
                      return (0, a.jsx)(
                        k,
                        {
                          item: e,
                          active: "/" === (t = e.href) ? "/" === M : M.startsWith(t),
                          expanded: N,
                        },
                        e.href,
                      );
                    }),
                    (0, a.jsx)("div", { className: "h-[2px] w-full bg-border-soft my-1.5" }),
                    (0, a.jsx)(k, {
                      item: {
                        icon: v.A,
                        label: "消息",
                        href: "/profile?role=user&tab=messages",
                        tip: B > 0 ? "消息 \xb7 ".concat(B, " 条未读") : "消息",
                      },
                      active: !1,
                      expanded: N,
                      badge: B,
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className: "mt-2 pt-2 border-t-2 border-border-soft",
                  children:
                    "authenticated" === _ && S
                      ? (0, a.jsxs)("div", {
                          className: "flex flex-col gap-1",
                          children: [
                            (0, a.jsxs)(o(), {
                              href: "/profile",
                              title: N
                                ? void 0
                                : "".concat((null == (e = S.user) ? void 0 : e.name) || "个人中心"),
                              className:
                                "group relative flex items-center gap-2.5 p-1.5 rounded hover:bg-bg-elevated transition-colors duration-150 overflow-hidden",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "relative shrink-0",
                                  children: [
                                    (null == (t = S.user) ? void 0 : t.image)
                                      ? (0, a.jsx)("img", {
                                          src: S.user.image,
                                          alt: "头像",
                                          className:
                                            "w-9 h-9 rounded border-2 border-border-hard object-cover",
                                        })
                                      : (0, a.jsx)("div", {
                                          className:
                                            "w-9 h-9 bg-brand-primary border-2 border-border-hard rounded flex items-center justify-center text-text-on-brand font-extrabold text-sm",
                                          children:
                                            (null == (l = S.user) ||
                                            null == (i = l.name) ||
                                            null == (r = i[0])
                                              ? void 0
                                              : r.toUpperCase()) ||
                                            (null == (b = S.user) ||
                                            null == (m = b.email) ||
                                            null == (u = m[0])
                                              ? void 0
                                              : u.toUpperCase()) ||
                                            "U",
                                        }),
                                    (0, a.jsx)("span", {
                                      className:
                                        "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success border-2 border-bg-navbar rounded-full",
                                    }),
                                  ],
                                }),
                                N &&
                                  (0, a.jsxs)("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                      (0, a.jsx)("div", {
                                        className:
                                          "text-xs font-bold text-text-primary truncate leading-tight",
                                        children:
                                          (null == (p = S.user) ? void 0 : p.name) || "用户",
                                      }),
                                      (0, a.jsx)("div", {
                                        className: "text-[10px] text-success leading-tight mt-0.5",
                                        children: "● 在线",
                                      }),
                                    ],
                                  }),
                                !N &&
                                  (0, a.jsx)(A, {
                                    text: (null == (g = S.user) ? void 0 : g.name) || "个人中心",
                                  }),
                              ],
                            }),
                            N &&
                              (0, a.jsxs)("button", {
                                onClick: W,
                                className:
                                  "flex items-center gap-3 px-3 py-1.5 rounded text-[11px] font-semibold text-text-muted hover:bg-error/10 hover:text-error transition-all duration-200",
                                children: [
                                  (0, a.jsx)(j.A, { size: 14, className: "shrink-0" }),
                                  "退出登录",
                                ],
                              }),
                          ],
                        })
                      : "loading" !== _
                        ? (0, a.jsx)("div", {
                            className: "flex flex-col gap-1",
                            children: N
                              ? (0, a.jsxs)(a.Fragment, {
                                  children: [
                                    (0, a.jsx)(o(), {
                                      href: "/login",
                                      className:
                                        "flex items-center justify-center py-2 px-3 rounded text-xs font-semibold text-text-secondary border-2 border-border-hard hover:bg-bg-elevated hover:text-text-primary transition-all duration-200",
                                      children: "登录",
                                    }),
                                    (0, a.jsx)(o(), {
                                      href: "/register",
                                      className:
                                        "flex items-center justify-center py-2 px-3 rounded text-xs font-extrabold text-text-on-brand bg-brand-cta border-2 border-border-hard shadow-block hover:-translate-y-0.5 hover:shadow-block-hover transition-all duration-200",
                                      children: "注册",
                                    }),
                                  ],
                                })
                              : (0, a.jsxs)(o(), {
                                  href: "/login",
                                  title: "登录 / 注册",
                                  className:
                                    "relative group w-full h-10 rounded flex items-center justify-center bg-brand-cta text-text-on-brand border-2 border-border-hard shadow-inset hover:bg-brand-cta-hover transition-all duration-200",
                                  children: [
                                    (0, a.jsx)(y.A, { size: 18 }),
                                    (0, a.jsx)(A, { text: "登录 / 注册" }),
                                  ],
                                }),
                          })
                        : null,
                }),
              ],
            }),
          ],
        });
      }
      function k(e) {
        let { item: t, active: r, expanded: n, badge: s } = e,
          i = t.icon,
          l = "number" == typeof s && s > 0;
        return (0, a.jsxs)(o(), {
          href: t.href,
          title: n ? void 0 : t.tip,
          className:
            "\n        relative group flex items-center gap-3 h-10 px-2.5 rounded text-[13px] font-semibold whitespace-nowrap overflow-hidden\n        transition-all duration-150\n        ".concat(
              r
                ? "bg-brand-cta text-text-on-brand"
                : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
              "\n      ",
            ),
          children: [
            r &&
              (0, a.jsx)("span", {
                className:
                  "absolute -left-3 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-cta rounded-r-sm",
              }),
            (0, a.jsx)(i, { className: "w-5 h-5 shrink-0" }),
            n && (0, a.jsx)("span", { children: t.label }),
            t.hot &&
              n &&
              (0, a.jsx)("span", {
                className:
                  "ml-auto text-[9px] font-extrabold bg-brand-cta text-text-on-brand px-1.5 py-[2px] rounded-sm border-2 border-border-hard leading-none",
                children: "HOT",
              }),
            l &&
              n &&
              (0, a.jsx)("span", {
                className:
                  "ml-auto min-w-[18px] h-4 px-1 bg-error text-white text-[10px] font-bold rounded-sm flex items-center justify-center leading-none",
                children: s > 99 ? "99+" : s,
              }),
            !n &&
              t.hot &&
              (0, a.jsx)("span", {
                className:
                  "absolute top-1.5 right-2 w-1.5 h-1.5 bg-brand-cta border-2 border-border-hard rounded-full",
              }),
            !n &&
              l &&
              (0, a.jsx)("span", {
                className:
                  "absolute top-1.5 right-2 w-2 h-2 bg-error border border-bg-navbar rounded-full",
              }),
            !n && (0, a.jsx)(A, { text: t.tip }),
          ],
        });
      }
      function A(e) {
        let { text: t } = e;
        return (0, a.jsx)("span", {
          className:
            "absolute left-[56px] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white text-xs font-semibold whitespace-nowrap rounded border-2 border-border-hard opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-[1000]",
          children: t,
        });
      }
      var C = r(26497),
        M = r(1733),
        z = r(16010),
        S = r(64991),
        _ = r(33186),
        B = r(30885),
        E = r(89710),
        P = r(54620),
        L = r(99099),
        F = r(7237),
        W = r(58255),
        U = r(90908),
        I = r(25828),
        q = r(97003),
        T = r(33159),
        O = r(69381),
        D = r(44460),
        R = r(42688);
      let H = "mcblock:mobile-panel-open";
      function $(e) {
        window.dispatchEvent(new CustomEvent(H, { detail: e }));
      }
      function Q(e, t) {
        (0, n.useEffect)(() => {
          let r = (r) => {
            r.detail !== e && t();
          };
          return (window.addEventListener(H, r), () => window.removeEventListener(H, r));
        }, [t, e]);
      }
      function K(e) {
        let {
            icon: t,
            label: r,
            href: n,
            onClick: s,
            active: i = !1,
            danger: l = !1,
            badge: o,
            indicator: d = !1,
          } = e,
          c =
            "\n    relative !h-auto min-h-[86px] !w-full !overflow-visible !px-1.5 !py-4\n    text-[11px] font-bold\n    [&_[data-control-content]]:flex-col [&_[data-control-content]]:gap-2.5\n    ".concat(
              l ? "!text-error hover:!border-error hover:!bg-error/10" : "",
              "\n  ",
            ),
          x = (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsxs)("span", {
                className: "relative inline-flex",
                children: [
                  (0, a.jsx)(t, {
                    className: "h-[26px] w-[26px] ".concat(l ? "text-error" : "text-text-primary"),
                  }),
                  null != o &&
                    "" !== o &&
                    (0, a.jsx)(O.x, { className: "absolute -right-3 -top-2", children: o }),
                  d &&
                    (0, a.jsx)("span", {
                      className:
                        "absolute -right-1 -top-1 h-2.5 w-2.5 border-2 border-bg-inset bg-error",
                    }),
                ],
              }),
              (0, a.jsx)("span", { className: "whitespace-nowrap", children: r }),
            ],
          });
        return n
          ? (0, a.jsx)(T.ButtonLink, {
              href: n,
              onClick: s,
              size: "xl",
              variant: i ? "primary" : "secondary",
              className: c,
              "aria-current": i ? "page" : void 0,
              children: x,
            })
          : (0, a.jsx)(q.$, {
              type: "button",
              onClick: s,
              size: "xl",
              variant: l ? "ghost" : i ? "primary" : "secondary",
              className: c,
              children: x,
            });
      }
      let J =
        "w-full h-[38px] px-[14px] flex items-center gap-[10px] text-left font-body font-semibold text-[13.5px] leading-none text-text-muted transition-colors duration-fast hover:bg-bg-inset hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary";
      function V() {
        var e,
          t,
          r,
          s,
          i,
          l,
          u,
          m,
          b,
          p,
          f,
          w,
          N,
          k,
          A,
          H,
          V,
          G,
          Y,
          Z,
          X,
          ee,
          et,
          er,
          ea,
          en,
          es,
          ei,
          el,
          eo,
          ed,
          ec;
        let [ex, eh] = (0, n.useState)(!1),
          [eu, em] = (0, n.useState)(!1),
          [eb, ep] = (0, n.useState)(!1),
          eg = (0, c.usePathname)(),
          ef = (0, c.useRouter)(),
          { data: ev, status: ej } = (0, x.useSession)(),
          ey = "loading" === ej,
          ew = (0, n.useRef)(null);
        ((0, n.useEffect)(() => {
          let e = !1;
          function t() {
            e ||
              (window.requestAnimationFrame(() => {
                (ep(window.scrollY > 10), (e = !1));
              }),
              (e = !0));
          }
          return (
            window.addEventListener("scroll", t, { passive: !0 }),
            () => window.removeEventListener("scroll", t)
          );
        }, []),
          (0, n.useEffect)(() => {
            function e(e) {
              var t, r;
              let a = e.target;
              (null != (r = null == (t = ew.current) ? void 0 : t.contains(a)) && r) || eh(!1);
            }
            if (ex)
              return (
                document.addEventListener("mousedown", e),
                () => document.removeEventListener("mousedown", e)
              );
          }, [ex]));
        let eN = [
            { label: "建筑库", shortLabel: "建筑", href: "/buildings", icon: S.A },
            { label: "投影编辑", shortLabel: "投影", href: "/studio", icon: _.A },
            { label: "壁纸站", shortLabel: "壁纸", href: "/wallpapers", icon: g.A },
            { label: "Blender", shortLabel: "Blender", href: "/blender", icon: B.A },
            { label: "支持我们", shortLabel: "支持", href: "/support", icon: E.A },
          ],
          ek = async () => {
            (await (0, x.signOut)({ redirect: !1 }), eh(!1), em(!1), ef.push("/"));
          },
          { unreadCount: eA } = (0, h.U4)(),
          eC = (0, n.useCallback)(() => em(!1), []);
        Q("account", eC);
        let eM = (null == ev || null == (e = ev.user) ? void 0 : e.image)
          ? (0, a.jsx)("img", {
              src: ev.user.image,
              alt: "头像",
              className: "w-full h-full object-cover",
            })
          : (0, a.jsx)("div", {
              className:
                "w-full h-full bg-brand-primary flex items-center justify-center text-text-on-brand font-bold text-sm",
              children:
                (null == ev || null == (s = ev.user) || null == (r = s.name) || null == (t = r[0])
                  ? void 0
                  : t.toUpperCase()) ||
                (null == ev || null == (u = ev.user) || null == (l = u.email) || null == (i = l[0])
                  ? void 0
                  : i.toUpperCase()) ||
                "U",
            });
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsxs)("header", {
              className:
                "sticky top-0 z-[60] lg:hidden h-16 bg-bg-navbar border-b-2 border-border-hard flex items-center justify-between px-[var(--pad-side)]",
              children: [
                (0, a.jsx)(o(), {
                  href: "/",
                  className: "flex items-center shrink-0",
                  children: (0, a.jsx)(d.default, {
                    src: (0, z.d)("/images/logo/logo-horizontal.png"),
                    alt: "投影编辑器",
                    width: 2272,
                    height: 552,
                    className: "h-[34px] w-auto object-contain",
                    priority: !0,
                    unoptimized: !0,
                  }),
                }),
                (0, a.jsx)("div", {
                  className: "flex items-center gap-2",
                  children:
                    !ey &&
                    (ev
                      ? (0, a.jsxs)(a.Fragment, {
                          children: [
                            (0, a.jsxs)(T.ButtonLink, {
                              href: "/profile?role=user&tab=messages",
                              "aria-label": "消息",
                              size: "icon",
                              variant: "secondary",
                              className:
                                "relative min-h-[var(--control-touch-min)] min-w-[var(--control-touch-min)] !overflow-visible",
                              children: [
                                (0, a.jsx)(v.A, {}),
                                eA > 0 &&
                                  (0, a.jsx)(O.x, {
                                    className: "absolute -right-1.5 -top-1.5 !border-bg-primary",
                                    children: eA > 99 ? "99+" : eA,
                                  }),
                              ],
                            }),
                            (0, a.jsx)(D.K, {
                              onClick: () => {
                                ($("account"), em(!0));
                              },
                              label: "个人中心",
                              size: "md",
                              variant: "secondary",
                              className:
                                "min-h-[var(--control-touch-min)] min-w-[var(--control-touch-min)] overflow-hidden [&_[data-control-content]]:h-full [&_[data-control-content]]:w-full",
                              children: eM,
                            }),
                          ],
                        })
                      : (0, a.jsxs)(a.Fragment, {
                          children: [
                            (0, a.jsx)(T.ButtonLink, {
                              href: "/login",
                              size: "md",
                              variant: "secondary",
                              className: "min-h-[var(--control-touch-min)]",
                              children: "登录",
                            }),
                            (0, a.jsx)(T.ButtonLink, {
                              href: "/register",
                              size: "md",
                              variant: "primary",
                              className: "hidden min-h-[var(--control-touch-min)]",
                              children: "注册",
                            }),
                          ],
                        })),
                }),
              ],
            }),
            ev &&
              (0, a.jsxs)(U._, {
                id: "mobile-account-menu",
                open: eu,
                onClose: eC,
                position: "bottom",
                size: "lg",
                showCloseButton: !1,
                className: "!h-auto bg-bg-card lg:hidden",
                bodyClassName: "!overflow-visible !p-0",
                children: [
                  (0, a.jsxs)("div", {
                    className:
                      "flex items-center gap-3 border-b-2 border-border-hard bg-bg-card px-[18px] py-3.5",
                    children: [
                      (0, a.jsx)("div", {
                        className:
                          "grid h-11 w-11 shrink-0 place-items-center overflow-hidden border-2 border-border-hard text-base font-black text-white",
                        style: {
                          backgroundColor: (0, R.V)(
                            (null == (m = ev.user) ? void 0 : m.name) ||
                              (null == (b = ev.user) ? void 0 : b.email),
                          ),
                        },
                        children: (null == (p = ev.user) ? void 0 : p.image)
                          ? (0, a.jsx)("img", {
                              src: ev.user.image,
                              alt: "头像",
                              className: "h-full w-full object-cover",
                            })
                          : (null == (N = ev.user) || null == (w = N.name) || null == (f = w[0])
                              ? void 0
                              : f.toUpperCase()) ||
                            (null == (H = ev.user) || null == (A = H.email) || null == (k = A[0])
                              ? void 0
                              : k.toUpperCase()) ||
                            "U",
                      }),
                      (0, a.jsxs)("div", {
                        className: "min-w-0",
                        children: [
                          (0, a.jsx)("div", {
                            className: "truncate text-sm font-black text-text-primary",
                            children: (null == (V = ev.user) ? void 0 : V.name) || "未命名用户",
                          }),
                          (0, a.jsx)("div", {
                            className: "mt-1 truncate text-xs font-semibold text-text-muted",
                            children: null == (G = ev.user) ? void 0 : G.email,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "grid grid-cols-[repeat(auto-fit,minmax(82px,1fr))] gap-2.5 bg-bg-card px-[18px] pb-[18px] pt-3",
                    children: [
                      (null == (Y = ev.user) ? void 0 : Y.role) === "admin" &&
                        (0, a.jsx)(K, {
                          icon: P.A,
                          label: "管理后台",
                          href: "/admin",
                          onClick: eC,
                        }),
                      (0, a.jsx)(K, {
                        icon: y.A,
                        label: "个人中心",
                        href: "/profile",
                        onClick: eC,
                      }),
                      (0, a.jsx)(K, {
                        icon: v.A,
                        label: "消息中心",
                        href: "/profile?role=user&tab=messages",
                        onClick: eC,
                        badge: eA > 0 ? (eA > 99 ? "99+" : eA) : null,
                      }),
                      (0, a.jsx)(K, { icon: j.A, label: "退出登录", onClick: ek, danger: !0 }),
                    ],
                  }),
                ],
              }),
            (0, a.jsx)("div", {
              className: "sticky top-0 z-sticky hidden lg:block",
              children: (0, a.jsx)("nav", {
                className:
                  "\n            h-16 bg-bg-navbar border-b-2 border-border-hard\n            transition-shadow duration-fast\n            ".concat(
                    eb ? "shadow-block" : "",
                    "\n          ",
                  ),
                children: (0, a.jsxs)("div", {
                  className:
                    "wrap grid grid-cols-[1fr_auto_1fr] items-center gap-[26px] h-full nav-desktop-grid",
                  children: [
                    (0, a.jsx)("div", {
                      className: "justify-self-start flex items-center shrink-0",
                      children: (0, a.jsx)(o(), {
                        href: "/",
                        className: "flex items-center",
                        children: (0, a.jsx)(d.default, {
                          src: (0, z.d)("/images/logo/logo-horizontal.png"),
                          alt: "投影编辑器",
                          width: 2272,
                          height: 552,
                          className: "h-[34px] w-auto object-contain",
                          priority: !0,
                          unoptimized: !0,
                        }),
                      }),
                    }),
                    (0, a.jsx)("div", {
                      className: "justify-self-center flex items-center gap-1",
                      children: eN.map((e) => {
                        let t =
                          "/" === e.href
                            ? "/" === eg
                            : eg === e.href || eg.startsWith(e.href + "/");
                        return (0, a.jsxs)(
                          T.ButtonLink,
                          {
                            href: e.href,
                            size: "md",
                            variant: t ? "primary" : "ghost",
                            className: t
                              ? "group"
                              : "group border-transparent hover:border-border-hard",
                            "aria-current": t ? "page" : void 0,
                            children: [
                              e.icon &&
                                (0, a.jsx)(e.icon, {
                                  size: 13,
                                  className: "transition-opacity duration-150 ".concat(
                                    t ? "opacity-100" : "opacity-50 group-hover:opacity-100",
                                  ),
                                }),
                              (0, a.jsx)("span", {
                                className: "hidden xl:inline",
                                children: e.label,
                              }),
                              (0, a.jsx)("span", {
                                className: "xl:hidden",
                                children: e.shortLabel,
                              }),
                            ],
                          },
                          e.href,
                        );
                      }),
                    }),
                    (0, a.jsx)("div", {
                      className: "justify-self-end flex items-center gap-[10px]",
                      children:
                        !ey &&
                        (0, a.jsx)(a.Fragment, {
                          children: ev
                            ? (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (0, a.jsxs)(T.ButtonLink, {
                                    href: "/profile?role=user&tab=messages",
                                    size: "icon",
                                    variant: "secondary",
                                    className: "relative !overflow-visible",
                                    "aria-label": "消息",
                                    children: [
                                      (0, a.jsx)(v.A, {}),
                                      eA > 0
                                        ? (0, a.jsx)(O.x, {
                                            className:
                                              "absolute -right-1.5 -top-1.5 !border-bg-primary",
                                            children: eA > 99 ? "99+" : eA,
                                          })
                                        : (0, a.jsx)("span", {
                                            className:
                                              "absolute top-[3px] right-[3px] w-[9px] h-[9px] bg-brand-primary border-2 border-bg-inset",
                                          }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "relative",
                                    ref: ew,
                                    children: [
                                      (0, a.jsxs)(q.$, {
                                        type: "button",
                                        onClick: () => eh(!ex),
                                        size: "md",
                                        variant: "secondary",
                                        className: "pl-1 !pr-3 ".concat(ex ? "bg-bg-deep" : ""),
                                        "aria-label": "用户菜单",
                                        "aria-expanded": ex,
                                        children: [
                                          (null == (Z = ev.user) ? void 0 : Z.image)
                                            ? (0, a.jsx)("img", {
                                                src: ev.user.image,
                                                alt: "头像",
                                                className:
                                                  "w-7 h-7 border-2 border-border-hard object-cover",
                                              })
                                            : (0, a.jsx)("div", {
                                                className:
                                                  "w-7 h-7 bg-brand-primary border-2 border-border-hard flex items-center justify-center text-text-on-brand font-bold text-[13px]",
                                                children:
                                                  (null == (et = ev.user) ||
                                                  null == (ee = et.name) ||
                                                  null == (X = ee[0])
                                                    ? void 0
                                                    : X.toUpperCase()) ||
                                                  (null == (en = ev.user) ||
                                                  null == (ea = en.email) ||
                                                  null == (er = ea[0])
                                                    ? void 0
                                                    : er.toUpperCase()) ||
                                                  "U",
                                              }),
                                          (0, a.jsx)("span", {
                                            className:
                                              "text-[13px] font-bold text-text-muted max-w-[72px] truncate hidden xl:block",
                                            children:
                                              (null == (es = ev.user) ? void 0 : es.name) ||
                                              (null == (el = ev.user) || null == (ei = el.email)
                                                ? void 0
                                                : ei.split("@")[0]),
                                          }),
                                          (0, a.jsx)(L.A, {
                                            className:
                                              "ml-[2px] text-text-muted transition-transform duration-fast ".concat(
                                                ex ? "rotate-180" : "",
                                              ),
                                          }),
                                        ],
                                      }),
                                      (0, a.jsx)(C.N, {
                                        children:
                                          ex &&
                                          (0, a.jsxs)(M.P.div, {
                                            initial: { opacity: 0, y: -8 },
                                            animate: { opacity: 1, y: 0 },
                                            exit: { opacity: 0, y: -8 },
                                            transition: { duration: 0.15 },
                                            className:
                                              "absolute right-0 mt-2 w-56 bg-bg-card border-2 border-border-hard shadow-block z-dropdown overflow-hidden",
                                            children: [
                                              (0, a.jsxs)("div", {
                                                className:
                                                  "px-[14px] py-3 border-b-2 border-border-hard",
                                                children: [
                                                  (0, a.jsx)("div", {
                                                    className:
                                                      "text-[14px] font-black text-text-primary truncate",
                                                    children:
                                                      (null == (eo = ev.user) ? void 0 : eo.name) ||
                                                      "未命名用户",
                                                  }),
                                                  (0, a.jsx)("div", {
                                                    className:
                                                      "text-xs text-text-disabled truncate mt-0.5",
                                                    children:
                                                      null == (ed = ev.user) ? void 0 : ed.email,
                                                  }),
                                                  (0, a.jsx)("div", {
                                                    className: "mt-1.5",
                                                    children: (0, a.jsx)(I.E, {
                                                      tone: "success",
                                                      icon: (0, a.jsx)(F.A, {}),
                                                      children: "全部功能免费",
                                                    }),
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsxs)("div", {
                                                className: "py-1.5",
                                                children: [
                                                  (null == (ec = ev.user) ? void 0 : ec.role) ===
                                                    "admin" &&
                                                    (0, a.jsxs)(o(), {
                                                      href: "/admin",
                                                      onClick: () => eh(!1),
                                                      className: J,
                                                      children: [
                                                        (0, a.jsx)(P.A, {
                                                          size: 16,
                                                          className: "shrink-0",
                                                        }),
                                                        "管理后台",
                                                      ],
                                                    }),
                                                  (0, a.jsxs)(o(), {
                                                    href: "/profile",
                                                    onClick: () => eh(!1),
                                                    className: J,
                                                    children: [
                                                      (0, a.jsx)(y.A, {
                                                        size: 16,
                                                        className: "shrink-0",
                                                      }),
                                                      "个人中心",
                                                    ],
                                                  }),
                                                  (0, a.jsxs)(o(), {
                                                    href: "/profile?role=user&tab=messages",
                                                    onClick: () => eh(!1),
                                                    className: J,
                                                    children: [
                                                      (0, a.jsx)(v.A, {
                                                        size: 16,
                                                        className: "shrink-0",
                                                      }),
                                                      "消息中心",
                                                      eA > 0 &&
                                                        (0, a.jsx)(O.x, {
                                                          className: "ml-auto",
                                                          children: eA > 99 ? "99+" : eA,
                                                        }),
                                                    ],
                                                  }),
                                                  (0, a.jsxs)(o(), {
                                                    href: "/profile?role=user&tab=settings",
                                                    onClick: () => eh(!1),
                                                    className: J,
                                                    children: [
                                                      (0, a.jsx)(W.A, {
                                                        size: 16,
                                                        className: "shrink-0",
                                                      }),
                                                      "账号设置",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, a.jsx)("div", {
                                                className: "border-t-2 border-border-hard py-1.5",
                                                children: (0, a.jsxs)("button", {
                                                  type: "button",
                                                  onClick: ek,
                                                  className: "".concat(
                                                    J,
                                                    " !text-error hover:!bg-error/10 hover:!text-error",
                                                  ),
                                                  children: [
                                                    (0, a.jsx)(j.A, {
                                                      size: 16,
                                                      className: "shrink-0",
                                                    }),
                                                    "退出登录",
                                                  ],
                                                }),
                                              }),
                                            ],
                                          }),
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (0, a.jsx)(T.ButtonLink, {
                                    href: "/login",
                                    size: "md",
                                    variant: "secondary",
                                    children: "登录",
                                  }),
                                  (0, a.jsx)(T.ButtonLink, {
                                    href: "/register",
                                    size: "md",
                                    variant: "primary",
                                    children: "注册",
                                  }),
                                ],
                              }),
                        }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        });
      }
      var G = r(68595),
        Y = r(2186),
        Z = r(98901);
      let X = "mcb-annc-step-teaching-2026-09",
        ee = "data-annc-off",
        et = ["/buildings/step-teaching"];
      function er() {
        let e = (0, c.usePathname)() || "/";
        return et.some((t) => e === t || e.startsWith(t + "/"))
          ? null
          : (0, a.jsxs)("div", {
              className: "mcb-annc",
              role: "region",
              "aria-label": "新功能",
              children: [
                (0, a.jsxs)(o(), {
                  className: "mcb-annc-link",
                  href: "/buildings/step-teaching",
                  onClick: () => (0, Z.MP)("step_entry_link", { from: "site_banner", path: e }),
                  children: [
                    (0, a.jsx)("b", {
                      className: "mcb-annc-title",
                      children: "新上线：3D 步骤教学",
                    }),
                    (0, a.jsx)("span", {
                      className: "mcb-annc-t",
                      children: "对着模型一步一步搭 Minecraft 建筑",
                    }),
                    (0, a.jsxs)("span", {
                      className: "mcb-annc-go",
                      children: ["去看看", (0, a.jsx)(G.A, { "aria-hidden": !0 })],
                    }),
                  ],
                }),
                (0, a.jsx)("button", {
                  type: "button",
                  className: "mcb-annc-x",
                  "aria-label": "关闭",
                  onClick: () => {
                    try {
                      localStorage.setItem(X, "1");
                    } catch (e) {}
                    (document.documentElement.setAttribute(ee, ""),
                      (0, Z.MP)("site_banner_close", { path: e }));
                  },
                  children: (0, a.jsx)(Y.A, { "aria-hidden": !0 }),
                }),
              ],
            });
      }
      function ea() {
        let e = (0, c.usePathname)(),
          t =
            ["/login", "/register", "/forgot-password", "/verify-success"].includes(e) ||
            e.startsWith("/reset-password"),
          r = e.startsWith("/admin"),
          n = e.startsWith("/studio/editor");
        return t || r || n
          ? null
          : (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)(er, {}), (0, a.jsx)(V, {})] });
      }
      function en() {
        return (0, a.jsx)("footer", {
          className: "bg-bg-card border-t-2 border-border-hard mt-auto",
          children: (0, a.jsxs)("div", {
            className:
              "wrap py-4 flex flex-col items-center gap-1.5 md:flex-row md:items-center md:justify-between md:gap-x-5 text-xs font-bold text-text-disabled",
            children: [
              (0, a.jsxs)("span", {
                className: "text-center md:text-left md:whitespace-nowrap",
                children: [
                  "\xa9 2026 投影编辑器 \xb7  \xb7 ",
                  (0, a.jsx)("a", {
                    href: "#",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-text-disabled hover:text-text-primary transition-colors",
                    children: "湘ICP备2025137428号-1",
                  }),
                ],
              }),
              (0, a.jsx)("span", {
                className: "text-center md:text-right md:whitespace-nowrap opacity-70",
                children: "Minecraft 是 Microsoft / Mojang Studios 的商标，本站与其无关",
              }),
            ],
          }),
        });
      }
      "try{if(localStorage.getItem("
        .concat(JSON.stringify(X), ")==='1')document.documentElement.setAttribute(")
        .concat(JSON.stringify(ee), ",'')}catch(e){}");
      let es = [
          { label: "建筑库", href: "/buildings" },
          { label: "3D 步骤教学", href: "/buildings/step-teaching", from: "footer" },
          { label: "投影编辑", href: "/studio" },
          { label: "壁纸站", href: "/wallpapers" },
          { label: "Blender", href: "/blender" },
          { label: "更新日志", href: "/changelog" },
        ],
        ei = [
          { label: "关于我们", href: "/about" },
          { label: "反馈入口", href: "/feedback" },
          { label: "使用条款", href: "/terms" },
          { label: "隐私政策", href: "/privacy" },
        ];
      function el() {
        let e = [ei[0], { label: "支持我们", href: "/support" }, ...ei.slice(1)];
        return (0, a.jsx)("footer", {
          className: "ft-full",
          children: (0, a.jsxs)("div", {
            className: "ft-inner wrap",
            children: [
              (0, a.jsxs)("div", {
                className: "ft-top",
                children: [
                  (0, a.jsxs)("div", {
                    className: "ft-brand",
                    children: [
                      (0, a.jsx)(o(), {
                        href: "/",
                        style: { display: "inline-block" },
                        children: (0, a.jsx)("img", {
                          src: (0, z.d)("/images/logo/logo-horizontal.png"),
                          alt: "投影编辑器",
                        }),
                      }),
                      (0, a.jsx)("p", {
                        children:
                          "Minecraft 建筑内容与创作工具平台。从发现建筑到编辑投影，再到 Blender 创作，让每一座建筑都被好好展陈。",
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "ft-cols",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "ft-col",
                        children: [
                          (0, a.jsx)("h4", { children: "产品" }),
                          es.map((e) =>
                            (0, a.jsx)(
                              o(),
                              {
                                href: e.href,
                                onClick: e.from
                                  ? () => (0, Z.MP)("step_entry_link", { from: e.from })
                                  : void 0,
                                children: e.label,
                              },
                              e.href,
                            ),
                          ),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "ft-col",
                        children: [
                          (0, a.jsx)("h4", { children: "关于" }),
                          e.map((e) =>
                            (0, a.jsx)(o(), { href: e.href, children: e.label }, e.href),
                          ),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "ft-col ft-community",
                        children: [
                          (0, a.jsx)("h4", { children: "社群" }),
                          (0, a.jsxs)("div", {
                            className: "ft-qr-row",
                            children: [
                              (0, a.jsxs)("figure", {
                                className: "ft-qr",
                                children: [
                                  (0, a.jsx)("div", {
                                    className: "ft-qr-box",
                                    children: (0, a.jsx)("img", {
                                      src: "/images/qr-qq.png",
                                      alt: "QQ 群二维码",
                                    }),
                                  }),
                                  (0, a.jsx)("figcaption", { children: "QQ 交流群" }),
                                ],
                              }),
                              (0, a.jsxs)("figure", {
                                className: "ft-qr",
                                children: [
                                  (0, a.jsx)("div", {
                                    className: "ft-qr-box",
                                    children: (0, a.jsx)("img", {
                                      src: "/images/qr-partner.png",
                                      alt: "合作伙伴二维码",
                                    }),
                                  }),
                                  (0, a.jsx)("figcaption", { children: "合作伙伴" }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsxs)("div", {
                className: "ft-bottom",
                children: [
                  (0, a.jsx)("span", {
                    className: "ft-slogan",
                    children: "MC 建筑，不止于你的存档",
                  }),
                  (0, a.jsxs)("div", {
                    className: "ft-legal",
                    children: [
                      (0, a.jsx)("span", {
                        children: "\xa9 2026 投影编辑器 \xb7 ",
                      }),
                      (0, a.jsx)("span", { children: "\xb7" }),
                      (0, a.jsx)("a", {
                        href: "#",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: "湘ICP备2025137428号-1",
                      }),
                    ],
                  }),
                  (0, a.jsx)("span", {
                    className: "ft-disclaimer",
                    children: "Minecraft 是 Microsoft / Mojang Studios 的商标，本站与其无关",
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function eo() {
        let e = (0, c.usePathname)(),
          t =
            ["/login", "/register", "/forgot-password", "/verify-success"].includes(e) ||
            e.startsWith("/reset-password"),
          r = e.startsWith("/admin"),
          n = e.startsWith("/studio/editor"),
          s = "/" === e;
        return t || r || n ? null : s ? (0, a.jsx)(el, {}) : (0, a.jsx)(en, {});
      }
      var ed = r(35440);
      let ec = (0, b.A)("outline", "history", "History", [
          ["path", { d: "M12 8l0 4l2 2", key: "svg-0" }],
          ["path", { d: "M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5", key: "svg-1" }],
        ]),
        ex = (0, b.A)("outline", "layout-grid", "LayoutGrid", [
          [
            "path",
            {
              d: "M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4",
              key: "svg-0",
            },
          ],
          [
            "path",
            {
              d: "M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4",
              key: "svg-1",
            },
          ],
          [
            "path",
            {
              d: "M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4",
              key: "svg-2",
            },
          ],
          [
            "path",
            {
              d: "M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4",
              key: "svg-3",
            },
          ],
        ]),
        eh = [
          { icon: u.A, label: "首页", href: "/", key: "home" },
          { icon: m.A, label: "建筑库", href: "/buildings", key: "buildings" },
          { icon: _.A, label: "投影编辑", href: "/studio", key: "studio" },
          { icon: g.A, label: "壁纸站", href: "/wallpapers", key: "wallpapers" },
        ],
        eu = [
          { icon: y.A, label: "个人中心", href: "/profile" },
          { icon: ed.A, label: "Blender", href: "/blender" },
          { icon: ec, label: "更新日志", href: "/changelog" },
        ];
      function em() {
        let e = (0, c.usePathname)(),
          { unreadCount: t } = (0, h.U4)(),
          [r, s] = (0, n.useState)(!1),
          i = (0, n.useCallback)(() => s(!1), []);
        Q("more", i);
        let l = [...eu, { icon: E.A, label: "支持我们", href: "/support" }];
        if (e.startsWith("/studio/editor")) return null;
        let o = (t) => ("/" === t ? "/" === e : e === t || e.startsWith(t + "/")),
          d = () => {
            (s(!1),
              "undefined" != typeof navigator &&
                "function" == typeof navigator.vibrate &&
                navigator.vibrate(15));
          },
          x = l.some((e) => o(e.href));
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsxs)(U._, {
              id: "mobile-more-menu",
              open: r,
              onClose: i,
              position: "bottom",
              size: "lg",
              showCloseButton: !1,
              className: "!h-auto bg-bg-card lg:hidden",
              bodyClassName: "!overflow-visible !p-0",
              children: [
                (0, a.jsxs)("div", {
                  className:
                    "flex items-center gap-2 px-[18px] pt-[15px] text-sm font-black tracking-[.02em] text-text-muted",
                  children: [
                    (0, a.jsx)("span", {
                      className: "w-[11px] h-[11px] bg-brand-cta border-2 border-border-hard",
                    }),
                    "更多功能",
                  ],
                }),
                (0, a.jsx)("div", {
                  className: "grid grid-cols-3 gap-2.5 px-[18px] pt-3 pb-[18px]",
                  children: l.map((e) => {
                    let r = o(e.href);
                    return (0, a.jsx)(
                      K,
                      {
                        icon: e.icon,
                        label: e.label,
                        href: e.href,
                        onClick: d,
                        active: r,
                        badge: e.badge,
                        indicator: "/profile" === e.href && t > 0,
                      },
                      e.href,
                    );
                  }),
                }),
              ],
            }),
            (0, a.jsxs)("nav", {
              className:
                "fixed bottom-0 left-0 right-0 z-50 lg:hidden h-[52px] px-2 bg-bg-card border-t-2 border-border-hard flex items-center justify-around pb-[env(safe-area-inset-bottom)]",
              role: "navigation",
              "aria-label": "主导航",
              children: [
                eh.map((e) => {
                  let t = o(e.href),
                    r = e.icon;
                  return (0, a.jsxs)(
                    T.ButtonLink,
                    {
                      href: e.href,
                      onClick: d,
                      size: "md",
                      variant: "ghost",
                      className:
                        "\n                relative min-h-[var(--control-touch-min)] min-w-[48px]\n                !overflow-visible !border-0 !bg-transparent !px-2 !shadow-none\n                [&_[data-control-content]]:flex-col [&_[data-control-content]]:gap-0\n                ".concat(
                          t ? "!text-brand-cta" : "!text-text-muted",
                          "\n              ",
                        ),
                      "aria-current": t ? "page" : void 0,
                      children: [
                        t &&
                          (0, a.jsx)("span", {
                            "aria-hidden": !0,
                            className:
                              "btab-anim-indicator absolute -top-[2px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-brand-cta",
                          }),
                        (0, a.jsx)(
                          r,
                          {
                            className: "w-[22px] h-[22px] ".concat(
                              t ? "stroke-[2.5] btab-anim-bounce" : "stroke-[1.5]",
                            ),
                          },
                          "".concat(e.key, "-").concat(t ? "on" : "off"),
                        ),
                        (0, a.jsx)("span", {
                          className: "text-[10px] mt-[2px] ".concat(
                            t ? "font-extrabold" : "font-medium",
                          ),
                          children: e.label,
                        }),
                      ],
                    },
                    e.href,
                  );
                }),
                (0, a.jsxs)(q.$, {
                  type: "button",
                  size: "md",
                  variant: "ghost",
                  onClick: () => {
                    (s((e) => (e || $("more"), !e)),
                      "undefined" != typeof navigator &&
                        "function" == typeof navigator.vibrate &&
                        navigator.vibrate(15));
                  },
                  className:
                    "\n            relative min-h-[var(--control-touch-min)] min-w-[48px]\n            !overflow-visible !border-0 !bg-transparent !px-2 !shadow-none\n            [&_[data-control-content]]:flex-col [&_[data-control-content]]:gap-0\n            ".concat(
                      r || x ? "!text-text-primary" : "!text-text-muted",
                      "\n          ",
                    ),
                  "aria-expanded": r,
                  "aria-controls": "mobile-more-menu",
                  "aria-label": "更多",
                  children: [
                    (r || x) &&
                      (0, a.jsx)("span", {
                        "aria-hidden": !0,
                        className:
                          "btab-anim-indicator absolute -top-[2px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-brand-cta",
                      }),
                    (0, a.jsx)(ex, {
                      className: "w-[22px] h-[22px] ".concat(
                        r || x ? "stroke-[2.5] btab-anim-bounce" : "stroke-[1.5]",
                      ),
                    }),
                    (0, a.jsx)("span", {
                      className: "text-[10px] mt-[2px] ".concat(
                        r || x ? "font-extrabold" : "font-medium",
                      ),
                      children: "更多",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      function eb(e) {
        let { children: t } = e,
          r = (function () {
            let [e, t] = (0, n.useState)(!1);
            return (
              (0, n.useEffect)(() => {
                t("__TAURI_INTERNALS__" in window);
              }, []),
              e
            );
          })(),
          l = (function () {
            let [e, t] = (0, n.useState)(!1);
            (0, n.useEffect)(() => {
              try {
                let e = localStorage.getItem(i);
                "expanded" === e && t(!0);
              } catch (e) {}
            }, []);
            let r = (e) => {
              t(e);
              try {
                localStorage.setItem(i, e ? "expanded" : "collapsed");
              } catch (e) {}
            };
            return { expanded: e, setExpanded: r, toggle: () => r(!e) };
          })();
        if (r) {
          let e = l.expanded ? "ml-[220px]" : "ml-[64px]";
          return (0, a.jsxs)(s.Provider, {
            value: l,
            children: [
              (0, a.jsx)(N, {}),
              (0, a.jsx)("main", {
                id: "main-content",
                className: "".concat(e, " min-h-screen transition-[margin] duration-200"),
                children: t,
              }),
            ],
          });
        }
        return (0, a.jsxs)("div", {
          className: "min-h-[calc(100dvh-52px)] lg:min-h-screen flex flex-col bg-bg-primary",
          children: [
            (0, a.jsx)(ea, {}),
            (0, a.jsx)("main", { id: "main-content", className: "flex-1", children: t }),
            (0, a.jsx)(eo, {}),
            (0, a.jsx)(em, {}),
          ],
        });
      }
    },
    95585: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "chevron-right", "ChevronRight", [
        ["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }],
      ]);
    },
    98901: (e, t, r) => {
      "use strict";
      r.d(t, { Bu: () => M, MH: () => C, MP: () => k, PO: () => A, wg: () => x });
      let a = "/api/analytics/track",
        n = "mcb_sid",
        s = [],
        i = null,
        l = "",
        o = 0,
        d = "",
        c = !1;
      function x(e) {
        return (
          "/render-lab" === e ||
          e.startsWith("/render-lab/") ||
          "/admin" === e ||
          e.startsWith("/admin/")
        );
      }
      function h() {
        return x(window.location.pathname);
      }
      function u() {
        (i && (clearTimeout(i), (i = null)), (s = []), (o = 0));
      }
      function m() {
        if ("undefined" == typeof navigator) return "desktop";
        let e = navigator.userAgent;
        return /iPad|Tablet/i.test(e)
          ? "tablet"
          : /Mobile|Android|iPhone/i.test(e)
            ? "mobile"
            : "desktop";
      }
      function b() {
        if ("undefined" == typeof navigator) return "unknown";
        let e = navigator.userAgent;
        return e.includes("Edg/")
          ? "edge"
          : e.includes("Chrome/") && !e.includes("Edg/")
            ? "chrome"
            : e.includes("Firefox/")
              ? "firefox"
              : e.includes("Safari/") && !e.includes("Chrome/")
                ? "safari"
                : "other";
      }
      function p() {
        if ("undefined" == typeof navigator) return "unknown";
        let e = navigator.userAgent;
        return e.includes("Win")
          ? "windows"
          : e.includes("Mac") && !e.includes("iPhone")
            ? "macos"
            : e.includes("iPhone") || e.includes("iPad")
              ? "ios"
              : e.includes("Android")
                ? "android"
                : e.includes("Linux")
                  ? "linux"
                  : "other";
      }
      let g = "mcb_src",
        f = [
          [/aweme/i, "douyin"],
          [/MicroMessenger/i, "wechat"],
          [/\bQQ\/\d/, "qq"],
          [/xhsdiscover/i, "xiaohongshu"],
          [/BiliApp/i, "bilibili"],
          [/Kwai|KsWebView/i, "kuaishou"],
          [/Weibo/i, "weibo"],
        ];
      function v() {
        try {
          let e = sessionStorage.getItem(g);
          if (e) return e;
        } catch (e) {}
        let e =
          (function () {
            let e = new URLSearchParams(window.location.search).get("utm_source");
            return (
              (null == e
                ? void 0
                : e
                    .toLowerCase()
                    .replace(/[^a-z0-9_-]/g, "")
                    .slice(0, 20)) || null
            );
          })() ||
          (function () {
            let e = navigator.userAgent;
            for (let [t, r] of f) if (t.test(e)) return r;
            return null;
          })() ||
          (function () {
            let e = document.referrer;
            if (!e) return "direct";
            try {
              let t = new URL(e).hostname;
              if (t.includes("localhost")) return "direct";
              if (
                t.includes("google") ||
                t.includes("bing") ||
                t.includes("baidu") ||
                t.includes("sogou") ||
                t.includes("so.com")
              )
                return "search";
              if (t.includes("weixin") || t.includes("wechat") || t.includes("wx")) return "wechat";
              if (t.includes("qq.com") || t.includes("qzone")) return "qq";
              if (t.includes("douyin")) return "douyin";
              if (t.includes("xiaohongshu")) return "xiaohongshu";
              if (t.includes("bilibili")) return "bilibili";
              if (t.includes("weibo")) return "weibo";
              return "referral";
            } catch (e) {
              return "direct";
            }
          })();
        try {
          sessionStorage.setItem(g, e);
        } catch (e) {}
        return e;
      }
      function j(e) {
        if (h()) return void u();
        let t = (function () {
          if (l) return l;
          let e = sessionStorage.getItem(n);
          return (
            e ||
              ((e = ""
                .concat(Date.now().toString(36), "-")
                .concat(Math.random().toString(36).slice(2, 8))),
              sessionStorage.setItem(n, e)),
            (l = e),
            e
          );
        })();
        t && (s.push({ ...e, sessionId: t }), s.length >= 50 ? y() : i || (i = setTimeout(y, 1e4)));
      }
      function y() {
        if (h()) return void u();
        if ((i && (clearTimeout(i), (i = null)), 0 === s.length)) return;
        let e = JSON.stringify({ events: s.splice(0) });
        "undefined" != typeof navigator && navigator.sendBeacon
          ? navigator.sendBeacon(a, new Blob([e], { type: "application/json" }))
          : fetch(a, {
              method: "POST",
              body: e,
              headers: { "Content-Type": "application/json" },
              keepalive: !0,
            }).catch(() => {});
      }
      function w(e) {
        if (h()) return void u();
        if (e === d) return;
        let t = Date.now();
        if (o > 0 && d) {
          let r = Math.round((t - o) / 1e3);
          r > 0 && r < 3600 && j({ type: "page_leave", page: d, duration: r, metadata: { to: e } });
        }
        ((o = t),
          (d = e),
          j({
            type: "page_view",
            page: e,
            referrer: document.referrer || void 0,
            device: m(),
            browser: b(),
            os: p(),
            source: v(),
          }));
      }
      function N() {
        if (!c) {
          if (((c = !0), o > 0)) {
            let e = Math.round((Date.now() - o) / 1e3);
            j({ type: "session_end", page: window.location.pathname, duration: Math.min(e, 3600) });
          }
          y();
        }
      }
      function k(e, t) {
        j({ type: "click", page: window.location.pathname, metadata: { target: e, ...t } });
      }
      function A() {
        y();
      }
      function C(e, t) {
        j({
          type: "download",
          page: window.location.pathname,
          metadata: { itemType: e, itemId: t },
        });
      }
      function M() {
        (h() ||
          j({
            type: "session_start",
            page: window.location.pathname,
            device: m(),
            browser: b(),
            os: p(),
            source: v(),
            referrer: ("undefined" != typeof document && document.referrer) || void 0,
          }),
          window.addEventListener("pagehide", N),
          window.addEventListener("pageshow", () => {
            c = !1;
          }));
        let e = history.pushState.bind(history);
        history.pushState = function () {
          for (var t = arguments.length, r = Array(t), a = 0; a < t; a++) r[a] = arguments[a];
          (e(...r), setTimeout(() => w(window.location.pathname), 0));
        };
        let t = history.replaceState.bind(history);
        ((history.replaceState = function () {
          for (var e = arguments.length, r = Array(e), a = 0; a < e; a++) r[a] = arguments[a];
          (t(...r), setTimeout(() => w(window.location.pathname), 0));
        }),
          window.addEventListener("popstate", () => {
            w(window.location.pathname);
          }),
          h() || w(window.location.pathname));
      }
    },
    99099: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "chevron-down", "ChevronDown", [
        ["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }],
      ]);
    },
  },
  (e) => {
    (e.O(
      0,
      [
        6774, 2140, 109, 9999, 1741, 7975, 4053, 2619, 1733, 8303, 8304, 5239, 6784, 3493, 6260,
        5748, 8441, 7391, 7358,
      ],
      () => e((e.s = 21632)),
    ),
      (_N_E = e.O()));
  },
]);

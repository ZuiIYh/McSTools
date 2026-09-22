"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6260],
  {
    24048: (e, t, r) => {
      r.d(t, { I: () => i, d: () => d });
      var a = r(95155),
        n = r(12115),
        o = r(25016),
        l = r(68401);
      let s = n.createContext(null);
      function i(e) {
        let {
          value: t,
          onValueChange: r,
          size: n = "md",
          disabled: l = !1,
          label: i,
          className: d,
          children: c,
          ...x
        } = e;
        return (0, a.jsx)(s.Provider, {
          value: { value: t, size: n, disabled: l, onValueChange: r },
          children: (0, a.jsx)("div", {
            role: "group",
            "aria-label": i,
            "aria-disabled": l || void 0,
            className: (0, o.cn)(
              "inline-flex max-w-full items-stretch overflow-x-auto rounded-none border-2 border-border-hard bg-bg-card",
              d,
            ),
            "data-control-kind": "segment-group",
            "data-control-size": n,
            ...x,
            children: c,
          }),
        });
      }
      let d = n.forwardRef((e, t) => {
        let {
            value: r,
            className: i,
            children: d,
            disabled: c,
            onClick: x,
            type: u = "button",
            ...h
          } = e,
          m = n.useContext(s);
        if (!m) throw Error("SegmentItem 必须放在 SegmentedControl 内");
        let b = m.value === r,
          p = m.disabled || !!c;
        return (0, a.jsx)("button", {
          ref: t,
          type: u,
          className: (0, o.cn)(
            "box-border inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-none border-0 border-r-2 border-border-hard font-body font-semibold leading-none last:border-r-0 transition-colors duration-fast focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-inset disabled:text-text-disabled",
            l.hG[m.size],
            b
              ? "bg-brand-primary text-text-on-brand"
              : "bg-transparent text-text-muted hover:bg-bg-inset hover:text-text-primary",
            i,
          ),
          disabled: p,
          "aria-pressed": b,
          "data-control-kind": "segment",
          "data-control-size": m.size,
          "data-control-variant": b ? "primary" : "secondary",
          "data-selected": b ? "true" : "false",
          onClick: (e) => {
            (null == x || x(e), e.defaultPrevented || p || m.onValueChange(r));
          },
          ...h,
          children: d,
        });
      });
      d.displayName = "SegmentItem";
    },
    26260: (e, t, r) => {
      r.d(t, { m: () => S, E: () => C });
      var a = r(95155),
        n = r(12115),
        o = r(36489),
        l = r(45201),
        s = r(71442),
        i = r(20063),
        d = r(52619),
        c = r.n(d),
        x = r(80645),
        u = r(51750),
        h = r(2149),
        m = r(21258),
        b = r(26545),
        p = r(68595),
        v = r(62371),
        f = r(72747),
        g = r(97003),
        y = r(44460),
        w = r(24048);
      let j = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      function N(e) {
        let { onSuccess: t, onNavigate: r, callbackUrl: l } = e,
          s = (0, i.useRouter)(),
          [d, N] = (0, n.useState)(""),
          [k, C] = (0, n.useState)(""),
          [S, z] = (0, n.useState)(""),
          [E, _] = (0, n.useState)(""),
          [I, q] = (0, n.useState)(0),
          [A, P] = (0, n.useState)(!1),
          [T, $] = (0, n.useState)("password"),
          [L, R] = (0, n.useState)(!1),
          [O, U] = (0, n.useState)(0),
          [D, K] = (0, n.useState)(!1),
          [M, B] = (0, n.useState)(null);
        ((0, n.useEffect)(() => {
          let e = localStorage.getItem("rememberedEmail");
          e && N(e);
        }, []),
          (0, n.useEffect)(() => {
            if (O > 0) {
              let e = setTimeout(() => U(O - 1), 1e3);
              return () => clearTimeout(e);
            }
          }, [O]));
        let V = async () => {
            if ((B(null), !d || !j.test(d))) return void B("请输入有效的邮箱地址");
            try {
              let e = await fetch("/api/auth/send-code", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: d }),
                }),
                t = await e.json();
              if (!e.ok)
                return void B(
                  t.error ||
                    (429 === e.status ? "发送过于频繁，请稍后再试" : "发送失败，请稍后重试"),
                );
              (R(!0), U(60));
            } catch (e) {
              B("发送失败，请稍后重试");
            }
          },
          F = async () => {
            (localStorage.setItem("rememberedEmail", d),
              await new Promise((e) => setTimeout(e, 400)),
              await (0, o.getSession)(),
              t());
          },
          G = async (e) => {
            if ((e.preventDefault(), B(null), !d || !j.test(d)))
              return void B("请输入有效的邮箱地址");
            if ("password" === T) {
              if (!k || k.length < 6) return void B("密码至少需要 6 个字符");
            } else {
              if (!S || 6 !== S.length) return void B("请输入 6 位验证码");
              if (!E || E.length < 3) return void B("请输入图形验证码");
            }
            K(!0);
            try {
              if ("password" === T) {
                let e = await (0, o.signIn)("credentials", { email: d, password: k, redirect: !1 });
                (null == e ? void 0 : e.error)
                  ? B(
                      "CredentialsSignin" === e.error
                        ? "邮箱或密码错误，请检查后重试"
                        : "登录失败，请稍后重试",
                    )
                  : (null == e ? void 0 : e.ok) && (await F());
              } else {
                let e = await fetch("/api/auth/login-with-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: d, code: S, captcha: E }),
                  }),
                  t = await e.json();
                e.ok
                  ? await F()
                  : (B(t.error || "登录失败，请稍后重试"),
                    (null == t ? void 0 : t.code) === "CAPTCHA_INVALID" &&
                      (_(""), q((e) => e + 1)));
              }
            } catch (e) {
              B("登录失败，请稍后重试");
            } finally {
              K(!1);
            }
          };
        return (0, a.jsxs)("form", {
          onSubmit: G,
          className: "space-y-3",
          children: [
            (0, a.jsxs)("div", {
              className: "relative",
              children: [
                (0, a.jsx)("input", {
                  type: "email",
                  value: d,
                  onChange: (e) => N(e.target.value),
                  autoComplete: "email",
                  className:
                    "h-11 w-full border-2 border-border-hard bg-bg-elevated px-3.5 pr-9 text-sm font-medium text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary",
                  placeholder: "邮箱地址",
                }),
                (0, a.jsx)(h.A, {
                  size: 13,
                  className:
                    "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted",
                }),
              ],
            }),
            "password" === T &&
              (0, a.jsxs)("div", {
                className: "relative",
                children: [
                  (0, a.jsx)("input", {
                    type: A ? "text" : "password",
                    value: k,
                    onChange: (e) => C(e.target.value),
                    autoComplete: "current-password",
                    className:
                      "h-11 w-full border-2 border-border-hard bg-bg-elevated px-3.5 pr-9 text-sm font-medium text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary",
                    placeholder: "密码",
                  }),
                  (0, a.jsx)(y.K, {
                    type: "button",
                    onClick: () => P(!A),
                    label: A ? "隐藏密码" : "显示密码",
                    size: "md",
                    variant: "ghost",
                    className:
                      "absolute right-0 top-1/2 -translate-y-1/2 border-transparent text-text-muted shadow-none hover:text-text-secondary",
                    children: A ? (0, a.jsx)(m.A, { size: 13 }) : (0, a.jsx)(b.A, { size: 13 }),
                  }),
                ],
              }),
            "code" === T &&
              (0, a.jsxs)("div", {
                className: "space-y-3",
                children: [
                  (0, a.jsxs)("div", {
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, a.jsx)("input", {
                            type: "text",
                            value: S,
                            onChange: (e) => z(e.target.value),
                            maxLength: 6,
                            className:
                              "flex-1 h-11 px-3.5 bg-bg-elevated border-2 border-border-hard text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors",
                            placeholder: "邮箱验证码",
                          }),
                          (0, a.jsx)(g.$, {
                            type: "button",
                            onClick: V,
                            disabled: O > 0 || !d,
                            variant: "secondary",
                            size: "md",
                            className: "px-4",
                            children: O > 0 ? "".concat(O, "秒") : L ? "重发" : "发送",
                          }),
                        ],
                      }),
                      L &&
                        (0, a.jsx)("p", {
                          className: "mt-1 text-xs text-success font-bold",
                          children: "验证码已发送，请查收邮件",
                        }),
                    ],
                  }),
                  (0, a.jsx)(x.$, { value: E, onChange: _ }, I),
                ],
              }),
            (0, a.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, a.jsxs)(w.I, {
                  value: T,
                  onValueChange: (e) => {
                    ($(e), B(null));
                  },
                  size: "md",
                  label: "登录方式",
                  className: "w-full",
                  children: [
                    (0, a.jsx)(w.d, {
                      value: "password",
                      className: "flex-1",
                      children: "密码登录",
                    }),
                    (0, a.jsx)(w.d, { value: "code", className: "flex-1", children: "验证码登录" }),
                  ],
                }),
                (0, a.jsx)(c(), {
                  href: "/forgot-password",
                  onClick: () => (null == r ? void 0 : r()),
                  className:
                    "inline-flex min-h-11 items-center text-xs font-bold text-text-muted transition-colors hover:text-text-primary",
                  children: "忘记密码？",
                }),
              ],
            }),
            M &&
              (0, a.jsx)("div", {
                className: "p-2.5 bg-error/10 border-2 border-error text-sm font-bold text-error",
                children: M,
              }),
            (0, a.jsx)(g.$, {
              type: "submit",
              disabled: D,
              variant: "primary",
              size: "lg",
              className: "w-full",
              children: D
                ? (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)(u.y, { size: "xs" }), " 登录中..."],
                  })
                : (0, a.jsxs)(a.Fragment, {
                    children: [
                      "password" === T ? "登录" : "验证码登录",
                      " ",
                      (0, a.jsx)(p.A, { size: 13 }),
                    ],
                  }),
            }),
            (0, a.jsxs)("div", {
              className:
                "pt-1 flex items-center justify-between text-[12px] text-text-secondary font-semibold",
              children: [
                (0, a.jsxs)(g.$, {
                  type: "button",
                  onClick: () => {
                    let e = l || window.location.pathname + window.location.search;
                    (null == r || r(), s.push("/login?callbackUrl=".concat(encodeURIComponent(e))));
                  },
                  variant: "ghost",
                  size: "md",
                  children: [
                    (0, a.jsx)(v.A, { size: 15, className: "text-platform-wechat" }),
                    (0, a.jsx)(f.A, { size: 15, className: "text-platform-qq" }),
                    "微信 / QQ 登录",
                  ],
                }),
                (0, a.jsx)(c(), {
                  href: "/register",
                  onClick: () => (null == r ? void 0 : r()),
                  className: "text-brand-primary font-extrabold hover:text-brand-primary-light",
                  children: "注册账号",
                }),
              ],
            }),
          ],
        });
      }
      let k = (0, n.createContext)({ requireLogin: () => !0, promptLogin: () => {} });
      function C() {
        return (0, n.useContext)(k);
      }
      function S(e) {
        let { children: t } = e,
          { status: r } = (0, o.useSession)(),
          [i, d] = (0, n.useState)(!1),
          [c, x] = (0, n.useState)(null),
          [h, m] = (0, n.useState)(null),
          [b, p] = (0, n.useState)("/"),
          [v, f] = (0, n.useState)(!1),
          [g, y] = (0, n.useState)(null),
          w = (0, n.useRef)(null),
          j = (0, n.useCallback)(function (e) {
            var t, r, a, n;
            let o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "precheck";
            (x(null != (t = null == e ? void 0 : e.action) ? t : null),
              m(null != (r = null == e ? void 0 : e.description) ? r : null),
              p(
                null != (a = null == e ? void 0 : e.callbackUrl)
                  ? a
                  : window.location.pathname + window.location.search,
              ),
              (w.current = null != (n = null == e ? void 0 : e.onSuccess) ? n : null),
              f(o),
              y(l),
              d(!0));
          }, []),
          C = (0, n.useCallback)(
            (e) => {
              j(e, !1, "unauthorized");
            },
            [j],
          ),
          S = (0, n.useCallback)(
            (e) =>
              "authenticated" === r ||
              ("unauthenticated" === r
                ? (j(e, !1, "precheck"), !1)
                : null == e || !e.strict || (j(e, !0, "checking"), !1)),
            [r, j],
          );
        ((0, n.useEffect)(() => {
          if (!i || v || "precheck" !== g || "authenticated" !== r) return;
          let e = w.current;
          ((w.current = null), y(null), d(!1), null == e || e());
        }, [i, v, g, r]),
          (0, n.useEffect)(() => {
            if (v) {
              if ("authenticated" === r) {
                let e = w.current;
                ((w.current = null), f(!1), y(null), d(!1), null == e || e());
                return;
              }
              "unauthenticated" === r && (f(!1), y("precheck"));
            }
          }, [v, r]));
        let z = (0, n.useCallback)(() => {
            ((w.current = null), f(!1), y(null), d(!1));
          }, []),
          E = (0, n.useCallback)(() => {
            let e = w.current;
            ((w.current = null), f(!1), y(null), d(!1), null == e || e());
          }, []),
          _ = (0, n.useMemo)(() => ({ requireLogin: S, promptLogin: C }), [S, C]),
          I = v && "loading" === r;
        return (0, a.jsxs)(k.Provider, {
          value: _,
          children: [
            t,
            (0, a.jsx)(s.a, {
              open: i,
              onClose: z,
              title: c ? "『".concat(c, "』需要登录") : "登录后继续",
              subtitle: null != h ? h : "登录后自动继续当前操作 \xb7 全部功能免费",
              icon: (0, a.jsx)(l.A, { size: 19 }),
              iconTone: "brand",
              size: "md",
              children: I
                ? (0, a.jsxs)("div", {
                    className:
                      "flex items-center justify-center gap-2 h-12 bg-bg-elevated border-2 border-border-hard text-sm font-bold text-text-secondary",
                    children: [(0, a.jsx)(u.y, { size: "sm" }), "正在确认登录状态..."],
                  })
                : (0, a.jsx)(N, { onSuccess: E, onNavigate: z, callbackUrl: b }),
            }),
          ],
        });
      }
    },
    33789: (e, t, r) => {
      r.d(t, { p: () => s });
      var a = r(95155),
        n = r(12115),
        o = r(25016);
      let l = {
          sm: "px-cn-3 py-cn-2 text-sm",
          md: "px-cn-4 py-cn-3 text-base",
          lg: "px-cn-6 py-cn-4 text-md",
        },
        s = n.forwardRef((e, t) => {
          let { inputSize: r = "md", className: n, type: s = "text", ...i } = e;
          return (0, a.jsx)("input", {
            ref: t,
            type: s,
            className: (0, o.cn)(
              "w-full rounded border-2 border-border-hard bg-bg-card text-text-primary placeholder:text-text-muted transition-colors duration-fast focus:outline-none focus:border-brand-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-card",
              l[r],
              n,
            ),
            ...i,
          });
        });
      s.displayName = "Input";
    },
    44460: (e, t, r) => {
      r.d(t, { K: () => i });
      var a = r(95155),
        n = r(12115),
        o = r(25016),
        l = r(97003),
        s = r(68401);
      let i = n.forwardRef((e, t) => {
        let { label: r, size: n = "md", className: i, title: d, children: c, ...x } = e;
        return (0, a.jsx)(l.$, {
          ref: t,
          size: n,
          controlKind: "icon",
          "aria-label": r,
          title: null != d ? d : r,
          className: (0, o.cn)(s.sf[n], i),
          ...x,
          children: c,
        });
      });
      i.displayName = "IconButton";
    },
    68401: (e, t, r) => {
      r.d(t, { M5: () => c, el: () => d, hG: () => n, s9: () => i, sf: () => o });
      var a = r(25016);
      let n = {
          xs: "h-[var(--control-h-xs)] px-[var(--control-px-xs)] text-[length:var(--control-font-xs)] [&_svg]:h-[var(--control-icon-xs)] [&_svg]:w-[var(--control-icon-xs)] max-md:h-[var(--control-touch-min)]",
          sm: "h-[var(--control-h-sm)] px-[var(--control-px-sm)] text-[length:var(--control-font-sm)] [&_svg]:h-[var(--control-icon-sm)] [&_svg]:w-[var(--control-icon-sm)] max-md:h-[var(--control-touch-min)]",
          md: "h-[var(--control-h-md)] px-[var(--control-px-md)] text-[length:var(--control-font-md)] [&_svg]:h-[var(--control-icon-md)] [&_svg]:w-[var(--control-icon-md)] max-md:h-[var(--control-touch-min)]",
          lg: "h-[var(--control-h-lg)] px-[var(--control-px-lg)] text-[length:var(--control-font-lg)] [&_svg]:h-[var(--control-icon-lg)] [&_svg]:w-[var(--control-icon-lg)]",
          xl: "h-[var(--control-h-xl)] px-[var(--control-px-xl)] text-[length:var(--control-font-xl)] [&_svg]:h-[var(--control-icon-xl)] [&_svg]:w-[var(--control-icon-xl)] max-md:h-[var(--control-h-lg)]",
        },
        o = {
          xs: "w-[var(--control-h-xs)] !px-0 max-md:w-[var(--control-touch-min)]",
          sm: "w-[var(--control-h-sm)] !px-0 max-md:w-[var(--control-touch-min)]",
          md: "w-[var(--control-h-md)] !px-0 max-md:w-[var(--control-touch-min)]",
          lg: "w-[var(--control-h-lg)] !px-0",
          xl: "w-[var(--control-h-xl)] !px-0 max-md:w-[var(--control-h-lg)]",
        },
        l = {
          primary:
            "bg-brand-primary text-text-on-brand shadow-block-sm hover:bg-brand-primary-light hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          secondary:
            "bg-bg-card text-text-primary shadow-block-sm hover:bg-bg-inset hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          ghost:
            "bg-transparent text-text-muted shadow-none hover:bg-bg-card hover:text-text-primary active:translate-x-[2px] active:translate-y-[2px]",
          danger:
            "bg-error text-text-primary shadow-block-sm hover:bg-error/90 hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          warning:
            "bg-warning text-text-on-brand shadow-block-sm hover:bg-warning/90 hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          platform:
            "text-text-primary shadow-block-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        },
        s = {
          wechat: "bg-platform-wechat hover:bg-platform-wechat-hover",
          qq: "bg-platform-qq hover:bg-platform-qq-hover",
        };
      function i(e) {
        return "default" === e || "icon" === e ? "md" : e;
      }
      function d(e) {
        return "default" === e ? "primary" : "outline" === e ? "secondary" : e;
      }
      function c(e) {
        let { size: t, variant: r, platform: i = "wechat", iconOnly: d = !1, className: c } = e;
        return (0, a.cn)(
          "relative box-border inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-none border-2 border-border-hard font-body font-semibold leading-none transition-[transform,box-shadow,background-color,color,border-color] duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-text-disabled disabled:shadow-inset disabled:translate-x-0 disabled:translate-y-0 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-text-disabled aria-disabled:shadow-inset aria-disabled:translate-x-0 aria-disabled:translate-y-0 [&_svg]:shrink-0",
          n[t],
          l[r],
          "platform" === r && s[i],
          d && o[t],
          c,
        );
      }
    },
    71442: (e, t, r) => {
      r.d(t, { a: () => x, y: () => u });
      var a = r(95155),
        n = r(12115),
        o = r(26497),
        l = r(1733),
        s = r(2186),
        i = r(97003),
        d = r(44460);
      let c = {
        sm: "max-w-[400px]",
        md: "max-w-[500px]",
        lg: "max-w-[700px]",
        xl: "max-w-[900px]",
        fullscreen: "max-w-full w-full h-full max-h-full rounded-none",
      };
      function x(e) {
        let {
            open: t,
            onClose: r,
            title: i,
            icon: x,
            iconTone: u = "brand",
            subtitle: h,
            children: m,
            size: b = "md",
            footer: p,
            closable: v = !0,
            maskClosable: f = !0,
            centered: g = !0,
            className: y = "",
            bodyClassName: w = "",
          } = e,
          j = (0, n.useCallback)(
            (e) => {
              "Escape" === e.key && v && r();
            },
            [r, v],
          );
        (0, n.useEffect)(() => {
          if (t)
            return (
              document.addEventListener("keydown", j),
              (document.body.style.overflow = "hidden"),
              () => {
                (document.removeEventListener("keydown", j), (document.body.style.overflow = ""));
              }
            );
        }, [t, j]);
        let N = !!(x || h);
        return (0, a.jsx)(o.N, {
          children:
            t &&
            (0, a.jsx)(l.P.div, {
              className: "fixed inset-0 bg-black/70 z-[11000] flex",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.2 },
              onClick: () => {
                f && r();
              },
              style: { alignItems: g ? "center" : "flex-start", justifyContent: "center" },
              children: (0, a.jsxs)(l.P.div, {
                className:
                  "\n              bg-bg-card rounded-none border-2 border-border-hard w-full shadow-block overflow-hidden\n              "
                    .concat("fullscreen" !== b ? "max-h-[90vh] mx-4" : "", "\n              ")
                    .concat(c[b], "\n              ")
                    .concat(y, "\n            "),
                initial: { scale: 0.95, y: 20 },
                animate: { scale: 1, y: 0 },
                exit: { scale: 0.95, y: 20 },
                transition: { duration: 0.2 },
                onClick: (e) => e.stopPropagation(),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": i ? "modal-title" : void 0,
                children: [
                  i &&
                    (0, a.jsxs)("div", {
                      className: "flex items-center justify-between ".concat(
                        N
                          ? "gap-3 border-b-2 border-border-hard bg-bg-card px-5 py-[18px]"
                          : "border-b border-border-soft px-6 py-4",
                      ),
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex min-w-0 items-center gap-3",
                          children: [
                            x &&
                              (0, a.jsx)("div", {
                                className:
                                  "flex h-[42px] w-[42px] shrink-0 items-center justify-center border-2 border-border-hard shadow-block-xs ".concat(
                                    {
                                      brand: "bg-brand-primary text-text-on-brand",
                                      success: "bg-success text-text-on-brand",
                                      warning: "bg-warning text-text-on-brand",
                                      danger: "bg-error text-white",
                                      info: "bg-info text-white",
                                      wechat: "bg-[rgb(7,193,96)] text-white",
                                      qq: "bg-[rgb(18,183,245)] text-white",
                                    }[u],
                                  ),
                                children: x,
                              }),
                            (0, a.jsxs)("div", {
                              className: "min-w-0",
                              children: [
                                (0, a.jsx)("h3", {
                                  id: "modal-title",
                                  className: "".concat(
                                    N ? "text-lg font-black" : "text-xl font-bold",
                                    " text-text-primary",
                                  ),
                                  children: i,
                                }),
                                h &&
                                  (0, a.jsx)("div", {
                                    className:
                                      "mt-0.5 text-xs font-bold leading-relaxed text-text-muted",
                                    children: h,
                                  }),
                              ],
                            }),
                          ],
                        }),
                        v &&
                          (0, a.jsx)(d.K, {
                            onClick: r,
                            label: "关闭",
                            size: "xs",
                            variant: "secondary",
                            className:
                              "shrink-0 bg-bg-elevated text-text-secondary hover:bg-error hover:text-text-primary",
                            children: (0, a.jsx)(s.A, { size: 20 }),
                          }),
                      ],
                    }),
                  (0, a.jsx)("div", {
                    className:
                      "\n                px-6 py-4 text-text-secondary leading-relaxed overflow-y-auto cn4-scroll\n                "
                        .concat("fullscreen" !== b ? "max-h-[60vh]" : "", "\n                ")
                        .concat(w, "\n              "),
                    children: m,
                  }),
                  p &&
                    (0, a.jsx)("div", {
                      className:
                        "cn4-modal-footer px-6 py-4 border-t border-border-soft flex justify-end gap-2",
                      children: p,
                    }),
                ],
              }),
            }),
        });
      }
      function u(e) {
        let { variant: t = "ghost", size: r = "lg", ...n } = e;
        return (0, a.jsx)(i.$, { variant: t, size: r, "data-compat-layer": "ModalButton", ...n });
      }
    },
    80645: (e, t, r) => {
      r.d(t, { $: () => s });
      var a = r(95155),
        n = r(12115),
        o = r(33789),
        l = r(25016);
      function s(e) {
        let {
            value: t,
            onChange: r,
            label: s = "图形验证码",
            required: i = !0,
            disabled: d = !1,
            className: c,
            placeholder: x = "请输入图中字符",
          } = e,
          [u, h] = (0, n.useState)(() => Date.now()),
          [m, b] = (0, n.useState)(!0),
          p = (0, n.useCallback)(() => {
            (b(!0), h(Date.now()), r(""));
          }, [r]);
        return (
          (0, n.useEffect)(() => {
            b(!0);
          }, [u]),
          (0, a.jsxs)("div", {
            className: (0, l.cn)("flex flex-col gap-cn-2", c),
            children: [
              s &&
                (0, a.jsxs)("label", {
                  className: "text-sm font-bold text-text-primary",
                  children: [
                    s,
                    i &&
                      (0, a.jsx)("span", { className: "ml-1 text-brand-primary", children: "*" }),
                  ],
                }),
              (0, a.jsxs)("div", {
                className: "flex items-stretch gap-cn-3",
                children: [
                  (0, a.jsx)(o.p, {
                    type: "text",
                    value: t,
                    onChange: (e) => r(e.target.value.toUpperCase().slice(0, 8)),
                    placeholder: x,
                    disabled: d,
                    autoComplete: "off",
                    spellCheck: !1,
                    required: i,
                    maxLength: 8,
                    className: "flex-1",
                  }),
                  (0, a.jsxs)("button", {
                    type: "button",
                    onClick: p,
                    disabled: d,
                    title: "点击刷新",
                    className:
                      "relative h-12 w-36 shrink-0 overflow-hidden rounded border-2 border-border-hard bg-bg-card shadow-block hover:shadow-block-hover hover:border-brand-primary transition-all disabled:opacity-50",
                    children: [
                      m &&
                        (0, a.jsx)("span", {
                          className:
                            "absolute inset-0 flex items-center justify-center text-xs text-text-muted bg-bg-card",
                          children: "加载中...",
                        }),
                      (0, a.jsx)("img", {
                        src: "/api/captcha?t=".concat(u),
                        alt: "点击刷新验证码",
                        width: 140,
                        height: 48,
                        className: "h-full w-full object-contain",
                        onLoad: () => b(!1),
                        onError: () => b(!1),
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsx)("p", {
                className: "text-xs text-text-muted",
                children: "看不清？点击图片刷新",
              }),
            ],
          })
        );
      }
    },
    97003: (e, t, r) => {
      r.d(t, { $: () => s });
      var a = r(95155),
        n = r(12115),
        o = r(64519),
        l = r(68401);
      let s = n.forwardRef((e, t) => {
        let {
            variant: r = "primary",
            size: n = "md",
            loading: s = !1,
            loadingLabel: i = "加载中",
            platform: d = "wechat",
            controlKind: c = "button",
            className: x,
            children: u,
            type: h = "button",
            disabled: m,
            ...b
          } = e,
          p = (0, l.s9)(n),
          v = (0, l.el)(r),
          f = !!(m || s);
        return (0, a.jsxs)("button", {
          ref: t,
          type: h,
          className: (0, l.M5)({
            size: p,
            variant: v,
            platform: d,
            iconOnly: "icon" === n,
            className: x,
          }),
          disabled: f,
          "aria-busy": s || void 0,
          "data-control-kind": c,
          "data-control-size": p,
          "data-control-variant": v,
          ...b,
          children: [
            (0, a.jsx)("span", {
              "data-control-content": "",
              className: "inline-flex min-w-0 items-center justify-center gap-2 ".concat(
                s ? "invisible" : "",
              ),
              "aria-hidden": s || void 0,
              children: u,
            }),
            s &&
              (0, a.jsx)("span", {
                className: "absolute inset-0 inline-flex items-center justify-center",
                "aria-hidden": "true",
                children: (0, a.jsx)(o.A, { className: "animate-spin" }),
              }),
            s && (0, a.jsx)("span", { className: "sr-only", children: i }),
          ],
        });
      });
      s.displayName = "Button";
    },
  },
]);

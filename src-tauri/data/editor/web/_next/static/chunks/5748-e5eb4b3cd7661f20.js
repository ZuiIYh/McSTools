"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5748],
  {
    22355: (e, t, n) => {
      n.d(t, { U4: () => d, qO: () => c });
      var r = n(12115),
        o = n(36489),
        s = n(18720);
      n(40621);
      let a = { SYSTEM: 0, SOCIAL: 0, total: 0 },
        l = (0, r.createContext)(null),
        i = { unreadCount: 0, counts: a, isLoading: !1, isConnected: !1, refresh: async () => {} };
      function c(e) {
        let { children: t } = e,
          n = (function () {
            let { data: e } = (0, o.useSession)(),
              [t, n] = (0, r.useState)(a),
              [l, i] = (0, r.useState)(!1),
              [c, d] = (0, r.useState)(!1),
              u = (0, r.useCallback)(async () => {
                if (null == e ? void 0 : e.user)
                  try {
                    let e = await fetch("/api/notifications/unread-count"),
                      t = await e.json();
                    t.success && n(t.data || { ...a, total: t.count || 0 });
                  } catch (e) {
                    console.error("获取未读数量失败:", e);
                  }
              }, [e]);
            return (
              (0, r.useEffect)(() => {
                u();
              }, [u]),
              (0, r.useEffect)(() => {
                if (!(null == e ? void 0 : e.user)) return;
                let t = null,
                  r = null,
                  o = () => {
                    t && t.close();
                    try {
                      (((t = new EventSource("/api/notifications/stream")).onopen = () => {
                        (console.log("[SSE] 实时消息连接已建立"), d(!0));
                      }),
                        (t.onmessage = (e) => {
                          try {
                            let t = JSON.parse(e.data);
                            switch (t.type) {
                              case "connected":
                                console.log("[SSE] 连接成功:", t.message);
                                break;
                              case "unread_count":
                                t.data ? n(t.data) : n((e) => ({ ...e, total: t.count || 0 }));
                                break;
                              case "notification":
                                t.data &&
                                  (s.oR.info(t.data.title, {
                                    description: t.data.content,
                                    duration: 5e3,
                                  }),
                                  u());
                            }
                          } catch (e) {
                            console.error("[SSE] 解析消息失败:", e);
                          }
                        }),
                        (t.onerror = (e) => {
                          (console.error("[SSE] 连接错误:", e),
                            d(!1),
                            null == t || t.close(),
                            r ||
                              (r = setTimeout(() => {
                                (console.log("[SSE] 尝试重新连接..."), (r = null), o());
                              }, 3e3)));
                        }));
                    } catch (e) {
                      console.error("[SSE] 创建连接失败:", e);
                    }
                  };
                return (
                  o(),
                  () => {
                    (t && t.close(), r && clearTimeout(r), d(!1));
                  }
                );
              }, [e, u]),
              (0, r.useMemo)(
                () => ({
                  unreadCount: t.total,
                  counts: t,
                  isLoading: l,
                  isConnected: c,
                  refresh: u,
                }),
                [t, l, c, u],
              )
            );
          })();
        return (0, r.createElement)(l.Provider, { value: n }, t);
      }
      function d() {
        let e = (0, r.useContext)(l);
        return e || i;
      }
    },
    33159: (e, t, n) => {
      n.d(t, { ButtonLink: () => c });
      var r = n(95155),
        o = n(12115),
        s = n(52619),
        a = n.n(s),
        l = n(64519),
        i = n(68401);
      let c = o.forwardRef((e, t) => {
        let {
            variant: n = "primary",
            size: o = "md",
            platform: s = "wechat",
            loading: c = !1,
            loadingLabel: d = "加载中",
            disabled: u = !1,
            className: x,
            children: m,
            onClick: b,
            tabIndex: h,
            ...p
          } = e,
          f = (0, i.s9)(o),
          S = (0, i.el)(n),
          v = u || c;
        return (0, r.jsxs)(a(), {
          ref: t,
          className: (0, i.M5)({
            size: f,
            variant: S,
            platform: s,
            iconOnly: "icon" === o,
            className: x,
          }),
          onClick: (e) => {
            if (v) return void e.preventDefault();
            null == b || b(e);
          },
          tabIndex: v ? -1 : h,
          "aria-disabled": v || void 0,
          "aria-busy": c || void 0,
          "data-control-kind": "link",
          "data-control-size": f,
          "data-control-variant": S,
          ...p,
          children: [
            (0, r.jsx)("span", {
              "data-control-content": "",
              className: "inline-flex min-w-0 items-center justify-center gap-2 ".concat(
                c ? "invisible" : "",
              ),
              "aria-hidden": c || void 0,
              children: m,
            }),
            c &&
              (0, r.jsx)("span", {
                className: "absolute inset-0 inline-flex items-center justify-center",
                "aria-hidden": "true",
                children: (0, r.jsx)(l.A, { className: "animate-spin" }),
              }),
            c && (0, r.jsx)("span", { className: "sr-only", children: d }),
          ],
        });
      });
      c.displayName = "ButtonLink";
    },
    40621: (e, t, n) => {
      n.d(t, { c3: () => l });
      let r = { SYSTEM: "SYSTEM", SOCIAL: "SOCIAL" };
      Object.values(r);
      let o = new Set(["system", "announcement", "benefit", "系统", "系统通知", "公告"]),
        s = new Set([
          "SOCIAL",
          "social",
          "like",
          "comment",
          "follow",
          "favorite",
          "互动",
          "社交",
          "评论",
          "点赞",
          "关注",
        ]),
        a = {};
      for (let e of o) a[e] = r.SYSTEM;
      for (let e of s) a[e] = r.SOCIAL;
      function l(e) {
        return e && e in a ? a[e] : r.SYSTEM;
      }
      (r.SOCIAL, r.SOCIAL, r.SOCIAL, r.SOCIAL, r.SOCIAL, r.SYSTEM, r.SYSTEM, r.SYSTEM);
    },
    53486: (e, t, n) => {
      n.d(t, { S: () => b, a: () => m });
      var r = n(95155),
        o = n(12115),
        s = n(2186),
        a = n(61456),
        l = n(67812),
        i = n(44748),
        c = n(71442);
      let d = (0, o.createContext)(null);
      function u(e) {
        let { object: t } = e;
        return (0, r.jsxs)("div", {
          className:
            "mt-4 flex items-center gap-3 border-2 border-border-hard bg-bg-inset p-3 shadow-block-xs",
          children: [
            t.thumbnail &&
              (0, r.jsx)("div", {
                className:
                  "h-[58px] w-[76px] shrink-0 overflow-hidden border-2 border-border-hard bg-bg-deep",
                children:
                  "string" == typeof t.thumbnail
                    ? (0, r.jsx)("img", {
                        src: t.thumbnail,
                        alt: "",
                        className: "h-full w-full object-cover",
                      })
                    : t.thumbnail,
              }),
            (0, r.jsxs)("div", {
              className: "min-w-0",
              children: [
                (0, r.jsx)("div", {
                  className: "truncate text-sm font-black text-text-primary",
                  children: t.name,
                }),
                t.meta &&
                  (0, r.jsx)("div", {
                    className: "mt-1 font-pixel text-xs text-text-muted",
                    children: t.meta,
                  }),
              ],
            }),
          ],
        });
      }
      function x(e) {
        let { request: t, onSettle: n } = e,
          {
            title: o,
            subtitle: l,
            body: i,
            confirmText: d = "确认执行",
            cancelText: u = "取消",
          } = t.options;
        return (0, r.jsxs)(c.a, {
          open: !0,
          onClose: () => n(!1),
          size: "md",
          maskClosable: !1,
          closable: !1,
          bodyClassName: "!max-h-[88vh] !p-0",
          className: "!max-w-[460px] !bg-bg-card",
          children: [
            (0, r.jsxs)("div", {
              className: "flex items-center gap-2.5 border-b-2 border-border-hard px-4 py-3.5",
              children: [
                (0, r.jsx)("span", {
                  className: "h-[15px] w-[3px] shrink-0 border-2 border-border-hard bg-warning",
                }),
                (0, r.jsxs)("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    (0, r.jsx)("h3", {
                      className: "text-base font-black text-text-primary",
                      children: o,
                    }),
                    l &&
                      (0, r.jsx)("div", {
                        className: "mt-0.5 text-[11px] font-bold leading-relaxed text-text-muted",
                        children: l,
                      }),
                  ],
                }),
                (0, r.jsx)("button", {
                  type: "button",
                  onClick: () => n(!1),
                  className:
                    "grid h-7 w-7 shrink-0 place-items-center text-text-muted transition-colors hover:text-error",
                  "aria-label": "关闭",
                  children: (0, r.jsx)(s.A, { size: 16 }),
                }),
              ],
            }),
            (0, r.jsx)("div", {
              className: "px-[18px] py-4 text-sm font-bold leading-relaxed text-text-secondary",
              children: i,
            }),
            (0, r.jsxs)("div", {
              className:
                "flex items-center justify-end gap-2 border-t-2 border-border-hard px-4 py-3.5",
              children: [
                null !== u &&
                  (0, r.jsx)("button", {
                    type: "button",
                    onClick: () => n(!1),
                    className:
                      "h-9 border-2 border-border-hard bg-bg-inset px-4 text-sm font-black text-text-secondary transition-colors hover:text-text-primary",
                    children: u,
                  }),
                (0, r.jsxs)("button", {
                  type: "button",
                  onClick: () => n(!0),
                  className:
                    "inline-flex h-9 items-center gap-1.5 border-2 border-border-hard bg-error px-4 text-sm font-black text-white shadow-block-sm transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-block",
                  children: [(0, r.jsx)(a.A, { size: 13 }), d],
                }),
              ],
            }),
          ],
        });
      }
      function m(e) {
        var t, n, s;
        let { children: a } = e,
          m = (0, o.useRef)(0),
          [b, h] = (0, o.useState)([]),
          p = b[0],
          f = (0, o.useCallback)(
            (e) =>
              new Promise((t) => {
                ((m.current += 1), h((n) => [...n, { id: m.current, options: e, resolve: t }]));
              }),
            [],
          ),
          S = (0, o.useCallback)(
            (e) => {
              p &&
                (p.resolve(e),
                h((e) => {
                  var t;
                  return (null == (t = e[0]) ? void 0 : t.id) === p.id ? e.slice(1) : e;
                }));
            },
            [p],
          ),
          v = null != (t = null == p ? void 0 : p.options.tone) ? t : "info",
          j = "info" === v ? l.A : i.A;
        return (0, r.jsxs)(d.Provider, {
          value: f,
          children: [
            a,
            p && "editor" === p.options.skin
              ? (0, r.jsx)(x, { request: p, onSettle: S }, p.id)
              : p
                ? (0, r.jsxs)(
                    c.a,
                    {
                      open: !0,
                      onClose: () => S(!1),
                      title: p.options.title,
                      subtitle: p.options.subtitle,
                      icon: (0, r.jsx)(j, { size: 20 }),
                      iconTone: v,
                      size: "md",
                      maskClosable: "danger" !== v,
                      closable: "danger" !== v,
                      footer: (0, r.jsxs)(r.Fragment, {
                        children: [
                          null !== p.options.cancelText &&
                            (0, r.jsx)(c.y, {
                              variant: "ghost",
                              onClick: () => S(!1),
                              children: null != (n = p.options.cancelText) ? n : "取消",
                            }),
                          (0, r.jsx)(c.y, {
                            variant:
                              "danger" === v ? "danger" : "warning" === v ? "warning" : "primary",
                            onClick: () => S(!0),
                            children: null != (s = p.options.confirmText) ? s : "确认",
                          }),
                        ],
                      }),
                      children: [
                        p.options.object && (0, r.jsx)(u, { object: p.options.object }),
                        p.options.body &&
                          (0, r.jsx)("div", {
                            className: "".concat(
                              p.options.object ? "mt-4" : "",
                              " text-sm font-bold leading-relaxed text-text-secondary",
                            ),
                            children: p.options.body,
                          }),
                      ],
                    },
                    p.id,
                  )
                : null,
          ],
        });
      }
      function b() {
        let e = (0, o.useContext)(d);
        if (!e) throw Error("useConfirm 必须在 ConfirmProvider 内使用");
        return e;
      }
    },
  },
]);

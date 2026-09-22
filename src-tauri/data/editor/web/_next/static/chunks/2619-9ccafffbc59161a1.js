"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2619],
  {
    17045: (e, t) => {
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "errorOnce", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }));
      let n = (e) => {};
    },
    52619: (e, t, n) => {
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var n in t) Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          default: function () {
            return b;
          },
          useLinkStatus: function () {
            return g;
          },
        }));
      let r = n(49417),
        u = n(95155),
        l = r._(n(12115)),
        o = n(47670),
        f = n(46752),
        a = n(83011),
        c = n(62296),
        i = n(96058);
      n(94781);
      let s = n(63499),
        p = n(58607),
        d = n(11807);
      n(17045);
      let y = n(66048);
      function h(e) {
        return "string" == typeof e ? e : (0, o.formatUrl)(e);
      }
      function b(e) {
        var t;
        let n,
          r,
          o,
          [b, g] = (0, l.useOptimistic)(s.IDLE_LINK_STATUS),
          v = (0, l.useRef)(null),
          {
            href: j,
            as: P,
            children: C,
            prefetch: M = null,
            passHref: T,
            replace: k,
            shallow: m,
            scroll: O,
            onClick: S,
            onMouseEnter: E,
            onTouchStart: x,
            legacyBehavior: L = !1,
            onNavigate: R,
            ref: A,
            unstable_dynamicOnHover: I,
            ...N
          } = e;
        ((n = C),
          L &&
            ("string" == typeof n || "number" == typeof n) &&
            (n = (0, u.jsx)("a", { children: n })));
        let K = l.default.useContext(f.AppRouterContext),
          U = !1 !== M,
          D =
            !1 !== M
              ? null === (t = M) || "auto" === t
                ? y.FetchStrategy.PPR
                : y.FetchStrategy.Full
              : y.FetchStrategy.PPR,
          { href: F, as: w } = l.default.useMemo(() => {
            let e = h(j);
            return { href: e, as: P ? h(P) : e };
          }, [j, P]);
        L && (r = l.default.Children.only(n));
        let B = L ? r && "object" == typeof r && r.ref : A,
          q = l.default.useCallback(
            (e) => (
              null !== K && (v.current = (0, s.mountLinkInstance)(e, F, K, D, U, g)),
              () => {
                (v.current &&
                  ((0, s.unmountLinkForCurrentNavigation)(v.current), (v.current = null)),
                  (0, s.unmountPrefetchableInstance)(e));
              }
            ),
            [U, F, K, D, g],
          ),
          z = {
            ref: (0, a.useMergedRef)(q, B),
            onClick(e) {
              (L || "function" != typeof S || S(e),
                L && r.props && "function" == typeof r.props.onClick && r.props.onClick(e),
                K &&
                  (e.defaultPrevented ||
                    (function (e, t, n, r, u, o, f) {
                      let { nodeName: a } = e.currentTarget;
                      if (!(
                        ("A" === a.toUpperCase() &&
                          (function (e) {
                            let t = e.currentTarget.getAttribute("target");
                            return (
                              (t && "_self" !== t) ||
                              e.metaKey ||
                              e.ctrlKey ||
                              e.shiftKey ||
                              e.altKey ||
                              (e.nativeEvent && 2 === e.nativeEvent.which)
                            );
                          })(e)) ||
                        e.currentTarget.hasAttribute("download")
                      )) {
                        if (!(0, p.isLocalURL)(t)) {
                          u && (e.preventDefault(), location.replace(t));
                          return;
                        }
                        if ((e.preventDefault(), f)) {
                          let e = !1;
                          if (
                            (f({
                              preventDefault: () => {
                                e = !0;
                              },
                            }),
                            e)
                          )
                            return;
                        }
                        l.default.startTransition(() => {
                          (0, d.dispatchNavigateAction)(
                            n || t,
                            u ? "replace" : "push",
                            null == o || o,
                            r.current,
                          );
                        });
                      }
                    })(e, F, w, v, k, O, R)));
            },
            onMouseEnter(e) {
              (L || "function" != typeof E || E(e),
                L &&
                  r.props &&
                  "function" == typeof r.props.onMouseEnter &&
                  r.props.onMouseEnter(e),
                K && U && (0, s.onNavigationIntent)(e.currentTarget, !0 === I));
            },
            onTouchStart: function (e) {
              (L || "function" != typeof x || x(e),
                L &&
                  r.props &&
                  "function" == typeof r.props.onTouchStart &&
                  r.props.onTouchStart(e),
                K && U && (0, s.onNavigationIntent)(e.currentTarget, !0 === I));
            },
          };
        return (
          (0, c.isAbsoluteUrl)(w)
            ? (z.href = w)
            : (L && !T && ("a" !== r.type || "href" in r.props)) ||
              (z.href = (0, i.addBasePath)(w)),
          (o = L ? l.default.cloneElement(r, z) : (0, u.jsx)("a", { ...N, ...z, children: n })),
          (0, u.jsx)(_.Provider, { value: b, children: o })
        );
      }
      let _ = (0, l.createContext)(s.IDLE_LINK_STATUS),
        g = () => (0, l.useContext)(_);
      ("function" == typeof t.default || ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    83011: (e, t, n) => {
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "useMergedRef", {
          enumerable: !0,
          get: function () {
            return u;
          },
        }));
      let r = n(12115);
      function u(e, t) {
        let n = (0, r.useRef)(null),
          u = (0, r.useRef)(null);
        return (0, r.useCallback)(
          (r) => {
            if (null === r) {
              let e = n.current;
              e && ((n.current = null), e());
              let t = u.current;
              t && ((u.current = null), t());
            } else (e && (n.current = l(e, r)), t && (u.current = l(t, r)));
          },
          [e, t],
        );
      }
      function l(e, t) {
        if ("function" != typeof e)
          return (
            (e.current = t),
            () => {
              e.current = null;
            }
          );
        {
          let n = e(t);
          return "function" == typeof n ? n : () => e(null);
        }
      }
      ("function" == typeof t.default || ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
  },
]);

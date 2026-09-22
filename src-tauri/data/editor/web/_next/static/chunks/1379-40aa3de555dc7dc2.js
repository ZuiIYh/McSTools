"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1379],
  {
    1975: (e, t) => {
      ((t.ConcurrentRoot = 1),
        (t.ContinuousEventPriority = 8),
        (t.DefaultEventPriority = 32),
        (t.DiscreteEventPriority = 2));
    },
    3362: (e, t, n) => {
      n.d(t, { Q: () => o });
      var r = Object.defineProperty;
      class o {
        constructor() {
          ((e, t, n) =>
            ((e, t, n) =>
              t in e
                ? r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
                : (e[t] = n))(e, "symbol" != typeof t ? t + "" : t, n))(this, "_listeners");
        }
        addEventListener(e, t) {
          void 0 === this._listeners && (this._listeners = {});
          let n = this._listeners;
          (void 0 === n[e] && (n[e] = []), -1 === n[e].indexOf(t) && n[e].push(t));
        }
        hasEventListener(e, t) {
          if (void 0 === this._listeners) return !1;
          let n = this._listeners;
          return void 0 !== n[e] && -1 !== n[e].indexOf(t);
        }
        removeEventListener(e, t) {
          if (void 0 === this._listeners) return;
          let n = this._listeners[e];
          if (void 0 !== n) {
            let e = n.indexOf(t);
            -1 !== e && n.splice(e, 1);
          }
        }
        dispatchEvent(e) {
          if (void 0 === this._listeners) return;
          let t = this._listeners[e.type];
          if (void 0 !== t) {
            e.target = this;
            let n = t.slice(0);
            for (let t = 0, r = n.length; t < r; t++) n[t].call(this, e);
            e.target = null;
          }
        }
      }
    },
    8828: (e, t, n) => {
      e.exports = n(83654);
    },
    14806: (e, t, n) => {
      e.exports = n(30125);
    },
    18807: (e, t, n) => {
      e.exports = n(77719);
    },
    23689: (e, t, n) => {
      n.d(t, { DY: () => a, IU: () => s, uv: () => l });
      let r = [];
      function o(e, t, n = (e, t) => e === t) {
        if (e === t) return !0;
        if (!e || !t) return !1;
        let r = e.length;
        if (t.length !== r) return !1;
        for (let o = 0; o < r; o++) if (!n(e[o], t[o])) return !1;
        return !0;
      }
      function i(e, t = null, n = !1, a = {}) {
        for (let i of (null === t && (t = [e]), r))
          if (o(t, i.keys, i.equal)) {
            if (n) return;
            if (Object.prototype.hasOwnProperty.call(i, "error")) throw i.error;
            if (Object.prototype.hasOwnProperty.call(i, "response"))
              return (
                a.lifespan &&
                  a.lifespan > 0 &&
                  (i.timeout && clearTimeout(i.timeout),
                  (i.timeout = setTimeout(i.remove, a.lifespan))),
                i.response
              );
            if (!n) throw i.promise;
          }
        let l = {
          keys: t,
          equal: a.equal,
          remove: () => {
            let e = r.indexOf(l);
            -1 !== e && r.splice(e, 1);
          },
          promise: ("object" == typeof e && "function" == typeof e.then ? e : e(...t))
            .then((e) => {
              ((l.response = e),
                a.lifespan && a.lifespan > 0 && (l.timeout = setTimeout(l.remove, a.lifespan)));
            })
            .catch((e) => (l.error = e)),
        };
        if ((r.push(l), !n)) throw l.promise;
      }
      let a = (e, t, n) => i(e, t, !1, n),
        l = (e, t, n) => void i(e, t, !0, n),
        s = (e) => {
          if (void 0 === e || 0 === e.length) r.splice(0, r.length);
          else {
            let t = r.find((t) => o(e, t.keys, t.equal));
            t && t.remove();
          }
        };
    },
    28870: (e, t, n) => {
      e.exports = n(1975);
    },
    30125: (e, t, n) => {
      var r = n(12115),
        o =
          "function" == typeof Object.is
            ? Object.is
            : function (e, t) {
                return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
              },
        i = r.useState,
        a = r.useEffect,
        l = r.useLayoutEffect,
        s = r.useDebugValue;
      function c(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
          var n = t();
          return !o(e, n);
        } catch (e) {
          return !0;
        }
      }
      var u =
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
          ? function (e, t) {
              return t();
            }
          : function (e, t) {
              var n = t(),
                r = i({ inst: { value: n, getSnapshot: t } }),
                o = r[0].inst,
                u = r[1];
              return (
                l(
                  function () {
                    ((o.value = n), (o.getSnapshot = t), c(o) && u({ inst: o }));
                  },
                  [e, n, t],
                ),
                a(
                  function () {
                    return (
                      c(o) && u({ inst: o }),
                      e(function () {
                        c(o) && u({ inst: o });
                      })
                    );
                  },
                  [e],
                ),
                s(n),
                n
              );
            };
      t.useSyncExternalStore = void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : u;
    },
    30258: (e, t, n) => {
      n.d(t, { Hl: () => p });
      var r = n(59040),
        o = n(12115),
        i = n(87548);
      function a(e, t) {
        let n;
        return (...r) => {
          (window.clearTimeout(n), (n = window.setTimeout(() => e(...r), t)));
        };
      }
      let l = ["x", "y", "top", "bottom", "left", "right", "width", "height"];
      var s = n(54735),
        c = n(95155);
      function u({
        ref: e,
        children: t,
        fallback: n,
        resize: s,
        style: u,
        gl: p,
        events: d = r.f,
        eventSource: f,
        eventPrefix: h,
        shadows: m,
        linear: v,
        flat: b,
        legacy: g,
        orthographic: y,
        frameloop: w,
        dpr: j,
        performance: E,
        raycaster: P,
        camera: C,
        scene: O,
        onPointerMissed: x,
        onCreated: M,
        ...T
      }) {
        o.useMemo(() => (0, r.e)(i), []);
        let S = (0, r.u)(),
          [k, A] = (function (
            { debounce: e, scroll: t, polyfill: n, offsetSize: r } = {
              debounce: 0,
              scroll: !1,
              offsetSize: !1,
            },
          ) {
            var i, s, c;
            let u = n || ("undefined" == typeof window ? class {} : window.ResizeObserver);
            if (!u)
              throw Error(
                "This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills",
              );
            let [p, d] = (0, o.useState)({
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                bottom: 0,
                right: 0,
                x: 0,
                y: 0,
              }),
              f = (0, o.useRef)({
                element: null,
                scrollContainers: null,
                resizeObserver: null,
                lastBounds: p,
                orientationHandler: null,
              }),
              h = e ? ("number" == typeof e ? e : e.scroll) : null,
              m = e ? ("number" == typeof e ? e : e.resize) : null,
              v = (0, o.useRef)(!1);
            (0, o.useEffect)(() => ((v.current = !0), () => void (v.current = !1)));
            let [b, g, y] = (0, o.useMemo)(() => {
              let e = () => {
                let e, t;
                if (!f.current.element) return;
                let {
                    left: n,
                    top: o,
                    width: i,
                    height: a,
                    bottom: s,
                    right: c,
                    x: u,
                    y: p,
                  } = f.current.element.getBoundingClientRect(),
                  h = { left: n, top: o, width: i, height: a, bottom: s, right: c, x: u, y: p };
                (f.current.element instanceof HTMLElement &&
                  r &&
                  ((h.height = f.current.element.offsetHeight),
                  (h.width = f.current.element.offsetWidth)),
                  Object.freeze(h),
                  v.current &&
                    ((e = f.current.lastBounds), (t = h), !l.every((n) => e[n] === t[n])) &&
                    d((f.current.lastBounds = h)));
              };
              return [e, m ? a(e, m) : e, h ? a(e, h) : e];
            }, [d, r, h, m]);
            function w() {
              (f.current.scrollContainers &&
                (f.current.scrollContainers.forEach((e) => e.removeEventListener("scroll", y, !0)),
                (f.current.scrollContainers = null)),
                f.current.resizeObserver &&
                  (f.current.resizeObserver.disconnect(), (f.current.resizeObserver = null)),
                f.current.orientationHandler &&
                  ("orientation" in screen && "removeEventListener" in screen.orientation
                    ? screen.orientation.removeEventListener("change", f.current.orientationHandler)
                    : "onorientationchange" in window &&
                      window.removeEventListener(
                        "orientationchange",
                        f.current.orientationHandler,
                      )));
            }
            function j() {
              f.current.element &&
                ((f.current.resizeObserver = new u(y)),
                f.current.resizeObserver.observe(f.current.element),
                t &&
                  f.current.scrollContainers &&
                  f.current.scrollContainers.forEach((e) =>
                    e.addEventListener("scroll", y, { capture: !0, passive: !0 }),
                  ),
                (f.current.orientationHandler = () => {
                  y();
                }),
                "orientation" in screen && "addEventListener" in screen.orientation
                  ? screen.orientation.addEventListener("change", f.current.orientationHandler)
                  : "onorientationchange" in window &&
                    window.addEventListener("orientationchange", f.current.orientationHandler));
            }
            return (
              (i = y),
              (s = !!t),
              (0, o.useEffect)(() => {
                if (s)
                  return (
                    window.addEventListener("scroll", i, { capture: !0, passive: !0 }),
                    () => void window.removeEventListener("scroll", i, !0)
                  );
              }, [i, s]),
              (c = g),
              (0, o.useEffect)(
                () => (
                  window.addEventListener("resize", c),
                  () => void window.removeEventListener("resize", c)
                ),
                [c],
              ),
              (0, o.useEffect)(() => {
                (w(), j());
              }, [t, y, g]),
              (0, o.useEffect)(() => w, []),
              [
                (e) => {
                  e &&
                    e !== f.current.element &&
                    (w(),
                    (f.current.element = e),
                    (f.current.scrollContainers = (function e(t) {
                      let n = [];
                      if (!t || t === document.body) return n;
                      let { overflow: r, overflowX: o, overflowY: i } = window.getComputedStyle(t);
                      return (
                        [r, o, i].some((e) => "auto" === e || "scroll" === e) && n.push(t),
                        [...n, ...e(t.parentElement)]
                      );
                    })(e)),
                    j());
                },
                p,
                b,
              ]
            );
          })({ scroll: !0, debounce: { scroll: 50, resize: 0 }, ...s }),
          _ = o.useRef(null),
          I = o.useRef(null);
        o.useImperativeHandle(e, () => _.current);
        let L = (0, r.a)(x),
          [R, z] = o.useState(!1),
          [D, N] = o.useState(!1);
        if (R) throw R;
        if (D) throw D;
        let H = o.useRef(null);
        ((0, r.b)(() => {
          let e = _.current;
          A.width > 0 &&
            A.height > 0 &&
            e &&
            (H.current || (H.current = (0, r.c)(e)),
            (async function () {
              (await H.current.configure({
                gl: p,
                scene: O,
                events: d,
                shadows: m,
                linear: v,
                flat: b,
                legacy: g,
                orthographic: y,
                frameloop: w,
                dpr: j,
                performance: E,
                raycaster: P,
                camera: C,
                size: A,
                onPointerMissed: (...e) => (null == L.current ? void 0 : L.current(...e)),
                onCreated: (e) => {
                  (null == e.events.connect ||
                    e.events.connect(f ? ((0, r.i)(f) ? f.current : f) : I.current),
                    h &&
                      e.setEvents({
                        compute: (e, t) => {
                          let n = e[h + "X"],
                            r = e[h + "Y"];
                          (t.pointer.set(
                            (n / t.size.width) * 2 - 1,
                            -(2 * (r / t.size.height)) + 1,
                          ),
                            t.raycaster.setFromCamera(t.pointer, t.camera));
                        },
                      }),
                    null == M || M(e));
                },
              }),
                H.current.render(
                  (0, c.jsx)(S, {
                    children: (0, c.jsx)(r.E, {
                      set: N,
                      children: (0, c.jsx)(o.Suspense, {
                        fallback: (0, c.jsx)(r.B, { set: z }),
                        children: null != t ? t : null,
                      }),
                    }),
                  }),
                ));
            })());
        }),
          o.useEffect(() => {
            let e = _.current;
            if (e) return () => (0, r.d)(e);
          }, []));
        let Y = f ? "none" : "auto";
        return (0, c.jsx)("div", {
          ref: I,
          style: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: Y,
            ...u,
          },
          ...T,
          children: (0, c.jsx)("div", {
            ref: k,
            style: { width: "100%", height: "100%" },
            children: (0, c.jsx)("canvas", { ref: _, style: { display: "block" }, children: n }),
          }),
        });
      }
      function p(e) {
        return (0, c.jsx)(s.Af, { children: (0, c.jsx)(u, { ...e }) });
      }
      (n(28870), n(18807), n(49914));
    },
    49914: (e, t, n) => {
      e.exports = n(66451);
    },
    54735: (e, t, n) => {
      n.d(t, { Af: () => l, Nz: () => o, u5: () => s, y3: () => p });
      var r = n(12115);
      function o(e, t, n) {
        if (!e) return;
        if (!0 === n(e)) return e;
        let r = t ? e.return : e.child;
        for (; r;) {
          let e = o(r, t, n);
          if (e) return e;
          r = t ? null : r.sibling;
        }
      }
      function i(e) {
        try {
          return Object.defineProperties(e, {
            _currentRenderer: { get: () => null, set() {} },
            _currentRenderer2: { get: () => null, set() {} },
          });
        } catch (t) {
          return e;
        }
      }
      (() => {
        var e, t;
        return (
          "undefined" != typeof window &&
          ((null == (e = window.document) ? void 0 : e.createElement) ||
            (null == (t = window.navigator) ? void 0 : t.product) === "ReactNative")
        );
      })()
        ? r.useLayoutEffect
        : r.useEffect;
      let a = i(r.createContext(null));
      class l extends r.Component {
        render() {
          return r.createElement(a.Provider, { value: this._reactInternals }, this.props.children);
        }
      }
      function s() {
        let e = r.useContext(a);
        if (null === e)
          throw Error("its-fine: useFiber must be called within a <FiberProvider />!");
        let t = r.useId();
        return r.useMemo(() => {
          for (let n of [e, null == e ? void 0 : e.alternate]) {
            if (!n) continue;
            let e = o(n, !1, (e) => {
              let n = e.memoizedState;
              for (; n;) {
                if (n.memoizedState === t) return !0;
                n = n.next;
              }
            });
            if (e) return e;
          }
        }, [e, t]);
      }
      let c = Symbol.for("react.context"),
        u = (e) => null !== e && "object" == typeof e && "$$typeof" in e && e.$$typeof === c;
      function p() {
        let e = (function () {
          let e = s(),
            [t] = r.useState(() => new Map());
          t.clear();
          let n = e;
          for (; n;) {
            let e = n.type;
            (u(e) && e !== a && !t.has(e) && t.set(e, r.use(i(e))), (n = n.return));
          }
          return t;
        })();
        return r.useMemo(
          () =>
            Array.from(e.keys()).reduce(
              (t, n) => (o) =>
                r.createElement(t, null, r.createElement(n.Provider, { ...o, value: e.get(n) })),
              (e) => r.createElement(l, { ...e }),
            ),
          [e],
        );
      }
    },
    59040: (e, t, n) => {
      let r, o, i, a, l;
      n.d(t, {
        B: () => S,
        C: () => Q,
        D: () => J,
        E: () => k,
        a: () => M,
        b: () => x,
        c: () => eE,
        d: () => eC,
        e: () => el,
        f: () => eD,
        i: () => C,
        u: () => T,
      });
      var s = n(12115),
        c = n.t(s, 2),
        u = n(28870),
        p = n(85339),
        d = n(87548),
        f = n(8828),
        h = n(90490);
      let { useSyncExternalStoreWithSelector: m } = f,
        v = (e, t) => {
          let n = (0, h.y)(e),
            r = (e, r = t) =>
              (function (e, t = (e) => e, n) {
                let r = m(e.subscribe, e.getState, e.getInitialState, t, n);
                return (s.useDebugValue(r), r);
              })(n, e, r);
          return (Object.assign(r, n), r);
        };
      var b = n(23689),
        g = n(18807),
        y = n.n(g),
        w = n(49914),
        j = n(95155),
        E = n(54735);
      function P(e) {
        let t = e.root;
        for (; t.getState().previousRoot;) t = t.getState().previousRoot;
        return t;
      }
      c.act;
      let C = (e) => e && e.hasOwnProperty("current"),
        O = (e) => null != e && ("string" == typeof e || "number" == typeof e || e.isColor),
        x = ((e, t) =>
          "undefined" != typeof window &&
          ((null == (e = window.document) ? void 0 : e.createElement) ||
            (null == (t = window.navigator) ? void 0 : t.product) === "ReactNative"))()
          ? s.useLayoutEffect
          : s.useEffect;
      function M(e) {
        let t = s.useRef(e);
        return (x(() => void (t.current = e), [e]), t);
      }
      function T() {
        let e = (0, E.u5)(),
          t = (0, E.y3)();
        return s.useMemo(
          () =>
            ({ children: n }) => {
              let r = (0, E.Nz)(e, !0, (e) => e.type === s.StrictMode) ? s.StrictMode : s.Fragment;
              return (0, j.jsx)(r, { children: (0, j.jsx)(t, { children: n }) });
            },
          [e, t],
        );
      }
      function S({ set: e }) {
        return (x(() => (e(new Promise(() => null)), () => e(!1)), [e]), null);
      }
      let k = ((e) => (
        ((e = class extends s.Component {
          constructor(...e) {
            (super(...e), (this.state = { error: !1 }));
          }
          componentDidCatch(e) {
            this.props.set(e);
          }
          render() {
            return this.state.error ? null : this.props.children;
          }
        }).getDerivedStateFromError = () => ({ error: !0 })),
        e
      ))();
      function A(e) {
        var t;
        let n = "undefined" != typeof window ? (null != (t = window.devicePixelRatio) ? t : 2) : 1;
        return Array.isArray(e) ? Math.min(Math.max(e[0], n), e[1]) : e;
      }
      function _(e) {
        var t;
        return null == (t = e.__r3f) ? void 0 : t.root.getState();
      }
      let I = {
          obj: (e) => e === Object(e) && !I.arr(e) && "function" != typeof e,
          fun: (e) => "function" == typeof e,
          str: (e) => "string" == typeof e,
          num: (e) => "number" == typeof e,
          boo: (e) => "boolean" == typeof e,
          und: (e) => void 0 === e,
          nul: (e) => null === e,
          arr: (e) => Array.isArray(e),
          equ(e, t, { arrays: n = "shallow", objects: r = "reference", strict: o = !0 } = {}) {
            let i;
            if (typeof e != typeof t || !!e != !!t) return !1;
            if (I.str(e) || I.num(e) || I.boo(e)) return e === t;
            let a = I.obj(e);
            if (a && "reference" === r) return e === t;
            let l = I.arr(e);
            if (l && "reference" === n) return e === t;
            if ((l || a) && e === t) return !0;
            for (i in e) if (!(i in t)) return !1;
            if (a && "shallow" === n && "shallow" === r) {
              for (i in o ? t : e)
                if (!I.equ(e[i], t[i], { strict: o, objects: "reference" })) return !1;
            } else for (i in o ? t : e) if (e[i] !== t[i]) return !1;
            if (I.und(i)) {
              if (
                (l && 0 === e.length && 0 === t.length) ||
                (a && 0 === Object.keys(e).length && 0 === Object.keys(t).length)
              )
                return !0;
              if (e !== t) return !1;
            }
            return !0;
          },
        },
        L = ["children", "key", "ref"];
      function R(e, t, n, r) {
        let o = null == e ? void 0 : e.__r3f;
        return (
          !o &&
            ((o = {
              root: t,
              type: n,
              parent: null,
              children: [],
              props: (function (e) {
                let t = {};
                for (let n in e) L.includes(n) || (t[n] = e[n]);
                return t;
              })(r),
              object: e,
              eventCount: 0,
              handlers: {},
              isHidden: !1,
            }),
            e && (e.__r3f = o)),
          o
        );
      }
      function z(e, t) {
        if (!t.includes("-") || t in e) return { root: e, key: t, target: e[t] };
        let n = e,
          r = t.split("-");
        for (let o of r) {
          if ("object" != typeof n || null === n) {
            if (void 0 !== n)
              return { root: n, key: r.slice(r.indexOf(o)).join("-"), target: void 0 };
            return { root: e, key: t, target: void 0 };
          }
          ((t = o), (e = n), (n = n[t]));
        }
        return { root: e, key: t, target: n };
      }
      let D = /-\d+$/;
      function N(e, t) {
        if (I.str(t.props.attach)) {
          if (D.test(t.props.attach)) {
            let n = t.props.attach.replace(D, ""),
              { root: r, key: o } = z(e.object, n);
            Array.isArray(r[o]) || (r[o] = []);
          }
          let { root: n, key: r } = z(e.object, t.props.attach);
          ((t.previousAttach = n[r]), (n[r] = t.object));
        } else I.fun(t.props.attach) && (t.previousAttach = t.props.attach(e.object, t.object));
      }
      function H(e, t) {
        if (I.str(t.props.attach)) {
          let { root: n, key: r } = z(e.object, t.props.attach),
            o = t.previousAttach;
          void 0 === o ? delete n[r] : (n[r] = o);
        } else null == t.previousAttach || t.previousAttach(e.object, t.object);
        delete t.previousAttach;
      }
      let Y = [...L, "args", "dispose", "attach", "object", "onUpdate", "dispose"],
        F = new Map(),
        q = ["map", "emissiveMap", "sheenColorMap", "specularColorMap", "envMap"],
        U = /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;
      function V(e, t) {
        var n, r;
        let o = e.__r3f,
          i = o && P(o).getState(),
          a = null == o ? void 0 : o.eventCount;
        for (let n in t) {
          let a = t[n];
          if (Y.includes(n)) continue;
          if (o && U.test(n)) {
            ("function" == typeof a ? (o.handlers[n] = a) : delete o.handlers[n],
              (o.eventCount = Object.keys(o.handlers).length));
            continue;
          }
          if (void 0 === a) continue;
          let { root: l, key: s, target: c } = z(e, n);
          if (void 0 === c && ("object" != typeof l || null === l))
            throw Error(`R3F: Cannot set "${n}". Ensure it is an object before setting "${s}".`);
          c instanceof p.zgK && a instanceof p.zgK
            ? (c.mask = a.mask)
            : c instanceof p.Q1f && O(a)
              ? c.set(a)
              : null !== c &&
                  "object" == typeof c &&
                  "function" == typeof c.set &&
                  "function" == typeof c.copy &&
                  null != a &&
                  a.constructor &&
                  c.constructor === a.constructor
                ? c.copy(a)
                : null !== c &&
                    "object" == typeof c &&
                    "function" == typeof c.set &&
                    Array.isArray(a)
                  ? "function" == typeof c.fromArray
                    ? c.fromArray(a)
                    : c.set(...a)
                  : null !== c &&
                      "object" == typeof c &&
                      "function" == typeof c.set &&
                      "number" == typeof a
                    ? "function" == typeof c.setScalar
                      ? c.setScalar(a)
                      : c.set(a)
                    : ((l[s] = a),
                      i &&
                        !i.linear &&
                        q.includes(s) &&
                        null != (r = l[s]) &&
                        r.isTexture &&
                        l[s].format === p.GWd &&
                        l[s].type === p.OUM &&
                        (l[s].colorSpace = p.er$));
        }
        if (
          null != o &&
          o.parent &&
          null != i &&
          i.internal &&
          null != (n = o.object) &&
          n.isObject3D &&
          a !== o.eventCount
        ) {
          let e = o.object,
            t = i.internal.interaction.indexOf(e);
          (t > -1 && i.internal.interaction.splice(t, 1),
            o.eventCount && null !== e.raycast && i.internal.interaction.push(e));
        }
        return (
          o &&
            void 0 === o.props.attach &&
            (o.object.isBufferGeometry
              ? (o.props.attach = "geometry")
              : o.object.isMaterial && (o.props.attach = "material")),
          o && B(o),
          e
        );
      }
      function B(e) {
        var t;
        if (!e.parent) return;
        null == e.props.onUpdate || e.props.onUpdate(e.object);
        let n = null == (t = e.root) || null == t.getState ? void 0 : t.getState();
        n && 0 === n.internal.frames && n.invalidate();
      }
      let X = (e) => (null == e ? void 0 : e.isObject3D);
      function Z(e) {
        return (e.eventObject || e.object).uuid + "/" + e.index + e.instanceId;
      }
      function W(e, t, n, r) {
        let o = n.get(t);
        o && (n.delete(t), 0 === n.size && (e.delete(r), o.target.releasePointerCapture(r)));
      }
      let K = (e) => !!(null != e && e.render),
        $ = s.createContext(null);
      function G() {
        let e = s.useContext($);
        if (!e) throw Error("R3F: Hooks can only be used within the Canvas component!");
        return e;
      }
      function Q(e = (e) => e, t) {
        return G()(e, t);
      }
      function J(e, t = 0) {
        let n = G(),
          r = n.getState().internal.subscribe,
          o = M(e);
        return (x(() => r(o, t, n), [t, r, n]), null);
      }
      let ee = new WeakMap();
      function et(e, t) {
        return function (n, ...r) {
          var o;
          let i;
          return (
            "function" == typeof n &&
            (null == n || null == (o = n.prototype) ? void 0 : o.constructor) === n
              ? (i = ee.get(n)) || ((i = new n()), ee.set(n, i))
              : (i = n),
            e && e(i),
            Promise.all(
              r.map(
                (e) =>
                  new Promise((n, r) =>
                    i.load(
                      e,
                      (e) => {
                        (X(null == e ? void 0 : e.scene) &&
                          Object.assign(
                            e,
                            (function (e) {
                              let t = { nodes: {}, materials: {}, meshes: {} };
                              return (
                                e &&
                                  e.traverse((e) => {
                                    (e.name && (t.nodes[e.name] = e),
                                      e.material &&
                                        !t.materials[e.material.name] &&
                                        (t.materials[e.material.name] = e.material),
                                      e.isMesh && !t.meshes[e.name] && (t.meshes[e.name] = e));
                                  }),
                                t
                              );
                            })(e.scene),
                          ),
                          n(e));
                      },
                      t,
                      (t) => r(Error(`Could not load ${e}: ${null == t ? void 0 : t.message}`)),
                    ),
                  ),
              ),
            )
          );
        };
      }
      function en(e, t, n, r) {
        let o = Array.isArray(t) ? t : [t],
          i = (0, b.DY)(et(n, r), [e, ...o], { equal: I.equ });
        return Array.isArray(t) ? i : i[0];
      }
      ((en.preload = function (e, t, n) {
        let r = Array.isArray(t) ? t : [t];
        return (0, b.uv)(et(n), [e, ...r]);
      }),
        (en.clear = function (e, t) {
          let n = Array.isArray(t) ? t : [t];
          return (0, b.IU)([e, ...n]);
        }));
      let er = {},
        eo = /^three(?=[A-Z])/,
        ei = (e) => `${e[0].toUpperCase()}${e.slice(1)}`,
        ea = 0;
      function el(e) {
        if ("function" == typeof e) {
          let t = `${ea++}`;
          return ((er[t] = e), t);
        }
        Object.assign(er, e);
      }
      function es(e, t) {
        let n = ei(e),
          r = er[n];
        if ("primitive" !== e && !r)
          throw Error(
            `R3F: ${n} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`,
          );
        if ("primitive" === e && !t.object)
          throw Error("R3F: Primitives without 'object' are invalid!");
        if (void 0 !== t.args && !Array.isArray(t.args))
          throw Error("R3F: The args prop must be an array!");
      }
      function ec(e) {
        if (e.isHidden) {
          var t;
          (e.props.attach && null != (t = e.parent) && t.object
            ? N(e.parent, e)
            : X(e.object) && !1 !== e.props.visible && (e.object.visible = !0),
            (e.isHidden = !1),
            B(e));
        }
      }
      function eu(e, t, n) {
        let r = t.root.getState();
        if (e.parent || e.object === r.scene) {
          if (!t.object) {
            var o, i;
            let e = er[ei(t.type)];
            ((t.object =
              null != (o = t.props.object) ? o : new e(...(null != (i = t.props.args) ? i : []))),
              (t.object.__r3f = t));
          }
          if ((V(t.object, t.props), t.props.attach)) N(e, t);
          else if (X(t.object) && X(e.object)) {
            let r = e.object.children.indexOf(null == n ? void 0 : n.object);
            if (n && -1 !== r) {
              let n = e.object.children.indexOf(t.object);
              -1 !== n
                ? (e.object.children.splice(n, 1),
                  e.object.children.splice(n < r ? r - 1 : r, 0, t.object))
                : ((t.object.parent = e.object),
                  e.object.children.splice(r, 0, t.object),
                  t.object.dispatchEvent({ type: "added" }),
                  e.object.dispatchEvent({ type: "childadded", child: t.object }));
            } else e.object.add(t.object);
          }
          for (let e of t.children) eu(t, e);
          B(t);
        }
      }
      function ep(e, t) {
        t && ((t.parent = e), e.children.push(t), eu(e, t));
      }
      function ed(e, t, n) {
        if (!t || !n) return;
        t.parent = e;
        let r = e.children.indexOf(n);
        (-1 !== r ? e.children.splice(r, 0, t) : e.children.push(t), eu(e, t, n));
      }
      function ef(e) {
        if ("function" == typeof e.dispose) {
          let t = () => {
            try {
              e.dispose();
            } catch {}
          };
          "undefined" != typeof IS_REACT_ACT_ENVIRONMENT
            ? t()
            : (0, w.unstable_scheduleCallback)(w.unstable_IdlePriority, t);
        }
      }
      function eh(e, t, n) {
        if (!t) return;
        t.parent = null;
        let r = e.children.indexOf(t);
        (-1 !== r && e.children.splice(r, 1),
          t.props.attach
            ? H(e, t)
            : X(t.object) &&
              X(e.object) &&
              (e.object.remove(t.object),
              (function (e, t) {
                let { internal: n } = e.getState();
                ((n.interaction = n.interaction.filter((e) => e !== t)),
                  (n.initialHits = n.initialHits.filter((e) => e !== t)),
                  n.hovered.forEach((e, r) => {
                    (e.eventObject === t || e.object === t) && n.hovered.delete(r);
                  }),
                  n.capturedMap.forEach((e, r) => {
                    W(n.capturedMap, t, e, r);
                  }));
              })(P(t), t.object)));
        let o = null !== t.props.dispose && !1 !== n;
        for (let e = t.children.length - 1; e >= 0; e--) {
          let n = t.children[e];
          eh(t, n, o);
        }
        ((t.children.length = 0),
          delete t.object.__r3f,
          o && "primitive" !== t.type && "Scene" !== t.object.type && ef(t.object),
          void 0 === n && B(t));
      }
      let em = [],
        ev = () => {},
        eb = {},
        eg = 0,
        ey = (function (e) {
          let t = y()(e);
          return (t.injectIntoDevTools(), t);
        })({
          isPrimaryRenderer: !1,
          warnsIfNotActing: !1,
          supportsMutation: !0,
          supportsPersistence: !1,
          supportsHydration: !1,
          createInstance: function (e, t, n) {
            var r;
            return (
              es((e = ei(e) in er ? e : e.replace(eo, "")), t),
              "primitive" === e && null != (r = t.object) && r.__r3f && delete t.object.__r3f,
              R(t.object, n, e, t)
            );
          },
          removeChild: eh,
          appendChild: ep,
          appendInitialChild: ep,
          insertBefore: ed,
          appendChildToContainer(e, t) {
            let n = e.getState().scene.__r3f;
            t && n && ep(n, t);
          },
          removeChildFromContainer(e, t) {
            let n = e.getState().scene.__r3f;
            t && n && eh(n, t);
          },
          insertInContainerBefore(e, t, n) {
            let r = e.getState().scene.__r3f;
            t && n && r && ed(r, t, n);
          },
          getRootHostContext: () => eb,
          getChildHostContext: () => eb,
          commitUpdate(e, t, n, r, o) {
            var i, a, l;
            es(t, r);
            let s = !1;
            if (
              (("primitive" === e.type && n.object !== r.object) ||
              (null == (i = r.args) ? void 0 : i.length) !==
                (null == (a = n.args) ? void 0 : a.length)
                ? (s = !0)
                : null != (l = r.args) &&
                  l.some((e, t) => {
                    var r;
                    return e !== (null == (r = n.args) ? void 0 : r[t]);
                  }) &&
                  (s = !0),
              s)
            )
              em.push([e, { ...r }, o]);
            else {
              let t = (function (e, t) {
                let n = {};
                for (let r in t)
                  if (!Y.includes(r) && !I.equ(t[r], e.props[r]))
                    for (let e in ((n[r] = t[r]), t)) e.startsWith(`${r}-`) && (n[e] = t[e]);
                for (let r in e.props) {
                  if (Y.includes(r) || t.hasOwnProperty(r)) continue;
                  let { root: o, key: i } = z(e.object, r);
                  if (o.constructor && 0 === o.constructor.length) {
                    let e = (function (e) {
                      let t = F.get(e.constructor);
                      try {
                        t || ((t = new e.constructor()), F.set(e.constructor, t));
                      } catch (e) {}
                      return t;
                    })(o);
                    I.und(e) || (n[i] = e[i]);
                  } else n[i] = 0;
                }
                return n;
              })(e, r);
              Object.keys(t).length && (Object.assign(e.props, t), V(e.object, t));
            }
            (null === o.sibling || (4 & o.flags) == 0) &&
              (function () {
                for (let [e] of em) {
                  let t = e.parent;
                  if (t)
                    for (let n of (e.props.attach
                      ? H(t, e)
                      : X(e.object) && X(t.object) && t.object.remove(e.object),
                    e.children))
                      n.props.attach
                        ? H(e, n)
                        : X(n.object) && X(e.object) && e.object.remove(n.object);
                  (e.isHidden && ec(e),
                    e.object.__r3f && delete e.object.__r3f,
                    "primitive" !== e.type && ef(e.object));
                }
                for (let [r, o, i] of em) {
                  r.props = o;
                  let a = r.parent;
                  if (a) {
                    let o = er[ei(r.type)];
                    ((r.object =
                      null != (e = r.props.object)
                        ? e
                        : new o(...(null != (t = r.props.args) ? t : []))),
                      (r.object.__r3f = r));
                    var e,
                      t,
                      n = r.object;
                    for (let e of [i, i.alternate])
                      if (null !== e)
                        if ("function" == typeof e.ref) {
                          null == e.refCleanup || e.refCleanup();
                          let t = e.ref(n);
                          "function" == typeof t && (e.refCleanup = t);
                        } else e.ref && (e.ref.current = n);
                    for (let e of (V(r.object, r.props),
                    r.props.attach ? N(a, r) : X(r.object) && X(a.object) && a.object.add(r.object),
                    r.children))
                      e.props.attach
                        ? N(r, e)
                        : X(e.object) && X(r.object) && r.object.add(e.object);
                    B(r);
                  }
                }
                em.length = 0;
              })();
          },
          finalizeInitialChildren: () => !1,
          commitMount() {},
          getPublicInstance: (e) => (null == e ? void 0 : e.object),
          prepareForCommit: () => null,
          preparePortalMount: (e) => R(e.getState().scene, e, "", {}),
          resetAfterCommit: () => {},
          shouldSetTextContent: () => !1,
          clearContainer: () => !1,
          hideInstance: function (e) {
            if (!e.isHidden) {
              var t;
              (e.props.attach && null != (t = e.parent) && t.object
                ? H(e.parent, e)
                : X(e.object) && (e.object.visible = !1),
                (e.isHidden = !0),
                B(e));
            }
          },
          unhideInstance: ec,
          createTextInstance: ev,
          hideTextInstance: ev,
          unhideTextInstance: ev,
          scheduleTimeout: "function" == typeof setTimeout ? setTimeout : void 0,
          cancelTimeout: "function" == typeof clearTimeout ? clearTimeout : void 0,
          noTimeout: -1,
          getInstanceFromNode: () => null,
          beforeActiveInstanceBlur() {},
          afterActiveInstanceBlur() {},
          detachDeletedInstance() {},
          prepareScopeUpdate() {},
          getInstanceFromScope: () => null,
          shouldAttemptEagerTransition: () => !1,
          trackSchedulerEvent: () => {},
          resolveEventType: () => null,
          resolveEventTimeStamp: () => -1.1,
          requestPostPaintCallback() {},
          maySuspendCommit: () => !1,
          preloadInstance: () => !0,
          startSuspendingCommit() {},
          suspendInstance() {},
          waitForCommitToBeReady: () => null,
          NotPendingTransition: null,
          HostTransitionContext: s.createContext(null),
          setCurrentUpdatePriority(e) {
            eg = e;
          },
          getCurrentUpdatePriority: () => eg,
          resolveUpdatePriority() {
            var e;
            if (0 !== eg) return eg;
            switch (
              "undefined" != typeof window &&
              (null == (e = window.event) ? void 0 : e.type)
            ) {
              case "click":
              case "contextmenu":
              case "dblclick":
              case "pointercancel":
              case "pointerdown":
              case "pointerup":
                return u.DiscreteEventPriority;
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerenter":
              case "pointerleave":
              case "wheel":
                return u.ContinuousEventPriority;
              default:
                return u.DefaultEventPriority;
            }
          },
          resetFormInstance() {},
          rendererPackageName: "@react-three/fiber",
          rendererVersion: "9.4.2",
        }),
        ew = new Map(),
        ej = { objects: "shallow", strict: !1 };
      function eE(e) {
        let t,
          n,
          r = ew.get(e),
          o = null == r ? void 0 : r.fiber,
          i = null == r ? void 0 : r.store;
        r && console.warn("R3F.createRoot should only be called once!");
        let a = "function" == typeof reportError ? reportError : console.error,
          l =
            i ||
            ((e, t) => {
              let n,
                r,
                o = (n = (n, r) => {
                  let o,
                    i = new p.Pq0(),
                    a = new p.Pq0(),
                    l = new p.Pq0();
                  function c(e = r().camera, t = a, n = r().size) {
                    let { width: o, height: s, top: u, left: p } = n,
                      d = o / s;
                    t.isVector3 ? l.copy(t) : l.set(...t);
                    let f = e.getWorldPosition(i).distanceTo(l);
                    if (e && e.isOrthographicCamera)
                      return {
                        width: o / e.zoom,
                        height: s / e.zoom,
                        top: u,
                        left: p,
                        factor: 1,
                        distance: f,
                        aspect: d,
                      };
                    {
                      let t = 2 * Math.tan((e.fov * Math.PI) / 180 / 2) * f,
                        n = (o / s) * t;
                      return {
                        width: n,
                        height: t,
                        top: u,
                        left: p,
                        factor: o / n,
                        distance: f,
                        aspect: d,
                      };
                    }
                  }
                  let u = (e) => n((t) => ({ performance: { ...t.performance, current: e } })),
                    d = new p.I9Y();
                  return {
                    set: n,
                    get: r,
                    gl: null,
                    camera: null,
                    raycaster: null,
                    events: { priority: 1, enabled: !0, connected: !1 },
                    scene: null,
                    xr: null,
                    invalidate: (t = 1) => e(r(), t),
                    advance: (e, n) => t(e, n, r()),
                    legacy: !1,
                    linear: !1,
                    flat: !1,
                    controls: null,
                    clock: new p.zD7(),
                    pointer: d,
                    mouse: d,
                    frameloop: "always",
                    onPointerMissed: void 0,
                    performance: {
                      current: 1,
                      min: 0.5,
                      max: 1,
                      debounce: 200,
                      regress: () => {
                        let e = r();
                        (o && clearTimeout(o),
                          e.performance.current !== e.performance.min && u(e.performance.min),
                          (o = setTimeout(() => u(r().performance.max), e.performance.debounce)));
                      },
                    },
                    size: { width: 0, height: 0, top: 0, left: 0 },
                    viewport: {
                      initialDpr: 0,
                      dpr: 0,
                      width: 0,
                      height: 0,
                      top: 0,
                      left: 0,
                      aspect: 0,
                      distance: 0,
                      factor: 0,
                      getCurrentViewport: c,
                    },
                    setEvents: (e) => n((t) => ({ ...t, events: { ...t.events, ...e } })),
                    setSize: (e, t, o = 0, i = 0) => {
                      let l = r().camera,
                        s = { width: e, height: t, top: o, left: i };
                      n((e) => ({ size: s, viewport: { ...e.viewport, ...c(l, a, s) } }));
                    },
                    setDpr: (e) =>
                      n((t) => {
                        let n = A(e);
                        return {
                          viewport: {
                            ...t.viewport,
                            dpr: n,
                            initialDpr: t.viewport.initialDpr || n,
                          },
                        };
                      }),
                    setFrameloop: (e = "always") => {
                      let t = r().clock;
                      (t.stop(),
                        (t.elapsedTime = 0),
                        "never" !== e && (t.start(), (t.elapsedTime = 0)),
                        n(() => ({ frameloop: e })));
                    },
                    previousRoot: void 0,
                    internal: {
                      interaction: [],
                      hovered: new Map(),
                      subscribers: [],
                      initialClick: [0, 0],
                      initialHits: [],
                      capturedMap: new Map(),
                      lastEvent: s.createRef(),
                      active: !1,
                      frames: 0,
                      priority: 0,
                      subscribe: (e, t, n) => {
                        let o = r().internal;
                        return (
                          (o.priority = o.priority + +(t > 0)),
                          o.subscribers.push({ ref: e, priority: t, store: n }),
                          (o.subscribers = o.subscribers.sort((e, t) => e.priority - t.priority)),
                          () => {
                            let n = r().internal;
                            null != n &&
                              n.subscribers &&
                              ((n.priority = n.priority - (t > 0)),
                              (n.subscribers = n.subscribers.filter((t) => t.ref !== e)));
                          }
                        );
                      },
                    },
                  };
                })
                  ? v(n, r)
                  : v,
                i = o.getState(),
                a = i.size,
                l = i.viewport.dpr,
                c = i.camera;
              return (
                o.subscribe(() => {
                  let { camera: e, size: t, viewport: n, gl: r, set: i } = o.getState();
                  if (t.width !== a.width || t.height !== a.height || n.dpr !== l) {
                    ((a = t),
                      (l = n.dpr),
                      (function (e, t) {
                        !e.manual &&
                          (e && e.isOrthographicCamera
                            ? ((e.left = -(t.width / 2)),
                              (e.right = t.width / 2),
                              (e.top = t.height / 2),
                              (e.bottom = -(t.height / 2)))
                            : (e.aspect = t.width / t.height),
                          e.updateProjectionMatrix());
                      })(e, t),
                      n.dpr > 0 && r.setPixelRatio(n.dpr));
                    let o =
                      "undefined" != typeof HTMLCanvasElement &&
                      r.domElement instanceof HTMLCanvasElement;
                    r.setSize(t.width, t.height, o);
                  }
                  e !== c &&
                    ((c = e),
                    i((t) => ({
                      viewport: { ...t.viewport, ...t.viewport.getCurrentViewport(e) },
                    })));
                }),
                o.subscribe((t) => e(t)),
                o
              );
            })(eL, eR),
          c = o || ey.createContainer(l, u.ConcurrentRoot, null, !1, null, "", a, a, a, null);
        r || ew.set(e, { fiber: c, store: l });
        let f = !1,
          h = null;
        return {
          async configure(r = {}) {
            var o, i;
            let a;
            h = new Promise((e) => (a = e));
            let {
                gl: s,
                size: c,
                scene: u,
                events: m,
                onCreated: v,
                shadows: b = !1,
                linear: g = !1,
                flat: y = !1,
                legacy: w = !1,
                orthographic: j = !1,
                frameloop: E = "always",
                dpr: P = [1, 2],
                performance: C,
                raycaster: O,
                camera: x,
                onPointerMissed: M,
              } = r,
              T = l.getState(),
              S = T.gl;
            if (!T.gl) {
              let t = { canvas: e, powerPreference: "high-performance", antialias: !0, alpha: !0 },
                n = "function" == typeof s ? await s(t) : s;
              ((S = K(n) ? n : new d.WebGLRenderer({ ...t, ...s })), T.set({ gl: S }));
            }
            let k = T.raycaster;
            k || T.set({ raycaster: (k = new p.tBo()) });
            let { params: _, ...L } = O || {};
            if (
              (I.equ(L, k, ej) || V(k, { ...L }),
              I.equ(_, k.params, ej) || V(k, { params: { ...k.params, ..._ } }),
              !T.camera || (T.camera === n && !I.equ(n, x, ej)))
            ) {
              n = x;
              let e = null == x ? void 0 : x.isCamera,
                t = e ? x : j ? new p.qUd(0, 0, 0, 0, 0.1, 1e3) : new p.ubm(75, 0, 0.1, 1e3);
              (!e &&
                ((t.position.z = 5),
                x &&
                  (V(t, x),
                  !t.manual &&
                    ("aspect" in x || "left" in x || "right" in x || "bottom" in x || "top" in x) &&
                    ((t.manual = !0), t.updateProjectionMatrix())),
                T.camera || (null != x && x.rotation) || t.lookAt(0, 0, 0)),
                T.set({ camera: t }),
                (k.camera = t));
            }
            if (!T.scene) {
              let e;
              (null != u && u.isScene
                ? R((e = u), l, "", {})
                : (R((e = new p.Z58()), l, "", {}), u && V(e, u)),
                T.set({ scene: e }));
            }
            m && !T.events.handlers && T.set({ events: m(l) });
            let z = (function (e, t) {
              if (
                !t &&
                "undefined" != typeof HTMLCanvasElement &&
                e instanceof HTMLCanvasElement &&
                e.parentElement
              ) {
                let {
                  width: t,
                  height: n,
                  top: r,
                  left: o,
                } = e.parentElement.getBoundingClientRect();
                return { width: t, height: n, top: r, left: o };
              }
              return !t && "undefined" != typeof OffscreenCanvas && e instanceof OffscreenCanvas
                ? { width: e.width, height: e.height, top: 0, left: 0 }
                : { width: 0, height: 0, top: 0, left: 0, ...t };
            })(e, c);
            if (
              (I.equ(z, T.size, ej) || T.setSize(z.width, z.height, z.top, z.left),
              P && T.viewport.dpr !== A(P) && T.setDpr(P),
              T.frameloop !== E && T.setFrameloop(E),
              T.onPointerMissed || T.set({ onPointerMissed: M }),
              C &&
                !I.equ(C, T.performance, ej) &&
                T.set((e) => ({ performance: { ...e.performance, ...C } })),
              !T.xr)
            ) {
              let e = (e, t) => {
                  let n = l.getState();
                  "never" !== n.frameloop && eR(e, !0, n, t);
                },
                t = () => {
                  let t = l.getState();
                  ((t.gl.xr.enabled = t.gl.xr.isPresenting),
                    t.gl.xr.setAnimationLoop(t.gl.xr.isPresenting ? e : null),
                    t.gl.xr.isPresenting || eL(t));
                },
                n = {
                  connect() {
                    let e = l.getState().gl;
                    (e.xr.addEventListener("sessionstart", t),
                      e.xr.addEventListener("sessionend", t));
                  },
                  disconnect() {
                    let e = l.getState().gl;
                    (e.xr.removeEventListener("sessionstart", t),
                      e.xr.removeEventListener("sessionend", t));
                  },
                };
              ("function" == typeof (null == (o = S.xr) ? void 0 : o.addEventListener) &&
                n.connect(),
                T.set({ xr: n }));
            }
            if (S.shadowMap) {
              let e = S.shadowMap.enabled,
                t = S.shadowMap.type;
              if (((S.shadowMap.enabled = !!b), I.boo(b))) S.shadowMap.type = p.Wk7;
              else if (I.str(b)) {
                let e = { basic: p.bTm, percentage: p.QP0, soft: p.Wk7, variance: p.RyA };
                S.shadowMap.type = null != (i = e[b]) ? i : p.Wk7;
              } else I.obj(b) && Object.assign(S.shadowMap, b);
              (e !== S.shadowMap.enabled || t !== S.shadowMap.type) &&
                (S.shadowMap.needsUpdate = !0);
            }
            return (
              (p.ppV.enabled = !w),
              f || ((S.outputColorSpace = g ? p.Zr2 : p.er$), (S.toneMapping = y ? p.y_p : p.FV)),
              T.legacy !== w && T.set(() => ({ legacy: w })),
              T.linear !== g && T.set(() => ({ linear: g })),
              T.flat !== y && T.set(() => ({ flat: y })),
              !s || I.fun(s) || K(s) || I.equ(s, S, ej) || V(S, s),
              (t = v),
              (f = !0),
              a(),
              this
            );
          },
          render(n) {
            return (
              f || h || this.configure(),
              h.then(() => {
                ey.updateContainer(
                  (0, j.jsx)(eP, { store: l, children: n, onCreated: t, rootElement: e }),
                  c,
                  null,
                  () => void 0,
                );
              }),
              l
            );
          },
          unmount() {
            eC(e);
          },
        };
      }
      function eP({ store: e, children: t, onCreated: n, rootElement: r }) {
        return (
          x(() => {
            let t = e.getState();
            (t.set((e) => ({ internal: { ...e.internal, active: !0 } })),
              n && n(t),
              e.getState().events.connected || null == t.events.connect || t.events.connect(r));
          }, []),
          (0, j.jsx)($.Provider, { value: e, children: t })
        );
      }
      function eC(e, t) {
        let n = ew.get(e),
          r = null == n ? void 0 : n.fiber;
        if (r) {
          let o = null == n ? void 0 : n.store.getState();
          (o && (o.internal.active = !1),
            ey.updateContainer(null, r, null, () => {
              o &&
                setTimeout(() => {
                  try {
                    (null == o.events.disconnect || o.events.disconnect(),
                      null == (n = o.gl) ||
                        null == (r = n.renderLists) ||
                        null == r.dispose ||
                        r.dispose(),
                      null == (i = o.gl) || null == i.forceContextLoss || i.forceContextLoss(),
                      null != (a = o.gl) && a.xr && o.xr.disconnect());
                    var n,
                      r,
                      i,
                      a,
                      l = o.scene;
                    for (let e in ("Scene" !== l.type && (null == l.dispose || l.dispose()), l)) {
                      let t = l[e];
                      (null == t ? void 0 : t.type) !== "Scene" &&
                        (null == t || null == t.dispose || t.dispose());
                    }
                    (ew.delete(e), t && t(e));
                  } catch (e) {}
                }, 500);
            }));
        }
      }
      let eO = new Set(),
        ex = new Set(),
        eM = new Set();
      function eT(e, t) {
        if (e.size) for (let { callback: n } of e.values()) n(t);
      }
      function eS(e, t) {
        switch (e) {
          case "before":
            return eT(eO, t);
          case "after":
            return eT(ex, t);
          case "tail":
            return eT(eM, t);
        }
      }
      function ek(e, t, n) {
        let i = t.clock.getDelta();
        ("never" === t.frameloop &&
          "number" == typeof e &&
          ((i = e - t.clock.elapsedTime),
          (t.clock.oldTime = t.clock.elapsedTime),
          (t.clock.elapsedTime = e)),
          (r = t.internal.subscribers));
        for (let e = 0; e < r.length; e++) (o = r[e]).ref.current(o.store.getState(), i, n);
        return (
          !t.internal.priority && t.gl.render && t.gl.render(t.scene, t.camera),
          (t.internal.frames = Math.max(0, t.internal.frames - 1)),
          "always" === t.frameloop ? 1 : t.internal.frames
        );
      }
      let eA = !1,
        e_ = !1;
      function eI(e) {
        for (let n of ((a = requestAnimationFrame(eI)),
        (eA = !0),
        (i = 0),
        eS("before", e),
        (e_ = !0),
        ew.values())) {
          var t;
          (l = n.store.getState()).internal.active &&
            ("always" === l.frameloop || l.internal.frames > 0) &&
            !(null != (t = l.gl.xr) && t.isPresenting) &&
            (i += ek(e, l));
        }
        if (((e_ = !1), eS("after", e), 0 === i))
          return (eS("tail", e), (eA = !1), cancelAnimationFrame(a));
      }
      function eL(e, t = 1) {
        var n;
        if (!e) return ew.forEach((e) => eL(e.store.getState(), t));
        (null == (n = e.gl.xr) || !n.isPresenting) &&
          e.internal.active &&
          "never" !== e.frameloop &&
          (t > 1
            ? (e.internal.frames = Math.min(60, e.internal.frames + t))
            : e_
              ? (e.internal.frames = 2)
              : (e.internal.frames = 1),
          eA || ((eA = !0), requestAnimationFrame(eI)));
      }
      function eR(e, t = !0, n, r) {
        if ((t && eS("before", e), n)) ek(e, n, r);
        else for (let t of ew.values()) ek(e, t.store.getState());
        t && eS("after", e);
      }
      let ez = {
        onClick: ["click", !1],
        onContextMenu: ["contextmenu", !1],
        onDoubleClick: ["dblclick", !1],
        onWheel: ["wheel", !0],
        onPointerDown: ["pointerdown", !0],
        onPointerUp: ["pointerup", !0],
        onPointerLeave: ["pointerleave", !0],
        onPointerMove: ["pointermove", !0],
        onPointerCancel: ["pointercancel", !0],
        onLostPointerCapture: ["lostpointercapture", !0],
      };
      function eD(e) {
        let { handlePointer: t } = (function (e) {
          function t(e) {
            return e.filter((e) =>
              ["Move", "Over", "Enter", "Out", "Leave"].some((t) => {
                var n;
                return null == (n = e.__r3f) ? void 0 : n.handlers["onPointer" + t];
              }),
            );
          }
          function n(t) {
            let { internal: n } = e.getState();
            for (let e of n.hovered.values())
              if (
                !t.length ||
                !t.find(
                  (t) =>
                    t.object === e.object && t.index === e.index && t.instanceId === e.instanceId,
                )
              ) {
                let r = e.eventObject.__r3f;
                if ((n.hovered.delete(Z(e)), null != r && r.eventCount)) {
                  let n = r.handlers,
                    o = { ...e, intersections: t };
                  (null == n.onPointerOut || n.onPointerOut(o),
                    null == n.onPointerLeave || n.onPointerLeave(o));
                }
              }
          }
          function r(e, t) {
            for (let n = 0; n < t.length; n++) {
              let r = t[n].__r3f;
              null == r || null == r.handlers.onPointerMissed || r.handlers.onPointerMissed(e);
            }
          }
          return {
            handlePointer: function (o) {
              switch (o) {
                case "onPointerLeave":
                case "onPointerCancel":
                  return () => n([]);
                case "onLostPointerCapture":
                  return (t) => {
                    let { internal: r } = e.getState();
                    "pointerId" in t &&
                      r.capturedMap.has(t.pointerId) &&
                      requestAnimationFrame(() => {
                        r.capturedMap.has(t.pointerId) &&
                          (r.capturedMap.delete(t.pointerId), n([]));
                      });
                  };
              }
              return function (i) {
                let { onPointerMissed: a, internal: l } = e.getState();
                l.lastEvent.current = i;
                let s = "onPointerMove" === o,
                  c = "onClick" === o || "onContextMenu" === o || "onDoubleClick" === o,
                  u = (function (t, n) {
                    let r = e.getState(),
                      o = new Set(),
                      i = [],
                      a = n ? n(r.internal.interaction) : r.internal.interaction;
                    for (let e = 0; e < a.length; e++) {
                      let t = _(a[e]);
                      t && (t.raycaster.camera = void 0);
                    }
                    r.previousRoot || null == r.events.compute || r.events.compute(t, r);
                    let l = a
                      .flatMap(function (e) {
                        let n = _(e);
                        if (!n || !n.events.enabled || null === n.raycaster.camera) return [];
                        if (void 0 === n.raycaster.camera) {
                          var r;
                          (null == n.events.compute ||
                            n.events.compute(
                              t,
                              n,
                              null == (r = n.previousRoot) ? void 0 : r.getState(),
                            ),
                            void 0 === n.raycaster.camera && (n.raycaster.camera = null));
                        }
                        return n.raycaster.camera ? n.raycaster.intersectObject(e, !0) : [];
                      })
                      .sort((e, t) => {
                        let n = _(e.object),
                          r = _(t.object);
                        return (
                          (n && r && r.events.priority - n.events.priority) ||
                          e.distance - t.distance
                        );
                      })
                      .filter((e) => {
                        let t = Z(e);
                        return !o.has(t) && (o.add(t), !0);
                      });
                    for (let e of (r.events.filter && (l = r.events.filter(l, r)), l)) {
                      let t = e.object;
                      for (; t;) {
                        var s;
                        (null != (s = t.__r3f) && s.eventCount && i.push({ ...e, eventObject: t }),
                          (t = t.parent));
                      }
                    }
                    if ("pointerId" in t && r.internal.capturedMap.has(t.pointerId))
                      for (let e of r.internal.capturedMap.get(t.pointerId).values())
                        o.has(Z(e.intersection)) || i.push(e.intersection);
                    return i;
                  })(i, s ? t : void 0),
                  d = c
                    ? (function (t) {
                        let { internal: n } = e.getState(),
                          r = t.offsetX - n.initialClick[0],
                          o = t.offsetY - n.initialClick[1];
                        return Math.round(Math.sqrt(r * r + o * o));
                      })(i)
                    : 0;
                ("onPointerDown" === o &&
                  ((l.initialClick = [i.offsetX, i.offsetY]),
                  (l.initialHits = u.map((e) => e.eventObject))),
                  c && !u.length && d <= 2 && (r(i, l.interaction), a && a(i)),
                  s && n(u),
                  !(function (e, t, r, o) {
                    if (e.length) {
                      let i = { stopped: !1 };
                      for (let a of e) {
                        let l = _(a.object);
                        if (
                          (l ||
                            a.object.traverseAncestors((e) => {
                              let t = _(e);
                              if (t) return ((l = t), !1);
                            }),
                          l)
                        ) {
                          let { raycaster: s, pointer: c, camera: u, internal: d } = l,
                            f = new p.Pq0(c.x, c.y, 0).unproject(u),
                            h = (e) => {
                              var t, n;
                              return (
                                null !=
                                  (t =
                                    null == (n = d.capturedMap.get(e))
                                      ? void 0
                                      : n.has(a.eventObject)) && t
                              );
                            },
                            m = (e) => {
                              let n = { intersection: a, target: t.target };
                              (d.capturedMap.has(e)
                                ? d.capturedMap.get(e).set(a.eventObject, n)
                                : d.capturedMap.set(e, new Map([[a.eventObject, n]])),
                                t.target.setPointerCapture(e));
                            },
                            v = (e) => {
                              let t = d.capturedMap.get(e);
                              t && W(d.capturedMap, a.eventObject, t, e);
                            },
                            b = {};
                          for (let e in t) {
                            let n = t[e];
                            "function" != typeof n && (b[e] = n);
                          }
                          let g = {
                            ...a,
                            ...b,
                            pointer: c,
                            intersections: e,
                            stopped: i.stopped,
                            delta: r,
                            unprojectedPoint: f,
                            ray: s.ray,
                            camera: u,
                            stopPropagation() {
                              let r = "pointerId" in t && d.capturedMap.get(t.pointerId);
                              (!r || r.has(a.eventObject)) &&
                                ((g.stopped = i.stopped = !0),
                                d.hovered.size &&
                                  Array.from(d.hovered.values()).find(
                                    (e) => e.eventObject === a.eventObject,
                                  ) &&
                                  n([...e.slice(0, e.indexOf(a)), a]));
                            },
                            target: {
                              hasPointerCapture: h,
                              setPointerCapture: m,
                              releasePointerCapture: v,
                            },
                            currentTarget: {
                              hasPointerCapture: h,
                              setPointerCapture: m,
                              releasePointerCapture: v,
                            },
                            nativeEvent: t,
                          };
                          if ((o(g), !0 === i.stopped)) break;
                        }
                      }
                    }
                  })(u, i, d, function (e) {
                    let t = e.eventObject,
                      n = t.__r3f;
                    if (!(null != n && n.eventCount)) return;
                    let a = n.handlers;
                    if (s) {
                      if (
                        a.onPointerOver ||
                        a.onPointerEnter ||
                        a.onPointerOut ||
                        a.onPointerLeave
                      ) {
                        let t = Z(e),
                          n = l.hovered.get(t);
                        n
                          ? n.stopped && e.stopPropagation()
                          : (l.hovered.set(t, e),
                            null == a.onPointerOver || a.onPointerOver(e),
                            null == a.onPointerEnter || a.onPointerEnter(e));
                      }
                      null == a.onPointerMove || a.onPointerMove(e);
                    } else {
                      let n = a[o];
                      n
                        ? (!c || l.initialHits.includes(t)) &&
                          (r(
                            i,
                            l.interaction.filter((e) => !l.initialHits.includes(e)),
                          ),
                          n(e))
                        : c &&
                          l.initialHits.includes(t) &&
                          r(
                            i,
                            l.interaction.filter((e) => !l.initialHits.includes(e)),
                          );
                    }
                  }));
              };
            },
          };
        })(e);
        return {
          priority: 1,
          enabled: !0,
          compute(e, t, n) {
            (t.pointer.set(
              (e.offsetX / t.size.width) * 2 - 1,
              -(2 * (e.offsetY / t.size.height)) + 1,
            ),
              t.raycaster.setFromCamera(t.pointer, t.camera));
          },
          connected: void 0,
          handlers: Object.keys(ez).reduce((e, n) => ({ ...e, [n]: t(n) }), {}),
          update: () => {
            var t;
            let { events: n, internal: r } = e.getState();
            null != (t = r.lastEvent) &&
              t.current &&
              n.handlers &&
              n.handlers.onPointerMove(r.lastEvent.current);
          },
          connect: (t) => {
            let { set: n, events: r } = e.getState();
            if (
              (null == r.disconnect || r.disconnect(),
              n((e) => ({ events: { ...e.events, connected: t } })),
              r.handlers)
            )
              for (let e in r.handlers) {
                let n = r.handlers[e],
                  [o, i] = ez[e];
                t.addEventListener(o, n, { passive: i });
              }
          },
          disconnect: () => {
            let { set: t, events: n } = e.getState();
            if (n.connected) {
              if (n.handlers)
                for (let e in n.handlers) {
                  let t = n.handlers[e],
                    [r] = ez[e];
                  n.connected.removeEventListener(r, t);
                }
              t((e) => ({ events: { ...e.events, connected: void 0 } }));
            }
          },
        };
      }
    },
    66451: (e, t) => {
      function n(e, t) {
        var n = e.length;
        for (e.push(t); 0 < n;) {
          var r = (n - 1) >>> 1,
            o = e[r];
          if (0 < i(o, t)) ((e[r] = t), (e[n] = o), (n = r));
          else break;
        }
      }
      function r(e) {
        return 0 === e.length ? null : e[0];
      }
      function o(e) {
        if (0 === e.length) return null;
        var t = e[0],
          n = e.pop();
        if (n !== t) {
          e[0] = n;
          for (var r = 0, o = e.length, a = o >>> 1; r < a;) {
            var l = 2 * (r + 1) - 1,
              s = e[l],
              c = l + 1,
              u = e[c];
            if (0 > i(s, n))
              c < o && 0 > i(u, s)
                ? ((e[r] = u), (e[c] = n), (r = c))
                : ((e[r] = s), (e[l] = n), (r = l));
            else if (c < o && 0 > i(u, n)) ((e[r] = u), (e[c] = n), (r = c));
            else break;
          }
        }
        return t;
      }
      function i(e, t) {
        var n = e.sortIndex - t.sortIndex;
        return 0 !== n ? n : e.id - t.id;
      }
      if (
        ((t.unstable_now = void 0),
        "object" == typeof performance && "function" == typeof performance.now)
      ) {
        var a,
          l = performance;
        t.unstable_now = function () {
          return l.now();
        };
      } else {
        var s = Date,
          c = s.now();
        t.unstable_now = function () {
          return s.now() - c;
        };
      }
      var u = [],
        p = [],
        d = 1,
        f = null,
        h = 3,
        m = !1,
        v = !1,
        b = !1,
        g = "function" == typeof setTimeout ? setTimeout : null,
        y = "function" == typeof clearTimeout ? clearTimeout : null,
        w = "undefined" != typeof setImmediate ? setImmediate : null;
      function j(e) {
        for (var t = r(p); null !== t;) {
          if (null === t.callback) o(p);
          else if (t.startTime <= e) (o(p), (t.sortIndex = t.expirationTime), n(u, t));
          else break;
          t = r(p);
        }
      }
      function E(e) {
        if (((b = !1), j(e), !v))
          if (null !== r(u)) ((v = !0), A());
          else {
            var t = r(p);
            null !== t && _(E, t.startTime - e);
          }
      }
      var P = !1,
        C = -1,
        O = 5,
        x = -1;
      function M() {
        return !(t.unstable_now() - x < O);
      }
      function T() {
        if (P) {
          var e = t.unstable_now();
          x = e;
          var n = !0;
          try {
            e: {
              ((v = !1), b && ((b = !1), y(C), (C = -1)), (m = !0));
              var i = h;
              try {
                t: {
                  for (j(e), f = r(u); null !== f && !(f.expirationTime > e && M());) {
                    var l = f.callback;
                    if ("function" == typeof l) {
                      ((f.callback = null), (h = f.priorityLevel));
                      var s = l(f.expirationTime <= e);
                      if (((e = t.unstable_now()), "function" == typeof s)) {
                        ((f.callback = s), j(e), (n = !0));
                        break t;
                      }
                      (f === r(u) && o(u), j(e));
                    } else o(u);
                    f = r(u);
                  }
                  if (null !== f) n = !0;
                  else {
                    var c = r(p);
                    (null !== c && _(E, c.startTime - e), (n = !1));
                  }
                }
                break e;
              } finally {
                ((f = null), (h = i), (m = !1));
              }
            }
          } finally {
            n ? a() : (P = !1);
          }
        }
      }
      if ("function" == typeof w)
        a = function () {
          w(T);
        };
      else if ("undefined" != typeof MessageChannel) {
        var S = new MessageChannel(),
          k = S.port2;
        ((S.port1.onmessage = T),
          (a = function () {
            k.postMessage(null);
          }));
      } else
        a = function () {
          g(T, 0);
        };
      function A() {
        P || ((P = !0), a());
      }
      function _(e, n) {
        C = g(function () {
          e(t.unstable_now());
        }, n);
      }
      ((t.unstable_IdlePriority = 5),
        (t.unstable_ImmediatePriority = 1),
        (t.unstable_LowPriority = 4),
        (t.unstable_NormalPriority = 3),
        (t.unstable_Profiling = null),
        (t.unstable_UserBlockingPriority = 2),
        (t.unstable_cancelCallback = function (e) {
          e.callback = null;
        }),
        (t.unstable_continueExecution = function () {
          v || m || ((v = !0), A());
        }),
        (t.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
              )
            : (O = 0 < e ? Math.floor(1e3 / e) : 5);
        }),
        (t.unstable_getCurrentPriorityLevel = function () {
          return h;
        }),
        (t.unstable_getFirstCallbackNode = function () {
          return r(u);
        }),
        (t.unstable_next = function (e) {
          switch (h) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = h;
          }
          var n = h;
          h = t;
          try {
            return e();
          } finally {
            h = n;
          }
        }),
        (t.unstable_pauseExecution = function () {}),
        (t.unstable_requestPaint = function () {}),
        (t.unstable_runWithPriority = function (e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var n = h;
          h = e;
          try {
            return t();
          } finally {
            h = n;
          }
        }),
        (t.unstable_scheduleCallback = function (e, o, i) {
          var a = t.unstable_now();
          switch (
            ((i =
              "object" == typeof i && null !== i && "number" == typeof (i = i.delay) && 0 < i
                ? a + i
                : a),
            e)
          ) {
            case 1:
              var l = -1;
              break;
            case 2:
              l = 250;
              break;
            case 5:
              l = 0x3fffffff;
              break;
            case 4:
              l = 1e4;
              break;
            default:
              l = 5e3;
          }
          return (
            (l = i + l),
            (e = {
              id: d++,
              callback: o,
              priorityLevel: e,
              startTime: i,
              expirationTime: l,
              sortIndex: -1,
            }),
            i > a
              ? ((e.sortIndex = i),
                n(p, e),
                null === r(u) && e === r(p) && (b ? (y(C), (C = -1)) : (b = !0), _(E, i - a)))
              : ((e.sortIndex = l), n(u, e), v || m || ((v = !0), A())),
            e
          );
        }),
        (t.unstable_shouldYield = M),
        (t.unstable_wrapCallback = function (e) {
          var t = h;
          return function () {
            var n = h;
            h = t;
            try {
              return e.apply(this, arguments);
            } finally {
              h = n;
            }
          };
        }));
    },
    83654: (e, t, n) => {
      var r = n(12115),
        o = n(14806),
        i =
          "function" == typeof Object.is
            ? Object.is
            : function (e, t) {
                return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
              },
        a = o.useSyncExternalStore,
        l = r.useRef,
        s = r.useEffect,
        c = r.useMemo,
        u = r.useDebugValue;
      t.useSyncExternalStoreWithSelector = function (e, t, n, r, o) {
        var p = l(null);
        if (null === p.current) {
          var d = { hasValue: !1, value: null };
          p.current = d;
        } else d = p.current;
        var f = a(
          e,
          (p = c(
            function () {
              function e(e) {
                if (!s) {
                  if (((s = !0), (a = e), (e = r(e)), void 0 !== o && d.hasValue)) {
                    var t = d.value;
                    if (o(t, e)) return (l = t);
                  }
                  return (l = e);
                }
                if (((t = l), i(a, e))) return t;
                var n = r(e);
                return void 0 !== o && o(t, n) ? ((a = e), t) : ((a = e), (l = n));
              }
              var a,
                l,
                s = !1,
                c = void 0 === n ? null : n;
              return [
                function () {
                  return e(t());
                },
                null === c
                  ? void 0
                  : function () {
                      return e(c());
                    },
              ];
            },
            [t, n, r, o],
          ))[0],
          p[1],
        );
        return (
          s(
            function () {
              ((d.hasValue = !0), (d.value = f));
            },
            [f],
          ),
          u(f),
          f
        );
      };
    },
    88945: (e, t, n) => {
      n.d(t, { A: () => r });
      function r() {
        return (r = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }).apply(null, arguments);
      }
    },
    90724: (e, t, n) => {
      n.d(t, { N: () => m });
      var r = n(88945),
        o = n(59040),
        i = n(12115),
        a = n(85339),
        l = n(3362),
        s = Object.defineProperty,
        c = (e, t, n) => (
          ((e, t, n) =>
            t in e
              ? s(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
              : (e[t] = n))(e, "symbol" != typeof t ? t + "" : t, n),
          n
        );
      let u = new a.RlV(),
        p = new a.Zcv(),
        d = Math.cos((Math.PI / 180) * 70),
        f = (e, t) => ((e % t) + t) % t;
      class h extends l.Q {
        constructor(e, t) {
          (super(),
            c(this, "object"),
            c(this, "domElement"),
            c(this, "enabled", !0),
            c(this, "target", new a.Pq0()),
            c(this, "minDistance", 0),
            c(this, "maxDistance", 1 / 0),
            c(this, "minZoom", 0),
            c(this, "maxZoom", 1 / 0),
            c(this, "minPolarAngle", 0),
            c(this, "maxPolarAngle", Math.PI),
            c(this, "minAzimuthAngle", -1 / 0),
            c(this, "maxAzimuthAngle", 1 / 0),
            c(this, "enableDamping", !1),
            c(this, "dampingFactor", 0.05),
            c(this, "enableZoom", !0),
            c(this, "zoomSpeed", 1),
            c(this, "enableRotate", !0),
            c(this, "rotateSpeed", 1),
            c(this, "enablePan", !0),
            c(this, "panSpeed", 1),
            c(this, "screenSpacePanning", !0),
            c(this, "keyPanSpeed", 7),
            c(this, "zoomToCursor", !1),
            c(this, "autoRotate", !1),
            c(this, "autoRotateSpeed", 2),
            c(this, "reverseOrbit", !1),
            c(this, "reverseHorizontalOrbit", !1),
            c(this, "reverseVerticalOrbit", !1),
            c(this, "keys", {
              LEFT: "ArrowLeft",
              UP: "ArrowUp",
              RIGHT: "ArrowRight",
              BOTTOM: "ArrowDown",
            }),
            c(this, "mouseButtons", { LEFT: a.kBv.ROTATE, MIDDLE: a.kBv.DOLLY, RIGHT: a.kBv.PAN }),
            c(this, "touches", { ONE: a.wtR.ROTATE, TWO: a.wtR.DOLLY_PAN }),
            c(this, "target0"),
            c(this, "position0"),
            c(this, "zoom0"),
            c(this, "_domElementKeyEvents", null),
            c(this, "getPolarAngle"),
            c(this, "getAzimuthalAngle"),
            c(this, "setPolarAngle"),
            c(this, "setAzimuthalAngle"),
            c(this, "getDistance"),
            c(this, "getZoomScale"),
            c(this, "listenToKeyEvents"),
            c(this, "stopListenToKeyEvents"),
            c(this, "saveState"),
            c(this, "reset"),
            c(this, "update"),
            c(this, "connect"),
            c(this, "dispose"),
            c(this, "dollyIn"),
            c(this, "dollyOut"),
            c(this, "getScale"),
            c(this, "setScale"),
            (this.object = e),
            (this.domElement = t),
            (this.target0 = this.target.clone()),
            (this.position0 = this.object.position.clone()),
            (this.zoom0 = this.object.zoom),
            (this.getPolarAngle = () => m.phi),
            (this.getAzimuthalAngle = () => m.theta),
            (this.setPolarAngle = (e) => {
              let t = f(e, 2 * Math.PI),
                r = m.phi;
              (r < 0 && (r += 2 * Math.PI), t < 0 && (t += 2 * Math.PI));
              let o = Math.abs(t - r);
              (2 * Math.PI - o < o && (t < r ? (t += 2 * Math.PI) : (r += 2 * Math.PI)),
                (v.phi = t - r),
                n.update());
            }),
            (this.setAzimuthalAngle = (e) => {
              let t = f(e, 2 * Math.PI),
                r = m.theta;
              (r < 0 && (r += 2 * Math.PI), t < 0 && (t += 2 * Math.PI));
              let o = Math.abs(t - r);
              (2 * Math.PI - o < o && (t < r ? (t += 2 * Math.PI) : (r += 2 * Math.PI)),
                (v.theta = t - r),
                n.update());
            }),
            (this.getDistance = () => n.object.position.distanceTo(n.target)),
            (this.listenToKeyEvents = (e) => {
              (e.addEventListener("keydown", ee), (this._domElementKeyEvents = e));
            }),
            (this.stopListenToKeyEvents = () => {
              (this._domElementKeyEvents.removeEventListener("keydown", ee),
                (this._domElementKeyEvents = null));
            }),
            (this.saveState = () => {
              (n.target0.copy(n.target),
                n.position0.copy(n.object.position),
                (n.zoom0 = n.object.zoom));
            }),
            (this.reset = () => {
              (n.target.copy(n.target0),
                n.object.position.copy(n.position0),
                (n.object.zoom = n.zoom0),
                n.object.updateProjectionMatrix(),
                n.dispatchEvent(r),
                n.update(),
                (s = l.NONE));
            }),
            (this.update = (() => {
              let t = new a.Pq0(),
                o = new a.Pq0(0, 1, 0),
                i = new a.PTz().setFromUnitVectors(e.up, o),
                c = i.clone().invert(),
                f = new a.Pq0(),
                y = new a.PTz(),
                w = 2 * Math.PI;
              return function () {
                let j = n.object.position;
                (i.setFromUnitVectors(e.up, o),
                  c.copy(i).invert(),
                  t.copy(j).sub(n.target),
                  t.applyQuaternion(i),
                  m.setFromVector3(t),
                  n.autoRotate && s === l.NONE && L(((2 * Math.PI) / 60 / 60) * n.autoRotateSpeed),
                  n.enableDamping
                    ? ((m.theta += v.theta * n.dampingFactor), (m.phi += v.phi * n.dampingFactor))
                    : ((m.theta += v.theta), (m.phi += v.phi)));
                let E = n.minAzimuthAngle,
                  P = n.maxAzimuthAngle;
                (isFinite(E) &&
                  isFinite(P) &&
                  (E < -Math.PI ? (E += w) : E > Math.PI && (E -= w),
                  P < -Math.PI ? (P += w) : P > Math.PI && (P -= w),
                  E <= P
                    ? (m.theta = Math.max(E, Math.min(P, m.theta)))
                    : (m.theta =
                        m.theta > (E + P) / 2 ? Math.max(E, m.theta) : Math.min(P, m.theta))),
                  (m.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, m.phi))),
                  m.makeSafe(),
                  !0 === n.enableDamping
                    ? n.target.addScaledVector(g, n.dampingFactor)
                    : n.target.add(g),
                  (n.zoomToCursor && k) || n.object.isOrthographicCamera
                    ? (m.radius = F(m.radius))
                    : (m.radius = F(m.radius * b)),
                  t.setFromSpherical(m),
                  t.applyQuaternion(c),
                  j.copy(n.target).add(t),
                  n.object.matrixAutoUpdate || n.object.updateMatrix(),
                  n.object.lookAt(n.target),
                  !0 === n.enableDamping
                    ? ((v.theta *= 1 - n.dampingFactor),
                      (v.phi *= 1 - n.dampingFactor),
                      g.multiplyScalar(1 - n.dampingFactor))
                    : (v.set(0, 0, 0), g.set(0, 0, 0)));
                let C = !1;
                if (n.zoomToCursor && k) {
                  let r = null;
                  if (n.object instanceof a.ubm && n.object.isPerspectiveCamera) {
                    let e = t.length();
                    r = F(e * b);
                    let o = e - r;
                    (n.object.position.addScaledVector(T, o), n.object.updateMatrixWorld());
                  } else if (n.object.isOrthographicCamera) {
                    let e = new a.Pq0(S.x, S.y, 0);
                    (e.unproject(n.object),
                      (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / b))),
                      n.object.updateProjectionMatrix(),
                      (C = !0));
                    let o = new a.Pq0(S.x, S.y, 0);
                    (o.unproject(n.object),
                      n.object.position.sub(o).add(e),
                      n.object.updateMatrixWorld(),
                      (r = t.length()));
                  } else
                    (console.warn(
                      "WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.",
                    ),
                      (n.zoomToCursor = !1));
                  null !== r &&
                    (n.screenSpacePanning
                      ? n.target
                          .set(0, 0, -1)
                          .transformDirection(n.object.matrix)
                          .multiplyScalar(r)
                          .add(n.object.position)
                      : (u.origin.copy(n.object.position),
                        u.direction.set(0, 0, -1).transformDirection(n.object.matrix),
                        Math.abs(n.object.up.dot(u.direction)) < d
                          ? e.lookAt(n.target)
                          : (p.setFromNormalAndCoplanarPoint(n.object.up, n.target),
                            u.intersectPlane(p, n.target))));
                } else
                  n.object instanceof a.qUd &&
                    n.object.isOrthographicCamera &&
                    (C = 1 !== b) &&
                    ((n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / b))),
                    n.object.updateProjectionMatrix());
                return (
                  (b = 1),
                  (k = !1),
                  !!(
                    C ||
                    f.distanceToSquared(n.object.position) > h ||
                    8 * (1 - y.dot(n.object.quaternion)) > h
                  ) &&
                    (n.dispatchEvent(r),
                    f.copy(n.object.position),
                    y.copy(n.object.quaternion),
                    (C = !1),
                    !0)
                );
              };
            })()),
            (this.connect = (e) => {
              ((n.domElement = e),
                (n.domElement.style.touchAction = "none"),
                n.domElement.addEventListener("contextmenu", et),
                n.domElement.addEventListener("pointerdown", $),
                n.domElement.addEventListener("pointercancel", Q),
                n.domElement.addEventListener("wheel", J));
            }),
            (this.dispose = () => {
              var e, t, r, o, i, a;
              (n.domElement && (n.domElement.style.touchAction = "auto"),
                null == (e = n.domElement) || e.removeEventListener("contextmenu", et),
                null == (t = n.domElement) || t.removeEventListener("pointerdown", $),
                null == (r = n.domElement) || r.removeEventListener("pointercancel", Q),
                null == (o = n.domElement) || o.removeEventListener("wheel", J),
                null == (i = n.domElement) || i.ownerDocument.removeEventListener("pointermove", G),
                null == (a = n.domElement) || a.ownerDocument.removeEventListener("pointerup", Q),
                null !== n._domElementKeyEvents &&
                  n._domElementKeyEvents.removeEventListener("keydown", ee));
            }));
          let n = this,
            r = { type: "change" },
            o = { type: "start" },
            i = { type: "end" },
            l = {
              NONE: -1,
              ROTATE: 0,
              DOLLY: 1,
              PAN: 2,
              TOUCH_ROTATE: 3,
              TOUCH_PAN: 4,
              TOUCH_DOLLY_PAN: 5,
              TOUCH_DOLLY_ROTATE: 6,
            },
            s = l.NONE,
            h = 1e-6,
            m = new a.YHV(),
            v = new a.YHV(),
            b = 1,
            g = new a.Pq0(),
            y = new a.I9Y(),
            w = new a.I9Y(),
            j = new a.I9Y(),
            E = new a.I9Y(),
            P = new a.I9Y(),
            C = new a.I9Y(),
            O = new a.I9Y(),
            x = new a.I9Y(),
            M = new a.I9Y(),
            T = new a.Pq0(),
            S = new a.I9Y(),
            k = !1,
            A = [],
            _ = {};
          function I() {
            return Math.pow(0.95, n.zoomSpeed);
          }
          function L(e) {
            n.reverseOrbit || n.reverseHorizontalOrbit ? (v.theta += e) : (v.theta -= e);
          }
          function R(e) {
            n.reverseOrbit || n.reverseVerticalOrbit ? (v.phi += e) : (v.phi -= e);
          }
          let z = (() => {
              let e = new a.Pq0();
              return function (t, n) {
                (e.setFromMatrixColumn(n, 0), e.multiplyScalar(-t), g.add(e));
              };
            })(),
            D = (() => {
              let e = new a.Pq0();
              return function (t, r) {
                (!0 === n.screenSpacePanning
                  ? e.setFromMatrixColumn(r, 1)
                  : (e.setFromMatrixColumn(r, 0), e.crossVectors(n.object.up, e)),
                  e.multiplyScalar(t),
                  g.add(e));
              };
            })(),
            N = (() => {
              let e = new a.Pq0();
              return function (t, r) {
                let o = n.domElement;
                if (o && n.object instanceof a.ubm && n.object.isPerspectiveCamera) {
                  let i = n.object.position;
                  e.copy(i).sub(n.target);
                  let a = e.length();
                  (z(
                    (2 * t * (a *= Math.tan(((n.object.fov / 2) * Math.PI) / 180))) /
                      o.clientHeight,
                    n.object.matrix,
                  ),
                    D((2 * r * a) / o.clientHeight, n.object.matrix));
                } else
                  o && n.object instanceof a.qUd && n.object.isOrthographicCamera
                    ? (z(
                        (t * (n.object.right - n.object.left)) / n.object.zoom / o.clientWidth,
                        n.object.matrix,
                      ),
                      D(
                        (r * (n.object.top - n.object.bottom)) / n.object.zoom / o.clientHeight,
                        n.object.matrix,
                      ))
                    : (console.warn(
                        "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.",
                      ),
                      (n.enablePan = !1));
              };
            })();
          function H(e) {
            (n.object instanceof a.ubm && n.object.isPerspectiveCamera) ||
            (n.object instanceof a.qUd && n.object.isOrthographicCamera)
              ? (b = e)
              : (console.warn(
                  "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.",
                ),
                (n.enableZoom = !1));
          }
          function Y(e) {
            if (!n.zoomToCursor || !n.domElement) return;
            k = !0;
            let t = n.domElement.getBoundingClientRect(),
              r = e.clientX - t.left,
              o = e.clientY - t.top,
              i = t.width,
              a = t.height;
            ((S.x = (r / i) * 2 - 1),
              (S.y = -((o / a) * 2) + 1),
              T.set(S.x, S.y, 1).unproject(n.object).sub(n.object.position).normalize());
          }
          function F(e) {
            return Math.max(n.minDistance, Math.min(n.maxDistance, e));
          }
          function q(e) {
            y.set(e.clientX, e.clientY);
          }
          function U(e) {
            E.set(e.clientX, e.clientY);
          }
          function V() {
            if (1 == A.length) y.set(A[0].pageX, A[0].pageY);
            else {
              let e = 0.5 * (A[0].pageX + A[1].pageX),
                t = 0.5 * (A[0].pageY + A[1].pageY);
              y.set(e, t);
            }
          }
          function B() {
            if (1 == A.length) E.set(A[0].pageX, A[0].pageY);
            else {
              let e = 0.5 * (A[0].pageX + A[1].pageX),
                t = 0.5 * (A[0].pageY + A[1].pageY);
              E.set(e, t);
            }
          }
          function X() {
            let e = A[0].pageX - A[1].pageX,
              t = A[0].pageY - A[1].pageY,
              n = Math.sqrt(e * e + t * t);
            O.set(0, n);
          }
          function Z(e) {
            if (1 == A.length) w.set(e.pageX, e.pageY);
            else {
              let t = er(e),
                n = 0.5 * (e.pageX + t.x),
                r = 0.5 * (e.pageY + t.y);
              w.set(n, r);
            }
            j.subVectors(w, y).multiplyScalar(n.rotateSpeed);
            let t = n.domElement;
            (t &&
              (L((2 * Math.PI * j.x) / t.clientHeight), R((2 * Math.PI * j.y) / t.clientHeight)),
              y.copy(w));
          }
          function W(e) {
            if (1 == A.length) P.set(e.pageX, e.pageY);
            else {
              let t = er(e),
                n = 0.5 * (e.pageX + t.x),
                r = 0.5 * (e.pageY + t.y);
              P.set(n, r);
            }
            (C.subVectors(P, E).multiplyScalar(n.panSpeed), N(C.x, C.y), E.copy(P));
          }
          function K(e) {
            var t;
            let r = er(e),
              o = e.pageX - r.x,
              i = e.pageY - r.y,
              a = Math.sqrt(o * o + i * i);
            (x.set(0, a),
              M.set(0, Math.pow(x.y / O.y, n.zoomSpeed)),
              (t = M.y),
              H(b / t),
              O.copy(x));
          }
          function $(e) {
            var t, r, i;
            !1 !== n.enabled &&
              (0 === A.length &&
                (null == (t = n.domElement) || t.ownerDocument.addEventListener("pointermove", G),
                null == (r = n.domElement) || r.ownerDocument.addEventListener("pointerup", Q)),
              (i = e),
              A.push(i),
              "touch" === e.pointerType
                ? (function (e) {
                    switch ((en(e), A.length)) {
                      case 1:
                        switch (n.touches.ONE) {
                          case a.wtR.ROTATE:
                            if (!1 === n.enableRotate) return;
                            (V(), (s = l.TOUCH_ROTATE));
                            break;
                          case a.wtR.PAN:
                            if (!1 === n.enablePan) return;
                            (B(), (s = l.TOUCH_PAN));
                            break;
                          default:
                            s = l.NONE;
                        }
                        break;
                      case 2:
                        switch (n.touches.TWO) {
                          case a.wtR.DOLLY_PAN:
                            if (!1 === n.enableZoom && !1 === n.enablePan) return;
                            (n.enableZoom && X(), n.enablePan && B(), (s = l.TOUCH_DOLLY_PAN));
                            break;
                          case a.wtR.DOLLY_ROTATE:
                            if (!1 === n.enableZoom && !1 === n.enableRotate) return;
                            (n.enableZoom && X(),
                              n.enableRotate && V(),
                              (s = l.TOUCH_DOLLY_ROTATE));
                            break;
                          default:
                            s = l.NONE;
                        }
                        break;
                      default:
                        s = l.NONE;
                    }
                    s !== l.NONE && n.dispatchEvent(o);
                  })(e)
                : (function (e) {
                    let t;
                    switch (e.button) {
                      case 0:
                        t = n.mouseButtons.LEFT;
                        break;
                      case 1:
                        t = n.mouseButtons.MIDDLE;
                        break;
                      case 2:
                        t = n.mouseButtons.RIGHT;
                        break;
                      default:
                        t = -1;
                    }
                    switch (t) {
                      case a.kBv.DOLLY:
                        if (!1 === n.enableZoom) return;
                        (Y(e), O.set(e.clientX, e.clientY), (s = l.DOLLY));
                        break;
                      case a.kBv.ROTATE:
                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                          if (!1 === n.enablePan) return;
                          (U(e), (s = l.PAN));
                        } else {
                          if (!1 === n.enableRotate) return;
                          (q(e), (s = l.ROTATE));
                        }
                        break;
                      case a.kBv.PAN:
                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                          if (!1 === n.enableRotate) return;
                          (q(e), (s = l.ROTATE));
                        } else {
                          if (!1 === n.enablePan) return;
                          (U(e), (s = l.PAN));
                        }
                        break;
                      default:
                        s = l.NONE;
                    }
                    s !== l.NONE && n.dispatchEvent(o);
                  })(e));
          }
          function G(e) {
            !1 !== n.enabled &&
              ("touch" === e.pointerType
                ? (function (e) {
                    switch ((en(e), s)) {
                      case l.TOUCH_ROTATE:
                        if (!1 === n.enableRotate) return;
                        (Z(e), n.update());
                        break;
                      case l.TOUCH_PAN:
                        if (!1 === n.enablePan) return;
                        (W(e), n.update());
                        break;
                      case l.TOUCH_DOLLY_PAN:
                        if (!1 === n.enableZoom && !1 === n.enablePan) return;
                        (n.enableZoom && K(e), n.enablePan && W(e), n.update());
                        break;
                      case l.TOUCH_DOLLY_ROTATE:
                        if (!1 === n.enableZoom && !1 === n.enableRotate) return;
                        (n.enableZoom && K(e), n.enableRotate && Z(e), n.update());
                        break;
                      default:
                        s = l.NONE;
                    }
                  })(e)
                : (function (e) {
                    if (!1 !== n.enabled)
                      switch (s) {
                        case l.ROTATE:
                          if (!1 === n.enableRotate) return;
                          (w.set(e.clientX, e.clientY),
                            j.subVectors(w, y).multiplyScalar(n.rotateSpeed));
                          let t = n.domElement;
                          (t &&
                            (L((2 * Math.PI * j.x) / t.clientHeight),
                            R((2 * Math.PI * j.y) / t.clientHeight)),
                            y.copy(w),
                            n.update());
                          break;
                        case l.DOLLY:
                          var r, o;
                          if (!1 === n.enableZoom) return;
                          ((x.set(e.clientX, e.clientY), M.subVectors(x, O), M.y > 0)
                            ? ((r = I()), H(b / r))
                            : M.y < 0 && ((o = I()), H(b * o)),
                            O.copy(x),
                            n.update());
                          break;
                        case l.PAN:
                          if (!1 === n.enablePan) return;
                          (P.set(e.clientX, e.clientY),
                            C.subVectors(P, E).multiplyScalar(n.panSpeed),
                            N(C.x, C.y),
                            E.copy(P),
                            n.update());
                      }
                  })(e));
          }
          function Q(e) {
            var t, r, o;
            ((function (e) {
              delete _[e.pointerId];
              for (let t = 0; t < A.length; t++)
                if (A[t].pointerId == e.pointerId) return void A.splice(t, 1);
            })(e),
              0 === A.length &&
                (null == (t = n.domElement) || t.releasePointerCapture(e.pointerId),
                null == (r = n.domElement) || r.ownerDocument.removeEventListener("pointermove", G),
                null == (o = n.domElement) || o.ownerDocument.removeEventListener("pointerup", Q)),
              n.dispatchEvent(i),
              (s = l.NONE));
          }
          function J(e) {
            if (!1 !== n.enabled && !1 !== n.enableZoom && (s === l.NONE || s === l.ROTATE)) {
              var t, r;
              (e.preventDefault(),
                n.dispatchEvent(o),
                (Y(e), e.deltaY < 0)
                  ? ((t = I()), H(b * t))
                  : e.deltaY > 0 && ((r = I()), H(b / r)),
                n.update(),
                n.dispatchEvent(i));
            }
          }
          function ee(e) {
            if (!1 !== n.enabled && !1 !== n.enablePan) {
              let t = !1;
              switch (e.code) {
                case n.keys.UP:
                  (N(0, n.keyPanSpeed), (t = !0));
                  break;
                case n.keys.BOTTOM:
                  (N(0, -n.keyPanSpeed), (t = !0));
                  break;
                case n.keys.LEFT:
                  (N(n.keyPanSpeed, 0), (t = !0));
                  break;
                case n.keys.RIGHT:
                  (N(-n.keyPanSpeed, 0), (t = !0));
              }
              t && (e.preventDefault(), n.update());
            }
          }
          function et(e) {
            !1 !== n.enabled && e.preventDefault();
          }
          function en(e) {
            let t = _[e.pointerId];
            (void 0 === t && ((t = new a.I9Y()), (_[e.pointerId] = t)), t.set(e.pageX, e.pageY));
          }
          function er(e) {
            return _[(e.pointerId === A[0].pointerId ? A[1] : A[0]).pointerId];
          }
          ((this.dollyIn = (e = I()) => {
            (H(b * e), n.update());
          }),
            (this.dollyOut = (e = I()) => {
              (H(b / e), n.update());
            }),
            (this.getScale = () => b),
            (this.setScale = (e) => {
              (H(e), n.update());
            }),
            (this.getZoomScale = () => I()),
            void 0 !== t && this.connect(t),
            this.update());
        }
      }
      let m = i.forwardRef(
        (
          {
            makeDefault: e,
            camera: t,
            regress: n,
            domElement: a,
            enableDamping: l = !0,
            keyEvents: s = !1,
            onChange: c,
            onStart: u,
            onEnd: p,
            ...d
          },
          f,
        ) => {
          let m = (0, o.C)((e) => e.invalidate),
            v = (0, o.C)((e) => e.camera),
            b = (0, o.C)((e) => e.gl),
            g = (0, o.C)((e) => e.events),
            y = (0, o.C)((e) => e.setEvents),
            w = (0, o.C)((e) => e.set),
            j = (0, o.C)((e) => e.get),
            E = (0, o.C)((e) => e.performance),
            P = t || v,
            C = a || g.connected || b.domElement,
            O = i.useMemo(() => new h(P), [P]);
          return (
            (0, o.D)(() => {
              O.enabled && O.update();
            }, -1),
            i.useEffect(
              () => (s && O.connect(!0 === s ? C : s), O.connect(C), () => void O.dispose()),
              [s, C, n, O, m],
            ),
            i.useEffect(() => {
              let e = (e) => {
                  (m(), n && E.regress(), c && c(e));
                },
                t = (e) => {
                  u && u(e);
                },
                r = (e) => {
                  p && p(e);
                };
              return (
                O.addEventListener("change", e),
                O.addEventListener("start", t),
                O.addEventListener("end", r),
                () => {
                  (O.removeEventListener("start", t),
                    O.removeEventListener("end", r),
                    O.removeEventListener("change", e));
                }
              );
            }, [c, u, p, O, m, y]),
            i.useEffect(() => {
              if (e) {
                let e = j().controls;
                return (w({ controls: O }), () => w({ controls: e }));
              }
            }, [e, O]),
            i.createElement("primitive", (0, r.A)({ ref: f, object: O, enableDamping: l }, d))
          );
        },
      );
    },
  },
]);

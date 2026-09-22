"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4628],
  {
    4336: (e, t, n) => {
      n.d(t, { $N: () => l, AT: () => d, cr: () => a, y5: () => c });
      var r = n(95155),
        i = n(12115),
        o = n(24708);
      let a = (0, i.createContext)(null);
      function l(e, t) {
        let n = { ...e };
        for (let r of Object.keys(t)) {
          let i = t[r];
          null != i &&
            ("object" != typeof i ||
            Array.isArray(i) ||
            "object" != typeof e[r] ||
            Array.isArray(e[r])
              ? (n[r] = i)
              : (n[r] = l(e[r], i)));
        }
        return n;
      }
      let s = "mcblock_renderer_config";
      function c() {
        let [e, t] = (0, i.useState)(() => {
          let e = (function () {
            try {
              let e = localStorage.getItem(s);
              if (!e) return null;
              let { data: t, ts: n } = JSON.parse(e);
              if (Date.now() - n > 3e5) return null;
              return t;
            } catch (e) {
              return null;
            }
          })();
          return e ? l(o.S, e) : o.S;
        });
        return (
          (0, i.useEffect)(() => {
            let e = !1;
            return (
              (async function () {
                try {
                  let r = await fetch("/api/settings/renderer-config");
                  if (!r.ok) return;
                  let i = await r.json();
                  if (e) return;
                  if (i.success && i.data) {
                    var n = i.data;
                    try {
                      localStorage.setItem(s, JSON.stringify({ data: n, ts: Date.now() }));
                    } catch (e) {}
                    t(l(o.S, i.data));
                  }
                } catch (e) {}
              })(),
              () => {
                e = !0;
              }
            );
          }, []),
          e
        );
      }
      function d(e) {
        let { children: t } = e,
          n = c();
        return (0, r.jsx)(a.Provider, { value: n, children: t });
      }
    },
    5838: (e, t, n) => {
      n.d(t, { $i: () => g, AA: () => u, Kg: () => p, sK: () => h, yh: () => m });
      var r = n(95155),
        i = n(12115),
        o = n(53279),
        a = n(59040),
        l = n(85339),
        s = n(24708),
        c = n(4336);
      function d() {
        let e = (0, i.useContext)(c.cr);
        return null != e ? e : s.S;
      }
      function u() {
        let e = d(),
          t = (0, i.useRef)(null);
        return (
          (0, i.useEffect)(() => {
            let n = t.current;
            n &&
              (n.position.set(...e.mainLight.position),
              (n.intensity = e.mainLight.intensity),
              n.color.set(e.mainLight.color),
              (n.castShadow = e.mainLight.castShadow),
              n.shadow.mapSize.set(e.mainLight.shadowMapSize, e.mainLight.shadowMapSize),
              (n.shadow.camera.left = -e.mainLight.shadowCameraBounds),
              (n.shadow.camera.right = e.mainLight.shadowCameraBounds),
              (n.shadow.camera.top = e.mainLight.shadowCameraBounds),
              (n.shadow.camera.bottom = -e.mainLight.shadowCameraBounds),
              n.shadow.camera.updateProjectionMatrix(),
              n.shadow.map && (n.shadow.map.dispose(), (n.shadow.map = null)),
              (n.shadow.needsUpdate = !0));
          }, [
            e.mainLight.position,
            e.mainLight.intensity,
            e.mainLight.color,
            e.mainLight.castShadow,
            e.mainLight.shadowMapSize,
            e.mainLight.shadowCameraBounds,
          ]),
          (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsx)("ambientLight", { intensity: e.ambientLight.intensity }),
              (0, r.jsx)("hemisphereLight", {
                args: [
                  e.hemisphereLight.skyColor,
                  e.hemisphereLight.groundColor,
                  e.hemisphereLight.intensity,
                ],
              }),
              (0, r.jsx)("directionalLight", {
                ref: t,
                position: e.mainLight.position,
                intensity: e.mainLight.intensity,
                color: e.mainLight.color,
                castShadow: e.mainLight.castShadow,
                "shadow-mapSize-width": e.mainLight.shadowMapSize,
                "shadow-mapSize-height": e.mainLight.shadowMapSize,
                "shadow-camera-left": -e.mainLight.shadowCameraBounds,
                "shadow-camera-right": e.mainLight.shadowCameraBounds,
                "shadow-camera-top": e.mainLight.shadowCameraBounds,
                "shadow-camera-bottom": -e.mainLight.shadowCameraBounds,
              }),
              (0, r.jsx)("directionalLight", {
                position: e.fillLight.position,
                intensity: e.fillLight.intensity,
                color: e.fillLight.color,
              }),
            ],
          })
        );
      }
      function h() {
        let e = d();
        return e.grid.visible
          ? (0, r.jsx)(o.x, {
              args: [200, 200],
              cellSize: e.grid.cellSize,
              cellThickness: e.grid.cellThickness,
              cellColor: e.grid.cellColor,
              sectionSize: e.grid.sectionSize,
              sectionThickness: e.grid.sectionThickness,
              sectionColor: e.grid.sectionColor,
              fadeDistance: e.grid.fadeDistance,
              fadeStrength: e.grid.fadeStrength,
              infiniteGrid: !0,
              position: [0, -0.01, 0],
              "material-opacity": e.grid.opacity,
              "material-transparent": e.grid.opacity < 1,
            })
          : null;
      }
      let f = { None: l.y_p, ACESFilmic: l.FV, Reinhard: l.Mjd, Linear: l.kyO };
      function g(e) {
        let t = null != e ? e : s.S;
        return {
          shadows: t.renderer.shadows,
          dpr: t.renderer.dpr,
          gl: { antialias: !0, alpha: !1, powerPreference: "high-performance" },
        };
      }
      function m(e, t, n) {
        var r;
        let i = null != n ? n : s.S;
        ((t.background = new l.Q1f(i.background)),
          (e.toneMapping = null != (r = f[i.renderer.toneMapping]) ? r : l.FV),
          (e.toneMappingExposure = i.renderer.toneMappingExposure));
      }
      function p() {
        let e = d(),
          t = (0, a.C)((e) => e.scene);
        return (
          (0, i.useEffect)(() => {
            t.background instanceof l.Q1f
              ? t.background.set(e.background)
              : (t.background = new l.Q1f(e.background));
          }, [t, e.background]),
          null
        );
      }
    },
    18082: (e, t, n) => {
      n.d(t, { W: () => s });
      var r = n(95155),
        i = n(12115),
        o = n(59040),
        a = n(99101),
        l = n(85339);
      let s = (0, i.forwardRef)(function (e, t) {
        let {
            enabled: n,
            moveSpeed: s = 5,
            lookSpeed: c = 1,
            boundingBox: d,
            onLock: u,
            onUnlock: h,
            speedRef: f,
            onToolWheel: g,
            onSpeedChange: m,
          } = e,
          { camera: p, gl: w } = (0, o.C)(),
          y = (0, i.useRef)(null),
          b = (0, i.useId)();
        ((0, i.useLayoutEffect)(() => {
          if (!n) return;
          let e = w.domElement,
            t = "data-mcb-pointer-lock",
            r = e.getAttribute(t);
          return (
            e.setAttribute(t, b),
            () => {
              null === r ? e.removeAttribute(t) : e.setAttribute(t, r);
            }
          );
        }, [n, w, b]),
          (0, i.useImperativeHandle)(
            t,
            () => ({
              lock: () => {
                try {
                  var e;
                  null == (e = y.current) || e.lock();
                } catch (e) {}
              },
              unlock: () => {
                try {
                  var e;
                  null == (e = y.current) || e.unlock();
                } catch (e) {}
              },
              isLocked: () => {
                var e;
                return !!(null == (e = y.current) ? void 0 : e.isLocked);
              },
            }),
            [],
          ));
        let S = (0, i.useRef)({}),
          v = (0, i.useRef)(s);
        (0, i.useEffect)(() => {
          v.current = s;
        }, [s]);
        let L = (0, i.useRef)(new l.Pq0()),
          x = (0, i.useRef)(new l.Pq0()),
          k = (0, i.useRef)(new l.Pq0());
        ((0, i.useEffect)(() => {
          if (!n) {
            S.current = {};
            return;
          }
          let e = (e) => {
              S.current[e.code] = !0;
            },
            t = (e) => {
              S.current[e.code] = !1;
            };
          return (
            window.addEventListener("keydown", e),
            window.addEventListener("keyup", t),
            () => {
              (window.removeEventListener("keydown", e), window.removeEventListener("keyup", t));
            }
          );
        }, [n]),
          (0, i.useEffect)(() => {
            if (!n) return;
            let e = (e) => {
                var t;
                if (null == (t = y.current) ? void 0 : t.isLocked)
                  if ((e.preventDefault(), g && !e.shiftKey)) g(e.deltaY > 0 ? 1 : -1);
                  else {
                    let t = e.deltaY > 0 ? 0.85 : 1.18;
                    ((v.current = Math.round(Math.max(4, Math.min(60, v.current * t)))),
                      f && (f.current = v.current),
                      null == m || m(v.current));
                  }
              },
              t = w.domElement;
            return (
              t.addEventListener("wheel", e, { passive: !1 }),
              () => t.removeEventListener("wheel", e)
            );
          }, [n, w, f, g, m]),
          (0, o.D)((e, t) => {
            if (!n) return;
            let r = S.current,
              i = v.current * t,
              o = !!r.KeyW - !!r.KeyS,
              a = !!r.KeyD - !!r.KeyA,
              s = !!r.Space - (r.ShiftLeft || r.ShiftRight ? 1 : 0);
            if (
              (0 !== o || 0 !== a || 0 !== s) &&
              (p.getWorldDirection(x.current),
              (x.current.y = 0),
              x.current.normalize(),
              k.current.crossVectors(x.current, p.up).normalize(),
              L.current.set(0, 0, 0),
              L.current.addScaledVector(x.current, o),
              L.current.addScaledVector(k.current, a),
              (L.current.y += s),
              L.current.length() > 0 && L.current.normalize(),
              p.position.addScaledVector(L.current, i),
              d)
            ) {
              let e = d.clone().expandByScalar(1.5 * d.getSize(new l.Pq0()).length());
              p.position.clamp(e.min, e.max);
            }
          }));
        let C = (0, i.useCallback)(() => {
            null == u || u();
          }, [u]),
          E = (0, i.useCallback)(() => {
            null == h || h();
          }, [h]);
        return n
          ? (0, r.jsx)(a.Z, {
              ref: y,
              selector: '[data-mcb-pointer-lock="'.concat(b, '"]'),
              onLock: C,
              onUnlock: E,
            })
          : null;
      });
    },
    24708: (e, t, n) => {
      n.d(t, { S: () => r });
      let r = {
        background: "#3D3D3D",
        ambientLight: { intensity: 0.8 },
        hemisphereLight: { skyColor: "#87CEEB", groundColor: "#444444", intensity: 0.6 },
        mainLight: {
          position: [-100, 151, 50],
          intensity: 4,
          color: "#fffbf0",
          castShadow: !0,
          shadowMapSize: 2048,
          shadowCameraBounds: 60,
        },
        fillLight: { position: [-30, 40, -30], intensity: 0.3, color: "#ffffff" },
        grid: {
          cellSize: 1,
          cellThickness: 1,
          cellColor: "#575757",
          sectionSize: 12,
          sectionThickness: 0.8,
          sectionColor: "#808080",
          fadeDistance: 270,
          fadeStrength: 1,
          visible: !0,
          opacity: 1,
        },
        renderer: {
          toneMapping: "ACESFilmic",
          toneMappingExposure: 1.5,
          dpr: [1, 1.5],
          shadows: !0,
        },
        camera: { fov: 50, near: 0.1, far: 5e3 },
        postProcessing: {
          enabled: !1,
          bloom: {
            enabled: !1,
            intensity: 0.35,
            luminanceThreshold: 0.86,
            luminanceSmoothing: 0.12,
            mipmapBlur: !0,
          },
          vignette: { enabled: !1, offset: 0.3, darkness: 0.7 },
          outline: {
            enabled: !1,
            edgeStrength: 2.5,
            visibleEdgeColor: "#000000",
            hiddenEdgeColor: "#000000",
            blur: !1,
            xRay: !0,
          },
        },
        fog: {
          enabled: !1,
          type: "exponential",
          color: "#3D3D3D",
          near: 50,
          far: 200,
          density: 0.01,
        },
        emissive: { enabled: !0, intensity: 1.8 },
      };
    },
    33622: (e, t, n) => {
      n.d(t, { A: () => d });
      var r = n(95155),
        i = n(12115),
        o = n(85571),
        a = n(43646),
        l = n(85339),
        s = n(95626);
      function c(e) {
        let { position: t, color: n } = e,
          { edgeGeo: o, edgeMat: a } = (0, i.useMemo)(() => {
            let e = new l.iNn(1.01, 1.01, 1.01),
              t = new l.TDQ(e);
            return (
              e.dispose(),
              {
                edgeGeo: t,
                edgeMat: new l.mrM({ color: n, transparent: !0, opacity: 0.9, depthTest: !1 }),
              }
            );
          }, [n]);
        return (
          (0, i.useEffect)(
            () => () => {
              (o.dispose(), a.dispose());
            },
            [o, a],
          ),
          (0, r.jsx)("lineSegments", {
            geometry: o,
            material: a,
            position: [t[0] + 0.5, t[1] + 0.5, t[2] + 0.5],
            renderOrder: 999,
          })
        );
      }
      function d(e) {
        let { pointA: t, pointB: n, confirmed: d } = e,
          u = (0, i.useMemo)(
            () =>
              t && n
                ? (function (e, t) {
                    let n = [],
                      r = new l.Pq0(e[0] + 0.5, e[1] + 0.5, e[2] + 0.5),
                      i = new l.Pq0(t[0] + 0.5, t[1] + 0.5, t[2] + 0.5),
                      o = Math.max(0, Math.abs(t[0] - e[0]) - 1);
                    if (Math.abs(t[0] - e[0]) > 0) {
                      let e = r.clone();
                      e.x = i.x;
                      let t = new l.Pq0().lerpVectors(r, e, 0.5);
                      (n.push({ axis: "x", from: r.clone(), to: e, mid: t, distance: o }), (r = e));
                    }
                    let a = Math.max(0, Math.abs(t[1] - e[1]) - 1);
                    if (Math.abs(t[1] - e[1]) > 0) {
                      let e = r.clone();
                      e.y = i.y;
                      let t = new l.Pq0().lerpVectors(r, e, 0.5);
                      (n.push({ axis: "y", from: r.clone(), to: e, mid: t, distance: a }), (r = e));
                    }
                    let s = Math.max(0, Math.abs(t[2] - e[2]) - 1);
                    if (Math.abs(t[2] - e[2]) > 0) {
                      let e = r.clone();
                      e.z = i.z;
                      let t = new l.Pq0().lerpVectors(r, e, 0.5);
                      (n.push({ axis: "z", from: r.clone(), to: e, mid: t, distance: s }), (r = e));
                    }
                    return n;
                  })(t, n)
                : [],
            [
              null == t ? void 0 : t[0],
              null == t ? void 0 : t[1],
              null == t ? void 0 : t[2],
              null == n ? void 0 : n[0],
              null == n ? void 0 : n[1],
              null == n ? void 0 : n[2],
            ],
          ),
          h = d ? 1 : 0.5;
        return t
          ? (0, r.jsxs)("group", {
              children: [
                u.map((e, t) =>
                  (0, r.jsxs)(
                    i.Fragment,
                    {
                      children: [
                        (0, r.jsx)(o.N, {
                          points: [e.from, e.to],
                          color: s.r[e.axis],
                          lineWidth: 2.5,
                          transparent: !0,
                          opacity: h,
                          depthTest: !1,
                          renderOrder: 998,
                        }),
                        (0, r.jsx)(a.E, {
                          position: e.mid,
                          center: !0,
                          zIndexRange: [100, 0],
                          style: { pointerEvents: "none" },
                          children: (0, r.jsxs)("div", {
                            style: {
                              background: s.r[e.axis],
                              opacity: h,
                              color: "#fff",
                              fontSize: "11px",
                              fontWeight: 800,
                              padding: "1px 6px",
                              borderRadius: "3px",
                              border: "1.5px solid rgba(0,0,0,0.4)",
                              whiteSpace: "nowrap",
                              fontFamily: "monospace",
                              userSelect: "none",
                            },
                            children: ["间距 ", e.distance, " 格"],
                          }),
                        }),
                      ],
                    },
                    t,
                  ),
                ),
                (0, r.jsx)(c, { position: t, color: "#48bf36" }),
                n && (0, r.jsx)(c, { position: n, color: "#E05050" }),
              ],
            })
          : null;
      }
    },
    45360: (e, t, n) => {
      n.d(t, { I: () => d });
      var r = n(95155),
        i = n(12115),
        o = n(59040),
        a = n(38381),
        l = n(85339),
        s = n(24708),
        c = n(4336);
      function d() {
        var e;
        let t = (null != (e = (0, i.useContext)(c.cr)) ? e : s.S).postProcessing,
          n = t.enabled && t.bloom.enabled && t.bloom.intensity > 0,
          d = t.enabled && t.vignette.enabled && t.vignette.darkness > 0,
          u = t.enabled && t.outline.enabled,
          h = (function (e) {
            let { scene: t } = (0, o.C)();
            return (0, i.useMemo)(() => {
              if (!e) return [];
              let n = [];
              return (
                t.traverse((e) => {
                  (e instanceof l.eaF || e instanceof l.ZLX) && n.push(e);
                }),
                n
              );
            }, [e, t.children.length]);
          })(u),
          f = [];
        return n || d || (u && h.length > 0)
          ? (n &&
              f.push(
                (0, r.jsx)(
                  a.mK,
                  {
                    intensity: t.bloom.intensity,
                    luminanceThreshold: t.bloom.luminanceThreshold,
                    luminanceSmoothing: t.bloom.luminanceSmoothing,
                    mipmapBlur: t.bloom.mipmapBlur,
                  },
                  "bloom",
                ),
              ),
            d &&
              f.push(
                (0, r.jsx)(
                  a.fE,
                  { offset: t.vignette.offset, darkness: t.vignette.darkness },
                  "vignette",
                ),
              ),
            u &&
              h.length > 0 &&
              f.push(
                (0, r.jsx)(
                  a.Rc,
                  {
                    selection: h,
                    edgeStrength: t.outline.edgeStrength,
                    visibleEdgeColor: Number.parseInt(t.outline.visibleEdgeColor.slice(1), 16),
                    hiddenEdgeColor: Number.parseInt(t.outline.hiddenEdgeColor.slice(1), 16),
                    blur: t.outline.blur,
                    xRay: t.outline.xRay,
                  },
                  "outline",
                ),
              ),
            (0, r.jsx)(a.s0, { children: f }))
          : null;
      }
    },
    46422: (e, t, n) => {
      n.d(t, { H7: () => l, IO: () => a, _0: () => o, gG: () => i });
      var r = n(59431);
      function i(e, t, n) {
        var i, o;
        let a = new Map();
        if (
          !e ||
          0 === e.length ||
          !t ||
          0 === t.length ||
          n <= 0 ||
          !t.some((e) => Array.isArray(e.entities))
        )
          return a;
        let l = new Map();
        for (let e = 0; e < t.length; e++)
          for (let n of null != (i = t[e].entities) ? i : []) l.set(n, e);
        let s = (0, r.K2)(e);
        for (let t = 0; t < e.length; t++)
          (0, r.KO)(e[t]) && a.set(s[t], null != (o = l.get(s[t])) ? o : n - 1);
        return a;
      }
      function o(e, t, n) {
        let o = new Map(),
          a = i(e, t, n);
        if (!e || 0 === a.size) return o;
        let l = (0, r.K2)(e);
        for (let t = 0; t < e.length; t++) {
          let n = a.get(l[t]);
          void 0 !== n && o.set(e[t], n);
        }
        return o;
      }
      function a(e, t, n, r) {
        return "step" === n && void 0 !== t
          ? t > r
          : ("layer" === n || "step" === n) && r >= 0 && Math.floor(e) > r;
      }
      function l(e) {
        return Array.isArray(e) ? { entities: e.filter((e) => "string" == typeof e) } : {};
      }
    },
    95626: (e, t, n) => {
      n.d(t, { r: () => r });
      let r = { x: "#E53935", y: "#43A047", z: "#1E88E5" };
    },
  },
]);

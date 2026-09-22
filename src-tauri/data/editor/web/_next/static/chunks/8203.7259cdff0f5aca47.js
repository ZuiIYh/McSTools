"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8203],
  {
    28203: (e, t, n) => {
      (n.r(t), n.d(t, { default: () => h }));
      var o = n(95155),
        l = n(12115),
        i = n(85339),
        r = n(59040),
        s = n(37578),
        u = n(8652),
        c = n(84817),
        a = n(28857),
        d = n(15409),
        p = n(86709),
        f = n(93429),
        m = n(65227),
        b = n(18514),
        k = n(37879);
      function h(e) {
        let {
            model: t,
            highlightedBlockId: n,
            selectedBlockPosition: i,
            selectedPositions: u,
            hoverPosition: p,
            hoverColor: f,
            hiddenLayers: m,
            hiddenPositions: b,
            layerCutoff: h,
            layerMode: y = "slice",
            onBlockClick: M,
            onBlockPointerDown: w,
            onBlockHover: E,
            onEntityClick: C,
            onResourceError: T,
            interactionResetKey: P = 0,
            explodeSpacing: S = 0,
            explodeMinY: j = 0,
            emissiveConfig: N,
            showGenericEntities: O = !0,
          } = e,
          { camera: A } = (0, r.C)(),
          B = (0, l.useRef)(null),
          [R, Y] = (0, l.useState)(null),
          [D, K] = (0, l.useState)(null),
          z = (0, l.useRef)(!1);
        (0, l.useEffect)(() => {
          let e = !1;
          return (
            (0, s.y6)()
              .then((t) => {
                e || (Y(t), K(null));
              })
              .catch((t) => {
                if (e) return;
                let n = (0, s.c2)(t);
                (console.error("MC 资源初始化失败:", t), K(n), null == T || T(n));
              }),
            () => {
              e = !0;
            }
          );
        }, [T]);
        let L = (0, l.useMemo)(
            () =>
              (function (e) {
                let t = new Map(),
                  n = new Map();
                for (let t of e.blocks)
                  n.set(
                    "".concat(t.position[0], ",").concat(t.position[1], ",").concat(t.position[2]),
                    t,
                  );
                for (let o of e.blocks) {
                  let e = (0, a.yN)(o, n),
                    l = Object.keys(e).length > 0 ? JSON.stringify(e, Object.keys(e).sort()) : "{}",
                    i = "".concat(o.blockId, "|").concat(l),
                    r = t.get(i);
                  if (!r) {
                    let n = (0, d.T)(o.blockId, e);
                    ((r = {
                      variantKey: i,
                      blockId: o.blockId,
                      properties: e,
                      blocks: [],
                      needsAlphaTest: n.needsAlphaTest,
                      needsTransparent: n.needsTransparent,
                      needsEmissive: n.needsEmissive,
                      emissiveColor: n.emissiveColor,
                      visualProfile: n,
                    }),
                      t.set(i, r));
                  }
                  r.blocks.push(o);
                }
                return Array.from(t.values());
              })(t),
            [t],
          ),
          W = (0, l.useMemo)(
            () =>
              R
                ? (0, c.s)(
                    (function (e) {
                      let t = new Map();
                      for (let n of e)
                        t.set(n.variantKey, {
                          variantKey: n.variantKey,
                          blockId: n.blockId,
                          properties: n.properties,
                          instances: n.blocks.map((e, t) => ({
                            block: e,
                            stepIndex: 0,
                            layerIndex: e.position[1],
                            instanceIndex: t,
                          })),
                          stepCumulativeCounts: [n.blocks.length],
                          layerCumulativeCounts: [n.blocks.length],
                          needsAlphaTest: n.needsAlphaTest,
                          needsTransparent: n.needsTransparent,
                          needsEmissive: n.needsEmissive,
                          emissiveColor: n.emissiveColor,
                          visualProfile: n.visualProfile,
                        });
                      return t;
                    })(L),
                    R,
                  )
                : null,
            [L, R],
          );
        (0, l.useEffect)(
          () => () => {
            if (W) for (let [, e] of W) e.geometry.dispose();
          },
          [W],
        );
        let U = (0, l.useMemo)(() => (R ? (0, s.b3)() : null), [R]),
          q = (0, l.useCallback)(
            (e) => {
              let [t, n, o] = e;
              return (
                !(
                  (null == m ? void 0 : m.has(n)) ||
                  (null == b ? void 0 : b.has("".concat(t, ",").concat(n, ",").concat(o)))
                ) &&
                (null == h || ("gallery" === y ? n === h : n <= h))
              );
            },
            [m, b, h, y],
          ),
          X = i && q(i) ? i : null,
          _ = (0, l.useMemo)(() => {
            if (!u || 0 === u.size) return u;
            let e = new Set();
            for (let t of u) {
              let [n, o, l] = t.split(",").map(Number);
              ![n, o, l].some(Number.isNaN) && q([n, o, l]) && e.add(t);
            }
            return e;
          }, [u, q]),
          G = p && q(p) ? p : null;
        return ((0, l.useEffect)(() => {
          if (!R || !W || 0 === L.length || z.current) return;
          let { position: e, target: n } = (function (e, t, n) {
            let [o, l, i] = e,
              r = (function (e, t, n) {
                let o = Math.max(...e),
                  l = null != t ? t : window.innerWidth,
                  i = null != n ? n : window.innerHeight,
                  r = l < 768;
                return r && i > l ? 2.2 * o : r ? 2 * o : 1.5 * o;
              })(e, void 0, void 0);
            return { position: [0.7 * r, 0.8 * r, 0.7 * r], target: [o / 2, l / 2, i / 2] };
          })(t.size);
          (A.position.set(...e),
            A.lookAt(...n),
            "updateProjectionMatrix" in A && A.updateProjectionMatrix(),
            (z.current = !0));
        }, [R, W, L, t.size, A]),
        !D && R && U && W)
          ? (0, o.jsxs)("group", {
              ref: B,
              children: [
                L.map((e, t) => {
                  let l = W.get(e.variantKey);
                  return l
                    ? (0, o.jsx)(
                        v,
                        {
                          group: e,
                          geometry: l.geometry,
                          atlasTexture: U,
                          highlighted: n === e.blockId,
                          dimmed: null !== n && n !== e.blockId,
                          selectedPositions: u,
                          hoverPosition: p,
                          hiddenLayers: m,
                          hiddenPositions: b,
                          layerCutoff: h,
                          layerMode: y,
                          onBlockClick: M,
                          onBlockPointerDown: w,
                          onBlockHover: E,
                          interactionResetKey: P,
                          meshIndex: t,
                          explodeSpacing: S,
                          explodeMinY: j,
                          emissiveConfig: N,
                        },
                        e.variantKey,
                      )
                    : null;
                }),
                (0, o.jsx)(k.h, {
                  entities: t.entities,
                  hiddenLayers: m,
                  hiddenPositions: b,
                  layerCutoff: h,
                  layerMode: y,
                  explodeSpacing: S,
                  explodeMinY: j,
                  onEntityClick: C,
                  resources: R,
                  atlasTexture: U,
                  showGenericEntities: O,
                }),
                (0, o.jsx)(g, {
                  position: X,
                  model: t,
                  resources: R,
                  explodeSpacing: S,
                  explodeMinY: j,
                }),
                (0, o.jsx)(x, { positions: _, explodeSpacing: S, explodeMinY: j }),
                (0, o.jsx)(I, {
                  model: t,
                  resources: R,
                  positions: _,
                  color: 0x9cff57,
                  lineWidth: 4,
                  opacity: 1,
                  depthTest: !1,
                  renderOrder: 990,
                  explodeSpacing: S,
                  explodeMinY: j,
                }),
                G &&
                  (0, o.jsx)(I, {
                    model: t,
                    resources: R,
                    positions: new Set(["".concat(G[0], ",").concat(G[1], ",").concat(G[2])]),
                    color: null != f ? f : 0xffd166,
                    lineWidth: 3.5,
                    opacity: 1,
                    depthTest: !1,
                    renderOrder: 995,
                    explodeSpacing: S,
                    explodeMinY: j,
                  }),
              ],
            })
          : null;
      }
      function g(e) {
        let { position: t, model: n, resources: i, explodeSpacing: s = 0, explodeMinY: c = 0 } = e,
          d = (0, l.useRef)(null),
          [p, f] = (0, l.useState)(null),
          m = (0, l.useRef)(null);
        return ((0, l.useEffect)(() => {
          let e = new b.C();
          return (
            (d.current = e),
            f(e.getObject3D()),
            () => {
              var t;
              (e.dispose(),
                (d.current = null),
                f(null),
                null == (t = m.current) || t.dispose(),
                (m.current = null));
            }
          );
        }, []),
        (0, l.useEffect)(() => {
          var e;
          let o = d.current;
          if (!o) return;
          if (!t) return void o.setVisible(!1);
          let l = n.blocks.find(
            (e) => e.position[0] === t[0] && e.position[1] === t[1] && e.position[2] === t[2],
          );
          if ((null == (e = m.current) || e.dispose(), (m.current = null), l)) {
            let e = new Map();
            for (let t of n.blocks)
              e.set(
                "".concat(t.position[0], ",").concat(t.position[1], ",").concat(t.position[2]),
                t,
              );
            let t = (0, u.qA)(l.blockId, (0, a.yN)(l, e), i);
            ((m.current = t), o.setGeometry(t));
          } else o.resetGeometry();
          let r = t[1] + (t[1] - c) * s;
          o.setPosition(t[0], r, t[2]);
        }, [t, n, i, s, c]),
        (0, r.D)((e) => {
          var t;
          let { clock: n } = e;
          null == (t = d.current) || t.updateTime(n.getElapsedTime());
        }),
        p)
          ? (0, o.jsx)("primitive", { object: p })
          : null;
      }
      function v(e) {
        let {
            group: t,
            geometry: n,
            atlasTexture: s,
            highlighted: u,
            dimmed: c,
            selectedPositions: a,
            hoverPosition: d,
            hiddenLayers: b,
            hiddenPositions: k,
            layerCutoff: h,
            layerMode: g = "slice",
            onBlockClick: v,
            onBlockPointerDown: y,
            onBlockHover: x,
            interactionResetKey: I = 0,
            meshIndex: M,
            explodeSpacing: w = 0,
            explodeMinY: E = 0,
            emissiveConfig: C,
          } = e,
          T = (0, l.useRef)(null),
          P = (0, l.useRef)(0),
          S = (0, l.useRef)(null),
          j = (0, l.useRef)(null),
          N = (0, l.useMemo)(() => {
            let e = b && b.size > 0,
              n = k && k.size > 0,
              o = null != h;
            return e || n || o
              ? t.blocks.filter((t) => {
                  if (
                    (e && b.has(t.position[1])) ||
                    (n &&
                      k.has(
                        ""
                          .concat(t.position[0], ",")
                          .concat(t.position[1], ",")
                          .concat(t.position[2]),
                      ))
                  )
                    return !1;
                  if (o) {
                    if ("gallery" === g) {
                      if (t.position[1] !== h) return !1;
                    } else if (t.position[1] > h) return !1;
                  }
                  return !0;
                })
              : t.blocks;
          }, [t.blocks, b, k, h, g]),
          O = (0, l.useRef)(t.blocks.length);
        t.blocks.length > O.current && (O.current = t.blocks.length);
        let A = O.current;
        N.length;
        let B = (0, l.useMemo)(() => {
          let e = (0, p.p)(t.blockId),
            n = (0, f.o)(t.blockId);
          return (0, m.fu)({
            kind: "lambert",
            atlasTexture: s,
            visualProfile: t.visualProfile,
            emissiveConfig: C,
            animationConfig: e,
            emissionMaskConfig: n,
            defaultSide: i.$EB,
          });
        }, [
          s,
          t.blockId,
          t.visualProfile,
          null == C ? void 0 : C.enabled,
          null == C ? void 0 : C.intensity,
        ]);
        ((0, r.D)((e) => {
          let { clock: t } = e;
          (0, m.eL)(B, t.getElapsedTime());
        }),
          (0, l.useEffect)(() => {
            let e = T.current;
            if (!e) return;
            let t = new i.kn4().makeScale(0, 0, 0),
              n = new i.kn4();
            for (let t = 0; t < N.length; t++) {
              let [o, l, i] = N[t].position,
                r = l + (l - E) * w;
              (n.makeTranslation(o, r, i), e.setMatrixAt(t, n));
            }
            for (let n = N.length; n < A; n++) e.setMatrixAt(n, t);
            ((e.count = N.length),
              (e.instanceMatrix.needsUpdate = !0),
              e.geometry && e.geometry.computeBoundingBox(),
              e.geometry && e.geometry.computeBoundingSphere(),
              e.computeBoundingSphere(),
              e.computeBoundingBox(),
              e.updateMatrixWorld(!0));
          }, [N, A, w, E]),
          (0, l.useEffect)(() => {
            let e = T.current;
            e && (e.instanceColor = null);
          }, [N]),
          (0, l.useEffect)(() => {
            (0, m.SD)(B, t.visualProfile, { highlighted: u, dimmed: c, emissiveConfig: C });
          }, [
            u,
            c,
            B,
            t.visualProfile,
            null == C ? void 0 : C.enabled,
            null == C ? void 0 : C.intensity,
          ]),
          (0, l.useEffect)(
            () => () => {
              B.dispose();
            },
            [B],
          ));
        let R = (0, l.useCallback)(() => {
          var e;
          (null == (e = j.current) || e.call(j), (j.current = null));
        }, []);
        (0, l.useEffect)(() => {
          (R(), (S.current = null));
        }, [N, n, v, I, R]);
        let Y = (0, l.useCallback)(
          (e, t, n, o) => {
            let l = S.current;
            ((S.current = null), R());
            let i = l ? { instanceId: l.instanceId, block: l.block } : o;
            if (i) {
              if (
                l &&
                o &&
                (l.block.position[0] !== o.block.position[0] ||
                  l.block.position[1] !== o.block.position[1] ||
                  l.block.position[2] !== o.block.position[2] ||
                  l.block.blockId !== o.block.blockId)
              )
                return;
              if (l) {
                let n = e - l.x,
                  o = t - l.y,
                  i = Math.sqrt(n * n + o * o),
                  r = "touch" === l.pointerType;
                if (i > (r ? 20 : 5) || (r && performance.now() - l.time > 400)) return;
              }
              null == v || v(i.block.blockId, i.block.position, i.instanceId, M, n);
            }
          },
          [R, M, v],
        );
        return ((0, l.useEffect)(
          () => () => {
            (R(), (S.current = null));
          },
          [R],
        ),
        0 === A)
          ? null
          : (0, o.jsx)("instancedMesh", {
              ref: T,
              args: [void 0, void 0, A],
              geometry: n,
              material: B,
              frustumCulled: !1,
              castShadow: !0,
              receiveShadow: !0,
              onPointerDown: (e) => {
                if (2 === e.button && void 0 !== e.instanceId) {
                  let t = N[e.instanceId];
                  t && (null == y || y(t.blockId, t.position, e.button, e.clientX, e.clientY));
                  return;
                }
                if (0 !== e.button || !v || void 0 === e.instanceId) {
                  ((S.current = null), R());
                  return;
                }
                let t = N[e.instanceId];
                if (!t) {
                  ((S.current = null), R());
                  return;
                }
                (e.stopPropagation(), R());
                let n = "number" == typeof e.pointerId ? e.pointerId : null,
                  o = e.pointerType || "mouse";
                S.current = {
                  instanceId: e.instanceId,
                  block: t,
                  x: e.clientX,
                  y: e.clientY,
                  pointerId: n,
                  time: performance.now(),
                  pointerType: o,
                };
                let l = (e) => {
                  let t = S.current;
                  ((null == t ? void 0 : t.pointerId) == null || e.pointerId === t.pointerId) &&
                    Y(e.clientX, e.clientY, e.ctrlKey);
                };
                (window.addEventListener("pointerup", l, { once: !0 }),
                  (j.current = () => {
                    window.removeEventListener("pointerup", l);
                  }));
              },
              onPointerUp: (e) => {
                var t, n;
                if (0 !== e.button || !v) return;
                let o = void 0 !== e.instanceId ? N[e.instanceId] : null;
                (e.stopPropagation(),
                  Y(
                    e.clientX,
                    e.clientY,
                    null != (n = null == (t = e.nativeEvent) ? void 0 : t.ctrlKey) && n,
                    o && void 0 !== e.instanceId ? { instanceId: e.instanceId, block: o } : void 0,
                  ));
              },
              onPointerMove: x
                ? (e) => {
                    if (void 0 === e.instanceId) return;
                    let t = performance.now();
                    if (t - P.current < 33) return;
                    ((P.current = t), e.stopPropagation());
                    let n = N[e.instanceId];
                    n && x(n.position);
                  }
                : void 0,
              onPointerLeave: () => {
                null == x || x(null);
              },
              userData: { blockId: t.blockId, meshIndex: M },
            });
      }
      let y = (() => {
        let e = new i.iNn(1, 1, 1);
        e.translate(0.5, 0.5, 0.5);
        let t = new i.TDQ(e).attributes.position.array;
        return (e.dispose(), t);
      })();
      function x(e) {
        let { positions: t, explodeSpacing: n = 0, explodeMinY: r = 0 } = e,
          s = (0, l.useRef)(null),
          u = (0, l.useMemo)(() => {
            if (!t || 0 === t.size) return [];
            let e = [];
            for (let n of t) {
              if (e.length >= 4e3) break;
              let [t, o, l] = n.split(",").map(Number);
              [t, o, l].some(Number.isNaN) || e.push([t, o, l]);
            }
            return e;
          }, [t]),
          c = (0, l.useMemo)(() => new i.iNn(1.035, 1.035, 1.035), []),
          a = (0, l.useMemo)(
            () =>
              new i.V9B({
                color: 9240378,
                transparent: !0,
                opacity: 0.26,
                depthWrite: !1,
                depthTest: !0,
                polygonOffset: !0,
                polygonOffsetFactor: -8,
                polygonOffsetUnits: -8,
              }),
            [],
          );
        return ((0, l.useEffect)(
          () => () => {
            (c.dispose(), a.dispose());
          },
          [c, a],
        ),
        (0, l.useEffect)(() => {
          let e = s.current;
          if (!e) return;
          let t = new i.kn4();
          for (let o = 0; o < u.length; o += 1) {
            let [l, i, s] = u[o],
              c = i + (i - r) * n;
            (t.makeTranslation(l + 0.5, c + 0.5, s + 0.5), e.setMatrixAt(o, t));
          }
          ((e.count = u.length), (e.instanceMatrix.needsUpdate = !0), e.computeBoundingSphere());
        }, [u, n, r]),
        0 === u.length)
          ? null
          : (0, o.jsx)("instancedMesh", {
              ref: s,
              args: [void 0, void 0, 4e3],
              geometry: c,
              material: a,
              renderOrder: 970,
              frustumCulled: !1,
              raycast: () => {},
            });
      }
      function I(e) {
        let {
            model: t,
            resources: n,
            positions: r,
            color: s,
            lineWidth: c = 2,
            opacity: d = 0.9,
            depthTest: p = !0,
            renderOrder: f = 980,
            explodeSpacing: m = 0,
            explodeMinY: b = 0,
          } = e,
          k = (0, l.useRef)(null),
          h = (0, l.useRef)(null),
          g = (0, l.useMemo)(() => {
            if (!r || 0 === r.size) return null;
            let e = new Map();
            for (let n of t.blocks)
              e.set(
                "".concat(n.position[0], ",").concat(n.position[1], ",").concat(n.position[2]),
                n,
              );
            let o = [];
            for (let t of r) {
              let [r, s, c] = t.split(",").map(Number),
                d = s + (s - b) * m,
                p = e.get(t);
              if (p) {
                var l;
                let t = (0, u.qA)(p.blockId, (0, a.yN)(p, e), n),
                  s = new i.TDQ(t, 1),
                  f = null == (l = s.getAttribute("position")) ? void 0 : l.array;
                if (f)
                  for (let e = 0; e < f.length; e += 3)
                    o.push(f[e] + r, f[e + 1] + d, f[e + 2] + c);
                (s.dispose(), t.dispose());
              } else
                for (let e = 0; e < y.length; e += 3) o.push(y[e] + r, y[e + 1] + d, y[e + 2] + c);
            }
            if (0 === o.length) return null;
            let s = new i.LoY();
            return (s.setAttribute("position", new i.qtW(o, 3)), s);
          }, [r, t, n, m, b]);
        return ((0, l.useEffect)(() => {
          var e;
          (null == (e = h.current) || e.dispose(), (h.current = g));
        }, [g]),
        (0, l.useEffect)(
          () => () => {
            var e;
            null == (e = h.current) || e.dispose();
          },
          [],
        ),
        g)
          ? (0, o.jsx)("lineSegments", {
              ref: k,
              geometry: g,
              renderOrder: f,
              frustumCulled: !1,
              raycast: () => {},
              children: (0, o.jsx)("lineBasicMaterial", {
                color: s,
                linewidth: c,
                transparent: !0,
                opacity: d,
                depthTest: p,
                depthWrite: !1,
                polygonOffset: !0,
                polygonOffsetFactor: -5,
                polygonOffsetUnits: -5,
              }),
            })
          : null;
      }
    },
  },
]);

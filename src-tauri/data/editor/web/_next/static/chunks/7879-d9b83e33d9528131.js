"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7879],
  {
    15409: (e, o, i) => {
      i.d(o, { T: () => r });
      var t = i(46397);
      function r(e) {
        let o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = (0, t.a9)(e, t.bD),
          r = (0, t.a9)(e, t.cO),
          n = (0, t.D9)(e, o),
          s = (0, t.a9)(e, t.nK) && n.needsEmissive;
        return {
          blockId: e,
          properties: { ...o },
          needsAlphaTest: i,
          needsDoubleSide: (0, t.d)(e),
          needsTransparent: r,
          needsEmissive: s,
          emissiveColor: n.color,
          emissiveIntensityMultiplier: n.intensityMultiplier,
          emissiveLuminanceThreshold: n.luminanceThreshold,
          emissiveLuminanceSoftness: n.luminanceSoftness,
          alphaTest: 0.1 * !!i,
          transparent: r,
          opacity: r ? 0.7 : 1,
          highlightedOpacity: r ? 0.85 : 1,
          depthWrite: !0,
          polygonOffset: i,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1,
          forceSinglePass: i,
        };
      }
    },
    18514: (e, o, i) => {
      i.d(o, { C: () => a, D: () => n });
      var t = i(85339),
        r = i(31588);
      let n = { px: 1, nx: 2, py: 4, ny: 8, pz: 16, nz: 32 },
        s = "\n#include <packing>\n#define MAX_R "
          .concat(
            8,
            "\nuniform sampler2D uMask;\nuniform vec2 uMaskTexel;\nuniform vec4 uRect;\nuniform float uInner;\nuniform float uOuter;\nuniform float uDpr;\nuniform float uNear;\nuniform float uFar;\nuniform float uOrtho;\nuniform float uPxWorld;\nuniform float uHidden;\nuniform float uTime;\nuniform vec3 uGold;\nuniform vec3 uWhite;\n\n// p：矩形内的像素坐标（像素中心 = 整数 + 0.5）→ (是否盖住, 深度)\nvec2 maskAt(vec2 p) {\n  if (p.x < 0.0 || p.y < 0.0 || p.x >= uRect.z || p.y >= uRect.w) return vec2(0.0, 1.0);\n  vec4 s = texture2D(uMask, p * uMaskTexel);\n  return vec2(s.a, unpackRGBToDepth(s.rgb));\n}\n\n#define TRY(o) { float d2 = dot(o, o); if (d2 < best2 && d2 <= r2) { vec2 m = maskAt(p + (o)); if (m.x > 0.5) { best2 = d2; depth = m.y; } } }\n\nvoid main() {\n  vec2 p = gl_FragCoord.xy - uRect.xy;\n  vec2 self = maskAt(p);\n  float best2 = 1e6;\n  float depth = 1.0;\n  float r2 = uOuter * uOuter;\n  if (self.x > 0.5) {\n    best2 = 0.0;\n    depth = self.y;\n  } else {\n    // 按方环由内往外找最近的遮罩像素：第 k 圈的像素离中心至少 k，找到的已经不超过 k+1 就不用再往外\n    for (int k = 1; k <= MAX_R; k++) {\n      float fk = float(k);\n      if (fk > uOuter) break;\n      for (int i = -MAX_R; i <= MAX_R; i++) {\n        if (i < -k || i > k) continue;\n        float fi = float(i);\n        TRY(vec2(fi, fk))\n        TRY(vec2(fi, -fk))\n        if (i > -k && i < k) {\n          TRY(vec2(fk, fi))\n          TRY(vec2(-fk, fi))\n        }\n      }\n      if (best2 <= (fk + 1.0) * (fk + 1.0)) break;\n    }\n    if (best2 > r2) discard;\n  }\n\n  float dist = sqrt(best2);\n  vec4 color;\n  if (best2 < 0.5) {\n    // 物体本身：屏幕空间斜纹（远近一样密，不会混叠成一块）；被挡住的部分不铺\n    if (uHidden > 0.5) discard;\n    float diag = (gl_FragCoord.x + gl_FragCoord.y) / uDpr;\n    float f = fract((diag + uTime * ",
          )
          .concat("10.0", ") / ")
          .concat(
            "10.0",
            ");\n    float stripe = 1.0 - smoothstep(0.16, 0.28, abs(f - 0.5));\n    color = vec4(uGold, mix(0.14, 0.55, stripe) * (0.9 + 0.1 * sin(uTime * 3.0)));\n  } else {\n    // 金边贴着物体、白边在外；外沿 1px 渐隐，斜边不起锯齿\n    float breath = 0.75 + 0.25 * sin(uTime * 3.0);\n    float a = clamp(uOuter + 0.5 - dist, 0.0, 1.0) * breath;\n    color = vec4(dist <= uInner + 0.5 ? uGold : uWhite, a * (uHidden > 0.5 ? ",
          )
          .concat(
            "0.38",
            " : 1.0));\n  }\n\n  // 深度 = 最近那个遮罩像素的深度，往相机拉：底数 0.02 格 + 每离开物体 1px 拉 2 个像素宽\n  // （斜着看同一平面上的邻居方块，深度随像素变化；这点余量盖住约 60\xb0 以内的斜度，边不会和邻居抢深度而闪）\n  float viewZ = uOrtho > 0.5 ? orthographicDepthToViewZ(depth, uNear, uFar) : perspectiveDepthToViewZ(depth, uNear, uFar);\n  float pxWorld = uOrtho > 0.5 ? uPxWorld : -viewZ * uPxWorld;\n  viewZ = min(viewZ + 0.02 + (dist + 1.0) * pxWorld * 2.0, -uNear * 1.0001);\n  gl_FragDepth = uOrtho > 0.5 ? viewZToOrthographicDepth(viewZ, uNear, uFar) : viewZToPerspectiveDepth(viewZ, uNear, uFar);\n\n  gl_FragColor = color;\n  #include <colorspace_fragment>\n}\n",
          );
      class a {
        setGeometry(e) {
          var o, i, t;
          let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (e.boundingBox || e.computeBoundingBox(), (this.geometry = e), this.mask.setGeometry(e));
          let n = null != (o = r.map) ? o : null,
            s = this.maskMaterial.uniforms;
          ((s.uMap.value = n),
            (s.uUseMap.value = n && (null != (i = r.alphaTest) ? i : 0) > 0 ? 1 : 0),
            (s.uAlphaTest.value = null != (t = r.alphaTest) ? t : 0.5),
            n && (n.matrixAutoUpdate && n.updateMatrix(), s.uMapTransform.value.copy(n.matrix)));
        }
        resetGeometry() {
          this.setGeometry(this.defaultGeometry);
        }
        setCulledFaces(e) {
          let o = this.maskMaterial.uniforms;
          (o.uCullPos.value.set(e & n.px ? 1 : 0, e & n.py ? 1 : 0, e & n.pz ? 1 : 0),
            o.uCullNeg.value.set(e & n.nx ? 1 : 0, e & n.ny ? 1 : 0, e & n.nz ? 1 : 0));
        }
        setPosition(e, o, i) {
          (this.group.position.set(e, o, i), (this.group.visible = !0));
        }
        getObject3D() {
          return this.group;
        }
        updateTime(e) {
          this.uniforms.uTime.value = e;
        }
        setVisible(e) {
          this.group.visible = e;
        }
        dispose() {
          (this.defaultGeometry.dispose(),
            this.compositeGeometry.dispose(),
            this.maskMaterial.dispose(),
            this.hiddenMaterial.dispose(),
            this.visibleMaterial.dispose(),
            this.mask.dispose());
        }
        collapse() {
          this.uniforms.uNdcRect.value.set(0, 0, 0, 0);
        }
        renderMask(e, o) {
          var i, t;
          let r = e.getPixelRatio(),
            n = Math.min(3.5 * r, 8),
            s = this.mask.render(e, o, this.group.matrixWorld, this.geometry.boundingBox, n);
          if (!s) return void this.collapse();
          let a = this.uniforms;
          ((a.uMask.value = this.mask.texture),
            a.uMaskTexel.value.set(1 / this.mask.width, 1 / this.mask.height),
            a.uRect.value.set(s.x, s.y, s.w, s.h),
            a.uNdcRect.value.set(...s.ndc),
            (a.uInner.value = Math.min(2 * r, n)),
            (a.uOuter.value = n),
            (a.uDpr.value = r),
            (a.uNear.value = null != (i = o.near) ? i : 0.1),
            (a.uFar.value = null != (t = o.far) ? t : 1e3),
            (a.uOrtho.value = +!!o.isOrthographicCamera),
            (a.uPxWorld.value = 2 / (o.projectionMatrix.elements[5] * s.viewportHeight)));
        }
        constructor() {
          ((this.group = new t.YJl()),
            (this.group.name = "BlockSelectionOutline"),
            (this.defaultGeometry = new t.iNn(1, 1, 1)),
            this.defaultGeometry.translate(0.5, 0.5, 0.5),
            this.defaultGeometry.computeBoundingBox(),
            (this.geometry = this.defaultGeometry),
            (this.maskMaterial = new t.BKk({
              uniforms: {
                uMap: { value: null },
                uUseMap: { value: 0 },
                uAlphaTest: { value: 0.5 },
                uMapTransform: { value: new t.dwI() },
                uCullPos: { value: new t.Pq0() },
                uCullNeg: { value: new t.Pq0() },
              },
              vertexShader:
                "\nuniform mat3 uMapTransform;\nvarying vec2 vUv;\nvarying vec3 vLocal;\nvarying vec3 vLocalNormal;\n\nvoid main() {\n  vUv = (uMapTransform * vec3(uv, 1.0)).xy;\n  vLocal = position;\n  vLocalNormal = normal;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",
              fragmentShader:
                "\n#include <packing>\nuniform sampler2D uMap;\nuniform float uUseMap;\nuniform float uAlphaTest;\nuniform vec3 uCullPos;\nuniform vec3 uCullNeg;\nvarying vec2 vUv;\nvarying vec3 vLocal;\nvarying vec3 vLocalNormal;\n\nvoid main() {\n  // 紧贴实心邻居的那一面（方块几何在 [0,1] 局部空间，面落在边界平面上、法线朝外）\n  const float EDGE = 0.002;\n  vec3 n = vLocalNormal;\n  if ((uCullPos.x > 0.5 && n.x > 0.5 && vLocal.x > 1.0 - EDGE) || (uCullNeg.x > 0.5 && n.x < -0.5 && vLocal.x < EDGE)\n    || (uCullPos.y > 0.5 && n.y > 0.5 && vLocal.y > 1.0 - EDGE) || (uCullNeg.y > 0.5 && n.y < -0.5 && vLocal.y < EDGE)\n    || (uCullPos.z > 0.5 && n.z > 0.5 && vLocal.z > 1.0 - EDGE) || (uCullNeg.z > 0.5 && n.z < -0.5 && vLocal.z < EDGE)) discard;\n  if (uUseMap > 0.5 && texture2D(uMap, vUv).a < uAlphaTest) discard;\n  gl_FragColor = vec4(packDepthToRGB(gl_FragCoord.z), 1.0);\n}\n",
              side: t.$EB,
              blending: t.XIg,
            })),
            (this.mask = new r.r(this.maskMaterial)),
            this.mask.setGeometry(this.geometry),
            (this.uniforms = {
              uMask: { value: null },
              uMaskTexel: { value: new t.I9Y(1, 1) },
              uRect: { value: new t.IUQ() },
              uNdcRect: { value: new t.IUQ() },
              uInner: { value: 2 },
              uOuter: { value: 3.5 },
              uDpr: { value: 1 },
              uNear: { value: 0.1 },
              uFar: { value: 1e3 },
              uOrtho: { value: 0 },
              uPxWorld: { value: 0.001 },
              uTime: { value: 0 },
              uGold: { value: new t.Q1f(0xfbbf24) },
              uWhite: { value: new t.Q1f(0xffffff) },
            }));
          let e = (e) =>
            new t.BKk({
              uniforms: { ...this.uniforms, uHidden: { value: +!!e } },
              vertexShader: r.b,
              fragmentShader: s,
              transparent: !0,
              depthWrite: !1,
              depthTest: !0,
              depthFunc: e ? t.K52 : t.xSv,
            });
          ((this.hiddenMaterial = e(!0)),
            (this.visibleMaterial = e(!1)),
            (this.compositeGeometry = new t.bdM(2, 2)),
            (this.hiddenPass = new t.eaF(this.compositeGeometry, this.hiddenMaterial)),
            (this.hiddenPass.renderOrder = 990),
            (this.hiddenPass.frustumCulled = !1),
            (this.hiddenPass.raycast = () => {}),
            (this.hiddenPass.onBeforeRender = (e, o, i) => this.renderMask(e, i)),
            (this.visiblePass = new t.eaF(this.compositeGeometry, this.visibleMaterial)),
            (this.visiblePass.renderOrder = 991),
            (this.visiblePass.frustumCulled = !1),
            (this.visiblePass.raycast = () => {}),
            this.group.add(this.hiddenPass),
            this.group.add(this.visiblePass),
            (this.group.visible = !1));
        }
      }
    },
    31588: (e, o, i) => {
      i.d(o, { b: () => u, r: () => l });
      var t = i(85339);
      let r = new t.IUQ(),
        n = new t.IUQ(),
        s = new t.kn4(),
        a = new t.kn4(),
        d = new t.Q1f();
      class l {
        setGeometry(e) {
          this.mesh.geometry = e;
        }
        get texture() {
          var e, o;
          return null != (o = null == (e = this.target) ? void 0 : e.texture) ? o : null;
        }
        get width() {
          var e, o;
          return null != (o = null == (e = this.target) ? void 0 : e.width) ? o : 1;
        }
        get height() {
          var e, o;
          return null != (o = null == (e = this.target) ? void 0 : e.height) ? o : 1;
        }
        render(e, o, i, l, u) {
          e.getCurrentViewport(r);
          let c = r.z,
            m = r.w;
          if (c <= 0 || m <= 0) return null;
          s.multiplyMatrices(o.projectionMatrix, o.matrixWorldInverse).multiply(i);
          let x = 1 / 0,
            g = 1 / 0,
            p = -1 / 0,
            h = -1 / 0,
            f = 0;
          for (let e = 0; e < 8; e++) {
            if (
              (n
                .set(
                  1 & e ? l.max.x : l.min.x,
                  2 & e ? l.max.y : l.min.y,
                  4 & e ? l.max.z : l.min.z,
                  1,
                )
                .applyMatrix4(s),
              n.w <= 1e-6)
            ) {
              f++;
              continue;
            }
            let o = n.x / n.w,
              i = n.y / n.w;
            (o < x && (x = o), o > p && (p = o), i < g && (g = i), i > h && (h = i));
          }
          if (8 === f) return null;
          f > 0 && ((x = -1), (g = -1), (p = 1), (h = 1));
          let b = Math.ceil(u) + 2,
            y = Math.max(0, Math.floor((0.5 * x + 0.5) * c) - b),
            v = Math.max(0, Math.floor((0.5 * g + 0.5) * m) - b),
            _ = Math.min(c, Math.ceil((0.5 * p + 0.5) * c) + b),
            C = Math.min(m, Math.ceil((0.5 * h + 0.5) * m) + b),
            P = _ - y,
            z = C - v;
          if (P <= 0 || z <= 0) return null;
          let k = this.target;
          if (!k || k.width < P || k.height < z) {
            var w, S;
            let e = Math.min(
                c,
                64 *
                  Math.ceil(Math.max(P, null != (w = null == k ? void 0 : k.width) ? w : 0) / 64),
              ),
              o = Math.min(
                m,
                64 *
                  Math.ceil(Math.max(z, null != (S = null == k ? void 0 : k.height) ? S : 0) / 64),
              );
            k
              ? k.setSize(e, o)
              : ((k = new t.nWS(e, o, {
                  depthBuffer: !0,
                  stencilBuffer: !1,
                  generateMipmaps: !1,
                  minFilter: t.hxR,
                  magFilter: t.hxR,
                  samples: this.samples,
                })),
                (this.target = k));
          }
          let j = (y / c) * 2 - 1,
            T = (_ / c) * 2 - 1,
            R = (v / m) * 2 - 1,
            M = (C / m) * 2 - 1,
            O = 2 / (T - j),
            N = 2 / (M - R);
          (a.set(O, 0, 0, -((j + T) / 2) * O, 0, N, 0, -((R + M) / 2) * N, 0, 0, 1, 0, 0, 0, 0, 1),
            this.camera.projectionMatrix.multiplyMatrices(a, o.projectionMatrix),
            this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert(),
            this.camera.matrixWorld.copy(o.matrixWorld),
            this.camera.matrixWorldInverse.copy(o.matrixWorldInverse),
            this.mesh.matrixWorld.copy(i));
          let F = e.getRenderTarget(),
            E = e.getActiveCubeFace(),
            I = e.getActiveMipmapLevel(),
            J = e.autoClear,
            A = e.getClearAlpha(),
            U = e.shadowMap.autoUpdate;
          return (
            e.getClearColor(d),
            k.viewport.set(0, 0, P, z),
            k.scissor.set(0, 0, P, z),
            (k.scissorTest = !0),
            (e.shadowMap.autoUpdate = !1),
            (e.autoClear = !1),
            e.setRenderTarget(k),
            e.setClearColor(0, 0),
            e.state.buffers.depth.setMask(!0),
            e.clear(!0, !0, !1),
            e.render(this.scene, this.camera),
            e.setRenderTarget(F, E, I),
            e.setClearColor(d, A),
            (e.autoClear = J),
            (e.shadowMap.autoUpdate = U),
            {
              x: r.x + y,
              y: r.y + v,
              w: P,
              h: z,
              ndc: [j, R, T, M],
              viewportHeight: m,
              pixelRatio: e.getPixelRatio(),
            }
          );
        }
        dispose() {
          var e;
          (null == (e = this.target) || e.dispose(),
            (this.target = null),
            this.mesh.geometry.dispose());
        }
        constructor(e, o = 0) {
          ((this.samples = o),
            (this.target = null),
            (this.mesh = new t.eaF(new t.LoY(), e)),
            (this.mesh.matrixAutoUpdate = !1),
            (this.mesh.frustumCulled = !1),
            (this.mesh.raycast = () => {}),
            (this.scene = new t.Z58()),
            (this.scene.matrixWorldAutoUpdate = !1),
            this.scene.add(this.mesh),
            (this.camera = new t.i7d()),
            (this.camera.matrixAutoUpdate = !1),
            (this.camera.matrixWorldAutoUpdate = !1));
        }
      }
      let u =
        "\nuniform vec4 uNdcRect;\n\nvoid main() {\n  vec2 t = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(mix(uNdcRect.xy, uNdcRect.zw, t), 0.0, 1.0);\n}\n";
    },
    37879: (e, o, i) => {
      i.d(o, { A: () => V, h: () => eY });
      var t = i(95155),
        r = i(12115),
        n = i(85339),
        s = i(59040),
        a = i(46923),
        d = i(82084),
        l = i(37578),
        u = i(8652);
      let c = 1 / 32,
        m = 1 / 64,
        x = { scale: [0.5, 0.5, 0.5] },
        g = Math.PI / 180;
      function p(e) {
        switch (e) {
          case "north":
            return [0, Math.PI, 0];
          case "east":
            return [0, Math.PI / 2, 0];
          case "west":
            return [0, -Math.PI / 2, 0];
          case "up":
            return [-Math.PI / 2, 0, 0];
          case "down":
            return [Math.PI / 2, 0, 0];
          default:
            return [0, 0, 0];
        }
      }
      function h(e) {
        var o;
        let i = "minecraft:filled_map" === e.itemId ? (e.itemRotation % 4) * 2 : e.itemRotation,
          t = new n.kn4()
            .makeTranslation(0, 0, c)
            .multiply(new n.kn4().makeRotationZ(-(45 * i) * g));
        return "flat" === e.kind
          ? t.multiply(new n.kn4().makeTranslation(0, 0, m))
          : t
              .multiply(new n.kn4().makeRotationY(Math.PI))
              .multiply(new n.kn4().makeScale(0.5, 0.5, 0.5))
              .multiply(
                (function (e) {
                  var o, i, t;
                  let r = null != (o = null == e ? void 0 : e.translation) ? o : [0, 0, 0],
                    s = null != (i = null == e ? void 0 : e.rotation) ? i : [0, 0, 0],
                    a = null != (t = null == e ? void 0 : e.scale) ? t : [1, 1, 1];
                  return new n.kn4().compose(
                    new n.Pq0(r[0] / 16, r[1] / 16, r[2] / 16),
                    new n.PTz().setFromEuler(new n.O9p(s[0] * g, s[1] * g, s[2] * g, "XYZ")),
                    new n.Pq0(a[0], a[1], a[2]),
                  );
                })(null != (o = e.fixed) ? o : x),
              )
              .multiply(new n.kn4().makeTranslation(-0.5, -0.5, -0.5));
      }
      var f = i(65227),
        b = i(15409);
      let y = () => {},
        v = new WeakMap(),
        _ = new WeakMap();
      function C(e, o) {
        let i = Object.keys(o)
          .sort()
          .map((e) => "".concat(e, "=").concat(o[e]));
        return i.length > 0 ? "".concat(e, "[").concat(i.join(","), "]") : e;
      }
      function P(e, o, i, t) {
        let r = e.get(o);
        if (!r) {
          let t = i();
          if (!t) return { value: null, release: y };
          ((r = { value: t, refs: 0, disposeTimer: null }), e.set(o, r));
        }
        (r.disposeTimer && (clearTimeout(r.disposeTimer), (r.disposeTimer = null)), (r.refs += 1));
        let n = r,
          s = !1;
        return {
          value: n.value,
          release: () => {
            !s &&
              ((s = !0),
              (n.refs = Math.max(0, n.refs - 1)),
              n.refs > 0 ||
                (n.disposeTimer = setTimeout(() => {
                  n.refs > 0 || e.get(o) !== n || (e.delete(o), t(n.value));
                }, 0)));
          },
        };
      }
      function z(e, o, i, t) {
        var r;
        let n = v.get(i);
        n || ((n = new Map()), v.set(i, n));
        let s = P(
          n,
          C(e, o),
          () => {
            try {
              return (0, u.qA)(e, o, i);
            } catch (e) {
              return null;
            }
          },
          (e) => e.dispose(),
        );
        return (null == t ? void 0 : t.rejectMagentaFallback) &&
          (null == (r = s.value) ? void 0 : r.userData.magentaFallback)
          ? (s.release(), { value: null, release: y })
          : s;
      }
      function k(e, o, i) {
        let t = _.get(i);
        return (
          t || ((t = new Map()), _.set(i, t)),
          P(
            t,
            C(e, o),
            () =>
              (0, f.fu)({
                kind: "lambert",
                atlasTexture: i,
                visualProfile: (0, b.T)(e, o),
                defaultSide: n.$EB,
              }),
            (e) => e.dispose(),
          )
        );
      }
      var w = i(46422);
      let S = {
          ancient_debris: "minecraft:block/ancient_debris_side",
          azalea: "minecraft:block/azalea_side",
          barrel: "minecraft:block/barrel_side",
          basalt: "minecraft:block/basalt_side",
          bee_nest: "minecraft:block/bee_nest_front",
          beehive: "minecraft:block/beehive_front",
          big_dripleaf: "minecraft:block/big_dripleaf_side",
          blast_furnace: "minecraft:block/blast_furnace_side",
          bone_block: "minecraft:block/bone_block_side",
          cactus: "minecraft:block/cactus_side",
          calibrated_sculk_sensor: "minecraft:block/sculk_sensor_side",
          cartography_table: "minecraft:block/cartography_table_top",
          chain_command_block: "minecraft:block/chain_command_block_side",
          chipped_anvil: "minecraft:block/chipped_anvil_top",
          chiseled_bookshelf: "minecraft:block/chiseled_bookshelf_side",
          command_block: "minecraft:block/command_block_side",
          composter: "minecraft:block/composter_side",
          copper_golem_statue: "minecraft:block/copper_block",
          crafter: "minecraft:block/crafter_north",
          crafting_table: "minecraft:block/crafting_table_front",
          damaged_anvil: "minecraft:block/damaged_anvil_top",
          daylight_detector: "minecraft:block/daylight_detector_side",
          decorated_pot: "minecraft:entity/decorated_pot/decorated_pot_side",
          dirt_path: "minecraft:block/dirt_path_side",
          dispenser: "minecraft:block/dispenser_front",
          dried_ghast: "minecraft:block/dried_ghast_hydration_0_top",
          dried_kelp_block: "minecraft:block/dried_kelp_side",
          dropper: "minecraft:block/dropper_front",
          enchanting_table: "minecraft:block/enchanting_table_top",
          end_portal_frame: "minecraft:block/end_portal_frame_side",
          exposed_copper_golem_statue: "minecraft:block/exposed_copper",
          fletching_table: "minecraft:block/fletching_table_front",
          flowering_azalea: "minecraft:block/flowering_azalea_side",
          furnace: "minecraft:block/furnace_side",
          grass_block: "minecraft:block/grass_block_side",
          grindstone: "minecraft:block/grindstone_side",
          hay_block: "minecraft:block/hay_block_side",
          heavy_weighted_pressure_plate: "minecraft:block/gold_block",
          honey_block: "minecraft:block/honey_block_side",
          infested_chiseled_stone_bricks: "minecraft:block/chiseled_stone_bricks",
          infested_cobblestone: "minecraft:block/cobblestone",
          infested_cracked_stone_bricks: "minecraft:block/cracked_stone_bricks",
          infested_deepslate: "minecraft:block/deepslate",
          infested_mossy_stone_bricks: "minecraft:block/mossy_stone_bricks",
          infested_stone: "minecraft:block/stone",
          infested_stone_bricks: "minecraft:block/stone_bricks",
          jigsaw: "minecraft:block/jigsaw_top",
          jukebox: "minecraft:block/jukebox_top",
          large_fern: "minecraft:block/large_fern_top",
          lectern: "minecraft:block/lectern_front",
          light_weighted_pressure_plate: "minecraft:block/iron_block",
          lilac: "minecraft:block/lilac_top",
          lodestone: "minecraft:block/lodestone_side",
          loom: "minecraft:block/loom_front",
          magma_block: "minecraft:block/magma",
          mangrove_roots: "minecraft:block/mangrove_roots_side",
          melon: "minecraft:block/melon_side",
          muddy_mangrove_roots: "minecraft:block/muddy_mangrove_roots_side",
          mycelium: "minecraft:block/mycelium_side",
          observer: "minecraft:block/observer_front",
          ochre_froglight: "minecraft:block/ochre_froglight_side",
          oxidized_copper_golem_statue: "minecraft:block/oxidized_copper",
          pearlescent_froglight: "minecraft:block/pearlescent_froglight_side",
          peony: "minecraft:block/peony_top",
          petrified_oak_slab: "minecraft:block/oak_planks",
          piston: "minecraft:block/piston_top",
          podzol: "minecraft:block/podzol_side",
          polished_basalt: "minecraft:block/polished_basalt_side",
          pumpkin: "minecraft:block/pumpkin_side",
          quartz_block: "minecraft:block/quartz_block_side",
          quartz_slab: "minecraft:block/quartz_block_side",
          quartz_stairs: "minecraft:block/quartz_block_side",
          reinforced_deepslate: "minecraft:block/reinforced_deepslate_side",
          repeating_command_block: "minecraft:block/repeating_command_block_side",
          respawn_anchor: "minecraft:block/respawn_anchor_side0",
          rose_bush: "minecraft:block/rose_bush_top",
          scaffolding: "minecraft:block/scaffolding_side",
          sculk_catalyst: "minecraft:block/sculk_catalyst_side",
          sculk_sensor: "minecraft:block/sculk_sensor_side",
          sculk_shrieker: "minecraft:block/sculk_shrieker_side",
          small_dripleaf: "minecraft:block/small_dripleaf_top",
          smithing_table: "minecraft:block/smithing_table_front",
          smoker: "minecraft:block/smoker_side",
          smooth_quartz: "minecraft:block/quartz_block_bottom",
          smooth_quartz_slab: "minecraft:block/quartz_block_bottom",
          smooth_quartz_stairs: "minecraft:block/quartz_block_bottom",
          smooth_red_sandstone: "minecraft:block/red_sandstone_top",
          smooth_red_sandstone_slab: "minecraft:block/red_sandstone_top",
          smooth_red_sandstone_stairs: "minecraft:block/red_sandstone_top",
          smooth_sandstone: "minecraft:block/sandstone_top",
          smooth_sandstone_slab: "minecraft:block/sandstone_top",
          smooth_sandstone_stairs: "minecraft:block/sandstone_top",
          snow_block: "minecraft:block/snow",
          sticky_piston: "minecraft:block/piston_top_sticky",
          stonecutter: "minecraft:block/stonecutter_side",
          sunflower: "minecraft:block/sunflower_front",
          suspicious_gravel: "minecraft:block/suspicious_gravel_0",
          suspicious_sand: "minecraft:block/suspicious_sand_0",
          tall_grass: "minecraft:block/tall_grass_top",
          target: "minecraft:block/target_top",
          test_block: "minecraft:block/test_block_accept",
          tnt: "minecraft:block/tnt_side",
          trial_spawner: "minecraft:block/trial_spawner_side_inactive",
          twisting_vines: "minecraft:block/twisting_vines_plant",
          vault: "minecraft:block/vault_side_off",
          verdant_froglight: "minecraft:block/verdant_froglight_side",
          weathered_copper_golem_statue: "minecraft:block/weathered_copper",
          weeping_vines: "minecraft:block/weeping_vines_plant",
        },
        j = {
          crossbow: "minecraft:item/crossbow_standby",
          debug_stick: "minecraft:item/stick",
          enchanted_golden_apple: "minecraft:item/golden_apple",
          shield: "minecraft:entity/shield/base",
          tipped_arrow: "minecraft:item/tipped_arrow_head",
        },
        T = [
          ["_fence_gate", ["_planks", ""]],
          ["_pressure_plate", ["_planks", ""]],
          ["_stairs", ["_planks", "", "s", "_block"]],
          ["_slab", ["_planks", "", "s", "_block"]],
          ["_button", ["_planks", ""]],
          ["_carpet", ["_wool", "_block"]],
          ["_fence", ["_planks", "s", ""]],
          ["_hyphae", ["_stem"]],
          ["_wall", ["", "s", "_block"]],
          ["_pane", ["", "s"]],
          ["_wood", ["_log"]],
        ],
        R = {
          chest: "minecraft:entity/chest/normal",
          copper_chest: "minecraft:entity/chest/copper",
          ender_chest: "minecraft:entity/chest/ender",
          exposed_copper_chest: "minecraft:entity/chest/copper_exposed",
          oxidized_copper_chest: "minecraft:entity/chest/copper_oxidized",
          trapped_chest: "minecraft:entity/chest/trapped",
          weathered_copper_chest: "minecraft:entity/chest/copper_weathered",
        };
      function M(e) {
        if (!e) return null;
        let o = e.replace("minecraft:", ""),
          i = R[o.startsWith("waxed_") ? o.slice(6) : o];
        return i
          ? [
              {
                textureId: i,
                crop: [0.65625, 8.25 / 16, 0.875, 0.671875],
                rotation: 180,
                rect: [0, 4 / 14, 1, 1],
              },
              {
                textureId: i,
                crop: [0.65625, 3.5 / 16, 0.875, 4.75 / 16],
                rotation: 180,
                rect: [0, 0, 1, 5 / 14],
              },
              {
                textureId: i,
                crop: [1 / 16, 0.25 / 16, 1.5 / 16, 1.25 / 16],
                rotation: 180,
                rect: [6 / 14, 3 / 14, 8 / 14, 0.5],
              },
            ]
          : null;
      }
      var O = i(56624);
      let N = new WeakMap(),
        F = () => {},
        E = new WeakMap();
      function I(e) {
        return (
          (e &&
            Object.keys(e)
              .sort()
              .map((o) => "".concat(o, ":").concat(e[o].map((e) => Number(e.toFixed(6))).join(",")))
              .join("|")) ||
          "static"
        );
      }
      function J(e) {
        var o;
        let {
            model: i,
            textureId: s,
            resources: a,
            atlasTexture: l,
            textureLayers: u,
            poseOverrides: c,
            opacity: m = 1,
            color: x = 0xffffff,
            polygonOffset: g = !1,
            modelScale: p = 1,
            fallback: h = null,
            children: f,
          } = e,
          b = I(c),
          y = null != (o = null == u ? void 0 : u.join("|")) ? o : "",
          [v, _] = (0, r.useState)(null),
          C = (null == v ? void 0 : v.signature) === y ? v.texture : null,
          P = !!C,
          z = null != C ? C : l,
          [k, w] = (0, r.useState)(null);
        ((0, r.useEffect)(() => {
          var e, o;
          if (!u || u.length <= 1) return;
          let t = (function (e, o, i) {
            let t = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 64,
              r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 64;
            if (0 === i.length) return null;
            let s = N.get(e);
            s || ((s = new Map()), N.set(e, s));
            let a = "".concat(o.uuid, "|").concat(t, "x").concat(r, "|").concat(i.join("|")),
              l = s.get(a);
            if (!l) {
              let u = (function (e, o, i, t, r) {
                if ("undefined" == typeof document || 0 === i.length) return null;
                let s = (function (e) {
                  var o, i;
                  let t = e.image;
                  return t &&
                    Number.isFinite(t.width) &&
                    Number.isFinite(t.height) &&
                    !((null != (o = t.width) ? o : 0) <= 0) &&
                    !((null != (i = t.height) ? i : 0) <= 0)
                    ? t
                    : null;
                })(o);
                if (!s) return null;
                let a = i.map((o) => {
                  try {
                    let i = e.atlas.getTextureUV(d.gw.parse(o));
                    if (!i || 4 !== i.length) return null;
                    return {
                      textureId: o,
                      x: Math.round(i[0] * s.width),
                      y: Math.round(i[1] * s.height),
                      width: Math.round((i[2] - i[0]) * s.width),
                      height: Math.round((i[3] - i[1]) * s.height),
                    };
                  } catch (e) {
                    return null;
                  }
                });
                if (a.some((e) => !e || e.width <= 0 || e.height <= 0)) return null;
                let l = document.createElement("canvas");
                ((l.width = t), (l.height = r));
                let u = l.getContext("2d");
                if (!u) return null;
                for (let e of ((u.imageSmoothingEnabled = !1), u.clearRect(0, 0, t, r), a))
                  u.drawImage(s, e.x, e.y, e.width, e.height, 0, 0, t, r);
                let c = new n.GOR(l);
                return (
                  (c.name = "entity-skin:".concat(i.join("+"))),
                  (c.magFilter = n.hxR),
                  (c.minFilter = n.hxR),
                  (c.generateMipmaps = !1),
                  (c.colorSpace = n.er$),
                  (c.flipY = !1),
                  (c.needsUpdate = !0),
                  c
                );
              })(e, o, i, t, r);
              if (!u) return null;
              ((l = { texture: u, refs: 0, disposeTimer: null }), s.set(a, l));
            }
            (l.disposeTimer && (clearTimeout(l.disposeTimer), (l.disposeTimer = null)),
              (l.refs += 1));
            let u = !1;
            return {
              texture: l.texture,
              release: () => {
                !u &&
                  ((u = !0),
                  (l.refs = Math.max(0, l.refs - 1)),
                  l.refs > 0 ||
                    (l.disposeTimer = setTimeout(() => {
                      l.refs > 0 || s.get(a) !== l || (s.delete(a), l.texture.dispose());
                    }, 0)));
              },
            };
          })(
            a,
            l,
            u,
            (null == (e = i.material) ? void 0 : e.xTexSize) || 64,
            (null == (o = i.material) ? void 0 : o.yTexSize) || 64,
          );
          if (t) return (_({ signature: y, texture: t.texture }), t.release);
        }, [i, a, l, y]),
          (0, r.useEffect)(() => {
            let e = (function (e, o, i, t) {
              let r = E.get(i);
              r || ((r = new WeakMap()), E.set(i, r));
              let n = r.get(e);
              n || ((n = new Map()), r.set(e, n));
              let s = (null == t ? void 0 : t.standaloneTexture) ? "standalone" : o,
                a = "".concat(s, "|").concat(I(null == t ? void 0 : t.poseOverrides)),
                d = n.get(a);
              if (!d) {
                let r = (0, O.f)(e, o, i, t);
                if (!r) return { geometry: null, release: () => {} };
                ((d = { geometry: r, refs: 0, disposeTimer: null }), n.set(a, d));
              }
              (d.disposeTimer && (clearTimeout(d.disposeTimer), (d.disposeTimer = null)),
                (d.refs += 1));
              let l = !1;
              return {
                geometry: d.geometry,
                release: () => {
                  !l &&
                    ((l = !0),
                    (d.refs = Math.max(0, d.refs - 1)),
                    d.refs > 0 ||
                      (d.disposeTimer = setTimeout(() => {
                        d.refs > 0 || n.get(a) !== d || (n.delete(a), d.geometry.dispose());
                      }, 0)));
                },
              };
            })(i, s, a, { poseOverrides: c, standaloneTexture: P });
            return (w(e.geometry), e.release);
          }, [i, s, a, b, P]));
        let S = (0, r.useMemo)(
          () =>
            new n.G_z({
              map: z,
              color: x,
              transparent: !0,
              alphaTest: m < 1 ? 0.01 : 0.5,
              opacity: m,
              depthWrite: m >= 1,
              side: n.$EB,
              polygonOffset: g,
              polygonOffsetFactor: g ? -1 : 0,
              polygonOffsetUnits: g ? -1 : 0,
            }),
          [z, m, x, g],
        );
        return ((0, r.useEffect)(
          () => () => {
            S.dispose();
          },
          [S],
        ),
        k)
          ? (0, t.jsxs)("group", {
              scale: [p, p, p],
              children: [
                (0, t.jsx)("mesh", {
                  geometry: k,
                  material: S,
                  castShadow: !0,
                  receiveShadow: !0,
                  raycast: F,
                }),
                f,
              ],
            })
          : (0, t.jsx)(t.Fragment, { children: h });
      }
      var A = i(85336),
        U = i(75342),
        q = i(18514);
      function B(e) {
        var o, i, t, r, n;
        let s =
          null != (n = null == (o = e.painting) ? void 0 : o.size)
            ? n
            : (0, U.o)(
                null != (r = null == (i = e.painting) ? void 0 : i.variant)
                  ? r
                  : null == (t = e.painting)
                    ? void 0
                    : t.motive,
              );
        return [
          Math.max(1, Math.min(4, Math.round(s[0]))),
          Math.max(1, Math.min(4, Math.round(s[1]))),
        ];
      }
      function D(e) {
        var o, i, t, r, n, s;
        if ("armor_stand" === e.kind) {
          if (null == (o = e.armorStand) ? void 0 : o.marker)
            return { position: [0, 0.35, 0], args: [0.55, 0.75, 0.55] };
          let t = (null == (i = e.armorStand) ? void 0 : i.small) ? 0.5 : 1;
          return { position: [0, 0.9 * t, 0], args: [0.9 * t, 1.8 * t, 0.9 * t] };
        }
        if ("item_frame" === e.kind) return { position: [0, 0, 0], args: [1, 1, 0.24] };
        if ("painting" === e.kind) {
          let [o, i] = B(e);
          return { position: [0, 0, 0], args: [o, i, 0.24] };
        }
        if ("boat" === e.kind) return { position: [0, 0.35, 0], args: [1.55, 0.85, 0.95] };
        if ("minecart" === e.kind) return { position: [0, 0.45, 0], args: [1.05, 0.9, 1.05] };
        if (
          "display" === e.kind ||
          "block_display" === e.kind ||
          "falling_block" === e.kind ||
          "tnt" === e.kind
        )
          return { position: [0, 0.5, 0], args: [1, 1, 1] };
        if ("item_display" === e.kind) return { position: [0, 0.5, 0], args: [0.9, 0.9, 0.2] };
        if ("text_display" === e.kind) return { position: [0, 0.5, 0], args: [1.4, 0.6, 0.2] };
        if ("end_crystal" === e.kind) return { position: [0, 0.75, 0], args: [0.9, 1.5, 0.9] };
        if ("leash_knot" === e.kind) return { position: [0, 0, 0], args: [0.45, 0.45, 0.25] };
        if ("interaction" === e.kind) {
          let o = Math.max(
              0.2,
              null != (n = null == (t = e.interaction) ? void 0 : t.width) ? n : 1,
            ),
            i = Math.max(
              0.2,
              null != (s = null == (r = e.interaction) ? void 0 : r.height) ? s : 1,
            );
          return { position: [0, i / 2, 0], args: [o, i, o] };
        }
        return "marker" === e.kind
          ? { position: [0, 0.2, 0], args: [0.45, 0.45, 0.45] }
          : { position: [0, 0.6, 0], args: [0.75, 1.25, 0.75] };
      }
      let L = new Map(),
        W = null;
      function Y(e) {
        return (
          (e.colorSpace = n.er$),
          (e.magFilter = n.hxR),
          (e.minFilter = n.hxR),
          (e.generateMipmaps = !1),
          (e.wrapS = n.ghU),
          (e.wrapT = n.ghU),
          (e.needsUpdate = !0),
          e
        );
      }
      function K(e) {
        let o = L.get(e);
        if (o) return o;
        let i = (null != W || (W = new n.Tap()), W)
          .loadAsync(
            "".concat("/uploads/buildings/blockID/mcmeta/paintings", "/").concat(e, ".png"),
          )
          .then(Y)
          .catch(() => null);
        return (L.set(e, i), i);
      }
      let G = () => {};
      function V(e) {
        let {
            entities: o,
            hiddenLayers: i,
            hiddenPositions: s,
            layerCutoff: a,
            layerMode: d = "slice",
            explodeSpacing: l = 0,
            explodeMinY: u = 0,
            teachingMode: c,
            currentIndex: m = -1,
            entityStepIndex: x,
            onEntityClick: g,
            selectedEntity: p,
            resources: h,
            atlasTexture: f,
            showGenericEntities: b = !0,
            forceEntityModelFallback: y = !1,
          } = e,
          v = (0, r.useMemo)(
            () =>
              o && 0 !== o.length
                ? o.filter((e) => {
                    if (!b && "generic" === e.kind) return !1;
                    let o = Math.floor(e.position[0]),
                      t = Math.floor(e.position[1]),
                      r = Math.floor(e.position[2]);
                    return (
                      !(
                        (null == s ? void 0 : s.has("".concat(o, ",").concat(t, ",").concat(r))) ||
                        (null == i ? void 0 : i.has(t))
                      ) &&
                      (null == a ||
                        (("gallery" !== d || t === a) && ("gallery" === d || !(t > a)))) &&
                      !(0, w.IO)(e.position[1], null == x ? void 0 : x.get(e), c, m)
                    );
                  })
                : [],
            [o, x, i, s, a, d, c, m, b],
          );
        return 0 === v.length
          ? null
          : (0, t.jsx)("group", {
              name: "ProjectionEntities",
              children: v.map((e, o) => {
                var i, r, s;
                let [a, d, c] = e.position,
                  m = Math.floor(d),
                  x =
                    "item_frame" !== (s = e).kind &&
                    "painting" !== s.kind &&
                    "leash_knot" !== s.kind
                      ? n.cj9.degToRad(
                          -(null != (r = null == (i = e.rotation) ? void 0 : i[0]) ? r : 0),
                        )
                      : 0;
                return (0, t.jsxs)(
                  "group",
                  {
                    position: [a, d + (m - u) * l, c],
                    rotation: [0, x, 0],
                    children: [
                      (0, t.jsx)(H, { entity: e, onEntityClick: g }),
                      e === p && (0, t.jsx)(Z, { entity: e }),
                      (0, t.jsx)(X, {
                        entity: e,
                        resources: null != h ? h : null,
                        atlasTexture: null != f ? f : null,
                        forceEntityModelFallback: y,
                      }),
                    ],
                  },
                  "".concat(e.entityId, "-").concat(o, "-").concat(a, "-").concat(d, "-").concat(c),
                );
              }),
            });
      }
      function H(e) {
        let { entity: o, onEntityClick: i } = e;
        if (!i) return null;
        let { position: r, args: n } = D(o),
          s = $(o),
          a = (0, t.jsxs)("mesh", {
            position: r,
            onClick: (e) => {
              ("number" == typeof e.delta && e.delta > 6) || (e.stopPropagation(), i(o));
            },
            children: [
              (0, t.jsx)("boxGeometry", { args: n }),
              (0, t.jsx)("meshBasicMaterial", {
                color: "#ffffff",
                transparent: !0,
                opacity: 0.001,
                depthWrite: !1,
              }),
            ],
          });
        return s ? (0, t.jsx)("group", { rotation: p(s), children: a }) : a;
      }
      function $(e) {
        var o, i;
        return "painting" === e.kind
          ? null == (o = e.painting)
            ? void 0
            : o.facing
          : "item_frame" === e.kind
            ? null == (i = e.itemFrame)
              ? void 0
              : i.facing
            : void 0;
      }
      function Z(e) {
        let { entity: o } = e,
          { position: i, size: a } = (function (e) {
            var o, i;
            if ("item_frame" === e.kind)
              return { position: [0, 0, 1 / 16], size: [0.75, 0.75, 3 / 16] };
            if ("painting" === e.kind) {
              let [o, i] = B(e);
              return { position: [0, 0, 0], size: [o, i, 1 / 16] };
            }
            if ("armor_stand" === e.kind && !(null == (o = e.armorStand) ? void 0 : o.marker)) {
              let o = (null == (i = e.armorStand) ? void 0 : i.small) ? 0.5 : 1;
              return { position: [0, 0.9875 * o, 0], size: [0.5 * o, 1.975 * o, 0.5 * o] };
            }
            let { position: t, args: r } = D(e);
            return { position: t, size: r };
          })(o),
          d = $(o),
          [l, u, c] = a,
          [m, x, g] = i,
          h = (0, r.useMemo)(() => new q.C(), []),
          f = (0, r.useMemo)(() => {
            let e = new n.iNn(l, u, c);
            return (e.translate(0.5, 0.5, 0.5), e);
          }, [l, u, c]);
        ((0, r.useEffect)(() => {
          (h.setGeometry(f), h.setPosition(m - 0.5, x - 0.5, g - 0.5));
        }, [h, f, m, x, g]),
          (0, r.useEffect)(
            () => () => {
              f.dispose();
            },
            [f],
          ),
          (0, r.useEffect)(
            () => () => {
              h.dispose();
            },
            [h],
          ),
          (0, s.D)((e) => {
            let { clock: o } = e;
            return h.updateTime(o.getElapsedTime());
          }));
        let b = h.getObject3D();
        return d
          ? (0, t.jsx)("group", {
              rotation: p(d),
              children: (0, t.jsx)("primitive", { object: b }),
            })
          : (0, t.jsx)("primitive", { object: b });
      }
      function X(e) {
        var o, i, r, n, s, a, d, l, u;
        let { entity: c, resources: m, atlasTexture: x, forceEntityModelFallback: g } = e;
        switch (c.kind) {
          case "armor_stand":
            return (0, t.jsx)(ei, {
              entity: c,
              resources: m,
              atlasTexture: x,
              forceEntityModelFallback: g,
            });
          case "minecart":
            return (0, t.jsx)(el, {
              entity: c,
              resources: m,
              atlasTexture: x,
              forceEntityModelFallback: g,
            });
          case "boat":
            return (0, t.jsx)(ex, {
              entity: c,
              resources: m,
              atlasTexture: x,
              forceEntityModelFallback: g,
            });
          case "item_frame":
            return (0, t.jsx)(ep, { entity: c, resources: m, atlasTexture: x, forceFallback: g });
          case "painting":
            return (0, t.jsx)(ev, { entity: c, forceFallback: g });
          case "display":
            return (0, t.jsx)(ee, {
              blockState: c.blockId ? { blockId: c.blockId, properties: {} } : void 0,
              resources: m,
              atlasTexture: x,
              fallbackBlockId: c.blockId,
            });
          case "block_display":
            return (0, t.jsx)(eo, {
              transform: null == (o = c.blockDisplay) ? void 0 : o.transform,
              children: (0, t.jsx)(ee, {
                blockState: null == (i = c.blockDisplay) ? void 0 : i.blockState,
                resources: m,
                atlasTexture: x,
                fallbackBlockId:
                  null == (n = c.blockDisplay) || null == (r = n.blockState) ? void 0 : r.blockId,
              }),
            });
          case "item_display":
            return (0, t.jsx)(eo, {
              transform: null == (s = c.itemDisplay) ? void 0 : s.transform,
              children: (0, t.jsx)(ew, {
                item: null == (a = c.itemDisplay) ? void 0 : a.item,
                resources: m,
                atlasTexture: x,
              }),
            });
          case "text_display":
            return (0, t.jsx)(ez, { entity: c });
          case "falling_block":
            return (0, t.jsx)(ee, {
              blockState:
                null != (d = c.fallingBlock)
                  ? d
                  : c.blockId
                    ? { blockId: c.blockId, properties: {} }
                    : void 0,
              resources: m,
              atlasTexture: x,
              fallbackBlockId: c.blockId,
            });
          case "tnt":
            return (0, t.jsx)(ee, {
              blockState: { blockId: "minecraft:tnt", properties: {} },
              resources: m,
              atlasTexture: x,
              fallbackBlockId: "minecraft:tnt",
            });
          case "end_crystal":
            return (0, t.jsx)(eF, {
              showBottom: (null == (l = c.endCrystal) ? void 0 : l.showBottom) !== !1,
            });
          case "leash_knot":
            return (0, t.jsx)(eE, {
              entity: c,
              resources: m,
              atlasTexture: x,
              forceEntityModelFallback: g,
            });
          case "marker":
            return (0, t.jsx)(eJ, {});
          case "interaction":
            return (0, t.jsx)(eA, { entity: c });
          default: {
            let e = g ? null : (0, A.Pc)(c);
            if (e && m && x)
              return (0, t.jsx)(J, {
                model: e.model,
                textureId: e.texture,
                textureLayers: e.textureLayers,
                color: e.color,
                resources: m,
                atlasTexture: x,
                fallback: (0, t.jsx)(eU, { entityId: c.entityId }),
                children:
                  null == (u = e.overlays)
                    ? void 0
                    : u.map((e, o) =>
                        (0, t.jsx)(
                          J,
                          {
                            model: e.model,
                            textureId: e.texture,
                            resources: m,
                            atlasTexture: x,
                            color: e.color,
                            polygonOffset: !0,
                          },
                          "".concat(e.texture, "-").concat(o),
                        ),
                      ),
              });
            return (0, t.jsx)(eU, { entityId: c.entityId });
          }
        }
      }
      function Q(e) {
        let { position: o, args: i, color: r, opacity: n = 1, rotation: s, wireframe: a = !1 } = e;
        return (0, t.jsxs)("mesh", {
          position: o,
          rotation: s,
          castShadow: !0,
          receiveShadow: !0,
          raycast: G,
          children: [
            (0, t.jsx)("boxGeometry", { args: i }),
            (0, t.jsx)("meshLambertMaterial", {
              color: r,
              transparent: n < 1,
              opacity: n,
              wireframe: a,
            }),
          ],
        });
      }
      function ee(e) {
        let {
            blockState: o,
            resources: i,
            atlasTexture: n,
            fallbackBlockId: s,
            scale: a = 1,
            centered: d = !1,
            rejectMagentaFallback: l = !1,
            fallback: u,
          } = e,
          c = null == o ? void 0 : o.blockId,
          m = null == o ? void 0 : o.properties,
          x = c ? C(c, null != m ? m : {}) : null,
          [g, p] = (0, r.useState)(null),
          [h, f] = (0, r.useState)(null);
        return ((0, r.useEffect)(() => {
          if (!i || !c) return void p(null);
          let e = z(c, null != m ? m : {}, i, { rejectMagentaFallback: l });
          return (p(e.value), e.release);
        }, [i, c, x, l]),
        (0, r.useEffect)(() => {
          if (!n || !c) return void f(null);
          let e = k(c, null != m ? m : {}, n);
          return (f(e.value), e.release);
        }, [n, c, x]),
        g && h)
          ? (0, t.jsx)("mesh", {
              geometry: g,
              material: h,
              position: [-0.5 * a, d ? -0.5 * a : 0, -0.5 * a],
              scale: [a, a, a],
              castShadow: !0,
              receiveShadow: !0,
              raycast: G,
            })
          : (0, t.jsx)(t.Fragment, {
              children: null != u ? u : (0, t.jsx)(eN, { blockId: null != s ? s : c }),
            });
      }
      function eo(e) {
        var o, i;
        let { transform: s, children: a } = e,
          d = JSON.stringify(null != s ? s : {}),
          l = (0, r.useMemo)(() => {
            if (!(null == s ? void 0 : s.matrix) || 16 !== s.matrix.length) return null;
            let e = new n.kn4();
            return (e.fromArray(s.matrix), e);
          }, [d]),
          u = (0, r.useMemo)(() => {
            let e = new n.PTz();
            return (
              (null == s ? void 0 : s.leftRotation) && e.multiply(new n.PTz(...s.leftRotation)),
              (null == s ? void 0 : s.rightRotation) && e.multiply(new n.PTz(...s.rightRotation)),
              e
            );
          }, [d]);
        return l
          ? (0, t.jsx)("group", { matrix: l, matrixAutoUpdate: !1, children: a })
          : (0, t.jsx)("group", {
              position: null != (o = null == s ? void 0 : s.translation) ? o : [0, 0, 0],
              scale: null != (i = null == s ? void 0 : s.scale) ? i : [1, 1, 1],
              quaternion: u,
              children: a,
            });
      }
      function ei(e) {
        var o;
        let { entity: i, resources: r, atlasTexture: n, forceEntityModelFallback: s } = e,
          a = s ? null : (0, A.Pc)(i),
          d = (0, t.jsx)(et, { entity: i, resources: r, atlasTexture: n });
        if (!a || !r || !n)
          return (0, t.jsx)("group", {
            name: "Entity_ArmorStand_Facing",
            rotation: [0, Math.PI, 0],
            children: d,
          });
        let l = i.armorStand,
          u =
            ((null == l ? void 0 : l.marker) ? 0.35 : 1) *
            ((null == l ? void 0 : l.small) ? 0.5 : 1),
          c = (0, A._)(i);
        return (0, t.jsx)("group", {
          name: "Entity_ArmorStand_Facing",
          rotation: [0, Math.PI, 0],
          children: (0, t.jsx)("group", {
            name: "Entity_ArmorStand_Precise",
            position: [0, 0.001 * u, 0],
            children: (0, t.jsxs)(J, {
              model: a.model,
              textureId: a.texture,
              resources: r,
              atlasTexture: n,
              poseOverrides: c,
              opacity: (null == l ? void 0 : l.invisible) ? 0.28 : 1,
              modelScale: u,
              fallback: d,
              children: [
                null == (o = a.overlays)
                  ? void 0
                  : o.map((e, o) =>
                      (0, t.jsx)(
                        J,
                        {
                          model: e.model,
                          textureId: e.texture,
                          resources: r,
                          atlasTexture: n,
                          poseOverrides: c,
                          color: e.color,
                          polygonOffset: !0,
                        },
                        "".concat(e.texture, "-").concat(o),
                      ),
                    ),
                (0, t.jsx)(er, { entity: i, resources: r, atlasTexture: n }),
              ],
            }),
          }),
        });
      }
      function et(e) {
        var o, i;
        let { entity: r, resources: n, atlasTexture: s } = e,
          a = r.armorStand,
          d = null != (o = null == a ? void 0 : a.equipment) ? o : {},
          l = (null == a ? void 0 : a.small) ? 0.5 : 1,
          u = (null == a ? void 0 : a.invisible) ? 0.38 : 1,
          c = (null == a ? void 0 : a.showArms) || !!(d.mainHand || d.offHand),
          m = (null == a ? void 0 : a.invisible) ? "#b98546" : "#9b6a36",
          x = null != (i = null == a ? void 0 : a.pose) ? i : {};
        return (null == a ? void 0 : a.marker)
          ? (0, t.jsxs)("group", {
              name: "Entity_ArmorStand_Marker",
              scale: [l, l, l],
              children: [
                (0, t.jsx)(Q, {
                  position: [0, 0.05, 0],
                  args: [0.3, 0.04, 0.3],
                  color: "#d6a55a",
                  opacity: 0.65,
                }),
                (0, t.jsx)(Q, {
                  position: [0, 0.35, 0],
                  args: [0.06, 0.6, 0.06],
                  color: "#d6a55a",
                  opacity: 0.65,
                }),
              ],
            })
          : (0, t.jsxs)("group", {
              name: "Entity_ArmorStand",
              scale: [l, l, l],
              children: [
                !(null == a ? void 0 : a.noBasePlate) &&
                  (0, t.jsx)(Q, {
                    position: [0, 0.035, 0],
                    args: [0.72, 0.07, 0.72],
                    color: "#5f3f21",
                    opacity: u,
                  }),
                (0, t.jsxs)("group", {
                  rotation: ed(x.body),
                  children: [
                    (0, t.jsx)(Q, {
                      position: [0, 0.74, 0],
                      args: [0.07, 1.28, 0.07],
                      color: m,
                      opacity: u,
                    }),
                    (0, t.jsx)(Q, {
                      position: [0, 1.36, 0],
                      args: [0.62, 0.075, 0.075],
                      color: m,
                      opacity: u,
                    }),
                    (0, t.jsx)(Q, {
                      position: [0, 0.78, 0],
                      args: [0.42, 0.065, 0.065],
                      color: m,
                      opacity: u,
                    }),
                    (0, t.jsx)(Q, {
                      position: [0, 1.02, -0.035],
                      args: [0.18, 0.52, 0.07],
                      color: m,
                      opacity: u,
                    }),
                  ],
                }),
                (0, t.jsxs)("group", {
                  position: [0, 1.52, 0],
                  rotation: ed(x.head),
                  children: [
                    (0, t.jsx)(Q, {
                      position: [0, 0.18, 0],
                      args: [0.26, 0.26, 0.26],
                      color: m,
                      opacity: u,
                    }),
                    d.head &&
                      (0, t.jsx)(en, {
                        itemId: d.head,
                        slot: "head",
                        resources: n,
                        atlasTexture: s,
                      }),
                  ],
                }),
                c &&
                  (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(es, {
                        pivot: [-0.35, 1.32, 0],
                        length: 0.72,
                        thickness: 0.065,
                        color: m,
                        pose: x.leftArm,
                        opacity: u,
                      }),
                      (0, t.jsx)(es, {
                        pivot: [0.35, 1.32, 0],
                        length: 0.72,
                        thickness: 0.065,
                        color: m,
                        pose: x.rightArm,
                        opacity: u,
                      }),
                      d.mainHand &&
                        (0, t.jsx)(ea, {
                          side: "right",
                          itemId: d.mainHand,
                          pose: x.rightArm,
                          resources: n,
                          atlasTexture: s,
                        }),
                      d.offHand &&
                        (0, t.jsx)(ea, {
                          side: "left",
                          itemId: d.offHand,
                          pose: x.leftArm,
                          resources: n,
                          atlasTexture: s,
                        }),
                    ],
                  }),
                (0, t.jsx)(es, {
                  pivot: [-0.16, 0.7, 0],
                  length: 0.67,
                  thickness: 0.065,
                  color: m,
                  pose: x.leftLeg,
                  opacity: u,
                }),
                (0, t.jsx)(es, {
                  pivot: [0.16, 0.7, 0],
                  length: 0.67,
                  thickness: 0.065,
                  color: m,
                  pose: x.rightLeg,
                  opacity: u,
                }),
                d.chest &&
                  (0, t.jsx)(Q, {
                    position: [0, 1.03, -0.055],
                    args: [0.46, 0.6, 0.08],
                    color: eL(d.chest),
                    opacity: 0.88,
                  }),
                d.legs &&
                  (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(Q, {
                        position: [-0.16, 0.46, -0.035],
                        args: [0.13, 0.44, 0.08],
                        color: eL(d.legs),
                        opacity: 0.88,
                      }),
                      (0, t.jsx)(Q, {
                        position: [0.16, 0.46, -0.035],
                        args: [0.13, 0.44, 0.08],
                        color: eL(d.legs),
                        opacity: 0.88,
                      }),
                    ],
                  }),
                d.feet &&
                  (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(Q, {
                        position: [-0.16, 0.15, -0.035],
                        args: [0.18, 0.14, 0.16],
                        color: eL(d.feet),
                        opacity: 0.88,
                      }),
                      (0, t.jsx)(Q, {
                        position: [0.16, 0.15, -0.035],
                        args: [0.18, 0.14, 0.16],
                        color: eL(d.feet),
                        opacity: 0.88,
                      }),
                    ],
                  }),
              ],
            });
      }
      function er(e) {
        var o;
        let { entity: i, resources: r, atlasTexture: n } = e,
          s = i.armorStand,
          a = null != (o = null == s ? void 0 : s.equipment) ? o : {},
          d = (0, A.Xq)(i),
          l = (null == s ? void 0 : s.showArms) || !!(a.mainHand || a.offHand);
        return (0, t.jsxs)("group", {
          name: "Entity_ArmorStand_Equipment",
          children: [
            a.head &&
              !(0, A.iw)(a.head, "head") &&
              (0, t.jsx)("group", {
                position: [0, 1.52, 0],
                rotation: ed(d.head),
                children: (0, t.jsx)(en, {
                  itemId: a.head,
                  slot: "head",
                  resources: r,
                  atlasTexture: n,
                }),
              }),
            l &&
              a.mainHand &&
              (0, t.jsx)(ea, {
                side: "right",
                itemId: a.mainHand,
                pose: d.rightArm,
                resources: r,
                atlasTexture: n,
              }),
            l &&
              a.offHand &&
              (0, t.jsx)(ea, {
                side: "left",
                itemId: a.offHand,
                pose: d.leftArm,
                resources: r,
                atlasTexture: n,
              }),
            a.chest &&
              !(0, A.iw)(a.chest, "chest") &&
              (0, t.jsx)(Q, {
                position: [0, 1.03, -0.055],
                args: [0.46, 0.6, 0.08],
                color: eL(a.chest),
                opacity: 0.88,
              }),
            a.legs &&
              !(0, A.iw)(a.legs, "legs") &&
              (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(Q, {
                    position: [-0.16, 0.46, -0.035],
                    args: [0.13, 0.44, 0.08],
                    color: eL(a.legs),
                    opacity: 0.88,
                  }),
                  (0, t.jsx)(Q, {
                    position: [0.16, 0.46, -0.035],
                    args: [0.13, 0.44, 0.08],
                    color: eL(a.legs),
                    opacity: 0.88,
                  }),
                ],
              }),
            a.feet &&
              !(0, A.iw)(a.feet, "feet") &&
              (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(Q, {
                    position: [-0.16, 0.15, -0.035],
                    args: [0.18, 0.14, 0.16],
                    color: eL(a.feet),
                    opacity: 0.88,
                  }),
                  (0, t.jsx)(Q, {
                    position: [0.16, 0.15, -0.035],
                    args: [0.18, 0.14, 0.16],
                    color: eL(a.feet),
                    opacity: 0.88,
                  }),
                ],
              }),
          ],
        });
      }
      function en(e) {
        let { itemId: o, slot: i, resources: r, atlasTexture: n } = e;
        return "head" === i && o.includes("block")
          ? (0, t.jsx)("group", {
              position: [0, -0.1, 0],
              scale: [0.42, 0.42, 0.42],
              children: (0, t.jsx)(ee, {
                blockState: { blockId: o, properties: {} },
                resources: r,
                atlasTexture: n,
                fallbackBlockId: o,
              }),
            })
          : (0, t.jsx)(Q, {
              position: [0, 0.18, 0],
              args: [0.34, 0.32, 0.34],
              color: eL(o),
              opacity: 0.88,
            });
      }
      function es(e) {
        let { pivot: o, length: i, thickness: r, color: n, pose: s, opacity: a = 1 } = e;
        return (0, t.jsx)("group", {
          position: o,
          rotation: ed(s),
          children: (0, t.jsx)(Q, {
            position: [0, -i / 2, 0],
            args: [r, i, r],
            color: n,
            opacity: a,
          }),
        });
      }
      function ea(e) {
        let { side: o, itemId: i, pose: r, resources: s, atlasTexture: a } = e;
        return (0, t.jsx)("group", {
          position: ["left" === o ? -0.35 : 0.35, 1.32, 0],
          rotation: ed(r),
          children: (0, t.jsx)("group", {
            position: [0, -0.74, -0.08],
            rotation: [n.cj9.degToRad(-18), 0, n.cj9.degToRad("left" === o ? -8 : 8)],
            children: (0, t.jsx)(ew, {
              item: { itemId: i },
              resources: s,
              atlasTexture: a,
              width: 0.28,
              height: 0.28,
            }),
          }),
        });
      }
      function ed(e) {
        return e
          ? [n.cj9.degToRad(e[0] || 0), n.cj9.degToRad(e[1] || 0), n.cj9.degToRad(e[2] || 0)]
          : [0, 0, 0];
      }
      function el(e) {
        let { entity: o, resources: i, atlasTexture: r, forceEntityModelFallback: n } = e,
          s = n ? null : (0, A.Pc)(o);
        return s && i && r
          ? (0, t.jsx)("group", {
              name: "Entity_Minecart_Precise",
              children: (0, t.jsx)(J, {
                model: s.model,
                textureId: s.texture,
                resources: i,
                atlasTexture: r,
                fallback: (0, t.jsx)(eu, { entity: o, resources: i, atlasTexture: r }),
                children: (0, t.jsx)(ec, { entity: o, resources: i, atlasTexture: r }),
              }),
            })
          : (0, t.jsx)(eu, { entity: o, resources: i, atlasTexture: r });
      }
      function eu(e) {
        let { entity: o, resources: i, atlasTexture: r } = e;
        return (0, t.jsxs)("group", {
          name: "Entity_Minecart_Fallback",
          children: [
            (0, t.jsx)(Q, { position: [0, 0.22, 0], args: [0.9, 0.16, 0.9], color: "#3c3f46" }),
            (0, t.jsx)(Q, {
              position: [0, 0.46, -0.43],
              args: [0.9, 0.38, 0.08],
              color: "#565a63",
            }),
            (0, t.jsx)(Q, { position: [0, 0.46, 0.43], args: [0.9, 0.38, 0.08], color: "#565a63" }),
            (0, t.jsx)(Q, {
              position: [-0.43, 0.46, 0],
              args: [0.08, 0.38, 0.9],
              color: "#565a63",
            }),
            (0, t.jsx)(Q, { position: [0.43, 0.46, 0], args: [0.08, 0.38, 0.9], color: "#565a63" }),
            (0, t.jsx)(Q, {
              position: [-0.32, 0.09, -0.48],
              args: [0.18, 0.18, 0.08],
              color: "#16181d",
            }),
            (0, t.jsx)(Q, {
              position: [0.32, 0.09, -0.48],
              args: [0.18, 0.18, 0.08],
              color: "#16181d",
            }),
            (0, t.jsx)(Q, {
              position: [-0.32, 0.09, 0.48],
              args: [0.18, 0.18, 0.08],
              color: "#16181d",
            }),
            (0, t.jsx)(Q, {
              position: [0.32, 0.09, 0.48],
              args: [0.18, 0.18, 0.08],
              color: "#16181d",
            }),
            (0, t.jsx)(ec, { entity: o, resources: i, atlasTexture: r }),
          ],
        });
      }
      function ec(e) {
        var o, i, r, n, s;
        let { entity: a, resources: d, atlasTexture: l } = e,
          u = null != (n = null == (o = a.minecart) ? void 0 : o.variant) ? n : "normal",
          c = null == (i = a.minecart) ? void 0 : i.displayBlock,
          m =
            ((null != (s = null == (r = a.minecart) ? void 0 : r.displayOffset) ? s : 6) - 6) / 16;
        return (0, t.jsxs)("group", {
          name: "Entity_Minecart_Payload",
          children: [
            c &&
              (0, t.jsx)("group", {
                position: [0, 0.56 + m, 0],
                scale: [0.58, 0.58, 0.58],
                children: (0, t.jsx)(ee, {
                  blockState: c,
                  resources: d,
                  atlasTexture: l,
                  fallbackBlockId: c.blockId,
                }),
              }),
            !c && "normal" !== u && (0, t.jsx)(em, { variant: u }),
          ],
        });
      }
      function em(e) {
        var o;
        let { variant: i } = e,
          r =
            null !=
            (o = {
              chest: "#a46b2d",
              hopper: "#353942",
              tnt: "#d13f2f",
              furnace: "#6f737a",
              command_block: "#b8894d",
              spawner: "#34495e",
            }[i])
              ? o
              : "#8b8f98";
        return (0, t.jsx)(Q, { position: [0, 0.72, 0], args: [0.58, 0.42, 0.58], color: r });
      }
      function ex(e) {
        var o;
        let { entity: i, resources: r, atlasTexture: n, forceEntityModelFallback: s } = e,
          a = (0, t.jsx)(eg, { entity: i }),
          d = s ? null : (0, A.Pc)(i);
        if (!d || !r || !n) return a;
        let l = !!((null == (o = i.boat) ? void 0 : o.chest) || i.entityId.endsWith("_chest_boat"));
        return (0, t.jsx)("group", {
          name: l ? "Entity_ChestBoat_Precise" : "Entity_Boat_Precise",
          children: (0, t.jsx)(J, {
            model: d.model,
            textureId: d.texture,
            resources: r,
            atlasTexture: n,
            fallback: a,
          }),
        });
      }
      function eg(e) {
        let { entity: o } = e,
          i = o.boat,
          r = !!((null == i ? void 0 : i.chest) || o.entityId.endsWith("_chest_boat")),
          s = !!(null == i ? void 0 : i.raft),
          a = (function (e) {
            var o;
            let i = {
              oak: "#8a5a2b",
              spruce: "#5b3b21",
              birch: "#b89a5a",
              jungle: "#9b653d",
              acacia: "#a8562c",
              dark_oak: "#3f2b1b",
              mangrove: "#7a342d",
              cherry: "#d9949b",
              bamboo: "#c7a957",
              pale_oak: "#c6b990",
            };
            return null != (o = i[null != e ? e : "oak"]) ? o : i.oak;
          })(null == i ? void 0 : i.woodType),
          d = (function (e, o) {
            let i = new n.Q1f(e);
            return (i.multiplyScalar(0.72), "#".concat(i.getHexString()));
          })(a, 0.72);
        return s
          ? (0, t.jsxs)("group", {
              name: "Entity_Raft",
              children: [
                [-0.45, -0.15, 0.15, 0.45].map((e) =>
                  (0, t.jsx)(Q, { position: [e, 0.2, 0], args: [0.18, 0.16, 1.05], color: a }, e),
                ),
                (0, t.jsx)(Q, { position: [0, 0.3, -0.28], args: [1.15, 0.08, 0.12], color: d }),
                (0, t.jsx)(Q, { position: [0, 0.3, 0.28], args: [1.15, 0.08, 0.12], color: d }),
                r &&
                  (0, t.jsx)(Q, {
                    position: [0.22, 0.58, 0],
                    args: [0.42, 0.36, 0.42],
                    color: "#a46b2d",
                  }),
              ],
            })
          : (0, t.jsxs)("group", {
              name: "Entity_Boat",
              children: [
                (0, t.jsx)(Q, { position: [0, 0.18, 0], args: [1.15, 0.18, 0.58], color: a }),
                (0, t.jsx)(Q, { position: [0, 0.38, -0.34], args: [1.05, 0.38, 0.12], color: d }),
                (0, t.jsx)(Q, { position: [0, 0.38, 0.34], args: [1.05, 0.38, 0.12], color: d }),
                (0, t.jsx)(Q, { position: [-0.56, 0.38, 0], args: [0.12, 0.38, 0.58], color: d }),
                (0, t.jsx)(Q, { position: [0.56, 0.38, 0], args: [0.12, 0.38, 0.58], color: d }),
                (0, t.jsx)(Q, {
                  position: [-0.38, 0.48, -0.55],
                  args: [0.12, 0.06, 0.44],
                  color: d,
                  rotation: [0, 0, n.cj9.degToRad(-20)],
                }),
                (0, t.jsx)(Q, {
                  position: [0.38, 0.48, 0.55],
                  args: [0.12, 0.06, 0.44],
                  color: d,
                  rotation: [0, 0, n.cj9.degToRad(20)],
                }),
                r &&
                  (0, t.jsx)(Q, {
                    position: [0.18, 0.68, 0],
                    args: [0.42, 0.36, 0.42],
                    color: "#a46b2d",
                  }),
              ],
            });
      }
      function ep(e) {
        var o;
        let { entity: i, resources: r, atlasTexture: n, forceFallback: s } = e,
          a = i.itemFrame;
        return (0, t.jsx)(eq, {
          facing: null == a ? void 0 : a.facing,
          children: (0, t.jsxs)("group", {
            name: "Entity_ItemFrame",
            children: [
              !s && r && n
                ? (0, t.jsx)(eh, {
                    glow: !!(null == a ? void 0 : a.glow),
                    resources: r,
                    atlasTexture: n,
                  })
                : (0, t.jsx)(ey, { glow: !!(null == a ? void 0 : a.glow) }),
              (null == a ? void 0 : a.item) &&
                (0, t.jsx)(ef, {
                  item: a.item,
                  itemRotation: null != (o = a.itemRotation) ? o : 0,
                  resources: r,
                  atlasTexture: n,
                }),
            ],
          }),
        });
      }
      function eh(e) {
        let { glow: o, resources: i, atlasTexture: s } = e,
          a = o ? "minecraft:block/glow_item_frame" : "minecraft:block/item_frame",
          d = (0, r.useMemo)(() => (0, u.hu)(a, i), [a, i]),
          l = (0, r.useMemo)(
            () =>
              new n.kn4()
                .makeTranslation(0.5, -0.5, 1 - 1 / 32)
                .multiply(new n.kn4().makeRotationY(Math.PI))
                .multiply(new n.kn4().makeScale(1 / 16, 1 / 16, 1 / 16)),
            [],
          ),
          c = (0, r.useMemo)(
            () =>
              o
                ? new n.V9B({ map: s, vertexColors: !0, side: n.$EB })
                : (0, f.fu)({
                    kind: "lambert",
                    atlasTexture: s,
                    visualProfile: (0, b.T)("minecraft:item_frame", {}),
                    defaultSide: n.$EB,
                  }),
            [s, o],
          );
        return ((0, r.useEffect)(
          () => () => {
            null == d || d.dispose();
          },
          [d],
        ),
        (0, r.useEffect)(
          () => () => {
            c.dispose();
          },
          [c],
        ),
        d)
          ? (0, t.jsx)("mesh", {
              name: "Entity_ItemFrame_Precise",
              geometry: d,
              material: c,
              matrix: l,
              matrixAutoUpdate: !1,
              castShadow: !o,
              receiveShadow: !o,
              raycast: G,
            })
          : (0, t.jsx)(ey, { glow: o });
      }
      function ef(e) {
        let { item: o, itemRotation: i, resources: n, atlasTexture: s } = e,
          a = o.itemId,
          l = ek(a, n),
          u = (0, r.useMemo)(
            () =>
              l && n
                ? (function (e, o) {
                    let i = e.replace(/^minecraft:/, ""),
                      t = [];
                    for (let e of (i.endsWith("_trapdoor") && t.push("".concat(i, "_bottom")),
                    (/_(fence|wall|button)$/.test(i) || "piston" === i || "sticky_piston" === i) &&
                      t.push("".concat(i, "_inventory")),
                    t.push(i),
                    t)) {
                      let i = "minecraft:block/".concat(e);
                      if (o(i)) return i;
                    }
                    return null;
                  })(a, (e) => null !== n.blockModels.getBlockModel(d.gw.parse(e)))
                : null,
            [l, a, n],
          ),
          c =
            u && n
              ? (function (e, o) {
                  var i;
                  let t = e.getBlockModel(d.gw.parse(o));
                  return null == t || null == (i = t.display) ? void 0 : i.fixed;
                })(n.blockModels, u)
              : void 0,
          m = (0, r.useMemo)(
            () => h({ itemId: a, itemRotation: i, kind: "block", fixed: c }),
            [a, i, c],
          ),
          x = (0, r.useMemo)(() => h({ itemId: a, itemRotation: i, kind: "flat" }), [a, i]),
          g = (0, t.jsx)("group", {
            name: "Entity_ItemFrame_Item",
            matrix: x,
            matrixAutoUpdate: !1,
            children: (0, t.jsx)(ej, {
              item: o,
              resources: n,
              atlasTexture: s,
              width: 0.5,
              height: 0.5,
            }),
          });
        return l && n
          ? (0, t.jsx)(eb, {
              itemId: a,
              modelId: u,
              matrix: m,
              resources: n,
              atlasTexture: s,
              fallback: g,
            })
          : g;
      }
      function eb(e) {
        let { itemId: o, modelId: i, matrix: n, resources: s, atlasTexture: a, fallback: d } = e,
          l = (0, r.useMemo)(() => (i ? (0, u.hG)(i, o, s) : null), [i, o, s]);
        (0, r.useEffect)(
          () => () => {
            null == l || l.dispose();
          },
          [l],
        );
        let [c, m] = (0, r.useState)(null);
        (0, r.useEffect)(() => {
          if (l) return void m(null);
          let e = z(o, {}, s, { rejectMagentaFallback: !0 });
          return (m(e.value), e.release);
        }, [l, o, s]);
        let [x, g] = (0, r.useState)(null);
        (0, r.useEffect)(() => {
          if (!a) return void g(null);
          let e = k(o, {}, a);
          return (g(e.value), e.release);
        }, [a, o]);
        let p = null != l ? l : c;
        return p && x
          ? (0, t.jsx)("group", {
              name: "Entity_ItemFrame_Item",
              matrix: n,
              matrixAutoUpdate: !1,
              children: (0, t.jsx)("mesh", {
                geometry: p,
                material: x,
                castShadow: !0,
                receiveShadow: !0,
                raycast: G,
              }),
            })
          : (0, t.jsx)(t.Fragment, { children: d });
      }
      function ey(e) {
        let { glow: o } = e;
        return (0, t.jsxs)("group", {
          name: "Entity_ItemFrame_Fallback",
          children: [
            (0, t.jsx)(Q, {
              position: [0, 0, -0.028],
              args: [0.92, 0.92, 0.055],
              color: o ? "#d8b45a" : "#6f4325",
            }),
            (0, t.jsx)(Q, {
              position: [0, 0, 0],
              args: [0.62, 0.62, 0.035],
              color: o ? "#f3e4a6" : "#caa56a",
            }),
          ],
        });
      }
      function ev(e) {
        var o, i, r, n;
        let { entity: s, forceFallback: a } = e,
          d = (0, U.Vs)(
            null != (n = null == (o = s.painting) ? void 0 : o.variant)
              ? n
              : null == (i = s.painting)
                ? void 0
                : i.motive,
          ),
          [l, u] = B(s),
          c = e_(a ? void 0 : d, !1),
          m = e_(a ? void 0 : "back", !0);
        return (0, t.jsx)(eq, {
          facing: null == (r = s.painting) ? void 0 : r.facing,
          children:
            !a && c && m
              ? (0, t.jsx)(eC, { width: l, height: u, frontTexture: c, backTexture: m })
              : (0, t.jsx)(eP, { width: l, height: u, variant: d }),
        });
      }
      function e_(e, o) {
        let [i, t] = (0, r.useState)(null);
        return ((0, r.useEffect)(() => {
          if (!e) return;
          let i = !0;
          return (
            (o
              ? K("back")
              : (function (e) {
                  let o = (0, U.Vs)(e);
                  return o ? K(o) : Promise.resolve(null);
                })(e)
            ).then((o) => {
              i && t({ key: e, texture: o });
            }),
            () => {
              i = !1;
            }
          );
        }, [o, e]),
        i && i.key === e)
          ? i.texture
          : null;
      }
      function eC(e) {
        let { width: o, height: i, frontTexture: s, backTexture: a } = e,
          d = 1 / 16,
          l = (0, r.useMemo)(() => new n.bdM(o, i), [o, i]),
          u = (0, r.useMemo)(
            () =>
              (function (e, o, i) {
                let t = [],
                  r = [],
                  s = [],
                  a = e / 2,
                  d = o / 2,
                  l = i / 2,
                  u = function (e) {
                    let o =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : [0, 0, 1, 1],
                      i = t.length / 3;
                    for (let o of e) t.push(...o);
                    let [n, a, d, l] = o;
                    (r.push(n, a, d, a, n, l, d, l), s.push(i, i + 1, i + 2, i + 2, i + 1, i + 3));
                  };
                for (let i = 0; i < e; i++)
                  for (let e = 0; e < o; e++) {
                    let o = -a + i,
                      t = o + 1,
                      r = -d + e,
                      n = r + 1;
                    u([
                      [t, r, -l],
                      [o, r, -l],
                      [t, n, -l],
                      [o, n, -l],
                    ]);
                  }
                for (let o = 0; o < e; o++) {
                  let e = -a + o,
                    i = e + 1;
                  (u(
                    [
                      [e, d, l],
                      [i, d, l],
                      [e, d, -l],
                      [i, d, -l],
                    ],
                    [0, 0, 1, 1 / 16],
                  ),
                    u(
                      [
                        [e, -d, -l],
                        [i, -d, -l],
                        [e, -d, l],
                        [i, -d, l],
                      ],
                      [0, 15 / 16, 1, 1],
                    ));
                }
                for (let e = 0; e < o; e++) {
                  let o = -d + e,
                    i = o + 1;
                  (u(
                    [
                      [-a, o, -l],
                      [-a, o, l],
                      [-a, i, -l],
                      [-a, i, l],
                    ],
                    [0, 0, 1 / 16, 1],
                  ),
                    u(
                      [
                        [a, o, l],
                        [a, o, -l],
                        [a, i, l],
                        [a, i, -l],
                      ],
                      [15 / 16, 0, 1, 1],
                    ));
                }
                let c = new n.LoY();
                return (
                  c.setAttribute("position", new n.qtW(t, 3)),
                  c.setAttribute("uv", new n.qtW(r, 2)),
                  c.setIndex(s),
                  c.computeVertexNormals(),
                  c
                );
              })(o, i, d),
            [o, i],
          ),
          c = (0, r.useMemo)(
            () => new n.G_z({ map: s, transparent: !0, alphaTest: 0.01, side: n.hB5 }),
            [s],
          ),
          m = (0, r.useMemo)(() => new n.G_z({ map: a, side: n.$EB }), [a]);
        return (
          (0, r.useEffect)(
            () => () => {
              l.dispose();
            },
            [l],
          ),
          (0, r.useEffect)(
            () => () => {
              u.dispose();
            },
            [u],
          ),
          (0, r.useEffect)(
            () => () => {
              c.dispose();
            },
            [c],
          ),
          (0, r.useEffect)(
            () => () => {
              m.dispose();
            },
            [m],
          ),
          (0, t.jsxs)("group", {
            name: "Entity_Painting_Precise",
            children: [
              (0, t.jsx)("mesh", {
                geometry: l,
                material: c,
                position: [0, 0, d / 2 + 5e-4],
                castShadow: !0,
                receiveShadow: !0,
                raycast: G,
              }),
              (0, t.jsx)("mesh", {
                geometry: u,
                material: m,
                castShadow: !0,
                receiveShadow: !0,
                raycast: G,
              }),
            ],
          })
        );
      }
      function eP(e) {
        let { width: o, height: i, variant: r } = e,
          s = (function (e) {
            var o;
            let i =
                null != (o = null == e ? void 0 : e.toLowerCase().replace("minecraft:", ""))
                  ? o
                  : "",
              t = 0;
            for (let e = 0; e < i.length; e++) t = (31 * t + i.charCodeAt(e)) >>> 0;
            return new n.Q1f().setHSL((t % 360) / 360, 0.38, 0.55).getHex();
          })(r);
        return (0, t.jsxs)("group", {
          name: "Entity_Painting_Fallback",
          children: [
            (0, t.jsx)(Q, { position: [0, 0, 0], args: [o, i, 0.07], color: "#3b2a1d" }),
            (0, t.jsx)(Q, {
              position: [0, 0, 0.045],
              args: [Math.max(0.1, o - 0.14), Math.max(0.1, i - 0.14), 0.035],
              color: s,
            }),
          ],
        });
      }
      function ez(e) {
        var o, i;
        let { entity: r } = e,
          n = r.textDisplay,
          s = (null == n ? void 0 : n.text) || r.customName || "text",
          d = Math.max(
            0.8,
            Math.min(4, (null != (o = null == n ? void 0 : n.lineWidth) ? o : 120) / 80),
          ),
          l = null != (i = null == n ? void 0 : n.alignment) ? i : "center",
          u =
            (null == n ? void 0 : n.textOpacity) !== void 0
              ? Math.max(0.15, Math.min(1, n.textOpacity / 255))
              : 1;
        return (0, t.jsx)(eo, {
          transform: null == n ? void 0 : n.transform,
          children: (0, t.jsxs)("group", {
            name: "Entity_TextDisplay",
            position: [0, 0.5, 0],
            children: [
              !(null == n ? void 0 : n.defaultBackground) &&
                (0, t.jsx)(Q, {
                  position: [0, 0, -0.015],
                  args: [d + 0.2, 0.48, 0.035],
                  color: "#f4efe2",
                  opacity: 0.82,
                }),
              (0, t.jsx)(a.E, {
                position: [0, 0, 0.03],
                fontSize: 0.18,
                maxWidth: d,
                color: "#15120c",
                anchorX: l,
                anchorY: "middle",
                textAlign: l,
                fillOpacity: u,
                raycast: G,
                children: s,
              }),
            ],
          }),
        });
      }
      function ek(e, o) {
        return !!e && !!o && !!(e && o && o.blockIds.has(e)) && !o.flatIconItemIds.has(e);
      }
      function ew(e) {
        let { item: o, resources: i, atlasTexture: r, width: n = 0.62, height: s = 0.62 } = e;
        return ek(null == o ? void 0 : o.itemId, i)
          ? (0, t.jsx)(eS, {
              item: o,
              resources: i,
              atlasTexture: r,
              size: Math.min(n, s),
              fallback: (0, t.jsx)(ej, {
                item: o,
                resources: i,
                atlasTexture: r,
                width: n,
                height: s,
              }),
            })
          : (0, t.jsx)(ej, { item: o, resources: i, atlasTexture: r, width: n, height: s });
      }
      function eS(e) {
        let { item: o, resources: i, atlasTexture: n, size: s, fallback: a } = e,
          d = null == o ? void 0 : o.itemId,
          l = (0, r.useMemo)(() => (d ? { blockId: d, properties: {} } : void 0), [d]);
        return (0, t.jsxs)("group", {
          name: "Entity_ItemBlock",
          children: [
            (0, t.jsx)(ee, {
              blockState: l,
              resources: i,
              atlasTexture: n,
              scale: s,
              centered: !0,
              rejectMagentaFallback: !0,
              fallback: a,
            }),
            (0, t.jsx)(eO, { count: null == o ? void 0 : o.count, width: s, height: s }),
          ],
        });
      }
      function ej(e) {
        let { item: o, resources: i, atlasTexture: r, width: n, height: s } = e;
        return M(null == o ? void 0 : o.itemId)
          ? (0, t.jsx)(eR, { item: o, resources: i, atlasTexture: r, width: n, height: s })
          : (0, t.jsx)(eT, { item: o, resources: i, atlasTexture: r, width: n, height: s });
      }
      function eT(e) {
        let { item: o, resources: i, atlasTexture: s, width: a, height: d } = e,
          l = (0, r.useMemo)(
            () =>
              (function (e) {
                if (!e) return [];
                let o = e.replace("minecraft:", ""),
                  i = [],
                  t = new Set();
                return (
                  !(function e(o, i, t, r) {
                    var n;
                    if (!o || t > 3) return;
                    r || (i("minecraft:item/".concat(o)), i("minecraft:item/".concat(o, "_00")));
                    let s = null != (n = S[o]) ? n : r ? void 0 : j[o];
                    for (let [n, a] of (s && i(s),
                    i("minecraft:block/".concat(o)),
                    r || i("minecraft:entity/".concat(o, "/").concat(o)),
                    o.endsWith("_bed") && i("minecraft:entity/bed/".concat(o.slice(0, -4))),
                    o.endsWith("_banner") && i("minecraft:entity/banner/base"),
                    o.startsWith("waxed_") && e(o.slice(6), i, t + 1, r),
                    T)) {
                      if (!o.endsWith(n) || o.length === n.length) continue;
                      let r = o.slice(0, -n.length);
                      for (let e of a) i("minecraft:block/".concat(r).concat(e));
                      e(r, i, t + 1, !0);
                      break;
                    }
                  })(
                    o,
                    (e) => {
                      t.has(e) || (t.add(e), i.push(e));
                    },
                    0,
                    !1,
                  ),
                  i
                );
              })(null == o ? void 0 : o.itemId),
            [null == o ? void 0 : o.itemId],
          ),
          u = (0, r.useMemo)(() => eB(i, l), [i, l]),
          c = (0, r.useMemo)(
            () =>
              u
                ? (function (e, o, i) {
                    let [t, r, s, a] = e,
                      d = new n.LoY();
                    return (
                      d.setAttribute(
                        "position",
                        new n.qtW(
                          [-o / 2, -i / 2, 0, o / 2, -i / 2, 0, -o / 2, i / 2, 0, o / 2, i / 2, 0],
                          3,
                        ),
                      ),
                      d.setAttribute("uv", new n.qtW([t, a, s, a, t, r, s, r], 2)),
                      d.setIndex([0, 1, 2, 2, 1, 3]),
                      d.computeVertexNormals(),
                      d
                    );
                  })(u, a, d)
                : null,
            [u, a, d],
          ),
          m = (0, r.useMemo)(
            () =>
              s && u ? new n.V9B({ map: s, transparent: !0, alphaTest: 0.08, side: n.$EB }) : null,
            [s, u],
          );
        return ((0, r.useEffect)(
          () => () => {
            null == c || c.dispose();
          },
          [c],
        ),
        (0, r.useEffect)(
          () => () => {
            null == m || m.dispose();
          },
          [m],
        ),
        c && m)
          ? (0, t.jsxs)("group", {
              children: [
                (0, t.jsx)("mesh", { geometry: c, material: m, raycast: G }),
                (0, t.jsx)(eO, { count: null == o ? void 0 : o.count, width: a, height: d }),
              ],
            })
          : (0, t.jsx)(eM, { item: o, width: a, height: d });
      }
      function eR(e) {
        let { item: o, resources: i, atlasTexture: s, width: a, height: d } = e,
          l = null == o ? void 0 : o.itemId,
          u = (0, r.useMemo)(() => {
            let e = M(l);
            if (!e || !i) return null;
            let o = [];
            for (let [t, r] of e.entries()) {
              let e = eB(i, [r.textureId]);
              if (!e) {
                for (let e of o) e.dispose();
                return null;
              }
              o.push(
                (function (e, o, i, t, r) {
                  let [s, a, d, l] = e,
                    [u, c, m, x] = o.crop,
                    g = s + (d - s) * u,
                    p = a + (l - a) * c,
                    h = s + (d - s) * m,
                    f = a + (l - a) * x,
                    [b, y, v, _] = o.rect,
                    C = -i / 2 + b * i,
                    P = -i / 2 + v * i,
                    z = t / 2 - y * t,
                    k = t / 2 - _ * t,
                    w = new n.LoY();
                  w.setAttribute("position", new n.qtW([C, k, r, P, k, r, C, z, r, P, z, r], 3));
                  let S =
                    180 === o.rotation
                      ? [
                          [h, p],
                          [g, p],
                          [h, f],
                          [g, f],
                        ]
                      : [
                          [g, f],
                          [h, f],
                          [g, p],
                          [h, p],
                        ];
                  return (
                    w.setAttribute("uv", new n.qtW(S.flat(), 2)),
                    w.setIndex([0, 1, 2, 2, 1, 3]),
                    w.computeVertexNormals(),
                    w
                  );
                })(e, r, a, d, 0.004 * t),
              );
            }
            return o;
          }, [l, i, a, d]),
          c = (0, r.useMemo)(
            () =>
              s && u ? new n.V9B({ map: s, transparent: !0, alphaTest: 0.08, side: n.$EB }) : null,
            [s, u],
          );
        return ((0, r.useEffect)(
          () => () => {
            if (u) for (let e of u) e.dispose();
          },
          [u],
        ),
        (0, r.useEffect)(
          () => () => {
            null == c || c.dispose();
          },
          [c],
        ),
        u && c)
          ? (0, t.jsxs)("group", {
              children: [
                u.map((e, o) => (0, t.jsx)("mesh", { geometry: e, material: c, raycast: G }, o)),
                (0, t.jsx)(eO, { count: null == o ? void 0 : o.count, width: a, height: d }),
              ],
            })
          : (0, t.jsx)(eM, { item: o, width: a, height: d });
      }
      function eM(e) {
        let { item: o, width: i, height: r } = e;
        return (0, t.jsx)(Q, {
          position: [0, 0, 0],
          args: [0.58 * i, 0.58 * r, 0.045],
          color: eL(null == o ? void 0 : o.itemId),
        });
      }
      function eO(e) {
        let { count: o, width: i, height: r } = e;
        return !o || o <= 1
          ? null
          : (0, t.jsx)(a.E, {
              position: [0.36 * i, -(0.34 * r), 0.02],
              fontSize: 0.09,
              color: "#ffffff",
              anchorX: "right",
              anchorY: "bottom",
              raycast: G,
              children: String(o),
            });
      }
      function eN(e) {
        let { blockId: o } = e;
        return (0, t.jsx)("group", {
          name: "Entity_DisplayBlock",
          children: (0, t.jsx)(Q, {
            position: [0, 0.5, 0],
            args: [0.82, 0.82, 0.82],
            color: eD(o),
            opacity: 0.92,
          }),
        });
      }
      function eF(e) {
        let { showBottom: o } = e;
        return (0, t.jsxs)("group", {
          name: "Entity_EndCrystal",
          children: [
            o &&
              (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(Q, {
                    position: [0, 0.12, 0],
                    args: [0.62, 0.14, 0.62],
                    color: "#302245",
                  }),
                  (0, t.jsx)(Q, {
                    position: [0, 0.24, 0],
                    args: [0.42, 0.14, 0.42],
                    color: "#534061",
                  }),
                ],
              }),
            (0, t.jsxs)("mesh", {
              position: [0, 0.78, 0],
              rotation: [0.4, 0.4, 0.2],
              raycast: G,
              children: [
                (0, t.jsx)("octahedronGeometry", { args: [0.36, 0] }),
                (0, t.jsx)("meshLambertMaterial", {
                  color: "#f3d7ff",
                  transparent: !0,
                  opacity: 0.72,
                }),
              ],
            }),
            (0, t.jsxs)("mesh", {
              position: [0, 0.78, 0],
              rotation: [-0.2, 0.8, 0.2],
              raycast: G,
              children: [
                (0, t.jsx)("octahedronGeometry", { args: [0.22, 0] }),
                (0, t.jsx)("meshLambertMaterial", {
                  color: "#a95cff",
                  emissive: "#3c0f72",
                  emissiveIntensity: 0.35,
                }),
              ],
            }),
          ],
        });
      }
      function eE(e) {
        let { entity: o, resources: i, atlasTexture: r, forceEntityModelFallback: n } = e,
          s = n ? null : (0, A.Pc)(o);
        return s && i && r
          ? (0, t.jsx)("group", {
              name: "Entity_LeashKnot_Precise",
              children: (0, t.jsx)(J, {
                model: s.model,
                textureId: s.texture,
                resources: i,
                atlasTexture: r,
                fallback: (0, t.jsx)(eI, {}),
              }),
            })
          : (0, t.jsx)(eI, {});
      }
      function eI() {
        return (0, t.jsxs)("group", {
          name: "Entity_LeashKnot_Fallback",
          children: [
            (0, t.jsxs)("mesh", {
              position: [0, 0, 0.045],
              raycast: G,
              children: [
                (0, t.jsx)("torusGeometry", { args: [0.14, 0.035, 8, 18] }),
                (0, t.jsx)("meshLambertMaterial", { color: "#6d4a2b" }),
              ],
            }),
            (0, t.jsx)(Q, { position: [0, 0, 0], args: [0.1, 0.1, 0.1], color: "#8a633d" }),
          ],
        });
      }
      function eJ() {
        return (0, t.jsxs)("group", {
          name: "Entity_Marker",
          children: [
            (0, t.jsx)(Q, {
              position: [0, 0.2, 0],
              args: [0.34, 0.34, 0.34],
              color: "#6cc6ff",
              opacity: 0.28,
              wireframe: !0,
            }),
            (0, t.jsx)(Q, {
              position: [0, 0.2, 0],
              args: [0.04, 0.42, 0.04],
              color: "#6cc6ff",
              opacity: 0.45,
            }),
            (0, t.jsx)(Q, {
              position: [0, 0.2, 0],
              args: [0.42, 0.04, 0.04],
              color: "#6cc6ff",
              opacity: 0.45,
            }),
            (0, t.jsx)(Q, {
              position: [0, 0.2, 0],
              args: [0.04, 0.04, 0.42],
              color: "#6cc6ff",
              opacity: 0.45,
            }),
          ],
        });
      }
      function eA(e) {
        var o, i, r, n;
        let { entity: s } = e,
          a = Math.max(0.2, null != (r = null == (o = s.interaction) ? void 0 : o.width) ? r : 1),
          d = Math.max(0.2, null != (n = null == (i = s.interaction) ? void 0 : i.height) ? n : 1);
        return (0, t.jsx)("group", {
          name: "Entity_Interaction",
          children: (0, t.jsx)(Q, {
            position: [0, d / 2, 0],
            args: [a, d, a],
            color: "#b36cff",
            opacity: 0.18,
            wireframe: !0,
          }),
        });
      }
      function eU(e) {
        let { entityId: o } = e;
        return (0, t.jsxs)("group", {
          name: "Entity_Generic",
          children: [
            (0, t.jsx)(Q, { position: [0, 0.4, 0], args: [0.42, 0.42, 0.42], color: eW(o) }),
            (0, t.jsx)(Q, {
              position: [0, 0.92, 0],
              args: [0.18, 0.62, 0.18],
              color: eW(o),
              opacity: 0.85,
            }),
          ],
        });
      }
      function eq(e) {
        let { facing: o, children: i } = e;
        return (0, t.jsx)("group", { rotation: p(o), children: i });
      }
      function eB(e, o) {
        if (!e) return null;
        for (let i of o)
          if ((0, l.nV)(i))
            try {
              let o = e.atlas.getTextureUV(d.gw.parse(i));
              if (o && 4 === o.length) return [o[0], o[1], o[2], o[3]];
            } catch (e) {}
        return null;
      }
      function eD(e) {
        if (!e) return "#8b8f98";
        let o = e.replace("minecraft:", "");
        return o.includes("redstone") || o.includes("tnt")
          ? "#d13f2f"
          : o.includes("gold") || o.includes("honey")
            ? "#d6a931"
            : o.includes("diamond") || o.includes("ice")
              ? "#4aaecf"
              : o.includes("emerald") || o.includes("slime")
                ? "#3fab5f"
                : o.includes("wood") || o.includes("planks") || o.includes("log")
                  ? "#8a5a2b"
                  : o.includes("stone") || o.includes("ore") || o.includes("deepslate")
                    ? "#777b82"
                    : "#8b8f98";
      }
      function eL(e) {
        if (!e) return "#8b8f98";
        let o = e.replace("minecraft:", "");
        return o.includes("netherite")
          ? "#3a303d"
          : o.includes("diamond")
            ? "#46c8d8"
            : o.includes("gold") || o.includes("golden")
              ? "#f0c644"
              : o.includes("iron") || o.includes("chainmail")
                ? "#c9ced4"
                : o.includes("copper")
                  ? "#c8793b"
                  : o.includes("leather")
                    ? "#8f5a34"
                    : o.includes("shield")
                      ? "#7b5430"
                      : o.includes("sword") ||
                          o.includes("axe") ||
                          o.includes("pickaxe") ||
                          o.includes("shovel") ||
                          o.includes("hoe")
                        ? "#b7bcc5"
                        : o.includes("bow") || o.includes("crossbow") || o.includes("stick")
                          ? "#8a5a2b"
                          : o.includes("redstone") || o.includes("tnt")
                            ? "#d13f2f"
                            : eD(e);
      }
      function eW(e) {
        let o = 0;
        for (let i = 0; i < e.length; i++) o = (31 * o + e.charCodeAt(i)) >>> 0;
        let i = (o % 360) / 360;
        return new n.Q1f().setHSL(i, 0.55, 0.52).getHex();
      }
      let eY = V;
    },
    56624: (e, o, i) => {
      i.d(o, { f: () => a, p: () => n });
      var t = i(85339),
        r = i(82084);
      function n(e) {
        let o = -1 / 0,
          i = (e, r) => {
            let n = e.partPose,
              s = new t.kn4();
            (s.makeTranslation(
              (null == n ? void 0 : n.x) || 0,
              (null == n ? void 0 : n.y) || 0,
              (null == n ? void 0 : n.z) || 0,
            ),
              (null == n ? void 0 : n.zRot) && s.multiply(new t.kn4().makeRotationZ(n.zRot)),
              (null == n ? void 0 : n.yRot) && s.multiply(new t.kn4().makeRotationY(n.yRot)),
              (null == n ? void 0 : n.xRot) && s.multiply(new t.kn4().makeRotationX(n.xRot)));
            let a = r.clone().multiply(s);
            if (e.cubes)
              for (let i of e.cubes) {
                let e = i.grow || 0,
                  [r, n, s] = i.origin,
                  [d, l, u] = i.dimensions;
                for (let i of [r - e, r + d + e])
                  for (let r of [n - e, n + l + e])
                    for (let n of [s - e, s + u + e]) {
                      let e = new t.Pq0(i, r, n).applyMatrix4(a);
                      e.y > o && (o = e.y);
                    }
              }
            if (e.children) for (let o of Object.values(e.children)) i(o, a);
          };
        return (i(e.mesh.root, new t.kn4()), o === -1 / 0 ? 0 : o);
      }
      let s = 1 / 16;
      function a(e, o, i, n) {
        var a, d, l;
        let u = (null == (a = e.material) ? void 0 : a.xTexSize) || 64,
          c = (null == (d = e.material) ? void 0 : d.yTexSize) || 64,
          m = 0,
          x = 0,
          g = 1,
          p = 1;
        if (!(null == n ? void 0 : n.standaloneTexture)) {
          let e = (function (e, o) {
            try {
              let i = e.atlas.getTextureUV(r.gw.parse(o));
              if (i && 4 === i.length) return [i[0], i[1], i[2], i[3]];
            } catch (e) {}
            return null;
          })(i, o);
          if (!e) return null;
          let [t, n, s, a] = e;
          ((m = t), (x = n), (g = s), (p = a));
          let d = i.atlas.getTextureAtlas(),
            l = (s - m) * d.width,
            h = (a - x) * d.height,
            f = u / c,
            b = l / h;
          Number.isFinite(b) && b > f + 1e-6
            ? (g = m + (h * f) / d.width)
            : Number.isFinite(b) && b < f - 1e-6 && (p = x + l / f / d.height);
        }
        let h = (e) => m + (e / u) * (g - m),
          f = (e) => x + (e / c) * (p - x),
          b = [],
          y = [],
          v = [],
          _ = 0,
          C = null != (l = e.anchorMaxY) ? l : -1 / 0,
          P = !0 === e.anchorFixed && void 0 !== e.anchorMaxY;
        function z(e, o, i) {
          let t = [
            { corner: e[0], uv: [o[2], o[1]] },
            { corner: e[1], uv: [o[0], o[1]] },
            { corner: e[2], uv: [o[0], o[3]] },
            { corner: e[3], uv: [o[2], o[3]] },
          ];
          i && t.reverse();
          for (let e = 0; e < 4; e++) {
            let { corner: o, uv: i } = t[e];
            (b.push(o[0], o[1], o[2]), !P && o[1] > C && (C = o[1]), y.push(h(i[0]), f(i[1])));
          }
          (v.push(_, _ + 1, _ + 2, _, _ + 2, _ + 3), (_ += 4));
        }
        if (
          (!(function e(o, i, r) {
            var s;
            let a = i.partPose,
              d = null == n || null == (s = n.poseOverrides) ? void 0 : s[o],
              l = new t.kn4();
            l.makeTranslation(
              (null == a ? void 0 : a.x) || 0,
              (null == a ? void 0 : a.y) || 0,
              (null == a ? void 0 : a.z) || 0,
            );
            let u = ((null == a ? void 0 : a.xRot) || 0) + ((null == d ? void 0 : d[0]) || 0),
              c = ((null == a ? void 0 : a.yRot) || 0) + ((null == d ? void 0 : d[1]) || 0),
              m = ((null == a ? void 0 : a.zRot) || 0) + ((null == d ? void 0 : d[2]) || 0);
            (m && l.multiply(new t.kn4().makeRotationZ(m)),
              c && l.multiply(new t.kn4().makeRotationY(c)),
              u && l.multiply(new t.kn4().makeRotationX(u)));
            let x = r.clone().multiply(l);
            if (i.cubes)
              for (let e of i.cubes)
                !(function (e, o) {
                  let i = e.grow || 0,
                    [r, n, s] = e.origin,
                    [a, d, l] = e.dimensions,
                    u = r - i,
                    c = r + a + i,
                    m = n - i,
                    x = n + d + i,
                    g = s - i,
                    p = s + l + i;
                  if (e.mirror) {
                    let e = u;
                    ((u = c), (c = e));
                  }
                  let h = (e, i, r) => {
                      let n = new t.Pq0(e, i, r).applyMatrix4(o);
                      return [n.x, n.y, n.z];
                    },
                    f = h(u, m, g),
                    b = h(c, m, g),
                    y = h(c, x, g),
                    v = h(u, x, g),
                    _ = h(u, m, p),
                    C = h(c, m, p),
                    P = h(c, x, p),
                    k = h(u, x, p),
                    w = (function (e, o, i, t, r) {
                      let n = e + r,
                        s = e + r + i,
                        a = e + 2 * r + i,
                        d = o + r,
                        l = o + r + t;
                      return {
                        down: [n, o, s, d],
                        up: [s, d, e + r + 2 * i, o],
                        west: [e, d, n, l],
                        north: [n, d, s, l],
                        east: [s, d, a, l],
                        south: [a, d, e + 2 * r + 2 * i, l],
                      };
                    })(e.texCoord.u, e.texCoord.v, a, d, l),
                    S = e.mirror;
                  (z([C, _, f, b], w.down, S),
                    z([y, v, k, P], w.up, S),
                    z([f, _, k, v], w.west, S),
                    z([b, f, v, y], w.north, S),
                    z([C, b, y, P], w.east, S),
                    z([_, C, P, k], w.south, S));
                })(e, x);
            if (i.children) for (let [o, t] of Object.entries(i.children)) e(o, t, x);
          })("root", e.mesh.root, new t.kn4()),
          0 === _)
        )
          return null;
        let k = new Float32Array(b.length);
        for (let e = 0; e < b.length; e += 3)
          ((k[e] = -b[e] * s), (k[e + 1] = (C - b[e + 1]) * s), (k[e + 2] = b[e + 2] * s));
        let w = new t.LoY();
        return (
          w.setAttribute("position", new t.THS(k, 3)),
          w.setAttribute("uv", new t.THS(new Float32Array(y), 2)),
          w.setIndex(v),
          w.computeVertexNormals(),
          w.computeBoundingBox(),
          w.computeBoundingSphere(),
          w
        );
      }
    },
    65227: (e, o, i) => {
      i.d(o, { SD: () => s, eL: () => n, fu: () => r });
      var t = i(85339);
      function r(e) {
        var o, i, r, n, s, c;
        let m =
          "standard" === e.kind
            ? new t._4j({
                map: e.atlasTexture,
                vertexColors: !0,
                side: null != (o = e.defaultSide) ? o : t.hB5,
              })
            : new t.G_z({
                map: e.atlasTexture,
                vertexColors: !0,
                side: null != (i = e.defaultSide) ? i : t.hB5,
              });
        return (
          (function (e, o) {
            var i;
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            ((e.side = o.needsDoubleSide
              ? t.$EB
              : o.needsTransparent
                ? t.hB5
                : null != (i = r.defaultSide)
                  ? i
                  : t.hB5),
              (e.alphaTest = o.alphaTest),
              (e.transparent = o.transparent),
              (e.opacity = o.opacity),
              (e.depthWrite = o.depthWrite),
              (e.polygonOffset = o.polygonOffset),
              (e.polygonOffsetFactor = o.polygonOffsetFactor),
              (e.polygonOffsetUnits = o.polygonOffsetUnits),
              (e.forceSinglePass = o.forceSinglePass),
              (e.emissive = new t.Q1f(0)),
              (e.emissiveIntensity = 1),
              d(e, a(o, r.emissiveConfig)));
          })(m, e.visualProfile, { defaultSide: e.defaultSide, emissiveConfig: e.emissiveConfig }),
          (function (e, o) {
            var i, t, r, n;
            let s =
                null == (t = o.animationConfig) || null == (i = t.regions)
                  ? void 0
                  : i.filter(
                      (e) =>
                        e.frameCount > 1 && e.vOffsetPerFrame > 0 && e.u1 > e.u0 && e.v1 > e.v0,
                    ),
              a = !!(s && s.length > 0),
              l = o.emissionConfig,
              c = !!l;
            if (!a && !c) return;
            let m = null != s ? s : [],
              x =
                (null == (r = o.animationConfig) ? void 0 : r.fps) && o.animationConfig.fps > 0
                  ? o.animationConfig.fps
                  : 10,
              g = m
                .map((e) =>
                  [u(e.u0), u(e.v0), u(e.u1), u(e.v1), u(e.frameCount), u(e.vOffsetPerFrame)].join(
                    ",",
                  ),
                )
                .join("|"),
              p =
                null !=
                (n =
                  null == l
                    ? void 0
                    : l.maskRegions
                        .map((e) =>
                          [
                            u(e.sourceU0),
                            u(e.sourceV0),
                            u(e.sourceU1),
                            u(e.sourceV1),
                            u(e.maskU0),
                            u(e.maskV0),
                            u(e.maskU1),
                            u(e.maskV1),
                          ].join(","),
                        )
                        .join("|"))
                  ? n
                  : "no-mask",
              h = l
                ? "".concat(u(l.luminanceThreshold), ":").concat(u(l.luminanceSoftness))
                : "none",
              f = e.onBeforeCompile,
              b = e.customProgramCacheKey.bind(e);
            (a && (e.userData.blockAnimationConfig = { fps: x, regions: m }),
              l && ((e.userData.blockEmissionConfig = l), d(e, l.intensity)),
              (e.customProgramCacheKey = () =>
                [
                  b(),
                  a ? "block-anim:".concat(g, ":").concat(u(x)) : "block-anim:none",
                  c ? "block-emission:".concat(p, ":").concat(h) : "block-emission:none",
                ].join("|")),
              (e.onBeforeCompile = (o, i) => {
                f.call(e, o, i);
                let t = [];
                if (
                  (a &&
                    ((o.uniforms.blockAnimTime = { value: 0 }),
                    (e.userData.blockAnimationUniforms = o.uniforms),
                    t.push("uniform float blockAnimTime;")),
                  l)
                ) {
                  var r;
                  ((o.uniforms.blockEmissionIntensity = {
                    value: null != (r = e.userData.blockEmissionIntensityValue) ? r : l.intensity,
                  }),
                    (e.userData.blockEmissionUniforms = o.uniforms),
                    t.push("uniform float blockEmissionIntensity;"));
                }
                let n = o.fragmentShader.includes("#include <map_fragment>");
                (t.length > 0 &&
                  (o.fragmentShader = o.fragmentShader.replace(
                    "void main() {",
                    "".concat(t.join("\n"), "\nvoid main() {"),
                  )),
                  n &&
                    (o.fragmentShader = o.fragmentShader.replace(
                      "#include <map_fragment>",
                      (function (e, o) {
                        let i = e
                          .map((e, i) => {
                            let t = u(e.u0 - 1e-5),
                              r = u(e.v0 - 1e-5),
                              n = u(e.u1 + 1e-5),
                              s = u(e.v1 + 1e-5),
                              a = u(Math.max(1, Math.floor(e.frameCount))),
                              d = u(e.vOffsetPerFrame),
                              l = "blockAnimFrame".concat(i);
                            return "\n  if (vMapUv.x >= "
                              .concat(t, " && vMapUv.x <= ")
                              .concat(n, " && vMapUv.y >= ")
                              .concat(r, " && vMapUv.y <= ")
                              .concat(s, ") {\n    float ")
                              .concat(l, " = mod(floor(blockAnimTime * ")
                              .concat(u(o), "), ")
                              .concat(a, ");\n    blockMapUv.y = vMapUv.y + ")
                              .concat(l, " * ")
                              .concat(d, ";\n  }");
                          })
                          .join("\n");
                        return "\nvec4 blockAlbedoTexel = vec4(1.0);\n#ifdef USE_MAP\n  vec2 blockMapUv = vMapUv;\n".concat(
                          i,
                          "\n  blockAlbedoTexel = texture2D(map, blockMapUv);\n  #ifdef DECODE_VIDEO_TEXTURE\n    blockAlbedoTexel = sRGBTransferEOTF(blockAlbedoTexel);\n  #endif\n  diffuseColor *= blockAlbedoTexel;\n#endif",
                        );
                      })(m, x),
                    )),
                  l &&
                    n &&
                    o.fragmentShader.includes("#include <emissivemap_fragment>") &&
                    (o.fragmentShader = o.fragmentShader.replace(
                      "#include <emissivemap_fragment>",
                      (function (e) {
                        let o = e.maskRegions,
                          i = o
                            .map((e, o) => {
                              let i = u(e.sourceU0 - 1e-5),
                                t = u(e.sourceV0 - 1e-5),
                                r = u(e.sourceU1 + 1e-5),
                                n = u(e.sourceV1 + 1e-5),
                                s = u(e.sourceU1 - e.sourceU0),
                                a = u(e.sourceV1 - e.sourceV0),
                                d = u(e.maskU0),
                                l = u(e.maskV0),
                                c = u(e.maskU1 - e.maskU0),
                                m = u(e.maskV1 - e.maskV0),
                                x = "blockEmissionMaskUv".concat(o),
                                g = "blockEmissionMaskColor".concat(o);
                              return "\n  if (vMapUv.x >= "
                                .concat(i, " && vMapUv.x <= ")
                                .concat(r, " && vMapUv.y >= ")
                                .concat(t, " && vMapUv.y <= ")
                                .concat(n, ") {\n    vec2 ")
                                .concat(x, " = vec2(\n      ")
                                .concat(d, " + ((vMapUv.x - ")
                                .concat(u(e.sourceU0), ") / ")
                                .concat(s, ") * ")
                                .concat(c, ",\n      ")
                                .concat(l, " + ((vMapUv.y - ")
                                .concat(u(e.sourceV0), ") / ")
                                .concat(a, ") * ")
                                .concat(m, "\n    );\n    vec4 ")
                                .concat(g, " = texture2D(map, ")
                                .concat(x, ");\n    blockEmissionMask = dot(")
                                .concat(g, ".rgb, vec3(0.299, 0.587, 0.114)) * ")
                                .concat(g, ".a;\n  }");
                            })
                            .join("\n"),
                          t = o.length > 0 ? "0.0" : "1.0",
                          r =
                            0 === o.length && e.luminanceThreshold > 0
                              ? "\nfloat blockEmissionLuminance = dot(blockAlbedoTexel.rgb, vec3(0.299, 0.587, 0.114));\nblockEmissionMask *= smoothstep(\n  "
                                  .concat(u(e.luminanceThreshold), ",\n  ")
                                  .concat(
                                    u(Math.min(1, e.luminanceThreshold + e.luminanceSoftness)),
                                    ",\n  blockEmissionLuminance\n);",
                                  )
                              : "";
                        return "\nfloat blockEmissionMask = "
                          .concat(t, ";\n")
                          .concat(i, "\n")
                          .concat(
                            r,
                            "\nfloat blockEmissionStrength = max(blockEmissionIntensity, 0.0) * clamp(blockEmissionMask, 0.0, 1.0);\ntotalEmissiveRadiance += blockAlbedoTexel.rgb * blockEmissionStrength;",
                          );
                      })(l),
                    )));
              }),
              (e.needsUpdate = !0));
          })(m, {
            animationConfig: e.animationConfig,
            emissionConfig:
              ((r = e.visualProfile),
              (n = e.emissiveConfig),
              (s = e.emissionMaskConfig),
              r.needsEmissive
                ? {
                    intensity: a(r, n),
                    maskRegions: (null != (c = null == s ? void 0 : s.regions) ? c : []).filter(
                      (e) =>
                        e.sourceU1 > e.sourceU0 &&
                        e.sourceV1 > e.sourceV0 &&
                        e.maskU1 > e.maskU0 &&
                        e.maskV1 > e.maskV0,
                    ),
                    luminanceThreshold: l(r.emissiveLuminanceThreshold),
                    luminanceSoftness: l(r.emissiveLuminanceSoftness || 0.2),
                  }
                : null),
          }),
          m
        );
      }
      function n(e, o) {
        let i = e.userData.blockAnimationUniforms;
        (null == i ? void 0 : i.blockAnimTime) && (i.blockAnimTime.value = o);
      }
      function s(e, o, i) {
        if (i.highlighted) {
          var r, n;
          ((e.emissive = new t.Q1f(4473856)),
            (e.emissiveIntensity = Math.max(
              null != (n = null == (r = i.emissiveConfig) ? void 0 : r.intensity) ? n : 0,
              1,
            )),
            d(e, a(o, i.emissiveConfig)),
            (e.opacity = o.highlightedOpacity),
            (e.transparent = o.transparent),
            (e.visible = !0));
        } else
          i.dimmed
            ? (e.visible = !1)
            : ((e.emissive = new t.Q1f(0)),
              (e.emissiveIntensity = 1),
              d(e, a(o, i.emissiveConfig)),
              (e.opacity = o.opacity),
              (e.transparent = o.transparent),
              (e.visible = !0));
        e.needsUpdate = !0;
      }
      function a(e, o) {
        var i, t, r;
        return (null == o ? void 0 : o.enabled) && e.needsEmissive
          ? ((i = e),
            (null != (r = null == (t = o) ? void 0 : t.intensity) ? r : 1) *
              i.emissiveIntensityMultiplier)
          : 0;
      }
      function d(e, o) {
        let i = Number.isFinite(o) ? Math.max(0, o) : 0;
        e.userData.blockEmissionIntensityValue = i;
        let t = e.userData.blockEmissionUniforms;
        (null == t ? void 0 : t.blockEmissionIntensity) && (t.blockEmissionIntensity.value = i);
      }
      function l(e) {
        return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 0;
      }
      function u(e) {
        if (!Number.isFinite(e)) return "0.0";
        let o = e.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
        return o.includes(".") ? o : "".concat(o, ".0");
      }
    },
    85336: (e, o, i) => {
      i.d(o, { _: () => o2, sK: () => oZ, iw: () => oG, Xq: () => o0, Pc: () => o$ });
      var t = i(56624),
        r = i(56841);
      let n = JSON.parse(
          '{"mesh":{"root":{"children":{"root":{"partPose":{"y":23.5},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-2.5,-5,-2.5],"dimensions":[5,5,5],"grow":0}],"partPose":{"y":-3.99}},"body":{"cubes":[{"texCoord":{"u":0,"v":10},"origin":[-1.5,0,-1],"dimensions":[3,4,2],"grow":0},{"texCoord":{"u":0,"v":16},"origin":[-1.5,0,-1],"dimensions":[3,5,2],"grow":-0.2}],"partPose":{"y":-4},"children":{"right_arm":{"cubes":[{"texCoord":{"u":23,"v":0},"origin":[-0.75,-0.5,-1],"dimensions":[1,4,2],"grow":-0.01}],"partPose":{"x":-1.75,"y":0.5}},"left_arm":{"cubes":[{"texCoord":{"u":23,"v":6},"origin":[-0.25,-0.5,-1],"dimensions":[1,4,2],"grow":-0.01}],"partPose":{"x":1.75,"y":0.5}},"right_wing":{"cubes":[{"texCoord":{"u":16,"v":14},"origin":[0,1,0],"dimensions":[0,5,8],"grow":0}],"partPose":{"x":-0.5,"z":0.65}},"left_wing":{"cubes":[{"texCoord":{"u":16,"v":14},"origin":[0,1,0],"dimensions":[0,5,8],"grow":0}],"partPose":{"x":0.5,"z":0.65}}}}}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        s = JSON.parse(
          '{"mesh":{"root":{"children":{"part0":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":9,"y":-1}},"part1":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":4.8629956,"y":-1.1224087,"z":7.573063}},"part2":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":-3.7447278,"y":-1.4596672,"z":8.1839485}},"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-4,-4],"dimensions":[8,8,8]}]},"part3":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":-8.909916,"y":-1.9292085,"z":1.2701955}},"part11":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":-4.7308364,"y":10.614307,"z":-1.6183898}},"part4":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":4.9497476,"y":1.5839192,"z":4.9497476}},"part10":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":-3.9177248,"y":11.34671,"z":3.1066754}},"part5":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":-1.4904609,"y":1.1989107,"z":6.839483}},"part6":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":-6.560437,"y":1.0100093,"z":2.4414468}},"part7":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":-5.5987754,"y":1.0635324,"z":-4.201632}},"part8":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":4.455076,"y":11.960163,"z":2.269867}},"part9":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,0,0],"dimensions":[2,8,2]}],"partPose":{"x":0.49724108,"y":11.893008,"z":4.9752135}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        a = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":32,"v":4},"origin":[-4,-4,-8],"dimensions":[8,8,8]}],"partPose":{"y":15,"z":-3}},"right_front_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15,"z":-1}},"right_hind_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15,"z":2}},"left_middle_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15}},"body0":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3,-3,-3],"dimensions":[6,6,6]}],"partPose":{"y":15}},"body1":{"cubes":[{"texCoord":{"u":0,"v":12},"origin":[-5,-4,-6],"dimensions":[10,8,12]}],"partPose":{"y":15,"z":9}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15,"z":2}},"right_middle_hind_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15,"z":1}},"right_middle_front_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15}},"left_middle_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15,"z":1}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15,"z":-1}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        d = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":11,"v":0},"origin":[-1,-2,-3],"dimensions":[2,4,3]}],"partPose":{"y":22}},"nose":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-2,-1],"dimensions":[2,3,1]}],"partPose":{"y":22,"z":-3}},"left_fin":{"cubes":[{"texCoord":{"u":22,"v":4},"origin":[0,0,-1],"dimensions":[2,0,2]}],"partPose":{"zRot":0.7853982,"x":1,"y":23}},"top_fin":{"cubes":[{"texCoord":{"u":20,"v":-6},"origin":[0,-1,-1],"dimensions":[0,1,6]}],"partPose":{"y":20}},"right_fin":{"cubes":[{"texCoord":{"u":22,"v":1},"origin":[-2,0,-1],"dimensions":[2,0,2]}],"partPose":{"zRot":-0.7853982,"x":-1,"y":23}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-2,0],"dimensions":[2,4,7]}],"partPose":{"y":22}},"tail_fin":{"cubes":[{"texCoord":{"u":22,"v":3},"origin":[0,-2,0],"dimensions":[0,4,4]}],"partPose":{"y":22,"z":7}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        l = JSON.parse(
          '{"mesh":{"root":{"children":{"body":{"cubes":[{"texCoord":{"u":22,"v":0},"origin":[-4,-7,0],"dimensions":[8,7,13]}],"partPose":{"y":22,"z":-5},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-3,-3],"dimensions":[8,7,6]}],"partPose":{"y":-4,"z":-3},"children":{"nose":{"cubes":[{"texCoord":{"u":0,"v":13},"origin":[-1,2,-7],"dimensions":[2,2,4]}]}}},"left_fin":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":20},"origin":[-0.5,-4,0],"dimensions":[1,4,7]}],"partPose":{"xRot":1.0471976,"zRot":2.0943952,"x":2,"y":-2,"z":4}},"right_fin":{"cubes":[{"texCoord":{"u":48,"v":20},"origin":[-0.5,-4,0],"dimensions":[1,4,7]}],"partPose":{"xRot":1.0471976,"zRot":-2.0943952,"x":-2,"y":-2,"z":4}},"tail":{"cubes":[{"texCoord":{"u":0,"v":19},"origin":[-2,-2.5,0],"dimensions":[4,5,11]}],"partPose":{"xRot":-0.10471976,"y":-2.5,"z":11},"children":{"tail_fin":{"cubes":[{"texCoord":{"u":19,"v":20},"origin":[-5,-0.5,0],"dimensions":[10,1,6]}],"partPose":{"z":9}}}},"back_fin":{"cubes":[{"texCoord":{"u":51,"v":0},"origin":[-0.5,0,8],"dimensions":[1,4,5]}],"partPose":{"xRot":1.0471976}}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        u = JSON.parse(
          '{"mesh":{"root":{"children":{"right_front_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":-12}},"right_hind_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":7}},"left_front_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":-12}},"right_hind_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":7}},"right_front_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":-12}},"head_parts":{"cubes":[{"texCoord":{"u":0,"v":35},"origin":[-2.05,-6,-2],"dimensions":[4,12,7]}],"partPose":{"xRot":0.5235988,"y":4,"z":-12},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":13},"origin":[-3,-11,-2],"dimensions":[6,5,7]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":0,"v":12},"origin":[-1,-7,0],"dimensions":[2,7,1]}],"partPose":{"xRot":0.2617994,"zRot":-0.2617994,"x":-1.25,"y":-10,"z":4}},"left_ear":{"cubes":[{"texCoord":{"u":0,"v":12},"origin":[-1,-7,0],"dimensions":[2,7,1]}],"partPose":{"xRot":0.2617994,"zRot":0.2617994,"x":1.25,"y":-10,"z":4}}}},"left_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[2,-9,-6],"dimensions":[1,2,2]}]},"mouth_saddle_wrap":{"cubes":[{"texCoord":{"u":19,"v":0},"origin":[-2,-11,-4],"dimensions":[4,5,2],"grow":0.2}]},"right_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[-3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"mane":{"cubes":[{"texCoord":{"u":56,"v":36},"origin":[-1,-11,5.01],"dimensions":[2,16,2]}]},"right_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[-3,-9,-6],"dimensions":[1,2,2]}]},"left_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"upper_mouth":{"cubes":[{"texCoord":{"u":0,"v":25},"origin":[-2,-11,-7],"dimensions":[4,5,5]}]},"head_saddle":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-3,-11,-1.9],"dimensions":[6,5,6],"grow":0.2}]}}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":7}},"body":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-5,-8,-17],"dimensions":[10,10,22],"grow":0.05}],"partPose":{"y":11,"z":5},"children":{"right_chest":{"cubes":[{"texCoord":{"u":26,"v":21},"origin":[-4,0,-2],"dimensions":[8,8,3]}],"partPose":{"yRot":1.5707964,"x":-6,"y":-8}},"saddle":{"cubes":[{"texCoord":{"u":26,"v":0},"origin":[-5,-8,-9],"dimensions":[10,9,9],"grow":0.5}]},"tail":{"cubes":[{"texCoord":{"u":42,"v":36},"origin":[-1.5,0,0],"dimensions":[3,14,4]}],"partPose":{"xRot":0.5235988,"y":-5,"z":2}},"left_chest":{"cubes":[{"texCoord":{"u":26,"v":21},"origin":[-4,0,-2],"dimensions":[8,8,3]}],"partPose":{"yRot":-1.5707964,"x":6,"y":-8}}}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":-12}},"left_hind_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":7}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        c = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-6,10,-8],"dimensions":[12,12,16]},{"texCoord":{"u":0,"v":28},"origin":[-8,10,-6],"dimensions":[2,12,12]},{"mirror":true,"texCoord":{"u":0,"v":28},"origin":[6,10,-6],"dimensions":[2,12,12]},{"texCoord":{"u":16,"v":40},"origin":[-6,8,-6],"dimensions":[12,2,12]},{"texCoord":{"u":16,"v":40},"origin":[-6,22,-6],"dimensions":[12,2,12]}],"children":{"spike10":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":2.3561945,"x":7.932871,"y":23.93287}},"spike11":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":3.926991,"x":-8.000353,"y":24.000353}},"spike6":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":3.926991,"x":8.076813,"y":16,"z":8.076813}},"spike7":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":2.3561945,"x":-8.060315,"y":16,"z":8.060315}},"spike8":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":3.926991,"y":23.988361,"z":7.9883604}},"spike9":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":2.3561945,"y":23.92711,"z":-7.9271107}},"eye":{"cubes":[{"texCoord":{"u":8,"v":0},"origin":[-1,15,0],"dimensions":[2,2,1]}],"partPose":{"z":-8.25}},"tail0":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-2,14,7],"dimensions":[4,4,8]}],"children":{"tail1":{"cubes":[{"texCoord":{"u":0,"v":54},"origin":[0,14,0],"dimensions":[3,3,7]}],"partPose":{"x":-1.5,"y":0.5,"z":14},"children":{"tail2":{"cubes":[{"texCoord":{"u":41,"v":32},"origin":[0,14,0],"dimensions":[2,2,6]},{"texCoord":{"u":25,"v":19},"origin":[1,10.5,3],"dimensions":[1,9,9]}],"partPose":{"x":0.5,"y":0.5,"z":6}}}}}},"spike0":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":5.4977875,"y":7.92,"z":8.08}},"spike1":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":0.7853982,"y":7.9567738,"z":-8.043226}},"spike2":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":0.7853982,"x":7.9667134,"y":8.033287}},"spike3":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":5.4977875,"x":-7.9208007,"y":8.079199}},"spike4":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":0.7853982,"x":-7.9477057,"y":16,"z":-7.9477057}},"spike5":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":5.4977875,"x":8.022686,"y":16,"z":-8.022686}}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        m = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":176,"v":44},"comment":"upperlip","origin":[-6,-1,-24],"dimensions":[12,5,16]},{"texCoord":{"u":112,"v":30},"comment":"upperhead","origin":[-8,-8,-10],"dimensions":[16,16,16]},{"mirror":true,"texCoord":{"u":0,"v":0},"comment":"scale","origin":[-5,-12,-4],"dimensions":[2,4,6]},{"mirror":true,"texCoord":{"u":112,"v":0},"comment":"nostril","origin":[-5,-3,-22],"dimensions":[2,2,4]},{"mirror":true,"texCoord":{"u":0,"v":0},"comment":"scale","origin":[3,-12,-4],"dimensions":[2,4,6]},{"mirror":true,"texCoord":{"u":112,"v":0},"comment":"nostril","origin":[3,-3,-22],"dimensions":[2,2,4]}],"children":{"jaw":{"cubes":[{"texCoord":{"u":176,"v":65},"comment":"jaw","origin":[-6,0,-16],"dimensions":[12,4,16]}],"partPose":{"y":4,"z":-8}}}},"right_front_leg":{"cubes":[{"texCoord":{"u":112,"v":104},"comment":"main","origin":[-4,-4,-4],"dimensions":[8,24,8]}],"partPose":{"x":-12,"y":20,"z":2},"children":{"right_front_leg_tip":{"cubes":[{"texCoord":{"u":226,"v":138},"comment":"main","origin":[-3,-1,-3],"dimensions":[6,24,6]}],"partPose":{"y":20,"z":-1},"children":{"right_front_foot":{"cubes":[{"texCoord":{"u":144,"v":104},"comment":"main","origin":[-4,0,-12],"dimensions":[8,4,16]}],"partPose":{"y":23}}}}}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":0},"comment":"main","origin":[-8,-4,-8],"dimensions":[16,32,16]}],"partPose":{"x":-16,"y":16,"z":42},"children":{"right_hind_leg_tip":{"cubes":[{"texCoord":{"u":196,"v":0},"comment":"main","origin":[-6,-2,0],"dimensions":[12,32,12]}],"partPose":{"y":32,"z":-4},"children":{"right_hind_foot":{"cubes":[{"texCoord":{"u":112,"v":0},"comment":"main","origin":[-9,0,-20],"dimensions":[18,6,24]}],"partPose":{"y":31,"z":4}}}}}},"right_wing":{"cubes":[{"texCoord":{"u":112,"v":88},"comment":"bone","origin":[-56,-4,-4],"dimensions":[56,8,8]},{"texCoord":{"u":-56,"v":88},"comment":"skin","origin":[-56,0,2],"dimensions":[56,0,56]}],"partPose":{"x":-12,"y":5,"z":2},"children":{"right_wing_tip":{"cubes":[{"texCoord":{"u":112,"v":136},"comment":"bone","origin":[-56,-2,-2],"dimensions":[56,4,4]},{"texCoord":{"u":-56,"v":144},"comment":"skin","origin":[-56,0,2],"dimensions":[56,0,56]}],"partPose":{"x":-56}}}},"left_wing":{"cubes":[{"mirror":true,"texCoord":{"u":112,"v":88},"comment":"bone","origin":[0,-4,-4],"dimensions":[56,8,8]},{"mirror":true,"texCoord":{"u":-56,"v":88},"comment":"skin","origin":[0,0,2],"dimensions":[56,0,56]}],"partPose":{"x":12,"y":5,"z":2},"children":{"left_wing_tip":{"cubes":[{"mirror":true,"texCoord":{"u":112,"v":136},"comment":"bone","origin":[0,-2,-2],"dimensions":[56,4,4]},{"mirror":true,"texCoord":{"u":-56,"v":144},"comment":"skin","origin":[0,0,2],"dimensions":[56,0,56]}],"partPose":{"x":56}}}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":0},"comment":"main","origin":[-8,-4,-8],"dimensions":[16,32,16]}],"partPose":{"x":16,"y":16,"z":42},"children":{"left_hind_leg_tip":{"cubes":[{"texCoord":{"u":196,"v":0},"comment":"main","origin":[-6,-2,0],"dimensions":[12,32,12]}],"partPose":{"y":32,"z":-4},"children":{"left_hind_foot":{"cubes":[{"texCoord":{"u":112,"v":0},"comment":"main","origin":[-9,0,-20],"dimensions":[18,6,24]}],"partPose":{"y":31,"z":4}}}}}},"neck":{"cubes":[{"texCoord":{"u":192,"v":104},"comment":"box","origin":[-5,-5,-5],"dimensions":[10,10,10]},{"texCoord":{"u":48,"v":0},"comment":"scale","origin":[-1,-9,-3],"dimensions":[2,4,6]}]},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"comment":"body","origin":[-12,0,-16],"dimensions":[24,24,64]},{"texCoord":{"u":220,"v":53},"comment":"scale","origin":[-1,-6,-10],"dimensions":[2,6,12]},{"texCoord":{"u":220,"v":53},"comment":"scale","origin":[-1,-6,10],"dimensions":[2,6,12]},{"texCoord":{"u":220,"v":53},"comment":"scale","origin":[-1,-6,30],"dimensions":[2,6,12]}],"partPose":{"y":4,"z":8}},"left_front_leg":{"cubes":[{"texCoord":{"u":112,"v":104},"comment":"main","origin":[-4,-4,-4],"dimensions":[8,24,8]}],"partPose":{"x":12,"y":20,"z":2},"children":{"left_front_leg_tip":{"cubes":[{"texCoord":{"u":226,"v":138},"comment":"main","origin":[-3,-1,-3],"dimensions":[6,24,6]}],"partPose":{"y":20,"z":-1},"children":{"left_front_foot":{"cubes":[{"texCoord":{"u":144,"v":104},"comment":"main","origin":[-4,0,-12],"dimensions":[8,4,16]}],"partPose":{"y":23}}}}}}}}},"material":{"xTexSize":256,"yTexSize":256}}',
        ),
        x = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}],"partPose":{"y":-13}},"right_arm":{"cubes":[{"texCoord":{"u":56,"v":0},"origin":[-1,-2,-1],"dimensions":[2,30,2]}],"partPose":{"x":-5,"y":-12}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":56,"v":0},"origin":[-1,0,-1],"dimensions":[2,30,2]}],"partPose":{"x":2,"y":-5}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":56,"v":0},"origin":[-1,-2,-1],"dimensions":[2,30,2]}],"partPose":{"x":5,"y":-12}},"right_leg":{"cubes":[{"texCoord":{"u":56,"v":0},"origin":[-1,0,-1],"dimensions":[2,30,2]}],"partPose":{"x":-2,"y":-5}},"hat":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":-0.5}],"partPose":{"y":-13}},"body":{"cubes":[{"texCoord":{"u":32,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}],"partPose":{"y":-14}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        g = JSON.parse(
          '{"mesh":{"root":{"children":{"segment2":{"cubes":[{"texCoord":{"u":0,"v":14},"origin":[-1.5,0,-0.5],"dimensions":[3,3,1]}],"partPose":{"y":21,"z":3}},"segment1":{"cubes":[{"texCoord":{"u":0,"v":5},"origin":[-3,0,-2.5],"dimensions":[6,4,5]}],"partPose":{"y":20}},"segment0":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-2,0,-1],"dimensions":[4,3,2]}],"partPose":{"y":21,"z":-3.5}},"segment3":{"cubes":[{"texCoord":{"u":0,"v":18},"origin":[-0.5,0,-0.5],"dimensions":[1,2,1]}],"partPose":{"y":22,"z":4}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        p = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]}],"children":{"nose":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-1,-1,-6],"dimensions":[2,4,2]}],"partPose":{"y":-2}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-10,-4],"dimensions":[8,12,8],"grow":0.45}]}}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":46},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":46},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"arms":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-8,-2,-2],"dimensions":[4,8,4]},{"texCoord":{"u":40,"v":38},"origin":[-4,2,-2],"dimensions":[8,4,4]}],"partPose":{"xRot":-0.75,"y":3,"z":-1},"children":{"left_shoulder":{"cubes":[{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[4,-2,-2],"dimensions":[4,8,4]}]}}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]},{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.5}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        h = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":1.9,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-1.9,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        f = JSON.parse(
          '{"mesh":{"root":{"children":{"tentacle0":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":1.5707964,"x":5,"y":15}},"tentacle1":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":0.7853982,"x":3.535534,"y":15,"z":3.535534}},"tentacle6":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-3.1415927,"x":-9.18485e-16,"y":15,"z":-5}},"tentacle7":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-3.9269907,"x":3.535534,"y":15,"z":-3.535534}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-6,-8,-6],"dimensions":[12,16,12]}],"partPose":{"y":8}},"tentacle4":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-1.5707964,"x":-5,"y":15,"z":6.123234e-16}},"tentacle5":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-2.3561945,"x":-3.535534,"y":15,"z":-3.535534}},"tentacle2":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"x":3.061617e-16,"y":15,"z":5}},"tentacle3":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-0.7853982,"x":-3.535534,"y":15,"z":3.535534}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        b = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":2,"v":61},"comment":"right ear","origin":[-6,-11,-10],"dimensions":[3,2,1]},{"mirror":true,"texCoord":{"u":2,"v":61},"comment":"left ear","origin":[2,-11,-10],"dimensions":[3,2,1]},{"mirror":true,"texCoord":{"u":23,"v":52},"comment":"goatee","origin":[-0.5,-3,-14],"dimensions":[0,7,5]}],"partPose":{"x":1,"y":14},"children":{"nose":{"cubes":[{"texCoord":{"u":34,"v":46},"origin":[-3,-4,-8],"dimensions":[5,7,10]}],"partPose":{"xRot":0.9599,"y":-8,"z":-8}},"right_horn":{"cubes":[{"texCoord":{"u":12,"v":55},"origin":[-2.99,-16,-10],"dimensions":[2,7,2]}]},"left_horn":{"cubes":[{"texCoord":{"u":12,"v":55},"origin":[-0.01,-16,-10],"dimensions":[2,7,2]}]}}},"right_front_leg":{"cubes":[{"texCoord":{"u":35,"v":2},"origin":[0,0,0],"dimensions":[3,10,3]}],"partPose":{"x":-3,"y":14,"z":-6}},"right_hind_leg":{"cubes":[{"texCoord":{"u":49,"v":29},"origin":[0,4,0],"dimensions":[3,6,3]}],"partPose":{"x":-3,"y":14,"z":4}},"left_hind_leg":{"cubes":[{"texCoord":{"u":36,"v":29},"origin":[0,4,0],"dimensions":[3,6,3]}],"partPose":{"x":1,"y":14,"z":4}},"body":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-4,-17,-7],"dimensions":[9,11,16]},{"texCoord":{"u":0,"v":28},"origin":[-5,-18,-8],"dimensions":[11,14,11]}],"partPose":{"y":24}},"left_front_leg":{"cubes":[{"texCoord":{"u":49,"v":2},"origin":[0,0,0],"dimensions":[3,10,3]}],"partPose":{"x":1,"y":14,"z":-6}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        y = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-6,10,-8],"dimensions":[12,12,16]},{"texCoord":{"u":0,"v":28},"origin":[-8,10,-6],"dimensions":[2,12,12]},{"mirror":true,"texCoord":{"u":0,"v":28},"origin":[6,10,-6],"dimensions":[2,12,12]},{"texCoord":{"u":16,"v":40},"origin":[-6,8,-6],"dimensions":[12,2,12]},{"texCoord":{"u":16,"v":40},"origin":[-6,22,-6],"dimensions":[12,2,12]}],"children":{"spike10":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":2.3561945,"x":7.932871,"y":23.93287}},"spike11":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":3.926991,"x":-8.000353,"y":24.000353}},"spike6":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":3.926991,"x":8.076813,"y":16,"z":8.076813}},"spike7":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":2.3561945,"x":-8.060315,"y":16,"z":8.060315}},"spike8":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":3.926991,"y":23.988361,"z":7.9883604}},"spike9":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":2.3561945,"y":23.92711,"z":-7.9271107}},"eye":{"cubes":[{"texCoord":{"u":8,"v":0},"origin":[-1,15,0],"dimensions":[2,2,1]}],"partPose":{"z":-8.25}},"tail0":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-2,14,7],"dimensions":[4,4,8]}],"children":{"tail1":{"cubes":[{"texCoord":{"u":0,"v":54},"origin":[0,14,0],"dimensions":[3,3,7]}],"partPose":{"x":-1.5,"y":0.5,"z":14},"children":{"tail2":{"cubes":[{"texCoord":{"u":41,"v":32},"origin":[0,14,0],"dimensions":[2,2,6]},{"texCoord":{"u":25,"v":19},"origin":[1,10.5,3],"dimensions":[1,9,9]}],"partPose":{"x":0.5,"y":0.5,"z":6}}}}}},"spike0":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":5.4977875,"y":7.92,"z":8.08}},"spike1":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":0.7853982,"y":7.9567738,"z":-8.043226}},"spike2":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":0.7853982,"x":7.9667134,"y":8.033287}},"spike3":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"zRot":5.4977875,"x":-7.9208007,"y":8.079199}},"spike4":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":0.7853982,"x":-7.9477057,"y":16,"z":-7.9477057}},"spike5":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-4.5,-1],"dimensions":[2,9,2]}],"partPose":{"xRot":1.5707964,"yRot":5.4977875,"x":8.022686,"y":16,"z":-8.022686}}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        v = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":61,"v":1},"origin":[-7,-3,-19],"dimensions":[14,6,19]}],"partPose":{"xRot":0.87266463,"y":2,"z":-12},"children":{"right_horn":{"cubes":[{"texCoord":{"u":10,"v":13},"origin":[-1,-11,-1],"dimensions":[2,11,2]}],"partPose":{"x":-7,"y":2,"z":-12}},"left_horn":{"cubes":[{"texCoord":{"u":1,"v":13},"origin":[-1,-11,-1],"dimensions":[2,11,2]}],"partPose":{"x":7,"y":2,"z":-12}},"right_ear":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-6,-1,-2],"dimensions":[6,1,4]}],"partPose":{"zRot":-0.6981317,"x":-6,"y":-2,"z":-3}},"left_ear":{"cubes":[{"texCoord":{"u":1,"v":6},"origin":[0,-1,-2],"dimensions":[6,1,4]}],"partPose":{"zRot":0.6981317,"x":6,"y":-2,"z":-3}}}},"right_front_leg":{"cubes":[{"texCoord":{"u":66,"v":42},"origin":[-3,0,-3],"dimensions":[6,14,6]}],"partPose":{"x":-4,"y":10,"z":-8.5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":21,"v":45},"origin":[-2.5,0,-2.5],"dimensions":[5,11,5]}],"partPose":{"x":-5,"y":13,"z":10}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":45},"origin":[-2.5,0,-2.5],"dimensions":[5,11,5]}],"partPose":{"x":5,"y":13,"z":10}},"body":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-8,-7,-13],"dimensions":[16,14,26]}],"partPose":{"y":7},"children":{"mane":{"cubes":[{"texCoord":{"u":90,"v":33},"origin":[0,0,-9],"dimensions":[0,10,19],"grow":0.001}],"partPose":{"y":-14,"z":-5}}}},"left_front_leg":{"cubes":[{"texCoord":{"u":41,"v":42},"origin":[-3,0,-3],"dimensions":[6,14,6]}],"partPose":{"x":4,"y":10,"z":-8.5}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        _ = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":1.9,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-1.9,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        C = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]}],"children":{"nose":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-1,-1,-6],"dimensions":[2,4,2]}],"partPose":{"y":-2}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-10,-4],"dimensions":[8,12,8],"grow":0.45}]}}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":46},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":46},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"arms":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-8,-2,-2],"dimensions":[4,8,4]},{"texCoord":{"u":40,"v":38},"origin":[-4,2,-2],"dimensions":[8,4,4]}],"partPose":{"xRot":-0.75,"y":3,"z":-1},"children":{"left_shoulder":{"cubes":[{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[4,-2,-2],"dimensions":[4,8,4]}]}}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]},{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.5}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        P = JSON.parse(
          '{"mesh":{"root":{"children":{"right_front_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":-12}},"right_hind_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":7}},"left_front_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":-12}},"right_hind_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":7}},"right_front_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":-12}},"head_parts":{"cubes":[{"texCoord":{"u":0,"v":35},"origin":[-2.05,-6,-2],"dimensions":[4,12,7]}],"partPose":{"xRot":0.5235988,"y":4,"z":-12},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":13},"origin":[-3,-11,-2],"dimensions":[6,5,7]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":0,"v":12},"origin":[-1,-7,0],"dimensions":[2,7,1]}],"partPose":{"xRot":0.2617994,"zRot":-0.2617994,"x":-1.25,"y":-10,"z":4}},"left_ear":{"cubes":[{"texCoord":{"u":0,"v":12},"origin":[-1,-7,0],"dimensions":[2,7,1]}],"partPose":{"xRot":0.2617994,"zRot":0.2617994,"x":1.25,"y":-10,"z":4}}}},"left_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[2,-9,-6],"dimensions":[1,2,2]}]},"mouth_saddle_wrap":{"cubes":[{"texCoord":{"u":19,"v":0},"origin":[-2,-11,-4],"dimensions":[4,5,2],"grow":0.2}]},"right_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[-3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"mane":{"cubes":[{"texCoord":{"u":56,"v":36},"origin":[-1,-11,5.01],"dimensions":[2,16,2]}]},"right_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[-3,-9,-6],"dimensions":[1,2,2]}]},"left_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"upper_mouth":{"cubes":[{"texCoord":{"u":0,"v":25},"origin":[-2,-11,-7],"dimensions":[4,5,5]}]},"head_saddle":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-3,-11,-1.9],"dimensions":[6,5,6],"grow":0.2}]}}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":7}},"body":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-5,-8,-17],"dimensions":[10,10,22],"grow":0.05}],"partPose":{"y":11,"z":5},"children":{"right_chest":{"cubes":[{"texCoord":{"u":26,"v":21},"origin":[-4,0,-2],"dimensions":[8,8,3]}],"partPose":{"yRot":1.5707964,"x":-6,"y":-8}},"saddle":{"cubes":[{"texCoord":{"u":26,"v":0},"origin":[-5,-8,-9],"dimensions":[10,9,9],"grow":0.5}]},"tail":{"cubes":[{"texCoord":{"u":42,"v":36},"origin":[-1.5,0,0],"dimensions":[3,14,4]}],"partPose":{"xRot":0.5235988,"y":-5,"z":2}},"left_chest":{"cubes":[{"texCoord":{"u":26,"v":21},"origin":[-4,0,-2],"dimensions":[8,8,3]}],"partPose":{"yRot":-1.5707964,"x":6,"y":-8}}}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":-12}},"left_hind_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":7}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        z = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"comment":"main","origin":[-2.5,-2,-3],"dimensions":[5,4,5]},{"texCoord":{"u":0,"v":24},"comment":"nose","origin":[-1.5,-0.001,-4],"dimensions":[3,2,2]},{"texCoord":{"u":0,"v":10},"comment":"ear1","origin":[-2,-3,0],"dimensions":[1,1,2]},{"texCoord":{"u":6,"v":10},"comment":"ear2","origin":[1,-3,0],"dimensions":[1,1,2]}],"partPose":{"y":15,"z":-9}},"tail1":{"cubes":[{"texCoord":{"u":0,"v":15},"origin":[-0.5,0,0],"dimensions":[1,8,1]}],"partPose":{"xRot":0.9,"y":15,"z":8}},"right_front_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-1,0,0],"dimensions":[2,10,2]}],"partPose":{"x":-1.2,"y":14.1,"z":-5}},"tail2":{"cubes":[{"texCoord":{"u":4,"v":15},"origin":[-0.5,0,0],"dimensions":[1,8,1]}],"partPose":{"y":20,"z":14}},"right_hind_leg":{"cubes":[{"texCoord":{"u":8,"v":13},"origin":[-1,0,1],"dimensions":[2,6,2]}],"partPose":{"x":-1.1,"y":18,"z":5}},"left_hind_leg":{"cubes":[{"texCoord":{"u":8,"v":13},"origin":[-1,0,1],"dimensions":[2,6,2]}],"partPose":{"x":1.1,"y":18,"z":5}},"body":{"cubes":[{"texCoord":{"u":20,"v":0},"origin":[-2,3,-8],"dimensions":[4,16,6]}],"partPose":{"xRot":1.5707964,"y":12,"z":-10}},"left_front_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-1,0,0],"dimensions":[2,10,2]}],"partPose":{"x":1.2,"y":14.1,"z":-5}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        k = JSON.parse(
          '{"mesh":{"root":{"children":{"body":{"cubes":[{"texCoord":{"u":0,"v":8},"origin":[-3,-2,-8],"dimensions":[5,3,9]}],"partPose":{"xRot":-0.1},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-2,-5],"dimensions":[7,3,5]}],"partPose":{"xRot":0.2,"y":1,"z":-7}},"right_wing_base":{"cubes":[{"mirror":true,"texCoord":{"u":23,"v":12},"origin":[-6,0,0],"dimensions":[6,2,9]}],"partPose":{"zRot":-0.1,"x":-3,"y":-2,"z":-8},"children":{"right_wing_tip":{"cubes":[{"mirror":true,"texCoord":{"u":16,"v":24},"origin":[-13,0,0],"dimensions":[13,1,9]}],"partPose":{"zRot":-0.1,"x":-6}}}},"tail_base":{"cubes":[{"texCoord":{"u":3,"v":20},"origin":[-2,0,0],"dimensions":[3,2,6]}],"partPose":{"y":-2,"z":1},"children":{"tail_tip":{"cubes":[{"texCoord":{"u":4,"v":29},"origin":[-1,0,0],"dimensions":[1,1,6]}],"partPose":{"y":0.5,"z":6}}}},"left_wing_base":{"cubes":[{"texCoord":{"u":23,"v":12},"origin":[0,0,0],"dimensions":[6,2,9]}],"partPose":{"zRot":0.1,"x":2,"y":-2,"z":-8},"children":{"left_wing_tip":{"cubes":[{"texCoord":{"u":16,"v":24},"origin":[0,0,0],"dimensions":[13,1,9]}],"partPose":{"zRot":0.1,"x":6}}}}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        w = JSON.parse(
          '{"mesh":{"root":{"children":{"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"texCoord":{"u":16,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":1.9,"y":12}},"jacket":{"cubes":[{"texCoord":{"u":16,"v":32},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":0.25}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]},"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-5,-8,-4],"dimensions":[10,8,8]},{"texCoord":{"u":31,"v":1},"origin":[-2,-4,-5],"dimensions":[4,4,1]},{"texCoord":{"u":2,"v":4},"origin":[2,-2,-5],"dimensions":[1,2,1]},{"texCoord":{"u":2,"v":0},"origin":[-3,-2,-5],"dimensions":[1,2,1]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":39,"v":6},"origin":[-1,0,-2],"dimensions":[1,5,4]}],"partPose":{"zRot":0.5235988,"x":-4.5,"y":-6}},"left_ear":{"cubes":[{"texCoord":{"u":51,"v":6},"origin":[0,0,-2],"dimensions":[1,5,4]}],"partPose":{"zRot":-0.5235988,"x":4.5,"y":-6}}}},"left_sleeve":{"cubes":[{"texCoord":{"u":48,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":5,"y":2}},"right_sleeve":{"cubes":[{"texCoord":{"u":40,"v":32},"origin":[-3,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-5,"y":2}},"left_arm":{"cubes":[{"texCoord":{"u":32,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-1.9,"y":12}},"cloak":{"cubes":[{"texCoord":{"u":0,"v":0},"texScaleY":0.5,"origin":[-5,0,-1],"dimensions":[10,16,1]}]},"ear":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-3,-6,-1],"dimensions":[6,6,1]}]},"right_pants":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-1.9,"y":12}},"hat":{},"left_pants":{"cubes":[{"texCoord":{"u":0,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":1.9,"y":12}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        S = JSON.parse(
          '{"mesh":{"root":{"children":{"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"texCoord":{"u":16,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":1.9,"y":12}},"jacket":{"cubes":[{"texCoord":{"u":16,"v":32},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":0.25}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]},"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-5,-8,-4],"dimensions":[10,8,8]},{"texCoord":{"u":31,"v":1},"origin":[-2,-4,-5],"dimensions":[4,4,1]},{"texCoord":{"u":2,"v":4},"origin":[2,-2,-5],"dimensions":[1,2,1]},{"texCoord":{"u":2,"v":0},"origin":[-3,-2,-5],"dimensions":[1,2,1]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":39,"v":6},"origin":[-1,0,-2],"dimensions":[1,5,4]}],"partPose":{"zRot":0.5235988,"x":-4.5,"y":-6}},"left_ear":{"cubes":[{"texCoord":{"u":51,"v":6},"origin":[0,0,-2],"dimensions":[1,5,4]}],"partPose":{"zRot":-0.5235988,"x":4.5,"y":-6}}}},"left_sleeve":{"cubes":[{"texCoord":{"u":48,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":5,"y":2}},"right_sleeve":{"cubes":[{"texCoord":{"u":40,"v":32},"origin":[-3,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-5,"y":2}},"left_arm":{"cubes":[{"texCoord":{"u":32,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-1.9,"y":12}},"cloak":{"cubes":[{"texCoord":{"u":0,"v":0},"texScaleY":0.5,"origin":[-5,0,-1],"dimensions":[10,16,1]}]},"ear":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-3,-6,-1],"dimensions":[6,6,1]}]},"right_pants":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-1.9,"y":12}},"hat":{},"left_pants":{"cubes":[{"texCoord":{"u":0,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":1.9,"y":12}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        j = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]}],"children":{"nose":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-1,-1,-6],"dimensions":[2,4,2]}],"partPose":{"y":-2}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-10,-4],"dimensions":[8,12,8],"grow":0.45}]}}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":46},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":46},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"arms":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-8,-2,-2],"dimensions":[4,8,4]},{"texCoord":{"u":40,"v":38},"origin":[-4,2,-2],"dimensions":[8,4,4]}],"partPose":{"xRot":-0.75,"y":3,"z":-1},"children":{"left_shoulder":{"cubes":[{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[4,-2,-2],"dimensions":[4,8,4]}]}}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]},{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.5}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        T = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3.5,-3,-3],"dimensions":[7,7,7]},{"texCoord":{"u":0,"v":44},"comment":"mouth","origin":[-2.5,1,-6],"dimensions":[5,3,3]},{"texCoord":{"u":26,"v":0},"comment":"right_ear","origin":[-4.5,-4,-1],"dimensions":[2,2,1]},{"mirror":true,"texCoord":{"u":26,"v":0},"comment":"left_ear","origin":[2.5,-4,-1],"dimensions":[2,2,1]}],"partPose":{"y":10,"z":-16}},"right_front_leg":{"cubes":[{"texCoord":{"u":50,"v":40},"origin":[-2,0,-2],"dimensions":[4,10,6]}],"partPose":{"x":-3.5,"y":14,"z":-8}},"right_hind_leg":{"cubes":[{"texCoord":{"u":50,"v":22},"origin":[-2,0,-2],"dimensions":[4,10,8]}],"partPose":{"x":-4.5,"y":14,"z":6}},"left_hind_leg":{"cubes":[{"texCoord":{"u":50,"v":22},"origin":[-2,0,-2],"dimensions":[4,10,8]}],"partPose":{"x":4.5,"y":14,"z":6}},"body":{"cubes":[{"texCoord":{"u":0,"v":19},"origin":[-5,-13,-7],"dimensions":[14,14,11]},{"texCoord":{"u":39,"v":0},"origin":[-4,-25,-7],"dimensions":[12,12,10]}],"partPose":{"xRot":1.5707964,"x":-2,"y":9,"z":12}},"left_front_leg":{"cubes":[{"texCoord":{"u":50,"v":40},"origin":[-2,0,-2],"dimensions":[4,10,6]}],"partPose":{"x":3.5,"y":14,"z":-8}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        R = JSON.parse(
          '{"mesh":{"root":{"children":{"right_front_leg":{"cubes":[{"texCoord":{"u":64,"v":0},"origin":[-4,0,-4],"dimensions":[8,37,8]}],"partPose":{"x":-8,"y":-13,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":96,"v":0},"origin":[-4,0,-4],"dimensions":[8,37,8]}],"partPose":{"x":-8,"y":-13,"z":18}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":96,"v":0},"origin":[-4,0,-4],"dimensions":[8,37,8]}],"partPose":{"x":8,"y":-13,"z":18}},"neck":{"cubes":[{"texCoord":{"u":68,"v":73},"origin":[-5,-1,-18],"dimensions":[10,10,18]}],"partPose":{"y":-7,"z":5.5},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-20,-14],"dimensions":[16,20,16]},{"texCoord":{"u":0,"v":0},"origin":[-2,-6,-18],"dimensions":[4,8,4]}],"partPose":{"y":16,"z":-17},"children":{"right_horn":{"cubes":[{"texCoord":{"u":74,"v":55},"origin":[0,-14,-2],"dimensions":[2,14,4]}],"partPose":{"xRot":1.0995574,"x":-10,"y":-14,"z":-8}},"mouth":{"cubes":[{"texCoord":{"u":0,"v":36},"origin":[-8,0,-16],"dimensions":[16,3,16]}],"partPose":{"y":-2,"z":2}},"left_horn":{"cubes":[{"mirror":true,"texCoord":{"u":74,"v":55},"origin":[0,-14,-2],"dimensions":[2,14,4]}],"partPose":{"xRot":1.0995574,"x":8,"y":-14,"z":-8}}}}}},"body":{"cubes":[{"texCoord":{"u":0,"v":55},"origin":[-7,-10,-7],"dimensions":[14,16,20]},{"texCoord":{"u":0,"v":91},"origin":[-6,6,-7],"dimensions":[12,13,18]}],"partPose":{"xRot":1.5707964,"y":1,"z":2}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":64,"v":0},"origin":[-4,0,-4],"dimensions":[8,37,8]}],"partPose":{"x":8,"y":-13,"z":-5}}}}},"material":{"xTexSize":128,"yTexSize":128}}',
        ),
        M = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":22,"v":0},"origin":[-1,-2,-3],"dimensions":[2,4,3]}],"partPose":{"y":20}},"left_fin":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[0,0,0],"dimensions":[2,0,2]}],"partPose":{"zRot":0.7853982,"x":1.5,"y":21.5}},"body_back":{"cubes":[{"texCoord":{"u":0,"v":13},"origin":[-1.5,-2.5,0],"dimensions":[3,5,8]}],"partPose":{"y":20,"z":8},"children":{"top_back_fin":{"cubes":[{"texCoord":{"u":0,"v":2},"origin":[0,0,0],"dimensions":[0,2,4]}],"partPose":{"y":-4.5,"z":-1}},"back_fin":{"cubes":[{"texCoord":{"u":20,"v":10},"origin":[0,-2.5,0],"dimensions":[0,5,6]}],"partPose":{"z":8}}}},"right_fin":{"cubes":[{"texCoord":{"u":-4,"v":0},"origin":[-2,0,0],"dimensions":[2,0,2]}],"partPose":{"zRot":-0.7853982,"x":-1.5,"y":21.5}},"body_front":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1.5,-2.5,0],"dimensions":[3,5,8]}],"partPose":{"y":20},"children":{"top_front_fin":{"cubes":[{"texCoord":{"u":2,"v":1},"origin":[0,0,0],"dimensions":[0,2,3]}],"partPose":{"y":-4.5,"z":5}}}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        O = JSON.parse(
          '{"mesh":{"root":{"children":{"segment2":{"cubes":[{"texCoord":{"u":0,"v":9},"origin":[-3,0,-1.5],"dimensions":[6,4,3]}],"partPose":{"y":20,"z":1}},"segment1":{"cubes":[{"texCoord":{"u":0,"v":4},"origin":[-2,0,-1],"dimensions":[4,3,2]}],"partPose":{"y":21,"z":-1.5}},"segment0":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1.5,0,-1],"dimensions":[3,2,2]}],"partPose":{"y":22,"z":-3.5}},"layer0":{"cubes":[{"texCoord":{"u":20,"v":0},"origin":[-5,0,-1.5],"dimensions":[10,8,3]}],"partPose":{"y":16,"z":1}},"layer1":{"cubes":[{"texCoord":{"u":20,"v":11},"origin":[-3,0,-1.5],"dimensions":[6,4,3]}],"partPose":{"y":20,"z":7}},"layer2":{"cubes":[{"texCoord":{"u":20,"v":18},"origin":[-3,0,-1.5],"dimensions":[6,5,2]}],"partPose":{"y":19,"z":-1.5}},"segment6":{"cubes":[{"texCoord":{"u":13,"v":4},"origin":[-0.5,0,-1],"dimensions":[1,1,2]}],"partPose":{"y":23,"z":11.5}},"segment5":{"cubes":[{"texCoord":{"u":11,"v":0},"origin":[-1,0,-1],"dimensions":[2,1,2]}],"partPose":{"y":23,"z":9.5}},"segment4":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-1,0,-1.5],"dimensions":[2,2,3]}],"partPose":{"y":22,"z":7}},"segment3":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-1.5,0,-1.5],"dimensions":[3,3,3]}],"partPose":{"y":21,"z":4}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        N = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-1,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-1,0,-1],"dimensions":[2,12,2]}],"partPose":{"x":2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-1,0,-1],"dimensions":[2,12,2]}],"partPose":{"x":-2,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        F = JSON.parse(
          '{"mesh":{"root":{"children":{"right_front_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":-12}},"right_hind_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":7}},"left_front_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":-12}},"right_hind_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":7}},"right_front_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":-12}},"head_parts":{"cubes":[{"texCoord":{"u":0,"v":35},"origin":[-2.05,-6,-2],"dimensions":[4,12,7]}],"partPose":{"xRot":0.5235988,"y":4,"z":-12},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":13},"origin":[-3,-11,-2],"dimensions":[6,5,7]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":19,"v":16},"origin":[-2.55,-13,4],"dimensions":[2,3,1],"grow":-0.001}]},"left_ear":{"cubes":[{"texCoord":{"u":19,"v":16},"origin":[0.55,-13,4],"dimensions":[2,3,1],"grow":-0.001}]}}},"left_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[2,-9,-6],"dimensions":[1,2,2]}]},"mouth_saddle_wrap":{"cubes":[{"texCoord":{"u":19,"v":0},"origin":[-2,-11,-4],"dimensions":[4,5,2],"grow":0.2}]},"right_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[-3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"mane":{"cubes":[{"texCoord":{"u":56,"v":36},"origin":[-1,-11,5.01],"dimensions":[2,16,2]}]},"right_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[-3,-9,-6],"dimensions":[1,2,2]}]},"left_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"upper_mouth":{"cubes":[{"texCoord":{"u":0,"v":25},"origin":[-2,-11,-7],"dimensions":[4,5,5]}]},"head_saddle":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-3,-11,-1.9],"dimensions":[6,5,6],"grow":0.2}]}}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":7}},"body":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-5,-8,-17],"dimensions":[10,10,22],"grow":0.05}],"partPose":{"y":11,"z":5},"children":{"saddle":{"cubes":[{"texCoord":{"u":26,"v":0},"origin":[-5,-8,-9],"dimensions":[10,9,9],"grow":0.5}]},"tail":{"cubes":[{"texCoord":{"u":42,"v":36},"origin":[-1.5,0,0],"dimensions":[3,14,4]}],"partPose":{"xRot":0.5235988,"y":-5,"z":2}}}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":-12}},"left_hind_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":7}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        E = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":-0.5}],"partPose":{"y":4}},"right_arm":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-1,0,-1],"dimensions":[12,2,2],"grow":-0.5}],"partPose":{"yRot":3.1415927,"zRot":-1,"x":-5,"y":6,"z":-1}},"upper_body":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-5,-10,-5],"dimensions":[10,10,10],"grow":-0.5}],"partPose":{"y":13}},"left_arm":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-1,0,-1],"dimensions":[12,2,2],"grow":-0.5}],"partPose":{"zRot":1,"x":5,"y":6,"z":1}},"lower_body":{"cubes":[{"texCoord":{"u":0,"v":36},"origin":[-6,-12,-6],"dimensions":[12,12,12],"grow":-0.5}],"partPose":{"y":24}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        I = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":32,"v":4},"origin":[-4,-4,-8],"dimensions":[8,8,8]}],"partPose":{"y":15,"z":-3}},"right_front_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15,"z":-1}},"right_hind_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15,"z":2}},"left_middle_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15}},"body0":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3,-3,-3],"dimensions":[6,6,6]}],"partPose":{"y":15}},"body1":{"cubes":[{"texCoord":{"u":0,"v":12},"origin":[-5,-4,-6],"dimensions":[10,8,12]}],"partPose":{"y":15,"z":9}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15,"z":2}},"right_middle_hind_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15,"z":1}},"right_middle_front_leg":{"cubes":[{"texCoord":{"u":18,"v":0},"origin":[-15,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":-4,"y":15}},"left_middle_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15,"z":1}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":18,"v":0},"origin":[-1,-1,-1],"dimensions":[16,2,2]}],"partPose":{"x":4,"y":15,"z":-1}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        J = JSON.parse(
          '{"mesh":{"root":{"children":{"tentacle0":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":1.5707964,"x":5,"y":15}},"tentacle1":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":0.7853982,"x":3.535534,"y":15,"z":3.535534}},"tentacle6":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-3.1415927,"x":-9.18485e-16,"y":15,"z":-5}},"tentacle7":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-3.9269907,"x":3.535534,"y":15,"z":-3.535534}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-6,-8,-6],"dimensions":[12,16,12]}],"partPose":{"y":8}},"tentacle4":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-1.5707964,"x":-5,"y":15,"z":6.123234e-16}},"tentacle5":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-2.3561945,"x":-3.535534,"y":15,"z":-3.535534}},"tentacle2":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"x":3.061617e-16,"y":15,"z":5}},"tentacle3":{"cubes":[{"texCoord":{"u":48,"v":0},"origin":[-1,0,-1],"dimensions":[2,18,2]}],"partPose":{"yRot":-0.7853982,"x":-3.535534,"y":15,"z":3.535534}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        A = JSON.parse(
          '{"mesh":{"root":{"children":{"tail":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[0,-1,0],"dimensions":[0,2,7]}],"partPose":{"y":22}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1.5,-1,0],"dimensions":[3,2,3]}],"partPose":{"y":22,"z":-3}}}}},"material":{"xTexSize":16,"yTexSize":16}}',
        ),
        U = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":3,"v":0},"origin":[-3,-1,-3],"dimensions":[6,5,6]}],"partPose":{"y":19,"z":-10}},"right_front_leg":{"cubes":[{"texCoord":{"u":27,"v":30},"origin":[-13,0,-2],"dimensions":[13,1,5]}],"partPose":{"x":-5,"y":21,"z":-4}},"right_hind_leg":{"cubes":[{"texCoord":{"u":1,"v":23},"origin":[-2,0,0],"dimensions":[4,1,10]}],"partPose":{"x":-3.5,"y":22,"z":11}},"egg_belly":{"cubes":[{"texCoord":{"u":70,"v":33},"origin":[-4.5,3,-14],"dimensions":[9,18,1]}],"partPose":{"xRot":1.5707964,"y":11,"z":-10}},"left_hind_leg":{"cubes":[{"texCoord":{"u":1,"v":12},"origin":[-2,0,0],"dimensions":[4,1,10]}],"partPose":{"x":3.5,"y":22,"z":11}},"body":{"cubes":[{"texCoord":{"u":7,"v":37},"comment":"shell","origin":[-9.5,3,-10],"dimensions":[19,20,6]},{"texCoord":{"u":31,"v":1},"comment":"belly","origin":[-5.5,3,-13],"dimensions":[11,18,3]}],"partPose":{"xRot":1.5707964,"y":11,"z":-10}},"left_front_leg":{"cubes":[{"texCoord":{"u":27,"v":24},"origin":[0,0,-2],"dimensions":[13,1,5]}],"partPose":{"x":5,"y":21,"z":-4}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        q = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]}],"children":{"nose":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-1,-1,-6],"dimensions":[2,4,2]}],"partPose":{"y":-2}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-10,-4],"dimensions":[8,12,8],"grow":0.45}]}}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":46},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":46},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"arms":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-8,-2,-2],"dimensions":[4,8,4]},{"texCoord":{"u":40,"v":38},"origin":[-4,2,-2],"dimensions":[8,4,4]}],"partPose":{"xRot":-0.75,"y":3,"z":-1},"children":{"left_shoulder":{"cubes":[{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[4,-2,-2],"dimensions":[4,8,4]}]}}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]},{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.5}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        B = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]}],"children":{"nose":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-1,-1,-6],"dimensions":[2,4,2]}],"partPose":{"y":-2}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8],"grow":0.51}],"children":{"hat_rim":{"cubes":[{"texCoord":{"u":30,"v":47},"origin":[-8,-8,-6],"dimensions":[16,16,1]}],"partPose":{"xRot":-1.5707964}}}}}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"arms":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-8,-2,-2],"dimensions":[4,8,4]},{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[4,-2,-2],"dimensions":[4,8,4]},{"texCoord":{"u":40,"v":38},"origin":[-4,2,-2],"dimensions":[8,4,4]}],"partPose":{"xRot":-0.75,"y":3,"z":-1}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]}],"children":{"jacket":{"cubes":[{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.5}]}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        D = JSON.parse(
          '{"mesh":{"root":{"children":{"bone":{"partPose":{"y":24},"children":{"left_leg":{"cubes":[{"texCoord":{"u":76,"v":76},"origin":[-2.9,0,-3],"dimensions":[6,13,6]}],"partPose":{"x":5.9,"y":-13}},"right_leg":{"cubes":[{"texCoord":{"u":76,"v":48},"origin":[-3.1,0,-3],"dimensions":[6,13,6]}],"partPose":{"x":-5.9,"y":-13}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-9,-13,-4],"dimensions":[18,21,11]}],"partPose":{"y":-21},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-8,-16,-5],"dimensions":[16,16,10]}],"partPose":{"y":-13},"children":{"right_tendril":{"cubes":[{"texCoord":{"u":52,"v":32},"origin":[-16,-13,0],"dimensions":[16,16,0]}],"partPose":{"x":-8,"y":-12}},"left_tendril":{"cubes":[{"texCoord":{"u":58,"v":0},"origin":[0,-13,0],"dimensions":[16,16,0]}],"partPose":{"x":8,"y":-12}}}},"right_arm":{"cubes":[{"texCoord":{"u":44,"v":50},"origin":[-4,0,-4],"dimensions":[8,28,8]}],"partPose":{"x":-13,"y":-13,"z":1}},"left_arm":{"cubes":[{"texCoord":{"u":0,"v":58},"origin":[-4,0,-4],"dimensions":[8,28,8]}],"partPose":{"x":13,"y":-13,"z":1}},"left_ribcage":{"cubes":[{"mirror":true,"texCoord":{"u":90,"v":11},"origin":[-7,-11,-0.1],"dimensions":[9,21,0]}],"partPose":{"x":7,"y":-2,"z":-4}},"right_ribcage":{"cubes":[{"texCoord":{"u":90,"v":11},"origin":[-2,-11,-0.1],"dimensions":[9,21,0]}],"partPose":{"x":-7,"y":-2,"z":-4}}}}}}}}},"material":{"xTexSize":128,"yTexSize":128}}',
        ),
        L = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]}],"children":{"nose":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-1,-1,-6],"dimensions":[2,4,2]}],"partPose":{"y":-2},"children":{"mole":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[0,3,-6.75],"dimensions":[1,1,1],"grow":-0.25}],"partPose":{"y":-2}}}},"hat":{"cubes":[{"texCoord":{"u":0,"v":64},"origin":[0,0,0],"dimensions":[10,2,10]}],"partPose":{"x":-5,"y":-10.03125,"z":-5},"children":{"hat_rim":{"cubes":[{"texCoord":{"u":30,"v":47},"origin":[-8,-8,-6],"dimensions":[16,16,1]}],"partPose":{"xRot":-1.5707964}},"hat2":{"cubes":[{"texCoord":{"u":0,"v":76},"origin":[0,0,0],"dimensions":[7,4,7]}],"partPose":{"xRot":-0.05235988,"zRot":0.02617994,"x":1.75,"y":-4,"z":2},"children":{"hat3":{"cubes":[{"texCoord":{"u":0,"v":87},"origin":[0,0,0],"dimensions":[4,4,4]}],"partPose":{"xRot":-0.10471976,"zRot":0.05235988,"x":1.75,"y":-4,"z":2},"children":{"hat4":{"cubes":[{"texCoord":{"u":0,"v":95},"origin":[0,0,0],"dimensions":[1,2,1],"grow":0.25}],"partPose":{"xRot":-0.20943952,"zRot":0.10471976,"x":1.75,"y":-2,"z":2}}}}}}}}}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"arms":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-8,-2,-2],"dimensions":[4,8,4]},{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[4,-2,-2],"dimensions":[4,8,4]},{"texCoord":{"u":40,"v":38},"origin":[-4,2,-2],"dimensions":[8,4,4]}],"partPose":{"xRot":-0.75,"y":3,"z":-1}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]}],"children":{"jacket":{"cubes":[{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.5}]}}}}}},"material":{"xTexSize":64,"yTexSize":128}}',
        ),
        W = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-1,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-1,0,-1],"dimensions":[2,12,2]}],"partPose":{"x":2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-1,0,-1],"dimensions":[2,12,2]}],"partPose":{"x":-2,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        Y = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":61,"v":1},"origin":[-7,-3,-19],"dimensions":[14,6,19]}],"partPose":{"xRot":0.87266463,"y":2,"z":-12},"children":{"right_horn":{"cubes":[{"texCoord":{"u":10,"v":13},"origin":[-1,-11,-1],"dimensions":[2,11,2]}],"partPose":{"x":-7,"y":2,"z":-12}},"left_horn":{"cubes":[{"texCoord":{"u":1,"v":13},"origin":[-1,-11,-1],"dimensions":[2,11,2]}],"partPose":{"x":7,"y":2,"z":-12}},"right_ear":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-6,-1,-2],"dimensions":[6,1,4]}],"partPose":{"zRot":-0.6981317,"x":-6,"y":-2,"z":-3}},"left_ear":{"cubes":[{"texCoord":{"u":1,"v":6},"origin":[0,-1,-2],"dimensions":[6,1,4]}],"partPose":{"zRot":0.6981317,"x":6,"y":-2,"z":-3}}}},"right_front_leg":{"cubes":[{"texCoord":{"u":66,"v":42},"origin":[-3,0,-3],"dimensions":[6,14,6]}],"partPose":{"x":-4,"y":10,"z":-8.5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":21,"v":45},"origin":[-2.5,0,-2.5],"dimensions":[5,11,5]}],"partPose":{"x":-5,"y":13,"z":10}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":45},"origin":[-2.5,0,-2.5],"dimensions":[5,11,5]}],"partPose":{"x":5,"y":13,"z":10}},"body":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-8,-7,-13],"dimensions":[16,14,26]}],"partPose":{"y":7},"children":{"mane":{"cubes":[{"texCoord":{"u":90,"v":33},"origin":[0,0,-9],"dimensions":[0,10,19],"grow":0.001}],"partPose":{"y":-14,"z":-5}}}},"left_front_leg":{"cubes":[{"texCoord":{"u":41,"v":42},"origin":[-3,0,-3],"dimensions":[6,14,6]}],"partPose":{"x":4,"y":10,"z":-8.5}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        K = JSON.parse(
          '{"mesh":{"root":{"children":{"right_front_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":-12}},"right_hind_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":7}},"left_front_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":-12}},"right_hind_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":7}},"right_front_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":-12}},"head_parts":{"cubes":[{"texCoord":{"u":0,"v":35},"origin":[-2.05,-6,-2],"dimensions":[4,12,7]}],"partPose":{"xRot":0.5235988,"y":4,"z":-12},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":13},"origin":[-3,-11,-2],"dimensions":[6,5,7]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":19,"v":16},"origin":[-2.55,-13,4],"dimensions":[2,3,1],"grow":-0.001}]},"left_ear":{"cubes":[{"texCoord":{"u":19,"v":16},"origin":[0.55,-13,4],"dimensions":[2,3,1],"grow":-0.001}]}}},"left_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[2,-9,-6],"dimensions":[1,2,2]}]},"mouth_saddle_wrap":{"cubes":[{"texCoord":{"u":19,"v":0},"origin":[-2,-11,-4],"dimensions":[4,5,2],"grow":0.2}]},"right_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[-3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"mane":{"cubes":[{"texCoord":{"u":56,"v":36},"origin":[-1,-11,5.01],"dimensions":[2,16,2]}]},"right_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[-3,-9,-6],"dimensions":[1,2,2]}]},"left_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"upper_mouth":{"cubes":[{"texCoord":{"u":0,"v":25},"origin":[-2,-11,-7],"dimensions":[4,5,5]}]},"head_saddle":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-3,-11,-1.9],"dimensions":[6,5,6],"grow":0.2}]}}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":7}},"body":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-5,-8,-17],"dimensions":[10,10,22],"grow":0.05}],"partPose":{"y":11,"z":5},"children":{"saddle":{"cubes":[{"texCoord":{"u":26,"v":0},"origin":[-5,-8,-9],"dimensions":[10,9,9],"grow":0.5}]},"tail":{"cubes":[{"texCoord":{"u":42,"v":36},"origin":[-1.5,0,0],"dimensions":[3,14,4]}],"partPose":{"xRot":0.5235988,"y":-5,"z":2}}}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":-12}},"left_hind_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":7}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        G = JSON.parse(
          '{"mesh":{"root":{"children":{"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"texCoord":{"u":16,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":1.9,"y":12}},"jacket":{"cubes":[{"texCoord":{"u":16,"v":32},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":0.25}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]},"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-5,-8,-4],"dimensions":[10,8,8]},{"texCoord":{"u":31,"v":1},"origin":[-2,-4,-5],"dimensions":[4,4,1]},{"texCoord":{"u":2,"v":4},"origin":[2,-2,-5],"dimensions":[1,2,1]},{"texCoord":{"u":2,"v":0},"origin":[-3,-2,-5],"dimensions":[1,2,1]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":39,"v":6},"origin":[-1,0,-2],"dimensions":[1,5,4]}],"partPose":{"zRot":0.5235988,"x":-4.5,"y":-6}},"left_ear":{"cubes":[{"texCoord":{"u":51,"v":6},"origin":[0,0,-2],"dimensions":[1,5,4]}],"partPose":{"zRot":-0.5235988,"x":4.5,"y":-6}}}},"left_sleeve":{"cubes":[{"texCoord":{"u":48,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":5,"y":2}},"right_sleeve":{"cubes":[{"texCoord":{"u":40,"v":32},"origin":[-3,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-5,"y":2}},"left_arm":{"cubes":[{"texCoord":{"u":32,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-1.9,"y":12}},"cloak":{"cubes":[{"texCoord":{"u":0,"v":0},"texScaleY":0.5,"origin":[-5,0,-1],"dimensions":[10,16,1]}]},"ear":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-3,-6,-1],"dimensions":[6,6,1]}]},"right_pants":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-1.9,"y":12}},"hat":{},"left_pants":{"cubes":[{"texCoord":{"u":0,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":1.9,"y":12}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        V = function (e, o, i) {
          let t = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          return { model: e, texture: o, modelFile: i, ...(t ? { adultHorseFamily: !0 } : {}) };
        },
        H = {
          "minecraft:allay": V(n, "minecraft:entity/allay/allay", "allay.json"),
          "minecraft:blaze": V(s, "minecraft:entity/blaze/blaze", "blaze.json"),
          "minecraft:cave_spider": V(a, "minecraft:entity/spider/cave_spider", "cave_spider.json"),
          "minecraft:cod": V(d, "minecraft:entity/fish/cod", "cod.json"),
          "minecraft:dolphin": V(l, "minecraft:entity/dolphin/dolphin", "dolphin.json"),
          "minecraft:donkey": V(u, "minecraft:entity/horse/donkey", "donkey.json", !0),
          "minecraft:elder_guardian": V(
            c,
            "minecraft:entity/guardian/guardian_elder",
            "elder_guardian.json",
          ),
          "minecraft:ender_dragon": V(
            m,
            "minecraft:entity/enderdragon/dragon",
            "ender_dragon.json",
          ),
          "minecraft:enderman": V(x, "minecraft:entity/enderman/enderman", "enderman.json"),
          "minecraft:endermite": V(g, "minecraft:entity/endermite/endermite", "endermite.json"),
          "minecraft:evoker": V(p, "minecraft:entity/illager/evoker", "evoker.json"),
          "minecraft:giant": V(h, "minecraft:entity/zombie/zombie", "giant.json"),
          "minecraft:glow_squid": V(f, "minecraft:entity/squid/glow_squid", "glow_squid.json"),
          "minecraft:goat": V(b, "minecraft:entity/goat/goat", "goat.json"),
          "minecraft:guardian": V(y, "minecraft:entity/guardian/guardian", "guardian.json"),
          "minecraft:hoglin": V(v, "minecraft:entity/hoglin/hoglin", "hoglin.json"),
          "minecraft:husk": V(_, "minecraft:entity/zombie/husk", "husk.json"),
          "minecraft:illusioner": V(C, "minecraft:entity/illager/illusioner", "illusioner.json"),
          "minecraft:mule": V(P, "minecraft:entity/horse/mule", "mule.json", !0),
          "minecraft:ocelot": V(z, "minecraft:entity/cat/ocelot", "ocelot.json"),
          "minecraft:phantom": V(k, "minecraft:entity/phantom/phantom", "phantom.json"),
          "minecraft:piglin": V(w, "minecraft:entity/piglin/piglin", "piglin.json"),
          "minecraft:piglin_brute": V(
            S,
            "minecraft:entity/piglin/piglin_brute",
            "piglin_brute.json",
          ),
          "minecraft:pillager": V(j, "minecraft:entity/illager/pillager", "pillager.json"),
          "minecraft:polar_bear": V(T, "minecraft:entity/bear/polarbear", "polar_bear.json"),
          "minecraft:ravager": V(R, "minecraft:entity/illager/ravager", "ravager.json"),
          "minecraft:salmon": V(M, "minecraft:entity/fish/salmon", "salmon.json"),
          "minecraft:silverfish": V(O, "minecraft:entity/silverfish/silverfish", "silverfish.json"),
          "minecraft:skeleton": V(N, "minecraft:entity/skeleton/skeleton", "skeleton.json"),
          "minecraft:skeleton_horse": V(
            F,
            "minecraft:entity/horse/horse_skeleton",
            "skeleton_horse.json",
            !0,
          ),
          "minecraft:snow_golem": V(E, "minecraft:entity/snow_golem/snow_golem", "snow_golem.json"),
          "minecraft:spider": V(I, "minecraft:entity/spider/spider", "spider.json"),
          "minecraft:squid": V(J, "minecraft:entity/squid/squid", "squid.json"),
          "minecraft:tadpole": V(A, "minecraft:entity/tadpole/tadpole", "tadpole.json"),
          "minecraft:turtle": V(U, "minecraft:entity/turtle/turtle", "turtle.json"),
          "minecraft:vindicator": V(q, "minecraft:entity/illager/vindicator", "vindicator.json"),
          "minecraft:wandering_trader": V(
            B,
            "minecraft:entity/wandering_trader/wandering_trader",
            "wandering_trader.json",
          ),
          "minecraft:warden": V(D, "minecraft:entity/warden/warden", "warden.json"),
          "minecraft:witch": V(L, "minecraft:entity/witch/witch", "witch.json"),
          "minecraft:wither_skeleton": V(
            W,
            "minecraft:entity/skeleton/wither_skeleton",
            "wither_skeleton.json",
          ),
          "minecraft:zoglin": V(Y, "minecraft:entity/hoglin/zoglin", "zoglin.json"),
          "minecraft:zombie_horse": V(
            K,
            "minecraft:entity/horse/horse_zombie",
            "zombie_horse.json",
            !0,
          ),
          "minecraft:zombified_piglin": V(
            G,
            "minecraft:entity/piglin/zombified_piglin",
            "zombified_piglin.json",
          ),
        },
        $ = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]}],"children":{"nose":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-1,-1,-6],"dimensions":[2,4,2]}],"partPose":{"y":-2}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8],"grow":0.51}],"children":{"hat_rim":{"cubes":[{"texCoord":{"u":30,"v":47},"origin":[-8,-8,-6],"dimensions":[16,16,1]}],"partPose":{"xRot":-1.5707964}}}}}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"arms":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-8,-2,-2],"dimensions":[4,8,4]},{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[4,-2,-2],"dimensions":[4,8,4]},{"texCoord":{"u":40,"v":38},"origin":[-4,2,-2],"dimensions":[8,4,4]}],"partPose":{"xRot":-0.75,"y":3,"z":-1}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]}],"children":{"jacket":{"cubes":[{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.5}]}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        Z = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-4,-6],"dimensions":[8,8,6]},{"texCoord":{"u":22,"v":0},"comment":"right_horn","origin":[-5,-5,-4],"dimensions":[1,3,1]},{"texCoord":{"u":22,"v":0},"comment":"left_horn","origin":[4,-5,-4],"dimensions":[1,3,1]}],"partPose":{"y":4,"z":-8}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-4,"y":12,"z":-6}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-4,"y":12,"z":7}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":4,"y":12,"z":7}},"body":{"cubes":[{"texCoord":{"u":18,"v":4},"origin":[-6,-10,-7],"dimensions":[12,18,10]},{"texCoord":{"u":52,"v":0},"origin":[-2,2,-8],"dimensions":[4,6,1]}],"partPose":{"xRot":1.5707964,"y":5,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":4,"y":12,"z":-6}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        X = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-7,-1],"dimensions":[2,7,2]}],"partPose":{"y":1}},"left_body_stick":{"cubes":[{"texCoord":{"u":48,"v":16},"origin":[1,3,-1],"dimensions":[2,7,2]}]},"right_arm":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-2,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,0,-1],"dimensions":[2,11,2]}],"partPose":{"x":1.9,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":32,"v":16},"origin":[0,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":8,"v":0},"origin":[-1,0,-1],"dimensions":[2,11,2]}],"partPose":{"x":-1.9,"y":12}},"shoulder_stick":{"cubes":[{"texCoord":{"u":0,"v":48},"origin":[-4,10,-1],"dimensions":[8,2,2]}]},"right_body_stick":{"cubes":[{"texCoord":{"u":16,"v":0},"origin":[-3,3,-1],"dimensions":[2,7,2]}]},"base_plate":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-6,11,-6],"dimensions":[12,1,12]}],"partPose":{"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":0,"v":26},"origin":[-6,0,-1.5],"dimensions":[12,3,3]}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        Q = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":1}],"partPose":{"y":1}},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4],"grow":1}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":1}],"partPose":{"x":1.9,"y":11}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-2],"dimensions":[4,12,4],"grow":1}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":1}],"partPose":{"x":-1.9,"y":11}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":1.5}],"partPose":{"y":1}},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":1}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        ee = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}],"partPose":{"y":1}},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4],"grow":0.5}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.5}],"partPose":{"x":1.9,"y":11}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-2],"dimensions":[4,12,4],"grow":0.5}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.5}],"partPose":{"x":-1.9,"y":11}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":1}],"partPose":{"y":1}},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":0.5}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eo = JSON.parse(
          '{"mesh":{"root":{"children":{"left":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-9,-1],"dimensions":[16,8,2]}],"partPose":{"yRot":3.1415927,"y":4,"z":-7}},"bottom":{"cubes":[{"texCoord":{"u":0,"v":10},"origin":[-10,-8,-1],"dimensions":[20,16,2]}],"partPose":{"xRot":1.5707964,"y":4}},"back":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-9,-1],"dimensions":[16,8,2]}],"partPose":{"yRot":1.5707964,"x":9,"y":4}},"front":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-9,-1],"dimensions":[16,8,2]}],"partPose":{"yRot":4.712389,"x":-9,"y":4}},"right":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-9,-1],"dimensions":[16,8,2]}],"partPose":{"y":4,"z":7}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        ei = JSON.parse(
          '{"mesh":{"root":{"children":{"knot":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3,-8,-3],"dimensions":[6,8,6]}]}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        et = JSON.parse(
          '{"mesh":{"root":{"children":{"right_paddle":{"cubes":[{"texCoord":{"u":62,"v":20},"origin":[-1,0,-5],"dimensions":[2,2,18]},{"texCoord":{"u":62,"v":20},"origin":[0.001,-3,8],"dimensions":[1,6,7]}],"partPose":{"yRot":3.1415927,"zRot":0.19634955,"x":3,"y":-5,"z":-9}},"left_paddle":{"cubes":[{"texCoord":{"u":62,"v":0},"origin":[-1,0,-5],"dimensions":[2,2,18]},{"texCoord":{"u":62,"v":0},"origin":[-1.001,-3,8],"dimensions":[1,6,7]}],"partPose":{"zRot":0.19634955,"x":3,"y":-5,"z":9}},"left":{"cubes":[{"texCoord":{"u":0,"v":43},"origin":[-14,-7,-1],"dimensions":[28,6,2]}],"partPose":{"y":4,"z":9}},"bottom":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-14,-9,-3],"dimensions":[28,16,3]}],"partPose":{"xRot":1.5707964,"y":3,"z":1}},"water_patch":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-14,-9,-3],"dimensions":[28,16,3]}],"partPose":{"xRot":1.5707964,"y":-3,"z":1}},"back":{"cubes":[{"texCoord":{"u":0,"v":19},"origin":[-13,-7,-1],"dimensions":[18,6,2]}],"partPose":{"yRot":4.712389,"x":-15,"y":4,"z":4}},"front":{"cubes":[{"texCoord":{"u":0,"v":27},"origin":[-8,-7,-1],"dimensions":[16,6,2]}],"partPose":{"yRot":1.5707964,"x":15,"y":4}},"right":{"cubes":[{"texCoord":{"u":0,"v":35},"origin":[-14,-7,-1],"dimensions":[28,6,2]}],"partPose":{"yRot":3.1415927,"y":4,"z":-9}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        er = JSON.parse(
          '{"mesh":{"root":{"children":{"chest_bottom":{"cubes":[{"texCoord":{"u":0,"v":76},"origin":[0,0,0],"dimensions":[12,8,12]}],"partPose":{"yRot":-1.5707964,"x":-2,"y":-5,"z":-6}},"right_paddle":{"cubes":[{"texCoord":{"u":62,"v":20},"origin":[-1,0,-5],"dimensions":[2,2,18]},{"texCoord":{"u":62,"v":20},"origin":[0.001,-3,8],"dimensions":[1,6,7]}],"partPose":{"yRot":3.1415927,"zRot":0.19634955,"x":3,"y":-5,"z":-9}},"left_paddle":{"cubes":[{"texCoord":{"u":62,"v":0},"origin":[-1,0,-5],"dimensions":[2,2,18]},{"texCoord":{"u":62,"v":0},"origin":[-1.001,-3,8],"dimensions":[1,6,7]}],"partPose":{"zRot":0.19634955,"x":3,"y":-5,"z":9}},"left":{"cubes":[{"texCoord":{"u":0,"v":43},"origin":[-14,-7,-1],"dimensions":[28,6,2]}],"partPose":{"y":4,"z":9}},"bottom":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-14,-9,-3],"dimensions":[28,16,3]}],"partPose":{"xRot":1.5707964,"y":3,"z":1}},"water_patch":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-14,-9,-3],"dimensions":[28,16,3]}],"partPose":{"xRot":1.5707964,"y":-3,"z":1}},"back":{"cubes":[{"texCoord":{"u":0,"v":19},"origin":[-13,-7,-1],"dimensions":[18,6,2]}],"partPose":{"yRot":4.712389,"x":-15,"y":4,"z":4}},"chest_lid":{"cubes":[{"texCoord":{"u":0,"v":59},"origin":[0,0,0],"dimensions":[12,4,12]}],"partPose":{"yRot":-1.5707964,"x":-2,"y":-9,"z":-6}},"front":{"cubes":[{"texCoord":{"u":0,"v":27},"origin":[-8,-7,-1],"dimensions":[16,6,2]}],"partPose":{"yRot":1.5707964,"x":15,"y":4}},"right":{"cubes":[{"texCoord":{"u":0,"v":35},"origin":[-14,-7,-1],"dimensions":[28,6,2]}],"partPose":{"yRot":3.1415927,"y":4,"z":-9}},"chest_lock":{"cubes":[{"texCoord":{"u":0,"v":59},"origin":[0,0,0],"dimensions":[2,4,1]}],"partPose":{"yRot":-1.5707964,"x":-1,"y":-6,"z":-1}}}}},"material":{"xTexSize":128,"yTexSize":128}}',
        ),
        en = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":1.9,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-1.9,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        es = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8]},{"texCoord":{"u":24,"v":0},"origin":[-1,-3,-6],"dimensions":[2,4,2]}]},"right_arm":{"cubes":[{"texCoord":{"u":44,"v":22},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":44,"v":22},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-2,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-10,-4],"dimensions":[8,10,8],"grow":0.5}],"children":{"hat_rim":{"cubes":[{"texCoord":{"u":30,"v":47},"origin":[-8,-8,-6],"dimensions":[16,16,1]}],"partPose":{"xRot":-1.5707964}}}},"body":{"cubes":[{"texCoord":{"u":16,"v":20},"origin":[-4,0,-3],"dimensions":[8,12,6]},{"texCoord":{"u":0,"v":38},"origin":[-4,0,-3],"dimensions":[8,20,6],"grow":0.05}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        ea = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-12,-5.5],"dimensions":[8,10,8]},{"texCoord":{"u":24,"v":0},"origin":[-1,-5,-7.5],"dimensions":[2,4,2]}],"partPose":{"y":-7,"z":-2}},"right_arm":{"cubes":[{"texCoord":{"u":60,"v":21},"origin":[-13,-2.5,-3],"dimensions":[4,30,6]}],"partPose":{"y":-7}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":60,"v":0},"origin":[-3.5,-3,-3],"dimensions":[6,16,5]}],"partPose":{"x":5,"y":11}},"left_arm":{"cubes":[{"texCoord":{"u":60,"v":58},"origin":[9,-2.5,-3],"dimensions":[4,30,6]}],"partPose":{"y":-7}},"right_leg":{"cubes":[{"texCoord":{"u":37,"v":0},"origin":[-3.5,-3,-3],"dimensions":[6,16,5]}],"partPose":{"x":-4,"y":11}},"body":{"cubes":[{"texCoord":{"u":0,"v":40},"origin":[-9,-2,-6],"dimensions":[18,12,11]},{"texCoord":{"u":0,"v":70},"origin":[-4.5,10,-3],"dimensions":[9,5,6],"grow":0.5}],"partPose":{"y":-7}}}}},"material":{"xTexSize":128,"yTexSize":128}}',
        ),
        ed = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"comment":"main","origin":[-2.5,-2,-3],"dimensions":[5,4,5]},{"texCoord":{"u":0,"v":24},"comment":"nose","origin":[-1.5,-0.001,-4],"dimensions":[3,2,2]},{"texCoord":{"u":0,"v":10},"comment":"ear1","origin":[-2,-3,0],"dimensions":[1,1,2]},{"texCoord":{"u":6,"v":10},"comment":"ear2","origin":[1,-3,0],"dimensions":[1,1,2]}],"partPose":{"y":15,"z":-9}},"tail1":{"cubes":[{"texCoord":{"u":0,"v":15},"origin":[-0.5,0,0],"dimensions":[1,8,1]}],"partPose":{"xRot":0.9,"y":15,"z":8}},"right_front_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-1,0,0],"dimensions":[2,10,2]}],"partPose":{"x":-1.2,"y":14.1,"z":-5}},"tail2":{"cubes":[{"texCoord":{"u":4,"v":15},"origin":[-0.5,0,0],"dimensions":[1,8,1]}],"partPose":{"y":20,"z":14}},"right_hind_leg":{"cubes":[{"texCoord":{"u":8,"v":13},"origin":[-1,0,1],"dimensions":[2,6,2]}],"partPose":{"x":-1.1,"y":18,"z":5}},"left_hind_leg":{"cubes":[{"texCoord":{"u":8,"v":13},"origin":[-1,0,1],"dimensions":[2,6,2]}],"partPose":{"x":1.1,"y":18,"z":5}},"body":{"cubes":[{"texCoord":{"u":20,"v":0},"origin":[-2,3,-8],"dimensions":[4,16,6]}],"partPose":{"xRot":1.5707964,"y":12,"z":-10}},"left_front_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-1,0,0],"dimensions":[2,10,2]}],"partPose":{"x":1.2,"y":14.1,"z":-5}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        el = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-4,-8],"dimensions":[8,8,8]},{"texCoord":{"u":16,"v":16},"origin":[-2,0,-9],"dimensions":[4,3,1]}],"partPose":{"y":12,"z":-6}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":-3,"y":18,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":-3,"y":18,"z":7}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":3,"y":18,"z":7}},"body":{"cubes":[{"texCoord":{"u":28,"v":8},"origin":[-5,-10,-7],"dimensions":[10,16,8]}],"partPose":{"xRot":1.5707964,"y":11,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":3,"y":18,"z":-5}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eu = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-4,-8],"dimensions":[8,8,8],"grow":0.5},{"texCoord":{"u":16,"v":16},"origin":[-2,0,-9],"dimensions":[4,3,1],"grow":0.5}],"partPose":{"y":12,"z":-6}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":-3,"y":18,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":-3,"y":18,"z":7}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":3,"y":18,"z":7}},"body":{"cubes":[{"texCoord":{"u":28,"v":8},"origin":[-5,-10,-7],"dimensions":[10,16,8],"grow":0.5}],"partPose":{"xRot":1.5707964,"y":11,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":3,"y":18,"z":-5}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        ec = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3,-4,-6],"dimensions":[6,6,8]}],"partPose":{"y":6,"z":-8}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-3,"y":12,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-3,"y":12,"z":7}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":3,"y":12,"z":7}},"body":{"cubes":[{"texCoord":{"u":28,"v":8},"origin":[-4,-10,-7],"dimensions":[8,16,6]}],"partPose":{"xRot":1.5707964,"y":5,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":3,"y":12,"z":-5}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        em = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3,-4,-4],"dimensions":[6,6,6],"grow":0.6}],"partPose":{"y":6,"z":-8}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":-3,"y":12,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":-3,"y":12,"z":7}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":3,"y":12,"z":7}},"body":{"cubes":[{"texCoord":{"u":28,"v":8},"origin":[-4,-10,-7],"dimensions":[8,16,6],"grow":1.75}],"partPose":{"xRot":1.5707964,"y":5,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":0.5}],"partPose":{"x":3,"y":12,"z":-5}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        ex = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-2,-6,-2],"dimensions":[4,6,3]}],"partPose":{"y":15,"z":-4}},"beak":{"cubes":[{"texCoord":{"u":14,"v":0},"origin":[-2,-4,-4],"dimensions":[4,2,2]}],"partPose":{"y":15,"z":-4}},"left_leg":{"cubes":[{"texCoord":{"u":26,"v":0},"origin":[-1,0,-3],"dimensions":[3,5,3]}],"partPose":{"x":1,"y":19,"z":1}},"right_leg":{"cubes":[{"texCoord":{"u":26,"v":0},"origin":[-1,0,-3],"dimensions":[3,5,3]}],"partPose":{"x":-2,"y":19,"z":1}},"right_wing":{"cubes":[{"texCoord":{"u":24,"v":13},"origin":[0,0,-3],"dimensions":[1,4,6]}],"partPose":{"x":-4,"y":13}},"left_wing":{"cubes":[{"texCoord":{"u":24,"v":13},"origin":[-1,0,-3],"dimensions":[1,4,6]}],"partPose":{"x":4,"y":13}},"body":{"cubes":[{"texCoord":{"u":0,"v":9},"origin":[-3,-4,-3],"dimensions":[6,8,6]}],"partPose":{"xRot":1.5707964,"y":16}},"red_thing":{"cubes":[{"texCoord":{"u":14,"v":4},"origin":[-1,-2,-3],"dimensions":[2,2,2]}],"partPose":{"y":15,"z":-4}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eg = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"partPose":{"x":-1,"y":13.5,"z":-7},"children":{"real_head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-2,-3,-2],"dimensions":[6,6,4]},{"texCoord":{"u":16,"v":14},"origin":[-2,-5,0],"dimensions":[2,2,1]},{"texCoord":{"u":16,"v":14},"origin":[2,-5,0],"dimensions":[2,2,1]},{"texCoord":{"u":0,"v":10},"origin":[-0.5,-0.001,-5],"dimensions":[3,3,4]}]}}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":18},"origin":[0,0,-1],"dimensions":[2,8,2]}],"partPose":{"x":-2.5,"y":16,"z":-4}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":18},"origin":[0,0,-1],"dimensions":[2,8,2]}],"partPose":{"x":-2.5,"y":16,"z":7}},"upper_body":{"cubes":[{"texCoord":{"u":21,"v":0},"origin":[-3,-3,-3],"dimensions":[8,6,7]}],"partPose":{"xRot":1.5707964,"x":-1,"y":14,"z":-3}},"tail":{"partPose":{"xRot":0.62831855,"x":-1,"y":12,"z":8},"children":{"real_tail":{"cubes":[{"texCoord":{"u":9,"v":18},"origin":[0,0,-1],"dimensions":[2,8,2]}]}}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":18},"origin":[0,0,-1],"dimensions":[2,8,2]}],"partPose":{"x":0.5,"y":16,"z":7}},"body":{"cubes":[{"texCoord":{"u":18,"v":14},"origin":[-3,-2,-3],"dimensions":[6,9,6]}],"partPose":{"xRot":1.5707964,"y":14,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":18},"origin":[0,0,-1],"dimensions":[2,8,2]}],"partPose":{"x":0.5,"y":16,"z":-4}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        ep = JSON.parse(
          '{"mesh":{"root":{"children":{"right_front_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":-12}},"right_hind_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":7}},"left_front_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":-12}},"right_hind_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":-4,"y":14,"z":7}},"right_front_baby_leg":{"cubes":[{"texCoord":{"u":48,"v":21},"origin":[-1,-1.01,-1.9],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":-4,"y":14,"z":-12}},"head_parts":{"cubes":[{"texCoord":{"u":0,"v":35},"origin":[-2.05,-6,-2],"dimensions":[4,12,7]}],"partPose":{"xRot":0.5235988,"y":4,"z":-12},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":13},"origin":[-3,-11,-2],"dimensions":[6,5,7]}],"children":{"right_ear":{"cubes":[{"texCoord":{"u":19,"v":16},"origin":[-2.55,-13,4],"dimensions":[2,3,1],"grow":-0.001}]},"left_ear":{"cubes":[{"texCoord":{"u":19,"v":16},"origin":[0.55,-13,4],"dimensions":[2,3,1],"grow":-0.001}]}}},"left_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[2,-9,-6],"dimensions":[1,2,2]}]},"mouth_saddle_wrap":{"cubes":[{"texCoord":{"u":19,"v":0},"origin":[-2,-11,-4],"dimensions":[4,5,2],"grow":0.2}]},"right_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[-3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"mane":{"cubes":[{"texCoord":{"u":56,"v":36},"origin":[-1,-11,5.01],"dimensions":[2,16,2]}]},"right_saddle_mouth":{"cubes":[{"texCoord":{"u":29,"v":5},"origin":[-3,-9,-6],"dimensions":[1,2,2]}]},"left_saddle_line":{"cubes":[{"texCoord":{"u":32,"v":2},"origin":[3.1,-6,-8],"dimensions":[0,3,16]}],"partPose":{"xRot":-0.5235988}},"upper_mouth":{"cubes":[{"texCoord":{"u":0,"v":25},"origin":[-2,-11,-7],"dimensions":[4,5,5]}]},"head_saddle":{"cubes":[{"texCoord":{"u":1,"v":1},"origin":[-3,-11,-1.9],"dimensions":[6,5,6],"grow":0.2}]}}},"left_hind_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":7}},"body":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-5,-8,-17],"dimensions":[10,10,22],"grow":0.05}],"partPose":{"y":11,"z":5},"children":{"saddle":{"cubes":[{"texCoord":{"u":26,"v":0},"origin":[-5,-8,-9],"dimensions":[10,9,9],"grow":0.5}]},"tail":{"cubes":[{"texCoord":{"u":42,"v":36},"origin":[-1.5,0,0],"dimensions":[3,14,4]}],"partPose":{"xRot":0.5235988,"y":-5,"z":2}}}},"left_front_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1.9],"dimensions":[4,11,4]}],"partPose":{"x":4,"y":14,"z":-12}},"left_hind_baby_leg":{"cubes":[{"mirror":true,"texCoord":{"u":48,"v":21},"origin":[-3,-1.01,-1],"dimensions":[4,11,4],"grow":{"growY":5.5}}],"partPose":{"x":4,"y":14,"z":7}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        eh = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-2.5,-4,-5],"dimensions":[5,4,5]}],"partPose":{"y":16,"z":-1}},"nose":{"cubes":[{"texCoord":{"u":32,"v":9},"origin":[-0.5,-2.5,-5.5],"dimensions":[1,1,1]}],"partPose":{"y":16,"z":-1}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":15},"origin":[-1,0,-1],"dimensions":[2,7,2]}],"partPose":{"xRot":-0.17453292,"x":-3,"y":17,"z":-1}},"right_hind_foot":{"cubes":[{"texCoord":{"u":8,"v":24},"origin":[-1,5.5,-3.7],"dimensions":[2,1,7]}],"partPose":{"x":-3,"y":17.5,"z":3.7}},"tail":{"cubes":[{"texCoord":{"u":52,"v":6},"origin":[-1.5,-1.5,0],"dimensions":[3,3,2]}],"partPose":{"xRot":-0.3490659,"y":20,"z":7}},"left_haunch":{"cubes":[{"texCoord":{"u":30,"v":15},"origin":[-1,0,0],"dimensions":[2,4,5]}],"partPose":{"xRot":-0.34906584,"x":3,"y":17.5,"z":3.7}},"right_haunch":{"cubes":[{"texCoord":{"u":16,"v":15},"origin":[-1,0,0],"dimensions":[2,4,5]}],"partPose":{"xRot":-0.34906584,"x":-3,"y":17.5,"z":3.7}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3,-2,-10],"dimensions":[6,5,10]}],"partPose":{"xRot":-0.34906584,"y":19,"z":8}},"right_ear":{"cubes":[{"texCoord":{"u":52,"v":0},"origin":[-2.5,-9,-1],"dimensions":[2,5,1]}],"partPose":{"yRot":-0.2617994,"y":16,"z":-1}},"left_front_leg":{"cubes":[{"texCoord":{"u":8,"v":15},"origin":[-1,0,-1],"dimensions":[2,7,2]}],"partPose":{"xRot":-0.17453292,"x":3,"y":17,"z":-1}},"left_hind_foot":{"cubes":[{"texCoord":{"u":26,"v":24},"origin":[-1,5.5,-3.7],"dimensions":[2,1,7]}],"partPose":{"x":3,"y":17.5,"z":3.7}},"left_ear":{"cubes":[{"texCoord":{"u":58,"v":0},"origin":[0.5,-9,-1],"dimensions":[2,5,1]}],"partPose":{"yRot":0.2617994,"y":16,"z":-1}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        ef = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":1,"v":5},"origin":[-3,-2,-5],"dimensions":[8,6,6]}],"partPose":{"x":-1,"y":16.5,"z":-3},"children":{"nose":{"cubes":[{"texCoord":{"u":6,"v":18},"origin":[-1,2.01,-8],"dimensions":[4,2,3]}]},"right_ear":{"cubes":[{"texCoord":{"u":8,"v":1},"origin":[-3,-4,-4],"dimensions":[2,2,1]}]},"left_ear":{"cubes":[{"texCoord":{"u":15,"v":1},"origin":[3,-4,-4],"dimensions":[2,2,1]}]}}},"right_front_leg":{"cubes":[{"texCoord":{"u":13,"v":24},"origin":[2,0.5,-1],"dimensions":[2,6,2],"grow":0.001}],"partPose":{"x":-5,"y":17.5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":13,"v":24},"origin":[2,0.5,-1],"dimensions":[2,6,2],"grow":0.001}],"partPose":{"x":-5,"y":17.5,"z":7}},"left_hind_leg":{"cubes":[{"texCoord":{"u":4,"v":24},"origin":[2,0.5,-1],"dimensions":[2,6,2],"grow":0.001}],"partPose":{"x":-1,"y":17.5,"z":7}},"body":{"cubes":[{"texCoord":{"u":24,"v":15},"origin":[-3,3.999,-3.5],"dimensions":[6,11,6]}],"partPose":{"xRot":1.5707964,"y":16,"z":-6},"children":{"tail":{"cubes":[{"texCoord":{"u":30,"v":0},"origin":[2,0,-1],"dimensions":[4,9,5]}],"partPose":{"xRot":-0.05235988,"x":-4,"y":15,"z":-1}}}},"left_front_leg":{"cubes":[{"texCoord":{"u":4,"v":24},"origin":[2,0.5,-1],"dimensions":[2,6,2],"grow":0.001}],"partPose":{"x":-1,"y":17.5}}}}},"material":{"xTexSize":48,"yTexSize":32}}',
        ),
        eb = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":6},"origin":[-6.5,-5,-4],"dimensions":[13,10,9]},{"texCoord":{"u":45,"v":16},"comment":"nose","origin":[-3.5,0,-6],"dimensions":[7,5,2]},{"texCoord":{"u":52,"v":25},"comment":"left_ear","origin":[3.5,-8,-1],"dimensions":[5,4,1]},{"texCoord":{"u":52,"v":25},"comment":"right_ear","origin":[-8.5,-8,-1],"dimensions":[5,4,1]}],"partPose":{"y":11.5,"z":-17}},"right_front_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-3,0,-3],"dimensions":[6,9,6]}],"partPose":{"x":-5.5,"y":15,"z":-9}},"right_hind_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-3,0,-3],"dimensions":[6,9,6]}],"partPose":{"x":-5.5,"y":15,"z":9}},"left_hind_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-3,0,-3],"dimensions":[6,9,6]}],"partPose":{"x":5.5,"y":15,"z":9}},"body":{"cubes":[{"texCoord":{"u":0,"v":25},"origin":[-9.5,-13,-6.5],"dimensions":[19,26,13]}],"partPose":{"xRot":1.5707964,"y":10}},"left_front_leg":{"cubes":[{"texCoord":{"u":40,"v":0},"origin":[-3,0,-3],"dimensions":[6,9,6]}],"partPose":{"x":5.5,"y":15,"z":-9}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        ey = JSON.parse(
          '{"mesh":{"root":{"children":{"body":{"cubes":[{"texCoord":{"u":0,"v":11},"origin":[-4,-2,-9],"dimensions":[8,4,10]},{"texCoord":{"u":2,"v":17},"origin":[0,-3,-8],"dimensions":[0,5,9]}],"partPose":{"y":20,"z":5},"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":1},"origin":[-4,-3,-5],"dimensions":[8,5,5],"grow":0.001}],"partPose":{"z":-9},"children":{"top_gills":{"cubes":[{"texCoord":{"u":3,"v":37},"origin":[-4,-3,0],"dimensions":[8,3,0],"grow":0.001}],"partPose":{"y":-3,"z":-1}},"left_gills":{"cubes":[{"texCoord":{"u":0,"v":40},"origin":[-3,-5,0],"dimensions":[3,7,0],"grow":0.001}],"partPose":{"x":-4,"z":-1}},"right_gills":{"cubes":[{"texCoord":{"u":11,"v":40},"origin":[0,-5,0],"dimensions":[3,7,0],"grow":0.001}],"partPose":{"x":4,"z":-1}}}},"right_front_leg":{"cubes":[{"texCoord":{"u":2,"v":13},"origin":[-2,0,0],"dimensions":[3,5,0],"grow":0.001}],"partPose":{"x":-3.5,"y":1,"z":-8}},"right_hind_leg":{"cubes":[{"texCoord":{"u":2,"v":13},"origin":[-2,0,0],"dimensions":[3,5,0],"grow":0.001}],"partPose":{"x":-3.5,"y":1,"z":-1}},"tail":{"cubes":[{"texCoord":{"u":2,"v":19},"origin":[0,-3,0],"dimensions":[0,5,12]}],"partPose":{"z":1}},"left_hind_leg":{"cubes":[{"texCoord":{"u":2,"v":13},"origin":[-1,0,0],"dimensions":[3,5,0],"grow":0.001}],"partPose":{"x":3.5,"y":1,"z":-1}},"left_front_leg":{"cubes":[{"texCoord":{"u":2,"v":13},"origin":[-1,0,0],"dimensions":[3,5,0],"grow":0.001}],"partPose":{"x":3.5,"y":1,"z":-8}}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        ev = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-2,-14,-10],"dimensions":[4,4,9]},{"texCoord":{"u":0,"v":14},"comment":"neck","origin":[-4,-16,-6],"dimensions":[8,18,6]},{"texCoord":{"u":17,"v":0},"comment":"ear","origin":[-4,-19,-4],"dimensions":[3,3,2]},{"texCoord":{"u":17,"v":0},"comment":"ear","origin":[1,-19,-4],"dimensions":[3,3,2]}],"partPose":{"y":7,"z":-6}},"right_front_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":-3.5,"y":10,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":-3.5,"y":10,"z":6}},"right_chest":{"cubes":[{"texCoord":{"u":45,"v":28},"origin":[-3,0,0],"dimensions":[8,8,3]}],"partPose":{"yRot":1.5707964,"x":-8.5,"y":3,"z":3}},"left_hind_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":3.5,"y":10,"z":6}},"body":{"cubes":[{"texCoord":{"u":29,"v":0},"origin":[-6,-10,-7],"dimensions":[12,18,10]}],"partPose":{"xRot":1.5707964,"y":5,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":3.5,"y":10,"z":-5}},"left_chest":{"cubes":[{"texCoord":{"u":45,"v":41},"origin":[-3,0,0],"dimensions":[8,8,3]}],"partPose":{"yRot":1.5707964,"x":5.5,"y":3,"z":3}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        e_ = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-2,-14,-10],"dimensions":[4,4,9]},{"texCoord":{"u":0,"v":14},"comment":"neck","origin":[-4,-16,-6],"dimensions":[8,18,6]},{"texCoord":{"u":17,"v":0},"comment":"ear","origin":[-4,-19,-4],"dimensions":[3,3,2]},{"texCoord":{"u":17,"v":0},"comment":"ear","origin":[1,-19,-4],"dimensions":[3,3,2]}],"partPose":{"y":7,"z":-6}},"right_front_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":-3.5,"y":10,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":-3.5,"y":10,"z":6}},"right_chest":{"cubes":[{"texCoord":{"u":45,"v":28},"origin":[-3,0,0],"dimensions":[8,8,3]}],"partPose":{"yRot":1.5707964,"x":-8.5,"y":3,"z":3}},"left_hind_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":3.5,"y":10,"z":6}},"body":{"cubes":[{"texCoord":{"u":29,"v":0},"origin":[-6,-10,-7],"dimensions":[12,18,10]}],"partPose":{"xRot":1.5707964,"y":5,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4]}],"partPose":{"x":3.5,"y":10,"z":-5}},"left_chest":{"cubes":[{"texCoord":{"u":45,"v":41},"origin":[-3,0,0],"dimensions":[8,8,3]}],"partPose":{"yRot":1.5707964,"x":5.5,"y":3,"z":3}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        eC = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-2,-14,-10],"dimensions":[4,4,9],"grow":0.5},{"texCoord":{"u":0,"v":14},"comment":"neck","origin":[-4,-16,-6],"dimensions":[8,18,6],"grow":0.5},{"texCoord":{"u":17,"v":0},"comment":"ear","origin":[-4,-19,-4],"dimensions":[3,3,2],"grow":0.5},{"texCoord":{"u":17,"v":0},"comment":"ear","origin":[1,-19,-4],"dimensions":[3,3,2],"grow":0.5}],"partPose":{"y":7,"z":-6}},"right_front_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4],"grow":0.5}],"partPose":{"x":-3.5,"y":10,"z":-5}},"right_hind_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4],"grow":0.5}],"partPose":{"x":-3.5,"y":10,"z":6}},"right_chest":{"cubes":[{"texCoord":{"u":45,"v":28},"origin":[-3,0,0],"dimensions":[8,8,3],"grow":0.5}],"partPose":{"yRot":1.5707964,"x":-8.5,"y":3,"z":3}},"left_hind_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4],"grow":0.5}],"partPose":{"x":3.5,"y":10,"z":6}},"body":{"cubes":[{"texCoord":{"u":29,"v":0},"origin":[-6,-10,-7],"dimensions":[12,18,10],"grow":0.5}],"partPose":{"xRot":1.5707964,"y":5,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":29,"v":29},"origin":[-2,0,-2],"dimensions":[4,14,4],"grow":0.5}],"partPose":{"x":3.5,"y":10,"z":-5}},"left_chest":{"cubes":[{"texCoord":{"u":45,"v":41},"origin":[-3,0,0],"dimensions":[8,8,3],"grow":0.5}],"partPose":{"yRot":1.5707964,"x":5.5,"y":3,"z":3}}}}},"material":{"xTexSize":128,"yTexSize":64}}',
        ),
        eP = JSON.parse(
          '{"mesh":{"root":{"children":{"bone":{"partPose":{"y":19},"children":{"front_legs":{"cubes":[{"texCoord":{"u":26,"v":1},"comment":"front_legs","origin":[-5,0,0],"dimensions":[7,2,0]}],"partPose":{"x":1.5,"y":3,"z":-2}},"right_wing":{"cubes":[{"texCoord":{"u":0,"v":18},"origin":[-9,0,0],"dimensions":[9,0,6],"grow":0.001}],"partPose":{"yRot":-0.2618,"x":-1.5,"y":-4,"z":-3}},"left_wing":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":18},"origin":[0,0,0],"dimensions":[9,0,6],"grow":0.001}],"partPose":{"yRot":0.2618,"x":1.5,"y":-4,"z":-3}},"middle_legs":{"cubes":[{"texCoord":{"u":26,"v":3},"comment":"middle_legs","origin":[-5,0,0],"dimensions":[7,2,0]}],"partPose":{"x":1.5,"y":3}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-3.5,-4,-5],"dimensions":[7,7,10]}],"children":{"right_antenna":{"cubes":[{"texCoord":{"u":2,"v":3},"origin":[-2.5,-2,-3],"dimensions":[1,2,3]}],"partPose":{"y":-2,"z":-5}},"stinger":{"cubes":[{"texCoord":{"u":26,"v":7},"origin":[0,-1,5],"dimensions":[0,1,2]}]},"left_antenna":{"cubes":[{"texCoord":{"u":2,"v":0},"origin":[1.5,-2,-3],"dimensions":[1,2,3]}],"partPose":{"y":-2,"z":-5}}}},"back_legs":{"cubes":[{"texCoord":{"u":26,"v":5},"comment":"back_legs","origin":[-5,0,0],"dimensions":[7,2,0]}],"partPose":{"x":1.5,"y":3,"z":2}}}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        ez = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":2,"v":2},"origin":[-1,-1.5,-1],"dimensions":[2,3,2]}],"partPose":{"y":15.69,"z":-2.76},"children":{"beak1":{"cubes":[{"texCoord":{"u":11,"v":7},"origin":[-0.5,-1,-0.5],"dimensions":[1,2,1]}],"partPose":{"y":-0.5,"z":-1.5}},"beak2":{"cubes":[{"texCoord":{"u":16,"v":7},"origin":[-0.5,0,-0.5],"dimensions":[1,2,1]}],"partPose":{"y":-1.75,"z":-2.45}},"feather":{"cubes":[{"texCoord":{"u":2,"v":18},"origin":[0,-4,-2],"dimensions":[0,5,4]}],"partPose":{"y":-2.15,"z":0.15}},"head2":{"cubes":[{"texCoord":{"u":10,"v":0},"origin":[-1,-0.5,-2],"dimensions":[2,1,4]}],"partPose":{"y":-2,"z":-1}}}},"left_leg":{"cubes":[{"texCoord":{"u":14,"v":18},"origin":[-0.5,0,-0.5],"dimensions":[1,2,1]}],"partPose":{"x":1,"y":22,"z":-1.05}},"right_wing":{"cubes":[{"texCoord":{"u":19,"v":8},"origin":[-0.5,0,-1.5],"dimensions":[1,5,3]}],"partPose":{"x":-1.5,"y":16.94,"z":-2.76}},"right_leg":{"cubes":[{"texCoord":{"u":14,"v":18},"origin":[-0.5,0,-0.5],"dimensions":[1,2,1]}],"partPose":{"x":-1,"y":22,"z":-1.05}},"tail":{"cubes":[{"texCoord":{"u":22,"v":1},"origin":[-1.5,-1,-1],"dimensions":[3,4,1]}],"partPose":{"y":21.07,"z":1.16}},"left_wing":{"cubes":[{"texCoord":{"u":19,"v":8},"origin":[-0.5,0,-1.5],"dimensions":[1,5,3]}],"partPose":{"x":1.5,"y":16.94,"z":-2.76}},"body":{"cubes":[{"texCoord":{"u":2,"v":8},"origin":[-1.5,0,-1.5],"dimensions":[3,6,3]}],"partPose":{"y":16.5,"z":-3}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        ek = JSON.parse(
          '{"mesh":{"root":{"children":{"root":{"partPose":{"y":24},"children":{"left_leg":{"cubes":[{"texCoord":{"u":14,"v":25},"origin":[-1,0,-2],"dimensions":[3,3,4]}],"partPose":{"x":3.5,"y":-3,"z":4},"children":{"left_foot":{"cubes":[{"texCoord":{"u":2,"v":32},"origin":[-4,0.01,-4],"dimensions":[8,0,8]}],"partPose":{"x":2,"y":3}}}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":25},"origin":[-2,0,-2],"dimensions":[3,3,4]}],"partPose":{"x":-3.5,"y":-3,"z":4},"children":{"right_foot":{"cubes":[{"texCoord":{"u":18,"v":32},"origin":[-4,0.01,-4],"dimensions":[8,0,8]}],"partPose":{"x":-2,"y":3}}}},"body":{"cubes":[{"texCoord":{"u":3,"v":1},"origin":[-3.5,-2,-8],"dimensions":[7,3,9]},{"texCoord":{"u":23,"v":22},"origin":[-3.5,-1,-8],"dimensions":[7,0,9]}],"partPose":{"y":-2,"z":4},"children":{"head":{"cubes":[{"texCoord":{"u":23,"v":13},"origin":[-3.5,-1,-7],"dimensions":[7,0,9]},{"texCoord":{"u":0,"v":13},"origin":[-3.5,-2,-7],"dimensions":[7,3,9]}],"partPose":{"y":-2,"z":-1},"children":{"eyes":{"partPose":{"x":-0.5,"z":2},"children":{"right_eye":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1.5,-1,-1.5],"dimensions":[3,2,3]}],"partPose":{"x":-1.5,"y":-3,"z":-6.5}},"left_eye":{"cubes":[{"texCoord":{"u":0,"v":5},"origin":[-1.5,-1,-1.5],"dimensions":[3,2,3]}],"partPose":{"x":2.5,"y":-3,"z":-6.5}}}}}},"right_arm":{"cubes":[{"texCoord":{"u":0,"v":38},"origin":[-1,0,-1],"dimensions":[2,3,3]}],"partPose":{"x":-4,"y":-1,"z":-6.5},"children":{"right_hand":{"cubes":[{"texCoord":{"u":2,"v":40},"origin":[-4,0.01,-5],"dimensions":[8,0,8]}],"partPose":{"y":3}}}},"tongue":{"cubes":[{"texCoord":{"u":17,"v":13},"origin":[-2,0,-7.1],"dimensions":[4,0,7]}],"partPose":{"y":-1.01,"z":1}},"left_arm":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-1,0,-1],"dimensions":[2,3,3]}],"partPose":{"x":4,"y":-1,"z":-6.5},"children":{"left_hand":{"cubes":[{"texCoord":{"u":18,"v":40},"origin":[-4,0.01,-4],"dimensions":[8,0,8]}],"partPose":{"y":3,"z":-1}}}},"croaking_body":{"cubes":[{"texCoord":{"u":26,"v":5},"origin":[-3.5,-0.1,-2.9],"dimensions":[7,2,3],"grow":-0.1}],"partPose":{"y":-1,"z":-5}}}}}}}}},"material":{"xTexSize":48,"yTexSize":48}}',
        ),
        ew = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-4,-6],"dimensions":[8,8,6]},{"texCoord":{"u":22,"v":0},"comment":"right_horn","origin":[-5,-5,-4],"dimensions":[1,3,1]},{"texCoord":{"u":22,"v":0},"comment":"left_horn","origin":[4,-5,-4],"dimensions":[1,3,1]}],"partPose":{"y":4,"z":-8}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-4,"y":12,"z":-6}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-4,"y":12,"z":7}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":4,"y":12,"z":7}},"body":{"cubes":[{"texCoord":{"u":18,"v":4},"origin":[-6,-10,-7],"dimensions":[12,18,10]},{"texCoord":{"u":52,"v":0},"origin":[-2,2,-8],"dimensions":[4,6,1]}],"partPose":{"xRot":1.5707964,"y":5,"z":2}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":4,"y":12,"z":-6}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eS = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":52},"origin":[-3,0,-3],"dimensions":[6,6,6]}],"partPose":{"y":12}},"lid":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-16,-8],"dimensions":[16,12,16]}],"partPose":{"y":24}},"base":{"cubes":[{"texCoord":{"u":0,"v":28},"origin":[-8,-8,-8],"dimensions":[16,8,16]}],"partPose":{"y":24}}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        ej = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}],"partPose":{"y":6}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":-2,"y":18,"z":-4}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":-2,"y":18,"z":4}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":2,"y":18,"z":4}},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}],"partPose":{"y":6}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4]}],"partPose":{"x":2,"y":18,"z":-4}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eT = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":2}],"partPose":{"y":6}},"right_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":2}],"partPose":{"x":-2,"y":18,"z":-4}},"right_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":2}],"partPose":{"x":-2,"y":18,"z":4}},"left_hind_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":2}],"partPose":{"x":2,"y":18,"z":4}},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":2}],"partPose":{"y":6}},"left_front_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,6,4],"grow":2}],"partPose":{"x":2,"y":18,"z":-4}}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eR = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"texCoord":{"u":16,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":1.9,"y":12}},"left_arm":{"cubes":[{"texCoord":{"u":32,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4]}],"partPose":{"x":-1.9,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        eM = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.25}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"texCoord":{"u":16,"v":48},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":1.9,"y":12}},"left_arm":{"cubes":[{"texCoord":{"u":32,"v":48},"origin":[-1,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-1.9,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.75}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":0.25}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        eO = JSON.parse(
          '{"mesh":{"root":{"children":{"right_eye":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-3.25,18,-3.5],"dimensions":[2,2,2]}]},"mouth":{"cubes":[{"texCoord":{"u":32,"v":8},"origin":[0,21,-3.5],"dimensions":[1,1,1]}]},"left_eye":{"cubes":[{"texCoord":{"u":32,"v":4},"origin":[1.25,18,-3.5],"dimensions":[2,2,2]}]},"cube":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-3,17,-3],"dimensions":[6,6,6]}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eN = JSON.parse(
          '{"mesh":{"root":{"children":{"cube":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,16,-4],"dimensions":[8,8,8]}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eF = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-1,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-1,0,-1],"dimensions":[2,12,2]}],"partPose":{"x":2,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-1],"dimensions":[2,12,2]}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-1,0,-1],"dimensions":[2,12,2]}],"partPose":{"x":-2,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.5}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4]}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eE = JSON.parse(
          '{"mesh":{"root":{"children":{"head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.25}]},"right_arm":{"cubes":[{"texCoord":{"u":40,"v":16},"origin":[-3,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-5,"y":2}},"left_leg":{"cubes":[{"mirror":true,"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":1.9,"y":12}},"left_arm":{"cubes":[{"mirror":true,"texCoord":{"u":40,"v":16},"origin":[-1,-2,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":5,"y":2}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-2,0,-2],"dimensions":[4,12,4],"grow":0.25}],"partPose":{"x":-1.9,"y":12}},"hat":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8],"grow":0.75}]},"body":{"cubes":[{"texCoord":{"u":16,"v":16},"origin":[-4,0,-2],"dimensions":[8,12,4],"grow":0.25}]}}}},"material":{"xTexSize":64,"yTexSize":32}}',
        ),
        eI = JSON.parse(
          '{"mesh":{"root":{"children":{"left_leg":{"cubes":[{"texCoord":{"u":0,"v":55},"origin":[-2,0,-2],"dimensions":[4,16,4]}],"partPose":{"x":4,"y":8}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-2,0,-2],"dimensions":[4,16,4]}],"partPose":{"x":-4,"y":8}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-6,-8],"dimensions":[16,14,16]}],"partPose":{"y":1},"children":{"right_top_bristle":{"cubes":[{"mirror":true,"texCoord":{"u":16,"v":33},"origin":[-12,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":-0.87266463,"x":-8,"y":-5,"z":-8}},"right_bottom_bristle":{"cubes":[{"mirror":true,"texCoord":{"u":16,"v":65},"origin":[-12,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":-1.2217305,"x":-8,"y":4,"z":-8}},"left_top_bristle":{"cubes":[{"texCoord":{"u":16,"v":33},"origin":[0,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":0.87266463,"x":8,"y":-6,"z":-8}},"left_bottom_bristle":{"cubes":[{"texCoord":{"u":16,"v":65},"origin":[0,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":1.2217305,"x":8,"y":3,"z":-8}},"right_middle_bristle":{"cubes":[{"mirror":true,"texCoord":{"u":16,"v":49},"origin":[-12,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":-1.134464,"x":-8,"y":-1,"z":-8}},"left_middle_bristle":{"cubes":[{"texCoord":{"u":16,"v":49},"origin":[0,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":1.134464,"x":8,"y":-2,"z":-8}}}}}}},"material":{"xTexSize":64,"yTexSize":128}}',
        ),
        eJ = JSON.parse(
          '{"mesh":{"root":{"children":{"left_leg":{"cubes":[{"texCoord":{"u":0,"v":55},"origin":[-2,0,-2],"dimensions":[4,16,4]}],"partPose":{"x":4,"y":8}},"right_leg":{"cubes":[{"texCoord":{"u":0,"v":32},"origin":[-2,0,-2],"dimensions":[4,16,4]}],"partPose":{"x":-4,"y":8}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-8,-6,-8],"dimensions":[16,14,16]}],"partPose":{"y":1},"children":{"right_top_bristle":{"cubes":[{"mirror":true,"texCoord":{"u":16,"v":33},"origin":[-12,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":-0.87266463,"x":-8,"y":-5,"z":-8}},"right_bottom_bristle":{"cubes":[{"mirror":true,"texCoord":{"u":16,"v":65},"origin":[-12,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":-1.2217305,"x":-8,"y":4,"z":-8}},"left_top_bristle":{"cubes":[{"texCoord":{"u":16,"v":33},"origin":[0,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":0.87266463,"x":8,"y":-6,"z":-8}},"left_bottom_bristle":{"cubes":[{"texCoord":{"u":16,"v":65},"origin":[0,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":1.2217305,"x":8,"y":3,"z":-8}},"right_middle_bristle":{"cubes":[{"mirror":true,"texCoord":{"u":16,"v":49},"origin":[-12,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":-1.134464,"x":-8,"y":-1,"z":-8}},"left_middle_bristle":{"cubes":[{"texCoord":{"u":16,"v":49},"origin":[0,0,0],"dimensions":[12,0,16]}],"partPose":{"zRot":1.134464,"x":8,"y":-2,"z":-8}}}}}}},"material":{"xTexSize":64,"yTexSize":128}}',
        ),
        eA = JSON.parse(
          '{"mesh":{"root":{"children":{"left_blue_fin":{"cubes":[{"texCoord":{"u":24,"v":3},"origin":[0,0,-1],"dimensions":[2,1,2]}],"partPose":{"x":4,"y":15,"z":-2}},"top_back_fin":{"cubes":[{"texCoord":{"u":23,"v":18},"origin":[-4,-1,0],"dimensions":[8,1,0]}],"partPose":{"xRot":-0.7853982,"y":14,"z":4}},"top_middle_fin":{"cubes":[{"texCoord":{"u":14,"v":16},"origin":[-4,-1,0],"dimensions":[8,1,1]}],"partPose":{"y":14}},"bottom_front_fin":{"cubes":[{"texCoord":{"u":15,"v":20},"origin":[-4,0,0],"dimensions":[8,1,0]}],"partPose":{"xRot":-0.7853982,"y":22,"z":-4}},"right_front_fin":{"cubes":[{"texCoord":{"u":5,"v":17},"origin":[-1,-8,0],"dimensions":[1,8,0]}],"partPose":{"yRot":-0.7853982,"x":-4,"y":22,"z":-4}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-8,-4],"dimensions":[8,8,8]}],"partPose":{"y":22}},"bottom_back_fin":{"cubes":[{"texCoord":{"u":15,"v":20},"origin":[-4,0,0],"dimensions":[8,1,0]}],"partPose":{"xRot":0.7853982,"y":22,"z":4}},"right_blue_fin":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-2,0,-1],"dimensions":[2,1,2]}],"partPose":{"x":-4,"y":15,"z":-2}},"left_front_fin":{"cubes":[{"texCoord":{"u":1,"v":17},"origin":[0,-8,0],"dimensions":[1,8,0]}],"partPose":{"yRot":0.7853982,"x":4,"y":22,"z":-4}},"bottom_middle_fin":{"cubes":[{"texCoord":{"u":15,"v":20},"origin":[-4,0,0],"dimensions":[8,1,0]}],"partPose":{"y":22}},"left_back_fin":{"cubes":[{"texCoord":{"u":9,"v":17},"origin":[0,-8,0],"dimensions":[1,8,0]}],"partPose":{"yRot":-0.7853982,"x":4,"y":22,"z":4}},"right_back_fin":{"cubes":[{"texCoord":{"u":9,"v":17},"origin":[-1,-8,0],"dimensions":[1,8,0]}],"partPose":{"yRot":0.7853982,"x":-4,"y":22,"z":4}},"top_front_fin":{"cubes":[{"texCoord":{"u":15,"v":17},"origin":[-4,-1,0],"dimensions":[8,1,0]}],"partPose":{"xRot":0.7853982,"y":14,"z":-4}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        eU = JSON.parse(
          '{"mesh":{"root":{"children":{"left_blue_fin":{"cubes":[{"texCoord":{"u":24,"v":3},"origin":[0,0,0],"dimensions":[2,0,2]}],"partPose":{"x":2.5,"y":17,"z":-1.5}},"top_back_fin":{"cubes":[{"texCoord":{"u":10,"v":16},"origin":[-2.5,-1,-1],"dimensions":[5,1,1]}],"partPose":{"xRot":-0.7853982,"y":17,"z":2.5}},"left_back_fin":{"cubes":[{"texCoord":{"u":4,"v":16},"origin":[0,-5,0],"dimensions":[1,5,1]}],"partPose":{"yRot":-0.7853982,"x":2.5,"y":22,"z":2.5}},"left_front_fin":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[0,-5,0],"dimensions":[1,5,1]}],"partPose":{"yRot":0.7853982,"x":2.5,"y":22,"z":-2.5}},"bottom_front_fin":{"cubes":[{"texCoord":{"u":17,"v":21},"origin":[-2.5,0,0],"dimensions":[5,1,1]}],"partPose":{"xRot":-0.7853982,"y":22,"z":-2.5}},"right_front_fin":{"cubes":[{"texCoord":{"u":8,"v":16},"origin":[-1,-5,0],"dimensions":[1,5,1]}],"partPose":{"yRot":-0.7853982,"x":-2.5,"y":22,"z":-2.5}},"right_back_fin":{"cubes":[{"texCoord":{"u":8,"v":16},"origin":[-1,-5,0],"dimensions":[1,5,1]}],"partPose":{"yRot":0.7853982,"x":-2.5,"y":22,"z":2.5}},"body":{"cubes":[{"texCoord":{"u":12,"v":22},"origin":[-2.5,-5,-2.5],"dimensions":[5,5,5]}],"partPose":{"y":22}},"top_front_fin":{"cubes":[{"texCoord":{"u":15,"v":16},"origin":[-2.5,-1,0],"dimensions":[5,1,1]}],"partPose":{"xRot":0.7853982,"y":17,"z":-2.5}},"bottom_back_fin":{"cubes":[{"texCoord":{"u":8,"v":22},"origin":[0,0,0],"dimensions":[1,1,1]}],"partPose":{"xRot":0.7853982,"x":0.5,"y":22,"z":2.5}},"right_blue_fin":{"cubes":[{"texCoord":{"u":24,"v":0},"origin":[-2,0,0],"dimensions":[2,0,2]}],"partPose":{"x":-2.5,"y":17,"z":-1.5}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        eq = JSON.parse(
          '{"mesh":{"root":{"children":{"right_eye":{"cubes":[{"texCoord":{"u":24,"v":6},"origin":[-1.5,0,-1.5],"dimensions":[1,1,1]}],"partPose":{"y":20}},"left_fin":{"cubes":[{"texCoord":{"u":25,"v":0},"origin":[0,0,0],"dimensions":[1,0,2]}],"partPose":{"x":1.5,"y":22,"z":-1.5}},"right_fin":{"cubes":[{"texCoord":{"u":25,"v":0},"origin":[-1,0,0],"dimensions":[1,0,2]}],"partPose":{"x":-1.5,"y":22,"z":-1.5}},"left_eye":{"cubes":[{"texCoord":{"u":28,"v":6},"origin":[0.5,0,-1.5],"dimensions":[1,1,1]}],"partPose":{"y":20}},"body":{"cubes":[{"texCoord":{"u":0,"v":27},"origin":[-1.5,-2,-1.5],"dimensions":[3,2,3]}],"partPose":{"y":23}},"back_fin":{"cubes":[{"texCoord":{"u":-3,"v":0},"origin":[-1.5,0,0],"dimensions":[3,0,3]}],"partPose":{"y":22,"z":1.5}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        eB = JSON.parse(
          '{"mesh":{"root":{"children":{"left_fin":{"cubes":[{"texCoord":{"u":2,"v":12},"origin":[0,0,0],"dimensions":[2,2,0]}],"partPose":{"yRot":-0.7853982,"x":1,"y":20}},"top_fin":{"cubes":[{"texCoord":{"u":20,"v":11},"origin":[0,-4,0],"dimensions":[0,4,6]}],"partPose":{"y":16,"z":-3}},"tail":{"cubes":[{"texCoord":{"u":21,"v":16},"origin":[0,-3,0],"dimensions":[0,6,5]}],"partPose":{"y":19,"z":3}},"right_fin":{"cubes":[{"texCoord":{"u":2,"v":16},"origin":[-2,0,0],"dimensions":[2,2,0]}],"partPose":{"yRot":0.7853982,"x":-1,"y":20}},"body":{"cubes":[{"texCoord":{"u":0,"v":20},"origin":[-1,-3,-3],"dimensions":[2,6,6]}],"partPose":{"y":19}},"bottom_fin":{"cubes":[{"texCoord":{"u":20,"v":21},"origin":[0,0,0],"dimensions":[0,4,6]}],"partPose":{"y":22,"z":-3}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        eD = JSON.parse(
          '{"mesh":{"root":{"children":{"left_fin":{"cubes":[{"texCoord":{"u":2,"v":12},"origin":[0,-1,0],"dimensions":[2,2,0]}],"partPose":{"yRot":-0.7853982,"x":1,"y":22.5}},"top_fin":{"cubes":[{"texCoord":{"u":10,"v":-5},"origin":[0,-3,0],"dimensions":[0,3,6]}],"partPose":{"y":20.5,"z":-3}},"tail":{"cubes":[{"texCoord":{"u":22,"v":-6},"origin":[0,-1.5,0],"dimensions":[0,3,6]}],"partPose":{"y":22,"z":3}},"right_fin":{"cubes":[{"texCoord":{"u":2,"v":16},"origin":[-2,-1,0],"dimensions":[2,2,0]}],"partPose":{"yRot":0.7853982,"x":-1,"y":22.5}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-1.5,-3],"dimensions":[2,3,6]}],"partPose":{"y":22}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        eL = JSON.parse(
          '{"mesh":{"root":{"children":{"left_fin":{"cubes":[{"texCoord":{"u":2,"v":12},"origin":[0,0,0],"dimensions":[2,2,0],"grow":0.008}],"partPose":{"yRot":-0.7853982,"x":1,"y":20}},"top_fin":{"cubes":[{"texCoord":{"u":20,"v":11},"origin":[0,-4,0],"dimensions":[0,4,6],"grow":0.008}],"partPose":{"y":16,"z":-3}},"tail":{"cubes":[{"texCoord":{"u":21,"v":16},"origin":[0,-3,0],"dimensions":[0,6,5],"grow":0.008}],"partPose":{"y":19,"z":3}},"right_fin":{"cubes":[{"texCoord":{"u":2,"v":16},"origin":[-2,0,0],"dimensions":[2,2,0],"grow":0.008}],"partPose":{"yRot":0.7853982,"x":-1,"y":20}},"body":{"cubes":[{"texCoord":{"u":0,"v":20},"origin":[-1,-3,-3],"dimensions":[2,6,6],"grow":0.008}],"partPose":{"y":19}},"bottom_fin":{"cubes":[{"texCoord":{"u":20,"v":21},"origin":[0,0,0],"dimensions":[0,4,6],"grow":0.008}],"partPose":{"y":22,"z":-3}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        eW = JSON.parse(
          '{"mesh":{"root":{"children":{"left_fin":{"cubes":[{"texCoord":{"u":2,"v":12},"origin":[0,-1,0],"dimensions":[2,2,0],"grow":0.008}],"partPose":{"yRot":-0.7853982,"x":1,"y":22.5}},"top_fin":{"cubes":[{"texCoord":{"u":10,"v":-5},"origin":[0,-3,0],"dimensions":[0,3,6],"grow":0.008}],"partPose":{"y":20.5,"z":-3}},"tail":{"cubes":[{"texCoord":{"u":22,"v":-6},"origin":[0,-1.5,0],"dimensions":[0,3,6],"grow":0.008}],"partPose":{"y":22,"z":3}},"right_fin":{"cubes":[{"texCoord":{"u":2,"v":16},"origin":[-2,-1,0],"dimensions":[2,2,0],"grow":0.008}],"partPose":{"yRot":0.7853982,"x":-1,"y":22.5}},"body":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-1,-1.5,-3],"dimensions":[2,3,6],"grow":0.008}],"partPose":{"y":22}}}}},"material":{"xTexSize":32,"yTexSize":32}}',
        ),
        eY = JSON.parse(
          '{"mesh":{"root":{"children":{"shoulders":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-10,3.9,-0.5],"dimensions":[20,3,3]}]},"ribcage":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[0,0,0],"dimensions":[3,10,3]},{"texCoord":{"u":24,"v":22},"origin":[-4,1.5,0.5],"dimensions":[11,2,2]},{"texCoord":{"u":24,"v":22},"origin":[-4,4,0.5],"dimensions":[11,2,2]},{"texCoord":{"u":24,"v":22},"origin":[-4,6.5,0.5],"dimensions":[11,2,2]}],"partPose":{"xRot":0.20420352,"x":-2,"y":6.9,"z":-0.5}},"tail":{"cubes":[{"texCoord":{"u":12,"v":22},"origin":[0,0,0],"dimensions":[3,6,3]}],"partPose":{"xRot":0.83252203,"x":-2,"y":16.692408,"z":1.5270092}},"left_head":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-4,-4],"dimensions":[6,6,6]}],"partPose":{"x":10,"y":4}},"right_head":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-4,-4],"dimensions":[6,6,6]}],"partPose":{"x":-8,"y":4}},"center_head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-4,-4],"dimensions":[8,8,8]}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        ),
        eK = JSON.parse(
          '{"mesh":{"root":{"children":{"shoulders":{"cubes":[{"texCoord":{"u":0,"v":16},"origin":[-10,3.9,-0.5],"dimensions":[20,3,3],"grow":0.5}]},"ribcage":{"cubes":[{"texCoord":{"u":0,"v":22},"origin":[0,0,0],"dimensions":[3,10,3],"grow":0.5},{"texCoord":{"u":24,"v":22},"origin":[-4,1.5,0.5],"dimensions":[11,2,2],"grow":0.5},{"texCoord":{"u":24,"v":22},"origin":[-4,4,0.5],"dimensions":[11,2,2],"grow":0.5},{"texCoord":{"u":24,"v":22},"origin":[-4,6.5,0.5],"dimensions":[11,2,2],"grow":0.5}],"partPose":{"xRot":0.20420352,"x":-2,"y":6.9,"z":-0.5}},"tail":{"cubes":[{"texCoord":{"u":12,"v":22},"origin":[0,0,0],"dimensions":[3,6,3],"grow":0.5}],"partPose":{"xRot":0.83252203,"x":-2,"y":16.692408,"z":1.5270092}},"left_head":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-4,-4],"dimensions":[6,6,6],"grow":0.5}],"partPose":{"x":10,"y":4}},"right_head":{"cubes":[{"texCoord":{"u":32,"v":0},"origin":[-4,-4,-4],"dimensions":[6,6,6],"grow":0.5}],"partPose":{"x":-8,"y":4}},"center_head":{"cubes":[{"texCoord":{"u":0,"v":0},"origin":[-4,-4,-4],"dimensions":[8,8,8],"grow":0.5}]}}}},"material":{"xTexSize":64,"yTexSize":64}}',
        );
      function eG(e, o) {
        return { ...e, anchorMaxY: (0, t.p)(o) };
      }
      let eV = oN(et),
        eH = oN(er),
        e$ = oF(en),
        eZ = oF(es),
        eX = eG(eu, el),
        eQ = eG(em, ec),
        e0 = ok(ep),
        e1 = eG(eC, ev),
        e2 = oS(eP, new Set(["stinger"])),
        e4 = eG(eT, ej),
        e5 = eG(eM, eR),
        e6 = eG(eN, eO),
        e3 = eG(eE, eF),
        e8 = eG(eJ, eI),
        e9 = eG(eK, eY),
        e7 = [eq, eU, eA],
        oe = { small: eD, large: eB, smallPattern: eW, largePattern: eL },
        oo = new Set([
          "minecraft:minecart",
          "minecraft:chest_minecart",
          "minecraft:hopper_minecart",
          "minecraft:tnt_minecart",
          "minecraft:furnace_minecart",
          "minecraft:command_block_minecart",
          "minecraft:spawner_minecart",
        ]),
        oi = [
          "acacia",
          "birch",
          "cherry",
          "dark_oak",
          "jungle",
          "mangrove",
          "oak",
          "pale_oak",
          "spruce",
        ],
        ot = new Set(oi),
        or = new Set(oi.map((e) => "minecraft:".concat(e, "_boat"))),
        on = new Set(oi.map((e) => "minecraft:".concat(e, "_chest_boat"))),
        os = ["stone", "iron", "gold", "emerald", "diamond"],
        oa = {
          white: "#F9FFFE",
          orange: "#F9801D",
          magenta: "#C74EBD",
          light_blue: "#3AB3DA",
          yellow: "#FED83D",
          lime: "#80C71F",
          pink: "#F38BAA",
          gray: "#474F52",
          light_gray: "#9D9D97",
          cyan: "#169C9C",
          purple: "#8932B8",
          blue: "#3C44AA",
          brown: "#835432",
          green: "#5E7C16",
          red: "#B02E26",
          black: "#1D1D21",
        },
        od = r.bG.map((e) => "minecraft:entity/horse/horse_".concat(e)),
        ol = r.XK.filter((e) => "none" !== e).map((e) =>
          "minecraft:entity/horse/horse_markings_".concat(e),
        ),
        ou = r.cV.map((e) => "minecraft:entity/rabbit/rabbit_".concat(e)),
        oc = r.uj.map((e) =>
          "normal" === e
            ? "minecraft:entity/panda/panda"
            : "minecraft:entity/panda/panda_".concat(e),
        ),
        om = r.t7.map((e) => "minecraft:entity/axolotl/axolotl_".concat(e)),
        ox = r.Th.map((e) => "minecraft:entity/llama/llama_".concat(e)),
        og = [
          ...Object.keys(oa).map((e) => "minecraft:entity/equipment/llama_body/".concat(e)),
          "minecraft:entity/equipment/llama_body/trader_llama",
        ],
        op = r.kd.map((e) => "minecraft:entity/parrot/parrot_".concat(e)),
        oh = r.mL.map((e) => "minecraft:entity/frog/frog_".concat(e)),
        of = r.dG.map((e) => "minecraft:entity/cow/mooshroom_".concat(e)),
        ob = [
          "minecraft:entity/shulker/shulker",
          ...Object.keys(oa).map((e) => "minecraft:entity/shulker/shulker_".concat(e)),
        ],
        oy = [
          "minecraft:entity/fish/tropical_a",
          "minecraft:entity/fish/tropical_b",
          ...[1, 2, 3, 4, 5, 6].flatMap((e) => [
            "minecraft:entity/fish/tropical_a_pattern_".concat(e),
            "minecraft:entity/fish/tropical_b_pattern_".concat(e),
          ]),
        ];
      function ov(e) {
        let o = "minecraft:entity/".concat(e ? "zombie_villager" : "villager");
        return [
          "".concat(o, "/").concat(e ? "zombie_villager" : "villager"),
          ...r.Bk.map((e) => "".concat(o, "/type/").concat(e)),
          ...r.hn.filter((e) => "none" !== e).map((e) => "".concat(o, "/profession/").concat(e)),
          ...os.map((e) => "".concat(o, "/profession_level/").concat(e)),
        ];
      }
      let o_ = ov(!1),
        oC = ov(!0),
        oP = r.oY.map((e) => "minecraft:entity/cat/cat_".concat(e));
      function oz(e, o) {
        var i, t, r, n, s;
        let a = "minecraft:entity/".concat(o ? "zombie_villager" : "villager"),
          d = null != (n = null == (i = e.villager) ? void 0 : i.type) ? n : "plains",
          l = null != (s = null == (t = e.villager) ? void 0 : t.profession) ? s : "none",
          u = null == (r = e.villager) ? void 0 : r.level,
          c =
            "number" == typeof u && Number.isFinite(u)
              ? Math.max(1, Math.min(5, Math.trunc(u)))
              : 1,
          m = [
            "".concat(a, "/").concat(o ? "zombie_villager" : "villager"),
            "".concat(a, "/type/").concat(d),
          ];
        return (
          "none" === l ||
            (m.push("".concat(a, "/profession/").concat(l)),
            "nitwit" !== l && m.push("".concat(a, "/profession_level/").concat(os[c - 1]))),
          m
        );
      }
      function ok(e) {
        var o;
        let i = { ...(null != (o = e.mesh.root.children) ? o : {}) };
        for (let e of Object.keys(i)) e.endsWith("_baby_leg") && delete i[e];
        return { ...e, mesh: { root: { ...e.mesh.root, children: i } } };
      }
      function ow(e) {
        var o, i;
        return "minecraft:entity/horse/horse_".concat(
          null != (i = null == (o = e.horse) ? void 0 : o.color) ? i : "white",
        );
      }
      function oS(e, o) {
        let i = (e) => {
          var t;
          let r = Object.fromEntries(
            Object.entries(null != (t = e.children) ? t : {})
              .filter((e) => {
                let [i] = e;
                return !o.has(i);
              })
              .map((e) => {
                let [o, t] = e;
                return [o, i(t)];
              }),
          );
          return { ...e, ...(e.children ? { children: r } : {}) };
        };
        return { ...e, mesh: { root: i(e.mesh.root) } };
      }
      function oj(e, o) {
        return o ? e : oS(e, new Set(["left_chest", "right_chest"]));
      }
      function oT(e) {
        var o;
        return oj(
          "minecraft:trader_llama" === e.entityId ? e_ : ev,
          !!(null == (o = e.llama) ? void 0 : o.chested),
        );
      }
      function oR(e) {
        var o, i;
        return "minecraft:entity/llama/llama_".concat(
          null != (i = null == (o = e.llama) ? void 0 : o.variant) ? i : "creamy",
        );
      }
      function oM(e) {
        var o, i;
        let t =
          "minecraft:trader_llama" === e.entityId
            ? "trader_llama"
            : null == (o = e.llama)
              ? void 0
              : o.decorColor;
        return t
          ? [
              {
                model: oj(e1, !!(null == (i = e.llama) ? void 0 : i.chested)),
                texture: "minecraft:entity/equipment/llama_body/".concat(t),
              },
            ]
          : [];
      }
      function oO(e) {
        var o, i;
        let t = r.TI.indexOf(
          null != (i = null == (o = e.tropicalFish) ? void 0 : o.variant) ? i : "kob",
        );
        return t >= 0 ? t : 0;
      }
      function oN(e) {
        var o;
        let i = { ...(null != (o = e.mesh.root.children) ? o : {}) };
        return (delete i.water_patch, { ...e, mesh: { root: { ...e.mesh.root, children: i } } });
      }
      function oF(e) {
        var o;
        let i = { ...(null != (o = e.mesh.root.children) ? o : {}) };
        for (let e of ["left_arm", "right_arm"]) {
          let o = i[e];
          o && (i[e] = { ...o, partPose: { ...o.partPose, xRot: -Math.PI / 2 } });
        }
        return { ...e, mesh: { root: { ...e.mesh.root, children: i } } };
      }
      function oE(e) {
        var o, i;
        let t =
            null == (i = e.boat) || null == (o = i.woodType)
              ? void 0
              : o
                  .trim()
                  .toLowerCase()
                  .replace(/^minecraft:/, ""),
          r = e.entityId
            .replace(/^minecraft:/, "")
            .replace(/_chest_boat$/, "")
            .replace(/_boat$/, ""),
          n = t || r;
        return ot.has(n) ? n : null;
      }
      function oI(e, o) {
        var i;
        let t = null != (i = oE(e)) ? i : "oak";
        return "minecraft:entity/".concat(o ? "chest_boat" : "boat", "/").concat(t);
      }
      let oJ = { anchorMaxY: 24, anchorFixed: !0 };
      function oA(e, o) {
        var i;
        let t = { ...(null != (i = X.mesh.root.children) ? i : {}) };
        return (
          delete t.hat,
          e || (delete t.left_arm, delete t.right_arm),
          o && delete t.base_plate,
          { ...X, ...oJ, mesh: { root: { ...X.mesh.root, children: t } } }
        );
      }
      let oU = {
          arms_plate: oA(!0, !1),
          arms_no_plate: oA(!0, !0),
          no_arms_plate: oA(!1, !1),
          no_arms_no_plate: oA(!1, !0),
        },
        oq = { head: "helmet", chest: "chestplate", legs: "leggings", feet: "boots" },
        oB = {
          chainmail: "chainmail",
          copper: "copper",
          diamond: "diamond",
          golden: "gold",
          iron: "iron",
          leather: "leather",
          netherite: "netherite",
        };
      function oD(e, o) {
        var i;
        let t = Object.fromEntries(
          Object.entries(null != (i = e.mesh.root.children) ? i : {}).filter((e) => {
            let [i] = e;
            return o.has(i);
          }),
        );
        return { ...e, ...oJ, mesh: { root: { ...e.mesh.root, children: t } } };
      }
      function oL(e, o) {
        let i = (e) => ({
          ...e,
          ...(e.cubes
            ? {
                cubes: e.cubes.map((e) => {
                  var i;
                  return { ...e, grow: (null != (i = e.grow) ? i : 0) + o };
                }),
              }
            : {}),
          ...(e.children
            ? {
                children: Object.fromEntries(
                  Object.entries(e.children).map((e) => {
                    let [o, t] = e;
                    return [o, i(t)];
                  }),
                ),
              }
            : {}),
        });
        return { ...e, mesh: { root: i(e.mesh.root) } };
      }
      let oW = {
          head: oD(Q, new Set(["head", "hat"])),
          chest: oD(Q, new Set(["body", "left_arm", "right_arm"])),
          legs: oD(ee, new Set(["body", "left_leg", "right_leg"])),
          feet: oD(Q, new Set(["left_leg", "right_leg"])),
        },
        oY = {
          head: oL(oW.head, 0.02),
          chest: oL(oW.chest, 0.02),
          legs: oL(oW.legs, 0.02),
          feet: oL(oW.feet, 0.02),
        };
      function oK(e, o) {
        var i;
        let t = e
          .trim()
          .toLowerCase()
          .replace(/^minecraft:/, "");
        if ("head" === o && "turtle_helmet" === t) return "turtle_scute";
        let r = oq[o];
        return t.endsWith("_".concat(r)) && null != (i = oB[t.slice(0, -(r.length + 1))])
          ? i
          : null;
      }
      function oG(e, o) {
        return null !== oK(e, o);
      }
      let oV = Object.fromEntries(
          Object.entries(H).map((e) => {
            let [o, i] = e;
            return [
              o,
              {
                model: i.adultHorseFamily ? ok(i.model) : i.model,
                texture: i.texture,
                modelFiles: [i.modelFile],
                textureKeys: [i.texture],
              },
            ];
          }),
        ),
        oH = {
          "minecraft:villager": {
            model: $,
            texture: "minecraft:entity/villager/villager",
            textureLayers: (e) => oz(e, !1),
            modelFiles: ["villager.json"],
            textureKeys: o_,
          },
          "minecraft:cow": {
            model: Z,
            texture: "minecraft:entity/cow/cow_temperate",
            modelFiles: ["cow.json"],
            textureKeys: ["minecraft:entity/cow/cow_temperate"],
          },
          "minecraft:zombie": {
            model: e$,
            texture: "minecraft:entity/zombie/zombie",
            modelFiles: ["zombie.json"],
            textureKeys: ["minecraft:entity/zombie/zombie"],
          },
          "minecraft:zombie_villager": {
            model: eZ,
            texture: "minecraft:entity/zombie_villager/zombie_villager",
            textureLayers: (e) => oz(e, !0),
            modelFiles: ["zombie_villager.json"],
            textureKeys: oC,
          },
          "minecraft:iron_golem": {
            model: ea,
            texture: "minecraft:entity/iron_golem/iron_golem",
            modelFiles: ["iron_golem.json"],
            textureKeys: ["minecraft:entity/iron_golem/iron_golem"],
          },
          "minecraft:cat": {
            model: ed,
            texture: function (e) {
              var o, i;
              let t = null != (i = null == (o = e.cat) ? void 0 : o.variant) ? i : "tabby";
              return "minecraft:entity/cat/cat_".concat(t);
            },
            modelFiles: ["cat.json"],
            textureKeys: oP,
          },
          "minecraft:pig": {
            model: el,
            texture: "minecraft:entity/pig/pig_temperate",
            overlays: function (e) {
              var o;
              return (null == (o = e.pig) ? void 0 : o.saddled)
                ? [{ model: eX, texture: "minecraft:entity/equipment/pig_saddle/saddle" }]
                : [];
            },
            modelFiles: ["pig.json", "pig_saddle.json"],
            textureKeys: [
              "minecraft:entity/pig/pig_temperate",
              "minecraft:entity/equipment/pig_saddle/saddle",
            ],
          },
          "minecraft:sheep": {
            model: ec,
            texture: "minecraft:entity/sheep/sheep",
            overlays: function (e) {
              var o, i;
              return [
                {
                  model: eQ,
                  texture: "minecraft:entity/sheep/sheep_wool",
                  color: oa[null != (i = null == (o = e.sheep) ? void 0 : o.color) ? i : "white"],
                },
              ];
            },
            modelFiles: ["sheep.json", "sheep_fur.json"],
            textureKeys: ["minecraft:entity/sheep/sheep", "minecraft:entity/sheep/sheep_wool"],
          },
          "minecraft:chicken": {
            model: ex,
            texture: "minecraft:entity/chicken/chicken_temperate",
            modelFiles: ["chicken.json"],
            textureKeys: ["minecraft:entity/chicken/chicken_temperate"],
          },
          "minecraft:wolf": {
            model: eg,
            texture: function (e) {
              var o, i;
              return (null == (o = e.wolf) ? void 0 : o.angry)
                ? "minecraft:entity/wolf/wolf_angry"
                : (null == (i = e.wolf) ? void 0 : i.tamed)
                  ? "minecraft:entity/wolf/wolf_tame"
                  : "minecraft:entity/wolf/wolf";
            },
            overlays: function (e) {
              var o, i;
              return (null == (o = e.wolf) ? void 0 : o.tamed)
                ? [
                    {
                      model: eg,
                      texture: "minecraft:entity/wolf/wolf_collar",
                      color: oa[null != (i = e.wolf.collarColor) ? i : "red"],
                    },
                  ]
                : [];
            },
            modelFiles: ["wolf.json"],
            textureKeys: [
              "minecraft:entity/wolf/wolf",
              "minecraft:entity/wolf/wolf_angry",
              "minecraft:entity/wolf/wolf_tame",
              "minecraft:entity/wolf/wolf_collar",
            ],
          },
          "minecraft:horse": {
            model: e0,
            texture: ow,
            textureLayers: function (e) {
              var o, i;
              let t = ow(e),
                r = null != (i = null == (o = e.horse) ? void 0 : o.marking) ? i : "none";
              return "none" === r ? [t] : [t, "minecraft:entity/horse/horse_markings_".concat(r)];
            },
            modelFiles: ["horse.json"],
            textureKeys: [...od, ...ol],
          },
          "minecraft:rabbit": {
            model: eh,
            texture: function (e) {
              var o, i;
              return "minecraft:entity/rabbit/rabbit_".concat(
                null != (i = null == (o = e.rabbit) ? void 0 : o.variant) ? i : "brown",
              );
            },
            modelFiles: ["rabbit.json"],
            textureKeys: ou,
          },
          "minecraft:fox": {
            model: ef,
            texture: function (e) {
              var o;
              return (null == (o = e.fox) ? void 0 : o.type) === "snow"
                ? "minecraft:entity/fox/fox_snow"
                : "minecraft:entity/fox/fox";
            },
            modelFiles: ["fox.json"],
            textureKeys: r.sj.map((e) =>
              "snow" === e ? "minecraft:entity/fox/fox_snow" : "minecraft:entity/fox/fox",
            ),
          },
          ...oV,
          "minecraft:panda": {
            model: eb,
            texture: function (e) {
              var o, i;
              let t = null != (i = null == (o = e.panda) ? void 0 : o.gene) ? i : "normal";
              return "normal" === t
                ? "minecraft:entity/panda/panda"
                : "minecraft:entity/panda/panda_".concat(t);
            },
            modelFiles: ["panda.json"],
            textureKeys: oc,
          },
          "minecraft:axolotl": {
            model: ey,
            texture: function (e) {
              var o, i;
              return "minecraft:entity/axolotl/axolotl_".concat(
                null != (i = null == (o = e.axolotl) ? void 0 : o.variant) ? i : "lucy",
              );
            },
            modelFiles: ["axolotl.json"],
            textureKeys: om,
          },
          "minecraft:llama": {
            model: oT,
            texture: oR,
            overlays: oM,
            modelFiles: ["llama.json", "llama_decor.json"],
            textureKeys: [...ox, ...og],
          },
          "minecraft:trader_llama": {
            model: oT,
            texture: oR,
            overlays: oM,
            modelFiles: ["trader_llama.json", "llama_decor.json"],
            textureKeys: [...ox, ...og],
          },
          "minecraft:bee": {
            model: function (e) {
              var o;
              return (null == (o = e.bee) ? void 0 : o.hasStung) ? e2 : eP;
            },
            texture: function (e) {
              var o, i;
              let t = (null == (o = e.bee) ? void 0 : o.angry) ? "bee_angry" : "bee";
              return "minecraft:entity/bee/"
                .concat(t)
                .concat((null == (i = e.bee) ? void 0 : i.hasNectar) ? "_nectar" : "");
            },
            modelFiles: ["bee.json"],
            textureKeys: [
              "minecraft:entity/bee/bee",
              "minecraft:entity/bee/bee_angry",
              "minecraft:entity/bee/bee_nectar",
              "minecraft:entity/bee/bee_angry_nectar",
            ],
          },
          "minecraft:parrot": {
            model: ez,
            texture: function (e) {
              var o, i;
              return "minecraft:entity/parrot/parrot_".concat(
                null != (i = null == (o = e.parrot) ? void 0 : o.variant) ? i : "red_blue",
              );
            },
            modelFiles: ["parrot.json"],
            textureKeys: op,
          },
          "minecraft:frog": {
            model: ek,
            texture: function (e) {
              var o, i;
              return "minecraft:entity/frog/frog_".concat(
                null != (i = null == (o = e.frog) ? void 0 : o.variant) ? i : "temperate",
              );
            },
            modelFiles: ["frog.json"],
            textureKeys: oh,
          },
          "minecraft:mooshroom": {
            model: ew,
            texture: function (e) {
              var o, i;
              return "minecraft:entity/cow/mooshroom_".concat(
                null != (i = null == (o = e.mooshroom) ? void 0 : o.variant) ? i : "red",
              );
            },
            modelFiles: ["mooshroom.json"],
            textureKeys: of,
          },
          "minecraft:shulker": {
            model: eS,
            texture: function (e) {
              var o;
              let i = null == (o = e.shulker) ? void 0 : o.color;
              return i
                ? "minecraft:entity/shulker/shulker_".concat(i)
                : "minecraft:entity/shulker/shulker";
            },
            modelFiles: ["shulker.json"],
            textureKeys: ob,
          },
          "minecraft:creeper": {
            model: ej,
            texture: "minecraft:entity/creeper/creeper",
            overlays: function (e) {
              var o;
              return (null == (o = e.creeper) ? void 0 : o.charged)
                ? [{ model: e4, texture: "minecraft:entity/creeper/creeper_armor" }]
                : [];
            },
            modelFiles: ["creeper.json", "creeper_armor.json"],
            textureKeys: [
              "minecraft:entity/creeper/creeper",
              "minecraft:entity/creeper/creeper_armor",
            ],
          },
          "minecraft:drowned": {
            model: eR,
            texture: "minecraft:entity/zombie/drowned",
            overlays: () => [{ model: e5, texture: "minecraft:entity/zombie/drowned_outer_layer" }],
            modelFiles: ["drowned.json", "drowned_outer.json"],
            textureKeys: [
              "minecraft:entity/zombie/drowned",
              "minecraft:entity/zombie/drowned_outer_layer",
            ],
          },
          "minecraft:slime": {
            model: eO,
            texture: "minecraft:entity/slime/slime",
            overlays: () => [{ model: e6, texture: "minecraft:entity/slime/slime" }],
            modelFiles: ["slime.json", "slime_outer.json"],
            textureKeys: ["minecraft:entity/slime/slime"],
          },
          "minecraft:stray": {
            model: eF,
            texture: "minecraft:entity/skeleton/stray",
            overlays: () => [{ model: e3, texture: "minecraft:entity/skeleton/stray_overlay" }],
            modelFiles: ["stray.json", "stray_outer.json"],
            textureKeys: [
              "minecraft:entity/skeleton/stray",
              "minecraft:entity/skeleton/stray_overlay",
            ],
          },
          "minecraft:strider": {
            model: eI,
            texture: function (e) {
              var o;
              return (null == (o = e.strider) ? void 0 : o.cold)
                ? "minecraft:entity/strider/strider_cold"
                : "minecraft:entity/strider/strider";
            },
            overlays: function (e) {
              var o;
              return (null == (o = e.strider) ? void 0 : o.saddled)
                ? [{ model: e8, texture: "minecraft:entity/equipment/strider_saddle/saddle" }]
                : [];
            },
            modelFiles: ["strider.json", "strider_saddle.json"],
            textureKeys: [
              "minecraft:entity/strider/strider",
              "minecraft:entity/strider/strider_cold",
              "minecraft:entity/equipment/strider_saddle/saddle",
            ],
          },
          "minecraft:wither": {
            model: eY,
            texture: function (e) {
              var o;
              return (null == (o = e.wither) ? void 0 : o.invulnerable)
                ? "minecraft:entity/wither/wither_invulnerable"
                : "minecraft:entity/wither/wither";
            },
            overlays: function (e) {
              var o;
              return (null == (o = e.wither) ? void 0 : o.invulnerable)
                ? [{ model: e9, texture: "minecraft:entity/wither/wither_armor" }]
                : [];
            },
            modelFiles: ["wither.json", "wither_armor.json"],
            textureKeys: [
              "minecraft:entity/wither/wither",
              "minecraft:entity/wither/wither_invulnerable",
              "minecraft:entity/wither/wither_armor",
            ],
          },
          "minecraft:pufferfish": {
            model: function (e) {
              var o, i, t;
              return null !=
                (t = e7[null != (i = null == (o = e.pufferfish) ? void 0 : o.puffState) ? i : 0])
                ? t
                : e7[0];
            },
            texture: "minecraft:entity/fish/pufferfish",
            modelFiles: ["pufferfish_small.json", "pufferfish_medium.json", "pufferfish_big.json"],
            textureKeys: ["minecraft:entity/fish/pufferfish"],
          },
          "minecraft:tropical_fish": {
            model: function (e) {
              return 6 > oO(e) ? oe.small : oe.large;
            },
            texture: function (e) {
              return 6 > oO(e)
                ? "minecraft:entity/fish/tropical_a"
                : "minecraft:entity/fish/tropical_b";
            },
            color: function (e) {
              var o, i;
              return oa[
                null != (i = null == (o = e.tropicalFish) ? void 0 : o.baseColor) ? i : "white"
              ];
            },
            overlays: function (e) {
              var o, i;
              let t = oO(e),
                r = t >= 6;
              return [
                {
                  model: r ? oe.largePattern : oe.smallPattern,
                  texture: "minecraft:entity/fish/tropical_"
                    .concat(r ? "b" : "a", "_pattern_")
                    .concat((t % 6) + 1),
                  color:
                    oa[
                      null != (i = null == (o = e.tropicalFish) ? void 0 : o.patternColor)
                        ? i
                        : "black"
                    ],
                },
              ];
            },
            modelFiles: [
              "tropical_fish_small.json",
              "tropical_fish_large.json",
              "tropical_fish_small_pattern.json",
              "tropical_fish_large_pattern.json",
            ],
            textureKeys: oy,
          },
          "minecraft:armor_stand": {
            model: function (e) {
              let o = e.armorStand,
                i = null == o ? void 0 : o.equipment;
              return (null == o ? void 0 : o.showArms) ||
                (null == i ? void 0 : i.mainHand) ||
                (null == i ? void 0 : i.offHand)
                ? (null == o ? void 0 : o.noBasePlate)
                  ? oU.arms_no_plate
                  : oU.arms_plate
                : (null == o ? void 0 : o.noBasePlate)
                  ? oU.no_arms_no_plate
                  : oU.no_arms_plate;
            },
            texture: "minecraft:entity/armorstand/armorstand",
            overlays: function (e) {
              var o;
              let i = null == (o = e.armorStand) ? void 0 : o.equipment;
              if (!i) return [];
              let t = [];
              for (let e of ["head", "chest", "legs", "feet"]) {
                let o = i[e];
                if (!o) continue;
                let r = oK(o, e);
                if (!r) continue;
                let n =
                  "legs" === e
                    ? "minecraft:entity/equipment/humanoid_leggings"
                    : "minecraft:entity/equipment/humanoid";
                (t.push({
                  model: oW[e],
                  texture: "".concat(n, "/").concat(r),
                  ...("leather" === r ? { color: "#A06540" } : {}),
                }),
                  "leather" === r &&
                    t.push({ model: oY[e], texture: "".concat(n, "/leather_overlay") }));
              }
              return t;
            },
            modelFiles: [
              "armor_stand.json",
              "armor_stand_outer_armor.json",
              "armor_stand_inner_armor.json",
            ],
            textureKeys: [
              "minecraft:entity/armorstand/armorstand",
              "minecraft:entity/equipment/humanoid/chainmail",
              "minecraft:entity/equipment/humanoid/copper",
              "minecraft:entity/equipment/humanoid/diamond",
              "minecraft:entity/equipment/humanoid/gold",
              "minecraft:entity/equipment/humanoid/iron",
              "minecraft:entity/equipment/humanoid/leather",
              "minecraft:entity/equipment/humanoid/leather_overlay",
              "minecraft:entity/equipment/humanoid/netherite",
              "minecraft:entity/equipment/humanoid/turtle_scute",
              "minecraft:entity/equipment/humanoid_leggings/chainmail",
              "minecraft:entity/equipment/humanoid_leggings/copper",
              "minecraft:entity/equipment/humanoid_leggings/diamond",
              "minecraft:entity/equipment/humanoid_leggings/gold",
              "minecraft:entity/equipment/humanoid_leggings/iron",
              "minecraft:entity/equipment/humanoid_leggings/leather",
              "minecraft:entity/equipment/humanoid_leggings/leather_overlay",
              "minecraft:entity/equipment/humanoid_leggings/netherite",
            ],
          },
          "minecraft:minecart": {
            model: eo,
            texture: "minecraft:entity/minecart/minecart",
            modelFiles: ["minecart.json"],
            textureKeys: ["minecraft:entity/minecart/minecart"],
          },
          "minecraft:leash_knot": {
            model: ei,
            texture: "minecraft:entity/lead_knot/lead_knot",
            modelFiles: ["lead_knot.json"],
            textureKeys: ["minecraft:entity/lead_knot/lead_knot"],
          },
          "minecraft:oak_boat": {
            model: eV,
            texture: (e) => oI(e, !1),
            modelFiles: ["boat.json"],
            textureKeys: [
              "minecraft:entity/boat/acacia",
              "minecraft:entity/boat/birch",
              "minecraft:entity/boat/cherry",
              "minecraft:entity/boat/dark_oak",
              "minecraft:entity/boat/jungle",
              "minecraft:entity/boat/mangrove",
              "minecraft:entity/boat/oak",
              "minecraft:entity/boat/pale_oak",
              "minecraft:entity/boat/spruce",
            ],
          },
          "minecraft:oak_chest_boat": {
            model: eH,
            texture: (e) => oI(e, !0),
            modelFiles: ["chest_boat.json"],
            textureKeys: [
              "minecraft:entity/chest_boat/acacia",
              "minecraft:entity/chest_boat/birch",
              "minecraft:entity/chest_boat/cherry",
              "minecraft:entity/chest_boat/dark_oak",
              "minecraft:entity/chest_boat/jungle",
              "minecraft:entity/chest_boat/mangrove",
              "minecraft:entity/chest_boat/oak",
              "minecraft:entity/chest_boat/pale_oak",
              "minecraft:entity/chest_boat/spruce",
            ],
          },
        };
      function o$(e) {
        var o, i, t, r, n;
        if ("boat" === e.kind && ((null == (o = e.boat) ? void 0 : o.raft) || !oE(e))) return null;
        let s =
          null !=
          (n =
            null !=
            (r =
              null != (t = oH[(i = e.entityId)]) ? t : oo.has(i) ? oH["minecraft:minecart"] : null)
              ? r
              : or.has(i)
                ? oH["minecraft:oak_boat"]
                : null)
            ? n
            : on.has(i)
              ? oH["minecraft:oak_chest_boat"]
              : null;
        return s
          ? {
              model: "function" == typeof s.model ? s.model(e) : s.model,
              texture: "function" == typeof s.texture ? s.texture(e) : s.texture,
              ...(s.color ? { color: "function" == typeof s.color ? s.color(e) : s.color } : {}),
              ...(s.textureLayers ? { textureLayers: s.textureLayers(e) } : {}),
              ...(s.overlays ? { overlays: s.overlays(e) } : {}),
            }
          : null;
      }
      function oZ() {
        return Object.keys(oH).sort();
      }
      let oX = {
          head: "head",
          body: "body",
          leftArm: "left_arm",
          rightArm: "right_arm",
          leftLeg: "left_leg",
          rightLeg: "right_leg",
        },
        oQ = {
          head: [0, 0, 0],
          body: [0, 0, 0],
          leftArm: [-10, 0, -10],
          rightArm: [-15, 0, 10],
          leftLeg: [-1, 0, -1],
          rightLeg: [1, 0, 1],
        };
      function o0(e) {
        var o;
        let i = null == (o = e.armorStand) ? void 0 : o.pose,
          t = { ...oQ };
        for (let e of Object.keys(t)) {
          let o = null == i ? void 0 : i[e];
          o && (t[e] = o);
        }
        return t;
      }
      let o1 = {
        left_body_stick: "body",
        right_body_stick: "body",
        shoulder_stick: "body",
        hat: "head",
      };
      function o2(e) {
        var o, i;
        let t = o0(e),
          r = (e) => e.map((e) => (e * Math.PI) / 180),
          n = {};
        for (let [e, o] of Object.entries(oX)) n[o] = r(t[e]);
        for (let [e, o] of Object.entries(o1)) n[e] = r(t[o]);
        return (
          (n.base_plate = r([
            0,
            -(null != (i = null == (o = e.rotation) ? void 0 : o[0]) ? i : 0),
            0,
          ])),
          n
        );
      }
    },
  },
]);

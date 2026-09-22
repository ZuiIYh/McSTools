"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5535],
  {
    38381: (e, t, o) => {
      o.d(t, { mK: () => _, s0: () => P, Rc: () => S, fE: () => j });
      var r = o(95155),
        n = o(12115),
        i = o(85339),
        a = o(59040),
        l = o(13303);
      function s(e, t, o) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = o),
          e
        );
      }
      (new i.I9Y(), new i.I9Y());
      function f(e, t) {
        if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
      }
      var c = function e(t, o, r) {
          var n = this;
          (f(this, e),
            s(this, "dot2", function (e, t) {
              return n.x * e + n.y * t;
            }),
            s(this, "dot3", function (e, t, o) {
              return n.x * e + n.y * t + n.z * o;
            }),
            (this.x = t),
            (this.y = o),
            (this.z = r));
        },
        u = [
          new c(1, 1, 0),
          new c(-1, 1, 0),
          new c(1, -1, 0),
          new c(-1, -1, 0),
          new c(1, 0, 1),
          new c(-1, 0, 1),
          new c(1, 0, -1),
          new c(-1, 0, -1),
          new c(0, 1, 1),
          new c(0, -1, 1),
          new c(0, 1, -1),
          new c(0, -1, -1),
        ],
        d = [
          151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
          69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94,
          252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171,
          168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
          60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
          1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159,
          86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147,
          118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183,
          170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129,
          22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
          251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239,
          107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4,
          150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
          61, 156, 180,
        ],
        m = Array(512),
        p = Array(512);
      !(function (e) {
        (e > 0 && e < 1 && (e *= 65536), (e = Math.floor(e)) < 256 && (e |= e << 8));
        for (var t, o = 0; o < 256; o++)
          ((t = 1 & o ? d[o] ^ (255 & e) : d[o] ^ ((e >> 8) & 255)),
            (m[o] = m[o + 256] = t),
            (p[o] = p[o + 256] = u[t % 12]));
      })(0);
      function h(e) {
        var t = (function (e) {
          if ("number" == typeof e) e = Math.abs(e);
          else if ("string" == typeof e) {
            var t = e;
            e = 0;
            for (var o = 0; o < t.length; o++)
              e = (e + (o + 1) * (t.charCodeAt(o) % 96)) % 0x7fffffff;
          }
          return (0 === e && (e = 311), e);
        })(e);
        return function () {
          var e = (48271 * t) % 0x7fffffff;
          return ((t = e), e / 0x7fffffff);
        };
      }
      new (function e(t) {
        var o = this;
        (f(this, e),
          s(this, "seed", 0),
          s(this, "init", function (e) {
            ((o.seed = e), (o.value = h(e)));
          }),
          s(this, "value", h(this.seed)),
          this.init(t));
      })(Math.random());
      i.LoY;
      o(81948);
      let g = (0, n.createContext)(null),
        v = (0, n.createContext)(null),
        w = (e) => (2 & e.getAttributes()) == 2,
        P = (0, n.memo)(
          (0, n.forwardRef)(
            (
              {
                children: e,
                camera: t,
                scene: o,
                resolutionScale: s,
                enabled: f = !0,
                renderPriority: c = 1,
                autoClear: u = !0,
                depthBuffer: d,
                enableNormalPass: m,
                stencilBuffer: p,
                multisampling: h = 8,
                frameBufferType: g = i.ix0,
              },
              P,
            ) => {
              let { gl: x, scene: b, camera: y, size: C } = (0, a.C)(),
                _ = o || b,
                S = t || y,
                [M, j, z] = (0, n.useMemo)(() => {
                  let e = new l.s0(x, {
                    depthBuffer: d,
                    stencilBuffer: p,
                    multisampling: h,
                    frameBufferType: g,
                  });
                  e.addPass(new l.AH(_, S));
                  let t = null,
                    o = null;
                  return (
                    m &&
                      (((o = new l.Xe(_, S)).enabled = !1),
                      e.addPass(o),
                      void 0 !== s &&
                        (((t = new l.SP({ normalBuffer: o.texture, resolutionScale: s })).enabled =
                          !1),
                        e.addPass(t))),
                    [e, o, t]
                  );
                }, [S, x, d, p, h, g, _, m, s]);
              ((0, n.useEffect)(() => M?.setSize(C.width, C.height), [M, C]),
                (0, a.D)(
                  (e, t) => {
                    if (f) {
                      let e = x.autoClear;
                      ((x.autoClear = u),
                        p && !u && x.clearStencil(),
                        M.render(t),
                        (x.autoClear = e));
                    }
                  },
                  f ? c : 0,
                ));
              let E = (0, n.useRef)(null);
              ((0, n.useLayoutEffect)(() => {
                let e = [],
                  t = E.current.__r3f;
                if (t && M) {
                  let o = t.children;
                  for (let t = 0; t < o.length; t++) {
                    let r = o[t].object;
                    if (r instanceof l.Mj) {
                      let n = [r];
                      if (!w(r)) {
                        let e = null;
                        for (; (e = o[t + 1]?.object) instanceof l.Mj && !w(e);) (n.push(e), t++);
                      }
                      let i = new l.Vu(S, ...n);
                      e.push(i);
                    } else r instanceof l.oF && e.push(r);
                  }
                  for (let t of e) M?.addPass(t);
                  (j && (j.enabled = !0), z && (z.enabled = !0));
                }
                return () => {
                  for (let t of e) M?.removePass(t);
                  (j && (j.enabled = !1), z && (z.enabled = !1));
                };
              }, [M, e, S, j, z]),
                (0, n.useEffect)(() => {
                  let e = x.toneMapping;
                  return (
                    (x.toneMapping = i.y_p),
                    () => {
                      x.toneMapping = e;
                    }
                  );
                }, [x]));
              let k = (0, n.useMemo)(
                () => ({
                  composer: M,
                  normalPass: j,
                  downSamplingPass: z,
                  resolutionScale: s,
                  camera: S,
                  scene: _,
                }),
                [M, j, z, s, S, _],
              );
              return (
                (0, n.useImperativeHandle)(P, () => M, [M]),
                (0, r.jsx)(v.Provider, {
                  value: k,
                  children: (0, r.jsx)("group", { ref: E, children: e }),
                })
              );
            },
          ),
        ),
        x = (e) => ("object" == typeof e && null != e && "current" in e ? e.current : e),
        b = 0,
        y = new WeakMap(),
        C = (e, t) =>
          function ({ blendFunction: o = t?.blendFunction, opacity: i = t?.opacity, ...l }) {
            let s = y.get(e);
            if (!s) {
              let t = `@react-three/postprocessing/${e.name}-${b++}`;
              ((0, a.e)({ [t]: e }), y.set(e, (s = t)));
            }
            let f = (0, a.C)((e) => e.camera),
              c = n.useMemo(
                () => [...(t?.args ?? []), ...(l.args ?? [{ ...t, ...l }])],
                [JSON.stringify(l)],
              );
            return (0, r.jsx)(s, {
              camera: f,
              "blendMode-blendFunction": o,
              "blendMode-opacity-value": i,
              ...l,
              args: c,
            });
          };
      l.Mj;
      let _ = C(l.bv, { blendFunction: 0 }),
        S =
          (l.i,
          (0, n.forwardRef)(function (
            {
              selection: e = [],
              selectionLayer: t = 10,
              blendFunction: o,
              patternTexture: i,
              edgeStrength: s,
              pulseSpeed: f,
              visibleEdgeColor: c,
              hiddenEdgeColor: u,
              width: d,
              height: m,
              kernelSize: p,
              blur: h,
              xRay: w,
              ...P
            },
            b,
          ) {
            let y = (0, a.C)((e) => e.invalidate),
              { scene: C, camera: _ } = (0, n.useContext)(v),
              S = (0, n.useMemo)(
                () =>
                  new l.st(C, _, {
                    blendFunction: o,
                    patternTexture: i,
                    edgeStrength: s,
                    pulseSpeed: f,
                    visibleEdgeColor: c,
                    hiddenEdgeColor: u,
                    width: d,
                    height: m,
                    kernelSize: p,
                    blur: h,
                    xRay: w,
                    ...P,
                  }),
                [o, h, _, s, m, u, p, i, f, C, c, d, w],
              ),
              M = (0, n.useContext)(g);
            return (
              (0, n.useEffect)(() => {
                if (!M && e)
                  return (
                    S.selection.set(Array.isArray(e) ? e.map(x) : [x(e)]),
                    y(),
                    () => {
                      (S.selection.clear(), y());
                    }
                  );
              }, [S, e, M, y]),
              (0, n.useEffect)(() => {
                ((S.selectionLayer = t), y());
              }, [S, y, t]),
              (0, n.useRef)(void 0),
              (0, n.useEffect)(() => {
                if (M && M.enabled && M.selected?.length)
                  return (
                    S.selection.set(M.selected),
                    y(),
                    () => {
                      (S.selection.clear(), y());
                    }
                  );
              }, [M, S.selection, y]),
              (0, n.useEffect)(
                () => () => {
                  S.dispose();
                },
                [S],
              ),
              (0, r.jsx)("primitive", { ref: b, object: S })
            );
          }));
      l.hH;
      var M = ((e) => (
        (e[(e.Linear = 0)] = "Linear"),
        (e[(e.Radial = 1)] = "Radial"),
        (e[(e.MirroredLinear = 2)] = "MirroredLinear"),
        e
      ))(M || {});
      l.Mj;
      let j = C(l.K1),
        z =
          (l.To,
          {
            fragmentShader: `

    // original shader by Evan Wallace

    #define MAX_ITERATIONS 100

    uniform float blur;
    uniform float taper;
    uniform vec2 start;
    uniform vec2 end;
    uniform vec2 direction;
    uniform int samples;

    float random(vec3 scale, float seed) {
        /* use the fragment position for a different seed per-pixel */
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 startPixel = vec2(start.x * resolution.x, start.y * resolution.y);
        vec2 endPixel = vec2(end.x * resolution.x, end.y * resolution.y);
        float f_samples = float(samples);
        float half_samples = f_samples / 2.0;

        // use screen diagonal to normalize blur radii
        float maxScreenDistance = distance(vec2(0.0), resolution); // diagonal distance
        float gradientRadius = taper * (maxScreenDistance);
        float blurRadius = blur * (maxScreenDistance / 16.0);

        /* randomize the lookup values to hide the fixed number of samples */
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
        vec2 normal = normalize(vec2(startPixel.y - endPixel.y, endPixel.x - startPixel.x));
        float radius = smoothstep(0.0, 1.0, abs(dot(uv * resolution - startPixel, normal)) / gradientRadius) * blurRadius;

        #pragma unroll_loop_start
        for (int i = 0; i <= MAX_ITERATIONS; i++) {
            if (i >= samples) { break; } // return early if over sample count
            float f_i = float(i);
            float s_i = -half_samples + f_i;
            float percent = (s_i + offset - 0.5) / half_samples;
            float weight = 1.0 - abs(percent);
            vec4 sample_i = texture2D(inputBuffer, uv + normalize(direction) / resolution * percent * radius);
            /* switch to pre-multiplied alpha to correctly blur transparent images */
            sample_i.rgb *= sample_i.a;
            color += sample_i * weight;
            total += weight;
        }
        #pragma unroll_loop_end

        outputColor = color / total;

        /* switch back from pre-multiplied alpha */
        outputColor.rgb /= outputColor.a + 0.00001;
    }
    `,
          });
      l.Mj;
      l.Mj;
      l.Mj;
    },
    53279: (e, t, o) => {
      o.d(t, { x: () => f });
      var r = o(88945),
        n = o(12115),
        i = o(85339),
        a = o(59040);
      let l = parseInt(i.sPf.replace(/\D+/g, "")),
        s = (function (e, t, o, r) {
          var n;
          return (
            ((n = class extends i.BKk {
              constructor(r) {
                for (let n in (super({ vertexShader: t, fragmentShader: o, ...r }), e))
                  ((this.uniforms[n] = new i.nc$(e[n])),
                    Object.defineProperty(this, n, {
                      get() {
                        return this.uniforms[n].value;
                      },
                      set(e) {
                        this.uniforms[n].value = e;
                      },
                    }));
                this.uniforms = i.LlO.clone(this.uniforms);
              }
            }).key = i.cj9.generateUUID()),
            n
          );
        })(
          {
            cellSize: 0.5,
            sectionSize: 1,
            fadeDistance: 100,
            fadeStrength: 1,
            fadeFrom: 1,
            cellThickness: 0.5,
            sectionThickness: 1,
            cellColor: new i.Q1f(),
            sectionColor: new i.Q1f(),
            infiniteGrid: !1,
            followCamera: !1,
            worldCamProjPosition: new i.Pq0(),
            worldPlanePosition: new i.Pq0(),
          },
          `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
          `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${l >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
    }
  `,
        ),
        f = n.forwardRef(
          (
            {
              args: e,
              cellColor: t = "#000000",
              sectionColor: o = "#2080ff",
              cellSize: l = 0.5,
              sectionSize: f = 1,
              followCamera: c = !1,
              infiniteGrid: u = !1,
              fadeDistance: d = 100,
              fadeStrength: m = 1,
              fadeFrom: p = 1,
              cellThickness: h = 0.5,
              sectionThickness: g = 1,
              side: v = i.hsX,
              ...w
            },
            P,
          ) => {
            (0, a.e)({ GridMaterial: s });
            let x = n.useRef(null);
            n.useImperativeHandle(P, () => x.current, []);
            let b = new i.Zcv(),
              y = new i.Pq0(0, 1, 0),
              C = new i.Pq0(0, 0, 0);
            return (
              (0, a.D)((e) => {
                b.setFromNormalAndCoplanarPoint(y, C).applyMatrix4(x.current.matrixWorld);
                let t = x.current.material,
                  o = t.uniforms.worldCamProjPosition,
                  r = t.uniforms.worldPlanePosition;
                (b.projectPoint(e.camera.position, o.value),
                  r.value.set(0, 0, 0).applyMatrix4(x.current.matrixWorld));
              }),
              n.createElement(
                "mesh",
                (0, r.A)({ ref: x, frustumCulled: !1 }, w),
                n.createElement(
                  "gridMaterial",
                  (0, r.A)(
                    { transparent: !0, "extensions-derivatives": !0, side: v },
                    {
                      cellSize: l,
                      sectionSize: f,
                      cellColor: t,
                      sectionColor: o,
                      cellThickness: h,
                      sectionThickness: g,
                    },
                    {
                      fadeDistance: d,
                      fadeStrength: m,
                      fadeFrom: p,
                      infiniteGrid: u,
                      followCamera: c,
                    },
                  ),
                ),
                n.createElement("planeGeometry", { args: e }),
              )
            );
          },
        );
    },
    63617: (e, t, o) => {
      o.d(t, { o: () => n });
      var r = o(85339);
      class n {
        constructor() {
          ((this.isPass = !0),
            (this.enabled = !0),
            (this.needsSwap = !0),
            (this.clear = !1),
            (this.renderToScreen = !1));
        }
        setSize() {}
        render() {
          console.error("THREE.Pass: .render() must be implemented in derived pass.");
        }
        dispose() {}
      }
      new r.qUd(-1, 1, 1, -1, 0, 1);
      class i extends r.LoY {
        constructor() {
          (super(),
            this.setAttribute("position", new r.qtW([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
            this.setAttribute("uv", new r.qtW([0, 2, 0, 0, 2, 0], 2)));
        }
      }
      new i();
    },
  },
]);

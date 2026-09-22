"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9033],
  {
    19535: (e, t, i) => {
      i.d(t, { A: () => n });
      let n = (0, i(30313).A)("outline", "walk", "Walk", [
        ["path", { d: "M12 4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }],
        ["path", { d: "M7 21l3 -4", key: "svg-1" }],
        ["path", { d: "M16 21l-2 -4l-3 -3l1 -6", key: "svg-2" }],
        ["path", { d: "M6 12l2 -3l4 -1l3 3l3 1", key: "svg-3" }],
      ]);
    },
    43646: (e, t, i) => {
      let n, r;
      i.d(t, { E: () => x });
      var o = i(88945),
        s = i(12115),
        a = i(12669),
        l = i(85339),
        c = i(59040);
      let d = new l.Pq0(),
        u = new l.Pq0(),
        f = new l.Pq0(),
        m = new l.I9Y();
      function h(e, t, i) {
        let n = d.setFromMatrixPosition(e.matrixWorld);
        n.project(t);
        let r = i.width / 2,
          o = i.height / 2;
        return [n.x * r + r, -(n.y * o) + o];
      }
      let p = (e) => (1e-10 > Math.abs(e) ? 0 : e);
      function v(e, t, i = "") {
        let n = "matrix3d(";
        for (let i = 0; 16 !== i; i++) n += p(t[i] * e.elements[i]) + (15 !== i ? "," : ")");
        return i + n;
      }
      let y = ((n = [1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]), (e) => v(e, n)),
        g =
          ((r = (e) => [
            1 / e,
            1 / e,
            1 / e,
            1,
            -1 / e,
            -1 / e,
            -1 / e,
            -1,
            1 / e,
            1 / e,
            1 / e,
            1,
            1,
            1,
            1,
            1,
          ]),
          (e, t) => v(e, r(t), "translate(-50%,-50%)")),
        x = s.forwardRef(
          (
            {
              children: e,
              eps: t = 0.001,
              style: i,
              className: n,
              prepend: r,
              center: v,
              fullscreen: x,
              portal: w,
              distanceFactor: E,
              sprite: S = !1,
              transform: b = !1,
              occlude: L,
              onOcclude: M,
              castShadow: P,
              receiveShadow: A,
              material: _,
              geometry: z,
              zIndexRange: U = [0x1000037, 0],
              calculatePosition: C = h,
              as: O = "div",
              wrapperClass: D,
              pointerEvents: k = "auto",
              ...R
            },
            B,
          ) => {
            let {
                gl: T,
                camera: I,
                scene: H,
                size: W,
                raycaster: j,
                events: q,
                viewport: N,
              } = (0, c.C)(),
              [F] = s.useState(() => document.createElement(O)),
              $ = s.useRef(null),
              G = s.useRef(null),
              V = s.useRef(0),
              Q = s.useRef([0, 0]),
              Y = s.useRef(null),
              X = s.useRef(null),
              Z = (null == w ? void 0 : w.current) || q.connected || T.domElement.parentNode,
              J = s.useRef(null),
              K = s.useRef(!1),
              ee = s.useMemo(
                () =>
                  (L && "blending" !== L) ||
                  (Array.isArray(L) &&
                    L.length &&
                    (function (e) {
                      return e && "object" == typeof e && "current" in e;
                    })(L[0])),
                [L],
              );
            (s.useLayoutEffect(() => {
              let e = T.domElement;
              L && "blending" === L
                ? ((e.style.zIndex = `${Math.floor(U[0] / 2)}`),
                  (e.style.position = "absolute"),
                  (e.style.pointerEvents = "none"))
                : ((e.style.zIndex = null),
                  (e.style.position = null),
                  (e.style.pointerEvents = null));
            }, [L]),
              s.useLayoutEffect(() => {
                if (G.current) {
                  let e = ($.current = a.createRoot(F));
                  if ((H.updateMatrixWorld(), b))
                    F.style.cssText =
                      "position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";
                  else {
                    let e = C(G.current, I, W);
                    F.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`;
                  }
                  return (
                    Z && (r ? Z.prepend(F) : Z.appendChild(F)),
                    () => {
                      (Z && Z.removeChild(F), e.unmount());
                    }
                  );
                }
              }, [Z, b]),
              s.useLayoutEffect(() => {
                D && (F.className = D);
              }, [D]));
            let et = s.useMemo(
                () =>
                  b
                    ? {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: W.width,
                        height: W.height,
                        transformStyle: "preserve-3d",
                        pointerEvents: "none",
                      }
                    : {
                        position: "absolute",
                        transform: v ? "translate3d(-50%,-50%,0)" : "none",
                        ...(x && {
                          top: -W.height / 2,
                          left: -W.width / 2,
                          width: W.width,
                          height: W.height,
                        }),
                        ...i,
                      },
                [i, v, x, W, b],
              ),
              ei = s.useMemo(() => ({ position: "absolute", pointerEvents: k }), [k]);
            s.useLayoutEffect(() => {
              var t, r;
              ((K.current = !1),
                b
                  ? null == (t = $.current) ||
                    t.render(
                      s.createElement(
                        "div",
                        { ref: Y, style: et },
                        s.createElement(
                          "div",
                          { ref: X, style: ei },
                          s.createElement("div", { ref: B, className: n, style: i, children: e }),
                        ),
                      ),
                    )
                  : null == (r = $.current) ||
                    r.render(
                      s.createElement("div", { ref: B, style: et, className: n, children: e }),
                    ));
            });
            let en = s.useRef(!0);
            (0, c.D)((e) => {
              if (G.current) {
                (I.updateMatrixWorld(), G.current.updateWorldMatrix(!0, !1));
                let e = b ? Q.current : C(G.current, I, W);
                if (
                  b ||
                  Math.abs(V.current - I.zoom) > t ||
                  Math.abs(Q.current[0] - e[0]) > t ||
                  Math.abs(Q.current[1] - e[1]) > t
                ) {
                  let t = (function (e, t) {
                      let i = d.setFromMatrixPosition(e.matrixWorld),
                        n = u.setFromMatrixPosition(t.matrixWorld),
                        r = i.sub(n),
                        o = t.getWorldDirection(f);
                      return r.angleTo(o) > Math.PI / 2;
                    })(G.current, I),
                    i = !1;
                  ee &&
                    (Array.isArray(L)
                      ? (i = L.map((e) => e.current))
                      : "blending" !== L && (i = [H]));
                  let n = en.current;
                  (i
                    ? (en.current =
                        (function (e, t, i, n) {
                          let r = d.setFromMatrixPosition(e.matrixWorld),
                            o = r.clone();
                          (o.project(t), m.set(o.x, o.y), i.setFromCamera(m, t));
                          let s = i.intersectObjects(n, !0);
                          if (s.length) {
                            let e = s[0].distance;
                            return r.distanceTo(i.ray.origin) < e;
                          }
                          return !0;
                        })(G.current, I, j, i) && !t)
                    : (en.current = !t),
                    n !== en.current &&
                      (M ? M(!en.current) : (F.style.display = en.current ? "block" : "none")));
                  let r = Math.floor(U[0] / 2),
                    o = L ? (ee ? [U[0], r] : [r - 1, 0]) : U;
                  if (
                    ((F.style.zIndex = `${(function (e, t, i) {
                      if (t instanceof l.ubm || t instanceof l.qUd) {
                        let n = d.setFromMatrixPosition(e.matrixWorld),
                          r = u.setFromMatrixPosition(t.matrixWorld),
                          o = n.distanceTo(r),
                          s = (i[1] - i[0]) / (t.far - t.near),
                          a = i[1] - s * t.far;
                        return Math.round(s * o + a);
                      }
                    })(G.current, I, o)}`),
                    b)
                  ) {
                    let [e, t] = [W.width / 2, W.height / 2],
                      i = I.projectionMatrix.elements[5] * t,
                      { isOrthographicCamera: n, top: r, left: o, bottom: s, right: a } = I,
                      l = y(I.matrixWorldInverse),
                      c = n
                        ? `scale(${i})translate(${p(-(a + o) / 2)}px,${p((r + s) / 2)}px)`
                        : `translateZ(${i}px)`,
                      d = G.current.matrixWorld;
                    (S &&
                      (((d = I.matrixWorldInverse
                        .clone()
                        .transpose()
                        .copyPosition(d)
                        .scale(G.current.scale)).elements[3] = d.elements[7] = d.elements[11] = 0),
                      (d.elements[15] = 1)),
                      (F.style.width = W.width + "px"),
                      (F.style.height = W.height + "px"),
                      (F.style.perspective = n ? "" : `${i}px`),
                      Y.current &&
                        X.current &&
                        ((Y.current.style.transform = `${c}${l}translate(${e}px,${t}px)`),
                        (X.current.style.transform = g(d, 1 / ((E || 10) / 400)))));
                  } else {
                    let t =
                      void 0 === E
                        ? 1
                        : (function (e, t) {
                            if (t instanceof l.qUd) return t.zoom;
                            if (!(t instanceof l.ubm)) return 1;
                            {
                              let i = d.setFromMatrixPosition(e.matrixWorld),
                                n = u.setFromMatrixPosition(t.matrixWorld);
                              return (
                                1 / (2 * Math.tan((t.fov * Math.PI) / 180 / 2) * i.distanceTo(n))
                              );
                            }
                          })(G.current, I) * E;
                    F.style.transform = `translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`;
                  }
                  ((Q.current = e), (V.current = I.zoom));
                }
              }
              if (!ee && J.current && !K.current)
                if (b) {
                  if (Y.current) {
                    let e = Y.current.children[0];
                    if (null != e && e.clientWidth && null != e && e.clientHeight) {
                      let { isOrthographicCamera: t } = I;
                      if (t || z)
                        R.scale &&
                          (Array.isArray(R.scale)
                            ? R.scale instanceof l.Pq0
                              ? J.current.scale.copy(R.scale.clone().divideScalar(1))
                              : J.current.scale.set(1 / R.scale[0], 1 / R.scale[1], 1 / R.scale[2])
                            : J.current.scale.setScalar(1 / R.scale));
                      else {
                        let t = (E || 10) / 400,
                          i = e.clientWidth * t,
                          n = e.clientHeight * t;
                        J.current.scale.set(i, n, 1);
                      }
                      K.current = !0;
                    }
                  }
                } else {
                  let t = F.children[0];
                  if (null != t && t.clientWidth && null != t && t.clientHeight) {
                    let e = 1 / N.factor,
                      i = t.clientWidth * e,
                      n = t.clientHeight * e;
                    (J.current.scale.set(i, n, 1), (K.current = !0));
                  }
                  J.current.lookAt(e.camera.position);
                }
            });
            let er = s.useMemo(
              () => ({
                vertexShader: b
                  ? void 0
                  : `
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,
                fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `,
              }),
              [b],
            );
            return s.createElement(
              "group",
              (0, o.A)({}, R, { ref: G }),
              L &&
                !ee &&
                s.createElement(
                  "mesh",
                  { castShadow: P, receiveShadow: A, ref: J },
                  z || s.createElement("planeGeometry", null),
                  _ ||
                    s.createElement("shaderMaterial", {
                      side: l.$EB,
                      vertexShader: er.vertexShader,
                      fragmentShader: er.fragmentShader,
                    }),
                ),
            );
          },
        );
    },
    85571: (e, t, i) => {
      let n, r;
      i.d(t, { N: () => D });
      var o = i(88945),
        s = i(12115),
        a = i(85339),
        l = i(59040);
      let c = new a.NRn(),
        d = new a.Pq0();
      class u extends a.CmU {
        constructor() {
          (super(),
            (this.isLineSegmentsGeometry = !0),
            (this.type = "LineSegmentsGeometry"),
            this.setIndex([0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5]),
            this.setAttribute(
              "position",
              new a.qtW(
                [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0],
                3,
              ),
            ),
            this.setAttribute(
              "uv",
              new a.qtW([-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], 2),
            ));
        }
        applyMatrix4(e) {
          let t = this.attributes.instanceStart,
            i = this.attributes.instanceEnd;
          return (
            void 0 !== t && (t.applyMatrix4(e), i.applyMatrix4(e), (t.needsUpdate = !0)),
            null !== this.boundingBox && this.computeBoundingBox(),
            null !== this.boundingSphere && this.computeBoundingSphere(),
            this
          );
        }
        setPositions(e) {
          let t;
          e instanceof Float32Array ? (t = e) : Array.isArray(e) && (t = new Float32Array(e));
          let i = new a.LuO(t, 6, 1);
          return (
            this.setAttribute("instanceStart", new a.eHs(i, 3, 0)),
            this.setAttribute("instanceEnd", new a.eHs(i, 3, 3)),
            this.computeBoundingBox(),
            this.computeBoundingSphere(),
            this
          );
        }
        setColors(e, t = 3) {
          let i;
          e instanceof Float32Array ? (i = e) : Array.isArray(e) && (i = new Float32Array(e));
          let n = new a.LuO(i, 2 * t, 1);
          return (
            this.setAttribute("instanceColorStart", new a.eHs(n, t, 0)),
            this.setAttribute("instanceColorEnd", new a.eHs(n, t, t)),
            this
          );
        }
        fromWireframeGeometry(e) {
          return (this.setPositions(e.attributes.position.array), this);
        }
        fromEdgesGeometry(e) {
          return (this.setPositions(e.attributes.position.array), this);
        }
        fromMesh(e) {
          return (this.fromWireframeGeometry(new a.XJ7(e.geometry)), this);
        }
        fromLineSegments(e) {
          let t = e.geometry;
          return (this.setPositions(t.attributes.position.array), this);
        }
        computeBoundingBox() {
          null === this.boundingBox && (this.boundingBox = new a.NRn());
          let e = this.attributes.instanceStart,
            t = this.attributes.instanceEnd;
          void 0 !== e &&
            void 0 !== t &&
            (this.boundingBox.setFromBufferAttribute(e),
            c.setFromBufferAttribute(t),
            this.boundingBox.union(c));
        }
        computeBoundingSphere() {
          (null === this.boundingSphere && (this.boundingSphere = new a.iyt()),
            null === this.boundingBox && this.computeBoundingBox());
          let e = this.attributes.instanceStart,
            t = this.attributes.instanceEnd;
          if (void 0 !== e && void 0 !== t) {
            let i = this.boundingSphere.center;
            this.boundingBox.getCenter(i);
            let n = 0;
            for (let r = 0, o = e.count; r < o; r++)
              (d.fromBufferAttribute(e, r),
                (n = Math.max(n, i.distanceToSquared(d))),
                d.fromBufferAttribute(t, r),
                (n = Math.max(n, i.distanceToSquared(d))));
            ((this.boundingSphere.radius = Math.sqrt(n)),
              isNaN(this.boundingSphere.radius) &&
                console.error(
                  "THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",
                  this,
                ));
          }
        }
        toJSON() {}
        applyMatrix(e) {
          return (
            console.warn(
              "THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().",
            ),
            this.applyMatrix4(e)
          );
        }
      }
      var f = i(87548);
      let m = parseInt(a.sPf.replace(/\D+/g, ""));
      class h extends a.BKk {
        constructor(e) {
          (super({
            type: "LineMaterial",
            uniforms: a.LlO.clone(
              a.LlO.merge([
                f.UniformsLib.common,
                f.UniformsLib.fog,
                {
                  worldUnits: { value: 1 },
                  linewidth: { value: 1 },
                  resolution: { value: new a.I9Y(1, 1) },
                  dashOffset: { value: 0 },
                  dashScale: { value: 1 },
                  dashSize: { value: 1 },
                  gapSize: { value: 1 },
                },
              ]),
            ),
            vertexShader: `
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,
            fragmentShader: `
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${m >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,
            clipping: !0,
          }),
            (this.isLineMaterial = !0),
            (this.onBeforeCompile = function () {
              this.transparent
                ? (this.defines.USE_LINE_COLOR_ALPHA = "1")
                : delete this.defines.USE_LINE_COLOR_ALPHA;
            }),
            Object.defineProperties(this, {
              color: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.diffuse.value;
                },
                set: function (e) {
                  this.uniforms.diffuse.value = e;
                },
              },
              worldUnits: {
                enumerable: !0,
                get: function () {
                  return "WORLD_UNITS" in this.defines;
                },
                set: function (e) {
                  !0 === e ? (this.defines.WORLD_UNITS = "") : delete this.defines.WORLD_UNITS;
                },
              },
              linewidth: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.linewidth.value;
                },
                set: function (e) {
                  this.uniforms.linewidth.value = e;
                },
              },
              dashed: {
                enumerable: !0,
                get: function () {
                  return "USE_DASH" in this.defines;
                },
                set(e) {
                  (!!e != "USE_DASH" in this.defines && (this.needsUpdate = !0),
                    !0 === e ? (this.defines.USE_DASH = "") : delete this.defines.USE_DASH);
                },
              },
              dashScale: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.dashScale.value;
                },
                set: function (e) {
                  this.uniforms.dashScale.value = e;
                },
              },
              dashSize: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.dashSize.value;
                },
                set: function (e) {
                  this.uniforms.dashSize.value = e;
                },
              },
              dashOffset: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.dashOffset.value;
                },
                set: function (e) {
                  this.uniforms.dashOffset.value = e;
                },
              },
              gapSize: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.gapSize.value;
                },
                set: function (e) {
                  this.uniforms.gapSize.value = e;
                },
              },
              opacity: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.opacity.value;
                },
                set: function (e) {
                  this.uniforms.opacity.value = e;
                },
              },
              resolution: {
                enumerable: !0,
                get: function () {
                  return this.uniforms.resolution.value;
                },
                set: function (e) {
                  this.uniforms.resolution.value.copy(e);
                },
              },
              alphaToCoverage: {
                enumerable: !0,
                get: function () {
                  return "USE_ALPHA_TO_COVERAGE" in this.defines;
                },
                set: function (e) {
                  (!!e != "USE_ALPHA_TO_COVERAGE" in this.defines && (this.needsUpdate = !0),
                    !0 === e
                      ? ((this.defines.USE_ALPHA_TO_COVERAGE = ""),
                        (this.extensions.derivatives = !0))
                      : (delete this.defines.USE_ALPHA_TO_COVERAGE,
                        (this.extensions.derivatives = !1)));
                },
              },
            }),
            this.setValues(e));
        }
      }
      let p = m >= 125 ? "uv1" : "uv2",
        v = new a.IUQ(),
        y = new a.Pq0(),
        g = new a.Pq0(),
        x = new a.IUQ(),
        w = new a.IUQ(),
        E = new a.IUQ(),
        S = new a.Pq0(),
        b = new a.kn4(),
        L = new a.cZY(),
        M = new a.Pq0(),
        P = new a.NRn(),
        A = new a.iyt(),
        _ = new a.IUQ();
      function z(e, t, i) {
        return (
          _.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix),
          _.multiplyScalar(1 / _.w),
          (_.x = r / i.width),
          (_.y = r / i.height),
          _.applyMatrix4(e.projectionMatrixInverse),
          _.multiplyScalar(1 / _.w),
          Math.abs(Math.max(_.x, _.y))
        );
      }
      class U extends a.eaF {
        constructor(e = new u(), t = new h({ color: 0xffffff * Math.random() })) {
          (super(e, t), (this.isLineSegments2 = !0), (this.type = "LineSegments2"));
        }
        computeLineDistances() {
          let e = this.geometry,
            t = e.attributes.instanceStart,
            i = e.attributes.instanceEnd,
            n = new Float32Array(2 * t.count);
          for (let e = 0, r = 0, o = t.count; e < o; e++, r += 2)
            (y.fromBufferAttribute(t, e),
              g.fromBufferAttribute(i, e),
              (n[r] = 0 === r ? 0 : n[r - 1]),
              (n[r + 1] = n[r] + y.distanceTo(g)));
          let r = new a.LuO(n, 2, 1);
          return (
            e.setAttribute("instanceDistanceStart", new a.eHs(r, 1, 0)),
            e.setAttribute("instanceDistanceEnd", new a.eHs(r, 1, 1)),
            this
          );
        }
        raycast(e, t) {
          let i,
            o,
            s = this.material.worldUnits,
            l = e.camera;
          null !== l ||
            s ||
            console.error(
              'LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.',
            );
          let c = (void 0 !== e.params.Line2 && e.params.Line2.threshold) || 0;
          n = e.ray;
          let d = this.matrixWorld,
            u = this.geometry,
            f = this.material;
          if (
            ((r = f.linewidth + c),
            null === u.boundingSphere && u.computeBoundingSphere(),
            A.copy(u.boundingSphere).applyMatrix4(d),
            s)
          )
            i = 0.5 * r;
          else {
            let e = Math.max(l.near, A.distanceToPoint(n.origin));
            i = z(l, e, f.resolution);
          }
          if (((A.radius += i), !1 !== n.intersectsSphere(A))) {
            if (
              (null === u.boundingBox && u.computeBoundingBox(),
              P.copy(u.boundingBox).applyMatrix4(d),
              s)
            )
              o = 0.5 * r;
            else {
              let e = Math.max(l.near, P.distanceToPoint(n.origin));
              o = z(l, e, f.resolution);
            }
            (P.expandByScalar(o),
              !1 !== n.intersectsBox(P) &&
                (s
                  ? (function (e, t) {
                      let i = e.matrixWorld,
                        o = e.geometry,
                        s = o.attributes.instanceStart,
                        l = o.attributes.instanceEnd,
                        c = Math.min(o.instanceCount, s.count);
                      for (let o = 0; o < c; o++) {
                        (L.start.fromBufferAttribute(s, o),
                          L.end.fromBufferAttribute(l, o),
                          L.applyMatrix4(i));
                        let c = new a.Pq0(),
                          d = new a.Pq0();
                        (n.distanceSqToSegment(L.start, L.end, d, c),
                          d.distanceTo(c) < 0.5 * r &&
                            t.push({
                              point: d,
                              pointOnLine: c,
                              distance: n.origin.distanceTo(d),
                              object: e,
                              face: null,
                              faceIndex: o,
                              uv: null,
                              [p]: null,
                            }));
                      }
                    })(this, t)
                  : (function (e, t, i) {
                      let o = t.projectionMatrix,
                        s = e.material.resolution,
                        l = e.matrixWorld,
                        c = e.geometry,
                        d = c.attributes.instanceStart,
                        u = c.attributes.instanceEnd,
                        f = Math.min(c.instanceCount, d.count),
                        m = -t.near;
                      (n.at(1, E),
                        (E.w = 1),
                        E.applyMatrix4(t.matrixWorldInverse),
                        E.applyMatrix4(o),
                        E.multiplyScalar(1 / E.w),
                        (E.x *= s.x / 2),
                        (E.y *= s.y / 2),
                        (E.z = 0),
                        S.copy(E),
                        b.multiplyMatrices(t.matrixWorldInverse, l));
                      for (let t = 0; t < f; t++) {
                        if (
                          (x.fromBufferAttribute(d, t),
                          w.fromBufferAttribute(u, t),
                          (x.w = 1),
                          (w.w = 1),
                          x.applyMatrix4(b),
                          w.applyMatrix4(b),
                          x.z > m && w.z > m)
                        )
                          continue;
                        if (x.z > m) {
                          let e = x.z - w.z,
                            t = (x.z - m) / e;
                          x.lerp(w, t);
                        } else if (w.z > m) {
                          let e = w.z - x.z,
                            t = (w.z - m) / e;
                          w.lerp(x, t);
                        }
                        (x.applyMatrix4(o),
                          w.applyMatrix4(o),
                          x.multiplyScalar(1 / x.w),
                          w.multiplyScalar(1 / w.w),
                          (x.x *= s.x / 2),
                          (x.y *= s.y / 2),
                          (w.x *= s.x / 2),
                          (w.y *= s.y / 2),
                          L.start.copy(x),
                          (L.start.z = 0),
                          L.end.copy(w),
                          (L.end.z = 0));
                        let c = L.closestPointToPointParameter(S, !0);
                        L.at(c, M);
                        let f = a.cj9.lerp(x.z, w.z, c),
                          h = f >= -1 && f <= 1,
                          v = S.distanceTo(M) < 0.5 * r;
                        if (h && v) {
                          (L.start.fromBufferAttribute(d, t),
                            L.end.fromBufferAttribute(u, t),
                            L.start.applyMatrix4(l),
                            L.end.applyMatrix4(l));
                          let r = new a.Pq0(),
                            o = new a.Pq0();
                          (n.distanceSqToSegment(L.start, L.end, o, r),
                            i.push({
                              point: o,
                              pointOnLine: r,
                              distance: n.origin.distanceTo(o),
                              object: e,
                              face: null,
                              faceIndex: t,
                              uv: null,
                              [p]: null,
                            }));
                        }
                      }
                    })(this, l, t)));
          }
        }
        onBeforeRender(e) {
          let t = this.material.uniforms;
          t &&
            t.resolution &&
            (e.getViewport(v), this.material.uniforms.resolution.value.set(v.z, v.w));
        }
      }
      class C extends u {
        constructor() {
          (super(), (this.isLineGeometry = !0), (this.type = "LineGeometry"));
        }
        setPositions(e) {
          let t = e.length - 3,
            i = new Float32Array(2 * t);
          for (let n = 0; n < t; n += 3)
            ((i[2 * n] = e[n]),
              (i[2 * n + 1] = e[n + 1]),
              (i[2 * n + 2] = e[n + 2]),
              (i[2 * n + 3] = e[n + 3]),
              (i[2 * n + 4] = e[n + 4]),
              (i[2 * n + 5] = e[n + 5]));
          return (super.setPositions(i), this);
        }
        setColors(e, t = 3) {
          let i = e.length - t,
            n = new Float32Array(2 * i);
          if (3 === t)
            for (let r = 0; r < i; r += t)
              ((n[2 * r] = e[r]),
                (n[2 * r + 1] = e[r + 1]),
                (n[2 * r + 2] = e[r + 2]),
                (n[2 * r + 3] = e[r + 3]),
                (n[2 * r + 4] = e[r + 4]),
                (n[2 * r + 5] = e[r + 5]));
          else
            for (let r = 0; r < i; r += t)
              ((n[2 * r] = e[r]),
                (n[2 * r + 1] = e[r + 1]),
                (n[2 * r + 2] = e[r + 2]),
                (n[2 * r + 3] = e[r + 3]),
                (n[2 * r + 4] = e[r + 4]),
                (n[2 * r + 5] = e[r + 5]),
                (n[2 * r + 6] = e[r + 6]),
                (n[2 * r + 7] = e[r + 7]));
          return (super.setColors(n, t), this);
        }
        fromLine(e) {
          let t = e.geometry;
          return (this.setPositions(t.attributes.position.array), this);
        }
      }
      class O extends U {
        constructor(e = new C(), t = new h({ color: 0xffffff * Math.random() })) {
          (super(e, t), (this.isLine2 = !0), (this.type = "Line2"));
        }
      }
      let D = s.forwardRef(function (
        {
          points: e,
          color: t = 0xffffff,
          vertexColors: i,
          linewidth: n,
          lineWidth: r,
          segments: c,
          dashed: d,
          ...f
        },
        m,
      ) {
        var p, v;
        let y = (0, l.C)((e) => e.size),
          g = s.useMemo(() => (c ? new U() : new O()), [c]),
          [x] = s.useState(() => new h()),
          w = (null == i || null == (p = i[0]) ? void 0 : p.length) === 4 ? 4 : 3,
          E = s.useMemo(() => {
            let n = c ? new u() : new C(),
              r = e.map((e) => {
                let t = Array.isArray(e);
                return e instanceof a.Pq0 || e instanceof a.IUQ
                  ? [e.x, e.y, e.z]
                  : e instanceof a.I9Y
                    ? [e.x, e.y, 0]
                    : t && 3 === e.length
                      ? [e[0], e[1], e[2]]
                      : t && 2 === e.length
                        ? [e[0], e[1], 0]
                        : e;
              });
            if ((n.setPositions(r.flat()), i)) {
              t = 0xffffff;
              let e = i.map((e) => (e instanceof a.Q1f ? e.toArray() : e));
              n.setColors(e.flat(), w);
            }
            return n;
          }, [e, c, i, w]);
        return (
          s.useLayoutEffect(() => {
            g.computeLineDistances();
          }, [e, g]),
          s.useLayoutEffect(() => {
            (d ? (x.defines.USE_DASH = "") : delete x.defines.USE_DASH, (x.needsUpdate = !0));
          }, [d, x]),
          s.useEffect(
            () => () => {
              (E.dispose(), x.dispose());
            },
            [E],
          ),
          s.createElement(
            "primitive",
            (0, o.A)({ object: g, ref: m }, f),
            s.createElement("primitive", { object: E, attach: "geometry" }),
            s.createElement(
              "primitive",
              (0, o.A)(
                {
                  object: x,
                  attach: "material",
                  color: t,
                  vertexColors: !!i,
                  resolution: [y.width, y.height],
                  linewidth: null != (v = null != n ? n : r) ? v : 1,
                  dashed: d,
                  transparent: 4 === w,
                },
                f,
              ),
            ),
          )
        );
      });
    },
    90490: (e, t, i) => {
      i.d(t, { y: () => r });
      let n = (e) => {
          let t,
            i = new Set(),
            n = (e, n) => {
              let r = "function" == typeof e ? e(t) : e;
              if (!Object.is(r, t)) {
                let e = t;
                ((t = (null != n ? n : "object" != typeof r || null === r)
                  ? r
                  : Object.assign({}, t, r)),
                  i.forEach((i) => i(t, e)));
              }
            },
            r = () => t,
            o = {
              setState: n,
              getState: r,
              getInitialState: () => s,
              subscribe: (e) => (i.add(e), () => i.delete(e)),
            },
            s = (t = e(n, r, o));
          return o;
        },
        r = (e) => (e ? n(e) : n);
    },
    99101: (e, t, i) => {
      i.d(t, { Z: () => y });
      var n = i(88945),
        r = i(59040),
        o = i(12115),
        s = i(85339),
        a = i(3362),
        l = Object.defineProperty,
        c = (e, t, i) => (
          ((e, t, i) =>
            t in e
              ? l(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
              : (e[t] = i))(e, "symbol" != typeof t ? t + "" : t, i),
          i
        );
      let d = new s.O9p(0, 0, 0, "YXZ"),
        u = new s.Pq0(),
        f = { type: "change" },
        m = { type: "lock" },
        h = { type: "unlock" },
        p = Math.PI / 2;
      class v extends a.Q {
        constructor(e, t) {
          (super(),
            c(this, "camera"),
            c(this, "domElement"),
            c(this, "isLocked"),
            c(this, "minPolarAngle"),
            c(this, "maxPolarAngle"),
            c(this, "pointerSpeed"),
            c(this, "onMouseMove", (e) => {
              this.domElement &&
                !1 !== this.isLocked &&
                (d.setFromQuaternion(this.camera.quaternion),
                (d.y -= 0.002 * e.movementX * this.pointerSpeed),
                (d.x -= 0.002 * e.movementY * this.pointerSpeed),
                (d.x = Math.max(p - this.maxPolarAngle, Math.min(p - this.minPolarAngle, d.x))),
                this.camera.quaternion.setFromEuler(d),
                this.dispatchEvent(f));
            }),
            c(this, "onPointerlockChange", () => {
              this.domElement &&
                (this.domElement.ownerDocument.pointerLockElement === this.domElement
                  ? (this.dispatchEvent(m), (this.isLocked = !0))
                  : (this.dispatchEvent(h), (this.isLocked = !1)));
            }),
            c(this, "onPointerlockError", () => {
              console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
            }),
            c(this, "connect", (e) => {
              ((this.domElement = e || this.domElement),
                this.domElement &&
                  (this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove),
                  this.domElement.ownerDocument.addEventListener(
                    "pointerlockchange",
                    this.onPointerlockChange,
                  ),
                  this.domElement.ownerDocument.addEventListener(
                    "pointerlockerror",
                    this.onPointerlockError,
                  )));
            }),
            c(this, "disconnect", () => {
              this.domElement &&
                (this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove),
                this.domElement.ownerDocument.removeEventListener(
                  "pointerlockchange",
                  this.onPointerlockChange,
                ),
                this.domElement.ownerDocument.removeEventListener(
                  "pointerlockerror",
                  this.onPointerlockError,
                ));
            }),
            c(this, "dispose", () => {
              this.disconnect();
            }),
            c(this, "getObject", () => this.camera),
            c(this, "direction", new s.Pq0(0, 0, -1)),
            c(this, "getDirection", (e) =>
              e.copy(this.direction).applyQuaternion(this.camera.quaternion),
            ),
            c(this, "moveForward", (e) => {
              (u.setFromMatrixColumn(this.camera.matrix, 0),
                u.crossVectors(this.camera.up, u),
                this.camera.position.addScaledVector(u, e));
            }),
            c(this, "moveRight", (e) => {
              (u.setFromMatrixColumn(this.camera.matrix, 0),
                this.camera.position.addScaledVector(u, e));
            }),
            c(this, "lock", () => {
              this.domElement && this.domElement.requestPointerLock();
            }),
            c(this, "unlock", () => {
              this.domElement && this.domElement.ownerDocument.exitPointerLock();
            }),
            (this.camera = e),
            (this.domElement = t),
            (this.isLocked = !1),
            (this.minPolarAngle = 0),
            (this.maxPolarAngle = Math.PI),
            (this.pointerSpeed = 1),
            t && this.connect(t));
        }
      }
      let y = o.forwardRef(
        (
          {
            domElement: e,
            selector: t,
            onChange: i,
            onLock: s,
            onUnlock: a,
            enabled: l = !0,
            makeDefault: c,
            ...d
          },
          u,
        ) => {
          let { camera: f, ...m } = d,
            h = (0, r.C)((e) => e.setEvents),
            p = (0, r.C)((e) => e.gl),
            y = (0, r.C)((e) => e.camera),
            g = (0, r.C)((e) => e.invalidate),
            x = (0, r.C)((e) => e.events),
            w = (0, r.C)((e) => e.get),
            E = (0, r.C)((e) => e.set),
            S = f || y,
            b = e || x.connected || p.domElement,
            L = o.useMemo(() => new v(S), [S]);
          return (
            o.useEffect(() => {
              if (l) {
                L.connect(b);
                let e = w().events.compute;
                return (
                  h({
                    compute(e, t) {
                      let i = t.size.width / 2,
                        n = t.size.height / 2;
                      (t.pointer.set((i / t.size.width) * 2 - 1, -(2 * (n / t.size.height)) + 1),
                        t.raycaster.setFromCamera(t.pointer, t.camera));
                    },
                  }),
                  () => {
                    (L.disconnect(), h({ compute: e }));
                  }
                );
              }
            }, [l, L]),
            o.useEffect(() => {
              let e = (e) => {
                (g(), i && i(e));
              };
              (L.addEventListener("change", e),
                s && L.addEventListener("lock", s),
                a && L.addEventListener("unlock", a));
              let n = () => L.lock(),
                r = t ? Array.from(document.querySelectorAll(t)) : [document];
              return (
                r.forEach((e) => e && e.addEventListener("click", n)),
                () => {
                  (L.removeEventListener("change", e),
                    s && L.removeEventListener("lock", s),
                    a && L.removeEventListener("unlock", a),
                    r.forEach((e) => (e ? e.removeEventListener("click", n) : void 0)));
                }
              );
            }, [i, s, a, t, L, g]),
            o.useEffect(() => {
              if (c) {
                let e = w().controls;
                return (E({ controls: L }), () => E({ controls: e }));
              }
            }, [c, L]),
            o.createElement("primitive", (0, n.A)({ ref: u, object: L }, m))
          );
        },
      );
    },
  },
]);

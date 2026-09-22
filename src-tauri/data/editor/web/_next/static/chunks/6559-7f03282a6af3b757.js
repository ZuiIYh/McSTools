"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6559],
  {
    2519: (e, t, s) => {
      s.d(t, { L: () => g });
      var i = s(85339);
      let r = /^[og]\s*(.+)?/,
        a = /^mtllib /,
        o = /^usemtl /,
        n = /^usemap /,
        l = /\s+/,
        h = new i.Pq0(),
        c = new i.Pq0(),
        p = new i.Pq0(),
        u = new i.Pq0(),
        m = new i.Pq0(),
        d = new i.Q1f();
      function f() {
        let e = {
          objects: [],
          object: {},
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          materials: {},
          materialLibraries: [],
          startObject: function (e, t) {
            if (this.object && !1 === this.object.fromDeclaration) {
              ((this.object.name = e), (this.object.fromDeclaration = !1 !== t));
              return;
            }
            let s =
              this.object && "function" == typeof this.object.currentMaterial
                ? this.object.currentMaterial()
                : void 0;
            if (
              (this.object &&
                "function" == typeof this.object._finalize &&
                this.object._finalize(!0),
              (this.object = {
                name: e || "",
                fromDeclaration: !1 !== t,
                geometry: { vertices: [], normals: [], colors: [], uvs: [], hasUVIndices: !1 },
                materials: [],
                smooth: !0,
                startMaterial: function (e, t) {
                  let s = this._finalize(!1);
                  s && (s.inherited || s.groupCount <= 0) && this.materials.splice(s.index, 1);
                  let i = {
                    index: this.materials.length,
                    name: e || "",
                    mtllib: Array.isArray(t) && t.length > 0 ? t[t.length - 1] : "",
                    smooth: void 0 !== s ? s.smooth : this.smooth,
                    groupStart: void 0 !== s ? s.groupEnd : 0,
                    groupEnd: -1,
                    groupCount: -1,
                    inherited: !1,
                    clone: function (e) {
                      let t = {
                        index: "number" == typeof e ? e : this.index,
                        name: this.name,
                        mtllib: this.mtllib,
                        smooth: this.smooth,
                        groupStart: 0,
                        groupEnd: -1,
                        groupCount: -1,
                        inherited: !1,
                      };
                      return ((t.clone = this.clone.bind(t)), t);
                    },
                  };
                  return (this.materials.push(i), i);
                },
                currentMaterial: function () {
                  if (this.materials.length > 0) return this.materials[this.materials.length - 1];
                },
                _finalize: function (e) {
                  let t = this.currentMaterial();
                  if (
                    (t &&
                      -1 === t.groupEnd &&
                      ((t.groupEnd = this.geometry.vertices.length / 3),
                      (t.groupCount = t.groupEnd - t.groupStart),
                      (t.inherited = !1)),
                    e && this.materials.length > 1)
                  )
                    for (let e = this.materials.length - 1; e >= 0; e--)
                      this.materials[e].groupCount <= 0 && this.materials.splice(e, 1);
                  return (
                    e &&
                      0 === this.materials.length &&
                      this.materials.push({ name: "", smooth: this.smooth }),
                    t
                  );
                },
              }),
              s && s.name && "function" == typeof s.clone)
            ) {
              let e = s.clone(0);
              ((e.inherited = !0), this.object.materials.push(e));
            }
            this.objects.push(this.object);
          },
          finalize: function () {
            this.object && "function" == typeof this.object._finalize && this.object._finalize(!0);
          },
          parseVertexIndex: function (e, t) {
            let s = parseInt(e, 10);
            return (s >= 0 ? s - 1 : s + t / 3) * 3;
          },
          parseNormalIndex: function (e, t) {
            let s = parseInt(e, 10);
            return (s >= 0 ? s - 1 : s + t / 3) * 3;
          },
          parseUVIndex: function (e, t) {
            let s = parseInt(e, 10);
            return (s >= 0 ? s - 1 : s + t / 2) * 2;
          },
          addVertex: function (e, t, s) {
            let i = this.vertices,
              r = this.object.geometry.vertices;
            (r.push(i[e + 0], i[e + 1], i[e + 2]),
              r.push(i[t + 0], i[t + 1], i[t + 2]),
              r.push(i[s + 0], i[s + 1], i[s + 2]));
          },
          addVertexPoint: function (e) {
            let t = this.vertices;
            this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2]);
          },
          addVertexLine: function (e) {
            let t = this.vertices;
            this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2]);
          },
          addNormal: function (e, t, s) {
            let i = this.normals,
              r = this.object.geometry.normals;
            (r.push(i[e + 0], i[e + 1], i[e + 2]),
              r.push(i[t + 0], i[t + 1], i[t + 2]),
              r.push(i[s + 0], i[s + 1], i[s + 2]));
          },
          addFaceNormal: function (e, t, s) {
            let i = this.vertices,
              r = this.object.geometry.normals;
            (h.fromArray(i, e),
              c.fromArray(i, t),
              p.fromArray(i, s),
              m.subVectors(p, c),
              u.subVectors(h, c),
              m.cross(u),
              m.normalize(),
              r.push(m.x, m.y, m.z),
              r.push(m.x, m.y, m.z),
              r.push(m.x, m.y, m.z));
          },
          addColor: function (e, t, s) {
            let i = this.colors,
              r = this.object.geometry.colors;
            (void 0 !== i[e] && r.push(i[e + 0], i[e + 1], i[e + 2]),
              void 0 !== i[t] && r.push(i[t + 0], i[t + 1], i[t + 2]),
              void 0 !== i[s] && r.push(i[s + 0], i[s + 1], i[s + 2]));
          },
          addUV: function (e, t, s) {
            let i = this.uvs,
              r = this.object.geometry.uvs;
            (r.push(i[e + 0], i[e + 1]), r.push(i[t + 0], i[t + 1]), r.push(i[s + 0], i[s + 1]));
          },
          addDefaultUV: function () {
            let e = this.object.geometry.uvs;
            (e.push(0, 0), e.push(0, 0), e.push(0, 0));
          },
          addUVLine: function (e) {
            let t = this.uvs;
            this.object.geometry.uvs.push(t[e + 0], t[e + 1]);
          },
          addFace: function (e, t, s, i, r, a, o, n, l) {
            let h = this.vertices.length,
              c = this.parseVertexIndex(e, h),
              p = this.parseVertexIndex(t, h),
              u = this.parseVertexIndex(s, h);
            if ((this.addVertex(c, p, u), this.addColor(c, p, u), void 0 !== o && "" !== o)) {
              let e = this.normals.length;
              ((c = this.parseNormalIndex(o, e)),
                (p = this.parseNormalIndex(n, e)),
                (u = this.parseNormalIndex(l, e)),
                this.addNormal(c, p, u));
            } else this.addFaceNormal(c, p, u);
            if (void 0 !== i && "" !== i) {
              let e = this.uvs.length;
              ((c = this.parseUVIndex(i, e)),
                (p = this.parseUVIndex(r, e)),
                (u = this.parseUVIndex(a, e)),
                this.addUV(c, p, u),
                (this.object.geometry.hasUVIndices = !0));
            } else this.addDefaultUV();
          },
          addPointGeometry: function (e) {
            this.object.geometry.type = "Points";
            let t = this.vertices.length;
            for (let s = 0, i = e.length; s < i; s++) {
              let i = this.parseVertexIndex(e[s], t);
              (this.addVertexPoint(i), this.addColor(i));
            }
          },
          addLineGeometry: function (e, t) {
            this.object.geometry.type = "Line";
            let s = this.vertices.length,
              i = this.uvs.length;
            for (let t = 0, i = e.length; t < i; t++)
              this.addVertexLine(this.parseVertexIndex(e[t], s));
            for (let e = 0, s = t.length; e < s; e++) this.addUVLine(this.parseUVIndex(t[e], i));
          },
        };
        return (e.startObject("", !1), e);
      }
      class g extends i.aHM {
        constructor(e) {
          (super(e), (this.materials = null));
        }
        load(e, t, s, r) {
          let a = this,
            o = new i.Y9S(this.manager);
          (o.setPath(this.path),
            o.setRequestHeader(this.requestHeader),
            o.setWithCredentials(this.withCredentials),
            o.load(
              e,
              function (s) {
                try {
                  t(a.parse(s));
                } catch (t) {
                  (r ? r(t) : console.error(t), a.manager.itemError(e));
                }
              },
              s,
              r,
            ));
        }
        setMaterials(e) {
          return ((this.materials = e), this);
        }
        parse(e) {
          let t = new f();
          (-1 !== e.indexOf("\r\n") && (e = e.replace(/\r\n/g, "\n")),
            -1 !== e.indexOf("\\\n") && (e = e.replace(/\\\n/g, "")));
          let s = e.split("\n"),
            h = [];
          for (let e = 0, c = s.length; e < c; e++) {
            let c = s[e].trimStart();
            if (0 === c.length) continue;
            let p = c.charAt(0);
            if ("#" !== p)
              if ("v" === p) {
                let e = c.split(l);
                switch (e[0]) {
                  case "v":
                    (t.vertices.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3])),
                      e.length >= 7
                        ? (d.setRGB(parseFloat(e[4]), parseFloat(e[5]), parseFloat(e[6]), i.er$),
                          t.colors.push(d.r, d.g, d.b))
                        : t.colors.push(void 0, void 0, void 0));
                    break;
                  case "vn":
                    t.normals.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]));
                    break;
                  case "vt":
                    t.uvs.push(parseFloat(e[1]), parseFloat(e[2]));
                }
              } else if ("f" === p) {
                let e = c.slice(1).trim().split(l),
                  s = [];
                for (let t = 0, i = e.length; t < i; t++) {
                  let i = e[t];
                  if (i.length > 0) {
                    let e = i.split("/");
                    s.push(e);
                  }
                }
                let i = s[0];
                for (let e = 1, r = s.length - 1; e < r; e++) {
                  let r = s[e],
                    a = s[e + 1];
                  t.addFace(i[0], r[0], a[0], i[1], r[1], a[1], i[2], r[2], a[2]);
                }
              } else if ("l" === p) {
                let e = c.substring(1).trim().split(" "),
                  s = [],
                  i = [];
                if (-1 === c.indexOf("/")) s = e;
                else
                  for (let t = 0, r = e.length; t < r; t++) {
                    let r = e[t].split("/");
                    ("" !== r[0] && s.push(r[0]), "" !== r[1] && i.push(r[1]));
                  }
                t.addLineGeometry(s, i);
              } else if ("p" === p) {
                let e = c.slice(1).trim().split(" ");
                t.addPointGeometry(e);
              } else if (null !== (h = r.exec(c))) {
                let e = (" " + h[0].slice(1).trim()).slice(1);
                t.startObject(e);
              } else if (o.test(c))
                t.object.startMaterial(c.substring(7).trim(), t.materialLibraries);
              else if (a.test(c)) t.materialLibraries.push(c.substring(7).trim());
              else if (n.test(c))
                console.warn(
                  'THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.',
                );
              else if ("s" === p) {
                if ((h = c.split(" ")).length > 1) {
                  let e = h[1].trim().toLowerCase();
                  t.object.smooth = "0" !== e && "off" !== e;
                } else t.object.smooth = !0;
                let e = t.object.currentMaterial();
                e && (e.smooth = t.object.smooth);
              } else {
                if ("\0" === c) continue;
                console.warn('THREE.OBJLoader: Unexpected line: "' + c + '"');
              }
          }
          t.finalize();
          let c = new i.YJl();
          if (
            ((c.materialLibraries = [].concat(t.materialLibraries)),
            !0 == (1 !== t.objects.length || 0 !== t.objects[0].geometry.vertices.length))
          )
            for (let e = 0, s = t.objects.length; e < s; e++) {
              let s,
                r = t.objects[e],
                a = r.geometry,
                o = r.materials,
                n = "Line" === a.type,
                l = "Points" === a.type,
                h = !1;
              if (0 === a.vertices.length) continue;
              let p = new i.LoY();
              (p.setAttribute("position", new i.qtW(a.vertices, 3)),
                a.normals.length > 0 && p.setAttribute("normal", new i.qtW(a.normals, 3)),
                a.colors.length > 0 && ((h = !0), p.setAttribute("color", new i.qtW(a.colors, 3))),
                !0 === a.hasUVIndices && p.setAttribute("uv", new i.qtW(a.uvs, 2)));
              let u = [];
              for (let e = 0, s = o.length; e < s; e++) {
                let s = o[e],
                  r = s.name + "_" + s.smooth + "_" + h,
                  a = t.materials[r];
                if (null !== this.materials)
                  if (((a = this.materials.create(s.name)), !n || !a || a instanceof i.mrM)) {
                    if (l && a && !(a instanceof i.BH$)) {
                      let e = new i.BH$({ size: 10, sizeAttenuation: !1 });
                      (i.imn.prototype.copy.call(e, a),
                        e.color.copy(a.color),
                        (e.map = a.map),
                        (a = e));
                    }
                  } else {
                    let e = new i.mrM();
                    (i.imn.prototype.copy.call(e, a), e.color.copy(a.color), (a = e));
                  }
                (void 0 === a &&
                  (((a = n
                    ? new i.mrM()
                    : l
                      ? new i.BH$({ size: 1, sizeAttenuation: !1 })
                      : new i.tXL()).name = s.name),
                  (a.flatShading = !s.smooth),
                  (a.vertexColors = h),
                  (t.materials[r] = a)),
                  u.push(a));
              }
              if (u.length > 1) {
                for (let e = 0, t = o.length; e < t; e++) {
                  let t = o[e];
                  p.addGroup(t.groupStart, t.groupCount, e);
                }
                s = n ? new i.DXC(p, u) : l ? new i.ONl(p, u) : new i.eaF(p, u);
              } else s = n ? new i.DXC(p, u[0]) : l ? new i.ONl(p, u[0]) : new i.eaF(p, u[0]);
              ((s.name = r.name), c.add(s));
            }
          else if (t.vertices.length > 0) {
            let e = new i.BH$({ size: 1, sizeAttenuation: !1 }),
              s = new i.LoY();
            (s.setAttribute("position", new i.qtW(t.vertices, 3)),
              t.colors.length > 0 &&
                void 0 !== t.colors[0] &&
                (s.setAttribute("color", new i.qtW(t.colors, 3)), (e.vertexColors = !0)));
            let r = new i.ONl(s, e);
            c.add(r);
          }
          return c;
        }
      }
    },
    44777: (e, t, s) => {
      s.d(t, { V: () => r });
      var i = s(85339);
      class r extends i.aHM {
        constructor(e) {
          super(e);
        }
        load(e, t, s, r) {
          let a = this,
            o = "" === this.path ? i.r6x.extractUrlBase(e) : this.path,
            n = new i.Y9S(this.manager);
          (n.setPath(this.path),
            n.setRequestHeader(this.requestHeader),
            n.setWithCredentials(this.withCredentials),
            n.load(
              e,
              function (s) {
                try {
                  t(a.parse(s, o));
                } catch (t) {
                  (r ? r(t) : console.error(t), a.manager.itemError(e));
                }
              },
              s,
              r,
            ));
        }
        setMaterialOptions(e) {
          return ((this.materialOptions = e), this);
        }
        parse(e, t) {
          let s = e.split("\n"),
            i = {},
            r = /\s+/,
            o = {};
          for (let e = 0; e < s.length; e++) {
            let t = s[e];
            if (0 === (t = t.trim()).length || "#" === t.charAt(0)) continue;
            let a = t.indexOf(" "),
              n = a >= 0 ? t.substring(0, a) : t;
            n = n.toLowerCase();
            let l = a >= 0 ? t.substring(a + 1) : "";
            if (((l = l.trim()), "newmtl" === n)) ((i = { name: l }), (o[l] = i));
            else if ("ka" === n || "kd" === n || "ks" === n || "ke" === n) {
              let e = l.split(r, 3);
              i[n] = [parseFloat(e[0]), parseFloat(e[1]), parseFloat(e[2])];
            } else i[n] = l;
          }
          let n = new a(this.resourcePath || t, this.materialOptions);
          return (
            n.setCrossOrigin(this.crossOrigin),
            n.setManager(this.manager),
            n.setMaterials(o),
            n
          );
        }
      }
      class a {
        constructor(e = "", t = {}) {
          ((this.baseUrl = e),
            (this.options = t),
            (this.materialsInfo = {}),
            (this.materials = {}),
            (this.materialsArray = []),
            (this.nameLookup = {}),
            (this.crossOrigin = "anonymous"),
            (this.side = void 0 !== this.options.side ? this.options.side : i.hB5),
            (this.wrap = void 0 !== this.options.wrap ? this.options.wrap : i.GJx));
        }
        setCrossOrigin(e) {
          return ((this.crossOrigin = e), this);
        }
        setManager(e) {
          this.manager = e;
        }
        setMaterials(e) {
          ((this.materialsInfo = this.convert(e)),
            (this.materials = {}),
            (this.materialsArray = []),
            (this.nameLookup = {}));
        }
        convert(e) {
          if (!this.options) return e;
          let t = {};
          for (let s in e) {
            let i = e[s],
              r = {};
            for (let e in ((t[s] = r), i)) {
              let t = !0,
                s = i[e],
                a = e.toLowerCase();
              switch (a) {
                case "kd":
                case "ka":
                case "ks":
                  (this.options &&
                    this.options.normalizeRGB &&
                    (s = [s[0] / 255, s[1] / 255, s[2] / 255]),
                    this.options &&
                      this.options.ignoreZeroRGBs &&
                      0 === s[0] &&
                      0 === s[1] &&
                      0 === s[2] &&
                      (t = !1));
              }
              t && (r[a] = s);
            }
          }
          return t;
        }
        preload() {
          for (let e in this.materialsInfo) this.create(e);
        }
        getIndex(e) {
          return this.nameLookup[e];
        }
        getAsArray() {
          let e = 0;
          for (let t in this.materialsInfo)
            ((this.materialsArray[e] = this.create(t)), (this.nameLookup[t] = e), e++);
          return this.materialsArray;
        }
        create(e) {
          return (void 0 === this.materials[e] && this.createMaterial_(e), this.materials[e]);
        }
        createMaterial_(e) {
          let t = this,
            s = this.materialsInfo[e],
            r = { name: e, side: this.side };
          function a(e, s) {
            var a, o;
            if (r[e]) return;
            let n = t.getTextureParams(s, r),
              l = t.loadTexture(
                ((a = t.baseUrl),
                "string" != typeof (o = n.url) || "" === o
                  ? ""
                  : /^https?:\/\//i.test(o)
                    ? o
                    : a + o),
              );
            (l.repeat.copy(n.scale),
              l.offset.copy(n.offset),
              (l.wrapS = t.wrap),
              (l.wrapT = t.wrap),
              ("map" === e || "emissiveMap" === e) && (l.colorSpace = i.er$),
              (r[e] = l));
          }
          for (let e in s) {
            let t,
              o = s[e];
            if ("" !== o)
              switch (e.toLowerCase()) {
                case "kd":
                  r.color = i.ppV.colorSpaceToWorking(new i.Q1f().fromArray(o), i.er$);
                  break;
                case "ks":
                  r.specular = i.ppV.colorSpaceToWorking(new i.Q1f().fromArray(o), i.er$);
                  break;
                case "ke":
                  r.emissive = i.ppV.colorSpaceToWorking(new i.Q1f().fromArray(o), i.er$);
                  break;
                case "map_kd":
                  a("map", o);
                  break;
                case "map_ks":
                  a("specularMap", o);
                  break;
                case "map_ke":
                  a("emissiveMap", o);
                  break;
                case "norm":
                  a("normalMap", o);
                  break;
                case "map_bump":
                case "bump":
                  a("bumpMap", o);
                  break;
                case "disp":
                  a("displacementMap", o);
                  break;
                case "map_d":
                  (a("alphaMap", o), (r.transparent = !0));
                  break;
                case "ns":
                  r.shininess = parseFloat(o);
                  break;
                case "d":
                  (t = parseFloat(o)) < 1 && ((r.opacity = t), (r.transparent = !0));
                  break;
                case "tr":
                  ((t = parseFloat(o)),
                    this.options && this.options.invertTrProperty && (t = 1 - t),
                    t > 0 && ((r.opacity = 1 - t), (r.transparent = !0)));
              }
          }
          return ((this.materials[e] = new i.tXL(r)), this.materials[e]);
        }
        getTextureParams(e, t) {
          let s,
            r = { scale: new i.I9Y(1, 1), offset: new i.I9Y(0, 0) },
            a = e.split(/\s+/);
          return (
            (s = a.indexOf("-bm")) >= 0 && ((t.bumpScale = parseFloat(a[s + 1])), a.splice(s, 2)),
            (s = a.indexOf("-mm")) >= 0 &&
              ((t.displacementBias = parseFloat(a[s + 1])),
              (t.displacementScale = parseFloat(a[s + 2])),
              a.splice(s, 3)),
            (s = a.indexOf("-s")) >= 0 &&
              (r.scale.set(parseFloat(a[s + 1]), parseFloat(a[s + 2])), a.splice(s, 4)),
            (s = a.indexOf("-o")) >= 0 &&
              (r.offset.set(parseFloat(a[s + 1]), parseFloat(a[s + 2])), a.splice(s, 4)),
            (r.url = a.join(" ").trim()),
            r
          );
        }
        loadTexture(e, t, s, r, a) {
          let o = void 0 !== this.manager ? this.manager : i.h_9,
            n = o.getHandler(e);
          (null === n && (n = new i.Tap(o)),
            n.setCrossOrigin && n.setCrossOrigin(this.crossOrigin));
          let l = n.load(e, s, r, a);
          return (void 0 !== t && (l.mapping = t), l);
        }
      }
    },
  },
]);

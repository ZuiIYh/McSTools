(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4180],
  {
    46: (e, t, s) => {
      "use strict";
      s.d(t, { CR: () => i, Ud: () => n, qq: () => a, uU: () => r, wK: () => l });
      let l = 50,
        n = 0x3200000,
        a = 25;
      function r(e) {
        return !Number.isFinite(e) || e <= 0
          ? "0MB"
          : "".concat((e / 1024 / 1024).toFixed(1), "MB");
      }
      function i(e) {
        return !e || e <= 0x1900000
          ? null
          : "当前投影原文件约 "
              .concat(r(e), "，账号保存上限约 ")
              .concat(a, "MB；请先导出投影文件保存在本地，或压缩/拆分后再保存到账户。");
      }
    },
    7882: (e, t, s) => {
      "use strict";
      s.d(t, { parseProjectionBuffer: () => o, parseProjectionFile: () => i, up: () => d });
      var l = s(70144),
        n = s(41845),
        a = s(46);
      let r = [".litematic", ".schem"];
      async function i(e) {
        if (e.size > a.Ud)
          throw Error(
            "文件过大 (".concat((0, a.uU)(e.size), ")，本地打开最大支持 ").concat(a.wK, "MB"),
          );
        let t = c(e.name);
        if (!r.includes(t))
          throw Error("不支持的文件格式: ".concat(t, "\n支持: ").concat(r.join(", ")));
        return o(await e.arrayBuffer(), e.name);
      }
      async function o(e, t) {
        let s = c(t);
        if (!r.includes(s))
          throw Error("不支持的文件格式: ".concat(s, "\n支持: ").concat(r.join(", ")));
        switch (s) {
          case ".litematic":
            return (0, l.e)(e, t);
          case ".schem":
            return (0, n.g)(e, t);
          default:
            throw Error("不支持的文件格式: ".concat(s));
        }
      }
      function c(e) {
        let t = e.split(/[?#]/, 1)[0].trim().toLowerCase();
        if (!t) return "";
        if (t.startsWith(".") && !t.slice(1).includes(".")) return t;
        if (!t.includes(".") && /^[a-z0-9]+$/.test(t)) return ".".concat(t);
        let s = t.lastIndexOf(".");
        return -1 === s ? "" : t.substring(s);
      }
      function d(e) {
        let t = c(e);
        return r.includes(t);
      }
    },
    16010: (e, t, s) => {
      "use strict";
      s.d(t, { d: () => n });
      let l = "/static";
      function n(e) {
        return l ? "".concat(l).concat(e) : e;
      }
    },
    25828: (e, t, s) => {
      "use strict";
      s.d(t, { E: () => c });
      var l = s(95155),
        n = s(12115),
        a = s(25016);
      let r = {
          neutral: "border-border-hard bg-bg-inset text-text-primary",
          brand: "border-brand-primary bg-brand-primary/15 text-brand-primary",
          success: "border-success bg-success/15 text-success",
          warning: "border-warning bg-warning/15 text-warning",
          danger: "border-error bg-error/15 text-error",
          info: "border-info bg-info/15 text-info",
          expert: "border-difficulty-expert bg-difficulty-expert/15 text-difficulty-expert",
          free: "border-tag-free bg-tag-free/15 text-tag-free",
          featured: "border-tag-featured bg-tag-featured/15 text-tag-featured",
          beginner: "border-tag-beginner bg-tag-beginner/15 text-tag-beginner",
          master: "border-tag-master bg-tag-master/15 text-tag-master",
          category: "border-tag-category bg-tag-category/15 text-tag-category",
          accent: "border-brand-accent bg-brand-accent/15 text-brand-accent",
        },
        i = {
          neutral: "border-border-hard bg-bg-inset text-text-primary",
          brand: "border-border-hard bg-brand-primary text-text-on-brand",
          success: "border-border-hard bg-success text-text-on-brand",
          warning: "border-border-hard bg-warning text-text-on-brand",
          danger: "border-border-hard bg-error text-text-primary",
          info: "border-border-hard bg-info text-text-primary",
          expert: "border-border-hard bg-difficulty-expert text-text-primary",
          free: "border-border-hard bg-tag-free text-text-on-brand",
          featured: "border-border-hard bg-tag-featured text-text-on-brand",
          beginner: "border-border-hard bg-tag-beginner text-text-primary",
          master: "border-border-hard bg-tag-master text-text-primary",
          category: "border-border-hard bg-tag-category text-text-on-brand",
          accent: "border-border-hard bg-brand-accent text-text-on-brand",
        },
        o = {
          sm: "h-6 px-2 text-xs [&_svg]:h-3 [&_svg]:w-3",
          md: "h-7 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
        },
        c = n.forwardRef((e, t) => {
          let {
            tone: s = "neutral",
            variant: n = "soft",
            size: c = "sm",
            icon: d,
            className: u,
            children: m,
            ...x
          } = e;
          return (0, l.jsxs)("span", {
            ref: t,
            className: (0, a.cn)(
              "box-border inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-none border-2 font-body font-bold leading-none shadow-none",
              o[c],
              "solid" === n ? i[s] : r[s],
              "solid" === n && "shadow-block-xs",
              u,
            ),
            tabIndex: -1,
            "data-control-kind": "badge",
            "data-control-size": c,
            "data-control-variant": n,
            ...x,
            children: [d, m],
          });
        });
      c.displayName = "Badge";
    },
    52398: (e, t, s) => {
      "use strict";
      function l(e, t) {
        let s = (e) => e.replace("minecraft:", ""),
          l = s(e),
          n = s(t);
        if (
          (l.endsWith("_door") && n.endsWith("_door")) ||
          (l.endsWith("_bed") && n.endsWith("_bed")) ||
          (l.endsWith("_stairs") && n.endsWith("_stairs")) ||
          (l.endsWith("_slab") && n.endsWith("_slab")) ||
          (l.endsWith("_fence") && n.endsWith("_fence")) ||
          (l.endsWith("_fence_gate") && n.endsWith("_fence_gate")) ||
          (l.endsWith("_trapdoor") && n.endsWith("_trapdoor")) ||
          (l.endsWith("_wall") && n.endsWith("_wall")) ||
          (l.endsWith("_button") && n.endsWith("_button")) ||
          (l.endsWith("_pressure_plate") && n.endsWith("_pressure_plate")) ||
          ((l.endsWith("_log") || l.endsWith("_wood")) &&
            (n.endsWith("_log") || n.endsWith("_wood"))) ||
          (l.endsWith("_planks") && n.endsWith("_planks")) ||
          (l.endsWith("_leaves") && n.endsWith("_leaves")) ||
          (l.endsWith("_sign") && n.endsWith("_sign")) ||
          (l.endsWith("_shulker_box") && n.endsWith("_shulker_box")) ||
          (l.endsWith("_glazed_terracotta") && n.endsWith("_glazed_terracotta"))
        )
          return !0;
        let a = new Set(["chest", "trapped_chest"]);
        return a.has(l) && a.has(n);
      }
      function n(e, t) {
        let s = new Set(t.positions.map(r)),
          n = l(t.fromBlockId, t.toBlockId);
        for (let l of e)
          s.has(r(l.position)) &&
            l.blockId === t.fromBlockId &&
            ((l.blockId = t.toBlockId), n || (l.properties = {}));
      }
      function a(e, t) {
        let s = new Set(t.positions.map(r)),
          n = l(t.toBlockId, t.fromBlockId);
        for (let l of e)
          s.has(r(l.position)) &&
            l.blockId === t.toBlockId &&
            ((l.blockId = t.fromBlockId), n || (l.properties = {}));
      }
      function r(e) {
        return "".concat(e[0], ",").concat(e[1], ",").concat(e[2]);
      }
      s.d(t, { CQ: () => a, ym: () => n });
    },
    53486: (e, t, s) => {
      "use strict";
      s.d(t, { S: () => p, a: () => x });
      var l = s(95155),
        n = s(12115),
        a = s(2186),
        r = s(61456),
        i = s(67812),
        o = s(44748),
        c = s(71442);
      let d = (0, n.createContext)(null);
      function u(e) {
        let { object: t } = e;
        return (0, l.jsxs)("div", {
          className:
            "mt-4 flex items-center gap-3 border-2 border-border-hard bg-bg-inset p-3 shadow-block-xs",
          children: [
            t.thumbnail &&
              (0, l.jsx)("div", {
                className:
                  "h-[58px] w-[76px] shrink-0 overflow-hidden border-2 border-border-hard bg-bg-deep",
                children:
                  "string" == typeof t.thumbnail
                    ? (0, l.jsx)("img", {
                        src: t.thumbnail,
                        alt: "",
                        className: "h-full w-full object-cover",
                      })
                    : t.thumbnail,
              }),
            (0, l.jsxs)("div", {
              className: "min-w-0",
              children: [
                (0, l.jsx)("div", {
                  className: "truncate text-sm font-black text-text-primary",
                  children: t.name,
                }),
                t.meta &&
                  (0, l.jsx)("div", {
                    className: "mt-1 font-pixel text-xs text-text-muted",
                    children: t.meta,
                  }),
              ],
            }),
          ],
        });
      }
      function m(e) {
        let { request: t, onSettle: s } = e,
          {
            title: n,
            subtitle: i,
            body: o,
            confirmText: d = "确认执行",
            cancelText: u = "取消",
          } = t.options;
        return (0, l.jsxs)(c.a, {
          open: !0,
          onClose: () => s(!1),
          size: "md",
          maskClosable: !1,
          closable: !1,
          bodyClassName: "!max-h-[88vh] !p-0",
          className: "!max-w-[460px] !bg-bg-card",
          children: [
            (0, l.jsxs)("div", {
              className: "flex items-center gap-2.5 border-b-2 border-border-hard px-4 py-3.5",
              children: [
                (0, l.jsx)("span", {
                  className: "h-[15px] w-[3px] shrink-0 border-2 border-border-hard bg-warning",
                }),
                (0, l.jsxs)("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    (0, l.jsx)("h3", {
                      className: "text-base font-black text-text-primary",
                      children: n,
                    }),
                    i &&
                      (0, l.jsx)("div", {
                        className: "mt-0.5 text-[11px] font-bold leading-relaxed text-text-muted",
                        children: i,
                      }),
                  ],
                }),
                (0, l.jsx)("button", {
                  type: "button",
                  onClick: () => s(!1),
                  className:
                    "grid h-7 w-7 shrink-0 place-items-center text-text-muted transition-colors hover:text-error",
                  "aria-label": "关闭",
                  children: (0, l.jsx)(a.A, { size: 16 }),
                }),
              ],
            }),
            (0, l.jsx)("div", {
              className: "px-[18px] py-4 text-sm font-bold leading-relaxed text-text-secondary",
              children: o,
            }),
            (0, l.jsxs)("div", {
              className:
                "flex items-center justify-end gap-2 border-t-2 border-border-hard px-4 py-3.5",
              children: [
                null !== u &&
                  (0, l.jsx)("button", {
                    type: "button",
                    onClick: () => s(!1),
                    className:
                      "h-9 border-2 border-border-hard bg-bg-inset px-4 text-sm font-black text-text-secondary transition-colors hover:text-text-primary",
                    children: u,
                  }),
                (0, l.jsxs)("button", {
                  type: "button",
                  onClick: () => s(!0),
                  className:
                    "inline-flex h-9 items-center gap-1.5 border-2 border-border-hard bg-error px-4 text-sm font-black text-white shadow-block-sm transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-block",
                  children: [(0, l.jsx)(r.A, { size: 13 }), d],
                }),
              ],
            }),
          ],
        });
      }
      function x(e) {
        var t, s, a;
        let { children: r } = e,
          x = (0, n.useRef)(0),
          [p, h] = (0, n.useState)([]),
          b = p[0],
          f = (0, n.useCallback)(
            (e) =>
              new Promise((t) => {
                ((x.current += 1), h((s) => [...s, { id: x.current, options: e, resolve: t }]));
              }),
            [],
          ),
          g = (0, n.useCallback)(
            (e) => {
              b &&
                (b.resolve(e),
                h((e) => {
                  var t;
                  return (null == (t = e[0]) ? void 0 : t.id) === b.id ? e.slice(1) : e;
                }));
            },
            [b],
          ),
          j = null != (t = null == b ? void 0 : b.options.tone) ? t : "info",
          y = "info" === j ? i.A : o.A;
        return (0, l.jsxs)(d.Provider, {
          value: f,
          children: [
            r,
            b && "editor" === b.options.skin
              ? (0, l.jsx)(m, { request: b, onSettle: g }, b.id)
              : b
                ? (0, l.jsxs)(
                    c.a,
                    {
                      open: !0,
                      onClose: () => g(!1),
                      title: b.options.title,
                      subtitle: b.options.subtitle,
                      icon: (0, l.jsx)(y, { size: 20 }),
                      iconTone: j,
                      size: "md",
                      maskClosable: "danger" !== j,
                      closable: "danger" !== j,
                      footer: (0, l.jsxs)(l.Fragment, {
                        children: [
                          null !== b.options.cancelText &&
                            (0, l.jsx)(c.y, {
                              variant: "ghost",
                              onClick: () => g(!1),
                              children: null != (s = b.options.cancelText) ? s : "取消",
                            }),
                          (0, l.jsx)(c.y, {
                            variant:
                              "danger" === j ? "danger" : "warning" === j ? "warning" : "primary",
                            onClick: () => g(!0),
                            children: null != (a = b.options.confirmText) ? a : "确认",
                          }),
                        ],
                      }),
                      children: [
                        b.options.object && (0, l.jsx)(u, { object: b.options.object }),
                        b.options.body &&
                          (0, l.jsx)("div", {
                            className: "".concat(
                              b.options.object ? "mt-4" : "",
                              " text-sm font-bold leading-relaxed text-text-secondary",
                            ),
                            children: b.options.body,
                          }),
                      ],
                    },
                    b.id,
                  )
                : null,
          ],
        });
      }
      function p() {
        let e = (0, n.useContext)(d);
        if (!e) throw Error("useConfirm 必须在 ConfirmProvider 内使用");
        return e;
      }
    },
    59403: () => {},
    59431: (e, t, s) => {
      "use strict";
      s.d(t, { K2: () => r, KO: () => a });
      let l = new Set(["marker", "interaction"]);
      function n(e) {
        return String(Math.round(1e3 * e) / 1e3 + 0);
      }
      function a(e) {
        return !("generic" === e.kind || l.has(e.kind));
      }
      function r(e) {
        let t = new Map(),
          s = [];
        for (let a of e) {
          var l;
          let [e, r, i] = a.position,
            o = ""
              .concat("e:")
              .concat(a.kind, "@")
              .concat(n(e), ",")
              .concat(n(r), ",")
              .concat(n(i)),
            c = null != (l = t.get(o)) ? l : 0;
          (t.set(o, c + 1), s.push("".concat(o, "#").concat(c)));
        }
        return s;
      }
    },
    62035: (e, t, s) => {
      "use strict";
      s.d(t, { c: () => n });
      let l = {
        "minecraft:snow": "layers",
        "minecraft:sea_pickle": "pickles",
        "minecraft:turtle_egg": "eggs",
        "minecraft:pink_petals": "flower_amount",
      };
      function n(e, t) {
        if (!t) return 1;
        if (e.endsWith("_slab") && "double" === t.type) return 2;
        let s = e.endsWith("candle") ? t.candles : void 0,
          n = l[e],
          a = null != s ? s : n ? t[n] : void 0;
        if (null == a) return 1;
        let r = Number.parseInt(a, 10);
        return Number.isFinite(r) && r > 1 ? r : 1;
      }
    },
    63092: (e, t, s) => {
      "use strict";
      (s.r(t), s.d(t, { default: () => t8 }));
      var l = s(95155),
        n = s(12115),
        a = s(20063),
        r = s(85339),
        i = s(59040),
        o = s(30258),
        c = s(69336),
        d = s(90724),
        u = s(5838),
        m = s(45360),
        x = s(4336),
        p = s(95293),
        h = s(52398),
        b = s(37578),
        f = s(55671);
      function g(e, t) {
        return (
          e.source === t.source &&
          e.originalFileData === t.originalFileData &&
          e.replacements === t.replacements &&
          e.undoStack === t.undoStack &&
          e.redoStack === t.redoStack &&
          e.hasStructuralEdits === t.hasStructuralEdits &&
          e.hasUntrackedStructuralEdits === t.hasUntrackedStructuralEdits
        );
      }
      let j = {
        source: null,
        selectedBlock: null,
        selectedPositions: new Set(),
        materialStats: [],
        highlightedBlockId: null,
        loading: "idle",
        error: null,
        replacements: [],
        hasStructuralEdits: !1,
        hasUntrackedStructuralEdits: !1,
        undoStack: [],
        redoStack: [],
        savedHistoryDepth: 0,
        savedHistoryMarker: null,
        isModified: !1,
        originalFileData: null,
        hiddenLayers: new Set(),
        hiddenPositions: new Set(),
        layerCutoff: null,
        layerMode: "slice",
      };
      function y(e) {
        let t = new Map();
        for (let s of e) t.set(s.blockId, (t.get(s.blockId) || 0) + 1);
        let s = e.length,
          l = [];
        for (let [e, n] of t.entries()) {
          let t = (0, p.getBlockTexture)(e);
          l.push({
            blockId: e,
            chineseName: t.chineseName,
            englishName: t.englishName,
            textureUrl: t.textureUrl,
            count: n,
            percentage: s > 0 ? (n / s) * 100 : 0,
          });
        }
        return (l.sort((e, t) => t.count - e.count), l);
      }
      function v(e) {
        return e.length > 0 ? e[e.length - 1].timestamp : null;
      }
      function k(e, t) {
        return e.length !== t.savedHistoryDepth || v(e) !== t.savedHistoryMarker;
      }
      function N(e, t) {
        return (
          t.hasUntrackedStructuralEdits ||
          e.some((e) => {
            var t, s, l;
            return (
              (null == (t = e.operation) ? void 0 : t.type) === "delete" ||
              (null == (s = e.operation) ? void 0 : s.type) === "move" ||
              (null == (l = e.operation) ? void 0 : l.type) === "transform"
            );
          })
        );
      }
      function S(e) {
        return e.map((e) => ({ ...e, position: [...e.position], properties: { ...e.properties } }));
      }
      function w(e, t, s, l, n) {
        let [a, r, i] = e;
        return (
          !(t.has(r) || s.has("".concat(a, ",").concat(r, ",").concat(i))) &&
          (null == l || ("gallery" === n ? r === l : r <= l))
        );
      }
      function E(e) {
        var t;
        let s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.hiddenLayers,
          l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.hiddenPositions,
          n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e.layerCutoff,
          a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : e.layerMode,
          r = e.selectedBlock && w(e.selectedBlock.position, s, l, n, a) ? e.selectedBlock : null,
          i = new Set();
        for (let t of e.selectedPositions) {
          let [e, r, o] = t.split(",").map(Number);
          ![e, r, o].some(Number.isNaN) && w([e, r, o], s, l, n, a) && i.add(t);
        }
        if (!r && i.size > 0 && (null == (t = e.source) ? void 0 : t.type) === "projection")
          for (let t of e.source.voxelModel.blocks) {
            let e = "".concat(t.position[0], ",").concat(t.position[1], ",").concat(t.position[2]);
            if (i.has(e)) {
              r = { blockId: t.blockId, position: t.position };
              break;
            }
          }
        return { selectedBlock: r, selectedPositions: i };
      }
      function C(e, t) {
        var s, l, n, a, r, i, o, c, d, u, m, x, p;
        switch (t.type) {
          case "SET_SOURCE":
            return {
              ...e,
              source: t.payload,
              error: null,
              hasStructuralEdits: !1,
              hasUntrackedStructuralEdits: !1,
              savedHistoryDepth: 0,
              savedHistoryMarker: null,
            };
          case "RESTORE_SESSION":
            return {
              ...j,
              source: { type: "projection", voxelModel: t.payload.voxelModel },
              replacements: t.payload.replacements,
              undoStack: t.payload.undoStack,
              redoStack: t.payload.redoStack,
              savedHistoryDepth: t.payload.savedHistoryDepth,
              savedHistoryMarker: t.payload.savedHistoryMarker,
              isModified: t.payload.isModified,
              hasStructuralEdits: t.payload.hasStructuralEdits,
              hasUntrackedStructuralEdits: t.payload.hasUntrackedStructuralEdits,
              loading: "rendering",
            };
          case "SET_SELECTED_BLOCK":
            return { ...e, selectedBlock: t.payload };
          case "SET_MATERIAL_STATS":
            return { ...e, materialStats: t.payload };
          case "SET_HIGHLIGHTED_BLOCK":
            return { ...e, highlightedBlockId: t.payload };
          case "SET_REPLACEMENTS":
            return { ...e, replacements: t.payload };
          case "SET_LOADING":
            return { ...e, loading: t.payload };
          case "SET_ERROR":
            return { ...e, error: t.payload, loading: "idle" };
          case "SET_MODEL_NAME":
            if (!e.source || "projection" !== e.source.type) return e;
            return {
              ...e,
              source: {
                type: "projection",
                voxelModel: { ...e.source.voxelModel, name: t.payload },
              },
            };
          case "SET_ORIGINAL_FILE":
            return { ...e, originalFileData: t.payload };
          case "COMMIT_MODEL_AS_ORIGINAL":
            if (!g(e, t.snapshot)) return e;
            if (!e.source || "projection" !== e.source.type)
              return {
                ...e,
                originalFileData: t.payload.originalFileData,
                savedHistoryDepth: 0,
                savedHistoryMarker: null,
                hasStructuralEdits: !1,
                hasUntrackedStructuralEdits: !1,
                isModified: !1,
              };
            return {
              ...e,
              source: {
                type: "projection",
                voxelModel: {
                  ...(null != (s = t.payload.voxelModel) ? s : e.source.voxelModel),
                  name: null != (l = t.payload.name) ? l : e.source.voxelModel.name,
                  format: t.payload.format,
                },
              },
              originalFileData: t.payload.originalFileData,
              materialStats: y(
                (null != (n = t.payload.voxelModel) ? n : e.source.voxelModel).blocks,
              ),
              selectedBlock: null,
              selectedPositions: new Set(),
              hiddenLayers: new Set(),
              hiddenPositions: new Set(),
              layerCutoff: null,
              replacements: [],
              undoStack: [],
              redoStack: [],
              savedHistoryDepth: 0,
              savedHistoryMarker: null,
              hasStructuralEdits: !1,
              hasUntrackedStructuralEdits: !1,
              isModified: !1,
            };
          case "SET_SELECTED_POSITIONS":
            return { ...e, selectedPositions: t.payload };
          case "ADD_SELECTED_POSITIONS": {
            let s = new Set(e.selectedPositions);
            for (let e of t.payload) s.add(e);
            return { ...e, selectedPositions: s };
          }
          case "CLEAR_SELECTION":
            return { ...e, selectedBlock: null, selectedPositions: new Set() };
          case "TOGGLE_LAYER_VISIBILITY": {
            let s = new Set(e.hiddenLayers);
            return (
              s.has(t.payload) ? s.delete(t.payload) : s.add(t.payload),
              { ...e, hiddenLayers: s, ...E(e, s) }
            );
          }
          case "HIDE_SELECTED":
            if (0 === e.selectedPositions.size && !e.selectedBlock) return e;
            return {
              ...e,
              ...(function (e, t, s) {
                let l = new Set(e);
                for (let e of (t && l.add(t.position.join(",")), s)) l.add(e);
                return {
                  hiddenPositions: l,
                  selectedBlock: null,
                  selectedPositions: new Set(),
                  highlightedBlockId: null,
                };
              })(e.hiddenPositions, e.selectedBlock, e.selectedPositions),
            };
          case "SHOW_ONLY_SELECTED": {
            if (
              !e.source ||
              "projection" !== e.source.type ||
              (0 === e.selectedPositions.size && !e.selectedBlock)
            )
              return e;
            let t = new Set(e.selectedPositions);
            e.selectedBlock &&
              t.add(
                ""
                  .concat(e.selectedBlock.position[0], ",")
                  .concat(e.selectedBlock.position[1], ",")
                  .concat(e.selectedBlock.position[2]),
              );
            let s = new Set();
            for (let t of e.source.voxelModel.blocks)
              s.add("".concat(t.position[0], ",").concat(t.position[1], ",").concat(t.position[2]));
            let l = new Set();
            for (let e of s) t.has(e) || l.add(e);
            return { ...e, hiddenPositions: l, hiddenLayers: new Set() };
          }
          case "SHOW_ONLY_MATERIAL": {
            if (!e.source || "projection" !== e.source.type) return e;
            let s = t.payload.replace("minecraft:", ""),
              l = new Set(),
              n = 0;
            for (let a of e.source.voxelModel.blocks) {
              if (a.blockId === t.payload || a.blockId.replace("minecraft:", "") === s) {
                n++;
                continue;
              }
              l.add("".concat(a.position[0], ",").concat(a.position[1], ",").concat(a.position[2]));
            }
            if (0 === n) return e;
            return { ...e, hiddenPositions: l, hiddenLayers: new Set(), ...E(e, new Set(), l) };
          }
          case "UNHIDE_ALL":
            return { ...e, hiddenPositions: new Set(), hiddenLayers: new Set() };
          case "DELETE_BLOCKS": {
            if (!e.source || "projection" !== e.source.type) return e;
            let s = e.source.voxelModel,
              l = new Set(
                t.payload.positions.map((e) => "".concat(e[0], ",").concat(e[1], ",").concat(e[2])),
              ),
              n = s.blocks.filter((e) =>
                l.has(
                  "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                ),
              );
            if (0 === n.length) return e;
            let a = s.blocks.filter(
                (e) =>
                  !l.has(
                    "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                  ),
              ),
              r = new Set(a.map((e) => e.blockId)),
              i = { ...s, blocks: a, blockTypeCount: r.size, totalBlockCount: a.length },
              o = y(a);
            return {
              ...e,
              source: { type: "projection", voxelModel: i },
              materialStats: o,
              undoStack: [
                ...e.undoStack,
                { operation: { type: "delete", deletedBlocks: n }, timestamp: Date.now() },
              ],
              redoStack: [],
              isModified: !0,
              hasStructuralEdits: !0,
              selectedBlock: null,
              selectedPositions: new Set(),
              highlightedBlockId: null,
            };
          }
          case "MOVE_BLOCKS": {
            if (!e.source || "projection" !== e.source.type) return e;
            let s = e.source.voxelModel,
              { positions: l, offset: n } = t.payload,
              a = new Set(l.map((e) => "".concat(e[0], ",").concat(e[1], ",").concat(e[2]))),
              r = s.blocks.filter((e) =>
                a.has(
                  "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                ),
              );
            if (0 === r.length) return e;
            let i = new Set(),
              o = new Set(
                s.blocks.map((e) =>
                  "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                ),
              );
            for (let t of r) {
              let s = ""
                .concat(t.position[0] + n[0], ",")
                .concat(t.position[1] + n[1], ",")
                .concat(t.position[2] + n[2]);
              if (o.has(s) && !a.has(s)) return e;
              i.add(s);
            }
            let c = [],
              d = s.blocks.map((e) => {
                let t = ""
                  .concat(e.position[0], ",")
                  .concat(e.position[1], ",")
                  .concat(e.position[2]);
                if (a.has(t)) {
                  let t = [e.position[0] + n[0], e.position[1] + n[1], e.position[2] + n[2]];
                  return (
                    c.push({ from: [...e.position], to: t }),
                    { ...e, position: t, properties: { ...e.properties } }
                  );
                }
                return { ...e, position: [...e.position], properties: { ...e.properties } };
              }),
              u = new Set(d.map((e) => e.blockId)),
              m = { ...s, blocks: d, blockTypeCount: u.size },
              x = y(d),
              p = new Set();
            for (let e of l)
              p.add(
                ""
                  .concat(e[0] + n[0], ",")
                  .concat(e[1] + n[1], ",")
                  .concat(e[2] + n[2]),
              );
            return {
              ...e,
              source: { type: "projection", voxelModel: m },
              materialStats: x,
              undoStack: [
                ...e.undoStack,
                { operation: { type: "move", moves: c, blocks: r }, timestamp: Date.now() },
              ],
              redoStack: [],
              isModified: !0,
              hasStructuralEdits: !0,
              selectedBlock: null,
              selectedPositions: p,
              highlightedBlockId: null,
            };
          }
          case "TRANSFORM_BLOCKS": {
            if (!e.source || "projection" !== e.source.type) return e;
            let { blocks: s, size: l } = t.payload,
              n = e.source.voxelModel,
              r = new Set(s.map((e) => e.blockId)),
              i = {
                ...n,
                blocks: s,
                entities: null != (a = t.payload.entities) ? a : n.entities,
                size: null != l ? l : n.size,
                blockTypeCount: r.size,
                totalBlockCount: s.length,
              },
              o = y(s),
              c = {
                operation: {
                  type: "transform",
                  kind: t.payload.kind,
                  before: { blocks: n.blocks, entities: n.entities, size: n.size },
                  after: { blocks: s, entities: i.entities, size: i.size },
                },
                timestamp: Date.now(),
              },
              d = [...e.undoStack, c];
            return {
              ...e,
              source: { type: "projection", voxelModel: i },
              materialStats: o,
              undoStack: d,
              redoStack: [],
              isModified: !0,
              hasStructuralEdits: !0,
              selectedBlock: null,
              selectedPositions: new Set(),
              highlightedBlockId: null,
              hiddenLayers: new Set(),
              hiddenPositions: new Set(),
              layerCutoff: null,
              layerMode: "slice",
            };
          }
          case "REPLACE_BLOCK": {
            if (!e.source || "projection" !== e.source.type) return e;
            let s = (0, b.Oe)(),
              l = (0, f.O5)(t.payload.toBlockId);
            if (!s || !l || !(0, f.Yg)(l, s.blockIds) || (0, f.O5)(t.payload.fromBlockId) === l)
              return e;
            let n = { ...t.payload, toBlockId: l },
              a = e.source.voxelModel,
              r = S(a.blocks);
            (0, h.ym)(r, n);
            let i = new Set(r.map((e) => e.blockId)),
              o = { ...a, blocks: r, blockTypeCount: i.size },
              c = y(r);
            return {
              ...e,
              source: { type: "projection", voxelModel: o },
              materialStats: c,
              replacements: [...e.replacements, n],
              undoStack: [...e.undoStack, { replacement: n, timestamp: Date.now() }],
              redoStack: [],
              isModified: !0,
              selectedBlock: null,
              selectedPositions: new Set(),
              highlightedBlockId: null,
            };
          }
          case "REPLACE_BLOCKS": {
            if (!e.source || "projection" !== e.source.type) return e;
            let s = (0, b.Oe)();
            if (!s) return e;
            let l = t.payload
              .filter((e) => e.positions.length > 0)
              .map((e) => {
                let t = (0, f.O5)(e.toBlockId);
                return t ? { ...e, toBlockId: t } : null;
              });
            if (
              l.some(
                (e) =>
                  !e ||
                  !(0, f.Yg)(e.toBlockId, s.blockIds) ||
                  (0, f.O5)(e.fromBlockId) === e.toBlockId,
              )
            )
              return e;
            let n = l.filter((e) => null !== e);
            if (0 === n.length) return e;
            let a = e.source.voxelModel,
              r = S(a.blocks);
            for (let e of n) (0, h.ym)(r, e);
            let i = new Set(r.map((e) => e.blockId)),
              o = { ...a, blocks: r, blockTypeCount: i.size },
              c = y(r);
            return {
              ...e,
              source: { type: "projection", voxelModel: o },
              materialStats: c,
              replacements: [...e.replacements, ...n],
              undoStack: [
                ...e.undoStack,
                { operation: { type: "replace-batch", replacements: n }, timestamp: Date.now() },
              ],
              redoStack: [],
              isModified: !0,
              selectedBlock: null,
              selectedPositions: new Set(),
              highlightedBlockId: null,
            };
          }
          case "UNDO": {
            if (0 === e.undoStack.length || !e.source || "projection" !== e.source.type) return e;
            let t = e.undoStack[e.undoStack.length - 1],
              s = e.source.voxelModel;
            if ((null == (r = t.operation) ? void 0 : r.type) === "delete") {
              let l = [...s.blocks, ...t.operation.deletedBlocks],
                n = new Set(l.map((e) => e.blockId)),
                a = { ...s, blocks: l, blockTypeCount: n.size, totalBlockCount: l.length },
                r = y(l),
                i = e.undoStack.slice(0, -1);
              return {
                ...e,
                source: { type: "projection", voxelModel: a },
                materialStats: r,
                undoStack: i,
                redoStack: [...e.redoStack, t],
                isModified: k(i, e),
                hasStructuralEdits: N(i, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if ((null == (i = t.operation) ? void 0 : i.type) === "move") {
              let { moves: l } = t.operation,
                n = new Map();
              for (let e of l)
                n.set("".concat(e.to[0], ",").concat(e.to[1], ",").concat(e.to[2]), e.from);
              let a = s.blocks.map((e) => {
                  let t = ""
                      .concat(e.position[0], ",")
                      .concat(e.position[1], ",")
                      .concat(e.position[2]),
                    s = n.get(t);
                  return s
                    ? { ...e, position: s, properties: { ...e.properties } }
                    : { ...e, position: [...e.position], properties: { ...e.properties } };
                }),
                r = new Set(a.map((e) => e.blockId)),
                i = { ...s, blocks: a, blockTypeCount: r.size },
                o = y(a),
                c = e.undoStack.slice(0, -1);
              return {
                ...e,
                source: { type: "projection", voxelModel: i },
                materialStats: o,
                undoStack: c,
                redoStack: [...e.redoStack, t],
                isModified: k(c, e),
                hasStructuralEdits: N(c, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if (t.replacement) {
              let l = S(s.blocks);
              (0, h.CQ)(l, t.replacement);
              let n = new Set(l.map((e) => e.blockId)),
                a = { ...s, blocks: l, blockTypeCount: n.size },
                r = y(l),
                i = e.undoStack.slice(0, -1);
              return {
                ...e,
                source: { type: "projection", voxelModel: a },
                materialStats: r,
                replacements: e.replacements.slice(0, -1),
                undoStack: i,
                redoStack: [...e.redoStack, t],
                isModified: k(i, e),
                hasStructuralEdits: N(i, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if ((null == (o = t.operation) ? void 0 : o.type) === "transform") {
              let l = t.operation.before,
                n = new Set(l.blocks.map((e) => e.blockId)),
                a = {
                  ...s,
                  blocks: l.blocks,
                  entities: l.entities,
                  size: l.size,
                  blockTypeCount: n.size,
                  totalBlockCount: l.blocks.length,
                },
                r = e.undoStack.slice(0, -1);
              return {
                ...e,
                source: { type: "projection", voxelModel: a },
                materialStats: y(l.blocks),
                undoStack: r,
                redoStack: [...e.redoStack, t],
                isModified: k(r, e),
                hasStructuralEdits: N(r, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if ((null == (c = t.operation) ? void 0 : c.type) === "replace-batch") {
              let l = S(s.blocks);
              for (let e of [...t.operation.replacements].reverse()) (0, h.CQ)(l, e);
              let n = new Set(l.map((e) => e.blockId)),
                a = { ...s, blocks: l, blockTypeCount: n.size },
                r = y(l),
                i = e.undoStack.slice(0, -1);
              return {
                ...e,
                source: { type: "projection", voxelModel: a },
                materialStats: r,
                replacements: e.replacements.slice(0, -t.operation.replacements.length),
                undoStack: i,
                redoStack: [...e.redoStack, t],
                isModified: k(i, e),
                hasStructuralEdits: N(i, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            return e;
          }
          case "REDO": {
            if (0 === e.redoStack.length || !e.source || "projection" !== e.source.type) return e;
            let t = e.redoStack[e.redoStack.length - 1],
              s = e.source.voxelModel;
            if ((null == (d = t.operation) ? void 0 : d.type) === "delete") {
              let l = new Set(
                  t.operation.deletedBlocks.map((e) =>
                    "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                  ),
                ),
                n = s.blocks.filter(
                  (e) =>
                    !l.has(
                      ""
                        .concat(e.position[0], ",")
                        .concat(e.position[1], ",")
                        .concat(e.position[2]),
                    ),
                ),
                a = new Set(n.map((e) => e.blockId)),
                r = { ...s, blocks: n, blockTypeCount: a.size, totalBlockCount: n.length },
                i = y(n),
                o = [...e.undoStack, t];
              return {
                ...e,
                source: { type: "projection", voxelModel: r },
                materialStats: i,
                undoStack: o,
                redoStack: e.redoStack.slice(0, -1),
                isModified: k(o, e),
                hasStructuralEdits: N(o, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if ((null == (u = t.operation) ? void 0 : u.type) === "move") {
              let { moves: l } = t.operation,
                n = new Map();
              for (let e of l)
                n.set("".concat(e.from[0], ",").concat(e.from[1], ",").concat(e.from[2]), e.to);
              let a = s.blocks.map((e) => {
                  let t = ""
                      .concat(e.position[0], ",")
                      .concat(e.position[1], ",")
                      .concat(e.position[2]),
                    s = n.get(t);
                  return s
                    ? { ...e, position: s, properties: { ...e.properties } }
                    : { ...e, position: [...e.position], properties: { ...e.properties } };
                }),
                r = new Set(a.map((e) => e.blockId)),
                i = { ...s, blocks: a, blockTypeCount: r.size },
                o = y(a),
                c = [...e.undoStack, t];
              return {
                ...e,
                source: { type: "projection", voxelModel: i },
                materialStats: o,
                undoStack: c,
                redoStack: e.redoStack.slice(0, -1),
                isModified: k(c, e),
                hasStructuralEdits: N(c, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if ((null == (m = t.operation) ? void 0 : m.type) === "transform") {
              let l = t.operation.after,
                n = new Set(l.blocks.map((e) => e.blockId)),
                a = {
                  ...s,
                  blocks: l.blocks,
                  entities: l.entities,
                  size: l.size,
                  blockTypeCount: n.size,
                  totalBlockCount: l.blocks.length,
                },
                r = [...e.undoStack, t];
              return {
                ...e,
                source: { type: "projection", voxelModel: a },
                materialStats: y(l.blocks),
                undoStack: r,
                redoStack: e.redoStack.slice(0, -1),
                isModified: k(r, e),
                hasStructuralEdits: N(r, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if (t.replacement) {
              let l = S(s.blocks);
              (0, h.ym)(l, t.replacement);
              let n = new Set(l.map((e) => e.blockId)),
                a = { ...s, blocks: l, blockTypeCount: n.size },
                r = y(l),
                i = [...e.undoStack, t];
              return {
                ...e,
                source: { type: "projection", voxelModel: a },
                materialStats: r,
                replacements: [...e.replacements, t.replacement],
                undoStack: i,
                redoStack: e.redoStack.slice(0, -1),
                isModified: k(i, e),
                hasStructuralEdits: N(i, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            if ((null == (x = t.operation) ? void 0 : x.type) === "replace-batch") {
              let l = S(s.blocks);
              for (let e of t.operation.replacements) (0, h.ym)(l, e);
              let n = new Set(l.map((e) => e.blockId)),
                a = { ...s, blocks: l, blockTypeCount: n.size },
                r = y(l),
                i = [...e.undoStack, t];
              return {
                ...e,
                source: { type: "projection", voxelModel: a },
                materialStats: r,
                replacements: [...e.replacements, ...t.operation.replacements],
                undoStack: i,
                redoStack: e.redoStack.slice(0, -1),
                isModified: k(i, e),
                hasStructuralEdits: N(i, e),
                selectedBlock: null,
                selectedPositions: new Set(),
                highlightedBlockId: null,
              };
            }
            return e;
          }
          case "MARK_SAVED":
            if (!g(e, t.snapshot)) return e;
            return {
              ...e,
              source:
                (null == (p = e.source) ? void 0 : p.type) === "projection" && t.name
                  ? { type: "projection", voxelModel: { ...e.source.voxelModel, name: t.name } }
                  : e.source,
              savedHistoryDepth: e.undoStack.length,
              savedHistoryMarker: v(e.undoStack),
              isModified: !1,
            };
          case "RESET":
            return j;
          case "SET_LAYER_CUTOFF":
            return {
              ...e,
              layerCutoff: t.payload,
              ...E(e, e.hiddenLayers, e.hiddenPositions, t.payload, e.layerMode),
            };
          case "SET_LAYER_MODE":
            return {
              ...e,
              layerMode: t.payload,
              ...E(e, e.hiddenLayers, e.hiddenPositions, e.layerCutoff, t.payload),
            };
          default:
            return e;
        }
      }
      let _ = (0, n.createContext)(j),
        I = (0, n.createContext)(() => {});
      function M(e) {
        let { children: t } = e,
          [s, a] = (0, n.useReducer)(C, j);
        return (0, l.jsx)(_.Provider, {
          value: s,
          children: (0, l.jsx)(I.Provider, { value: a, children: t }),
        });
      }
      function z() {
        return (0, n.useContext)(_);
      }
      function T() {
        return (0, n.useContext)(I);
      }
      var L = s(28203),
        A = s(36489),
        B = s(15532),
        O = s(48239),
        R = s(52349),
        D = s(72556),
        P = s(4996),
        F = s(26337),
        H = s(73588),
        U = s(25828),
        G = s(97003),
        K = s(44460);
      function W(e) {
        var t;
        let {
            title: s,
            onBack: a,
            subtitle: r,
            onUndo: i,
            onRedo: o,
            onSave: c,
            canSave: d,
            onExport: u,
            onOpenGuide: m,
          } = e,
          x = z(),
          { status: p } = (0, A.useSession)(),
          h = x.undoStack.length > 0,
          b = x.redoStack.length > 0,
          f = (null == (t = x.source) ? void 0 : t.type) === "projection",
          g = null != d ? d : x.isModified,
          j = "unauthenticated" === p,
          [y, v] = n.useState(!1),
          k = n.useRef(null);
        return (
          n.useEffect(() => {
            if (!y) return;
            let e = (e) => {
                k.current && !k.current.contains(e.target) && v(!1);
              },
              t = (e) => {
                "Escape" === e.key && v(!1);
              };
            return (
              document.addEventListener("pointerdown", e),
              document.addEventListener("keydown", t),
              () => {
                (document.removeEventListener("pointerdown", e),
                  document.removeEventListener("keydown", t));
              }
            );
          }, [y]),
          (0, l.jsxs)("div", {
            "data-onboarding": "studio-toolbar",
            className: "ed-bar",
            children: [
              (0, l.jsx)(K.K, {
                label: "返回 Studio",
                size: "xs",
                variant: "secondary",
                onClick: a,
                className: "ed-back",
                children: (0, l.jsx)(B.A, { size: 15 }),
              }),
              (0, l.jsx)("div", { className: "ed-divider" }),
              (0, l.jsxs)("div", {
                className: "ed-title",
                children: [
                  (0, l.jsxs)("div", {
                    className: "t1",
                    children: [
                      (0, l.jsx)("b", { children: s }),
                      x.isModified &&
                        (0, l.jsx)("span", { className: "modi", title: "有未保存修改" }),
                    ],
                  }),
                  r && (0, l.jsx)("div", { className: "t2", children: r }),
                  j &&
                    (0, l.jsxs)("div", {
                      className: "t-guest",
                      children: [(0, l.jsx)("i", {}), "未登录 \xb7 本地编辑"],
                    }),
                ],
              }),
              (0, l.jsx)("div", { className: "ed-spacer" }),
              (0, l.jsxs)("div", {
                className: "ed-acts",
                children: [
                  f &&
                    (0, l.jsxs)(l.Fragment, {
                      children: [
                        (0, l.jsx)(K.K, {
                          label: "撤销",
                          size: "xs",
                          variant: "secondary",
                          className: "eb eb-icon",
                          onClick: i,
                          disabled: !h,
                          title: "撤销 (Ctrl+Z)",
                          children: (0, l.jsx)(O.A, { size: 14 }),
                        }),
                        (0, l.jsx)(K.K, {
                          label: "重做",
                          size: "xs",
                          variant: "secondary",
                          className: "eb eb-icon",
                          onClick: o,
                          disabled: !b,
                          title: "重做 (Ctrl+Y)",
                          children: (0, l.jsx)(R.A, { size: 14 }),
                        }),
                        (0, l.jsx)("div", { className: "ed-divider" }),
                      ],
                    }),
                  f &&
                    (0, l.jsxs)(G.$, {
                      size: "xs",
                      variant: "primary",
                      className: "eb eb-save",
                      onClick: c,
                      disabled: !g,
                      title: j ? "保存作品需要登录" : "保存",
                      children: [
                        (0, l.jsx)(D.A, { size: 14 }),
                        (0, l.jsx)("span", {
                          className: "lbl",
                          children: j ? "登录后保存" : "保存",
                        }),
                      ],
                    }),
                  f &&
                    (0, l.jsxs)(G.$, {
                      size: "xs",
                      variant: "secondary",
                      className: "eb eb-export",
                      onClick: u,
                      title: "导出投影",
                      children: [
                        (0, l.jsx)(P.A, { size: 14 }),
                        (0, l.jsx)("span", { className: "lbl", children: "导出投影" }),
                      ],
                    }),
                  (0, l.jsx)(K.K, {
                    label: "操作指引",
                    size: "xs",
                    variant: "secondary",
                    className: "eb eb-icon eb-guide",
                    onClick: m,
                    children: (0, l.jsx)(F.A, { size: 14 }),
                  }),
                  (0, l.jsxs)("div", {
                    className: "ed-more",
                    ref: k,
                    children: [
                      (0, l.jsx)(K.K, {
                        label: "更多",
                        size: "xs",
                        variant: "secondary",
                        className: "eb eb-icon eb-more",
                        onClick: () => v((e) => !e),
                        "aria-expanded": y,
                        "aria-haspopup": "menu",
                        children: (0, l.jsx)(H.A, { size: 14 }),
                      }),
                      y &&
                        (0, l.jsxs)("div", {
                          className: "ed-more-menu",
                          role: "menu",
                          children: [
                            f &&
                              (0, l.jsxs)("button", {
                                type: "button",
                                role: "menuitem",
                                onClick: () => {
                                  (v(!1), null == u || u());
                                },
                                children: [(0, l.jsx)(P.A, { size: 14 }), "导出投影"],
                              }),
                            (0, l.jsxs)("button", {
                              type: "button",
                              role: "menuitem",
                              onClick: () => {
                                (v(!1), null == m || m());
                              },
                              children: [(0, l.jsx)(F.A, { size: 14 }), "操作指引"],
                            }),
                          ],
                        }),
                    ],
                  }),
                  (0, l.jsx)(U.E, {
                    tone: "brand",
                    size: "sm",
                    className: "eb-beta",
                    children: "本地编辑",
                  }),
                ],
              }),
            ],
          })
        );
      }
      var Y = s(95585),
        q = s(64991),
        $ = s(77252),
        V = s(2186);
      let J = /([×:·])/g,
        X = /^[×:·]$/;
      function Z(e) {
        let { children: t } = e;
        if ("string" != typeof t) return (0, l.jsx)(l.Fragment, { children: t });
        let s = t.split(J);
        return (0, l.jsx)(l.Fragment, {
          children: s.map((e, t) =>
            X.test(e)
              ? (0, l.jsx)("span", { className: "mx", children: e }, t)
              : (0, l.jsx)(n.Fragment, { children: e }, t),
          ),
        });
      }
      function Q(e) {
        return e.reduce((e, t) => e + t.count, 0);
      }
      function ee(e, t) {
        if (t <= 0) return "0%";
        let s = (e / t) * 100;
        return s > 0 && s < 0.1 ? "<0.1%" : "".concat(s.toFixed(1), "%");
      }
      function et(e) {
        let { stat: t, className: s } = e;
        return (0, l.jsx)("span", {
          className: s,
          children: t.textureUrl
            ? (0, l.jsx)("img", { src: t.textureUrl, alt: "" })
            : (0, l.jsx)(q.A, { size: 12 }),
        });
      }
      function es(e) {
        var t, s;
        let {
            onMaterialFocus: a,
            onExportCSV: r,
            onScreenshot: i,
            onIsolateMaterial: o,
            onReplaceMaterial: c,
          } = e,
          d = z(),
          u = T(),
          [m, x] = (0, n.useState)(""),
          [p, h] = (0, n.useState)("count"),
          [b, f] = (0, n.useState)({}),
          g = "parsing" === d.loading || "rendering" === d.loading,
          j = m.trim().toLowerCase(),
          y = (0, n.useMemo)(
            () => [...d.materialStats].sort((e, t) => t.count - e.count),
            [d.materialStats],
          ),
          v = (0, n.useMemo)(() => Q(y), [y]),
          k = null != (s = null == (t = y[0]) ? void 0 : t.count) ? s : 1,
          {
            head: N,
            mid: S,
            tail: w,
          } = (0, n.useMemo)(
            () =>
              (function (e) {
                let t = [],
                  s = [],
                  l = [];
                return (
                  e.forEach((e, n) => {
                    n < 10 ? t.push(e) : e.count >= 10 ? s.push(e) : l.push(e);
                  }),
                  { head: t, mid: s, tail: l }
                );
              })(y),
            [y],
          ),
          E = (0, n.useMemo)(() => Q(N), [N]),
          C = (0, n.useMemo)(() => Q(S), [S]),
          _ = (0, n.useMemo)(() => Q(w), [w]),
          I = (0, n.useMemo)(
            () =>
              j
                ? y.filter(
                    (e) =>
                      e.blockId.toLowerCase().includes(j) ||
                      e.chineseName.toLowerCase().includes(j) ||
                      e.englishName.toLowerCase().includes(j),
                  )
                : [],
            [y, j],
          ),
          M = (0, n.useMemo)(
            () => [...y].sort((e, t) => e.chineseName.localeCompare(t.chineseName, "zh")),
            [y],
          ),
          L = !!j || "name" === p,
          A = j ? I : M,
          B = w.filter((e) => b[e.blockId]).length,
          O = (e) => {
            let t = e.blockId,
              s = d.highlightedBlockId === t ? null : t;
            (u({ type: "SET_HIGHLIGHTED_BLOCK", payload: s }),
              s && (null == a || a({ blockId: t, chineseName: e.chineseName, count: e.count })));
          },
          R = (e) =>
            (0, l.jsxs)("div", {
              className: "mi-detail",
              children: [
                (0, l.jsx)("span", {
                  className: "mi-detail-id",
                  children: (0, l.jsx)(Z, {
                    children: "".concat(e.blockId, " \xb7 ").concat(ee(e.count, v)),
                  }),
                }),
                (0, l.jsxs)("div", {
                  className: "mi-detail-acts",
                  children: [
                    (0, l.jsx)(G.$, {
                      size: "xs",
                      variant: "secondary",
                      className: "mi-mini",
                      onClick: (t) => {
                        (t.stopPropagation(),
                          null == o ||
                            o({ blockId: e.blockId, chineseName: e.chineseName, count: e.count }));
                      },
                      children: "只显示这种",
                    }),
                    (0, l.jsx)(G.$, {
                      size: "xs",
                      variant: "secondary",
                      className: "mi-mini",
                      onClick: (t) => {
                        (t.stopPropagation(),
                          null == c ||
                            c({ blockId: e.blockId, chineseName: e.chineseName, count: e.count }));
                      },
                      children: "整体替换",
                    }),
                  ],
                }),
              ],
            });
        return (0, l.jsxs)("div", {
          className: "ed-mat-inner",
          children: [
            (0, l.jsxs)("div", {
              className: "ed-mat-head",
              children: [
                (0, l.jsx)("span", { className: "bar" }),
                (0, l.jsx)("h3", { children: "材质清单" }),
                (0, l.jsxs)("span", {
                  className: "cnt",
                  children: [
                    g ? "—" : y.length,
                    " 种",
                    (0, l.jsx)("span", { className: "dot mx", children: "\xb7" }),
                    g ? "—" : v.toLocaleString(),
                    " 个",
                  ],
                }),
              ],
            }),
            g
              ? (0, l.jsxs)("div", {
                  className: "ed-mat-skeleton",
                  children: [
                    (0, l.jsx)("div", {
                      className: "sk-note",
                      children: "统计中 \xb7 解析完成后一次性给出",
                    }),
                    [0, 1, 2, 3, 4, 5, 6, 7].map((e) =>
                      (0, l.jsx)(
                        "div",
                        {
                          className: "sk-row",
                          style: { height: 34 - 2 * e, animationDelay: "".concat(0.1 * e, "s") },
                        },
                        e,
                      ),
                    ),
                  ],
                })
              : 0 === y.length
                ? (0, l.jsxs)("div", {
                    className: "ed-mat-blank",
                    children: [
                      (0, l.jsx)("span", { className: "blank-box" }),
                      (0, l.jsx)("div", {
                        className: "blank-title",
                        children: "还没有可统计的材质",
                      }),
                      (0, l.jsx)("div", {
                        className: "blank-desc",
                        children: "投影解析成功后，这里会列出每种方块的数量、占比与 block_id。",
                      }),
                    ],
                  })
                : (0, l.jsxs)(l.Fragment, {
                    children: [
                      (0, l.jsxs)("div", {
                        className: "ed-mat-tools",
                        children: [
                          (0, l.jsxs)("div", {
                            className: "mat-search",
                            children: [
                              (0, l.jsx)($.A, { size: 13 }),
                              (0, l.jsx)("input", {
                                type: "text",
                                value: m,
                                onChange: (e) => x(e.target.value),
                                placeholder: "搜索 ".concat(y.length, " 种材质 / block_id"),
                                "aria-label": "搜索材质",
                              }),
                              m &&
                                (0, l.jsx)(K.K, {
                                  label: "清空搜索",
                                  size: "xs",
                                  variant: "ghost",
                                  className: "mat-search-clear",
                                  onClick: () => x(""),
                                  children: (0, l.jsx)(V.A, { size: 12 }),
                                }),
                            ],
                          }),
                          (0, l.jsx)(G.$, {
                            size: "sm",
                            variant: "secondary",
                            className: "mat-sort",
                            onClick: () => h((e) => ("count" === e ? "name" : "count")),
                            title:
                              "count" === p
                                ? "当前按数量排序 \xb7 点击改为按名称"
                                : "当前按名称排序 \xb7 点击改为按数量",
                            children: "count" === p ? "数量 ▾" : "名称 ▾",
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        className: "ed-mat-cov",
                        children: [
                          (0, l.jsxs)("div", {
                            className: "cov-bar",
                            children: [
                              (0, l.jsx)("span", {
                                className: "cov-head",
                                style: { width: "".concat((E / v) * 100, "%") },
                              }),
                              (0, l.jsx)("span", {
                                className: "cov-mid",
                                style: { width: "".concat((C / v) * 100, "%") },
                              }),
                              (0, l.jsx)("span", { className: "cov-tail" }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "cov-legend",
                            children: [
                              (0, l.jsxs)("span", {
                                className: "cov-total",
                                children: [
                                  y.length,
                                  " 种 ",
                                  (0, l.jsxs)("span", { children: [v.toLocaleString(), " 个"] }),
                                ],
                              }),
                              (0, l.jsxs)("span", {
                                children: [
                                  (0, l.jsx)("i", { className: "k-head" }),
                                  "主料 ",
                                  ee(E, v),
                                ],
                              }),
                              (0, l.jsxs)("span", {
                                children: [
                                  (0, l.jsx)("i", { className: "k-mid" }),
                                  "次料 ",
                                  ee(C, v),
                                ],
                              }),
                              (0, l.jsxs)("span", {
                                children: [
                                  (0, l.jsx)("i", { className: "k-tail" }),
                                  "零件 ",
                                  ee(_, v),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, l.jsx)("div", {
                        className: "ed-mat-list cn4-scroll",
                        children: L
                          ? 0 === A.length
                            ? (0, l.jsxs)("div", {
                                className: "ed-mat-blank",
                                children: [
                                  (0, l.jsx)("span", { className: "blank-box" }),
                                  (0, l.jsxs)("div", {
                                    className: "blank-title",
                                    children: ["没有匹配「", m.trim(), "」的材质"],
                                  }),
                                  (0, l.jsx)("div", {
                                    className: "blank-desc",
                                    children: "可以试试 block_id（如 spruce_）或去掉颜色前缀。",
                                  }),
                                  (0, l.jsx)(G.$, {
                                    size: "sm",
                                    variant: "secondary",
                                    onClick: () => x(""),
                                    children: "清空搜索",
                                  }),
                                ],
                              })
                            : (0, l.jsxs)(l.Fragment, {
                                children: [
                                  (0, l.jsxs)("div", {
                                    className: "mat-group",
                                    children: [
                                      (0, l.jsx)("span", {
                                        className: "g-name",
                                        children: j ? "搜索结果" : "按名称排列",
                                      }),
                                      (0, l.jsxs)("span", {
                                        className: "g-stat",
                                        children: [A.length, " 种"],
                                      }),
                                    ],
                                  }),
                                  (0, l.jsx)("div", {
                                    className: "mat-rows",
                                    children: A.map((e) => {
                                      let t = d.highlightedBlockId === e.blockId;
                                      return (0, l.jsxs)(
                                        "div",
                                        {
                                          className: "mi-wrap".concat(t ? " active" : ""),
                                          children: [
                                            (0, l.jsxs)("button", {
                                              type: "button",
                                              className: "mi-flat",
                                              onClick: () => O(e),
                                              "aria-pressed": t,
                                              children: [
                                                (0, l.jsx)(et, { stat: e, className: "sw sw-sm" }),
                                                (0, l.jsxs)("span", {
                                                  className: "info",
                                                  children: [
                                                    (0, l.jsx)("span", {
                                                      className: "name",
                                                      children: e.chineseName,
                                                    }),
                                                    (0, l.jsx)("span", {
                                                      className: "id",
                                                      children: (0, l.jsx)(Z, {
                                                        children: e.blockId,
                                                      }),
                                                    }),
                                                  ],
                                                }),
                                                (0, l.jsx)("span", {
                                                  className: "n",
                                                  children: e.count.toLocaleString(),
                                                }),
                                              ],
                                            }),
                                            t && R(e),
                                          ],
                                        },
                                        e.blockId,
                                      );
                                    }),
                                  }),
                                ],
                              })
                          : (0, l.jsxs)(l.Fragment, {
                              children: [
                                (0, l.jsxs)("div", {
                                  className: "mat-group",
                                  children: [
                                    (0, l.jsx)("span", { className: "g-name", children: "主料" }),
                                    (0, l.jsxs)("span", {
                                      className: "g-stat",
                                      children: [N.length, " 种 = ", ee(E, v), " 用量"],
                                    }),
                                  ],
                                }),
                                (0, l.jsx)("div", {
                                  className: "mat-rows",
                                  children: N.map((e) => {
                                    let t = d.highlightedBlockId === e.blockId;
                                    return (0, l.jsxs)(
                                      "div",
                                      {
                                        className: "mi-wrap".concat(t ? " active" : ""),
                                        children: [
                                          (0, l.jsxs)("button", {
                                            type: "button",
                                            className: "mi-main",
                                            onClick: () => O(e),
                                            "aria-pressed": t,
                                            children: [
                                              (0, l.jsx)(et, { stat: e, className: "sw sw-lg" }),
                                              (0, l.jsxs)("span", {
                                                className: "info",
                                                children: [
                                                  (0, l.jsx)("span", {
                                                    className: "name",
                                                    children: e.chineseName,
                                                  }),
                                                  (0, l.jsx)("span", {
                                                    className: "bar",
                                                    children: (0, l.jsx)("span", {
                                                      style: {
                                                        width: "".concat(
                                                          Math.max(4, (e.count / k) * 100),
                                                          "%",
                                                        ),
                                                      },
                                                    }),
                                                  }),
                                                ],
                                              }),
                                              (0, l.jsxs)("span", {
                                                className: "num",
                                                children: [
                                                  (0, l.jsx)("span", {
                                                    className: "n",
                                                    children: e.count.toLocaleString(),
                                                  }),
                                                  (0, l.jsx)("span", {
                                                    className: "p",
                                                    children: ee(e.count, v),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          t && R(e),
                                        ],
                                      },
                                      e.blockId,
                                    );
                                  }),
                                }),
                                S.length > 0 &&
                                  (0, l.jsxs)(l.Fragment, {
                                    children: [
                                      (0, l.jsxs)("div", {
                                        className: "mat-group",
                                        children: [
                                          (0, l.jsx)("span", {
                                            className: "g-name",
                                            children: "次料",
                                          }),
                                          (0, l.jsxs)("span", {
                                            className: "g-stat",
                                            children: [S.length, " 种 \xb7 ", ee(C, v)],
                                          }),
                                        ],
                                      }),
                                      (0, l.jsx)("div", {
                                        className: "mat-rows mat-rows-tight",
                                        children: S.map((e) => {
                                          let t = d.highlightedBlockId === e.blockId;
                                          return (0, l.jsxs)(
                                            "div",
                                            {
                                              className: "mi-wrap".concat(t ? " active" : ""),
                                              children: [
                                                (0, l.jsxs)("button", {
                                                  type: "button",
                                                  className: "mi-mid",
                                                  onClick: () => O(e),
                                                  "aria-pressed": t,
                                                  children: [
                                                    (0, l.jsx)(et, {
                                                      stat: e,
                                                      className: "sw sw-sm",
                                                    }),
                                                    (0, l.jsx)("span", {
                                                      className: "name",
                                                      children: e.chineseName,
                                                    }),
                                                    (0, l.jsx)("span", {
                                                      className: "n",
                                                      children: e.count.toLocaleString(),
                                                    }),
                                                  ],
                                                }),
                                                t && R(e),
                                              ],
                                            },
                                            e.blockId,
                                          );
                                        }),
                                      }),
                                    ],
                                  }),
                                w.length > 0 &&
                                  (0, l.jsxs)(l.Fragment, {
                                    children: [
                                      (0, l.jsxs)("div", {
                                        className: "mat-group",
                                        children: [
                                          (0, l.jsx)("span", {
                                            className: "g-name",
                                            children: "零件",
                                          }),
                                          (0, l.jsxs)("span", {
                                            className: "g-stat",
                                            children: [
                                              w.length,
                                              " 种 \xb7 已核对 ",
                                              B,
                                              "/",
                                              w.length,
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, l.jsxs)("div", {
                                        className: "mat-tail",
                                        children: [
                                          (0, l.jsxs)("div", {
                                            className: "tail-hint",
                                            children: [
                                              "各不足 ",
                                              10,
                                              " 个的装饰件。这里的问题不是「备多少料」，是「别漏摆」——勾掉表示已核对。",
                                            ],
                                          }),
                                          (0, l.jsx)("div", {
                                            className: "tail-grid",
                                            children: w.map((e) => {
                                              let t = d.highlightedBlockId === e.blockId,
                                                s = !!b[e.blockId];
                                              return (0, l.jsxs)(
                                                "div",
                                                {
                                                  className: "tail-chip"
                                                    .concat(t ? " active" : "")
                                                    .concat(s ? " done" : ""),
                                                  children: [
                                                    (0, l.jsx)("button", {
                                                      type: "button",
                                                      className: "chip-check",
                                                      onClick: () => {
                                                        var t;
                                                        return (
                                                          (t = e.blockId),
                                                          void f((e) => {
                                                            let s = { ...e };
                                                            return (
                                                              s[t] ? delete s[t] : (s[t] = !0),
                                                              s
                                                            );
                                                          })
                                                        );
                                                      },
                                                      "aria-pressed": s,
                                                      "aria-label": s
                                                        ? "取消核对 ".concat(e.chineseName)
                                                        : "标记已核对 ".concat(e.chineseName),
                                                      title: "标记已核对",
                                                      children: s ? "✓" : "",
                                                    }),
                                                    (0, l.jsxs)("button", {
                                                      type: "button",
                                                      className: "chip-main",
                                                      onClick: () => O(e),
                                                      "aria-pressed": t,
                                                      title: e.blockId,
                                                      children: [
                                                        (0, l.jsx)(et, {
                                                          stat: e,
                                                          className: "sw sw-xs",
                                                        }),
                                                        (0, l.jsx)("span", {
                                                          className: "name",
                                                          children: e.chineseName,
                                                        }),
                                                        (0, l.jsxs)("span", {
                                                          className: "n",
                                                          children: ["\xd7", e.count],
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                },
                                                e.blockId,
                                              );
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                      }),
                      (0, l.jsxs)("div", {
                        className: "ed-mat-foot",
                        children: [
                          (0, l.jsx)("div", {
                            className: "foot-hint",
                            children: "点击材质＝画布高亮同类；批量替换从选区面板进入。",
                          }),
                          (0, l.jsxs)("div", {
                            className: "foot-acts",
                            children: [
                              (0, l.jsx)(G.$, {
                                size: "sm",
                                variant: "secondary",
                                className: "mi-mini",
                                onClick: r,
                                children: "清单 CSV",
                              }),
                              (0, l.jsx)(G.$, {
                                size: "sm",
                                variant: "secondary",
                                className: "mi-mini",
                                onClick: i,
                                children: "截图",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
          ],
        });
      }
      function el(e) {
        let {
          onMaterialFocus: t,
          onExportCSV: s,
          onScreenshot: n,
          onIsolateMaterial: a,
          onReplaceMaterial: r,
          onCollapse: i,
        } = e;
        return (0, l.jsxs)("aside", {
          "data-onboarding": "studio-sidebar",
          className: "ed-mat",
          children: [
            i &&
              (0, l.jsx)(K.K, {
                label: "收起材质面板",
                size: "sm",
                variant: "secondary",
                className: "ed-mat-toggle",
                onClick: i,
                children: (0, l.jsx)(Y.A, { size: 12 }),
              }),
            (0, l.jsx)(es, {
              onMaterialFocus: t,
              onExportCSV: s,
              onScreenshot: n,
              onIsolateMaterial: a,
              onReplaceMaterial: r,
            }),
          ],
        });
      }
      var en = s(57281),
        ea = s(22240),
        er = s(91913),
        ei = s(20054),
        eo = s(73610);
      let ec = [
          { id: "select", icon: en.A, label: "选择", short: "选择", implemented: !0 },
          { id: "region", icon: ea.A, label: "框选选区", short: "框选", implemented: !0 },
          { id: "mirror", icon: er.A, label: "镜像 / 旋转", short: "镜像", implemented: !0 },
          { id: "measure", icon: ei.A, label: "测量", short: "测量", implemented: !0 },
          { id: "explode", icon: eo.A, label: "爆炸图", short: "爆炸", implemented: !0 },
        ],
        ed = ["region"];
      function eu(e) {
        let { current: t, onChange: s, onComingSoon: a, disabled: r } = e;
        return (
          (0, n.useEffect)(() => {
            if (r) return;
            let e = (e) => {
              let t = e.target;
              if (
                (null == t ? void 0 : t.tagName) === "INPUT" ||
                (null == t ? void 0 : t.tagName) === "TEXTAREA" ||
                (null == t ? void 0 : t.isContentEditable) ||
                e.ctrlKey ||
                e.metaKey ||
                e.altKey ||
                e.shiftKey
              )
                return;
              let l = parseInt(e.key, 10) - 1;
              if (l >= 0 && l < ec.length) {
                e.preventDefault();
                let t = ec[l];
                t.implemented ? s(t.id) : null == a || a(t.id);
              }
            };
            return (
              window.addEventListener("keydown", e),
              () => window.removeEventListener("keydown", e)
            );
          }, [s, a, r]),
          (0, l.jsx)("div", {
            className: "ed-tools",
            role: "toolbar",
            "aria-label": "编辑器工具栏",
            style: { pointerEvents: "none" },
            children: ec.map((e, r) => {
              let i = t === e.id,
                o = "".concat(r + 1);
              return (0, l.jsxs)(
                n.Fragment,
                {
                  children: [
                    (0, l.jsxs)(K.K, {
                      label: e.label,
                      size: "md",
                      variant: i ? "primary" : "ghost",
                      onClick: () => {
                        e.implemented ? s(e.id) : null == a || a(e.id);
                      },
                      className: "ed-tool overflow-visible".concat(i ? " on" : ""),
                      style: { pointerEvents: "auto" },
                      title: "".concat(e.label, " (").concat(o, ")"),
                      "aria-pressed": i,
                      children: [
                        (0, l.jsx)(e.icon, { size: 18 }),
                        (0, l.jsx)("span", { className: "lbl", children: e.short }),
                        (0, l.jsx)("span", { className: "num", children: o }),
                        (0, l.jsxs)("span", {
                          className: "tip",
                          children: [e.label, (0, l.jsx)("i", { children: o })],
                        }),
                      ],
                    }),
                    ed.includes(e.id) && (0, l.jsx)("span", { className: "ed-tool-sep" }),
                  ],
                },
                e.id,
              );
            }),
          })
        );
      }
      var em = s(8934),
        ex = s(36102),
        ep = s(66176),
        eh = s(41871),
        eb = s(26545),
        ef = s(64443),
        eg = s(17232),
        ej = s(45600);
      function ey(e) {
        var t, s, a;
        let { previewHint: r } = e,
          i = z(),
          { status: o } = (0, A.useSession)(),
          c =
            (null == (t = i.source) ? void 0 : t.type) === "projection"
              ? i.source.voxelModel
              : null,
          d = i.selectedBlock,
          [u, m, x] = null != (a = null == d ? void 0 : d.position) ? a : [null, null, null],
          p = c ? c.totalBlockCount.toLocaleString() : "—",
          h = (0, em.v)(null == c || null == (s = c.sourceMeta) ? void 0 : s.dataVersion),
          [b, f] = n.useState(null),
          [g, j] = n.useState(!1);
        n.useEffect(() => {
          let e = 0,
            t = 0,
            s = 0,
            l = (n) => {
              if ("visible" !== document.visibilityState) {
                ((t = 0), (s = 0), f(null), j(!0), (e = requestAnimationFrame(l)));
                return;
              }
              (j(!1), 0 === s && (s = n), t++);
              let a = n - s;
              (a >= 500 && (f(Math.round((1e3 * t) / a)), (t = 0), (s = n)),
                (e = requestAnimationFrame(l)));
            },
            n = () => {
              ((t = 0), (s = 0), "visible" !== document.visibilityState && (f(null), j(!0)));
            };
          return (
            document.addEventListener("visibilitychange", n),
            (e = requestAnimationFrame(l)),
            () => {
              (cancelAnimationFrame(e), document.removeEventListener("visibilitychange", n));
            }
          );
        }, []);
        let y = c
          ? (0, l.jsxs)(l.Fragment, {
              children: [
                c.size[0],
                (0, l.jsx)("span", { className: "mx", children: "\xd7" }),
                c.size[1],
                (0, l.jsx)("span", { className: "mx", children: "\xd7" }),
                c.size[2],
              ],
            })
          : "—";
        return (0, l.jsxs)("div", {
          className: "ed-status",
          role: "status",
          "aria-live": "polite",
          children: [
            (0, l.jsxs)("span", {
              className: "st st-coord",
              children: [
                (0, l.jsx)(ex.A, { size: 11 }),
                "X ",
                (0, l.jsx)("b", { children: null != u ? u : "—" }),
                " Y ",
                (0, l.jsx)("b", { children: null != m ? m : "—" }),
                " Z ",
                (0, l.jsx)("b", { children: null != x ? x : "—" }),
              ],
            }),
            (0, l.jsx)("span", { className: "st-sep st-coord" }),
            (0, l.jsxs)("span", {
              className: "st",
              children: [
                (0, l.jsx)(ep.A, { size: 11 }),
                " 尺寸 ",
                (0, l.jsx)("b", { children: y }),
              ],
            }),
            (0, l.jsx)("span", { className: "st-sep" }),
            (0, l.jsxs)("span", {
              className: "st",
              children: [(0, l.jsx)(q.A, { size: 11 }), " 方块 ", (0, l.jsx)("b", { children: p })],
            }),
            i.materialStats.length > 0 &&
              (0, l.jsxs)(l.Fragment, {
                children: [
                  (0, l.jsx)("span", { className: "st-sep" }),
                  (0, l.jsxs)("span", {
                    className: "st",
                    children: [
                      (0, l.jsx)(eh.A, { size: 11 }),
                      " 种类 ",
                      (0, l.jsx)("b", { children: i.materialStats.length }),
                    ],
                  }),
                ],
              }),
            r &&
              (0, l.jsxs)(l.Fragment, {
                children: [
                  (0, l.jsx)("span", { className: "st-sep" }),
                  (0, l.jsxs)("span", {
                    className: "st st-warn",
                    children: [(0, l.jsx)(eb.A, { size: 11 }), " ", r],
                  }),
                ],
              }),
            (0, l.jsx)("span", { className: "st-sep st-limit" }),
            (0, l.jsxs)("span", {
              className: "st st-limit",
              children: [
                (0, l.jsx)(ef.A, { size: 11 }),
                " 本地导入 ≤ ",
                (0, l.jsx)("b", { children: "50MB" }),
                " \xb7 账号保存约 ",
                (0, l.jsx)("b", { children: "25MB" }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "st-right",
              children: [
                "unauthenticated" === o &&
                  (0, l.jsx)("span", { className: "st-guest", children: "未登录 \xb7 本地编辑" }),
                i.isModified &&
                  (0, l.jsxs)("span", {
                    className: "st st-modi",
                    children: [(0, l.jsx)(eg.A, { size: 11 }), " 未保存"],
                  }),
                (0, l.jsxs)("span", {
                  className: "st st-fps",
                  children: [
                    (0, l.jsx)(ej.A, { size: 11 }),
                    " FPS ",
                    (0, l.jsx)("b", {
                      style: {
                        color:
                          null === b
                            ? "var(--text-3)"
                            : b >= 50
                              ? "var(--green)"
                              : b >= 30
                                ? "var(--warning)"
                                : "var(--error)",
                      },
                      children: g ? "暂停" : null != b ? b : "—",
                    }),
                  ],
                }),
                h && (0, l.jsxs)("span", { className: "st-mc", children: ["MC ", h] }),
              ],
            }),
          ],
        });
      }
      let ev = "studio:block-palette:recent";
      function ek() {
        try {
          let e = localStorage.getItem(ev);
          if (!e) return [];
          let t = JSON.parse(e);
          if (!Array.isArray(t)) return [];
          return t.filter((e) => "string" == typeof e);
        } catch (e) {
          return [];
        }
      }
      var eN = s(51750),
        eS = s(71442),
        ew = s(1855);
      let eE = ["全部", "木材", "石材", "金属", "玻璃", "装饰", "自然", "混凝土", "其他"];
      function eC(e) {
        let {
            open: t,
            onClose: s,
            onSelect: a,
            currentBlockId: r,
            impactCount: i,
            targetMode: o = "matching",
            contextLabel: c,
            contextHint: d,
          } = e,
          [u, m] = (0, n.useState)([]),
          [x, h] = (0, n.useState)([]),
          [g, j] = (0, n.useState)(!1),
          [y, v] = (0, n.useState)(null),
          [k, N] = (0, n.useState)(""),
          [S, w] = (0, n.useState)("全部"),
          [E, C] = (0, n.useState)(""),
          _ = (0, n.useRef)(null);
        (0, n.useEffect)(() => {
          if (!t) return;
          let e = !1,
            s = async () => {
              (j(!0), v(null));
              try {
                let [, t] = await Promise.all([(0, p.initBlockTextureMapper)(), (0, b.y6)()]),
                  s = (0, p.getAllBlocks)(t.blockIds);
                e || m(s);
              } catch (t) {
                (console.error("加载方块数据失败:", t),
                  e || (m([]), v("方块定义加载失败，请关闭后重试")));
              } finally {
                e || j(!1);
              }
            };
          (N(""), w("全部"), C(""), h(ek()), s());
          let l = window.setTimeout(() => {
            var e;
            return null == (e = _.current) ? void 0 : e.focus();
          }, 180);
          return () => {
            ((e = !0), window.clearTimeout(l));
          };
        }, [t]);
        let I = (0, n.useMemo)(() => {
            let e = u;
            "全部" !== S && (e = e.filter((e) => e.category === S));
            let t = k.trim().toLowerCase();
            return (
              t &&
                (e = e.filter(
                  (e) =>
                    e.chineseName.toLowerCase().includes(t) ||
                    e.englishName.toLowerCase().includes(t) ||
                    e.blockId.toLowerCase().includes(t),
                )),
              e
            );
          }, [S, u, k]),
          M = (0, n.useMemo)(() => {
            let e = { 全部: u.length };
            for (let t of eE) "全部" !== t && (e[t] = u.filter((e) => e.category === t).length);
            return e;
          }, [u]),
          z = (0, n.useCallback)(
            (e) => {
              if (!e) return null;
              let t = u.find((t) => t.blockId === e);
              if (t) return t;
              let s = (0, p.getBlockTexture)(e);
              return {
                blockId: e,
                chineseName: s.chineseName,
                englishName: s.englishName,
                textureUrl: s.textureUrl,
              };
            },
            [u],
          ),
          T = (0, n.useMemo)(() => z(r), [r, z]),
          L = (0, n.useMemo)(() => z(E), [z, E]),
          A = (0, n.useMemo)(
            () =>
              x
                .map((e) => u.find((t) => t.blockId === e))
                .filter((e) => !!e && (null == e ? void 0 : e.blockId) !== r)
                .slice(0, 8),
            [u, r, x],
          ),
          B = (0, n.useMemo)(() => {
            if (!r || "positions" === o) return [];
            let e = r.replace("minecraft:", "").split("_"),
              t = "polished" === e[0] && e[1] ? "".concat(e[0], "_").concat(e[1]) : e[0];
            return u
              .filter((e) => e.blockId !== r && e.blockId.replace("minecraft:", "").includes(t))
              .slice(0, 8);
          }, [u, r, o]),
          O = "positions" !== o && !!E && E === r,
          R = "positions" !== o && !!T,
          D = !!E && !O && u.some((e) => e.blockId === E),
          P = (0, n.useCallback)(() => {
            if (!D) return;
            let e = new Set(u.map((e) => e.blockId));
            if ((0, f.Yg)(E, e)) {
              try {
                let e = ek(),
                  t = [E, ...e.filter((e) => e !== E)].slice(0, 8);
                (localStorage.setItem(ev, JSON.stringify(t)),
                  window.dispatchEvent(new CustomEvent("studio:recent-updated")));
              } catch (e) {}
              (a(E), s());
            }
          }, [u, D, s, a, E]),
          F = c ? "替换方块" : "选择方块",
          H = "positions" === o ? "选区位置" : "来源材质",
          U = i && i > 0 ? "".concat(i.toLocaleString(), " 个位置") : "按实际匹配数量执行",
          W = i && i > 0 ? "执行替换 \xb7 ".concat(i.toLocaleString(), " 块") : "执行替换";
        return (0, l.jsx)(eS.a, {
          open: t,
          onClose: s,
          title: F,
          icon: (0, l.jsx)(er.A, { size: 19 }),
          iconTone: "warning",
          subtitle: d || "先确认来源和影响范围，再选择目标方块执行替换",
          size: "xl",
          className: "bsm !max-w-[760px] max-[520px]:!mx-0 max-[520px]:!max-h-full",
          bodyClassName: "bsm-body !max-h-[68vh] !p-0",
          footer: (0, l.jsxs)(l.Fragment, {
            children: [
              (0, l.jsx)(eS.y, { variant: "ghost", onClick: s, children: "取消" }),
              (0, l.jsx)(eS.y, { variant: "warning", disabled: !D, onClick: P, children: W }),
            ],
          }),
          children: (0, l.jsxs)("div", {
            className: "bsm-scroll flex min-h-0 flex-col gap-3 overflow-y-auto p-4 cn4-scroll",
            children: [
              c &&
                (0, l.jsx)("div", {
                  className:
                    "bsm-context border-2 border-info bg-info/10 px-3 py-2 text-[12px] font-black leading-snug text-text-primary",
                  children: c,
                }),
              (0, l.jsxs)("div", {
                className: "bsm-info",
                children: [
                  R &&
                    T &&
                    (0, l.jsxs)("div", {
                      className: "bsm-from-line",
                      children: [
                        (0, l.jsx)("span", { children: "正在替换" }),
                        (0, l.jsx)("span", {
                          className: "sw",
                          children: (0, l.jsx)(eM, { info: T }),
                        }),
                        (0, l.jsx)("b", { children: T.chineseName }),
                        !!i &&
                          i > 0 &&
                          (0, l.jsxs)("span", {
                            className: "n",
                            children: ["\xb7 ", i.toLocaleString(), " 块"],
                          }),
                      ],
                    }),
                  (0, l.jsxs)("div", {
                    className: "bsm-pair grid grid-cols-1 gap-2 ".concat(
                      R ? "sm:grid-cols-[1fr_42px_1fr] sm:items-stretch" : "",
                    ),
                    children: [
                      R &&
                        T &&
                        (0, l.jsxs)(l.Fragment, {
                          children: [
                            (0, l.jsxs)("div", {
                              className: "bsm-source flex min-h-0 flex-col gap-1.5",
                              children: [
                                (0, l.jsx)("div", {
                                  className:
                                    "text-[11px] font-black uppercase tracking-[0.08em] text-text-muted",
                                  children: "来源方块",
                                }),
                                (0, l.jsx)(ez, { info: T }),
                              ],
                            }),
                            (0, l.jsx)("div", {
                              className:
                                "bsm-arrow flex h-8 rotate-90 items-center justify-center text-brand-primary sm:h-auto sm:rotate-0",
                              children: (0, l.jsx)(er.A, { size: 22 }),
                            }),
                          ],
                        }),
                      (0, l.jsxs)("div", {
                        className: "bsm-target flex min-h-0 flex-col gap-1.5",
                        children: [
                          (0, l.jsx)("div", {
                            className:
                              "bsm-target-k text-[11px] font-black uppercase tracking-[0.08em] text-text-muted",
                            children: "目标方块",
                          }),
                          L
                            ? (0, l.jsx)(ez, { info: L, active: !0 })
                            : (0, l.jsx)(eT, { label: "从候选区选择" }),
                        ],
                      }),
                    ],
                  }),
                  (0, l.jsxs)("div", {
                    className:
                      "bsm-impact flex flex-wrap items-center gap-x-5 gap-y-1.5 border-2 border-border-hard bg-bg-inset px-3.5 py-2.5 text-[12px] font-bold text-text-muted",
                    children: [
                      (0, l.jsxs)("span", {
                        children: [
                          (0, l.jsx)("span", { className: "text-text-secondary", children: H }),
                          (0, l.jsx)("span", {
                            className: "ml-2 font-pixel text-brand-primary",
                            children: U,
                          }),
                        ],
                      }),
                      (0, l.jsx)("span", {
                        className: O ? "text-error" : D ? "text-success" : "text-text-muted",
                        children: O
                          ? "目标不能与来源相同"
                          : D
                            ? "目标已选择 \xb7 执行后可撤销"
                            : "先选择目标方块 \xb7 操作可撤销",
                      }),
                    ],
                  }),
                  (B.length > 0 || A.length > 0) &&
                    (0, l.jsxs)("div", {
                      className: "bsm-quick border-2 border-border-hard bg-bg-inset p-2.5",
                      children: [
                        B.length > 0 &&
                          (0, l.jsx)(e_, {
                            label: "同系推荐",
                            blocks: B,
                            selectedId: E,
                            onSelect: C,
                          }),
                        A.length > 0 &&
                          (0, l.jsx)(e_, {
                            label: "最近使用",
                            blocks: A,
                            selectedId: E,
                            onSelect: C,
                          }),
                      ],
                    }),
                ],
              }),
              (0, l.jsxs)("div", {
                className: "bsm-cand flex min-h-0 flex-col border-2 border-border-hard bg-bg-inset",
                children: [
                  (0, l.jsxs)("div", {
                    className:
                      "bsm-cand-head flex items-center justify-between gap-2 border-b-2 border-border-hard px-3 py-2",
                    children: [
                      (0, l.jsxs)("div", {
                        children: [
                          (0, l.jsx)("div", {
                            className: "bsm-cand-t text-sm font-black text-text-primary",
                            children: "候选方块",
                          }),
                          (0, l.jsx)("div", {
                            className: "bsm-cand-sub text-[11px] font-bold text-text-muted",
                            children: "搜索、筛选后选择新的目标材质",
                          }),
                        ],
                      }),
                      !g &&
                        (0, l.jsxs)("div", {
                          className: "shrink-0 font-pixel text-[11px] text-brand-primary",
                          children: [I.length, "/", u.length],
                        }),
                    ],
                  }),
                  (0, l.jsxs)("div", {
                    className: "bsm-filters",
                    children: [
                      (0, l.jsxs)("div", {
                        className: "bsm-search relative border-b-2 border-border-hard p-2.5",
                        children: [
                          (0, l.jsx)($.A, {
                            size: 15,
                            className: "absolute left-3 top-1/2 -translate-y-1/2 text-text-muted",
                          }),
                          (0, l.jsx)("input", {
                            ref: _,
                            type: "text",
                            value: k,
                            onChange: (e) => N(e.target.value),
                            placeholder: "搜索方块：中文名 / 英文名 / minecraft:id",
                            className:
                              "h-11 w-full border-2 border-border-hard bg-bg-elevated pl-9 pr-12 text-[12px] font-semibold text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none sm:h-[34px]",
                          }),
                          k &&
                            (0, l.jsx)(K.K, {
                              label: "清除搜索",
                              size: "xs",
                              variant: "ghost",
                              onClick: () => N(""),
                              className: "absolute right-2 top-1/2 -translate-y-1/2 !shadow-none",
                              children: (0, l.jsx)(V.A, { size: 15 }),
                            }),
                        ],
                      }),
                      (0, l.jsx)("div", {
                        className:
                          "bsm-cats flex gap-1.5 overflow-x-auto border-b-2 border-border-hard p-2.5 cn4-scroll",
                        children: eE.map((e) => {
                          let t = S === e;
                          return (0, l.jsxs)(
                            ew.$,
                            {
                              size: "sm",
                              selected: t,
                              onClick: () => w(e),
                              className: "shrink-0 !text-[11px]",
                              children: [
                                e,
                                !g &&
                                  (0, l.jsx)("span", {
                                    className: "ml-1 font-pixel ".concat(
                                      t ? "text-[rgb(11,21,3)]/65" : "text-text-muted",
                                    ),
                                    children: M[e] || 0,
                                  }),
                              ],
                            },
                            e,
                          );
                        }),
                      }),
                    ],
                  }),
                  (0, l.jsx)("div", {
                    className:
                      "bsm-gridwrap min-h-0 max-h-[250px] overflow-y-auto p-2.5 cn4-scroll",
                    children: g
                      ? (0, l.jsxs)("div", {
                          className: "flex h-[180px] items-center justify-center",
                          children: [
                            (0, l.jsx)(eN.y, { size: "sm" }),
                            (0, l.jsx)("span", {
                              className: "ml-3 text-sm font-bold text-text-muted",
                              children: "加载方块数据中...",
                            }),
                          ],
                        })
                      : y
                        ? (0, l.jsx)("div", {
                            className:
                              "grid h-[180px] place-items-center border-2 border-error bg-error/10 px-4 text-center text-sm font-bold text-error",
                            children: y,
                          })
                        : 0 === I.length
                          ? (0, l.jsx)("div", {
                              className:
                                "grid h-[180px] place-items-center border-2 border-border-hard bg-bg-elevated text-center",
                              children: (0, l.jsxs)("div", {
                                children: [
                                  (0, l.jsx)(q.A, {
                                    size: 30,
                                    className: "mx-auto mb-3 text-text-muted",
                                  }),
                                  (0, l.jsx)("p", {
                                    className: "text-sm font-bold text-text-muted",
                                    children: k ? "没有找到匹配的方块" : "暂无方块数据",
                                  }),
                                  k &&
                                    (0, l.jsx)(G.$, {
                                      size: "sm",
                                      variant: "ghost",
                                      onClick: () => {
                                        (N(""), w("全部"));
                                      },
                                      className: "mt-2",
                                      children: "清除筛选条件",
                                    }),
                                ],
                              }),
                            })
                          : (0, l.jsx)("div", {
                              className: "bsm-grid grid grid-cols-5 gap-1.5 sm:grid-cols-8",
                              children: I.map((e) =>
                                (0, l.jsx)(
                                  eI,
                                  {
                                    block: e,
                                    source: r === e.blockId,
                                    selected: E === e.blockId,
                                    onSelect: C,
                                  },
                                  e.blockId,
                                ),
                              ),
                            }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function e_(e) {
        let { label: t, blocks: s, selectedId: n, onSelect: a } = e;
        return (0, l.jsxs)("div", {
          className: "flex items-center gap-2 [&+&]:mt-2",
          children: [
            (0, l.jsx)("span", {
              className: "w-[66px] shrink-0 text-[10px] font-black text-text-muted",
              children: t,
            }),
            (0, l.jsx)("div", {
              className: "flex min-w-0 gap-1.5 overflow-x-auto cn4-scroll",
              children: s.map((e) =>
                (0, l.jsx)(
                  K.K,
                  {
                    label: "选择".concat(e.chineseName),
                    size: "sm",
                    variant: n === e.blockId ? "primary" : "secondary",
                    title: "".concat(e.chineseName, "\n").concat(e.blockId),
                    onClick: () => a(e.blockId),
                    className: "shrink-0 overflow-hidden",
                    children: (0, l.jsx)(eM, { info: e }),
                  },
                  e.blockId,
                ),
              ),
            }),
          ],
        });
      }
      function eI(e) {
        let { block: t, source: s, selected: n, onSelect: a } = e;
        return (0, l.jsxs)("button", {
          type: "button",
          onClick: () => a(t.blockId),
          title: ""
            .concat(t.chineseName, "\n")
            .concat(t.blockId)
            .concat(s ? "\n当前来源" : ""),
          className:
            "group flex min-h-[58px] min-w-0 flex-col items-center justify-center gap-1 border-2 p-1 text-center transition-all ".concat(
              n
                ? "border-brand-primary bg-brand-primary/15 shadow-block-sm"
                : s
                  ? "border-warning bg-warning/10"
                  : "border-border-hard bg-bg-elevated hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-block-sm",
            ),
          children: [
            (0, l.jsx)("span", {
              className:
                "grid h-7 w-7 place-items-center overflow-hidden border-2 border-border-soft bg-bg-card",
              children: (0, l.jsx)(eM, { info: t }),
            }),
            (0, l.jsx)("span", {
              className: "w-full truncate text-[9px] font-black leading-tight ".concat(
                n ? "text-brand-primary" : "text-text-secondary group-hover:text-text-primary",
              ),
              children: t.chineseName,
            }),
          ],
        });
      }
      function eM(e) {
        let { info: t } = e;
        return (0, l.jsx)("img", {
          src: t.textureUrl,
          alt: t.chineseName,
          className: "h-full w-full object-contain",
          style: { imageRendering: "pixelated" },
          loading: "lazy",
          onError: (e) => {
            e.currentTarget.src = "/uploads/buildings/blockID/images/Barrier.png";
          },
        });
      }
      function ez(e) {
        let { info: t, active: s } = e;
        return (0, l.jsxs)("div", {
          className: "flex items-center gap-2.5 border-2 px-2.5 py-2 ".concat(
            s ? "border-brand-primary bg-brand-primary/10" : "border-border-hard bg-bg-inset",
          ),
          children: [
            (0, l.jsx)("div", {
              className:
                "grid h-11 w-11 shrink-0 place-items-center overflow-hidden border-2 border-border-soft bg-bg-card",
              children: (0, l.jsx)(eM, { info: t }),
            }),
            (0, l.jsxs)("div", {
              className: "min-w-0 flex-1",
              children: [
                (0, l.jsx)("div", {
                  className: "truncate text-sm font-black text-text-primary",
                  children: t.chineseName,
                }),
                (0, l.jsx)("div", {
                  className: "mt-0.5 truncate font-pixel text-[10px] text-text-muted",
                  children: t.blockId,
                }),
              ],
            }),
          ],
        });
      }
      function eT(e) {
        let { label: t } = e;
        return (0, l.jsx)("div", {
          className:
            "flex h-[62px] items-center justify-center border-2 border-dashed border-border-hard bg-bg-inset px-3 text-[12px] font-bold text-text-muted",
          children: t,
        });
      }
      var eL = s(16010),
        eA = s(46),
        eB = s(1371),
        eO = s(17148),
        eR = s(33186),
        eD = s(89152),
        eP = s(78013),
        eF = s(47522),
        eH = s(93635);
      let eU = "studio-welcome-dismissed",
        eG = [
          {
            title: "基础视角",
            icon: eB.A,
            items: [
              { label: "旋转视角", desc: "按住鼠标左键拖拽旋转 3D 视角", keys: "鼠标左键拖拽" },
              { label: "缩放", desc: "使用鼠标滚轮缩放远近", keys: "滚轮" },
              {
                label: "平移视角",
                desc: "桌面端按住鼠标右键拖拽平移视角；右键短按不再打开编辑菜单",
                keys: "右键拖拽 / 双指",
              },
              {
                label: "快速切换视角",
                desc: "点击右上角坐标轴 Gizmo 快速切换到正/侧/顶视角",
                keys: "点击坐标轴",
              },
            ],
          },
          {
            title: "选择与查看",
            icon: en.A,
            items: [
              {
                label: "选择方块",
                desc: "使用选择工具点击方块，可查看名称、ID、坐标等详细信息",
                keys: "1 + 左键",
              },
              {
                label: "选区面板",
                desc: "选中方块后，桌面端在左侧面板操作；移动端从左侧工具鞍“选区”入口打开底部面板",
                keys: "左侧面板 / 选区",
              },
              {
                label: "框选区域",
                desc: "使用框选工具点击两个对角方块定义选区，空框选不会清空已有选择",
                keys: "2",
              },
              { label: "测量距离", desc: "使用测量工具点击两个方块测量三轴距离", keys: "4" },
            ],
          },
          {
            title: "编辑操作",
            icon: eO.A,
            items: [
              {
                label: "替换方块",
                desc: "先选择方块或框选区域，再在选区面板点“替换选中”；材质清单只负责统计、定位和高亮同类方块",
                keys: "选区面板",
              },
              {
                label: "镜像/旋转",
                desc: "当前会对整个投影执行结构变换，并进入撤销栈；保存后会转为 .schem 基准文件",
                keys: "3 + 确认",
              },
              {
                label: "删除方块",
                desc: "桌面端在左侧选区面板或按 Delete；移动端在选区底部面板中执行删除",
                keys: "Delete / 选区面板",
              },
              { label: "撤销/重做", desc: "操作后可随时撤销或重做", keys: "Ctrl+Z / Ctrl+Y" },
            ],
          },
          {
            title: "高级功能",
            icon: eR.A,
            items: [
              {
                label: "同层/同材质选择",
                desc: "在选区面板中可扩展到相同材质、相同 Y 层或连通方块",
                keys: "选区面板",
              },
              {
                label: "隐藏方块",
                desc: "在选区面板中可隐藏选中、只显示选中、显示到当前层或取消所有隐藏",
                keys: "选区面板",
              },
              {
                label: "撤销/重做",
                desc: "替换、删除等操作可用快捷键撤销或重做",
                keys: "Ctrl+Z / Ctrl+Y",
              },
              {
                label: "爆炸图",
                desc: "按层展开建筑结构，只改变查看方式，不承载方块编辑",
                keys: "5",
              },
            ],
          },
          {
            title: "移动端与预览",
            icon: eD.A,
            items: [
              {
                label: "竖屏横屏都可用",
                desc: "竖屏：工具鞍在画布左侧、Y 层竖条在右侧，面板从底部升起；横屏：左侧只留工具、选区/材质/视图入口在右侧，面板从右侧滑入不吃画布高度",
                keys: "竖屏 / 横屏",
              },
              {
                label: "触屏没有右键",
                desc: "选中方块后从“选区”入口打开面板（竖屏在左侧鞍、横屏在右侧入口列）；选区、材质、视图三个面板互斥显示",
                keys: "选区",
              },
              {
                label: "画布背景可切换",
                desc: "“视图”面板里有深空 / 石墨 / 云白 / 天空四档，背景与网格色成套切；登录后跟着账号走，未登录存在本机",
                keys: "视图",
              },
              {
                label: "第一人称是预览",
                desc: "行走预览只用于看空间，不能选择、替换或删除方块",
                keys: "V",
              },
              {
                label: "保存与导出",
                desc: "保存到账号和导出文件需要登录；账号保存上限约 ".concat(
                  eA.qq,
                  "MB，超过时请先本地导出",
                ),
                keys: "保存 / 导出",
              },
            ],
          },
        ];
      function eK(e) {
        let { guideOpen: t, onGuideClose: s } = e,
          [a, r] = (0, n.useState)(!1),
          [i, o] = (0, n.useState)(!1),
          [c, d] = (0, n.useState)(0);
        ((0, n.useEffect)(() => {
          if (!localStorage.getItem(eU)) {
            let e = setTimeout(() => r(!0), 800);
            return () => clearTimeout(e);
          }
        }, []),
          (0, n.useEffect)(() => {
            t && (r(!1), o(!0));
          }, [t]),
          (0, n.useEffect)(() => {
            i && r(!1);
          }, [i]));
        let u = (0, n.useCallback)(() => {
            r(!1);
          }, []),
          m = (0, n.useCallback)(() => {
            (localStorage.setItem(eU, "1"), r(!1));
          }, []),
          x = (0, n.useCallback)(() => {
            (r(!1), o(!0));
          }, []),
          p = (0, n.useCallback)(() => {
            (o(!1), null == s || s());
          }, [s]);
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)(eS.a, {
              open: a,
              onClose: u,
              title: "",
              size: "sm",
              children: (0, l.jsxs)("div", {
                className: "flex flex-col items-center text-center py-2",
                children: [
                  (0, l.jsx)("img", {
                    src: (0, eL.d)("/images/icons/Icon_Stuido.png"),
                    alt: "投影编辑器",
                    className:
                      "w-20 h-20 object-contain mb-4 [filter:drop-shadow(4px_4px_0_rgba(0,0,0,0.6))]",
                  }),
                  (0, l.jsx)("h2", {
                    className: "text-lg font-pixel font-extrabold text-text-primary mb-2",
                    children: "欢迎使用 Studio",
                  }),
                  (0, l.jsx)("p", {
                    className: "text-sm text-text-secondary mb-1",
                    children: "在这里你可以查看、编辑和替换投影文件中的方块",
                  }),
                  (0, l.jsx)("p", {
                    className: "text-xs text-text-muted mb-6",
                    children: "支持旋转查看、方块选择、批量替换、测量、镜像等操作",
                  }),
                  (0, l.jsxs)("div", {
                    className: "flex flex-col gap-2 w-full",
                    children: [
                      (0, l.jsxs)(G.$, {
                        size: "lg",
                        variant: "primary",
                        onClick: x,
                        className: "w-full",
                        children: [(0, l.jsx)(eP.A, { size: 14 }), "查看操作指引"],
                      }),
                      (0, l.jsx)(G.$, {
                        size: "md",
                        variant: "secondary",
                        onClick: u,
                        className: "w-full",
                        children: "跳过，直接开始",
                      }),
                    ],
                  }),
                  (0, l.jsx)(G.$, {
                    size: "xs",
                    variant: "ghost",
                    onClick: m,
                    className: "mt-3 !text-[10px]",
                    children: "不再显示此欢迎页",
                  }),
                ],
              }),
            }),
            (0, l.jsx)(eS.a, {
              open: i,
              onClose: p,
              title: "Studio 操作指引",
              size: "xl",
              footer: (0, l.jsxs)(eS.y, {
                variant: "primary",
                onClick: p,
                children: [(0, l.jsx)(eF.A, { size: 14 }), "知道了，开始创作"],
              }),
              children: (0, l.jsxs)("div", {
                className: "flex flex-col md:flex-row gap-0 min-h-[400px] -m-4 md:-m-5",
                children: [
                  (0, l.jsx)("div", {
                    className:
                      "md:w-[200px] shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-border-hard bg-bg-inset",
                    children: (0, l.jsx)("div", {
                      className: "flex md:flex-col overflow-x-auto md:overflow-x-visible",
                      children: eG.map((e, t) => {
                        let s = e.icon;
                        return (0, l.jsxs)(
                          G.$,
                          {
                            size: "sm",
                            variant: c === t ? "primary" : "ghost",
                            onClick: () => d(t),
                            className:
                              "\n                      shrink-0 !justify-start !px-4 text-xs whitespace-nowrap !shadow-none border-b-2 md:w-full md:border-b-0 md:border-l-2\n                      ".concat(
                                c === t
                                  ? "border-brand-primary"
                                  : "text-text-muted border-transparent hover:text-text-primary hover:bg-bg-card/50",
                                "\n                    ",
                              ),
                            children: [
                              (0, l.jsx)(s, {
                                size: 14,
                                className: c === t ? "text-brand-primary" : "",
                              }),
                              e.title,
                            ],
                          },
                          t,
                        );
                      }),
                    }),
                  }),
                  (0, l.jsxs)("div", {
                    className: "flex-1 p-4 md:p-5 overflow-y-auto cn4-scroll",
                    children: [
                      (0, l.jsxs)("h3", {
                        className:
                          "text-base font-pixel font-extrabold text-text-primary mb-1 flex items-center gap-2",
                        children: [
                          (() => {
                            let e = eG[c].icon;
                            return (0, l.jsx)(e, { size: 16, className: "text-brand-primary" });
                          })(),
                          eG[c].title,
                        ],
                      }),
                      (0, l.jsxs)("p", {
                        className: "text-xs text-text-muted mb-4",
                        children: [
                          0 === c && "掌握基础的 3D 视角控制方法",
                          1 === c && "学会选择和查看方块信息",
                          2 === c && "核心的编辑和修改操作",
                          3 === c && "进阶的编辑器功能",
                          4 === c && "移动端和第一人称预览的使用边界",
                        ],
                      }),
                      (0, l.jsx)("div", {
                        className: "flex flex-col gap-3",
                        children: eG[c].items.map((e, t) =>
                          (0, l.jsxs)(
                            "div",
                            {
                              className:
                                "bg-bg-inset border-2 border-border-hard p-3 flex items-start gap-3",
                              children: [
                                (0, l.jsx)("div", {
                                  className:
                                    "w-8 h-8 bg-bg-deep border border-border-hard flex items-center justify-center shrink-0 text-text-muted text-sm font-extrabold",
                                  children: t + 1,
                                }),
                                (0, l.jsxs)("div", {
                                  className: "flex-1 min-w-0",
                                  children: [
                                    (0, l.jsxs)("div", {
                                      className: "flex items-center gap-2 mb-0.5",
                                      children: [
                                        (0, l.jsx)("span", {
                                          className: "text-sm font-extrabold text-text-primary",
                                          children: e.label,
                                        }),
                                        (0, l.jsx)("span", {
                                          className:
                                            "px-1.5 py-0.5 bg-bg-deep border border-border-hard text-[9px] font-mono font-bold text-text-muted",
                                          children: e.keys,
                                        }),
                                      ],
                                    }),
                                    (0, l.jsx)("p", {
                                      className: "text-xs text-text-secondary leading-relaxed",
                                      children: e.desc,
                                    }),
                                  ],
                                }),
                              ],
                            },
                            t,
                          ),
                        ),
                      }),
                      c === eG.length - 1 &&
                        (0, l.jsxs)("div", {
                          className: "mt-4 p-3 bg-brand-primary/5 border-2 border-brand-primary/20",
                          children: [
                            (0, l.jsxs)("h4", {
                              className: "text-xs font-extrabold text-brand-primary mb-2",
                              children: [
                                (0, l.jsx)(eH.A, { size: 16, className: "mr-1.5" }),
                                " 快捷键速查",
                              ],
                            }),
                            (0, l.jsx)("div", {
                              className:
                                "grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-[10px]",
                              children: [
                                ["1", "选择"],
                                ["2", "框选"],
                                ["3", "镜像/旋转"],
                                ["4", "测量"],
                                ["5", "爆炸图"],
                                ["左侧/选区", "选区操作"],
                                ["Delete", "删除选中"],
                                ["Esc", "取消选择"],
                                ["Ctrl+Z", "撤销"],
                                ["Ctrl+Y", "重做"],
                              ].map((e) => {
                                let [t, s] = e;
                                return (0, l.jsxs)(
                                  "div",
                                  {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                      (0, l.jsx)("kbd", {
                                        className:
                                          "px-1 py-0.5 bg-bg-deep border border-border-hard font-mono font-bold text-text-muted min-w-[40px] text-center",
                                        children: t,
                                      }),
                                      (0, l.jsx)("span", {
                                        className: "text-text-secondary",
                                        children: s,
                                      }),
                                    ],
                                  },
                                  t,
                                );
                              }),
                            }),
                          ],
                        }),
                      (0, l.jsxs)("div", {
                        className:
                          "flex items-center justify-between mt-4 pt-3 border-t-2 border-border-hard",
                        children: [
                          (0, l.jsxs)(G.$, {
                            size: "sm",
                            variant: "ghost",
                            onClick: () => d(Math.max(0, c - 1)),
                            disabled: 0 === c,
                            children: [(0, l.jsx)(B.A, { size: 16 }), " 上一节"],
                          }),
                          (0, l.jsx)("div", {
                            className: "flex gap-1.5",
                            children: eG.map((e, t) =>
                              (0, l.jsx)(
                                K.K,
                                {
                                  label: "查看第 ".concat(t + 1, " 节"),
                                  size: "xs",
                                  variant: "ghost",
                                  onClick: () => d(t),
                                  "aria-pressed": t === c,
                                  className: "!border-transparent !shadow-none",
                                  children: (0, l.jsx)("span", {
                                    className: "h-2 w-2 ".concat(
                                      t === c ? "bg-brand-primary" : "bg-border-hard",
                                    ),
                                  }),
                                },
                                t,
                              ),
                            ),
                          }),
                          (0, l.jsxs)(G.$, {
                            size: "sm",
                            variant: "ghost",
                            onClick: () => d(Math.min(eG.length - 1, c + 1)),
                            disabled: c === eG.length - 1,
                            children: ["下一节", (0, l.jsx)(Y.A, { size: 16 })],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      }
      var eW = s(99099);
      function eY(e) {
        let { cameraMode: t } = e,
          s = "fps" === t,
          [a, r] = (0, n.useState)(!0);
        (0, n.useEffect)(() => {
          r(!0);
        }, [s]);
        let i = s ? "absolute bottom-14 right-14 z-[5]" : "absolute bottom-14 left-3 z-[5]";
        return a
          ? (0, l.jsx)(K.K, {
              label: "展开操作说明",
              size: "xs",
              variant: "secondary",
              onClick: () => r(!1),
              onMouseEnter: () => r(!1),
              className: "".concat(i, " pointer-events-auto bg-bg-card/80"),
              title: "操作说明",
              children: (0, l.jsx)(eH.A, { size: 11 }),
            })
          : (0, l.jsxs)("div", {
              className: "".concat(
                i,
                " min-w-[200px] bg-bg-card border-2 border-border-hard shadow-block-sm pointer-events-auto",
              ),
              children: [
                (0, l.jsxs)("button", {
                  type: "button",
                  className:
                    "flex min-h-9 w-full items-center justify-between px-3.5 py-2.5 text-left select-none hover:bg-bg-elevated transition-colors",
                  onClick: () => r(!a),
                  children: [
                    (0, l.jsxs)("h3", {
                      className:
                        "text-[11px] font-black text-brand-primary uppercase tracking-wider flex items-center gap-1.5 m-0",
                      children: [(0, l.jsx)(eH.A, { size: 11 }), "操作说明"],
                    }),
                    (0, l.jsx)(eW.A, {
                      size: 10,
                      className: "text-text-muted transition-transform duration-200 ".concat(
                        a ? "rotate-180" : "",
                      ),
                    }),
                  ],
                }),
                (0, l.jsx)("div", {
                  className: "overflow-hidden transition-all duration-200 ease-out ".concat(
                    a ? "max-h-0 py-0" : "max-h-[320px]",
                  ),
                  children: (0, l.jsx)("div", {
                    className: "px-3.5 pb-3",
                    children:
                      "orbit" === t
                        ? (0, l.jsxs)("div", {
                            className: "flex flex-col gap-1",
                            children: [
                              (0, l.jsx)(eq, { keyLabel: "左键", desc: "选择方块", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "Ctrl+左", desc: "多选", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "左键拖", desc: "旋转视角", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "右键拖", desc: "平移视角", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "右键", desc: "查看面板提示", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "触屏", desc: "顶部选区入口", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "滚轮", desc: "缩放" }),
                              (0, l.jsx)(eq, { keyLabel: "1-5", desc: "切换工具" }),
                              (0, l.jsx)(eq, { keyLabel: "V", desc: "只读行走预览", wide: !0 }),
                            ],
                          })
                        : (0, l.jsxs)("div", {
                            className: "flex flex-col gap-1",
                            children: [
                              (0, l.jsx)(eq, {
                                keyLabel: "预览",
                                desc: "不支持选块或编辑",
                                wide: !0,
                              }),
                              (0, l.jsx)(eq, { keyLabel: "点画布", desc: "锁定鼠标", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "WASD", desc: "移动", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "Space", desc: "上升", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "Shift", desc: "下降" }),
                              (0, l.jsx)(eq, { keyLabel: "滚轮", desc: "调速度" }),
                              (0, l.jsx)(eq, { keyLabel: "Esc", desc: "释放鼠标", wide: !0 }),
                              (0, l.jsx)(eq, { keyLabel: "V", desc: "回编辑视角", wide: !0 }),
                            ],
                          }),
                  }),
                }),
              ],
            });
      }
      function eq(e) {
        let { keyLabel: t, desc: s, wide: n } = e;
        return (0, l.jsxs)("div", {
          className: "flex items-center gap-2.5",
          children: [
            (0, l.jsx)("span", {
              className: "inline-flex items-center justify-center ".concat(
                n ? "min-w-[54px]" : "min-w-[36px]",
                " h-[22px] px-1.5 bg-bg-inset border-2 border-border-hard font-pixel text-[11px] font-black text-text-primary text-center",
              ),
              children: t,
            }),
            (0, l.jsx)("span", { className: "text-[11px] text-text-muted font-bold", children: s }),
          ],
        });
      }
      let e$ = /_door$/,
        eV = /_bed$/,
        eJ = new Set(["minecraft:chest", "minecraft:trapped_chest"]),
        eX = new Set([
          "minecraft:tall_grass",
          "minecraft:large_fern",
          "minecraft:sunflower",
          "minecraft:lilac",
          "minecraft:rose_bush",
          "minecraft:peony",
          "minecraft:tall_seagrass",
          "minecraft:small_dripleaf",
          "minecraft:pitcher_plant",
          "minecraft:pitcher_crop",
        ]),
        eZ = { north: [0, 0, -1], south: [0, 0, 1], east: [1, 0, 0], west: [-1, 0, 0] },
        eQ = {
          north: { left: [1, 0, 0], right: [-1, 0, 0] },
          south: { left: [-1, 0, 0], right: [1, 0, 0] },
          east: { left: [0, 0, 1], right: [0, 0, -1] },
          west: { left: [0, 0, -1], right: [0, 0, 1] },
        };
      function e0(e, t) {
        let s = [t.position],
          l = t.blockId.replace("minecraft:", ""),
          n = t.properties || {},
          [a, r, i] = t.position,
          o = new Set(
            e.blocks.map((e) =>
              "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
            ),
          ),
          c = (e) => {
            o.has("".concat(e[0], ",").concat(e[1], ",").concat(e[2])) && s.push(e);
          };
        if (
          (e$.test(l) &&
            n.half &&
            ("upper" === n.half ? c([a, r - 1, i]) : "lower" === n.half && c([a, r + 1, i])),
          eV.test(l) && n.part && n.facing)
        ) {
          let e = eZ[n.facing];
          e &&
            ("head" === n.part
              ? c([a - e[0], r, i - e[2]])
              : "foot" === n.part && c([a + e[0], r, i + e[2]]));
        }
        if (eJ.has(t.blockId) && n.type && "single" !== n.type && n.facing) {
          let e = eQ[n.facing],
            t = null == e ? void 0 : e[n.type];
          t && c([a + t[0], r + t[1], i + t[2]]);
        }
        return (
          eX.has(t.blockId) &&
            n.half &&
            ("upper" === n.half ? c([a, r - 1, i]) : "lower" === n.half && c([a, r + 1, i])),
          s
        );
      }
      var e1 = s(61456),
        e2 = s(26195),
        e5 = s(21258),
        e3 = s(13175),
        e4 = s(24155),
        e6 = s(71191);
      let e8 = {
        select: { title: "选择工具" },
        region: { title: "框选工具" },
        mirror: { title: "镜像 / 旋转" },
        measure: { title: "测量工具" },
        explode: { title: "爆炸图预览" },
        move: { title: "移动工具" },
      };
      function e9(e) {
        let { children: t, onClick: s, disabled: n, variant: a = "normal" } = e,
          r = "sel-btn"
            .concat("primary" === a ? " primary" : "")
            .concat("danger" === a ? " danger" : "")
            .concat("muted" === a ? " muted" : "");
        return (0, l.jsx)(G.$, {
          size: "sm",
          variant:
            "primary" === a
              ? "warning"
              : "danger" === a
                ? "danger"
                : "muted" === a
                  ? "ghost"
                  : "secondary",
          className: r,
          onClick: s,
          disabled: n,
          children: t,
        });
      }
      function e7(e) {
        let { title: t, icon: s, children: n, className: a } = e;
        return (0, l.jsxs)("section", {
          className: "sel-section".concat(a ? " ".concat(a) : ""),
          children: [(0, l.jsxs)("div", { className: "sel-section-title", children: [s, t] }), n],
        });
      }
      function te(e) {
        let { full: t, short: s } = e;
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)("span", { className: "lbl-desk", children: t }),
            (0, l.jsx)("span", { className: "lbl-mob", children: s }),
          ],
        });
      }
      function tt(e) {
        let { icon: t, main: s, sub: n, onClear: a, clearLabel: r } = e;
        return (0, l.jsxs)("div", {
          className: "sel-sum-mob",
          children: [
            (0, l.jsx)("span", { className: "ico", children: t }),
            (0, l.jsxs)("span", {
              className: "txt",
              children: [(0, l.jsx)("b", { children: s }), (0, l.jsx)("em", { children: n })],
            }),
            a &&
              (0, l.jsx)(G.$, {
                size: "xs",
                variant: "ghost",
                className: "sum-x",
                onClick: a,
                "aria-label": r || "清空",
                title: r || "清空",
                children: (0, l.jsx)(V.A, { size: 11 }),
              }),
          ],
        });
      }
      function ts(e) {
        var t, s, n, a;
        let {
            currentTool: r,
            selectedBlock: i,
            selectedBlockStat: o,
            selectedBlockBareId: c,
            selectedActionCount: d,
            selectedEntity: u,
            entityTitle: m,
            entitySubTitle: x,
            selectionPoints: p,
            selectionSize: h,
            regionBlocksInSelection: b,
            measurePoints: f,
            measureMetrics: g,
            explodeSpacing: j,
            hiddenScopeCount: y,
            layerCutoff: v,
            selectionMaterials: k = [],
            layerMinY: N = null,
            layerMaxY: S = null,
            layerMode: w = "slice",
            onClearSelection: E,
            onClearEntity: C,
            onReplaceSelection: _,
            onDeleteSelection: I,
            onSelectSameMaterial: M,
            onSelectSameLayer: z,
            onSelectConnected: T,
            onCopySelected: L,
            onHideSelection: A,
            onShowOnlySelection: B,
            onOnlyCurrentLayer: O,
            onShowToCurrentLayer: R,
            onRestoreAllVisible: D,
            onResetRegion: P,
            onResetMeasure: F,
            onExitTool: H,
            onGeometryOp: K,
            onExplodeChange: W,
          } = e,
          Y = d > 0,
          $ = d > 0 ? " ".concat(d, " 块") : "",
          J = null != (s = null == (t = e8[r]) ? void 0 : t.title) ? s : "选区操作",
          X =
            "explode" === r
              ? "只读"
              : "measure" === r
                ? g
                  ? "跨度 ".concat(g.span.join("\xd7"))
                  : "待测量"
                : "".concat(d, " 块"),
          Q =
            "region" === r
              ? Y
                ? "框选结果"
                : p.length > 0
                  ? "框选中"
                  : "未命中"
              : "select" === r
                ? u
                  ? "实体识别"
                  : Y
                    ? "当前选择"
                    : "未选中"
                : "mirror" === r
                  ? "整体变换"
                  : "measure" === r
                    ? "临时测量"
                    : "explode" === r
                      ? "结构查看"
                      : "当前工具",
          ee = "explode" === r || "mirror" === r,
          et =
            "explode" === r
              ? "只读模式"
              : "mirror" === r
                ? "需确认"
                : "measure" === r
                  ? "不改投影"
                  : Y
                    ? "可编辑"
                    : "region" === r && p.length > 0
                      ? "等待松开"
                      : "先选择方块",
          es =
            "select" === r
              ? {
                  options: ["已选中", "未选中", "实体"],
                  active: u ? "实体" : Y ? "已选中" : "未选中",
                }
              : "region" === r
                ? {
                    options: ["已框选", "框选中", "未命中"],
                    active: Y ? "已框选" : p.length > 0 ? "框选中" : "未命中",
                  }
                : null,
          el = (() => {
            if ("measure" === r) {
              let e =
                0 === f.length
                  ? "点击第一个方块作为 A 点。"
                  : 1 === f.length
                    ? "点击第二个方块作为 B 点。"
                    : "测量完成，可重置或退出。";
              return {
                key: "4",
                hint: "".concat(e, " 点击用于采集测量点，不选择或替换方块。"),
                tone: "info",
              };
            }
            if ("region" === r) {
              let e =
                0 === p.length
                  ? "点击选区起点。"
                  : 1 === p.length
                    ? "点击选区终点。"
                    : "选区已生成，可用端点轴柄微调，再从下方替换或删除。";
              return {
                key: "2",
                hint: "".concat(e, " 点击用于定义选区，不是普通单块选择。"),
                tone: "info",
              };
            }
            return "mirror" === r
              ? {
                  key: "3",
                  hint: "这些操作会影响整个模型；确认后可用 Ctrl+Z 撤销，请先确认方向。",
                  tone: "warn",
                }
              : "explode" === r
                ? {
                    key: "5",
                    hint: "爆炸图只用于看清层间结构，不承载方块点选、替换或右键操作。",
                    tone: "warn",
                  }
                : {
                    key: "1",
                    hint: "点击方块选择；替换、删除、隐藏都在下方面板执行。",
                    deskHint: "Ctrl 可追加多选。",
                    tone: "info",
                  };
          })(),
          ec = k.reduce((e, t) => e + t.count, 0),
          ed = k.slice(0, 6),
          eu = k.length - ed.length,
          em = () =>
            0 === k.length
              ? null
              : (0, l.jsxs)("section", {
                  className: "sel-mats",
                  children: [
                    (0, l.jsxs)("div", {
                      className: "sel-mats-head",
                      children: [
                        (0, l.jsx)("span", { className: "k", children: "选区材质构成" }),
                        (0, l.jsxs)("span", {
                          className: "v",
                          children: [ec.toLocaleString(), " 块 \xb7 ", k.length, " 种"],
                        }),
                      ],
                    }),
                    (0, l.jsxs)("div", {
                      className: "sel-mats-list",
                      children: [
                        ed.map((e) =>
                          (0, l.jsxs)(
                            "div",
                            {
                              className: "sel-mat-row",
                              children: [
                                (0, l.jsx)("span", {
                                  className: "sw",
                                  children: e.textureUrl
                                    ? (0, l.jsx)("img", { src: e.textureUrl, alt: "" })
                                    : (0, l.jsx)(q.A, { size: 11 }),
                                }),
                                (0, l.jsxs)("span", {
                                  className: "info",
                                  children: [
                                    (0, l.jsx)("span", {
                                      className: "name",
                                      children: e.chineseName,
                                    }),
                                    (0, l.jsx)("span", {
                                      className: "id",
                                      children: (0, l.jsx)(Z, { children: e.blockId }),
                                    }),
                                  ],
                                }),
                                (0, l.jsxs)("span", {
                                  className: "n",
                                  children: [
                                    (0, l.jsx)("i", { children: "\xd7" }),
                                    e.count.toLocaleString(),
                                  ],
                                }),
                              ],
                            },
                            e.blockId,
                          ),
                        ),
                        eu > 0 &&
                          (0, l.jsxs)("div", {
                            className: "sel-mats-more",
                            children: ["还有 ", eu, " 种，完整清单见右侧材质面板。"],
                          }),
                      ],
                    }),
                  ],
                }),
          ex = null != N && null != S && S >= N ? S - N + 1 : null,
          ep =
            null == v
              ? null != ex
                ? "全部 ".concat(ex, " 层")
                : "全部层"
              : "".concat(v).concat(null != S ? " / ".concat(S) : ""),
          eh = y > 0 || null != v;
        return (0, l.jsxs)("div", {
          className: "ed-select-inner",
          children: [
            (0, l.jsxs)("div", {
              className: "ed-select-head",
              children: [
                (0, l.jsx)("span", {
                  className: "mode-key".concat("warn" === el.tone ? " warn" : ""),
                  children: el.key,
                }),
                (0, l.jsx)("h3", { children: J }),
                (0, l.jsx)("span", {
                  className: "sel-count",
                  children: (0, l.jsx)(Z, { children: X }),
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "ed-mode-hint".concat(
                "select" === r || "region" === r || "measure" === r ? " mob-hidden" : "",
              ),
              children: [
                el.hint,
                el.deskHint &&
                  (0, l.jsxs)("span", { className: "hint-desk", children: [" ", el.deskHint] }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "ed-tool-state",
              children: [
                (0, l.jsx)(U.E, {
                  tone: "brand",
                  variant: "solid",
                  size: "sm",
                  className: "tool-pill",
                  children: Q,
                }),
                (0, l.jsx)(e6.P, {
                  tone: ee ? "warning" : Y ? "success" : "neutral",
                  className: "tool-status".concat(ee ? " readonly" : ""),
                  children: et,
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "ed-select-scroll cn4-scroll",
              children: [
                es &&
                  (0, l.jsx)("div", {
                    className: "panel-state-switch",
                    role: "group",
                    "aria-label": "当前选择状态",
                    children: es.options.map((e) =>
                      (0, l.jsx)(
                        "span",
                        {
                          className: e === es.active ? "on" : "",
                          "aria-current": e === es.active ? "true" : void 0,
                          children: e,
                        },
                        e,
                      ),
                    ),
                  }),
                "select" === r &&
                  i &&
                  (0, l.jsxs)(l.Fragment, {
                    children: [
                      (0, l.jsxs)(e7, {
                        className: "sel-sum-sec",
                        title: "已选内容",
                        icon: (0, l.jsx)(ea.A, { size: 13 }),
                        children: [
                          (0, l.jsxs)("div", {
                            className: "sel-summary",
                            children: [
                              (0, l.jsx)("span", {
                                className: "sw",
                                children: (null == o ? void 0 : o.textureUrl)
                                  ? (0, l.jsx)("img", { src: o.textureUrl, alt: "" })
                                  : (0, l.jsx)("span", {
                                      style: {
                                        display: "grid",
                                        placeItems: "center",
                                        width: "100%",
                                        height: "100%",
                                        color: "var(--warning)",
                                      },
                                      children: (0, l.jsx)(q.A, { size: 18 }),
                                    }),
                              }),
                              (0, l.jsxs)("div", {
                                style: { minWidth: 0 },
                                children: [
                                  (0, l.jsx)("div", {
                                    className: "name",
                                    children: (null == o ? void 0 : o.chineseName) || c,
                                  }),
                                  (0, l.jsx)("div", { className: "id", children: c }),
                                  (0, l.jsx)("span", {
                                    className: "badge",
                                    children: d > 1 ? "".concat(d, " 块已选") : "1 块已选",
                                  }),
                                  (0, l.jsxs)("div", {
                                    className: "sel-props-mob",
                                    children: [
                                      "坐标 ",
                                      (0, l.jsx)("b", {
                                        children: (0, l.jsx)(Z, { children: i.position.join(",") }),
                                      }),
                                      (0, l.jsx)("span", { className: "mx", children: " \xb7 " }),
                                      "同材质 ",
                                      (0, l.jsx)("b", {
                                        children: (null != (n = null == o ? void 0 : o.count)
                                          ? n
                                          : 0
                                        ).toLocaleString(),
                                      }),
                                      " 块",
                                    ],
                                  }),
                                ],
                              }),
                              (0, l.jsx)(G.$, {
                                size: "xs",
                                variant: "ghost",
                                className: "sum-x",
                                onClick: E,
                                disabled: !Y,
                                "aria-label": "清空选择",
                                title: "清空选择",
                                children: (0, l.jsx)(V.A, { size: 11 }),
                              }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "sel-props sel-props-desk",
                            children: [
                              (0, l.jsxs)("div", {
                                className: "sel-prop",
                                children: [
                                  (0, l.jsx)("span", { className: "k", children: "代表坐标" }),
                                  (0, l.jsx)("span", {
                                    className: "v",
                                    children: (0, l.jsx)(Z, { children: i.position.join(", ") }),
                                  }),
                                ],
                              }),
                              (0, l.jsxs)("div", {
                                className: "sel-prop",
                                children: [
                                  (0, l.jsx)("span", { className: "k", children: "同材质数量" }),
                                  (0, l.jsx)("span", {
                                    className: "v",
                                    children: null != (a = null == o ? void 0 : o.count) ? a : "--",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          em(),
                        ],
                      }),
                      (0, l.jsx)(e7, {
                        className: "sel-main-acts",
                        title: "主操作",
                        icon: (0, l.jsx)(er.A, { size: 13 }),
                        children: (0, l.jsxs)("div", {
                          className: "sel-actions",
                          children: [
                            (0, l.jsxs)(e9, {
                              variant: "primary",
                              onClick: _,
                              disabled: !Y,
                              children: [(0, l.jsx)(er.A, { size: 13 }), "替换选中", $],
                            }),
                            (0, l.jsxs)(e9, {
                              variant: "danger",
                              onClick: I,
                              disabled: !Y,
                              children: [(0, l.jsx)(e1.A, { size: 13 }), "删除选中"],
                            }),
                            (0, l.jsxs)(e9, {
                              variant: "muted",
                              onClick: E,
                              disabled: !Y,
                              children: [(0, l.jsx)(V.A, { size: 13 }), "清空选择"],
                            }),
                          ],
                        }),
                      }),
                      (0, l.jsx)(e7, {
                        title: "选择扩展",
                        icon: (0, l.jsx)(eo.A, { size: 13 }),
                        children: (0, l.jsxs)("div", {
                          className: "sel-actions sel-actions-q4",
                          children: [
                            (0, l.jsx)(e9, { onClick: M, children: "相同材质" }),
                            (0, l.jsx)(e9, { onClick: z, children: "同 Y 层" }),
                            (0, l.jsx)(e9, { onClick: T, children: "连通块" }),
                            (0, l.jsxs)(e9, {
                              onClick: L,
                              children: [(0, l.jsx)(e2.A, { size: 13 }), "复制信息"],
                            }),
                          ],
                        }),
                      }),
                      (0, l.jsxs)(e7, {
                        title: "对选区的可见性",
                        icon: (0, l.jsx)(eb.A, { size: 13 }),
                        children: [
                          (0, l.jsxs)("div", {
                            className: "sel-actions sel-actions-q4",
                            children: [
                              (0, l.jsxs)(e9, {
                                onClick: A,
                                children: [
                                  (0, l.jsx)(e5.A, { size: 13 }),
                                  (0, l.jsx)(te, { full: "隐藏选中", short: "隐藏" }),
                                ],
                              }),
                              (0, l.jsxs)(e9, {
                                onClick: B,
                                children: [
                                  (0, l.jsx)(eb.A, { size: 13 }),
                                  (0, l.jsx)(te, { full: "只显示选中", short: "只显示" }),
                                ],
                              }),
                              (0, l.jsx)(e9, {
                                onClick: O,
                                children: (0, l.jsx)(te, { full: "只看该层", short: "只看层" }),
                              }),
                              (0, l.jsx)(e9, {
                                onClick: R,
                                children: (0, l.jsx)(te, { full: "显示到该层", short: "到该层" }),
                              }),
                            ],
                          }),
                          (0, l.jsx)("div", {
                            className: "sel-note",
                            children: "这里只处理当前选区；恢复全部显示在面板底部的「视图状态」。",
                          }),
                        ],
                      }),
                    ],
                  }),
                "select" === r &&
                  u &&
                  !i &&
                  (0, l.jsxs)(e7, {
                    title: "实体识别",
                    icon: (0, l.jsx)(e3.A, { size: 13 }),
                    children: [
                      (0, l.jsxs)("div", {
                        className: "sel-summary",
                        children: [
                          (0, l.jsx)("span", {
                            className: "sw",
                            style: {
                              background: "#3f4347",
                              display: "grid",
                              placeItems: "center",
                              color: "var(--green)",
                            },
                            children: (0, l.jsx)(e3.A, { size: 18 }),
                          }),
                          (0, l.jsxs)("div", {
                            style: { minWidth: 0 },
                            children: [
                              (0, l.jsx)("div", { className: "name", children: m }),
                              (0, l.jsx)("div", { className: "id", children: x }),
                              (0, l.jsx)("span", { className: "badge", children: "仅显示信息" }),
                            ],
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        className: "sel-props",
                        children: [
                          (0, l.jsxs)("div", {
                            className: "sel-prop",
                            children: [
                              (0, l.jsx)("span", { className: "k", children: "处理方式" }),
                              (0, l.jsx)("span", { className: "v", children: "只读" }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "sel-prop",
                            children: [
                              (0, l.jsx)("span", { className: "k", children: "替换/删除" }),
                              (0, l.jsx)("span", { className: "v", children: "不可用" }),
                            ],
                          }),
                        ],
                      }),
                      (0, l.jsx)("div", {
                        className: "sel-actions",
                        children: (0, l.jsxs)(e9, {
                          variant: "muted",
                          onClick: C,
                          children: [(0, l.jsx)(V.A, { size: 13 }), "关闭实体信息"],
                        }),
                      }),
                      (0, l.jsx)("div", {
                        className: "tool-readonly",
                        children: "实体只做识别和定位提示，不进入方块替换、删除或批量编辑流程。",
                      }),
                    ],
                  }),
                "select" === r &&
                  !i &&
                  !u &&
                  (0, l.jsxs)(e7, {
                    className: "sel-sum-sec",
                    title: "选择方块",
                    icon: (0, l.jsx)(en.A, { size: 13 }),
                    children: [
                      (0, l.jsxs)("div", {
                        className: "sel-empty",
                        children: [
                          (0, l.jsx)(en.A, { size: 15, className: "empty-icon" }),
                          (0, l.jsx)("div", {
                            className: "empty-title",
                            children: "点画布里的方块开始选择",
                          }),
                          (0, l.jsx)("div", {
                            className: "empty-desc",
                            children: "选中后替换、删除、隐藏都会在这里执行。",
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        className: "sel-actions sel-main-acts",
                        children: [
                          (0, l.jsxs)(e9, {
                            variant: "primary",
                            disabled: !0,
                            children: [(0, l.jsx)(er.A, { size: 13 }), "替换选中"],
                          }),
                          (0, l.jsxs)(e9, {
                            variant: "danger",
                            disabled: !0,
                            children: [(0, l.jsx)(e1.A, { size: 13 }), "删除选中"],
                          }),
                        ],
                      }),
                    ],
                  }),
                "region" === r &&
                  (0, l.jsxs)(l.Fragment, {
                    children: [
                      (0, l.jsxs)(e7, {
                        className: "sel-sum-sec",
                        title: "已选内容",
                        icon: (0, l.jsx)(ea.A, { size: 13 }),
                        children: [
                          (0, l.jsxs)("div", {
                            className: "sel-props sel-props-desk",
                            children: [
                              (0, l.jsxs)("div", {
                                className: "sel-prop",
                                children: [
                                  (0, l.jsx)("span", { className: "k", children: "A 点" }),
                                  (0, l.jsx)("span", {
                                    className: "v",
                                    children: (0, l.jsx)(Z, {
                                      children: p[0] ? p[0].join(", ") : "等待起点",
                                    }),
                                  }),
                                ],
                              }),
                              (0, l.jsxs)("div", {
                                className: "sel-prop",
                                children: [
                                  (0, l.jsx)("span", { className: "k", children: "B 点" }),
                                  (0, l.jsx)("span", {
                                    className: "v",
                                    children: (0, l.jsx)(Z, {
                                      children: p[1] ? p[1].join(", ") : "等待终点",
                                    }),
                                  }),
                                ],
                              }),
                              h &&
                                (0, l.jsxs)("div", {
                                  className: "sel-prop",
                                  children: [
                                    (0, l.jsx)("span", { className: "k", children: "选区范围" }),
                                    (0, l.jsx)("span", {
                                      className: "v",
                                      children: (0, l.jsx)(Z, { children: h.join(" \xd7 ") }),
                                    }),
                                  ],
                                }),
                              h &&
                                (0, l.jsxs)("div", {
                                  className: "sel-prop",
                                  children: [
                                    (0, l.jsx)("span", { className: "k", children: "方块" }),
                                    (0, l.jsxs)("span", {
                                      className: "v",
                                      children: [(null != b ? b : 0).toLocaleString(), " 个"],
                                    }),
                                  ],
                                }),
                            ],
                          }),
                          (0, l.jsx)(tt, {
                            icon: (0, l.jsx)(ea.A, { size: 12 }),
                            main: h
                              ? (0, l.jsxs)(l.Fragment, {
                                  children: [
                                    (0, l.jsx)(Z, { children: h.join(" \xd7 ") }),
                                    (0, l.jsx)("span", { className: "mx", children: " \xb7 " }),
                                    (null != b ? b : 0).toLocaleString(),
                                    " 块",
                                  ],
                                })
                              : 1 === p.length
                                ? "已定 A 点 \xb7 再点 B 点"
                                : "点画布定 A 点",
                            sub:
                              p.length > 0
                                ? (0, l.jsxs)(l.Fragment, {
                                    children: [
                                      "A ",
                                      (0, l.jsx)(Z, { children: p[0].join(",") }),
                                      " → B ",
                                      p[1] ? (0, l.jsx)(Z, { children: p[1].join(",") }) : "待定",
                                    ],
                                  })
                                : "两点定一个长方体选区",
                            onClear: p.length > 0 ? P : void 0,
                            clearLabel: "清空框选",
                          }),
                          em(),
                        ],
                      }),
                      (0, l.jsx)(e7, {
                        className: "sel-main-acts",
                        title: "主操作",
                        icon: (0, l.jsx)(er.A, { size: 13 }),
                        children: (0, l.jsxs)("div", {
                          className: "sel-actions",
                          children: [
                            (0, l.jsxs)(e9, {
                              variant: "primary",
                              onClick: _,
                              disabled: !Y,
                              children: [(0, l.jsx)(er.A, { size: 13 }), "替换框选", $],
                            }),
                            (0, l.jsxs)(e9, {
                              variant: "danger",
                              onClick: I,
                              disabled: !Y,
                              children: [(0, l.jsx)(e1.A, { size: 13 }), "删除框选"],
                            }),
                            (0, l.jsxs)(e9, {
                              variant: "muted",
                              onClick: P,
                              children: [(0, l.jsx)(V.A, { size: 13 }), "清空框选"],
                            }),
                          ],
                        }),
                      }),
                      (0, l.jsx)(e7, {
                        title: "选择扩展",
                        icon: (0, l.jsx)(eo.A, { size: 13 }),
                        children: (0, l.jsxs)("div", {
                          className: "sel-actions sel-actions-q4",
                          children: [
                            (0, l.jsx)(e9, {
                              onClick: M,
                              disabled: !Y,
                              children: (0, l.jsx)(te, { full: "相同材质", short: "材质" }),
                            }),
                            (0, l.jsx)(e9, {
                              onClick: z,
                              disabled: !Y,
                              children: (0, l.jsx)(te, { full: "同 Y 层", short: "同层" }),
                            }),
                            (0, l.jsx)(e9, {
                              onClick: T,
                              disabled: !Y,
                              children: (0, l.jsx)(te, { full: "连通块", short: "连通" }),
                            }),
                            (0, l.jsxs)(e9, {
                              onClick: L,
                              disabled: !Y,
                              children: [
                                (0, l.jsx)(e2.A, { size: 13 }),
                                (0, l.jsx)(te, { full: "复制信息", short: "复制" }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, l.jsxs)(e7, {
                        title: "对选区的可见性",
                        icon: (0, l.jsx)(eb.A, { size: 13 }),
                        children: [
                          (0, l.jsxs)("div", {
                            className: "sel-actions sel-actions-q4",
                            children: [
                              (0, l.jsxs)(e9, {
                                onClick: A,
                                disabled: !Y,
                                children: [
                                  (0, l.jsx)(e5.A, { size: 13 }),
                                  (0, l.jsx)(te, { full: "隐藏框选", short: "隐藏" }),
                                ],
                              }),
                              (0, l.jsxs)(e9, {
                                onClick: B,
                                disabled: !Y,
                                children: [
                                  (0, l.jsx)(eb.A, { size: 13 }),
                                  (0, l.jsx)(te, { full: "只显示框选", short: "只显示" }),
                                ],
                              }),
                              (0, l.jsx)(e9, {
                                onClick: O,
                                disabled: !Y,
                                children: (0, l.jsx)(te, { full: "只看该层", short: "只看层" }),
                              }),
                              (0, l.jsx)(e9, {
                                onClick: R,
                                disabled: !Y,
                                children: (0, l.jsx)(te, { full: "显示到该层", short: "到该层" }),
                              }),
                            ],
                          }),
                          (0, l.jsx)("div", {
                            className: "sel-note",
                            children:
                              "框选只是更快创建多选区，后续替换、删除、隐藏和扩展选择逻辑与普通选择保持一致。",
                          }),
                        ],
                      }),
                    ],
                  }),
                "measure" === r &&
                  (0, l.jsxs)(e7, {
                    className: "sel-sum-sec",
                    title: "测量结果",
                    icon: (0, l.jsx)(ei.A, { size: 13 }),
                    children: [
                      (0, l.jsxs)("div", {
                        className: "sel-props sel-props-desk",
                        children: [
                          (0, l.jsxs)("div", {
                            className: "sel-prop",
                            children: [
                              (0, l.jsx)("span", { className: "k", children: "起点" }),
                              (0, l.jsx)("span", {
                                className: "v",
                                children: (0, l.jsx)(Z, {
                                  children: f[0] ? f[0].join(", ") : "等待第一个点",
                                }),
                              }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "sel-prop",
                            children: [
                              (0, l.jsx)("span", { className: "k", children: "终点" }),
                              (0, l.jsx)("span", {
                                className: "v",
                                children: (0, l.jsx)(Z, {
                                  children: f[1] ? f[1].join(", ") : "等待第二个点",
                                }),
                              }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "sel-prop",
                            children: [
                              (0, l.jsx)("span", { className: "k", children: "跨度尺寸" }),
                              (0, l.jsx)("span", {
                                className: "v",
                                children: (0, l.jsx)(Z, {
                                  children: g ? g.span.join(" \xd7 ") : "—",
                                }),
                              }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "sel-prop",
                            children: [
                              (0, l.jsx)("span", { className: "k", children: "中间间隔" }),
                              (0, l.jsx)("span", {
                                className: "v",
                                children: (0, l.jsx)(Z, {
                                  children: g ? g.gap.join(" \xd7 ") : "—",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, l.jsx)(tt, {
                        icon: (0, l.jsx)(ei.A, { size: 12 }),
                        main: g
                          ? (0, l.jsxs)(l.Fragment, {
                              children: [
                                "跨度 ",
                                (0, l.jsx)(Z, { children: g.span.join(" \xd7 ") }),
                              ],
                            })
                          : 1 === f.length
                            ? "已取 A 点 \xb7 再点 B 点"
                            : "点画布取 A 点",
                        sub:
                          f.length > 0
                            ? (0, l.jsxs)(l.Fragment, {
                                children: [
                                  "A ",
                                  (0, l.jsx)(Z, { children: f[0].join(",") }),
                                  " → B ",
                                  f[1] ? (0, l.jsx)(Z, { children: f[1].join(",") }) : "待取",
                                  g &&
                                    (0, l.jsxs)(l.Fragment, {
                                      children: [
                                        (0, l.jsx)("span", { className: "mx", children: " \xb7 " }),
                                        "间隔 ",
                                        (0, l.jsx)(Z, { children: g.gap.join(" \xd7 ") }),
                                      ],
                                    }),
                                ],
                              })
                            : "测量只产生辅助线，不改投影",
                        onClear: f.length > 0 ? F : void 0,
                        clearLabel: "清除测量",
                      }),
                      (0, l.jsxs)("div", {
                        className: "sel-actions",
                        children: [
                          (0, l.jsxs)(e9, {
                            variant: "muted",
                            onClick: F,
                            children: [(0, l.jsx)(V.A, { size: 13 }), "清除测量"],
                          }),
                          (0, l.jsx)(e9, { onClick: H, children: "退出测量" }),
                        ],
                      }),
                      (0, l.jsx)("div", {
                        className: "sel-note",
                        children:
                          "跨度尺寸包含起点和终点方块；中间间隔只计算两点之间的空隙。测量只产生临时辅助线，不改变投影内容。",
                      }),
                    ],
                  }),
                "mirror" === r &&
                  (0, l.jsxs)(l.Fragment, {
                    children: [
                      (0, l.jsxs)(e7, {
                        title: "镜像 / 旋转对象",
                        icon: (0, l.jsx)(er.A, { size: 13 }),
                        children: [
                          (0, l.jsxs)("div", {
                            className: "sel-summary",
                            children: [
                              (0, l.jsx)("span", {
                                className: "sw",
                                style: { background: "#4f9c8f" },
                              }),
                              (0, l.jsxs)("div", {
                                style: { minWidth: 0 },
                                children: [
                                  (0, l.jsx)("div", { className: "name", children: "整体投影" }),
                                  (0, l.jsx)("div", {
                                    className: "id",
                                    children: "镜像 / 旋转会作用于整个模型",
                                  }),
                                  (0, l.jsx)("span", {
                                    className: "badge",
                                    children: "执行前二次确认",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, l.jsx)("div", {
                            className: "tool-readonly",
                            children:
                              "这些操作会修改整个投影结构；执行前会二次确认，执行后可用 Ctrl+Z 撤销。",
                          }),
                        ],
                      }),
                      (0, l.jsx)(e7, {
                        title: "镜像",
                        icon: (0, l.jsx)(er.A, { size: 13 }),
                        children: (0, l.jsx)("div", {
                          className: "tool-grid3",
                          children: ["x", "y", "z"].map((e) =>
                            (0, l.jsxs)(
                              e9,
                              {
                                onClick: () => K("mirror-".concat(e)),
                                children: [e.toUpperCase(), " 轴"],
                              },
                              e,
                            ),
                          ),
                        }),
                      }),
                      (0, l.jsx)(e7, {
                        title: "旋转 Y 轴",
                        icon: (0, l.jsx)(e4.A, { size: 13 }),
                        children: (0, l.jsx)("div", {
                          className: "tool-grid3",
                          children: [90, 180, 270].map((e) =>
                            (0, l.jsxs)(
                              e9,
                              { onClick: () => K("rotate-".concat(e)), children: [e, "\xb0"] },
                              e,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                "explode" === r &&
                  (0, l.jsx)(l.Fragment, {
                    children: (0, l.jsxs)(e7, {
                      title: "爆炸图预览",
                      icon: (0, l.jsx)(eo.A, { size: 13 }),
                      children: [
                        (0, l.jsxs)("div", {
                          className: "sel-props",
                          children: [
                            (0, l.jsxs)("div", {
                              className: "sel-prop",
                              children: [
                                (0, l.jsx)("span", { className: "k", children: "当前状态" }),
                                (0, l.jsx)("span", { className: "v", children: "只读查看" }),
                              ],
                            }),
                            (0, l.jsxs)("div", {
                              className: "sel-prop",
                              children: [
                                (0, l.jsx)("span", { className: "k", children: "展开间距" }),
                                (0, l.jsxs)("span", {
                                  className: "v",
                                  children: [
                                    j.toFixed(1),
                                    (0, l.jsx)("span", { className: "mx", children: "\xd7" }),
                                  ],
                                }),
                              ],
                            }),
                            (0, l.jsxs)("div", {
                              className: "sel-prop",
                              children: [
                                (0, l.jsx)("span", { className: "k", children: "选区操作" }),
                                (0, l.jsx)("span", { className: "v", children: "已暂停" }),
                              ],
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "tool-range",
                          children: [
                            (0, l.jsx)("input", {
                              type: "range",
                              min: 0,
                              max: 3,
                              step: 0.1,
                              value: j,
                              onChange: (e) => W(parseFloat(e.target.value)),
                              "aria-label": "爆炸图展开间距",
                            }),
                            (0, l.jsxs)("span", {
                              className: "rv",
                              children: [
                                j.toFixed(1),
                                (0, l.jsx)("span", { className: "mx", children: "\xd7" }),
                              ],
                            }),
                          ],
                        }),
                        (0, l.jsx)("div", {
                          className: "sel-actions",
                          children: (0, l.jsxs)(e9, {
                            variant: "muted",
                            onClick: H,
                            children: [(0, l.jsx)(en.A, { size: 13 }), "回到选择"],
                          }),
                        }),
                        (0, l.jsx)("div", {
                          className: "tool-readonly",
                          children:
                            "爆炸图只用于观察结构层次。进入此模式后，点击方块、替换、删除和右键操作都不触发编辑。",
                        }),
                      ],
                    }),
                  }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "ed-view-state".concat(eh ? "" : " is-idle"),
              children: [
                (0, l.jsx)("div", {
                  className: "vs-head",
                  children: (0, l.jsx)("span", { className: "vs-title", children: "视图状态" }),
                }),
                (0, l.jsxs)("div", {
                  className: "vs-row",
                  children: [
                    (0, l.jsx)("span", {
                      className: "vs-chip".concat(y > 0 ? " on" : ""),
                      children:
                        y > 0 ? "已隐藏 ".concat(y.toLocaleString(), " 处") : "没有隐藏内容",
                    }),
                    (0, l.jsx)(G.$, {
                      size: "xs",
                      variant: "secondary",
                      className: "vs-btn",
                      onClick: D,
                      disabled: !eh,
                      title: "取消所有隐藏并清除层筛选",
                      children: "全部显示",
                    }),
                  ],
                }),
                (0, l.jsxs)("div", {
                  className: "vs-layer",
                  children: [
                    (0, l.jsx)("span", { children: "层" }),
                    (0, l.jsx)("b", { children: ep }),
                    (0, l.jsx)("span", { className: "sep", children: "\xb7" }),
                    (0, l.jsx)("span", {
                      children: "gallery" === w ? "只看当前层" : "显示到当前层",
                    }),
                    (0, l.jsx)("span", { className: "sep", children: "\xb7" }),
                    (0, l.jsx)("span", { children: "控制在画布右缘" }),
                  ],
                }),
              ],
            }),
            ("select" === r || "region" === r) &&
              (0, l.jsxs)("div", {
                className: "ed-select-foot",
                children: [
                  (0, l.jsx)(G.$, {
                    size: "sm",
                    variant: "danger",
                    className: "sel-foot-btn danger",
                    onClick: I,
                    disabled: !Y,
                    "aria-label": "region" === r ? "删除框选" : "删除选中",
                    title: "region" === r ? "删除框选" : "删除选中",
                    children: (0, l.jsx)(e1.A, { size: 15 }),
                  }),
                  (0, l.jsxs)(G.$, {
                    size: "sm",
                    variant: "primary",
                    className: "sel-foot-btn primary",
                    onClick: _,
                    disabled: !Y,
                    children: [
                      (0, l.jsx)(er.A, { size: 15 }),
                      "region" === r ? "替换框选" : "替换选中",
                      $,
                    ],
                  }),
                ],
              }),
          ],
        });
      }
      var tl = s(67812),
        tn = s(10254),
        ta = s(44748),
        tr = s(29080);
      let ti = {
          info: "bg-info/10 border-info text-text-primary",
          success: "bg-success/10 border-success text-success",
          warning: "bg-warning/15 border-warning text-text-primary",
          error: "bg-error/10 border-error text-error",
        },
        to = { info: tl.A, success: tn.A, warning: ta.A, error: tr.A };
      function tc(e) {
        let { toasts: t, onDismiss: s } = e;
        return 0 === t.length
          ? null
          : (0, l.jsx)("div", {
              className:
                "pointer-events-none absolute bottom-[86px] left-1/2 z-[18] flex w-[min(340px,calc(100%-24px))] -translate-x-1/2 flex-col gap-2 max-[520px]:left-[10px] max-[520px]:right-[10px] max-[520px]:top-[58px] max-[520px]:bottom-auto max-[520px]:w-auto max-[520px]:translate-x-0",
              children: t.map((e) => {
                let t = to[e.tone];
                return (0, l.jsxs)(
                  "div",
                  {
                    className:
                      "pointer-events-auto flex items-center gap-2 border-2 px-3 py-2 shadow-block text-[12px] font-black ".concat(
                        ti[e.tone],
                      ),
                    role: "status",
                    children: [
                      (0, l.jsx)(t, { size: 15, className: "shrink-0" }),
                      (0, l.jsx)("span", {
                        className: "min-w-0 flex-1 leading-snug",
                        children: e.message,
                      }),
                      (0, l.jsx)(K.K, {
                        label: "关闭提示",
                        size: "xs",
                        variant: "ghost",
                        onClick: () => s(e.id),
                        className: "shrink-0 !shadow-none",
                        children: (0, l.jsx)(V.A, { size: 14 }),
                      }),
                    ],
                  },
                  e.id,
                );
              }),
            });
      }
      let td = {
        info: "border-border-hard bg-[rgba(17,17,17,0.93)]",
        warning: "border-border-hard bg-[rgba(17,17,17,0.93)]",
        danger: "border-border-hard bg-[rgba(17,17,17,0.93)]",
      };
      function tu(e) {
        var t, s;
        let { usage: a, onClose: r } = e,
          [i, o] = (0, n.useState)(!1);
        if (
          ((0, n.useEffect)(() => {
            o(!1);
          }, [null == a ? void 0 : a.id]),
          !a)
        )
          return null;
        let c = null != (s = a.tone) ? s : "info",
          d = "danger" === c || "warning" === c ? ta.A : tl.A,
          u = a.items.length > 0 || !!(null == (t = a.actions) ? void 0 : t.length);
        return (0, l.jsxs)("div", {
          className:
            "ed-usage-panel absolute left-3 top-3 z-[8] w-[min(320px,calc(100%-132px))] border-2 shadow-block-sm max-lg:w-auto max-lg:max-w-none max-[520px]:hidden ".concat(
              td[c],
            ),
          role: "note",
          "aria-label": "操作反馈",
          children: [
            (0, l.jsxs)("div", {
              className:
                "flex items-start gap-2 border-b-2 border-border-hard bg-bg-card px-2.5 py-2",
              children: [
                (0, l.jsx)("span", {
                  className:
                    "mt-0.5 h-3.5 w-[3px] shrink-0 bg-brand-primary border-2 border-border-hard",
                }),
                (0, l.jsx)(d, {
                  size: 15,
                  className:
                    "danger" === c
                      ? "text-error"
                      : "warning" === c
                        ? "text-warning"
                        : "text-brand-primary",
                }),
                (0, l.jsxs)("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    (0, l.jsx)("div", {
                      className: "text-[12px] font-black text-text-primary leading-tight",
                      children: a.title,
                    }),
                    (0, l.jsx)("div", {
                      className: "mt-0.5 text-[11px] font-bold text-text-muted leading-snug",
                      children: a.desc,
                    }),
                  ],
                }),
                u &&
                  (0, l.jsx)(K.K, {
                    label: i ? "收起操作要点" : "展开操作要点",
                    size: "xs",
                    variant: "secondary",
                    onClick: () => o((e) => !e),
                    className: "usage-fold-toggle shrink-0",
                    "aria-expanded": i,
                    children: (0, l.jsx)(eW.A, { size: 14, className: i ? "rotate-180" : void 0 }),
                  }),
                (0, l.jsx)(K.K, {
                  label: "关闭操作反馈",
                  size: "xs",
                  variant: "secondary",
                  onClick: r,
                  className: "shrink-0",
                  children: (0, l.jsx)(V.A, { size: 14 }),
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "usage-fold".concat(i ? " is-open" : ""),
              children: [
                (0, l.jsx)("div", {
                  className: "flex flex-col gap-1.5 px-2.5 py-2",
                  children: a.items.map((e, t) =>
                    (0, l.jsxs)(
                      "div",
                      {
                        className:
                          "flex items-start justify-between gap-2 border-2 border-bg-elevated bg-bg-inset px-2 py-1.5 text-[11px] font-bold text-text-muted",
                        children: [
                          (0, l.jsx)(eH.A, {
                            size: 12,
                            className: "mt-0.5 shrink-0 text-brand-primary",
                          }),
                          (0, l.jsx)("span", {
                            className: "min-w-0 flex-1 leading-snug",
                            children: e,
                          }),
                        ],
                      },
                      "".concat(a.id, "-").concat(t),
                    ),
                  ),
                }),
                a.actions &&
                  a.actions.length > 0 &&
                  (0, l.jsx)("div", {
                    className: "grid grid-cols-2 gap-2 px-2.5 pb-2.5 max-[1023px]:grid-cols-1",
                    children: a.actions.map((e) =>
                      (0, l.jsx)(
                        G.$,
                        {
                          size: "sm",
                          variant: e.primary ? "primary" : "secondary",
                          onClick: e.onClick,
                          className: "!px-2 !text-[11px]",
                          children: e.label,
                        },
                        e.label,
                      ),
                    ),
                  }),
              ],
            }),
          ],
        });
      }
      function tm(e) {
        let {
            minY: t,
            maxY: s,
            value: a,
            mode: r,
            rightPanelOpen: i = !0,
            sheetOpen: o = !1,
            onChange: c,
            onModeChange: d,
          } = e,
          [u, m] = n.useState(!1);
        if (
          (n.useEffect(() => {
            if (!u) return;
            let e = () => m(!1);
            return (
              window.addEventListener("pointerup", e),
              window.addEventListener("pointercancel", e),
              () => {
                (window.removeEventListener("pointerup", e),
                  window.removeEventListener("pointercancel", e));
              }
            );
          }, [u]),
          !Number.isFinite(t) || !Number.isFinite(s) || s <= t)
        )
          return null;
        let x = s - t + 1,
          p = null != a ? a : s,
          h = Math.min(1, Math.max(0, (p - t) / (s - t))),
          b = "".concat((100 * h).toFixed(2), "%");
        return (0, l.jsxs)("div", {
          className: "ed-float ed-layer"
            .concat(i ? "" : " mat-collapsed")
            .concat(o ? " sheet-open" : "")
            .concat(u ? " dragging" : ""),
          children: [
            (0, l.jsx)(K.K, {
              label: "slice" === r ? "改为只看当前层" : "改为显示到当前层",
              size: "sm",
              variant: "secondary",
              className: "ly-mode",
              title:
                "slice" === r
                  ? "当前：显示到当前层 \xb7 点击改为只看当前层"
                  : "当前：只看当前层 \xb7 点击改为显示到当前层",
              onClick: () => d("slice" === r ? "gallery" : "slice"),
              children:
                "slice" === r ? (0, l.jsx)(e4.A, { size: 15 }) : (0, l.jsx)(eo.A, { size: 15 }),
            }),
            (0, l.jsx)("div", { className: "ly-label", children: "Y 层" }),
            (0, l.jsxs)("div", {
              className: "ly-track",
              onPointerDown: () => m(!0),
              onPointerUp: () => m(!1),
              children: [
                (0, l.jsx)("div", { className: "ly-fill", style: { height: b } }),
                (0, l.jsx)("div", { className: "ly-thumb", style: { bottom: b } }),
                (0, l.jsxs)("div", {
                  className: "ly-bubble",
                  style: { bottom: b },
                  children: [(0, l.jsx)("b", { children: p }), "/", s],
                }),
                (0, l.jsx)("input", {
                  className: "ly-range",
                  type: "range",
                  min: t,
                  max: s,
                  step: 1,
                  value: p,
                  "aria-label": "Y 层",
                  onChange: (e) => c(Number(e.target.value)),
                }),
              ],
            }),
            (0, l.jsx)("div", {
              className: "ly-cur",
              children: null == a ? "".concat(s, " / ").concat(s) : "".concat(p, " / ").concat(s),
            }),
            (0, l.jsxs)("div", {
              className: "ly-total",
              children: [
                (0, l.jsxs)("span", { className: "ly-total-desk", children: ["共 ", x, " 层"] }),
                (0, l.jsxs)("span", {
                  className: "ly-total-mob",
                  children: [(0, l.jsx)("b", { children: p }), "/", x],
                }),
              ],
            }),
            (0, l.jsx)(K.K, {
              label: "显示全部层",
              size: "sm",
              variant: "secondary",
              className: "ly-mode ly-mode-all",
              title: "显示全部层",
              onClick: () => c(null),
              children: null == a ? (0, l.jsx)(eb.A, { size: 15 }) : (0, l.jsx)(V.A, { size: 15 }),
            }),
          ],
        });
      }
      let tx = "studio_mobile_hint_v1";
      function tp() {
        let [e, t] = (0, n.useState)(!1);
        return ((0, n.useEffect)(() => {
          if (!(window.innerWidth >= 1024)) {
            try {
              if (window.localStorage.getItem(tx)) return;
            } catch (e) {}
            t(!0);
          }
        }, []),
        e)
          ? (0, l.jsxs)("div", {
              className: "ed-mobile-hint lg:hidden",
              children: [
                (0, l.jsx)(tl.A, { size: 15, className: "text-brand-primary shrink-0 mt-0.5" }),
                (0, l.jsxs)("div", {
                  className:
                    "min-w-0 flex-1 text-[10.5px] font-bold text-text-secondary leading-snug",
                  children: [
                    "触屏没有右键。点方块选中后，从",
                    (0, l.jsx)("span", { className: "hint-side-p", children: "左侧" }),
                    (0, l.jsx)("span", { className: "hint-side-l", children: "右侧" }),
                    "「选区」执行替换、删除、隐藏。",
                  ],
                }),
                (0, l.jsx)(K.K, {
                  label: "知道了",
                  size: "xs",
                  variant: "secondary",
                  onClick: () => {
                    try {
                      window.localStorage.setItem(tx, "1");
                    } catch (e) {}
                    t(!1);
                  },
                  className: "ed-mobile-hint-x shrink-0",
                  children: (0, l.jsx)(V.A, { size: 10 }),
                }),
              ],
            })
          : null;
      }
      s(59403);
      let th = (e) => "studio:editor:".concat(null != e ? e : "draft");
      var tb = s(99350);
      function tf(e) {
        let { position: t, color: s, size: a = 0.3 } = e,
          i = (0, n.useMemo)(
            () => new r.V9B({ color: s, transparent: !0, opacity: 0.85, depthTest: !1 }),
            [s],
          ),
          o = (0, n.useMemo)(
            () => new r.mrM({ color: "#000000", transparent: !0, opacity: 0.5 }),
            [],
          ),
          c = (0, n.useMemo)(() => new r.iNn(a, a, a), [a]),
          d = (0, n.useMemo)(() => new r.TDQ(c), [c]);
        return (
          (0, n.useEffect)(
            () => () => {
              (i.dispose(), o.dispose(), c.dispose(), d.dispose());
            },
            [i, o, c, d],
          ),
          (0, l.jsxs)("group", {
            position: [t[0] + 0.5, t[1] + 0.5, t[2] + 0.5],
            children: [
              (0, l.jsx)("mesh", { geometry: c, material: i, renderOrder: 999 }),
              (0, l.jsx)("lineSegments", { geometry: d, material: o, renderOrder: 999 }),
            ],
          })
        );
      }
      function tg(e) {
        let { pos1: t, pos2: s, confirmed: a } = e,
          i = null != s ? s : t,
          {
            center: o,
            size: c,
            edgeGeo: d,
          } = (0, n.useMemo)(() => {
            if (!t || !i) return { center: null, size: null, edgeGeo: null };
            let e = Math.min(t[0], i[0]),
              s = Math.min(t[1], i[1]),
              l = Math.min(t[2], i[2]),
              n = Math.max(t[0], i[0]) + 1,
              a = Math.max(t[1], i[1]) + 1,
              o = Math.max(t[2], i[2]) + 1,
              c = n - e,
              d = a - s,
              u = o - l,
              m = e + c / 2,
              x = s + d / 2,
              p = l + u / 2,
              h = new r.iNn(c, d, u),
              b = new r.TDQ(h);
            return (h.dispose(), { center: [m, x, p], size: [c, d, u], edgeGeo: b });
          }, [
            null == t ? void 0 : t[0],
            null == t ? void 0 : t[1],
            null == t ? void 0 : t[2],
            null == i ? void 0 : i[0],
            null == i ? void 0 : i[1],
            null == i ? void 0 : i[2],
          ]);
        (0, n.useEffect)(
          () => () => {
            null == d || d.dispose();
          },
          [d],
        );
        let u = (0, n.useMemo)(
          () =>
            new r.mrM({ color: "#ffffff", transparent: !0, opacity: a ? 0.6 : 0.3, depthTest: !1 }),
          [a],
        );
        (0, n.useEffect)(
          () => () => {
            u.dispose();
          },
          [u],
        );
        let m = (0, n.useMemo)(
          () =>
            new r.V9B({
              color: "#ffffff",
              transparent: !0,
              opacity: 0.05,
              side: r.$EB,
              depthTest: !1,
            }),
          [],
        );
        (0, n.useEffect)(
          () => () => {
            m.dispose();
          },
          [m],
        );
        let x = (0, n.useMemo)(
          () => (c ? new r.iNn(c[0], c[1], c[2]) : null),
          [null == c ? void 0 : c[0], null == c ? void 0 : c[1], null == c ? void 0 : c[2]],
        );
        return ((0, n.useEffect)(
          () => () => {
            null == x || x.dispose();
          },
          [x],
        ),
        t && o && d && c && x)
          ? (0, l.jsxs)("group", {
              children: [
                (0, l.jsx)("lineSegments", {
                  geometry: d,
                  material: u,
                  position: o,
                  renderOrder: 998,
                }),
                (0, l.jsx)("mesh", { position: o, geometry: x, material: m, renderOrder: 997 }),
                (0, l.jsx)(tf, { position: t, color: "#48bf36" }),
                s && (0, l.jsx)(tf, { position: s, color: "#E05050" }),
              ],
            })
          : null;
      }
      var tj = s(95626);
      let ty = {
          x: { dir: new r.Pq0(1, 0, 0), rotation: [0, 0, -Math.PI / 2] },
          y: { dir: new r.Pq0(0, 1, 0), rotation: [0, 0, 0] },
          z: { dir: new r.Pq0(0, 0, 1), rotation: [Math.PI / 2, 0, 0] },
        },
        tv = { 0: "#48bf36", 1: "#E05050" };
      function tk(e) {
        let { points: t, onAdjust: s, onDragStart: a, onDragEnd: o } = e,
          { camera: c, gl: d } = (0, i.C)(),
          u = (0, n.useRef)(0),
          [m, x] = (0, n.useState)(null),
          [p, h] = (0, n.useState)(null),
          b = (0, n.useMemo)(
            () => t.map((e) => new r.Pq0(e[0] + 0.5, e[1] + 0.5, e[2] + 0.5)),
            [t],
          ),
          f = (0, n.useCallback)(
            (e, t, l, n) => {
              var i, m;
              (n.stopPropagation(),
                null == (m = n.nativeEvent) || null == (i = m.preventDefault) || i.call(m));
              let x = d.domElement.getBoundingClientRect(),
                p = new r.I9Y(
                  ((n.clientX - x.left) / x.width) * 2 - 1,
                  -(2 * ((n.clientY - x.top) / x.height)) + 1,
                );
              ((u.current = 0),
                h({ point: e, axis: t }),
                (d.domElement.style.cursor = "grabbing"),
                null == a || a());
              let b = (n) => {
                  n.preventDefault();
                  let a = ((n.clientX - x.left) / x.width) * 2 - 1,
                    i = -(2 * ((n.clientY - x.top) / x.height)) + 1,
                    o = ty[t].dir.clone(),
                    d = l.clone().project(c),
                    m = l.clone().add(o).project(c),
                    h = new r.I9Y(m.x - d.x, m.y - d.y),
                    b = h.length();
                  if (b < 0.001) return;
                  h.normalize();
                  let f = new r.I9Y(a - p.x, i - p.y).dot(h) / b,
                    g = u.current + f,
                    j = Math.round(g);
                  0 !== j && ((u.current = g - j), p.set(a, i), s(e, t, j));
                },
                f = () => {
                  (h(null),
                    (d.domElement.style.cursor = ""),
                    null == o || o(),
                    window.removeEventListener("pointermove", b),
                    window.removeEventListener("pointerup", f));
                };
              (window.addEventListener("pointermove", b, { passive: !1 }),
                window.addEventListener("pointerup", f));
            },
            [c, d, s, a, o],
          );
        return (0, l.jsx)(l.Fragment, {
          children: b.map((e, t) =>
            (0, l.jsxs)(
              "group",
              {
                position: [e.x, e.y, e.z],
                children: [
                  Object.keys(ty).map((s) => {
                    let n = ty[s],
                      a = (null == m ? void 0 : m.point) === t && m.axis === s,
                      r = (null == p ? void 0 : p.point) === t && p.axis === s,
                      i = a || r,
                      o = p && !r ? 0.22 : 1;
                    return (0, l.jsxs)(
                      "group",
                      {
                        rotation: n.rotation,
                        children: [
                          (0, l.jsxs)("mesh", {
                            position: [0, 0.95, 0],
                            renderOrder: 1002,
                            onPointerDown: (l) => f(t, s, e, l),
                            onPointerEnter: (e) => {
                              (e.stopPropagation(), x({ point: t, axis: s }));
                            },
                            onPointerLeave: () => x(null),
                            children: [
                              (0, l.jsx)("cylinderGeometry", {
                                args: [i ? 0.065 : 0.04, i ? 0.065 : 0.04, 1.9, 8],
                              }),
                              (0, l.jsx)("meshBasicMaterial", {
                                color: tj.r[s],
                                transparent: !0,
                                opacity: o,
                                depthTest: !1,
                              }),
                            ],
                          }),
                          (0, l.jsxs)("mesh", {
                            position: [0, 2.05, 0],
                            renderOrder: 1003,
                            onPointerDown: (l) => f(t, s, e, l),
                            onPointerEnter: (e) => {
                              (e.stopPropagation(), x({ point: t, axis: s }));
                            },
                            onPointerLeave: () => x(null),
                            children: [
                              (0, l.jsx)("coneGeometry", { args: [i ? 0.22 : 0.17, 0.48, 12] }),
                              (0, l.jsx)("meshBasicMaterial", {
                                color: tj.r[s],
                                transparent: !0,
                                opacity: o,
                                depthTest: !1,
                              }),
                            ],
                          }),
                        ],
                      },
                      s,
                    );
                  }),
                  (0, l.jsxs)("mesh", {
                    renderOrder: 1004,
                    children: [
                      (0, l.jsx)("boxGeometry", { args: [0.28, 0.28, 0.28] }),
                      (0, l.jsx)("meshBasicMaterial", {
                        color: tv[t],
                        transparent: !0,
                        opacity: 0.9,
                        depthTest: !1,
                      }),
                    ],
                  }),
                ],
              },
              t,
            ),
          ),
        });
      }
      var tN = s(33622),
        tS = s(90908),
        tw = s(26260),
        tE = s(67909),
        tC = s(53486),
        t_ = s(2519),
        tI = s(44777);
      function tM(e) {
        return e
          ? e.startsWith("/uploads/") || e.startsWith("/api/proxy/obj")
            ? e
            : "/api/proxy/obj?url=".concat(encodeURIComponent(e))
          : "";
      }
      function tz(e) {
        let { objUrl: t, mtlUrl: s, onLoad: l, onProgress: a, onError: o } = e,
          { scene: c, camera: d } = (0, i.C)(),
          [u, m] = (0, n.useState)(null);
        return (
          (0, n.useEffect)(() => {
            let e = !0,
              n = [];
            return (
              (async function () {
                try {
                  let i,
                    o = s || (t ? t.replace(/\.obj$/i, ".mtl") : ""),
                    u = tM(t),
                    x = tM(o),
                    p = (function (e) {
                      let t = e.lastIndexOf("/");
                      return e.substring(0, t + 1);
                    })(t);
                  (console.log("\uD83D\uDD04 开始加载OBJ模型"),
                    console.log("  OBJ URL:", u),
                    console.log("  MTL URL:", x),
                    console.log("  Base Path:", p));
                  let h = r.h_9.urlModifier;
                  r.h_9.setURLModifier((e) => {
                    if (
                      (console.log("\uD83D\uDDBC️ 加载纹理:", e),
                      !e.startsWith("http") && !e.startsWith("/"))
                    ) {
                      let t = p + e,
                        s = tM(t);
                      return (console.log("  ✅ 转换为:", s), s);
                    }
                    if (e.startsWith("/api/proxy/obj")) return e;
                    if (e.startsWith("http")) {
                      let t = tM(e);
                      return (console.log("  ✅ 转换为:", t), t);
                    }
                    return e;
                  });
                  try {
                    let e = new tI.V();
                    (e.setResourcePath(p),
                      (i = await e.loadAsync(x)).preload(),
                      console.log("✅ MTL材质加载成功"));
                  } catch (e) {
                    console.warn("⚠️ MTL加载失败，使用默认材质:", e);
                  }
                  r.h_9.urlModifier = h;
                  let b = new t_.L();
                  i && b.setMaterials(i);
                  let f = await b.loadAsync(u, (e) => {
                    if (e.lengthComputable) {
                      let t = (e.loaded / e.total) * 100;
                      (null == a || a(t),
                        console.log("\uD83D\uDCE6 加载进度:", t.toFixed(1) + "%"));
                    }
                  });
                  if (!e) return;
                  f.traverse((e) => {
                    e instanceof r.eaF &&
                      ((e.castShadow = !0),
                      (e.receiveShadow = !0),
                      e.material &&
                        (Array.isArray(e.material) ? e.material : [e.material]).forEach((e) => {
                          e.side = r.hB5;
                          let t = (e) => {
                            e &&
                              ((e.magFilter = r.hxR),
                              (e.minFilter = r.hxR),
                              (e.generateMipmaps = !1),
                              (e.needsUpdate = !0));
                          };
                          ("map" in e && t(e.map),
                            "normalMap" in e && t(e.normalMap),
                            "roughnessMap" in e && t(e.roughnessMap),
                            "metalnessMap" in e && t(e.metalnessMap),
                            "aoMap" in e && t(e.aoMap),
                            "emissiveMap" in e && t(e.emissiveMap));
                          let s = (() => {
                            let t = [];
                            if ("alphaMap" in e && e.alphaMap)
                              return (t.push("hasAlphaMap"), { has: !0, reasons: t });
                            if ("map" in e && e.map) {
                              let s = e.map;
                              if (s.format === r.GWd)
                                return (t.push("RGBAFormat"), { has: !0, reasons: t });
                              if (s.image && s.image instanceof HTMLCanvasElement) {
                                let e = s.image.getContext("2d");
                                if (e) {
                                  let s = e.getImageData(0, 0, 1, 1);
                                  if (4 === s.data.length)
                                    return (t.push("canvasHasAlpha"), { has: !0, reasons: t });
                                }
                              }
                            }
                            return e.opacity < 1
                              ? (t.push("opacity=".concat(e.opacity)), { has: !0, reasons: t })
                              : e.transparent
                                ? (t.push("markedTransparent"), { has: !0, reasons: t })
                                : { has: !1, reasons: ["noAlpha"] };
                          })();
                          s.has &&
                            ("alphaMap" in e && e.alphaMap && t(e.alphaMap),
                            (e.transparent = !1),
                            (e.alphaTest = 0.1),
                            (e.opacity = 1),
                            (e.depthWrite = !0),
                            "alphaMap" in e &&
                              e.alphaMap &&
                              "map" in e &&
                              e.map &&
                              (e.alphaMap = null),
                            console.log("✂️ Cutout材质: ".concat(e.name || "unnamed"), {
                              mode: "Opaque(Clip)",
                              alphaTest: e.alphaTest,
                              reason: s.reasons.join(", "),
                            }),
                            (e.needsUpdate = !0));
                        }));
                  });
                  let g = new r.NRn().setFromObject(f),
                    j = g.getCenter(new r.Pq0()),
                    y = g.getSize(new r.Pq0()),
                    v = -j.x,
                    k = -g.min.y,
                    N = -j.z;
                  (f.position.set(v, k, N),
                    console.log("\uD83D\uDCCD 模型定位:", {
                      originalCenter: { x: j.x.toFixed(2), y: j.y.toFixed(2), z: j.z.toFixed(2) },
                      offset: { x: v.toFixed(2), y: k.toFixed(2), z: N.toFixed(2) },
                      finalPosition: {
                        x: f.position.x.toFixed(2),
                        y: f.position.y.toFixed(2),
                        z: f.position.z.toFixed(2),
                      },
                    }));
                  let S = Math.max(y.x, y.y, y.z),
                    w = 1.5 * S,
                    E = y.y / 2;
                  (d.position.set(w, w + E, w),
                    d.lookAt(0, E, 0),
                    console.log("\uD83D\uDCF7 相机配置:", {
                      position: {
                        x: d.position.x.toFixed(2),
                        y: d.position.y.toFixed(2),
                        z: d.position.z.toFixed(2),
                      },
                      buildingCenterHeight: E.toFixed(2),
                      lookAt: "(0, ".concat(E.toFixed(2), ", 0)"),
                    }),
                    console.log("✅ OBJ模型加载成功"),
                    console.log("\uD83D\uDCCA 模型信息:", {
                      meshes: f.children.length,
                      size: { x: y.x.toFixed(2), y: y.y.toFixed(2), z: y.z.toFixed(2) },
                      hasMaterials: !!i,
                    }),
                    c.add(f),
                    n.push(f),
                    f.updateMatrixWorld(!0),
                    m(f),
                    null == l || l(f, c));
                } catch (e) {
                  (console.error("❌ OBJ加载失败:", e), null == o || o(e));
                }
              })(),
              () => {
                ((e = !1),
                  n.forEach((e) => {
                    c.remove(e);
                  }));
              }
            );
          }, [t, s]),
          null
        );
      }
      var tT = s(73975),
        tL = s(235),
        tA = s(58957),
        tB = s(7882),
        tO = s(62035);
      async function tR(e) {
        await (0, p.initBlockTextureMapper)();
        let t = new Map();
        for (let s of e.blocks) {
          let e = t.get(s.blockId) || 0;
          t.set(s.blockId, e + (0, tO.c)(s.blockId, s.properties));
        }
        let s = 0;
        for (let e of t.values()) s += e;
        let l = [];
        for (let [e, n] of t.entries()) {
          let t = (0, p.getBlockTexture)(e);
          l.push({
            blockId: e,
            chineseName: t.chineseName,
            englishName: t.englishName,
            textureUrl: t.textureUrl,
            count: n,
            percentage: s > 0 ? (n / s) * 100 : 0,
          });
        }
        return (l.sort((e, t) => t.count - e.count), l);
      }
      var tD = s(18559);
      function tP(e) {
        return e ? "confirm" : "leave";
      }
      var tF = s(91986),
        tH = s(82610);
      function tU(e) {
        let { quatRef: t } = e,
          { camera: s } = (0, i.C)();
        return (
          (0, i.D)(() => {
            t.current.copy(s.quaternion);
          }),
          null
        );
      }
      let tG = [
        { id: "x", dir: new r.Pq0(1, 0, 0), color: tj.r.x },
        { id: "y", dir: new r.Pq0(0, 1, 0), color: tj.r.y },
        { id: "z", dir: new r.Pq0(0, 0, 1), color: tj.r.z },
      ];
      function tK(e) {
        let { quatRef: t, onAxisClick: s } = e,
          a = (0, n.useRef)([]),
          i = (0, n.useRef)([]);
        (0, n.useEffect)(() => {
          let e,
            s = new r.PTz(),
            l = new r.Pq0(),
            n = new r.PTz(),
            o = () => {
              if (n.equals(t.current)) {
                e = requestAnimationFrame(o);
                return;
              }
              (n.copy(t.current), s.copy(t.current).invert());
              for (let e = 0; e < tG.length; e++) {
                let t = tG[e];
                l.copy(t.dir).applyQuaternion(s);
                let n = 26 * l.x,
                  r = -(26 * l.y),
                  o = 37 + n,
                  c = 37 + r,
                  d = a.current[e];
                if (d) {
                  let e = Math.sqrt(n * n + r * r),
                    t = (180 / Math.PI) * Math.atan2(r, n);
                  ((d.style.width = "".concat(e, "px")),
                    (d.style.transform = "translate("
                      .concat(37, "px, ")
                      .concat(37, "px) rotate(")
                      .concat(t, "deg)")),
                    (d.style.opacity = l.z > 0 ? "1" : "0.3"));
                }
                let u = i.current[e];
                u &&
                  ((u.style.left = "".concat(o - 10, "px")),
                  (u.style.top = "".concat(c - 10, "px")),
                  (u.style.zIndex = l.z > 0 ? "2" : "0"),
                  (u.style.opacity = l.z > 0 ? "1" : "0.35"));
              }
              e = requestAnimationFrame(o);
            };
          return (o(), () => cancelAnimationFrame(e));
        }, [t]);
        let o = (0, n.useCallback)(
          (e) => {
            null == s || s(e);
          },
          [s],
        );
        return (0, l.jsxs)("div", {
          className:
            "absolute bottom-[14px] right-[14px] max-lg:hidden z-[3] pointer-events-none bg-[rgba(17,17,17,0.82)] border-2 border-border-hard shadow-block-xs",
          style: { width: 74, height: 74 },
          children: [
            (0, l.jsx)("div", {
              className: "absolute rounded-full bg-white/30",
              style: { width: 5, height: 5, left: 34.5, top: 34.5 },
            }),
            tG.map((e, t) =>
              (0, l.jsx)(
                "div",
                {
                  ref: (e) => {
                    a.current[t] = e;
                  },
                  style: {
                    position: "absolute",
                    height: 2,
                    transformOrigin: "0 50%",
                    background: e.color,
                    top: 0,
                    left: 0,
                  },
                },
                "line-".concat(e.id),
              ),
            ),
            tG.map((e, t) =>
              (0, l.jsx)(
                "div",
                {
                  ref: (e) => {
                    i.current[t] = e;
                  },
                  onClick: () => o(e.id),
                  className:
                    "pointer-events-auto cursor-pointer hover:scale-110 transition-transform",
                  style: {
                    position: "absolute",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: e.color,
                    border: "2px solid rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 900,
                    fontFamily: "monospace",
                    userSelect: "none",
                  },
                  children: e.id.toUpperCase(),
                },
                "head-".concat(e.id),
              ),
            ),
          ],
        });
      }
      var tW = s(18082),
        tY = s(19535),
        tq = s(58199),
        t$ = s(98015);
      let tV = (0, tE.default)(
          () => Promise.all([s.e(6784), s.e(8357), s.e(6405)]).then(s.bind(s, 76405)),
          { loadableGenerated: { webpack: () => [76405] }, ssr: !1 },
        ),
        tJ = { move: "移动工具" },
        tX = ["select", "region", "mirror", "measure", "explode"],
        tZ = ["mirror-x", "mirror-y", "mirror-z", "rotate-90", "rotate-180", "rotate-270"];
      function tQ(e) {
        return "string" == typeof e && tX.includes(e) ? e : "select";
      }
      let t0 = { sheet: null, usage: null, toasts: [] };
      function t1(e, t) {
        switch (t.type) {
          case "OPEN_SHEET":
            return { ...e, sheet: t.sheet, usage: null };
          case "TOGGLE_SHEET":
            return { ...e, sheet: e.sheet === t.sheet ? null : t.sheet, usage: null };
          case "CLOSE_SHEET":
            return { ...e, sheet: null };
          case "SHOW_USAGE":
            return { ...e, usage: t.usage };
          case "CLOSE_USAGE":
            return { ...e, usage: null };
          case "PUSH_TOAST":
            return { ...e, toasts: [...e.toasts, t.toast].slice(-4) };
          case "DISMISS_TOAST":
            return { ...e, toasts: e.toasts.filter((e) => e.id !== t.id) };
          case "CLOSE_FLOATING":
            return { ...e, sheet: null, usage: null };
          default:
            return e;
        }
      }
      let t2 = { x: 0, y: 1, z: 2 };
      function t5(e) {
        let t = "";
        for (let s = 0; s < e.length; s += 32768)
          t += String.fromCharCode(...e.subarray(s, s + 32768));
        return btoa(t);
      }
      function t3(e) {
        return t5(new Uint8Array(e));
      }
      function t4(e) {
        let { targetFov: t } = e,
          { camera: s } = (0, i.C)();
        return (
          (0, i.D)(() => {
            if (!(s instanceof r.ubm)) return;
            let e = t - s.fov;
            Math.abs(e) > 0.05
              ? ((s.fov += 0.15 * e), s.updateProjectionMatrix())
              : s.fov !== t && ((s.fov = t), s.updateProjectionMatrix());
          }),
          null
        );
      }
      function t6() {
        var e, t, i, p, h, j, y, v, k, N, S;
        let w = z(),
          E = T(),
          C = (0, x.y5)(),
          _ = (function () {
            let [e, t] = (0, n.useState)(!1);
            return (
              (0, n.useEffect)(() => {
                if (!window.matchMedia) return;
                let e = window.matchMedia("(orientation: landscape) and (max-height: 520px)"),
                  s = () => t(e.matches);
                return (
                  s(),
                  e.addEventListener("change", s),
                  () => e.removeEventListener("change", s)
                );
              }, []),
              e
            );
          })(),
          { requireLogin: I, promptLogin: M } = (0, tw.E)(),
          A = (0, tC.S)(),
          O = (0, a.useRouter)(),
          R = (0, n.useRef)(null),
          [P, F] = (0, n.useState)(!1),
          [H, U] = (0, n.useState)(""),
          [Y, $] = (0, n.useState)(null),
          [J, X] = (0, n.useState)("matching"),
          [Z, Q] = (0, n.useState)([]),
          [ee, et] = (0, n.useState)([]),
          [ei, eo] = (0, n.useState)(null),
          [ec, ed] = (0, n.useState)(null),
          [em, ex] = (0, n.useState)(!1),
          ep = (0, n.useRef)(!1),
          ef = (0, n.useRef)(new r.PTz()),
          eg = (0, n.useRef)(null),
          ej = (0, n.useRef)(null),
          ev = (0, n.useRef)(8),
          [ek, ew] = (0, n.useState)(!1),
          [eE, e_] = (0, n.useState)(null),
          [eI, eM] = (0, n.useState)(null),
          [ez, eT] = (0, n.useState)(!1),
          [eL, eO] = (0, n.useState)(""),
          eR = (0, n.useRef)(!1),
          eD = (0, n.useRef)(!0),
          eP = (0, n.useRef)({ state: w, workName: eL, savedWorkId: eE });
        eP.current = { state: w, workName: eL, savedWorkId: eE };
        let eF = (0, n.useRef)(async () => !1),
          eH = (0, n.useRef)(() => {}),
          eU = (0, n.useRef)(async () => {});
        (0, n.useEffect)(
          () => (
            (eD.current = !0),
            () => {
              eD.current = !1;
            }
          ),
          [],
        );
        let [eG, eW] = (0, n.useState)(!1),
          [eq, e$] = (0, n.useState)(null),
          eV = (0, n.useRef)(null),
          eJ = (0, n.useRef)(!1),
          eX = (0, n.useRef)(!1),
          eZ = (0, n.useRef)(!1),
          eQ = (0, n.useRef)(!1),
          e2 = (0, n.useCallback)(function (e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3500;
            (eM({ type: "error", message: e }), setTimeout(() => eM(null), t));
          }, []),
          e4 = (0, n.useCallback)(() => {
            var e;
            return w.hasStructuralEdits
              ? null
              : (0, eA.CR)(null == (e = w.originalFileData) ? void 0 : e.byteLength);
          }, [w.hasStructuralEdits, w.originalFileData]),
          { initialLoaded: e6, save: e8 } = (function (e) {
            let [t, s] = (0, n.useState)(null);
            (0, n.useEffect)(() => {
              try {
                let t = localStorage.getItem(th(e));
                t ? s(JSON.parse(t)) : s({});
              } catch (e) {
                s({});
              }
            }, [e]);
            let l = (0, n.useRef)(null),
              a = (0, n.useRef)(""),
              r = (0, n.useCallback)(
                (t) => {
                  let s = JSON.stringify(t);
                  if (s !== a.current) {
                    a.current = s;
                    try {
                      localStorage.setItem(th(e), s);
                    } catch (e) {}
                    e &&
                      (l.current && clearTimeout(l.current),
                      (l.current = setTimeout(() => {
                        fetch("/api/studio/works/".concat(e), {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ editorState: s }),
                        }).catch(() => {});
                      }, 600)));
                  }
                },
                [e],
              );
            return (
              (0, n.useEffect)(
                () => () => {
                  l.current && clearTimeout(l.current);
                },
                [],
              ),
              { initialLoaded: t, save: r }
            );
          })(eE),
          e9 = (0, n.useCallback)(() => {
            if ("ready" !== w.loading) {
              (eM({ type: "error", message: "模型仍在加载，请等待加载完成后再导出" }),
                setTimeout(() => eM(null), 2500));
              return;
            }
            (tf(null), F(!1), eT(!1), t8(!1), tn({ type: "CLOSE_FLOATING" }), eW(!0));
          }, [w.loading]),
          e7 = (0, n.useCallback)((e) => {
            let t = String(null != e ? e : "");
            return /[",\r\n]/.test(t) ? '"'.concat(t.replace(/"/g, '""'), '"') : t;
          }, []),
          te = (0, n.useCallback)(() => {
            var e;
            if (0 === w.materialStats.length) {
              (eM({ type: "error", message: "暂无材质数据" }), setTimeout(() => eM(null), 2e3));
              return;
            }
            let t = new Blob(
                [
                  "\uFEFF" +
                    [
                      "方块ID,中文名,数量,占比(%)",
                      ...w.materialStats.map((e) =>
                        [e.blockId, e.chineseName, e.count, e.percentage.toFixed(2)]
                          .map(e7)
                          .join(","),
                      ),
                    ].join("\n"),
                ],
                { type: "text/csv;charset=utf-8;" },
              ),
              s = URL.createObjectURL(t),
              l = document.createElement("a");
            l.href = s;
            let n =
              (null == (e = w.source) ? void 0 : e.type) === "projection"
                ? (0, tF.ew)(w.source.voxelModel.name)
                : "材质清单";
            ((l.download = "".concat(n, "-材质清单.csv")),
              document.body.appendChild(l),
              l.click(),
              document.body.removeChild(l),
              URL.revokeObjectURL(s),
              eM({ type: "success", message: "CSV 已导出" }),
              setTimeout(() => eM(null), 2e3));
          }, [e7, w.materialStats, w.source]),
          tt = (0, n.useCallback)(() => {
            try {
              var e;
              let t = document.querySelector("canvas");
              if (!t) {
                (eM({ type: "error", message: "未找到画布" }), setTimeout(() => eM(null), 2e3));
                return;
              }
              let s = t.toDataURL("image/png"),
                l = document.createElement("a");
              l.href = s;
              let n =
                (null == (e = w.source) ? void 0 : e.type) === "projection"
                  ? (0, tF.ew)(w.source.voxelModel.name)
                  : "截图";
              ((l.download = "".concat(n, "-截图.png")),
                document.body.appendChild(l),
                l.click(),
                document.body.removeChild(l),
                eM({ type: "success", message: "截图已保存" }),
                setTimeout(() => eM(null), 2e3));
            } catch (e) {
              (eM({ type: "error", message: "截图失败" }), setTimeout(() => eM(null), 2e3));
            }
          }, [w.source]),
          [tl, tn] = (0, n.useReducer)(t1, t0),
          ta = "materials" === tl.sheet,
          ti = "selection" === tl.sheet,
          [to, td] = (0, n.useState)(!0),
          [tx, tf] = (0, n.useState)(null),
          [tj, ty] = (0, n.useState)("select"),
          [tv, tE] = (0, n.useState)(null),
          [t_, tI] = (0, n.useState)(0),
          [tM, tO] = (0, n.useState)(0),
          [tG, tX] = (0, n.useState)(null),
          [t6, t8] = (0, n.useState)(!1),
          [t9, t7] = (0, n.useState)(!1),
          [se, st] = (0, n.useState)("orbit"),
          [ss, sl] = (0, n.useState)(!1),
          sn = (0, n.useRef)(null),
          sa = (0, n.useRef)(0),
          sr = (0, n.useRef)(!1),
          si = (0, n.useCallback)(function (e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "info",
              s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3600;
            sa.current += 1;
            let l = "".concat(Date.now(), "-").concat(sa.current);
            (tn({ type: "PUSH_TOAST", toast: { id: l, message: e, tone: t } }),
              window.setTimeout(() => tn({ type: "DISMISS_TOAST", id: l }), s));
          }, []),
          so = (0, n.useCallback)((e, t) => {
            tn({
              type: "SHOW_USAGE",
              usage: {
                ...{
                  select: {
                    title: "选择工具",
                    desc: t || "用于选择方块、扩展选区，并通过左侧面板执行替换、删除和显示控制。",
                    items: [
                      "左键选择方块，Ctrl 可追加多选",
                      "右键主菜单已移除，主要操作在左侧面板或移动端选区面板",
                      "选中实体时只显示识别信息，不开放编辑",
                    ],
                    actions: [
                      {
                        label: "打开选区操作",
                        primary: !0,
                        onClick: () => tn({ type: "OPEN_SHEET", sheet: "selection" }),
                      },
                      {
                        label: "打开材质清单",
                        onClick: () => {
                          (td(!0), tn({ type: "OPEN_SHEET", sheet: "materials" }));
                        },
                      },
                    ],
                    tone: "info",
                  },
                  region: {
                    title: "框选工具",
                    desc: t || "点击起点和终点生成选区，空框选不会清空原选择。",
                    items: [
                      "第一下点击 A 点，第二下点击 B 点",
                      "拖动绿色手柄微调选区范围",
                      "替换、删除和重置都在选区面板中执行",
                    ],
                    actions: [
                      {
                        label: "打开选区操作",
                        primary: !0,
                        onClick: () => tn({ type: "OPEN_SHEET", sheet: "selection" }),
                      },
                      { label: "返回选择工具", onClick: () => ty("select") },
                    ],
                    tone: "info",
                  },
                  mirror: {
                    title: "镜像 / 旋转",
                    desc: t || "结构变换会改变投影块坐标，执行前会弹出风险确认。",
                    items: [
                      "镜像/旋转会影响整个投影结构",
                      "执行后可用 Ctrl+Z 撤销或 Ctrl+Y 重做",
                      "操作前仍建议确认轴向和角度",
                    ],
                    tone: "danger",
                  },
                  measure: {
                    title: "测量工具",
                    desc: t || "测量只采集两个点，不改变选择状态和模型数据。",
                    items: [
                      "点击两个方块生成跨度尺寸",
                      "重置测量后可重新取点",
                      "退出测量后恢复普通选择",
                    ],
                    actions: [{ label: "返回选择工具", primary: !0, onClick: () => ty("select") }],
                    tone: "info",
                  },
                  explode: {
                    title: "爆炸图预览",
                    desc: t || "用于看清层间结构，预览中不能替换、删除或选择方块。",
                    items: ["拖动滑杆调整层间距离", "这是只读查看模式", "退出后回到普通选择工具"],
                    actions: [
                      {
                        label: "返回选择工具",
                        primary: !0,
                        onClick: () => {
                          (ty("select"), tO(0));
                        },
                      },
                    ],
                    tone: "warning",
                  },
                  move: {
                    title: "移动工具",
                    desc: "移动工具暂未开放。",
                    items: ["当前不会改变模型数据"],
                    tone: "warning",
                  },
                }[e],
                id: "".concat(e, "-").concat(Date.now()),
              },
            });
          }, []),
          sc = (0, n.useCallback)(
            (e) => {
              (tn({
                type: "SHOW_USAGE",
                usage: {
                  id: "material-".concat(Date.now()),
                  title: "材质定位",
                  desc: "已定位 "
                    .concat(e.chineseName, "，共 ")
                    .concat(e.count.toLocaleString(), " 块。"),
                  items: [
                    "点击材质只高亮同类方块，不会创建可编辑选区",
                    "要批量编辑，请先选中一个方块，再用“相同材质”扩展选择",
                    "移动端可从左侧工具鞍“选区”入口继续操作",
                  ],
                  actions: [
                    {
                      label: "打开选区操作",
                      primary: !0,
                      onClick: () => tn({ type: "OPEN_SHEET", sheet: "selection" }),
                    },
                    {
                      label: "查看材质清单",
                      onClick: () => {
                        (td(!0), tn({ type: "OPEN_SHEET", sheet: "materials" }));
                      },
                    },
                  ],
                  tone: "info",
                },
              }),
                si(
                  "已定位 ".concat(e.chineseName, " \xb7 ").concat(e.count.toLocaleString(), " 块"),
                  "info",
                  2600,
                ));
            },
            [si],
          ),
          sd = (0, n.useRef)("");
        (0, n.useEffect)(() => {
          if (!eI) return;
          let e = "".concat(eI.type, ":").concat(eI.message);
          sd.current !== e &&
            ((sd.current = e), si(eI.message, "success" === eI.type ? "success" : "error"));
        }, [si, eI]);
        let su = (0, n.useRef)("");
        ((0, n.useEffect)(() => {
          tG && su.current !== tG && ((su.current = tG), si(tG, "warning", 2600));
        }, [si, tG]),
          (0, n.useEffect)(() => {
            (ed(null),
              "select" !== tj && tE(null),
              "measure" !== tj && Q([]),
              "region" !== tj && (et([]), eo(null), ex(!1)),
              "explode" !== tj && tO(0),
              ["region", "measure", "explode"].includes(tj) &&
                (E({ type: "CLEAR_SELECTION" }), sp(null), tE(null)));
          }, [tj, E]),
          (0, n.useEffect)(() => {
            w.selectedBlock && tE(null);
          }, [w.selectedBlock]));
        let sm = (0, n.useCallback)(
          (e) => {
            E({ type: "SET_ERROR", payload: e });
          },
          [E],
        );
        ((0, n.useEffect)(() => {
          let e = !1;
          return (
            (0, b.y6)().catch((t) => {
              if (e) return;
              let s = (0, b.c2)(t);
              (console.error("MC 资源预加载失败:", t), sm(s));
            }),
            () => {
              e = !0;
            }
          );
        }, [sm]),
          (0, n.useEffect)(() => {
            let e = () => {
                let e = sessionStorage.getItem("studio_original_file");
                if (e)
                  try {
                    let t = atob(e),
                      s = new Uint8Array(t.length);
                    for (let e = 0; e < t.length; e++) s[e] = t.charCodeAt(e);
                    E({ type: "SET_ORIGINAL_FILE", payload: s.buffer });
                  } catch (e) {
                    throw Error("临时会话中的原始投影文件已损坏");
                  }
              },
              t = async (e, t) => {
                (E({ type: "SET_MATERIAL_STATS", payload: t && t.length > 0 ? t : await tR(e) }),
                  E({ type: "SET_LOADING", payload: "ready" }));
              },
              l = (0, tD.Dn)();
            if (l)
              try {
                (E({
                  type: "RESTORE_SESSION",
                  payload: {
                    voxelModel: l.voxelModel,
                    replacements: l.replacements,
                    undoStack: l.undoStack,
                    redoStack: l.redoStack,
                    savedHistoryDepth: l.savedHistoryDepth,
                    savedHistoryMarker: l.savedHistoryMarker,
                    isModified: l.isModified,
                    hasStructuralEdits: l.hasStructuralEdits,
                    hasUntrackedStructuralEdits: l.hasUntrackedStructuralEdits,
                  },
                }),
                  e(),
                  l.workId && e_(l.workId),
                  t(l.voxelModel, l.materialStats));
                return;
              } catch (e) {
                (console.error("恢复 Studio 临时会话失败:", e), (0, tD.Gq)());
              }
            let n = sessionStorage.getItem("studio_source_type");
            if ("projection" === n) {
              let s = sessionStorage.getItem("studio_voxel_model");
              if (s)
                try {
                  E({ type: "SET_LOADING", payload: "rendering" });
                  let l = JSON.parse(s);
                  (E({ type: "SET_SOURCE", payload: { type: "projection", voxelModel: l } }),
                    "true" === sessionStorage.getItem("studio_export_has_structural_edits") &&
                      E({
                        type: "RESTORE_SESSION",
                        payload: {
                          voxelModel: l,
                          replacements: [],
                          undoStack: [],
                          redoStack: [],
                          savedHistoryDepth: 0,
                          savedHistoryMarker: null,
                          isModified: !0,
                          hasStructuralEdits: !0,
                          hasUntrackedStructuralEdits: !0,
                        },
                      }));
                  let n = sessionStorage.getItem("studio_export_replacements");
                  if (n)
                    try {
                      let e = JSON.parse(n);
                      Array.isArray(e) && E({ type: "SET_REPLACEMENTS", payload: e });
                    } catch (e) {}
                  (e(), t(l));
                  let a = sessionStorage.getItem("studio_work_id");
                  a && e_(a);
                  let r = sessionStorage.getItem("studio_editor_state_remote");
                  if (r) {
                    sessionStorage.removeItem("studio_editor_state_remote");
                    try {
                      let e = JSON.parse(r);
                      (e.currentTool && ty(tQ(e.currentTool)), (ep.current = !0));
                    } catch (e) {}
                  }
                } catch (e) {
                  (console.error("恢复旧版 Studio 会话失败:", e),
                    E({ type: "SET_ERROR", payload: "编辑会话已损坏，请返回 Studio 重新导入" }));
                }
              else E({ type: "SET_ERROR", payload: "编辑会话已失效，请返回 Studio 重新导入" });
            } else if ("building" === n) {
              let e = sessionStorage.getItem("studio_building");
              if (e)
                try {
                  let t = JSON.parse(e),
                    s = {
                      type: "building",
                      buildingId: t.buildingId,
                      modelUrl: t.modelUrl,
                      mtlUrl: t.mtlUrl,
                      buildingName: t.buildingName,
                    };
                  (E({ type: "SET_SOURCE", payload: s }),
                    E({ type: "SET_LOADING", payload: "ready" }));
                } catch (e) {
                  E({ type: "SET_ERROR", payload: "数据加载失败" });
                }
            } else if ("projection_url" === n) {
              let e = sessionStorage.getItem("studio_projection_url"),
                t = sessionStorage.getItem("studio_building_name") || "未命名建筑",
                l = sessionStorage.getItem("studio_building_id");
              e || l
                ? (E({ type: "SET_LOADING", payload: "parsing" }),
                  (async () => {
                    try {
                      let n = l ? "/api/buildings/".concat(l, "/projection") : e,
                        a = await fetch(n);
                      if (!a.ok) throw Error("下载投影文件失败");
                      let r = await a.arrayBuffer(),
                        i =
                          a.headers.get("X-File-Extension") ||
                          (null == e ? void 0 : e.split(".").pop()) ||
                          "litematic",
                        o = "".concat(t, ".").concat(i),
                        c = new File([r], o),
                        { parseProjectionFile: d } = await Promise.resolve().then(s.bind(s, 7882)),
                        u = await d(c);
                      ((u.name = (0, tF.ew)(t, u.name)),
                        E({ type: "SET_SOURCE", payload: { type: "projection", voxelModel: u } }),
                        E({ type: "SET_ORIGINAL_FILE", payload: r }));
                      try {
                        sessionStorage.setItem("studio_original_file", t3(r));
                      } catch (e) {
                        throw Error("投影文件过大，浏览器无法建立可恢复的临时会话");
                      }
                      let m = await tR(u);
                      (E({ type: "SET_MATERIAL_STATS", payload: m }),
                        E({ type: "SET_LOADING", payload: "ready" }),
                        (0, tD.AI)({
                          voxelModel: u,
                          replacements: [],
                          materialStats: m,
                          undoStack: [],
                          redoStack: [],
                          savedHistoryDepth: 0,
                          savedHistoryMarker: null,
                          isModified: !1,
                          hasStructuralEdits: !1,
                          hasUntrackedStructuralEdits: !1,
                          buildingId: l || void 0,
                          buildingName: t,
                        }) ||
                          (sessionStorage.setItem("studio_voxel_model", JSON.stringify(u)),
                          sessionStorage.setItem("studio_source_type", "projection")),
                        sessionStorage.removeItem("studio_projection_url"));
                    } catch (e) {
                      (console.error("从 URL 加载投影文件失败:", e),
                        E({ type: "SET_ERROR", payload: "加载投影文件失败，请重试" }));
                    }
                  })())
                : E({ type: "SET_ERROR", payload: "编辑会话已失效，请返回 Studio 重新导入" });
            } else E({ type: "SET_ERROR", payload: "编辑会话已失效，请返回 Studio 重新导入" });
          }, [E]));
        let [sx, sp] = (0, n.useState)(null),
          sh = (0, n.useCallback)(
            (e) => {
              let [t, s, l] = e.position;
              return (
                !(
                  w.hiddenLayers.has(s) ||
                  w.hiddenPositions.has("".concat(t, ",").concat(s, ",").concat(l))
                ) &&
                (null == w.layerCutoff ||
                  ("gallery" === w.layerMode ? s === w.layerCutoff : s <= w.layerCutoff))
              );
            },
            [w.hiddenLayers, w.hiddenPositions, w.layerCutoff, w.layerMode],
          ),
          sb = (0, n.useCallback)(
            (e) => {
              (ty(e),
                tI((e) => e + 1),
                tf(null),
                window.innerWidth < 1024 && "select" !== e
                  ? tn({ type: "OPEN_SHEET", sheet: "selection" })
                  : tn({ type: "CLOSE_SHEET" }),
                so(e));
            },
            [so],
          ),
          sf = "explode" === tj || tM > 0 || "fps" === se || ss,
          sg = (0, n.useRef)(null),
          sj = (0, n.useRef)(null);
        (0, n.useEffect)(() => {
          sf &&
            (tf(null),
            ed(null),
            sp(null),
            tE(null),
            (sg.current = null),
            (sj.current = null),
            E({ type: "CLEAR_SELECTION" }),
            E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }));
        }, [E, sf]);
        let sy = (0, n.useCallback)(
            (e, t, s, l, n) => {
              2 === s && (sf || (sj.current = { target: { blockId: e, position: t }, x: l, y: n }));
            },
            [sf],
          ),
          sv = (0, n.useCallback)(() => {
            (et([]), eo(null), ed(null), ex(!1));
          }, []),
          sk = (0, n.useCallback)(() => {
            (F(!1),
              U(""),
              $(null),
              X("matching"),
              tf(null),
              ed(null),
              Q([]),
              sp(null),
              tE(null),
              tI((e) => e + 1),
              ty("select"),
              (sg.current = null),
              (sj.current = null),
              sv(),
              E({ type: "CLEAR_SELECTION" }),
              E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }));
          }, [E, sv]),
          sN = (0, n.useCallback)(() => {
            let e = sr.current;
            ((sr.current = !1),
              F(!1),
              U(""),
              $(null),
              X("matching"),
              tf(null),
              e && tn({ type: "OPEN_SHEET", sheet: "selection" }));
          }, []),
          sS = (0, n.useCallback)(() => {
            (tf(null),
              ed(null),
              Q([]),
              sp(null),
              tE(null),
              sv(),
              E({ type: "CLEAR_SELECTION" }),
              E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }));
          }, [E, sv]),
          sw = (0, n.useCallback)(() => {
            if ("fps" === se) {
              try {
                var e;
                null == (e = ej.current) || e.unlock();
              } catch (e) {}
              (st("orbit"), eg.current && (sn.current = eg.current.target.clone()));
            } else (sS(), ty("select"), st("fps"));
          }, [se, sS]),
          sE = (0, n.useCallback)(
            (e) => {
              var t;
              if ((null == (t = w.source) ? void 0 : t.type) !== "projection") return e;
              let [s, l, n] = w.source.voxelModel.size;
              return [
                Math.max(0, Math.min(s - 1, e[0])),
                Math.max(0, Math.min(l - 1, e[1])),
                Math.max(0, Math.min(n - 1, e[2])),
              ];
            },
            [w.source],
          ),
          sC = (0, n.useCallback)(() => {
            window.innerWidth < 1024 && tn({ type: "OPEN_SHEET", sheet: "selection" });
          }, []),
          s_ = (0, n.useCallback)(
            (e) => {
              var t, s, l;
              if (e.length < 2) return void eo(null);
              let n =
                ((s = e[0]),
                (l = e[1]),
                {
                  min: [Math.min(s[0], l[0]), Math.min(s[1], l[1]), Math.min(s[2], l[2])],
                  max: [Math.max(s[0], l[0]), Math.max(s[1], l[1]), Math.max(s[2], l[2])],
                });
              if ((eo(n), (null == (t = w.source) ? void 0 : t.type) !== "projection")) return;
              let a = w.source.voxelModel.blocks.filter(
                (e) =>
                  sh(e) &&
                  e.position[0] >= n.min[0] &&
                  e.position[0] <= n.max[0] &&
                  e.position[1] >= n.min[1] &&
                  e.position[1] <= n.max[1] &&
                  e.position[2] >= n.min[2] &&
                  e.position[2] <= n.max[2],
              );
              if (0 === a.length) {
                (tX("框选范围内没有可见方块，已保留当前选择"), setTimeout(() => tX(null), 2200));
                return;
              }
              E({
                type: "SET_SELECTED_POSITIONS",
                payload: new Set(
                  a.map((e) =>
                    "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                  ),
                ),
              });
              let r = a[0];
              (E({
                type: "SET_SELECTED_BLOCK",
                payload: { blockId: r.blockId, position: r.position },
              }),
                sC());
            },
            [E, sh, sC, w.source],
          ),
          sI = (0, n.useCallback)(
            (e, t) => {
              var s;
              E({ type: "SET_SELECTED_BLOCK", payload: { blockId: e, position: t } });
              let l = new Set();
              if ((null == (s = w.source) ? void 0 : s.type) === "projection") {
                let e = w.source.voxelModel,
                  s = e.blocks.find(
                    (e) =>
                      e.position[0] === t[0] && e.position[1] === t[1] && e.position[2] === t[2],
                  );
                if (s) {
                  let t = e0(e, s);
                  t.length > 1 &&
                    (l = new Set(
                      t.map((e) => "".concat(e[0], ",").concat(e[1], ",").concat(e[2])),
                    ));
                }
              }
              (E({ type: "SET_SELECTED_POSITIONS", payload: l }), sC());
            },
            [E, sC, w.source],
          ),
          sM = (0, n.useCallback)(
            (e) => {
              0 !== e.length &&
                (E({ type: "DELETE_BLOCKS", payload: { positions: e } }),
                tf(null),
                ed(null),
                "region" === tj && sv());
            },
            [tj, E, sv],
          ),
          sz = (0, n.useCallback)(
            async (e) => {
              if (0 === e.length) return;
              (tf(null), tn({ type: "CLOSE_FLOATING" }));
              let t = e.length;
              (await A({
                title: "确认删除方块",
                subtitle: "危险操作 \xb7 执行后可用 Ctrl+Z 撤销",
                tone: "danger",
                skin: "editor",
                confirmText: t > 1 ? "删除 ".concat(t.toLocaleString(), " 块") : "删除方块",
                body: (0, l.jsxs)(l.Fragment, {
                  children: [
                    (0, l.jsx)("p", { children: "将删除当前选中的方块，并清空当前选区。" }),
                    (0, l.jsxs)("div", {
                      className: "mt-3 border-2 border-border-hard bg-bg-inset text-xs",
                      children: [
                        (0, l.jsxs)("div", {
                          className:
                            "flex items-center justify-between gap-4 border-b-2 border-border-hard px-3 py-2",
                          children: [
                            (0, l.jsx)("span", {
                              className: "font-bold text-text-muted",
                              children: "操作",
                            }),
                            (0, l.jsx)("span", {
                              className: "font-black text-error",
                              children: "删除方块",
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className:
                            "flex items-center justify-between gap-4 border-b-2 border-border-hard px-3 py-2",
                          children: [
                            (0, l.jsx)("span", {
                              className: "font-bold text-text-muted",
                              children: "范围",
                            }),
                            (0, l.jsxs)("span", {
                              className: "font-pixel font-black text-text-primary",
                              children: [t.toLocaleString(), " 块"],
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "flex items-center justify-between gap-4 px-3 py-2",
                          children: [
                            (0, l.jsx)("span", {
                              className: "font-bold text-text-muted",
                              children: "结果",
                            }),
                            (0, l.jsx)("span", {
                              className: "font-black text-text-primary",
                              children: "投影结构将改变",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, l.jsx)("p", {
                      className:
                        "mt-3 border-l-4 border-warning bg-warning/10 px-3 py-2 text-xs text-warning",
                      children: "执行后可用 Ctrl+Z 撤销，但当前选区会被清空。",
                    }),
                  ],
                }),
              })) && (sM(e), si("已删除 ".concat(t.toLocaleString(), " 个方块"), "success"));
            },
            [A, sM, si],
          ),
          sT = (0, n.useCallback)(() => {
            var e;
            let t = eg.current;
            if (!t) return;
            let s = t.object,
              l =
                (null == (e = w.source) ? void 0 : e.type) === "projection"
                  ? new r.Pq0(
                      w.source.voxelModel.size[0] / 2,
                      w.source.voxelModel.size[1] / 2,
                      w.source.voxelModel.size[2] / 2,
                    )
                  : new r.Pq0(0, 5, 0);
            (s.position.set(l.x + 25, l.y + 25, l.z + 25),
              s.lookAt(l),
              t.target.copy(l),
              t.update());
          }, [w.source]);
        ((0, n.useEffect)(() => {
          let e = (e) => {
            ss && (e.preventDefault(), e.stopPropagation());
          };
          return (
            window.addEventListener("contextmenu", e, !0),
            () => window.removeEventListener("contextmenu", e, !0)
          );
        }, [ss]),
          (0, n.useEffect)(() => {
            let e = (e) => {
              let t = e.target;
              if (
                (null == t ? void 0 : t.tagName) !== "INPUT" &&
                (null == t ? void 0 : t.tagName) !== "TEXTAREA" &&
                !("fps" === se && ["w", "a", "s", "d", " "].includes(e.key.toLowerCase()))
              ) {
                if (("v" === e.key || "V" === e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
                  (e.preventDefault(), sw());
                  return;
                }
                if (
                  ((e.ctrlKey || e.metaKey) &&
                    "z" === e.key &&
                    !e.shiftKey &&
                    (e.preventDefault(), E({ type: "UNDO" })),
                  (e.ctrlKey || e.metaKey) &&
                    ("y" === e.key || ("z" === e.key && e.shiftKey)) &&
                    (e.preventDefault(), E({ type: "REDO" })),
                  "Escape" === e.key &&
                    ("region" === tj && (et([]), eo(null), ex(!1)),
                    "measure" === tj && Q([]),
                    E({ type: "CLEAR_SELECTION" }),
                    sp(null)),
                  "Delete" === e.key || "Backspace" === e.key)
                )
                  if (w.selectedPositions.size > 0) {
                    e.preventDefault();
                    let t = [];
                    for (let e of w.selectedPositions) {
                      let [s, l, n] = e.split(",").map(Number);
                      t.push([s, l, n]);
                    }
                    sz(t);
                  } else w.selectedBlock && (e.preventDefault(), sz([w.selectedBlock.position]));
              }
            };
            return (
              window.addEventListener("keydown", e),
              () => window.removeEventListener("keydown", e)
            );
          }, [E, tj, w.selectedPositions, w.selectedBlock, se, sw, sz]));
        let sL = (0, n.useCallback)((e) => {
            let t = tJ[e] || "该工具";
            (tX("".concat(t, "开发中 \xb7 Phase 3 推出")), setTimeout(() => tX(null), 2e3));
          }, []),
          sA = (0, n.useCallback)(
            (e, t, s, l, n) => {
              if ((tE(null), "measure" === tj))
                return void Q((e) => (e.length >= 2 ? e : [...e, t]));
              if ("region" === tj)
                return void et((e) => {
                  if (e.length >= 2) return (eo(null), [t]);
                  let s = [...e, t];
                  return (2 === s.length && s_(s), s);
                });
              if (n) {
                var a, r;
                let e = ["".concat(t[0], ",").concat(t[1], ",").concat(t[2])],
                  s = null;
                if ((null == (a = w.source) ? void 0 : a.type) === "projection") {
                  let l = w.source.voxelModel,
                    n = l.blocks.find(
                      (e) =>
                        e.position[0] === t[0] && e.position[1] === t[1] && e.position[2] === t[2],
                    );
                  if (n) {
                    s = n;
                    let t = e0(l, n);
                    t.length > 1 &&
                      (e = t.map((e) => "".concat(e[0], ",").concat(e[1], ",").concat(e[2])));
                  }
                }
                let l = new Set(w.selectedPositions);
                0 === l.size &&
                  w.selectedBlock &&
                  l.add(
                    ""
                      .concat(w.selectedBlock.position[0], ",")
                      .concat(w.selectedBlock.position[1], ",")
                      .concat(w.selectedBlock.position[2]),
                  );
                let n = e[0],
                  i = l.has(n);
                if (l.has(n)) for (let t of e) l.delete(t);
                else for (let t of e) l.add(t);
                let o =
                  !i && s
                    ? s
                    : (null == (r = w.source) ? void 0 : r.type) === "projection"
                      ? w.source.voxelModel.blocks.find((e) =>
                          l.has(
                            ""
                              .concat(e.position[0], ",")
                              .concat(e.position[1], ",")
                              .concat(e.position[2]),
                          ),
                        )
                      : null;
                (E({ type: "SET_SELECTED_POSITIONS", payload: l }),
                  E({
                    type: "SET_SELECTED_BLOCK",
                    payload: o ? { blockId: o.blockId, position: o.position } : null,
                  }),
                  E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }),
                  sp(null),
                  l.size > 0 && sC());
                return;
              }
              (E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }), sp(null), sI(e, t));
            },
            [s_, tj, E, sC, w.selectedBlock, w.selectedPositions, w.source, sI],
          ),
          sB = (0, n.useCallback)(
            (e) => {
              (tE(e),
                tf(null),
                ed(null),
                sp(null),
                E({ type: "CLEAR_SELECTION" }),
                E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }),
                sC());
            },
            [E, sC],
          ),
          sO = (0, n.useCallback)(
            (e, t, s) => {
              0 !== s &&
                et((l) => {
                  if (l.length < 2) return l;
                  let n = t2[t],
                    a = l.map((e) => [...e]);
                  return ((a[e][n] += s), (a[e] = sE(a[e])), s_(a), a);
                });
            },
            [s_, sE],
          ),
          sR = (0, n.useRef)(""),
          sD = (0, n.useCallback)((e) => {
            let t = eg.current;
            if (!t) return;
            let s = t.target,
              l = t.object.position.distanceTo(s),
              n = sR.current === e;
            sR.current = n ? "" : e;
            let a = n ? -1 : 1,
              i = {
                x: new r.Pq0(a * l, 0, 0),
                y: new r.Pq0(0, a * l, 0),
                z: new r.Pq0(0, 0, a * l),
              },
              o = s.clone().add(i[e]),
              c = t.object;
            (c.position.copy(o), c.lookAt(s), t.update());
          }, []),
          sP = (0, n.useCallback)((e) => {
            ed(e);
          }, []),
          sF = "region" === tj || "measure" === tj,
          sH = (0, n.useCallback)(
            (e) =>
              "mirror-x" === e
                ? "沿 X 轴镜像"
                : "mirror-y" === e
                  ? "沿 Y 轴镜像"
                  : "mirror-z" === e
                    ? "沿 Z 轴镜像"
                    : "rotate-90" === e
                      ? "旋转 90\xb0"
                      : "rotate-180" === e
                        ? "旋转 180\xb0"
                        : "rotate-270" === e
                          ? "旋转 270\xb0"
                          : e,
            [],
          ),
          sU = (0, n.useCallback)(
            (e) => {
              if (!w.source || "projection" !== w.source.type || !tZ.includes(e)) return;
              let t = w.source.voxelModel,
                s = sH(e),
                l = (0, tL.Gn)(t, e);
              (E({
                type: "TRANSFORM_BLOCKS",
                payload: { blocks: l.blocks, size: l.size, entities: l.entities, kind: e },
              }),
                tX("".concat(s, "完成（").concat(l.blocks.length.toLocaleString(), " 块已重排）")),
                setTimeout(() => tX(null), 2500));
            },
            [E, sH, w.source],
          ),
          sG = (0, n.useCallback)(
            async (e) => {
              var t;
              let s = sH(e);
              (tf(null), tn({ type: "CLOSE_FLOATING" }));
              let n =
                (null == (t = w.source) ? void 0 : t.type) === "projection"
                  ? w.source.voxelModel.blocks.length
                  : 0;
              (await A({
                title: "确认结构变换",
                subtitle: "危险操作 \xb7 将重排整个投影的方块坐标",
                tone: "danger",
                skin: "editor",
                confirmText: s,
                body: (0, l.jsxs)(l.Fragment, {
                  children: [
                    (0, l.jsxs)("p", { children: ["确定对整个投影执行「", s, "」吗？"] }),
                    (0, l.jsxs)("div", {
                      className: "mt-3 border-2 border-border-hard bg-bg-inset text-xs",
                      children: [
                        (0, l.jsxs)("div", {
                          className:
                            "flex items-center justify-between gap-4 border-b-2 border-border-hard px-3 py-2",
                          children: [
                            (0, l.jsx)("span", {
                              className: "font-bold text-text-muted",
                              children: "操作",
                            }),
                            (0, l.jsx)("span", { className: "font-black text-error", children: s }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className:
                            "flex items-center justify-between gap-4 border-b-2 border-border-hard px-3 py-2",
                          children: [
                            (0, l.jsx)("span", {
                              className: "font-bold text-text-muted",
                              children: "范围",
                            }),
                            (0, l.jsxs)("span", {
                              className: "font-pixel font-black text-text-primary",
                              children: ["全部 ", n.toLocaleString(), " 块"],
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "flex items-center justify-between gap-4 px-3 py-2",
                          children: [
                            (0, l.jsx)("span", {
                              className: "font-bold text-text-muted",
                              children: "结果",
                            }),
                            (0, l.jsx)("span", {
                              className: "font-black text-text-primary",
                              children: "坐标与方块朝向将重映射",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, l.jsx)("p", {
                      className:
                        "mt-3 border-l-4 border-warning bg-warning/10 px-3 py-2 text-xs text-warning",
                      children: "执行后可用 Ctrl+Z 撤销；楼梯、活塞等方块朝向会自动重映射。",
                    }),
                  ],
                }),
              })) && sU(e);
            },
            [sU, A, sH, w.source],
          ),
          sK = (0, n.useCallback)(
            function (e, t) {
              let s =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : t && t.length > 1
                    ? "positions"
                    : "matching";
              ((sr.current = window.innerWidth < 1024 && "selection" === tl.sheet),
                U(e),
                $(t && t.length > 0 ? t : null),
                X(s),
                tf(null),
                eW(!1),
                eT(!1),
                t8(!1),
                F(!0),
                tn({ type: "CLOSE_FLOATING" }));
            },
            [tl.sheet],
          ),
          sW = (0, n.useCallback)(
            (e) => {
              let t;
              if (!w.source || "projection" !== w.source.type) return void sk();
              let s = (0, b.Oe)(),
                l = (0, f.O5)(e);
              if (!s || !l || !(0, f.Yg)(l, s.blockIds))
                return void si("该目标不是可放置方块，已拒绝替换", "error", 4200);
              let n = w.source.voxelModel.blocks;
              if (Y && Y.length > 0 && "positions" === J) {
                let e = new Set(Y.map((e) => "".concat(e[0], ",").concat(e[1], ",").concat(e[2]))),
                  t = new Map();
                for (let s of n) {
                  var a;
                  let n = ""
                    .concat(s.position[0], ",")
                    .concat(s.position[1], ",")
                    .concat(s.position[2]);
                  if (!e.has(n) || (0, f.O5)(s.blockId) === l) continue;
                  let r = null != (a = t.get(s.blockId)) ? a : [];
                  (r.push(s.position), t.set(s.blockId, r));
                }
                let s = [];
                for (let [e, n] of t)
                  s.push({ fromBlockId: e, toBlockId: l, positions: n, scope: "batch" });
                if (s.length > 0) {
                  E({ type: "REPLACE_BLOCKS", payload: s });
                  let e = s.reduce((e, t) => e + t.positions.length, 0);
                  si("已替换 ".concat(e.toLocaleString(), " 块，可按 Ctrl+Z 撤销"), "success");
                } else si("选区内没有需要替换的方块", "warning");
                ((sr.current = !1), sk());
                return;
              }
              if ((0, f.O5)(H) === l) {
                (si("目标方块与来源一致，未执行替换", "warning"), (sr.current = !1), sk());
                return;
              }
              if (Y && Y.length > 0) {
                let e = new Set(Y.map((e) => "".concat(e[0], ",").concat(e[1], ",").concat(e[2])));
                t = n
                  .filter(
                    (t) =>
                      t.blockId === H &&
                      e.has(
                        ""
                          .concat(t.position[0], ",")
                          .concat(t.position[1], ",")
                          .concat(t.position[2]),
                      ),
                  )
                  .map((e) => e.position);
              } else t = n.filter((e) => e.blockId === H).map((e) => e.position);
              (t.length > 0
                ? (E({
                    type: "REPLACE_BLOCK",
                    payload: { fromBlockId: H, toBlockId: l, positions: t, scope: "batch" },
                  }),
                  si(
                    "已替换 ".concat(t.length.toLocaleString(), " 块，可按 Ctrl+Z 撤销"),
                    "success",
                  ))
                : si("没有找到可替换的匹配方块", "warning"),
                (sr.current = !1),
                sk());
            },
            [w.source, H, Y, J, E, si, sk],
          );
        ((0, n.useEffect)(() => {
          if (!ep.current && e6) {
            if (0 === Object.keys(e6).length || !eE) {
              ep.current = !0;
              return;
            }
            (e6.currentTool && ty(tQ(e6.currentTool)), (ep.current = !0));
          }
        }, [e6, eE]),
          (0, n.useEffect)(() => {
            ep.current && e8({ currentTool: tj });
          }, [tj, e8]),
          (0, n.useEffect)(() => {
            var e;
            if (
              "ready" !== w.loading ||
              (null == (e = w.source) ? void 0 : e.type) !== "projection"
            )
              return;
            let t = w.source.voxelModel,
              s = window.setTimeout(() => {
                (0, tD.AI)({
                  voxelModel: t,
                  replacements: w.replacements,
                  materialStats: w.materialStats,
                  undoStack: w.undoStack,
                  redoStack: w.redoStack,
                  savedHistoryDepth: w.savedHistoryDepth,
                  savedHistoryMarker: w.savedHistoryMarker,
                  isModified: w.isModified,
                  hasStructuralEdits: w.hasStructuralEdits,
                  hasUntrackedStructuralEdits: w.hasUntrackedStructuralEdits,
                  workId: null != eE ? eE : void 0,
                  buildingId: sessionStorage.getItem("studio_building_id") || void 0,
                  buildingName: sessionStorage.getItem("studio_building_name") || void 0,
                }) ||
                  !w.isModified ||
                  eQ.current ||
                  ((eQ.current = !0), si("临时草稿空间不足；离开前请先保存或导出", "error", 6e3));
              }, 220);
            return () => window.clearTimeout(s);
          }, [
            si,
            eE,
            w.hasStructuralEdits,
            w.hasUntrackedStructuralEdits,
            w.isModified,
            w.loading,
            w.materialStats,
            w.redoStack,
            w.replacements,
            w.savedHistoryDepth,
            w.savedHistoryMarker,
            w.source,
            w.undoStack,
          ]),
          (0, n.useEffect)(() => {
            if (((eZ.current = w.isModified), "leave" === tP(w.isModified))) return;
            let e = (e) => {
              (e.preventDefault(), (e.returnValue = ""));
            };
            return (
              window.addEventListener("beforeunload", e),
              () => window.removeEventListener("beforeunload", e)
            );
          }, [w.isModified]),
          (0, n.useEffect)(() => {
            var e;
            (!w.isModified &&
              eJ.current &&
              (null == (e = window.history.state) ? void 0 : e.studioDirtyGuard) &&
              ((eX.current = !0), (eJ.current = !1), window.history.back()),
              w.isModified &&
                !eJ.current &&
                (window.history.pushState(
                  { ...window.history.state, studioDirtyGuard: !0 },
                  "",
                  window.location.href,
                ),
                (eJ.current = !0)));
            let t = () => {
              if (eX.current) {
                eX.current = !1;
                return;
              }
              eZ.current &&
                (window.history.pushState(
                  { ...window.history.state, studioDirtyGuard: !0 },
                  "",
                  window.location.href,
                ),
                (eJ.current = !0),
                e$({ kind: "history" }));
            };
            return (
              window.addEventListener("popstate", t),
              () => window.removeEventListener("popstate", t)
            );
          }, [w.isModified]));
        let sY = (0, n.useCallback)(async () => {
          let { state: e, workName: t, savedWorkId: s } = eP.current;
          if (!e.source || "projection" !== e.source.type || eR.current || "ready" !== e.loading)
            return !1;
          let l = e4();
          if (l) return (e2(l), !1);
          ((eR.current = !0), ew(!0));
          let n = () =>
            eD.current &&
            g(eP.current.state, e) &&
            eP.current.workName === t &&
            eP.current.savedWorkId === s;
          try {
            var a, r, i;
            let l;
            if (
              e.hasStructuralEdits &&
              (!(await A({
                title: "将结构编辑另存为副本",
                tone: "warning",
                body: "结构编辑将按原格式保存为新的副本。".concat(
                  s ? "原云端作品会保留。" : "",
                  "保存前会检查原文件与编辑记录；无法完整保留附加数据时会停止保存，并说明原因。",
                ),
                confirmText: "另存副本",
                cancelText: "取消",
              })) ||
                !n())
            )
              return !1;
            let o = e.source.voxelModel,
              c = (0, tF.ew)(t, o.name),
              d = null;
            try {
              let e = document.querySelector("canvas");
              if (e) {
                let t = document.createElement("canvas");
                ((t.width = 400), (t.height = 300));
                let s = t.getContext("2d");
                s && (s.drawImage(e, 0, 0, 400, 300), (d = t.toDataURL("image/jpeg", 0.6)));
              }
            } catch (e) {}
            let u = o.format,
              m = JSON.stringify(e.replacements),
              x = null,
              p = null,
              h = null;
            if (e.hasStructuralEdits) {
              let t = await (0, tA.Py)({
                model: o,
                saveName: c,
                originalFileData: e.originalFileData,
                replacements: e.replacements,
                history: e.undoStack,
                hasUntrackedStructuralEdits: e.hasUntrackedStructuralEdits,
              });
              x = (function (e) {
                let t = new Uint8Array(e.byteLength);
                return (t.set(e), t.buffer);
              })(t.bytes);
              let s = (0, eA.CR)(x.byteLength);
              if (s) return (e2(s), !1);
              ((h = t5(t.bytes)),
                (u = t.format),
                ((p = await (0, tB.parseProjectionBuffer)(x, ".".concat(u))).name = c),
                (m = "[]"));
            } else e.originalFileData && (h = t3(e.originalFileData));
            let b = {
              name: c,
              sourceFormat: u,
              originalData: h,
              replacements: m,
              blockCount: o.totalBlockCount,
              blockTypes: o.blockTypeCount,
              thumbnailUrl: d,
              sourceBuildingId: sessionStorage.getItem("studio_building_id") || void 0,
            };
            if (
              ((l =
                s && !e.hasStructuralEdits
                  ? await fetch("/api/studio/works/".concat(s), {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(b),
                    })
                  : await fetch("/api/studio/works", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(b),
                    })),
              401 === l.status)
            )
              return (M({ action: "保存作品", onSuccess: () => eF.current() }), !1);
            let f = await l.json();
            if (f.success) {
              if (!n())
                return (eD.current && e2("先前版本已保存，当前仍有新编辑，请再次保存", 5e3), !1);
              let t = (0, tF.ew)(null == (a = f.data) ? void 0 : a.name, c),
                l = (null == (r = f.data) ? void 0 : r.id) || s,
                i = !0;
              if (x) {
                let s = { ...(null != p ? p : o), name: t, format: u };
                try {
                  if (
                    (sessionStorage.setItem("studio_voxel_model", JSON.stringify(s)),
                    h
                      ? sessionStorage.setItem("studio_original_file", h)
                      : sessionStorage.removeItem("studio_original_file"),
                    sessionStorage.setItem("studio_export_replacements", "[]"),
                    sessionStorage.setItem(
                      "studio_export_material_stats",
                      JSON.stringify(e.materialStats),
                    ),
                    sessionStorage.setItem("studio_export_has_structural_edits", "false"),
                    sessionStorage.setItem("studio_source_type", "projection"),
                    l && sessionStorage.setItem("studio_work_id", l),
                    !(0, tD.AI)({
                      voxelModel: s,
                      replacements: [],
                      materialStats: e.materialStats,
                      undoStack: [],
                      redoStack: [],
                      savedHistoryDepth: 0,
                      savedHistoryMarker: null,
                      isModified: !1,
                      hasStructuralEdits: !1,
                      hasUntrackedStructuralEdits: !1,
                      workId: null != l ? l : void 0,
                      buildingId: sessionStorage.getItem("studio_building_id") || void 0,
                      buildingName: sessionStorage.getItem("studio_building_name") || void 0,
                    }))
                  )
                    throw Error("无法写入新副本的临时草稿");
                } catch (e) {
                  i = !1;
                  try {
                    (0, tD.Gq)();
                  } catch (e) {}
                }
                (E({
                  type: "COMMIT_MODEL_AS_ORIGINAL",
                  snapshot: e,
                  payload: { originalFileData: x, format: u, name: t, voxelModel: s },
                }),
                  sS());
              } else {
                let s = { ...o, name: t };
                try {
                  (sessionStorage.setItem("studio_voxel_model", JSON.stringify(s)),
                    sessionStorage.setItem("studio_export_replacements", m),
                    sessionStorage.setItem(
                      "studio_export_material_stats",
                      JSON.stringify(e.materialStats),
                    ),
                    sessionStorage.setItem("studio_export_has_structural_edits", "false"),
                    sessionStorage.setItem("studio_source_type", "projection"),
                    l && sessionStorage.setItem("studio_work_id", l));
                } catch (e) {}
                E({ type: "MARK_SAVED", snapshot: e, name: t });
              }
              return (
                l && l !== s && ((eP.current.savedWorkId = l), e_(l)),
                eM(
                  i
                    ? {
                        type: "success",
                        message: e.hasStructuralEdits
                          ? s
                            ? "副本已保存，原作品已保留"
                            : "副本已保存，请保留原始文件"
                          : s
                            ? "作品已更新"
                            : "作品已保存",
                      }
                    : {
                        type: "error",
                        message:
                          "云端副本已保存，但浏览器无法保存临时草稿；刷新后请从作品列表重新打开。",
                      },
                ),
                setTimeout(() => eM(null), 2500),
                !0
              );
            }
            {
              console.error("保存失败:", f.error);
              let e =
                "string" == typeof f.error
                  ? f.error
                  : (null == (i = f.error) ? void 0 : i.message) || "保存失败，请重试";
              return (eM({ type: "error", message: e }), setTimeout(() => eM(null), 3e3), !1);
            }
          } catch (e) {
            return (
              console.error("保存失败:", e),
              eM({
                type: "error",
                message: e instanceof Error ? "保存失败：".concat(e.message) : "保存失败，请重试",
              }),
              setTimeout(() => eM(null), 3e3),
              !1
            );
          } finally {
            ((eR.current = !1), eD.current && ew(!1));
          }
        }, [w, eE, eL, E, M, e4, e2, A]);
        eF.current = sY;
        let sq = (0, n.useCallback)(
            (e) => {
              var t;
              if (
                ((0, tD.Gq)(),
                e$(null),
                (eV.current = null),
                (eZ.current = !1),
                "history" === e.kind)
              ) {
                ((eX.current = !0), (eJ.current = !1), window.history.go(-2));
                return;
              }
              let s = e.href || "/studio";
              if (
                eJ.current &&
                (null == (t = window.history.state) ? void 0 : t.studioDirtyGuard)
              ) {
                ((eX.current = !0),
                  (eJ.current = !1),
                  window.addEventListener("popstate", () => O.replace(s), { once: !0 }),
                  window.history.back());
                return;
              }
              O.replace(s);
            },
            [O],
          ),
          s$ = (0, n.useCallback)(() => {
            let e = { kind: "studio", href: "/studio" };
            if ("confirm" === tP(w.isModified)) return void e$(e);
            sq(e);
          }, [sq, w.isModified]),
          sV = (0, n.useCallback)(async () => {
            if (eq && w.source && "projection" === w.source.type) {
              if (I({ action: "保存作品后离开", onSuccess: () => eU.current() })) {
                if (!eE && !eL.trim()) {
                  var e;
                  (eO(null != (e = (0, tF.A1)(w.source.voxelModel.name)) ? e : ""),
                    (eV.current = eq),
                    e$(null),
                    eT(!0));
                  return;
                }
                (await sY()) && sq(eq);
              }
            }
          }, [sY, eq, sq, I, eE, w.source, eL]);
        eU.current = sV;
        let sJ = (0, n.useCallback)(async () => {
            if (!eL.trim()) return;
            eT(!1);
            let e = eV.current;
            ((eV.current = null), (await sY()) && e && sq(e));
          }, [sY, sq, eL]),
          sX = (0, n.useCallback)(() => {
            ((eV.current = null), eT(!1));
          }, []),
          sZ = (0, n.useCallback)(() => {
            if (!w.source || "projection" !== w.source.type || ek) return;
            let e = e4();
            if (e) return void e2(e);
            if (I({ action: "保存作品", onSuccess: () => eH.current() })) {
              if (!eE && !eL) {
                var t;
                (eO(null != (t = (0, tF.A1)(w.source.voxelModel.name)) ? t : ""),
                  tf(null),
                  tn({ type: "CLOSE_FLOATING" }),
                  eT(!0));
                return;
              }
              sY();
            }
          }, [w.source, ek, eE, eL, sY, I, e4, e2]);
        eH.current = sZ;
        let sQ = (0, n.useCallback)(
            (e) => {
              let t = new Map();
              (e.traverse((e) => {
                if (e instanceof r.eaF && e.material) {
                  let s = e.material.name || "unknown";
                  t.set(s, (t.get(s) || 0) + 1);
                }
              }),
                (0, tH.cy)().then(() => {
                  let e = (function (e) {
                      tH.SX.isInitialized() ||
                        console.warn("⚠️ BlockImageMapper 未初始化，材料转换可能不准确");
                      let t = [];
                      return (
                        e.forEach((e, s) => {
                          let l = s
                              .replace(/\.\d+$/, "")
                              .replace(/\s+/g, "_")
                              .toLowerCase(),
                            n = tH.SX.getImageFilename(l),
                            a = l
                              .split("_")
                              .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                              .join(" ");
                          t.push({
                            id: s,
                            name: a,
                            count: e,
                            imageUrl: n
                              ? "/uploads/buildings/blockID/images/".concat(n)
                              : "/uploads/buildings/blockID/images/Barrier.png",
                            materialType: "block",
                          });
                        }),
                        t.sort((e, t) => t.count - e.count)
                      );
                    })(t).map((e) => ({
                      blockId: e.id,
                      chineseName: e.name,
                      englishName: e.name,
                      textureUrl: e.imageUrl,
                      count: e.count,
                      percentage: 0,
                    })),
                    s = e.reduce((e, t) => e + t.count, 0);
                  for (let t of e) t.percentage = s > 0 ? (t.count / s) * 100 : 0;
                  E({ type: "SET_MATERIAL_STATS", payload: e });
                }));
            },
            [E],
          ),
          s0 = (null == (e = w.source) ? void 0 : e.type) === "projection",
          s1 = (0, n.useMemo)(() => {
            if (!w.source || "projection" !== w.source.type) return 0;
            let e = 1 / 0;
            for (let t of w.source.voxelModel.blocks) t.position[1] < e && (e = t.position[1]);
            return e;
          }, [w.source]),
          s2 = (0, n.useMemo)(
            () =>
              w.source && "projection" === w.source.type
                ? new Set(w.source.voxelModel.blocks.map((e) => e.position[1])).size
                : 0,
            [w.source],
          ),
          s5 = (0, n.useMemo)(() => {
            if (!w.source || "projection" !== w.source.type) return null;
            let e = 1 / 0,
              t = -1 / 0;
            for (let s of w.source.voxelModel.blocks)
              ((e = Math.min(e, s.position[1])), (t = Math.max(t, s.position[1])));
            return Number.isFinite(e) && Number.isFinite(t) ? { minY: e, maxY: t } : null;
          }, [w.source]),
          s3 = (0, n.useMemo)(() => {
            var e;
            return (
              !!w.source &&
              "projection" === w.source.type &&
              (null != (e = w.source.voxelModel.entities) ? e : []).some(
                (e) => "generic" === e.kind,
              )
            );
          }, [w.source]),
          s4 = (0, n.useMemo)(() => {
            if (w.selectedPositions.size > 0) {
              let e = [];
              for (let t of w.selectedPositions) {
                let [s, l, n] = t.split(",").map(Number);
                e.push([s, l, n]);
              }
              return e;
            }
            return w.selectedBlock ? [w.selectedBlock.position] : [];
          }, [w.selectedBlock, w.selectedPositions]),
          s6 = s4.length,
          s8 =
            (null == (i = w.selectedBlock) || null == (t = i.blockId)
              ? void 0
              : t.replace("minecraft:", "")) || "",
          s9 = (0, n.useMemo)(() => {
            var e;
            return w.selectedBlock &&
              null !=
                (e = w.materialStats.find(
                  (e) =>
                    e.blockId === w.selectedBlock.blockId ||
                    e.blockId.replace("minecraft:", "") === s8,
                ))
              ? e
              : null;
          }, [s8, w.materialStats, w.selectedBlock]),
          s7 = (0, n.useMemo)(() => {
            var e;
            if (ei && (null == (e = w.source) ? void 0 : e.type) === "projection")
              return w.source.voxelModel.blocks.filter(
                (e) =>
                  sh(e) &&
                  e.position[0] >= ei.min[0] &&
                  e.position[0] <= ei.max[0] &&
                  e.position[1] >= ei.min[1] &&
                  e.position[1] <= ei.max[1] &&
                  e.position[2] >= ei.min[2] &&
                  e.position[2] <= ei.max[2],
              ).length;
          }, [sh, ei, w.source]),
          le = (0, n.useMemo)(
            () =>
              ei
                ? [ei.max[0] - ei.min[0] + 1, ei.max[1] - ei.min[1] + 1, ei.max[2] - ei.min[2] + 1]
                : null,
            [ei],
          ),
          lt = (0, n.useMemo)(() => {
            if (Z.length < 2) return null;
            let [e, t] = Z;
            return {
              span: [
                Math.abs(t[0] - e[0]) + 1,
                Math.abs(t[1] - e[1]) + 1,
                Math.abs(t[2] - e[2]) + 1,
              ],
              gap: [
                Math.max(0, Math.abs(t[0] - e[0]) - 1),
                Math.max(0, Math.abs(t[1] - e[1]) - 1),
                Math.max(0, Math.abs(t[2] - e[2]) - 1),
              ],
            };
          }, [Z]),
          ls = (0, n.useCallback)(() => {
            (E({ type: "CLEAR_SELECTION" }),
              E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }),
              sp(null),
              tE(null),
              tf(null));
          }, [E]),
          ll = (0, n.useCallback)(() => {
            w.selectedBlock && 0 !== s4.length && sK(w.selectedBlock.blockId, s4);
          }, [sK, s4, w.selectedBlock]),
          ln = (0, n.useCallback)(() => {
            0 !== s4.length && sz(s4);
          }, [sz, s4]),
          la = (0, n.useCallback)(() => {
            0 !== s4.length &&
              (E({ type: "HIDE_SELECTED" }), "region" === tj && sv(), sp(null), tf(null));
          }, [tj, E, sv, s4.length]),
          lr = (0, n.useCallback)(() => {
            0 !== s4.length && (E({ type: "SHOW_ONLY_SELECTED" }), tf(null));
          }, [E, s4.length]),
          li = (0, n.useCallback)(() => {
            var e;
            if (!w.selectedBlock || (null == (e = w.source) ? void 0 : e.type) !== "projection")
              return;
            let t = w.selectedBlock,
              s = w.source.voxelModel.blocks
                .filter((e) => e.blockId === t.blockId)
                .filter(sh)
                .map((e) =>
                  "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                );
            (E({ type: "SET_SELECTED_BLOCK", payload: t }),
              E({ type: "SET_SELECTED_POSITIONS", payload: new Set(s) }),
              E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }));
          }, [E, sh, w.selectedBlock, w.source]),
          lo = (0, n.useCallback)(() => {
            var e;
            if (!w.selectedBlock || (null == (e = w.source) ? void 0 : e.type) !== "projection")
              return;
            let t = w.selectedBlock,
              s = t.position[1],
              l = w.source.voxelModel.blocks
                .filter((e) => e.position[1] === s)
                .filter(sh)
                .map((e) =>
                  "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                );
            (E({ type: "SET_SELECTED_BLOCK", payload: t }),
              E({ type: "SET_SELECTED_POSITIONS", payload: new Set(l) }),
              E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }),
              sp(s));
          }, [E, sh, w.selectedBlock, w.source]),
          lc = (0, n.useCallback)(() => {
            var e;
            if (!w.selectedBlock || (null == (e = w.source) ? void 0 : e.type) !== "projection")
              return;
            let t = w.source.voxelModel,
              s = w.selectedBlock,
              l = new Set(
                t.blocks
                  .filter(sh)
                  .map((e) =>
                    "".concat(e.position[0], ",").concat(e.position[1], ",").concat(e.position[2]),
                  ),
              ),
              n = new Set(
                Array.from(
                  (function (e, t) {
                    let s = new Set();
                    for (let t of e.blocks)
                      s.add(
                        ""
                          .concat(t.position[0], ",")
                          .concat(t.position[1], ",")
                          .concat(t.position[2]),
                      );
                    let l = new Set(),
                      n = [],
                      a = "".concat(t[0], ",").concat(t[1], ",").concat(t[2]);
                    if (!s.has(a)) return l;
                    (n.push(a), l.add(a));
                    let r = [
                      [1, 0, 0],
                      [-1, 0, 0],
                      [0, 1, 0],
                      [0, -1, 0],
                      [0, 0, 1],
                      [0, 0, -1],
                    ];
                    for (; n.length > 0;) {
                      let [e, t, a] = n.shift().split(",").map(Number);
                      for (let [i, o, c] of r) {
                        let r = ""
                          .concat(e + i, ",")
                          .concat(t + o, ",")
                          .concat(a + c);
                        s.has(r) && !l.has(r) && (l.add(r), n.push(r));
                      }
                    }
                    return l;
                  })(t, s.position),
                ).filter((e) => l.has(e)),
              );
            (E({ type: "SET_SELECTED_BLOCK", payload: s }),
              E({ type: "SET_SELECTED_POSITIONS", payload: n }),
              E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null }));
          }, [E, sh, w.selectedBlock, w.source]),
          ld = w.hiddenPositions.size + w.hiddenLayers.size,
          lu = (0, n.useMemo)(() => {
            var e, t;
            if ((null == (e = w.source) ? void 0 : e.type) !== "projection" || 0 === s4.length)
              return [];
            let s = new Set(s4.map((e) => "".concat(e[0], ",").concat(e[1], ",").concat(e[2]))),
              l = new Map();
            for (let e of w.source.voxelModel.blocks) {
              let n = ""
                .concat(e.position[0], ",")
                .concat(e.position[1], ",")
                .concat(e.position[2]);
              s.has(n) && l.set(e.blockId, (null != (t = l.get(e.blockId)) ? t : 0) + 1);
            }
            return Array.from(l.entries())
              .map((e) => {
                let [t, s] = e,
                  l = t.replace("minecraft:", ""),
                  n = w.materialStats.find(
                    (e) => e.blockId === t || e.blockId.replace("minecraft:", "") === l,
                  );
                return {
                  blockId: t,
                  count: s,
                  chineseName: (null == n ? void 0 : n.chineseName) || l,
                  textureUrl: (null == n ? void 0 : n.textureUrl) || "",
                };
              })
              .sort((e, t) => t.count - e.count);
          }, [s4, w.materialStats, w.source]),
          lm = (0, n.useCallback)(() => {
            (E({ type: "UNHIDE_ALL" }),
              E({ type: "SET_LAYER_CUTOFF", payload: null }),
              sp(null),
              si("已恢复全部显示", "success", 2200));
          }, [E, si]),
          lx = (0, n.useCallback)(
            (e) => {
              (E({ type: "SHOW_ONLY_MATERIAL", payload: e.blockId }),
                E({ type: "SET_LAYER_CUTOFF", payload: null }),
                sp(null),
                si("只显示 ".concat(e.chineseName, "，其余方块已临时隐藏"), "info", 2600));
            },
            [E, si],
          ),
          lp = (0, n.useCallback)(
            (e) => {
              sK(e.blockId, void 0, "matching");
            },
            [sK],
          ),
          lh = tv ? (0, tT.fl)(tv) : "",
          lb = tv
            ? "".concat(tT.Xn[tv.kind] || "实体", " \xb7 ").concat((0, tT.IO)(tv.position))
            : "",
          lf = (0, n.useCallback)(() => {
            if (!w.selectedBlock) return;
            let e = ""
              .concat(w.selectedBlock.blockId, " @ (")
              .concat(w.selectedBlock.position[0], ", ")
              .concat(w.selectedBlock.position[1], ", ")
              .concat(w.selectedBlock.position[2], ")");
            navigator.clipboard.writeText(e).then(
              () => si("方块信息已复制", "success", 2200),
              () => si("复制失败，请手动记录方块信息", "error", 2600),
            );
          }, [si, w.selectedBlock]),
          lg = (0, n.useCallback)(() => {
            var e;
            let t = null == (e = w.selectedBlock) ? void 0 : e.position[1];
            null != t &&
              (E({ type: "SET_LAYER_MODE", payload: "gallery" }),
              E({ type: "SET_LAYER_CUTOFF", payload: t }),
              sp(t),
              si("已切换为只看 Y=".concat(t, " 层"), "info"));
          }, [E, si, w.selectedBlock]),
          lj = (0, n.useCallback)(() => {
            var e;
            let t = null == (e = w.selectedBlock) ? void 0 : e.position[1];
            null != t &&
              (E({ type: "SET_LAYER_MODE", payload: "slice" }),
              E({ type: "SET_LAYER_CUTOFF", payload: t }),
              sp(t),
              si("已显示到 Y=".concat(t, " 层"), "info"));
          }, [E, si, w.selectedBlock]),
          ly = (0, n.useCallback)(() => {
            (et([]),
              eo(null),
              ex(!1),
              E({ type: "CLEAR_SELECTION" }),
              E({ type: "SET_SELECTED_POSITIONS", payload: new Set() }),
              si("框选已重置", "info", 2200));
          }, [E, si]),
          lv = (0, n.useCallback)(() => {
            (Q([]), si("测量点已清空", "info", 2200));
          }, [si]),
          lk = (0, n.useCallback)(() => {
            tn({ type: "CLOSE_SHEET" });
          }, []),
          lN = (0, n.useCallback)(
            (e) => {
              var t, s;
              return (0, l.jsx)(ts, {
                variant: e,
                currentTool: tj,
                selectedBlock: w.selectedBlock,
                selectedBlockStat: s9,
                selectedBlockBareId: s8,
                selectedActionCount: s6,
                selectedEntity: tv,
                entityTitle: lh,
                entitySubTitle: lb,
                selectionPoints: ee,
                selectionSize: le,
                regionBlocksInSelection: s7,
                measurePoints: Z,
                measureMetrics: lt,
                explodeSpacing: tM,
                hiddenScopeCount: ld,
                layerCutoff: w.layerCutoff,
                selectionMaterials: lu,
                layerMinY: null != (t = null == s5 ? void 0 : s5.minY) ? t : null,
                layerMaxY: null != (s = null == s5 ? void 0 : s5.maxY) ? s : null,
                layerMode: w.layerMode,
                onCloseMobile: lk,
                onClearSelection: ls,
                onClearEntity: () => tE(null),
                onReplaceSelection: ll,
                onDeleteSelection: ln,
                onSelectSameMaterial: li,
                onSelectSameLayer: lo,
                onSelectConnected: lc,
                onCopySelected: lf,
                onHideSelection: la,
                onShowOnlySelection: lr,
                onOnlyCurrentLayer: lg,
                onShowToCurrentLayer: lj,
                onRestoreAllVisible: lm,
                onResetRegion: ly,
                onResetMeasure: lv,
                onExitTool: () => ty("select"),
                onGeometryOp: sG,
                onExplodeChange: tO,
              });
            },
            [
              ls,
              lk,
              lf,
              tj,
              ln,
              tM,
              sG,
              ld,
              la,
              lt,
              Z,
              s5,
              lg,
              s7,
              ll,
              lv,
              ly,
              lm,
              lc,
              lu,
              lo,
              li,
              s6,
              s8,
              s9,
              tv,
              lb,
              lh,
              ee,
              le,
              lr,
              lj,
              w.layerCutoff,
              w.layerMode,
              w.selectedBlock,
            ],
          ),
          lS = (0, n.useMemo)(() => {
            if (P) {
              var e;
              let t = null != (e = null == Y ? void 0 : Y.length) ? e : 0;
              return t > 1
                ? "正在选择替换目标：将替换选中的 ".concat(t, " 块")
                : H
                  ? "正在选择替换目标：".concat(H.replace("minecraft:", ""))
                  : "正在选择替换目标";
            }
            return "fps" === se
              ? "行走预览 \xb7 只读"
              : "explode" === tj && tM > 0
                ? "爆炸图已展开 \xb7 只读"
                : void 0;
          }, [se, tj, tM, H, null == Y ? void 0 : Y.length, P]),
          lw = (0, n.useMemo)(() => {
            var e;
            if (!H) return;
            let t = H.replace("minecraft:", ""),
              s = null != (e = null == Y ? void 0 : Y.length) ? e : 0;
            return "positions" === J && s > 1
              ? "正在替换选区内的 ".concat(s, " 块")
              : s > 1
                ? "正在替换选中的 ".concat(s, " 块 ").concat(t)
                : "正在替换 ".concat(t);
          }, [H, J, null == Y ? void 0 : Y.length]),
          lE =
            "positions" === J
              ? "选择一个目标方块后，选区内不同材质会一起换成它。"
              : "选择一个目标方块后，会替换当前来源方块；取消不会改动模型。";
        return (0, l.jsxs)("div", {
          ref: R,
          className: "ed-shell ed",
          children: [
            (0, l.jsx)(W, {
              title: w.source
                ? "projection" === w.source.type
                  ? (0, tF.ew)(w.source.voxelModel.name)
                  : w.source.buildingName
                : w.error
                  ? "会话已失效"
                  : "加载中...",
              onBack: s$,
              subtitle: (() => {
                if (!w.source) return "";
                if ("projection" === w.source.type) {
                  let e = w.source.voxelModel;
                  return ""
                    .concat(e.size[0], "\xd7")
                    .concat(e.size[1], "\xd7")
                    .concat(e.size[2], " | ")
                    .concat(e.blockTypeCount, " 种方块 | ")
                    .concat(e.totalBlockCount.toLocaleString(), " 个");
                }
                return "建筑库导入";
              })(),
              onUndo: () => E({ type: "UNDO" }),
              onRedo: () => E({ type: "REDO" }),
              onSave: sZ,
              canSave: s0 && (!eE || w.isModified),
              onExport: e9,
              onOpenGuide: () => {
                (tf(null), tn({ type: "CLOSE_FLOATING" }), t8(!0));
              },
            }),
            (0, l.jsxs)("div", {
              className: "ed-body",
              children: [
                s0 &&
                  "orbit" === se &&
                  "ready" === w.loading &&
                  (0, l.jsx)("aside", { className: "ed-select", children: lN("desktop") }),
                (0, l.jsxs)("div", {
                  "data-onboarding": "studio-canvas",
                  className: "ed-canvas".concat(tl.sheet ? " sheet-open" : ""),
                  onMouseDown: (e) => {
                    2 === e.button && (sg.current = { x: e.clientX, y: e.clientY });
                  },
                  onContextMenu: (e) => {
                    if ((e.preventDefault(), sg.current)) {
                      let t = e.clientX - sg.current.x,
                        s = e.clientY - sg.current.y,
                        l = Math.sqrt(t * t + s * s);
                      if (((sg.current = null), l > 5)) {
                        sj.current = null;
                        return;
                      }
                    }
                    if (sf) {
                      sj.current = null;
                      return;
                    }
                    let t = sj.current;
                    sj.current = null;
                    let s = null;
                    if (t) {
                      let l = e.clientX - t.x,
                        n = e.clientY - t.y;
                      5 >= Math.sqrt(l * l + n * n) && (s = t.target);
                    }
                    if (s) {
                      let e = ""
                        .concat(s.position[0], ",")
                        .concat(s.position[1], ",")
                        .concat(s.position[2]);
                      (w.selectedPositions.has(e) ||
                        (E({ type: "SET_SELECTED_POSITIONS", payload: new Set() }), sp(null)),
                        E({ type: "SET_SELECTED_BLOCK", payload: s }),
                        tE(null));
                    }
                    (tf(null),
                      si(
                        s
                          ? "已选中右键命中的方块；替换、删除和显示控制请使用左侧选区面板。"
                          : "右键主菜单已移除；右键拖动仍用于平移视角。",
                        "info",
                      ),
                      so("select", "右键主菜单已移除，主要操作统一移动到选区面板。"));
                  },
                  children: [
                    ("parsing" === w.loading || "rendering" === w.loading) &&
                      (0, l.jsx)("div", {
                        className:
                          "absolute inset-0 bg-bg-primary z-[50] flex items-center justify-center pointer-events-auto",
                        children: (0, l.jsxs)("div", {
                          className: "text-center",
                          children: [
                            (0, l.jsx)(eN.y, { size: "md", className: "mb-3" }),
                            (0, l.jsx)("p", {
                              className: "text-text-muted font-bold text-sm",
                              children:
                                "parsing" === w.loading ? "正在解析投影文件..." : "正在加载模型...",
                            }),
                            (0, l.jsx)("p", {
                              className: "text-text-muted/60 text-xs mt-1",
                              children:
                                "parsing" === w.loading
                                  ? "正在解析方块数据，请稍候"
                                  : "方块较多时稍候数秒",
                            }),
                          ],
                        }),
                      }),
                    w.error &&
                      (0, l.jsx)("div", {
                        className:
                          "absolute inset-0 bg-bg-canvas z-10 flex items-center justify-center",
                        children: (0, l.jsxs)("div", {
                          className:
                            "text-center p-8 max-w-md bg-bg-card border-2 border-border-hard shadow-block",
                          children: [
                            (0, l.jsx)(tr.A, { size: 30, className: "text-error mb-3 block" }),
                            (0, l.jsx)("p", {
                              className: "text-sm font-bold text-white mb-2",
                              children: "出错了",
                            }),
                            (0, l.jsx)("p", {
                              className: "text-xs text-text-muted leading-relaxed",
                              children: w.error,
                            }),
                            !w.source &&
                              (0, l.jsx)(G.$, {
                                size: "sm",
                                variant: "primary",
                                onClick: s$,
                                className: "mt-4",
                                children: "返回 Studio 重新导入",
                              }),
                          ],
                        }),
                      }),
                    ek &&
                      (0, l.jsxs)("div", {
                        className:
                          "absolute top-3 right-3 z-10 flex items-center gap-2 px-4 py-2 bg-bg-card border-2 border-border-hard shadow-block",
                        children: [
                          (0, l.jsx)(eN.y, { size: "xs", className: "text-brand-primary" }),
                          (0, l.jsx)("span", {
                            className: "text-sm font-bold text-text-muted",
                            children: "保存中...",
                          }),
                        ],
                      }),
                    (0, l.jsx)(tu, { usage: tl.usage, onClose: () => tn({ type: "CLOSE_USAGE" }) }),
                    (0, l.jsx)(tc, {
                      toasts: tl.toasts,
                      onDismiss: (e) => tn({ type: "DISMISS_TOAST", id: e }),
                    }),
                    s0 && (0, l.jsx)(eK, { guideOpen: t6, onGuideClose: () => t8(!1) }),
                    (0, l.jsx)(o.Hl, {
                      ...(0, u.$i)(C),
                      gl: { ...(0, u.$i)(C).gl, preserveDrawingBuffer: !0 },
                      style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      },
                      onPointerMissed: (e) => {
                        if ("fps" !== se)
                          2 !== e.button &&
                            2 !== e.buttons &&
                            !sg.current &&
                            (tx ||
                              em ||
                              "region" === tj ||
                              (tf(null),
                              ed(null),
                              sp(null),
                              tE(null),
                              E({ type: "CLEAR_SELECTION" }),
                              E({ type: "SET_HIGHLIGHTED_BLOCK", payload: null })));
                      },
                      onCreated: (e) => {
                        let { gl: t, scene: s } = e;
                        (0, u.yh)(t, s, C);
                      },
                      children: (0, l.jsxs)(x.cr.Provider, {
                        value: C,
                        children: [
                          (0, l.jsx)(u.Kg, {}),
                          (0, l.jsx)(c.u, {
                            makeDefault: !0,
                            position: [25, 25, 25],
                            fov: C.camera.fov,
                            near: 0.5,
                            far: 5e3,
                          }),
                          (0, l.jsx)(t4, { targetFov: "fps" === se ? 90 : C.camera.fov }),
                          (0, l.jsx)(u.AA, {}),
                          (0, l.jsx)(u.sK, {}),
                          (0, l.jsxs)(n.Suspense, {
                            fallback: null,
                            children: [
                              (null == (p = w.source) ? void 0 : p.type) === "projection" &&
                                (0, l.jsx)(L.default, {
                                  model: w.source.voxelModel,
                                  highlightedBlockId: sf ? null : w.highlightedBlockId,
                                  selectedBlockPosition: sf
                                    ? null
                                    : null !=
                                        (N = null == (h = w.selectedBlock) ? void 0 : h.position)
                                      ? N
                                      : null,
                                  selectedPositions: sf ? void 0 : w.selectedPositions,
                                  hiddenLayers: w.hiddenLayers,
                                  hiddenPositions: w.hiddenPositions,
                                  layerCutoff: w.layerCutoff,
                                  layerMode: w.layerMode,
                                  hoverColor: 0xfbbf24,
                                  onBlockClick:
                                    sf || ("region" === tj && ee.length >= 2) ? void 0 : sA,
                                  onBlockPointerDown: sf ? void 0 : sy,
                                  onBlockHover: "orbit" === se && sF && !sf ? sP : void 0,
                                  onEntityClick:
                                    "orbit" !== se || "select" !== tj || sf ? void 0 : sB,
                                  onResourceError: sm,
                                  interactionResetKey: t_,
                                  explodeSpacing: tM,
                                  explodeMinY: s1,
                                  emissiveConfig: C.emissive,
                                  showGenericEntities: t9,
                                }),
                              (null == (j = w.source) ? void 0 : j.type) === "building" &&
                                (0, l.jsx)(tz, {
                                  objUrl: w.source.modelUrl,
                                  mtlUrl: w.source.mtlUrl || void 0,
                                  onLoad: sQ,
                                }),
                            ],
                          }),
                          "orbit" === se &&
                            "region" === tj &&
                            ee.length > 0 &&
                            (0, l.jsxs)(l.Fragment, {
                              children: [
                                (0, l.jsx)(tg, {
                                  pos1: ee[0],
                                  pos2: ee.length >= 2 ? ee[1] : ec,
                                  confirmed: ee.length >= 2,
                                }),
                                ee.length >= 2 &&
                                  (0, l.jsx)(tk, {
                                    points: [ee[0], ee[1]],
                                    onAdjust: sO,
                                    onDragStart: () => ex(!0),
                                    onDragEnd: () => ex(!1),
                                  }),
                              ],
                            }),
                          "orbit" === se &&
                            "measure" === tj &&
                            Z.length > 0 &&
                            (0, l.jsx)(tN.A, {
                              pointA: Z[0],
                              pointB: Z.length >= 2 ? Z[1] : ec,
                              confirmed: Z.length >= 2,
                            }),
                          (0, l.jsx)(d.N, {
                            ref: eg,
                            makeDefault: "orbit" === se,
                            enabled: "orbit" === se && !em,
                            enableDamping: !0,
                            dampingFactor: 0.05,
                            minDistance: 3,
                            maxDistance: 500,
                            enablePan: !0,
                            mouseButtons: {
                              LEFT: r.kBv.ROTATE,
                              MIDDLE: r.kBv.ROTATE,
                              RIGHT: r.kBv.PAN,
                            },
                            target: sn.current
                              ? [sn.current.x, sn.current.y, sn.current.z]
                              : (null == (y = w.source) ? void 0 : y.type) === "projection"
                                ? [
                                    w.source.voxelModel.size[0] / 2,
                                    w.source.voxelModel.size[1] / 2,
                                    w.source.voxelModel.size[2] / 2,
                                  ]
                                : [0, 5, 0],
                          }),
                          (0, l.jsx)(tW.W, {
                            ref: ej,
                            enabled: "fps" === se,
                            moveSpeed: 8,
                            onLock: () => sl(!0),
                            onUnlock: () => {
                              sl(!1);
                            },
                            speedRef: ev,
                          }),
                          (0, l.jsx)(tU, { quatRef: ef }),
                          (0, l.jsx)(m.I, {}),
                        ],
                      }),
                    }),
                    (0, l.jsx)(tK, { quatRef: ef, onAxisClick: sD }),
                    (0, l.jsxs)("div", {
                      className: "ed-float ed-view",
                      style: { pointerEvents: "auto" },
                      children: [
                        (0, l.jsxs)(G.$, {
                          size: "sm",
                          variant: "secondary",
                          onClick: sw,
                          className: "ed-vbtn",
                          title: "orbit" === se ? "进入只读行走预览 (V)" : "返回编辑视角 (V)",
                          children: [
                            "orbit" === se
                              ? (0, l.jsx)(tY.A, { size: 15, className: "text-brand-primary" })
                              : (0, l.jsx)(eB.A, { size: 15, className: "text-brand-primary" }),
                            (0, l.jsx)("span", {
                              className: "lbl-walk",
                              children: "orbit" === se ? "行走预览" : "编辑视角",
                            }),
                            (0, l.jsx)("span", { className: "key", children: "V" }),
                          ],
                        }),
                        s0 &&
                          "orbit" === se &&
                          s3 &&
                          (0, l.jsxs)(G.$, {
                            size: "sm",
                            variant: "secondary",
                            onClick: () => t7((e) => !e),
                            className: "ed-vbtn",
                            title: t9
                              ? "隐藏生物实体（村民/动物/怪物）"
                              : "显示生物实体（村民/动物/怪物）",
                            children: [
                              t9
                                ? (0, l.jsx)(eb.A, { size: 15, className: "text-brand-primary" })
                                : (0, l.jsx)(e5.A, { size: 15, className: "text-text-muted" }),
                              (0, l.jsx)("span", {
                                className: "lbl-walk",
                                children: t9 ? "隐藏生物" : "显示生物",
                              }),
                            ],
                          }),
                        (0, l.jsxs)("div", {
                          className: "ed-vrow",
                          children: [
                            (0, l.jsx)(K.K, {
                              label: "重置视角",
                              size: "sm",
                              variant: "secondary",
                              onClick: sT,
                              className: "ed-vbtn ed-vico",
                              children: (0, l.jsxs)("svg", {
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.2",
                                children: [
                                  (0, l.jsx)("path", {
                                    d: "M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8",
                                  }),
                                  (0, l.jsx)("path", { d: "M3 3v5h5" }),
                                ],
                              }),
                            }),
                            (0, l.jsx)(K.K, {
                              label: "全屏",
                              size: "sm",
                              variant: "secondary",
                              onClick: () => {
                                (0, tb.gU)(document.documentElement);
                              },
                              className: "ed-vbtn ed-vico",
                              title: "全屏 (F11)",
                              children: (0, l.jsx)("svg", {
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.2",
                                children: (0, l.jsx)("path", {
                                  d: "M8 3H3v5M21 8V3h-5M16 21h5v-5M3 16v5h5",
                                }),
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    "fps" === se &&
                      (0, l.jsxs)(l.Fragment, {
                        children: [
                          ss &&
                            (0, l.jsx)("div", {
                              className:
                                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none",
                              children: (0, l.jsxs)("div", {
                                className: "relative w-6 h-6",
                                children: [
                                  (0, l.jsx)("div", {
                                    className:
                                      "absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/70",
                                  }),
                                  (0, l.jsx)("div", {
                                    className:
                                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/70",
                                  }),
                                  (0, l.jsx)("div", {
                                    className:
                                      "absolute left-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-white/70",
                                  }),
                                  (0, l.jsx)("div", {
                                    className:
                                      "absolute right-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-white/70",
                                  }),
                                  (0, l.jsx)("div", {
                                    className:
                                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/50",
                                  }),
                                ],
                              }),
                            }),
                          !ss &&
                            (0, l.jsxs)("div", {
                              className:
                                "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-black/80 border-2 border-border-hard shadow-block px-4 py-3 text-center",
                              children: [
                                (0, l.jsx)("div", {
                                  className: "text-sm font-black text-text-primary",
                                  children: "只读行走预览",
                                }),
                                (0, l.jsx)("div", {
                                  className: "mt-1 text-[11px] font-bold text-text-muted",
                                  children: "点击画面锁定鼠标 \xb7 右上按钮返回编辑",
                                }),
                                (0, l.jsx)("div", {
                                  className: "mt-1 text-[10px] font-bold text-warning",
                                  children: "不能选择、替换或删除方块",
                                }),
                              ],
                            }),
                          ss &&
                            (0, l.jsx)("div", {
                              className:
                                "absolute z-20 pointer-events-none flex flex-col items-end gap-1",
                              style: { bottom: 68, right: 12 },
                              children: (0, l.jsxs)("div", {
                                className:
                                  "bg-bg-card/90 border-2 border-border-hard shadow-block-xs px-2.5 py-1 text-[10px] font-bold text-text-muted flex items-center gap-1.5",
                                children: [
                                  (0, l.jsx)(tq.A, {
                                    size: 16,
                                    className: "text-brand-primary text-[9px]",
                                  }),
                                  " 速度 ",
                                  (0, l.jsx)("span", {
                                    className: "text-text-primary font-pixel",
                                    children: ev.current.toFixed(1),
                                  }),
                                  (0, l.jsx)("span", {
                                    className: "text-text-muted ml-1",
                                    children: "滚轮调速",
                                  }),
                                ],
                              }),
                            }),
                        ],
                      }),
                    !to &&
                      (0, l.jsx)(K.K, {
                        label: "展开材质面板",
                        size: "sm",
                        variant: "secondary",
                        onClick: () => td(!0),
                        className: "ed-mat-reopen",
                        title: "展开材质面板",
                        children: (0, l.jsx)(B.A, { size: 12 }),
                      }),
                    s0 &&
                      "orbit" === se &&
                      s5 &&
                      (0, l.jsx)(tm, {
                        minY: s5.minY,
                        maxY: s5.maxY,
                        value: w.layerCutoff,
                        mode: w.layerMode,
                        rightPanelOpen: to,
                        sheetOpen: !!tl.sheet,
                        onChange: (e) => {
                          (E({ type: "SET_LAYER_CUTOFF", payload: e }),
                            null == e ? (sp(null), si("已显示全部层", "info", 2200)) : sp(e));
                        },
                        onModeChange: (e) => {
                          (E({ type: "SET_LAYER_MODE", payload: e }),
                            si(
                              "gallery" === e
                                ? "已切换为只看当前层模式"
                                : "已切换为显示到当前层模式",
                              "info",
                              2200,
                            ));
                        },
                      }),
                    s0 &&
                      "orbit" === se &&
                      (0, l.jsxs)("div", {
                        className: "ed-canvas-chrome".concat(tl.sheet ? " sheet-open" : ""),
                        children: [
                          (0, l.jsx)(eu, {
                            cameraMode: se,
                            current: tj,
                            onChange: (e) => {
                              if ("explode" === e && s2 <= 1) {
                                (tX("单层建筑无需爆炸图"), setTimeout(() => tX(null), 2e3));
                                return;
                              }
                              sb(e);
                            },
                            onComingSoon: sL,
                          }),
                          (0, l.jsxs)("div", {
                            className: "ed-mtriggers",
                            children: [
                              (0, l.jsxs)(G.$, {
                                size: "sm",
                                variant: ti ? "primary" : "secondary",
                                className: "ed-mtrigger"
                                  .concat(ti ? " on" : "")
                                  .concat(s6 > 0 ? "" : " mut"),
                                onClick: () => tn({ type: "TOGGLE_SHEET", sheet: "selection" }),
                                children: [
                                  (0, l.jsx)("em", { className: "mt-badge", children: s6 }),
                                  (0, l.jsx)(en.A, { size: 15 }),
                                  (0, l.jsx)("span", { className: "lbl", children: "选区" }),
                                ],
                              }),
                              (0, l.jsxs)(G.$, {
                                size: "sm",
                                variant: ta ? "primary" : "secondary",
                                className: "ed-mtrigger"
                                  .concat(ta ? " on" : "")
                                  .concat(w.materialStats.length ? "" : " mut"),
                                onClick: () => tn({ type: "TOGGLE_SHEET", sheet: "materials" }),
                                children: [
                                  (0, l.jsx)("em", {
                                    className: "mt-badge",
                                    children: w.materialStats.length || "—",
                                  }),
                                  (0, l.jsx)(eh.A, { size: 15 }),
                                  (0, l.jsx)("span", { className: "lbl", children: "材质" }),
                                ],
                              }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className: "ed-vrail",
                            children: [
                              (0, l.jsxs)(K.K, {
                                label: "重置视角",
                                size: "sm",
                                variant: "secondary",
                                className: "ed-vrbtn",
                                onClick: sT,
                                children: [
                                  (0, l.jsx)(eB.A, { size: 15 }),
                                  (0, l.jsx)("span", { className: "lbl", children: "重置" }),
                                ],
                              }),
                              s3 &&
                                (0, l.jsxs)(K.K, {
                                  label: t9 ? "隐藏生物实体" : "显示生物实体",
                                  size: "sm",
                                  variant: "secondary",
                                  className: "ed-vrbtn".concat(t9 ? " on" : ""),
                                  onClick: () => t7((e) => !e),
                                  children: [
                                    t9
                                      ? (0, l.jsx)(eb.A, { size: 15 })
                                      : (0, l.jsx)(e5.A, { size: 15 }),
                                    (0, l.jsx)("span", { className: "lbl", children: "生物" }),
                                  ],
                                }),
                            ],
                          }),
                        ],
                      }),
                    s0 && (0, l.jsx)(tp, {}),
                    (0, l.jsx)("div", {
                      className: "hidden lg:block",
                      children: (0, l.jsx)(eY, { cameraMode: se }),
                    }),
                    "orbit" === se &&
                      "select" === tj &&
                      "ready" === w.loading &&
                      (0, l.jsxs)("div", {
                        className: "ph-note",
                        style: { pointerEvents: "none" },
                        children: [
                          (0, l.jsx)("span", { className: "nb" }),
                          "左键选择/旋转 \xb7 右键平移 \xb7 滚轮缩放 \xb7 左侧面板执行编辑",
                        ],
                      }),
                    "orbit" === se &&
                      !sf &&
                      w.selectedBlock &&
                      "region" !== tj &&
                      (() => {
                        var e;
                        let t =
                            (null == (e = w.selectedBlock.blockId)
                              ? void 0
                              : e.replace("minecraft:", "")) || "",
                          s = w.materialStats.find(
                            (e) =>
                              e.blockId === w.selectedBlock.blockId ||
                              e.blockId.replace("minecraft:", "") === t,
                          ),
                          n =
                            w.selectedPositions.size > 1
                              ? Array.from(w.selectedPositions).map((e) => {
                                  let [t, s, l] = e.split(",").map(Number);
                                  return [t, s, l];
                                })
                              : [w.selectedBlock.position],
                          a = n.length > 1 ? "".concat(n.length, " 块") : "此方块",
                          r = () => sK(w.selectedBlock.blockId, n),
                          i = () => sz(n);
                        return (0, l.jsxs)(l.Fragment, {
                          children: [
                            (0, l.jsxs)("div", {
                              className: "hidden",
                              children: [
                                (0, l.jsxs)("div", {
                                  className: "flex items-center gap-2.5 p-2.5",
                                  children: [
                                    (0, l.jsx)("div", {
                                      className:
                                        "w-[46px] h-[46px] bg-[#7a8190] border-2 border-border-hard overflow-hidden shrink-0",
                                      children: (null == s ? void 0 : s.textureUrl)
                                        ? (0, l.jsx)("img", {
                                            src: s.textureUrl,
                                            alt: "",
                                            className: "w-full h-full object-contain",
                                            style: { imageRendering: "pixelated" },
                                          })
                                        : (0, l.jsx)("div", {
                                            className:
                                              "w-full h-full flex items-center justify-center text-brand-cta text-lg",
                                            children: (0, l.jsx)(q.A, { size: 16 }),
                                          }),
                                    }),
                                    (0, l.jsxs)("div", {
                                      className: "flex-1 min-w-0",
                                      children: [
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[13px] font-extrabold text-text-primary truncate",
                                          children: (null == s ? void 0 : s.chineseName) || t,
                                        }),
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[10px] text-text-muted font-pixel mt-0.5 truncate",
                                          children: t,
                                        }),
                                      ],
                                    }),
                                    (0, l.jsx)("button", {
                                      onClick: () => E({ type: "CLEAR_SELECTION" }),
                                      className:
                                        "w-[22px] h-[22px] flex items-center justify-center text-text-muted text-xs hover:text-error transition-colors shrink-0 self-start",
                                      children: (0, l.jsx)(V.A, { size: 16 }),
                                    }),
                                  ],
                                }),
                                (0, l.jsxs)("div", {
                                  className:
                                    "border-t-2 border-border-hard px-2.5 py-2 flex flex-col gap-1",
                                  children: [
                                    (0, l.jsxs)("div", {
                                      className: "flex items-center justify-between text-[11px]",
                                      children: [
                                        (0, l.jsx)("span", {
                                          className: "text-text-muted font-bold",
                                          children: "坐标",
                                        }),
                                        (0, l.jsxs)("span", {
                                          className: "text-text-primary font-pixel",
                                          children: [
                                            w.selectedBlock.position[0],
                                            ", ",
                                            w.selectedBlock.position[1],
                                            ", ",
                                            w.selectedBlock.position[2],
                                          ],
                                        }),
                                      ],
                                    }),
                                    s &&
                                      (0, l.jsxs)("div", {
                                        className: "flex items-center justify-between text-[11px]",
                                        children: [
                                          (0, l.jsx)("span", {
                                            className: "text-text-muted font-bold",
                                            children: "数量",
                                          }),
                                          (0, l.jsxs)("span", {
                                            className: "text-text-primary font-pixel",
                                            children: [s.count, " 个"],
                                          }),
                                        ],
                                      }),
                                    s &&
                                      (0, l.jsxs)("div", {
                                        className: "flex items-center justify-between text-[11px]",
                                        children: [
                                          (0, l.jsx)("span", {
                                            className: "text-text-muted font-bold",
                                            children: "占比",
                                          }),
                                          (0, l.jsxs)("span", {
                                            className: "text-text-primary font-pixel",
                                            children: [s.percentage.toFixed(1), "%"],
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                                (0, l.jsxs)("div", {
                                  className:
                                    "border-t-2 border-border-hard px-2.5 py-[7px] flex items-center justify-between gap-2",
                                  children: [
                                    (0, l.jsx)("span", {
                                      className: "text-[9px] text-text-muted min-w-0 truncate",
                                      children: "选区面板继续操作",
                                    }),
                                    (0, l.jsxs)("div", {
                                      className: "flex items-center gap-1.5 shrink-0",
                                      children: [
                                        (0, l.jsxs)("button", {
                                          onClick: i,
                                          className:
                                            "h-6 px-[8px] bg-error/10 text-error border-2 border-error text-[10px] font-black flex items-center gap-[5px] hover:bg-error hover:text-white transition-all",
                                          "aria-label": "删除".concat(a),
                                          children: [(0, l.jsx)(e1.A, { size: 10 }), "删除"],
                                        }),
                                        s0 &&
                                          (0, l.jsxs)("button", {
                                            onClick: r,
                                            className:
                                              "h-6 px-[9px] bg-warning text-[#0B1503] border-2 border-border-hard text-[10px] font-black flex items-center gap-[5px] hover:shadow-block-sm transition-all",
                                            children: [(0, l.jsx)(er.A, { size: 10 }), "替换"],
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, l.jsxs)("div", {
                              className: "hidden",
                              children: [
                                (0, l.jsxs)("div", {
                                  className:
                                    "flex items-center gap-2.5 px-3 py-2.5 border-b-2 border-border-hard",
                                  children: [
                                    (0, l.jsx)("div", {
                                      className:
                                        "w-11 h-11 bg-[#7a8190] border-2 border-border-hard overflow-hidden shrink-0",
                                      children: (null == s ? void 0 : s.textureUrl)
                                        ? (0, l.jsx)("img", {
                                            src: s.textureUrl,
                                            alt: "",
                                            className: "w-full h-full object-contain",
                                            style: { imageRendering: "pixelated" },
                                          })
                                        : (0, l.jsx)("div", {
                                            className:
                                              "w-full h-full flex items-center justify-center text-brand-cta text-lg",
                                            children: (0, l.jsx)(q.A, { size: 16 }),
                                          }),
                                    }),
                                    (0, l.jsxs)("div", {
                                      className: "flex-1 min-w-0",
                                      children: [
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[13px] font-extrabold text-text-primary truncate",
                                          children: (null == s ? void 0 : s.chineseName) || t,
                                        }),
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[10px] text-text-muted font-pixel mt-0.5 truncate",
                                          children: t,
                                        }),
                                        (0, l.jsxs)("div", {
                                          className: "text-[10px] text-text-muted font-bold mt-1",
                                          children: [
                                            w.selectedBlock.position[0],
                                            ", ",
                                            w.selectedBlock.position[1],
                                            ", ",
                                            w.selectedBlock.position[2],
                                            s ? " \xb7 ".concat(s.count, " 个") : "",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, l.jsx)("button", {
                                      onClick: () => E({ type: "CLEAR_SELECTION" }),
                                      className:
                                        "w-10 h-10 flex items-center justify-center text-text-muted hover:text-error transition-colors shrink-0",
                                      "aria-label": "关闭方块信息",
                                      children: (0, l.jsx)(V.A, { size: 18 }),
                                    }),
                                  ],
                                }),
                                (0, l.jsxs)("div", {
                                  className:
                                    "grid grid-cols-3 gap-2 p-3 pb-[calc(12px+env(safe-area-inset-bottom))]",
                                  children: [
                                    (0, l.jsxs)("button", {
                                      onClick: i,
                                      className:
                                        "h-11 bg-error/10 text-error border-2 border-error text-[12px] font-black flex items-center justify-center gap-1.5 hover:bg-error hover:text-white transition-all",
                                      children: [(0, l.jsx)(e1.A, { size: 14 }), "删除", a],
                                    }),
                                    s0 &&
                                      (0, l.jsxs)("button", {
                                        onClick: r,
                                        className:
                                          "h-11 bg-warning text-[#0B1503] border-2 border-border-hard text-[12px] font-black flex items-center justify-center gap-1.5 hover:shadow-block-sm transition-all",
                                        children: [(0, l.jsx)(er.A, { size: 14 }), "替换", a],
                                      }),
                                    (0, l.jsxs)("button", {
                                      onClick: () => {
                                        tn({ type: "OPEN_SHEET", sheet: "selection" });
                                      },
                                      className:
                                        "h-11 bg-bg-inset text-text-primary border-2 border-border-hard text-[12px] font-black flex items-center justify-center gap-1.5 hover:shadow-block-sm transition-all",
                                      children: [(0, l.jsx)(e3.A, { size: 14 }), "更多"],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        });
                      })(),
                    "orbit" === se &&
                      !sf &&
                      tv &&
                      !w.selectedBlock &&
                      "region" !== tj &&
                      (() => {
                        var e;
                        let t = tv.entityId.replace("minecraft:", ""),
                          s = tT.Xn[tv.kind] || "实体",
                          n = (0, tT.x6)(tv.customName),
                          a = (0, tT.fl)(tv),
                          r = null == (e = tv.blockId) ? void 0 : e.replace("minecraft:", "");
                        return (0, l.jsxs)(l.Fragment, {
                          children: [
                            (0, l.jsxs)("div", {
                              className: "hidden",
                              children: [
                                (0, l.jsxs)("div", {
                                  className: "flex items-center gap-2.5 p-2.5",
                                  children: [
                                    (0, l.jsx)("div", {
                                      className:
                                        "w-[46px] h-[46px] bg-bg-inset border-2 border-border-hard flex items-center justify-center shrink-0 text-brand-primary",
                                      children: (0, l.jsx)(e3.A, { size: 18 }),
                                    }),
                                    (0, l.jsxs)("div", {
                                      className: "flex-1 min-w-0",
                                      children: [
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[13px] font-extrabold text-text-primary truncate",
                                          children: a,
                                        }),
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[10px] text-text-muted font-pixel mt-0.5 truncate",
                                          children: t,
                                        }),
                                      ],
                                    }),
                                    (0, l.jsx)("button", {
                                      onClick: () => tE(null),
                                      className:
                                        "w-[22px] h-[22px] flex items-center justify-center text-text-muted text-xs hover:text-error transition-colors shrink-0 self-start",
                                      "aria-label": "关闭实体信息",
                                      children: (0, l.jsx)(V.A, { size: 16 }),
                                    }),
                                  ],
                                }),
                                (0, l.jsxs)("div", {
                                  className:
                                    "border-t-2 border-border-hard px-2.5 py-2 flex flex-col gap-1",
                                  children: [
                                    (0, l.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between gap-3 text-[11px]",
                                      children: [
                                        (0, l.jsx)("span", {
                                          className: "text-text-muted font-bold",
                                          children: "类型",
                                        }),
                                        (0, l.jsx)("span", {
                                          className: "text-text-primary font-bold truncate",
                                          children: s,
                                        }),
                                      ],
                                    }),
                                    (0, l.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between gap-3 text-[11px]",
                                      children: [
                                        (0, l.jsx)("span", {
                                          className: "text-text-muted font-bold",
                                          children: "坐标",
                                        }),
                                        (0, l.jsx)("span", {
                                          className: "text-text-primary font-pixel truncate",
                                          children: (0, tT.IO)(tv.position),
                                        }),
                                      ],
                                    }),
                                    r &&
                                      (0, l.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between gap-3 text-[11px]",
                                        children: [
                                          (0, l.jsx)("span", {
                                            className: "text-text-muted font-bold",
                                            children: "携带",
                                          }),
                                          (0, l.jsx)("span", {
                                            className: "text-text-primary font-pixel truncate",
                                            children: r,
                                          }),
                                        ],
                                      }),
                                    n &&
                                      n !== a &&
                                      (0, l.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between gap-3 text-[11px]",
                                        children: [
                                          (0, l.jsx)("span", {
                                            className: "text-text-muted font-bold",
                                            children: "名称",
                                          }),
                                          (0, l.jsx)("span", {
                                            className: "text-text-primary font-bold truncate",
                                            children: n,
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                                (0, l.jsx)("div", {
                                  className:
                                    "border-t-2 border-border-hard px-2.5 py-[7px] text-[9px] text-text-muted font-bold",
                                  children: "实体仅用于识别，暂不支持替换或删除",
                                }),
                              ],
                            }),
                            (0, l.jsxs)("div", {
                              className: "hidden",
                              children: [
                                (0, l.jsxs)("div", {
                                  className:
                                    "flex items-center gap-2.5 px-3 py-2.5 border-b-2 border-border-hard",
                                  children: [
                                    (0, l.jsx)("div", {
                                      className:
                                        "w-11 h-11 bg-bg-inset border-2 border-border-hard flex items-center justify-center shrink-0 text-brand-primary",
                                      children: (0, l.jsx)(e3.A, { size: 18 }),
                                    }),
                                    (0, l.jsxs)("div", {
                                      className: "flex-1 min-w-0",
                                      children: [
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[13px] font-extrabold text-text-primary truncate",
                                          children: a,
                                        }),
                                        (0, l.jsx)("div", {
                                          className:
                                            "text-[10px] text-text-muted font-pixel mt-0.5 truncate",
                                          children: t,
                                        }),
                                        (0, l.jsxs)("div", {
                                          className:
                                            "text-[10px] text-text-muted font-bold mt-1 truncate",
                                          children: [s, " \xb7 ", (0, tT.IO)(tv.position)],
                                        }),
                                      ],
                                    }),
                                    (0, l.jsx)("button", {
                                      onClick: () => tE(null),
                                      className:
                                        "w-10 h-10 flex items-center justify-center text-text-muted hover:text-error transition-colors shrink-0",
                                      "aria-label": "关闭实体信息",
                                      children: (0, l.jsx)(V.A, { size: 18 }),
                                    }),
                                  ],
                                }),
                                (0, l.jsxs)("div", {
                                  className:
                                    "px-3 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] text-[11px] font-bold text-text-muted",
                                  children: [
                                    "实体仅用于识别，暂不支持替换或删除",
                                    r ? " \xb7 携带 ".concat(r) : "",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        });
                      })(),
                    !sf &&
                      w.selectedPositions.size > 1 &&
                      (0, l.jsxs)("div", {
                        className:
                          "absolute top-[60px] left-1/2 -translate-x-1/2 z-20 bg-black/80 border-2 border-brand-primary shadow-block px-3 py-2 hidden lg:flex items-center gap-2.5 text-xs",
                        children: [
                          (0, l.jsx)("span", {
                            className:
                              "w-6 h-6 bg-brand-primary text-text-on-brand border-2 border-border-hard flex items-center justify-center",
                            children: (0, l.jsx)(ea.A, { size: 10 }),
                          }),
                          (0, l.jsxs)("span", {
                            className: "font-extrabold text-text-primary text-sm whitespace-nowrap",
                            children: [w.selectedPositions.size, " 块已选"],
                          }),
                          null !== sx &&
                            (0, l.jsxs)("span", {
                              className: "text-text-muted font-bold",
                              children: ["Y=", sx],
                            }),
                          (0, l.jsx)(K.K, {
                            label: "取消选择",
                            size: "xs",
                            variant: "ghost",
                            onClick: () => E({ type: "CLEAR_SELECTION" }),
                            children: (0, l.jsx)(V.A, { size: 12 }),
                          }),
                        ],
                      }),
                  ],
                }),
                to &&
                  (0, l.jsx)(el, {
                    onMaterialFocus: sc,
                    onExportCSV: te,
                    onScreenshot: tt,
                    onIsolateMaterial: lx,
                    onReplaceMaterial: lp,
                    onCollapse: () => td(!1),
                  }),
              ],
            }),
            (0, l.jsx)(ey, { previewHint: lS }),
            (0, l.jsxs)(tS._, {
              open: !!tl.sheet,
              onClose: () => tn({ type: "CLOSE_SHEET" }),
              position: _ ? "right" : "bottom",
              size: "fullscreen",
              showCloseButton: !1,
              avoidBottomNavigation: !1,
              showOverlay: !1,
              portalTarget: R.current,
              className:
                "ed-sheet-drawer lg:hidden !h-auto !bottom-[28px] !bg-[var(--bg-1)] max-h-[min(45dvh,320px)]",
              bodyClassName: "!flex !min-h-0 !flex-col !overflow-hidden !p-0",
              children: [
                (0, l.jsxs)("div", {
                  className: "ed-sheet-head",
                  children: [
                    (0, l.jsx)("span", {
                      className: "ed-sheet-grab",
                      children: (0, l.jsx)("span", {}),
                    }),
                    (0, l.jsxs)("div", {
                      className: "ed-sheet-tabs",
                      children: [
                        (0, l.jsx)(G.$, {
                          size: "sm",
                          variant: ti ? "primary" : "secondary",
                          className: "ed-sheet-tab".concat(ti ? " on" : ""),
                          onClick: () => tn({ type: "OPEN_SHEET", sheet: "selection" }),
                          children: "选区操作",
                        }),
                        (0, l.jsx)(G.$, {
                          size: "sm",
                          variant: ta ? "primary" : "secondary",
                          className: "ed-sheet-tab".concat(ta ? " on" : ""),
                          onClick: () => tn({ type: "OPEN_SHEET", sheet: "materials" }),
                          children: "材质清单",
                        }),
                        (0, l.jsx)(K.K, {
                          label: "关闭面板",
                          size: "sm",
                          variant: "ghost",
                          className: "ed-sheet-close",
                          onClick: () => tn({ type: "CLOSE_SHEET" }),
                          children: (0, l.jsx)(V.A, { size: 16 }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, l.jsx)("div", {
                  className: "ed-sheet-body",
                  children:
                    "materials" === tl.sheet
                      ? (0, l.jsx)(es, {
                          onMaterialFocus: sc,
                          onExportCSV: te,
                          onScreenshot: tt,
                          onIsolateMaterial: lx,
                          onReplaceMaterial: lp,
                        })
                      : lN("mobile"),
                }),
              ],
            }),
            (0, l.jsx)(eC, {
              open: P,
              onClose: sN,
              onSelect: sW,
              currentBlockId: H,
              impactCount: null != (S = null == Y ? void 0 : Y.length) ? S : void 0,
              targetMode: J,
              contextLabel: lw,
              contextHint: lE,
            }),
            (0, l.jsxs)(eS.a, {
              open: !!eq,
              onClose: () => e$(null),
              title: "有未保存的编辑",
              size: "md",
              maskClosable: !1,
              footer: (0, l.jsxs)(l.Fragment, {
                children: [
                  (0, l.jsx)(eS.y, {
                    variant: "ghost",
                    onClick: () => e$(null),
                    children: "取消离开",
                  }),
                  (0, l.jsx)(eS.y, {
                    variant: "danger",
                    onClick: () => eq && sq(eq),
                    children: "放弃更改",
                  }),
                  (0, l.jsxs)(eS.y, {
                    variant: "primary",
                    disabled: ek,
                    onClick: sV,
                    children: [(0, l.jsx)(D.A, { size: 14 }), ek ? "保存中…" : "保存后离开"],
                  }),
                ],
              }),
              children: [
                (0, l.jsx)("p", {
                  className: "text-sm font-bold text-text-primary",
                  children: "替换、删除、移动或整体变换尚未保存。",
                }),
                (0, l.jsx)("p", {
                  className: "mt-2 text-xs text-text-muted leading-relaxed",
                  children:
                    "临时草稿只保留在当前标签页，最长 12 小时。刷新会恢复草稿；新导入、放弃更改或成功离开会清理它。",
                }),
              ],
            }),
            (0, l.jsx)(eS.a, {
              open: ez,
              onClose: sX,
              title: "保存作品",
              size: "sm",
              footer: (0, l.jsxs)(l.Fragment, {
                children: [
                  (0, l.jsx)(eS.y, { variant: "ghost", onClick: sX, children: "取消" }),
                  (0, l.jsxs)(eS.y, {
                    variant: "primary",
                    disabled: !eL.trim(),
                    onClick: sJ,
                    children: [(0, l.jsx)(D.A, { size: 14 }), "保存"],
                  }),
                ],
              }),
              children: (0, l.jsxs)("div", {
                className: "flex flex-col gap-3",
                children: [
                  (0, l.jsx)("label", {
                    className: "text-sm font-bold text-text-primary",
                    children: "作品名称",
                  }),
                  (0, l.jsx)("input", {
                    type: "text",
                    value: eL,
                    onChange: (e) => eO(e.target.value),
                    onKeyDown: (e) => {
                      "Enter" === e.key && eL.trim() && sJ();
                    },
                    placeholder: "输入作品名称...",
                    autoFocus: !0,
                    className:
                      "w-full px-3 py-2.5 bg-bg-card border-2 border-border-hard text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-colors",
                    maxLength: 50,
                  }),
                  (0, l.jsx)("p", {
                    className: "text-xs text-text-muted",
                    children: "命名后可在作品列表中快速识别",
                  }),
                ],
              }),
            }),
            (0, l.jsx)(eS.a, {
              open: eG && (null == (v = w.source) ? void 0 : v.type) === "projection",
              onClose: () => eW(!1),
              title: "导出你的作品",
              icon: (0, l.jsx)(t$.A, { size: 19 }),
              iconTone: "brand",
              subtitle: "选择需要的格式，一键打包下载到本地",
              size: "xl",
              className: "!max-w-[720px]",
              bodyClassName: "!max-h-[72vh] !p-0",
              children:
                (null == (k = w.source) ? void 0 : k.type) === "projection" &&
                (0, l.jsx)(n.Suspense, {
                  fallback: (0, l.jsx)("div", {
                    className: "flex h-40 items-center justify-center",
                    children: (0, l.jsx)(eN.y, { size: "md" }),
                  }),
                  children: (0, l.jsx)(tV, {
                    initialVoxelModel: {
                      ...w.source.voxelModel,
                      name: (0, tF.ew)(w.source.voxelModel.name, eL),
                    },
                    initialOriginalFileData: w.originalFileData,
                    initialReplacements: w.replacements,
                    initialMaterialStats: w.materialStats,
                    initialHasStructuralEdits: w.hasStructuralEdits,
                    initialHistory: w.undoStack,
                    initialHasUntrackedStructuralEdits: w.hasUntrackedStructuralEdits,
                  }),
                }),
            }),
          ],
        });
      }
      function t8() {
        return (0, l.jsx)(x.AT, { children: (0, l.jsx)(M, { children: (0, l.jsx)(t6, {}) }) });
      }
    },
    71191: (e, t, s) => {
      "use strict";
      s.d(t, { P: () => i });
      var l = s(95155),
        n = s(12115),
        a = s(25016);
      let r = {
          neutral: "var(--color-text-muted)",
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-error)",
          info: "var(--color-info)",
          brand: "var(--color-brand-primary)",
        },
        i = n.forwardRef((e, t) => {
          let { tone: s = "neutral", className: n, style: i, children: o, ...c } = e,
            d = r[s],
            u = {
              "--status-color": d,
              backgroundColor: "color-mix(in srgb, var(--status-color) 12%, transparent)",
              borderColor: "color-mix(in srgb, var(--status-color) 40%, transparent)",
              color: d,
              ...i,
            };
          return (0, l.jsx)("output", {
            ref: t,
            className: (0, a.cn)(
              "box-border inline-flex h-6 items-center justify-center whitespace-nowrap rounded-none border-[1.5px] px-2 font-body text-xs font-bold leading-none shadow-none",
              n,
            ),
            style: u,
            tabIndex: -1,
            "data-control-kind": "status",
            "data-control-variant": s,
            ...c,
            children: o,
          });
        });
      i.displayName = "StatusChip";
    },
    73975: (e, t, s) => {
      "use strict";
      s.d(t, { IO: () => r, Xn: () => l, fl: () => n, x6: () => a });
      let l = {
        armor_stand: "盔甲架",
        minecart: "矿车",
        boat: "船",
        item_frame: "展示框",
        painting: "画",
        display: "展示实体",
        block_display: "方块展示实体",
        item_display: "物品展示实体",
        text_display: "文字展示实体",
        falling_block: "下落方块",
        tnt: "TNT",
        end_crystal: "末地水晶",
        leash_knot: "拴绳结",
        marker: "标记实体",
        interaction: "交互实体",
        generic: "未细分实体",
      };
      function n(e) {
        return a(e.customName) || l[e.kind] || "实体";
      }
      function a(e) {
        if (!e) return "";
        let t = e.trim();
        if (!t) return "";
        try {
          let e = JSON.parse(t);
          if ("string" == typeof e) return e;
          if (e && "object" == typeof e && "string" == typeof e.text) return e.text;
        } catch (e) {}
        return t;
      }
      function r(e) {
        return e.map((e) => (Number.isInteger(e) ? String(e) : e.toFixed(2))).join(", ");
      }
    },
    82610: (e, t, s) => {
      "use strict";
      s.d(t, { SX: () => n, cy: () => r, xP: () => a });
      class l {
        static getInstance() {
          return (l.instance || (l.instance = new l()), l.instance);
        }
        async initialize() {
          if (!this.initialized)
            try {
              let e = await fetch("/uploads/buildings/blockID/minecraft_blocks_database.json"),
                t = await e.json();
              (t.forEach((e) => {
                let t = e.chinese_name.toLowerCase();
                this.chineseNameMap.set(t, e.image_filename);
                let s = e.english_name.toLowerCase();
                this.englishNameMap.set(s, e.image_filename);
                let l = e.english_name.toLowerCase().replace(/\s+/g, "_");
                this.englishNameMap.set(l, e.image_filename);
              }),
                (this.initialized = !0),
                console.log("✅ 方块数据库已加载: ".concat(t.length, " 个方块")),
                console.log("   中文映射: ".concat(this.chineseNameMap.size, " 项")),
                console.log("   英文映射: ".concat(this.englishNameMap.size, " 项")));
            } catch (e) {
              console.error("❌ 加载方块数据库失败:", e);
            }
        }
        getImageFilename(e) {
          if (!this.initialized)
            return (console.warn("⚠️ 方块数据库未初始化，请先调用 initialize()"), null);
          let t = e.toLowerCase();
          if (this.chineseNameMap.has(t)) return this.chineseNameMap.get(t);
          if (this.englishNameMap.has(t)) return this.englishNameMap.get(t);
          for (let [e, s] of this.chineseNameMap.entries())
            if (e.includes(t) || t.includes(e)) return s;
          for (let [e, s] of this.englishNameMap.entries())
            if (e.includes(t) || t.includes(e)) return s;
          return (console.warn('⚠️ 未找到方块图片: "'.concat(e, '"')), null);
        }
        isInitialized() {
          return this.initialized;
        }
        constructor() {
          ((this.chineseNameMap = new Map()),
            (this.englishNameMap = new Map()),
            (this.initialized = !1));
        }
      }
      l.instance = null;
      let n = l.getInstance();
      async function a(e) {
        n.isInitialized() || (await n.initialize());
        let t = n.getImageFilename(e);
        return t
          ? "/uploads/buildings/blockID/images/".concat(t)
          : "/uploads/buildings/blockID/images/Barrier.png";
      }
      async function r() {
        await n.initialize();
      }
    },
    84817: (e, t, s) => {
      "use strict";
      s.d(t, { s: () => i });
      var l = s(85339),
        n = s(82084),
        a = s(28857);
      let r = {
        grass_block: [0.569, 0.741, 0.349],
        short_grass: [0.569, 0.741, 0.349],
        grass: [0.569, 0.741, 0.349],
        tall_grass: [0.569, 0.741, 0.349],
        fern: [0.569, 0.741, 0.349],
        large_fern: [0.569, 0.741, 0.349],
        potted_fern: [0.569, 0.741, 0.349],
        sugar_cane: [0.569, 0.741, 0.349],
        oak_leaves: [0.467, 0.671, 0.184],
        jungle_leaves: [0.467, 0.671, 0.184],
        acacia_leaves: [0.467, 0.671, 0.184],
        dark_oak_leaves: [0.467, 0.671, 0.184],
        mangrove_leaves: [0.467, 0.671, 0.184],
        vine: [0.467, 0.671, 0.184],
        spruce_leaves: [0.38, 0.6, 0.38],
        birch_leaves: [0.502, 0.655, 0.333],
        azalea_leaves: [0.467, 0.671, 0.184],
        flowering_azalea_leaves: [0.467, 0.671, 0.184],
      };
      function i(e, t) {
        let { blockDefinitions: s, blockModels: i, atlas: c } = t,
          d = new Map();
        for (let [m, x] of e) {
          let e,
            p = x.blockId,
            h = x.properties,
            b = (0, a.uO)(h, t.defaultBlockProperties.get(p)),
            f = !1,
            g = p.replace("minecraft:", ""),
            j = /(^|_)banner$/.test(g) || /(^|_)wall_banner$/.test(g),
            y = j ? null : (0, a.e7)(p, b, c);
          if ((0, a.a4)(p)) e = (0, a.nf)(b, c);
          else if (j) {
            var u;
            e = null != (u = (0, a.jX)(p, b, c)) ? u : o();
          } else if (y) e = y;
          else if ((0, a.vD)(p)) {
            let t = { keepTopFace: !0 };
            ((e = (0, a.mD)(p, b, c, t)), (f = (0, a.wd)(b, t)));
          } else {
            let t = n.gw.parse(p),
              l = s.getBlockDefinition(t);
            if (l)
              try {
                e = l.getMesh(t, b, c, i, {});
              } catch (t) {
                e = o();
              }
            else e = o();
          }
          if (0 === e.quads.length) {
            let t = (0, a.jX)(p, b, c);
            e = null != t ? t : o();
          }
          let v = (function (e) {
            var t;
            return null != (t = r[e.replace("minecraft:", "")]) ? t : null;
          })(p);
          (v &&
            (function (e, t) {
              for (let s of e.quads)
                for (let e of s.vertices()) {
                  let s = e.color;
                  s && (s[0] < 0.99 || s[1] < 0.99 || s[2] < 0.99) && (e.color = t);
                }
            })(e, v),
            e.computeNormals());
          let k = (function (e) {
            let t = 4 * e.length,
              s = 6 * e.length,
              n = new Float32Array(3 * t),
              a = new Float32Array(2 * t),
              r = new Float32Array(3 * t),
              i = new Float32Array(3 * t),
              o = new Uint32Array(s);
            for (let t = 0; t < e.length; t++) {
              let s = e[t].vertices(),
                l = 4 * t,
                x = 6 * t;
              for (let e = 0; e < 4; e++) {
                var c, d, u, m;
                let t = s[e],
                  o = (l + e) * 3,
                  x = (l + e) * 2;
                ((n[o] = t.pos.x),
                  (n[o + 1] = t.pos.y),
                  (n[o + 2] = t.pos.z),
                  t.texture && ((a[x] = t.texture[0]), (a[x + 1] = t.texture[1])),
                  t.normal &&
                    ((r[o] = t.normal.x), (r[o + 1] = t.normal.y), (r[o + 2] = t.normal.z)));
                let p = null != (c = t.color) ? c : [1, 1, 1];
                ((i[o] = null != (d = p[0]) ? d : 1),
                  (i[o + 1] = null != (u = p[1]) ? u : 1),
                  (i[o + 2] = null != (m = p[2]) ? m : 1));
              }
              ((o[x] = l),
                (o[x + 1] = l + 1),
                (o[x + 2] = l + 2),
                (o[x + 3] = l),
                (o[x + 4] = l + 2),
                (o[x + 5] = l + 3));
            }
            let x = new l.LoY();
            return (
              x.setAttribute("position", new l.THS(n, 3)),
              x.setAttribute("uv", new l.THS(a, 2)),
              x.setAttribute("normal", new l.THS(r, 3)),
              x.setAttribute("color", new l.THS(i, 3)),
              x.setIndex(new l.THS(o, 1)),
              x
            );
          })(e.quads);
          if (f && k.index) {
            let e = 6 * a.qv,
              t = Math.max(0, k.index.count - e);
            (k.clearGroups(), k.addGroup(0, t, 0), k.addGroup(t, e, 1));
          }
          d.set(m, { variantKey: m, geometry: k, group: x, hasFluidTopCapGroup: f });
        }
        return d;
      }
      function o() {
        let e = [],
          t = [1, 0, 1];
        for (let s of [
          {
            verts: [
              [0, 1, 0],
              [0, 1, 1],
              [1, 1, 1],
              [1, 1, 0],
            ],
            normal: [0, 1, 0],
          },
          {
            verts: [
              [0, 0, 1],
              [0, 0, 0],
              [1, 0, 0],
              [1, 0, 1],
            ],
            normal: [0, -1, 0],
          },
          {
            verts: [
              [1, 1, 0],
              [1, 0, 0],
              [0, 0, 0],
              [0, 1, 0],
            ],
            normal: [0, 0, -1],
          },
          {
            verts: [
              [0, 1, 1],
              [0, 0, 1],
              [1, 0, 1],
              [1, 1, 1],
            ],
            normal: [0, 0, 1],
          },
          {
            verts: [
              [1, 1, 1],
              [1, 0, 1],
              [1, 0, 0],
              [1, 1, 0],
            ],
            normal: [1, 0, 0],
          },
          {
            verts: [
              [0, 1, 0],
              [0, 0, 0],
              [0, 0, 1],
              [0, 1, 1],
            ],
            normal: [-1, 0, 0],
          },
        ]) {
          let l = s.verts.map((e) => {
            let [l, a, r] = e,
              i = new n.Mi(l, a, r),
              o = new n.Mi(s.normal[0], s.normal[1], s.normal[2]);
            return new n.Li(i, t, void 0, void 0, o, void 0);
          });
          e.push(new n.kO(l[0], l[1], l[2], l[3]));
        }
        return new n.e(e);
      }
    },
    86709: (e, t, s) => {
      "use strict";
      s.d(t, { p: () => r });
      var l = s(37578);
      let n = new Set([
          "minecraft:fire",
          "minecraft:soul_fire",
          "minecraft:lava",
          "minecraft:flowing_lava",
          "minecraft:nether_portal",
        ]),
        a = {
          "minecraft:fire": 12,
          "minecraft:soul_fire": 12,
          "minecraft:lava": 8,
          "minecraft:flowing_lava": 8,
          "minecraft:nether_portal": 10,
        };
      function r(e) {
        var t, s, r;
        let i = (function (e) {
          let t = String(e || "")
            .trim()
            .toLowerCase()
            .replace(/\[.*\]$/, "");
          return t ? (t.includes(":") ? t : "minecraft:".concat(t)) : "minecraft:air";
        })(e);
        if (!n.has(i)) return null;
        let o = (0, l.ae)(i),
          c =
            null !=
            (s =
              null == o || null == (t = o.regions)
                ? void 0
                : t
                    .filter((e) => e.frameCount > 1 && e.vOffsetPerFrame > 0)
                    .map((e) => ({
                      u0: e.u0,
                      v0: e.v0,
                      u1: e.u1,
                      v1: e.v1,
                      frameCount: e.frameCount,
                      vOffsetPerFrame: e.vOffsetPerFrame,
                    })))
              ? s
              : [];
        return 0 === c.length ? null : { fps: null != (r = a[i]) ? r : 10, regions: c };
      }
    },
    90908: (e, t, s) => {
      "use strict";
      s.d(t, { _: () => p });
      var l = s(95155),
        n = s(12115),
        a = s(26497),
        r = s(1733),
        i = s(47650),
        o = s(2186),
        c = s(51750),
        d = s(44460);
      let u = {
          xs: { width: "w-[240px]", height: "h-[200px]" },
          sm: { width: "w-[280px]", height: "h-[240px]" },
          md: { width: "w-[320px]", height: "h-[280px]" },
          lg: { width: "w-[400px]", height: "h-[350px]" },
          xl: { width: "w-[480px]", height: "h-[420px]" },
          fullscreen: { width: "w-full", height: "h-full" },
        },
        m = {
          right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
          left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
          top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
          bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
        },
        x = {
          right: "right-0 top-0 bottom-0",
          left: "left-0 top-0 bottom-0",
          top: "left-0 right-0 top-0",
          bottom: "left-0 right-0 bottom-[52px]",
        };
      function p(e) {
        let {
            id: t,
            open: s,
            onClose: p,
            title: h,
            subtitle: b,
            icon: f,
            children: g,
            position: j = "right",
            size: y = "md",
            variant: v = "default",
            color: k = "green",
            footer: N,
            showOverlay: S = !0,
            closeOnOverlayClick: w = !0,
            closeOnEsc: E = !0,
            showCloseButton: C = !0,
            loading: _ = !1,
            className: I = "",
            bodyClassName: M = "",
            avoidBottomNavigation: z = !0,
            portalTarget: T,
          } = e,
          L = (0, n.useCallback)(
            (e) => {
              "Escape" === e.key && E && !_ && p();
            },
            [p, E, _],
          );
        (0, n.useEffect)(() => {
          if (s)
            return (
              document.addEventListener("keydown", L),
              (document.body.style.overflow = "hidden"),
              () => {
                (document.removeEventListener("keydown", L), (document.body.style.overflow = ""));
              }
            );
        }, [s, L]);
        let A = "left" === j || "right" === j ? u[y].width : u[y].height,
          B = { green: "border-brand-primary", orange: "border-warning", blue: "border-info" },
          O = "\n    fixed bg-bg-card flex flex-col z-[1001] shadow-block\n    "
            .concat("bottom" === j && !z ? "left-0 right-0 bottom-0" : x[j], "\n    ")
            .concat(A, "\n    ")
            .concat("rounded" === v ? "rounded-none m-cn-4" : "", "\n    ")
            .concat(
              "bordered" === v && "right" === j ? "border-l-[3px] ".concat(B[k]) : "",
              "\n    ",
            )
            .concat(
              "bordered" === v && "left" === j ? "border-r-[3px] ".concat(B[k]) : "",
              "\n    ",
            )
            .concat("bordered" === v && "top" === j ? "border-b-[3px] ".concat(B[k]) : "", "\n    ")
            .concat(
              "bordered" === v && "bottom" === j ? "border-t-[3px] ".concat(B[k]) : "",
              "\n    ",
            )
            .concat(
              "bottom" === j && "bordered" !== v ? "border-t-2 border-border-hard" : "",
              "\n    ",
            )
            .concat(_ ? "pointer-events-none" : "", "\n    ")
            .concat(I, "\n  ")
            .trim(),
          R = "\n    flex items-center justify-between px-6 py-4 flex-shrink-0\n    "
            .concat("minimal" === v ? "" : "border-b-2 border-border-soft", "\n    ")
            .concat(
              { green: "bg-brand-primary/5", orange: "bg-warning/5", blue: "bg-info/5" }[k],
              "\n  ",
            )
            .trim(),
          D = "\n    px-6 py-4 flex-shrink-0 flex gap-2 justify-end\n    "
            .concat("minimal" === v ? "" : "border-t-2 border-border-soft", "\n  ")
            .trim(),
          P = m[j];
        return (0, i.createPortal)(
          (0, l.jsx)(a.N, {
            children:
              s &&
              (0, l.jsxs)(l.Fragment, {
                children: [
                  S &&
                    (0, l.jsx)(r.P.div, {
                      className: "fixed inset-0 z-[1000] ".concat(
                        "bottom" === j ? "bg-black/60" : "bg-black/50",
                      ),
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      transition: { duration: 0.2 },
                      onClick: () => {
                        w && !_ && p();
                      },
                    }),
                  (0, l.jsxs)(r.P.div, {
                    id: t,
                    className: O,
                    initial: P.initial,
                    animate: P.animate,
                    exit: P.exit,
                    transition:
                      "bottom" === j
                        ? { duration: 0.2, ease: "easeOut" }
                        : { type: "spring", damping: 30, stiffness: 300 },
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": h ? "drawer-title" : void 0,
                    children: [
                      (h || C) &&
                        (0, l.jsxs)("div", {
                          className: R,
                          children: [
                            (0, l.jsxs)("div", {
                              className: "flex items-center gap-3",
                              children: [
                                f &&
                                  (0, l.jsx)("div", {
                                    className:
                                      "w-8 h-8 flex items-center justify-center rounded-none ".concat(
                                        {
                                          green: "bg-brand-primary/10 text-brand-primary",
                                          orange: "bg-warning/10 text-warning",
                                          blue: "bg-info/10 text-info",
                                        }[k],
                                      ),
                                    children: f,
                                  }),
                                (0, l.jsxs)("div", {
                                  children: [
                                    h &&
                                      (0, l.jsx)("div", {
                                        id: "drawer-title",
                                        className: "text-base font-bold text-text-primary",
                                        children: h,
                                      }),
                                    b &&
                                      (0, l.jsx)("div", {
                                        className: "text-[13px] text-text-muted mt-0.5",
                                        children: b,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            C &&
                              (0, l.jsx)(d.K, {
                                onClick: p,
                                disabled: _,
                                label: "关闭",
                                size: "xs",
                                variant: "secondary",
                                className:
                                  "bg-bg-card text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
                                children: (0, l.jsx)(o.A, { size: 20 }),
                              }),
                          ],
                        }),
                      (0, l.jsx)("div", {
                        className:
                          "flex-1 px-6 py-4 text-text-secondary text-sm leading-relaxed overflow-y-auto cn4-scroll ".concat(
                            M,
                          ),
                        children: _
                          ? (0, l.jsx)("div", {
                              className:
                                "absolute inset-0 bg-bg-elevated/80 flex items-center justify-center",
                              children: (0, l.jsx)(c.y, { size: "md" }),
                            })
                          : g,
                      }),
                      N && (0, l.jsx)("div", { className: D, children: N }),
                    ],
                  }),
                ],
              }),
          }),
          null != T ? T : document.body,
        );
      }
    },
    93429: (e, t, s) => {
      "use strict";
      s.d(t, { o: () => n });
      var l = s(37578);
      function n(e) {
        let t = (0, l.NS)(e).map((e) => ({
          sourceU0: e.sourceU0,
          sourceV0: e.sourceV0,
          sourceU1: e.sourceU1,
          sourceV1: e.sourceV1,
          maskU0: e.maskU0,
          maskV0: e.maskV0,
          maskU1: e.maskU1,
          maskV1: e.maskV1,
        }));
        return 0 === t.length ? null : { regions: t };
      }
    },
    99350: (e, t, s) => {
      "use strict";
      function l(e) {
        e && "function" == typeof e.catch && e.catch(() => {});
      }
      function n(e, t) {
        if (!e) return;
        let s =
          e.requestFullscreen ||
          e.webkitRequestFullscreen ||
          e.mozRequestFullScreen ||
          e.msRequestFullscreen;
        if ("function" != typeof s) {
          null == t || t(Error("fullscreen API unavailable"));
          return;
        }
        try {
          let n = s.call(e);
          (n && "function" == typeof n.catch && n.catch((e) => (null == t ? void 0 : t(e))), l(n));
        } catch (e) {
          null == t || t(e);
        }
      }
      function a(e, t) {
        e &&
          ((function () {
            if ("undefined" == typeof document) return null;
            let e = document;
            return document.fullscreenElement || e.webkitFullscreenElement || null;
          })()
            ? (function () {
                if ("undefined" == typeof document) return;
                let e = document,
                  t =
                    document.exitFullscreen ||
                    e.webkitExitFullscreen ||
                    e.mozCancelFullScreen ||
                    e.msExitFullscreen;
                if ("function" == typeof t)
                  try {
                    l(t.call(document));
                  } catch (e) {}
              })()
            : n(e, t));
      }
      s.d(t, { gG: () => n, gU: () => a });
    },
  },
]);

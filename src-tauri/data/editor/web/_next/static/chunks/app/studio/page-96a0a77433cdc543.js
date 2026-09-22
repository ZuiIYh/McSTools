(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [901, 9558],
  {
    46: (e, t, r) => {
      "use strict";
      r.d(t, { CR: () => o, Ud: () => s, qq: () => n, uU: () => i, wK: () => a });
      let a = 50,
        s = 0x3200000,
        n = 25;
      function i(e) {
        return !Number.isFinite(e) || e <= 0
          ? "0MB"
          : "".concat((e / 1024 / 1024).toFixed(1), "MB");
      }
      function o(e) {
        return !e || e <= 0x1900000
          ? null
          : "当前投影原文件约 "
              .concat(i(e), "，账号保存上限约 ")
              .concat(n, "MB；请先导出投影文件保存在本地，或压缩/拆分后再保存到账户。");
      }
    },
    1855: (e, t, r) => {
      "use strict";
      r.d(t, { $: () => o });
      var a = r(95155),
        s = r(12115),
        n = r(97003),
        i = r(69381);
      let o = s.forwardRef((e, t) => {
        let { selected: r = !1, count: s, size: o = "sm", children: l, ...d } = e;
        return (0, a.jsxs)(n.$, {
          ref: t,
          size: o,
          variant: r ? "primary" : "secondary",
          controlKind: "filter",
          "aria-pressed": r,
          "data-selected": r ? "true" : "false",
          ...d,
          children: [
            l,
            "number" == typeof s && (0, a.jsx)(i.x, { tone: r ? "neutral" : "brand", children: s }),
          ],
        });
      });
      o.displayName = "FilterChip";
    },
    3235: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "pencil", "Pencil", [
        ["path", { d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4", key: "svg-0" }],
        ["path", { d: "M13.5 6.5l4 4", key: "svg-1" }],
      ]);
    },
    7882: (e, t, r) => {
      "use strict";
      r.d(t, { parseProjectionBuffer: () => l, parseProjectionFile: () => o, up: () => c });
      var a = r(70144),
        s = r(41845),
        n = r(46);
      let i = [".litematic", ".schem"];
      async function o(e) {
        if (e.size > n.Ud)
          throw Error(
            "文件过大 (".concat((0, n.uU)(e.size), ")，本地打开最大支持 ").concat(n.wK, "MB"),
          );
        let t = d(e.name);
        if (!i.includes(t))
          throw Error("不支持的文件格式: ".concat(t, "\n支持: ").concat(i.join(", ")));
        return l(await e.arrayBuffer(), e.name);
      }
      async function l(e, t) {
        let r = d(t);
        if (!i.includes(r))
          throw Error("不支持的文件格式: ".concat(r, "\n支持: ").concat(i.join(", ")));
        switch (r) {
          case ".litematic":
            return (0, a.e)(e, t);
          case ".schem":
            return (0, s.g)(e, t);
          default:
            throw Error("不支持的文件格式: ".concat(r));
        }
      }
      function d(e) {
        let t = e.split(/[?#]/, 1)[0].trim().toLowerCase();
        if (!t) return "";
        if (t.startsWith(".") && !t.slice(1).includes(".")) return t;
        if (!t.includes(".") && /^[a-z0-9]+$/.test(t)) return ".".concat(t);
        let r = t.lastIndexOf(".");
        return -1 === r ? "" : t.substring(r);
      }
      function c(e) {
        let t = d(e);
        return i.includes(t);
      }
    },
    15532: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "chevron-left", "ChevronLeft", [
        ["path", { d: "M15 6l-6 6l6 6", key: "svg-0" }],
      ]);
    },
    18559: (e, t, r) => {
      "use strict";
      r.d(t, { AI: () => o, Dn: () => i, Gq: () => l, JB: () => s, TW: () => a });
      let a = "studio_edit_session_v1",
        s = 432e5,
        n = [
          a,
          "studio_source_type",
          "studio_voxel_model",
          "studio_original_file",
          "studio_export_replacements",
          "studio_export_material_stats",
          "studio_export_has_structural_edits",
          "studio_projection_url",
          "studio_building",
          "studio_building_id",
          "studio_building_name",
          "studio_work_id",
          "studio_editor_state_remote",
        ];
      function i() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now();
        try {
          var t;
          let r = sessionStorage.getItem(a);
          if (!r) return null;
          let n = JSON.parse(r);
          if (
            1 !== n.version ||
            "number" != typeof n.updatedAt ||
            e - n.updatedAt > s ||
            e < n.updatedAt - 6e4 ||
            !(
              (t = n.voxelModel) &&
              "object" == typeof t &&
              "string" == typeof t.name &&
              Array.isArray(t.size) &&
              3 === t.size.length &&
              Array.isArray(t.blocks) &&
              ("litematic" === t.format || "schem" === t.format)
            )
          )
            return (l(), null);
          return {
            version: 1,
            updatedAt: n.updatedAt,
            voxelModel: n.voxelModel,
            replacements: Array.isArray(n.replacements) ? n.replacements : [],
            materialStats: Array.isArray(n.materialStats) ? n.materialStats : [],
            undoStack: Array.isArray(n.undoStack) ? n.undoStack : [],
            redoStack: Array.isArray(n.redoStack) ? n.redoStack : [],
            savedHistoryDepth: Number.isInteger(n.savedHistoryDepth) ? n.savedHistoryDepth : 0,
            savedHistoryMarker:
              "number" == typeof n.savedHistoryMarker ? n.savedHistoryMarker : null,
            isModified: !0 === n.isModified,
            hasStructuralEdits: !0 === n.hasStructuralEdits,
            hasUntrackedStructuralEdits: !0 === n.hasUntrackedStructuralEdits,
            workId: "string" == typeof n.workId ? n.workId : void 0,
            buildingId: "string" == typeof n.buildingId ? n.buildingId : void 0,
            buildingName: "string" == typeof n.buildingName ? n.buildingName : void 0,
          };
        } catch (e) {
          return (l(), null);
        }
      }
      function o(e) {
        let t = { ...e, version: 1, updatedAt: Date.now() };
        try {
          return (
            sessionStorage.setItem(a, JSON.stringify(t)),
            sessionStorage.setItem("studio_source_type", "projection"),
            sessionStorage.setItem("studio_export_replacements", JSON.stringify(e.replacements)),
            sessionStorage.setItem("studio_export_material_stats", JSON.stringify(e.materialStats)),
            sessionStorage.setItem(
              "studio_export_has_structural_edits",
              String(e.hasStructuralEdits),
            ),
            e.workId
              ? sessionStorage.setItem("studio_work_id", e.workId)
              : sessionStorage.removeItem("studio_work_id"),
            e.buildingId && sessionStorage.setItem("studio_building_id", e.buildingId),
            e.buildingName && sessionStorage.setItem("studio_building_name", e.buildingName),
            sessionStorage.removeItem("studio_voxel_model"),
            !0
          );
        } catch (e) {
          return !1;
        }
      }
      function l() {
        for (let e of n) sessionStorage.removeItem(e);
      }
    },
    25016: (e, t, r) => {
      "use strict";
      r.d(t, { cn: () => n });
      var a = r(2821),
        s = r(75889);
      function n() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return (0, s.QP)((0, a.$)(t));
      }
    },
    25828: (e, t, r) => {
      "use strict";
      r.d(t, { E: () => d });
      var a = r(95155),
        s = r(12115),
        n = r(25016);
      let i = {
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
        o = {
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
        l = {
          sm: "h-6 px-2 text-xs [&_svg]:h-3 [&_svg]:w-3",
          md: "h-7 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
        },
        d = s.forwardRef((e, t) => {
          let {
            tone: r = "neutral",
            variant: s = "soft",
            size: d = "sm",
            icon: c,
            className: u,
            children: m,
            ...b
          } = e;
          return (0, a.jsxs)("span", {
            ref: t,
            className: (0, n.cn)(
              "box-border inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-none border-2 font-body font-bold leading-none shadow-none",
              l[d],
              "solid" === s ? o[r] : i[r],
              "solid" === s && "shadow-block-xs",
              u,
            ),
            tabIndex: -1,
            "data-control-kind": "badge",
            "data-control-size": d,
            "data-control-variant": s,
            ...b,
            children: [c, m],
          });
        });
      d.displayName = "Badge";
    },
    29080: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "alert-circle", "AlertCircle", [
        ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
        ["path", { d: "M12 8v4", key: "svg-1" }],
        ["path", { d: "M12 16h.01", key: "svg-2" }],
      ]);
    },
    38678: () => {},
    44478: (e, t, r) => {
      "use strict";
      r.d(t, { g: () => n });
      let a = {
          easy: "beginner",
          beginner: "beginner",
          medium: "intermediate",
          intermediate: "intermediate",
          hard: "advanced",
          advanced: "advanced",
          expert: "expert",
        },
        s = {
          beginner: {
            key: "beginner",
            label: "新手",
            bg: "var(--color-brand-primary)",
            fg: "#0B1503",
          },
          intermediate: {
            key: "intermediate",
            label: "进阶",
            bg: "var(--color-warning)",
            fg: "#0B1503",
          },
          advanced: { key: "advanced", label: "高级", bg: "var(--color-error)", fg: "#FFFFFF" },
          expert: {
            key: "expert",
            label: "大师",
            bg: "var(--color-difficulty-expert)",
            fg: "#FFFFFF",
          },
        };
      function n(e) {
        var t;
        return s[null != (t = a[null != e ? e : ""]) ? t : "beginner"];
      }
    },
    44748: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "alert-triangle", "AlertTriangle", [
        ["path", { d: "M12 9v4", key: "svg-0" }],
        [
          "path",
          {
            d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0",
            key: "svg-1",
          },
        ],
        ["path", { d: "M12 16h.01", key: "svg-2" }],
      ]);
    },
    45966: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "cloud-upload", "CloudUpload", [
        [
          "path",
          { d: "M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1", key: "svg-0" },
        ],
        ["path", { d: "M9 15l3 -3l3 3", key: "svg-1" }],
        ["path", { d: "M12 12l0 9", key: "svg-2" }],
      ]);
    },
    51750: (e, t, r) => {
      "use strict";
      r.d(t, { y: () => o });
      var a = r(95155),
        s = r(64991),
        n = r(25016);
      let i = { xs: 16, sm: 28, md: 44, lg: 60, xl: 80 };
      function o(e) {
        let { size: t = "md", className: r, label: o } = e;
        return (0, a.jsxs)("span", {
          className: (0, n.cn)("mcb-loader", r),
          "data-size": t,
          style: { "--mcb-loader-box": "".concat(i[t], "px") },
          role: "status",
          "aria-label": null != o ? o : "加载中",
          children: [
            (0, a.jsx)(s.A, { className: "mcb-loader-icon" }),
            (0, a.jsx)("span", { className: "sr-only", children: null != o ? o : "加载中" }),
          ],
        });
      }
    },
    52398: (e, t, r) => {
      "use strict";
      function a(e, t) {
        let r = (e) => e.replace("minecraft:", ""),
          a = r(e),
          s = r(t);
        if (
          (a.endsWith("_door") && s.endsWith("_door")) ||
          (a.endsWith("_bed") && s.endsWith("_bed")) ||
          (a.endsWith("_stairs") && s.endsWith("_stairs")) ||
          (a.endsWith("_slab") && s.endsWith("_slab")) ||
          (a.endsWith("_fence") && s.endsWith("_fence")) ||
          (a.endsWith("_fence_gate") && s.endsWith("_fence_gate")) ||
          (a.endsWith("_trapdoor") && s.endsWith("_trapdoor")) ||
          (a.endsWith("_wall") && s.endsWith("_wall")) ||
          (a.endsWith("_button") && s.endsWith("_button")) ||
          (a.endsWith("_pressure_plate") && s.endsWith("_pressure_plate")) ||
          ((a.endsWith("_log") || a.endsWith("_wood")) &&
            (s.endsWith("_log") || s.endsWith("_wood"))) ||
          (a.endsWith("_planks") && s.endsWith("_planks")) ||
          (a.endsWith("_leaves") && s.endsWith("_leaves")) ||
          (a.endsWith("_sign") && s.endsWith("_sign")) ||
          (a.endsWith("_shulker_box") && s.endsWith("_shulker_box")) ||
          (a.endsWith("_glazed_terracotta") && s.endsWith("_glazed_terracotta"))
        )
          return !0;
        let n = new Set(["chest", "trapped_chest"]);
        return n.has(a) && n.has(s);
      }
      function s(e, t) {
        let r = new Set(t.positions.map(i)),
          s = a(t.fromBlockId, t.toBlockId);
        for (let a of e)
          r.has(i(a.position)) &&
            a.blockId === t.fromBlockId &&
            ((a.blockId = t.toBlockId), s || (a.properties = {}));
      }
      function n(e, t) {
        let r = new Set(t.positions.map(i)),
          s = a(t.toBlockId, t.fromBlockId);
        for (let a of e)
          r.has(i(a.position)) &&
            a.blockId === t.toBlockId &&
            ((a.blockId = t.fromBlockId), s || (a.properties = {}));
      }
      function i(e) {
        return "".concat(e[0], ",").concat(e[1], ",").concat(e[2]);
      }
      r.d(t, { CQ: () => n, ym: () => s });
    },
    53486: (e, t, r) => {
      "use strict";
      r.d(t, { S: () => p, a: () => b });
      var a = r(95155),
        s = r(12115),
        n = r(2186),
        i = r(61456),
        o = r(67812),
        l = r(44748),
        d = r(71442);
      let c = (0, s.createContext)(null);
      function u(e) {
        let { object: t } = e;
        return (0, a.jsxs)("div", {
          className:
            "mt-4 flex items-center gap-3 border-2 border-border-hard bg-bg-inset p-3 shadow-block-xs",
          children: [
            t.thumbnail &&
              (0, a.jsx)("div", {
                className:
                  "h-[58px] w-[76px] shrink-0 overflow-hidden border-2 border-border-hard bg-bg-deep",
                children:
                  "string" == typeof t.thumbnail
                    ? (0, a.jsx)("img", {
                        src: t.thumbnail,
                        alt: "",
                        className: "h-full w-full object-cover",
                      })
                    : t.thumbnail,
              }),
            (0, a.jsxs)("div", {
              className: "min-w-0",
              children: [
                (0, a.jsx)("div", {
                  className: "truncate text-sm font-black text-text-primary",
                  children: t.name,
                }),
                t.meta &&
                  (0, a.jsx)("div", {
                    className: "mt-1 font-pixel text-xs text-text-muted",
                    children: t.meta,
                  }),
              ],
            }),
          ],
        });
      }
      function m(e) {
        let { request: t, onSettle: r } = e,
          {
            title: s,
            subtitle: o,
            body: l,
            confirmText: c = "确认执行",
            cancelText: u = "取消",
          } = t.options;
        return (0, a.jsxs)(d.a, {
          open: !0,
          onClose: () => r(!1),
          size: "md",
          maskClosable: !1,
          closable: !1,
          bodyClassName: "!max-h-[88vh] !p-0",
          className: "!max-w-[460px] !bg-bg-card",
          children: [
            (0, a.jsxs)("div", {
              className: "flex items-center gap-2.5 border-b-2 border-border-hard px-4 py-3.5",
              children: [
                (0, a.jsx)("span", {
                  className: "h-[15px] w-[3px] shrink-0 border-2 border-border-hard bg-warning",
                }),
                (0, a.jsxs)("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    (0, a.jsx)("h3", {
                      className: "text-base font-black text-text-primary",
                      children: s,
                    }),
                    o &&
                      (0, a.jsx)("div", {
                        className: "mt-0.5 text-[11px] font-bold leading-relaxed text-text-muted",
                        children: o,
                      }),
                  ],
                }),
                (0, a.jsx)("button", {
                  type: "button",
                  onClick: () => r(!1),
                  className:
                    "grid h-7 w-7 shrink-0 place-items-center text-text-muted transition-colors hover:text-error",
                  "aria-label": "关闭",
                  children: (0, a.jsx)(n.A, { size: 16 }),
                }),
              ],
            }),
            (0, a.jsx)("div", {
              className: "px-[18px] py-4 text-sm font-bold leading-relaxed text-text-secondary",
              children: l,
            }),
            (0, a.jsxs)("div", {
              className:
                "flex items-center justify-end gap-2 border-t-2 border-border-hard px-4 py-3.5",
              children: [
                null !== u &&
                  (0, a.jsx)("button", {
                    type: "button",
                    onClick: () => r(!1),
                    className:
                      "h-9 border-2 border-border-hard bg-bg-inset px-4 text-sm font-black text-text-secondary transition-colors hover:text-text-primary",
                    children: u,
                  }),
                (0, a.jsxs)("button", {
                  type: "button",
                  onClick: () => r(!0),
                  className:
                    "inline-flex h-9 items-center gap-1.5 border-2 border-border-hard bg-error px-4 text-sm font-black text-white shadow-block-sm transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-block",
                  children: [(0, a.jsx)(i.A, { size: 13 }), c],
                }),
              ],
            }),
          ],
        });
      }
      function b(e) {
        var t, r, n;
        let { children: i } = e,
          b = (0, s.useRef)(0),
          [p, x] = (0, s.useState)([]),
          h = p[0],
          g = (0, s.useCallback)(
            (e) =>
              new Promise((t) => {
                ((b.current += 1), x((r) => [...r, { id: b.current, options: e, resolve: t }]));
              }),
            [],
          ),
          f = (0, s.useCallback)(
            (e) => {
              h &&
                (h.resolve(e),
                x((e) => {
                  var t;
                  return (null == (t = e[0]) ? void 0 : t.id) === h.id ? e.slice(1) : e;
                }));
            },
            [h],
          ),
          y = null != (t = null == h ? void 0 : h.options.tone) ? t : "info",
          v = "info" === y ? o.A : l.A;
        return (0, a.jsxs)(c.Provider, {
          value: g,
          children: [
            i,
            h && "editor" === h.options.skin
              ? (0, a.jsx)(m, { request: h, onSettle: f }, h.id)
              : h
                ? (0, a.jsxs)(
                    d.a,
                    {
                      open: !0,
                      onClose: () => f(!1),
                      title: h.options.title,
                      subtitle: h.options.subtitle,
                      icon: (0, a.jsx)(v, { size: 20 }),
                      iconTone: y,
                      size: "md",
                      maskClosable: "danger" !== y,
                      closable: "danger" !== y,
                      footer: (0, a.jsxs)(a.Fragment, {
                        children: [
                          null !== h.options.cancelText &&
                            (0, a.jsx)(d.y, {
                              variant: "ghost",
                              onClick: () => f(!1),
                              children: null != (r = h.options.cancelText) ? r : "取消",
                            }),
                          (0, a.jsx)(d.y, {
                            variant:
                              "danger" === y ? "danger" : "warning" === y ? "warning" : "primary",
                            onClick: () => f(!0),
                            children: null != (n = h.options.confirmText) ? n : "确认",
                          }),
                        ],
                      }),
                      children: [
                        h.options.object && (0, a.jsx)(u, { object: h.options.object }),
                        h.options.body &&
                          (0, a.jsx)("div", {
                            className: "".concat(
                              h.options.object ? "mt-4" : "",
                              " text-sm font-bold leading-relaxed text-text-secondary",
                            ),
                            children: h.options.body,
                          }),
                      ],
                    },
                    h.id,
                  )
                : null,
          ],
        });
      }
      function p() {
        let e = (0, s.useContext)(c);
        if (!e) throw Error("useConfirm 必须在 ConfirmProvider 内使用");
        return e;
      }
    },
    55822: (e, t, r) => {
      "use strict";
      r.d(t, {
        Ak: () => g,
        HP: () => m,
        MV: () => f,
        Rf: () => a,
        X1: () => s,
        am: () => x,
        jD: () => d,
        jL: () => h,
        rm: () => b,
        sj: () => l,
        tX: () => o,
      });
      let a = "__mcblock_banner_base",
        s = "__mcblock_banner_patterns",
        n = [
          "white",
          "orange",
          "magenta",
          "light_blue",
          "yellow",
          "lime",
          "pink",
          "gray",
          "light_gray",
          "cyan",
          "purple",
          "blue",
          "brown",
          "green",
          "red",
          "black",
        ],
        i = new Set(n),
        o = {
          white: [0.9764706, 0.9764706, 0.9764706],
          orange: [0.9019608, 0.49803922, 0.1764706],
          magenta: [0.7647059, 0.3137255, 0.74509805],
          light_blue: [0.39215687, 0.6392157, 0.8117647],
          yellow: [0.8862745, 0.7647059, 0.21568628],
          lime: [0.49803922, 0.78431374, 0.15686275],
          pink: [0.9529412, 0.54509807, 0.654902],
          gray: [0.2784314, 0.30588236, 0.32941177],
          light_gray: [0.61960787, 0.627451, 0.627451],
          cyan: [0.16470589, 0.5254902, 0.59607846],
          purple: [0.5254902, 0.25882354, 0.73333335],
          blue: [0.21568628, 0.27450982, 0.7058824],
          brown: [0.49019608, 0.30588236, 0.1764706],
          green: [0.36862746, 0.5058824, 0.14901961],
          red: [0.7019608, 0.17254902, 0.1764706],
          black: [0.11372549, 0.11372549, 0.12941177],
        },
        l = {
          white: "白色",
          orange: "橙色",
          magenta: "品红色",
          light_blue: "淡蓝色",
          yellow: "黄色",
          lime: "黄绿色",
          pink: "粉红色",
          gray: "灰色",
          light_gray: "淡灰色",
          cyan: "青色",
          purple: "紫色",
          blue: "蓝色",
          brown: "棕色",
          green: "绿色",
          red: "红色",
          black: "黑色",
        };
      function d(e) {
        let t = e.replace("minecraft:", "").match(/^([a-z_]+?)_(wall_)?banner$/);
        return t && i.has(t[1]) ? t[1] : void 0;
      }
      let c = {
        b: "base",
        bl: "square_bottom_left",
        br: "square_bottom_right",
        tl: "square_top_left",
        tr: "square_top_right",
        bs: "stripe_bottom",
        ts: "stripe_top",
        ls: "stripe_left",
        rs: "stripe_right",
        cs: "stripe_center",
        ms: "stripe_middle",
        drs: "stripe_downright",
        dls: "stripe_downleft",
        ss: "small_stripes",
        cr: "straight_cross",
        sc: "cross",
        bt: "triangle_bottom",
        tt: "triangle_top",
        bts: "triangles_bottom",
        tts: "triangles_top",
        ld: "diagonal_left",
        rd: "diagonal_right",
        lud: "diagonal_up_left",
        rud: "diagonal_up_right",
        vh: "half_vertical",
        vhr: "half_vertical_right",
        hh: "half_horizontal",
        hhb: "half_horizontal_bottom",
        bo: "border",
        cbo: "curly_border",
        bri: "bricks",
        gra: "gradient",
        gru: "gradient_up",
        mc: "circle",
        mr: "rhombus",
        cre: "creeper",
        sku: "skull",
        flo: "flower",
        moj: "mojang",
        glb: "globe",
        pig: "piglin",
        flw: "flow",
        gus: "guster",
      };
      Object.fromEntries(
        Object.entries(c).map((e) => {
          let [t, r] = e;
          return [r, t];
        }),
      );
      let u = new Set([
        "base",
        "border",
        "bricks",
        "circle",
        "creeper",
        "cross",
        "curly_border",
        "diagonal_left",
        "diagonal_right",
        "diagonal_up_left",
        "diagonal_up_right",
        "flow",
        "flower",
        "globe",
        "gradient",
        "gradient_up",
        "guster",
        "half_horizontal",
        "half_horizontal_bottom",
        "half_vertical",
        "half_vertical_right",
        "mojang",
        "piglin",
        "rhombus",
        "skull",
        "small_stripes",
        "square_bottom_left",
        "square_bottom_right",
        "square_top_left",
        "square_top_right",
        "straight_cross",
        "stripe_bottom",
        "stripe_center",
        "stripe_downleft",
        "stripe_downright",
        "stripe_left",
        "stripe_middle",
        "stripe_right",
        "stripe_top",
        "triangle_bottom",
        "triangle_top",
        "triangles_bottom",
        "triangles_top",
      ]);
      function m(e) {
        let t = e.replace("minecraft:", "");
        return /(^|_)banner$/.test(t) || /(^|_)wall_banner$/.test(t);
      }
      function b(e) {
        var t, r;
        if ("number" == typeof e && Number.isFinite(e)) return null != (t = n[e]) ? t : void 0;
        let a = String(null != e ? e : "")
          .trim()
          .toLowerCase();
        if (!a) return;
        let s = Number.parseInt(a, 10);
        if (/^\d+$/.test(a) && Number.isFinite(s)) return null != (r = n[s]) ? r : void 0;
        let o = a
          .replace(/^["']|["']$/g, "")
          .replace(/^minecraft:/, "")
          .replace(/^dye_/, "")
          .replace(/_dye$/, "");
        return i.has(o) ? o : void 0;
      }
      function p(e) {
        let t = String(null != e ? e : "")
          .trim()
          .toLowerCase();
        if (!t) return;
        let r = t
            .replace(/^["']|["']$/g, "")
            .replace(/^minecraft:/, "")
            .replace(/^entity\/banner\//, "")
            .replace(/^banner\//, "")
            .replace(/^banner_/, ""),
          a = c[r];
        return a ? ("base" === a ? void 0 : a) : u.has(r) ? ("base" === r ? void 0 : r) : void 0;
      }
      function x(e) {
        if (!e || 0 === e.length) return;
        let t = e
          .map((e) => {
            let t = p(e.pattern),
              r = b(e.color);
            return t && r ? "".concat(t, ":").concat(r) : null;
          })
          .filter((e) => null !== e);
        return t.length > 0 ? t.join("|") : void 0;
      }
      function h(e) {
        if (!e) return [];
        let t = [];
        for (let r of e.split("|")) {
          let [e, a] = r.split(":"),
            s = p(e),
            n = b(a);
          s && n && t.push({ pattern: s, color: n });
        }
        return t;
      }
      function g(e) {
        let t = e.get("Data"),
          r = (null == t ? void 0 : t.isCompound()) ? t : e,
          a = y(e, ["id", "Id"]),
          s = "string" == typeof a ? a.toLowerCase() : "",
          n =
            r.has("Base") ||
            r.has("base") ||
            r.has("base_color") ||
            r.has("Patterns") ||
            r.has("patterns");
        if ((s && !s.includes("banner") && !n) || (!s && !n)) return;
        let i = b(y(r, ["Base", "base", "base_color", "BaseColor", "baseColor"])),
          o = (function (e) {
            let t = (function (e, t) {
              for (let r of t)
                if (e.has(r))
                  try {
                    let t = e.getList(r);
                    if (10 === t.getType()) return t;
                  } catch (e) {}
              return null;
            })(e, ["Patterns", "patterns"]);
            if (!t) return [];
            let r = [];
            for (let e = 0; e < t.length; e++) {
              let a = t.get(e);
              if (!(null == a ? void 0 : a.isCompound())) continue;
              let s = p(y(a, ["Pattern", "pattern", "pattern_id", "PatternId"])),
                n = b(y(a, ["Color", "color", "dye_color", "DyeColor"]));
              s && n && r.push({ pattern: s, color: n });
            }
            return r;
          })(r);
        if (i || 0 !== o.length)
          return { ...(i ? { baseColor: i } : {}), ...(o.length > 0 ? { patterns: o } : {}) };
      }
      function f(e) {
        var t;
        let r = (function (e) {
          if (!(null == e ? void 0 : e.isListOrArray())) return null;
          let t = e.getItems().map((e) => e.getAsNumber());
          return t.length < 3 ? null : [t[0], t[1], t[2]];
        })(null != (t = e.get("Pos")) ? t : e.get("pos"));
        if (r) return r;
        let a = v(e, ["x", "X"]),
          s = v(e, ["y", "Y"]),
          n = v(e, ["z", "Z"]);
        return void 0 !== a && void 0 !== s && void 0 !== n ? [a, s, n] : null;
      }
      function y(e, t) {
        for (let r of t) {
          let t = e.get(r);
          if (t) {
            if (t.isNumber()) return t.getAsNumber();
            if (t.isString()) return t.getAsString();
          }
        }
      }
      function v(e, t) {
        let r = y(e, t);
        if ("number" == typeof r && Number.isFinite(r)) return r;
        if ("string" == typeof r) {
          let e = Number.parseInt(r, 10);
          if (Number.isFinite(e)) return e;
        }
      }
    },
    56743: (e, t, r) => {
      (Promise.resolve().then(r.t.bind(r, 38678, 23)),
        Promise.resolve().then(r.bind(r, 70362)),
        Promise.resolve().then(r.bind(r, 75205)));
    },
    61456: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "trash", "Trash", [
        ["path", { d: "M4 7l16 0", key: "svg-0" }],
        ["path", { d: "M10 11l0 6", key: "svg-1" }],
        ["path", { d: "M14 11l0 6", key: "svg-2" }],
        ["path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" }],
        ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }],
      ]);
    },
    64991: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "cube", "Cube", [
        [
          "path",
          {
            d: "M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718",
            key: "svg-0",
          },
        ],
        ["path", { d: "M12 22v-10", key: "svg-1" }],
        ["path", { d: "M12 12l8.73 -5.04", key: "svg-2" }],
        ["path", { d: "M3.27 6.96l8.73 5.04", key: "svg-3" }],
      ]);
    },
    67812: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "info-circle", "InfoCircle", [
        ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
        ["path", { d: "M12 9h.01", key: "svg-1" }],
        ["path", { d: "M11 12h1v4h1", key: "svg-2" }],
      ]);
    },
    69381: (e, t, r) => {
      "use strict";
      r.d(t, { x: () => l });
      var a = r(95155),
        s = r(12115),
        n = r(25016);
      let i = {
          danger: "bg-error text-text-primary",
          brand: "bg-brand-primary text-text-on-brand",
          neutral: "bg-bg-deep text-text-primary",
        },
        o = { sm: "h-[18px] min-w-[18px] px-1 text-[10px]", md: "h-5 min-w-5 px-1.5 text-[11px]" },
        l = s.forwardRef((e, t) => {
          let { tone: r = "danger", size: s = "sm", className: l, children: d, ...c } = e;
          return (0, a.jsx)("span", {
            ref: t,
            className: (0, n.cn)(
              "box-border inline-flex items-center justify-center rounded-none border-[1.5px] border-border-hard font-body font-extrabold leading-none shadow-none",
              i[r],
              o[s],
              l,
            ),
            tabIndex: -1,
            "data-control-kind": "count",
            "data-control-size": s,
            "data-control-variant": r,
            ...c,
            children: d,
          });
        });
      l.displayName = "CountBadge";
    },
    70362: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => C });
      var a = r(95155),
        s = r(12115),
        n = r(52619),
        i = r.n(n),
        o = r(20063),
        l = r(36489),
        d = r(76784),
        c = r(26260),
        u = r(52398),
        m = r(91986),
        b = r(29080),
        p = r(68595),
        x = r(64991),
        h = r(3235),
        g = r(98015),
        f = r(61456),
        y = r(51750),
        v = r(18559),
        _ = r(53486),
        j = r(25828),
        k = r(97003),
        w = r(44460);
      function N(e) {
        let t = Date.now(),
          r = Math.floor((t - new Date(e).getTime()) / 6e4);
        if (r < 1) return "刚刚";
        if (r < 60) return "".concat(r, " 分钟前");
        let a = Math.floor(r / 60);
        if (a < 24) return "".concat(a, "h 前");
        let s = Math.floor(a / 24);
        return s < 7 ? "".concat(s, " 天前") : new Date(e).toLocaleDateString("zh-CN");
      }
      function z(e) {
        return !e || e <= 0 ? "—" : e >= 1e3 ? "".concat((e / 1e3).toFixed(1), "k") : String(e);
      }
      let S =
        "sld-bcard flex flex-col min-w-0 bg-bg-card border-2 border-border-hard shadow-block-sm transition-all duration-150 hover:border-brand-primary hover:-translate-x-px hover:-translate-y-px hover:shadow-block";
      function C() {
        let [e, t] = (0, s.useState)([]),
          [n, C] = (0, s.useState)(!0),
          [A, I] = (0, s.useState)([]),
          [M, F] = (0, s.useState)(!1),
          [E, P] = (0, s.useState)(null),
          [W, T] = (0, s.useState)(null),
          [B, O] = (0, s.useState)(null),
          [D, $] = (0, s.useState)(null),
          [q, L] = (0, s.useState)(null),
          [U, R] = (0, s.useState)(""),
          J = (0, o.useRouter)(),
          H = (0, o.useSearchParams)(),
          { status: K } = (0, l.useSession)(),
          { promptLogin: G } = (0, c.E)(),
          X = (0, _.S)();
        ((0, s.useEffect)(() => {
          (async () => {
            C(!0);
            try {
              let e = await fetch("/api/studio/works"),
                r = await e.json();
              r.success && r.data && t(r.data);
            } catch (e) {
            } finally {
              C(!1);
            }
          })();
        }, []),
          (0, s.useEffect)(() => {
            let e = !1;
            return (
              (async () => {
                try {
                  let t = await fetch(
                      "/api/buildings?hasProjection=true&limit=7&sort=most-learned",
                    ),
                    r = await t.json();
                  !e && r.success && Array.isArray(r.data) && I(r.data);
                } catch (e) {}
              })(),
              () => {
                e = !0;
              }
            );
          }, []),
          (0, s.useEffect)(() => {
            let e = H.get("importBuildingId");
            if (!e) return;
            let t = !1;
            return (
              (async () => {
                (F(!0), T(null));
                try {
                  let r = await fetch("/api/buildings/".concat(e)),
                    a = await r.json();
                  if (!a.success || !a.data) throw Error(a.error || "建筑不存在");
                  if (t) return;
                  let s = a.data;
                  if ((P(s.name), !s.projectionFileUrl))
                    throw Error("该建筑没有投影文件，无法在投影编辑器中打开");
                  ((0, v.Gq)(),
                    sessionStorage.setItem("studio_source_type", "projection_url"),
                    sessionStorage.setItem("studio_building_name", s.name),
                    sessionStorage.setItem("studio_building_id", s.id),
                    fetch("/api/studio/usage", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        sourceType: "building",
                        buildingId: s.id,
                        fileName: s.name,
                      }),
                    }).catch(() => {}),
                    J.replace("/studio/editor"));
                } catch (e) {
                  if (t) return;
                  (T((null == e ? void 0 : e.message) || "导入失败"), F(!1));
                }
              })(),
              () => {
                t = !0;
              }
            );
          }, [H, J]));
        let Q = (0, s.useCallback)(
            (e) => {
              !1 !== e.hasProjection &&
                (F(!0),
                T(null),
                P(e.name),
                (0, v.Gq)(),
                sessionStorage.setItem("studio_source_type", "projection_url"),
                sessionStorage.setItem("studio_building_name", e.name),
                sessionStorage.setItem("studio_building_id", e.id),
                fetch("/api/studio/usage", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    sourceType: "building",
                    buildingId: e.id,
                    fileName: e.name,
                  }),
                }).catch(() => {}),
                J.push("/studio/editor"));
            },
            [J],
          ),
          V = async (e) => {
            if (
              await X({
                title: "删除投影编辑作品？",
                subtitle: "作品数据将永久清除，无法恢复",
                body: "删除后，这份作品及其编辑记录会从作品列表中移除。",
                tone: "danger",
                confirmText: "永久删除",
                object: {
                  name: e.name,
                  meta: ""
                    .concat(e.blockCount.toLocaleString(), " 方块 \xb7 ")
                    .concat(e.blockTypes, " 种 \xb7 ")
                    .concat(N(e.updatedAt)),
                  thumbnail: e.thumbnailUrl,
                },
              })
            )
              try {
                let r = await fetch("/api/studio/works/".concat(e.id), { method: "DELETE" });
                (await r.json()).success && t((t) => t.filter((t) => t.id !== e.id));
              } catch (e) {
                console.error("删除作品失败");
              }
          },
          Z = async (e, r) => {
            let a = (0, m.A1)(r);
            if (a) {
              try {
                let r = await fetch("/api/studio/works/".concat(e), {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: a }),
                });
                (await r.json()).success &&
                  t((t) => t.map((t) => (t.id === e ? { ...t, name: a } : t)));
              } catch (e) {
                console.error("重命名失败");
              }
              L(null);
            }
          },
          Y = (0, s.useCallback)(
            async function (e) {
              let a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "edit";
              if ("export" === a) {
                (O(null), $(e.id));
                try {
                  var s;
                  let r = await fetch("/api/studio/works/".concat(e.id, "/export"));
                  if (401 === r.status)
                    return void G({ action: "导出投影", onSuccess: () => Y(e, "export") });
                  if (!r.ok) {
                    let e = "导出失败，请重试";
                    try {
                      let t = await r.json();
                      "string" == typeof (null == t ? void 0 : t.error) && (e = t.error);
                    } catch (e) {}
                    throw Error(e);
                  }
                  let a = await r.blob(),
                    n = r.headers.get("X-File-Name"),
                    i = ""
                      .concat(
                        ((s = e.name || "blueprint"),
                        ((0, m.A1)(s) || "blueprint")
                          .replace(/[\\/:*?"<>|]/g, "-")
                          .replace(/\s+/g, "-")
                          .slice(0, 80)),
                        ".",
                      )
                      .concat(e.sourceFormat || "litematic"),
                    o = n ? decodeURIComponent(n) : i,
                    l = URL.createObjectURL(a),
                    c = document.createElement("a");
                  ((c.href = l),
                    (c.download = o),
                    document.body.appendChild(c),
                    c.click(),
                    document.body.removeChild(c),
                    URL.revokeObjectURL(l));
                  try {
                    (0, d.sendGAEvent)("event", "studio_export", {
                      work_id: e.id,
                      work_name: e.name || void 0,
                      format: e.sourceFormat || "litematic",
                    });
                  } catch (e) {}
                  t((t) => t.map((t) => (t.id === e.id ? { ...t, status: "exported" } : t)));
                } catch (e) {
                  O(e instanceof Error ? e.message : "导出失败，请重试");
                } finally {
                  $(null);
                }
                return;
              }
              try {
                let t = await fetch("/api/studio/works/".concat(e.id)),
                  a = await t.json();
                if (!a.success || !a.data) return;
                let s = a.data;
                if (s.originalData) {
                  ((0, v.Gq)(), sessionStorage.setItem("studio_original_file", s.originalData));
                  let t = atob(s.originalData),
                    a = new Uint8Array(t.length);
                  for (let e = 0; e < t.length; e++) a[e] = t.charCodeAt(e);
                  let { parseProjectionFile: n } = await Promise.resolve().then(r.bind(r, 7882)),
                    i = (0, m.ew)(s.name, e.name || "blueprint"),
                    o = s.sourceFormat || e.sourceFormat || "litematic",
                    l = new File([a], "".concat(i, ".").concat(o)),
                    d = await n(l);
                  for (let e of ((d.name = i),
                  (function (e) {
                    if (!e) return [];
                    try {
                      let t = JSON.parse(e);
                      if (Array.isArray(t)) return t;
                      if (t && Array.isArray(t.replacements)) return t.replacements;
                    } catch (e) {}
                    return [];
                  })(s.replacements)))
                    (0, u.ym)(d.blocks, e);
                  let c = new Set(d.blocks.map((e) => e.blockId));
                  ((d.blockTypeCount = c.size),
                    sessionStorage.setItem("studio_voxel_model", JSON.stringify(d)),
                    sessionStorage.setItem("studio_source_type", "projection"),
                    sessionStorage.setItem("studio_work_id", e.id),
                    s.editorState &&
                      sessionStorage.setItem("studio_editor_state_remote", s.editorState),
                    J.push("/studio/editor"));
                }
              } catch (e) {
                console.error("加载作品失败:", e);
              }
            },
            [J, G],
          );
        (0, s.useEffect)(() => {
          let e = H.get("work");
          e && Y({ id: e });
        }, [H, Y]);
        let ee = (0, s.useMemo)(
            () =>
              [...e].sort(
                (e, t) => new Date(t.updatedAt).getTime() - new Date(e.updatedAt).getTime(),
              ),
            [e],
          ),
          et = ee.slice(0, 7),
          er = ee.length > 0,
          ea = "authenticated" === K;
        return (0, a.jsxs)(a.Fragment, {
          children: [
            B &&
              (0, a.jsxs)("div", {
                className:
                  "flex items-center justify-between gap-3 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-error shadow-block-sm",
                children: [
                  (0, a.jsxs)("span", {
                    className: "min-w-0 flex-1 text-[13px] font-bold text-text-primary",
                    children: [
                      (0, a.jsx)(b.A, { size: 16, className: "inline mr-2 text-error" }),
                      B,
                    ],
                  }),
                  (0, a.jsx)(k.$, {
                    size: "sm",
                    variant: "secondary",
                    onClick: () => O(null),
                    className: "shrink-0",
                    children: "关闭",
                  }),
                ],
              }),
            (0, a.jsxs)("section", {
              className: "mt-[clamp(44px,5vw,88px)]",
              children: [
                (0, a.jsxs)("div", {
                  className: "flex items-center gap-2.5 mb-3",
                  children: [
                    (0, a.jsx)("span", {
                      className:
                        "w-[3px] h-4 shrink-0 bg-brand-primary border-2 border-border-hard",
                    }),
                    (0, a.jsx)("h2", {
                      className: "text-sm font-black text-text-primary",
                      children: er ? "最近作品" : "从建筑库直接打开",
                    }),
                    (0, a.jsx)("span", {
                      className: "hidden min-[900px]:inline text-xs font-bold text-text-disabled",
                      children: er
                        ? "".concat(ee.length, " 个")
                        : "不用自己找文件，点一份就能进编辑器",
                    }),
                    (0, a.jsx)("span", { className: "flex-1 h-0.5 bg-bg-elevated" }),
                    (0, a.jsxs)(i(), {
                      href: er ? "/profile?tab=studio" : "/buildings",
                      className:
                        "shrink-0 inline-flex items-center gap-1 text-[13px] font-extrabold text-text-secondary hover:text-brand-primary transition-colors",
                      children: [er ? "查看全部" : "浏览建筑库", (0, a.jsx)(p.A, { size: 14 })],
                    }),
                  ],
                }),
                M &&
                  (0, a.jsxs)("div", {
                    className:
                      "flex items-center gap-3 mb-3 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-brand-primary shadow-block-sm",
                    children: [
                      (0, a.jsx)(y.y, { size: "xs" }),
                      (0, a.jsxs)("span", {
                        className: "min-w-0 flex-1 text-[13px] font-bold text-text-primary",
                        children: [
                          "正在从建筑库导入 ",
                          (0, a.jsx)("b", { className: "font-black", children: E }),
                          "…",
                        ],
                      }),
                      (0, a.jsx)("span", {
                        className: "hidden min-[641px]:inline text-xs font-bold text-text-disabled",
                        children: "导入后直接进编辑器",
                      }),
                    ],
                  }),
                W &&
                  (0, a.jsxs)("div", {
                    className:
                      "flex items-center gap-3 flex-wrap mb-3 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-error shadow-block-sm",
                    children: [
                      (0, a.jsx)(b.A, { size: 18, className: "shrink-0 text-error" }),
                      (0, a.jsxs)("span", {
                        className: "min-w-0 flex-1 text-[13px] font-bold text-text-primary",
                        children: [
                          "导入失败 —— ",
                          E ? (0, a.jsx)("b", { className: "font-black", children: E }) : "该建筑",
                          " 的投影文件暂时取不到",
                        ],
                      }),
                      (0, a.jsx)(k.$, {
                        size: "sm",
                        variant: "secondary",
                        className: "shrink-0",
                        onClick: () => {
                          (T(null), P(null), J.replace("/studio"));
                        },
                        children: "重试",
                      }),
                    ],
                  }),
                (0, a.jsxs)("div", {
                  className: "sld-bgrid",
                  children: [
                    er
                      ? et.map((e) => {
                          var t, r, s;
                          let n =
                              "exported" === (t = e.status)
                                ? { text: "已导出", tone: "success" }
                                : "saved" === t || "published" === t
                                  ? { text: "已保存", tone: "info" }
                                  : { text: "草稿", tone: "warning" },
                            i =
                              "exported" === (r = e.status)
                                ? "bg-brand-primary"
                                : "saved" === r || "published" === r
                                  ? "bg-info"
                                  : "bg-warning";
                          return (0, a.jsxs)(
                            "div",
                            {
                              className: S,
                              children: [
                                (0, a.jsxs)("button", {
                                  type: "button",
                                  onClick: () => Y(e),
                                  className:
                                    "relative aspect-[4/3] bg-[#191919] border-b-2 border-border-hard overflow-hidden cursor-pointer",
                                  children: [
                                    (0, a.jsx)("span", {
                                      className: "absolute left-0 top-0 bottom-0 w-1 z-[3] ".concat(
                                        i,
                                      ),
                                    }),
                                    e.thumbnailUrl
                                      ? (0, a.jsx)("img", {
                                          src: e.thumbnailUrl,
                                          alt: e.name,
                                          className:
                                            "absolute inset-[6%_8%] w-auto h-auto max-w-[84%] max-h-[88%] m-auto object-contain [filter:drop-shadow(4px_5px_0_rgba(0,0,0,0.3))]",
                                        })
                                      : (0, a.jsx)(x.A, {
                                          size: 34,
                                          className: "absolute inset-0 m-auto ".concat(
                                            "exported" === (s = e.status)
                                              ? "text-[rgba(68,178,68,0.55)]"
                                              : "saved" === s || "published" === s
                                                ? "text-[rgba(91,155,213,0.6)]"
                                                : "text-[rgba(251,191,36,0.5)]",
                                            " drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]",
                                          ),
                                        }),
                                    (0, a.jsxs)(j.E, {
                                      tone: n.tone,
                                      variant: "solid",
                                      size: "sm",
                                      className:
                                        "absolute left-2 top-1.5 z-[3] !h-[18px] !gap-1 !px-[5px] !text-[9px] !font-black !bg-bg-primary !text-text-primary !border-border-hard",
                                      children: [
                                        (0, a.jsx)("span", {
                                          className:
                                            "w-1.5 h-1.5 border border-border-hard ".concat(i),
                                        }),
                                        n.text,
                                      ],
                                    }),
                                    (0, a.jsxs)("span", {
                                      className:
                                        "absolute top-1.5 right-2 z-[3] px-[5px] py-[2px] text-[9px] font-pixel bg-bg-primary border-2 border-border-hard text-text-secondary",
                                      children: [".", e.sourceFormat],
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "px-[9px] pt-[7px] pb-1.5 min-w-0",
                                  children: [
                                    q === e.id
                                      ? (0, a.jsx)("input", {
                                          autoFocus: !0,
                                          value: U,
                                          onChange: (e) => R(e.target.value),
                                          onKeyDown: (t) => {
                                            ("Enter" === t.key && Z(e.id, U),
                                              "Escape" === t.key && L(null));
                                          },
                                          onBlur: () => Z(e.id, U),
                                          className:
                                            "w-full text-xs font-black text-text-primary bg-bg-card border-2 border-brand-primary px-1.5 py-0.5 focus:outline-none",
                                          maxLength: 50,
                                        })
                                      : (0, a.jsx)("button", {
                                          type: "button",
                                          onClick: () => Y(e),
                                          className:
                                            "block w-full text-left text-xs font-black text-text-primary truncate cursor-pointer",
                                          children: e.name,
                                        }),
                                    (0, a.jsxs)("div", {
                                      className:
                                        "mt-px text-[10px] font-semibold text-text-disabled truncate",
                                      children: [
                                        (0, a.jsx)("span", {
                                          className: "font-pixel text-[11px] text-text-secondary",
                                          children: z(e.blockCount),
                                        }),
                                        " 块 \xb7 ",
                                        N(e.updatedAt),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "grid grid-cols-3 gap-0.5 px-1.5 pb-1.5",
                                  children: [
                                    (0, a.jsx)(w.K, {
                                      label: "重命名",
                                      size: "xs",
                                      variant: "secondary",
                                      className: "!w-full",
                                      onClick: (t) => {
                                        (t.stopPropagation(), L(e.id), R(e.name));
                                      },
                                      children: (0, a.jsx)(h.A, { size: 13 }),
                                    }),
                                    (0, a.jsx)(w.K, {
                                      label: "导出",
                                      size: "xs",
                                      variant: "secondary",
                                      className: "!w-full",
                                      disabled: D === e.id,
                                      onClick: (t) => {
                                        (t.stopPropagation(), Y(e, "export"));
                                      },
                                      children:
                                        D === e.id
                                          ? (0, a.jsx)(y.y, { size: "xs" })
                                          : (0, a.jsx)(g.A, { size: 13 }),
                                    }),
                                    (0, a.jsx)(w.K, {
                                      label: "删除作品",
                                      size: "xs",
                                      variant: "danger",
                                      className: "!w-full",
                                      onClick: (t) => {
                                        (t.stopPropagation(), V(e));
                                      },
                                      children: (0, a.jsx)(f.A, { size: 13 }),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            e.id,
                          );
                        })
                      : A.map((e) =>
                          (0, a.jsxs)(
                            "div",
                            {
                              className: S,
                              children: [
                                (0, a.jsxs)("button", {
                                  type: "button",
                                  onClick: () => Q(e),
                                  disabled: M,
                                  className:
                                    "relative aspect-[4/3] bg-[#191919] border-b-2 border-border-hard overflow-hidden cursor-pointer",
                                  children: [
                                    e.coverImage
                                      ? (0, a.jsx)("img", {
                                          src: e.coverImage,
                                          alt: e.name,
                                          className:
                                            "absolute inset-[6%] w-auto h-auto max-w-[88%] max-h-[88%] m-auto object-contain",
                                        })
                                      : (0, a.jsx)(x.A, {
                                          size: 34,
                                          className:
                                            "absolute inset-0 m-auto text-text-disabled/40",
                                        }),
                                    (0, a.jsx)("span", {
                                      className:
                                        "absolute top-1.5 right-2 z-[3] px-[5px] py-[2px] text-[9px] font-pixel bg-bg-primary border-2 border-border-hard text-text-secondary",
                                      children: ".litematic",
                                    }),
                                    M &&
                                      E === e.name &&
                                      (0, a.jsx)("span", {
                                        className:
                                          "absolute inset-0 z-[4] bg-bg-primary/55 shadow-[inset_0_0_0_3px_var(--color-brand-primary)]",
                                      }),
                                  ],
                                }),
                                (0, a.jsxs)("button", {
                                  type: "button",
                                  onClick: () => Q(e),
                                  disabled: M,
                                  className:
                                    "px-[9px] pt-[7px] pb-1.5 min-w-0 text-left cursor-pointer",
                                  children: [
                                    (0, a.jsx)("div", {
                                      className: "text-xs font-black text-text-primary truncate",
                                      children: e.name,
                                    }),
                                    (0, a.jsxs)("div", {
                                      className:
                                        "mt-px text-[10px] font-semibold text-text-disabled truncate",
                                      children: [
                                        (0, a.jsx)("span", {
                                          className: "font-pixel text-[11px] text-text-secondary",
                                          children: z(e.blockCount),
                                        }),
                                        " 块 \xb7 ",
                                        e.projectionAuthor || "未知作者",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                    (er ? ee.length > et.length : A.length > 0) &&
                      (0, a.jsxs)(i(), {
                        href: er ? "/profile?tab=studio" : "/buildings",
                        className:
                          "flex flex-col items-center justify-center gap-1.5 min-w-0 p-3 bg-bg-card border-2 border-border-hard shadow-block-sm text-xs font-extrabold text-text-disabled text-center transition-all duration-150 hover:border-brand-primary hover:text-brand-primary hover:-translate-x-px hover:-translate-y-px hover:shadow-block",
                        children: [
                          (0, a.jsx)(p.A, { size: 20 }),
                          (0, a.jsx)("span", {
                            children: er
                              ? "还有 ".concat(ee.length - et.length, " 个作品")
                              : "浏览建筑库",
                          }),
                          (0, a.jsx)("span", {
                            className: "text-[10px] text-text-disabled",
                            children: er ? "个人中心 →" : "按版本 / 尺寸筛选 →",
                          }),
                        ],
                      }),
                  ],
                }),
                !ea &&
                  (0, a.jsx)("div", {
                    className: "mt-2.5 text-xs font-bold text-text-disabled",
                    children:
                      "浏览和编辑不用登录；导出投影需要登录，登录后会接着把刚才那次导出做完。作品存进账号后，换台设备还能接着改。",
                  }),
                ea &&
                  !n &&
                  !er &&
                  (0, a.jsx)("div", {
                    className: "mt-2.5 text-xs font-bold text-text-disabled",
                    children:
                      "还没有保存过作品。在编辑器里点「保存」，作品会出现在这里。上面这些是建筑库里可以直接打开的投影。",
                  }),
              ],
            }),
          ],
        });
      }
    },
    75205: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => k });
      var a = r(95155),
        s = r(12115),
        n = r(20063),
        i = r(71442),
        o = r(64991),
        l = r(77252),
        d = r(15532),
        c = r(95585),
        u = r(51750),
        m = r(18559),
        b = r(44478),
        p = r(97003),
        x = r(1855);
      let h = [
          { value: "all", label: "全部" },
          { value: "beginner", label: "新手" },
          { value: "intermediate", label: "进阶" },
          { value: "advanced", label: "高级" },
          { value: "expert", label: "大师" },
        ],
        g = [
          { value: "latest", label: "最新" },
          { value: "layers", label: "层数↓" },
          { value: "popular", label: "热门" },
        ];
      function f(e) {
        let { open: t, onClose: r } = e,
          [f, y] = (0, s.useState)([]),
          [v, _] = (0, s.useState)(!1),
          [j, k] = (0, s.useState)(""),
          [w, N] = (0, s.useState)(1),
          [z, S] = (0, s.useState)(1),
          [C, A] = (0, s.useState)("all"),
          [I, M] = (0, s.useState)("latest"),
          F = (0, n.useRouter)(),
          E = (0, s.useCallback)(async (e, t, r, a) => {
            _(!0);
            try {
              let n = new URLSearchParams({
                page: String(t),
                limit: "12",
                hasProjection: "true",
                sort: a,
              });
              (e && n.set("search", e), r && "all" !== r && n.set("difficulty", r));
              let i = await fetch("/api/buildings?".concat(n)),
                o = await i.json();
              if (o.success) {
                var s;
                (y(o.data), S((null == (s = o.pagination) ? void 0 : s.totalPages) || 1));
              }
            } catch (e) {
              console.error("获取建筑列表失败:", e);
            } finally {
              _(!1);
            }
          }, []);
        (0, s.useEffect)(() => {
          t && E(j, w, C, I);
        }, [t, j, w, C, I, E]);
        let P = (0, s.useCallback)(
            (e) => {
              e.hasProjection &&
                ((0, m.Gq)(),
                sessionStorage.setItem("studio_source_type", "projection_url"),
                sessionStorage.setItem("studio_building_name", e.name),
                sessionStorage.setItem("studio_building_id", e.id),
                fetch("/api/studio/usage", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    sourceType: "building",
                    buildingId: e.id,
                    fileName: e.name,
                  }),
                }).catch(() => {}),
                r(),
                F.push("/studio/editor"));
            },
            [r, F],
          ),
          W = (0, s.useCallback)((e) => {
            (k(e.target.value), N(1));
          }, []),
          T = (0, s.useCallback)((e) => {
            (A(e), N(1));
          }, []),
          B = (0, s.useCallback)((e) => {
            (M(e), N(1));
          }, []);
        return (0, a.jsxs)(i.a, {
          open: t,
          onClose: r,
          title: "从建筑库导入",
          subtitle: "选择一个建筑投影加载到编辑器",
          icon: (0, a.jsx)(o.A, { size: 20 }),
          size: "xl",
          bodyClassName: "!p-3.5 !max-h-none",
          children: [
            (0, a.jsxs)("div", {
              className:
                "flex h-11 items-center gap-2.5 border-2 border-border-hard bg-bg-elevated px-3 sm:h-9 mb-3",
              children: [
                (0, a.jsx)(l.A, { size: 15, className: "flex-none text-text-muted" }),
                (0, a.jsx)("input", {
                  type: "text",
                  value: j,
                  onChange: W,
                  placeholder: "搜索建筑名称...",
                  className:
                    "h-full flex-1 min-w-0 bg-transparent border-none outline-none text-text-primary text-sm font-bold placeholder:text-text-muted",
                }),
              ],
            }),
            (0, a.jsxs)("div", {
              className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3",
              children: [
                (0, a.jsxs)("div", {
                  className: "flex items-center gap-1.5",
                  children: [
                    (0, a.jsx)("span", {
                      className:
                        "text-[11px] font-extrabold text-text-muted uppercase tracking-wide shrink-0",
                      children: "难度",
                    }),
                    (0, a.jsx)("div", {
                      className: "flex flex-wrap gap-1",
                      children: h.map((e) =>
                        (0, a.jsx)(
                          x.$,
                          {
                            size: "sm",
                            selected: C === e.value,
                            onClick: () => T(e.value),
                            children: e.label,
                          },
                          e.value,
                        ),
                      ),
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: "flex items-center gap-1.5",
                  children: [
                    (0, a.jsx)("span", {
                      className:
                        "text-[11px] font-extrabold text-text-muted uppercase tracking-wide shrink-0",
                      children: "排序",
                    }),
                    (0, a.jsx)("div", {
                      className: "flex flex-wrap gap-1",
                      children: g.map((e) =>
                        (0, a.jsx)(
                          x.$,
                          {
                            size: "sm",
                            selected: I === e.value,
                            onClick: () => B(e.value),
                            children: e.label,
                          },
                          e.value,
                        ),
                      ),
                    }),
                  ],
                }),
              ],
            }),
            v
              ? (0, a.jsx)("div", {
                  className: "flex items-center justify-center min-h-[200px] sm:min-h-[380px]",
                  children: (0, a.jsx)(u.y, { size: "md" }),
                })
              : 0 === f.length
                ? (0, a.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center min-h-[200px] sm:min-h-[380px]",
                    children: [
                      (0, a.jsx)(o.A, { size: 28, className: "text-text-muted/40 mb-2" }),
                      (0, a.jsx)("p", {
                        className: "text-text-muted text-xs font-bold",
                        children: "没有找到建筑",
                      }),
                    ],
                  })
                : (0, a.jsx)("div", {
                    className:
                      "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[360px] sm:max-h-[420px] overflow-y-auto cn4-scroll pr-0.5 content-start",
                    children: f.map((e) => {
                      let t = (0, b.g)(e.difficulty);
                      return (0, a.jsxs)(
                        "button",
                        {
                          type: "button",
                          onClick: () => P(e),
                          disabled: !e.hasProjection,
                          className:
                            "bg-bg-elevated border-2 border-border-hard shadow-block-xs overflow-hidden text-left transition-all duration-150 group ".concat(
                              e.hasProjection
                                ? "hover:shadow-block-sm hover:-translate-x-px hover:-translate-y-px hover:border-brand-primary active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                : "opacity-40 cursor-not-allowed",
                            ),
                          children: [
                            (0, a.jsxs)("div", {
                              className:
                                "aspect-[3/2] bg-bg-primary border-b-2 border-border-hard shadow-[inset_2px_2px_0_rgba(0,0,0,.35)] overflow-hidden relative",
                              children: [
                                e.coverImage
                                  ? (0, a.jsx)("img", {
                                      src: e.coverImage,
                                      alt: e.name,
                                      className:
                                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-150",
                                    })
                                  : (0, a.jsx)("div", {
                                      className: "w-full h-full flex items-center justify-center",
                                      children: (0, a.jsx)(o.A, {
                                        size: 20,
                                        className: "text-text-muted/30",
                                      }),
                                    }),
                                e.height &&
                                  (0, a.jsxs)("span", {
                                    className:
                                      "absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 border-2 border-border-hard text-[10px] font-extrabold text-text-secondary font-mono leading-tight",
                                    children: [e.height, "层"],
                                  }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className: "p-1.5 px-2",
                              children: [
                                (0, a.jsx)("p", {
                                  className: "text-xs font-extrabold text-text-primary truncate",
                                  children: e.name,
                                }),
                                (0, a.jsxs)("div", {
                                  className: "flex items-center gap-1.5 mt-0.5",
                                  children: [
                                    e.difficulty &&
                                      (0, a.jsxs)("span", {
                                        className:
                                          "inline-flex items-center gap-1 text-[10px] font-bold text-text-secondary",
                                        children: [
                                          (0, a.jsx)("span", {
                                            className: "w-1.5 h-1.5 border-2 border-border-hard",
                                            style: { background: t.bg },
                                          }),
                                          t.label,
                                        ],
                                      }),
                                    e.projectionAuthor &&
                                      (0, a.jsx)("span", {
                                        className:
                                          "text-[10px] font-semibold text-text-muted ml-auto truncate max-w-[60px]",
                                        children: e.projectionAuthor,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        e.id,
                      );
                    }),
                  }),
            z > 1 &&
              (0, a.jsxs)("div", {
                className:
                  "flex items-center justify-center gap-2.5 pt-2.5 mt-3 border-t-2 border-border-hard",
                children: [
                  (0, a.jsxs)(p.$, {
                    size: "sm",
                    variant: "secondary",
                    onClick: () => N((e) => Math.max(1, e - 1)),
                    disabled: w <= 1,
                    children: [(0, a.jsx)(d.A, { size: 14 }), "上一页"],
                  }),
                  (0, a.jsxs)("span", {
                    className: "text-xs font-extrabold text-text-muted tabular-nums font-mono",
                    children: [w, " / ", z],
                  }),
                  (0, a.jsxs)(p.$, {
                    size: "sm",
                    variant: "secondary",
                    onClick: () => N((e) => Math.min(z, e + 1)),
                    disabled: w >= z,
                    children: ["下一页", (0, a.jsx)(c.A, { size: 14 })],
                  }),
                ],
              }),
          ],
        });
      }
      var y = r(7882),
        v = r(46),
        _ = r(29080),
        j = r(45966);
      function k() {
        let [e, t] = (0, s.useState)(!1),
          {
            isDragging: r,
            parsing: i,
            error: l,
            pendingFile: d,
            fileInputRef: c,
            handleDrop: b,
            handleDragOver: x,
            handleDragLeave: h,
            handleInputChange: g,
            openFilePicker: k,
          } = (function () {
            let [e, t] = (0, s.useState)(!1),
              [r, a] = (0, s.useState)(!1),
              [i, o] = (0, s.useState)(null),
              [l, d] = (0, s.useState)(null),
              c = (0, s.useRef)(null),
              u = (0, n.useRouter)(),
              b = (0, s.useCallback)(
                async (e) => {
                  if (
                    (o(null),
                    d({ name: e.name, sizeMB: (e.size / 1024 / 1024).toFixed(1) }),
                    !(0, y.up)(e.name))
                  )
                    return void o("不支持的文件格式。支持 .litematic、.schem");
                  a(!0);
                  try {
                    let t = await e.arrayBuffer(),
                      r = await (0, y.parseProjectionFile)(e);
                    (0, m.Gq)();
                    let a = JSON.stringify(r);
                    try {
                      sessionStorage.setItem("studio_voxel_model", a);
                    } catch (e) {
                      throw (
                        sessionStorage.removeItem("studio_voxel_model"),
                        sessionStorage.removeItem("studio_source_type"),
                        sessionStorage.removeItem("studio_original_file"),
                        Error(
                          "模型数据过大，当前浏览器无法完整载入。为避免方块被截断，请先换用更小的投影文件。",
                        )
                      );
                    }
                    sessionStorage.setItem("studio_source_type", "projection");
                    try {
                      let e = new Uint8Array(t),
                        r = "";
                      for (let t = 0; t < e.length; t++) r += String.fromCharCode(e[t]);
                      sessionStorage.setItem("studio_original_file", btoa(r));
                    } catch (e) {
                      throw (
                        sessionStorage.removeItem("studio_voxel_model"),
                        sessionStorage.removeItem("studio_source_type"),
                        sessionStorage.removeItem("studio_original_file"),
                        Error(
                          "原始投影文件过大，当前浏览器无法保留完整导出数据。请先压缩或拆分投影文件后再导入。",
                        )
                      );
                    }
                    (fetch("/api/studio/usage", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        sourceType: "projection",
                        fileName: r.name,
                        blockCount: r.totalBlockCount,
                        blockTypes: r.blockTypeCount,
                      }),
                    }).catch(() => {}),
                      u.push("/studio/editor"));
                  } catch (e) {
                    o(e instanceof Error ? e.message : "文件解析失败，请检查文件格式");
                  } finally {
                    a(!1);
                  }
                },
                [u],
              ),
              p = (0, s.useCallback)(
                (e) => {
                  (e.preventDefault(), t(!1));
                  let r = e.dataTransfer.files[0];
                  r && b(r);
                },
                [b],
              ),
              x = (0, s.useCallback)((e) => {
                (e.preventDefault(), t(!0));
              }, []),
              h = (0, s.useCallback)((e) => {
                (e.preventDefault(), t(!1));
              }, []),
              g = (0, s.useCallback)(() => {
                var e;
                r || null == (e = c.current) || e.click();
              }, [r]),
              f = (0, s.useCallback)(
                (e) => {
                  var t;
                  let r = null == (t = e.target.files) ? void 0 : t[0];
                  (r && b(r), c.current && (c.current.value = ""));
                },
                [b],
              );
            return {
              isDragging: e,
              parsing: r,
              error: i,
              pendingFile: l,
              fileInputRef: c,
              handleFile: b,
              handleDrop: p,
              handleDragOver: x,
              handleDragLeave: h,
              handleInputChange: f,
              openFilePicker: g,
            };
          })();
        return (0, a.jsxs)(a.Fragment, {
          children: [
            l &&
              (0, a.jsxs)("div", {
                className:
                  "flex items-center gap-2.5 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-error shadow-block-sm",
                children: [
                  (0, a.jsx)(_.A, { size: 18, className: "shrink-0 text-error" }),
                  (0, a.jsxs)("span", {
                    className: "min-w-0 flex-1 text-[13px] font-bold text-text-primary",
                    children: [d ? "".concat(d.name, " 打开失败 —— ") : "", l],
                  }),
                  (0, a.jsx)(p.$, {
                    size: "sm",
                    variant: "secondary",
                    onClick: k,
                    className: "shrink-0",
                    children: "重新选择",
                  }),
                ],
              }),
            (0, a.jsxs)("div", {
              onClick: (e) => {
                e.target.closest("[data-no-drop-click]") || k();
              },
              onDrop: b,
              onDragOver: x,
              onDragLeave: h,
              className: "sld-bar".concat(r ? " is-drag" : ""),
              children: [
                (0, a.jsx)("input", {
                  ref: c,
                  type: "file",
                  accept: ".litematic,.schem",
                  onChange: g,
                  className: "hidden",
                }),
                (0, a.jsx)("span", {
                  className: "sld-bar-ico",
                  children: i
                    ? (0, a.jsx)(u.y, { size: "md" })
                    : (0, a.jsx)(j.A, { className: "w-[42px] h-[42px]" }),
                }),
                (0, a.jsx)("div", {
                  className: "sld-bar-mid",
                  children: i
                    ? (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsx)("div", { className: "sld-bar-t", children: "解析中…" }),
                          (0, a.jsxs)("div", {
                            className: "sld-bar-note",
                            children: [
                              d ? "".concat(d.name, " \xb7 ").concat(d.sizeMB, " MB　\xb7　") : "",
                              "在本机解析，文件不上传",
                            ],
                          }),
                        ],
                      })
                    : (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsx)("div", {
                            className: "sld-bar-t",
                            children: r ? "松手即可打开" : "拖拽投影到这里",
                          }),
                          (0, a.jsxs)("div", {
                            className: "sld-bar-t2",
                            children: [
                              "或 ",
                              (0, a.jsx)("span", { className: "pick", children: "点击选择文件" }),
                            ],
                          }),
                          (0, a.jsx)("div", {
                            className: "sld-bar-meta",
                            children: [".litematic", ".schem"].map((e) =>
                              (0, a.jsx)("span", { className: "sld-fmt", children: e }, e),
                            ),
                          }),
                          (0, a.jsxs)("div", {
                            className: "sld-bar-note",
                            children: [
                              "单份最大 ",
                              (0, a.jsx)("b", { children: v.wK }),
                              " MB　\xb7　保存到账号建议 ≤",
                              (0, a.jsx)("b", { children: v.qq }),
                              " MB　\xb7　在本机解析，文件不上传",
                            ],
                          }),
                        ],
                      }),
                }),
                (0, a.jsx)("div", {
                  "data-no-drop-click": !0,
                  className: "sld-bar-acts",
                  children: (0, a.jsxs)(p.$, {
                    size: "md",
                    variant: "primary",
                    disabled: i,
                    onClick: (e) => {
                      (e.stopPropagation(), t(!0));
                    },
                    children: [(0, a.jsx)(o.A, { size: 15 }), "从建筑库导入"],
                  }),
                }),
              ],
            }),
            (0, a.jsx)(f, { open: e, onClose: () => t(!1) }),
          ],
        });
      }
    },
    75342: (e, t, r) => {
      "use strict";
      r.d(t, { Hp: () => l, OS: () => s, Vs: () => i, o: () => o });
      let a = [
          { name: "alban", size: [1, 1] },
          { name: "aztec", size: [1, 1] },
          { name: "aztec2", size: [1, 1] },
          { name: "backyard", size: [3, 4] },
          { name: "baroque", size: [2, 2] },
          { name: "bomb", size: [1, 1] },
          { name: "bouquet", size: [3, 3] },
          { name: "burning_skull", size: [4, 4] },
          { name: "bust", size: [2, 2] },
          { name: "cavebird", size: [3, 3] },
          { name: "changing", size: [4, 2] },
          { name: "cotan", size: [3, 3] },
          { name: "courbet", size: [2, 1] },
          { name: "creebet", size: [2, 1] },
          { name: "donkey_kong", size: [4, 3] },
          { name: "earth", size: [2, 2] },
          { name: "endboss", size: [3, 3] },
          { name: "fern", size: [3, 3] },
          { name: "fighters", size: [4, 2] },
          { name: "finding", size: [4, 2] },
          { name: "fire", size: [2, 2] },
          { name: "graham", size: [1, 2] },
          { name: "humble", size: [2, 2] },
          { name: "kebab", size: [1, 1] },
          { name: "lowmist", size: [4, 2] },
          { name: "match", size: [2, 2] },
          { name: "meditative", size: [1, 1] },
          { name: "orb", size: [4, 4] },
          { name: "owlemons", size: [3, 3] },
          { name: "passage", size: [4, 2] },
          { name: "pigscene", size: [4, 4] },
          { name: "plant", size: [1, 1] },
          { name: "pointer", size: [4, 4] },
          { name: "pond", size: [3, 4] },
          { name: "pool", size: [2, 1] },
          { name: "prairie_ride", size: [1, 2] },
          { name: "sea", size: [2, 1] },
          { name: "skeleton", size: [4, 3] },
          { name: "skull_and_roses", size: [2, 2] },
          { name: "stage", size: [2, 2] },
          { name: "sunflowers", size: [3, 3] },
          { name: "sunset", size: [2, 1] },
          { name: "tides", size: [3, 3] },
          { name: "unpacked", size: [4, 4] },
          { name: "void", size: [2, 2] },
          { name: "wanderer", size: [1, 2] },
          { name: "wasteland", size: [1, 1] },
          { name: "water", size: [2, 2] },
          { name: "wind", size: [2, 2] },
          { name: "wither", size: [2, 2] },
        ],
        s = a.map((e) => {
          let { name: t } = e;
          return t;
        }),
        n = new Map(
          a.map((e) => {
            let { name: t, size: r } = e;
            return [t, r];
          }),
        );
      function i(e) {
        if (!e) return;
        let t = e
          .trim()
          .toLowerCase()
          .replace(/^minecraft:/, "")
          .replace(/^painting\//, "");
        return /^[a-z0-9_.-]+$/.test(t) ? t : void 0;
      }
      function o(e) {
        let t = i(e),
          r = t ? n.get(t) : void 0;
        return r ? [r[0], r[1]] : [1, 1];
      }
      function l(e) {
        let t = i(e);
        return !!(t && n.has(t));
      }
    },
    77252: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "search", "Search", [
        ["path", { d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }],
        ["path", { d: "M21 21l-6 -6", key: "svg-1" }],
      ]);
    },
    91986: (e, t, r) => {
      "use strict";
      r.d(t, { A1: () => i, OZ: () => d, ew: () => o });
      let a = "未命名作品",
        s = "blueprint",
        n = new Set(["", "null", "undefined", "nan", "unnamed"]);
      function i(e) {
        var t;
        if ("string" != typeof e) return null;
        let r = (null != (t = e.split(/[?#]/, 1)[0].split(/[\\/]/).pop()) ? t : e)
          .replace(/\.(litematic|schem)$/i, "")
          .trim();
        return n.has(r.toLowerCase()) ? null : r;
      }
      function o(e) {
        var t, r;
        let s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : a;
        return null != (r = null != (t = i(e)) ? t : i(s)) ? r : a;
      }
      function l(e) {
        return e
          .replace(/[<>:"/\\|?*\x00-\x1F]+/g, "_")
          .replace(/\s+/g, "_")
          .replace(/[.]+$/g, "")
          .slice(0, 60);
      }
      function d(e) {
        var t;
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s,
          a = l(null != (t = i(r)) ? t : s);
        return l(o(e, a)) || a || s;
      }
    },
    95585: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "chevron-right", "ChevronRight", [
        ["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }],
      ]);
    },
    98015: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "file-export", "FileExport", [
        ["path", { d: "M14 3v4a1 1 0 0 0 1 1h4", key: "svg-0" }],
        [
          "path",
          {
            d: "M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3",
            key: "svg-1",
          },
        ],
      ]);
    },
  },
  (e) => {
    (e.O(
      0,
      [1697, 5033, 4053, 2619, 1733, 8303, 8304, 9074, 9703, 6784, 6260, 7500, 8441, 7391, 7358],
      () => e((e.s = 56743)),
    ),
      (_N_E = e.O()));
  },
]);

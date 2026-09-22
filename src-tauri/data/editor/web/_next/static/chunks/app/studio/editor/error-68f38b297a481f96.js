(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3828],
  {
    1371: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "refresh", "Refresh", [
        ["path", { d: "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4", key: "svg-0" }],
        ["path", { d: "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4", key: "svg-1" }],
      ]);
    },
    18559: (e, t, r) => {
      "use strict";
      r.d(t, { AI: () => i, Dn: () => n, Gq: () => l, JB: () => s, TW: () => a });
      let a = "studio_edit_session_v1",
        s = 432e5,
        o = [
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
      function n() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now();
        try {
          var t;
          let r = sessionStorage.getItem(a);
          if (!r) return null;
          let o = JSON.parse(r);
          if (
            1 !== o.version ||
            "number" != typeof o.updatedAt ||
            e - o.updatedAt > s ||
            e < o.updatedAt - 6e4 ||
            !(
              (t = o.voxelModel) &&
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
            updatedAt: o.updatedAt,
            voxelModel: o.voxelModel,
            replacements: Array.isArray(o.replacements) ? o.replacements : [],
            materialStats: Array.isArray(o.materialStats) ? o.materialStats : [],
            undoStack: Array.isArray(o.undoStack) ? o.undoStack : [],
            redoStack: Array.isArray(o.redoStack) ? o.redoStack : [],
            savedHistoryDepth: Number.isInteger(o.savedHistoryDepth) ? o.savedHistoryDepth : 0,
            savedHistoryMarker:
              "number" == typeof o.savedHistoryMarker ? o.savedHistoryMarker : null,
            isModified: !0 === o.isModified,
            hasStructuralEdits: !0 === o.hasStructuralEdits,
            hasUntrackedStructuralEdits: !0 === o.hasUntrackedStructuralEdits,
            workId: "string" == typeof o.workId ? o.workId : void 0,
            buildingId: "string" == typeof o.buildingId ? o.buildingId : void 0,
            buildingName: "string" == typeof o.buildingName ? o.buildingName : void 0,
          };
        } catch (e) {
          return (l(), null);
        }
      }
      function i(e) {
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
        for (let e of o) sessionStorage.removeItem(e);
      }
    },
    25016: (e, t, r) => {
      "use strict";
      r.d(t, { cn: () => o });
      var a = r(2821),
        s = r(75889);
      function o() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return (0, s.QP)((0, a.$)(t));
      }
    },
    33159: (e, t, r) => {
      "use strict";
      r.d(t, { ButtonLink: () => d });
      var a = r(95155),
        s = r(12115),
        o = r(52619),
        n = r.n(o),
        i = r(64519),
        l = r(68401);
      let d = s.forwardRef((e, t) => {
        let {
            variant: r = "primary",
            size: s = "md",
            platform: o = "wechat",
            loading: d = !1,
            loadingLabel: c = "加载中",
            disabled: u = !1,
            className: x,
            children: m,
            onClick: h,
            tabIndex: v,
            ...p
          } = e,
          g = (0, l.s9)(s),
          b = (0, l.el)(r),
          f = u || d;
        return (0, a.jsxs)(n(), {
          ref: t,
          className: (0, l.M5)({
            size: g,
            variant: b,
            platform: o,
            iconOnly: "icon" === s,
            className: x,
          }),
          onClick: (e) => {
            if (f) return void e.preventDefault();
            null == h || h(e);
          },
          tabIndex: f ? -1 : v,
          "aria-disabled": f || void 0,
          "aria-busy": d || void 0,
          "data-control-kind": "link",
          "data-control-size": g,
          "data-control-variant": b,
          ...p,
          children: [
            (0, a.jsx)("span", {
              "data-control-content": "",
              className: "inline-flex min-w-0 items-center justify-center gap-2 ".concat(
                d ? "invisible" : "",
              ),
              "aria-hidden": d || void 0,
              children: m,
            }),
            d &&
              (0, a.jsx)("span", {
                className: "absolute inset-0 inline-flex items-center justify-center",
                "aria-hidden": "true",
                children: (0, a.jsx)(i.A, { className: "animate-spin" }),
              }),
            d && (0, a.jsx)("span", { className: "sr-only", children: c }),
          ],
        });
      });
      d.displayName = "ButtonLink";
    },
    34440: (e, t, r) => {
      "use strict";
      (r.r(t), r.d(t, { default: () => l }));
      var a = r(95155),
        s = r(27122),
        o = r(12115),
        n = r(43938),
        i = r(18559);
      function l(e) {
        let { error: t, reset: r } = e,
          [l, d] = (0, o.useState)({ exists: !1 });
        return (
          (0, o.useEffect)(() => {
            (s.Cp(t, { tags: { route: "studio/editor" } }),
              d(
                (function () {
                  try {
                    let e = sessionStorage.getItem(i.TW);
                    if (!e) return { exists: !1 };
                    let t = JSON.parse(e);
                    if ("number" != typeof t.updatedAt) return { exists: !1 };
                    let r = Date.now() - t.updatedAt;
                    if (r < 0 || r > i.JB) return { exists: !1 };
                    return {
                      exists: !0,
                      ageMinutes: Math.max(0, Math.round(r / 6e4)),
                      name: "string" == typeof t.buildingName ? t.buildingName : void 0,
                    };
                  } catch (e) {
                    return { exists: !1 };
                  }
                })(),
              ));
          }, [t]),
          (0, a.jsx)(n.A, {
            title: "编辑器出错了",
            message:
              "投影编辑器没能正常运行。常见原因是投影文件体量过大导致内存不足，或当前设备的 WebGL 出了问题。",
            onRetry: r,
            retryLabel: "重新加载编辑器",
            backHref: "/studio",
            backLabel: "返回投影编辑",
            note: l.exists
              ? (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsx)("strong", {
                      className: "text-text-primary",
                      children: "你的编辑进度还在。",
                    }),
                    l.name ? "「".concat(l.name, "」的") : "",
                    "改动保存在这个标签页里（",
                    l.ageMinutes > 0 ? "".concat(l.ageMinutes, " 分钟前") : "刚刚",
                    "更新）， 点上面的重新加载就能接着编辑。",
                    (0, a.jsx)("span", {
                      className: "block mt-1 text-text-muted",
                      children: "请不要关闭这个标签页——草稿存在标签页会话里，关掉就找不回来了。",
                    }),
                  ],
                })
              : "这个标签页里没有检测到未保存的编辑草稿。已保存过的作品不受影响，可以从个人中心重新打开。",
            digest: t.digest,
          })
        );
      }
    },
    43938: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => l });
      var a = r(95155);
      r(12115);
      var s = r(44748),
        o = r(1371),
        n = r(97003),
        i = r(33159);
      let l = function (e) {
        let {
          title: t,
          message: r,
          onRetry: l,
          retryLabel: d = "重试",
          backHref: c,
          backLabel: u,
          note: x,
          digest: m,
        } = e;
        return (0, a.jsx)("div", {
          className: "min-h-[60vh] flex items-center justify-center px-4 py-12",
          children: (0, a.jsxs)("div", {
            className:
              "w-full max-w-lg bg-bg-card border-2 border-border-hard shadow-block p-6 sm:p-8 text-center",
            role: "alert",
            "aria-live": "assertive",
            children: [
              (0, a.jsx)("div", {
                className:
                  "w-16 h-16 bg-error/20 border-2 border-error shadow-inset flex items-center justify-center mx-auto mb-5",
                "aria-hidden": "true",
                children: (0, a.jsx)(s.A, { size: 32, className: "text-error" }),
              }),
              (0, a.jsx)("h2", {
                className:
                  "text-xl sm:text-2xl font-bold text-text-primary mb-3 uppercase tracking-wide",
                children: t,
              }),
              (0, a.jsx)("p", {
                className: "text-sm sm:text-base text-text-secondary leading-relaxed",
                children: r,
              }),
              x &&
                (0, a.jsx)("div", {
                  className:
                    "mt-4 px-4 py-3 bg-bg-elevated border-2 border-border-soft text-sm text-text-secondary text-left",
                  children: x,
                }),
              (0, a.jsxs)("div", {
                className: "mt-6 flex flex-col sm:flex-row gap-3 justify-center",
                children: [
                  (0, a.jsxs)(n.$, {
                    variant: "primary",
                    size: "md",
                    onClick: l,
                    children: [(0, a.jsx)(o.A, { size: 18, "aria-hidden": "true" }), d],
                  }),
                  (0, a.jsx)(i.ButtonLink, {
                    variant: "secondary",
                    size: "md",
                    href: c,
                    children: u,
                  }),
                ],
              }),
              m &&
                (0, a.jsxs)("p", {
                  className: "mt-5 text-xs text-text-muted break-all",
                  children: ["错误编号 ", m],
                }),
            ],
          }),
        });
      };
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
    64519: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => a });
      let a = (0, r(30313).A)("outline", "loader-2", "Loader2", [
        ["path", { d: "M12 3a9 9 0 1 0 9 9", key: "svg-0" }],
      ]);
    },
    68401: (e, t, r) => {
      "use strict";
      r.d(t, { M5: () => c, el: () => d, hG: () => s, s9: () => l, sf: () => o });
      var a = r(25016);
      let s = {
          xs: "h-[var(--control-h-xs)] px-[var(--control-px-xs)] text-[length:var(--control-font-xs)] [&_svg]:h-[var(--control-icon-xs)] [&_svg]:w-[var(--control-icon-xs)] max-md:h-[var(--control-touch-min)]",
          sm: "h-[var(--control-h-sm)] px-[var(--control-px-sm)] text-[length:var(--control-font-sm)] [&_svg]:h-[var(--control-icon-sm)] [&_svg]:w-[var(--control-icon-sm)] max-md:h-[var(--control-touch-min)]",
          md: "h-[var(--control-h-md)] px-[var(--control-px-md)] text-[length:var(--control-font-md)] [&_svg]:h-[var(--control-icon-md)] [&_svg]:w-[var(--control-icon-md)] max-md:h-[var(--control-touch-min)]",
          lg: "h-[var(--control-h-lg)] px-[var(--control-px-lg)] text-[length:var(--control-font-lg)] [&_svg]:h-[var(--control-icon-lg)] [&_svg]:w-[var(--control-icon-lg)]",
          xl: "h-[var(--control-h-xl)] px-[var(--control-px-xl)] text-[length:var(--control-font-xl)] [&_svg]:h-[var(--control-icon-xl)] [&_svg]:w-[var(--control-icon-xl)] max-md:h-[var(--control-h-lg)]",
        },
        o = {
          xs: "w-[var(--control-h-xs)] !px-0 max-md:w-[var(--control-touch-min)]",
          sm: "w-[var(--control-h-sm)] !px-0 max-md:w-[var(--control-touch-min)]",
          md: "w-[var(--control-h-md)] !px-0 max-md:w-[var(--control-touch-min)]",
          lg: "w-[var(--control-h-lg)] !px-0",
          xl: "w-[var(--control-h-xl)] !px-0 max-md:w-[var(--control-h-lg)]",
        },
        n = {
          primary:
            "bg-brand-primary text-text-on-brand shadow-block-sm hover:bg-brand-primary-light hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          secondary:
            "bg-bg-card text-text-primary shadow-block-sm hover:bg-bg-inset hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          ghost:
            "bg-transparent text-text-muted shadow-none hover:bg-bg-card hover:text-text-primary active:translate-x-[2px] active:translate-y-[2px]",
          danger:
            "bg-error text-text-primary shadow-block-sm hover:bg-error/90 hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          warning:
            "bg-warning text-text-on-brand shadow-block-sm hover:bg-warning/90 hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          platform:
            "text-text-primary shadow-block-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-block-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        },
        i = {
          wechat: "bg-platform-wechat hover:bg-platform-wechat-hover",
          qq: "bg-platform-qq hover:bg-platform-qq-hover",
        };
      function l(e) {
        return "default" === e || "icon" === e ? "md" : e;
      }
      function d(e) {
        return "default" === e ? "primary" : "outline" === e ? "secondary" : e;
      }
      function c(e) {
        let { size: t, variant: r, platform: l = "wechat", iconOnly: d = !1, className: c } = e;
        return (0, a.cn)(
          "relative box-border inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-none border-2 border-border-hard font-body font-semibold leading-none transition-[transform,box-shadow,background-color,color,border-color] duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-text-disabled disabled:shadow-inset disabled:translate-x-0 disabled:translate-y-0 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-text-disabled aria-disabled:shadow-inset aria-disabled:translate-x-0 aria-disabled:translate-y-0 [&_svg]:shrink-0",
          s[t],
          n[r],
          "platform" === r && i[l],
          d && o[t],
          c,
        );
      }
    },
    94979: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 34440));
    },
    97003: (e, t, r) => {
      "use strict";
      r.d(t, { $: () => i });
      var a = r(95155),
        s = r(12115),
        o = r(64519),
        n = r(68401);
      let i = s.forwardRef((e, t) => {
        let {
            variant: r = "primary",
            size: s = "md",
            loading: i = !1,
            loadingLabel: l = "加载中",
            platform: d = "wechat",
            controlKind: c = "button",
            className: u,
            children: x,
            type: m = "button",
            disabled: h,
            ...v
          } = e,
          p = (0, n.s9)(s),
          g = (0, n.el)(r),
          b = !!(h || i);
        return (0, a.jsxs)("button", {
          ref: t,
          type: m,
          className: (0, n.M5)({
            size: p,
            variant: g,
            platform: d,
            iconOnly: "icon" === s,
            className: u,
          }),
          disabled: b,
          "aria-busy": i || void 0,
          "data-control-kind": c,
          "data-control-size": p,
          "data-control-variant": g,
          ...v,
          children: [
            (0, a.jsx)("span", {
              "data-control-content": "",
              className: "inline-flex min-w-0 items-center justify-center gap-2 ".concat(
                i ? "invisible" : "",
              ),
              "aria-hidden": i || void 0,
              children: x,
            }),
            i &&
              (0, a.jsx)("span", {
                className: "absolute inset-0 inline-flex items-center justify-center",
                "aria-hidden": "true",
                children: (0, a.jsx)(o.A, { className: "animate-spin" }),
              }),
            i && (0, a.jsx)("span", { className: "sr-only", children: l }),
          ],
        });
      });
      i.displayName = "Button";
    },
  },
  (e) => {
    (e.O(0, [4053, 2619, 8441, 7391, 7358], () => e((e.s = 94979))), (_N_E = e.O()));
  },
]);

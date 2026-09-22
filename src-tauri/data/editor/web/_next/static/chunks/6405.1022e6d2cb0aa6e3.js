"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6405],
  {
    33159: (e, t, s) => {
      s.d(t, { ButtonLink: () => o });
      var a = s(95155),
        n = s(12115),
        r = s(52619),
        l = s.n(r),
        i = s(64519),
        c = s(68401);
      let o = n.forwardRef((e, t) => {
        let {
            variant: s = "primary",
            size: n = "md",
            platform: r = "wechat",
            loading: o = !1,
            loadingLabel: d = "加载中",
            disabled: x = !1,
            className: m,
            children: h,
            onClick: p,
            tabIndex: u,
            ...b
          } = e,
          f = (0, c.s9)(n),
          g = (0, c.el)(s),
          j = x || o;
        return (0, a.jsxs)(l(), {
          ref: t,
          className: (0, c.M5)({
            size: f,
            variant: g,
            platform: r,
            iconOnly: "icon" === n,
            className: m,
          }),
          onClick: (e) => {
            if (j) return void e.preventDefault();
            null == p || p(e);
          },
          tabIndex: j ? -1 : u,
          "aria-disabled": j || void 0,
          "aria-busy": o || void 0,
          "data-control-kind": "link",
          "data-control-size": f,
          "data-control-variant": g,
          ...b,
          children: [
            (0, a.jsx)("span", {
              "data-control-content": "",
              className: "inline-flex min-w-0 items-center justify-center gap-2 ".concat(
                o ? "invisible" : "",
              ),
              "aria-hidden": o || void 0,
              children: h,
            }),
            o &&
              (0, a.jsx)("span", {
                className: "absolute inset-0 inline-flex items-center justify-center",
                "aria-hidden": "true",
                children: (0, a.jsx)(i.A, { className: "animate-spin" }),
              }),
            o && (0, a.jsx)("span", { className: "sr-only", children: d }),
          ],
        });
      });
      o.displayName = "ButtonLink";
    },
    76405: (e, t, s) => {
      (s.r(t), s.d(t, { default: () => T }));
      var a = s(95155),
        n = s(12115),
        r = s(52619),
        l = s.n(r),
        i = s(20063),
        c = s(76784),
        o = s(26260),
        d = s(7496),
        x = s.n(d),
        m = s(38007),
        h = s(58957),
        p = s(91986),
        u = s(18559);
      function b(e) {
        return e.hasOriginalFile
          ? "unreplayable" ===
            (0, h.pl)(e.hasStructuralEdits, e.history, e.hasUntrackedStructuralEdits)
            ? "当前编辑记录包含无法还原的结构操作，无法安全导出。请撤销相关操作，或重新导入原文件。"
            : null
          : "缺少原始投影文件，无法保留附加数据。请重新导入原文件后编辑。";
      }
      async function f(e) {
        let t = new (x())(),
          s = [],
          a = [],
          {
            voxelModel: n,
            originalFileData: r,
            replacements: l,
            materialStats: i,
            hasStructuralEdits: c,
          } = e,
          o = (0, p.ew)(n.name),
          d = (0, p.OZ)(e.baseName, o),
          h = { ...n, name: o };
        for (let a of e.projectionFormats) {
          let n = b({
            hasOriginalFile: !!r,
            hasStructuralEdits: !!c,
            history: e.history,
            hasUntrackedStructuralEdits: !!e.hasUntrackedStructuralEdits,
          });
          if (n || !r) throw Error(n || "缺少原始投影文件");
          try {
            var u;
            let n = (0, m.P)({
                originalFileData: r,
                model: h,
                history: null != (u = e.history) ? u : [],
                targetFormat: a,
                projectName: o,
              }),
              l = "".concat(d, ".").concat(a);
            (t.file(l, n), s.push(l));
          } catch (e) {
            throw Error(
              "无法安全导出 ."
                .concat(a, "：")
                .concat(e instanceof Error ? e.message : "生成投影文件失败"),
            );
          }
        }
        for (let n of e.materialListFormats) {
          if (0 === i.length) {
            a.push("materials.".concat(n, "（无数据）"));
            continue;
          }
          let e =
              "csv" === n
                ? (function (e) {
                    let t = (e) =>
                      /[",\n\r]/.test(e) ? '"'.concat(e.replace(/"/g, '""'), '"') : e;
                    return (
                      "\uFEFF" +
                      [
                        "方块ID,中文名称,英文名称,数量,百分比(%)",
                        ...e.map((e) =>
                          ""
                            .concat(t(e.blockId), ",")
                            .concat(t(e.chineseName), ",")
                            .concat(t(e.englishName), ",")
                            .concat(e.count, ",")
                            .concat(e.percentage.toFixed(2)),
                        ),
                      ].join("\n")
                    );
                  })(i)
                : JSON.stringify(
                    i.map((e) => ({
                      blockId: e.blockId,
                      chineseName: e.chineseName,
                      englishName: e.englishName,
                      count: e.count,
                      percentage: Number(e.percentage.toFixed(2)),
                    })),
                    null,
                    2,
                  ),
            r = "materials.".concat(n);
          (t.file(r, e), s.push(r));
        }
        if (e.includeLayerScreenshots) {
          let e =
            "分层截图功能开发中（Phase 4.5 推出）\n\n功能描述：\n- 按 Y 轴从高到低逐层渲染投影\n- 每层生成一张 PNG（默认 512\xd7512）\n- 所有层打包到此 ZIP 的 layers/ 目录下\n\n当前项目 Y 范围：0 ~ "
              .concat(n.size[1] - 1, "（共 ")
              .concat(n.size[1], " 层）\n");
          (t.file("layers/README.txt", e), s.push("layers/README.txt（占位）"));
        }
        let f = "投影编辑器 导出包\n=====================================\n项目名称："
          .concat(o, "\n尺寸：")
          .concat(n.size[0], " \xd7 ")
          .concat(n.size[1], " \xd7 ")
          .concat(n.size[2], "\n方块总数：")
          .concat(n.totalBlockCount.toLocaleString(), "\n方块种类：")
          .concat(n.blockTypeCount, "\n导出时间：")
          .concat(new Date().toLocaleString("zh-CN"), "\n修改次数：")
          .concat(l.length, "\n\n包含文件（")
          .concat(s.length, "）：\n")
          .concat(s.map((e, t) => "  ".concat(t + 1, ". ").concat(e)).join("\n"), "\n\n")
          .concat(
            a.length > 0
              ? "跳过文件（"
                  .concat(a.length, "）：\n")
                  .concat(a.map((e, t) => "  ".concat(t + 1, ". ").concat(e)).join("\n"), "\n")
              : "",
            "\n此导出包仅供个人学习、创作与备份使用。\n",
          );
        (t.file("README.txt", f), s.push("README.txt"));
        let g = await t.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 6 },
        });
        return {
          blob: g,
          fileName: "".concat(d, ".zip"),
          entries: s,
          skipped: a,
          totalBytes: g.size,
        };
      }
      var g = s(29080),
        j = s(49294),
        N = s(32697),
        y = s(64991),
        k = s(41871),
        v = s(66176),
        w = s(86655),
        S = s(88809),
        z = s(29476),
        A = s(70282),
        E = s(40061),
        C = s(10254),
        _ = s(67812),
        L = s(33186),
        F = s(95585),
        O = s(98015),
        M = s(2186),
        I = s(47522),
        B = s(51750),
        U = s(97003),
        D = s(33159),
        R = s(1855);
      function T() {
        let {
            initialVoxelModel: e,
            initialOriginalFileData: t,
            initialReplacements: s,
            initialMaterialStats: r,
            initialHasStructuralEdits: d,
            initialHistory: x,
            initialHasUntrackedStructuralEdits: m,
          } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          h = (0, i.useRouter)(),
          { requireLogin: I } = (0, o.E)(),
          R = !!e,
          [T, G] = (0, n.useState)(null != e ? e : null),
          [K, Y] = (0, n.useState)(R && null != t ? t : null),
          [q, H] = (0, n.useState)(null),
          [Q, V] = (0, n.useState)(R && null != s ? s : []),
          [W, X] = (0, n.useState)(R && null != r ? r : []),
          [ee, et] = (0, n.useState)(!!R && null != d && d),
          [es, ea] = (0, n.useState)(R && null != x ? x : []),
          [en, er] = (0, n.useState)(!!R && null != m && m),
          [el, ei] = (0, n.useState)(R);
        (0, n.useEffect)(() => {
          if (R) return;
          let e = (function () {
            let e = null,
              t = null,
              s = null,
              a = [],
              n = [],
              r = !1,
              l = [],
              i = !1,
              c = (0, u.Dn)();
            c &&
              ((e = c.voxelModel),
              (a = c.replacements),
              (n = c.materialStats),
              (r = c.hasStructuralEdits),
              (l = c.undoStack),
              (i = c.hasUntrackedStructuralEdits));
            try {
              let t = sessionStorage.getItem("studio_voxel_model");
              !e && t && (e = JSON.parse(t));
            } catch (e) {}
            try {
              let e = sessionStorage.getItem("studio_export_replacements");
              !c && e && (a = JSON.parse(e));
            } catch (e) {}
            try {
              let e = sessionStorage.getItem("studio_export_material_stats");
              !c && e && (n = JSON.parse(e));
            } catch (e) {}
            try {
              c ||
                (i = r = "true" === sessionStorage.getItem("studio_export_has_structural_edits"));
            } catch (e) {}
            try {
              let e = sessionStorage.getItem("studio_original_file");
              if (e)
                try {
                  let s = atob(e),
                    a = new Uint8Array(s.length);
                  for (let e = 0; e < s.length; e++) a[e] = s.charCodeAt(e);
                  t = a.buffer;
                } catch (e) {
                  ((s = "原始文件解码失败，数据可能已损坏"),
                    console.warn("[Studio导出] 原始文件 base64 解码失败:", e));
                }
            } catch (e) {}
            return {
              voxelModel: e,
              originalFileData: t,
              originalFileIssue: s,
              replacements: a,
              materialStats: n,
              hasStructuralEdits: r,
              history: l,
              hasUntrackedStructuralEdits: i,
            };
          })();
          (G(e.voxelModel),
            Y(e.originalFileData),
            H(e.originalFileIssue),
            V(e.replacements),
            X(e.materialStats),
            et(e.hasStructuralEdits),
            ea(e.history),
            er(e.hasUntrackedStructuralEdits),
            ei(!0));
        }, [R]);
        let [ec, eo] = (0, n.useState)(!0),
          [ed, ex] = (0, n.useState)("litematic"),
          [em, eh] = (0, n.useState)(!0),
          [ep, eu] = (0, n.useState)(["csv"]),
          [eb, ef] = (0, n.useState)(!1),
          [eg, ej] = (0, n.useState)(null),
          [eN, ey] = (0, n.useState)(null),
          ek = null == T ? void 0 : T.format,
          ev = b({
            hasOriginalFile: !!K,
            hasStructuralEdits: ee,
            history: es,
            hasUntrackedStructuralEdits: en,
          });
        (0, n.useEffect)(() => {
          "schem" === ek ? ex("schem") : "litematic" === ek && ex("litematic");
        }, [ek]);
        let ew = (0, n.useMemo)(() => {
            let e = 1;
            return (ec && (e += 1), em && (e += ep.length), e);
          }, [ec, em, ep, !1]),
          eS = em && 0 === ep.length,
          ez = !!T && !eS && !(ec && ev) && (ec || em || !1),
          eA = (0, n.useMemo)(() => {
            let e = 2;
            return (
              ec && K && (e += Math.ceil(K.byteLength / 1024)),
              em && (e += W.length * (ep.includes("json") ? 0.15 : 0.08)),
              Math.round(e)
            );
          }, [ec, K, em, W, ep]),
          eE = async () => {
            if (!T || !ez || eb) {
              eS && ey("请至少选择一种材质清单格式，或关闭材质清单。");
              return;
            }
            if (I({ action: "导出投影", onSuccess: () => eE(), strict: !0 })) {
              (ef(!0), ey(null), ej(null));
              try {
                let e = (0, p.ew)(T.name),
                  t = await f({
                    baseName: (0, p.OZ)(T.name),
                    projectionFormats: ec ? [ed] : [],
                    materialListFormats: em ? ep : [],
                    includeLayerScreenshots: !1,
                    voxelModel: T,
                    originalFileData: K,
                    originalFileIssue: q,
                    replacements: Q,
                    materialStats: W,
                    hasStructuralEdits: ee,
                    history: es,
                    hasUntrackedStructuralEdits: en,
                  });
                !(function (e, t) {
                  let s = URL.createObjectURL(e),
                    a = document.createElement("a");
                  ((a.href = s),
                    (a.download = t),
                    document.body.appendChild(a),
                    a.click(),
                    document.body.removeChild(a),
                    URL.revokeObjectURL(s));
                })(t.blob, t.fileName);
                try {
                  (0, c.sendGAEvent)("event", "studio_export", {
                    project_name: e,
                    format: ec ? ed : "materials_only",
                    source_format: ek,
                    file_count: t.entries.length,
                  });
                } catch (e) {}
                (ej({
                  name: t.fileName,
                  size: t.totalBytes,
                  entries: t.entries,
                  skipped: t.skipped,
                }),
                  fetch("/api/studio/usage", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      sourceType: "projection",
                      fileName: e,
                      blockCount: T.totalBlockCount,
                      blockTypes: T.blockTypeCount,
                      exported: !0,
                    }),
                  }).catch(() => {}));
              } catch (e) {
                ey(e instanceof Error ? e.message : "打包失败，请重试");
              } finally {
                ef(!1);
              }
            }
          };
        if (!el)
          return (0, a.jsx)("div", {
            className: "min-h-screen bg-bg-primary flex items-center justify-center",
            children: (0, a.jsxs)("div", {
              className: "text-center",
              children: [
                (0, a.jsx)(B.y, { size: "md" }),
                (0, a.jsx)("p", {
                  className: "text-sm font-bold text-text-muted mt-3",
                  children: "加载导出上下文...",
                }),
              ],
            }),
          });
        if (!T)
          return R
            ? null
            : (0, a.jsx)("div", {
                className: "min-h-screen bg-bg-primary flex items-center justify-center p-6",
                children: (0, a.jsxs)("div", {
                  className: "text-center max-w-md",
                  children: [
                    (0, a.jsx)(g.A, { size: 36, className: "text-warning mb-4 block" }),
                    (0, a.jsx)("h1", {
                      className: "text-lg font-extrabold text-text-primary mb-2",
                      children: "没有可导出的项目",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-sm text-text-muted mb-4 font-semibold leading-relaxed",
                      children:
                        '请先在编辑器中打开一个投影文件，然后从编辑器顶栏的"导出"按钮进入导出页。',
                    }),
                    (0, a.jsxs)(D.ButtonLink, {
                      href: "/studio",
                      size: "md",
                      variant: "primary",
                      children: [(0, a.jsx)(j.A, { size: 12 }), "返回编辑器"],
                    }),
                  ],
                }),
              });
        let eC = T.size,
          e_ = T.totalBlockCount,
          eL = T.format,
          eF = (0, p.ew)(T.name),
          eO = (0, p.OZ)(T.name),
          eM = (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsxs)("section", {
                className:
                  "flex items-center gap-3.5 p-3.5 bg-bg-card border-2 border-border-hard shadow-block",
                children: [
                  (0, a.jsx)("div", {
                    className:
                      "w-11 h-11 shrink-0 bg-bg-inset border-2 border-border-hard shadow-inset flex items-center justify-center text-warning text-lg",
                    children: (0, a.jsx)(N.A, { size: 16 }),
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-bold text-text-muted",
                    children: [
                      (0, a.jsx)("span", {
                        className:
                          "max-w-[220px] truncate text-[16px] font-black text-text-primary",
                        children: eF,
                      }),
                      (0, a.jsxs)("span", {
                        className:
                          "border-2 border-border-hard bg-bg-inset px-2 py-0.5 font-pixel text-[11px] text-text-secondary",
                        children: [".", eL],
                      }),
                      (0, a.jsxs)("span", {
                        className: "inline-flex items-center gap-[5px]",
                        children: [
                          (0, a.jsx)(y.A, { size: 13, className: "text-brand-primary" }),
                          "方块 ",
                          (0, a.jsx)("b", {
                            className: "font-pixel text-text-primary",
                            children: e_.toLocaleString(),
                          }),
                        ],
                      }),
                      (0, a.jsxs)("span", {
                        className: "inline-flex items-center gap-[5px]",
                        children: [
                          (0, a.jsx)(k.A, { size: 13, className: "text-brand-primary" }),
                          "种类 ",
                          (0, a.jsx)("b", {
                            className: "font-pixel text-text-primary",
                            children: T.blockTypeCount,
                          }),
                        ],
                      }),
                      (0, a.jsxs)("span", {
                        className: "inline-flex items-center gap-[5px]",
                        children: [
                          (0, a.jsx)(v.A, { size: 13, className: "text-brand-primary" }),
                          (0, a.jsxs)("b", {
                            className: "font-pixel text-text-primary",
                            children: [eC[0], "x", eC[1], "x", eC[2]],
                          }),
                        ],
                      }),
                      Q.length > 0 &&
                        (0, a.jsxs)("span", {
                          className: "inline-flex items-center gap-[5px]",
                          children: [
                            (0, a.jsx)(w.A, { size: 13, className: "text-warning" }),
                            "已修改 ",
                            (0, a.jsx)("b", {
                              className: "font-pixel text-warning",
                              children: Q.length,
                            }),
                            " 次",
                          ],
                        }),
                    ],
                  }),
                ],
              }),
              (0, a.jsxs)("section", {
                className: R
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                  : "grid grid-cols-1 lg:grid-cols-2 gap-3.5",
                children: [
                  (0, a.jsxs)(J, {
                    on: ec,
                    onToggle: () => eo((e) => !e),
                    icon: y.A,
                    title: "投影文件",
                    desc: "可用于 Litematica mod",
                    accent: "brand-primary",
                    children: [
                      (0, a.jsx)(P, { icon: S.A, children: "格式" }),
                      (0, a.jsx)(Z, {
                        children: ["litematic", "schem"].map((e) =>
                          (0, a.jsxs)(
                            $,
                            { active: ed === e, onClick: () => ex(e), children: [".", e] },
                            e,
                          ),
                        ),
                      }),
                      ev &&
                        (0, a.jsxs)("div", {
                          role: "note",
                          className:
                            "mt-2 flex gap-2 border-2 border-warning bg-warning/10 p-2.5 text-[11px] font-semibold leading-relaxed text-text-secondary",
                          children: [
                            (0, a.jsx)(g.A, {
                              size: 15,
                              className: "mt-0.5 shrink-0 text-warning",
                            }),
                            (0, a.jsxs)("span", {
                              children: [
                                (0, a.jsx)("b", {
                                  className: "font-black text-warning",
                                  children: "暂不能安全导出投影。",
                                }),
                                " ",
                                ev,
                                " 仍可关闭投影文件选项，单独导出材质清单。",
                              ],
                            }),
                          ],
                        }),
                      !ev &&
                        ed !== ek &&
                        (0, a.jsx)("p", {
                          role: "note",
                          className:
                            "mt-2 text-[11px] font-semibold leading-relaxed text-text-muted",
                          children:
                            "换格式前会检查附加数据；遇到目标格式无法完整表达的内容会停止导出，并说明原因。可切回原格式保存。",
                        }),
                    ],
                  }),
                  (0, a.jsxs)(J, {
                    on: em,
                    onToggle: () => eh((e) => !e),
                    icon: z.A,
                    title: "材质清单",
                    desc: "方块种类与数量报表",
                    accent: "info",
                    children: [
                      (0, a.jsx)(P, { icon: S.A, children: "格式（可多选）" }),
                      (0, a.jsx)(Z, {
                        children: ["csv", "json"].map((e) =>
                          (0, a.jsxs)(
                            $,
                            {
                              active: ep.includes(e),
                              onClick: () => {
                                eu((t) => (t.includes(e) ? t.filter((t) => t !== e) : [...t, e]));
                              },
                              children: [
                                "csv" === e
                                  ? (0, a.jsx)(A.A, { size: 10, className: "mr-1" })
                                  : (0, a.jsx)(S.A, { size: 10, className: "mr-1" }),
                                e.toUpperCase(),
                              ],
                            },
                            e,
                          ),
                        ),
                      }),
                      eS &&
                        (0, a.jsx)("p", {
                          className: "mt-2 text-[11px] font-bold text-error",
                          children: "请至少选择一种格式",
                        }),
                    ],
                  }),
                ],
              }),
              (0, a.jsxs)("section", {
                className:
                  "flex items-center gap-4 p-4 bg-bg-card border-2 border-border-hard shadow-block flex-wrap",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex-1 min-w-[200px]",
                    children: [
                      (0, a.jsx)("div", {
                        className:
                          "text-[10.5px] font-extrabold text-text-muted tracking-wider uppercase mb-1",
                        children: "即将打包下载",
                      }),
                      (0, a.jsxs)("div", {
                        className: "flex items-baseline gap-1.5 flex-wrap",
                        children: [
                          (0, a.jsx)("span", {
                            className:
                              "text-xl font-black text-brand-primary font-pixel tracking-tight",
                            children: ew,
                          }),
                          (0, a.jsx)("span", {
                            className: "text-[13px] font-extrabold text-text-secondary",
                            children: "个文件",
                          }),
                          (0, a.jsx)("span", {
                            className: "text-text-muted font-semibold text-xs",
                            children: "\xb7",
                          }),
                          (0, a.jsxs)("span", {
                            className: "text-text-muted font-semibold text-xs",
                            children: ["约 ", eA, " KB"],
                          }),
                          (0, a.jsxs)("span", {
                            className:
                              "font-pixel text-[11px] px-2 py-0.5 bg-bg-inset border-2 border-border-hard text-text-secondary ml-1",
                            children: [eO, ".zip"],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "flex gap-2.5",
                    children: (0, a.jsxs)(U.$, {
                      size: "md",
                      variant: "primary",
                      onClick: eE,
                      disabled: !ez,
                      loading: eb,
                      loadingLabel: "打包中",
                      children: [(0, a.jsx)(E.A, { size: 16 }), "开始导出"],
                    }),
                  }),
                ],
              }),
              eg &&
                (0, a.jsxs)("section", {
                  className: "p-4 bg-success/10 border-2 border-success flex items-start gap-3",
                  children: [
                    (0, a.jsx)(C.A, { size: 18, className: "text-success shrink-0 mt-0.5" }),
                    (0, a.jsxs)("div", {
                      className: "flex-1 min-w-0",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "text-sm font-extrabold text-text-primary",
                          children: [
                            "已下载 ",
                            (0, a.jsx)("span", { className: "font-mono", children: eg.name }),
                            (0, a.jsxs)("span", {
                              className: "text-text-muted font-semibold text-xs ml-2",
                              children: ["(", Math.round(eg.size / 1024), " KB)"],
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className:
                            "text-[11px] text-text-secondary font-semibold mt-1 leading-relaxed",
                          children: ["包含：", eg.entries.join("、")],
                        }),
                        eg.skipped.length > 0 &&
                          (0, a.jsxs)("div", {
                            className: "text-[11px] text-warning font-semibold mt-1",
                            children: ["跳过：", eg.skipped.join("、")],
                          }),
                      ],
                    }),
                  ],
                }),
              eN &&
                (0, a.jsxs)("section", {
                  className: "p-3 bg-error/10 border-2 border-error flex items-center gap-2",
                  children: [
                    (0, a.jsx)(g.A, { size: 16, className: "text-error" }),
                    (0, a.jsx)("span", { className: "text-sm font-bold text-error", children: eN }),
                  ],
                }),
              (0, a.jsxs)("section", {
                className:
                  "flex gap-3.5 p-4 bg-bg-card border-2 border-border-hard border-l-4 border-l-info shadow-block-sm",
                children: [
                  (0, a.jsx)("div", {
                    className: "w-8 h-8 shrink-0 grid place-items-center text-info",
                    children: (0, a.jsx)(_.A, { size: 20 }),
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "min-w-0 flex-1 text-[12px] font-bold leading-relaxed text-text-muted",
                    children: [
                      (0, a.jsx)("b", {
                        className: "font-black text-text-primary",
                        children: "Studio 导出的文件仅供个人使用",
                      }),
                      "；请尊重原作者版权，未经授权请勿二次分发或用于商业用途。",
                    ],
                  }),
                ],
              }),
            ],
          });
        return R
          ? (0, a.jsx)("div", { className: "flex flex-col gap-3.5 p-4", children: eM })
          : (0, a.jsxs)("div", {
              className: "min-h-screen bg-bg-primary flex flex-col",
              children: [
                (0, a.jsxs)("header", {
                  className:
                    "shrink-0 h-12 bg-bg-card border-b-2 border-border-hard flex items-center px-4 gap-3",
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "w-7 h-7 bg-brand-primary border-2 border-border-hard rounded-sm flex items-center justify-center text-text-on-brand text-[13px] shadow-block-sm",
                      children: (0, a.jsx)(L.A, { size: 16 }),
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "flex-1 min-w-0 flex items-center gap-2 text-xs text-text-muted font-bold",
                      children: [
                        (0, a.jsx)(l(), {
                          href: "/studio",
                          className: "hover:text-brand-primary transition-colors",
                          children: "Studio",
                        }),
                        (0, a.jsx)(F.A, { size: 16, className: "text-[9px] opacity-50" }),
                        (0, a.jsx)(l(), {
                          href: "/studio/editor",
                          className:
                            "hover:text-brand-primary transition-colors truncate max-w-[200px]",
                          children: eF,
                        }),
                        (0, a.jsx)(F.A, { size: 16, className: "text-[9px] opacity-50" }),
                        (0, a.jsxs)("span", {
                          className: "text-text-primary font-black inline-flex items-center gap-1",
                          children: [
                            (0, a.jsx)(O.A, { size: 11, className: "text-tag-featured" }),
                            " 导出",
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsxs)(U.$, {
                      size: "xs",
                      variant: "ghost",
                      onClick: () => h.push("/studio/editor"),
                      children: [(0, a.jsx)(M.A, { size: 11 }), "返回编辑器"],
                    }),
                  ],
                }),
                (0, a.jsxs)("main", {
                  className:
                    "flex-1 py-8 md:py-10 px-4 md:px-6 lg:px-8 max-w-5xl w-full mx-auto flex flex-col gap-5",
                  children: [
                    (0, a.jsxs)("section", {
                      className: "text-center",
                      children: [
                        (0, a.jsx)("div", {
                          className:
                            "inline-flex items-center justify-center w-12 h-12 bg-brand-primary border-2 border-border-hard shadow-block text-text-on-brand text-xl mb-3",
                          children: (0, a.jsx)(O.A, { size: 16 }),
                        }),
                        (0, a.jsxs)("h1", {
                          className: "text-2xl md:text-3xl font-black tracking-tight mb-1.5",
                          children: [
                            (0, a.jsx)("span", {
                              className: "text-brand-primary",
                              children: "导出",
                            }),
                            "你的作品",
                          ],
                        }),
                        (0, a.jsxs)("p", {
                          className: "text-[13px] text-text-muted font-semibold max-w-lg mx-auto",
                          children: [
                            "勾选需要的导出类型，",
                            (0, a.jsx)("b", {
                              className: "text-text-secondary font-extrabold",
                              children: "一键打包下载到本地",
                            }),
                            " \xb7 所有文件仅供个人使用",
                          ],
                        }),
                      ],
                    }),
                    eM,
                  ],
                }),
              ],
            });
      }
      function J(e) {
        let { on: t, onToggle: s, icon: n, title: r, desc: l, accent: i, children: c } = e,
          o = { "brand-primary": "bg-brand-primary", info: "bg-info", creator: "bg-tag-featured" };
        return (0, a.jsxs)("div", {
          className:
            "\n        flex flex-col bg-bg-card border-2 border-border-hard shadow-block overflow-hidden\n        transition-all duration-fast\n        ".concat(
              t ? "ring-0" : "",
              "\n      ",
            ),
          children: [
            (0, a.jsxs)("button", {
              type: "button",
              "aria-pressed": t,
              onClick: s,
              className:
                "flex min-h-12 w-full items-center gap-3 border-b-2 border-border-hard px-3 py-3 text-left transition-colors ".concat(
                  t ? o[i] : "bg-bg-card",
                ),
              children: [
                (0, a.jsx)("div", {
                  className: "w-10 h-10 shrink-0 ".concat(
                    t ? "bg-black/25 text-white" : "".concat(o[i], " text-white"),
                    " border-2 border-border-hard rounded-sm shadow-inset flex items-center justify-center text-base",
                  ),
                  children: (0, a.jsx)(n, { size: 16 }),
                }),
                (0, a.jsxs)("div", {
                  className: "flex-1 min-w-0",
                  children: [
                    (0, a.jsx)("div", {
                      className: "text-sm font-black tracking-tight leading-tight ".concat(
                        t ? "text-white" : "text-text-primary",
                      ),
                      children: r,
                    }),
                    (0, a.jsx)("div", {
                      className: "text-[10.5px] font-semibold mt-0.5 leading-snug ".concat(
                        t ? "text-white/85" : "text-text-muted",
                      ),
                      children: l,
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className:
                    "w-5 h-5 shrink-0 border-2 border-border-hard rounded-sm flex items-center justify-center text-[11px] transition-colors ".concat(
                      t ? "bg-text-primary text-brand-primary" : "bg-bg-card text-transparent",
                    ),
                  children: (0, a.jsx)(I.A, { size: 16 }),
                }),
              ],
            }),
            t && (0, a.jsx)("div", { className: "p-3 flex flex-col gap-2.5", children: c }),
            !t &&
              (0, a.jsx)("div", {
                className: "p-4 text-center text-[11px] text-text-disabled font-bold italic",
                children: "点击勾选启用",
              }),
          ],
        });
      }
      function P(e) {
        let { icon: t, children: s } = e;
        return (0, a.jsxs)("div", {
          className:
            "inline-flex items-center gap-1 text-[10px] font-extrabold text-text-muted tracking-wider uppercase",
          children: [t && (0, a.jsx)(t, { size: 10, className: "text-brand-primary" }), s],
        });
      }
      function Z(e) {
        let { children: t } = e;
        return (0, a.jsx)("div", { className: "flex gap-1.5 flex-wrap mt-1", children: t });
      }
      function $(e) {
        let { active: t, disabled: s, onClick: n, children: r, title: l } = e;
        return (0, a.jsx)(R.$, {
          size: "sm",
          selected: !!t,
          onClick: n,
          disabled: s,
          title: l,
          className: "!text-[10.5px]",
          children: r,
        });
      }
    },
  },
]);

(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8974],
  {
    1730: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "movie", "Movie", [
        [
          "path",
          {
            d: "M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12",
            key: "svg-0",
          },
        ],
        ["path", { d: "M8 4l0 16", key: "svg-1" }],
        ["path", { d: "M16 4l0 16", key: "svg-2" }],
        ["path", { d: "M4 8l4 0", key: "svg-3" }],
        ["path", { d: "M4 16l4 0", key: "svg-4" }],
        ["path", { d: "M4 12l16 0", key: "svg-5" }],
        ["path", { d: "M16 8l4 0", key: "svg-6" }],
        ["path", { d: "M16 16l4 0", key: "svg-7" }],
      ]);
    },
    15532: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "chevron-left", "ChevronLeft", [
        ["path", { d: "M15 6l-6 6l6 6", key: "svg-0" }],
      ]);
    },
    16010: (e, t, s) => {
      "use strict";
      s.d(t, { d: () => i });
      let a = "/static";
      function i(e) {
        return a ? "".concat(a).concat(e) : e;
      }
    },
    22421: () => {},
    33159: (e, t, s) => {
      "use strict";
      s.d(t, { ButtonLink: () => o });
      var a = s(95155),
        i = s(12115),
        n = s(52619),
        l = s.n(n),
        r = s(64519),
        c = s(68401);
      let o = i.forwardRef((e, t) => {
        let {
            variant: s = "primary",
            size: i = "md",
            platform: n = "wechat",
            loading: o = !1,
            loadingLabel: d = "加载中",
            disabled: h = !1,
            className: u,
            children: p,
            onClick: g,
            tabIndex: m,
            ...v
          } = e,
          y = (0, c.s9)(i),
          x = (0, c.el)(s),
          f = h || o;
        return (0, a.jsxs)(l(), {
          ref: t,
          className: (0, c.M5)({
            size: y,
            variant: x,
            platform: n,
            iconOnly: "icon" === i,
            className: u,
          }),
          onClick: (e) => {
            if (f) return void e.preventDefault();
            null == g || g(e);
          },
          tabIndex: f ? -1 : m,
          "aria-disabled": f || void 0,
          "aria-busy": o || void 0,
          "data-control-kind": "link",
          "data-control-size": y,
          "data-control-variant": x,
          ...v,
          children: [
            (0, a.jsx)("span", {
              "data-control-content": "",
              className: "inline-flex min-w-0 items-center justify-center gap-2 ".concat(
                o ? "invisible" : "",
              ),
              "aria-hidden": o || void 0,
              children: p,
            }),
            o &&
              (0, a.jsx)("span", {
                className: "absolute inset-0 inline-flex items-center justify-center",
                "aria-hidden": "true",
                children: (0, a.jsx)(r.A, { className: "animate-spin" }),
              }),
            o && (0, a.jsx)("span", { className: "sr-only", children: d }),
          ],
        });
      });
      o.displayName = "ButtonLink";
    },
    33186: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "wand", "Wand", [
        ["path", { d: "M6 21l15 -15l-3 -3l-15 15l3 3", key: "svg-0" }],
        ["path", { d: "M15 6l3 3", key: "svg-1" }],
        [
          "path",
          { d: "M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2", key: "svg-2" },
        ],
        [
          "path",
          { d: "M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2", key: "svg-3" },
        ],
      ]);
    },
    35440: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "puzzle", "Puzzle", [
        [
          "path",
          {
            d: "M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1",
            key: "svg-0",
          },
        ],
      ]);
    },
    41165: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => z });
      var a = s(95155),
        i = s(12115),
        n = s(52619),
        l = s.n(n),
        r = s(16010),
        c = s(98901),
        o = s(69605),
        d = s(33159),
        h = s(44460),
        u = s(75377),
        p = s(64991),
        g = s(33186),
        m = s(79350),
        v = s(35440);
      let y = (0, s(30313).A)("outline", "lock-open", "LockOpen", [
        [
          "path",
          {
            d: "M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -6",
            key: "svg-0",
          },
        ],
        ["path", { d: "M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }],
        ["path", { d: "M8 11v-5a4 4 0 0 1 8 0", key: "svg-2" }],
      ]);
      var x = s(92982),
        f = s(73610),
        j = s(1730),
        b = s(68595),
        k = s(99099),
        w = s(15532),
        M = s(95585);
      let N = [
          {
            img: "/images/icons/Cube_4.png",
            s: 86,
            depth: 1.4,
            d: "6s",
            delay: "-1s",
            pos: { left: "7%", top: "14%" },
          },
          {
            img: "/images/icons/Cube_6.png",
            s: 66,
            depth: 1,
            d: "5s",
            delay: "-2.5s",
            pos: { left: "12%", top: "53%" },
          },
          {
            img: "/images/icons/Cube_2.png",
            s: 60,
            depth: 0.9,
            d: "4.5s",
            delay: "-0.5s",
            pos: { left: "17%", bottom: "13%" },
          },
          {
            img: "/images/icons/Cube_7.png",
            s: 46,
            depth: 0.6,
            d: "5.5s",
            delay: "-3s",
            pos: { left: "22%", top: "17%" },
          },
          {
            img: "/images/icons/Cube_1.png",
            s: 90,
            depth: 1.5,
            d: "6.5s",
            delay: "-1.8s",
            pos: { right: "8%", top: "14%" },
          },
          {
            img: "/images/icons/Cube_5.png",
            s: 64,
            depth: 1,
            d: "5s",
            delay: "-0.8s",
            pos: { right: "13%", top: "51%" },
          },
          {
            img: "/images/icons/Cube_3.png",
            s: 74,
            depth: 1.2,
            d: "5.8s",
            delay: "-2.2s",
            pos: { right: "17%", bottom: "15%" },
          },
          {
            img: "/images/icons/Cube_2.png",
            s: 44,
            depth: 0.6,
            d: "4.8s",
            delay: "-1.2s",
            pos: { right: "29%", top: "11%" },
          },
        ],
        A = [
          {
            no: "01",
            href: "/buildings",
            art: "/images/features/buildings.webp",
            icon: p.A,
            title: "建筑库",
            desc: "每座建筑都有 3D 逐层教学，标注方块位置与数量，零基础也能跟着搭出一整座。",
            cta: "探索建筑库",
          },
          {
            no: "02",
            href: "/studio",
            art: "/images/features/studio.webp",
            icon: g.A,
            title: "投影编辑",
            desc: "投影编辑器支持在浏览器里查看投影、替换材质、整理选区，并导出投影辅助还原。",
            cta: "打开编辑器",
          },
          {
            no: "03",
            href: "/wallpapers",
            art: "/images/features/wallpapers.webp",
            icon: m.A,
            title: "壁纸站",
            desc: "高清 2K 分辨率，手机与桌面全设备适配，动态壁纸一键设为桌面。",
            cta: "浏览壁纸",
          },
          {
            no: "04",
            href: "/blender",
            art: "/images/features/blender.webp",
            icon: v.A,
            title: "Mine2Blend",
            desc: "Blender 一键导入投影（含 .litematic / .schem），自动映射材质、保留分层出图。",
            cta: "了解 Mine2Blend",
          },
        ],
        C = [
          {
            icon: y,
            title: "全部免费",
            desc: "建筑库、投影编辑器、壁纸站与 Mine2Blend 四个公开板块，不设付费门槛。",
          },
          {
            icon: x.A,
            title: "一键导出投影",
            desc: "编辑完直接导出 .litematic / .schem，进游戏照着搭。",
          },
          { icon: f.A, title: "逐层教学", desc: "每座建筑拆解到层，新手也能跟着一层层还原。" },
          {
            icon: j.A,
            title: "Blender 一键导入",
            desc: "Mine2Blend 把投影搬进渲染管线，出渲染大片。",
          },
        ];
      function B(e) {
        return e >= 10 ? "".concat(10 * Math.floor(e / 10), "+") : "".concat(e);
      }
      function z(e) {
        let { featured: t, stats: s } = e,
          n = (0, i.useRef)(null),
          v = (0, i.useCallback)((e) => {
            let t = n.current;
            if (!t) return;
            let s = t.getBoundingClientRect(),
              a = (e.clientX - s.left) / s.width - 0.5,
              i = (e.clientY - s.top) / s.height - 0.5;
            (t.style.setProperty("--mx", "".concat((e.clientX - s.left).toFixed(1), "px")),
              t.style.setProperty("--my", "".concat((e.clientY - s.top).toFixed(1), "px")));
            let l = t.querySelector(".hero-bg");
            (l &&
              (l.style.transform = "translate("
                .concat((-(20 * a)).toFixed(1), "px, ")
                .concat((-(16 * i)).toFixed(1), "px)")),
              t.querySelectorAll(".hero-cube").forEach((e) => {
                let t = parseFloat(e.dataset.depth || "1") || 1;
                e.style.transform = "translate("
                  .concat((-a * t * 46).toFixed(1), "px, ")
                  .concat((-i * t * 34).toFixed(1), "px)");
                let s = e.querySelector("img");
                s &&
                  (s.style.setProperty("--sx", "".concat((5 + a * t * 13).toFixed(1), "px")),
                  s.style.setProperty("--sy", "".concat((8 + i * t * 10).toFixed(1), "px")));
              }));
          }, []),
          y = (0, i.useCallback)(() => {
            let e = n.current;
            if (!e) return;
            let t = e.querySelector(".hero-bg");
            (t && (t.style.transform = ""),
              e.querySelectorAll(".hero-cube").forEach((e) => {
                e.style.transform = "";
                let t = e.querySelector("img");
                t && (t.style.removeProperty("--sx"), t.style.removeProperty("--sy"));
              }));
          }, []),
          x = (0, i.useMemo)(() => (0, u.hR)(t), [t]),
          f = (0, i.useRef)(null),
          j = (0, i.useCallback)((e) => {
            let t = f.current;
            if (!t) return;
            let s = t.querySelector(".uc-card"),
              a = s ? s.offsetWidth + 18 : 300;
            t.scrollBy({ left: e * a, behavior: "smooth" });
          }, []);
        return (0, a.jsxs)("div", {
          className: "mcb-home",
          children: [
            (0, a.jsxs)("section", {
              className: "hero",
              ref: n,
              onMouseMove: v,
              onMouseLeave: y,
              children: [
                (0, a.jsx)("div", { className: "hero-bg" }),
                (0, a.jsx)("div", { className: "hero-spot" }),
                (0, a.jsx)("div", {
                  className: "hero-blocks",
                  children: N.map((e, t) =>
                    (0, a.jsx)(
                      "span",
                      {
                        className: "hero-cube",
                        "data-depth": e.depth,
                        style: { "--s": "".concat(e.s, "px"), ...e.pos },
                        children: (0, a.jsx)("img", {
                          src: (0, r.d)(e.img),
                          alt: "",
                          loading: "lazy",
                          decoding: "async",
                          style: { "--d": e.d, animationDelay: e.delay },
                        }),
                      },
                      t,
                    ),
                  ),
                }),
                (0, a.jsxs)("div", {
                  className: "hero-center",
                  children: [
                    (0, a.jsxs)(l(), {
                      className: "eyebrow-chip",
                      href: "/buildings/step-teaching",
                      onClick: () => (0, c.MP)("step_entry_link", { from: "home_hero" }),
                      children: [
                        (0, a.jsx)("span", { className: "sq" }),
                        "新上线 \xb7 3D 步骤教学",
                        (0, a.jsx)(b.A, { "aria-hidden": !0 }),
                      ],
                    }),
                    (0, a.jsxs)("h1", {
                      children: [
                        "你的 ",
                        (0, a.jsx)("span", { className: "accent", children: "Minecraft" }),
                        " 建筑",
                        (0, a.jsx)("br", {}),
                        "从这里开始",
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "hero-sub",
                      children:
                        "免费 3D 逐层建筑教学，零基础也能跟着搭出一整座建筑；投影编辑器支持换材质、看投影、导出辅助方案，高清壁纸一键下载，Mine2Blend 可把投影带入 Blender 创作流程。",
                    }),
                    (0, a.jsxs)("div", {
                      className: "hero-cta",
                      children: [
                        (0, a.jsxs)(d.ButtonLink, {
                          size: "xl",
                          variant: "primary",
                          href: "/buildings",
                          children: [(0, a.jsx)(p.A, {}), "探索建筑库"],
                        }),
                        (0, a.jsxs)(d.ButtonLink, {
                          size: "xl",
                          variant: "secondary",
                          href: "/wallpapers",
                          children: [(0, a.jsx)(m.A, {}), "浏览高清壁纸"],
                        }),
                        (0, a.jsxs)(d.ButtonLink, {
                          size: "xl",
                          variant: "secondary",
                          href: "/studio",
                          children: [(0, a.jsx)(g.A, {}), "打开编辑器"],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)(d.ButtonLink, {
                  className: "hero-scroll !overflow-visible",
                  size: "icon",
                  variant: "secondary",
                  href: "#explore",
                  "aria-label": "向下浏览",
                  children: (0, a.jsx)(k.A, {}),
                }),
              ],
            }),
            (0, a.jsxs)("section", {
              className: "caps wrap",
              id: "explore",
              children: [
                (0, a.jsxs)("div", {
                  className: "caps-intro",
                  children: [
                    (0, a.jsx)("div", { className: "eyebrow", children: "四大板块 \xb7 创作流程" }),
                    (0, a.jsx)("h2", {
                      className: "section-title",
                      children: "四大板块，串起 Minecraft 建筑创作流程",
                    }),
                    (0, a.jsx)("p", {
                      children:
                        "从建筑库发现作品，用投影编辑器调整投影，在壁纸站获取视觉素材，并通过 Mine2Blend 把投影带入 Blender 创作。",
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className: "caps-grid",
                  children: A.map((e) =>
                    (0, a.jsxs)(
                      l(),
                      {
                        className: "cap has-art",
                        href: e.href,
                        children: [
                          (0, a.jsx)("span", { className: "cap-no", children: e.no }),
                          (0, a.jsx)("img", {
                            className: "cap-art",
                            src: (0, r.d)(e.art),
                            alt: "",
                            loading: "lazy",
                            decoding: "async",
                          }),
                          (0, a.jsx)("div", {
                            className: "cap-ico",
                            children: (0, a.jsx)(e.icon, { size: 16 }),
                          }),
                          (0, a.jsx)("h3", { children: e.title }),
                          (0, a.jsx)("p", { children: e.desc }),
                          (0, a.jsxs)("span", {
                            className: "cap-go",
                            children: [e.cta, " ", (0, a.jsx)(b.A, { size: 16 })],
                          }),
                        ],
                      },
                      e.no,
                    ),
                  ),
                }),
              ],
            }),
            x.length > 0 &&
              (0, a.jsxs)("section", {
                className: "gallery wrap",
                id: "featured-buildings",
                children: [
                  (0, a.jsxs)("div", {
                    className: "gallery-head",
                    children: [
                      (0, a.jsxs)("div", {
                        children: [
                          (0, a.jsx)("div", {
                            className: "eyebrow",
                            children: "展墙 \xb7 Featured",
                          }),
                          (0, a.jsx)("h2", {
                            className: "section-title",
                            style: { marginTop: "10px" },
                            children: "精选建筑",
                          }),
                          (0, a.jsx)("p", {
                            style: {
                              color: "var(--text-muted)",
                              fontSize: "15px",
                              marginTop: "8px",
                            },
                            children: "从建筑库挑出的灵感与学习佳作",
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "gallery-actions",
                        children: [
                          (0, a.jsxs)("div", {
                            className: "gallery-nav",
                            children: [
                              (0, a.jsx)(h.K, {
                                className: "gallery-arrow",
                                size: "md",
                                variant: "secondary",
                                onClick: () => j(-1),
                                label: "向左滚动",
                                children: (0, a.jsx)(w.A, {}),
                              }),
                              (0, a.jsx)(h.K, {
                                className: "gallery-arrow",
                                size: "md",
                                variant: "secondary",
                                onClick: () => j(1),
                                label: "向右滚动",
                                children: (0, a.jsx)(M.A, {}),
                              }),
                            ],
                          }),
                          (0, a.jsxs)(l(), {
                            className: "more",
                            href: "/buildings",
                            children: ["查看全部建筑 ", (0, a.jsx)(b.A, { size: 16 })],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "gallery-track",
                    ref: f,
                    children: x.map((e, t) =>
                      (0, a.jsxs)(
                        "div",
                        {
                          className: "gallery-card",
                          children: [
                            (0, a.jsxs)("span", {
                              className: "gallery-rank",
                              "aria-hidden": "true",
                              children: ["精选 ", String(t + 1).padStart(2, "0")],
                            }),
                            (0, a.jsx)(o.A, { building: e, variant: "immersive" }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              }),
            (0, a.jsxs)("section", {
              className: "highlights wrap",
              children: [
                (0, a.jsxs)("div", {
                  className: "caps-intro",
                  style: { textAlign: "left", marginBottom: "26px" },
                  children: [
                    (0, a.jsx)("div", { className: "eyebrow", children: "为什么选 投影编辑器" }),
                    (0, a.jsx)("h2", {
                      className: "section-title",
                      style: { marginTop: "10px" },
                      children: "平台亮点",
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className: "hl-grid",
                  children: C.map((e) =>
                    (0, a.jsxs)(
                      "div",
                      {
                        className: "hl",
                        children: [
                          (0, a.jsx)("div", {
                            className: "hl-ico",
                            children: (0, a.jsx)(e.icon, { size: 16 }),
                          }),
                          (0, a.jsx)("h4", { children: e.title }),
                          (0, a.jsx)("p", { children: e.desc }),
                        ],
                      },
                      e.title,
                    ),
                  ),
                }),
              ],
            }),
            (0, a.jsx)("section", {
              className: "wrap zone",
              id: "start-creating",
              children: (0, a.jsxs)("div", {
                className: "cta-band",
                children: [
                  (0, a.jsxs)("div", {
                    className: "cta-tx",
                    children: [
                      (0, a.jsx)("div", {
                        className: "cta-kicker",
                        children: "发现 \xb7 学习 \xb7 创作",
                      }),
                      (0, a.jsx)("h2", { children: "MC 建筑，不止于你的存档" }),
                      (0, a.jsx)("p", {
                        children:
                          "免费教学、投影编辑器、壁纸站与 Mine2Blend，从今天开始把脑中的建筑搭出来。",
                      }),
                      (0, a.jsxs)("div", {
                        className: "hero-cta",
                        children: [
                          (0, a.jsxs)(d.ButtonLink, {
                            size: "xl",
                            variant: "primary",
                            href: "/buildings",
                            children: [(0, a.jsx)(p.A, {}), "探索建筑库"],
                          }),
                          (0, a.jsxs)(d.ButtonLink, {
                            size: "xl",
                            variant: "secondary",
                            href: "/wallpapers",
                            children: [(0, a.jsx)(m.A, {}), "浏览高清壁纸"],
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "cta-stats",
                        children: [
                          (0, a.jsxs)("span", {
                            className: "cta-stat",
                            children: [(0, a.jsx)("b", { children: B(s.buildings) }), " 座建筑"],
                          }),
                          (0, a.jsxs)("span", {
                            className: "cta-stat",
                            children: [(0, a.jsx)("b", { children: B(s.wallpapers) }), " 张壁纸"],
                          }),
                          (0, a.jsxs)("span", {
                            className: "cta-stat",
                            children: [(0, a.jsx)("b", { children: B(s.downloads) }), " 次下载"],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "cta-pic",
                    children: [
                      (0, a.jsx)("img", {
                        src: (0, r.d)("/images/cta-bg-forest.webp"),
                        alt: "",
                        loading: "lazy",
                        decoding: "async",
                      }),
                      (0, a.jsx)("span", {
                        className: "cta-credit",
                        children: "建筑库 \xb7 实景渲染",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
    45398: (e, t, s) => {
      (Promise.resolve().then(s.t.bind(s, 22421, 23)), Promise.resolve().then(s.bind(s, 41165)));
    },
    46735: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "crown", "Crown", [
        ["path", { d: "M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4l4 -6", key: "svg-0" }],
      ]);
    },
    64991: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "cube", "Cube", [
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
    73610: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "stack-2", "Stack2", [
        ["path", { d: "M12 4l-8 4l8 4l8 -4l-8 -4", key: "svg-0" }],
        ["path", { d: "M4 12l8 4l8 -4", key: "svg-1" }],
        ["path", { d: "M4 16l8 4l8 -4", key: "svg-2" }],
      ]);
    },
    79350: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "photo", "Photo", [
        ["path", { d: "M15 8h.01", key: "svg-0" }],
        [
          "path",
          {
            d: "M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12",
            key: "svg-1",
          },
        ],
        ["path", { d: "M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5", key: "svg-2" }],
        ["path", { d: "M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3", key: "svg-3" }],
      ]);
    },
    83818: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "trophy", "Trophy", [
        ["path", { d: "M8 21l8 0", key: "svg-0" }],
        ["path", { d: "M12 17l0 4", key: "svg-1" }],
        ["path", { d: "M7 4l10 0", key: "svg-2" }],
        ["path", { d: "M17 4v8a5 5 0 0 1 -10 0v-8", key: "svg-3" }],
        ["path", { d: "M3 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", key: "svg-4" }],
        ["path", { d: "M17 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", key: "svg-5" }],
      ]);
    },
    92982: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "package", "Package", [
        ["path", { d: "M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5", key: "svg-0" }],
        ["path", { d: "M12 12l8 -4.5", key: "svg-1" }],
        ["path", { d: "M12 12l0 9", key: "svg-2" }],
        ["path", { d: "M12 12l-8 -4.5", key: "svg-3" }],
        ["path", { d: "M16 5.25l-8 4.5", key: "svg-4" }],
      ]);
    },
    95585: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "chevron-right", "ChevronRight", [
        ["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }],
      ]);
    },
    98901: (e, t, s) => {
      "use strict";
      s.d(t, { Bu: () => C, MH: () => A, MP: () => M, PO: () => N, wg: () => h });
      let a = "/api/analytics/track",
        i = "mcb_sid",
        n = [],
        l = null,
        r = "",
        c = 0,
        o = "",
        d = !1;
      function h(e) {
        return (
          "/render-lab" === e ||
          e.startsWith("/render-lab/") ||
          "/admin" === e ||
          e.startsWith("/admin/")
        );
      }
      function u() {
        return h(window.location.pathname);
      }
      function p() {
        (l && (clearTimeout(l), (l = null)), (n = []), (c = 0));
      }
      function g() {
        if ("undefined" == typeof navigator) return "desktop";
        let e = navigator.userAgent;
        return /iPad|Tablet/i.test(e)
          ? "tablet"
          : /Mobile|Android|iPhone/i.test(e)
            ? "mobile"
            : "desktop";
      }
      function m() {
        if ("undefined" == typeof navigator) return "unknown";
        let e = navigator.userAgent;
        return e.includes("Edg/")
          ? "edge"
          : e.includes("Chrome/") && !e.includes("Edg/")
            ? "chrome"
            : e.includes("Firefox/")
              ? "firefox"
              : e.includes("Safari/") && !e.includes("Chrome/")
                ? "safari"
                : "other";
      }
      function v() {
        if ("undefined" == typeof navigator) return "unknown";
        let e = navigator.userAgent;
        return e.includes("Win")
          ? "windows"
          : e.includes("Mac") && !e.includes("iPhone")
            ? "macos"
            : e.includes("iPhone") || e.includes("iPad")
              ? "ios"
              : e.includes("Android")
                ? "android"
                : e.includes("Linux")
                  ? "linux"
                  : "other";
      }
      let y = "mcb_src",
        x = [
          [/aweme/i, "douyin"],
          [/MicroMessenger/i, "wechat"],
          [/\bQQ\/\d/, "qq"],
          [/xhsdiscover/i, "xiaohongshu"],
          [/BiliApp/i, "bilibili"],
          [/Kwai|KsWebView/i, "kuaishou"],
          [/Weibo/i, "weibo"],
        ];
      function f() {
        try {
          let e = sessionStorage.getItem(y);
          if (e) return e;
        } catch (e) {}
        let e =
          (function () {
            let e = new URLSearchParams(window.location.search).get("utm_source");
            return (
              (null == e
                ? void 0
                : e
                    .toLowerCase()
                    .replace(/[^a-z0-9_-]/g, "")
                    .slice(0, 20)) || null
            );
          })() ||
          (function () {
            let e = navigator.userAgent;
            for (let [t, s] of x) if (t.test(e)) return s;
            return null;
          })() ||
          (function () {
            let e = document.referrer;
            if (!e) return "direct";
            try {
              let t = new URL(e).hostname;
              if (t.includes("localhost")) return "direct";
              if (
                t.includes("google") ||
                t.includes("bing") ||
                t.includes("baidu") ||
                t.includes("sogou") ||
                t.includes("so.com")
              )
                return "search";
              if (t.includes("weixin") || t.includes("wechat") || t.includes("wx")) return "wechat";
              if (t.includes("qq.com") || t.includes("qzone")) return "qq";
              if (t.includes("douyin")) return "douyin";
              if (t.includes("xiaohongshu")) return "xiaohongshu";
              if (t.includes("bilibili")) return "bilibili";
              if (t.includes("weibo")) return "weibo";
              return "referral";
            } catch (e) {
              return "direct";
            }
          })();
        try {
          sessionStorage.setItem(y, e);
        } catch (e) {}
        return e;
      }
      function j(e) {
        if (u()) return void p();
        let t = (function () {
          if (r) return r;
          let e = sessionStorage.getItem(i);
          return (
            e ||
              ((e = ""
                .concat(Date.now().toString(36), "-")
                .concat(Math.random().toString(36).slice(2, 8))),
              sessionStorage.setItem(i, e)),
            (r = e),
            e
          );
        })();
        t && (n.push({ ...e, sessionId: t }), n.length >= 50 ? b() : l || (l = setTimeout(b, 1e4)));
      }
      function b() {
        if (u()) return void p();
        if ((l && (clearTimeout(l), (l = null)), 0 === n.length)) return;
        let e = JSON.stringify({ events: n.splice(0) });
        "undefined" != typeof navigator && navigator.sendBeacon
          ? navigator.sendBeacon(a, new Blob([e], { type: "application/json" }))
          : fetch(a, {
              method: "POST",
              body: e,
              headers: { "Content-Type": "application/json" },
              keepalive: !0,
            }).catch(() => {});
      }
      function k(e) {
        if (u()) return void p();
        if (e === o) return;
        let t = Date.now();
        if (c > 0 && o) {
          let s = Math.round((t - c) / 1e3);
          s > 0 && s < 3600 && j({ type: "page_leave", page: o, duration: s, metadata: { to: e } });
        }
        ((c = t),
          (o = e),
          j({
            type: "page_view",
            page: e,
            referrer: document.referrer || void 0,
            device: g(),
            browser: m(),
            os: v(),
            source: f(),
          }));
      }
      function w() {
        if (!d) {
          if (((d = !0), c > 0)) {
            let e = Math.round((Date.now() - c) / 1e3);
            j({ type: "session_end", page: window.location.pathname, duration: Math.min(e, 3600) });
          }
          b();
        }
      }
      function M(e, t) {
        j({ type: "click", page: window.location.pathname, metadata: { target: e, ...t } });
      }
      function N() {
        b();
      }
      function A(e, t) {
        j({
          type: "download",
          page: window.location.pathname,
          metadata: { itemType: e, itemId: t },
        });
      }
      function C() {
        (u() ||
          j({
            type: "session_start",
            page: window.location.pathname,
            device: g(),
            browser: m(),
            os: v(),
            source: f(),
            referrer: ("undefined" != typeof document && document.referrer) || void 0,
          }),
          window.addEventListener("pagehide", w),
          window.addEventListener("pageshow", () => {
            d = !1;
          }));
        let e = history.pushState.bind(history);
        history.pushState = function () {
          for (var t = arguments.length, s = Array(t), a = 0; a < t; a++) s[a] = arguments[a];
          (e(...s), setTimeout(() => k(window.location.pathname), 0));
        };
        let t = history.replaceState.bind(history);
        ((history.replaceState = function () {
          for (var e = arguments.length, s = Array(e), a = 0; a < e; a++) s[a] = arguments[a];
          (t(...s), setTimeout(() => k(window.location.pathname), 0));
        }),
          window.addEventListener("popstate", () => {
            k(window.location.pathname);
          }),
          u() || k(window.location.pathname));
      }
    },
    99099: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "chevron-down", "ChevronDown", [
        ["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }],
      ]);
    },
    99729: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => a });
      let a = (0, s(30313).A)("outline", "plant", "Plant", [
        ["path", { d: "M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4", key: "svg-0" }],
        ["path", { d: "M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3", key: "svg-1" }],
        ["path", { d: "M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3", key: "svg-2" }],
        ["path", { d: "M12 15l0 -6", key: "svg-3" }],
      ]);
    },
  },
  (e) => {
    (e.O(0, [3714, 4053, 2619, 1733, 8303, 8304, 6260, 6198, 8441, 7391, 7358], () =>
      e((e.s = 45398)),
    ),
      (_N_E = e.O()));
  },
]);

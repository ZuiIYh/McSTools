"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2378],
  {
    55671: (e, t, r) => {
      r.d(t, { O5: () => a, Yg: () => i, ic: () => n });
      let n = Object.freeze({
          "minecraft:trapdoor": "minecraft:oak_trapdoor",
          "minecraft:chain": "minecraft:iron_chain",
          "minecraft:grass_path": "minecraft:dirt_path",
          "minecraft:grass": "minecraft:short_grass",
          "minecraft:sign": "minecraft:oak_sign",
          "minecraft:wall_sign": "minecraft:oak_wall_sign",
          "minecraft:banner": "minecraft:white_banner",
          "minecraft:wall_banner": "minecraft:white_wall_banner",
          "minecraft:bed": "minecraft:red_bed",
          "minecraft:skull": "minecraft:skeleton_skull",
          "minecraft:wall_skull": "minecraft:skeleton_wall_skull",
        }),
        l = new Set([
          "minecraft:air",
          "minecraft:cave_air",
          "minecraft:void_air",
          "minecraft:moving_piston",
        ]);
      function a(e) {
        var t, r;
        return null !=
          (r =
            null ==
            (t = (function (e) {
              var t;
              if ("string" != typeof e) return null;
              let r = e.trim().toLowerCase();
              if (!r) return null;
              let l = r.indexOf("["),
                a = (l >= 0 ? r.slice(0, l) : r).trim();
              if (!/^(?:[a-z0-9_.-]+:)?[a-z0-9_./-]+$/.test(a)) return null;
              let i = a.includes(":") ? a : "minecraft:".concat(a),
                o = null != (t = n[i]) ? t : i,
                s = {};
              if (l >= 0) {
                if (!r.endsWith("]")) return null;
                let e = r.slice(l + 1, -1).trim();
                if (e)
                  for (let t of e.split(",")) {
                    let e = t.indexOf("=");
                    if (e <= 0 || e === t.length - 1) return null;
                    let r = t.slice(0, e).trim(),
                      n = t.slice(e + 1).trim();
                    if (!/^[a-z0-9_.-]+$/.test(r) || !/^[a-z0-9_.-]+$/.test(n)) return null;
                    s[r] = n;
                  }
              }
              return { blockId: o, properties: s };
            })(e))
              ? void 0
              : t.blockId)
          ? r
          : null;
      }
      function i(e, t) {
        let r = a(e);
        return !!r && !l.has(r) && t.has(r);
      }
    },
    55822: (e, t, r) => {
      r.d(t, {
        Ak: () => h,
        HP: () => _,
        MV: () => d,
        Rf: () => n,
        X1: () => l,
        am: () => p,
        jD: () => c,
        jL: () => b,
        rm: () => g,
        sj: () => s,
        tX: () => o,
      });
      let n = "__mcblock_banner_base",
        l = "__mcblock_banner_patterns",
        a = [
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
        i = new Set(a),
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
        s = {
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
      function c(e) {
        let t = e.replace("minecraft:", "").match(/^([a-z_]+?)_(wall_)?banner$/);
        return t && i.has(t[1]) ? t[1] : void 0;
      }
      let u = {
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
        Object.entries(u).map((e) => {
          let [t, r] = e;
          return [r, t];
        }),
      );
      let f = new Set([
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
      function _(e) {
        let t = e.replace("minecraft:", "");
        return /(^|_)banner$/.test(t) || /(^|_)wall_banner$/.test(t);
      }
      function g(e) {
        var t, r;
        if ("number" == typeof e && Number.isFinite(e)) return null != (t = a[e]) ? t : void 0;
        let n = String(null != e ? e : "")
          .trim()
          .toLowerCase();
        if (!n) return;
        let l = Number.parseInt(n, 10);
        if (/^\d+$/.test(n) && Number.isFinite(l)) return null != (r = a[l]) ? r : void 0;
        let o = n
          .replace(/^["']|["']$/g, "")
          .replace(/^minecraft:/, "")
          .replace(/^dye_/, "")
          .replace(/_dye$/, "");
        return i.has(o) ? o : void 0;
      }
      function m(e) {
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
          n = u[r];
        return n ? ("base" === n ? void 0 : n) : f.has(r) ? ("base" === r ? void 0 : r) : void 0;
      }
      function p(e) {
        if (!e || 0 === e.length) return;
        let t = e
          .map((e) => {
            let t = m(e.pattern),
              r = g(e.color);
            return t && r ? "".concat(t, ":").concat(r) : null;
          })
          .filter((e) => null !== e);
        return t.length > 0 ? t.join("|") : void 0;
      }
      function b(e) {
        if (!e) return [];
        let t = [];
        for (let r of e.split("|")) {
          let [e, n] = r.split(":"),
            l = m(e),
            a = g(n);
          l && a && t.push({ pattern: l, color: a });
        }
        return t;
      }
      function h(e) {
        let t = e.get("Data"),
          r = (null == t ? void 0 : t.isCompound()) ? t : e,
          n = w(e, ["id", "Id"]),
          l = "string" == typeof n ? n.toLowerCase() : "",
          a =
            r.has("Base") ||
            r.has("base") ||
            r.has("base_color") ||
            r.has("Patterns") ||
            r.has("patterns");
        if ((l && !l.includes("banner") && !a) || (!l && !a)) return;
        let i = g(w(r, ["Base", "base", "base_color", "BaseColor", "baseColor"])),
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
              let n = t.get(e);
              if (!(null == n ? void 0 : n.isCompound())) continue;
              let l = m(w(n, ["Pattern", "pattern", "pattern_id", "PatternId"])),
                a = g(w(n, ["Color", "color", "dye_color", "DyeColor"]));
              l && a && r.push({ pattern: l, color: a });
            }
            return r;
          })(r);
        if (i || 0 !== o.length)
          return { ...(i ? { baseColor: i } : {}), ...(o.length > 0 ? { patterns: o } : {}) };
      }
      function d(e) {
        var t;
        let r = (function (e) {
          if (!(null == e ? void 0 : e.isListOrArray())) return null;
          let t = e.getItems().map((e) => e.getAsNumber());
          return t.length < 3 ? null : [t[0], t[1], t[2]];
        })(null != (t = e.get("Pos")) ? t : e.get("pos"));
        if (r) return r;
        let n = k(e, ["x", "X"]),
          l = k(e, ["y", "Y"]),
          a = k(e, ["z", "Z"]);
        return void 0 !== n && void 0 !== l && void 0 !== a ? [n, l, a] : null;
      }
      function w(e, t) {
        for (let r of t) {
          let t = e.get(r);
          if (t) {
            if (t.isNumber()) return t.getAsNumber();
            if (t.isString()) return t.getAsString();
          }
        }
      }
      function k(e, t) {
        let r = w(e, t);
        if ("number" == typeof r && Number.isFinite(r)) return r;
        if ("string" == typeof r) {
          let e = Number.parseInt(r, 10);
          if (Number.isFinite(e)) return e;
        }
      }
    },
    95293: (e, t, r) => {
      (r.r(t),
        r.d(t, {
          getAllBlocks: () => d,
          getBlockFaceTextureUrl: () => h,
          getBlockTexture: () => p,
          initBlockTextureMapper: () => m,
          isBlockTextureMapperReady: () => b,
        }));
      var n = r(55671);
      let l = "/uploads/buildings/blockID/images/",
        a = "/uploads/buildings/blockID/block-textures/",
        i = "".concat(l, "Barrier.png"),
        o = null,
        s = null,
        c = null,
        u = null,
        f = null;
      function _(e) {
        return e
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "");
      }
      let g = { "minecraft:grass": "Short Grass", "minecraft:tallgrass": "Short Grass" };
      async function m() {
        if (!o)
          return (
            f ||
            (f = (async () => {
              try {
                let e = await fetch("/uploads/buildings/blockID/minecraft_blocks_database.json"),
                  t = await e.json();
                for (let e of ((o = new Map()), (s = new Map()), (c = new Map()), t)) {
                  let t = {
                    chineseName: e.chinese_name,
                    englishName: e.english_name,
                    textureUrl: "".concat(l).concat(e.image_filename),
                    imageFilename: e.image_filename,
                  };
                  if (e.minecraft_ids)
                    for (let r of e.minecraft_ids)
                      r.id &&
                        (function (e, t, r) {
                          if (!o || !s) return;
                          let n = (function (e, t) {
                              var r;
                              let n = g[t];
                              if (n) return _(e.english_name) === _(n) ? 1e3 : -1;
                              let l = t
                                  .replace(/^minecraft:/, "")
                                  .replace(/\[.*\]$/, "")
                                  .toLowerCase(),
                                a = 100 * (_(e.english_name) === l);
                              return (
                                e.numeric_id || (a += 10),
                                (null == (r = e.version) ? void 0 : r.includes("JE1.14")) &&
                                  (a += 5),
                                a
                              );
                            })(t, e),
                            l = s.get(e);
                          (!o.has(e) || n > (null != l ? l : -1)) && (o.set(e, r), s.set(e, n));
                        })(r.id, e, t);
                  let r = "minecraft:".concat(e.english_name.toLowerCase().replace(/\s+/g, "_"));
                  (o.has(r) || o.set(r, t),
                    e.chinese_name && !c.has(e.chinese_name) && c.set(e.chinese_name, t));
                }
                for (let [e, t] of (console.log(
                  "✅ Studio 方块纹理映射已加载: ".concat(o.size, " 个 minecraft:id"),
                ),
                Object.entries(g))) {
                  let r = o.get(e);
                  r &&
                    _(r.englishName) !== _(t) &&
                    console.error(
                      "❌ 歧义 id 裁决失效: "
                        .concat(e, " 期望「")
                        .concat(t, "」实际「")
                        .concat(r.englishName, "」") +
                        " —— 检查 minecraft_blocks_database.json 里该方块是否已改名/删除",
                    );
                }
                try {
                  let e = await fetch("/uploads/buildings/blockID/block-face-textures.json");
                  ((u = await e.json()),
                    console.log(
                      "✅ Studio 平面贴图映射已加载: ".concat(Object.keys(u).length, " 个"),
                    ));
                } catch (e) {
                  (console.warn("⚠️ 平面贴图映射加载失败，将使用图标贴图"), (u = {}));
                }
              } catch (e) {
                (console.error("❌ 加载方块纹理映射失败:", e), (o = new Map()), (s = new Map()));
              }
            })())
          );
      }
      function p(e) {
        if (!o) return k(e);
        let t = o.get(e);
        if (t) return t;
        let r = e.replace(/^minecraft:/, "");
        for (let [e, t] of o.entries()) if (e.endsWith(":".concat(r))) return t;
        let n = w(e);
        if (n !== e) {
          let e = o.get(n);
          if (e) return e;
        }
        if (c) {
          let t = e.replace(/^minecraft:/, ""),
            r = c.get(t);
          if (r) return r;
        }
        return k(e);
      }
      function b() {
        return null !== o;
      }
      function h(e) {
        if (!u) return null;
        let t = u[e];
        if (t) return "".concat(a).concat(t);
        let r = e.replace(/^minecraft:/, ""),
          n = "minecraft:".concat(r);
        if (u[n]) return "".concat(a).concat(u[n]);
        let l = w(e);
        if (l !== e) {
          let e = u[l];
          if (e) return "".concat(a).concat(e);
        }
        return null;
      }
      function d(e) {
        if (!o) return [];
        let t = new Set(),
          r = [];
        for (let [l, a] of o.entries()) {
          let i = (0, n.O5)(l);
          !i ||
            !(0, n.Yg)(i, e) ||
            t.has(i) ||
            (t.add(i),
            "Barrier.png" !== a.imageFilename &&
              r.push({
                blockId: i,
                chineseName: a.chineseName,
                englishName: a.englishName,
                textureUrl: a.textureUrl,
                imageFilename: a.imageFilename,
                category: (function (e) {
                  let t = e.replace(/^minecraft:/, "");
                  return /(_planks|_log|_wood|_stem|_hyphae)$/.test(t) || t.includes("bamboo")
                    ? "木材"
                    : /(_stone|_bricks?|cobblestone|_brick_|deepslate|tuff|calcite)/.test(t)
                      ? "石材"
                      : /(_ore|iron_|gold_|copper_|netherite|anvil)/.test(t)
                        ? "金属"
                        : /glass/.test(t)
                          ? "玻璃"
                          : /(wool|carpet|bed|banner|candle|_dye)/.test(t)
                            ? "装饰"
                            : /(grass|dirt|sand|gravel|clay|mud|moss|leaves|snow|ice|water|lava)/.test(
                                  t,
                                )
                              ? "自然"
                              : /(concrete|terracotta|glazed)/.test(t)
                                ? "混凝土"
                                : "其他";
                })(i),
              }));
        }
        return (r.sort((e, t) => e.chineseName.localeCompare(t.chineseName, "zh")), r);
      }
      function w(e) {
        return e
          .replace(/_wall$/, "")
          .replace(/_slab$/, "")
          .replace(/_stairs$/, "")
          .replace(/_fence$/, "")
          .replace(/_fence_gate$/, "")
          .replace(/_door$/, "")
          .replace(/_trapdoor$/, "")
          .replace(/_button$/, "")
          .replace(/_pressure_plate$/, "")
          .replace(/_sign$/, "")
          .replace(/_wall_sign$/, "");
      }
      function k(e) {
        let t = e
          .replace(/^minecraft:/, "")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (e) => e.toUpperCase());
        return { chineseName: t, englishName: t, textureUrl: i, imageFilename: "Barrier.png" };
      }
    },
  },
]);

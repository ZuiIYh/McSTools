"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2925],
  {
    235: (e, t, n) => {
      n.d(t, { Gn: () => z, n4: () => c, vb: () => k });
      let r = new Set(["north", "south", "east", "west", "up", "down"]),
        i = new Set(["north", "east", "south", "west"]),
        o = { north: "east", east: "south", south: "west", west: "north", up: "up", down: "down" },
        a = { north: "north", south: "south", east: "west", west: "east", up: "up", down: "down" },
        s = { north: "south", south: "north", east: "east", west: "west", up: "up", down: "down" },
        l = { north: "north", south: "south", east: "east", west: "west", up: "down", down: "up" };
      function u(e) {
        let t = e % 360;
        return t < 0 ? t + 360 : t;
      }
      function c(e, t) {
        let [n, r, i] = t,
          c = { kind: e, size: [n, r, i] };
        switch (e) {
          case "rotate-90":
            return {
              ...c,
              newSize: [i, r, n],
              mapCell: (e) => {
                let [t, n, r] = e;
                return [i - 1 - r, n, t];
              },
              mapPoint: (e) => {
                let [t, n, r] = e;
                return [i - r, n, t];
              },
              mapDirection: (e) => o[e],
              mapYaw: (e) => u(e + 90),
              mapPitch: (e) => e,
              mirrorsHorizontally: !1,
              flipsVertically: !1,
              quarterTurns: 1,
            };
          case "rotate-180":
            return {
              ...c,
              newSize: [n, r, i],
              mapCell: (e) => {
                let [t, r, o] = e;
                return [n - 1 - t, r, i - 1 - o];
              },
              mapPoint: (e) => {
                let [t, r, o] = e;
                return [n - t, r, i - o];
              },
              mapDirection: (e) => o[o[e]],
              mapYaw: (e) => u(e + 180),
              mapPitch: (e) => e,
              mirrorsHorizontally: !1,
              flipsVertically: !1,
              quarterTurns: 2,
            };
          case "rotate-270":
            return {
              ...c,
              newSize: [i, r, n],
              mapCell: (e) => {
                let [t, r, i] = e;
                return [i, r, n - 1 - t];
              },
              mapPoint: (e) => {
                let [t, r, i] = e;
                return [i, r, n - t];
              },
              mapDirection: (e) => o[o[o[e]]],
              mapYaw: (e) => u(e + 270),
              mapPitch: (e) => e,
              mirrorsHorizontally: !1,
              flipsVertically: !1,
              quarterTurns: 3,
            };
          case "mirror-x":
            return {
              ...c,
              newSize: [n, r, i],
              mapCell: (e) => {
                let [t, r, i] = e;
                return [n - 1 - t, r, i];
              },
              mapPoint: (e) => {
                let [t, r, i] = e;
                return [n - t, r, i];
              },
              mapDirection: (e) => a[e],
              mapYaw: (e) => u(-e),
              mapPitch: (e) => e,
              mirrorsHorizontally: !0,
              flipsVertically: !1,
              quarterTurns: 0,
            };
          case "mirror-z":
            return {
              ...c,
              newSize: [n, r, i],
              mapCell: (e) => {
                let [t, n, r] = e;
                return [t, n, i - 1 - r];
              },
              mapPoint: (e) => {
                let [t, n, r] = e;
                return [t, n, i - r];
              },
              mapDirection: (e) => s[e],
              mapYaw: (e) => u(180 - e),
              mapPitch: (e) => e,
              mirrorsHorizontally: !0,
              flipsVertically: !1,
              quarterTurns: 0,
            };
          case "mirror-y":
            return {
              ...c,
              newSize: [n, r, i],
              mapCell: (e) => {
                let [t, n, i] = e;
                return [t, r - 1 - n, i];
              },
              mapPoint: (e) => {
                let [t, n, i] = e;
                return [t, r - n, i];
              },
              mapDirection: (e) => l[e],
              mapYaw: (e) => e,
              mapPitch: (e) => -e,
              mirrorsHorizontally: !1,
              flipsVertically: !0,
              quarterTurns: 0,
            };
        }
      }
      let m = new Set(["rail", "powered_rail", "detector_rail", "activator_rail"]),
        p = new Set(["chest", "trapped_chest"]),
        f = new Set(["lantern", "soul_lantern"]),
        d = { left: "right", right: "left" },
        h = {
          inner_left: "inner_right",
          inner_right: "inner_left",
          outer_left: "outer_right",
          outer_right: "outer_left",
        },
        g = { top: "bottom", bottom: "top", upper: "lower", lower: "upper" },
        w = { floor: "ceiling", ceiling: "floor" };
      function b(e) {
        return r.has(e);
      }
      function k(e, t, n) {
        let r = e.replace(/^minecraft:/, ""),
          o = "up" in t && "down" in t,
          a = {};
        for (let [e, s] of Object.entries(t))
          i.has(e) || (("up" === e || "down" === e) && o)
            ? (a[n.mapDirection(e)] = s)
            : (a[e] = (function (e, t, n, r) {
                var i, o, a, s, l;
                if ("facing" === t || t.endsWith("_facing") || "vertical_direction" === t)
                  return b(n) && ("hopper" !== e || "down" !== n) ? r.mapDirection(n) : n;
                if ("axis" === t)
                  return r.quarterTurns % 2 == 0 ? n : "x" === n ? "z" : "z" === n ? "x" : n;
                if ("rotation" === t) {
                  if (!/^\d+$/.test(n)) return n;
                  let e = Number(n);
                  return e < 0 || e > 15
                    ? n
                    : r.quarterTurns
                      ? String((e + 4 * r.quarterTurns) % 16)
                      : "mirror-x" === r.kind
                        ? String((16 - e) % 16)
                        : "mirror-z" === r.kind
                          ? String((24 - e) % 16)
                          : n;
                }
                if ("orientation" === t) {
                  let e = n.split("_");
                  return 2 === e.length && e.every(b)
                    ? e.map((e) => r.mapDirection(e)).join("_")
                    : n;
                }
                return "shape" === t
                  ? e.endsWith("_stairs")
                    ? r.mirrorsHorizontally && null != (i = h[n])
                      ? i
                      : n
                    : m.has(e)
                      ? (function (e, t) {
                          if (t.flipsVertically) return e;
                          if ("north_south" === e || "east_west" === e)
                            return t.quarterTurns % 2 == 0
                              ? e
                              : "north_south" === e
                                ? "east_west"
                                : "north_south";
                          if (e.startsWith("ascending_")) {
                            let n = e.slice(10);
                            return b(n) ? "ascending_".concat(t.mapDirection(n)) : e;
                          }
                          let n = e.split("_");
                          if (2 !== n.length || !n.every(b)) return e;
                          let r = n.map((e) => t.mapDirection(e)),
                            i = r.find((e) => "north" === e || "south" === e),
                            o = r.find((e) => "east" === e || "west" === e);
                          return i && o ? "".concat(i, "_").concat(o) : e;
                        })(n, r)
                      : n
                  : "hinge" === t
                    ? r.mirrorsHorizontally && null != (o = d[n])
                      ? o
                      : n
                    : "type" === t
                      ? p.has(e)
                        ? r.mirrorsHorizontally && null != (a = d[n])
                          ? a
                          : n
                        : e.endsWith("_slab") && r.flipsVertically
                          ? "top" === n
                            ? "bottom"
                            : "bottom" === n
                              ? "top"
                              : n
                          : n
                      : r.flipsVertically
                        ? "half" === t
                          ? null != (s = g[n])
                            ? s
                            : n
                          : "face" === t || "attach_face" === t || "attachment" === t
                            ? null != (l = w[n])
                              ? l
                              : n
                            : "hanging" === t && f.has(e)
                              ? "true" === n
                                ? "false"
                                : "false" === n
                                  ? "true"
                                  : n
                              : n
                        : n;
              })(r, e, s, n));
        return a;
      }
      function z(e, t) {
        var n;
        let r = c(t, e.size);
        return {
          ...e,
          size: r.newSize,
          blocks: e.blocks.map((e) => ({
            ...e,
            position: r.mapCell(e.position),
            properties: k(e.blockId, e.properties, r),
          })),
          entities:
            null == (n = e.entities)
              ? void 0
              : n.map((e) =>
                  (function (e, t) {
                    var n, r;
                    let i = {
                      ...e,
                      position: t.mapPoint(e.position),
                      rotation: e.rotation
                        ? [t.mapYaw(e.rotation[0]), t.mapPitch(e.rotation[1])]
                        : void 0,
                    };
                    return (
                      (null == (n = e.itemFrame) ? void 0 : n.facing) &&
                        (i.itemFrame = {
                          ...e.itemFrame,
                          facing: t.mapDirection(e.itemFrame.facing),
                        }),
                      (null == (r = e.painting) ? void 0 : r.facing) &&
                        (i.painting = { ...e.painting, facing: t.mapDirection(e.painting.facing) }),
                      e.fallingBlock &&
                        (i.fallingBlock = {
                          ...e.fallingBlock,
                          properties: k(e.fallingBlock.blockId, e.fallingBlock.properties, t),
                        }),
                      i
                    );
                  })(e, r),
                ),
        };
      }
    },
    1855: (e, t, n) => {
      n.d(t, { $: () => s });
      var r = n(95155),
        i = n(12115),
        o = n(97003),
        a = n(69381);
      let s = i.forwardRef((e, t) => {
        let { selected: n = !1, count: i, size: s = "sm", children: l, ...u } = e;
        return (0, r.jsxs)(o.$, {
          ref: t,
          size: s,
          variant: n ? "primary" : "secondary",
          controlKind: "filter",
          "aria-pressed": n,
          "data-selected": n ? "true" : "false",
          ...u,
          children: [
            l,
            "number" == typeof i && (0, r.jsx)(a.x, { tone: n ? "neutral" : "brand", children: i }),
          ],
        });
      });
      s.displayName = "FilterChip";
    },
    8934: (e, t, n) => {
      function r(e) {
        var t;
        let n = null == (t = e.sourceMeta) ? void 0 : t.dataVersion;
        return Number.isInteger(n) && (null != n ? n : 0) > 0 ? n : 3955;
      }
      n.d(t, { U: () => r, v: () => o });
      let i = [
        [4440, "1.21.8"],
        [4438, "1.21.7"],
        [4435, "1.21.6"],
        [4325, "1.21.5"],
        [4189, "1.21.4"],
        [4082, "1.21.3"],
        [4080, "1.21.2"],
        [3955, "1.21.1"],
        [3953, "1.21"],
        [3839, "1.20.6"],
        [3837, "1.20.5"],
        [3700, "1.20.4"],
        [3698, "1.20.3"],
        [3578, "1.20.2"],
        [3465, "1.20.1"],
        [3463, "1.20"],
        [3337, "1.19.4"],
        [3218, "1.19.3"],
        [3120, "1.19.2"],
        [3117, "1.19.1"],
        [3105, "1.19"],
        [2975, "1.18.2"],
        [2865, "1.18.1"],
        [2860, "1.18"],
        [2730, "1.17.1"],
        [2724, "1.17"],
        [2586, "1.16.5"],
        [2584, "1.16.4"],
        [2580, "1.16.3"],
        [2578, "1.16.2"],
        [2567, "1.16.1"],
        [2566, "1.16"],
        [2230, "1.15.2"],
        [2227, "1.15.1"],
        [2225, "1.15"],
        [1976, "1.14.4"],
        [1968, "1.14.3"],
        [1963, "1.14.2"],
        [1957, "1.14.1"],
        [1952, "1.14"],
        [1631, "1.13.2"],
        [1628, "1.13.1"],
        [1519, "1.13"],
      ];
      function o(e) {
        if (!Number.isInteger(e) || (null != e ? e : 0) <= 0) return null;
        let t = i.find((t) => {
          let [n] = t;
          return e >= n;
        });
        return t ? (e === t[0] ? t[1] : "".concat(t[1], "+")) : null;
      }
    },
    18559: (e, t, n) => {
      n.d(t, { AI: () => s, Dn: () => a, Gq: () => l, JB: () => i, TW: () => r });
      let r = "studio_edit_session_v1",
        i = 432e5,
        o = [
          r,
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
      function a() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now();
        try {
          var t;
          let n = sessionStorage.getItem(r);
          if (!n) return null;
          let o = JSON.parse(n);
          if (
            1 !== o.version ||
            "number" != typeof o.updatedAt ||
            e - o.updatedAt > i ||
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
      function s(e) {
        let t = { ...e, version: 1, updatedAt: Date.now() };
        try {
          return (
            sessionStorage.setItem(r, JSON.stringify(t)),
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
    38007: (e, t, n) => {
      n.d(t, { P: () => g });
      var r = n(82084),
        i = n(235),
        o = n(5166),
        a = n(75342);
      let s = new Set([
        "minecraft:air",
        "minecraft:cave_air",
        "minecraft:void_air",
        "minecraft:light",
        "minecraft:barrier",
        "minecraft:structure_void",
      ]);
      var l = n(91986),
        u = n(8934);
      let c = new Set(["minecraft:air", "minecraft:cave_air", "minecraft:void_air"]),
        m = ["down", "up", "north", "south", "west", "east"],
        p = ["south", "west", "north", "east"],
        f = ["Facing", "facing", "Direction", "direction", "Dir"],
        d = {
          north: [0, 0, -1],
          south: [0, 0, 1],
          east: [1, 0, 0],
          west: [-1, 0, 0],
          up: [0, 1, 0],
          down: [0, -1, 0],
        },
        h = { north: "west", west: "south", south: "east", east: "north" };
      function g(e) {
        let { originalFileData: t, model: n, history: g, targetFormat: U, projectName: j } = e,
          L = (function (e, t, n) {
            let i = r.TD.read(new Uint8Array(e));
            return "litematic" === t
              ? (function (e, t) {
                  let n = e.root,
                    i = n.getCompound("Regions"),
                    o = [];
                  for (let e of i.keys()) {
                    let n = i.getCompound(e),
                      a = n.getCompound("Size"),
                      s = n.getCompound("Position"),
                      l = [a.getNumber("x"), a.getNumber("y"), a.getNumber("z")],
                      u = [s.getNumber("x"), s.getNumber("y"), s.getNumber("z")],
                      c = l.map(Math.abs);
                    S(c);
                    let m = P(
                        l.map((e, t) => (e < 0 ? u[t] + e + 1 : u[t])),
                        t,
                      ),
                      p = P(u, t),
                      f = (function (e) {
                        let t = [];
                        for (let n = 0; n < e.length; n++) {
                          let r = e.getCompound(n);
                          t.push({
                            name: r.getString("Name"),
                            properties: r.has("Properties") ? V(r.getCompound("Properties")) : {},
                            source: r,
                          });
                        }
                        return t;
                      })(n.getList("BlockStatePalette", r.t$.Compound)),
                      d = c[0] * c[1] * c[2],
                      h = Math.max(2, Math.ceil(Math.log2(f.length))),
                      g = (function (e, t, n) {
                        if (e.length < Math.ceil((n * t) / 64))
                          throw Error("原文件 BlockStates 长度不足，不能安全写回");
                        let r = new Uint32Array(n),
                          i = (1n << BigInt(t)) - 1n;
                        for (let o = 0; o < n; o++) {
                          let n = o * t,
                            a = Math.floor(n / 64),
                            s = n % 64;
                          if (a >= e.length) break;
                          let l = (BigInt.asUintN(64, e[a].toBigInt()) >> BigInt(s)) & i;
                          if (s + t > 64 && a + 1 < e.length) {
                            let n = t - (64 - s);
                            l |=
                              (BigInt.asUintN(64, e[a + 1].toBigInt()) &
                                ((1n << BigInt(n)) - 1n)) <<
                              BigInt(64 - s);
                          }
                          r[o] = Number(l);
                        }
                        return r;
                      })(n.getLongArray("BlockStates").getItems(), h, d);
                    if (0 === f.length || g.some((e) => e >= f.length))
                      throw Error("原文件调色板索引越界，无法安全写回");
                    let b = [];
                    for (let e of I(n, "TileEntities")) {
                      let t = x(e);
                      if (!t) throw Error("原文件方块实体缺少有效坐标，无法安全写回");
                      b.push({ local: t, nbt: e, shape: "litematic" });
                    }
                    let k = [];
                    for (let e of I(n, "Entities")) {
                      let t = w(e, e, "litematic", p);
                      t && k.push(t);
                    }
                    o.push({
                      name: e,
                      min: m,
                      size: c,
                      palette: f,
                      cells: g,
                      tileEntities: b,
                      entities: k,
                      blockTicks: B(n, "PendingBlockTicks"),
                      fluidTicks: B(n, "PendingFluidTicks"),
                      source: n,
                    });
                  }
                  let a = n.has("Metadata") ? n.getCompound("Metadata") : null;
                  return {
                    sourceFormat: "litematic",
                    file: e,
                    schematic: null,
                    schemVersion: 0,
                    frameOffset: [...t],
                    regions: o,
                    meta: {
                      name: (null == a ? void 0 : a.has("Name")) ? a.getString("Name") : void 0,
                      author: (null == a ? void 0 : a.has("Author"))
                        ? a.getString("Author")
                        : void 0,
                      description: (null == a ? void 0 : a.has("Description"))
                        ? a.getString("Description")
                        : void 0,
                      dataVersion: n.has("MinecraftDataVersion")
                        ? n.getNumber("MinecraftDataVersion")
                        : void 0,
                    },
                  };
                })(i, n)
              : (function (e) {
                  var t, n, r;
                  let i = e.root.has("Schematic"),
                    o = i ? e.root.getCompound("Schematic") : e.root,
                    a = o.has("Version") ? o.getNumber("Version") : i ? 3 : 2,
                    s = [o.getNumber("Width"), o.getNumber("Height"), o.getNumber("Length")];
                  S(s, !0);
                  let l = o.has("Blocks") ? o.getCompound("Blocks") : o,
                    u = l === o && o.has("BlockData") ? "BlockData" : "Data",
                    c = new Map();
                  l.getCompound("Palette").forEach((e, t) => {
                    if (
                      !Number.isInteger(t.getAsNumber()) ||
                      0 > t.getAsNumber() ||
                      t.getAsNumber() > 32e6
                    )
                      throw Error("原文件调色板编号无效，无法安全写回");
                    c.set(
                      t.getAsNumber(),
                      (function (e) {
                        let t = e.indexOf("[");
                        if (-1 === t) return { name: e, properties: {} };
                        let n = {};
                        for (let r of e.slice(t + 1, e.endsWith("]") ? -1 : void 0).split(",")) {
                          let [e, t] = r.split("=");
                          e && void 0 !== t && (n[e.trim()] = t.trim());
                        }
                        return { name: e.slice(0, t), properties: n };
                      })(e),
                    );
                  });
                  let m = Math.max(0, ...c.keys()),
                    p = [];
                  for (let e = 0; e <= m; e++)
                    p.push(null != (t = c.get(e)) ? t : { name: "minecraft:air", properties: {} });
                  let f = s[0] * s[1] * s[2],
                    d = (function (e, t) {
                      let n = new Uint32Array(t),
                        r = 0,
                        i = 0;
                      for (; i < e.length && r < t;) {
                        let t,
                          o = 0,
                          a = 0;
                        do {
                          if (i >= e.length || a >= 35)
                            throw Error("原文件方块索引 VarInt 不完整，不能安全写回");
                          if (((t = 255 & e[i++]), 28 === a && (240 & t) != 0))
                            throw Error("原文件方块索引 VarInt 溢出，不能安全写回");
                          ((o |= (127 & t) << a), (a += 7));
                        } while ((128 & t) != 0);
                        n[r++] = o;
                      }
                      if (r !== t || i !== e.length)
                        throw Error("原文件方块数据长度与尺寸不符，不能安全写回");
                      return n;
                    })(
                      l
                        .getByteArray(u)
                        .getItems()
                        .map((e) => e.getAsNumber()),
                      f,
                    );
                  if (d.some((e) => !c.has(e))) throw Error("原文件调色板索引越界，无法安全写回");
                  let h = o.has("Offset") && null != (n = D(o.get("Offset"))) ? n : [0, 0, 0],
                    g = [],
                    b = new Set();
                  for (let e of [l, o])
                    if (!b.has(e))
                      for (let t of (b.add(e), ["BlockEntities", "TileEntities"]))
                        for (let n of I(e, t)) {
                          let e =
                            null !=
                            (r = (function (e) {
                              let t = D(e);
                              return t && 3 === t.length ? [t[0], t[1], t[2]] : null;
                            })(n.get("Pos")))
                              ? r
                              : x(n);
                          if (!e) throw Error("原文件方块实体缺少有效坐标，无法安全写回");
                          g.push({
                            local: e.map(Math.floor),
                            nbt: n,
                            shape: a >= 3 && n.has("Data") ? "schem3" : "schem2",
                          });
                        }
                  let k = [];
                  for (let e of I(o, "Entities")) {
                    let t = a >= 3 && e.has("Data") ? "schem3" : "schem2",
                      n = "schem3" === t ? e.getCompound("Data") : e,
                      r = D(e.get("Pos"));
                    if (!r || 3 !== r.length) throw Error("原文件实体缺少有效坐标，无法安全写回");
                    let i = (function (e, t, n) {
                        if (0 === n[0] && 0 === n[1] && 0 === n[2]) return [0, 0, 0];
                        let r = (e) => e.every((e, n) => e >= -2 && e <= t[n] + 2);
                        return r(e) ? [0, 0, 0] : r(P(e, n)) ? n : [0, 0, 0];
                      })(r, s, h),
                      o = w(e, n, t, [-i[0], -i[1], -i[2]]);
                    o && k.push(o);
                  }
                  let z = o.has("Metadata") ? o.getCompound("Metadata") : null;
                  return {
                    sourceFormat: "schem",
                    file: e,
                    schematic: o,
                    schemVersion: a,
                    frameOffset: [0, 0, 0],
                    regions: [
                      {
                        name: "Schematic",
                        min: [0, 0, 0],
                        size: s,
                        palette: p,
                        cells: d,
                        tileEntities: g,
                        entities: k,
                        blockTicks: [],
                        fluidTicks: [],
                        source: null,
                      },
                    ],
                    meta: {
                      name: (null == z ? void 0 : z.has("Name")) ? z.getString("Name") : void 0,
                      author: (null == z ? void 0 : z.has("Author"))
                        ? z.getString("Author")
                        : void 0,
                      description: (null == z ? void 0 : z.has("Description"))
                        ? z.getString("Description")
                        : void 0,
                      dataVersion: o.has("DataVersion") ? o.getNumber("DataVersion") : void 0,
                    },
                  };
                })(i);
          })(t, n.format, n.originOffset || [0, 0, 0]);
        if (L.regions.reduce((e, t) => e + t.cells.length, 0) > 32e6)
          throw Error("投影区域总体积过大，无法安全写回");
        for (let e of (U !== n.format &&
          (function (e) {
            let t = (e) => {
                throw Error("无法无损转换：".concat(e, "。请按原格式导出。"));
              },
              n = (e, n, r) => {
                let i = new Set(n);
                for (let n of e.keys())
                  i.has(n) || t("".concat(r, "包含目标格式无法表达的标签 ").concat(n));
              };
            if ("litematic" === e.sourceFormat)
              for (let r of (n(
                e.file.root,
                ["Version", "SubVersion", "MinecraftDataVersion", "Metadata", "Regions"],
                "原文件",
              ),
              1 !== e.regions.length && t("多区域的名称和独立边界无法保存到单区域 schem"),
              e.regions))
                for (let i of (T(r.min, e.frameOffset).some((e) => 0 !== e) &&
                  t("原文件含非零区域原点 Position"),
                r.source &&
                  n(
                    r.source,
                    [
                      "Position",
                      "Size",
                      "BlockStatePalette",
                      "BlockStates",
                      "TileEntities",
                      "Entities",
                      "PendingBlockTicks",
                      "PendingFluidTicks",
                    ],
                    "区域",
                  ),
                (r.blockTicks.length || r.fluidTicks.length) && t("原文件包含计划刻"),
                r.palette))
                  i.source && n(i.source, ["Name", "Properties"], "调色板");
            else {
              let r = e.schematic;
              (r !== e.file.root && n(e.file.root, ["Schematic"], "原文件"),
                n(
                  r,
                  [
                    "Version",
                    "DataVersion",
                    "Width",
                    "Height",
                    "Length",
                    "Offset",
                    "Metadata",
                    "Palette",
                    "PaletteMax",
                    "BlockData",
                    "Data",
                    "BlockEntities",
                    "TileEntities",
                    "Entities",
                    "Blocks",
                  ],
                  "schem",
                ),
                r.has("Blocks") &&
                  n(r.getCompound("Blocks"), ["Palette", "Data", "BlockEntities"], "Blocks"));
              let i = D(r.get("Offset"));
              for (let r of ((null == i ? void 0 : i.some((e) => 0 !== e)) &&
                t("原文件有非零粘贴偏移 Offset"),
              [...e.regions[0].tileEntities, ...e.regions[0].entities]))
                "schem3" === r.shape && n(r.nbt, ["Id", "Pos", "Data"], "NBT 条目外层");
            }
          })(L),
        g)) {
          let t = e.operation;
          if (t && "replace" !== t.type && "replace-batch" !== t.type && "delete" !== t.type) {
            if ("transform" === t.type) {
              if (!t.kind) throw Error("旧会话里的镜像 / 旋转没有记录方向，不能按原文件变换");
              if (L.schematic && ["Biomes", "BiomeData"].some((e) => L.schematic.has(e)))
                throw Error("原文件包含生物群系数据，尚不能安全镜像或旋转。请撤销变换后导出。");
              let e = (0, i.n4)(t.kind, t.before.size);
              for (let t of L.regions)
                !(function (e, t) {
                  let [n, o, s] = e.size,
                    l = t.mapCell(e.min),
                    u = t.mapCell([e.min[0] + n - 1, e.min[1] + o - 1, e.min[2] + s - 1]),
                    c = [Math.min(l[0], u[0]), Math.min(l[1], u[1]), Math.min(l[2], u[2])],
                    g = [
                      Math.abs(l[0] - u[0]) + 1,
                      Math.abs(l[1] - u[1]) + 1,
                      Math.abs(l[2] - u[2]) + 1,
                    ],
                    w = [],
                    b = e.palette.map((e, n) => {
                      let r = (0, i.vb)(e.name, e.properties, t);
                      return (w.push({ name: e.name, properties: r, source: e.source }), n);
                    }),
                    z = new Uint32Array(e.cells.length);
                  for (let n = 0; n < e.cells.length; n++) {
                    var v;
                    z[N(P(t.mapCell(T(e.min, E(n, e.size))), c), g)] =
                      null != (v = b[e.cells[n]]) ? v : 0;
                  }
                  let _ = (n) => P(t.mapCell(T(e.min, n)), c);
                  for (let n of e.tileEntities)
                    ((n.local = _(n.local)),
                      t.mirrorsHorizontally &&
                        (function (e) {
                          let t = "schem3" === e.shape ? e.nbt.getCompound("Data") : e.nbt;
                          if ("minecraft:decorated_pot" !== y(e.nbt) || !t.has("sherds")) return;
                          let n = t.get("sherds");
                          if (!(null == n ? void 0 : n.isList()) || 4 !== n.length) return;
                          let i = n.getItems();
                          t.set("sherds", new r.Jp([i[0], i[2], i[1], i[3]], n.getType()));
                        })(n));
                  for (let t of [...e.blockTicks, ...e.fluidTicks]) t.local = _(t.local);
                  for (let n of e.entities)
                    !(function e(t, n) {
                      let o = k(t),
                        s = y(t.nbt);
                      if (
                        n.kind.startsWith("mirror-") &&
                        s.endsWith("_display") &&
                        o.has("transformation")
                      )
                        throw Error(
                          "展示实体含局部 transformation，尚不能安全镜像。请撤销镜像后导出。",
                        );
                      if (
                        n.kind.startsWith("mirror-") &&
                        o.has("Pose") &&
                        o.getCompound("Pose").size > 0
                      )
                        throw Error("实体含自定义 Pose，尚不能安全镜像。请撤销镜像后导出。");
                      if (
                        n.kind.startsWith("mirror-") &&
                        o.has("ItemRotation") &&
                        0 !== o.getNumber("ItemRotation")
                      )
                        throw Error(
                          "展示框含非零 ItemRotation，尚不能安全镜像。请撤销镜像后导出。",
                        );
                      let l = "minecraft:painting" === s;
                      if (l && !(0, a.Hp)(C(o, ["variant", "Variant", "Motive", "motive"])))
                        throw Error("画的变体尺寸未知，无法安全变换挂点。请撤销镜像或旋转后导出。");
                      for (let r of ((t.pos = n.mapPoint(t.pos)), t.passengers)) e(r, n);
                      let u = D(o.get("Motion"));
                      for (let e of ((null == u ? void 0 : u.length) === 3 &&
                        o.set("Motion", W(P(n.mapPoint(u), n.mapPoint([0, 0, 0])))),
                      [
                        "Leash",
                        "leash",
                        "SleepingX",
                        "BeamTarget",
                        "PatrolTarget",
                        "HivePos",
                        "FlowerPos",
                      ]))
                        if (o.has(e))
                          throw Error(
                            "实体包含尚不支持变换的空间引用 ".concat(
                              e,
                              "，请撤销镜像或旋转后按原格式导出",
                            ),
                          );
                      let c = D(o.get("Rotation"));
                      if (o.has("Rotation")) {
                        let e = o.get("Rotation");
                        if (
                          !e.isList() ||
                          !c ||
                          2 !== c.length ||
                          ![r.t$.Float, r.t$.Double].includes(e.getType())
                        )
                          throw Error("实体 Rotation 类型或长度无效，无法安全变换");
                        o.set(
                          "Rotation",
                          e.getType() === r.t$.Double
                            ? new r.Jp(
                                [new r.QU(n.mapYaw(c[0])), new r.QU(n.mapPitch(c[1]))],
                                r.t$.Double,
                              )
                            : new r.Jp(
                                [new r.Nt(n.mapYaw(c[0])), new r.Nt(n.mapPitch(c[1]))],
                                r.t$.Float,
                              ),
                        );
                      }
                      let g = null;
                      for (let e of f) {
                        let t = o.get(e);
                        if (null == t ? void 0 : t.isString()) {
                          let i = t.getAsString().toLowerCase();
                          if (!(i in d)) throw Error("实体朝向字符串无效，无法安全变换");
                          ((g = n.mapDirection(i)), o.set(e, new r.Gz(g)));
                          break;
                        }
                        if (!(null == t ? void 0 : t.isNumber())) continue;
                        let i = l ? p : m,
                          a = i[Math.trunc(t.getAsNumber())];
                        if (!a) continue;
                        let s = n.mapDirection(a),
                          u = i.indexOf(s);
                        if (!(u < 0)) {
                          (o.set(
                            e,
                            t.isShort()
                              ? new r.pT(u)
                              : t.isInt()
                                ? new r.QT(u)
                                : t.isLong()
                                  ? new r.l0(BigInt(u))
                                  : t.isFloat()
                                    ? new r.Nt(u)
                                    : t.isDouble()
                                      ? new r.QU(u)
                                      : new r.zj(u),
                          ),
                            (g = s));
                          break;
                        }
                      }
                      if (t.tile) {
                        var w;
                        let e = C(o, ["variant", "Variant", "Motive", "motive"]);
                        t.tile =
                          null !=
                          (w =
                            l && g
                              ? (function (e, t, n) {
                                  let r = h[t];
                                  if (!r) return null;
                                  let i = d[t],
                                    o = d[r],
                                    a = 0.5 * (n[0] % 2 == 0),
                                    s = 0.5 * (n[1] % 2 == 0),
                                    l = [
                                      e[0] - 0.5 + 0.46875 * i[0] - o[0] * a,
                                      e[1] - 0.5 - s,
                                      e[2] - 0.5 + 0.46875 * i[2] - o[2] * a,
                                    ],
                                    u = l.map(Math.round);
                                  return l.every((e, t) => 0.02 > Math.abs(e - u[t])) ? u : null;
                                })(t.pos, g, (0, a.o)(e))
                              : null)
                            ? w
                            : n.mapCell(t.tile);
                      }
                      if ("minecraft:falling_block" === s && o.has("BlockState")) {
                        let e = o.getCompound("BlockState");
                        if (e.has("Properties")) {
                          let t = V(e.getCompound("Properties"));
                          e.set(
                            "Properties",
                            (function (e) {
                              let t = r.GJ.create();
                              for (let [n, i] of Object.entries(e)) t.set(n, new r.Gz(i));
                              return t;
                            })((0, i.vb)(e.getString("Name"), t, n)),
                          );
                        }
                      }
                    })(n, t);
                  ((e.min = c), (e.size = g), (e.palette = w), (e.cells = z));
                })(t, e);
              continue;
            }
            throw Error("编辑记录里有移动操作，不能按原文件写回");
          }
        }
        return (
          (function (e, t) {
            var n, r, i;
            let a = new Map();
            for (let e of t.blocks) {
              let t = M(e.position),
                r = null != (n = a.get(t)) ? n : [];
              (r.push(e), a.set(t, r));
            }
            let l = new Map(),
              u = 0;
            for (let t of e.regions) {
              let e = t.palette.map((e) => {
                  var t;
                  return ((t = (0, o.C)(e.name)), s.has(t));
                }),
                n = t.palette.map((e) => F((0, o.C)(e.name), O((0, o.G)(e.properties)))),
                c = new Map();
              t.palette.forEach((e, t) => {
                c.has(F(e.name, e.properties)) || c.set(F(e.name, e.properties), t);
              });
              let m = (r, i) => {
                  let a = F(r, i),
                    l = c.get(a);
                  if (void 0 === l) {
                    var u;
                    ((l = t.palette.length),
                      t.palette.push({ name: r, properties: i }),
                      e.push(((u = (0, o.C)(r)), s.has(u))),
                      n.push(F((0, o.C)(r), O(i))),
                      c.set(a, l));
                  }
                  return l;
                },
                p = new Set(),
                f = new Set();
              for (let s = 0; s < t.cells.length; s++) {
                let c = t.cells[s];
                if (c >= t.palette.length || e[c]) continue;
                let d = E(s, t.size),
                  h = M(T(t.min, d)),
                  g = null != (i = l.get(h)) ? i : 0,
                  w = null == (r = a.get(h)) ? void 0 : r[g];
                if (!w) {
                  ((t.cells[s] = m("minecraft:air", {})), f.add(M(d)));
                  continue;
                }
                (l.set(h, g + 1), u++);
                let b = O(w.properties);
                n[c] !== F(w.blockId, b) &&
                  (!(function (e, t) {
                    if (e === t) return !0;
                    let n = (e) => {
                      if (!e.startsWith("minecraft:")) return e;
                      let t = e.slice(10);
                      return t.endsWith("_banner")
                        ? "banner"
                        : t.endsWith("_hanging_sign")
                          ? "hanging_sign"
                          : t.endsWith("_sign")
                            ? "sign"
                            : "shulker_box" === t || t.endsWith("_shulker_box")
                              ? "shulker_box"
                              : t.endsWith("_head") || t.endsWith("_skull")
                                ? "skull"
                                : t.endsWith("_bed")
                                  ? "bed"
                                  : "chest" === t || "trapped_chest" === t
                                    ? "chest"
                                    : e;
                    };
                    return n(e) === n(t);
                  })((0, o.C)(t.palette[c].name), w.blockId) && p.add(M(d)),
                  (t.cells[s] = m(w.blockId, b)));
              }
              ((f.size > 0 || p.size > 0) &&
                (t.tileEntities = t.tileEntities.filter(
                  (e) => !f.has(M(e.local)) && !p.has(M(e.local)),
                )),
                f.size > 0 &&
                  ((t.blockTicks = t.blockTicks.filter((e) => !f.has(M(e.local)))),
                  (t.fluidTicks = t.fluidTicks.filter((e) => !f.has(M(e.local))))));
            }
            if (u !== t.blocks.length)
              throw Error("当前模型里有原文件中找不到的方块位置，不能按原文件写回");
          })(L, n),
          "litematic" === U
            ? (function (e, t, n) {
                var i, a, s, m, p, f;
                let d = "litematic" === e.sourceFormat,
                  h = d ? e.file : new r.TD("", r.GJ.create(), "gzip", !1, void 0),
                  g = h.root,
                  w = r.GJ.create(),
                  k = 0,
                  y = 0,
                  S = [1 / 0, 1 / 0, 1 / 0],
                  M = [-1 / 0, -1 / 0, -1 / 0],
                  E = (0, l.ew)(null != n ? n : e.meta.name, "投影导出");
                for (let t of e.regions) {
                  let n = null != (a = t.source) ? a : r.GJ.create();
                  (n.set("Position", H(T(t.min, e.frameOffset))),
                    n.set("Size", H(t.size)),
                    n.set("BlockStatePalette", new r.Jp(t.palette.map(G), r.t$.Compound)));
                  let i = Math.max(2, Math.ceil(Math.log2(t.palette.length)));
                  (n.set(
                    "BlockStates",
                    new r.Uq(
                      (function (e, t) {
                        let n = Array(Math.ceil((e.length * t) / 64)).fill(0n),
                          r = (1n << BigInt(t)) - 1n;
                        for (let i = 0; i < e.length; i++) {
                          let o = i * t,
                            a = Math.floor(o / 64),
                            s = o % 64,
                            l = BigInt(e[i]) & r;
                          ((n[a] |= l << BigInt(s)),
                            s + t > 64 && a + 1 < n.length && (n[a + 1] |= l >> BigInt(64 - s)));
                        }
                        return n.map((e) => BigInt.asIntN(64, e));
                      })(t.cells, i).map((e) => new r.l0(e)),
                    ),
                  ),
                    n.set("TileEntities", new r.Jp(t.tileEntities.map(b), r.t$.Compound)),
                    n.set(
                      "Entities",
                      new r.Jp(
                        t.entities.map((e) =>
                          (function (e, t) {
                            let n =
                              "litematic" === e.shape
                                ? e.nbt
                                : z(e.nbt, e.shape, ["Id", "Pos", "id"]);
                            return (
                              "litematic" !== e.shape && n.set("id", new r.Gz(v(e.nbt))),
                              n.set("Pos", W(P(e.pos, t))),
                              _(n, e, t),
                              n
                            );
                          })(e, t.min),
                        ),
                        r.t$.Compound,
                      ),
                    ),
                    n.set("PendingBlockTicks", new r.Jp(t.blockTicks.map(A), r.t$.Compound)),
                    n.set("PendingFluidTicks", new r.Jp(t.fluidTicks.map(A), r.t$.Compound)),
                    w.set(d ? t.name : E, n),
                    (k += (function (e) {
                      let t = e.palette.map((e) => !c.has((0, o.C)(e.name))),
                        n = 0;
                      for (let r = 0; r < e.cells.length; r++) t[e.cells[r]] && n++;
                      return n;
                    })(t)),
                    (y += t.size[0] * t.size[1] * t.size[2]));
                  for (let e = 0; e < 3; e++)
                    ((S[e] = Math.min(S[e], t.min[e])),
                      (M[e] = Math.max(M[e], t.min[e] + t.size[e] - 1)));
                }
                g.set("Regions", w);
                let N =
                    d && g.has("Metadata")
                      ? g.getCompound("Metadata")
                      : (null == (i = e.schematic) ? void 0 : i.has("Metadata"))
                        ? e.schematic.getCompound("Metadata")
                        : r.GJ.create(),
                  I = (0, l.A1)(n);
                if (
                  (I ? N.set("Name", new r.Gz(I)) : N.has("Name") || N.set("Name", new r.Gz(E)), !d)
                ) {
                  (N.set(
                    "Author",
                    new r.Gz(null != (m = null != (s = e.meta.author) ? s : t.author) ? m : ""),
                  ),
                    N.set("Description", new r.Gz(null != (p = e.meta.description) ? p : "")));
                  let n = BigInt(Date.now());
                  (N.has("TimeCreated") || N.set("TimeCreated", new r.l0(n)),
                    N.has("TimeModified") || N.set("TimeModified", new r.l0(n)));
                }
                return (
                  N.set("RegionCount", new r.QT(e.regions.length)),
                  N.set("TotalBlocks", new r.QT(k)),
                  N.set("TotalVolume", new r.QT(y)),
                  N.set(
                    "EnclosingSize",
                    H(
                      e.regions.length > 0
                        ? [M[0] - S[0] + 1, M[1] - S[1] + 1, M[2] - S[2] + 1]
                        : [0, 0, 0],
                    ),
                  ),
                  g.set("Metadata", N),
                  d ||
                    (g.set(
                      "MinecraftDataVersion",
                      new r.QT(null != (f = e.meta.dataVersion) ? f : (0, u.U)(t)),
                    ),
                    g.set("Version", new r.QT(7)),
                    g.set("SubVersion", new r.QT(1))),
                  h.write()
                );
              })(L, n, j)
            : (function (e, t, n) {
                var i, o;
                if ("schem" === e.sourceFormat && e.schematic)
                  return (function (e, t) {
                    let n = e.schematic,
                      i = e.regions[0];
                    S(i.size, !0);
                    let o = n.has("Blocks") ? n.getCompound("Blocks") : n,
                      a = o === n && n.has("BlockData") ? "BlockData" : "Data";
                    (n.set("Width", new r.pT(i.size[0])),
                      n.set("Height", new r.pT(i.size[1])),
                      n.set("Length", new r.pT(i.size[2])));
                    let s = new Map(),
                      u = i.palette.map((e) => {
                        let t = Q(e),
                          n = s.get(t);
                        return (void 0 === n && ((n = s.size), s.set(t, n)), n);
                      }),
                      c = i.cells.map((e) => {
                        var t;
                        return null != (t = u[e]) ? t : 0;
                      });
                    (o.set("Palette", J(s)),
                      (o.has("PaletteMax") || o === n) && o.set("PaletteMax", new r.QT(s.size)),
                      o.set(a, new r.EU($(c).map((e) => new r.zj(e)))));
                    let m =
                      !n.has("Blocks") && n.has("TileEntities") && !n.has("BlockEntities")
                        ? "TileEntities"
                        : "BlockEntities";
                    for (let e of [n, o])
                      for (let t of ["BlockEntities", "TileEntities"]) e.has(t) && e.delete(t);
                    (o.set(
                      m,
                      new r.Jp(
                        i.tileEntities.map(
                          (e) => (
                            (e.nbt.has("Pos") || !x(e.nbt)) && e.nbt.set("Pos", new r.PP(e.local)),
                            x(e.nbt) &&
                              (e.nbt.set("x", new r.QT(e.local[0])),
                              e.nbt.set("y", new r.QT(e.local[1])),
                              e.nbt.set("z", new r.QT(e.local[2]))),
                            e.nbt
                          ),
                        ),
                        r.t$.Compound,
                      ),
                    ),
                      n.set(
                        "Entities",
                        new r.Jp(
                          i.entities.map(
                            (e) => (e.nbt.set("Pos", W(P(e.pos, i.min))), _(k(e), e, i.min), e.nbt),
                          ),
                          r.t$.Compound,
                        ),
                      ));
                    let p = (0, l.A1)(t);
                    if (p) {
                      let e = n.has("Metadata") ? n.getCompound("Metadata") : r.GJ.create();
                      (e.set("Name", new r.Gz(p)), n.set("Metadata", e));
                    }
                    return e.file.write();
                  })(e, n);
                let a = [1 / 0, 1 / 0, 1 / 0],
                  s = [-1 / 0, -1 / 0, -1 / 0];
                for (let t of e.regions)
                  for (let e = 0; e < 3; e++)
                    ((a[e] = Math.min(a[e], t.min[e])),
                      (s[e] = Math.max(s[e], t.min[e] + t.size[e] - 1)));
                let c =
                  e.regions.length > 0
                    ? [s[0] - a[0] + 1, s[1] - a[1] + 1, s[2] - a[2] + 1]
                    : [1, 1, 1];
                (S(c, !0), 0 === e.regions.length && a.splice(0, 3, 0, 0, 0));
                let m = new Map([["minecraft:air", 0]]),
                  p = new Uint32Array(c[0] * c[1] * c[2]),
                  f = [],
                  d = [];
                for (let t of e.regions) {
                  let e = P(t.min, a);
                  for (let n = 0; n < t.cells.length; n++) {
                    let r = t.palette[t.cells[n]];
                    if (!r || "minecraft:air" === r.name) continue;
                    let i = Q(r),
                      o = m.get(i);
                    (void 0 === o && ((o = m.size), m.set(i, o)),
                      (p[N(T(E(n, t.size), e), c)] = o));
                  }
                  for (let n of t.tileEntities) {
                    let t =
                      "litematic" === n.shape
                        ? z(n.nbt, "litematic", ["id", "x", "y", "z", "Id", "Pos"])
                        : z(n.nbt, n.shape, ["Id", "Pos"]);
                    (t.set("Id", new r.Gz(v(n.nbt))),
                      t.set("Pos", new r.PP(T(n.local, e))),
                      f.push(t));
                  }
                  for (let e of t.entities) {
                    let t = z(e.nbt, e.shape, ["id", "Id", "Pos"]);
                    (t.set("Id", new r.Gz(v(e.nbt))),
                      t.set("Pos", W(P(e.pos, a))),
                      _(t, e, a),
                      d.push(t));
                  }
                }
                let h = r.GJ.create();
                (h.set("Version", new r.QT(2)),
                  h.set(
                    "DataVersion",
                    new r.QT(null != (i = e.meta.dataVersion) ? i : (0, u.U)(t)),
                  ),
                  h.set("Width", new r.pT(c[0])),
                  h.set("Height", new r.pT(c[1])),
                  h.set("Length", new r.pT(c[2])),
                  h.set("Offset", new r.PP([0, 0, 0])));
                let g = e.file.root.has("Metadata")
                  ? e.file.root.getCompound("Metadata")
                  : r.GJ.create();
                g.set("Name", new r.Gz((0, l.ew)(null != n ? n : e.meta.name, "投影导出")));
                let w = null != (o = e.meta.author) ? o : t.author;
                return (
                  w && g.set("Author", new r.Gz(w)),
                  e.meta.description && g.set("Description", new r.Gz(e.meta.description)),
                  h.set("Metadata", g),
                  h.set("Palette", J(m)),
                  h.set("PaletteMax", new r.QT(m.size)),
                  h.set("BlockData", new r.EU($(p).map((e) => new r.zj(e)))),
                  h.set("BlockEntities", new r.Jp(f, r.t$.Compound)),
                  h.set("Entities", new r.Jp(d, r.t$.Compound)),
                  new r.TD("Schematic", h, "gzip", !1, void 0).write()
                );
              })(L, n, j)
        );
      }
      function w(e, t, n, r) {
        let i = D(e.get("Pos"));
        if (!i || 3 !== i.length) throw Error("原文件实体缺少有效坐标，无法安全写回");
        let o = null,
          a = null;
        if (t.has("TileX") && t.has("TileY") && t.has("TileZ"))
          ((o = [t.getNumber("TileX"), t.getNumber("TileY"), t.getNumber("TileZ")]),
            (a = "TileXYZ"));
        else if (t.has("block_pos")) {
          let e = D(t.get("block_pos"));
          e && e.length >= 3 && ((o = [e[0], e[1], e[2]]), (a = "block_pos"));
        }
        return {
          pos: T(i, r),
          tile: o ? T(o.map(Math.floor), r) : null,
          tileKey: a,
          nbt: e,
          shape: n,
          passengers: I(t, "Passengers").map((e) => w(e, e, "litematic", r)),
        };
      }
      function b(e) {
        let t =
          "litematic" === e.shape ? e.nbt : z(e.nbt, e.shape, ["Id", "Pos", "id", "x", "y", "z"]);
        return (
          "litematic" !== e.shape && t.set("id", new r.Gz(v(e.nbt))),
          t.set("x", new r.QT(e.local[0])),
          t.set("y", new r.QT(e.local[1])),
          t.set("z", new r.QT(e.local[2])),
          t
        );
      }
      function k(e) {
        return "schem3" === e.shape && e.nbt.has("Data") ? e.nbt.getCompound("Data") : e.nbt;
      }
      function z(e, t, n) {
        let i = r.GJ.create(),
          o = new Set(n);
        return (
          ("schem3" === t && e.has("Data") ? e.getCompound("Data") : e).forEach((e, t) => {
            o.has(e) || i.set(e, t);
          }),
          i
        );
      }
      function v(e) {
        return e.has("id") ? e.getString("id") : e.getString("Id");
      }
      function y(e) {
        let t = v(e).trim().toLowerCase();
        return t.includes(":") ? t : "minecraft:".concat(t);
      }
      function _(e, t, n) {
        for (let e of t.passengers) (e.nbt.set("Pos", W(P(e.pos, n))), _(e.nbt, e, n));
        if (!t.tile) return;
        let i = P(t.tile, n);
        "block_pos" === t.tileKey
          ? e.set("block_pos", new r.PP(i))
          : (e.set("TileX", new r.QT(i[0])),
            e.set("TileY", new r.QT(i[1])),
            e.set("TileZ", new r.QT(i[2])));
      }
      function S(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (!e.every((e) => Number.isSafeInteger(e) && e > 0 && (!t || e <= 32767)))
          throw Error("投影尺寸无效或超出目标格式范围，无法安全写回");
        let n = e[0] * e[1] * e[2];
        if (!Number.isSafeInteger(n) || n > 32e6) throw Error("投影区域体积过大，无法安全写回");
      }
      function T(e, t) {
        return [e[0] + t[0], e[1] + t[1], e[2] + t[2]];
      }
      function P(e, t) {
        return [e[0] - t[0], e[1] - t[1], e[2] - t[2]];
      }
      function M(e) {
        return "".concat(e[0], ",").concat(e[1], ",").concat(e[2]);
      }
      function E(e, t) {
        let n = e % t[0],
          r = Math.floor(e / t[0]) % t[2];
        return [n, Math.floor(e / (t[0] * t[2])), r];
      }
      function N(e, t) {
        return (e[1] * t[2] + e[2]) * t[0] + e[0];
      }
      function I(e, t) {
        if (!e.has(t)) return [];
        let n = e.get(t);
        if (!(null == n ? void 0 : n.isList()))
          throw Error("原文件 ".concat(t, " 不是有效列表，无法安全写回"));
        let r = [];
        for (let e of n.getItems()) {
          if (!e.isCompound()) throw Error("原文件 ".concat(t, " 包含无效条目，无法安全写回"));
          r.push(e);
        }
        return r;
      }
      function x(e) {
        return e.has("x") &&
          e.has("y") &&
          e.has("z") &&
          ["x", "y", "z"].every((t) => {
            var n;
            return (
              (null == (n = e.get(t)) ? void 0 : n.isNumber()) &&
              Number.isSafeInteger(e.getNumber(t))
            );
          })
          ? [e.getNumber("x"), e.getNumber("y"), e.getNumber("z")]
          : null;
      }
      function D(e) {
        if (!(null == e ? void 0 : e.isListOrArray()) || !e.getItems().every((e) => e.isNumber()))
          return null;
        let t = e.getItems().map((e) => e.getAsNumber());
        return t.every(Number.isFinite) ? t : null;
      }
      function C(e, t) {
        for (let n of t) {
          let t = e.get(n);
          if (null == t ? void 0 : t.isString()) return t.getAsString();
        }
      }
      function B(e, t) {
        let n = [];
        for (let r of I(e, t)) {
          let e = x(r);
          if (!e) throw Error("原文件计划刻缺少有效坐标，无法安全写回");
          n.push({ local: e, nbt: r });
        }
        return n;
      }
      function A(e) {
        return (
          e.nbt.set("x", new r.QT(e.local[0])),
          e.nbt.set("y", new r.QT(e.local[1])),
          e.nbt.set("z", new r.QT(e.local[2])),
          e.nbt
        );
      }
      function V(e) {
        let t = {};
        return (
          e.forEach((e, n) => {
            t[e] = n.getAsString();
          }),
          t
        );
      }
      function G(e) {
        var t, n;
        let i = null != (t = e.source) ? t : r.GJ.create();
        if ((i.set("Name", new r.Gz(e.name)), Object.keys(e.properties).length > 0)) {
          let t = i.has("Properties") ? i.getCompound("Properties") : r.GJ.create();
          for (let n of [...t.keys()]) n in e.properties || t.delete(n);
          for (let [i, o] of Object.entries(e.properties))
            (null == (n = t.get(i)) ? void 0 : n.getAsString()) !== o && t.set(i, new r.Gz(o));
          i.set("Properties", t);
        }
        return i;
      }
      function J(e) {
        let t = r.GJ.create();
        for (let [n, i] of e) t.set(n, new r.QT(i));
        return t;
      }
      function Q(e) {
        let t = Object.entries(e.properties).sort((e, t) => {
          let [n] = e,
            [r] = t;
          return n.localeCompare(r);
        });
        return 0 === t.length
          ? e.name
          : "".concat(e.name, "[").concat(
              t
                .map((e) => {
                  let [t, n] = e;
                  return "".concat(t, "=").concat(n);
                })
                .join(","),
              "]",
            );
      }
      function O() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = {};
        for (let [n, r] of Object.entries(e))
          n.startsWith("__mcblock_") || null == r || "" === r || (t[n] = String(r));
        return t;
      }
      function F(e, t) {
        return Q({ name: e, properties: t });
      }
      function H(e) {
        let [t, n, i] = e,
          o = r.GJ.create();
        return (o.set("x", new r.QT(t)), o.set("y", new r.QT(n)), o.set("z", new r.QT(i)), o);
      }
      function W(e) {
        return new r.Jp(
          e.map((e) => new r.QU(e)),
          r.t$.Double,
        );
      }
      function $(e) {
        let t = [];
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          do {
            let e = 127 & r;
            (0 != (r >>>= 7) && (e |= 128), t.push(e));
          } while (0 !== r);
        }
        return t;
      }
    },
    58957: (e, t, n) => {
      n.d(t, { Py: () => o, pl: () => i });
      var r = n(38007);
      function i(e, t, n) {
        let r = (function (e, t) {
          if (t) return "unreplayable";
          let n = "none";
          for (let t of e) {
            let e = t.operation;
            if (
              (null == e ? void 0 : e.type) === "move" ||
              ((null == e ? void 0 : e.type) === "transform" && !e.kind)
            )
              return "unreplayable";
            ((null == e ? void 0 : e.type) === "transform" && (n = "transforms"),
              (null == e ? void 0 : e.type) === "delete" && "none" === n && (n = "deletions"));
          }
          return n;
        })(null != t ? t : [], n);
        return "none" === r && e ? "unreplayable" : r;
      }
      async function o(e) {
        if (!e.originalFileData)
          throw Error("缺少原始投影文件，无法保留完整数据。请保留当前页面并重新导入原始文件。");
        if ("unreplayable" === i(!0, e.history, e.hasUntrackedStructuralEdits))
          throw Error(
            "当前会话的结构编辑记录不完整，无法安全写回原文件。请保留原始文件，重新导入后编辑。",
          );
        return {
          bytes: (0, r.P)({
            originalFileData: e.originalFileData,
            model: e.model,
            history: e.history,
            targetFormat: e.model.format,
            projectName: e.saveName,
          }),
          format: e.model.format,
          lossless: !0,
        };
      }
    },
    69381: (e, t, n) => {
      n.d(t, { x: () => l });
      var r = n(95155),
        i = n(12115),
        o = n(25016);
      let a = {
          danger: "bg-error text-text-primary",
          brand: "bg-brand-primary text-text-on-brand",
          neutral: "bg-bg-deep text-text-primary",
        },
        s = { sm: "h-[18px] min-w-[18px] px-1 text-[10px]", md: "h-5 min-w-5 px-1.5 text-[11px]" },
        l = i.forwardRef((e, t) => {
          let { tone: n = "danger", size: i = "sm", className: l, children: u, ...c } = e;
          return (0, r.jsx)("span", {
            ref: t,
            className: (0, o.cn)(
              "box-border inline-flex items-center justify-center rounded-none border-[1.5px] border-border-hard font-body font-extrabold leading-none shadow-none",
              a[n],
              s[i],
              l,
            ),
            tabIndex: -1,
            "data-control-kind": "count",
            "data-control-size": i,
            "data-control-variant": n,
            ...c,
            children: u,
          });
        });
      l.displayName = "CountBadge";
    },
    75342: (e, t, n) => {
      n.d(t, { Hp: () => l, OS: () => i, Vs: () => a, o: () => s });
      let r = [
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
        i = r.map((e) => {
          let { name: t } = e;
          return t;
        }),
        o = new Map(
          r.map((e) => {
            let { name: t, size: n } = e;
            return [t, n];
          }),
        );
      function a(e) {
        if (!e) return;
        let t = e
          .trim()
          .toLowerCase()
          .replace(/^minecraft:/, "")
          .replace(/^painting\//, "");
        return /^[a-z0-9_.-]+$/.test(t) ? t : void 0;
      }
      function s(e) {
        let t = a(e),
          n = t ? o.get(t) : void 0;
        return n ? [n[0], n[1]] : [1, 1];
      }
      function l(e) {
        let t = a(e);
        return !!(t && o.has(t));
      }
    },
    91986: (e, t, n) => {
      n.d(t, { A1: () => a, OZ: () => u, ew: () => s });
      let r = "未命名作品",
        i = "blueprint",
        o = new Set(["", "null", "undefined", "nan", "unnamed"]);
      function a(e) {
        var t;
        if ("string" != typeof e) return null;
        let n = (null != (t = e.split(/[?#]/, 1)[0].split(/[\\/]/).pop()) ? t : e)
          .replace(/\.(litematic|schem)$/i, "")
          .trim();
        return o.has(n.toLowerCase()) ? null : n;
      }
      function s(e) {
        var t, n;
        let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r;
        return null != (n = null != (t = a(e)) ? t : a(i)) ? n : r;
      }
      function l(e) {
        return e
          .replace(/[<>:"/\\|?*\x00-\x1F]+/g, "_")
          .replace(/\s+/g, "_")
          .replace(/[.]+$/g, "")
          .slice(0, 60);
      }
      function u(e) {
        var t;
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i,
          r = l(null != (t = a(n)) ? t : i);
        return l(s(e, r)) || r || i;
      }
    },
  },
]);

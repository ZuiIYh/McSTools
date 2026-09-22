"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7500],
  {
    5166: (t, e, n) => {
      n.d(e, { C: () => o, G: () => a });
      let r = /^["'](.*)["']$/,
        i = { "minecraft:trapdoor": "minecraft:oak_trapdoor" };
      function o(t) {
        var e;
        let n = (null != t ? t : "").trim().toLowerCase();
        if (!n) return "minecraft:air";
        let r = n.includes(":") ? n : "minecraft:".concat(n);
        return null != (e = i[r]) ? e : r;
      }
      function a(t) {
        if (!t) return {};
        let e = {};
        for (let [n, i] of Object.entries(t)) {
          let t = n.trim().toLowerCase();
          if (!t) continue;
          let o = String(null != i ? i : "")
              .trim()
              .toLowerCase(),
            a = o.match(r);
          (a && (o = a[1].trim().toLowerCase()), (e[t] = o));
        }
        return e;
      }
    },
    17975: (t, e, n) => {
      n.d(e, { EG: () => h, Tf: () => L, i5: () => g });
      var r = n(56841),
        i = n(5166),
        o = n(75342);
      let a = {
          down: [0, -1, 0],
          up: [0, 1, 0],
          north: [0, 0, -1],
          south: [0, 0, 1],
          west: [-1, 0, 0],
          east: [1, 0, 0],
        },
        l = ["brown", "white", "black", "white_splotched", "gold", "salt"],
        u = r.uj,
        c = r.t7,
        s = r.Th,
        f = r.kd,
        d = r.TI.slice(0, 6),
        m = r.TI.slice(6);
      function g(t) {
        let e = [],
          n = new Set();
        for (let u of t)
          if (!n.has(u))
            for (let t of (n.add(u), ["Entities", "entities"])) {
              let n;
              if (u.has(t)) {
                try {
                  n = u.getList(t, 10);
                } catch (t) {
                  continue;
                }
                for (let t = 0; t < n.length; t++) {
                  let u = (function (t) {
                    var e, n;
                    let u = (function (t) {
                        let e = t.get("Data");
                        if (!(null == e ? void 0 : e.isCompound())) return t;
                        let n = new Set(["Pos", "pos", "Id", "id"]);
                        return {
                          get: (r) => {
                            var i, o;
                            return n.has(r)
                              ? null != (i = t.get(r))
                                ? i
                                : e.get(r)
                              : null != (o = e.get(r))
                                ? o
                                : t.get(r);
                          },
                          has: (r) => (n.has(r) ? t.has(r) || e.has(r) : e.has(r) || t.has(r)),
                        };
                      })(t),
                      g = (function (t) {
                        if ("string" != typeof t) return null;
                        let e = t.trim();
                        if (!e) return null;
                        if (e.includes(":")) return e.toLowerCase();
                        let n = p[e.toLowerCase().replace(/_/g, "")];
                        if (n) return "minecraft:".concat(n);
                        let r = /[A-Z]/.test(e)
                          ? e.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()
                          : e.toLowerCase();
                        return "minecraft:".concat(r);
                      })(C(u, ["id", "Id", "entity_id", "EntityId"]));
                    if (!g) return;
                    let h = (function (t) {
                        let e = t.replace("minecraft:", "");
                        return "armor_stand" === e
                          ? "armor_stand"
                          : e.includes("minecart")
                            ? "minecart"
                            : e.includes("boat") || e.includes("raft")
                              ? "boat"
                              : e.includes("item_frame")
                                ? "item_frame"
                                : "painting" === e
                                  ? "painting"
                                  : "block_display" === e
                                    ? "block_display"
                                    : "item_display" === e
                                      ? "item_display"
                                      : "text_display" === e
                                        ? "text_display"
                                        : "falling_block" === e
                                          ? "falling_block"
                                          : "tnt" === e
                                            ? "tnt"
                                            : "end_crystal" === e
                                              ? "end_crystal"
                                              : "leash_knot" === e
                                                ? "leash_knot"
                                                : "marker" === e
                                                  ? "marker"
                                                  : "interaction" === e
                                                    ? "interaction"
                                                    : "generic";
                      })(g),
                      B = (function (t) {
                        var e;
                        let n = N(null != (e = t.get("Pos")) ? e : t.get("pos"));
                        if (n) return n;
                        let r = S(t, ["x", "X"]),
                          i = S(t, ["y", "Y"]),
                          o = S(t, ["z", "Z"]);
                        if (void 0 !== r && void 0 !== i && void 0 !== o) return [r, i, o];
                        let l = v(t);
                        if (!l) return null;
                        let u = A(t, ["Facing", "facing", "Direction", "direction"]);
                        if (!u) return [l[0] + 0.5, l[1] + 0.5, l[2] + 0.5];
                        let c = a[u];
                        return [
                          l[0] + 0.5 + 0.501 * c[0],
                          l[1] + 0.5 + 0.501 * c[1],
                          l[2] + 0.5 + 0.501 * c[2],
                        ];
                      })(u);
                    if (!B) return;
                    let L = (function (t) {
                        var e;
                        let n = T(null != (e = t.get("Rotation")) ? e : t.get("rotation"));
                        if (n && n.length >= 2) return [n[0], n[1]];
                        let r = S(t, ["yaw", "Yaw", "yRot", "YRot"]),
                          i = S(t, ["pitch", "Pitch", "xRot", "XRot"]);
                        return void 0 === r && void 0 === i
                          ? null
                          : [null != r ? r : 0, null != i ? i : 0];
                      })(u),
                      E = C(u, ["CustomName", "custom_name", "Name", "name"]),
                      O = (function (t) {
                        let e = b(t, [
                          "block_state",
                          "BlockState",
                          "blockState",
                          "DisplayState",
                          "display_state",
                        ]);
                        if (e) return e;
                        let n = C(t, [
                          "block",
                          "Block",
                          "Tile",
                          "tile",
                          "block_id",
                          "BlockId",
                          "DisplayTile",
                        ]);
                        if ("string" == typeof n && n.trim())
                          return { blockId: (0, i.C)(n), properties: {} };
                      })(u),
                      z =
                        "armor_stand" === h
                          ? (function (t) {
                              let e = (function (t) {
                                  var e;
                                  let n = null != (e = t.get("Pose")) ? e : t.get("pose");
                                  if (!(null == n ? void 0 : n.isCompound())) return;
                                  let r = {};
                                  for (let [t, e] of [
                                    ["head", ["Head", "head"]],
                                    ["body", ["Body", "body"]],
                                    ["leftArm", ["LeftArm", "left_arm", "LeftArmPose"]],
                                    ["rightArm", ["RightArm", "right_arm", "RightArmPose"]],
                                    ["leftLeg", ["LeftLeg", "left_leg", "LeftLegPose"]],
                                    ["rightLeg", ["RightLeg", "right_leg", "RightLegPose"]],
                                  ])
                                    for (let i of e) {
                                      let e = N(n.get(i));
                                      if (e) {
                                        r[t] = e;
                                        break;
                                      }
                                    }
                                  return Object.keys(r).length > 0 ? r : void 0;
                                })(t),
                                n = (function (t) {
                                  var e, n, r, i, o, a, l, u, c;
                                  let s = {},
                                    f = (t, e) => {
                                      e && !s[t] && (s[t] = e);
                                    },
                                    d = null != (e = _(t, ["ArmorItems", "armor_items"])) ? e : [];
                                  (f("feet", d[0]),
                                    f("legs", d[1]),
                                    f("chest", d[2]),
                                    f("head", d[3]));
                                  let m = null != (n = _(t, ["HandItems", "hand_items"])) ? n : [];
                                  (f("mainHand", m[0]), f("offHand", m[1]));
                                  let g = t.get("equipment");
                                  (null == g ? void 0 : g.isCompound()) &&
                                    (f("head", null == (r = w(g.get("head"))) ? void 0 : r.itemId),
                                    f("chest", null == (i = w(g.get("chest"))) ? void 0 : i.itemId),
                                    f("legs", null == (o = w(g.get("legs"))) ? void 0 : o.itemId),
                                    f("feet", null == (a = w(g.get("feet"))) ? void 0 : a.itemId),
                                    f(
                                      "mainHand",
                                      null == (l = w(g.get("mainhand"))) ? void 0 : l.itemId,
                                    ),
                                    f(
                                      "offHand",
                                      null == (u = w(g.get("offhand"))) ? void 0 : u.itemId,
                                    ));
                                  let h = null != (c = _(t, ["Equipment", "equipment"])) ? c : [];
                                  return (
                                    f("mainHand", h[0]),
                                    f("feet", h[1]),
                                    f("legs", h[2]),
                                    f("chest", h[3]),
                                    f("head", h[4]),
                                    Object.keys(s).length > 0 ? s : void 0
                                  );
                                })(t),
                                r = {},
                                i = I(t, ["Small", "small"]),
                                o = I(t, ["ShowArms", "show_arms"]),
                                a = I(t, ["NoBasePlate", "no_base_plate"]),
                                l = I(t, ["Marker", "marker"]),
                                u = I(t, ["Invisible", "invisible"]);
                              return (
                                void 0 !== i && (r.small = i),
                                void 0 !== o && (r.showArms = o),
                                void 0 !== a && (r.noBasePlate = a),
                                void 0 !== l && (r.marker = l),
                                void 0 !== u && (r.invisible = u),
                                e && Object.keys(e).length > 0 && (r.pose = e),
                                n && Object.keys(n).length > 0 && (r.equipment = n),
                                Object.keys(r).length > 0 ? r : void 0
                              );
                            })(u)
                          : void 0,
                      R =
                        "item_frame" === h
                          ? (function (t, e) {
                              let n = { glow: e.includes("glow") },
                                r = A(t, ["Facing", "facing", "Direction", "direction"]),
                                i = v(t),
                                o = k(t, ["Item", "item"]),
                                a = S(t, ["ItemRotation", "item_rotation"]);
                              return (
                                r && (n.facing = r),
                                i && (n.tile = i),
                                o && (n.item = o),
                                void 0 !== a && (n.itemRotation = a),
                                n
                              );
                            })(u, g)
                          : void 0,
                      j =
                        "painting" === h
                          ? (function (t) {
                              let e = M(t, ["Motive", "motive"]),
                                n = M(t, ["variant", "Variant"]),
                                r = (0, o.Vs)(null != n ? n : e),
                                i = r ? (0, o.o)(r) : void 0,
                                a = (function (t) {
                                  let e = ["facing", "Facing", "Direction", "direction", "Dir"],
                                    n = C(t, e);
                                  return "number" == typeof n
                                    ? { 0: "south", 1: "west", 2: "north", 3: "east" }[
                                        Math.trunc(n)
                                      ]
                                    : A(t, e);
                                })(t),
                                l = v(t);
                              return {
                                ...(e ? { motive: e } : {}),
                                ...(n ? { variant: n } : {}),
                                ...(i ? { size: i } : {}),
                                ...(a ? { facing: a } : {}),
                                ...(l ? { tile: l } : {}),
                              };
                            })(u)
                          : void 0,
                      G = "block_display" === h ? { blockState: O, transform: y(u) } : void 0,
                      H =
                        "item_display" === h
                          ? {
                              item: k(u, ["item", "Item", "item_stack", "ItemStack"]),
                              transform: y(u),
                              itemDisplay: M(u, [
                                "item_display",
                                "ItemDisplay",
                                "display",
                                "Display",
                              ]),
                            }
                          : void 0,
                      F =
                        "text_display" === h
                          ? (function (t) {
                              let e = C(t, ["text", "Text"]),
                                n = y(t),
                                r = M(t, ["alignment", "Alignment"]),
                                i =
                                  "left" === r || "right" === r
                                    ? r
                                    : "center" === r
                                      ? "center"
                                      : void 0,
                                o = {
                                  ...(void 0 !== e ? { text: x(e) } : {}),
                                  ...(n ? { transform: n } : {}),
                                },
                                a = S(t, ["line_width", "LineWidth"]),
                                l = S(t, ["background", "Background"]),
                                u = S(t, ["text_opacity", "TextOpacity"]),
                                c = I(t, ["see_through", "SeeThrough"]),
                                s = I(t, ["default_background", "DefaultBackground"]);
                              return (
                                void 0 !== a && (o.lineWidth = a),
                                void 0 !== l && (o.background = l),
                                void 0 !== u && (o.textOpacity = u),
                                i && (o.alignment = i),
                                void 0 !== c && (o.seeThrough = c),
                                void 0 !== s && (o.defaultBackground = s),
                                o
                              );
                            })(u)
                          : void 0,
                      U = "falling_block" === h ? O : void 0,
                      W =
                        "minecart" === h
                          ? (function (t, e) {
                              var n;
                              let r = (function (t) {
                                  let e = t.replace("minecraft:", "");
                                  return e.includes("command_block")
                                    ? "command_block"
                                    : e.includes("spawner")
                                      ? "spawner"
                                      : e.includes("chest")
                                        ? "chest"
                                        : e.includes("hopper")
                                          ? "hopper"
                                          : e.includes("tnt")
                                            ? "tnt"
                                            : e.includes("furnace")
                                              ? "furnace"
                                              : "normal";
                                })(e),
                                i =
                                  null != (n = b(t, ["DisplayState", "display_state"]))
                                    ? n
                                    : (function (t) {
                                        if ("normal" === t) return;
                                        let e = {
                                          chest: "minecraft:chest",
                                          hopper: "minecraft:hopper",
                                          tnt: "minecraft:tnt",
                                          furnace: "minecraft:furnace",
                                          command_block: "minecraft:command_block",
                                          spawner: "minecraft:spawner",
                                        }[t];
                                        return e ? { blockId: e, properties: {} } : void 0;
                                      })(r),
                                o = S(t, ["DisplayOffset", "display_offset"]);
                              return {
                                variant: r,
                                ...(i ? { displayBlock: i } : {}),
                                ...(void 0 !== o ? { displayOffset: o } : {}),
                              };
                            })(u, g)
                          : void 0,
                      Y =
                        "boat" === h
                          ? (function (t, e) {
                              let n = e.replace("minecraft:", ""),
                                r = M(t, ["Type", "type", "variant", "Variant"]),
                                i = (function (t) {
                                  let e = t
                                    .replace("_chest_boat", "")
                                    .replace("_boat", "")
                                    .replace("_chest_raft", "")
                                    .replace("_raft", "");
                                  return e && e !== t ? e : void 0;
                                })(n);
                              return {
                                woodType: (function (t) {
                                  if (t) return t.trim().toLowerCase().replace("minecraft:", "");
                                })(null != r ? r : i),
                                chest: n.includes("chest"),
                                raft: n.includes("raft") || "bamboo" === r,
                              };
                            })(u, g)
                          : void 0,
                      X =
                        "minecraft:villager" === g || "minecraft:zombie_villager" === g
                          ? (function (t) {
                              var e;
                              let n =
                                null != (e = t.get("VillagerData")) ? e : t.get("villager_data");
                              if (!(null == n ? void 0 : n.isCompound())) return;
                              let i = (function (t) {
                                  let e = P(t);
                                  return r.Bk.includes(e) ? e : void 0;
                                })(M(n, ["type", "Type"])),
                                o = (function (t) {
                                  let e = P(t);
                                  return r.hn.includes(e) ? e : void 0;
                                })(M(n, ["profession", "Profession"])),
                                a = S(n, ["level", "Level"]),
                                l = void 0 === a ? void 0 : Math.max(1, Math.min(5, Math.trunc(a)));
                              return i || o || void 0 !== l
                                ? {
                                    ...(i ? { type: i } : {}),
                                    ...(o ? { profession: o } : {}),
                                    ...(void 0 !== l ? { level: l } : {}),
                                  }
                                : void 0;
                            })(u)
                          : void 0,
                      Z =
                        "minecraft:cat" === g
                          ? (function (t) {
                              let e = (function (t) {
                                let e = P(t);
                                return r.oY.includes(e) ? e : void 0;
                              })(M(t, ["variant", "Variant"]));
                              if (e) return { variant: e };
                              let n = S(t, ["CatType", "cat_type"]),
                                i = void 0 === n ? void 0 : r.oY[Math.trunc(n)];
                              return i ? { variant: i } : void 0;
                            })(u)
                          : void 0,
                      q =
                        "minecraft:pig" === g
                          ? (function (t) {
                              let e = I(t, ["Saddle", "saddle"]);
                              return void 0 === e ? void 0 : { saddled: e };
                            })(u)
                          : void 0,
                      $ =
                        "minecraft:sheep" === g
                          ? (function (t) {
                              let e = D(C(t, ["Color", "color"])),
                                n = I(t, ["Sheared", "sheared"]);
                              return e || void 0 !== n
                                ? {
                                    ...(e ? { color: e } : {}),
                                    ...(void 0 !== n ? { sheared: n } : {}),
                                  }
                                : void 0;
                            })(u)
                          : void 0,
                      J =
                        "minecraft:wolf" === g
                          ? (function (t) {
                              let e = D(C(t, ["CollarColor", "collar_color"])),
                                n = I(t, ["Tame", "tame"]),
                                r = ["Owner", "OwnerUUID", "owner", "owner_uuid"].some((e) =>
                                  t.has(e),
                                ),
                                i = S(t, ["AngerTime", "anger_time"]),
                                o = I(t, ["Angry", "angry"]),
                                a = null != n ? n : !!r || void 0,
                                l = null != o ? o : void 0 !== i ? i > 0 : void 0;
                              return e || void 0 !== a || void 0 !== l
                                ? {
                                    ...(e ? { collarColor: e } : {}),
                                    ...(void 0 !== a ? { tamed: a } : {}),
                                    ...(void 0 !== l ? { angry: l } : {}),
                                  }
                                : void 0;
                            })(u)
                          : void 0,
                      K =
                        "minecraft:horse" === g
                          ? (function (t) {
                              let e = S(t, ["Variant", "variant"]);
                              if (void 0 === e) return;
                              let n = Math.trunc(e),
                                i = r.bG[255 & n],
                                o = r.XK[(n >> 8) & 255];
                              return i || o
                                ? { ...(i ? { color: i } : {}), ...(o ? { marking: o } : {}) }
                                : void 0;
                            })(u)
                          : void 0,
                      Q =
                        "minecraft:rabbit" === g
                          ? (function (t, e) {
                              if (
                                (function (t) {
                                  var e;
                                  return (
                                    "string" == typeof t &&
                                    (null == (e = x(t)) ? void 0 : e.trim().toLowerCase()) ===
                                      "toast"
                                  );
                                })(e)
                              )
                                return { variant: "toast" };
                              let n = (function (t) {
                                let e = P(t);
                                return r.cV.includes(e) ? e : void 0;
                              })(M(t, ["variant", "Variant"]));
                              if (n) return { variant: n };
                              let i = S(t, ["RabbitType", "rabbit_type"]);
                              if (void 0 === i) return;
                              let o = 99 === Math.trunc(i) ? "caerbannog" : l[Math.trunc(i)];
                              return o ? { variant: o } : void 0;
                            })(u, E)
                          : void 0,
                      tt =
                        "minecraft:fox" === g
                          ? (function (t) {
                              let e = (function (t) {
                                let e = P(t);
                                return r.sj.includes(e) ? e : void 0;
                              })(M(t, ["Type", "type", "variant", "Variant"]));
                              return e ? { type: e } : void 0;
                            })(u)
                          : void 0,
                      te =
                        "minecraft:panda" === g
                          ? (function (t) {
                              let e = V(C(t, ["MainGene", "main_gene"]));
                              if (!e) return;
                              let n = V(C(t, ["HiddenGene", "hidden_gene"]));
                              return {
                                gene: ("brown" === e || "weak" === e) && n !== e ? "normal" : e,
                              };
                            })(u)
                          : void 0,
                      tn =
                        "minecraft:axolotl" === g
                          ? (function (t) {
                              let e = (function (t) {
                                if ("number" == typeof t) return c[Math.trunc(t)];
                                let e = P(t);
                                return r.t7.includes(e) ? e : void 0;
                              })(C(t, ["Variant", "variant"]));
                              return e ? { variant: e } : void 0;
                            })(u)
                          : void 0,
                      tr =
                        "minecraft:llama" === g || "minecraft:trader_llama" === g
                          ? (function (t) {
                              let e = (function (t) {
                                  if ("number" == typeof t) return s[Math.trunc(t)];
                                  let e = P(t);
                                  return r.Th.includes(e) ? e : void 0;
                                })(C(t, ["Variant", "variant"])),
                                n = I(t, [
                                  "ChestedHorse",
                                  "chested_horse",
                                  "HasChest",
                                  "has_chest",
                                ]),
                                i = k(t, ["DecorItem", "decor_item"]),
                                o = (function (t) {
                                  if (!t) return;
                                  let e = t.replace(/^minecraft:/, "").replace(/_carpet$/, "");
                                  return r.Wk.includes(e) ? e : void 0;
                                })(null == i ? void 0 : i.itemId);
                              return e || void 0 !== n || o
                                ? {
                                    ...(e ? { variant: e } : {}),
                                    ...(void 0 !== n ? { chested: n } : {}),
                                    ...(o ? { decorColor: o } : {}),
                                  }
                                : void 0;
                            })(u)
                          : void 0,
                      ti =
                        "minecraft:bee" === g
                          ? (function (t) {
                              let e = I(t, ["HasNectar", "has_nectar"]),
                                n = I(t, ["HasStung", "has_stung"]),
                                r = S(t, ["AngerTime", "anger_time"]),
                                i = I(t, ["Angry", "angry"]),
                                o = null != i ? i : void 0 !== r ? r > 0 : void 0;
                              return void 0 !== e || void 0 !== n || void 0 !== o
                                ? { hasNectar: e, hasStung: n, angry: o }
                                : void 0;
                            })(u)
                          : void 0,
                      to =
                        "minecraft:parrot" === g
                          ? (function (t) {
                              let e = (function (t) {
                                if ("number" == typeof t) return f[Math.trunc(t)];
                                let e = P(t);
                                return r.kd.includes(e) ? e : void 0;
                              })(C(t, ["Variant", "variant"]));
                              return e ? { variant: e } : void 0;
                            })(u)
                          : void 0,
                      ta =
                        "minecraft:frog" === g
                          ? (function (t) {
                              let e = (function (t) {
                                let e = P(t);
                                return r.mL.includes(e) ? e : void 0;
                              })(M(t, ["variant", "Variant"]));
                              return e ? { variant: e } : void 0;
                            })(u)
                          : void 0,
                      tl =
                        "minecraft:mooshroom" === g
                          ? (function (t) {
                              let e = (function (t) {
                                let e = P(t);
                                return r.dG.includes(e) ? e : void 0;
                              })(M(t, ["Type", "type", "variant", "Variant"]));
                              return e ? { variant: e } : void 0;
                            })(u)
                          : void 0,
                      tu =
                        "minecraft:shulker" === g
                          ? (function (t) {
                              let e = D(C(t, ["Color", "color"]));
                              return e ? { color: e } : void 0;
                            })(u)
                          : void 0,
                      tc =
                        "minecraft:creeper" === g
                          ? (function (t) {
                              let e = I(t, ["powered", "Powered", "charged", "Charged"]);
                              return void 0 !== e ? { charged: e } : void 0;
                            })(u)
                          : void 0,
                      ts =
                        "minecraft:strider" === g
                          ? (function (t) {
                              let e = I(t, ["IsCold", "is_cold", "Cold", "cold"]),
                                n = I(t, ["Saddle", "saddle"]);
                              return void 0 !== e || void 0 !== n
                                ? { cold: e, saddled: n }
                                : void 0;
                            })(u)
                          : void 0,
                      tf =
                        "minecraft:wither" === g
                          ? (function (t) {
                              let e = S(t, ["Invul", "invul", "InvulnerableTicks"]);
                              return void 0 !== e ? { invulnerable: e > 0 } : void 0;
                            })(u)
                          : void 0,
                      td =
                        "minecraft:pufferfish" === g
                          ? (function (t) {
                              let e = S(t, ["PuffState", "puff_state"]);
                              if (void 0 !== e)
                                return { puffState: Math.max(0, Math.min(2, Math.trunc(e))) };
                            })(u)
                          : void 0,
                      tm =
                        "minecraft:tropical_fish" === g
                          ? (function (t) {
                              let e = S(t, ["Variant", "variant"]);
                              if (void 0 === e) return;
                              let n = Math.trunc(e) >>> 0,
                                r = (0 == (255 & n) ? d : m)[(n >>> 8) & 255],
                                i = D((n >>> 16) & 255),
                                o = D((n >>> 24) & 255);
                              return r || i || o
                                ? {
                                    ...(r ? { variant: r } : {}),
                                    ...(i ? { baseColor: i } : {}),
                                    ...(o ? { patternColor: o } : {}),
                                  }
                                : void 0;
                            })(u)
                          : void 0,
                      tg = "tnt" === h ? { fuse: S(u, ["Fuse", "fuse"]) } : void 0,
                      th =
                        "end_crystal" === h
                          ? { showBottom: I(u, ["ShowBottom", "show_bottom"]) }
                          : void 0,
                      tp = "leash_knot" === h ? { tile: null != (e = v(u)) ? e : void 0 } : void 0,
                      tv =
                        "interaction" === h
                          ? {
                              width: S((n = u), ["width", "Width"]),
                              height: S(n, ["height", "Height"]),
                              response: I(n, ["response", "Response"]),
                            }
                          : void 0;
                    return {
                      entityId: g,
                      position: B,
                      kind: h,
                      ...(L ? { rotation: L } : {}),
                      ...(O ? { blockId: O.blockId } : {}),
                      ...(z ? { armorStand: z } : {}),
                      ...(R ? { itemFrame: R } : {}),
                      ...(j ? { painting: j } : {}),
                      ...(G ? { blockDisplay: G } : {}),
                      ...(H ? { itemDisplay: H } : {}),
                      ...(F ? { textDisplay: F } : {}),
                      ...(U ? { fallingBlock: U } : {}),
                      ...(W ? { minecart: W } : {}),
                      ...(Y ? { boat: Y } : {}),
                      ...(X ? { villager: X } : {}),
                      ...(Z ? { cat: Z } : {}),
                      ...(q ? { pig: q } : {}),
                      ...($ ? { sheep: $ } : {}),
                      ...(J ? { wolf: J } : {}),
                      ...(K ? { horse: K } : {}),
                      ...(Q ? { rabbit: Q } : {}),
                      ...(tt ? { fox: tt } : {}),
                      ...(te ? { panda: te } : {}),
                      ...(tn ? { axolotl: tn } : {}),
                      ...(tr ? { llama: tr } : {}),
                      ...(ti ? { bee: ti } : {}),
                      ...(to ? { parrot: to } : {}),
                      ...(ta ? { frog: ta } : {}),
                      ...(tl ? { mooshroom: tl } : {}),
                      ...(tu ? { shulker: tu } : {}),
                      ...(tc ? { creeper: tc } : {}),
                      ...(ts ? { strider: ts } : {}),
                      ...(tf ? { wither: tf } : {}),
                      ...(td ? { pufferfish: td } : {}),
                      ...(tm ? { tropicalFish: tm } : {}),
                      ...(tg ? { tnt: tg } : {}),
                      ...(th ? { endCrystal: th } : {}),
                      ...(tp ? { leashKnot: tp } : {}),
                      ...(tv ? { interaction: tv } : {}),
                      ...("string" == typeof E && E.trim() ? { customName: E.trim() } : {}),
                    };
                  })(n.getCompound(t));
                  u && e.push(u);
                }
              }
            }
        return e;
      }
      function h(t, e) {
        return { ...t, position: e, rotation: t.rotation ? [...t.rotation] : void 0 };
      }
      let p = {
        minecartrideable: "minecart",
        minecartchest: "chest_minecart",
        minecartfurnace: "furnace_minecart",
        minecarttnt: "tnt_minecart",
        minecarthopper: "hopper_minecart",
        minecartspawner: "spawner_minecart",
        minecartcommandblock: "command_block_minecart",
        lavaslime: "magma_cube",
        pigzombie: "zombified_piglin",
        zombiepigman: "zombified_piglin",
        mushroomcow: "mooshroom",
        snowman: "snow_golem",
        ozelot: "ocelot",
        villagergolem: "iron_golem",
        entityhorse: "horse",
        witherboss: "wither",
        xporb: "experience_orb",
        xpbottle: "experience_bottle",
        thrownexpbottle: "experience_bottle",
        primedtnt: "tnt",
        fallingsand: "falling_block",
        fallingblock: "falling_block",
        endercrystal: "end_crystal",
        thrownenderpearl: "ender_pearl",
        eyeofendersignal: "eye_of_ender",
        thrownpotion: "potion",
        thrownegg: "egg",
        fireworksrocketentity: "firework_rocket",
        itemframe: "item_frame",
        armorstand: "armor_stand",
        leashknot: "leash_knot",
      };
      function v(t) {
        var e;
        let n = N(null != (e = t.get("Tile")) ? e : t.get("tile"));
        if (n) return [Math.floor(n[0]), Math.floor(n[1]), Math.floor(n[2])];
        let r = S(t, ["TileX", "tile_x", "tileX"]),
          i = S(t, ["TileY", "tile_y", "tileY"]),
          o = S(t, ["TileZ", "tile_z", "tileZ"]);
        return void 0 !== r && void 0 !== i && void 0 !== o
          ? [Math.floor(r), Math.floor(i), Math.floor(o)]
          : null;
      }
      function b(t, e) {
        for (let n of e) {
          let e = (function (t) {
            var e;
            if (!t) return;
            if (t.isString()) {
              let e = (0, i.C)(t.getAsString());
              return "minecraft:air" === e ? void 0 : { blockId: e, properties: {} };
            }
            if (!t.isCompound()) return;
            let n = C(t, ["Name", "name", "id", "Id"]);
            if ("string" != typeof n || !n.trim()) return;
            let r = null != (e = t.get("Properties")) ? e : t.get("properties"),
              o = {};
            return (
              (null == r ? void 0 : r.isCompound()) &&
                r.forEach((t, e) => {
                  (e.isNumber() && (o[t] = String(e.getAsNumber())),
                    e.isString() && (o[t] = e.getAsString()));
                }),
              { blockId: (0, i.C)(n), properties: (0, i.G)(o) }
            );
          })(t.get(n));
          if (e) return e;
        }
      }
      function y(t) {
        var e, n, r, i, o;
        let a = {},
          l = null != (e = t.get("transformation")) ? e : t.get("Transformation"),
          u = T(l);
        if (u && 16 === u.length) a.matrix = u;
        else if (null == l ? void 0 : l.isCompound()) {
          let t = N(null != (n = l.get("translation")) ? n : l.get("Translation")),
            e = N(null != (r = l.get("scale")) ? r : l.get("Scale")),
            u = B(null != (i = l.get("left_rotation")) ? i : l.get("LeftRotation")),
            c = B(null != (o = l.get("right_rotation")) ? o : l.get("RightRotation"));
          (t && (a.translation = t),
            e && (a.scale = e),
            u && (a.leftRotation = u),
            c && (a.rightRotation = c));
        }
        let c = M(t, ["billboard", "Billboard"]),
          s = (function (t) {
            var e;
            let n = null != (e = t.get("brightness")) ? e : t.get("Brightness");
            if (!(null == n ? void 0 : n.isCompound())) return;
            let r = S(n, ["sky", "Sky"]),
              i = S(n, ["block", "Block"]);
            return void 0 !== r || void 0 !== i ? { sky: r, block: i } : void 0;
          })(t),
          f = S(t, ["glow_color_override", "GlowColorOverride"]);
        return (
          c && (a.billboard = c),
          s && (a.brightness = s),
          void 0 !== f && (a.glowColorOverride = f),
          Object.keys(a).length > 0 ? a : void 0
        );
      }
      function _(t, e) {
        for (let n of e) {
          let e = t.get(n);
          if (null == e ? void 0 : e.isListOrArray())
            return e.getItems().map((t) => {
              var e;
              if (t.isCompound()) return null == (e = w(t)) ? void 0 : e.itemId;
            });
        }
      }
      function k(t, e) {
        for (let n of e) {
          let e = w(t.get(n));
          if (e) return e;
        }
      }
      function w(t) {
        if (!t) return;
        if (t.isString()) {
          let e = (0, i.C)(t.getAsString());
          return "minecraft:air" === e ? void 0 : { itemId: e };
        }
        if (!t.isCompound()) return;
        let e = S(t, ["Count", "count"]);
        if (void 0 !== e && e <= 0) return;
        let n = C(t, ["id", "Id", "item", "Item"]);
        if ("string" != typeof n || !n.trim()) return;
        let r = (0, i.C)(n);
        return "minecraft:air" === r
          ? void 0
          : { itemId: r, ...(void 0 !== e ? { count: e } : {}) };
      }
      function C(t, e) {
        for (let n of e) {
          let e = t.get(n);
          if (e) {
            if (e.isNumber()) return e.getAsNumber();
            if (e.isString()) return e.getAsString();
          }
        }
      }
      function M(t, e) {
        let n = C(t, e);
        return "string" == typeof n && n.trim() ? n.trim() : void 0;
      }
      function I(t, e) {
        let n = C(t, e);
        if ("number" == typeof n) return 0 !== n;
        if ("string" == typeof n) {
          let t = n.trim().toLowerCase();
          if ("true" === t || "1" === t) return !0;
          if ("false" === t || "0" === t) return !1;
        }
      }
      function S(t, e) {
        let n = C(t, e);
        if ("number" == typeof n && Number.isFinite(n)) return n;
        if ("string" == typeof n) {
          let t = Number.parseFloat(n);
          if (Number.isFinite(t)) return t;
        }
      }
      function A(t, e) {
        let n = C(t, e);
        if ("number" == typeof n)
          return { 0: "down", 1: "up", 2: "north", 3: "south", 4: "west", 5: "east" }[n];
        if ("string" == typeof n) {
          let t = n.trim().toLowerCase().replace("minecraft:", "");
          if (
            "north" === t ||
            "south" === t ||
            "east" === t ||
            "west" === t ||
            "up" === t ||
            "down" === t
          )
            return t;
        }
      }
      function N(t) {
        let e = T(t);
        return !e || e.length < 3 ? null : [e[0], e[1], e[2]];
      }
      function B(t) {
        let e = T(t);
        return !e || e.length < 4 ? null : [e[0], e[1], e[2], e[3]];
      }
      function T(t) {
        if (!(null == t ? void 0 : t.isListOrArray())) return null;
        let e = t
          .getItems()
          .map((t) => t.getAsNumber())
          .filter(Number.isFinite);
        return e.length > 0 ? e : null;
      }
      function x(t) {
        if ("number" == typeof t) return String(t);
        if ("string" != typeof t) return;
        let e = t.trim();
        if (e)
          try {
            let t = JSON.parse(e);
            return L(t) || e;
          } catch (t) {
            return e;
          }
      }
      function L(t) {
        if ("string" == typeof t) return t;
        if ("number" == typeof t || "boolean" == typeof t) return String(t);
        if (Array.isArray(t)) return t.map(L).join("");
        if (!t || "object" != typeof t) return "";
        let e =
            "string" == typeof t.text ? t.text : "string" == typeof t.translate ? t.translate : "",
          n = Array.isArray(t.extra) ? t.extra.map(L).join("") : "",
          r = Array.isArray(t.with) ? t.with.map(L).join("") : "";
        return ""
          .concat(e)
          .concat(r ? " ".concat(r) : "")
          .concat(n);
      }
      function D(t) {
        if ("number" == typeof t) return r.Wk[Math.trunc(t)];
        let e = P(t);
        return r.Wk.includes(e) ? e : void 0;
      }
      function V(t) {
        if ("number" == typeof t) return u[Math.trunc(t)];
        let e = P(t);
        return r.uj.includes(e) ? e : void 0;
      }
      function P(t) {
        var e;
        return null !=
          (e =
            null == t
              ? void 0
              : t
                  .trim()
                  .toLowerCase()
                  .replace(/^minecraft:/, ""))
          ? e
          : "";
      }
    },
    41845: (t, e, n) => {
      n.d(e, { g: () => s });
      var r = n(82084),
        i = n(5166),
        o = n(55822),
        a = n(74002),
        l = n(17975),
        u = n(91986);
      let c = new Set([
        "minecraft:air",
        "minecraft:cave_air",
        "minecraft:void_air",
        "minecraft:light",
        "minecraft:barrier",
        "minecraft:structure_void",
      ]);
      async function s(t, e) {
        var n, s, g;
        let h,
          p,
          v,
          b = new Uint8Array(t),
          y = r.TD.read(b).root,
          _ = y.has("Schematic");
        _ && (y = y.getCompound("Schematic"));
        let k = y.has("Version") ? y.getNumber("Version") : _ ? 3 : 2;
        if (k < 1 || k > 3)
          throw Error("不支持的 Sponge Schematic 版本: ".concat(k, "（支持 v2/v3）"));
        let w = y.has("DataVersion") ? y.getNumber("DataVersion") : void 0,
          C = y.getNumber("Width"),
          M = y.getNumber("Height"),
          I = y.getNumber("Length");
        if (C <= 0 || M <= 0 || I <= 0)
          throw Error("无效的尺寸: ".concat(C, "\xd7").concat(M, "\xd7").concat(I));
        let S = (0, u.ew)(e, "blueprint");
        if (y.has("Metadata"))
          try {
            let t = y.getCompound("Metadata");
            (t.has("Name") && (S = (0, u.ew)(t.getString("Name"), S)),
              t.has("Author") && (h = t.getString("Author")));
          } catch (t) {}
        let A = [0, 0, 0];
        if (y.has("Offset"))
          try {
            let t = y.getIntArray("Offset").getItems();
            t.length >= 3 && (A = [t[0].getAsNumber(), t[1].getAsNumber(), t[2].getAsNumber()]);
          } catch (t) {}
        if (y.has("Blocks")) {
          let t = y.getCompound("Blocks");
          ((p = t.getCompound("Palette")), (v = t.getByteArray("Data").getItems()));
        } else if (y.has("Palette") && (y.has("BlockData") || y.has("Data"))) {
          p = y.getCompound("Palette");
          let t = y.has("BlockData") ? "BlockData" : "Data";
          v = y.getByteArray(t).getItems();
        } else throw Error("无法识别的 .schem 文件结构：找不到 Palette 或 BlockData");
        let N = new Map();
        if (
          (p.forEach((t, e) => {
            let n = e.getAsNumber(),
              { blockId: r, properties: o } = (function (t) {
                let e = t.indexOf("[");
                if (-1 === e) return { blockId: (0, i.C)(t), properties: {} };
                let n = t.substring(0, e),
                  r = t.substring(e + 1, t.length - 1),
                  o = {};
                if (r)
                  for (let t of r.split(",")) {
                    let [e, n] = t.split("=");
                    e && n && (o[e.trim()] = n.trim());
                  }
                return { blockId: (0, i.C)(n), properties: (0, i.G)(o) };
              })(t);
            N.set(n, { blockId: r, properties: o });
          }),
          0 === N.size)
        )
          throw Error(".schem 文件的调色板为空");
        let B = (function (t, e) {
            let n = new Uint32Array(e),
              r = 0,
              i = 0;
            for (; i < t.length && r < e;) {
              let e,
                o = 0,
                a = 0;
              do ((o |= (127 & (e = 255 & t[i].getAsNumber())) << a), (a += 7), i++);
              while ((128 & e) != 0 && i < t.length);
              n[r++] = o;
            }
            return n;
          })(v, C * M * I),
          T = (function (t) {
            let e = [t];
            if (t.has("Blocks"))
              try {
                e.push(t.getCompound("Blocks"));
              } catch (t) {}
            return e;
          })(y),
          x = (function (t) {
            let e = [];
            if ((d(t) && e.push(t), t.has("Blocks")))
              try {
                let n = t.getCompound("Blocks");
                d(n) && e.push(n);
              } catch (t) {}
            return e;
          })(y),
          L = (function (t) {
            let e = new Map(),
              n = new Set();
            for (let r of t)
              if (!n.has(r))
                for (let t of (n.add(r),
                ["BlockEntities", "TileEntities", "block_entities", "tile_entities"])) {
                  let n;
                  if (r.has(t)) {
                    try {
                      n = r.getList(t, 10);
                    } catch (t) {
                      continue;
                    }
                    for (let t = 0; t < n.length; t++) {
                      let r = n.getCompound(t),
                        i = (0, o.Ak)(r),
                        a = (0, o.MV)(r);
                      i && a && e.set(m(a[0], a[1], a[2]), i);
                    }
                  }
                }
            return e;
          })(T),
          D = (0, a.o)(T, [C, M, I]),
          V =
            ((n = (0, l.i5)(x)),
            (s = [C, M, I]),
            (g = A),
            0 === n.length || (0 === g[0] && 0 === g[1] && 0 === g[2])
              ? n
              : n.map((t) => {
                  if (f(t.position, s)) return t;
                  let e = [t.position[0] - g[0], t.position[1] - g[1], t.position[2] - g[2]];
                  return f(e, s) ? (0, l.EG)(t, e) : t;
                })),
          P = [],
          E = I * C;
        for (let t = 0; t < B.length; t++) {
          let e = B[t],
            n = N.get(e);
          if (!n || c.has(n.blockId)) continue;
          let r = Math.floor(t / E),
            a = Math.floor((t % E) / C),
            l = t % C,
            u = (0, i.C)(n.blockId),
            s = (0, o.HP)(u) ? L.get(m(l, r, a)) : void 0,
            f = D.size > 0 ? D.get(t) : void 0;
          P.push({
            blockId: u,
            properties: (0, i.G)(n.properties),
            position: [l, r, a],
            ...(s ? { renderData: { banner: s } } : {}),
            ...(f ? { tileText: f } : {}),
          });
        }
        let O = new Set(P.map((t) => t.blockId));
        return {
          name: S,
          author: h,
          size: [C, M, I],
          blocks: P,
          ...(V.length > 0 ? { entities: V } : {}),
          blockTypeCount: O.size,
          totalBlockCount: P.length,
          format: "schem",
          ...(void 0 !== w ? { sourceMeta: { dataVersion: w } } : {}),
          originOffset: A,
        };
      }
      function f(t, e) {
        return (
          t[0] >= -2 &&
          t[0] <= e[0] + 2 &&
          t[1] >= -2 &&
          t[1] <= e[1] + 2 &&
          t[2] >= -2 &&
          t[2] <= e[2] + 2
        );
      }
      function d(t) {
        return t.has("Entities") || t.has("entities");
      }
      function m(t, e, n) {
        return "".concat(t, ",").concat(e, ",").concat(n);
      }
    },
    56841: (t, e, n) => {
      n.d(e, {
        Bk: () => r,
        TI: () => v,
        Th: () => m,
        Wk: () => a,
        XK: () => u,
        bG: () => l,
        cV: () => c,
        dG: () => p,
        hn: () => i,
        kd: () => g,
        mL: () => h,
        oY: () => o,
        sj: () => s,
        t7: () => d,
        uj: () => f,
      });
      let r = ["desert", "jungle", "plains", "savanna", "snow", "swamp", "taiga"],
        i = [
          "none",
          "armorer",
          "butcher",
          "cartographer",
          "cleric",
          "farmer",
          "fisherman",
          "fletcher",
          "leatherworker",
          "librarian",
          "mason",
          "nitwit",
          "shepherd",
          "toolsmith",
          "weaponsmith",
        ],
        o = [
          "tabby",
          "black",
          "red",
          "siamese",
          "british_shorthair",
          "calico",
          "persian",
          "ragdoll",
          "white",
          "jellie",
          "all_black",
        ],
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
        l = ["white", "creamy", "chestnut", "brown", "black", "gray", "darkbrown"],
        u = ["none", "white", "whitefield", "whitedots", "blackdots"],
        c = ["brown", "white", "black", "white_splotched", "gold", "salt", "caerbannog", "toast"],
        s = ["red", "snow"],
        f = ["normal", "lazy", "worried", "playful", "brown", "weak", "aggressive"],
        d = ["lucy", "wild", "gold", "cyan", "blue"],
        m = ["creamy", "white", "brown", "gray"],
        g = ["red_blue", "blue", "green", "yellow_blue", "grey"],
        h = ["temperate", "warm", "cold"],
        p = ["red", "brown"],
        v = [
          "kob",
          "sunstreak",
          "snooper",
          "dasher",
          "brinely",
          "spotty",
          "flopper",
          "stripey",
          "glitter",
          "blockfish",
          "betty",
          "clayfish",
        ];
    },
    70144: (t, e, n) => {
      n.d(e, { e: () => c });
      var r = n(82084),
        i = n(5166),
        o = n(55822),
        a = n(74002),
        l = n(17975),
        u = n(91986);
      async function c(t, e) {
        var n, c;
        let f = new Uint8Array(t),
          d = r.TD.read(f).root,
          m = d.has("MinecraftDataVersion") ? d.getNumber("MinecraftDataVersion") : void 0,
          g = d.has("Version") ? d.getNumber("Version") : void 0,
          h = d.has("SubVersion") ? d.getNumber("SubVersion") : void 0,
          p = d.getCompound("Metadata"),
          v = (0, u.ew)(p.has("Name") ? p.getString("Name") : void 0, e),
          b = p.has("Author") ? p.getString("Author") : void 0,
          y = d.getCompound("Regions"),
          _ = Array.from(y.keys());
        if (0 === _.length) throw Error("Litematic 文件中没有找到任何区域");
        let k = [],
          w = [],
          C = 1 / 0,
          M = 1 / 0,
          I = 1 / 0,
          S = -1 / 0,
          A = -1 / 0,
          N = -1 / 0;
        for (let t of _) {
          let e = y.getCompound(t),
            n = e.getCompound("Size"),
            r = n.getNumber("x"),
            u = n.getNumber("y"),
            c = n.getNumber("z"),
            f = Math.abs(r),
            d = Math.abs(u),
            m = Math.abs(c),
            g = e.getCompound("Position"),
            h = g.getNumber("x"),
            p = g.getNumber("y"),
            v = g.getNumber("z"),
            b = r < 0 ? h + r + 1 : h,
            _ = u < 0 ? p + u + 1 : p,
            B = c < 0 ? v + c + 1 : v,
            T = (function (t, e) {
              let n = new Map();
              for (let r of ["TileEntities", "BlockEntities", "tile_entities", "block_entities"]) {
                let i;
                if (t.has(r)) {
                  try {
                    i = t.getList(r, 10);
                  } catch (t) {
                    continue;
                  }
                  for (let t = 0; t < i.length; t++) {
                    let r = i.getCompound(t),
                      a = (0, o.Ak)(r),
                      l = (0, o.MV)(r);
                    if (!a || !l) continue;
                    let [u, c, f] = l;
                    (n.set(s(u, c, f), a), n.set(s(u + e[0], c + e[1], f + e[2]), a));
                  }
                }
              }
              return n;
            })(e, [b, _, B]),
            x = (0, a.o)([e], [f, d, m]);
          w.push(...(0, l.i5)([e]).map((t) => ({ entity: t, regionPos: [h, p, v] })));
          let L = e.getList("BlockStatePalette", 10),
            D = [];
          for (let t = 0; t < L.length; t++) {
            let e = L.getCompound(t),
              n = (0, i.C)(e.getString("Name")),
              r = {};
            (e.has("Properties") &&
              e.getCompound("Properties").forEach((t, e) => {
                r[t] = e.getAsString();
              }),
              D.push({ blockId: n, properties: (0, i.G)(r) }));
          }
          let V = e.getLongArray("BlockStates").getItems(),
            P = f * d * m,
            E = (function (t, e, n) {
              let r = new Uint32Array(n),
                i = (1n << BigInt(e)) - 1n;
              for (let o = 0; o < n; o++) {
                let n = o * e,
                  a = Math.floor(n / 64),
                  l = n % 64;
                if (a >= t.length) break;
                let u = (BigInt.asUintN(64, t[a].toBigInt()) >> BigInt(l)) & i;
                if (l + e > 64 && a + 1 < t.length) {
                  let n = 64 - l;
                  u |=
                    (BigInt.asUintN(64, t[a + 1].toBigInt()) & ((1n << BigInt(e - n)) - 1n)) <<
                    BigInt(n);
                }
                r[o] = Number(u);
              }
              return r;
            })(V, Math.max(2, Math.ceil(Math.log2(D.length))), P);
          for (let t = 0; t < P; t++) {
            let e = E[t];
            if (e >= D.length) continue;
            let { blockId: n, properties: r } = D[e];
            if (
              "minecraft:air" === n ||
              "minecraft:cave_air" === n ||
              "minecraft:void_air" === n ||
              "minecraft:light" === n ||
              "minecraft:barrier" === n ||
              "minecraft:structure_void" === n
            )
              continue;
            let i = Math.floor(t / (m * f)),
              a = Math.floor((t % (m * f)) / f),
              l = (t % f) + b,
              u = i + _,
              c = a + B,
              d = (0, o.HP)(n) ? T.get(s(l, u, c)) : void 0,
              g = x.size > 0 ? x.get(t) : void 0;
            (k.push({
              blockId: n,
              properties: r,
              position: [l, u, c],
              ...(d ? { renderData: { banner: d } } : {}),
              ...(g ? { tileText: g } : {}),
            }),
              (C = Math.min(C, l)),
              (M = Math.min(M, u)),
              (I = Math.min(I, c)),
              (S = Math.max(S, l)),
              (A = Math.max(A, u)),
              (N = Math.max(N, c)));
          }
        }
        if (k.length > 0)
          for (let t of k) ((t.position[0] -= C), (t.position[1] -= M), (t.position[2] -= I));
        let B =
            ((n = w),
            (c = k.length > 0 ? { min: [C, M, I], max: [S, A, N] } : null),
            0 === n.length
              ? []
              : n.map((t) => {
                  let { entity: e, regionPos: n } = t,
                    r = e.position,
                    i = [r[0] + n[0], r[1] + n[1], r[2] + n[2]];
                  return c
                    ? (0, l.EG)(e, [i[0] - c.min[0], i[1] - c.min[1], i[2] - c.min[2]])
                    : (0, l.EG)(e, i);
                })),
          T = k.length > 0 ? S - C + 1 : 0,
          x = k.length > 0 ? A - M + 1 : 0,
          L = k.length > 0 ? N - I + 1 : 0,
          D = new Set(k.map((t) => t.blockId));
        return {
          name: v,
          author: b,
          size: [T, x, L],
          blocks: k,
          ...(B.length > 0 ? { entities: B } : {}),
          blockTypeCount: D.size,
          totalBlockCount: k.length,
          format: "litematic",
          sourceMeta: {
            ...(void 0 !== m ? { dataVersion: m } : {}),
            ...(void 0 !== g ? { litematicVersion: g } : {}),
            ...(void 0 !== h ? { litematicSubVersion: h } : {}),
          },
          originOffset: k.length > 0 ? [C, M, I] : [0, 0, 0],
        };
      }
      function s(t, e, n) {
        return "".concat(t, ",").concat(e, ",").concat(n);
      }
    },
    74002: (t, e, n) => {
      n.d(e, { o: () => u });
      var r = n(55822),
        i = n(17975);
      let o = ["Text1", "Text2", "Text3", "Text4"];
      function a(t) {
        if (!t) return null;
        if (t.isCompound() && t.has("")) return a(t.get(""));
        if (t.isCompound() || t.isList()) {
          let e = (0, i.Tf)(t.toSimplifiedJson());
          return e.trim() ? e : null;
        }
        let e = t.getAsString().trim();
        if (!e) return null;
        try {
          let t = (0, i.Tf)(JSON.parse(e));
          return t.trim() ? t : null;
        } catch (t) {
          return e;
        }
      }
      function l(t, e) {
        let n = [],
          r = t.get(e);
        if (!(null == r ? void 0 : r.isCompound())) return n;
        let i = r.get("messages");
        if (!(null == i ? void 0 : i.isListOrArray())) return n;
        for (let t of i.getItems()) {
          let e = a(t);
          e && n.push(e);
        }
        return n;
      }
      function u(t, e) {
        let [n, i, u] = e,
          c = new Map(),
          s = new Set();
        for (let e of t)
          if (!s.has(e))
            for (let t of (s.add(e),
            ["TileEntities", "BlockEntities", "tile_entities", "block_entities"])) {
              let s;
              if (e.has(t)) {
                try {
                  s = e.getList(t, 10);
                } catch (t) {
                  continue;
                }
                for (let t = 0; t < s.length; t++) {
                  let e = s.getCompound(t),
                    f = (0, r.MV)(e);
                  if (!f) continue;
                  let [d, m, g] = f.map(Math.floor);
                  if (d < 0 || m < 0 || g < 0 || d >= n || m >= i || g >= u) continue;
                  let h = (function (t) {
                    var e;
                    let n = t.get("Data"),
                      r = (null == n ? void 0 : n.isCompound()) ? n : t,
                      i = l(r, "front_text"),
                      u = l(r, "back_text");
                    for (let t of o) {
                      let e = a(r.get(t));
                      e && i.push(e);
                    }
                    let c = a(null != (e = r.get("CustomName")) ? e : r.get("custom_name"));
                    if (0 !== i.length || 0 !== u.length || c)
                      return {
                        ...(i.length > 0 ? { signFront: i } : {}),
                        ...(u.length > 0 ? { signBack: u } : {}),
                        ...(c ? { customName: c } : {}),
                      };
                  })(e);
                  if (!h) continue;
                  let p = (m * u + g) * n + d;
                  c.has(p) || c.set(p, h);
                }
              }
            }
        return c;
      }
    },
  },
]);

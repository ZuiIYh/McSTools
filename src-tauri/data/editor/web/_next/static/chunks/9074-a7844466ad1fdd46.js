(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9074],
  {
    3420: (e, t, r) => {
      "use strict";
      r.d(t, { k: () => i });
      var s = r(98169);
      class i {
        v1;
        v2;
        v3;
        v4;
        constructor(e, t, r, s) {
          ((this.v1 = e), (this.v2 = t), (this.v3 = r), (this.v4 = s));
        }
        vertices() {
          return [this.v1, this.v2, this.v3, this.v4];
        }
        forEach(e) {
          return (e(this.v1), e(this.v2), e(this.v3), e(this.v4), this);
        }
        transform(e) {
          return (this.forEach((t) => t.transform(e)), this);
        }
        normal() {
          let e = this.v2.pos.sub(this.v1.pos),
            t = this.v3.pos.sub(this.v1.pos);
          return e.cross(t).normalize();
        }
        reverse() {
          return (
            ([this.v1, this.v2, this.v3, this.v4] = [this.v4, this.v3, this.v2, this.v1]),
            this
          );
        }
        setColor(e) {
          return (this.forEach((t) => (t.color = e)), this);
        }
        setTexture(e, t) {
          return (
            (this.v1.textureLimit = t),
            (this.v2.textureLimit = t),
            (this.v3.textureLimit = t),
            (this.v4.textureLimit = t),
            (this.v1.texture = [e[0], e[1]]),
            (this.v2.texture = [e[2], e[3]]),
            (this.v3.texture = [e[4], e[5]]),
            (this.v4.texture = [e[6], e[7]]),
            this
          );
        }
        toString() {
          return `Quad(${this.v1.pos.toString()}, ${this.v2.pos.toString()}, ${this.v3.pos.toString()}, ${this.v4.pos.toString()})`;
        }
        static fromPoints(e, t, r, n) {
          return new i(s.L.fromPos(e), s.L.fromPos(t), s.L.fromPos(r), s.L.fromPos(n));
        }
      }
    },
    4215: (e, t, r) => {
      "use strict";
      r.d(t, { z: () => a });
      var s = r(13402),
        i = r(40623),
        n = r(22749);
      class a extends i.D {
        static ZERO = new a(0);
        static ONE = new a(1);
        value;
        constructor(e) {
          (super(), (this.value = "number" == typeof e ? e : +!!e));
        }
        getId() {
          return n.t.Byte;
        }
        equals(e) {
          return e.isByte() && this.value === e.value;
        }
        getAsNumber() {
          return this.value;
        }
        toString() {
          return this.value.toFixed() + "b";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.value;
        }
        toJson() {
          return this.value;
        }
        toBytes(e) {
          e.writeByte(this.value);
        }
        static create() {
          return a.ZERO;
        }
        static fromJson(e) {
          return new a(s.LM.readInt(e) ?? 0);
        }
        static fromBytes(e) {
          return new a(e.readByte());
        }
      }
      i.D.register(n.t.Byte, a);
    },
    4943: (e) => {
      !(function () {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          r = {
            rotl: function (e, t) {
              return (e << t) | (e >>> (32 - t));
            },
            rotr: function (e, t) {
              return (e << (32 - t)) | (e >>> t);
            },
            endian: function (e) {
              if (e.constructor == Number)
                return (0xff00ff & r.rotl(e, 8)) | (0xff00ff00 & r.rotl(e, 24));
              for (var t = 0; t < e.length; t++) e[t] = r.endian(e[t]);
              return e;
            },
            randomBytes: function (e) {
              for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
              return t;
            },
            bytesToWords: function (e) {
              for (var t = [], r = 0, s = 0; r < e.length; r++, s += 8)
                t[s >>> 5] |= e[r] << (24 - (s % 32));
              return t;
            },
            wordsToBytes: function (e) {
              for (var t = [], r = 0; r < 32 * e.length; r += 8)
                t.push((e[r >>> 5] >>> (24 - (r % 32))) & 255);
              return t;
            },
            bytesToHex: function (e) {
              for (var t = [], r = 0; r < e.length; r++)
                (t.push((e[r] >>> 4).toString(16)), t.push((15 & e[r]).toString(16)));
              return t.join("");
            },
            hexToBytes: function (e) {
              for (var t = [], r = 0; r < e.length; r += 2) t.push(parseInt(e.substr(r, 2), 16));
              return t;
            },
            bytesToBase64: function (e) {
              for (var r = [], s = 0; s < e.length; s += 3)
                for (var i = (e[s] << 16) | (e[s + 1] << 8) | e[s + 2], n = 0; n < 4; n++)
                  8 * s + 6 * n <= 8 * e.length
                    ? r.push(t.charAt((i >>> (6 * (3 - n))) & 63))
                    : r.push("=");
              return r.join("");
            },
            base64ToBytes: function (e) {
              e = e.replace(/[^A-Z0-9+\/]/gi, "");
              for (var r = [], s = 0, i = 0; s < e.length; i = ++s % 4)
                0 != i &&
                  r.push(
                    ((t.indexOf(e.charAt(s - 1)) & (Math.pow(2, -2 * i + 8) - 1)) << (2 * i)) |
                      (t.indexOf(e.charAt(s)) >>> (6 - 2 * i)),
                  );
              return r;
            },
          };
        e.exports = r;
      })();
    },
    7853: (e, t, r) => {
      "use strict";
      r.d(t, { p: () => n });
      var s = r(40623),
        i = r(22749);
      class n extends s.D {
        value;
        constructor(e) {
          (super(), (this.value = e));
        }
        getId() {
          return i.t.Short;
        }
        equals(e) {
          return e.isShort() && this.value === e.value;
        }
        getAsNumber() {
          return this.value;
        }
        toString() {
          return this.value.toFixed() + "s";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.value;
        }
        toJson() {
          return this.value;
        }
        toBytes(e) {
          e.writeShort(this.value);
        }
        static create() {
          return new n(0);
        }
        static fromJson(e) {
          return new n("number" == typeof e ? Math.floor(e) : 0);
        }
        static fromBytes(e) {
          return new n(e.readShort());
        }
      }
      s.D.register(i.t.Short, n);
    },
    9387: (e, t, r) => {
      !(function () {
        var t = r(4943),
          s = r(72843).utf8,
          i = r(59410),
          n = r(72843).bin,
          a = function (e, r) {
            e.constructor == String
              ? (e = r && "binary" === r.encoding ? n.stringToBytes(e) : s.stringToBytes(e))
              : i(e)
                ? (e = Array.prototype.slice.call(e, 0))
                : Array.isArray(e) || e.constructor === Uint8Array || (e = e.toString());
            for (
              var o = t.bytesToWords(e),
                u = 8 * e.length,
                l = 0x67452301,
                h = -0x10325477,
                c = -0x67452302,
                d = 0x10325476,
                f = 0;
              f < o.length;
              f++
            )
              o[f] =
                (((o[f] << 8) | (o[f] >>> 24)) & 0xff00ff) |
                (((o[f] << 24) | (o[f] >>> 8)) & 0xff00ff00);
            ((o[u >>> 5] |= 128 << (u % 32)), (o[(((u + 64) >>> 9) << 4) + 14] = u));
            for (var m = a._ff, g = a._gg, p = a._hh, w = a._ii, f = 0; f < o.length; f += 16) {
              var x = l,
                v = h,
                b = c,
                y = d;
              ((l = m(l, h, c, d, o[f + 0], 7, -0x28955b88)),
                (d = m(d, l, h, c, o[f + 1], 12, -0x173848aa)),
                (c = m(c, d, l, h, o[f + 2], 17, 0x242070db)),
                (h = m(h, c, d, l, o[f + 3], 22, -0x3e423112)),
                (l = m(l, h, c, d, o[f + 4], 7, -0xa83f051)),
                (d = m(d, l, h, c, o[f + 5], 12, 0x4787c62a)),
                (c = m(c, d, l, h, o[f + 6], 17, -0x57cfb9ed)),
                (h = m(h, c, d, l, o[f + 7], 22, -0x2b96aff)),
                (l = m(l, h, c, d, o[f + 8], 7, 0x698098d8)),
                (d = m(d, l, h, c, o[f + 9], 12, -0x74bb0851)),
                (c = m(c, d, l, h, o[f + 10], 17, -42063)),
                (h = m(h, c, d, l, o[f + 11], 22, -0x76a32842)),
                (l = m(l, h, c, d, o[f + 12], 7, 0x6b901122)),
                (d = m(d, l, h, c, o[f + 13], 12, -0x2678e6d)),
                (c = m(c, d, l, h, o[f + 14], 17, -0x5986bc72)),
                (h = m(h, c, d, l, o[f + 15], 22, 0x49b40821)),
                (l = g(l, h, c, d, o[f + 1], 5, -0x9e1da9e)),
                (d = g(d, l, h, c, o[f + 6], 9, -0x3fbf4cc0)),
                (c = g(c, d, l, h, o[f + 11], 14, 0x265e5a51)),
                (h = g(h, c, d, l, o[f + 0], 20, -0x16493856)),
                (l = g(l, h, c, d, o[f + 5], 5, -0x29d0efa3)),
                (d = g(d, l, h, c, o[f + 10], 9, 0x2441453)),
                (c = g(c, d, l, h, o[f + 15], 14, -0x275e197f)),
                (h = g(h, c, d, l, o[f + 4], 20, -0x182c0438)),
                (l = g(l, h, c, d, o[f + 9], 5, 0x21e1cde6)),
                (d = g(d, l, h, c, o[f + 14], 9, -0x3cc8f82a)),
                (c = g(c, d, l, h, o[f + 3], 14, -0xb2af279)),
                (h = g(h, c, d, l, o[f + 8], 20, 0x455a14ed)),
                (l = g(l, h, c, d, o[f + 13], 5, -0x561c16fb)),
                (d = g(d, l, h, c, o[f + 2], 9, -0x3105c08)),
                (c = g(c, d, l, h, o[f + 7], 14, 0x676f02d9)),
                (h = g(h, c, d, l, o[f + 12], 20, -0x72d5b376)),
                (l = p(l, h, c, d, o[f + 5], 4, -378558)),
                (d = p(d, l, h, c, o[f + 8], 11, -0x788e097f)),
                (c = p(c, d, l, h, o[f + 11], 16, 0x6d9d6122)),
                (h = p(h, c, d, l, o[f + 14], 23, -0x21ac7f4)),
                (l = p(l, h, c, d, o[f + 1], 4, -0x5b4115bc)),
                (d = p(d, l, h, c, o[f + 4], 11, 0x4bdecfa9)),
                (c = p(c, d, l, h, o[f + 7], 16, -0x944b4a0)),
                (h = p(h, c, d, l, o[f + 10], 23, -0x41404390)),
                (l = p(l, h, c, d, o[f + 13], 4, 0x289b7ec6)),
                (d = p(d, l, h, c, o[f + 0], 11, -0x155ed806)),
                (c = p(c, d, l, h, o[f + 3], 16, -0x2b10cf7b)),
                (h = p(h, c, d, l, o[f + 6], 23, 0x4881d05)),
                (l = p(l, h, c, d, o[f + 9], 4, -0x262b2fc7)),
                (d = p(d, l, h, c, o[f + 12], 11, -0x1924661b)),
                (c = p(c, d, l, h, o[f + 15], 16, 0x1fa27cf8)),
                (h = p(h, c, d, l, o[f + 2], 23, -0x3b53a99b)),
                (l = w(l, h, c, d, o[f + 0], 6, -0xbd6ddbc)),
                (d = w(d, l, h, c, o[f + 7], 10, 0x432aff97)),
                (c = w(c, d, l, h, o[f + 14], 15, -0x546bdc59)),
                (h = w(h, c, d, l, o[f + 5], 21, -0x36c5fc7)),
                (l = w(l, h, c, d, o[f + 12], 6, 0x655b59c3)),
                (d = w(d, l, h, c, o[f + 3], 10, -0x70f3336e)),
                (c = w(c, d, l, h, o[f + 10], 15, -1051523)),
                (h = w(h, c, d, l, o[f + 1], 21, -0x7a7ba22f)),
                (l = w(l, h, c, d, o[f + 8], 6, 0x6fa87e4f)),
                (d = w(d, l, h, c, o[f + 15], 10, -0x1d31920)),
                (c = w(c, d, l, h, o[f + 6], 15, -0x5cfebcec)),
                (h = w(h, c, d, l, o[f + 13], 21, 0x4e0811a1)),
                (l = w(l, h, c, d, o[f + 4], 6, -0x8ac817e)),
                (d = w(d, l, h, c, o[f + 11], 10, -0x42c50dcb)),
                (c = w(c, d, l, h, o[f + 2], 15, 0x2ad7d2bb)),
                (h = w(h, c, d, l, o[f + 9], 21, -0x14792c6f)),
                (l = (l + x) >>> 0),
                (h = (h + v) >>> 0),
                (c = (c + b) >>> 0),
                (d = (d + y) >>> 0));
            }
            return t.endian([l, h, c, d]);
          };
        ((a._ff = function (e, t, r, s, i, n, a) {
          var o = e + ((t & r) | (~t & s)) + (i >>> 0) + a;
          return ((o << n) | (o >>> (32 - n))) + t;
        }),
          (a._gg = function (e, t, r, s, i, n, a) {
            var o = e + ((t & s) | (r & ~s)) + (i >>> 0) + a;
            return ((o << n) | (o >>> (32 - n))) + t;
          }),
          (a._hh = function (e, t, r, s, i, n, a) {
            var o = e + (t ^ r ^ s) + (i >>> 0) + a;
            return ((o << n) | (o >>> (32 - n))) + t;
          }),
          (a._ii = function (e, t, r, s, i, n, a) {
            var o = e + (r ^ (t | ~s)) + (i >>> 0) + a;
            return ((o << n) | (o >>> (32 - n))) + t;
          }),
          (a._blocksize = 16),
          (a._digestsize = 16),
          (e.exports = function (e, r) {
            if (null == e) throw Error("Illegal argument " + e);
            var s = t.wordsToBytes(a(e, r));
            return r && r.asBytes ? s : r && r.asString ? n.bytesToString(s) : t.bytesToHex(s);
          }));
      })();
    },
    13402: (e, t, r) => {
      "use strict";
      r.d(t, { Q1: () => s, LM: () => i.L, r: () => n, EB: () => o, RZ: () => a, SK: () => u });
      var s,
        i = r(91305);
      !(function (e) {
        function t(e) {
          return [((e >> 16) & 255) / 255, ((e >> 8) & 255) / 255, (255 & e) / 255];
        }
        ((e.fromJson = function (e) {
          let r = i.L.readNumber(e);
          if (r) return t(r);
          let s = i.L.readArray(e, (e) => i.L.readNumber(e) ?? 0);
          if (void 0 !== s && 3 === s.length) return s;
        }),
          (e.fromNbt = function (e) {
            if (e.isNumber()) return t(e.getAsNumber());
            if (!e.isListOrArray()) return;
            let r = e.getItems();
            if (!(r.length < 3)) return r.map((e) => e.getAsNumber());
          }),
          (e.intToRgb = t));
      })(s || (s = {}));
      class n {
        source;
        cursor;
        constructor(e) {
          ((this.source = e), (this.cursor = 0));
        }
        get remainingLength() {
          return this.source.length - this.cursor;
        }
        get totalLength() {
          return this.source.length;
        }
        getRead(e = 0) {
          return this.source.substring(e, this.cursor);
        }
        getRemaining() {
          return this.source.substring(this.cursor);
        }
        canRead(e = 1) {
          return this.cursor + e <= this.source.length;
        }
        peek(e = 0) {
          return this.source.charAt(this.cursor + e);
        }
        read() {
          return this.source.charAt(this.cursor++);
        }
        skip() {
          this.cursor += 1;
        }
        skipWhitespace() {
          for (; this.canRead() && n.isWhitespace(this.peek());) this.skip();
        }
        expect(e, t = !1) {
          if ((t && this.skipWhitespace(), !this.canRead() || this.peek() !== e))
            throw this.createError(`Expected '${e}'`);
          this.skip();
        }
        readInt() {
          let e = this.cursor;
          for (; this.canRead() && n.isAllowedInNumber(this.peek());) this.skip();
          let t = this.getRead(e);
          if (0 === t.length) throw this.createError("Expected integer");
          try {
            let e = Number(t);
            if (isNaN(e) || !Number.isInteger(e)) throw Error();
            return e;
          } catch (r) {
            throw ((this.cursor = e), this.createError(`Invalid integer '${t}'`));
          }
        }
        readFloat() {
          let e = this.cursor;
          for (; this.canRead() && n.isAllowedInNumber(this.peek());) this.skip();
          let t = this.getRead(e);
          if (0 === t.length) throw this.createError("Expected float");
          try {
            let e = Number(t);
            if (isNaN(e)) throw Error();
            return e;
          } catch (r) {
            throw ((this.cursor = e), this.createError(`Invalid float '${t}'`));
          }
        }
        readUnquotedString() {
          let e = this.cursor;
          for (; this.canRead() && n.isAllowedInUnquotedString(this.peek());) this.skip();
          return this.getRead(e);
        }
        readQuotedString() {
          if (!this.canRead()) return "";
          let e = this.peek();
          if (!n.isQuotedStringStart(e)) throw this.createError("Expected quote to start a string");
          return (this.skip(), this.readStringUntil(e));
        }
        readString() {
          if (!this.canRead()) return "";
          let e = this.peek();
          return n.isQuotedStringStart(e)
            ? (this.skip(), this.readStringUntil(e))
            : this.readUnquotedString();
        }
        readStringUntil(e) {
          let t = [],
            r = !1;
          for (; this.canRead();) {
            let s = this.read();
            if (r)
              if (s === e || "\\" === s) (t.push(s), (r = !1));
              else
                throw (
                  (this.cursor -= 1),
                  this.createError(`Invalid escape sequence '${s}' in quoted string`)
                );
            else if ("\\" === s) r = !0;
            else {
              if (s === e) return t.join("");
              t.push(s);
            }
          }
          throw this.createError("Unclosed quoted string");
        }
        readBoolean() {
          let e = this.cursor,
            t = this.readUnquotedString();
          if (0 === t.length) throw this.createError("Expected bool");
          if ("true" === t) return !0;
          if ("false" === t) return !1;
          throw (
            (this.cursor = e),
            this.createError(`Invalid bool, expected true or false but found '${t}'`)
          );
        }
        static isAllowedInNumber(e) {
          return (e >= "0" && e <= "9") || "." === e || "-" === e;
        }
        static isAllowedInUnquotedString(e) {
          return (
            (e >= "0" && e <= "9") ||
            (e >= "A" && e <= "Z") ||
            (e >= "a" && e <= "z") ||
            "_" === e ||
            "-" === e ||
            "." === e ||
            "+" === e
          );
        }
        static isQuotedStringStart(e) {
          return "'" === e || '"' === e;
        }
        static isWhitespace(e) {
          return " " === e || "	" === e || "\n" === e || "\r" === e;
        }
        createError(e) {
          let t = Math.min(this.source.length, this.cursor),
            r = (t > 10 ? "..." : "") + this.source.substring(Math.max(0, t - 10), t);
          return Error(`${e} at position ${this.cursor}: ${r}<--[HERE]`);
        }
      }
      function a(e) {
        let t = null;
        return () => (null == t && (t = e()), t);
      }
      function o(e, t, r) {
        let s = e.get(t);
        if (void 0 !== s) return s;
        let i = r(t);
        return (e.set(t, i), i);
      }
      function u(e, t, r, s) {
        let i = e.get(t) ?? r;
        return (s(i, t), e.set(t, i), i);
      }
    },
    14916: (e, t, r) => {
      "use strict";
      r.d(t, { T: () => l });
      var s = r(41210),
        i = r(13402),
        n = r(23273);
      class a {
        littleEndian;
        offset;
        buffer;
        array;
        view;
        constructor(e) {
          ((this.littleEndian = e?.littleEndian ?? !1),
            (this.offset = e?.offset ?? 0),
            (this.buffer = new ArrayBuffer(e?.initialSize ?? 1024)),
            (this.array = new Uint8Array(this.buffer)),
            (this.view = new DataView(this.buffer)));
        }
        accommodate(e) {
          let t = this.offset + e;
          if (this.buffer.byteLength >= t) return;
          let r = this.buffer.byteLength;
          for (; r < t;) r *= 2;
          let s = new ArrayBuffer(r),
            i = new Uint8Array(s);
          (i.set(this.array),
            this.offset > this.buffer.byteLength && i.fill(0, this.buffer.byteLength, this.offset),
            (this.buffer = s),
            (this.view = new DataView(s)),
            (this.array = i));
        }
        writeNumber(e, t, r) {
          (this.accommodate(t),
            this.view[e](this.offset, r, this.littleEndian),
            (this.offset += t));
        }
        writeByte = this.writeNumber.bind(this, "setInt8", 1);
        writeShort = this.writeNumber.bind(this, "setInt16", 2);
        writeInt = this.writeNumber.bind(this, "setInt32", 4);
        writeFloat = this.writeNumber.bind(this, "setFloat32", 4);
        writeDouble = this.writeNumber.bind(this, "setFloat64", 8);
        writeBytes(e) {
          (this.accommodate(e.length), this.array.set(e, this.offset), (this.offset += e.length));
        }
        writeString(e) {
          let t = (function (e) {
            var t,
              r,
              s = [];
            for (t = 0; t < e.length; t++)
              (r = e.charCodeAt(t)) < 128
                ? s.push(r)
                : (r < 2048
                    ? s.push(192 | (r >> 6))
                    : (r < 65536
                        ? s.push(224 | (r >> 12))
                        : (s.push(240 | ((r >> 18) & 7)), s.push(128 | ((r >> 12) & 63))),
                      s.push(128 | ((r >> 6) & 63))),
                  s.push(128 | (63 & r)));
            return s;
          })(e);
          (this.writeShort(t.length), this.writeBytes(t));
        }
        getData() {
          return (this.accommodate(0), this.array.slice(0, this.offset));
        }
      }
      class o {
        littleEndian;
        offset;
        array;
        view;
        constructor(e, t) {
          ((this.littleEndian = t?.littleEndian ?? !1),
            (this.offset = t?.offset ?? 0),
            (this.array = e instanceof Uint8Array ? e : new Uint8Array(e)),
            (this.view = new DataView(this.array.buffer, this.array.byteOffset)));
        }
        readNumber(e, t) {
          let r = this.view[e](this.offset, this.littleEndian);
          return ((this.offset += t), r);
        }
        readByte = this.readNumber.bind(this, "getInt8", 1);
        readShort = this.readNumber.bind(this, "getInt16", 2);
        readInt = this.readNumber.bind(this, "getInt32", 4);
        readFloat = this.readNumber.bind(this, "getFloat32", 4);
        readDouble = this.readNumber.bind(this, "getFloat64", 8);
        readBytes(e) {
          let t = this.array.slice(this.offset, this.offset + e);
          return ((this.offset += e), t);
        }
        readString() {
          let e = this.readShort();
          var t,
            r = this.readBytes(e),
            s = [];
          for (t = 0; t < r.length; t++)
            (128 & r[t]) == 0
              ? s.push(127 & r[t])
              : t + 1 < r.length && (224 & r[t]) == 192 && (192 & r[t + 1]) == 128
                ? s.push(((31 & r[t]) << 6) | (63 & r[t + 1]))
                : t + 2 < r.length &&
                    (240 & r[t]) == 224 &&
                    (192 & r[t + 1]) == 128 &&
                    (192 & r[t + 2]) == 128
                  ? s.push(((15 & r[t]) << 12) | ((63 & r[t + 1]) << 6) | (63 & r[t + 2]))
                  : t + 3 < r.length &&
                    (248 & r[t]) == 240 &&
                    (192 & r[t + 1]) == 128 &&
                    (192 & r[t + 2]) == 128 &&
                    (192 & r[t + 3]) == 128 &&
                    s.push(
                      ((7 & r[t]) << 18) |
                        ((63 & r[t + 1]) << 12) |
                        ((63 & r[t + 2]) << 6) |
                        (63 & r[t + 3]),
                    );
          return String.fromCharCode.apply(null, s);
        }
      }
      var u = r(19696);
      class l {
        name;
        root;
        compression;
        littleEndian;
        bedrockHeader;
        static DEFAULT_NAME = "";
        static DEFAULT_BEDROCK_HEADER = 4;
        constructor(e, t, r, s, i) {
          ((this.name = e),
            (this.root = t),
            (this.compression = r),
            (this.littleEndian = s),
            (this.bedrockHeader = i));
        }
        writeNamedTag(e) {
          (e.writeByte(n.t$.Compound), e.writeString(this.name), this.root.toBytes(e));
        }
        write() {
          let e = new a({
            littleEndian: !0 === this.littleEndian || void 0 !== this.bedrockHeader,
            offset: this.bedrockHeader && 8,
          });
          if ((this.writeNamedTag(e), void 0 !== this.bedrockHeader)) {
            let t = e.offset;
            ((e.offset = 0), e.writeInt(this.bedrockHeader), e.writeInt(t - 8), (e.offset = t));
          }
          let t = e.getData();
          return "gzip" === this.compression
            ? s.Ay.gzip(t)
            : "zlib" === this.compression
              ? s.Ay.deflate(t)
              : t;
        }
        static readNamedTag(e) {
          if (e.readByte() !== n.t$.Compound) throw Error("Top tag should be a compound");
          return { name: e.readString(), root: u.G.fromBytes(e) };
        }
        static create(e = {}) {
          let t = e.name ?? l.DEFAULT_NAME,
            r = u.G.create(),
            s = e.compression ?? "none",
            i = "boolean" == typeof e.bedrockHeader ? l.DEFAULT_BEDROCK_HEADER : e.bedrockHeader;
          return new l(t, r, s, e.littleEndian ?? void 0 !== e.bedrockHeader, i);
        }
        static read(e, t = {}) {
          var r;
          let i =
              "number" == typeof t.bedrockHeader
                ? t.bedrockHeader
                : t.bedrockHeader
                  ? (function (e) {
                      let t = e.slice(0, 8),
                        r = new DataView(t.buffer, t.byteOffset),
                        s = r.getUint32(0, !0),
                        i = r.getUint32(4, !0);
                      if (8 === t.length && s > 0 && s < 100 && i === e.byteLength - 8) return s;
                    })(e)
                  : void 0,
            n =
              "gzip" === t.compression ||
              (!i &&
                void 0 === t.compression &&
                2 === (r = e.slice(0, 2)).length &&
                31 === r[0] &&
                139 === r[1]),
            a =
              "zlib" === t.compression ||
              (!i &&
                void 0 === t.compression &&
                (function (e) {
                  let t = e.slice(0, 2);
                  return (
                    2 === t.length &&
                    120 === t[0] &&
                    (1 === t[1] || 94 === t[1] || 156 === t[1] || 218 === t[2])
                  );
                })(e)),
            u = a || n ? s.Ay.inflate(e) : e,
            h = t.littleEndian || void 0 !== i,
            c = new o(u, { littleEndian: h, offset: i && 8 }),
            { name: d, root: f } = l.readNamedTag(c);
          return new l(t.name ?? d, f, n ? "gzip" : a ? "zlib" : "none", h, i);
        }
        toJson() {
          return {
            name: this.name,
            root: this.root.toJson(),
            compression: this.compression,
            littleEndian: this.littleEndian,
            bedrockHeader: this.bedrockHeader ?? null,
          };
        }
        static fromJson(e) {
          let t = i.LM.readObject(e) ?? {},
            r = i.LM.readString(t.name) ?? "",
            s = u.G.fromJson(t.root ?? {}),
            n = i.LM.readString(t.compression) ?? "none";
          return new l(
            r,
            s,
            n,
            i.LM.readBoolean(t.littleEndian) ?? !1,
            i.LM.readNumber(t.bedrockHeader),
          );
        }
      }
    },
    16947: (e, t, r) => {
      "use strict";
      r.d(t, { v: () => u });
      var s = r(50923),
        i = r(85250),
        n = r(82084),
        a = r(31206),
        o = r(21337);
      class u {
        gl;
        structure;
        resources;
        chunks = [];
        chunkSize;
        constructor(e, t, r, s = 16) {
          ((this.gl = e),
            (this.structure = t),
            (this.resources = r),
            (this.chunkSize = "number" == typeof s ? [s, s, s] : s),
            this.updateStructureBuffers());
        }
        setStructure(e) {
          ((this.structure = e), this.updateStructureBuffers());
        }
        updateStructureBuffers(e) {
          if (this.structure) {
            for (let t of (e
              ? e.forEach((e) => {
                  let t = this.getChunk(e);
                  (t.mesh.clear(), t.transparentMesh.clear());
                })
              : this.chunks.forEach((e) =>
                  e.forEach((e) =>
                    e.forEach((e) => {
                      (e.mesh.clear(), e.transparentMesh.clear());
                    }),
                  ),
                ),
            this.structure.getBlocks())) {
              let r = t.state.getName(),
                i = t.state.getProperties();
              Object.entries(this.resources.getDefaultBlockProperties(r) ?? {}).forEach(
                ([e, t]) => {
                  i[e] || (i[e] = t);
                },
              );
              let u = [
                Math.floor(t.pos[0] / this.chunkSize[0]),
                Math.floor(t.pos[1] / this.chunkSize[1]),
                Math.floor(t.pos[2] / this.chunkSize[2]),
              ];
              if (e && !e.some((e) => s.aI(e, u))) continue;
              let l = this.getChunk(u);
              try {
                let e = this.resources.getBlockDefinition(r),
                  s = {
                    up: this.needsCull(t, n.OP.UP),
                    down: this.needsCull(t, n.OP.DOWN),
                    west: this.needsCull(t, n.OP.WEST),
                    east: this.needsCull(t, n.OP.EAST),
                    north: this.needsCull(t, n.OP.NORTH),
                    south: this.needsCull(t, n.OP.SOUTH),
                  },
                  u = new a.e();
                e && u.merge(e.getMesh(r, i, this.resources, this.resources, s));
                let h = o.y.getBlockMesh(t.state, t.nbt, this.resources, s);
                (h.isEmpty() || u.merge(h),
                  u.isEmpty() ||
                    (this.finishChunkMesh(u, t.pos),
                    this.resources.getBlockFlags(t.state.getName())?.semi_transparent
                      ? l.transparentMesh.merge(u)
                      : l.mesh.merge(u)));
              } catch (e) {
                console.error(`Error rendering block ${r}`, e);
              }
            }
            e
              ? e.forEach((e) => {
                  let t = this.getChunk(e);
                  (t.mesh.rebuild(this.gl, {
                    pos: !0,
                    color: !0,
                    texture: !0,
                    normal: !0,
                    blockPos: !0,
                  }),
                    t.transparentMesh.rebuild(this.gl, {
                      pos: !0,
                      color: !0,
                      texture: !0,
                      normal: !0,
                      blockPos: !0,
                    }));
                })
              : this.chunks.forEach((e) =>
                  e.forEach((e) =>
                    e.forEach((e) => {
                      (e.mesh.rebuild(this.gl, {
                        pos: !0,
                        color: !0,
                        texture: !0,
                        normal: !0,
                        blockPos: !0,
                      }),
                        e.transparentMesh.rebuild(this.gl, {
                          pos: !0,
                          color: !0,
                          texture: !0,
                          normal: !0,
                          blockPos: !0,
                        }));
                    }),
                  ),
                );
          }
        }
        getMeshes() {
          let e = this.chunks.flatMap((e) => e.flatMap((e) => e.flatMap((e) => e ?? [])));
          return e
            .flatMap((e) => (e.mesh.isEmpty() ? [] : e.mesh))
            .concat(e.flatMap((e) => (e.transparentMesh.isEmpty() ? [] : e.transparentMesh)));
        }
        needsCull(e, t) {
          let r = this.structure.getBlock(n.IX.towards(e.pos, t))?.state;
          if (!r) return !1;
          let s = this.resources.getBlockFlags(r.getName());
          return (
            !!(e.state.getName().equals(r.getName()) && s?.self_culling) ||
            (s?.opaque
              ? !(t === n.OP.UP && e.state.isWaterlogged())
              : e.state.isWaterlogged() && r.isWaterlogged())
          );
        }
        finishChunkMesh(e, t) {
          let r = i.vt();
          for (let s of (i.Tl(r, r, t), e.transform(r), e.quads)) {
            let e = s.normal();
            (s.forEach((t) => (t.normal = e)),
              s.forEach((e) => (e.blockPos = new n.Mi(t[0], t[1], t[2]))));
          }
        }
        getChunk(e) {
          let t = 2 * Math.abs(e[0]) + +(e[0] < 0),
            r = 2 * Math.abs(e[1]) + +(e[1] < 0),
            s = 2 * Math.abs(e[2]) + +(e[2] < 0);
          return (
            this.chunks[t] || (this.chunks[t] = []),
            this.chunks[t][r] || (this.chunks[t][r] = []),
            this.chunks[t][r][s] ||
              (this.chunks[t][r][s] = { mesh: new a.e(), transparentMesh: new a.e() }),
            this.chunks[t][r][s]
          );
        }
      }
    },
    18023: (e, t, r) => {
      "use strict";
      r.d(t, { P: () => u });
      var s = r(13402),
        i = r(36595),
        n = r(51190),
        a = r(40623),
        o = r(22749);
      class u extends i.h {
        constructor(e) {
          super(Array.from(e ?? [], (e) => ("number" == typeof e ? new n.Q(e) : e)));
        }
        getId() {
          return o.t.IntArray;
        }
        equals(e) {
          return (
            e.isIntArray() &&
            this.length === e.length &&
            this.items.every((t, r) => t.equals(e.items[r]))
          );
        }
        getType() {
          return o.t.Int;
        }
        get length() {
          return this.items.length;
        }
        toString() {
          return "[I;" + this.items.map((e) => e.getAsNumber().toFixed()).join(",") + "]";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.items.map((e) => e.getAsNumber());
        }
        toJson() {
          return this.items.map((e) => e.getAsNumber());
        }
        toBytes(e) {
          for (let t of (e.writeInt(this.items.length), this.items)) e.writeInt(t.getAsNumber());
        }
        static create() {
          return new u();
        }
        static fromJson(e) {
          return new u(s.LM.readArray(e, (e) => s.LM.readNumber(e) ?? 0) ?? []);
        }
        static fromBytes(e) {
          let t = e.readInt(),
            r = [];
          for (let s = 0; s < t; s += 1) r.push(e.readInt());
          return new u(r);
        }
      }
      a.D.register(o.t.IntArray, u);
    },
    19696: (e, t, r) => {
      "use strict";
      r.d(t, { G: () => c });
      var s = r(13402),
        i = r(87118),
        n = r(84224),
        a = r(18023),
        o = r(73165),
        u = r(59276),
        l = r(40623),
        h = r(22749);
      class c extends l.D {
        properties;
        constructor(e) {
          (super(), (this.properties = e ?? new Map()));
        }
        getId() {
          return h.t.Compound;
        }
        equals(e) {
          return (
            e.isCompound() &&
            this.size === e.size &&
            [...this.properties.entries()].every(([t, r]) => {
              let s = e.properties.get(t);
              return void 0 !== s && r.equals(s);
            })
          );
        }
        has(e) {
          return this.properties.has(e);
        }
        hasNumber(e) {
          return this.get(e)?.isNumber() ?? !1;
        }
        hasString(e) {
          return this.get(e)?.isString() ?? !1;
        }
        hasList(e, t, r) {
          let s = this.get(e);
          return (
            (s?.isList() &&
              (void 0 === t || s.getType() === t) &&
              (void 0 === r || s.length === r)) ??
            !1
          );
        }
        hasCompound(e) {
          return this.get(e)?.isCompound() ?? !1;
        }
        get(e) {
          return this.properties.get(e);
        }
        getString(e) {
          return this.get(e)?.getAsString() ?? "";
        }
        getNumber(e) {
          return this.get(e)?.getAsNumber() ?? 0;
        }
        getBoolean(e) {
          return 0 !== this.getNumber(e);
        }
        getList(e, t) {
          let r = this.get(e);
          return r?.isList() && (void 0 === t || r.getType() === t) ? r : o.J.create();
        }
        getCompound(e) {
          let t = this.get(e);
          return t?.isCompound() ? t : c.create();
        }
        getByteArray(e) {
          let t = this.get(e);
          return t?.isByteArray() ? t : n.E.create();
        }
        getIntArray(e) {
          let t = this.get(e);
          return t?.isIntArray() ? t : a.P.create();
        }
        getLongArray(e) {
          let t = this.get(e);
          return t?.isLongArray() ? t : u.U.create();
        }
        keys() {
          return this.properties.keys();
        }
        get size() {
          return this.properties.size;
        }
        map(e) {
          return Object.fromEntries([...this.properties.entries()].map(([t, r]) => e(t, r, this)));
        }
        forEach(e) {
          [...this.properties.entries()].forEach(([t, r]) => e(t, r, this));
        }
        set(e, t) {
          return (this.properties.set(e, t), this);
        }
        delete(e) {
          return this.properties.delete(e);
        }
        clear() {
          return (this.properties.clear(), this);
        }
        toString() {
          let e = [];
          for (let [t, r] of this.properties.entries()) {
            let i = t.split("").some((e) => !s.r.isAllowedInUnquotedString(e));
            e.push((i ? JSON.stringify(t) : t) + ":" + r.toString());
          }
          return "{" + e.join(",") + "}";
        }
        toPrettyString(e = "  ", t = 0) {
          if (0 === this.size) return "{}";
          let r = e.repeat(t),
            i = e.repeat(t + 1),
            n = [];
          for (let [r, i] of this.properties.entries()) {
            let a = r.split("").some((e) => !s.r.isAllowedInUnquotedString(e));
            n.push((a ? JSON.stringify(r) : r) + ": " + i.toPrettyString(e, t + 1));
          }
          return "{\n" + n.map((e) => i + e).join(",\n") + "\n" + r + "}";
        }
        toSimplifiedJson() {
          return this.map((e, t) => [e, t.toSimplifiedJson()]);
        }
        toJson() {
          return this.map((e, t) => [e, { type: t.getId(), value: t.toJson() }]);
        }
        toBytes(e) {
          for (let [t, r] of this.properties.entries()) {
            let s = r.getId();
            (e.writeByte(s), e.writeString(t), r.toBytes(e));
          }
          e.writeByte(h.t.End);
        }
        static create() {
          return new c();
        }
        static fromString(e) {
          return i.s.readTag(e);
        }
        static fromJson(e) {
          return new c(
            new Map(
              Object.entries(
                s.LM.readMap(e, (e) => {
                  let { type: t, value: r } = s.LM.readObject(e) ?? {},
                    i = s.LM.readNumber(t);
                  return l.D.fromJson(r ?? {}, i);
                }),
              ),
            ),
          );
        }
        static fromBytes(e) {
          let t = new Map();
          for (;;) {
            let r = e.readByte();
            if (r === h.t.End) break;
            let s = e.readString(),
              i = l.D.fromBytes(e, r);
            t.set(s, i);
          }
          return new c(t);
        }
      }
      l.D.register(h.t.Compound, c);
    },
    19881: (e, t, r) => {
      "use strict";
      r.d(t, { P: () => s });
      var s,
        i = r(45723),
        n = r(13402);
      let a = [0, 0, 0];
      !(function (e) {
        e.fromJson = function (e) {
          let i = n.LM.readObject(e) ?? {},
            d = n.LM.readString(i.type)?.replace(/^minecraft:/, "");
          switch (d) {
            case "constant":
              return new t(n.Q1.fromJson(i.value) ?? a);
            case "dye":
              return new r(n.Q1.fromJson(i.default) ?? a);
            case "grass":
              return new s(n.LM.readNumber(i.temperature) ?? 0, n.LM.readNumber(i.downfall) ?? 0);
            case "firework":
              return new o(n.Q1.fromJson(i.default) ?? a);
            case "potion":
              return new u(n.Q1.fromJson(i.default) ?? a);
            case "map_color":
              return new l(n.Q1.fromJson(i.default) ?? a);
            case "custom_model_data":
              return new h(n.LM.readInt(i.index) ?? 0, n.Q1.fromJson(i.default) ?? a);
            case "team":
              return new c(n.Q1.fromJson(i.default) ?? a);
            default:
              throw Error(`Invalid item tint type ${d}`);
          }
        };
        class t {
          value;
          constructor(e) {
            this.value = e;
          }
          getTint(e) {
            return this.value;
          }
        }
        e.Constant = t;
        class r {
          default_color;
          constructor(e) {
            this.default_color = e;
          }
          getTint(e, t) {
            let r = e.getComponent("dyed_color", t);
            return r
              ? r.isCompound()
                ? n.Q1.intToRgb(r.getNumber("rgb"))
                : n.Q1.intToRgb(r.getAsNumber())
              : this.default_color;
          }
        }
        e.Dye = r;
        class s {
          temperature;
          downfall;
          constructor(e, t) {
            ((this.temperature = e), (this.downfall = t));
          }
          getTint(e) {
            return [124 / 255, 189 / 255, 107 / 255];
          }
        }
        e.Grass = s;
        class o {
          default_color;
          constructor(e) {
            this.default_color = e;
          }
          getTint(e, t) {
            let r = e.getComponent("firework_explosion", t);
            if (!r?.isCompound()) return this.default_color;
            let s = r.get("colors");
            return s && s.isListOrArray()
              ? (() => {
                  if (1 === s.length) return n.Q1.intToRgb(s.get(0).getAsNumber());
                  let [e, t, r] = [0, 0, 0];
                  for (let i of s.getItems())
                    ((e += (0xff0000 & i.getAsNumber()) >> 16),
                      (t += (65280 & i.getAsNumber()) >> 8),
                      (r += 255 & i.getAsNumber()));
                  return ((e /= s.length), [e / 255, (t /= s.length) / 255, (r /= s.length) / 255]);
                })()
              : this.default_color;
          }
        }
        e.Firework = o;
        class u {
          default_color;
          constructor(e) {
            this.default_color = e;
          }
          getTint(e, t) {
            let r = e.getComponent("potion_contents", t);
            if (!r) return this.default_color;
            let s = i.C2.fromNbt(r);
            return i.C2.getColor(s);
          }
        }
        e.Potion = u;
        class l {
          default_color;
          constructor(e) {
            this.default_color = e;
          }
          getTint(e, t) {
            let r = e.getComponent("map_color", t);
            return r ? n.Q1.intToRgb(r.getAsNumber()) : this.default_color;
          }
        }
        e.MapColor = l;
        class h {
          index;
          default_color;
          constructor(e, t) {
            ((this.index = e), (this.default_color = t));
          }
          getTint(e, t) {
            let r = e.getComponent("custom_model_data", t);
            if (!r?.isCompound()) return this.default_color;
            let s = r.getList("colors").get(this.index);
            return s ? (n.Q1.fromNbt(s) ?? this.default_color) : this.default_color;
          }
        }
        e.CustomModelData = h;
        class c {
          default_color;
          constructor(e) {
            this.default_color = e;
          }
          getTint(e, t, r) {
            return r.context_entity_team_color ?? this.default_color;
          }
        }
        e.Team = c;
      })(s || (s = {}));
    },
    21337: (e, t, r) => {
      "use strict";
      r.d(t, { y: () => s });
      var s,
        i = r(85250),
        n = r(45723),
        a = r(23273),
        o = r(13402),
        u = r(39080),
        l = r(29849),
        h = r(73475),
        c = r(31206);
      function d(e, t, r, s, i) {
        let a = s.up
          ? 16
          : [14.2, 12.5, 10.5, 9, 7, 5.3, 3.7, 1.9, 16, 16, 16, 16, 16, 16, 16, 16][t];
        return new l.z(void 0, { still: `block/${e}_still`, flow: `block/${e}_flow` }, [
          {
            from: [0, 0, 0],
            to: [16, a, 16],
            faces: {
              up: { texture: "#still", tintindex: i, cullface: n.OP.UP },
              down: { texture: "#still", tintindex: i, cullface: n.OP.DOWN },
              north: { texture: "#flow", tintindex: i, cullface: n.OP.NORTH },
              east: { texture: "#flow", tintindex: i, cullface: n.OP.EAST },
              south: { texture: "#flow", tintindex: i, cullface: n.OP.SOUTH },
              west: { texture: "#flow", tintindex: i, cullface: n.OP.WEST },
            },
          },
        ]).getMesh(r, s, u.I[e]?.({}));
      }
      let f = {
        white: o.Q1.intToRgb(0xf9fffe),
        orange: o.Q1.intToRgb(0xf9801d),
        magenta: o.Q1.intToRgb(0xc74ebd),
        light_blue: o.Q1.intToRgb(3847130),
        yellow: o.Q1.intToRgb(0xfed83d),
        lime: o.Q1.intToRgb(8439583),
        pink: o.Q1.intToRgb(0xf38baa),
        gray: o.Q1.intToRgb(4673362),
        light_gray: o.Q1.intToRgb(0x9d9d97),
        cyan: o.Q1.intToRgb(1481884),
        purple: o.Q1.intToRgb(8991416),
        blue: o.Q1.intToRgb(3949738),
        brown: o.Q1.intToRgb(8606770),
        green: o.Q1.intToRgb(6192150),
        red: o.Q1.intToRgb(0xb02e26),
        black: o.Q1.intToRgb(1908001),
      };
      !(function (e) {
        function t(e) {
          return new l.z(
            void 0,
            {
              0: "entity/decorated_pot/decorated_pot_side",
              1: "entity/decorated_pot/decorated_pot_base",
            },
            [
              {
                from: [1, 0, 1],
                to: [15, 16, 15],
                faces: {
                  north: { uv: [1, 0, 15, 16], texture: "#0" },
                  east: { uv: [1, 0, 15, 16], texture: "#0" },
                  south: { uv: [1, 0, 15, 16], texture: "#0" },
                  west: { uv: [1, 0, 15, 16], texture: "#0" },
                  up: { uv: [0, 6.5, 7, 13.5], texture: "#1" },
                  down: { uv: [7, 6.5, 14, 13.5], texture: "#1" },
                },
              },
              {
                from: [5, 16, 5],
                to: [11, 17, 11],
                faces: {
                  north: { uv: [0, 5.5, 3, 6], texture: "#1" },
                  east: { uv: [3, 5.5, 6, 6], texture: "#1" },
                  south: { uv: [6, 5.5, 9, 6], texture: "#1" },
                  west: { uv: [9, 5.5, 12, 6], texture: "#1" },
                },
              },
              {
                from: [4, 17, 4],
                to: [12, 20, 12],
                faces: {
                  north: { uv: [0, 4, 4, 5.5], texture: "#1" },
                  east: { uv: [4, 4, 8, 5.5], texture: "#1" },
                  south: { uv: [8, 4, 12, 5.5], texture: "#1" },
                  west: { uv: [12, 4, 16, 5.5], texture: "#1" },
                  up: { uv: [4, 0, 8, 4], texture: "#1" },
                  down: { uv: [8, 0, 12, 4], texture: "#1" },
                },
              },
            ],
          ).getMesh(e, h.V.none());
        }
        function r(e) {
          return new l.z(void 0, { 0: "entity/conduit/base" }, [
            {
              from: [5, 5, 5],
              to: [11, 11, 11],
              faces: {
                north: { uv: [3, 6, 6, 12], texture: "#0" },
                east: { uv: [0, 6, 3, 12], texture: "#0" },
                south: { uv: [9, 6, 12, 12], texture: "#0" },
                west: { uv: [6, 6, 9, 12], texture: "#0" },
                up: { uv: [6, 6, 3, 0], texture: "#0" },
                down: { uv: [9, 0, 6, 6], texture: "#0" },
              },
            },
          ]).getMesh(e, h.V.none());
        }
        ((e.chestRenderer = function (e) {
          return (t) =>
            new l.z(void 0, { 0: e.withPrefix("entity/chest/").toString() }, [
              {
                from: [1, 0, 1],
                to: [15, 10, 15],
                faces: {
                  north: { uv: [10.5, 8.25, 14, 10.75], rotation: 180, texture: "#0" },
                  east: { uv: [7, 8.25, 10.5, 10.75], rotation: 180, texture: "#0" },
                  south: { uv: [3.5, 8.25, 7, 10.75], rotation: 180, texture: "#0" },
                  west: { uv: [0, 8.25, 3.5, 10.75], rotation: 180, texture: "#0" },
                  up: { uv: [7, 4.75, 10.5, 8.25], texture: "#0" },
                  down: { uv: [3.5, 4.75, 7, 8.25], texture: "#0" },
                },
              },
              {
                from: [1, 10, 1],
                to: [15, 14, 15],
                faces: {
                  north: { uv: [10.5, 3.75, 14, 4.75], rotation: 180, texture: "#0" },
                  east: { uv: [7, 3.75, 10.5, 4.75], rotation: 180, texture: "#0" },
                  south: { uv: [3.5, 3.75, 7, 4.75], rotation: 180, texture: "#0" },
                  west: { uv: [0, 3.75, 3.5, 4.75], rotation: 180, texture: "#0" },
                  up: { uv: [7, 0, 10.5, 3.5], texture: "#0" },
                  down: { uv: [3.5, 0, 7, 3.5], texture: "#0" },
                },
              },
              {
                from: [7, 7, 0],
                to: [9, 11, 2],
                faces: {
                  north: { uv: [0.25, 0.25, 0.75, 1.25], rotation: 180, texture: "#0" },
                  east: { uv: [0, 0.25, 0.25, 1.25], rotation: 180, texture: "#0" },
                  south: { uv: [1, 0.25, 1.5, 1.25], rotation: 180, texture: "#0" },
                  west: { uv: [0.75, 0.25, 1, 1.25], rotation: 180, texture: "#0" },
                  up: { uv: [0.25, 0, 0.75, 0.25], rotation: 180, texture: "#0" },
                  down: { uv: [0.75, 0, 1.25, 0.25], rotation: 180, texture: "#0" },
                },
              },
            ]).getMesh(t, h.V.none());
        }),
          (e.decoratedPotRenderer = t),
          (e.shieldRenderer = function (e) {
            return new l.z(void 0, { 0: "entity/shield_base_nopattern" }, [
              {
                from: [-6, -11, -2],
                to: [6, 11, -1],
                faces: {
                  north: { uv: [3.5, 0.25, 6.5, 5.75], texture: "#0" },
                  east: { uv: [3.25, 0.25, 3.5, 5.75], texture: "#0" },
                  south: { uv: [0.25, 0.25, 3.25, 5.75], texture: "#0" },
                  west: { uv: [0, 0.25, 0.25, 5.75], texture: "#0" },
                  up: { uv: [0.25, 0, 3.25, 0.25], texture: "#0" },
                  down: { uv: [3.25, 0, 6.25, 0.25], texture: "#0" },
                },
              },
            ]).getMesh(e, h.V.none());
          }),
          (e.headRenderer = function (e, t) {
            return (r) =>
              new l.z(void 0, { 0: e.withPrefix("entity/").toString() }, [
                {
                  from: [4, 0, 4],
                  to: [12, 8, 12],
                  faces: {
                    north: { uv: [6, 2 * t, 8, 4 * t], texture: "#0" },
                    east: { uv: [2, 2 * t, 0, 4 * t], texture: "#0" },
                    south: { uv: [2, 2 * t, 4, 4 * t], texture: "#0" },
                    west: { uv: [6, 2 * t, 4, 4 * t], texture: "#0" },
                    up: { uv: [2, 0 * t, 4, 2 * t], texture: "#0" },
                    down: { uv: [4, 0 * t, 6, 2 * t], texture: "#0" },
                  },
                },
              ]).getMesh(r, h.V.none());
          }),
          (e.dragonHeadRenderer = function (e = n.gw.create("enderdragon/dragon")) {
            return (t) => {
              let r = i.vt();
              return (
                i.Tl(r, r, [8, 8, 8]),
                i.hs(r, r, [0.75, 0.75, 0.75]),
                i.Z8(r, r, Math.PI),
                i.Tl(r, r, [-8, -11.2, -8]),
                new l.z(void 0, { 0: e.withPrefix("entity/").toString() }, [
                  {
                    from: [2, 4, -16],
                    to: [14, 9, 0],
                    faces: {
                      north: { uv: [12, 3.75, 12.75, 4.0625], texture: "#0" },
                      east: { uv: [11, 3.75, 12, 4.0625], texture: "#0" },
                      south: { uv: [13.75, 3.75, 14.5, 4.0625], texture: "#0" },
                      west: { uv: [12.75, 3.75, 13.75, 4.0625], texture: "#0" },
                      up: { uv: [12.75, 3.75, 12, 2.75], texture: "#0" },
                      down: { uv: [13.5, 2.75, 12.75, 3.75], texture: "#0" },
                    },
                  },
                  {
                    from: [0, 0, -2],
                    to: [16, 16, 14],
                    faces: {
                      north: { uv: [8, 2.875, 9, 3.875], texture: "#0" },
                      east: { uv: [7, 2.875, 8, 3.875], texture: "#0" },
                      south: { uv: [10, 2.875, 11, 3.875], texture: "#0" },
                      west: { uv: [9, 2.875, 10, 3.875], texture: "#0" },
                      up: { uv: [9, 2.875, 8, 1.875], texture: "#0" },
                      down: { uv: [10, 1.875, 9, 2.875], texture: "#0" },
                    },
                  },
                  {
                    from: [2, 0, -16],
                    to: [14, 4, 0],
                    rotation: { angle: -36 / Math.PI, axis: "x", origin: [8, 4, -2] },
                    faces: {
                      north: { uv: [12, 5.0625, 12.75, 5.3125], texture: "#0" },
                      east: { uv: [11, 5.0625, 12, 5.3125], texture: "#0" },
                      south: { uv: [13.75, 5.0625, 14.5, 5.3125], texture: "#0" },
                      west: { uv: [12.75, 5.0625, 13.75, 5.3125], texture: "#0" },
                      up: { uv: [12.75, 5.0625, 12, 4.0625], texture: "#0" },
                      down: { uv: [13.5, 4.0625, 12.75, 5.0625], texture: "#0" },
                    },
                  },
                  {
                    from: [3, 16, 4],
                    to: [5, 20, 10],
                    faces: {
                      north: { uv: [0.375, 0.375, 0.5, 0.625], texture: "#0" },
                      east: { uv: [0, 0.375, 0.375, 0.625], texture: "#0" },
                      south: { uv: [0.875, 0.375, 1, 0.625], texture: "#0" },
                      west: { uv: [0.5, 0.375, 0.875, 0.625], texture: "#0" },
                      up: { uv: [0.5, 0.375, 0.375, 0], texture: "#0" },
                      down: { uv: [0.625, 0, 0.5, 0.375], texture: "#0" },
                    },
                  },
                  {
                    from: [11, 16, 4],
                    to: [13, 20, 10],
                    faces: {
                      north: { uv: [0.375, 0.375, 0.5, 0.625], texture: "#0" },
                      east: { uv: [0, 0.375, 0.375, 0.625], texture: "#0" },
                      south: { uv: [0.875, 0.375, 1, 0.625], texture: "#0" },
                      west: { uv: [0.5, 0.375, 0.875, 0.625], texture: "#0" },
                      up: { uv: [0.5, 0.375, 0.375, 0], texture: "#0" },
                      down: { uv: [0.625, 0, 0.5, 0.375], texture: "#0" },
                    },
                  },
                  {
                    from: [3, 9, -14],
                    to: [5, 11, -10],
                    faces: {
                      north: { uv: [7.25, 0.25, 7.375, 0.375], texture: "#0" },
                      east: { uv: [7, 0.25, 7.25, 0.375], texture: "#0" },
                      south: { uv: [7.625, 0.25, 7.75, 0.375], texture: "#0" },
                      west: { uv: [7.375, 0.25, 7.625, 0.375], texture: "#0" },
                      up: { uv: [7.375, 0.25, 7.25, 0], texture: "#0" },
                      down: { uv: [7.5, 0, 7.375, 0.25], texture: "#0" },
                    },
                  },
                  {
                    from: [11, 9, -14],
                    to: [13, 11, -10],
                    faces: {
                      north: { uv: [7.25, 0.25, 7.375, 0.375], texture: "#0" },
                      east: { uv: [7, 0.25, 7.25, 0.375], texture: "#0" },
                      south: { uv: [7.625, 0.25, 7.75, 0.375], texture: "#0" },
                      west: { uv: [7.375, 0.25, 7.625, 0.375], texture: "#0" },
                      up: { uv: [7.375, 0.25, 7.25, 0], texture: "#0" },
                      down: { uv: [7.5, 0, 7.375, 0.25], texture: "#0" },
                    },
                  },
                ])
                  .getMesh(t, h.V.none())
                  .transform(r)
              );
            };
          }),
          (e.piglinHeadRenderer = function (e = n.gw.create("piglin/piglin")) {
            return (t) =>
              new l.z(void 0, { 0: e.withPrefix("entity/").toString() }, [
                {
                  from: [3, 0, 4],
                  to: [13, 8, 12],
                  faces: {
                    north: { uv: [6.5, 2, 9, 4], texture: "#0" },
                    east: { uv: [2, 2, 0, 4], texture: "#0" },
                    south: { uv: [2, 2, 4.5, 4], texture: "#0" },
                    west: { uv: [6.5, 2, 4.5, 4], texture: "#0" },
                    up: { uv: [2, 0, 4.5, 2], texture: "#0" },
                    down: { uv: [4.5, 0, 7, 2], texture: "#0" },
                  },
                },
                {
                  from: [6, 0, 12],
                  to: [10, 4, 13],
                  faces: {
                    north: { uv: [9.25, 0.5, 10.25, 1.5], texture: "#0" },
                    east: { uv: [7.75, 0.5, 8, 1.5], texture: "#0" },
                    south: { uv: [8, 0.5, 9, 1.5], texture: "#0" },
                    west: { uv: [9, 0.5, 9.25, 1.5], texture: "#0" },
                    up: { uv: [8, 0.25, 9, 0.5], texture: "#0" },
                    down: { uv: [9, 0.25, 10, 0.5], texture: "#0" },
                  },
                },
                {
                  from: [5, 0, 12],
                  to: [6, 2, 13],
                  faces: {
                    north: { uv: [1.25, 0.25, 1.5, 0.75], texture: "#0" },
                    east: { uv: [0.5, 0.25, 0.75, 0.75], texture: "#0" },
                    south: { uv: [0.75, 0.25, 1, 0.75], texture: "#0" },
                    west: { uv: [1, 0.25, 1.25, 0.75], texture: "#0" },
                    up: { uv: [0.75, 0, 1, 0.25], texture: "#0" },
                    down: { uv: [1, 0, 1.25, 0.25], texture: "#0" },
                  },
                },
                {
                  from: [10, 0, 12],
                  to: [11, 2, 13],
                  faces: {
                    north: { uv: [1.25, 1.25, 1.5, 1.75], texture: "#0" },
                    east: { uv: [0.5, 1.25, 0.75, 1.75], texture: "#0" },
                    south: { uv: [0.75, 1.25, 1, 1.75], texture: "#0" },
                    west: { uv: [1, 1.25, 1.25, 1.75], texture: "#0" },
                    up: { uv: [0.75, 1, 1, 1.25], texture: "#0" },
                    down: { uv: [1, 1, 1.25, 1.25], texture: "#0" },
                  },
                },
                {
                  from: [2.5, 1.5, 6],
                  to: [3.5, 6.5, 10],
                  rotation: { angle: -30, axis: "z", origin: [3, 7, 8] },
                  faces: {
                    north: { uv: [12, 2.5, 12.25, 3.75], texture: "#0" },
                    east: { uv: [9.75, 2.5, 10.75, 3.75], texture: "#0" },
                    south: { uv: [10.75, 2.5, 11, 3.75], texture: "#0" },
                    west: { uv: [11, 2.5, 12, 3.75], texture: "#0" },
                    up: { uv: [10.75, 1.5, 11, 2.5], texture: "#0" },
                    down: { uv: [11, 1.5, 11.25, 2.5], texture: "#0" },
                  },
                },
                {
                  from: [12.5, 1.5, 6],
                  to: [13.5, 6.5, 10],
                  rotation: { angle: 30, axis: "z", origin: [13, 7, 8] },
                  faces: {
                    north: { uv: [15.25, 2.5, 15, 3.75], texture: "#0" },
                    east: { uv: [15, 2.5, 14, 3.75], texture: "#0" },
                    south: { uv: [14, 2.5, 13.75, 3.75], texture: "#0" },
                    west: { uv: [13.75, 2.5, 12.75, 3.75], texture: "#0" },
                    up: { uv: [14, 1.5, 13.75, 2.5], texture: "#0" },
                    down: { uv: [14.25, 1.5, 14, 2.5], texture: "#0" },
                  },
                },
              ]).getMesh(t, h.V.none());
          }),
          (e.signRenderer = function (e) {
            return (t) =>
              new l.z(void 0, { 0: e.withPrefix("entity/signs/").toString() }, [
                {
                  from: [-4, 8, 7],
                  to: [20, 20, 9],
                  faces: {
                    north: { uv: [0.5, 1, 6.5, 7], texture: "#0" },
                    east: { uv: [0, 1, 0.5, 7], texture: "#0" },
                    south: { uv: [7, 1, 13, 7], texture: "#0" },
                    west: { uv: [6.5, 1, 7, 7], texture: "#0" },
                    up: { uv: [6.5, 1, 0.5, 0], texture: "#0" },
                    down: { uv: [12.5, 0, 6.5, 1], texture: "#0" },
                  },
                },
                {
                  from: [7, -6, 7],
                  to: [9, 8, 9],
                  faces: {
                    north: { uv: [0.5, 8, 1, 15], texture: "#0" },
                    east: { uv: [0, 8, 0.5, 15], texture: "#0" },
                    south: { uv: [1.5, 8, 2, 15], texture: "#0" },
                    west: { uv: [1, 8, 1.5, 15], texture: "#0" },
                    up: { uv: [1, 8, 0.5, 7], texture: "#0" },
                    down: { uv: [1.5, 7, 1, 8], texture: "#0" },
                  },
                },
              ]).getMesh(t, h.V.none());
          }),
          (e.wallSignRenderer = function (e) {
            return (t) =>
              new l.z(void 0, { 0: e.withPrefix("entity/signs/").toString() }, [
                {
                  from: [-4, 4, 17],
                  to: [20, 16, 19],
                  faces: {
                    north: { uv: [0.5, 1, 6.5, 7], texture: "#0" },
                    east: { uv: [0, 1, 0.5, 7], texture: "#0" },
                    south: { uv: [7, 1, 13, 7], texture: "#0" },
                    west: { uv: [6.5, 1, 7, 7], texture: "#0" },
                    up: { uv: [6.5, 1, 0.5, 0], texture: "#0" },
                    down: { uv: [12.5, 0, 6.5, 1], texture: "#0" },
                  },
                },
              ]).getMesh(t, h.V.none());
          }),
          (e.hangingSignRenderer = function (e) {
            return (t, r) =>
              t
                ? new l.z(void 0, { 0: e.withPrefix("entity/signs/hanging/").toString() }, [
                    {
                      from: [1, 0, 7],
                      to: [15, 10, 9],
                      faces: {
                        north: { uv: [0.5, 7, 4, 12], texture: "#0" },
                        east: { uv: [0, 7, 0.5, 12], texture: "#0" },
                        south: { uv: [4.5, 7, 8, 12], texture: "#0" },
                        west: { uv: [4, 7, 4.5, 12], texture: "#0" },
                        up: { uv: [4, 7, 0.5, 6], texture: "#0" },
                        down: { uv: [7.5, 6, 4, 7], texture: "#0" },
                      },
                    },
                    {
                      from: [2, 10, 8],
                      to: [14, 16, 8],
                      faces: {
                        north: { uv: [3.5, 3, 6.5, 6], texture: "#0" },
                        south: { uv: [3.5, 3, 6.5, 6], texture: "#0" },
                      },
                    },
                  ]).getMesh(r, h.V.none())
                : new l.z(void 0, { 0: e.withPrefix("entity/signs/hanging/").toString() }, [
                    {
                      from: [1, 0, 7],
                      to: [15, 10, 9],
                      faces: {
                        north: { uv: [0.5, 7, 4, 12], texture: "#0" },
                        east: { uv: [0, 7, 0.5, 12], texture: "#0" },
                        south: { uv: [4.5, 7, 8, 12], texture: "#0" },
                        west: { uv: [4, 7, 4.5, 12], texture: "#0" },
                        up: { uv: [4, 7, 0.5, 6], texture: "#0" },
                        down: { uv: [7.5, 6, 4, 7], texture: "#0" },
                      },
                    },
                    {
                      from: [1.5, 10, 8],
                      to: [4.5, 16, 8],
                      rotation: { angle: 45, axis: "y", origin: [3, 12, 8] },
                      faces: {
                        north: { uv: [0, 3, 0.75, 6], texture: "#0" },
                        south: { uv: [0, 3, 0.75, 6], texture: "#0" },
                      },
                    },
                    {
                      from: [3, 10, 6.5],
                      to: [3, 16, 9.5],
                      rotation: { angle: 45, axis: "y", origin: [3, 12, 8] },
                      faces: {
                        east: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                        west: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                      },
                    },
                    {
                      from: [11.5, 10, 8],
                      to: [14.5, 16, 8],
                      rotation: { angle: 45, axis: "y", origin: [13, 12, 8] },
                      faces: {
                        north: { uv: [0, 3, 0.75, 6], texture: "#0" },
                        south: { uv: [0, 3, 0.75, 6], texture: "#0" },
                      },
                    },
                    {
                      from: [13, 10, 6.5],
                      to: [13, 16, 9.5],
                      rotation: { angle: 45, axis: "y", origin: [13, 12, 8] },
                      faces: {
                        east: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                        west: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                      },
                    },
                  ]).getMesh(r, h.V.none());
          }),
          (e.wallHangingSignRenderer = function (e) {
            return (t) =>
              new l.z(void 0, { 0: `entity/signs/hanging/${e}` }, [
                {
                  from: [1, 0, 7],
                  to: [15, 10, 9],
                  faces: {
                    north: { uv: [0.5, 7, 4, 12], texture: "#0" },
                    east: { uv: [0, 7, 0.5, 12], texture: "#0" },
                    south: { uv: [4.5, 7, 8, 12], texture: "#0" },
                    west: { uv: [4, 7, 4.5, 12], texture: "#0" },
                    up: { uv: [4, 7, 0.5, 6], texture: "#0" },
                    down: { uv: [7.5, 6, 4, 7], texture: "#0" },
                  },
                },
                {
                  from: [0, 14, 6],
                  to: [16, 16, 10],
                  faces: {
                    north: { uv: [1, 2, 5, 3], texture: "#0" },
                    east: { uv: [0, 2, 1, 3], texture: "#0" },
                    south: { uv: [6, 2, 10, 3], texture: "#0" },
                    west: { uv: [5, 2, 6, 3], texture: "#0" },
                    up: { uv: [5, 2, 1, 0], texture: "#0" },
                    down: { uv: [9, 0, 5, 2], texture: "#0" },
                  },
                },
                {
                  from: [1.5, 10, 8],
                  to: [4.5, 16, 8],
                  rotation: { angle: 45, axis: "y", origin: [3, 12, 8] },
                  faces: {
                    north: { uv: [0, 3, 0.75, 6], texture: "#0" },
                    south: { uv: [0, 3, 0.75, 6], texture: "#0" },
                  },
                },
                {
                  from: [3, 10, 6.5],
                  to: [3, 16, 9.5],
                  rotation: { angle: 45, axis: "y", origin: [3, 12, 8] },
                  faces: {
                    east: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                    west: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                  },
                },
                {
                  from: [11.5, 10, 8],
                  to: [14.5, 16, 8],
                  rotation: { angle: 45, axis: "y", origin: [13, 12, 8] },
                  faces: {
                    north: { uv: [0, 3, 0.75, 6], texture: "#0" },
                    south: { uv: [0, 3, 0.75, 6], texture: "#0" },
                  },
                },
                {
                  from: [13, 10, 6.5],
                  to: [13, 16, 9.5],
                  rotation: { angle: 45, axis: "y", origin: [13, 12, 8] },
                  faces: {
                    east: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                    west: { uv: [1.5, 3, 2.25, 6], texture: "#0" },
                  },
                },
              ]).getMesh(t, h.V.none());
          }),
          (e.conduitRenderer = r),
          (e.shulkerBoxRenderer = function (e) {
            return (t) =>
              new l.z(void 0, { 0: e.withPrefix("entity/shulker/").toString() }, [
                {
                  from: [0, 0, 0],
                  to: [16, 8, 16],
                  faces: {
                    north: { uv: [4, 11, 8, 13], texture: "#0" },
                    east: { uv: [0, 11, 4, 13], texture: "#0" },
                    south: { uv: [12, 11, 16, 13], texture: "#0" },
                    west: { uv: [8, 11, 12, 13], texture: "#0" },
                    up: { uv: [8, 11, 4, 7], texture: "#0" },
                    down: { uv: [12, 7, 8, 11], texture: "#0" },
                  },
                },
                {
                  from: [0, 4, 0],
                  to: [16, 16, 16],
                  faces: {
                    north: { uv: [4, 4, 8, 7], texture: "#0" },
                    east: { uv: [0, 4, 4, 7], texture: "#0" },
                    south: { uv: [12, 4, 16, 7], texture: "#0" },
                    west: { uv: [8, 4, 12, 7], texture: "#0" },
                    up: { uv: [8, 4, 4, 0], texture: "#0" },
                    down: { uv: [12, 0, 8, 4], texture: "#0" },
                  },
                },
              ]).getMesh(t, h.V.none());
          }));
        let s = (e) => ({
          north: { uv: [0.25, 0.25, 5.25, 10.25], texture: `#${e}`, tintindex: e },
          east: { uv: [0, 0.25, 0.25, 10.25], texture: `#${e}`, tintindex: e },
          south: { uv: [5.5, 0.25, 10.5, 10.25], texture: `#${e}`, tintindex: e },
          west: { uv: [5.25, 0.25, 5.5, 10.25], texture: `#${e}`, tintindex: e },
          up: { uv: [5.25, 0.25, 0.25, 0], texture: `#${e}`, tintindex: e },
          down: { uv: [10.25, 0, 5.25, 0.25], texture: `#${e}`, tintindex: e },
        });
        function o(e, t) {
          return (r, s) => {
            let i = { 0: "entity/banner_base" },
              a = [...t.base],
              o = [e];
            return (
              s?.forEach((e, r) => {
                let s = n.gw.parse(e.getString("pattern")).path,
                  u = e.getString("color");
                ((i[++r] = `entity/banner/${s}`), a.push(t.pattern(r)), o.push(u));
              }),
              new l.z(void 0, i, a).getMesh(r, h.V.none(), (e) => f[o[e]])
            );
          };
        }
        function u(e) {
          return new l.z(void 0, { 0: "entity/bell/bell_body" }, [
            {
              from: [5, 3, 5],
              to: [11, 10, 11],
              faces: {
                north: { uv: [3, 3, 6, 6.5], texture: "#0" },
                east: { uv: [0, 3, 3, 6.5], texture: "#0" },
                south: { uv: [9, 3, 12, 6.5], texture: "#0" },
                west: { uv: [6, 3, 9, 6.5], texture: "#0" },
                up: { uv: [6, 3, 3, 0], texture: "#0" },
                down: { uv: [9, 0, 6, 3], texture: "#0" },
              },
            },
            {
              from: [4, 10, 4],
              to: [12, 12, 12],
              faces: {
                north: { uv: [4, 10.5, 8, 11.5], texture: "#0" },
                east: { uv: [0, 10.5, 4, 11.5], texture: "#0" },
                south: { uv: [12, 10.5, 16, 11.5], texture: "#0" },
                west: { uv: [8, 10.5, 12, 11.5], texture: "#0" },
                up: { uv: [8, 10.5, 4, 6.5], texture: "#0" },
                down: { uv: [12, 6.5, 8, 10.5], texture: "#0" },
              },
            },
          ]).getMesh(e, h.V.none());
        }
        function m(e, t, r = "") {
          return e.getProperty(t) ?? r;
        }
        function g(e, t, r = "0") {
          return parseInt(e.getProperty(t) ?? r);
        }
        ((e.bannerRenderer = (e) =>
          o(e, {
            base: [
              { from: [-2, -8, 6], to: [18, 32, 7], faces: s(0) },
              {
                from: [7, -12, 7],
                to: [9, 30, 9],
                faces: {
                  north: { uv: [11.5, 0.5, 12, 11], texture: "#0" },
                  east: { uv: [11, 0.5, 11.5, 11], texture: "#0" },
                  south: { uv: [12.5, 0.5, 13, 11], texture: "#0" },
                  west: { uv: [12, 0.5, 12.5, 11], texture: "#0" },
                  up: { uv: [12, 0.5, 11.5, 0], texture: "#0" },
                  down: { uv: [12.5, 0, 12, 0.5], texture: "#0" },
                },
              },
              {
                from: [-2, 30, 7],
                to: [18, 32, 9],
                faces: {
                  north: { uv: [0.5, 11, 5.5, 11.5], texture: "#0" },
                  east: { uv: [0, 11, 0.5, 11.5], texture: "#0" },
                  south: { uv: [6, 11, 11, 11.5], texture: "#0" },
                  west: { uv: [5.5, 11, 6, 11.5], texture: "#0" },
                  up: { uv: [5.5, 11, 0.5, 10.5], texture: "#0" },
                  down: { uv: [10.5, 10.5, 5.5, 11], texture: "#0" },
                },
              },
            ],
            pattern: (e) => ({ from: [-2, -8, 6], to: [18, 32, 7], faces: s(e) }),
          })),
          (e.wallBannerRenderer = (e) =>
            o(e, {
              base: [
                { from: [-2, -8, -1.5], to: [18, 32, -0.5], faces: s(0) },
                {
                  from: [-2, 30, -3.5],
                  to: [18, 32, -1.5],
                  faces: {
                    north: { uv: [0.5, 11, 5.5, 11.5], texture: "#0" },
                    east: { uv: [0, 11, 0.5, 11.5], texture: "#0" },
                    south: { uv: [6, 11, 11, 11.5], texture: "#0" },
                    west: { uv: [5.5, 11, 6, 11.5], texture: "#0" },
                    up: { uv: [5.5, 11, 0.5, 10.5], texture: "#0" },
                    down: { uv: [10.5, 10.5, 5.5, 11], texture: "#0" },
                  },
                },
              ],
              pattern: (e) => ({ from: [-2, -8, -1.5], to: [18, 32, -0.5], faces: s(e) }),
            })),
          (e.bellRenderer = u),
          (e.bedRenderer = function (e) {
            return (t, r) =>
              "foot" === t
                ? new l.z(void 0, { 0: e.withPrefix("entity/bed/").toString() }, [
                    {
                      from: [0, 3, 0],
                      to: [16, 9, 16],
                      faces: {
                        north: { uv: [5.5, 5.5, 9.5, 7], rotation: 180, texture: "#0" },
                        east: { uv: [0, 7, 1.5, 11], rotation: 270, texture: "#0" },
                        west: { uv: [5.5, 7, 7, 11], rotation: 90, texture: "#0" },
                        up: { uv: [5.5, 11, 1.5, 7], texture: "#0" },
                        down: { uv: [11, 7, 7, 11], texture: "#0" },
                      },
                    },
                    {
                      from: [0, 0, 0],
                      to: [3, 3, 3],
                      faces: {
                        north: { uv: [12.5, 5.25, 13.25, 6], texture: "#0" },
                        east: { uv: [14.75, 5.25, 15.5, 6], texture: "#0" },
                        south: { uv: [14, 5.25, 14.75, 6], texture: "#0" },
                        west: { uv: [13.25, 5.25, 14, 6], texture: "#0" },
                        up: { uv: [13.25, 4.5, 14, 5.25], texture: "#0" },
                        down: { uv: [14, 4.5, 14.75, 5.25], texture: "#0" },
                      },
                    },
                    {
                      from: [13, 0, 0],
                      to: [16, 3, 3],
                      faces: {
                        north: { uv: [13.25, 3.75, 14, 4.5], texture: "#0" },
                        east: { uv: [12.5, 3.75, 13.25, 4.5], texture: "#0" },
                        south: { uv: [14.75, 3.75, 15.5, 4.5], texture: "#0" },
                        west: { uv: [14, 3.75, 14.75, 4.5], texture: "#0" },
                        up: { uv: [13.25, 3, 14, 3.75], texture: "#0" },
                        down: { uv: [14, 3, 14.75, 3.75], texture: "#0" },
                      },
                    },
                  ]).getMesh(r, h.V.none())
                : new l.z(void 0, { 0: e.withPrefix("entity/bed/").toString() }, [
                    {
                      from: [0, 3, 0],
                      to: [16, 9, 16],
                      faces: {
                        east: { uv: [0, 1.5, 1.5, 5.5], rotation: 270, texture: "#0" },
                        south: { uv: [1.5, 0, 5.5, 1.5], rotation: 180, texture: "#0" },
                        west: { uv: [5.5, 1.5, 7, 5.5], rotation: 90, texture: "#0" },
                        up: { uv: [5.5, 5.5, 1.5, 1.5], texture: "#0" },
                        down: { uv: [11, 1.5, 7, 5.5], texture: "#0" },
                      },
                    },
                    {
                      from: [0, 0, 13],
                      to: [3, 3, 16],
                      faces: {
                        north: { uv: [14.75, 0.75, 15.5, 1.5], texture: "#0" },
                        east: { uv: [14, 0.75, 14.75, 1.5], texture: "#0" },
                        south: { uv: [13.25, 0.75, 14, 1.5], texture: "#0" },
                        west: { uv: [12.5, 0.75, 13.25, 1.5], texture: "#0" },
                        up: { uv: [13.25, 0, 14, 0.75], texture: "#0" },
                        down: { uv: [14, 0, 14.75, 0.75], texture: "#0" },
                      },
                    },
                    {
                      from: [13, 0, 13],
                      to: [16, 3, 16],
                      faces: {
                        north: { uv: [14, 2.25, 14.75, 3], texture: "#0" },
                        east: { uv: [13.25, 2.25, 14, 3], texture: "#0" },
                        south: { uv: [12.5, 2.25, 13.25, 3], texture: "#0" },
                        west: { uv: [14.75, 2.25, 15.5, 3], texture: "#0" },
                        up: { uv: [13.25, 1.5, 14, 2.25], texture: "#0" },
                        down: { uv: [14, 1.5, 14.75, 2.25], texture: "#0" },
                      },
                    },
                  ]).getMesh(r, h.V.none());
          }));
        let p = new Map(
            Object.entries({
              "minecraft:chest": e.chestRenderer(n.gw.create("normal")),
              "minecraft:ender_chest": e.chestRenderer(n.gw.create("ender")),
              "minecraft:trapped_chest": e.chestRenderer(n.gw.create("trapped")),
              "minecraft:copper_chest": e.chestRenderer(n.gw.create("copper")),
              "minecraft:exposed_copper_chest": e.chestRenderer(n.gw.create("copper_exposed")),
              "minecraft:weathered_copper_chest": e.chestRenderer(n.gw.create("copper_weathered")),
              "minecraft:oxidized_copper_chest": e.chestRenderer(n.gw.create("copper_oxidized")),
              "minecraft:waxed_copper_chest": e.chestRenderer(n.gw.create("copper")),
              "minecraft:waxed_exposed_copper_chest": e.chestRenderer(
                n.gw.create("copper_exposed"),
              ),
              "minecraft:waxed_weathered_copper_chest": e.chestRenderer(
                n.gw.create("copper_weathered"),
              ),
              "minecraft:waxed_oxidized_copper_chest": e.chestRenderer(
                n.gw.create("copper_oxidized"),
              ),
            }),
          ),
          w = new Map(
            Object.entries({
              "minecraft:skeleton_skull": e.headRenderer(n.gw.create("skeleton/skeleton"), 2),
              "minecraft:wither_skeleton_skull": e.headRenderer(
                n.gw.create("skeleton/wither_skeleton"),
                2,
              ),
              "minecraft:zombie_head": e.headRenderer(n.gw.create("zombie/zombie"), 1),
              "minecraft:creeper_head": e.headRenderer(n.gw.create("creeper/creeper"), 2),
              "minecraft:dragon_head": e.dragonHeadRenderer(),
              "minecraft:piglin_head": e.piglinHeadRenderer(),
              "minecraft:player_head": e.headRenderer(n.gw.create("player/wide/steve"), 1),
            }),
          ),
          x = [
            "oak",
            "spruce",
            "birch",
            "jungle",
            "acacia",
            "dark_oak",
            "mangrove",
            "cherry",
            "bamboo",
            "crimson",
            "warped",
          ],
          v = new Map(x.map((t) => [`minecraft:${t}_sign`, e.signRenderer(n.gw.create(t))])),
          b = new Map(
            x.map((t) => [`minecraft:${t}_wall_sign`, e.wallSignRenderer(n.gw.create(t))]),
          ),
          y = new Map(
            x.map((t) => [`minecraft:${t}_hanging_sign`, e.hangingSignRenderer(n.gw.create(t))]),
          ),
          M = new Map(
            x.map((t) => [`minecraft:${t}_wall_hanging_sign`, e.wallHangingSignRenderer(t)]),
          ),
          S = new Map(
            Object.keys(f).map((t) => [
              `minecraft:${t}_shulker_box`,
              e.shulkerBoxRenderer(n.gw.create(`shulker_${t}`)),
            ]),
          ),
          _ = new Map(
            Object.keys(f).map((t) => [`minecraft:${t}_bed`, e.bedRenderer(n.gw.create(t))]),
          ),
          L = new Map(Object.keys(f).map((t) => [`minecraft:${t}_banner`, e.bannerRenderer(t)])),
          I = new Map(
            Object.keys(f).map((t) => [`minecraft:${t}_wall_banner`, e.wallBannerRenderer(t)]),
          );
        e.getBlockMesh = function (e, s, n, o) {
          let l = new c.e();
          (e.is("water") && l.merge(d("water", g(e, "level"), n, o, 0)),
            e.is("lava") && l.merge(d("lava", g(e, "level"), n, o)));
          let h = p.get(e.getName().toString());
          if (void 0 !== h) {
            let t = m(e, "facing", "south"),
              r = i.vt();
            (i.Tl(r, r, [8, 8, 8]),
              i.Z8(
                r,
                r,
                "west" === t
                  ? Math.PI / 2
                  : "south" === t
                    ? Math.PI
                    : "east" === t
                      ? (3 * Math.PI) / 2
                      : 0,
              ),
              i.Tl(r, r, [-8, -8, -8]),
              l.merge(h(n).transform(r)));
          }
          e.is("decorated_pot") && l.merge(t(n));
          let f = w.get(e.getName().toString());
          if (void 0 !== f) {
            let t = (g(e, "rotation") / 16) * Math.PI * 2,
              r = i.vt();
            (i.Tl(r, r, [8, 8, 8]),
              i.Z8(r, r, t),
              i.Tl(r, r, [-8, -8, -8]),
              l.merge(f(n).transform(r)));
          }
          let x = v.get(e.getName().toString());
          if (void 0 !== x) {
            let t = (g(e, "rotation") / 16) * Math.PI * 2,
              r = i.vt();
            (i.Tl(r, r, [8, 8, 8]),
              i.Z8(r, r, t),
              i.hs(r, r, [2 / 3, 2 / 3, 2 / 3]),
              i.Tl(r, r, [-8, -8, -8]),
              l.merge(x(n).transform(r)));
          }
          let E = b.get(e.getName().toString());
          if (void 0 !== E) {
            let t = m(e, "facing", "south"),
              r = i.vt();
            (i.Tl(r, r, [8, 8, 8]),
              i.Z8(
                r,
                r,
                "west" === t
                  ? Math.PI / 2
                  : "south" === t
                    ? Math.PI
                    : "east" === t
                      ? (3 * Math.PI) / 2
                      : 0,
              ),
              i.hs(r, r, [2 / 3, 2 / 3, 2 / 3]),
              i.Tl(r, r, [-8, -8, -8]),
              l.merge(E(n).transform(r)));
          }
          let k = y.get(e.getName().toString());
          if (void 0 !== k) {
            let t = "true" === m(e, "attached", "false"),
              r = (g(e, "rotation") / 16) * Math.PI * 2,
              s = i.vt();
            (i.Tl(s, s, [8, 8, 8]),
              i.Z8(s, s, r),
              i.hs(s, s, [2 / 3, 2 / 3, 2 / 3]),
              i.Tl(s, s, [-8, -8, -8]),
              l.merge(k(t, n).transform(s)));
          }
          let N = M.get(e.getName().toString());
          if (void 0 !== N) {
            let t = m(e, "facing", "south"),
              r = i.vt();
            (i.Tl(r, r, [8, 8, 8]),
              i.Z8(
                r,
                r,
                "west" === t
                  ? Math.PI / 2
                  : "south" === t
                    ? Math.PI
                    : "east" === t
                      ? (3 * Math.PI) / 2
                      : 0,
              ),
              i.Tl(r, r, [-8, -8, -8]),
              l.merge(N(n).transform(r)));
          }
          e.is("conduit") && l.merge(r(n));
          let A = S.get(e.getName().toString());
          if (void 0 !== A) {
            let t = m(e, "facing", "up"),
              r = i.vt();
            (i.Tl(r, r, [8, 8, 8]),
              "down" === t
                ? i.eL(r, r, Math.PI)
                : "up" !== t &&
                  (i.Z8(
                    r,
                    r,
                    "east" === t
                      ? Math.PI / 2
                      : "north" === t
                        ? Math.PI
                        : "west" === t
                          ? (3 * Math.PI) / 2
                          : 0,
                  ),
                  i.eL(r, r, Math.PI / 2)),
              i.Tl(r, r, [-8, -8, -8]),
              l.merge(A(n).transform(r)));
          }
          if (e.is("bell")) {
            let e = i.vt();
            (i.Tl(e, e, [8, 8, 8]),
              i.hs(e, e, [1, -1, -1]),
              i.Tl(e, e, [-8, -8, -8]),
              l.merge(u(n).transform(e)));
          }
          let R = _.get(e.getName().toString());
          if (void 0 !== R) {
            let t = m(e, "part", "head"),
              r = m(e, "facing", "south"),
              s = i.vt();
            (i.Tl(s, s, [8, 8, 8]),
              i.Z8(
                s,
                s,
                "east" === r
                  ? Math.PI / 2
                  : "north" === r
                    ? Math.PI
                    : "west" === r
                      ? (3 * Math.PI) / 2
                      : 0,
              ),
              i.Tl(s, s, [-8, -8, -8]),
              l.merge(R(t, n).transform(s)));
          }
          let T = L.get(e.getName().toString());
          if (void 0 !== T) {
            let t = (g(e, "rotation") / 16) * Math.PI * 2,
              r = i.vt();
            (i.Tl(r, r, [8, 24, 8]),
              i.Z8(r, r, t),
              i.hs(r, r, [2 / 3, 2 / 3, 2 / 3]),
              i.Tl(r, r, [-8, -24, -8]),
              l.merge(T(n, s?.getList("patterns", a.t$.Compound)).transform(r)));
          }
          let B = I.get(e.getName().toString());
          if (void 0 !== B) {
            let t = m(e, "facing", "south"),
              r = i.vt();
            (i.Tl(r, r, [8, 8, 8]),
              i.Z8(
                r,
                r,
                "east" === t
                  ? Math.PI / 2
                  : "north" === t
                    ? Math.PI
                    : "west" === t
                      ? (3 * Math.PI) / 2
                      : 0,
              ),
              i.hs(r, r, [2 / 3, 2 / 3, 2 / 3]),
              i.Tl(r, r, [-8, -23.2, -8]),
              l.merge(B(n, s?.getList("patterns", a.t$.Compound)).transform(r)));
          }
          !e.is("water") && !e.is("lava") && e.isWaterlogged() && l.merge(d("water", 0, n, o, 0));
          let C = i.vt();
          return (i.hs(C, C, [0.0625, 0.0625, 0.0625]), l.transform(C));
        };
      })(s || (s = {}));
    },
    22749: (e, t, r) => {
      "use strict";
      var s;
      (r.d(t, { t: () => s }),
        (function (e) {
          ((e[(e.End = 0)] = "End"),
            (e[(e.Byte = 1)] = "Byte"),
            (e[(e.Short = 2)] = "Short"),
            (e[(e.Int = 3)] = "Int"),
            (e[(e.Long = 4)] = "Long"),
            (e[(e.Float = 5)] = "Float"),
            (e[(e.Double = 6)] = "Double"),
            (e[(e.ByteArray = 7)] = "ByteArray"),
            (e[(e.String = 8)] = "String"),
            (e[(e.List = 9)] = "List"),
            (e[(e.Compound = 10)] = "Compound"),
            (e[(e.IntArray = 11)] = "IntArray"),
            (e[(e.LongArray = 12)] = "LongArray"));
        })(s || (s = {})));
    },
    26890: (e, t, r) => {
      "use strict";
      r.d(t, { M: () => s });
      class s {
        x;
        y;
        z;
        constructor(e, t, r) {
          ((this.x = e), (this.y = t), (this.z = r));
        }
        length() {
          return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        lengthSquared() {
          return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        distance(e) {
          return this.sub(e).length();
        }
        distanceSquared(e) {
          return this.sub(e).lengthSquared();
        }
        abs() {
          return new s(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        }
        add(e) {
          return new s(this.x + e.x, this.y + e.y, this.z + e.z);
        }
        sub(e) {
          return new s(this.x - e.x, this.y - e.y, this.z - e.z);
        }
        mul(e) {
          return new s(this.x * e.x, this.y * e.y, this.z * e.z);
        }
        div(e) {
          return new s(this.x / e.x, this.y / e.y, this.z / e.z);
        }
        scale(e) {
          return new s(this.x * e, this.y * e, this.z * e);
        }
        dot(e) {
          return this.x * e.x + this.y * e.y + this.z * e.z;
        }
        cross(e) {
          let t = this.y * e.z - this.z * e.y;
          return new s(t, this.z * e.x - this.x * e.z, this.x * e.y - this.y * e.x);
        }
        normalize() {
          if (0 == this.x && 0 == this.y && 0 == this.z) return this;
          let e = 1 / this.length();
          return new s(this.x * e, this.y * e, this.z * e);
        }
        components() {
          return [this.x, this.y, this.z];
        }
        toString() {
          return `[${this.x} ${this.y} ${this.z}]`;
        }
      }
    },
    29169: (e, t, r) => {
      "use strict";
      var s,
        i,
        n = r(45723),
        a = r(19023),
        o = r(13402),
        u = r(73475),
        l = r(47795),
        h = r(19881),
        c = r(31206),
        d = r(85250),
        f = r(82084);
      !(function (e) {
        e.fromJson = function (e) {
          let d = f.LM.readObject(e) ?? {},
            g = f.LM.readString(d.type)?.replace(/^minecraft:/, "");
          switch (g) {
            case "bed":
              return new t(f.gw.parse(f.LM.readString(d.texture) ?? ""));
            case "banner":
              return new r(f.LM.readString(d.color) ?? "");
            case "conduit":
              return new s();
            case "chest":
              return new i(
                f.gw.parse(f.LM.readString(d.texture) ?? ""),
                f.LM.readNumber(d.openness) ?? 0,
              );
            case "head":
              return new n(
                f.LM.readString(d.kind) ?? "",
                "string" == typeof d.texture ? f.gw.parse(d.texture) : void 0,
                f.LM.readNumber(d.animation) ?? 0,
              );
            case "player_head":
              return new n("player", void 0, 0);
            case "shulker_box":
              return new a(
                f.gw.parse(f.LM.readString(d.texture) ?? ""),
                f.LM.readNumber(d.openness) ?? 0,
                f.LM.readString(d.orientation) ?? "up",
              );
            case "shield":
              return new o();
            case "trident":
              return new u();
            case "decorated_pot":
              return new l();
            case "standing_sign":
              return new h(
                f.LM.readString(d.wood_type) ?? "",
                "string" == typeof d.texture ? f.gw.parse(d.texture) : void 0,
              );
            case "hanging_sign":
              return new m(
                f.LM.readString(d.wood_type) ?? "",
                "string" == typeof d.texture ? f.gw.parse(d.texture) : void 0,
              );
            default:
              return (
                console.warn(`[deepslate]: Unknown special model ${g}`),
                { getMesh: () => new c.e() }
              );
          }
        };
        class t {
          renderer;
          constructor(e) {
            this.renderer = f.y6.bedRenderer(e);
          }
          getMesh(e, t) {
            let r = this.renderer("head", t),
              s = this.renderer("foot", t),
              i = d.vt();
            return (d.Tl(i, i, [0, 0, -16]), r.merge(s.transform(i)));
          }
        }
        class r {
          renderer;
          constructor(e) {
            this.renderer = f.y6.bannerRenderer(e);
          }
          getMesh(e, t) {
            let r = e.getComponent("banner_patterns", void 0),
              s = d.vt();
            return (
              d.Tl(s, s, [8, 24, 8]),
              d.Z8(s, s, Math.PI),
              d.hs(s, s, [2 / 3, 2 / 3, 2 / 3]),
              d.Tl(s, s, [-8, -24, -8]),
              this.renderer(t, r instanceof f.Jp ? r : void 0).transform(s)
            );
          }
        }
        class s {
          getMesh(e, t) {
            return f.y6.conduitRenderer(t);
          }
        }
        class i {
          renderer;
          constructor(e, t) {
            this.renderer = f.y6.chestRenderer(e);
          }
          getMesh(e, t) {
            let r = d.vt();
            return (
              d.Tl(r, r, [8, 8, 8]),
              d.Z8(r, r, Math.PI),
              d.Tl(r, r, [-8, -8, -8]),
              this.renderer(t).transform(r)
            );
          }
        }
        class n {
          renderer;
          constructor(e, t, r) {
            this.renderer = (
              {
                skeleton: () => f.y6.headRenderer(t ?? f.gw.create("skeleton/skeleton"), 2),
                wither_skeleton: () =>
                  f.y6.headRenderer(t ?? f.gw.create("skeleton/wither_skeleton"), 2),
                zombie: () => f.y6.headRenderer(t ?? f.gw.create("zombie/zombie"), 1),
                creeper: () => f.y6.headRenderer(t ?? f.gw.create("creeper/creeper"), 2),
                dragon: () => f.y6.dragonHeadRenderer(t),
                piglin: () => f.y6.piglinHeadRenderer(t),
                player: () => f.y6.headRenderer(t ?? f.gw.create("player/wide/steve"), 1),
              }[e] ?? (() => () => new c.e())
            )();
          }
          getMesh(e, t) {
            return this.renderer(t);
          }
        }
        class a {
          renderer;
          constructor(e, t, r) {
            this.renderer = f.y6.shulkerBoxRenderer(e);
          }
          getMesh(e, t) {
            return this.renderer(t);
          }
        }
        class o {
          getMesh(e, t) {
            let r = f.y6.shieldRenderer(t),
              s = d.vt();
            return (
              d.Tl(s, s, [-3, 1, 0]),
              d.eL(s, s, (-10 * Math.PI) / 180),
              d.Z8(s, s, (-10 * Math.PI) / 180),
              d.Qr(s, s, (-5 * Math.PI) / 180),
              r.transform(s)
            );
          }
        }
        class u {
          getMesh(e, t) {
            return new c.e();
          }
        }
        class l {
          getMesh(e, t) {
            return f.y6.decoratedPotRenderer(t);
          }
        }
        class h {
          renderer;
          constructor(e, t) {
            this.renderer = f.y6.signRenderer(t ?? f.gw.create(e));
          }
          getMesh(e, t) {
            return this.renderer(t);
          }
        }
        class m {
          renderer;
          constructor(e, t) {
            this.renderer = f.y6.hangingSignRenderer(t ?? f.gw.create(e));
          }
          getMesh(e, t) {
            return this.renderer(!1, t);
          }
        }
      })(s || (s = {}));
      let m = new c.e();
      !(function (e) {
        e.fromJson = function (a) {
          let u = o.LM.readObject(a) ?? {},
            l = o.LM.readString(u.type)?.replace(/^minecraft:/, "");
          switch (l) {
            case "empty":
              return new t();
            case "model":
              return new r(
                n.gw.parse(o.LM.readString(u.model) ?? ""),
                o.LM.readArray(u.tints, h.P.fromJson) ?? [],
              );
            case "composite":
              return new i(o.LM.readArray(u.models, e.fromJson) ?? []);
            case "condition":
              return new d(d.propertyFromJson(u), e.fromJson(u.on_true), e.fromJson(u.on_false));
            case "select":
              return new f(
                f.propertyFromJson(u),
                new Map(
                  o.LM.readArray(u.cases, (e) => o.LM.readObject(e) ?? {})?.flatMap((t) => {
                    let r = e.fromJson(t.model);
                    return Array.isArray(t.when)
                      ? t.when.map((e) => [o.LM.readString(e) ?? "", r])
                      : [[o.LM.readString(t.when) ?? "", r]];
                  }),
                ),
                u.fallback ? e.fromJson(u.fallback) : void 0,
              );
            case "range_dispatch":
              return new g(
                g.propertyFromJson(u),
                o.LM.readNumber(u.scale) ?? 1,
                o.LM.readArray(u.entries, (t) => {
                  let r = o.LM.readObject(t) ?? {};
                  return {
                    threshold: o.LM.readNumber(r.threshold) ?? 0,
                    model: e.fromJson(r.model),
                  };
                }) ?? [],
                u.fallback ? e.fromJson(u.fallback) : void 0,
              );
            case "special":
              return new p(s.fromJson(u.model), n.gw.parse(o.LM.readString(u.base) ?? ""));
            case "bundle/selected_item":
              return new w();
            default:
              return (
                console.warn(`[deepslate]: Unknown item model type '${l}'`),
                { getMesh: () => new c.e() }
              );
          }
        };
        class t {
          getMesh(e, t, r) {
            return new c.e();
          }
        }
        e.Empty = t;
        class r {
          modelId;
          tints;
          constructor(e, t) {
            ((this.modelId = e), (this.tints = t));
          }
          getMesh(e, t, r) {
            let s = t.getBlockModel(this.modelId);
            if (!s)
              return (
                console.warn(`[deepslate]: Model '${this.modelId}' does not exist`),
                new c.e()
              );
            let i = (s) => (s < this.tints.length ? this.tints[s].getTint(e, t, r) : [1, 1, 1]),
              n = s.getMesh(t, u.V.none(), i);
            return (n.transform(s.getDisplayTransform(r.display_context ?? "gui")), n);
          }
        }
        e.Model = r;
        class i {
          models;
          constructor(e) {
            this.models = e;
          }
          getMesh(e, t, r) {
            let s = new c.e();
            return (this.models.forEach((i) => s.merge(i.getMesh(e, t, r))), s);
          }
        }
        e.Composite = i;
        class d {
          property;
          onTrue;
          onFalse;
          constructor(e, t, r) {
            ((this.property = e), (this.onTrue = t), (this.onFalse = r));
          }
          getMesh(e, t, r) {
            return (this.property(e, t, r) ? this.onTrue : this.onFalse).getMesh(e, t, r);
          }
          static propertyFromJson(e) {
            let t = o.LM.readString(e.property)?.replace(/^minecraft:/, "");
            switch (t) {
              case "fishing_rod/cast":
              case "selected":
              case "carried":
              case "extended_view":
                return (e, r, s) => s[t] ?? !1;
              case "view_entity":
                return (e, t, r) => r.context_entity_is_view_entity ?? !1;
              case "using_item":
                return (e, t, r) => (r.use_duration ?? -1) >= 0;
              case "bundle/has_selected_item":
                return (e, t, r) => (r["bundle/selected_item"] ?? -1) >= 0;
              case "broken":
                return (e, t, r) => {
                  let s = e.getComponent("damage", t)?.getAsNumber(),
                    i = e.getComponent("max_damage", t)?.getAsNumber();
                  return void 0 !== s && void 0 !== i && s >= i - 1;
                };
              case "damaged":
                return (e, t, r) => {
                  let s = e.getComponent("damage", t)?.getAsNumber(),
                    i = e.getComponent("max_damage", t)?.getAsNumber();
                  return void 0 !== s && void 0 !== i && s >= 1;
                };
              case "has_component":
                let r = n.gw.parse(o.LM.readString(e.component) ?? ""),
                  s = o.LM.readBoolean(e.ignore_default) ?? !1;
                return (e, t, i) => e.hasComponent(r, s ? void 0 : t);
              case "keybind_down":
                let i = o.LM.readString(e.keybind) ?? "";
                return (e, t, r) => r.keybind_down?.includes(i) ?? !1;
              case "custom_model_data":
                let a = o.LM.readInt(e.index) ?? 0;
                return (e, t, r) => {
                  let s = e.getComponent("custom_model_data", t);
                  if (!s?.isCompound()) return !1;
                  let i = s.getList("flags").getNumber(a);
                  return void 0 !== i && 0 !== i;
                };
              default:
                return (console.warn(`[deepslate]: Unknown condition property '${t}'`), () => !1);
            }
          }
        }
        e.Condition = d;
        class f {
          property;
          cases;
          fallback;
          constructor(e, t, r) {
            ((this.property = e), (this.cases = t), (this.fallback = r));
          }
          getMesh(e, t, r) {
            let s = this.property(e, t, r);
            return (
              ((null !== s ? this.cases.get(s) : void 0) ?? this.fallback)?.getMesh(e, t, r) ?? m
            );
          }
          static propertyFromJson(e) {
            let t = o.LM.readString(e.property)?.replace(/^minecraft:/, "");
            switch (t) {
              case "main_hand":
                return (e, t, r) => r.main_hand ?? "right";
              case "display_context":
                return (e, t, r) => r.display_context ?? "gui";
              case "context_dimension":
                return (e, t, r) => r.context_dimension?.toString() ?? null;
              case "charge_type":
                let r = n.gw.create("firework_rocket");
                return (e, t, s) => {
                  let i = e.getComponent("charged_projectiles", t);
                  return i?.isList() && 0 !== i.length
                    ? i.filter((e) => !!e.isCompound() && n.gw.parse(e.getString("id")).equals(r))
                        .length > 0
                      ? "rocket"
                      : "arrow"
                    : "none";
                };
              case "trim_material":
                return (e, t, r) => {
                  let s = e.getComponent("trim", t);
                  return s?.isCompound() ? n.gw.parse(s.getString("material")).toString() : null;
                };
              case "block_state":
                let s = o.LM.readString(e.block_state_property) ?? "";
                return (e, t, r) => {
                  let i = e.getComponent("block_state", t);
                  return i?.isCompound() ? i.getString(s) : null;
                };
              case "local_time":
                return (e, t, r) => "NOT IMPLEMENTED";
              case "context_entity_type":
                return (e, t, r) => r.context_entity_type?.toString() ?? null;
              case "custom_model_data":
                let i = o.LM.readInt(e.index) ?? 0;
                return (e, t, r) => {
                  let s = e.getComponent("custom_model_data", t);
                  if (!s?.isCompound()) return null;
                  let n = s.getList("strings");
                  return n.length <= i ? null : n.getString(i);
                };
              default:
                return (console.warn(`[deepslate]: Unknown select property '${t}'`), () => null);
            }
          }
        }
        e.Select = f;
        class g {
          property;
          scale;
          fallback;
          entries;
          constructor(e, t, r, s) {
            ((this.property = e),
              (this.scale = t),
              (this.fallback = s),
              (this.entries = r.sort((e, t) => e.threshold - t.threshold)));
          }
          getMesh(e, t, r) {
            let s = this.property(e, t, r) * this.scale,
              i = this.fallback;
            for (let e of this.entries)
              if (e.threshold <= s) i = e.model;
              else break;
            return i?.getMesh(e, t, r) ?? m;
          }
          static propertyFromJson(e) {
            let t = o.LM.readString(e.property)?.replace(/^minecraft:/, "");
            switch (t) {
              case "bundle/fullness":
                return (e, t, r) =>
                  (function e(t, r) {
                    let s = t.getComponent("bundle_contents", r);
                    return s?.isListOrArray()
                      ? s
                          .map((e) => (e.isCompound() ? n.CX.fromNbt(e) : void 0))
                          .reduce((t, s) => {
                            if (void 0 === s) return t;
                            if (s.hasComponent("bundle_contents", r)) return t + e(s, r) + 1 / 16;
                            let i = s.getComponent("bees", r);
                            if (i?.isListOrArray() && i.length > 0) return t + 1;
                            let n = s.getComponent("max_stack_size", r)?.getAsNumber() ?? 1;
                            return t + s.count / n;
                          }, 0)
                      : 0;
                  })(e, t);
              case "damage": {
                let t = o.LM.readBoolean(e.normalize) ?? !0;
                return (e, r, s) => {
                  let i = e.getComponent("max_damage", r)?.getAsNumber() ?? 0,
                    n = (0, a.qE)(e.getComponent("damage", r)?.getAsNumber() ?? 0, 0, i);
                  return t ? (0, a.qE)(n / i, 0, 1) : (0, a.qE)(n, 0, i);
                };
              }
              case "count": {
                let t = o.LM.readBoolean(e.normalize) ?? !0;
                return (e, r, s) => {
                  let i = e.getComponent("max_stack_size", r)?.getAsNumber() ?? 1;
                  return t ? (0, a.qE)(e.count / i, 0, 1) : (0, a.qE)(e.count, 0, i);
                };
              }
              case "cooldown":
                return (e, t, r) => {
                  let s = e.getComponent("use_cooldown", t),
                    i = s?.isCompound() ? n.gw.parse(s.getString("cooldown_group") ?? e.id) : e.id;
                  return r.cooldown_percentage?.[i.toString()] ?? 0;
                };
              case "time":
                switch (o.LM.readString(e.source) ?? "daytime") {
                  case "moon_phase":
                    return (e, t, r) => (((r.game_time ?? 0) / 24e3) % 8) / 8;
                  case "random":
                    return (e, t, r) => Math.random();
                  default:
                    return (e, t, r) => {
                      let s = (((r.game_time ?? 0) / 24e3) % 1) - 0.25,
                        i = 0.5 - Math.cos(s * Math.PI) / 2;
                      return (2 * s + i) / 3;
                    };
                }
              case "compass":
                return (e, t, r) => r.compass_angle ?? 0;
              case "crossbow/pull":
                return (e, t, r) => r["crossbow/pull"] ?? 0;
              case "use_duration":
                let r = o.LM.readBoolean(e.remaining) ?? !0;
                return (e, t, s) =>
                  void 0 === s.use_duration || s.use_duration < 0
                    ? 0
                    : r
                      ? Math.max((s.max_use_duration ?? 0) - s.use_duration, 0)
                      : s.use_duration;
              case "use_cycle":
                let s = o.LM.readNumber(e.period) ?? 1;
                return (e, t, r) =>
                  void 0 === r.use_duration || r.use_duration < 0
                    ? 0
                    : Math.max((r.max_use_duration ?? 0) - (r.use_duration ?? 0), 0) % s;
              case "custom_model_data":
                let i = o.LM.readInt(e.index) ?? 0;
                return (e, t, r) => {
                  let s = e.getComponent("custom_model_data", t);
                  return s?.isCompound() ? s.getList("floats").getNumber(i) : 0;
                };
              default:
                return (
                  console.warn(`[deepslate]: Unknown range dispatch property '${t}'`),
                  () => 0
                );
            }
          }
        }
        e.RangeDispatch = g;
        class p {
          specialModel;
          base;
          constructor(e, t) {
            ((this.specialModel = e), (this.base = t));
          }
          getMesh(e, t, r) {
            let s = this.specialModel.getMesh(e, t),
              i = t.getBlockModel(this.base);
            return i
              ? (s.transform(i.getDisplayTransform(r.display_context ?? "gui")), s)
              : (console.warn(`[deepslate]: Special model base '${this.base}' does not exist`),
                new c.e());
          }
        }
        e.Special = p;
        class w {
          getMesh(e, t, r) {
            let s = r["bundle/selected_item"];
            if (void 0 === s || s < 0) return new c.e();
            let i = e.getComponent("bundle_contents", t);
            if (!i?.isListOrArray()) return new c.e();
            let a = i.get(s);
            if (void 0 === a || !a.isCompound()) return new c.e();
            let o = n.CX.fromNbt(a);
            return l.L.getItemMesh(o, t, {
              ...r,
              "bundle/selected_item": -1,
              selected: !1,
              carried: !1,
              use_duration: -1,
            });
          }
        }
        e.BundleSelectedItem = w;
      })(i || (i = {}));
    },
    31206: (e, t, r) => {
      "use strict";
      r.d(t, { e: () => a });
      var s = r(82084),
        i = r(63281),
        n = r(98169);
      class a {
        quads;
        lines;
        posBuffer;
        colorBuffer;
        textureBuffer;
        textureLimitBuffer;
        normalBuffer;
        blockPosBuffer;
        indexBuffer;
        linePosBuffer;
        lineColorBuffer;
        constructor(e = [], t = []) {
          ((this.quads = e), (this.lines = t));
        }
        clear() {
          return ((this.quads = []), (this.lines = []), this);
        }
        isEmpty() {
          return 0 === this.quads.length && 0 === this.lines.length;
        }
        quadVertices() {
          return 4 * this.quads.length;
        }
        quadIndices() {
          return 6 * this.quads.length;
        }
        lineVertices() {
          return 2 * this.lines.length;
        }
        merge(e) {
          return (
            (this.quads = this.quads.concat(e.quads)),
            (this.lines = this.lines.concat(e.lines)),
            this
          );
        }
        addLine(e, t, r, a, o, u, l) {
          let h = new i.N(n.L.fromPos(new s.Mi(e, t, r)), n.L.fromPos(new s.Mi(a, o, u))).setColor(
            l,
          );
          return (this.lines.push(h), this);
        }
        addLineCube(e, t, r, s, i, n, a) {
          return (
            this.addLine(e, t, r, e, t, n, a),
            this.addLine(s, t, r, s, t, n, a),
            this.addLine(e, t, r, s, t, r, a),
            this.addLine(e, t, n, s, t, n, a),
            this.addLine(e, t, r, e, i, r, a),
            this.addLine(s, t, r, s, i, r, a),
            this.addLine(e, t, n, e, i, n, a),
            this.addLine(s, t, n, s, i, n, a),
            this.addLine(e, i, r, e, i, n, a),
            this.addLine(s, i, r, s, i, n, a),
            this.addLine(e, i, r, s, i, r, a),
            this.addLine(e, i, n, s, i, n, a),
            this
          );
        }
        transform(e) {
          for (let t of this.quads) t.transform(e);
          return this;
        }
        computeNormals() {
          for (let e of this.quads) {
            let t = e.normal();
            e.forEach((e) => (e.normal = t));
          }
        }
        rebuild(e, t) {
          let r = (t, r, s) => {
              if ((t || (t = e.createBuffer() ?? void 0), !t))
                throw Error("Cannot create new buffer");
              return (e.bindBuffer(r, t), e.bufferData(r, s, e.DYNAMIC_DRAW), t);
            },
            s = (t, s, i) => {
              if (0 === t.length) {
                s && e.deleteBuffer(s);
                return;
              }
              let n = t.flatMap((e) =>
                e.vertices().flatMap((e) => {
                  let t = i(e);
                  if (!t) throw Error("Missing vertex component");
                  return t;
                }),
              );
              return r(s, e.ARRAY_BUFFER, new Float32Array(n));
            };
          return (
            t.pos &&
              ((this.posBuffer = s(this.quads, this.posBuffer, (e) => e.pos.components())),
              (this.linePosBuffer = s(this.lines, this.linePosBuffer, (e) => e.pos.components()))),
            t.color &&
              ((this.colorBuffer = s(this.quads, this.colorBuffer, (e) => e.color)),
              (this.lineColorBuffer = s(this.lines, this.lineColorBuffer, (e) => e.color))),
            t.texture &&
              ((this.textureBuffer = s(this.quads, this.textureBuffer, (e) => e.texture)),
              (this.textureLimitBuffer = s(
                this.quads,
                this.textureLimitBuffer,
                (e) => e.textureLimit,
              ))),
            t.normal &&
              (this.normalBuffer = s(this.quads, this.normalBuffer, (e) => e.normal?.components())),
            t.blockPos &&
              (this.blockPosBuffer = s(this.quads, this.blockPosBuffer, (e) =>
                e.blockPos?.components(),
              )),
            0 === this.quads.length
              ? (this.indexBuffer && e.deleteBuffer(this.indexBuffer), (this.indexBuffer = void 0))
              : (this.indexBuffer = r(
                  this.indexBuffer,
                  e.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(
                    this.quads.flatMap(
                      (e, t) => [4 * t, 4 * t + 1, 4 * t + 2, 4 * t, 4 * t + 2, 4 * t + 3],
                      !0,
                    ),
                  ),
                )),
            this
          );
        }
      }
    },
    31388: (e, t, r) => {
      "use strict";
      r.d(t, { Q: () => a });
      var s = r(13402),
        i = r(40623),
        n = r(22749);
      class a extends i.D {
        value;
        constructor(e) {
          (super(), (this.value = e));
        }
        getId() {
          return n.t.Double;
        }
        equals(e) {
          return e.isDouble() && this.value === e.value;
        }
        getAsNumber() {
          return this.value;
        }
        toString() {
          return Number.isInteger(this.value) ? this.value.toFixed(1) : this.value.toString();
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.value;
        }
        toJson() {
          return this.value;
        }
        toBytes(e) {
          e.writeDouble(this.value);
        }
        static create() {
          return new a(0);
        }
        static fromJson(e) {
          return new a(s.LM.readNumber(e) ?? 0);
        }
        static fromBytes(e) {
          return new a(e.readDouble());
        }
      }
      i.D.register(n.t.Double, a);
    },
    36595: (e, t, r) => {
      "use strict";
      r.d(t, { h: () => i });
      var s = r(40623);
      class i extends s.D {
        items;
        constructor(e) {
          (super(), (this.items = e));
        }
        getItems() {
          return this.items.slice(0);
        }
        getAsTuple(e, t) {
          return [...Array(e)].map((e, r) => t(this.items[r]));
        }
        get(e) {
          if (!((e = Math.floor(e)) < 0) && !(e >= this.items.length)) return this.items[e];
        }
        get length() {
          return this.items.length;
        }
        map(e) {
          return this.items.map(e);
        }
        filter(e) {
          return this.items.filter(e);
        }
        forEach(e) {
          this.items.forEach(e);
        }
        set(e, t) {
          this.items[e] = t;
        }
        add(e) {
          this.items.push(e);
        }
        insert(e, t) {
          this.items.splice(e, 0, t);
        }
        delete(e) {
          this.items.splice(e, 1);
        }
        clear() {
          this.items = [];
        }
      }
    },
    39080: (e, t, r) => {
      "use strict";
      r.d(t, { I: () => d });
      var s = r(19023),
        i = r(13402);
      let n = [124 / 255, 189 / 255, 107 / 255],
        a = i.Q1.intToRgb(6396257),
        o = i.Q1.intToRgb(8431445),
        u = i.Q1.intToRgb(4764952),
        l = i.Q1.intToRgb(4159204),
        h = i.Q1.intToRgb(2129968),
        c = (e) => [e / 8, 1 - e / 32, e / 64],
        d = {
          large_fern: () => n,
          tall_grass: () => n,
          grass_block: () => n,
          fern: () => n,
          grass: () => n,
          short_grass: () => n,
          potted_fern: () => n,
          pink_petals: () => n,
          wildflowers: () => n,
          bush: () => n,
          spruce_leaves: () => a,
          birch_leaves: () => o,
          oak_leaves: () => u,
          jungle_leaves: () => u,
          acacia_leaves: () => u,
          dark_oak_leaves: () => u,
          vine: () => u,
          mangrove_leaves: () => u,
          water: () => l,
          bubble_column: () => l,
          cauldron: () => l,
          water_cauldron: () => l,
          redstone_wire: (e) =>
            ((e) => {
              let t = e / 15,
                r = (0, s.qE)(t * t * 0.7 - 0.5, 0, 1),
                i = (0, s.qE)(t * t * 0.6 - 0.7, 0, 1);
              return [0.6 * t + (t > 0 ? 0.4 : 0.3), r, i];
            })(parseInt(e.power ?? "0")),
          sugar_cane: () => n,
          attached_melon_stem: () => c(7),
          attached_pumpkin_stem: () => c(7),
          melon_stem: (e) => c(parseInt(e.age ?? "0")),
          pumpkin_stem: (e) => c(parseInt(e.age ?? "0")),
          lily_pad: () => h,
        };
    },
    40436: (e, t, r) => {
      "use strict";
      r.d(t, { G: () => n });
      var s = r(40623),
        i = r(22749);
      class n extends s.D {
        static EMPTY = new n("");
        value;
        constructor(e) {
          (super(), (this.value = e));
        }
        getId() {
          return i.t.String;
        }
        equals(e) {
          return e.isString() && this.value === e.value;
        }
        getAsString() {
          return this.value;
        }
        toString() {
          return '"' + this.value.replace(/(\\|")/g, "\\$1") + '"';
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.value;
        }
        toJson() {
          return this.value;
        }
        toBytes(e) {
          e.writeString(this.value);
        }
        static create() {
          return n.EMPTY;
        }
        static fromJson(e) {
          return new n("string" == typeof e ? e : "");
        }
        static fromBytes(e) {
          return new n(e.readString());
        }
      }
      s.D.register(i.t.String, n);
    },
    40623: (e, t, r) => {
      "use strict";
      r.d(t, { D: () => n });
      var s = r(13402),
        i = r(22749);
      class n {
        static FACTORIES = new Map();
        static register(e, t) {
          let r = t.create().getId();
          if (r !== e) throw Error(`Registered factory ${i.t[r]} does not match type ${i.t[e]}`);
          n.FACTORIES.set(e, t);
        }
        isEnd() {
          return this.getId() === i.t.End;
        }
        isByte() {
          return this.getId() === i.t.Byte;
        }
        isShort() {
          return this.getId() === i.t.Short;
        }
        isInt() {
          return this.getId() === i.t.Int;
        }
        isLong() {
          return this.getId() === i.t.Long;
        }
        isFloat() {
          return this.getId() === i.t.Float;
        }
        isDouble() {
          return this.getId() === i.t.Double;
        }
        isByteArray() {
          return this.getId() === i.t.ByteArray;
        }
        isString() {
          return this.getId() === i.t.String;
        }
        isList() {
          return this.getId() === i.t.List;
        }
        isCompound() {
          return this.getId() === i.t.Compound;
        }
        isIntArray() {
          return this.getId() === i.t.IntArray;
        }
        isLongArray() {
          return this.getId() === i.t.LongArray;
        }
        isNumber() {
          return (
            this.isByte() ||
            this.isShort() ||
            this.isInt() ||
            this.isLong() ||
            this.isFloat() ||
            this.isDouble()
          );
        }
        isArray() {
          return this.isByteArray() || this.isIntArray() || this.isLongArray();
        }
        isListOrArray() {
          return this.isList() || this.isArray();
        }
        getAsNumber() {
          return 0;
        }
        getAsString() {
          return "";
        }
        toJsonWithId() {
          return { type: this.getId(), value: this.toJson() };
        }
        static getFactory(e) {
          let t = this.FACTORIES.get(e);
          if (!t) throw Error(`Invalid tag id ${e}`);
          return t;
        }
        static create(e) {
          return this.getFactory(e).create();
        }
        static fromString(e) {
          let t = "string" == typeof e ? new s.r(e) : e;
          return this.getFactory(i.t.Compound).fromString(t);
        }
        static fromJson(e, t = i.t.Compound) {
          return this.getFactory(t).fromJson(e);
        }
        static fromJsonWithId(e) {
          let t = s.LM.readObject(e) ?? {},
            r = s.LM.readInt(t.type) ?? 0;
          return n.fromJson(t.value ?? {}, r);
        }
        static fromBytes(e, t = i.t.Compound) {
          return this.getFactory(t).fromBytes(e);
        }
      }
    },
    45723: (e, t, r) => {
      "use strict";
      r.d(t, {
        IX: () => i,
        Tm: () => m,
        UV: () => n,
        OP: () => s,
        Rd: () => u,
        Lx: () => v,
        gw: () => f,
        CX: () => y,
        C2: () => o,
        OR: () => M,
        pL: () => l,
        oE: () => S,
      });
      var s,
        i,
        n,
        a,
        o,
        u,
        l,
        h = r(23273),
        c = r(13402);
      !(function (e) {
        ((e.UP = "up"),
          (e.DOWN = "down"),
          (e.NORTH = "north"),
          (e.EAST = "east"),
          (e.SOUTH = "south"),
          (e.WEST = "west"));
      })(s || (s = {}));
      let d = {
        [s.UP]: [0, 1, 0],
        [s.DOWN]: [0, -1, 0],
        [s.NORTH]: [0, 0, -1],
        [s.EAST]: [1, 0, 0],
        [s.SOUTH]: [0, 0, 1],
        [s.WEST]: [-1, 0, 0],
      };
      (!(function (e) {
        ((e.ALL = [e.UP, e.DOWN, e.NORTH, e.EAST, e.SOUTH, e.WEST]),
          (e.normal = function (e) {
            return d[e];
          }));
      })(s || (s = {})),
        (function (e) {
          ((e.create = function (e, t, r) {
            return [e, t, r];
          }),
            (e.ZERO = e.create(0, 0, 0)),
            (e.offset = function (e, t, r, s) {
              return [e[0] + t, e[1] + r, e[2] + s];
            }),
            (e.subtract = function (e, t) {
              return [e[0] - t[0], e[1] - t[1], e[2] - t[2]];
            }),
            (e.add = function (e, t) {
              return [e[0] + t[0], e[1] + t[1], e[2] + t[2]];
            }),
            (e.towards = function (t, r) {
              return e.offset(t, ...s.normal(r));
            }),
            (e.equals = function (e, t) {
              return e === t || (e[0] === t[0] && e[1] === t[1] && e[2] === t[2]);
            }),
            (e.magnitude = function (e) {
              return e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
            }),
            (e.toNbt = function (e) {
              return new h.Jp(e.map((e) => new h.QT(e)));
            }),
            (e.fromNbt = function (e) {
              return e.getAsTuple(3, (e) => (e?.isInt() ? e.getAsNumber() : 0));
            }),
            (e.fromJson = function (e) {
              var t;
              let r = c.LM.readArray(e, (e) => c.LM.readInt(e) ?? 0) ?? [0, 0, 0];
              return ((t = r[0]), [t, r[1], r[2]]);
            }));
        })(i || (i = {})));
      class f {
        namespace;
        path;
        static DEFAULT_NAMESPACE = "minecraft";
        static SEPARATOR = ":";
        constructor(e, t) {
          ((this.namespace = e), (this.path = t));
        }
        is(e) {
          return this.equals(f.parse(e));
        }
        equals(e) {
          return (
            this === e || (e instanceof f && this.namespace === e.namespace && this.path === e.path)
          );
        }
        toString() {
          return this.namespace + f.SEPARATOR + this.path;
        }
        withPrefix(e) {
          return new f(this.namespace, e + this.path);
        }
        static create(e) {
          return new f(this.DEFAULT_NAMESPACE, e);
        }
        static parse(e) {
          let t = e.indexOf(this.SEPARATOR);
          return t >= 0
            ? new f(t >= 1 ? e.substring(0, t) : this.DEFAULT_NAMESPACE, e.substring(t + 1))
            : new f(this.DEFAULT_NAMESPACE, e);
        }
      }
      class m {
        properties;
        static AIR = new m(f.create("air"));
        static STONE = new m(f.create("stone"));
        static WATER = new m(f.create("water"), { level: "0" });
        static LAVA = new m(f.create("lava"), { level: "0" });
        name;
        constructor(e, t = {}) {
          ((this.properties = t), (this.name = "string" == typeof e ? f.parse(e) : e));
        }
        getName() {
          return this.name;
        }
        getProperties() {
          return this.properties;
        }
        getProperty(e) {
          return this.properties[e];
        }
        isFluid() {
          return this.is(m.WATER) || this.is(m.LAVA);
        }
        isWaterlogged() {
          return (
            this.is(m.WATER) ||
            this.is(m.LAVA) ||
            this.is("bubble_column") ||
            this.is("kelp") ||
            this.is("kelp_plant") ||
            this.is("seagrass") ||
            this.is("tall_seagrass") ||
            "true" === this.properties.waterlogged
          );
        }
        equals(e) {
          return (
            !!this.name.equals(e.name) &&
            Object.keys(this.properties).length === Object.keys(e.properties).length &&
            Object.keys(this.properties).every((t) => e.properties[t] === this.properties[t])
          );
        }
        is(e) {
          return "string" == typeof e
            ? this.name.equals(f.parse(e))
            : e instanceof f
              ? this.name.equals(e)
              : this.name.equals(e.name);
        }
        toString() {
          return 0 === Object.keys(this.properties).length
            ? this.name.toString()
            : `${this.name.toString()}[${Object.entries(this.properties)
                .map(([e, t]) => e + "=" + t)
                .join(",")}]`;
        }
        static parse(e) {
          let t = e.indexOf("[");
          return -1 === t
            ? new m(e)
            : new m(
                e.substring(0, t),
                Object.fromEntries(
                  e
                    .substring(t + 1, e.length - 1)
                    .split(",")
                    .map((e) => e.split("=")),
                ),
              );
        }
        static fromNbt(e) {
          return new m(
            f.parse(e.getString("Name")),
            e.getCompound("Properties").map((e, t) => [e, t.getAsString()]),
          );
        }
        static fromJson(e) {
          let t = c.LM.readObject(e) ?? {},
            r = f.parse(c.LM.readString(t.Name) ?? m.STONE.name.toString());
          return new m(
            r,
            c.LM.readMap(t.Properties, (e) => c.LM.readString(e) ?? ""),
          );
        }
      }
      class g {
        size;
        defaultValue;
        storage;
        palette;
        constructor(e, t) {
          ((this.size = e),
            (this.defaultValue = t),
            (this.storage = Array(e).fill(0)),
            (this.palette = [t]));
        }
        index(e, t, r) {
          return (e << 8) + (t << 4) + r;
        }
        get(e, t, r) {
          let s = this.storage[this.index(e, t, r)];
          return this.palette[s];
        }
        set(e, t, r, s) {
          let i = this.palette.findIndex((e) => e.equals(s));
          (-1 === i && ((i = this.palette.length), this.palette.push(s)),
            (this.storage[this.index(e, t, r)] = i));
        }
      }
      class p {
        minY;
        static WIDTH = 16;
        static SIZE = p.WIDTH * p.WIDTH * p.WIDTH;
        states;
        constructor(e) {
          ((this.minY = e), (this.states = new g(p.SIZE, m.AIR)));
        }
        get minBlockY() {
          return this.minY << 4;
        }
        getBlockState(e, t, r) {
          return this.states.get(e, t, r);
        }
        setBlockState(e, t, r, s) {
          this.states.set(e, t, r, s);
        }
      }
      !(function (e) {
        function t(e, t) {
          return BigInt(0 | e) | (BigInt(0 | t) << BigInt(32));
        }
        ((e.create = function (e, t) {
          return [e, t];
        }),
          (e.fromBlockPos = function (e) {
            return [e[0] >> 4, e[2] >> 4];
          }),
          (e.fromLong = function (e) {
            return [0 | Number(e), Number(e >> BigInt(32))];
          }),
          (e.toLong = function (e) {
            return t(e[0], e[1]);
          }),
          (e.asLong = t),
          (e.minBlockX = function (e) {
            return e[0] << 4;
          }),
          (e.minBlockZ = function (e) {
            return e[1] << 4;
          }),
          (e.maxBlockX = function (e) {
            return (e[0] << 4) + 15;
          }),
          (e.maxBlockZ = function (e) {
            return (e[1] << 4) + 15;
          }));
      })(n || (n = {}));
      let w = new Map([
        ["minecraft:speed", 3402751],
        ["minecraft:slowness", 9154528],
        ["minecraft:haste", 0xd9c043],
        ["minecraft:mining_fatigue", 4866583],
        ["minecraft:strength", 0xffc700],
        ["minecraft:instant_health", 0xf82423],
        ["minecraft:instant_damage", 0xa9656a],
        ["minecraft:jump_boost", 0xfdff84],
        ["minecraft:nausea", 5578058],
        ["minecraft:regeneration", 0xcd5cab],
        ["minecraft:resistance", 9520880],
        ["minecraft:fire_resistance", 0xff9900],
        ["minecraft:water_breathing", 0x98dac0],
        ["minecraft:invisibility", 0xf6f6f6],
        ["minecraft:blindness", 2039587],
        ["minecraft:night_vision", 0xc2ff66],
        ["minecraft:hunger", 5797459],
        ["minecraft:weakness", 4738376],
        ["minecraft:poison", 8889187],
        ["minecraft:wither", 7561558],
        ["minecraft:health_boost", 0xf87d23],
        ["minecraft:absorption", 2445989],
        ["minecraft:saturation", 0xf82423],
        ["minecraft:glowing", 9740385],
        ["minecraft:levitation", 0xceffff],
        ["minecraft:luck", 5882118],
        ["minecraft:unluck", 0xc0a44d],
        ["minecraft:slow_falling", 0xf3cfb9],
        ["minecraft:conduit_power", 1950417],
        ["minecraft:dolphins_grace", 8954814],
        ["minecraft:bad_omen", 745784],
        ["minecraft:hero_of_the_village", 4521796],
        ["minecraft:darkness", 2696993],
        ["minecraft:trial_omen", 1484454],
        ["minecraft:raid_omen", 0xde4058],
        ["minecraft:wind_charged", 0xbdc9ff],
        ["minecraft:weaving", 7891290],
        ["minecraft:oozing", 0x99ffa3],
        ["minecraft:infested", 9214860],
      ]);
      (a || (a = {})).fromNbt = function (e) {
        return {
          effect: f.parse(e.getString("id")),
          duration: e.getNumber("duration"),
          amplifier: e.getNumber("amplifier"),
        };
      };
      let x = new Map([
        ["minecraft:empty", []],
        ["minecraft:water", []],
        ["minecraft:mundane", []],
        ["minecraft:thick", []],
        ["minecraft:awkward", []],
        [
          "minecraft:night_vision",
          [{ effect: f.create("night_vision"), duration: 3600, amplifier: 0 }],
        ],
        [
          "minecraft:long_night_vision",
          [{ effect: f.create("night_vision"), duration: 9600, amplifier: 0 }],
        ],
        [
          "minecraft:invisibility",
          [{ effect: f.create("invisibility"), duration: 3600, amplifier: 0 }],
        ],
        [
          "minecraft:long_invisibility",
          [{ effect: f.create("invisibility"), duration: 9600, amplifier: 0 }],
        ],
        ["minecraft:leaping", [{ effect: f.create("jump_boost"), duration: 3600, amplifier: 0 }]],
        [
          "minecraft:long_leaping",
          [{ effect: f.create("jump_boost"), duration: 9600, amplifier: 0 }],
        ],
        [
          "minecraft:strong_leaping",
          [{ effect: f.create("jump_boost"), duration: 1800, amplifier: 1 }],
        ],
        [
          "minecraft:fire_resistance",
          [{ effect: f.create("fire_resistance"), duration: 3600, amplifier: 0 }],
        ],
        [
          "minecraft:long_fire_resistance",
          [{ effect: f.create("fire_resistance"), duration: 9600, amplifier: 0 }],
        ],
        ["minecraft:swiftness", [{ effect: f.create("speed"), duration: 3600, amplifier: 0 }]],
        ["minecraft:long_swiftness", [{ effect: f.create("speed"), duration: 9600, amplifier: 0 }]],
        [
          "minecraft:strong_swiftness",
          [{ effect: f.create("speed"), duration: 1800, amplifier: 1 }],
        ],
        ["minecraft:slowness", [{ effect: f.create("slowness"), duration: 1800, amplifier: 0 }]],
        [
          "minecraft:long_slowness",
          [{ effect: f.create("slowness"), duration: 4800, amplifier: 0 }],
        ],
        [
          "minecraft:strong_slowness",
          [{ effect: f.create("slowness"), duration: 400, amplifier: 3 }],
        ],
        [
          "minecraft:turtle_master",
          [
            { effect: f.create("slowness"), duration: 400, amplifier: 3 },
            { effect: f.create("resistance"), duration: 400, amplifier: 2 },
          ],
        ],
        [
          "minecraft:long_turtle_master",
          [
            { effect: f.create("slowness"), duration: 800, amplifier: 3 },
            { effect: f.create("resistance"), duration: 800, amplifier: 2 },
          ],
        ],
        [
          "minecraft:strong_turtle_master",
          [
            { effect: f.create("slowness"), duration: 400, amplifier: 5 },
            { effect: f.create("resistance"), duration: 400, amplifier: 3 },
          ],
        ],
        [
          "minecraft:water_breathing",
          [{ effect: f.create("water_breathing"), duration: 3600, amplifier: 0 }],
        ],
        [
          "minecraft:long_water_breathing",
          [{ effect: f.create("water_breathing"), duration: 9600, amplifier: 0 }],
        ],
        ["minecraft:healing", [{ effect: f.create("instant_health"), duration: 1, amplifier: 0 }]],
        [
          "minecraft:strong_healing",
          [{ effect: f.create("instant_health"), duration: 1, amplifier: 1 }],
        ],
        ["minecraft:harming", [{ effect: f.create("instant_damage"), duration: 1, amplifier: 0 }]],
        [
          "minecraft:strong_harming",
          [{ effect: f.create("instant_damage"), duration: 1, amplifier: 1 }],
        ],
        ["minecraft:poison", [{ effect: f.create("poison"), duration: 900, amplifier: 0 }]],
        ["minecraft:long_poison", [{ effect: f.create("poison"), duration: 1800, amplifier: 0 }]],
        ["minecraft:strong_poison", [{ effect: f.create("poison"), duration: 432, amplifier: 1 }]],
        [
          "minecraft:regeneration",
          [{ effect: f.create("regeneration"), duration: 900, amplifier: 0 }],
        ],
        [
          "minecraft:long_regeneration",
          [{ effect: f.create("regeneration"), duration: 1800, amplifier: 0 }],
        ],
        [
          "minecraft:strong_regeneration",
          [{ effect: f.create("regeneration"), duration: 450, amplifier: 1 }],
        ],
        ["minecraft:strength", [{ effect: f.create("strength"), duration: 3600, amplifier: 0 }]],
        [
          "minecraft:long_strength",
          [{ effect: f.create("strength"), duration: 9600, amplifier: 0 }],
        ],
        [
          "minecraft:strong_strength",
          [{ effect: f.create("strength"), duration: 1800, amplifier: 1 }],
        ],
        ["minecraft:weakness", [{ effect: f.create("weakness"), duration: 1800, amplifier: 0 }]],
        [
          "minecraft:long_weakness",
          [{ effect: f.create("weakness"), duration: 4800, amplifier: 0 }],
        ],
        ["minecraft:luck", [{ effect: f.create("luck"), duration: 6e3, amplifier: 0 }]],
        [
          "minecraft:slow_falling",
          [{ effect: f.create("slow_falling"), duration: 1800, amplifier: 0 }],
        ],
        [
          "minecraft:long_slow_falling",
          [{ effect: f.create("slow_falling"), duration: 4800, amplifier: 0 }],
        ],
        [
          "minecraft:wind_charged",
          [{ effect: f.create("wind_charged"), duration: 3600, amplifier: 0 }],
        ],
        ["minecraft:weaving", [{ effect: f.create("weaving"), duration: 3600, amplifier: 0 }]],
        ["minecraft:oozing", [{ effect: f.create("oozing"), duration: 3600, amplifier: 0 }]],
        ["minecraft:infested", [{ effect: f.create("infested"), duration: 3600, amplifier: 0 }]],
      ]);
      (!(function (e) {
        function t(e) {
          let t = [];
          return (
            e.potion && t.push(...(x.get(e.potion.toString()) ?? [])),
            e.customEffects && t.push(...e.customEffects),
            t
          );
        }
        ((e.fromNbt = function (e) {
          let t = {};
          return (
            e.isString()
              ? (t.potion = f.parse(e.getAsString()))
              : e.isCompound() &&
                (e.hasString("potion") && (t.potion = f.parse(e.getString("potion"))),
                e.hasNumber("custom_color") && (t.customColor = e.getNumber("custom_color")),
                e.hasList("custom_effects") &&
                  (t.customEffects = e.getList("custom_effects", h.t$.Compound).map(a.fromNbt))),
            t
          );
        }),
          (e.getColor = function (e) {
            return e.customColor
              ? c.Q1.intToRgb(e.customColor)
              : (function (e) {
                  let [t, r, s] = [0, 0, 0],
                    i = 0;
                  for (let n of e) {
                    let e = w.get(n.effect.toString());
                    if (void 0 === e) continue;
                    let a = c.Q1.intToRgb(e),
                      o = n.amplifier + 1;
                    ((t += o * a[0]), (r += o * a[1]), (s += o * a[2]), (i += o));
                  }
                  return 0 === i ? c.Q1.intToRgb(-0xc7a23a) : [(t /= i), (r /= i), (s /= i)];
                })(t(e));
          }),
          (e.getAllEffects = t));
      })(o || (o = {})),
        (function (e) {
          function t(e, t) {
            return { value: () => e, key: () => t };
          }
          function r(e, t, s = !0) {
            return s
              ? { value: () => e.getOrThrow(t), key: () => t }
              : { value: () => e.get(t), key: () => t };
          }
          ((e.parser = function (e, s) {
            return (i) => ("string" == typeof i ? r(e, f.parse(i)) : t(s(i)));
          }),
            (e.direct = t),
            (e.reference = r));
        })(u || (u = {})));
      class v {
        entries;
        constructor(e) {
          this.entries = e;
        }
        static parser(e, t) {
          let r = t ?? ((t) => u.reference(e, f.parse(c.LM.readString(t) ?? "")));
          return (t) =>
            "string" != typeof t
              ? u.direct(new v(c.LM.readArray(t, r) ?? []) ?? [])
              : t.startsWith("#")
                ? u.reference(e.getTagRegistry(), f.parse(t.substring(1)))
                : u.direct(new v([]));
        }
        static fromJson(e, t, r) {
          let s = c.LM.readObject(t) ?? {},
            i = c.LM.readBoolean(s.replace) ?? !1,
            n =
              c.LM.readArray(s.values, (t) => {
                var r = !0,
                  s = "";
                if ("string" == typeof t) s = t;
                else {
                  let e = c.LM.readObject(t) ?? {};
                  ((r = c.LM.readBoolean(e.required) ?? !1), (s = c.LM.readString(e.id) ?? ""));
                }
                return s.startsWith("#")
                  ? u.reference(e.getTagRegistry(), f.parse(s.substring(1)), r)
                  : u.reference(e, f.parse(s), r);
              }) ?? [];
          return (
            r && !i && e.getTagRegistry().has(r) && n?.push(u.direct(e.getTagRegistry().get(r))),
            new v(n)
          );
        }
        *getEntries() {
          for (let e of this.entries) {
            let t = e.value();
            void 0 !== t && (t instanceof v ? yield* t.getEntries() : yield e);
          }
        }
      }
      var b = r(87118);
      class y {
        id;
        count;
        components;
        constructor(e, t, r = new Map()) {
          ((this.id = e), (this.count = t), (this.components = r));
        }
        getComponent(e, t) {
          if (("string" == typeof e && (e = f.parse(e)), this.components.has("!" + e.toString())))
            return;
          let r = this.components.get(e.toString());
          return r || (t ? t.getItemComponents(this.id)?.get(e.toString()) : void 0);
        }
        hasComponent(e, t) {
          return (
            "string" == typeof e && (e = f.parse(e)),
            !this.components.has("!" + e.toString()) &&
              (!!this.components.has(e.toString()) ||
                (!!t && t.getItemComponents(this.id)?.has(e.toString())))
          );
        }
        clone() {
          let e = new Map(this.components);
          return new y(this.id, this.count, e);
        }
        is(e) {
          return "string" == typeof e
            ? this.id.equals(f.parse(e))
            : e instanceof f
              ? this.id.equals(e)
              : this.id.equals(e.id);
        }
        equals(e) {
          return (
            this === e ||
            (e instanceof y && this.count === e.count && this.isSameItemSameComponents(e))
          );
        }
        isSameItemSameComponents(e) {
          if (!this.id.equals(e.id) || this.components.size !== e.components.size) return !1;
          for (let [t, r] of this.components) {
            let s = e.components.get(t);
            if (r.toString() !== s?.toString()) return !1;
          }
          return !0;
        }
        toString() {
          let e = this.id.toString();
          return (
            this.components.size > 0 &&
              (e += `[${[...this.components.entries()].map(([e, t]) => (e.startsWith("!") ? e : `${e}=${t.toString()}`)).join(",")}]`),
            this.count > 1 && (e += ` ${this.count}`),
            e
          );
        }
        static fromString(e) {
          let t = new c.r(e);
          for (; t.canRead() && "[" !== t.peek();) t.skip();
          let r = f.parse(t.getRead());
          if (!t.canRead()) return new y(r, 1);
          let s = new Map();
          if ((t.skip(), "]" === t.peek())) return new y(r, 1, s);
          do {
            if ("!" === t.peek()) {
              (t.skip(), t.skipWhitespace());
              let e = t.cursor;
              for (; t.canRead() && "]" !== t.peek() && "," !== t.peek();) t.skip();
              s.set("!" + f.parse(t.getRead(e).trim()).toString(), new h.GJ());
            } else {
              t.skipWhitespace();
              let e = t.cursor;
              for (; t.canRead() && "=" !== t.peek();) t.skip();
              let r = f.parse(t.getRead(e).trim()).toString();
              if (!t.canRead()) break;
              (t.skip(), t.skipWhitespace());
              let i = b.s.readTag(t);
              s.set(r, i);
            }
            if ((t.skipWhitespace(), !t.canRead())) break;
            if ("]" === t.peek()) return new y(r, 1, s);
            if ("," !== t.peek()) throw Error("Expected , or ]");
            t.skip();
          } while (t.canRead());
          throw Error("Missing closing ]");
        }
        toNbt() {
          let e = new h.GJ().set("id", new h.Gz(this.id.toString()));
          return (
            this.count > 1 && e.set("count", new h.QT(this.count)),
            this.components.size > 0 && e.set("components", new h.GJ(this.components)),
            e
          );
        }
        static fromNbt(e) {
          let t = f.parse(e.getString("id"));
          return new y(
            t,
            e.hasNumber("count") ? e.getNumber("count") : 1,
            new Map(
              Object.entries(
                e
                  .getCompound("components")
                  .map((e, t) =>
                    e.startsWith("!")
                      ? ["!" + f.parse(e).toString(), new h.GJ()]
                      : [f.parse(e).toString(), t],
                  ),
              ),
            ),
          );
        }
      }
      class M {
        key;
        parser;
        static REGISTRY = new M(f.create("root"));
        storage = new Map();
        builtin = new Map();
        tags = void 0;
        constructor(e, t) {
          ((this.key = e), (this.parser = t));
        }
        static createAndRegister(e, t) {
          let r = new M(f.create(e), t);
          return (M.REGISTRY.register(r.key, r), r);
        }
        register(e, t, r) {
          return (
            this.storage.set(e.toString(), t),
            r && this.builtin.set(e.toString(), t),
            u.reference(this, e)
          );
        }
        delete(e) {
          let t = this.storage.delete(e.toString());
          return (this.builtin.delete(e.toString()), t);
        }
        keys() {
          return [...this.storage.keys()].map((e) => f.parse(e));
        }
        has(e) {
          return this.storage.has(e.toString());
        }
        get(e) {
          var t = this.storage.get(e.toString());
          return (t instanceof Function && ((t = t()), this.storage.set(e.toString(), t)), t);
        }
        getOrThrow(e) {
          let t = this.get(e);
          if (void 0 === t) throw Error(`Missing key in ${this.key.toString()}: ${e.toString()}`);
          return t;
        }
        parse(e) {
          if (!this.parser) throw Error(`No parser exists for ${this.key.toString()}`);
          return this.parser(e);
        }
        clear() {
          for (let [e, t] of (this.storage.clear(), this.builtin.entries())) this.storage.set(e, t);
          return (this.tags && this.tags.clear(), this);
        }
        assign(e) {
          if (!this.key.equals(e.key))
            throw Error(
              `Cannot assign registry of type ${e.key.toString()} to registry of type ${this.key.toString()}`,
            );
          for (let t of e.keys()) this.storage.set(t.toString(), e.getOrThrow(t));
          return this;
        }
        cloneEmpty() {
          return new M(this.key, this.parser);
        }
        forEach(e) {
          for (let [t, r] of this.storage.entries())
            e(f.parse(t), r instanceof Function ? r() : r, this);
        }
        map(e) {
          return [...this.storage.entries()].map(([t, r]) =>
            e(f.parse(t), r instanceof Function ? r() : r, this),
          );
        }
        getTagRegistry() {
          return (
            void 0 === this.tags &&
              (this.tags = new M(new f(this.key.namespace, `tags/${this.key.path}`))),
            this.tags
          );
        }
      }
      (!(function (e) {
        ((e.NONE = "none"),
          (e.CLOCKWISE_90 = "clockwise_90"),
          (e.CLOCKWISE_180 = "180"),
          (e.COUNTERCLOCKWISE_90 = "counterclockwise_90"));
      })(l || (l = {})),
        (function (e) {
          e.getRandom = function (t) {
            return [e.NONE, e.CLOCKWISE_90, e.CLOCKWISE_180, e.COUNTERCLOCKWISE_90][t.nextInt(4)];
          };
        })(l || (l = {})));
      class S {
        size;
        palette;
        blocks;
        static REGISTRY = M.createAndRegister("structures");
        static EMPTY = new S(i.ZERO);
        blocksMap = [];
        constructor(e, t = [], r = []) {
          ((this.size = e),
            (this.palette = t),
            (this.blocks = r),
            r.forEach((t) => {
              if (!this.isInside(t.pos))
                throw Error(
                  `Found block at ${t.pos} which is outside the structure bounds ${this.size}`,
                );
              this.blocksMap[t.pos[0] * e[1] * e[2] + t.pos[1] * e[2] + t.pos[2]] = t;
            }));
        }
        getSize() {
          return this.size;
        }
        addBlock(e, t, r, s) {
          if (!this.isInside(e))
            throw Error(`Cannot add block at ${e} outside the structure bounds ${this.size}`);
          let i = new m(t, r),
            n = this.palette.findIndex((e) => e.equals(i));
          return (
            -1 === n && ((n = this.palette.length), this.palette.push(i)),
            this.blocks.push({ pos: e, state: n, nbt: s }),
            (this.blocksMap[e[0] * this.size[1] * this.size[2] + e[1] * this.size[2] + e[2]] = {
              pos: e,
              state: n,
              nbt: s,
            }),
            this
          );
        }
        getBlocks() {
          return this.blocks.map((e) => this.toPlacedBlock(e));
        }
        getBlock(e) {
          if (!this.isInside(e)) return null;
          let t = this.blocksMap[e[0] * this.size[1] * this.size[2] + e[1] * this.size[2] + e[2]];
          return t ? this.toPlacedBlock(t) : null;
        }
        toPlacedBlock(e) {
          let t = this.palette[e.state];
          if (!t)
            throw Error(
              `Block at ${e.pos.join(" ")} in structure references invalid palette index ${e.state}`,
            );
          return { pos: e.pos, state: t, nbt: e.nbt };
        }
        isInside(e) {
          return (
            e[0] >= 0 &&
            e[0] < this.size[0] &&
            e[1] >= 0 &&
            e[1] < this.size[1] &&
            e[2] >= 0 &&
            e[2] < this.size[2]
          );
        }
        static fromNbt(e) {
          let t = i.fromNbt(e.getList("size"));
          return new S(
            t,
            e.getList("palette", h.t$.Compound).map((e) => m.fromNbt(e)),
            e.getList("blocks", h.t$.Compound).map((e) => {
              let t = i.fromNbt(e.getList("pos")),
                r = e.getNumber("state"),
                s = e.getCompound("nbt");
              return { pos: t, state: r, nbt: s.size > 0 ? s : void 0 };
            }),
          );
        }
        static transform(e, t, r) {
          switch (t) {
            case l.COUNTERCLOCKWISE_90:
              return i.create(r[0] - r[2] + e[2], e[1], r[0] + r[2] - e[0]);
            case l.CLOCKWISE_90:
              return i.create(r[0] + r[2] - e[2], e[1], r[2] - r[0] + e[0]);
            case l.CLOCKWISE_180:
              return i.create(r[0] + r[0] - e[0], e[1], r[2] + r[2] - e[2]);
            default:
              return e;
          }
        }
      }
    },
    47795: (e, t, r) => {
      "use strict";
      r.d(t, { L: () => o });
      var s = r(85250),
        i = r(45723),
        n = r(31206),
        a = r(89268);
      class o extends a.A {
        item;
        resources;
        mesh;
        atlasTexture;
        constructor(e, t, r, s = {}) {
          (super(e),
            (this.item = t),
            (this.resources = r),
            this.updateMesh(s),
            (this.atlasTexture = this.createAtlasTexture(this.resources.getTextureAtlas())));
        }
        setItem(e, t = {}) {
          ((this.item = e), this.updateMesh(t));
        }
        updateMesh(e = {}) {
          ((this.mesh = o.getItemMesh(this.item, this.resources, e)),
            this.mesh.computeNormals(),
            this.mesh.rebuild(this.gl, { pos: !0, color: !0, texture: !0, normal: !0 }));
        }
        static getItemMesh(e, t, r) {
          let s = e.getComponent("item_model", t)?.getAsString();
          if (void 0 === s) return new n.e();
          let a = t.getItemModel(i.gw.parse(s));
          if (!a) throw Error(`Item model ${s} does not exist (defined by item ${e.toString()})`);
          return a.getMesh(e, t, r);
        }
        getPerspective() {
          let e = s.vt();
          return (s.v3(e, 0, 16, 0, 16, 0.1, 500), e);
        }
        drawItem() {
          let e = s.vt();
          (s.Tl(e, e, [0, 0, -32]),
            this.setShader(this.shaderProgram),
            this.setTexture(this.atlasTexture, this.resources.getPixelSize?.()),
            this.prepareDraw(e),
            this.drawMesh(this.mesh, { pos: !0, color: !0, texture: !0, normal: !0 }));
        }
      }
    },
    49517: (e, t, r) => {
      "use strict";
      r.d(t, { Vc: () => n, NF: () => o });
      var s = r(9387),
        i = r(96185);
      class n {
        static MODULUS_BITS = 48;
        static MODULUS_MASK = BigInt("281474976710655");
        static MULTIPLIER = BigInt("25214903917");
        static INCREMENT = BigInt("11");
        static FLOAT_MULTIPLIER = 1 / 0x1000000;
        static DOUBLE_MULTIPLIER = 1 / 0x40000000;
        seed = BigInt(0);
        constructor(e) {
          this.setSeed(e);
        }
        static fromLargeFeatureSeed(e, t, r) {
          let s = new n(e),
            i = s.nextLong(),
            a = s.nextLong(),
            o = (BigInt(t) * i) ^ (BigInt(r) * a) ^ e;
          return (s.setSeed(o), s);
        }
        static fromLargeFeatureWithSalt(e, t, r, s) {
          return new n(
            BigInt(t) * BigInt("341873128712") + BigInt(r) * BigInt("132897987541") + e + BigInt(s),
          );
        }
        fork() {
          return new n(this.nextLong());
        }
        forkPositional() {
          return new a(this.nextLong());
        }
        setSeed(e) {
          this.seed = (e ^ n.MULTIPLIER) & n.MODULUS_MASK;
        }
        advance() {
          this.seed = (this.seed * n.MULTIPLIER + n.INCREMENT) & n.MODULUS_MASK;
        }
        consume(e) {
          for (let t = 0; t < e; t += 1) this.advance();
        }
        next(e) {
          this.advance();
          let t = Number(this.seed >> BigInt(n.MODULUS_BITS - e));
          return t > 0x7fffffff ? t - 0x100000000 : t;
        }
        nextInt(e) {
          let t, r;
          if (void 0 === e) return this.next(32);
          if ((e & (e - 1)) == 0) return Number((BigInt(e) * BigInt(this.next(31))) >> BigInt(31));
          for (; (t = this.next(31)) - (r = t % e) + (e - 1) < 0;);
          return r;
        }
        nextLong() {
          return (BigInt(this.next(32)) << BigInt(32)) + BigInt(this.next(32));
        }
        nextFloat() {
          return this.next(24) * n.FLOAT_MULTIPLIER;
        }
        nextDouble() {
          let e = this.next(30);
          return (this.advance(), e * n.DOUBLE_MULTIPLIER);
        }
      }
      class a {
        seed;
        constructor(e) {
          this.seed = e;
        }
        at(e, t, r) {
          return new n((0, i.sA)(e, t, r) ^ this.seed);
        }
        fromHashOf(e) {
          let t = s(e, { asBytes: !0 });
          return new n((0, i.kE)(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]) ^ this.seed);
        }
        seedKey() {
          return [this.seed, BigInt(0)];
        }
      }
      class o {
        static SILVER_RATIO_64 = BigInt("7640891576956012809");
        static GOLDEN_RATIO_64 = BigInt("-7046029254386353131");
        static FLOAT_MULTIPLIER = 1 / 0x1000000;
        static DOUBLE_MULTIPLIER = 11102230246251565e-32;
        static BIGINT_1 = BigInt(1);
        static BIGINT_17 = BigInt(17);
        static BIGINT_21 = BigInt(21);
        static BIGINT_27 = BigInt(27);
        static BIGINT_28 = BigInt(28);
        static BIGINT_30 = BigInt(30);
        static BIGINT_31 = BigInt(31);
        static BIGINT_32 = BigInt(32);
        static BIGINT_49 = BigInt(49);
        static BIGINT_64 = BigInt(64);
        static STAFFORD_1 = BigInt("-4658895280553007687");
        static STAFFORD_2 = BigInt("-7723592293110705685");
        static MAX_ULONG = BigInt("0xFFFFFFFFFFFFFFFF");
        static POW2_60 = BigInt("0x10000000000000000");
        static POW2_63 = BigInt("0x8000000000000000");
        static MAX_UINT = BigInt(0xffffffff);
        seed = [BigInt(0), BigInt(0)];
        constructor(e) {
          this.seed = e;
        }
        static create(e) {
          return new o(o.upgradeSeedTo128bit(e));
        }
        static mixStafford13(e) {
          return (
            ((e =
              (((e = ((e ^ (e >> o.BIGINT_30)) * o.STAFFORD_1) & o.MAX_ULONG) ^
                (e >> o.BIGINT_27)) *
                o.STAFFORD_2) &
              o.MAX_ULONG) ^
              (e >> o.BIGINT_31)) &
            o.MAX_ULONG
          );
        }
        static upgradeSeedTo128bit(e) {
          e < 0 && (e += o.POW2_60);
          let t = e ^ o.SILVER_RATIO_64,
            r = (t + o.GOLDEN_RATIO_64) & o.MAX_ULONG;
          return [o.mixStafford13(t), o.mixStafford13(r)];
        }
        static rotateLeft(e, t) {
          return ((e << t) & o.MAX_ULONG) | (e >> (o.BIGINT_64 - t));
        }
        setSeed(e) {
          this.seed = o.upgradeSeedTo128bit(e);
        }
        fork() {
          return new o([this.next(), this.next()]);
        }
        forkPositional() {
          return new u(this.next(), this.next());
        }
        next() {
          let e = this.seed[0],
            t = this.seed[1],
            r = (o.rotateLeft((e + t) & o.MAX_ULONG, o.BIGINT_17) + e) & o.MAX_ULONG;
          return (
            (t ^= e),
            (this.seed = [
              o.rotateLeft(e, o.BIGINT_49) ^ t ^ ((t << o.BIGINT_21) & o.MAX_ULONG),
              o.rotateLeft(t, o.BIGINT_28),
            ]),
            r
          );
        }
        nextLong() {
          let e = this.next();
          return (e > o.POW2_63 && (e -= o.POW2_60), e);
        }
        consume(e) {
          let t = this.seed[0],
            r = this.seed[1];
          for (let s = 0; s < e; s += 1)
            ((r ^= t),
              (t = o.rotateLeft(t, o.BIGINT_49) ^ r ^ (r << o.BIGINT_21)),
              (r = o.rotateLeft(r, o.BIGINT_28)));
          this.seed = [t, r];
        }
        nextBits(e) {
          return this.next() >> BigInt(64 - e);
        }
        nextInt(e) {
          let t = this.next() & o.MAX_UINT;
          if (e) {
            let r = BigInt(e),
              s = t * r,
              i = s & o.MAX_UINT;
            if (i < r) {
              let e = ((~r & o.MAX_UINT) + o.BIGINT_1) % r;
              for (; i < e;) i = (s = (t = this.next() & o.MAX_UINT) * r) & o.MAX_UINT;
            }
            return Number(s >> o.BIGINT_32);
          }
          {
            let e = Number(t);
            return (e >= 0x80000000 && (e -= 0x100000000), e);
          }
        }
        nextFloat() {
          return Number(this.nextBits(24)) * o.FLOAT_MULTIPLIER;
        }
        nextDouble() {
          return Number(this.nextBits(53)) * o.DOUBLE_MULTIPLIER;
        }
        parityConfigString() {
          return "seedLo: " + this.seed[0] + ", seedHi: " + this.seed[1];
        }
      }
      class u {
        seedLo;
        seedHi;
        constructor(e, t) {
          ((this.seedLo = e), (this.seedHi = t));
        }
        at(e, t, r) {
          return new o([(0, i.sA)(e, t, r) ^ this.seedLo, this.seedHi]);
        }
        fromHashOf(e) {
          let t = s(e, { asBytes: !0 }),
            r = (0, i.kE)(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]),
            n = (0, i.kE)(t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
          return new o([r ^ this.seedLo, n ^ this.seedHi]);
        }
        seedKey() {
          return [this.seedLo, this.seedHi];
        }
      }
    },
    50923: (e, t, r) => {
      "use strict";
      r.d(t, { Z0: () => o, aI: () => u, fA: () => n, vt: () => i, ze: () => a });
      var s = r(97633);
      function i() {
        var e = new s.tb(3);
        return (s.tb != Float32Array && ((e[0] = 0), (e[1] = 0), (e[2] = 0)), e);
      }
      function n(e, t, r) {
        var i = new s.tb(3);
        return ((i[0] = e), (i[1] = t), (i[2] = r), i);
      }
      function a(e, t) {
        return ((e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), e);
      }
      function o(e, t, r) {
        var s = t[0],
          i = t[1],
          n = t[2],
          a = r[3] * s + r[7] * i + r[11] * n + r[15];
        return (
          (a = a || 1),
          (e[0] = (r[0] * s + r[4] * i + r[8] * n + r[12]) / a),
          (e[1] = (r[1] * s + r[5] * i + r[9] * n + r[13]) / a),
          (e[2] = (r[2] * s + r[6] * i + r[10] * n + r[14]) / a),
          e
        );
      }
      function u(e, t) {
        var r = e[0],
          i = e[1],
          n = e[2],
          a = t[0],
          o = t[1],
          u = t[2];
        return (
          Math.abs(r - a) <= s.p8 * Math.max(1, Math.abs(r), Math.abs(a)) &&
          Math.abs(i - o) <= s.p8 * Math.max(1, Math.abs(i), Math.abs(o)) &&
          Math.abs(n - u) <= s.p8 * Math.max(1, Math.abs(n), Math.abs(u))
        );
      }
      i();
    },
    51190: (e, t, r) => {
      "use strict";
      r.d(t, { Q: () => a });
      var s = r(91305),
        i = r(40623),
        n = r(22749);
      class a extends i.D {
        value;
        constructor(e) {
          (super(), (this.value = e));
        }
        getId() {
          return n.t.Int;
        }
        equals(e) {
          return e.isInt() && this.value === e.value;
        }
        getAsNumber() {
          return this.value;
        }
        toString() {
          return this.value.toFixed();
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.value;
        }
        toJson() {
          return this.value;
        }
        toBytes(e) {
          e.writeInt(this.value);
        }
        static create() {
          return new a(0);
        }
        static fromJson(e) {
          return new a(s.L.readInt(e) ?? 0);
        }
        static fromBytes(e) {
          return new a(e.readInt());
        }
      }
      i.D.register(n.t.Int, a);
    },
    59276: (e, t, r) => {
      "use strict";
      r.d(t, { U: () => u });
      var s = r(13402),
        i = r(36595),
        n = r(96667),
        a = r(40623),
        o = r(22749);
      class u extends i.h {
        constructor(e) {
          super(
            Array.from(e ?? [], (e) => ("bigint" == typeof e || Array.isArray(e) ? new n.l(e) : e)),
          );
        }
        getId() {
          return o.t.LongArray;
        }
        equals(e) {
          return (
            e.isLongArray() &&
            this.length === e.length &&
            this.items.every((t, r) => t.equals(e.items[r]))
          );
        }
        getType() {
          return o.t.Long;
        }
        get length() {
          return this.items.length;
        }
        toString() {
          return "[I;" + this.items.map((e) => e.toString()).join(",") + "]";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.items.map((e) => e.getAsPair());
        }
        toJson() {
          return this.items.map((e) => e.getAsPair());
        }
        toBytes(e) {
          for (let t of (e.writeInt(this.items.length), this.items)) {
            let [r, s] = t.getAsPair();
            (e.writeInt(r), e.writeInt(s));
          }
        }
        static create() {
          return new u();
        }
        static fromJson(e) {
          return new u(
            s.LM.readArray(e, (e) => s.LM.readPair(e, (e) => s.LM.readNumber(e) ?? 0) ?? [0, 0]) ??
              [],
          );
        }
        static fromBytes(e) {
          let t = e.readInt(),
            r = [];
          for (let s = 0; s < t; s += 1) r.push([e.readInt(), e.readInt()]);
          return new u(r);
        }
      }
      a.D.register(o.t.LongArray, u);
    },
    59410: (e) => {
      function t(e) {
        return (
          !!e.constructor &&
          "function" == typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      }
      e.exports = function (e) {
        var r;
        return (
          null != e &&
          (t(e) ||
            ("function" == typeof (r = e).readFloatLE &&
              "function" == typeof r.slice &&
              t(r.slice(0, 0))) ||
            !!e._isBuffer)
        );
      };
    },
    61955: (e, t, r) => {
      "use strict";
      r(69185);
    },
    63281: (e, t, r) => {
      "use strict";
      r.d(t, { N: () => i });
      var s = r(98169);
      class i {
        v1;
        v2;
        constructor(e, t) {
          ((this.v1 = e), (this.v2 = t));
        }
        vertices() {
          return [this.v1, this.v2];
        }
        forEach(e) {
          return (e(this.v1), e(this.v2), this);
        }
        transform(e) {
          return (this.forEach((t) => t.transform(e)), this);
        }
        setColor(e) {
          return (this.forEach((t) => (t.color = e)), this);
        }
        toString() {
          return `Line(${this.v1.pos.toString()}, ${this.v2.pos.toString()})`;
        }
        static fromPoints(e, t) {
          return new i(s.L.fromPos(e), s.L.fromPos(t));
        }
      }
    },
    64362: (e, t, r) => {
      "use strict";
      var s = r(40623),
        i = r(22749);
      class n extends s.D {
        static INSTANCE = new n();
        constructor() {
          super();
        }
        getId() {
          return i.t.End;
        }
        equals(e) {
          return e.isEnd();
        }
        toString() {
          return "END";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return null;
        }
        toJson() {
          return null;
        }
        toBytes() {}
        static create() {
          return n.INSTANCE;
        }
        static fromJson() {
          return n.INSTANCE;
        }
        static fromBytes() {
          return n.INSTANCE;
        }
      }
      s.D.register(i.t.End, n);
    },
    65808: (e, t, r) => {
      "use strict";
      r.d(t, { F7: () => M, Yl: () => i });
      var s,
        i,
        n,
        a,
        o,
        u,
        l,
        h,
        c,
        d,
        f,
        m,
        g,
        p,
        w = r(45723),
        x = r(19023),
        v = r(13402);
      (!(function (e) {
        let t = (e) => new M.HolderHolder(w.Rd.parser(h.DENSITY_FUNCTION, M.fromJson)(e));
        ((e.fromJson = function (e) {
          let r = v.LM.readObject(e) ?? {};
          return {
            barrier: t(r.barrier),
            fluidLevelFloodedness: t(r.fluid_level_floodedness),
            fluidLevelSpread: t(r.fluid_level_spread),
            lava: t(r.lava),
            temperature: t(r.temperature),
            vegetation: t(r.vegetation),
            continents: t(r.continents),
            erosion: t(r.erosion),
            depth: t(r.depth),
            ridges: t(r.ridges),
            preliminarySurfaceLevel: t(r.preliminary_surface_level),
            finalDensity: t(r.final_density),
            veinToggle: t(r.vein_toggle),
            veinRidged: t(r.vein_ridged),
            veinGap: t(r.vein_gap),
          };
        }),
          (e.create = function (e) {
            return {
              barrier: M.Constant.ZERO,
              fluidLevelFloodedness: M.Constant.ZERO,
              fluidLevelSpread: M.Constant.ZERO,
              lava: M.Constant.ZERO,
              temperature: M.Constant.ZERO,
              vegetation: M.Constant.ZERO,
              continents: M.Constant.ZERO,
              erosion: M.Constant.ZERO,
              depth: M.Constant.ZERO,
              ridges: M.Constant.ZERO,
              preliminarySurfaceLevel: M.Constant.ZERO,
              finalDensity: M.Constant.ZERO,
              veinToggle: M.Constant.ZERO,
              veinRidged: M.Constant.ZERO,
              veinGap: M.Constant.ZERO,
              ...e,
            };
          }),
          (e.mapAll = function (e, t) {
            return {
              barrier: e.barrier.mapAll(t),
              fluidLevelFloodedness: e.fluidLevelFloodedness.mapAll(t),
              fluidLevelSpread: e.fluidLevelSpread.mapAll(t),
              lava: e.lava.mapAll(t),
              temperature: e.temperature.mapAll(t),
              vegetation: e.vegetation.mapAll(t),
              continents: e.continents.mapAll(t),
              erosion: e.erosion.mapAll(t),
              depth: e.depth.mapAll(t),
              ridges: e.ridges.mapAll(t),
              preliminarySurfaceLevel: e.preliminarySurfaceLevel.mapAll(t),
              finalDensity: e.finalDensity.mapAll(t),
              veinToggle: e.veinToggle.mapAll(t),
              veinRidged: e.veinRidged.mapAll(t),
              veinGap: e.veinGap.mapAll(t),
            };
          }));
        let r = new Map();
        e.instantiate = function (e, t) {
          let s = t.key()?.toString();
          if (!s) throw Error("Cannot instantiate noise from direct holder");
          let i = e.seedKey(),
            n = r.get(s);
          if (n && n[0] === i[0] && n[1] === i[1]) return n[2];
          let a = new x.ob(e.fromHashOf(s), t.value());
          return (r.set(s, [i[0], i[1], a]), a);
        };
      })(s || (s = {})),
        (function (e) {
          function t(e) {
            return e.ySize << 2;
          }
          ((e.fromJson = function (e) {
            let t = v.LM.readObject(e) ?? {};
            return {
              minY: v.LM.readInt(t.min_y) ?? 0,
              height: v.LM.readInt(t.height) ?? 256,
              xzSize: v.LM.readInt(t.size_horizontal) ?? 1,
              ySize: v.LM.readInt(t.size_vertical) ?? 1,
            };
          }),
            (e.create = function (e) {
              return { minY: 0, height: 256, xzSize: 1, ySize: 1, ...e };
            }),
            (e.cellHeight = t),
            (e.cellWidth = function (e) {
              return e.xzSize << 2;
            }),
            (e.cellCountY = function (e) {
              return e.height / t(e);
            }),
            (e.minCellY = function (e) {
              return Math.floor(e.minY / t(e));
            }));
        })(i || (i = {})),
        (function (e) {
          ((e.fromJson = function (e) {
            let t = v.LM.readObject(e) ?? {};
            return {
              target: v.LM.readNumber(t.target) ?? 0,
              size: v.LM.readInt(t.size) ?? 0,
              offset: v.LM.readInt(t.offset) ?? 0,
            };
          }),
            (e.apply = function (e, t, r) {
              if (e.size <= 0) return t;
              let s = (r - e.offset) / e.size;
              return (0, x.MV)(e.target, t, s);
            }));
        })(n || (n = {})),
        (function (e) {
          function t(e) {
            return () => e;
          }
          function r(e) {
            return (t) => t.minY + e;
          }
          function s(e) {
            return (t) => t.minY + t.height - 1 - e;
          }
          ((e.fromJson = function (e) {
            let i = v.LM.readObject(e) ?? {};
            return void 0 !== i.absolute
              ? t(v.LM.readNumber(i.absolute) ?? 0)
              : void 0 !== i.above_bottom
                ? r(v.LM.readNumber(i.above_bottom) ?? 0)
                : void 0 !== i.below_top
                  ? s(v.LM.readNumber(i.below_top) ?? 0)
                  : () => 0;
          }),
            (e.absolute = t),
            (e.aboveBottom = r),
            (e.belowTop = s));
        })(a || (a = {})));
      class b {
        rule;
        defaultBlock;
        surfaceNoise;
        surfaceSecondaryNoise;
        random;
        positionalRandoms;
        constructor(e, t, r) {
          ((this.rule = e),
            (this.defaultBlock = t),
            (this.random = x.NF.create(r).forkPositional()),
            (this.surfaceNoise = s.instantiate(this.random, h.SURFACE_NOISE)),
            (this.surfaceSecondaryNoise = s.instantiate(this.random, h.SURFACE_SECONDARY_NOISE)),
            (this.positionalRandoms = new Map()));
        }
        buildSurface(e, t, r, s) {
          let i = w.UV.minBlockX(e.pos),
            n = w.UV.minBlockZ(e.pos),
            a = new y(this, e, t, r, s),
            o = this.rule(a);
          for (let t = 0; t < 16; t += 1) {
            let r = i + t;
            for (let t = 0; t < 1; t += 1) {
              let s = n + t;
              a.updateXZ(r, s);
              let i = 0,
                u = Number.MIN_SAFE_INTEGER,
                l = Number.MAX_SAFE_INTEGER;
              for (let t = e.maxY; t >= e.minY; t -= 1) {
                let n = w.IX.create(r, t, s),
                  h = e.getBlockState(n);
                if (h.equals(w.Tm.AIR)) {
                  ((i = 0), (u = Number.MIN_SAFE_INTEGER));
                  continue;
                }
                if (h.isFluid()) {
                  u === Number.MIN_SAFE_INTEGER && (u = t + 1);
                  continue;
                }
                if (l >= t) {
                  l = Number.MIN_SAFE_INTEGER;
                  for (let i = t - 1; i >= e.minY; i -= 1) {
                    let t = e.getBlockState(w.IX.create(r, i, s));
                    if (t.equals(w.Tm.AIR) || t.isFluid()) {
                      l = i + 1;
                      break;
                    }
                  }
                }
                i += 1;
                let c = t - l + 1;
                if (!h.equals(this.defaultBlock)) continue;
                a.updateY(i, c, u, t);
                let d = o(r, t, s);
                d && e.setBlockState(n, d);
              }
            }
          }
        }
        getSurfaceDepth(e, t) {
          return (
            2.75 * this.surfaceNoise.sample(e, 0, t) +
            3 +
            0.25 * this.random.at(e, 0, t).nextDouble()
          );
        }
        getSurfaceSecondary(e, t) {
          return this.surfaceSecondaryNoise.sample(e, 0, t);
        }
        getRandom(e) {
          return (0, v.EB)(this.positionalRandoms, e, () => this.random.fromHashOf(e));
        }
      }
      class y {
        system;
        chunk;
        noiseChunk;
        context;
        getBiome;
        blockX = 0;
        blockY = 0;
        blockZ = 0;
        stoneDepthAbove = 0;
        stoneDepthBelow = 0;
        surfaceDepth = 0;
        waterHeight = 0;
        biome = () => "";
        surfaceSecondary = () => 0;
        minSurfaceLevel = () => 0;
        constructor(e, t, r, s, i) {
          ((this.system = e),
            (this.chunk = t),
            (this.noiseChunk = r),
            (this.context = s),
            (this.getBiome = i));
        }
        updateXZ(e, t) {
          ((this.blockX = e),
            (this.blockZ = t),
            (this.surfaceDepth = this.system.getSurfaceDepth(e, t)),
            (this.surfaceSecondary = (0, v.RZ)(() => this.system.getSurfaceSecondary(e, t))),
            (this.minSurfaceLevel = (0, v.RZ)(() => this.calculateMinSurfaceLevel(e, t))));
        }
        updateY(e, t, r, s) {
          ((this.blockY = s),
            (this.stoneDepthAbove = e),
            (this.stoneDepthBelow = t),
            (this.waterHeight = r),
            (this.biome = (0, v.RZ)(() =>
              this.getBiome(w.IX.create(this.blockX, this.blockY, this.blockZ)),
            )));
        }
        calculateMinSurfaceLevel(e, t) {
          let r = e >> 4,
            s = t >> 4,
            i = this.noiseChunk.getPreliminarySurfaceLevel(r << 4, s << 4),
            n = this.noiseChunk.getPreliminarySurfaceLevel((r + 1) << 4, s << 4),
            a = this.noiseChunk.getPreliminarySurfaceLevel(r << 4, (s + 1) << 4),
            o = this.noiseChunk.getPreliminarySurfaceLevel((r + 1) << 4, (s + 1) << 4);
          return (
            Math.floor((0, x.iB)((15 & e) / 16, (15 & t) / 16, i, n, a, o)) + this.surfaceDepth - 8
          );
        }
      }
      (!(function (e) {
        function t(e) {
          return () => () => e;
        }
        function r(e) {
          return (t) => {
            let r = e.map((e) => e(t));
            return (e, t, s) => {
              for (let i of r) {
                let r = i(e, t, s);
                if (r) return r;
              }
            };
          };
        }
        function s(e, t) {
          return (r) => (s, i, n) => {
            if (e(r)) return t(r)(s, i, n);
          };
        }
        ((e.NOOP = () => () => void 0),
          (e.fromJson = function (i) {
            let n = v.LM.readObject(i) ?? {};
            switch (v.LM.readString(n.type)?.replace(/^minecraft:/, "")) {
              case "block":
                return t(w.Tm.fromJson(n.result_state));
              case "sequence":
                return r(v.LM.readArray(n.sequence, e.fromJson) ?? []);
              case "condition":
                return s(u.fromJson(n.if_true), e.fromJson(n.then_run));
            }
            return e.NOOP;
          }),
          (e.block = t),
          (e.sequence = r),
          (e.condition = s));
      })(o || (o = {})),
        (function (e) {
          function t() {
            return (e) => e.blockY >= e.minSurfaceLevel();
          }
          function r(e) {
            let t = new Set(e);
            return (e) => t.has(e.biome());
          }
          function s(e) {
            return (t) => !e(t);
          }
          function i(e, t, r, s) {
            return (i) => {
              let n = s ? i.stoneDepthBelow : i.stoneDepthAbove;
              return (
                n <=
                1 +
                  e +
                  (t ? i.surfaceDepth : 0) +
                  (0 === r ? 0 : (0, x.Tj)(i.surfaceSecondary(), -1, 1, 0, r))
              );
            };
          }
          function n(e, t, r) {
            return (s) => {
              let i = t(s.context),
                n = r(s.context);
              if (s.blockY <= i) return !0;
              if (s.blockY >= n) return !1;
              let a = s.system.getRandom(e),
                o = (0, x.Tj)(s.blockY, i, n, 1, 0);
              return a.nextFloat() < o;
            };
          }
          function o(e, t, r) {
            return (s) => {
              if (s.waterHeight === Number.MIN_SAFE_INTEGER) return !0;
              let i = r ? s.stoneDepthAbove : 0;
              return s.blockY + i >= s.waterHeight + e + s.surfaceDepth * t;
            };
          }
          function u(e, t, r) {
            return (s) => {
              let i = r ? s.stoneDepthAbove : 0;
              return s.blockY + i >= e(s.context) + s.surfaceDepth * t;
            };
          }
          ((e.FALSE = () => !1),
            (e.TRUE = () => !0),
            (e.fromJson = function (l) {
              let h = v.LM.readObject(l) ?? {};
              switch (v.LM.readString(h.type)?.replace(/^minecraft:/, "")) {
                case "above_preliminary_surface":
                  return t();
                case "biome":
                  return r(v.LM.readArray(h.biome_is, (e) => v.LM.readString(e) ?? "") ?? []);
                case "not":
                  return s(e.fromJson(h.invert));
                case "stone_depth":
                  return i(
                    v.LM.readInt(h.offset) ?? 0,
                    v.LM.readBoolean(h.add_surface_depth) ?? !1,
                    v.LM.readInt(h.secondary_depth_range) ?? 0,
                    "ceiling" === v.LM.readString(h.surface_type),
                  );
                case "vertical_gradient":
                  return n(
                    v.LM.readString(h.random_name) ?? "",
                    a.fromJson(h.true_at_and_below),
                    a.fromJson(h.false_at_and_above),
                  );
                case "water":
                  return o(
                    v.LM.readInt(h.offset) ?? 0,
                    v.LM.readInt(h.surface_depth_multiplier) ?? 0,
                    v.LM.readBoolean(h.add_surface_depth) ?? !1,
                  );
                case "y_above":
                  return u(
                    a.fromJson(h.anchor),
                    v.LM.readInt(h.surface_depth_multiplier) ?? 0,
                    v.LM.readBoolean(h.add_surface_depth) ?? !1,
                  );
              }
              return e.FALSE;
            }),
            (e.abovePreliminarySurface = t),
            (e.biome = r),
            (e.not = s),
            (e.stoneDepth = i),
            (e.verticalGradient = n),
            (e.water = o),
            (e.yAbove = u));
        })(u || (u = {})),
        (function (e) {
          ((e.fromJson = function (e) {
            let t = v.LM.readObject(e) ?? {};
            return {
              surfaceRule: o.fromJson(t.surface_rule),
              noise: i.fromJson(t.noise),
              defaultBlock: w.Tm.fromJson(t.default_block),
              defaultFluid: w.Tm.fromJson(t.default_fluid),
              noiseRouter: s.fromJson(t.noise_router),
              seaLevel: v.LM.readInt(t.sea_level) ?? 0,
              disableMobGeneration: v.LM.readBoolean(t.disable_mob_generation) ?? !1,
              aquifersEnabled: v.LM.readBoolean(t.aquifers_enabled) ?? !1,
              oreVeinsEnabled: v.LM.readBoolean(t.ore_veins_enabled) ?? !1,
              legacyRandomSource: v.LM.readBoolean(t.legacy_random_source) ?? !1,
            };
          }),
            (e.create = function (e) {
              return {
                surfaceRule: o.NOOP,
                noise: i.create({}),
                defaultBlock: w.Tm.STONE,
                defaultFluid: w.Tm.WATER,
                noiseRouter: s.create({}),
                seaLevel: 0,
                disableMobGeneration: !1,
                aquifersEnabled: !1,
                oreVeinsEnabled: !1,
                legacyRandomSource: !1,
                ...e,
              };
            }));
        })(l || (l = {})),
        (function (e) {
          function t(t, r, s) {
            return e.NOISE.register(w.gw.create(t), x.lM.create(r, s), !0);
          }
          ((e.NOISE = w.OR.createAndRegister("worldgen/noise", x.lM.fromJson)),
            (e.DENSITY_FUNCTION = w.OR.createAndRegister("worldgen/density_function", (e) =>
              M.fromJson(e),
            )),
            (e.NOISE_SETTINGS = w.OR.createAndRegister("worldgen/noise_settings", l.fromJson)),
            (e.BIOME = w.OR.createAndRegister("worldgen/biome")),
            (e.SURFACE_NOISE = t("surface", -6, [1, 1, 1])),
            (e.SURFACE_SECONDARY_NOISE = t("surface_secondary", -6, [1, 1, 0, 1])));
        })(h || (h = {})));
      class M {
        minValue() {
          return -this.maxValue();
        }
        mapAll(e) {
          return e.map(this);
        }
      }
      !(function (e) {
        e.context = function (e, t, r) {
          return { x: e, y: t, z: r };
        };
        class t extends e {
          input;
          constructor(e) {
            (super(), (this.input = e));
          }
          compute(e) {
            return this.transform(e, this.input.compute(e));
          }
        }
        let r = w.Rd.parser(h.NOISE, x.lM.fromJson);
        e.fromJson = function e(t, o = e) {
          if ("string" == typeof t) return new i(w.Rd.reference(h.DENSITY_FUNCTION, w.gw.parse(t)));
          if ("number" == typeof t) return new s(t);
          let _ = v.LM.readObject(t) ?? {},
            P = v.LM.readString(_.type)?.replace(/^minecraft:/, "");
          switch (P) {
            case "blend_alpha":
              return new n(1, 0, 1);
            case "blend_offset":
            case "beardifier":
              return new n(0, -1 / 0, 1 / 0);
            case "old_blended_noise":
              return new a(
                v.LM.readNumber(_.xz_scale) ?? 1,
                v.LM.readNumber(_.y_scale) ?? 1,
                v.LM.readNumber(_.xz_factor) ?? 80,
                v.LM.readNumber(_.y_factor) ?? 160,
                v.LM.readNumber(_.smear_scale_multiplier) ?? 8,
              );
            case "flat_cache":
              return new u(o(_.argument));
            case "interpolated":
              return new f(o(_.argument));
            case "cache_2d":
              return new c(o(_.argument));
            case "cache_once":
              return new d(o(_.argument));
            case "cache_all_in_cell":
              return new l(o(_.argument));
            case "noise":
              return new m(
                v.LM.readNumber(_.xz_scale) ?? 1,
                v.LM.readNumber(_.y_scale) ?? 1,
                r(_.noise),
              );
            case "end_islands":
              return new g();
            case "find_top_surface":
              return new p(
                o(_.density),
                o(_.upper_bound),
                v.LM.readInt(_.lower_bound) ?? 0,
                v.LM.readInt(_.cell_height) ?? 1,
              );
            case "weird_scaled_sampler":
              return new y(o(_.input), v.LM.readEnum(_.rarity_value_mapper, b), r(_.noise));
            case "shifted_noise":
              return new M(
                o(_.shift_x),
                o(_.shift_y),
                o(_.shift_z),
                v.LM.readNumber(_.xz_scale) ?? 1,
                v.LM.readNumber(_.y_scale) ?? 1,
                r(_.noise),
              );
            case "range_choice":
              return new S(
                o(_.input),
                v.LM.readNumber(_.min_inclusive) ?? 0,
                v.LM.readNumber(_.max_exclusive) ?? 1,
                o(_.when_in_range),
                o(_.when_out_of_range),
              );
            case "shift_a":
              return new L(r(_.argument));
            case "shift_b":
              return new I(r(_.argument));
            case "shift":
              return new E(r(_.argument));
            case "blend_density":
              return new k(o(_.argument));
            case "clamp":
              return new N(o(_.input), v.LM.readNumber(_.min) ?? 0, v.LM.readNumber(_.max) ?? 1);
            case "abs":
            case "square":
            case "cube":
            case "half_negative":
            case "invert":
            case "quarter_negative":
            case "squeeze":
              return new A(P, o(_.argument));
            case "add":
            case "mul":
            case "min":
            case "max":
              return new T(v.LM.readEnum(P, R), o(_.argument1), o(_.argument2));
            case "spline":
              return new B(x.mu.fromJson(_.spline, o));
            case "constant":
              return new s(v.LM.readNumber(_.argument) ?? 0);
            case "y_clamped_gradient":
              return new C(
                v.LM.readInt(_.from_y) ?? -4064,
                v.LM.readInt(_.to_y) ?? 4062,
                v.LM.readNumber(_.from_value) ?? -4064,
                v.LM.readNumber(_.to_value) ?? 4062,
              );
          }
          return s.ZERO;
        };
        class s extends e {
          value;
          static ZERO = new s(0);
          static ONE = new s(1);
          constructor(e) {
            (super(), (this.value = e));
          }
          compute() {
            return this.value;
          }
          minValue() {
            return this.value;
          }
          maxValue() {
            return this.value;
          }
        }
        e.Constant = s;
        class i extends e {
          holder;
          constructor(e) {
            (super(), (this.holder = e));
          }
          compute(e) {
            return this.holder.value().compute(e);
          }
          minValue() {
            return this.holder.value().minValue();
          }
          maxValue() {
            return this.holder.value().maxValue();
          }
        }
        e.HolderHolder = i;
        class n extends e.Constant {
          min;
          max;
          constructor(e, t, r) {
            (super(e), (this.min = t), (this.max = r));
          }
          minValue() {
            return this.min;
          }
          maxValue() {
            return this.max;
          }
        }
        e.ConstantMinMax = n;
        class a extends e {
          xzScale;
          yScale;
          xzFactor;
          yFactor;
          smearScaleMultiplier;
          blendedNoise;
          constructor(e, t, r, s, i, n) {
            (super(),
              (this.xzScale = e),
              (this.yScale = t),
              (this.xzFactor = r),
              (this.yFactor = s),
              (this.smearScaleMultiplier = i),
              (this.blendedNoise = n));
          }
          compute(e) {
            return this.blendedNoise?.sample(e.x, e.y, e.z) ?? 0;
          }
          maxValue() {
            return this.blendedNoise?.maxValue ?? 0;
          }
        }
        e.OldBlendedNoise = a;
        class o extends e {
          wrapped;
          constructor(e) {
            (super(), (this.wrapped = e));
          }
          minValue() {
            return this.wrapped.minValue();
          }
          maxValue() {
            return this.wrapped.maxValue();
          }
        }
        class u extends o {
          lastQuartX;
          lastQuartZ;
          lastValue = 0;
          constructor(e) {
            super(e);
          }
          compute(t) {
            let r = t.x >> 2,
              s = t.z >> 2;
            return (
              (this.lastQuartX !== r || this.lastQuartZ !== s) &&
                ((this.lastValue = this.wrapped.compute(e.context(r << 2, 0, s << 2))),
                (this.lastQuartX = r),
                (this.lastQuartZ = s)),
              this.lastValue
            );
          }
          mapAll(e) {
            return e.map(new u(this.wrapped.mapAll(e)));
          }
        }
        e.FlatCache = u;
        class l extends o {
          constructor(e) {
            super(e);
          }
          compute(e) {
            return this.wrapped.compute(e);
          }
          mapAll(e) {
            return e.map(new l(this.wrapped.mapAll(e)));
          }
        }
        e.CacheAllInCell = l;
        class c extends o {
          lastBlockX;
          lastBlockZ;
          lastValue = 0;
          constructor(e) {
            super(e);
          }
          compute(e) {
            let t = e.x,
              r = e.z;
            return (
              (this.lastBlockX !== t || this.lastBlockZ !== r) &&
                ((this.lastValue = this.wrapped.compute(e)),
                (this.lastBlockX = t),
                (this.lastBlockZ = r)),
              this.lastValue
            );
          }
          mapAll(e) {
            return e.map(new c(this.wrapped.mapAll(e)));
          }
        }
        e.Cache2D = c;
        class d extends o {
          lastBlockX;
          lastBlockY;
          lastBlockZ;
          lastValue = 0;
          constructor(e) {
            super(e);
          }
          compute(e) {
            let t = e.x,
              r = e.y,
              s = e.z;
            return (
              (this.lastBlockX !== t || this.lastBlockY !== r || this.lastBlockZ !== s) &&
                ((this.lastValue = this.wrapped.compute(e)),
                (this.lastBlockX = t),
                (this.lastBlockY = r),
                (this.lastBlockZ = s)),
              this.lastValue
            );
          }
          mapAll(e) {
            return e.map(new d(this.wrapped.mapAll(e)));
          }
        }
        e.CacheOnce = d;
        class f extends o {
          cellWidth;
          cellHeight;
          values;
          constructor(e, t = 4, r = 4) {
            (super(e), (this.cellWidth = t), (this.cellHeight = r), (this.values = new Map()));
          }
          compute({ x: e, y: t, z: r }) {
            let s = this.cellWidth,
              i = this.cellHeight,
              n = Math.floor(e / s) * s,
              a = Math.floor(t / i) * i,
              o = Math.floor(r / s) * s,
              u = () => this.computeCorner(n, a, o),
              l = () => this.computeCorner(n, a, o + s),
              h = () => this.computeCorner(n, a + i, o),
              c = () => this.computeCorner(n, a + i, o + s),
              d = () => this.computeCorner(n + s, a, o),
              f = () => this.computeCorner(n + s, a, o + s),
              m = () => this.computeCorner(n + s, a + i, o),
              g = () => this.computeCorner(n + s, a + i, o + s);
            return (0, x.pT)(
              (((e % s) + s) % s) / s,
              (((t % i) + i) % i) / i,
              (((r % s) + s) % s) / s,
              u,
              d,
              h,
              m,
              l,
              f,
              c,
              g,
            );
          }
          computeCorner(t, r, s) {
            return (0, v.EB)(this.values, `${t} ${r} ${s}`, () =>
              this.wrapped.compute(e.context(t, r, s)),
            );
          }
          mapAll(e) {
            return e.map(new f(this.wrapped.mapAll(e)));
          }
          withCellSize(e, t) {
            return new f(this.wrapped, e, t);
          }
        }
        e.Interpolated = f;
        class m extends e {
          xzScale;
          yScale;
          noiseData;
          noise;
          constructor(e, t, r, s) {
            (super(),
              (this.xzScale = e),
              (this.yScale = t),
              (this.noiseData = r),
              (this.noise = s));
          }
          compute(e) {
            return (
              this.noise?.sample(e.x * this.xzScale, e.y * this.yScale, e.z * this.xzScale) ?? 0
            );
          }
          maxValue() {
            return this.noise?.maxValue ?? 2;
          }
        }
        e.Noise = m;
        class g extends e {
          islandNoise;
          constructor(e) {
            super();
            let t = new x.Vc(e ?? BigInt(0));
            (t.consume(17292), (this.islandNoise = new x.hc(t)));
          }
          getHeightValue(e, t) {
            let r = Math.floor(e / 2),
              s = Math.floor(t / 2),
              i = e % 2,
              n = t % 2,
              a = (0, x.qE)(100 - 8 * Math.sqrt(e * e + t * t), -100, 80);
            for (let e = -12; e <= 12; e += 1)
              for (let t = -12; t <= 12; t += 1) {
                let o = r + e,
                  u = s + t;
                if (o * o + u * u <= 4096 || this.islandNoise.sample2D(o, u) >= -0.9) continue;
                let l = i + 2 * e,
                  h = n + 2 * t,
                  c =
                    100 -
                    Math.sqrt(l * l + h * h) *
                      (((3439 * Math.abs(o) + 147 * Math.abs(u)) % 13) + 9);
                a = Math.max(a, (0, x.qE)(c, -100, 80));
              }
            return a;
          }
          compute({ x: e, y: t, z: r }) {
            return (this.getHeightValue(Math.floor(e / 8), Math.floor(r / 8)) - 8) / 128;
          }
          minValue() {
            return -0.84375;
          }
          maxValue() {
            return 0.5625;
          }
        }
        e.EndIslands = g;
        class p extends e {
          density;
          upperBound;
          lowerBound;
          cellHeight;
          constructor(e, t, r, s) {
            (super(),
              (this.density = e),
              (this.upperBound = t),
              (this.lowerBound = r),
              (this.cellHeight = s));
          }
          compute(t) {
            let r = Math.floor(this.upperBound.compute(t) / this.cellHeight) * this.cellHeight;
            if (r < this.lowerBound) return this.lowerBound;
            for (let s = r; s >= this.lowerBound; s -= this.cellHeight)
              if (this.density.compute(e.context(t.x, s, t.z)) > 0) return s;
            return this.lowerBound;
          }
          mapAll(e) {
            return e.map(
              new p(
                this.density.mapAll(e),
                this.upperBound.mapAll(e),
                this.lowerBound,
                this.cellHeight,
              ),
            );
          }
          minValue() {
            return this.lowerBound;
          }
          maxValue() {
            return Math.max(this.lowerBound, this.upperBound.maxValue());
          }
        }
        e.FindTopSurface = p;
        let b = ["type_1", "type_2"];
        class y extends t {
          rarityValueMapper;
          noiseData;
          noise;
          static ValueMapper = { type_1: y.rarityValueMapper1, type_2: y.rarityValueMapper2 };
          mapper;
          constructor(e, t, r, s) {
            (super(e),
              (this.rarityValueMapper = t),
              (this.noiseData = r),
              (this.noise = s),
              (this.mapper = y.ValueMapper[this.rarityValueMapper]));
          }
          transform(e, t) {
            if (!this.noise) return 0;
            let r = this.mapper(t);
            return r * Math.abs(this.noise.sample(e.x / r, e.y / r, e.z / r));
          }
          mapAll(e) {
            return e.map(
              new y(this.input.mapAll(e), this.rarityValueMapper, this.noiseData, this.noise),
            );
          }
          minValue() {
            return 0;
          }
          maxValue() {
            return "type_1" === this.rarityValueMapper ? 2 : 3;
          }
          static rarityValueMapper1(e) {
            return e < -0.5 ? 0.75 : e < 0 ? 1 : e < 0.5 ? 1.5 : 2;
          }
          static rarityValueMapper2(e) {
            return e < -0.75 ? 0.5 : e < -0.5 ? 0.75 : e < 0.5 ? 1 : e < 0.75 ? 2 : 3;
          }
        }
        e.WeirdScaledSampler = y;
        class M extends m {
          shiftX;
          shiftY;
          shiftZ;
          constructor(e, t, r, s, i, n, a) {
            (super(s, i, n, a), (this.shiftX = e), (this.shiftY = t), (this.shiftZ = r));
          }
          compute(e) {
            let t = e.x * this.xzScale + this.shiftX.compute(e),
              r = e.y * this.yScale + this.shiftY.compute(e),
              s = e.z * this.xzScale + this.shiftZ.compute(e);
            return this.noise?.sample(t, r, s) ?? 0;
          }
          mapAll(e) {
            return e.map(
              new M(
                this.shiftX.mapAll(e),
                this.shiftY.mapAll(e),
                this.shiftZ.mapAll(e),
                this.xzScale,
                this.yScale,
                this.noiseData,
                this.noise,
              ),
            );
          }
        }
        e.ShiftedNoise = M;
        class S extends e {
          input;
          minInclusive;
          maxExclusive;
          whenInRange;
          whenOutOfRange;
          constructor(e, t, r, s, i) {
            (super(),
              (this.input = e),
              (this.minInclusive = t),
              (this.maxExclusive = r),
              (this.whenInRange = s),
              (this.whenOutOfRange = i));
          }
          compute(e) {
            let t = this.input.compute(e);
            return this.minInclusive <= t && t < this.maxExclusive
              ? this.whenInRange.compute(e)
              : this.whenOutOfRange.compute(e);
          }
          mapAll(e) {
            return e.map(
              new S(
                this.input.mapAll(e),
                this.minInclusive,
                this.maxExclusive,
                this.whenInRange.mapAll(e),
                this.whenOutOfRange.mapAll(e),
              ),
            );
          }
          minValue() {
            return Math.min(this.whenInRange.minValue(), this.whenOutOfRange.minValue());
          }
          maxValue() {
            return Math.max(this.whenInRange.maxValue(), this.whenOutOfRange.maxValue());
          }
        }
        e.RangeChoice = S;
        class _ extends e {
          noiseData;
          offsetNoise;
          constructor(e, t) {
            (super(), (this.noiseData = e), (this.offsetNoise = t));
          }
          compute(e) {
            return (this.offsetNoise?.sample(0.25 * e.x, 0.25 * e.y, 0.25 * e.z) ?? 0) * 4;
          }
          maxValue() {
            return (this.offsetNoise?.maxValue ?? 2) * 4;
          }
        }
        e.ShiftNoise = _;
        class L extends _ {
          constructor(e, t) {
            super(e, t);
          }
          compute(t) {
            return super.compute(e.context(t.x, 0, t.z));
          }
          withNewNoise(e) {
            return new L(this.noiseData, e);
          }
        }
        e.ShiftA = L;
        class I extends _ {
          constructor(e, t) {
            super(e, t);
          }
          compute(t) {
            return super.compute(e.context(t.z, t.x, 0));
          }
          withNewNoise(e) {
            return new I(this.noiseData, e);
          }
        }
        e.ShiftB = I;
        class E extends _ {
          constructor(e, t) {
            super(e, t);
          }
          withNewNoise(e) {
            return new E(this.noiseData, e);
          }
        }
        e.Shift = E;
        class k extends t {
          constructor(e) {
            super(e);
          }
          transform(e, t) {
            return t;
          }
          mapAll(e) {
            return e.map(new k(this.input.mapAll(e)));
          }
          minValue() {
            return -1 / 0;
          }
          maxValue() {
            return 1 / 0;
          }
        }
        e.BlendDensity = k;
        class N extends t {
          min;
          max;
          constructor(e, t, r) {
            (super(e), (this.min = t), (this.max = r));
          }
          transform(e, t) {
            return (0, x.qE)(t, this.min, this.max);
          }
          mapAll(e) {
            return e.map(new N(this.input.mapAll(e), this.min, this.max));
          }
          minValue() {
            return this.min;
          }
          maxValue() {
            return this.max;
          }
        }
        e.Clamp = N;
        class A extends t {
          type;
          min;
          max;
          static MappedTypes = {
            abs: (e) => Math.abs(e),
            square: (e) => e * e,
            cube: (e) => e * e * e,
            half_negative: (e) => (e > 0 ? e : 0.5 * e),
            invert: (e) => 1 / e,
            quarter_negative: (e) => (e > 0 ? e : 0.25 * e),
            squeeze: (e) => {
              let t = (0, x.qE)(e, -1, 1);
              return t / 2 - (t * t * t) / 24;
            },
          };
          transformer;
          constructor(e, t, r, s) {
            (super(t),
              (this.type = e),
              (this.min = r),
              (this.max = s),
              (this.transformer = A.MappedTypes[this.type]));
          }
          transform(e, t) {
            return this.transformer(t);
          }
          mapAll(e) {
            return e.map(new A(this.type, this.input.mapAll(e)));
          }
          minValue() {
            return this.min ?? -1 / 0;
          }
          maxValue() {
            return this.max ?? 1 / 0;
          }
          withMinMax() {
            let e = this.input.minValue(),
              t = this.transformer(e),
              r = this.transformer(this.input.maxValue());
            return (
              "invert" === this.type
                ? t < 0 && r > 0
                  ? ([t, r] = [-1 / 0, 1 / 0])
                  : ([t, r] = [r, t])
                : ("abs" === this.type || "square" === this.type) &&
                  ((r = Math.max(t, r)), (t = Math.max(0, e))),
              new A(this.type, this.input, t, r)
            );
          }
        }
        e.Mapped = A;
        let R = ["add", "mul", "min", "max"];
        class T extends e {
          type;
          argument1;
          argument2;
          min;
          max;
          constructor(e, t, r, s, i) {
            (super(),
              (this.type = e),
              (this.argument1 = t),
              (this.argument2 = r),
              (this.min = s),
              (this.max = i));
          }
          compute(e) {
            let t = this.argument1.compute(e);
            switch (this.type) {
              case "add":
                return t + this.argument2.compute(e);
              case "mul":
                return 0 === t ? 0 : t * this.argument2.compute(e);
              case "min":
                return t < this.argument2.minValue() ? t : Math.min(t, this.argument2.compute(e));
              case "max":
                return t > this.argument2.maxValue() ? t : Math.max(t, this.argument2.compute(e));
            }
          }
          mapAll(e) {
            return e.map(new T(this.type, this.argument1.mapAll(e), this.argument2.mapAll(e)));
          }
          minValue() {
            return this.min ?? -1 / 0;
          }
          maxValue() {
            return this.max ?? 1 / 0;
          }
          withMinMax() {
            let e,
              t,
              r = this.argument1.minValue(),
              s = this.argument2.minValue(),
              i = this.argument1.maxValue(),
              n = this.argument2.maxValue();
            switch (
              (("min" === this.type || "max" === this.type) &&
                (r >= n || s >= i) &&
                console.warn(`Creating a ${this.type} function between two non-overlapping inputs`),
              this.type)
            ) {
              case "add":
                ((e = r + s), (t = i + n));
                break;
              case "mul":
                ((e =
                  r > 0 && s > 0
                    ? r * s || 0
                    : i < 0 && n < 0
                      ? i * n || 0
                      : Math.min(r * n || 0, s * i || 0)),
                  (t =
                    r > 0 && s > 0
                      ? i * n || 0
                      : i < 0 && n < 0
                        ? r * s || 0
                        : Math.max(r * s || 0, i * n || 0)));
                break;
              case "min":
                ((e = Math.min(r, s)), (t = Math.min(i, n)));
                break;
              case "max":
                ((e = Math.max(r, s)), (t = Math.max(i, n)));
            }
            return new T(this.type, this.argument1, this.argument2, e, t);
          }
        }
        e.Ap2 = T;
        class B extends e {
          spline;
          constructor(e) {
            (super(), (this.spline = e));
          }
          compute(e) {
            return this.spline.compute(e);
          }
          mapAll(t) {
            let r = this.spline.mapAll((r) => (r instanceof e ? r.mapAll(t) : r));
            return (r.calculateMinMax(), t.map(new B(r)));
          }
          minValue() {
            return this.spline.min();
          }
          maxValue() {
            return this.spline.max();
          }
        }
        e.Spline = B;
        class C extends e {
          fromY;
          toY;
          fromValue;
          toValue;
          constructor(e, t, r, s) {
            (super(), (this.fromY = e), (this.toY = t), (this.fromValue = r), (this.toValue = s));
          }
          compute(e) {
            return (0, x.Vk)(e.y, this.fromY, this.toY, this.fromValue, this.toValue);
          }
          minValue() {
            return Math.min(this.fromValue, this.toValue);
          }
          maxValue() {
            return Math.max(this.fromValue, this.toValue);
          }
        }
        e.YClampedGradient = C;
      })(M || (M = {}));
      class S {
        level;
        type;
        constructor(e, t) {
          ((this.level = e), (this.type = t));
        }
        at(e) {
          return e < this.level ? this.type : w.Tm.AIR;
        }
      }
      (((c || (c = {})).createDisabled = function (e) {
        return {
          compute({ x: t, y: r, z: s }, i) {
            if (!(i > 0)) return e(t, r, s).at(r);
          },
        };
      }),
        (function (e) {
          function t(e) {
            return (t, r) => e(r);
          }
          function r(e, t) {
            return (r, s) => {
              let i = e(s),
                n = t(s);
              return i > n ? i : r.nextInt(n - i + 1) + i;
            };
          }
          function s(e, t, r = 1) {
            return (s, i) => {
              let n = e(i),
                a = t(i);
              if (a - n - r + 1 <= 0) return n;
              {
                let e = s.nextInt(a - n - r + 1);
                return s.nextInt(e + r) + n;
              }
            };
          }
          function i(e, t, r = 1) {
            return (s, i) => {
              let n = e(i),
                a = t(i);
              if (a - n - r + 1 <= 0) return n;
              {
                let e = (0, x.vz)(s, n + r, a),
                  t = (0, x.vz)(s, n, e - 1);
                return (0, x.vz)(s, n, t - 1 + r);
              }
            };
          }
          function n(e, t, r = 0) {
            return (s, i) => {
              let n = e(i),
                a = t(i);
              if (n > a) return n;
              {
                let e = a - n;
                if (r >= e) return (0, x.sb)(s, n, a);
                {
                  let t = (e - r) / 2;
                  return n + (0, x.sb)(s, 0, e - t) + (0, x.sb)(s, 0, t);
                }
              }
            };
          }
          function o(e) {
            let t = e.reduce((e, t, r) => e + t.weight, 0);
            return (r, s) => {
              let i = r.nextInt(t);
              for (let t of e) if ((i -= t.weight) <= 0) return t.data(r, s);
              return 0;
            };
          }
          ((e.fromJson = function e(u) {
            let l = v.LM.readObject(u) ?? {};
            switch (v.LM.readString(l.type)?.replace(/^minecraft:/, "")) {
              case void 0:
                return t(a.fromJson(u));
              case "constant":
                return t(a.fromJson(l.value));
              case "uniform":
                return r(a.fromJson(l.min_inclusive), a.fromJson(l.max_inclusive));
              case "biased_to_bottom":
                return s(
                  a.fromJson(l.min_inclusive),
                  a.fromJson(l.max_inclusive),
                  v.LM.readInt(l.inner),
                );
              case "very_biased_to_bottom":
                return i(
                  a.fromJson(l.min_inclusive),
                  a.fromJson(l.max_inclusive),
                  v.LM.readInt(l.inner),
                );
              case "trapezoid":
                return n(
                  a.fromJson(l.min_inclusive),
                  a.fromJson(l.max_inclusive),
                  v.LM.readInt(l.plateau),
                );
              case "weighted_list":
                return o(
                  v.LM.readArray(l.distribution, (t) => {
                    let r = v.LM.readObject(t) ?? {};
                    return { weight: v.LM.readInt(r.weight) ?? 1, data: e(r.data) };
                  }) ?? [],
                );
            }
            return () => 0;
          }),
            (e.constant = t),
            (e.uniform = r),
            (e.biased_to_bottom = s),
            (e.very_biased_to_bottom = i),
            (e.trapezoid = n),
            (e.weighted_list = o));
        })(d || (d = {})),
        ((f || (f = {})).fromJson = function (e) {
          if (
            "string" == typeof e &&
            ("WORLD_SURFACE_WG" === e ||
              "WORLD_SURFACE" === e ||
              "OCEAN_FLOOR_WG" === e ||
              "OCEAN_FLOOR" === e ||
              "MOTION_BLOCKING" === e ||
              "MOTION_BLOCKING_NO_LEAVES" === e)
          )
            return e;
        }));
      class _ {
        cellCountXZ;
        cellCountY;
        cellNoiseMinY;
        minX;
        minZ;
        settings;
        cellWidth;
        cellHeight;
        firstCellX;
        firstCellZ;
        firstNoiseX;
        firstNoiseZ;
        noiseSizeXZ;
        preliminarySurfaceLevelCache = new Map();
        aquifer;
        materialRule;
        preliminarySurfaceLevel;
        constructor(e, t, r, s, n, a, o, u, l) {
          ((this.cellCountXZ = e),
            (this.cellCountY = t),
            (this.cellNoiseMinY = r),
            (this.minX = n),
            (this.minZ = a),
            (this.settings = o),
            (this.cellWidth = i.cellWidth(o)),
            (this.cellHeight = i.cellHeight(o)),
            (this.firstCellX = Math.floor(n / this.cellWidth)),
            (this.firstCellZ = Math.floor(a / this.cellWidth)),
            (this.firstNoiseX = n >> 2),
            (this.firstNoiseZ = a >> 2),
            (this.noiseSizeXZ = (e * this.cellWidth) >> 2),
            (this.aquifer = c.createDisabled(l)));
          let h = s.router.finalDensity;
          ((this.materialRule = m.fromList([(e) => this.aquifer.compute(e, h.compute(e))])),
            (this.preliminarySurfaceLevel = s.router.preliminarySurfaceLevel));
        }
        getFinalState(e, t, r) {
          return this.materialRule({ x: e, y: t, z: r });
        }
        getPreliminarySurfaceLevel(e, t) {
          return (0, v.EB)(this.preliminarySurfaceLevelCache, w.UV.asLong(e, t), () =>
            Math.floor(this.preliminarySurfaceLevel.compute(M.context(e << 2, 0, t << 2))),
          );
        }
      }
      (m || (m = {})).fromList = function (e) {
        return (t) => {
          for (let r of e) {
            let e = r(t);
            if (e) return e;
          }
        };
      };
      class L {
        biomeSource;
        settings;
        noiseChunkCache;
        globalFluidPicker;
        constructor(e, t) {
          ((this.biomeSource = e), (this.settings = t), (this.noiseChunkCache = new Map()));
          let r = new S(-54, w.Tm.LAVA),
            s = new S(t.seaLevel, t.defaultFluid);
          this.globalFluidPicker = (e, i, n) => (i < Math.min(-54, t.seaLevel) ? r : s);
        }
        getBaseHeight(e, t, r, s) {
          let i;
          return (
            (i =
              "OCEAN_FLOOR" === r || "OCEAN_FLOOR_WG" === r
                ? (e) => e.equals(w.Tm.STONE)
                : (e) => !e.equals(w.Tm.AIR)),
            this.iterateNoiseColumn(s, e, t, void 0, i, w.Tm.STONE) ?? this.settings.noise.minY
          );
        }
        iterateNoiseColumn(e, t, r, s, n, a) {
          let o = this.settings.noise.minY,
            u = i.cellHeight(this.settings.noise),
            l = Math.floor(o / u),
            h = Math.floor(this.settings.noise.height / u);
          if (h <= 0) return;
          let c = i.cellWidth(this.settings.noise),
            d = new _(
              1,
              h,
              l,
              e,
              Math.floor(t / c),
              Math.floor(r / c),
              this.settings.noise,
              this.settings.aquifersEnabled,
              this.globalFluidPicker,
            );
          for (let e = h - 1; e >= 0; e -= 1)
            for (let i = u - 1; i >= 0; i -= 1) {
              let h = (l + e) * u + i,
                c = d.getFinalState(t, h, r) ?? a ?? this.settings.defaultBlock;
              if ((void 0 !== s && (s[h + o] = c), void 0 !== n && n(c))) return h + 1;
            }
        }
        fill(e, t, r = !1) {
          let s = Math.max(t.minY, this.settings.noise.minY),
            n = Math.min(t.maxY, this.settings.noise.minY + this.settings.noise.height),
            a = i.cellWidth(this.settings.noise),
            o = i.cellHeight(this.settings.noise),
            u = Math.floor(16 / a),
            l = Math.floor(s / o),
            h = Math.floor((n - s) / o),
            c = w.UV.minBlockX(t.pos),
            d = w.UV.minBlockZ(t.pos),
            f = this.getOrCreateNoiseChunk(e, t);
          for (let e = 0; e < u; e += 1)
            for (let s = 0; s < (r ? 1 : u); s += 1) {
              let i = t.getOrCreateSection(t.sectionsCount - 1);
              for (let n = h - 1; n >= 0; n -= 1)
                for (let u = o - 1; u >= 0; u -= 1) {
                  let h = (l + n) * o + u,
                    m = 15 & h,
                    g = t.getSectionIndex(h);
                  t.getSectionIndex(i.minBlockY) !== g && (i = t.getOrCreateSection(g));
                  for (let t = 0; t < a; t += 1) {
                    let n = c + e * a + t,
                      o = 15 & n;
                    for (let e = 0; e < (r ? 1 : a); e += 1) {
                      let t = d + s * a + e,
                        r = 15 & t,
                        u = f.getFinalState(n, h, t) ?? this.settings.defaultBlock;
                      i.setBlockState(o, m, r, u);
                    }
                  }
                }
            }
        }
        buildSurface(e, t, r = "minecraft:plains") {
          let s = this.getOrCreateNoiseChunk(e, t),
            i = this.settings.noise;
          e.surfaceSystem.buildSurface(t, s, i, () => r);
        }
        computeBiome(e, t, r, s) {
          return this.biomeSource.getBiome(t, r, s, e.sampler);
        }
        getOrCreateNoiseChunk(e, t) {
          return (0, v.EB)(this.noiseChunkCache, w.UV.toLong(t.pos), () => {
            let r = Math.max(t.minY, this.settings.noise.minY),
              s = Math.min(t.maxY, this.settings.noise.minY + this.settings.noise.height),
              n = i.cellWidth(this.settings.noise),
              a = i.cellHeight(this.settings.noise),
              o = Math.floor(r / a);
            return new _(
              Math.floor(16 / n),
              Math.floor((s - r) / a),
              o,
              e,
              w.UV.minBlockX(t.pos),
              w.UV.minBlockZ(t.pos),
              this.settings.noise,
              this.settings.aquifersEnabled,
              this.globalFluidPicker,
            );
          });
        }
      }
      var I = r(82084);
      class E {
        shift;
        biomes;
        n;
        constructor(e, t) {
          if (((this.shift = e), (this.biomes = t), 0 === t.length))
            throw Error("Cannot create checkerboard biome source without biomes");
          this.n = t.length;
        }
        getBiome(e, t, r) {
          let s = ((((e >> this.shift) + (r >> this.shift)) % this.n) + this.n) % this.n;
          return w.gw.parse(this.biomes[s].toString());
        }
        static fromJson(e) {
          let t = v.LM.readObject(e) ?? {};
          return new E(
            (v.LM.readInt(t.scale) ?? 2) + 2,
            "string" == typeof t.biomes
              ? [w.gw.parse(t.biomes)]
              : (v.LM.readArray(t.biomes, (e) => w.gw.parse(v.LM.readString(e) ?? "")) ?? []),
          );
        }
      }
      class k {
        biome;
        constructor(e) {
          this.biome = e;
        }
        getBiome() {
          return this.biome;
        }
        static fromJson(e) {
          let t = v.LM.readObject(e) ?? {};
          return new k(w.gw.parse(v.LM.readString(t.biome) ?? "plains"));
        }
      }
      !(function (e) {
        function t(e, t) {
          return "number" == typeof e ? new r(e, t ?? e) : e;
        }
        ((e.target = function (e, t, r, s, n, a) {
          return new i(e, t, r, s, n, a);
        }),
          (e.parameters = function (e, r, i, n, a, o, u) {
            return new s(t(e), t(r), t(i), t(n), t(a), t(o), u);
          }),
          (e.param = t));
        class r {
          min;
          max;
          constructor(e, t) {
            ((this.min = e), (this.max = t));
          }
          distance(e) {
            let t = ("number" == typeof e ? e : e.min) - this.max,
              r = this.min - ("number" == typeof e ? e : e.max);
            return t > 0 ? t : Math.max(r, 0);
          }
          union(e) {
            return new r(Math.min(this.min, e.min), Math.max(this.max, e.max));
          }
          static fromJson(e) {
            if ("number" == typeof e) return new r(e, e);
            let [t, s] = v.LM.readArray(e, (e) => v.LM.readNumber(e)) ?? [];
            return new r(t ?? 0, s ?? 0);
          }
        }
        e.Param = r;
        class s {
          temperature;
          humidity;
          continentalness;
          erosion;
          depth;
          weirdness;
          offset;
          constructor(e, t, r, s, i, n, a) {
            ((this.temperature = e),
              (this.humidity = t),
              (this.continentalness = r),
              (this.erosion = s),
              (this.depth = i),
              (this.weirdness = n),
              (this.offset = a));
          }
          fittness(e) {
            return (
              (0, x.Ew)(this.temperature.distance(e.temperature)) +
              (0, x.Ew)(this.humidity.distance(e.humidity)) +
              (0, x.Ew)(this.continentalness.distance(e.continentalness)) +
              (0, x.Ew)(this.erosion.distance(e.erosion)) +
              (0, x.Ew)(this.depth.distance(e.depth)) +
              (0, x.Ew)(this.weirdness.distance(e.weirdness)) +
              (0, x.Ew)(this.offset - e.offset)
            );
          }
          space() {
            return [
              this.temperature,
              this.humidity,
              this.continentalness,
              this.erosion,
              this.depth,
              this.weirdness,
              new r(this.offset, this.offset),
            ];
          }
          static fromJson(e) {
            let t = v.LM.readObject(e) ?? {};
            return new s(
              r.fromJson(t.temperature),
              r.fromJson(t.humidity),
              r.fromJson(t.continentalness),
              r.fromJson(t.erosion),
              r.fromJson(t.depth),
              r.fromJson(t.weirdness),
              v.LM.readNumber(t.offset) ?? 0,
            );
          }
        }
        e.ParamPoint = s;
        class i {
          temperature;
          humidity;
          continentalness;
          erosion;
          depth;
          weirdness;
          constructor(e, t, r, s, i, n) {
            ((this.temperature = e),
              (this.humidity = t),
              (this.continentalness = r),
              (this.erosion = s),
              (this.depth = i),
              (this.weirdness = n));
          }
          get offset() {
            return 0;
          }
          toArray() {
            return [
              this.temperature,
              this.humidity,
              this.continentalness,
              this.erosion,
              this.depth,
              this.weirdness,
              this.offset,
            ];
          }
        }
        e.TargetPoint = i;
        class n {
          things;
          index;
          constructor(e) {
            ((this.things = e), (this.index = new o(e)));
          }
          find(e) {
            return this.index.search(e, (e, t) => e.distance(t));
          }
        }
        e.Parameters = n;
        class a {
          temperature;
          humidity;
          continentalness;
          erosion;
          depth;
          weirdness;
          constructor(e, t, r, s, i, n) {
            ((this.temperature = e),
              (this.humidity = t),
              (this.continentalness = r),
              (this.erosion = s),
              (this.depth = i),
              (this.weirdness = n));
          }
          static fromRouter(t) {
            return new e.Sampler(
              t.temperature,
              t.vegetation,
              t.continents,
              t.erosion,
              t.depth,
              t.ridges,
            );
          }
          sample(t, r, s) {
            let i = M.context(t << 2, r << 2, s << 2);
            return e.target(
              this.temperature.compute(i),
              this.humidity.compute(i),
              this.continentalness.compute(i),
              this.erosion.compute(i),
              this.depth.compute(i),
              this.weirdness.compute(i),
            );
          }
        }
        e.Sampler = a;
        class o {
          static CHILDREN_PER_NODE = 10;
          root;
          last_leaf = null;
          constructor(e) {
            if (0 === e.length) throw Error("At least one point is required to build search tree");
            this.root = o.build(e.map(([e, t]) => new h(e, t)));
          }
          static build(e) {
            if (1 === e.length) return e[0];
            if (e.length <= o.CHILDREN_PER_NODE)
              return new l(
                e
                  .map((e) => {
                    let t = 0;
                    for (let r = 0; r < 7; r += 1) {
                      let s = e.space[r];
                      t += Math.abs((s.min + s.max) / 2);
                    }
                    return { key: t, node: e };
                  })
                  .sort((e, t) => e.key - t.key)
                  .map(({ node: e }) => e),
              );
            let t = 1 / 0,
              r = -1,
              s = [];
            for (let i = 0; i < 7; ++i) {
              e = o.sort(e, i, !1);
              let n = 0;
              for (let t of (s = o.bucketize(e))) n += o.area(t.space);
              t > n && ((t = n), (r = i));
            }
            return (
              (e = o.sort(e, r, !1)),
              (s = o.bucketize(e)),
              new l((s = o.sort(s, r, !0)).map((e) => o.build(e.children)))
            );
          }
          static sort(e, t, r) {
            return e
              .map((e) => {
                let s = e.space[t],
                  i = (s.min + s.max) / 2;
                return { key: r ? Math.abs(i) : i, node: e };
              })
              .sort((e, t) => e.key - t.key)
              .map(({ node: e }) => e);
          }
          static bucketize(e) {
            let t = [],
              r = [],
              s = Math.pow(10, Math.floor(Math.log(e.length - 0.01) / Math.log(10)));
            for (let i of e) (r.push(i), r.length < s || (t.push(new l(r)), (r = [])));
            return (0 !== r.length && t.push(new l(r)), t);
          }
          static area(e) {
            let t = 0;
            for (let r of e) t += Math.abs(r.max - r.min);
            return t;
          }
          search(e, t) {
            let r = this.root.search(e.toArray(), this.last_leaf, t);
            return ((this.last_leaf = r), r.thing());
          }
        }
        e.RTree = o;
        class u {
          space;
          constructor(e) {
            this.space = e;
          }
          distance(e) {
            let t = 0;
            for (let r = 0; r < 7; r += 1) t += (0, x.Ew)(this.space[r].distance(e[r]));
            return t;
          }
        }
        e.RNode = u;
        class l extends u {
          children;
          constructor(e) {
            (super(l.buildSpace(e)), (this.children = e));
          }
          static buildSpace(e) {
            let t = [...Array(7)].map(() => new r(1 / 0, -1 / 0));
            for (let r of e) t = [...Array(7)].map((e, s) => t[s].union(r.space[s]));
            return t;
          }
          search(e, t, r) {
            let s = t ? r(t, e) : 1 / 0,
              i = t;
            for (let t of this.children) {
              let n = r(t, e);
              if (s <= n) continue;
              let a = t.search(e, i, r);
              if (null === a) continue;
              let o = t == a ? n : r(a, e);
              if (0 === o) return a;
              s <= o || ((s = o), (i = a));
            }
            return i;
          }
        }
        e.RSubTree = l;
        class h extends u {
          thing;
          constructor(e, t) {
            (super(e.space()), (this.thing = t));
          }
          search() {
            return this;
          }
        }
        e.RLeaf = h;
      })(g || (g = {}));
      class N {
        parameters;
        constructor(e) {
          this.parameters = new g.Parameters(e);
        }
        getBiome(e, t, r, s) {
          let i = s.sample(e, t, r);
          return this.parameters.find(i);
        }
        static fromJson(e) {
          let t = v.LM.readObject(e) ?? {};
          return new N(
            (
              v.LM.readArray(t.biomes, (e) => {
                let t;
                return (
                  (t = v.LM.readObject(e) ?? {}),
                  {
                    biome: w.gw.parse(v.LM.readString(t.biome) ?? "plains"),
                    parameters: g.ParamPoint.fromJson(t.parameters),
                  }
                );
              }) ?? []
            ).map((e) => [e.parameters, () => e.biome]),
          );
        }
      }
      class A {
        static END = w.gw.create("the_end");
        static HIGHLANDS = w.gw.create("end_highlands");
        static MIDLANDS = w.gw.create("end_midlands");
        static ISLANDS = w.gw.create("small_end_islands");
        static BARRENS = w.gw.create("end_barrens");
        getBiome(e, t, r, s) {
          let i = (e << 2) >> 4,
            n = (r << 2) >> 4;
          if (i * i + n * n <= 4096) return A.END;
          let a = M.context((2 * i + 1) * 8, t << 2, (2 * n + 1) * 8),
            o = s.erosion.compute(a);
          return o > 0.25
            ? A.HIGHLANDS
            : o >= -0.0625
              ? A.MIDLANDS
              : o >= -0.21875
                ? A.BARRENS
                : A.ISLANDS;
        }
        static fromJson(e) {
          return new A();
        }
      }
      !(function (e) {
        ((e.fromJson = function (e) {
          let t = v.LM.readObject(e) ?? {};
          switch (v.LM.readString(t.type)?.replace(/^minecraft:/, "")) {
            case "fixed":
              return k.fromJson(e);
            case "checkerboard":
              return E.fromJson(e);
            case "multi_noise":
              return N.fromJson(e);
            case "the_end":
              return A.fromJson(e);
            default:
              return new k(w.gw.create("plains"));
          }
        }),
          (e.findBiomeHorizontal = function (e, t, r, s, i, n, a, o, u = 1, l = !1) {
            if (e instanceof k)
              if (!n(e.getBiome())) return;
              else if (l) return { pos: w.IX.create(t, r, s), biome: e.getBiome() };
              else
                return {
                  pos: w.IX.create(t - i + a.nextInt(2 * i + 1), r, s - i + a.nextInt(2 * i + 1)),
                  biome: e.getBiome(),
                };
            let h = t >> 2,
              c = s >> 2,
              d = i >> 2,
              f = r >> 2;
            for (var m = void 0, g = 0, p = l ? 0 : d, x = p; x <= d; x += u)
              for (var v = -x; v <= x; v += u) {
                let t = Math.abs(v) === x;
                for (var b = -x; b <= x; b += u) {
                  if (l && Math.abs(b) !== x && !t) continue;
                  let s = h + b,
                    i = c + v,
                    u = e.getBiome(s, f, i, o);
                  if (n(u)) {
                    if (
                      (void 0 === m || 0.5 >= a.nextInt(g + 1)) &&
                      ((m = { pos: w.IX.create(s << 2, r, i << 2), biome: u }), l)
                    )
                      return m;
                    g++;
                  }
                }
              }
            return m;
          }));
      })(p || (p = {}));
      class R {
        seed;
        noiseCache;
        randomCache;
        random;
        aquiferRandom;
        oreRandom;
        surfaceSystem;
        router;
        sampler;
        constructor(e, t) {
          ((this.seed = t),
            (this.noiseCache = new Map()),
            (this.randomCache = new Map()),
            (this.random = (e.legacyRandomSource ? new I.Vc(t) : I.NF.create(t)).forkPositional()),
            (this.aquiferRandom = this.random
              .fromHashOf(I.gw.create("aquifer").toString())
              .forkPositional()),
            (this.oreRandom = this.random
              .fromHashOf(I.gw.create("ore").toString())
              .forkPositional()),
            (this.surfaceSystem = new b(e.surfaceRule, e.defaultBlock, t)),
            (this.router = s.mapAll(
              e.noiseRouter,
              this.createVisitor(e.noise, e.legacyRandomSource),
            )),
            (this.sampler = g.Sampler.fromRouter(this.router)));
        }
        createVisitor(e, t) {
          let r = new Map(),
            s = (e) => {
              let r = e.key();
              if (void 0 === r) throw Error("Cannot create noise without key");
              if (t) {
                if (r.equals(I.gw.create("temperature")))
                  return new I.ob(new I.Vc(this.seed + BigInt(0)), I.lM.create(-7, [1, 1]));
                if (r.equals(I.gw.create("vegetation")))
                  return new I.ob(new I.Vc(this.seed + BigInt(1)), I.lM.create(-7, [1, 1]));
                if (r.equals(I.gw.create("offset")))
                  return new I.ob(this.random.fromHashOf("offset"), I.lM.create(0, [0]));
              }
              return this.getOrCreateNoise(r);
            },
            i = {
              map: (n) => {
                if (n instanceof I.F7.HolderHolder) {
                  let e = n.holder.key();
                  if (void 0 !== e && r.has(e.toString())) return r.get(e.toString());
                  {
                    let t = n.holder.value().mapAll(i);
                    return (void 0 !== e && r.set(e.toString(), t), t);
                  }
                }
                if (n instanceof I.F7.Interpolated)
                  return n.withCellSize(I.Yl.cellWidth(e), I.Yl.cellHeight(e));
                if (n instanceof I.F7.ShiftedNoise)
                  return new I.F7.ShiftedNoise(
                    n.shiftX,
                    n.shiftY,
                    n.shiftZ,
                    n.xzScale,
                    n.yScale,
                    n.noiseData,
                    s(n.noiseData),
                  );
                if (n instanceof I.F7.Noise)
                  return new I.F7.Noise(n.xzScale, n.yScale, n.noiseData, s(n.noiseData));
                if (n instanceof I.F7.ShiftNoise) return n.withNewNoise(s(n.noiseData));
                if (n instanceof I.F7.WeirdScaledSampler)
                  return new I.F7.WeirdScaledSampler(
                    n.input,
                    n.rarityValueMapper,
                    n.noiseData,
                    s(n.noiseData),
                  );
                if (n instanceof I.F7.OldBlendedNoise) {
                  let e = t
                    ? new I.Vc(this.seed + BigInt(0))
                    : this.random.fromHashOf(I.gw.create("terrain").toString());
                  return new I.F7.OldBlendedNoise(
                    n.xzScale,
                    n.yScale,
                    n.xzFactor,
                    n.yFactor,
                    n.smearScaleMultiplier,
                    new I.fV(e, n.xzScale, n.yScale, n.xzFactor, n.yFactor, n.smearScaleMultiplier),
                  );
                }
                return n instanceof I.F7.EndIslands
                  ? new I.F7.EndIslands(this.seed)
                  : n instanceof I.F7.Mapped || n instanceof I.F7.Ap2
                    ? n.withMinMax()
                    : n;
              },
            };
          return i;
        }
        getOrCreateNoise(e) {
          let t = w.OR.REGISTRY.getOrThrow(I.gw.create("worldgen/noise"));
          return (0, I.EB)(
            this.noiseCache,
            e.toString(),
            (r) => new I.ob(this.random.fromHashOf(r), t.getOrThrow(e)),
          );
        }
        getOrCreateRandom(e) {
          return (0, I.EB)(this.randomCache, e.toString(), (e) =>
            this.random.fromHashOf(e).forkPositional(),
          );
        }
      }
      var T = r(91305),
        B = r(23273);
      class C {
        static fromJson(e) {
          let t = v.LM.readObject(e) ?? {};
          switch (v.LM.readString(t.element_type)?.replace(/^minecraft:/, "")) {
            case "single_pool_element":
            case "legacy_single_pool_element":
              let r = w.gw.parse(v.LM.readString(t.location) ?? "");
              return new C.SinlgePoolElement({
                key: () => r,
                value: () => w.oE.REGISTRY.get(r) ?? w.oE.EMPTY,
              });
            case "list_pool_element":
              let s = v.LM.readArray("elements", C.fromJson) ?? [];
              return new C.ListPoolElement(s);
            case "feature_pool_element":
              return new C.FeaturePoolElement();
            default:
              return new C.EmptyPoolElement();
          }
        }
      }
      !(function (e) {
        class t extends e {
          getBoundingBox(e, t) {
            throw Error("Invalid call of EmptyPoolElement");
          }
          getShuffledJigsawBlocks(e, t) {
            return [];
          }
          toString() {
            return "[Empty Pool Element]";
          }
        }
        e.EmptyPoolElement = t;
        class r extends e {
          defaultJigsawNBT;
          constructor() {
            super();
            let e = new Map();
            (e.set("name", new B.Gz("minecraft:bottom")),
              e.set("final_state", new B.Gz("minecraft:air")),
              e.set("pool", new B.Gz("minecraft:empty")),
              e.set("target", new B.Gz("minecraft:empty")),
              e.set("joint", new B.Gz("rollable")),
              (this.defaultJigsawNBT = new B.GJ(e)));
          }
          getBoundingBox(e, t) {
            return [e, e];
          }
          getShuffledJigsawBlocks(e, t) {
            return [
              {
                pos: [0, 0, 0],
                state: new w.Tm(w.gw.create("jigsaw"), { orientation: "down_south" }),
                nbt: this.defaultJigsawNBT,
              },
            ];
          }
          toString() {
            return "[Feature Pool Element]";
          }
        }
        e.FeaturePoolElement = r;
        class s extends e {
          template;
          static JIGSAW_ID = w.gw.parse("jigsaw");
          constructor(e) {
            (super(), (this.template = e));
          }
          getBoundingBox(e, t) {
            let r = w.IX.offset(this.template.value().getSize(), -1, -1, -1),
              s = w.IX.add(w.oE.transform(r, t, w.IX.ZERO), e);
            return [
              w.IX.create(Math.min(e[0], s[0]), e[1], Math.min(e[2], s[2])),
              w.IX.create(Math.max(e[0], s[0]), s[1], Math.max(e[2], s[2])),
            ];
          }
          getShuffledJigsawBlocks(e, t) {
            let r = this.template
              .value()
              .getBlocks()
              .filter((e) => e.state.getName().equals(s.JIGSAW_ID));
            return (
              r.forEach((t) => (t.pos = w.oE.transform(t.pos, e, w.IX.ZERO))),
              (0, x.k4)(r, t),
              r
            );
          }
          toString() {
            return `[Single Pool Element: ${this.template.key()}]`;
          }
        }
        e.SinlgePoolElement = s;
        class i extends e {
          elements;
          constructor(e) {
            (super(), (this.elements = e));
          }
          getBoundingBox(e, t) {
            var r = void 0,
              s = void 0;
            for (let i of this.elements) {
              let n = i.getBoundingBox(e, t);
              r && s
                ? ((r[0] = Math.min(r[0], n[0][0])),
                  (r[1] = Math.min(r[1], n[0][1])),
                  (r[2] = Math.min(r[2], n[0][2])),
                  (s[0] = Math.min(r[0], n[1][0])),
                  (s[1] = Math.min(r[1], n[1][1])),
                  (s[2] = Math.min(r[2], n[1][2])))
                : ((r = n[0]), (s = n[1]));
            }
            return [r, s];
          }
          getShuffledJigsawBlocks(e, t) {
            return this.elements[0].getShuffledJigsawBlocks(e, t);
          }
          toString() {
            return `[List Pool Element: ${"; ".concat(...this.elements.map((e) => e.toString()))}]`;
          }
        }
        e.ListPoolElement = i;
      })(C || (C = {}));
      class P {
        rawTemplates;
        fallback;
        static REGISTRY = w.OR.createAndRegister("worldgen/template_pool", P.fromJson);
        totalWeight;
        constructor(e, t) {
          ((this.rawTemplates = e),
            (this.fallback = t),
            (this.totalWeight = e.reduce((e, t) => e + t.weight, 0)));
        }
        static structurePoolParser = w.Rd.parser(P.REGISTRY, P.fromJson);
        static fromJson(e) {
          let t = v.LM.readObject(e) ?? {},
            r = P.structurePoolParser(t.fallback ?? "");
          return new P(
            v.LM.readArray(t.elements, (e) => {
              let t = v.LM.readObject(e) ?? {};
              return { element: C.fromJson(t.element), weight: v.LM.readInt(t.weight) ?? 1 };
            }) ?? [],
            r,
          );
        }
        getRandomTemplate(e) {
          var t = e.nextInt(this.totalWeight);
          for (let e of this.rawTemplates) if ((t -= e.weight) < 0) return e.element;
          return this.rawTemplates[this.rawTemplates.length - 1].element;
        }
      }
      class O {
        settings;
        constructor(e) {
          this.settings = e;
        }
        onTopOfChunkCenter(e, t, r, s = "WORLD_SURFACE_WG") {
          let i = (t << 4) + 8,
            n = (r << 4) + 8;
          return [i, e.chunkGenerator.getBaseHeight(i, n, s, e.randomState) - 1, n];
        }
        getLowestY(e, t, r, s, i) {
          return Math.min(
            e.chunkGenerator.getBaseHeight(t, r, "WORLD_SURFACE_WG", e.randomState) - 1,
            e.chunkGenerator.getBaseHeight(t, r + i, "WORLD_SURFACE_WG", e.randomState) - 1,
            e.chunkGenerator.getBaseHeight(t + s, r, "WORLD_SURFACE_WG", e.randomState) - 1,
            e.chunkGenerator.getBaseHeight(t + s, r + i, "WORLD_SURFACE_WG", e.randomState) - 1,
          );
        }
        getLowestYIn5by5BoxOffset7Blocks(e, t, r, s) {
          let i = 5,
            n = 5;
          s === w.pL.CLOCKWISE_90
            ? (i = -5)
            : s === w.pL.CLOCKWISE_180
              ? ((i = -5), (n = -5))
              : s === w.pL.COUNTERCLOCKWISE_90 && (n = -5);
          let a = (t << 4) + 7,
            o = (r << 4) + 7;
          return w.IX.create(a, this.getLowestY(e, a, o, i, n), o);
        }
        tryGenerate(e, t, r) {
          let s = x.Vc.fromLargeFeatureSeed(r.seed, e, t),
            i = this.findGenerationPoint(e, t, s, r);
          if (void 0 === i) return;
          let n = r.biomeSource.getBiome(i[0] >> 2, i[1] >> 2, i[2] >> 2, r.randomState.sampler);
          return [...this.settings.validBiomes.getEntries()].findIndex((e) => e.key()?.equals(n)) >=
            0
            ? i
            : void 0;
        }
      }
      !(function (e) {
        e.REGISTRY = w.OR.createAndRegister("worldgen/structure", i);
        class t {
          validBiomes;
          constructor(e) {
            this.validBiomes = e;
          }
        }
        e.StructureSettings = t;
        class r {
          seed;
          biomeSource;
          settings;
          levelHeight;
          chunkGenerator;
          randomState;
          constructor(e, t, r, s) {
            ((this.seed = e),
              (this.biomeSource = t),
              (this.settings = r),
              (this.levelHeight = s),
              (this.randomState = new R(r, e)),
              (this.chunkGenerator = new L(t, r)));
          }
        }
        e.GenerationContext = r;
        let s = w.Rd.parser(P.REGISTRY, P.fromJson);
        function i(e) {
          let r = w.Lx.parser(h.BIOME),
            i = T.L.readObject(e) ?? {},
            a = new t(r(i.biomes).value());
          switch (T.L.readString(i.type)?.replace(/^minecraft:/, "")) {
            case "buried_treasure":
              break;
            case "desert_pyramid":
              return new c(a);
            case "end_city":
              return new m(a);
            case "fortress":
            case "nether_fossil":
              return new g(a);
            case "igloo":
              return new p(a);
            case "jigsaw":
              let o = d.fromJson(i.start_height),
                l = s(i.start_pool),
                b = T.L.readString(i.start_jigsaw_name),
                L = b ? w.gw.parse(b) : void 0,
                N = f.fromJson(i.project_start_to_heightmap),
                A = n.DimensionPadding.fromJson(i.dimension_padding);
              return new n(a, l, o, N, L, A);
            case "jungle_temple":
              return new x(a);
            case "mineshaft":
              return new v(a, "mesa" === T.L.readString(i.mineshaft_type) ? "mesa" : "normal");
            case "ocean_monument":
              return new y(a);
            case "ocean_ruin":
              return new M(a);
            case "ruined_portal":
              return new S(a);
            case "shipwreck":
              return new _(a, T.L.readBoolean(i.is_beached) ?? !1);
            case "stronghold":
              return new I(a);
            case "swamp_hut":
              return new E(a);
            case "woodland_mansion":
              return new k(a);
          }
          return new u(a);
        }
        e.fromJson = i;
        class n extends e {
          startingPoolHolder;
          startHeight;
          projectStartToHeightmap;
          startJigsawName;
          dimensionPadding;
          constructor(e, t, r, s, i, n) {
            (super(e),
              (this.startingPoolHolder = t),
              (this.startHeight = r),
              (this.projectStartToHeightmap = s),
              (this.startJigsawName = i),
              (this.dimensionPadding = n));
          }
          findGenerationPoint(e, t, r, s) {
            var i,
              a = this.startHeight(r, s.settings.noise);
            let o = w.IX.create(e << 4, a, t << 4),
              u = w.pL.getRandom(r),
              l = this.startingPoolHolder.value().getRandomTemplate(r);
            if (!(l instanceof C.EmptyPoolElement)) {
              if (this.startJigsawName) {
                let e = n.getRandomNamedJigsaw(l, this.startJigsawName, u, r);
                if (void 0 === e) return;
                i = e;
              } else i = w.IX.ZERO;
              let e = w.IX.subtract(o, i),
                t = l.getBoundingBox(e, u),
                h = ((t[1][0] + t[0][0]) / 2) | 0,
                c = ((t[1][2] + t[0][2]) / 2) | 0;
              if (
                ((a = this.projectStartToHeightmap
                  ? o[1] +
                    s.chunkGenerator.getBaseHeight(
                      h,
                      c,
                      this.projectStartToHeightmap,
                      s.randomState,
                    )
                  : e[1]),
                t.forEach((e) => (e[1] += a - t[0][1] - 1)),
                n.isStartTooCloseToWorldHeightLimits(this.dimensionPadding, t, s.levelHeight))
              )
                return;
              return w.IX.create(h, a + i[1], c);
            }
          }
          static isStartTooCloseToWorldHeightLimits(e, t, r) {
            if (e === n.DimensionPadding.ZERO) return !1;
            let s = r.minY + e.bottom,
              i = r.minY + r.height - e.top;
            return t[0][1] < s || t[1][1] > i;
          }
          static getRandomNamedJigsaw(e, t, r, s) {
            for (let i of e.getShuffledJigsawBlocks(r, s))
              if (w.gw.parse(i.nbt?.getString("name") ?? "minecraft:empty").equals(t)) return i.pos;
          }
        }
        e.JigsawStructure = n;
        var a = (n = e.JigsawStructure || (e.JigsawStructure = {}));
        class o {
          top;
          bottom;
          static ZERO = new o(0, 0);
          constructor(e, t) {
            ((this.top = e), (this.bottom = t));
          }
          static fromJson(e) {
            if (void 0 === e) return o.ZERO;
            if ("number" == typeof e) return new o(e, e);
            let t = T.L.readObject(e) ?? {};
            return new o(T.L.readInt(t.top) ?? 0, T.L.readInt(t.bottom) ?? 0);
          }
        }
        a.DimensionPadding = o;
        class u extends e {
          findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t, "OCEAN_FLOOR_WG");
          }
        }
        e.BuriedTreasureStructure = u;
        class l extends e {
          width;
          depth;
          constructor(e, t, r) {
            (super(e), (this.width = t), (this.depth = r));
          }
          findGenerationPoint(e, t, r, s) {
            if (!(this.getLowestY(s, e << 4, t << 4, this.width, this.depth) < s.settings.seaLevel))
              return this.onTopOfChunkCenter(s, e, t);
          }
        }
        class c extends l {
          constructor(e) {
            super(e, 21, 21);
          }
        }
        e.DesertPyramidStructure = c;
        class m extends e {
          findGenerationPoint(e, t, r, s) {
            let i = w.pL.getRandom(r),
              n = this.getLowestYIn5by5BoxOffset7Blocks(s, e, t, i);
            if (!(n[1] < 60)) return n;
          }
        }
        e.EndCityStructure = m;
        class g extends e {
          findGenerationPoint(e, t) {
            return w.IX.create(e << 4, 64, t << 4);
          }
        }
        e.NetherFortressStructure = g;
        class p extends e {
          findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t);
          }
        }
        e.IglooStructure = p;
        class x extends l {
          constructor(e) {
            super(e, 12, 15);
          }
        }
        e.JungleTempleStructure = x;
        class v extends e {
          type;
          constructor(e, t) {
            (super(e), (this.type = t));
          }
          findGenerationPoint(e, t, r, s) {
            throw Error("Method not implemented.");
          }
        }
        e.MineshaftStructure = v;
        class b extends e {
          height;
          constructor(e, t) {
            (super(e), (this.height = t));
          }
          findGenerationPoint(e, t) {
            throw Error("Method not implemented.");
          }
        }
        e.NetherFossilStructure = b;
        class y extends e {
          findGenerationPoint(e, t) {
            throw Error("Method not implemented.");
          }
        }
        e.OceanMonumentStructure = y;
        class M extends e {
          findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t, "OCEAN_FLOOR_WG");
          }
        }
        e.OceanRuinStructure = M;
        class S extends e {
          findGenerationPoint(e, t) {
            throw Error("Method not implemented.");
          }
        }
        e.RuinedPortalStructure = S;
        class _ extends e {
          isBeached;
          constructor(e, t) {
            (super(e), (this.isBeached = t));
          }
          findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(
              s,
              e,
              t,
              this.isBeached ? "WORLD_SURFACE_WG" : "OCEAN_FLOOR_WG",
            );
          }
        }
        e.ShipwreckStructure = _;
        class I extends e {
          findGenerationPoint(e, t) {
            return w.IX.create(e << 4, 0, t << 4);
          }
        }
        e.StrongholdStructure = I;
        class E extends e {
          findGenerationPoint(e, t, r, s) {
            return this.onTopOfChunkCenter(s, e, t);
          }
        }
        e.SwampHutStructure = E;
        class k extends e {
          findGenerationPoint(e, t, r, s) {
            let i = w.pL.getRandom(r),
              n = this.getLowestYIn5by5BoxOffset7Blocks(s, e, t, i);
            if (!(n[1] < 60)) return n;
          }
        }
        e.WoodlandMansionStructure = k;
      })(O || (O = {}));
      class F {
        structures;
        placement;
        static REGISTRY = w.OR.createAndRegister("worldgen/structure_set", F.fromJson);
        constructor(e, t) {
          ((this.structures = e), (this.placement = t));
        }
        static fromJson(e) {
          let t = v.LM.readObject(e) ?? {},
            r = v.LM.readArray(t.structures, F.StructureSelectionEntry.fromJson) ?? [],
            s = z.fromJson(t.placement);
          return new F(r, s);
        }
        getStructureInChunk(e, t, r) {
          if (
            (this.placement.prepare(r.biomeSource, r.randomState.sampler, r.seed),
            this.placement.isStructureChunk(r.seed, e, t)) &&
            0 !== this.structures.length
          )
            if (1 === this.structures.length) {
              let s = this.structures[0].structure.value().tryGenerate(e, t, r);
              if (void 0 !== s) return { id: this.structures[0].structure.key(), pos: s };
            } else {
              let s = x.Vc.fromLargeFeatureSeed(r.seed, e, t),
                i = Object.assign([], this.structures),
                n = i.reduce((e, t, r) => e + t.weight, 0);
              for (; i.length > 0;) {
                let a,
                  o,
                  u = s.nextInt(n);
                for ([a, o] of i.entries()) if ((u -= o.weight) < 0) break;
                let l = o.structure.value().tryGenerate(e, t, r);
                if (void 0 !== l) return { id: o.structure.key(), pos: l };
                (i.splice(a, 1), (n -= o.weight));
              }
            }
        }
      }
      !(function (e) {
        class t {
          structure;
          weight;
          constructor(e, t) {
            ((this.structure = e), (this.weight = t));
          }
          static fromJson(e) {
            let r = v.LM.readObject(e) ?? {};
            return new t(
              w.Rd.reference(
                O.REGISTRY,
                w.gw.parse(v.LM.readString(r.structure) ?? "minecraft:empty"),
              ),
              v.LM.readInt(r.weight) ?? 1,
            );
          }
        }
        e.StructureSelectionEntry = t;
      })(F || (F = {}));
      class z {
        locateOffset;
        frequencyReductionMethod;
        frequency;
        salt;
        exclusionZone;
        constructor(e, t, r, s, i) {
          ((this.locateOffset = e),
            (this.frequencyReductionMethod = t),
            (this.frequency = r),
            (this.salt = s),
            (this.exclusionZone = i));
        }
        static fromJson(e) {
          let t = v.LM.readObject(e) ?? {},
            r = v.LM.readString(t.type)?.replace(/^minecraft:/, ""),
            s = w.IX.fromJson(t.locate_offset),
            i = z.FrequencyReducer.fromType(
              v.LM.readString(t.frequency_reduction_method) ?? "default",
            ),
            n = v.LM.readNumber(t.frequency) ?? 1,
            a = v.LM.readInt(t.salt) ?? 0,
            o = "exclusion_zone" in t ? z.ExclusionZone.fromJson(t.exclusion_zone) : void 0;
          switch (r) {
            case "random_spread":
              let u = v.LM.readInt(t.spacing) ?? 1,
                l = v.LM.readInt(t.separation) ?? 1,
                c = z.SpreadType.fromJson(t.spread_type);
              return new z.RandomSpreadStructurePlacement(s, i, n, a, o, u, l, c);
            case "concentric_rings":
              let d = v.LM.readInt(t.distance) ?? 1,
                f = v.LM.readInt(t.spread) ?? 1,
                m = v.LM.readInt(t.count) ?? 1,
                g = w.Lx.parser(h.BIOME)(t.preferred_biomes);
              return new z.ConcentricRingsStructurePlacement(s, i, n, a, o, d, f, m, g);
          }
          return new z.RandomSpreadStructurePlacement(
            [0, 0, 0],
            z.FrequencyReducer.ProbabilityReducer,
            1,
            0,
            void 0,
            1,
            1,
            "linear",
          );
        }
        isStructureChunk(e, t, r) {
          return (
            !!this.isPlacementChunk(e, t, r) &&
            (!(this.frequency < 1) ||
              !!this.frequencyReductionMethod(e, this.salt, t, r, this.frequency)) &&
            !(this.exclusionZone && this.exclusionZone.isPlacementForbidden(e, t, r)) &&
            !0
          );
        }
        prepare(e, t, r) {}
      }
      !(function (e) {
        !(function (e) {
          function t(e, t, r, s, i) {
            return x.Vc.fromLargeFeatureWithSalt(e, t, r, s).nextFloat() < i;
          }
          function r(e, t, r, s, i) {
            return x.Vc.fromLargeFeatureSeed(e, r, s).nextDouble() < i;
          }
          function s(e, t, r, s, i) {
            return x.Vc.fromLargeFeatureWithSalt(e, r, s, 0x9e7f78).nextFloat() < i;
          }
          function i(e, t, r, s, i) {
            let n = new x.Vc(BigInt((r >> 4) ^ ((s >> 4) << 4)) ^ e);
            return (n.nextInt(), 0 === n.nextInt(Math.floor(1 / i)));
          }
          ((e.fromType = function (e) {
            switch (e) {
              case "legacy_type_1":
                return i;
              case "legacy_type_2":
                return s;
              case "legacy_type_3":
                return r;
              default:
                return t;
            }
          }),
            (e.ProbabilityReducer = t),
            (e.LegacyProbabilityReducerWithDouble = r),
            (e.LegacyArbitrarySaltProbabilityReducer = s),
            (e.LegacyPillagerOutpostReducer = i));
        })(e.FrequencyReducer || (e.FrequencyReducer = {}));
        class t {
          otherSet;
          chunkCount;
          constructor(e, t) {
            ((this.otherSet = e), (this.chunkCount = t));
          }
          static fromJson(e) {
            let r = v.LM.readObject(e) ?? {};
            return new t(
              w.Rd.reference(F.REGISTRY, w.gw.parse(v.LM.readString(r.other_set) ?? "")),
              v.LM.readInt(r.chunk_count) ?? 1,
            );
          }
          isPlacementForbidden(e, t, r) {
            let s = this.otherSet.value().placement;
            return (
              s
                .getPotentialStructureChunks(
                  e,
                  t - this.chunkCount,
                  r - this.chunkCount,
                  t + this.chunkCount,
                  r + this.chunkCount,
                )
                .findIndex(
                  (i) =>
                    Math.abs(i[0] - t) <= this.chunkCount &&
                    Math.abs(i[1] - r) <= this.chunkCount &&
                    s.isStructureChunk(e, i[0], i[1]),
                ) >= 0
            );
          }
        }
        ((e.ExclusionZone = t),
          ((e.SpreadType || (e.SpreadType = {})).fromJson = function (e) {
            return "triangular" === (v.LM.readString(e) ?? "linear") ? "triangular" : "linear";
          }));
        class r extends e {
          spacing;
          separation;
          spreadType;
          constructor(e, t, r, s, i, n, a, o) {
            (super(e, t, r, s, i),
              (this.spacing = n),
              (this.separation = a),
              (this.spreadType = o));
          }
          evaluateSpread(e, t) {
            switch (this.spreadType) {
              case "linear":
                return e.nextInt(t);
              case "triangular":
                return Math.floor((e.nextInt(t) + e.nextInt(t)) / 2);
            }
          }
          getPotentialStructureChunk(e, t, r) {
            let s = Math.floor(t / this.spacing),
              i = Math.floor(r / this.spacing),
              n = x.Vc.fromLargeFeatureWithSalt(e, s, i, this.salt),
              a = this.spacing - this.separation,
              o = this.evaluateSpread(n, a),
              u = this.evaluateSpread(n, a);
            return [s * this.spacing + o, i * this.spacing + u];
          }
          isPlacementChunk(e, t, r) {
            let [s, i] = this.getPotentialStructureChunk(e, t, r);
            return s === t && i === r;
          }
          getPotentialStructureChunks(e, t, r, s, i) {
            let n = [];
            for (let a = Math.floor(t / this.spacing) * this.spacing; a <= s; a += this.spacing)
              for (let t = Math.floor(r / this.spacing) * this.spacing; t <= i; t += this.spacing)
                n.push(this.getPotentialStructureChunk(e, a, t));
            return n;
          }
        }
        e.RandomSpreadStructurePlacement = r;
        class s extends e {
          distance;
          spread;
          count;
          preferredBiomes;
          positions;
          constructor(e, t, r, s, i, n, a, o, u) {
            (super(e, t, r, s, i),
              (this.distance = n),
              (this.spread = a),
              (this.count = o),
              (this.preferredBiomes = u));
          }
          prepare(e, t, r) {
            if (void 0 !== this.positions || ((this.positions = []), 0 === this.count)) return;
            let s = new x.Vc(r);
            var i = s.nextDouble() * Math.PI * 2,
              n = this.spread,
              a = 0,
              o = 0;
            let u = [...this.preferredBiomes.value().getEntries()].flatMap((e) => e.key() ?? []);
            for (var l = 0; l < this.count; l++) {
              let r =
                  4 * this.distance +
                  this.distance * a * 6 +
                  (s.nextDouble() - 0.5) * this.distance * 2.5,
                h = Math.round(Math.cos(i) * r),
                c = Math.round(Math.sin(i) * r),
                d = (h << 4) + 8,
                f = (c << 4) + 8,
                m = s.fork(),
                g = () => {
                  let r = p.findBiomeHorizontal(
                    e,
                    d,
                    0,
                    f,
                    112,
                    (e) => u.findIndex((t) => t.equals(e)) >= 0,
                    m,
                    t,
                  );
                  return r ? [r.pos[0] >> 4, r.pos[2] >> 4] : [h, c];
                };
              (this.positions.push({ center: [h, c], real: g }),
                (i += (2 * Math.PI) / n),
                ++o == n &&
                  (a++,
                  (o = 0),
                  (n += (2 * n) / (a + 1)),
                  (n = Math.min(n, this.count - l)),
                  (i += s.nextDouble() * Math.PI * 2)));
            }
          }
          isPlacementChunk(e, t, r) {
            return void 0 === this.positions
              ? (console.warn(
                  "trying to access concentric rings placement before position calculation",
                ),
                !1)
              : this.getPotentialStructureChunks(e, t, r, t, r).findIndex(
                  (e) => e[0] === t && e[1] === r,
                ) >= 0;
          }
          getPotentialStructureChunks(e, t, r, s, i) {
            if (void 0 === this.positions)
              return (
                console.warn(
                  "trying to access concentric rings placement before position calculation",
                ),
                []
              );
            let n = [];
            for (let e of this.positions)
              e.center[0] < t - 7 ||
                e.center[0] > s + 7 ||
                e.center[1] < r - 7 ||
                e.center[1] > i + 7 ||
                (e.real instanceof Function && (e.real = e.real()), n.push(e.real));
            return n;
          }
        }
        e.ConcentricRingsStructurePlacement = s;
      })(z || (z = {}));
    },
    67882: (e, t, r) => {
      "use strict";
      r.d(t, { E: () => n });
      var s = r(13402),
        i = r(14916);
      class n {
        x;
        z;
        compression;
        timestamp;
        raw;
        file;
        dirty;
        constructor(e, t, r, s, i) {
          ((this.x = e),
            (this.z = t),
            (this.compression = r),
            (this.timestamp = s),
            (this.raw = i),
            (this.dirty = !1));
        }
        getCompression() {
          switch (this.compression) {
            case 1:
              return "gzip";
            case 2:
              return "zlib";
            case 3:
              return "none";
            default:
              throw Error(`Invalid compression mode ${this.compression}`);
          }
        }
        setCompression(e) {
          switch (e) {
            case "gzip":
              this.compression = 1;
              break;
            case "zlib":
              this.compression = 2;
              break;
            case "none":
              this.compression = 3;
              break;
            default:
              throw Error(`Invalid compression mode ${e}`);
          }
        }
        getFile() {
          return (
            void 0 === this.file &&
              (this.file = i.T.read(this.raw, { compression: this.getCompression() })),
            this.file
          );
        }
        getRoot() {
          return this.getFile().root;
        }
        setRoot(e) {
          (void 0 === this.file && (this.file = i.T.create({ compression: this.getCompression() })),
            (this.file.root = e),
            this.markDirty());
        }
        markDirty() {
          this.dirty = !0;
        }
        getRaw() {
          if (void 0 === this.file || !1 === this.dirty) return this.raw;
          this.file.compression = this.getCompression();
          let e = this.file.write();
          return ((this.raw = e), (this.dirty = !1), e);
        }
        toJson() {
          return {
            x: this.x,
            z: this.z,
            compression: this.compression,
            timestamp: this.timestamp,
            size: this.raw.byteLength,
          };
        }
        toRef(e) {
          return new n.Ref(
            this.x,
            this.z,
            this.compression,
            this.timestamp,
            this.raw.byteLength,
            e,
          );
        }
        static create(e, t, r, s) {
          let i = new n(e, t, 0, s ?? 0, r.write());
          return (i.setCompression(r.compression), i);
        }
        static fromJson(e, t) {
          let r = s.LM.readObject(e) ?? {},
            i = s.LM.readInt(r.x) ?? 0,
            a = s.LM.readInt(r.z) ?? 0,
            o = s.LM.readNumber(r.compression) ?? 2,
            u = s.LM.readInt(r.timestamp) ?? 0,
            l = s.LM.readInt(r.size) ?? 0;
          return new n.Ref(i, a, o, u, l, t);
        }
      }
      !(function (e) {
        class t {
          x;
          z;
          compression;
          timestamp;
          size;
          resolver;
          file;
          constructor(e, t, r, s, i, n) {
            ((this.x = e),
              (this.z = t),
              (this.compression = r),
              (this.timestamp = s),
              (this.size = i),
              (this.resolver = n));
          }
          getFile() {
            if (this.file instanceof i.T) return this.file;
          }
          getRoot() {
            if (this.file instanceof i.T) return this.file.root;
          }
          async getFileAsync() {
            return (
              this.file ||
                (this.file = (async () => {
                  let e = await this.resolver(this.x, this.z);
                  return ((this.file = e), e);
                })()),
              this.file
            );
          }
          async getRootAsync() {
            return (await this.getFileAsync()).root;
          }
          isResolved() {
            return this.file instanceof i.T;
          }
        }
        e.Ref = t;
      })(n || (n = {}));
    },
    72843: (e) => {
      var t = {
        utf8: {
          stringToBytes: function (e) {
            return t.bin.stringToBytes(unescape(encodeURIComponent(e)));
          },
          bytesToString: function (e) {
            return decodeURIComponent(escape(t.bin.bytesToString(e)));
          },
        },
        bin: {
          stringToBytes: function (e) {
            for (var t = [], r = 0; r < e.length; r++) t.push(255 & e.charCodeAt(r));
            return t;
          },
          bytesToString: function (e) {
            for (var t = [], r = 0; r < e.length; r++) t.push(String.fromCharCode(e[r]));
            return t.join("");
          },
        },
      };
      e.exports = t;
    },
    73165: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => u });
      var s = r(13402),
        i = r(36595),
        n = r(19696),
        a = r(40623),
        o = r(22749);
      class u extends i.h {
        type;
        constructor(e, t) {
          (super(e ?? []),
            (this.type = 0 === this.items.length ? o.t.End : (t ?? this.items[0].getId())));
        }
        static make(e, t) {
          return new u(t.map((t) => new e(t)));
        }
        getId() {
          return o.t.List;
        }
        equals(e) {
          return (
            e.isList() &&
            this.type === e.type &&
            this.length === e.length &&
            this.items.every((t, r) => t.equals(e.items[r]))
          );
        }
        getType() {
          return this.type;
        }
        getNumber(e) {
          let t = this.get(e);
          return t?.isNumber() ? t.getAsNumber() : 0;
        }
        getString(e) {
          let t = this.get(e);
          return t?.isString() ? t.getAsString() : "";
        }
        getList(e, t) {
          let r = this.get(e);
          return r?.isList() && r.getType() === t ? r : u.create();
        }
        getCompound(e) {
          let t = this.get(e);
          return t?.isCompound() ? t : n.G.create();
        }
        set(e, t) {
          (this.updateType(t), super.set(e, t));
        }
        add(e) {
          (this.updateType(e), super.add(e));
        }
        insert(e, t) {
          (this.updateType(t), super.insert(e, t));
        }
        updateType(e) {
          if (e.getId() !== o.t.End) {
            if (this.type === o.t.End) this.type = e.getId();
            else if (this.type !== e.getId())
              throw Error(
                `Trying to add tag of type ${o.t[e.getId()]} to list of ${o.t[this.type]}`,
              );
          }
        }
        clear() {
          (super.clear(), (this.type = o.t.End));
        }
        toString() {
          return "[" + this.items.map((e) => e.toString()).join(",") + "]";
        }
        toPrettyString(e = "  ", t = 0) {
          if (0 === this.length) return "[]";
          let r = e.repeat(t),
            s = e.repeat(t + 1);
          return (
            "[\n" + this.map((r) => s + r.toPrettyString(e, t + 1)).join(",\n") + "\n" + r + "]"
          );
        }
        toSimplifiedJson() {
          return this.map((e) => e.toSimplifiedJson());
        }
        toJson() {
          return { type: this.type, items: this.items.map((e) => e.toJson()) };
        }
        toBytes(e) {
          for (let t of (0 === this.items.length
            ? (this.type = o.t.End)
            : (this.type = this.items[0].getId()),
          e.writeByte(this.type),
          e.writeInt(this.items.length),
          this.items))
            t.toBytes(e);
        }
        static create() {
          return new u();
        }
        static fromJson(e) {
          let t = s.LM.readObject(e) ?? {},
            r = s.LM.readNumber(t.type) ?? o.t.Compound;
          return new u(
            (s.LM.readArray(t.items) ?? []).flatMap((e) =>
              void 0 !== e ? [a.D.fromJson(e, r)] : [],
            ),
            r,
          );
        }
        static fromBytes(e) {
          let t = e.readByte(),
            r = e.readInt();
          if (t === o.t.End && r > 0) throw Error(`Missing type on ListTag but length is ${r}`);
          let s = [];
          for (let i = 0; i < r; i += 1) s.push(a.D.fromBytes(e, t));
          return new u(s, t);
        }
      }
      a.D.register(o.t.List, u);
    },
    73475: (e, t, r) => {
      "use strict";
      var s;
      (r.d(t, { V: () => s }),
        (function (e) {
          ((e.rotate = function (e, t, r) {
            let { up: s, down: i, north: n, east: a, south: o, west: u } = e;
            switch (r) {
              case 90:
                [n, a, o, u] = [a, o, u, n];
                break;
              case 180:
                [n, a, o, u] = [o, u, n, a];
                break;
              case 270:
                [n, a, o, u] = [u, n, a, o];
            }
            switch (t) {
              case 90:
                [s, n, i, o] = [n, i, o, s];
                break;
              case 180:
                [s, n, i, o] = [i, o, s, n];
                break;
              case 270:
                [s, n, i, o] = [o, s, n, i];
            }
            return { up: s, down: i, north: n, east: a, south: o, west: u };
          }),
            (e.none = function () {
              return Object.create(null);
            }));
        })(s || (s = {})));
    },
    73880: (e, t, r) => {
      "use strict";
      r.d(t, { m: () => i });
      var s,
        i,
        n = r(13402),
        a = r(96185);
      (((s || (s = {})).is = function (e) {
        return "object" == typeof e && null !== e && "minValue" in e && "maxValue" in e;
      }),
        (function (e) {
          e.fromJson = function e(s, i) {
            if ("number" == typeof s) return new t(s);
            let a = n.LM.readObject(s) ?? {},
              o = new r(i(a.coordinate)),
              u = n.LM.readArray(a.points, (e) => n.LM.readObject(e) ?? {}) ?? [];
            if (0 === u.length) return new t(0);
            for (let t of u) {
              let r = n.LM.readNumber(t.location) ?? 0,
                s = e(t.value, i),
                a = n.LM.readNumber(t.derivative) ?? 0;
              o.addPoint(r, s, a);
            }
            return o;
          };
          class t {
            value;
            constructor(e) {
              this.value = e;
            }
            compute() {
              return this.value;
            }
            min() {
              return this.value;
            }
            max() {
              return this.value;
            }
            mapAll() {
              return this;
            }
            calculateMinMax() {}
          }
          e.Constant = t;
          class r {
            coordinate;
            locations;
            values;
            derivatives;
            calculatedMin = -1 / 0;
            calculatedMax = 1 / 0;
            constructor(e, t = [], r = [], s = []) {
              ((this.coordinate = e),
                (this.locations = t),
                (this.values = r),
                (this.derivatives = s));
            }
            compute(e) {
              let t = this.coordinate.compute(e),
                r = (0, a.El)(0, this.locations.length, (e) => t < this.locations[e]) - 1,
                s = this.locations.length - 1;
              if (r < 0)
                return Math.fround(
                  this.values[0].compute(e) +
                    Math.fround(this.derivatives[0] * Math.fround(t - this.locations[0])),
                );
              if (r === s)
                return Math.fround(
                  this.values[s].compute(e) +
                    Math.fround(this.derivatives[s] * Math.fround(t - this.locations[s])),
                );
              let i = this.locations[r],
                n = this.locations[r + 1],
                o = this.derivatives[r],
                u = this.derivatives[r + 1],
                l = Math.fround(Math.fround(t - i) / Math.fround(n - i)),
                h = this.values[r].compute(e),
                c = this.values[r + 1].compute(e),
                d = Math.fround(Math.fround(o * Math.fround(n - i)) - Math.fround(c - h)),
                f = Math.fround(Math.fround(-u * Math.fround(n - i)) + Math.fround(c - h));
              return Math.fround(
                (0, a.uE)(l, h, c) +
                  Math.fround(Math.fround(l * Math.fround(1 - l)) * (0, a.uE)(l, d, f)),
              );
            }
            min() {
              return this.calculatedMin;
            }
            max() {
              return this.calculatedMax;
            }
            mapAll(e) {
              return new r(
                e(this.coordinate),
                this.locations,
                this.values.map((t) => t.mapAll(e)),
                this.derivatives,
              );
            }
            addPoint(t, r, s = 0) {
              return (
                this.locations.push(Math.fround(t)),
                this.values.push("number" == typeof r ? new e.Constant(Math.fround(r)) : r),
                this.derivatives.push(Math.fround(s)),
                this
              );
            }
            calculateMinMax() {
              if (!s.is(this.coordinate)) return;
              let e = this.locations.length - 1;
              var t = 1 / 0,
                i = -1 / 0;
              let n = this.coordinate.minValue(),
                a = this.coordinate.maxValue();
              for (let e of this.values) e.calculateMinMax();
              if (n < this.locations[0]) {
                let e = r.linearExtend(
                    n,
                    this.locations,
                    this.values[0].min(),
                    this.derivatives,
                    0,
                  ),
                  s = r.linearExtend(n, this.locations, this.values[0].max(), this.derivatives, 0);
                ((t = Math.min(t, Math.min(e, s))), (i = Math.max(i, Math.max(e, s))));
              }
              if (a > this.locations[e]) {
                let s = r.linearExtend(
                    a,
                    this.locations,
                    this.values[e].min(),
                    this.derivatives,
                    e,
                  ),
                  n = r.linearExtend(a, this.locations, this.values[e].max(), this.derivatives, e);
                ((t = Math.min(t, Math.min(s, n))), (i = Math.max(i, Math.max(s, n))));
              }
              for (let e of this.values) ((t = Math.min(t, e.min())), (i = Math.max(i, e.max())));
              for (var o = 0; o < e; ++o) {
                let e = this.locations[o],
                  r = Math.fround(this.locations[o + 1] - e),
                  s = this.values[o],
                  n = this.values[o + 1],
                  a = s.min(),
                  u = s.max(),
                  l = n.min(),
                  h = n.max(),
                  c = this.derivatives[o],
                  d = this.derivatives[o + 1];
                if (0 !== c || 0 !== d) {
                  let e = Math.fround(c * r),
                    s = Math.fround(d * r),
                    n = Math.min(a, l),
                    o = Math.max(u, h),
                    f = Math.fround(Math.fround(e - h) + a),
                    m = Math.fround(Math.fround(e - l) + u),
                    g = Math.fround(Math.fround(-s + l) - u),
                    p = Math.max(m, Math.fround(Math.fround(-s + h) - a));
                  ((t = Math.min(t, Math.fround(n + Math.fround(0.25 * Math.min(f, g))))),
                    (i = Math.max(i, Math.fround(o + Math.fround(0.25 * p)))));
                }
              }
              ((this.calculatedMin = t), (this.calculatedMax = i));
            }
            static linearExtend(e, t, r, s, i) {
              let n = s[i];
              return 0 == n ? r : Math.fround(r + Math.fround(n * Math.fround(e - t[i])));
            }
          }
          e.MultiPoint = r;
        })(i || (i = {})));
    },
    78969: (e, t, r) => {
      "use strict";
      r.d(t, { N: () => a });
      var s = r(13402),
        i = r(40623),
        n = r(22749);
      class a extends i.D {
        value;
        constructor(e) {
          (super(), (this.value = e));
        }
        getId() {
          return n.t.Float;
        }
        equals(e) {
          return e.isFloat() && this.value === e.value;
        }
        getAsNumber() {
          return this.value;
        }
        toString() {
          return this.value.toString() + "f";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.value;
        }
        toJson() {
          return this.value;
        }
        toBytes(e) {
          e.writeFloat(this.value);
        }
        static create() {
          return new a(0);
        }
        static fromJson(e) {
          return new a(s.LM.readNumber(e) ?? 0);
        }
        static fromBytes(e) {
          return new a(e.readFloat());
        }
      }
      i.D.register(n.t.Float, a);
    },
    84224: (e, t, r) => {
      "use strict";
      r.d(t, { E: () => u });
      var s = r(13402),
        i = r(36595),
        n = r(4215),
        a = r(40623),
        o = r(22749);
      class u extends i.h {
        constructor(e) {
          super(Array.from(e ?? [], (e) => ("number" == typeof e ? new n.z(e) : e)));
        }
        getId() {
          return o.t.ByteArray;
        }
        equals(e) {
          return (
            e.isByteArray() &&
            this.length === e.length &&
            this.items.every((t, r) => t.equals(e.items[r]))
          );
        }
        getType() {
          return o.t.Byte;
        }
        toString() {
          return "[B;" + this.items.map((e) => e.getAsNumber().toFixed() + "B").join(",") + "]";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return this.items.map((e) => e.getAsNumber());
        }
        toJson() {
          return this.items.map((e) => e.getAsNumber());
        }
        toBytes(e) {
          (e.writeInt(this.items.length), e.writeBytes(this.items.map((e) => e.getAsNumber())));
        }
        static create() {
          return new u([]);
        }
        static fromJson(e) {
          return new u(s.LM.readArray(e, (e) => s.LM.readNumber(e) ?? 0) ?? []);
        }
        static fromBytes(e) {
          let t = e.readInt();
          return new u(e.readBytes(t));
        }
      }
      a.D.register(o.t.ByteArray, u);
    },
    84678: (e, t, r) => {
      "use strict";
      r.d(t, { fV: () => l, lM: () => s, ob: () => c, hc: () => a });
      var s,
        i = r(96185),
        n = r(49517);
      class a {
        static GRADIENT = [
          [1, 1, 0],
          [-1, 1, 0],
          [1, -1, 0],
          [-1, -1, 0],
          [1, 0, 1],
          [-1, 0, 1],
          [1, 0, -1],
          [-1, 0, -1],
          [0, 1, 1],
          [0, -1, 1],
          [0, 1, -1],
          [0, -1, -1],
          [1, 1, 0],
          [0, -1, 1],
          [-1, 1, 0],
          [0, -1, -1],
        ];
        static F2 = 0.5 * (Math.sqrt(3) - 1);
        static G2 = (3 - Math.sqrt(3)) / 6;
        p;
        xo;
        yo;
        zo;
        constructor(e) {
          ((this.xo = 256 * e.nextDouble()),
            (this.yo = 256 * e.nextDouble()),
            (this.zo = 256 * e.nextDouble()),
            (this.p = Array(256)));
          for (let e = 0; e < 256; e += 1) this.p[e] = e;
          for (let t = 0; t < 256; t += 1) {
            let r = e.nextInt(256 - t),
              s = this.p[t];
            ((this.p[t] = this.p[t + r]), (this.p[t + r] = s));
          }
        }
        sample2D(e, t) {
          let r,
            s,
            n = (e + t) * a.F2,
            o = (0, i.y8)(e + n),
            u = (0, i.y8)(t + n),
            l = (o + u) * a.G2,
            h = e - (o - l),
            c = t - (u - l);
          h > c ? ((r = 1), (s = 0)) : ((r = 0), (s = 1));
          let d = h - r + a.G2,
            f = c - s + a.G2,
            m = h - 1 + 2 * a.G2,
            g = c - 1 + 2 * a.G2,
            p = 255 & o,
            w = 255 & u,
            x = this.P(p + this.P(w)) % 12,
            v = this.P(p + r + this.P(w + s)) % 12,
            b = this.P(p + 1 + this.P(w + 1)) % 12,
            y = this.getCornerNoise3D(x, h, c, 0, 0.5);
          return (
            70 *
            (y + this.getCornerNoise3D(v, d, f, 0, 0.5) + this.getCornerNoise3D(b, m, g, 0, 0.5))
          );
        }
        sample(e, t, r) {
          let s,
            n,
            a,
            o,
            u,
            l,
            h = (e + t + r) * 0.3333333333333333,
            c = (0, i.y8)(e + h),
            d = (0, i.y8)(t + h),
            f = (0, i.y8)(r + h),
            m = (c + d + f) * 0.16666666666666666,
            g = e - (c - m),
            p = t - (d - m),
            w = r - (f - m);
          g >= p
            ? p >= w
              ? ((s = 1), (n = 0), (a = 0), (o = 1), (u = 1), (l = 0))
              : (g >= w ? ((s = 1), (n = 0), (a = 0)) : ((s = 0), (n = 0), (a = 1)),
                (o = 1),
                (u = 0),
                (l = 1))
            : p < w
              ? ((s = 0), (n = 0), (a = 1), (o = 0), (u = 1), (l = 1))
              : g < w
                ? ((s = 0), (n = 1), (a = 0), (o = 0), (u = 1), (l = 1))
                : ((s = 0), (n = 1), (a = 0), (o = 1), (u = 1), (l = 0));
          let x = g - s + 0.16666666666666666,
            v = p - n + 0.16666666666666666,
            b = w - a + 0.16666666666666666,
            y = g - o + 0.3333333333333333,
            M = p - u + 0.3333333333333333,
            S = w - l + 0.3333333333333333,
            _ = 255 & c,
            L = 255 & d,
            I = 255 & f,
            E = this.P(_ + this.P(L + this.P(I))) % 12,
            k = this.P(_ + s + this.P(L + n + this.P(I + a))) % 12,
            N = this.P(_ + o + this.P(L + u + this.P(I + l))) % 12,
            A = this.P(_ + 1 + this.P(L + 1 + this.P(I + 1))) % 12,
            R = this.getCornerNoise3D(E, g, p, w, 0.6),
            T = this.getCornerNoise3D(k, x, v, b, 0.6);
          return (
            32 *
            (R +
              T +
              this.getCornerNoise3D(N, y, M, S, 0.6) +
              this.getCornerNoise3D(A, g - 0.5, p - 0.5, w - 0.5, 0.6))
          );
        }
        P(e) {
          return this.p[255 & e];
        }
        getCornerNoise3D(e, t, r, s, i) {
          let n,
            o = i - t * t - r * r - s * s;
          return (o < 0 ? (n = 0) : ((o *= o), (n = o * o * a.gradDot(e, t, r, s))), n);
        }
        static gradDot(e, t, r, s) {
          let i = a.GRADIENT[15 & e];
          return i[0] * t + i[1] * r + i[2] * s;
        }
      }
      class o {
        p;
        xo;
        yo;
        zo;
        constructor(e) {
          ((this.xo = 256 * e.nextDouble()),
            (this.yo = 256 * e.nextDouble()),
            (this.zo = 256 * e.nextDouble()),
            (this.p = Array(256)));
          for (let e = 0; e < 256; e += 1) this.p[e] = e > 127 ? e - 256 : e;
          for (let t = 0; t < 256; t += 1) {
            let r = e.nextInt(256 - t),
              s = this.p[t];
            ((this.p[t] = this.p[t + r]), (this.p[t + r] = s));
          }
        }
        sample(e, t, r, s = 0, n = 0) {
          let a = e + this.xo,
            o = t + this.yo,
            u = r + this.zo,
            l = (0, i.y8)(a),
            h = (0, i.y8)(o),
            c = (0, i.y8)(u),
            d = a - l,
            f = o - h,
            m = u - c,
            g = 0;
          if (0 !== s) {
            let e = n >= 0 && n < f ? n : f;
            g = (0, i.y8)(e / s + 1e-7) * s;
          }
          return this.sampleAndLerp(l, h, c, d, f - g, m, f);
        }
        sampleAndLerp(e, t, r, s, n, o, u) {
          let l = this.P(e),
            h = this.P(e + 1),
            c = this.P(l + t),
            d = this.P(l + t + 1),
            f = this.P(h + t),
            m = this.P(h + t + 1),
            g = a.gradDot(this.P(c + r), s, n, o),
            p = a.gradDot(this.P(f + r), s - 1, n, o),
            w = a.gradDot(this.P(d + r), s, n - 1, o),
            x = a.gradDot(this.P(m + r), s - 1, n - 1, o),
            v = a.gradDot(this.P(c + r + 1), s, n, o - 1),
            b = a.gradDot(this.P(f + r + 1), s - 1, n, o - 1),
            y = a.gradDot(this.P(d + r + 1), s, n - 1, o - 1),
            M = a.gradDot(this.P(m + r + 1), s - 1, n - 1, o - 1),
            S = (0, i.TF)(s),
            _ = (0, i.TF)(u),
            L = (0, i.TF)(o);
          return (0, i.nX)(S, _, L, g, p, w, x, v, b, y, M);
        }
        P(e) {
          return 255 & this.p[255 & e];
        }
      }
      class u {
        noiseLevels;
        amplitudes;
        lowestFreqInputFactor;
        lowestFreqValueFactor;
        maxValue;
        constructor(e, t, r, s = !1) {
          if (e instanceof n.NF && !s) {
            let s = e.forkPositional();
            this.noiseLevels = Array(r.length);
            for (let e = 0; e < r.length; e++)
              if (0 !== r[e]) {
                let r = t + e;
                this.noiseLevels[e] = new o(s.fromHashOf("octave_" + r));
              }
          } else {
            if (1 - t < r.length)
              throw Error("Positive octaves are not allowed when using LegacyRandom");
            this.noiseLevels = Array(r.length);
            for (let s = -t; s >= 0; s -= 1)
              s < r.length && 0 !== r[s] ? (this.noiseLevels[s] = new o(e)) : e.consume(262);
          }
          ((this.amplitudes = r),
            (this.lowestFreqInputFactor = Math.pow(2, t)),
            (this.lowestFreqValueFactor = Math.pow(2, r.length - 1) / (Math.pow(2, r.length) - 1)),
            (this.maxValue = this.edgeValue(2)));
        }
        sample(e, t, r, s = 0, i = 0, n = !1) {
          let a = 0,
            o = this.lowestFreqInputFactor,
            l = this.lowestFreqValueFactor;
          for (let h = 0; h < this.noiseLevels.length; h += 1) {
            let c = this.noiseLevels[h];
            (c &&
              (a +=
                this.amplitudes[h] *
                l *
                c.sample(u.wrap(e * o), n ? -c.yo : u.wrap(t * o), u.wrap(r * o), s * o, i * o)),
              (o *= 2),
              (l /= 2));
          }
          return a;
        }
        getOctaveNoise(e) {
          return this.noiseLevels[this.noiseLevels.length - 1 - e];
        }
        edgeValue(e) {
          let t = 0,
            r = this.lowestFreqValueFactor;
          for (let s = 0; s < this.noiseLevels.length; s += 1)
            (this.noiseLevels[s] && (t += this.amplitudes[s] * e * r), (r /= 2));
          return t;
        }
        static wrap(e) {
          return e - 0x2000000 * (0, i.t$)(e / 0x2000000 + 0.5);
        }
      }
      class l {
        xzScale;
        yScale;
        xzFactor;
        yFactor;
        smearScaleMultiplier;
        minLimitNoise;
        maxLimitNoise;
        mainNoise;
        xzMultiplier;
        yMultiplier;
        maxValue;
        constructor(e, t, r, s, i, n) {
          ((this.xzScale = t),
            (this.yScale = r),
            (this.xzFactor = s),
            (this.yFactor = i),
            (this.smearScaleMultiplier = n),
            (this.minLimitNoise = new u(
              e,
              -15,
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              !0,
            )),
            (this.maxLimitNoise = new u(
              e,
              -15,
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              !0,
            )),
            (this.mainNoise = new u(e, -7, [1, 1, 1, 1, 1, 1, 1, 1], !0)),
            (this.xzMultiplier = 684.412 * t),
            (this.yMultiplier = 684.412 * r),
            (this.maxValue = this.minLimitNoise.edgeValue(this.yMultiplier + 2)));
        }
        sample(e, t, r) {
          let s,
            n = e * this.xzMultiplier,
            a = t * this.yMultiplier,
            o = r * this.xzMultiplier,
            l = n / this.xzFactor,
            h = a / this.yFactor,
            c = o / this.xzFactor,
            d = this.yMultiplier * this.smearScaleMultiplier,
            f = d / this.yFactor,
            m = 0,
            g = 1;
          for (let e = 0; e < 8; e += 1) {
            if ((s = this.mainNoise.getOctaveNoise(e))) {
              let e = u.wrap(l * g),
                t = u.wrap(h * g),
                r = u.wrap(c * g);
              m += s.sample(e, t, r, f * g, h * g) / g;
            }
            g /= 2;
          }
          ((m = (m / 10 + 1) / 2), (g = 1));
          let p = 0,
            w = 0;
          for (let e = 0; e < 16; e += 1) {
            let t = u.wrap(n * g),
              r = u.wrap(a * g),
              i = u.wrap(o * g),
              l = d * g;
            (m < 1 &&
              (s = this.minLimitNoise.getOctaveNoise(e)) &&
              (p += s.sample(t, r, i, l, a * g) / g),
              m > 0 &&
                (s = this.maxLimitNoise.getOctaveNoise(e)) &&
                (w += s.sample(t, r, i, l, a * g) / g),
              (g /= 2));
          }
          return (0, i.MV)(p / 512, w / 512, m) / 128;
        }
      }
      var h = r(13402);
      class c {
        static INPUT_FACTOR = 1.0181268882175227;
        valueFactor;
        first;
        second;
        maxValue;
        constructor(e, { firstOctave: t, amplitudes: r }) {
          ((this.first = new u(e, t, r)), (this.second = new u(e, t, r)));
          let s = Infinity,
            i = -1 / 0;
          for (let e = 0; e < r.length; e += 1)
            0 !== r[e] && ((s = Math.min(s, e)), (i = Math.max(i, e)));
          let n = 0.1 * (1 + 1 / (i - s + 1));
          ((this.valueFactor = 1 / 6 / n),
            (this.maxValue = (this.first.maxValue + this.second.maxValue) * this.valueFactor));
        }
        sample(e, t, r) {
          let s = e * c.INPUT_FACTOR,
            i = t * c.INPUT_FACTOR,
            n = r * c.INPUT_FACTOR;
          return (this.first.sample(e, t, r) + this.second.sample(s, i, n)) * this.valueFactor;
        }
      }
      !(function (e) {
        ((e.create = function (e, t) {
          return { firstOctave: e, amplitudes: t };
        }),
          (e.fromJson = function (e) {
            let t = h.LM.readObject(e) ?? {};
            return {
              firstOctave: h.LM.readInt(t.firstOctave) ?? 0,
              amplitudes: h.LM.readArray(t.amplitudes, (e) => h.LM.readNumber(e) ?? 0) ?? [],
            };
          }));
      })(s || (s = {}));
    },
    85957: (e, t, r) => {
      "use strict";
      var s = r(13402),
        i = r(67882);
      class n {
        chunks;
        constructor(e) {
          for (let t of ((this.chunks = Array(1024).fill(void 0)), e)) {
            let e = a.getIndex(t.x, t.z);
            this.chunks[e] = t;
          }
        }
        getChunkPositions() {
          return this.chunks.flatMap((e) => (e ? [[e.x, e.z]] : []));
        }
        getChunk(e) {
          if (!(e < 0) && !(e >= 1024)) return this.chunks[e];
        }
        findChunk(e, t) {
          return this.getChunk(a.getIndex(e, t));
        }
        getFirstChunk() {
          return this.chunks.filter((e) => void 0 !== e)[0];
        }
        filter(e) {
          return this.chunks.filter((t) => void 0 !== t && e(t));
        }
        map(e) {
          return this.chunks.flatMap((t) => (void 0 !== t ? [e(t)] : []));
        }
      }
      class a extends n {
        constructor(e) {
          super(e);
        }
        write() {
          let e = 0;
          for (let t of this.chunks) void 0 !== t && (e += Math.ceil(t.getRaw().length / 4096));
          let t = new Uint8Array(8192 + 4096 * e),
            r = new DataView(t.buffer),
            s = 2;
          for (let e of this.chunks) {
            if (void 0 === e) continue;
            let i = e.getRaw(),
              n = 4 * ((31 & e.x) + (31 & e.z) * 32),
              a = Math.ceil(i.length / 4096);
            (r.setInt8(n, s >> 16),
              r.setInt16(n + 1, 65535 & s),
              r.setInt8(n + 3, a),
              r.setInt32(n + 4096, e.timestamp));
            let o = 4096 * s;
            (r.setInt32(o, i.length + 1),
              r.setInt8(o + 4, e.compression),
              t.set(i, o + 5),
              (s += a));
          }
          return t;
        }
        static read(e) {
          let t = [];
          for (let r = 0; r < 32; r += 1)
            for (let s = 0; s < 32; s += 1) {
              let n = 4 * ((31 & r) + (31 & s) * 32);
              if (0 === e[n + 3]) continue;
              let a = (e[n] << 16) + (e[n + 1] << 8) + e[n + 2],
                o = (e[n + 4096] << 24) + (e[n + 4097] << 16) + (e[n + 4098] << 8) + e[n + 4099],
                u = 4096 * a,
                l = (e[u] << 24) + (e[u + 1] << 16) + (e[u + 2] << 8) + e[u + 3],
                h = e[u + 4],
                c = e.slice(u + 5, u + 4 + l);
              t.push(new i.E(r, s, h, o, c));
            }
          return new a(t);
        }
        static getIndex(e, t) {
          return (31 & e) + (31 & t) * 32;
        }
        toJson() {
          return { chunks: this.map((e) => e.toJson()) };
        }
        static fromJson(e, t) {
          let r = s.LM.readObject(e) ?? {},
            n = (s.LM.readArray(r.chunks) ?? []).flatMap((e) =>
              void 0 !== e ? [i.E.fromJson(e, t)] : [],
            );
          return new a.Ref(n);
        }
      }
      !(function (e) {
        class t extends n {}
        e.Ref = t;
      })(a || (a = {}));
    },
    86222: (e, t, r) => {
      "use strict";
      r.d(t, { q: () => s });
      class s {
        gl;
        program;
        constructor(e, t, r) {
          ((this.gl = e), (this.program = this.initShaderProgram(t, r)));
        }
        getProgram() {
          return this.program;
        }
        initShaderProgram(e, t) {
          let r = this.loadShader(this.gl.VERTEX_SHADER, e),
            s = this.loadShader(this.gl.FRAGMENT_SHADER, t),
            i = this.gl.createProgram();
          if (
            (this.gl.attachShader(i, r),
            this.gl.attachShader(i, s),
            this.gl.linkProgram(i),
            !this.gl.getProgramParameter(i, this.gl.LINK_STATUS))
          )
            throw Error(`Unable to link shader program: ${this.gl.getProgramInfoLog(i)}`);
          return i;
        }
        loadShader(e, t) {
          let r = this.gl.createShader(e);
          if (
            (this.gl.shaderSource(r, t),
            this.gl.compileShader(r),
            !this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS))
          ) {
            let t = Error(
              `Compiling ${e === this.gl.VERTEX_SHADER ? "vertex" : "fragment"} shader: ${this.gl.getShaderInfoLog(r)}`,
            );
            throw (this.gl.deleteShader(r), t);
          }
          return r;
        }
      }
    },
    87118: (e, t, r) => {
      "use strict";
      r.d(t, { s: () => s });
      var s,
        i = r(13402),
        n = r(23273),
        a = r(4215),
        o = r(84224),
        u = r(19696),
        l = r(78969),
        h = r(51190),
        c = r(18023),
        d = r(73165),
        f = r(96667),
        m = r(59276),
        g = r(7853),
        p = r(40436),
        w = r(22749);
      !(function (e) {
        let t = RegExp("^[-+]?(?:[0-9]+[.]|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?$", "i"),
          r = RegExp("^[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?d$", "i"),
          s = RegExp("^[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?f$", "i"),
          x = RegExp("^[-+]?(?:0|[1-9][0-9]*)b$", "i"),
          v = RegExp("^[-+]?(?:0|[1-9][0-9]*)l$", "i"),
          b = RegExp("^[-+]?(?:0|[1-9][0-9]*)s$", "i"),
          y = RegExp("^[-+]?(?:0|[1-9][0-9]*)$", "i");
        function M(e) {
          if ((e.skipWhitespace(), !e.canRead())) throw e.createError("Expected value");
          let L = e.peek();
          if ("{" === L) {
            var I = e;
            I.expect("{", !0);
            let t = new Map();
            for (I.skipWhitespace(); I.canRead() && "}" !== I.peek();) {
              let e = I.cursor;
              if ((I.skipWhitespace(), !I.canRead())) throw I.createError("Expected key");
              let r = I.readString();
              if (0 === r.length) throw ((I.cursor = e), I.createError("Expected key"));
              I.expect(":", !0);
              let s = M(I);
              if ((t.set(r, s), !_(I))) break;
              if (!I.canRead()) throw I.createError("Expected key");
            }
            return (I.expect("}", !0), new u.G(t));
          }
          if ("[" === L)
            if (!e.canRead(3) || i.r.isQuotedStringStart(e.peek(1)) || ";" !== e.peek(2))
              return (function (e) {
                if ((e.expect("[", !0), e.skipWhitespace(), !e.canRead()))
                  throw e.createError("Expected value");
                let t = [],
                  r = w.t.End;
                for (; "]" !== e.peek();) {
                  let s = e.cursor,
                    i = M(e),
                    n = i.getId();
                  if (r === w.t.End) r = n;
                  else if (n !== r)
                    throw (
                      (e.cursor = s),
                      e.createError(`Can't insert ${w.t[n]} into list of ${w.t[r]}`)
                    );
                  if ((t.push(i), !_(e))) break;
                  if (!e.canRead()) throw e.createError("Expected value");
                }
                return (e.expect("]", !0), new d.J(t, r));
              })(e);
            else {
              e.expect("[", !0);
              let t = e.cursor,
                r = e.read();
              if ((e.skip(), e.skipWhitespace(), e.canRead())) {
                if ("B" === r) return S(e, o.E, w.t.ByteArray, w.t.Byte);
                if ("L" === r) return S(e, m.U, w.t.LongArray, w.t.Long);
                if ("I" === r) return S(e, c.P, w.t.IntArray, w.t.Int);
                throw ((e.cursor = t), e.createError(`Invalid array type '${r}'`));
              }
              throw e.createError("Expected value");
            }
          {
            e.skipWhitespace();
            let o = e.cursor;
            if (i.r.isQuotedStringStart(e.peek())) return new p.G(e.readQuotedString());
            {
              let i = e.readUnquotedString();
              if (0 === i.length) throw ((e.cursor = o), e.createError("Expected value"));
              try {
                if (s.test(i)) {
                  let e = Number(i.substring(0, i.length - 1));
                  return new l.N(e);
                }
                if (x.test(i)) {
                  let e = Number(i.substring(0, i.length - 1));
                  return new a.z(Math.floor(e));
                }
                if (v.test(i)) {
                  let e = BigInt(i.substring(0, i.length - 1));
                  return new f.l(e);
                } else if (b.test(i)) {
                  let e = Number(i.substring(0, i.length - 1));
                  return new g.p(Math.floor(e));
                } else if (y.test(i)) {
                  let e = Number(i);
                  return new h.Q(Math.floor(e));
                } else if (r.test(i)) {
                  let e = Number(i.substring(0, i.length - 1));
                  return new n.QU(e);
                } else if (t.test(i)) {
                  let e = Number(i);
                  return new n.QU(e);
                } else if ("true" === i.toLowerCase()) return a.z.ONE;
                else if ("false" === i.toLowerCase()) return a.z.ZERO;
              } catch (e) {}
              return 0 === i.length ? p.G.EMPTY : new p.G(i);
            }
          }
        }
        function S(e, t, r, s) {
          let i = [];
          for (; "]" !== e.peek();) {
            let t = M(e);
            if (t.getId() !== s)
              throw e.createError(`Can't insert ${w.t[t.getId()]} into ${w.t[r]}`);
            if ((i.push(t.isLong() ? t.getAsPair() : t.getAsNumber()), !_(e))) break;
            if (!e.canRead()) throw e.createError("Expected value");
          }
          return (e.expect("]"), new t(i));
        }
        function _(e) {
          return (
            e.skipWhitespace(),
            !!e.canRead() && "," === e.peek() && (e.skip(), e.skipWhitespace(), !0)
          );
        }
        e.readTag = M;
      })(s || (s = {}));
    },
    89268: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => o });
      var s = r(85250),
        i = r(86222);
      let n = `
  attribute vec4 vertPos;
  attribute vec2 texCoord;
  attribute vec4 texLimit;
  attribute vec3 vertColor;
  attribute vec3 normal;

  uniform mat4 mView;
  uniform mat4 mProj;

  varying highp vec2 vTexCoord;
  varying highp vec4 vTexLimit;
  varying highp vec3 vTintColor;
  varying highp float vLighting;

  void main(void) {
    gl_Position = mProj * mView * vertPos;
    vTexCoord = texCoord;
	vTexLimit = texLimit;
    vTintColor = vertColor;
    vLighting = normal.y * 0.2 + abs(normal.z) * 0.1 + 0.8;
  }
`,
        a = `
  precision highp float;
  varying highp vec2 vTexCoord;
  varying highp vec4 vTexLimit;
  varying highp vec3 vTintColor;
  varying highp float vLighting;

  uniform sampler2D sampler;
  uniform highp float pixelSize;

  void main(void) {
		vec4 texColor = texture2D(sampler, clamp(vTexCoord,
			vTexLimit.xy + vec2(0.5, 0.5) * pixelSize,
			vTexLimit.zw - vec2(0.5, 0.5) * pixelSize
		));
		if(texColor.a < 0.01) discard;
		gl_FragColor = vec4(texColor.xyz * vTintColor * vLighting, texColor.a);
  }
`;
      class o {
        gl;
        shaderProgram;
        projMatrix;
        activeShader;
        pixelSize = 0;
        constructor(e) {
          ((this.gl = e),
            (this.shaderProgram = new i.q(e, n, a).getProgram()),
            (this.activeShader = this.shaderProgram),
            (this.projMatrix = this.getPerspective()),
            this.initialize());
        }
        setViewport(e, t, r, s) {
          (this.gl.viewport(e, t, r, s), (this.projMatrix = this.getPerspective()));
        }
        getPerspective() {
          let e = (70 * Math.PI) / 180,
            t = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight,
            r = s.vt();
          return (s.fN(r, e, t, 0.1, 500), r);
        }
        initialize() {
          (this.gl.enable(this.gl.DEPTH_TEST),
            this.gl.depthFunc(this.gl.LEQUAL),
            this.gl.enable(this.gl.BLEND),
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA),
            this.gl.enable(this.gl.CULL_FACE),
            this.gl.cullFace(this.gl.BACK));
        }
        setShader(e) {
          (this.gl.useProgram(e), (this.activeShader = e));
        }
        setVertexAttr(e, t, r) {
          if (void 0 === r) throw Error(`Expected buffer for ${e}`);
          let s = this.gl.getAttribLocation(this.activeShader, e);
          (this.gl.bindBuffer(this.gl.ARRAY_BUFFER, r),
            this.gl.vertexAttribPointer(s, t, this.gl.FLOAT, !1, 0, 0),
            this.gl.enableVertexAttribArray(s));
        }
        setUniform(e, t) {
          let r = this.gl.getUniformLocation(this.activeShader, e);
          this.gl.uniformMatrix4fv(r, !1, t);
        }
        setTexture(e, t) {
          (this.gl.activeTexture(this.gl.TEXTURE0),
            this.gl.bindTexture(this.gl.TEXTURE_2D, e),
            (this.pixelSize = t ?? 0));
        }
        createAtlasTexture(e) {
          let t = this.gl.createTexture();
          return (
            this.gl.bindTexture(this.gl.TEXTURE_2D, t),
            this.gl.texImage2D(
              this.gl.TEXTURE_2D,
              0,
              this.gl.RGBA,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              e,
            ),
            this.gl.generateMipmap(this.gl.TEXTURE_2D),
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST),
            t
          );
        }
        prepareDraw(e) {
          (this.setUniform("mView", e), this.setUniform("mProj", this.projMatrix));
          let t = this.gl.getUniformLocation(this.activeShader, "pixelSize");
          this.gl.uniform1f(t, this.pixelSize);
        }
        drawMesh(e, t) {
          if (e.quadVertices() > 0) {
            if (
              (t.pos && this.setVertexAttr("vertPos", 3, e.posBuffer),
              t.color && this.setVertexAttr("vertColor", 3, e.colorBuffer),
              t.texture &&
                (this.setVertexAttr("texCoord", 2, e.textureBuffer),
                this.setVertexAttr("texLimit", 4, e.textureLimitBuffer)),
              t.normal && this.setVertexAttr("normal", 3, e.normalBuffer),
              t.blockPos && this.setVertexAttr("blockPos", 3, e.blockPosBuffer),
              !e.indexBuffer)
            )
              throw Error("Expected index buffer");
            (this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, e.indexBuffer),
              this.gl.drawElements(this.gl.TRIANGLES, e.quadIndices(), this.gl.UNSIGNED_SHORT, 0));
          }
          e.lineVertices() > 0 &&
            (t.pos && this.setVertexAttr("vertPos", 3, e.linePosBuffer),
            t.color && this.setVertexAttr("vertColor", 3, e.lineColorBuffer),
            this.gl.drawArrays(this.gl.LINES, 0, e.lineVertices()));
        }
      }
    },
    91305: (e, t, r) => {
      "use strict";
      var s;
      (r.d(t, { L: () => s }),
        (function (e) {
          function t(e) {
            return "object" != typeof e || null === e || Array.isArray(e) ? void 0 : e;
          }
          ((e.readNumber = function (e) {
            return "number" == typeof e ? e : void 0;
          }),
            (e.readInt = function (e) {
              return "number" == typeof e ? Math.floor(e) : void 0;
            }),
            (e.readString = function (e) {
              return "string" == typeof e ? e : void 0;
            }),
            (e.readBoolean = function (e) {
              return "boolean" == typeof e ? e : void 0;
            }),
            (e.readObject = t),
            (e.readArray = function (e, t) {
              if (Array.isArray(e)) return t ? e.map((e) => t(e)) : e;
            }),
            (e.readPair = function (e, t) {
              if (Array.isArray(e)) return [0, 1].map((r) => t(e[r]));
            }),
            (e.readMap = function (e, r) {
              return Object.fromEntries(Object.entries(t(e) ?? {}).map(([e, t]) => [e, r(t)]));
            }),
            (e.compose = function (e, t, r) {
              let s = t(e);
              return s ? r(s) : void 0;
            }),
            (e.readEnum = function (e, t) {
              return "string" != typeof e ? t[0] : t.includes(e) ? e : t[0];
            }));
        })(s || (s = {})));
    },
    94619: (e, t, r) => {
      "use strict";
      (r(85250), r(45723), r(16947), r(31206));
      var s = r(89268);
      r(86222);
      s.A;
    },
    96667: (e, t, r) => {
      "use strict";
      r.d(t, { l: () => n });
      var s = r(40623),
        i = r(22749);
      class n extends s.D {
        static dataview = new DataView(new Uint8Array(8).buffer);
        value;
        constructor(e) {
          (super(), (this.value = n.toPair(e)));
        }
        static toPair(e) {
          return Array.isArray(e) ? e : n.bigintToPair(e);
        }
        static bigintToPair(e) {
          return (n.dataview.setBigInt64(0, e), [n.dataview.getInt32(0), n.dataview.getInt32(4)]);
        }
        static pairToBigint(e) {
          return (
            n.dataview.setInt32(0, Number(e[0])),
            n.dataview.setInt32(4, Number(e[1])),
            n.dataview.getBigInt64(0)
          );
        }
        static pairToString(e) {
          return n.pairToBigint(e).toString();
        }
        static pairToNumber(e) {
          return Number(n.pairToBigint(e));
        }
        getId() {
          return i.t.Long;
        }
        equals(e) {
          return e.isLong() && this.value[0] === e.value[0] && this.value[1] === e.value[1];
        }
        getAsNumber() {
          return n.pairToNumber(this.value);
        }
        getAsPair() {
          return this.value;
        }
        toBigInt() {
          return n.pairToBigint(this.value);
        }
        toString() {
          return n.pairToString(this.value) + "L";
        }
        toPrettyString() {
          return this.toString();
        }
        toSimplifiedJson() {
          return n.pairToNumber(this.value);
        }
        toJson() {
          return this.value;
        }
        toBytes(e) {
          (e.writeInt(this.value[0]), e.writeInt(this.value[1]));
        }
        static create() {
          return new n([0, 0]);
        }
        static fromJson(e) {
          return new n(
            Array.isArray(e) && 2 === e.length
              ? e.map((e) => ("number" == typeof e ? e : 0))
              : [0, 0],
          );
        }
        static fromBytes(e) {
          return new n([e.readInt(), e.readInt()]);
        }
      }
      s.D.register(i.t.Long, n);
    },
    97633: (e, t, r) => {
      "use strict";
      r.d(t, { DF: () => a, p8: () => s, tb: () => i });
      var s = 1e-6,
        i = "undefined" != typeof Float32Array ? Float32Array : Array,
        n = Math.PI / 180;
      function a(e) {
        return e * n;
      }
    },
    98169: (e, t, r) => {
      "use strict";
      r.d(t, { L: () => n });
      var s = r(50923),
        i = r(19023);
      class n {
        pos;
        color;
        texture;
        textureLimit;
        normal;
        blockPos;
        static VEC = s.vt();
        constructor(e, t, r, s, i, n) {
          ((this.pos = e),
            (this.color = t),
            (this.texture = r),
            (this.textureLimit = s),
            (this.normal = i),
            (this.blockPos = n));
        }
        transform(e) {
          return (
            (n.VEC[0] = this.pos.x),
            (n.VEC[1] = this.pos.y),
            (n.VEC[2] = this.pos.z),
            s.Z0(n.VEC, n.VEC, e),
            (this.pos = new i.Mi(n.VEC[0], n.VEC[1], n.VEC[2])),
            this
          );
        }
        static fromPos(e) {
          return new n(e, [0, 0, 0], [0, 0], [0, 0, 0, 0], void 0, void 0);
        }
      }
    },
    99498: (e, t, r) => {
      "use strict";
      (r(19023), r(13402), r(31206), r(3420));
      var s = r(89268);
      r(86222);
      s.A;
    },
  },
]);

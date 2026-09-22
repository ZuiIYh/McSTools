"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6784],
  {
    2037: function (e, t, r) {
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = function (e) {
          let { apiKey: t, ...r } = e,
            n = { ...r, key: t },
            { html: s } = (0, o.GoogleMapsEmbed)(n);
          return (0, a.jsx)(l.default, {
            height: n.height || null,
            width: n.width || null,
            html: s,
            dataNtpc: "GoogleMapsEmbed",
          });
        }));
      let a = r(95155),
        o = r(13067),
        l = n(r(57445));
    },
    13067: (e, t, r) => {
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.YouTubeEmbed = t.GoogleMapsEmbed = t.GoogleAnalytics = void 0));
      var n = r(68197);
      Object.defineProperty(t, "GoogleAnalytics", {
        enumerable: !0,
        get: function () {
          return n.GoogleAnalytics;
        },
      });
      var a = r(55546);
      Object.defineProperty(t, "GoogleMapsEmbed", {
        enumerable: !0,
        get: function () {
          return a.GoogleMapsEmbed;
        },
      });
      var o = r(93438);
      Object.defineProperty(t, "YouTubeEmbed", {
        enumerable: !0,
        get: function () {
          return o.YouTubeEmbed;
        },
      });
    },
    15781: (e, t) => {
      function r(e, t, n = !1) {
        return t
          ? Object.keys(e)
              .filter((e) => (n ? !t.includes(e) : t.includes(e)))
              .reduce((t, r) => ((t[r] = e[r]), t), {})
          : {};
      }
      function n(e, t, r, n) {
        let a = n && Object.keys(n).length > 0 ? new URL(Object.values(n)[0], e) : new URL(e);
        return (
          t &&
            r &&
            t.forEach((e) => {
              r[e] && a.searchParams.set(e, r[e]);
            }),
          a.toString()
        );
      }
      function a(e, t, r, a, o) {
        var l;
        if (!t) return `<${e}></${e}>`;
        let s = (null == (l = t.src) ? void 0 : l.url)
            ? Object.assign(Object.assign({}, t), { src: n(t.src.url, t.src.params, a, o) })
            : t,
          u = Object.keys(Object.assign(Object.assign({}, s), r)).reduce((e, t) => {
            let n = null == r ? void 0 : r[t],
              a = s[t],
              o = null != n ? n : a,
              l = !0 === o ? t : `${t}="${o}"`;
            return o ? e + ` ${l}` : e;
          }, "");
        return `<${e}${u}></${e}>`;
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.formatData = t.createHtml = t.formatUrl = void 0),
        (t.formatUrl = n),
        (t.createHtml = a),
        (t.formatData = function (e, t) {
          var o, l, s, u, i;
          let d = r(
              t,
              null == (o = e.scripts)
                ? void 0
                : o.reduce((e, t) => [...e, ...(Array.isArray(t.params) ? t.params : [])], []),
            ),
            c = r(
              t,
              null == (s = null == (l = e.html) ? void 0 : l.attributes.src) ? void 0 : s.params,
            ),
            g = r(t, [
              null == (i = null == (u = e.html) ? void 0 : u.attributes.src) ? void 0 : i.slugParam,
            ]),
            f = r(t, [...Object.keys(d), ...Object.keys(c), ...Object.keys(g)], !0);
          return Object.assign(Object.assign({}, e), {
            html: e.html ? a(e.html.element, e.html.attributes, f, c, g) : null,
            scripts: e.scripts
              ? e.scripts.map((e) =>
                  Object.assign(Object.assign({}, e), { url: n(e.url, e.params, d) }),
                )
              : null,
          });
        }));
    },
    23817: (e) => {
      e.exports = JSON.parse(
        '{"id":"google-analytics","description":"Install a Google Analytics tag on your website","website":"https://analytics.google.com/analytics/web/","scripts":[{"url":"/__offline-noop.js","params":["id"],"strategy":"worker","location":"head","action":"append"},{"code":"window.dataLayer=window.dataLayer||[];window.gtag=function gtag(){window.dataLayer.push(arguments);};gtag(\'js\',new Date());gtag(\'config\',\'${args.id}\')","strategy":"worker","location":"head","action":"append"}]}',
      );
    },
    26802: (e) => {
      e.exports = JSON.parse(
        '{"id":"google-maps-embed","description":"Embed a Google Maps embed on your webpage","website":"https://developers.google.com/maps/documentation/embed/get-started","html":{"element":"iframe","attributes":{"loading":"lazy","src":{"url":"https://www.google.com/maps/embed/v1/place","slugParam":"mode","params":["key","q","center","zoom","maptype","language","region"]},"referrerpolicy":"no-referrer-when-downgrade","frameborder":"0","style":"border:0","allowfullscreen":true,"width":null,"height":null}}}',
      );
    },
    37577: function (e, t, r) {
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = function (e) {
          let { html: t, scripts: r, stylesheets: n } = (0, l.YouTubeEmbed)(e);
          return (0, a.jsx)(s.default, {
            height: e.height || null,
            width: e.width || null,
            html: t,
            dataNtpc: "YouTubeEmbed",
            children:
              null == r
                ? void 0
                : r.map((e) =>
                    (0, a.jsx)(
                      o.default,
                      { src: e.url, strategy: u[e.strategy], stylesheets: n },
                      e.url,
                    ),
                  ),
          });
        }));
      let a = r(95155),
        o = n(r(68321)),
        l = r(13067),
        s = n(r(57445)),
        u = {
          server: "beforeInteractive",
          client: "afterInteractive",
          idle: "lazyOnload",
          worker: "worker",
        };
    },
    55546: function (e, t, r) {
      var n =
          (this && this.__rest) ||
          function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
              for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
                0 > t.indexOf(n[a]) &&
                  Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
                  (r[n[a]] = e[n[a]]);
            return r;
          },
        a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.GoogleMapsEmbed = void 0));
      let o = a(r(26802)),
        l = r(15781);
      t.GoogleMapsEmbed = (e) => {
        var t = n(e, []);
        return (0, l.formatData)(o.default, t);
      };
    },
    57445: (e, t, r) => {
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = function (e) {
          let { html: t, height: r = null, width: o = null, children: l, dataNtpc: s = "" } = e;
          return (
            (0, a.useEffect)(() => {
              s &&
                performance.mark("mark_feature_usage", {
                  detail: { feature: "next-third-parties-".concat(s) },
                });
            }, [s]),
            (0, n.jsxs)(n.Fragment, {
              children: [
                l,
                t
                  ? (0, n.jsx)("div", {
                      style: {
                        height: null != r ? "".concat(r, "px") : "auto",
                        width: null != o ? "".concat(o, "px") : "auto",
                      },
                      "data-ntpc": s,
                      dangerouslySetInnerHTML: { __html: t },
                    })
                  : null,
              ],
            })
          );
        }));
      let n = r(95155),
        a = r(12115);
    },
    68197: function (e, t, r) {
      var n =
          (this && this.__rest) ||
          function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
              for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
                0 > t.indexOf(n[a]) &&
                  Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
                  (r[n[a]] = e[n[a]]);
            return r;
          },
        a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.GoogleAnalytics = void 0));
      let o = a(r(23817)),
        l = r(15781);
      t.GoogleAnalytics = (e) => {
        var t = n(e, []);
        return (0, l.formatData)(o.default, t);
      };
    },
    68321: (e, t, r) => {
      (r.r(t), r.d(t, { default: () => a.a }));
      var n = r(41402),
        a = r.n(n),
        o = {};
      for (let e in n) "default" !== e && (o[e] = () => n[e]);
      r.d(t, o);
    },
    68332: (e, t, r) => {
      let n;
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.GoogleAnalytics = function (e) {
          let { gaId: t, debugMode: r, dataLayerName: s = "dataLayer", nonce: u } = e;
          return (
            void 0 === n && (n = s),
            (0, o.useEffect)(() => {
              performance.mark("mark_feature_usage", {
                detail: { feature: "next-third-parties-ga" },
              });
            }, []),
            (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(l.default, {
                  id: "_next-ga-init",
                  dangerouslySetInnerHTML: {
                    __html: "\n          window['"
                      .concat(s, "'] = window['")
                      .concat(s, "'] || [];\n          function gtag(){window['")
                      .concat(
                        s,
                        "'].push(arguments);}\n          gtag('js', new Date());\n\n          gtag('config', '",
                      )
                      .concat(t, "' ")
                      .concat(r ? ",{ 'debug_mode': true }" : "", ");"),
                  },
                  nonce: u,
                }),
                (0, a.jsx)(l.default, {
                  id: "_next-ga",
                  src: "/__offline-noop.js?id=".concat(t),
                  nonce: u,
                }),
              ],
            })
          );
        }),
        (t.sendGAEvent = function () {
          for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
          if (void 0 === n)
            return void console.warn("@next/third-parties: GA has not been initialized");
          window[n]
            ? window[n].push(arguments)
            : console.warn("@next/third-parties: GA dataLayer ".concat(n, " does not exist"));
        }));
      let a = r(95155),
        o = r(12115),
        l = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(r(68321));
    },
    76784: function (e, t, r) {
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.sendGAEvent =
          t.GoogleAnalytics =
          t.sendGTMEvent =
          t.GoogleTagManager =
          t.YouTubeEmbed =
          t.GoogleMapsEmbed =
            void 0));
      var a = r(2037);
      Object.defineProperty(t, "GoogleMapsEmbed", {
        enumerable: !0,
        get: function () {
          return n(a).default;
        },
      });
      var o = r(37577);
      Object.defineProperty(t, "YouTubeEmbed", {
        enumerable: !0,
        get: function () {
          return n(o).default;
        },
      });
      var l = r(98202);
      (Object.defineProperty(t, "GoogleTagManager", {
        enumerable: !0,
        get: function () {
          return l.GoogleTagManager;
        },
      }),
        Object.defineProperty(t, "sendGTMEvent", {
          enumerable: !0,
          get: function () {
            return l.sendGTMEvent;
          },
        }));
      var s = r(68332);
      (Object.defineProperty(t, "GoogleAnalytics", {
        enumerable: !0,
        get: function () {
          return s.GoogleAnalytics;
        },
      }),
        Object.defineProperty(t, "sendGAEvent", {
          enumerable: !0,
          get: function () {
            return s.sendGAEvent;
          },
        }));
    },
    88246: (e) => {
      e.exports = JSON.parse(
        '{"id":"youtube-embed","description":"Embed a YouTube embed on your webpage.","website":"https://github.com/paulirish/lite-youtube-embed","html":{"element":"lite-youtube","attributes":{"videoid":null,"playlabel":null}},"stylesheets":["https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.css"],"scripts":[{"url":"https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.js","strategy":"idle","location":"head","action":"append"}]}',
      );
    },
    93438: function (e, t, r) {
      var n =
          (this && this.__rest) ||
          function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
              for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
                0 > t.indexOf(n[a]) &&
                  Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
                  (r[n[a]] = e[n[a]]);
            return r;
          },
        a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
      (Object.defineProperty(t, "__esModule", { value: !0 }), (t.YouTubeEmbed = void 0));
      let o = a(r(88246)),
        l = r(15781);
      t.YouTubeEmbed = (e) => {
        var t = n(e, []);
        return (0, l.formatData)(o.default, t);
      };
    },
    98202: (e, t, r) => {
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.sendGTMEvent = void 0),
        (t.GoogleTagManager = function (e) {
          let {
            gtmId: t,
            gtmScriptUrl: r,
            dataLayerName: s = "dataLayer",
            auth: u,
            preview: i,
            dataLayer: d,
            nonce: c,
          } = e;
          l = s;
          let g = new URL(r || "/__offline-noop.js");
          return (
            t && g.searchParams.set("id", t),
            "dataLayer" !== s && g.searchParams.set("l", s),
            u && g.searchParams.set("gtm_auth", u),
            i && (g.searchParams.set("gtm_preview", i), g.searchParams.set("gtm_cookies_win", "x")),
            (0, a.useEffect)(() => {
              performance.mark("mark_feature_usage", {
                detail: { feature: "next-third-parties-gtm" },
              });
            }, []),
            (0, n.jsxs)(n.Fragment, {
              children: [
                (0, n.jsx)(o.default, {
                  id: "_next-gtm-init",
                  dangerouslySetInnerHTML: {
                    __html:
                      "\n      (function(w,l){\n        w[l]=w[l]||[];\n        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});\n        "
                        .concat(
                          d ? "w[l].push(".concat(JSON.stringify(d), ")") : "",
                          "\n      })(window,'",
                        )
                        .concat(s, "');"),
                  },
                  nonce: c,
                }),
                (0, n.jsx)(o.default, {
                  id: "_next-gtm",
                  "data-ntpc": "GTM",
                  src: g.href,
                  nonce: c,
                }),
              ],
            })
          );
        }));
      let n = r(95155),
        a = r(12115),
        o = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(r(68321)),
        l = "dataLayer";
      t.sendGTMEvent = (e, t) => {
        let r = t || l;
        ((window[r] = window[r] || []), window[r].push(e));
      };
    },
  },
]);

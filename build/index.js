/*!
 *
 *   @aptero/axolotis-player v2.0.0
 *   https://github.com/ApteroSAS/axolotis-player
 *
 *   Copyright (c) Aptero (https://github.com/ApteroSAS/axolotis-player) and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define("axolotis-player", [], t)
    : "object" == typeof exports
    ? (exports["axolotis-player"] = t())
    : (e["axolotis-player"] = t());
})(self, function () {
  return (function () {
    "use strict";
    var e = {
        147: function (e) {
          e.exports = { i8: "2.0.0" };
        },
      },
      t = {};
    function o(n) {
      var r = t[n];
      if (void 0 !== r) return r.exports;
      var i = (t[n] = { exports: {} });
      return e[n](i, i.exports, o), i.exports;
    }
    (o.d = function (e, t) {
      for (var n in t)
        o.o(t, n) &&
          !o.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var n = {};
    return (
      (function () {
        o.r(n),
          o.d(n, {
            BUILD_VERSION: function () {
              return h;
            },
            CODE_LOADER_MODULE_NAME: function () {
              return m;
            },
            Entity: function () {
              return e;
            },
            InitialComponentLoader: function () {
              return f;
            },
            LazyEntity: function () {
              return x;
            },
            LazyServices: function () {
              return d;
            },
            Services: function () {
              return p;
            },
            WorldEntity: function () {
              return r;
            },
            createWorld: function () {
              return y;
            },
            getGlobalStorage: function () {
              return s;
            },
            initHtml: function () {
              return b;
            },
            initHtmlFromUrl: function () {
              return v;
            },
            instantiateLocalAsyncModule: function () {
              return c;
            },
            registerLocalModule: function () {
              return a;
            },
            registerLocalModuleList: function () {
              return l;
            },
          });
        class e {
          constructor() {
            var e, t, o;
            (o = []),
              (t = "components") in (e = this)
                ? Object.defineProperty(e, t, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = o);
          }
          addComponent(e) {
            return this.components.push(e), e;
          }
          removeAllComponents() {
            this.components.forEach((e) => {
              this.removeComponent(e);
            });
          }
          removeComponent(e) {
            return (
              "destroy" in e && e.destroy(),
              (this.components = this.components.filter((t) => t != e)),
              e
            );
          }
          addComponents(e) {
            e.forEach((e) => {
              this.addComponent(e);
            });
          }
          getComponents() {
            return this.components;
          }
          getComponentByType(e) {
            let t = [];
            return (
              this.components.forEach((o) => {
                o.getType() === e && t.push(o);
              }),
              t
            );
          }
          getComponentByTypeStartsWith(e) {
            let t = [];
            return (
              this.components.forEach((o) => {
                o.getType().startsWith(e) && t.push(o);
              }),
              t
            );
          }
          getFirstComponentByTypeStartsWith(e) {
            return this.getComponentByTypeStartsWith(e)[0];
          }
          getFirstComponentByType(e) {
            return this.getComponentByType(e)[0];
          }
          getType() {
            return e.name;
          }
        }
        var t = e;
        class r extends t {
          constructor() {
            super();
          }
          getType() {
            return r.name;
          }
        }
        var i = null;
        function s(e) {
          return (
            "undefined" != typeof window &&
              (window.axolotis || (window.axolotis = {})),
            i || "undefined" == typeof window || (i = window.axolotis),
            i || (i = {}),
            i[e] || (i[e] = {}),
            i[e]
          );
        }
        function a(e, t, o) {
          if ((o || (o = s("localModules")), o[e]))
            throw new Error("Module already defined");
          o[e] = t;
        }
        function l(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            o = arguments.length > 2 ? arguments[2] : void 0;
          o || (o = s("localModules")),
            t && console.log("imported module :", e),
            Object.assign(o, e);
        }
        async function c(e, t) {
          const o = await t[e](),
            n = o.module;
          for (const e in n) {
            const t = n[e];
            if (t.prototype && t.prototype.constructor.name === o.classname)
              return new t();
          }
          throw new Error("invalid factory " + e + " - " + o.classname);
        }
        async function u(e, t) {
          let o = null;
          if (!t || !t[e])
            throw e.startsWith("http")
              ? new Error("remote modules not implemented yet")
              : (console.log("local module installed:", t),
                new Error("unknown module - please register it - " + e));
          return (o = await c(e, t)), o;
        }
        class d {
          constructor(e) {
            var t, o, n;
            (this.world = e),
              (n = {}),
              (o = "service") in (t = this)
                ? Object.defineProperty(t, o, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[o] = n);
          }
          getWorld() {
            return this.world;
          }
          setService(e, t) {
            this.service[e] = Promise.resolve(t);
          }
          async getService(e) {
            if (this.service[e]) {
              const t = await this.service[e];
              if (!t) throw new Error("error");
              return t;
            }
            if (!this.service[e]) {
              let t = u(e, (await this.service[m]).getModuleStorage());
              this.service[e] = new Promise(async (e) => {
                e(await (await t).createService(this));
              });
            }
            return await this.service[e];
          }
        }
        class p extends d {
          getType() {
            return p.name;
          }
        }
        function g(e, t, o) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: o,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = o),
            e
          );
        }
        class f {
          constructor() {
            g(this, "initialLoading", void 0),
              g(this, "initialLoadingResolver", void 0),
              g(this, "moduleStorage", void 0),
              (this.initialLoading = new Promise((e) => {
                this.initialLoadingResolver = e;
              }));
          }
          getType() {
            return f.name;
          }
          getModuleStorage() {
            return this.moduleStorage;
          }
          async awaitInitialLoading() {
            await this.initialLoading;
          }
          async startLoading(e, t, o, n) {
            if (((this.moduleStorage = n), "2.0" !== t.version))
              throw new Error("unsupported");
            let r = [];
            for (const o of t.entities)
              for (const t of o.components) {
                let o = t.config;
                r.push(
                  () =>
                    new Promise(async (r, i) => {
                      const s = await u(t.module, n);
                      let a = await s.createComponent(e, o || {});
                      if (!a.getType)
                        throw new Error(
                          "Not a component : " +
                            t.module +
                            " " +
                            a.constructor.name
                        );
                      e.addComponent(a), r(s);
                    })
                );
              }
            let i = (function (e, t) {
              let o = [],
                n = 0;
              for (const r of e) {
                const i = r();
                o.push(i),
                  i.then(() => {
                    n++, t(n, e.length);
                  });
              }
              return Promise.all(o);
            })(r, o);
            return (
              i.then((e) => {
                void 0 !== this.initialLoadingResolver &&
                  this.initialLoadingResolver(e);
              }),
              i.catch((e) => {
                console.error(e);
              }),
              i
            );
          }
        }
        const m = "@aptero/axolotis-player/core/loader/InitialComponentLoader";
        async function y() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : { version: "2.0", entities: [] },
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : () => {},
            o = arguments.length > 2 ? arguments[2] : void 0;
          o || (o = s("localModules"));
          let n = new r(),
            i = new p(n);
          n.addComponent(i);
          let a = new f();
          return i.setService(m, a), await a.startLoading(n, e, t, o), n;
        }
        const h = o(147).i8;
        console.log("Axolotis-player version :" + h);
        const w = (e) => {
          "complete" === document.readyState && document.body
            ? e()
            : window.addEventListener("DOMContentLoaded", e);
        };
        async function v(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          t.onProgress ||
            (t.onProgress = (t, o) => {
              console.log("[" + e + "] : [" + t + "/" + o + "]");
            }),
            t.onLoaded ||
              (t.onLoaded = () => {
                console.log("[" + e + "] : loading complete");
              });
          const o = await fetch(e),
            n = await o.text(),
            r = new DOMParser(),
            i = r.parseFromString(n, "text/html");
          let s = i.body.getElementsByTagName("ax-scene");
          if (!s || (s && 0 == s.length))
            return (
              console.warn("Axolotis scene not found (no tag ax-scene)"),
              void t.onLoaded()
            );
          console.log(s);
          const a = await y(L(s), t.onProgress);
          return t.onLoaded(), a;
        }
        function b() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          e.onProgress ||
            (e.onProgress = (e, t) => {
              console.log("[" + e + "/" + t + "]");
            }),
            e.onLoaded ||
              (e.onLoaded = () => {
                console.log("loading complete");
              }),
            w(() => {
              let t = window.document.body.getElementsByTagName("ax-scene");
              if (!t || (t && 0 == t.length))
                return (
                  console.warn("Axolotis scene not found (no tag ax-scene)"),
                  void e.onLoaded()
                );
              console.log(t), y(L(t), e.onProgress).then(e.onLoaded);
            });
        }
        function L(e) {
          let t = e[0];
          const o = { version: "2.0", entities: [] };
          for (const e of t.getElementsByTagName("ax-entity")) {
            let t = { components: [] };
            for (const o of e.getElementsByTagName("ax-component")) {
              let e = JSON.stringify({});
              o.getAttribute("config") &&
                (e = o
                  .getAttribute("config")
                  .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));
              let n = {
                module: o.getAttribute("module"),
                config: JSON.parse(e),
              };
              t.components.push(n);
            }
            o.entities.push(t);
          }
          return o;
        }
        class x extends t {
          constructor(e) {
            super(), (this.world = e);
          }
          async addComponentAsync(e) {
            let t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              o = this.world.getFirstComponentByType(p.name),
              n = u(e, (await o.getService(m)).getModuleStorage());
            return await (await n).createComponent(this.world, t);
          }
          getType() {
            return x.name;
          }
        }
      })(),
      n
    );
  })();
});
//# sourceMappingURL=index.js.map

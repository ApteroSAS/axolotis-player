/*!
 *
 *   @aptero/axolotis-player v1.0.0
 *   https://github.com/ApteroSAS/axolotis-player
 *
 *   Copyright (c) Aptero (https://github.com/ApteroSAS/axolotis-player) and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!(function (e, o) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = o())
    : "function" == typeof define && define.amd
    ? define("axolotis-player", [], o)
    : "object" == typeof exports
    ? (exports["axolotis-player"] = o())
    : (e["axolotis-player"] = o());
})(self, function () {
  return (function () {
    "use strict";
    var e = {
        630: function (e, o, t) {
          function n(e, o, t) {
            return (
              o in e
                ? Object.defineProperty(e, o, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[o] = t),
              e
            );
          }
          t.r(o),
            t.d(o, {
              Factory: function () {
                return r;
              },
              FrameLoop: function () {
                return i;
              },
            });
          class r {
            async createService(e) {
              let o = await e.getService(
                  "@aptero/axolotis-player/modules/core/loader/CodeLoaderService"
                ),
                t = new i();
              return (
                o.awaitInitialLoading().then(() => {
                  t.startAnimationFrameLoop();
                }),
                t
              );
            }
          }
          class i {
            constructor() {
              n(this, "loops", {}),
                n(this, "prevTime", 0),
                n(this, "monitoringStart", () => {}),
                n(this, "monitoringEnd", () => {});
            }
            startAnimationFrameLoop() {
              const e = (o) => {
                this.monitoringStart(i.name);
                const t = o - this.prevTime;
                (this.prevTime = o), requestAnimationFrame(e);
                for (const e in this.loops)
                  this.monitoringStart(e),
                    this.loops[e](t),
                    this.monitoringEnd(e);
                this.monitoringEnd(i.name);
              };
              requestAnimationFrame(e);
            }
            setMonitoringCallback(e, o) {
              (this.monitoringStart = e), (this.monitoringEnd = o);
            }
            removeLoop(e) {
              delete this.loops[e],
                this.monitoringStart(e),
                this.monitoringEnd(e);
            }
            addLoop(e, o) {
              if (this.loops[e]) throw new Error();
              this.loops[e] = o;
            }
            getType() {
              return i.name;
            }
          }
        },
        905: function (e, o, t) {
          t.r(o),
            t.d(o, {
              Factory: function () {
                return r;
              },
              WorldService: function () {
                return d;
              },
              registerNewWorld: function () {
                return c;
              },
            });
          var n = t(454);
          class r {
            constructor() {}
            async createService(e) {
              return new d(e);
            }
          }
          let i = -1,
            s = [],
            a = [],
            l = [];
          function c(e) {
            s.push(e),
              i < 0 &&
                ((i = 0),
                (window.axolotis.world = s[i]),
                (window.axolotis.activeWorld = i));
          }
          window &&
            (window.axolotis || (window.axolotis = {}),
            (window.axolotis.worlds = s),
            (window.axolotis.activeWorld = i));
          class d {
            constructor(e) {
              var o, t, r;
              (r = void 0),
                (t = "world") in (o = this)
                  ? Object.defineProperty(o, t, {
                      value: r,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (o[t] = r),
                console.log("info");
              let s = null;
              for (const o of this.getWorlds()) {
                o.getFirstComponentByType(n.e.name) == e && (s = o);
              }
              if (!s) throw new Error();
              (this.world = s),
                e
                  .getService(
                    "@aptero/axolotis-player/modules/core/loader/CodeLoaderService"
                  )
                  .then(async (e) => {
                    e.awaitInitialLoading();
                    for (const e of l) e();
                  }),
                i >= 0 && this.setActiveWorldByNumber(i);
            }
            getType() {
              return d.name;
            }
            getWorlds() {
              return s;
            }
            getActiveWorld() {
              return s[i];
            }
            isActiveWorld() {
              return this.world == this.getActiveWorld();
            }
            addOnWorldChangeCallback(e) {
              let o =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              a.push(e), o && e();
            }
            addOnWorldAdded(e) {
              let o =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              l.push(e), o && e();
            }
            setActiveWorld(e) {
              for (let o = 0; o < this.getWorlds().length; o++)
                if (e == this.getWorlds()[o])
                  return void this.setActiveWorldByNumber(o);
              throw new Error();
            }
            setActiveWorldByNumber(e) {
              if (i != e) {
                (i = e),
                  window &&
                    window.axolotis &&
                    ((window.axolotis.activeWorld = i),
                    (window.axolotis.world = s[i]));
                for (const e of a) e();
              }
            }
          }
        },
        82: function (e, o, t) {
          t.d(o, {
            Vf: function () {
              return s;
            },
            Ag: function () {
              return r;
            },
            dK: function () {
              return i;
            },
          }),
            window &&
              (window.axolotis || (window.axolotis = {}),
              window.axolotis.localModule ||
                (window.axolotis.localModule = {}));
          let n = window.axolotis.localModule || {};
          function r(e, o) {
            if (n[e]) throw new Error("Module already defined");
            n[e] = o;
          }
          function i(e) {
            let o =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            o && console.log("imported module :", e), Object.assign(n, e);
          }
          async function s(e) {
            let o = null;
            if (!n[e])
              throw (
                (console.log("local module installed:", n),
                new Error("unknown module - please register it - " + e))
              );
            return (
              (o = await (async function (e) {
                let o =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                const t = await o[e](),
                  n = t.module;
                for (const e in n) {
                  const o = n[e];
                  if (
                    o.prototype &&
                    o.prototype.constructor.name === t.classname
                  )
                    return new o();
                }
                throw new Error("invalid factory " + e + " - " + t.classname);
              })(e, n)),
              o
            );
          }
          i(
            (function () {
              let e = {
                "@aptero/axolotis-player/modules/core/WorldService":
                  async () => {
                    const e = await Promise.resolve().then(t.bind(t, 905));
                    return { module: e, classname: e.Factory.name };
                  },
                "@aptero/axolotis-player/modules/FrameLoop": async () => {
                  const e = await Promise.resolve().then(t.bind(t, 630));
                  return { module: e, classname: e.Factory.name };
                },
              };
              return e;
            })()
          );
        },
        240: function (e, o, t) {
          t.d(o, {
            i: function () {
              return r;
            },
          });
          var n = t(82);
          class r {
            constructor() {
              var e, o, t;
              (t = {}),
                (o = "service") in (e = this)
                  ? Object.defineProperty(e, o, {
                      value: t,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (e[o] = t);
            }
            setService(e, o) {
              this.service[e] = Promise.resolve(o);
            }
            async getService(e) {
              if (this.service[e]) {
                const o = await this.service[e];
                if (!o) throw new Error("error");
                return o;
              }
              if (!this.service[e]) {
                let o = (0, n.Vf)(e);
                this.service[e] = new Promise(async (e) => {
                  e(await (await o).createService(this));
                });
              }
              return await this.service[e];
            }
          }
        },
        454: function (e, o, t) {
          t.d(o, {
            e: function () {
              return r;
            },
          });
          var n = t(240);
          class r extends n.i {
            getType() {
              return r.name;
            }
          }
        },
        147: function (e) {
          e.exports = { i8: "1.0.0" };
        },
      },
      o = {};
    function t(n) {
      var r = o[n];
      if (void 0 !== r) return r.exports;
      var i = (o[n] = { exports: {} });
      return e[n](i, i.exports, t), i.exports;
    }
    (t.d = function (e, o) {
      for (var n in o)
        t.o(o, n) &&
          !t.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: o[n] });
    }),
      (t.o = function (e, o) {
        return Object.prototype.hasOwnProperty.call(e, o);
      }),
      (t.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var n = {};
    return (
      (function () {
        t.r(n),
          t.d(n, {
            CodeLoaderComponent: function () {
              return i;
            },
            FrameLoop: function () {
              return h.FrameLoop;
            },
            LazyServices: function () {
              return f.i;
            },
            ServiceEntity: function () {
              return e.e;
            },
            WorldEntity: function () {
              return c;
            },
            WorldService: function () {
              return l.WorldService;
            },
            initHtml: function () {
              return p;
            },
            initHtmlFromUrl: function () {
              return m;
            },
            registerLocalModule: function () {
              return o.Ag;
            },
            registerLocalModuleList: function () {
              return o.dK;
            },
          });
        var e = t(454),
          o = t(82);
        function r(e, o, t) {
          return (
            o in e
              ? Object.defineProperty(e, o, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[o] = t),
            e
          );
        }
        class i {
          constructor() {
            r(this, "initialLoading", void 0),
              r(this, "initialLoadingResolver", void 0),
              (this.initialLoading = new Promise((e) => {
                this.initialLoadingResolver = e;
              }));
          }
          getType() {
            return i.name;
          }
          async awaitInitialLoading() {
            await this.initialLoading;
          }
          async startLoadingJson(t, n, r) {
            let i = [];
            for (const e of n.entities)
              for (const n of e.components) {
                let e = n.config;
                i.push(
                  () =>
                    new Promise(async (r, i) => {
                      const s = await (0, o.Vf)(n.module);
                      let a = await s.createComponent(t, e || {});
                      if (!a.getType)
                        throw new Error(
                          "Not a component : " +
                            n.module +
                            " " +
                            a.constructor.name
                        );
                      t.addComponent(a), r(s);
                    })
                );
              }
            for (const o of n.services)
              i.push(
                () =>
                  new Promise(async (n, r) => {
                    let i = await t.getFirstComponentByType(e.e.name);
                    await i.getService(o.module), n(i);
                  })
              );
            let s = (function (e, o) {
              let t = [],
                n = 0;
              for (const r of e) {
                const i = r();
                t.push(i),
                  i.then(() => {
                    n++, o(n, e.length);
                  });
              }
              return Promise.all(t);
            })(i, r);
            return (
              s.then((e) => {
                void 0 !== this.initialLoadingResolver &&
                  this.initialLoadingResolver(e);
              }),
              s.catch((e) => {
                console.error(e);
              }),
              s
            );
          }
        }
        function s(e, o, t) {
          return (
            o in e
              ? Object.defineProperty(e, o, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[o] = t),
            e
          );
        }
        var a = class {
            constructor(e) {
              (this.name = e),
                s(this, "components", []),
                s(this, "waitingForComponent", {});
            }
            addComponent(e) {
              if (
                (this.components.push(e), this.waitingForComponent[e.getType()])
              ) {
                for (const o of this.waitingForComponent[e.getType()]) o(e);
                delete this.waitingForComponent[e.getType()];
              }
              return e;
            }
            removeAllComponents() {
              this.components.forEach((e) => {
                this.removeComponent(e);
              });
            }
            removeComponent(e) {
              return (
                "destroy" in e && e.destroy(),
                (this.components = this.components.filter((o) => o != e)),
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
              let o = [];
              return (
                this.components.forEach((t) => {
                  t.getType() === e && o.push(t);
                }),
                o
              );
            }
            getComponentByTypeStartsWith(e) {
              let o = [];
              return (
                this.components.forEach((t) => {
                  t.getType().startsWith(e) && o.push(t);
                }),
                o
              );
            }
            getFirstComponentByTypeStartsWith(e) {
              return this.getComponentByTypeStartsWith(e)[0];
            }
            getFirstComponentByType(e) {
              return this.getComponentByType(e)[0];
            }
            async getFirstComponentByTypeAsync(e) {
              if (this.getComponentByType(e)[0])
                return this.getComponentByType(e)[0];
              return (
                this.waitingForComponent[e] ||
                  (this.waitingForComponent[e] = []),
                new Promise((o, t) => {
                  this.waitingForComponent[e].push(o);
                })
              );
            }
            getType() {
              return this.name;
            }
          },
          l = t(905);
        class c extends a {
          constructor() {
            super("world"), (0, l.registerNewWorld)(this);
          }
        }
        const d = t(147).i8;
        console.log(d);
        const u = (e) => {
          "complete" === document.readyState && document.body
            ? e()
            : window.addEventListener("DOMContentLoaded", e);
        };
        async function m(o) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          t.onProgress ||
            (t.onProgress = (e, t) => {
              console.log("[" + o + "] : [" + e + "/" + t + "]");
            }),
            t.onLoaded ||
              (t.onLoaded = () => {
                console.log("[" + o + "] : loading complete");
              });
          let n = new e.e(),
            r = new c();
          r.addComponent(n);
          let s = new i();
          n.setService(
            "@aptero/axolotis-player/modules/core/loader/CodeLoaderService",
            s
          );
          const a = await fetch(o),
            l = await a.text(),
            d = new DOMParser(),
            u = d.parseFromString(l, "text/html");
          let m = u.body.getElementsByTagName("ax-scene");
          return !m || (m && 0 == m.length)
            ? (console.warn("Axolotis scene not found (no tag ax-scene)"),
              void t.onLoaded())
            : (console.log(m),
              await s.startLoadingJson(r, g(m), t.onProgress),
              t.onLoaded(),
              r);
        }
        function p() {
          let o =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          o.onProgress ||
            (o.onProgress = (e, o) => {
              console.log("[" + e + "/" + o + "]");
            }),
            o.onLoaded ||
              (o.onLoaded = () => {
                console.log("loading complete");
              });
          let t = new e.e(),
            n = new c();
          n.addComponent(t);
          let r = new i();
          return (
            t.setService(
              "@aptero/axolotis-player/modules/core/loader/CodeLoaderService",
              r
            ),
            u(() => {
              let e = window.document.body.getElementsByTagName("ax-scene");
              if (!e || (e && 0 == e.length))
                return (
                  console.warn("Axolotis scene not found (no tag ax-scene)"),
                  void o.onLoaded()
                );
              console.log(e),
                r.startLoadingJson(n, g(e), o.onProgress).then(o.onLoaded);
            }),
            n
          );
        }
        function g(e) {
          let o = e[0];
          const t = { version: "2.0", entities: [], services: [] };
          for (const e of o.getElementsByTagName("ax-entity")) {
            let o = { components: [] };
            for (const t of e.getElementsByTagName("ax-component")) {
              let e = t
                  .getAttribute("config")
                  .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '),
                n = { module: t.getAttribute("module"), config: JSON.parse(e) };
              o.components.push(n);
            }
            t.entities.push(o);
          }
          for (const e of o.getElementsByTagName("ax-service"))
            t.services.push({ module: e.getAttribute("module") });
          return t;
        }
        var f = t(240),
          h = t(630);
      })(),
      n
    );
  })();
});
//# sourceMappingURL=index.js.map

/*!
 * 
 *   @aptero/axolotis-player v1.1.3
 *   https://github.com/ApteroSAS/axolotis-player
 *
 *   Copyright (c) Aptero (https://github.com/ApteroSAS/axolotis-player) and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!function webpackUniversalModuleDefinition(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("axolotis-player",[],t):"object"==typeof exports?exports["axolotis-player"]=t():e["axolotis-player"]=t()}(this,(function(){return function(){"use strict";var e={147:function(e){e.exports={i8:"1.1.3"}}},t={};function __webpack_require__(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,__webpack_require__),r.exports}__webpack_require__.d=function(e,t){for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return function(){__webpack_require__.r(n),__webpack_require__.d(n,{BUILD_VERSION:function(){return a},CODE_LOADER_MODULE_NAME:function(){return i},Entity:function(){return Entity},GLOBAL_LOCAL_MODULE:function(){return r},GLOBAL_WORLDS_ENTITY:function(){return o},InitialComponentLoader:function(){return InitialComponentLoader},LazyEntity:function(){return LazyEntity},LazyServices:function(){return LazyServices},Services:function(){return Services},WorldEntity:function(){return WorldEntity},createWorld:function(){return createWorld},createWorldSync:function(){return createWorldSync},getGlobalStorage:function(){return getGlobalStorage},getGlobalStorageValue:function(){return getGlobalStorageValue},getGlobalWorld:function(){return getGlobalWorld},getService:function(){return getService},getServiceSync:function(){return getServiceSync},initHtml:function(){return initHtml},initHtmlFromUrl:function(){return initHtmlFromUrl},instantiateLocalAsyncModule:function(){return instantiateLocalAsyncModule},registerItem:function(){return registerItem},registerLocalModule:function(){return registerLocalModule},setGlobalStorageValue:function(){return setGlobalStorageValue}});class Entity{constructor(){!function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(this,"components",[])}addComponent(e){return e.init&&e.init(),this.components.push(e),e}removeAllComponents(){this.components.forEach((e=>{this.removeComponent(e)}))}removeComponent(e){return e.destroy&&e.destroy(),this.components=this.components.filter((t=>t!=e)),e}addComponents(e){e.forEach((e=>{this.addComponent(e)}))}getComponents(){return this.components}getComponentByType(e){let t=[];return this.components.forEach((n=>{n.getType()===e&&t.push(n)})),t}getComponentByTypeStartsWith(e){let t=[];return this.components.forEach((n=>{n.getType().startsWith(e)&&t.push(n)})),t}getFirstComponentByTypeStartsWith(e){return this.getComponentByTypeStartsWith(e)[0]}getFirstComponentByType(e){return this.getComponentByType(e)[0]}getType(){return Entity.name}}var e=Entity;class WorldEntity extends e{constructor(){super()}getType(){return WorldEntity.name}}var t=null;const o="worlds",r="localModules";function getGlobalStorage(){return"undefined"!=typeof window&&(window.axolotis||(window.axolotis={})),t||"undefined"==typeof window||(t=window.axolotis),t||(t={}),t}function setGlobalStorageValue(e,t){getGlobalStorage()[e]=t}function getGlobalStorageValue(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=getGlobalStorage();return!n[e]&&t&&(n[e]={}),n[e]}function registerLocalModule(e,t,n){if(n||(n=getGlobalStorageValue(r)),n[e])throw new Error("Module already defined");n[e]=t}function getClassName(e){if(e.classname)return e.classname;if(e.default&&e.default.name)return e.default.name;throw console.error(e),new Error("Malformed module")}async function instantiateLocalAsyncModule(e,t,n,o){const r=await t[e]();let i=r.module;i||(i=r);let a={},l=!1;for(const e in i){const t=i[e];t.prototype&&t.prototype.constructor.name&&(a[t.prototype.constructor.name]&&(l=!0),a[t.prototype.constructor.name]=!0)}for(const e in i){const t=i[e];let a;if(a=l&&t.prototype&&t.prototype.constructor.name===getClassName(r)||e===getClassName(r),a){let e=[];if(t.dependencies)for(let o=0;o<t.dependencies.length;o++){const r=t.dependencies[o];let i=n.getFirstComponentByType(Services.name),a=await i.getService(r);e.push(a)}return null!=o?new t(...e,o):new t(...e)}}throw new Error("invalid submodule "+e+" - "+getClassName(r))}async function instantiateAsyncModule(e,t,n,o){let r=null;if(!t||!t[e])throw e.startsWith("http")?new Error("remote modules not implemented yet"):(console.log("local module installed:",t),new Error("unknown module - please register it - "+e));return r=await instantiateLocalAsyncModule(e,t,n,o),r}function InitialComponentLoader_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const i="@aptero/axolotis-player/core/loader/InitialComponentLoader";class InitialComponentLoader{constructor(){InitialComponentLoader_defineProperty(this,"initialLoading",void 0),InitialComponentLoader_defineProperty(this,"initialLoadingResolver",void 0),InitialComponentLoader_defineProperty(this,"moduleStorage",void 0),this.initialLoading=new Promise((e=>{this.initialLoadingResolver=e}))}getType(){return InitialComponentLoader.name}getModuleStorage(){return this.moduleStorage}async awaitInitialLoading(){await this.initialLoading}async startLoading(e,t,n,o){if(this.moduleStorage=o,"2.0"!==t.version)throw new Error("unsupported");let r=[];for(const n of t.entities)for(const t of n.components){let n=t.config;r.push((()=>new Promise((async(r,i)=>{let a=await instantiateAsyncModule(t.module,o,e,n||{}),l=a.getType?a:await a.createComponent(e,n||{});if(!l.getType)throw new Error("Not a component : "+t.module+" "+l.constructor.name);e.addComponent(l),r(a)}))))}let i=function load(e,t){let n=[],o=0;for(const r of e){const i=r();n.push(i),i.then((()=>{o++,t(o,e.length)}))}return Promise.all(n)}(r,n);return i.then((e=>{void 0!==this.initialLoadingResolver&&this.initialLoadingResolver(e)})),i.catch((e=>{console.error(e)})),i}}function LazyServices_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class LazyServices{constructor(e){this.world=e,LazyServices_defineProperty(this,"serviceAsync",{}),LazyServices_defineProperty(this,"service",{})}getWorld(){return this.world}setService(e,t){if(!(arguments.length>2&&void 0!==arguments[2]&&arguments[2])&&(this.serviceAsync[e]||this.service[e]))throw new Error("Service already exist (use replace to force)");this.serviceAsync[e]=Promise.resolve(t),this.service[e]=t,t.init&&t.init()}async getService(e){if(this.serviceAsync[e]){const t=await this.serviceAsync[e];if(!t)throw new Error("error");return t}if(!this.serviceAsync[e]){let t=(await this.serviceAsync[i]).getModuleStorage(),n=instantiateAsyncModule(e,t,this.world);this.serviceAsync[e]=new Promise((async t=>{let o=await n,r=o.getType?o:await o.createService(this);this.service[e]=r,r.init&&r.init(),t(r)}))}return await this.serviceAsync[e]}}class Services extends LazyServices{getType(){return Services.name}getServiceSync(e){if(this.service[e])return this.service[e];throw new Error("service not found : "+e)}}function createWorldSync(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{version:"2.0",entities:[]},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:()=>{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>{},a=arguments.length>3?arguments[3]:void 0,l=arguments.length>4?arguments[4]:void 0;l||(l=new WorldEntity),getGlobalStorageValue(o,!1)?getGlobalStorageValue(o).push(l):setGlobalStorageValue(o,[l]),a||(a=getGlobalStorageValue(r));let s=new Services(l);l.addComponent(s);let c={};c[i]||(c[i]=new InitialComponentLoader);for(const e in c)l.getFirstComponentByType(Services.name).setService(e,c[e]);return c[i].startLoading(l,e,t,a).then((()=>{n(l)})),l}async function createWorld(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{version:"2.0",entities:[]},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:()=>{},n=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0;return new Promise((r=>{createWorldSync(e,t,r,n,o)}))}const a=__webpack_require__(147).i8;console.log("Axolotis-player version :"+a);const windowReady=e=>{"complete"===document.readyState&&document.body?e():window.addEventListener("DOMContentLoaded",e)};async function initHtmlFromUrl(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.onProgress||(t.onProgress=(t,n)=>{console.log("["+e+"] : ["+t+"/"+n+"]")}),t.onLoaded||(t.onLoaded=()=>{console.log("["+e+"] : loading complete")});const n=await fetch(e),o=await n.text(),r=new DOMParser,i=r.parseFromString(o,"text/html");let a=i.body.getElementsByTagName("ax-scene");if(!a||a&&0==a.length)return console.warn("Axolotis scene not found (no tag ax-scene)"),void t.onLoaded();console.log(a);const l=await createWorld(htmlToJson(a),t.onProgress);return t.onLoaded(),l}function initHtml(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.onProgress||(e.onProgress=(e,t)=>{console.log("["+e+"/"+t+"]")}),e.onLoaded||(e.onLoaded=e=>{console.log("loading complete")}),windowReady((()=>{let t=window.document.body.getElementsByTagName("ax-scene");if(!t||t&&0==t.length)return console.warn("Axolotis scene not found (no tag ax-scene)"),void createWorld().then(e.onLoaded);console.log(t),createWorld(htmlToJson(t),e.onProgress).then(e.onLoaded)}))}function htmlToJson(e){let t=e[0];const n={version:"2.0",entities:[]};for(const e of t.getElementsByTagName("ax-entity")){let t={components:[]};for(const n of e.getElementsByTagName("ax-component")){let e=JSON.stringify({});n.getAttribute("config")&&(e=n.getAttribute("config").replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g,'"$2": '));let o={module:n.getAttribute("module"),config:JSON.parse(e)};t.components.push(o)}n.entities.push(t)}return n}function getGlobalWorld(){let e=getGlobalStorageValue(o,!1);if(e&&e.length>0)return e[0];throw new Error("No Axolotis world initialized")}function getServiceSync(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return t||(t=getGlobalWorld()),t.getFirstComponentByType(Services.name).getServiceSync(e)}async function getService(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return t||(t=getGlobalWorld()),t.getFirstComponentByType(Services.name).getService(e)}class LazyEntity extends e{constructor(e){super(),this.world=e}async addComponentAsync(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this.world.getFirstComponentByType(Services.name),o=instantiateAsyncModule(e,(await n.getService(i)).getModuleStorage(),this.world,t||{}),r=await await o;return r.getType?r:await r.createComponent(this.world,t||{})}getType(){return LazyEntity.name}}function registerItem(e){let t=e.modules();for(const e in t)registerLocalModule(e,t[e])}}(),n}()}));
//# sourceMappingURL=index.js.map
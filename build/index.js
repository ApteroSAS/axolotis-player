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
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("axolotis-player",[],e):"object"==typeof exports?exports["axolotis-player"]=e():t["axolotis-player"]=e()}(self,(function(){return function(){"use strict";var t,e,o={630:function(t,e,o){function n(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.r(e),o.d(e,{Factory:function(){return r},FrameLoop:function(){return i}});class r{async createService(t){let e=await t.getService("@root/lib/modules/core/loader/CodeLoaderService"),o=new i;return e.awaitInitialLoading().then((()=>{o.startAnimationFrameLoop()})),o}}class i{constructor(){n(this,"loops",{}),n(this,"prevTime",0),n(this,"monitoringStart",(()=>{})),n(this,"monitoringEnd",(()=>{}))}startAnimationFrameLoop(){const t=e=>{this.monitoringStart(i.name);const o=e-this.prevTime;this.prevTime=e,requestAnimationFrame(t);for(const t in this.loops)this.monitoringStart(t),this.loops[t](o),this.monitoringEnd(t);this.monitoringEnd(i.name)};requestAnimationFrame(t)}setMonitoringCallback(t,e){this.monitoringStart=t,this.monitoringEnd=e}removeLoop(t){delete this.loops[t],this.monitoringStart(t),this.monitoringEnd(t)}addLoop(t,e){if(this.loops[t])throw new Error;this.loops[t]=e}getType(){return i.name}}},905:function(t,e,o){o.r(e),o.d(e,{Factory:function(){return r},WorldService:function(){return u},registerNewWorld:function(){return l}});var n=o(454);class r{constructor(){}async createService(t){return new u(t)}}let i=-1,s=[],a=[],c=[];function l(t){s.push(t),i<0&&(i=0,window.axolotis.world=s[i],window.axolotis.activeWorld=i)}window&&(window.axolotis||(window.axolotis={}),window.axolotis.worlds=s,window.axolotis.activeWorld=i);class u{constructor(t){console.log("info");let e=null;for(const o of this.getWorlds()){o.getFirstComponentByType(n.e.name)==t&&(e=o)}if(!e)throw new Error;this.world=e,t.getService("@root/lib/modules/core/loader/CodeLoaderService").then((async t=>{t.awaitInitialLoading();for(const t of c)t()})),i>=0&&this.setActiveWorldByNumber(i)}getType(){return u.name}getWorlds(){return s}getActiveWorld(){return s[i]}isActiveWorld(){return this.world==this.getActiveWorld()}addOnWorldChangeCallback(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];a.push(t),e&&t()}addOnWorldAdded(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];c.push(t),e&&t()}setActiveWorld(t){for(let e=0;e<this.getWorlds().length;e++)if(t==this.getWorlds()[e])return void this.setActiveWorldByNumber(e);throw new Error}setActiveWorldByNumber(t){if(i!=t){i=t,window&&window.axolotis&&(window.axolotis.activeWorld=i,window.axolotis.world=s[i]);for(const t of a)t()}}}},747:function(t,e,o){async function n(t,e){if("@root/lib/modules/core/WorldService"===t&&"Factory"===e){return(await Promise.resolve().then(o.bind(o,905))).Factory.name}if("@root/lib/modules/FrameLoop"===t&&"Factory"===e){return(await Promise.resolve().then(o.bind(o,630))).Factory.name}throw new Error("Class Not Found")}async function r(t,e){const r=await async function(t){switch(t){case"@root/lib/modules/core/WorldService":return Promise.resolve().then(o.bind(o,905));case"@root/lib/modules/FrameLoop":return Promise.resolve().then(o.bind(o,630));default:throw new Error(t+" not found in module list - please run npm run pre-build")}}(t);for(const o in r){const i=r[o];if(i.prototype&&i.prototype.constructor.name===await n(t,e))return new i}throw new Error("invalid factory "+t+" - "+e)}o.d(e,{V:function(){return a},A:function(){return s}});let i={};function s(t,e){i[t]=e}async function a(t,e){let o=null;return o=i[t]?await async function(t,e){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const n=await o[t]();for(const t in n){const o=n[t];if(o.prototype&&o.prototype.constructor.name===e)return new o}throw new Error("invalid factory "+t+" - "+e)}(t,e,i):await r(t,e),o}},240:function(t,e,o){o.d(e,{i:function(){return r}});var n=o(747);class r{constructor(){var t,e,o;o={},(e="service")in(t=this)?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o}toId(t,e){return t+":"+e}setService(t,e){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Factory";this.service[this.toId(t,o)]=Promise.resolve(e)}async getService(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Factory";if(this.service[this.toId(t,e)]){const o=await this.service[this.toId(t,e)];if(!o)throw new Error("error");return o}if(!this.service[this.toId(t,e)]){let o=(0,n.V)(t,e);this.service[this.toId(t,e)]=new Promise((async t=>{t(await(await o).createService(this))}))}return await this.service[this.toId(t,e)]}}},454:function(t,e,o){o.d(e,{e:function(){return r}});var n=o(240);class r extends n.i{getType(){return r.name}}},147:function(t){t.exports={i8:"1.0.0"}}},n={};function r(t){var e=n[t];if(void 0!==e)return e.exports;var i=n[t]={exports:{}};return o[t](i,i.exports,r),i.exports}r.m=o,r.d=function(t,e){for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},r.f={},r.e=function(t){return Promise.all(Object.keys(r.f).reduce((function(e,o){return r.f[o](t,e),e}),[]))},r.u=function(t){return t+".js"},r.miniCssF=function(t){},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},t={},e="axolotis-player:",r.l=function(o,n,i,s){if(t[o])t[o].push(n);else{var a,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==e+i){a=d;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",e+i),a.src=o),t[o]=[n];var m=function(e,n){a.onerror=a.onload=null,clearTimeout(p);var r=t[o];if(delete t[o],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((function(t){return t(n)})),e)return e(n)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=m.bind(null,a.onerror),a.onload=m.bind(null,a.onload),c&&document.head.appendChild(a)}},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},function(){var t;r.g.importScripts&&(t=r.g.location+"");var e=r.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var o=e.getElementsByTagName("script");o.length&&(t=o[o.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=t}(),function(){var t={826:0};r.f.j=function(e,o){var n=r.o(t,e)?t[e]:void 0;if(0!==n)if(n)o.push(n[2]);else{var i=new Promise((function(o,r){n=t[e]=[o,r]}));o.push(n[2]=i);var s=r.p+r.u(e),a=new Error;r.l(s,(function(o){if(r.o(t,e)&&(0!==(n=t[e])&&(t[e]=void 0),n)){var i=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;a.message="Loading chunk "+e+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,n[1](a)}}),"chunk-"+e,e)}};var e=function(e,o){var n,i,s=o[0],a=o[1],c=o[2],l=0;if(s.some((function(e){return 0!==t[e]}))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(c)c(r)}for(e&&e(o);l<s.length;l++)i=s[l],r.o(t,i)&&t[i]&&t[i][0](),t[i]=0},o=self.webpackChunkaxolotis_player=self.webpackChunkaxolotis_player||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var i={};return function(){r.r(i),r.d(i,{AssetsLoader:function(){return m},CodeLoaderComponent:function(){return o},Entity:function(){return s},FrameLoop:function(){return f.FrameLoop},LazyServices:function(){return p.i},ServiceEntity:function(){return t.e},WorldEntity:function(){return c},WorldService:function(){return a.WorldService},initHtml:function(){return u},registerLocalModule:function(){return e.A}});var t=r(454),e=r(747);class o{constructor(){var t,e,o;o="",(e="roomUrl")in(t=this)?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,this.initialLoading=new Promise((t=>{this.initialLoadingResolver=t}))}cleanUpRoomUrl(t){return t.endsWith(".json")||(t+="/room.json"),t.replace("./",""),t.startsWith("http")||(t=window.location.origin+"/"+t),t}async loadRoomDefinitionFile(t){t=this.cleanUpRoomUrl(t),this.roomUrl=t;let e=await fetch(t);return await e.json()}async searchRoomDefinitionFile(){if(window.axolotis&&window.axolotis.room)return window.axolotis.room;for(const t of window.document.head.children)if("META"===t.tagName&&"axolotis:room"===t.name){let e=t.content;return this.loadRoomDefinitionFile(e)}throw new Error("No room definition found in meta axolotis:room")}getType(){return o.name}async awaitInitialLoading(){await this.initialLoading}async startLoadingJson(o,n,r){let i=[];for(const t of n.entities)for(const n of t.components){let t=n.config;i.push((()=>new Promise((async(r,i)=>{let s=n.classname||"Factory";const a=await(0,e.V)(n.module,s);let c=await a.createComponent(o,t||{});if(!c.getType)throw new Error("Not a component : "+n.module+" "+c.constructor.name);o.addComponent(c),r(a)}))))}for(const e of n.services)i.push((()=>new Promise((async(n,r)=>{let i=await o.getFirstComponentByType(t.e.name);await i.getService(e.module),n(i)}))));let s=function(t,e){let o=[],n=0;for(const r of t){const i=r();o.push(i),i.then((()=>{n++,e(n,t.length)}))}return Promise.all(o)}(i,r);return s.then((t=>{void 0!==this.initialLoadingResolver&&this.initialLoadingResolver(t)})),s.catch((t=>{console.error(t)})),s}}function n(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var s=class{constructor(t){n(this,"components",[]),n(this,"waitingForComponent",{}),this.name=t}addComponent(t){if(this.components.push(t),this.waitingForComponent[t.getType()]){for(const e of this.waitingForComponent[t.getType()])e(t);delete this.waitingForComponent[t.getType()]}return t}removeAllComponents(){this.components.forEach((t=>{this.removeComponent(t)}))}removeComponent(t){return"destroy"in t&&t.destroy(),this.components=this.components.filter((e=>e!=t)),t}addComponents(t){t.forEach((t=>{this.addComponent(t)}))}getComponents(){return this.components}getComponentByType(t){let e=[];return this.components.forEach((o=>{o.getType()===t&&e.push(o)})),e}getComponentByTypeStartsWith(t){let e=[];return this.components.forEach((o=>{o.getType().startsWith(t)&&e.push(o)})),e}getFirstComponentByTypeStartsWith(t){return this.getComponentByTypeStartsWith(t)[0]}getFirstComponentByType(t){return this.getComponentByType(t)[0]}async getFirstComponentByTypeAsync(t){if(this.getComponentByType(t)[0])return this.getComponentByType(t)[0];return this.waitingForComponent[t]||(this.waitingForComponent[t]=[]),new Promise(((e,o)=>{this.waitingForComponent[t].push(e)}))}getType(){return this.name}},a=r(905);class c extends s{constructor(){super("world"),(0,a.registerNewWorld)(this)}}const l=r(147).i8;console.log(l);function u(){let e=new t.e,n=new c;n.addComponent(e);let r=new o;var i;e.setService("@root/lib/modules/core/loader/CodeLoaderService",r),i=()=>{let t=window.document.body.getElementsByTagName("ax-scene");r.startLoadingJson(n,function(t){let e=t[0];const o={version:"2.0",entities:[],services:[]};for(const t of e.getElementsByTagName("ax-entity")){let e={components:[]};for(const o of t.getElementsByTagName("ax-component")){let t=o.getAttribute("config").replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g,'"$2": '),n={module:o.getAttribute("module"),config:JSON.parse(t)};e.components.push(n)}o.entities.push(e)}for(const t of e.getElementsByTagName("ax-service"))o.services.push({module:t.getAttribute("module")});return o}(t),((t,e)=>{console.log("["+t+"/"+e+"]"),document.getElementById("progress").style.width="".concat(t/e*100,"%")})).then((()=>{console.log("loading complete"),document.getElementById("progresscontainer").className+="load"}))},"complete"===document.readyState?i():window.addEventListener("load",i)}function d(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}class m{constructor(){d(this,"loaderCache",{}),d(this,"assets",{})}async getLoader(t,e){return this.loaderCache[t]||(this.loaderCache[t]=await e()),this.loaderCache[t]}}new m;var p=r(240),f=r(630)}(),i}()}));
//# sourceMappingURL=index.js.map
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
"use strict";(self.webpackChunkaxolotis_player=self.webpackChunkaxolotis_player||[]).push([[630],{630:function(t,o,i){function n(t,o,i){return o in t?Object.defineProperty(t,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[o]=i,t}i.r(o),i.d(o,{Factory:function(){return e},FrameLoop:function(){return r}});class e{async create(t){let o=await t.getService("@root/lib/modules/core/loader/CodeLoaderService"),i=new r;return o.awaitInitialLoading().then((()=>{i.startAnimationFrameLoop()})),i}}class r{constructor(){n(this,"loops",{}),n(this,"prevTime",0),n(this,"monitoringStart",(()=>{})),n(this,"monitoringEnd",(()=>{}))}startAnimationFrameLoop(){const t=o=>{this.monitoringStart(r.name);const i=o-this.prevTime;this.prevTime=o,requestAnimationFrame(t);for(const t in this.loops)this.monitoringStart(t),this.loops[t](i),this.monitoringEnd(t);this.monitoringEnd(r.name)};requestAnimationFrame(t)}setMonitoringCallback(t,o){this.monitoringStart=t,this.monitoringEnd=o}removeLoop(t){delete this.loops[t],this.monitoringStart(t),this.monitoringEnd(t)}addLoop(t,o){if(this.loops[t])throw new Error;this.loops[t]=o}getType(){return r.name}}}}]);
//# sourceMappingURL=630.index.js.map
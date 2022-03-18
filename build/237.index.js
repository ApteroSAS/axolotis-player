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
"use strict";(self.webpackChunkaxolotis_player=self.webpackChunkaxolotis_player||[]).push([[237],{237:function(e,o,r){r.r(o),r.d(o,{Factory:function(){return n},PortalsService:function(){return c}});var t=r(987),i=r(701),a=r(928);function s(e,o,r){return o in e?Object.defineProperty(e,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[o]=r,e}class n{constructor(){}async create(e){let o=await e.getService("@root/lib/modules/core/WorldService"),r=await o.getActiveWorld().getFirstComponentByType(t.e.name),i=await r.getService("@root/lib/modules/core/loader/CodeLoaderService"),a=await e.getService("@root/lib/modules/FrameLoop"),s=await e.getService("@root/lib/modules/three/ThreeLib");return new c(o,a,s,i.roomUrl)}}let l={};class c{constructor(e,o,r,t){s(this,"i",0),s(this,"portalsLoops",[]),s(this,"portalsRenderLoops",[]),this.services=e,this.three=r,this.notifyInitialWorld(t,e.getActiveWorld()),o.addLoop(c.name,(e=>{for(const o of this.portalsLoops)o(e)})),this.three.preRenderPass.push((()=>{this.render()}))}render(){let e=this.three.renderer.getContext();this.three.renderer.clear(!0,!0,!0),this.three.renderer.autoClear=!1;for(const e of this.portalsRenderLoops)e();e.colorMask(!0,!0,!0,!0),e.depthMask(!0)}getType(){return c.name}notifyInitialWorld(e,o){l[e]||(l[e]=o)}async loadNewUrl(e){let o=new a.I;if(e=o.cleanUpRoomUrl(e),l[e])return l[e];let r=new i.o;l[e]=r;let s=new t.e;r.addComponent(s),s.setService("@root/lib/modules/core/loader/CodeLoaderService",o);let n=await o.loadRoomDefinitionFile(e);return await new Promise(((t,i)=>{o.startLoading(r,n.entities,((o,r)=>{console.log("["+e+"] : ["+o+"/"+r+"]")})).then((()=>{console.log("["+e+"] : ok"),t(r)})).catch(i)}))}addPortalLoop(e){this.portalsLoops.push(e)}addPortalRenderLoop(e){this.portalsRenderLoops.push(e)}}}}]);
//# sourceMappingURL=237.index.js.map
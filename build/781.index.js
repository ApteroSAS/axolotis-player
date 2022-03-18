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
"use strict";(self.webpackChunkaxolotis_player=self.webpackChunkaxolotis_player||[]).push([[781],{781:function(e,n,i){i.r(n),i.d(n,{Factory:function(){return a},ThreeLib:function(){return o},getGlobalRenderer:function(){return t}});var r=i(212);function t(){var e;if(null===(e=window.axolotis)||void 0===e||!e.renderer){let e=new r.WebGLRenderer({antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.toneMapping=r.ACESFilmicToneMapping,e.toneMappingExposure=1,e.outputEncoding=r.sRGBEncoding,e.setPixelRatio(window.devicePixelRatio),document.body.appendChild(e.domElement),window.axolotis||(window.axolotis={}),window.axolotis.renderer=e}return window.axolotis.renderer}class o{constructor(e,n){var i,a,s;s=[],(a="preRenderPass")in(i=this)?Object.defineProperty(i,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):i[a]=s,this.scene=new r.Scene,this.renderer=t(),this.camera=new r.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.001,1e5),this.camera.position.z=2;const d=()=>{for(const e of this.preRenderPass)e();this.renderer.render(this.scene,this.camera),this.renderer.autoClear=!0},c=()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),d()};n.addOnWorldChangeCallback((()=>{window.removeEventListener("resize",c),e.removeLoop(o.name),n.isActiveWorld()&&(window.addEventListener("resize",c,!1),e.addLoop(o.name,d))}),!0)}getType(){return o.name}}class a{constructor(){}async create(e){let n=await e.getService("@root/lib/modules/FrameLoop"),i=await e.getService("@root/lib/modules/core/WorldService");return new o(n,i)}}}}]);
//# sourceMappingURL=781.index.js.map
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
"use strict";(self.webpackChunkaxolotis_player=self.webpackChunkaxolotis_player||[]).push([[298],{298:function(e,t,s){s.r(t),s.d(t,{Factory:function(){return r},default:function(){return o}});var a=s(212),i=s(595),n=s(987);class r{async create(e,t){let s=e.getFirstComponentByType(n.e.name),a=await s.getService("@root/lib/modules/three/ThreeLib"),i=new o;return await i.initialize(a,t.sky||"assets/static/demo2/sky.jpg"),i}}class o{constructor(){}getType(){return"Sky"}async initialize(e,t){this.scene=e.scene,this.texture=await(0,i.ev)(t);const s=new a.HemisphereLight(16777215,268435455,1);s.color.setHSL(.6,1,.6),s.groundColor.setHSL(.095,1,.75),this.scene.add(s);const n=new a.SphereGeometry(1e3,25,25),r=new a.MeshBasicMaterial({map:this.texture,side:a.BackSide,depthWrite:!1,toneMapped:!1}),o=new a.Mesh(n,r);o.rotateY(a.MathUtils.degToRad(-60)),this.scene.add(o)}}}}]);
//# sourceMappingURL=298.index.js.map
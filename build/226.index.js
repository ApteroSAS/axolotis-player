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
"use strict";(self.webpackChunkaxolotis_player=self.webpackChunkaxolotis_player||[]).push([[226],{226:function(e,t,n){function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t),n.d(t,{Factory:function(){return d},Input:function(){return i}});class i{constructor(){s(this,"_onKeyDown",(e=>{this._keyMap[e.code]=1})),s(this,"_onKeyUp",(e=>{this._keyMap[e.code]=0})),this._keyMap={},this.events=[],this.AddKeyDownListner(this._onKeyDown),this.AddKeyUpListner(this._onKeyUp)}getType(){return i.name}_addEventListner(e,t,n){e.addEventListener(t,n),this.events.push({element:e,type:t,callback:n})}AddKeyDownListner(e){this._addEventListner(document,"keydown",e)}AddKeyUpListner(e){this._addEventListner(document,"keyup",e)}AddMouseMoveListner(e){this._addEventListner(document,"mousemove",e)}AddClickListner(e){this._addEventListner(document.body,"click",e)}AddMouseDownListner(e){this._addEventListner(document.body,"mousedown",e)}AddMouseUpListner(e){this._addEventListner(document.body,"mouseup",e)}GetKeyDown(e){return void 0===this._keyMap[e]?0:this._keyMap[e]}ClearEventListners(){this.events.forEach((e=>{e.element.removeEventListener(e.type,e.callback)})),this.events=[],this.AddKeyDownListner(this._onKeyDown),this.AddKeyUpListner(this._onKeyUp)}}class d{async create(e){return new i}}}}]);
//# sourceMappingURL=226.index.js.map
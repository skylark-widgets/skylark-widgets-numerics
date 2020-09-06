/**
 * skylark-widgets-numerics - The skylark numeric widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-numerics/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","./numerics"],function(t,e){"use strict";var i=t.inherit({_construct:function(e){function s(){var t=document.createElement("input");return t.type="number",t.style.backgroundColor=Editor.theme.boxColor,t.style.color=Editor.theme.textColor,t.style.borderStyle="none",t.style.position="absolute",t.style.boxSizing="border-box",t.style.textIndent="4px",t.style.borderRadius="4px",t.style.outline="none",t.style.MozAppearance="textfield",t.style.webkitAppearance="caret",t.style.appearance="textfield",t}t.prototype._construct.call(this,e,"div"),this.xText=document.createElement("div"),this.xText.style.position="absolute",this.xText.style.width="15px",this.xText.style.textAlign="center",this.xText.style.verticalAlign="middle",this.xText.appendChild(document.createTextNode("X")),this._elm.appendChild(this.xText),this.x=s(),this.x.style.left="15px",this._elm.appendChild(this.x),this.yText=document.createElement("div"),this.yText.style.position="absolute",this.yText.style.width="15px",this.yText.style.textAlign="center",this.yText.style.verticalAlign="middle",this.yText.appendChild(document.createTextNode("Y")),this._elm.appendChild(this.yText),this.y=s(),this._elm.appendChild(this.y),this.zText=document.createElement("div"),this.zText.style.position="absolute",this.zText.style.width="15px",this.zText.style.textAlign="center",this.zText.style.verticalAlign="middle",this.zText.appendChild(document.createTextNode("Z")),this._elm.appendChild(this.zText),this.z=s(),this._elm.appendChild(this.z),this.wText=document.createElement("div"),this.wText.style.position="absolute",this.wText.style.width="15px",this.wText.style.textAlign="center",this.wText.style.verticalAlign="middle",this.wText.appendChild(document.createTextNode("W")),this._elm.appendChild(this.wText),this.w=s(),this._elm.appendChild(this.w),this.order="XYZ",this.type=i.VECTOR3},setType:function(t){this.type!==t&&(this.type=t,this.updateInterface())},setStep:function(t){t=String(t);this.x.step=t,this.y.step=t,this.z.step=t,this.w.step=t},setRange:function(t,e){t=String(t),e=String(e);this.x.min=t,this.x.max=e,this.y.min=t,this.y.max=e,this.z.min=t,this.z.max=e,this.w.min=t,this.w.max=e},getValue:function(){return{x:parseFloat(this.x.value),y:parseFloat(this.y.value),z:parseFloat(this.z.value),w:parseFloat(this.w.value),order:this.order}},setValue:function(t,e,s,h){t.isVector2?(this.x.value=t.x,this.y.value=t.y,this.setType(i.VECTOR2)):t.isVector3?(this.x.value=t.x,this.y.value=t.y,this.z.value=t.z,this.setType(i.VECTOR3)):t.isEuler?(this.x.value=t.x,this.y.value=t.y,this.z.value=t.z,this.order=t.order,this.setType(i.VECTOR3)):t.isQuaternion?(this.x.value=t.x,this.y.value=t.y,this.z.value=t.z,this.w.value=t.w,this.setType(i.QUATERNION)):(this.x.value=t,this.y.value=e,this.z.value=void 0!==s?s:0,this.w.value=void 0!==h?h:0)},setOnChange:function(t){this.x.onchange=t,this.y.onchange=t,this.z.onchange=t,this.w.onchange=t},_updateSize:function(){t.prototype._updateSize.call(this);var e=Math.round((this.size.x-15*this.type)/this.type),s=this.size.y+"px";this.xText.style.height=s,this.xText.style.lineHeight=s,this.x.style.width=e+"px",this.yText.style.left=15+e+"px",this.yText.style.height=s,this.yText.style.lineHeight=s,this.y.style.left=30+e+"px",this.y.style.width=e+"px",this.type>=i.VECTOR3?(this.zText.style.left=30+2*e+"px",this.zText.style.height=s,this.zText.style.lineHeight=s,this.z.style.left=45+2*e+"px",this.z.style.width=e+"px",this.type===i.QUATERNION?(this.wText.style.left=45+3*e+"px",this.wText.style.height=s,this.wText.style.lineHeight=s,this.w.style.left=60+3*e+"px",this.w.style.width=e+"px",this.zText.style.visibility="visible",this.z.style.visibility="visible",this.w.style.visibility="visible",this.wText.style.visibility="visible"):(this.zText.style.visibility="visible",this.z.style.visibility="visible",this.w.style.visibility="hidden",this.wText.style.visibility="hidden")):(this.z.style.visibility="hidden",this.zText.style.visibility="hidden",this.w.style.visibility="hidden",this.wText.style.visibility="hidden")}});return i.VECTOR2=2,i.VECTOR3=3,i.QUATERNION=4,e.VectorBox=i});
//# sourceMappingURL=sourcemaps/VectorBox.js.map

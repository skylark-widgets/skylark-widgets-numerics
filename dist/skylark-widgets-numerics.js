/**
 * skylark-widgets-numerics - The skylark numeric widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-numerics/
 * @license MIT
 */
!function(t,e){var i=e.define,require=e.require,s="function"==typeof i&&i.amd,l=!s&&"undefined"!=typeof exports;if(!s&&!i){var n={};i=e.define=function(t,e,i){"function"==typeof i?(n[t]={factory:i,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var i=e.split("/"),s=t.split("/");i.pop();for(var l=0;l<s.length;l++)"."!=s[l]&&(".."==s[l]?i.pop():i.push(s[l]));return i.join("/")}(e,t)}),resolved:!1,exports:null},require(t)):n[t]={factory:null,resolved:!0,exports:i}},require=e.require=function(t){if(!n.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=n[t];if(!module.resolved){var i=[];module.deps.forEach(function(t){i.push(require(t))}),module.exports=module.factory.apply(e,i)||null,module.resolved=!0}return module.exports}}if(!i)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-widgets-numerics/numerics",["skylark-langx/skylark"],function(t){return t.attach("widgets.numerics",{})}),t("skylark-widgets-numerics/NumberBox",["skylark-widgets-base/Widget","./numerics"],function(t,e){"use strict";var i=t.inherit({_construct:function(e){t.prototype._construct.call(this,e,"input");var i=this.getSkin();this._elm.type="number",this._elm.step="0.1",this._elm.style.backgroundColor=i.boxColor,this._elm.style.color=i.textColor,this._elm.style.outline="none",this._elm.style.borderStyle="none",this._elm.style.boxSizing="border-box",this._elm.style.textIndent="4px",this._elm.style.borderRadius="4px",this._elm.style.boxShadow="none",this._elm.style.MozAppearance="textfield",this._elm.style.webkitAppearance="caret",this._elm.style.appearance="textfield"},setDisabled:function(t){this._elm.disabled=t},setRange:function(t,e){this._elm.min=String(t),this._elm.max=String(e)},setStep:function(t){this._elm.step=String(t)},setOnChange:function(t){this._elm.onchange=t},setValue:function(t){this._elm.value=t},getValue:function(){return Number.parseFloat(this._elm.value)},_updateVisibility:function(){this._elm.style.visibility=this.visible?"visible":"hidden"}});return e.NumberBox=i}),t("skylark-widgets-numerics/NumberRow",["skylark-widgets-base/Widget","skylark-widgets-base/TextPane","./numerics","./NumberBox"],function(t,e,i,s){"use strict";var l=t.inherit({_construct:function(e){t.prototype._construct.call(this,e,"div"),this.values=[],this.labelSize=15},setStep:function(t){for(var t=String(t),e=0;e<this.values.length;e++)this.values[e].input.setStep(t)},setRange:function(t,e){for(var t=String(t),e=String(e),i=0;i<this.values.length;i++)this.values[i].input.setRange(t,e)},addValue:function(t){var i=new s(this),l=new e(this);return l.setText(t),this.values.push({label:l,input:i}),i},_updateSize:function(){t.prototype._updateSize.call(this);for(var e=Math.round((this.size.x-this.values.length*this.labelSize)/this.values.length),i=0,s=0;s<this.values.length;s++){var l=this.values[s].label;l.position.set(i,0),l.size.set(this.labelSize,this.size.y),l.updateInterface();var n=this.values[s].input;n.position.set(i+this.labelSize,0),n.size.set(e,this.size.y),n.updateInterface(),i+=e+this.labelSize}}});return i.NumberRow=l}),t("skylark-widgets-numerics/Slider",["skylark-domx-eventer","skylark-widgets-base/Widget","./numerics"],function(t,e,i){"use strict";var s=e.inherit({_construct:function(i){e.prototype._construct.call(this,i,"div"),this._elm.style.overflow="visible";var s=this.getSkin(),l=this;this.text=document.createElement("div"),this.text.style.position="absolute",this.text.style.display="none",this.text.style.justifyContent="center",this.text.style.alignItems="center",this.text.style.zIndex="10000",this.text.style.border="3px solid",this.text.style.borderRadius="5px",this.text.style.color=s.textColor,this.text.style.backgroundColor=s.barColor,this.text.style.borderColor=s.barColor,document.body.appendChild(this.text),this.textValue=document.createTextNode(""),this.text.appendChild(this.textValue),this._elm.onmousemove=function(t){l.text.style.display="flex",l.text.style.width="fit-content",l.text.style.height="fit-content",l.text.style.left=t.clientX+"px",l.text.style.top=t.clientY-30+"px"},this._elm.onmouseout=function(){l.text.style.display="none"},this.track=document.createElement("div"),this.track.style.position="absolute",this.track.style.backgroundColor=s.audioTrack,this.track.style.cursor="pointer",this.track.style.left="0px",this.track.style.width="100%",this.track.style.top="25%",this.track.style.height="50%",this._elm.appendChild(this.track),this.progress=document.createElement("div"),this.progress.style.pointerEvents="none",this.progress.style.position="absolute",this.progress.style.backgroundColor=s.audioProgress,this.progress.style.height="100%",this.track.appendChild(this.progress),this.scrubber=document.createElement("div"),this.scrubber.style.position="absolute",this.scrubber.style.backgroundColor=s.audioScrubber,this.scrubber.style.cursor="pointer",this.scrubber.style.height="160%",this.scrubber.style.top="-25%",this.scrubber.style.width="6px",this.track.appendChild(this.scrubber),this.value=0,this.onChange=null,this.min=1,this.max=2,this.step=null,this.mouseStart=0,this.valueStart=0,t.on(window,"mousemove",function(t){var e=(t.pageX-l.mouseStart)/l.size.x,i=l.valueStart+e*(l.max-l.min);l.setValue(i),null!==l.onChange&&l.onChange(l.value)}),t.on(window,"mouseup",function(t){}),this.scrubber.onmousedown=function(t){l.mouseStart=t.pageX,l.valueStart=l.value,l.manager.create(),t.stopPropagation()},this.track.onmousedown=function(t){var e=t.layerX/l.size.x;l.setValue(e*(l.max-l.min)+l.min),l.progress.style.width=100*e+"%",l.scrubber.style.left=l.progress.style.width,l.scrubber.onmousedown(t),null!==l.onChange&&l.onChange(l.value)}},setDisabled:function(t){},setStep:function(t){this.step=t},setRange:function(t,e){this.min=t,this.max=e},setOnChange:function(t){this.onChange=t},setValue:function(t){if(t<this.min?t=this.min:t>this.max&&(t=this.max),null!==this.step){var e=t%this.step;t-=e,e>this.step/2&&(t+=this.step);var i=String(this.step).split(".");if(i.length>1){var s=i[1].length,l=String(t).split(".");l.length>1&&(t=Number.parseFloat(l[0]+"."+l[1].substr(0,s)))}}this.value=t,this._updateValue()},getValue:function(){return this.value},_updateValue:function(){var t=(this.value-this.min)/(this.max-this.min)*100;this.progress.style.width=t+"%",this.scrubber.style.left=t+"%",this.textValue.data=this.value},destroy:function(){e.prototype.destroy.call(this),document.body.contains(this.text)&&document.body.removeChild(this.text)}});return i.Slider=s}),t("skylark-widgets-numerics/VectorBox",["skylark-widgets-base/Widget","./numerics"],function(t,e){"use strict";var i=t.inherit({_construct:function(e){function s(){var t=document.createElement("input");return t.type="number",t.style.backgroundColor=Editor.theme.boxColor,t.style.color=Editor.theme.textColor,t.style.borderStyle="none",t.style.position="absolute",t.style.boxSizing="border-box",t.style.textIndent="4px",t.style.borderRadius="4px",t.style.outline="none",t.style.MozAppearance="textfield",t.style.webkitAppearance="caret",t.style.appearance="textfield",t}t.prototype._construct.call(this,e,"div"),this.xText=document.createElement("div"),this.xText.style.position="absolute",this.xText.style.width="15px",this.xText.style.textAlign="center",this.xText.style.verticalAlign="middle",this.xText.appendChild(document.createTextNode("X")),this._elm.appendChild(this.xText),this.x=s(),this.x.style.left="15px",this._elm.appendChild(this.x),this.yText=document.createElement("div"),this.yText.style.position="absolute",this.yText.style.width="15px",this.yText.style.textAlign="center",this.yText.style.verticalAlign="middle",this.yText.appendChild(document.createTextNode("Y")),this._elm.appendChild(this.yText),this.y=s(),this._elm.appendChild(this.y),this.zText=document.createElement("div"),this.zText.style.position="absolute",this.zText.style.width="15px",this.zText.style.textAlign="center",this.zText.style.verticalAlign="middle",this.zText.appendChild(document.createTextNode("Z")),this._elm.appendChild(this.zText),this.z=s(),this._elm.appendChild(this.z),this.wText=document.createElement("div"),this.wText.style.position="absolute",this.wText.style.width="15px",this.wText.style.textAlign="center",this.wText.style.verticalAlign="middle",this.wText.appendChild(document.createTextNode("W")),this._elm.appendChild(this.wText),this.w=s(),this._elm.appendChild(this.w),this.order="XYZ",this.type=i.VECTOR3},setType:function(t){this.type!==t&&(this.type=t,this.updateInterface())},setStep:function(t){var t=String(t);this.x.step=t,this.y.step=t,this.z.step=t,this.w.step=t},setRange:function(t,e){var t=String(t),e=String(e);this.x.min=t,this.x.max=e,this.y.min=t,this.y.max=e,this.z.min=t,this.z.max=e,this.w.min=t,this.w.max=e},getValue:function(){return{x:parseFloat(this.x.value),y:parseFloat(this.y.value),z:parseFloat(this.z.value),w:parseFloat(this.w.value),order:this.order}},setValue:function(t,e,s,l){t.isVector2?(this.x.value=t.x,this.y.value=t.y,this.setType(i.VECTOR2)):t.isVector3?(this.x.value=t.x,this.y.value=t.y,this.z.value=t.z,this.setType(i.VECTOR3)):t.isEuler?(this.x.value=t.x,this.y.value=t.y,this.z.value=t.z,this.order=t.order,this.setType(i.VECTOR3)):t.isQuaternion?(this.x.value=t.x,this.y.value=t.y,this.z.value=t.z,this.w.value=t.w,this.setType(i.QUATERNION)):(this.x.value=t,this.y.value=e,this.z.value=void 0!==s?s:0,this.w.value=void 0!==l?l:0)},setOnChange:function(t){this.x.onchange=t,this.y.onchange=t,this.z.onchange=t,this.w.onchange=t},_updateSize:function(){t.prototype._updateSize.call(this);var e=Math.round((this.size.x-15*this.type)/this.type),s=this.size.y+"px";this.xText.style.height=s,this.xText.style.lineHeight=s,this.x.style.width=e+"px",this.yText.style.left=15+e+"px",this.yText.style.height=s,this.yText.style.lineHeight=s,this.y.style.left=30+e+"px",this.y.style.width=e+"px",this.type>=i.VECTOR3?(this.zText.style.left=30+2*e+"px",this.zText.style.height=s,this.zText.style.lineHeight=s,this.z.style.left=45+2*e+"px",this.z.style.width=e+"px",this.type===i.QUATERNION?(this.wText.style.left=45+3*e+"px",this.wText.style.height=s,this.wText.style.lineHeight=s,this.w.style.left=60+3*e+"px",this.w.style.width=e+"px",this.zText.style.visibility="visible",this.z.style.visibility="visible",this.w.style.visibility="visible",this.wText.style.visibility="visible"):(this.zText.style.visibility="visible",this.z.style.visibility="visible",this.w.style.visibility="hidden",this.wText.style.visibility="hidden")):(this.z.style.visibility="hidden",this.zText.style.visibility="hidden",this.w.style.visibility="hidden",this.wText.style.visibility="hidden")}});return i.VECTOR2=2,i.VECTOR3=3,i.QUATERNION=4,e.VectorBox=i}),t("skylark-widgets-numerics/main",["./numerics","./NumberBox","./NumberRow","./Slider","./VectorBox"],function(t){return t}),t("skylark-widgets-numerics",["skylark-widgets-numerics/main"],function(t){return t})}(i),!s){var r=require("skylark-langx-ns");l?module.exports=r:e.skylarkjs=r}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-widgets-numerics.js.map

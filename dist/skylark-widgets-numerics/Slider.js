/**
 * skylark-widgets-numerics - The skylark numeric widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-numerics/
 * @license MIT
 */
define(["skylark-domx-eventer","skylark-widgets-base/Widget","./numerics"],function(t,e,s){"use strict";var i=e.inherit({_construct:function(s){e.prototype._construct.call(this,s,"div"),this._elm.style.overflow="visible";var i=this.getSkin(),o=this;this.text=document.createElement("div"),this.text.style.position="absolute",this.text.style.display="none",this.text.style.justifyContent="center",this.text.style.alignItems="center",this.text.style.zIndex="10000",this.text.style.border="3px solid",this.text.style.borderRadius="5px",this.text.style.color=i.textColor,this.text.style.backgroundColor=i.barColor,this.text.style.borderColor=i.barColor,document.body.appendChild(this.text),this.textValue=document.createTextNode(""),this.text.appendChild(this.textValue),this._elm.onmousemove=function(t){o.text.style.display="flex",o.text.style.width="fit-content",o.text.style.height="fit-content",o.text.style.left=t.clientX+"px",o.text.style.top=t.clientY-30+"px"},this._elm.onmouseout=function(){o.text.style.display="none"},this.track=document.createElement("div"),this.track.style.position="absolute",this.track.style.backgroundColor=i.audioTrack,this.track.style.cursor="pointer",this.track.style.left="0px",this.track.style.width="100%",this.track.style.top="25%",this.track.style.height="50%",this._elm.appendChild(this.track),this.progress=document.createElement("div"),this.progress.style.pointerEvents="none",this.progress.style.position="absolute",this.progress.style.backgroundColor=i.audioProgress,this.progress.style.height="100%",this.track.appendChild(this.progress),this.scrubber=document.createElement("div"),this.scrubber.style.position="absolute",this.scrubber.style.backgroundColor=i.audioScrubber,this.scrubber.style.cursor="pointer",this.scrubber.style.height="160%",this.scrubber.style.top="-25%",this.scrubber.style.width="6px",this.track.appendChild(this.scrubber),this.value=0,this.onChange=null,this.min=1,this.max=2,this.step=null,this.mouseStart=0,this.valueStart=0,t.on(window,"mousemove",function(t){var e=(t.pageX-o.mouseStart)/o.size.x,s=o.valueStart+e*(o.max-o.min);o.setValue(s),null!==o.onChange&&o.onChange(o.value)}),t.on(window,"mouseup",function(t){}),this.scrubber.onmousedown=function(t){o.mouseStart=t.pageX,o.valueStart=o.value,o.manager.create(),t.stopPropagation()},this.track.onmousedown=function(t){var e=t.layerX/o.size.x;o.setValue(e*(o.max-o.min)+o.min),o.progress.style.width=100*e+"%",o.scrubber.style.left=o.progress.style.width,o.scrubber.onmousedown(t),null!==o.onChange&&o.onChange(o.value)}},setDisabled:function(t){},setStep:function(t){this.step=t},setRange:function(t,e){this.min=t,this.max=e},setOnChange:function(t){this.onChange=t},setValue:function(t){if(t<this.min?t=this.min:t>this.max&&(t=this.max),null!==this.step){var e=t%this.step;t-=e,e>this.step/2&&(t+=this.step);var s=String(this.step).split(".");if(s.length>1){var i=s[1].length,o=String(t).split(".");o.length>1&&(t=Number.parseFloat(o[0]+"."+o[1].substr(0,i)))}}this.value=t,this._updateValue()},getValue:function(){return this.value},_updateValue:function(){var t=(this.value-this.min)/(this.max-this.min)*100;this.progress.style.width=t+"%",this.scrubber.style.left=t+"%",this.textValue.data=this.value},destroy:function(){e.prototype.destroy.call(this),document.body.contains(this.text)&&document.body.removeChild(this.text)}});return s.Slider=i});
//# sourceMappingURL=sourcemaps/Slider.js.map

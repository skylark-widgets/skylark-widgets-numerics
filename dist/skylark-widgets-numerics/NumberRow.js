/**
 * skylark-widgets-numerics - The skylark numeric widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-numerics/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","skylark-widgets-base/TextPane","./numerics","./NumberBox"],function(e,t,s,i){"use strict";i=e.inherit({_construct:function(t){e.prototype._construct.call(this,t,"div"),this.values=[],this.labelSize=15},setStep:function(e){e=String(e);for(var t=0;t<this.values.length;t++)this.values[t].input.setStep(e)},setRange:function(e,t){e=String(e),t=String(t);for(var s=0;s<this.values.length;s++)this.values[s].input.setRange(e,t)},addValue:function(e){var s=new i(this),a=new t(this);return a.setText(e),this.values.push({label:a,input:s}),s},_updateSize:function(){e.prototype._updateSize.call(this);for(var t=Math.round((this.size.x-this.values.length*this.labelSize)/this.values.length),s=0,i=0;i<this.values.length;i++){var a=this.values[i].label;a.position.set(s,0),a.size.set(this.labelSize,this.size.y),a.updateInterface();var n=this.values[i].input;n.position.set(s+this.labelSize,0),n.size.set(t,this.size.y),n.updateInterface(),s+=t+this.labelSize}}});return s.NumberRow=NumberRow});
//# sourceMappingURL=sourcemaps/NumberRow.js.map

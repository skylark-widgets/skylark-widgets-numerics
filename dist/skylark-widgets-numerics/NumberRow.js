/**
 * skylark-widgets-numerics - The skylark numeric widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-numerics/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","skylark-widgets-base/TextPane","./numerics","./NumberBox"],function(t,e,s,i){"use strict";var a=t.inherit({_construct:function(e){t.prototype._construct.call(this,e,"div"),this.values=[],this.labelSize=15},setStep:function(t){t=String(t);for(var e=0;e<this.values.length;e++)this.values[e].input.setStep(t)},setRange:function(t,e){t=String(t),e=String(e);for(var s=0;s<this.values.length;s++)this.values[s].input.setRange(t,e)},addValue:function(t){var s=new i(this),a=new e(this);return a.setText(t),this.values.push({label:a,input:s}),s},_updateSize:function(){t.prototype._updateSize.call(this);for(var e=Math.round((this.size.x-this.values.length*this.labelSize)/this.values.length),s=0,i=0;i<this.values.length;i++){var a=this.values[i].label;a.position.set(s,0),a.size.set(this.labelSize,this.size.y),a.updateInterface();var n=this.values[i].input;n.position.set(s+this.labelSize,0),n.size.set(e,this.size.y),n.updateInterface(),s+=e+this.labelSize}}});return s.NumberRow=a});
//# sourceMappingURL=sourcemaps/NumberRow.js.map

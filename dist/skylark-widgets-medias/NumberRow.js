/**
 * skylark-widgets-medias - The skylark media widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-medias/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","skylark-widgets-texts/StaticText","./numerics","./NumberBox"],function(t,e,i,s){"use strict";s=t.inherit({_construct:function(e){t.prototype._construct.call(this,e,"div"),this.values=[],this.labelSize=15},setStep:function(t){t=String(t);for(var e=0;e<this.values.length;e++)this.values[e].input.setStep(t)},setRange:function(t,e){t=String(t),e=String(e);for(var i=0;i<this.values.length;i++)this.values[i].input.setRange(t,e)},addValue:function(t){var i=new s(this),a=new e(this);return a.setText(t),this.values.push({label:a,input:i}),i},_updateSize:function(){t.prototype._updateSize.call(this);for(var e=Math.round((this.size.x-this.values.length*this.labelSize)/this.values.length),i=0,s=0;s<this.values.length;s++){var a=this.values[s].label;a.position.set(i,0),a.size.set(this.labelSize,this.size.y),a.updateInterface();var n=this.values[s].input;n.position.set(i+this.labelSize,0),n.size.set(e,this.size.y),n.updateInterface(),i+=e+this.labelSize}}});return i.NumberRow=NumberRow});
//# sourceMappingURL=sourcemaps/NumberRow.js.map

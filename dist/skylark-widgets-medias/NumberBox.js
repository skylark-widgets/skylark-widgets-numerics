/**
 * skylark-widgets-medias - The skylark media widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-medias/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","./numerics"],function(e,t){"use strict";var i=e.inherit({_construct:function(t){e.prototype._construct.call(this,t,"input");var i=this.getSkin();this._elm.type="number",this._elm.step="0.1",this._elm.style.backgroundColor=i.boxColor,this._elm.style.color=i.textColor,this._elm.style.outline="none",this._elm.style.borderStyle="none",this._elm.style.boxSizing="border-box",this._elm.style.textIndent="4px",this._elm.style.borderRadius="4px",this._elm.style.boxShadow="none",this._elm.style.MozAppearance="textfield",this._elm.style.webkitAppearance="caret",this._elm.style.appearance="textfield"},setDisabled:function(e){this._elm.disabled=e},setRange:function(e,t){this._elm.min=String(e),this._elm.max=String(t)},setStep:function(e){this._elm.step=String(e)},setOnChange:function(e){this._elm.onchange=e},setValue:function(e){this._elm.value=e},getValue:function(){return Number.parseFloat(this._elm.value)},_updateVisibility:function(){this._elm.style.visibility=this.visible?"visible":"hidden"}});return t.NumberBox=i});
//# sourceMappingURL=sourcemaps/NumberBox.js.map

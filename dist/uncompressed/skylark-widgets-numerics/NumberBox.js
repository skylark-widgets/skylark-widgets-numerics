define([
	"skylark-widgets-base/Widget",
	"./numerics"
],function(Widget,numerics){
	//TODO r20200514 lwf
	
	"use strict";

	/**
	 * Number input element.
	 * 
	 * @class NumberBox
	 * @extends {Component}
	 * @param {Component} parent Parent element.
	 */
	var NumberBox = Widget.inherit({

		_construct : function (parent) {
			Widget.prototype._construct.call(this, parent, "input");

			var skin = this.getSkin();

			this._elm.type = "number";
			this._elm.step = "0.1";
			//this._elm.style.backgroundColor = Editor.theme.boxColor;
			//this._elm.style.color = Editor.theme.textColor;
			this._elm.style.backgroundColor = skin.boxColor;
			this._elm.style.color = skin.textColor;
			this._elm.style.outline = "none";
			this._elm.style.borderStyle = "none";
			this._elm.style.boxSizing = "border-box";
			this._elm.style.textIndent = "4px";
			this._elm.style.borderRadius = "4px";
			this._elm.style.boxShadow = "none";
			this._elm.style.MozAppearance = "textfield";
			this._elm.style.webkitAppearance = "caret";
			this._elm.style.appearance = "textfield";
		},

		/**
		 * Set the disabled state of the element.
		 *
		 * @method setDisabled
		 * @param {Boolean} disabled
		 */
		setDisabled : function(disabled) {
			this._elm.disabled = disabled;
		},

		/**
		 * Set number range.
		 *
		 * @methos setRange
		 * @param {Number} min
		 * @param {Number} max
		 */
		setRange : function(min, max) {
			this._elm.min = String(min);
			this._elm.max = String(max);
		},

		/**
		 * Set number step.
		 *
		 * @method setStep
		 * @param {Number} value
		 */
		setStep : function(value) {
			this._elm.step = String(value);
		},

		/**
		 * Set onchange callback, called after changes.
		 *
		 * @method setOnChange
		 * @param {Function} onChange
		 */
		setOnChange : function(onChange) {
			this._elm.onchange = onChange;
		},

		/**
		 * Set value stored in the input element.
		 *
		 * @method setValue
		 * @param {Number} value
		 */
		setValue : function(value) 	{
			this._elm.value = value;
		},

		/**
		 * Get value stored in the input element.
		 *
		 * @method setValue
		 * @return {Object} Value stored in the input element.
		 */
		getValue : function() {
			return Number.parseFloat(this._elm.value);
		},

		updateVisibility : function() 	{
			this._elm.style.visibility = this.visible ? "visible" : "hidden";
		}
	});

	return numerics.NumberBox = NumberBox;
});
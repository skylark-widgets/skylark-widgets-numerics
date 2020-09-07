define([
	"skylark-widgets-base/Widget",
	"skylark-widgets-base/TextPane",
	"./numerics",
	"./NumberBox"
],function(Widget,TextPane,numerics,NumberBox){
	"use strict";

	/**
	 * The vector array box represents multiple numeric variables as a vector.
	 *
	 * @class NumberRow
	 * @extends {Widget}
	 */
	var NumberRow = Widget.inherit({

		_construct : function (parent) {
			Widget.prototype._construct.call(this, parent, "div");

			/**
			 * Array with the values objects.
			 *
			 * Each value object is composed of {label:label, input:input}
			 *
			 * @attribute values
			 * @type {Array}
			 */
			this.values = [];

			/**
			 * Label size in px.
			 *
			 * @attribute labelSize
			 * @type {Number}
			 */
			this.labelSize = 15;
		},

		/**
		 * Set the values step.
		 *
		 * @method setStep
		 * @param {Number} value
		 */
		setStep : function(value) {
			var value = String(value);

			for(var i = 0; i < this.values.length; i++)	{
				this.values[i].input.setStep(value);
			}
		},

		/**
		 * Set the values range
		 *
		 * @method setRange
		 * @param {Number} min
		 * @param {Number} max
		 */
		setRange : function(min, max) {
		 	var min = String(min);
		 	var max = String(max);

			for(var i = 0; i < this.values.length; i++)	{
				this.values[i].input.setRange(min, max);
			}
		},

		/**
		 * Add value to the box
		 *
		 * @method addValue
		 * @param {String} label Label of de attribute.
		 * @return {NumberBox} The input number box created for this value.
		 */
		addValue : function(label) {
			var input = new NumberBox(this);

			var text = new TextPane(this);
			text.setText(label);	

			this.values.push({
				label: text,
				input: input
			});

			return input;
		},

		updateSize : function() {
			Widget.prototype.updateSize.call(this);
			
			var width = Math.round((this.size.x - this.values.length * this.labelSize) / this.values.length);
			var x = 0;
			
			for(var i = 0; i < this.values.length; i++)
			{
				var label = this.values[i].label;
				label.position.set(x, 0);
				label.size.set(this.labelSize, this.size.y);
				label.updateInterface();

				var input = this.values[i].input;
				input.position.set(x + this.labelSize, 0);
				input.size.set(width, this.size.y);
				input.updateInterface();

				x += width + this.labelSize;
			}
		}
	});

	return numerics.NumberRow = NumberRow;
});
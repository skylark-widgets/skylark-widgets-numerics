/**
 * skylark-widgets-numerics - The skylark numeric widgets library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-numerics/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-widgets-numerics/numerics',[
	"skylark-langx/skylark"
],function(skylark) {
	var numerics = {};

	return skylark.attach("widgets.numerics",numerics);

});


define('skylark-widgets-numerics/NumberBox',[
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

		_updateVisibility : function() 	{
			this._elm.style.visibility = this.visible ? "visible" : "hidden";
		}
	});

	return numerics.NumberBox = NumberBox;
});
define('skylark-widgets-numerics/NumberRow',[
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
	var NumberBox = Widget.inherit({

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

		_updateSize : function() {
			Widget.prototype._updateSize.call(this);
			
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
define('skylark-widgets-numerics/Slider',[
	"skylark-domx-eventer",
	"skylark-widgets-base/Widget",
	"./numerics"
],function(eventer,Widget,numerics){

	"use strict";

	/**
	 * Slider widget is used to select a numeric value using a visual slider bar.
	 * 
	 * @class Slider
	 * @extends {Widget}
	 * @param {Widget} parent Parent widget.
	 */
	var Slider = Widget.inherit({

		_construct : function (parent) {
			Widget.call(this, parent, "div");

			this._elm.style.overflow = "visible";

			var skin = this.getSkin();

			var self = this;

			//Text
			this.text = document.createElement("div");
			this.text.style.position = "absolute";
			this.text.style.display = "none";
			this.text.style.justifyContent = "center";
			this.text.style.alignItems = "center";
			this.text.style.zIndex = "10000";
			this.text.style.border = "3px solid";
			this.text.style.borderRadius = "5px";

			//this.text.style.color = Editor.theme.textColor;
			//this.text.style.backgroundColor = Editor.theme.barColor;
			//this.text.style.borderColor = Editor.theme.barColor;	
			this.text.style.color = skin.textColor;
			this.text.style.backgroundColor = skin.barColor;
			this.text.style.borderColor = skin.barColor;	

			document.body.appendChild(this.text);

			//Text value
			this.textValue = document.createTextNode("");
			this.text.appendChild(this.textValue);

			//Mouse mouse move event
			this._elm.onmousemove = function(event)
			{
				self.text.style.display = "flex";
				self.text.style.width = "fit-content";
				self.text.style.height = "fit-content";
				self.text.style.left = event.clientX + "px";
				self.text.style.top = (event.clientY - 30) + "px";
			};

			//Mouse out event
			this._elm.onmouseout = function()
			{
				self.text.style.display = "none";
			};

			//Track
			this.track = document.createElement("div");
			this.track.style.position = "absolute";
			//this.track.style.backgroundColor = Editor.theme.audioTrack;
			this.track.style.backgroundColor = skin.audioTrack;
			this.track.style.cursor = "pointer";
			this.track.style.left = "0px";
			this.track.style.width = "100%";
			this.track.style.top = "25%";
			this.track.style.height = "50%";
			this._elm.appendChild(this.track);

			//Progress
			this.progress = document.createElement("div");
			this.progress.style.pointerEvents = "none";
			this.progress.style.position = "absolute";
			//this.progress.style.backgroundColor = Editor.theme.audioProgress;
			this.progress.style.backgroundColor = skin.audioProgress;
			this.progress.style.height = "100%";
			this.track.appendChild(this.progress);

			//Scrubber
			this.scrubber = document.createElement("div");
			this.scrubber.style.position = "absolute";
			//this.scrubber.style.backgroundColor = Editor.theme.audioScrubber;
			this.scrubber.style.backgroundColor = skin.audioScrubber;
			this.scrubber.style.cursor = "pointer";
			this.scrubber.style.height = "160%";
			this.scrubber.style.top = "-25%";
			this.scrubber.style.width = "6px";
			this.track.appendChild(this.scrubber);

			/**
			 * Value stored in the slider.
			 *
			 * @property value
			 * @type {Number}
			 */
			this.value = 0.0;

			/**
			 * On change callback function.
			 *
			 * @property onChange
			 * @type {Function}
			 */
			this.onChange = null;

			//Range
			this.min = 1.0;
			this.max = 2.0;
			this.step = null;

			//Drag control
			this.mouseStart = 0;
			this.valueStart = 0;

			/**
			 * Event manager to handle window events.
			 *
			 * @property manager
			 * @type {EventManager}
			 */
			//this.manager = new EventManager();
			//this.manager.add(window, "mousemove", function(event)
			eventer.on(widnow,"mousemove", function(event)
			{
				var delta = (event.pageX - self.mouseStart) / (self.size.x);
				var value = self.valueStart + delta * (self.max - self.min);
				self.setValue(value);

				if (self.onChange !== null) {
					self.onChange(self.value);
				}
			});

			//this.manager.add(window, "mouseup", function(event)
			eventer.on(window, "mouseup", function(event)
			{	
				//self.manager.destroy();
			});

			this.scrubber.onmousedown = function(event)
			{
				self.mouseStart = event.pageX;
				self.valueStart = self.value;
				self.manager.create();
				event.stopPropagation();
			};

			this.track.onmousedown = function(event)
			{
				var percentage = (event.layerX / self.size.x);

				self.setValue(percentage * (self.max - self.min) + self.min);
				self.progress.style.width = (percentage * 100) + "%";
				self.scrubber.style.left = self.progress.style.width;
				self.scrubber.onmousedown(event);

				if(self.onChange !== null) {
					self.onChange(self.value);
				}
			};
		},

		/**
		 * Set if widget is disabled.
		 *
		 * @method setDisabled
		 * @param {Boolean} value.
		 */
		setDisabled : function(value) {
			//TODO
		},

		//Set slider min step
		setStep : function(step) {
			this.step = step;
		},

		/**
		 * Set value range of the slider.
		 *
		 * @method setRange.
		 * @param {Number} min
		 * @param {Number} max
		 */
		setRange : function(min, max) {
			this.min = min;
			this.max = max;
		},

		/** 
		 * Set onchange callback.
		 *
		 * @method setOnChange
		 * @param {Function} onChange
		 * @param {String} name Graph name.
		 */
		setOnChange : function(onChange) {
			this.onChange = onChange;
		},

		/**
		 * Set Slider value.
		 *
		 * @method setValue
		 * @param {Number} value
		 */
		setValue : function(value) {
			if(value < this.min) {
				value = this.min;
			} else if(value > this.max) {
				value = this.max;
			}

			if(this.step !== null) {
				var remainder = value % this.step;

				value -= remainder;
				if(remainder > this.step / 2)
				{
					value += this.step;
				}

				//Check for precision problems
				var stepVal = String(this.step).split(".");
				if(stepVal.length > 1)
				{
					var precision = stepVal[1].length;
					var values = String(value).split(".");
					if(values.length > 1)
					{
						value = Number.parseFloat(values[0] + "." + values[1].substr(0, precision));
					}
				}
			}

			this.value = value;
			this._updateValue();
		},

		/**
		 * Get Slider value.
		 *
		 * @method getValue
		 * @return {Number} Value of the slider.
		 */
		getValue : function() {
			return this.value;
		},

		/**
		 * Update the DOM elements to represent the value.
		 *
		 * @method updateValue
		 */
		_updateValue : function() {
			var progress = ((this.value - this.min) / (this.max - this.min)) * 100;

			this.progress.style.width = progress + "%";
			this.scrubber.style.left = progress + "%";
			this.textValue.data = this.value;
		},

		destroy : function() {
			Widget.prototype.destroy.call(this);
			
			if(document.body.contains(this.text))
			{
				document.body.removeChild(this.text);
			}
		}
	});

	return numerics.Slider = Slider;
});
define('skylark-widgets-numerics/VectorBox',[
	"skylark-widgets-base/Widget",
	"./numerics"
],function(Widget,numerics){

	//TODO r20200514 lwf
	
	"use strict";

	/**
	 * The vector box is used to represent Vector2, Vector3, Vector4 and Euler values.
	 *
	 * @class VectorBox
	 * @extends {Widget}
	 */
	var NumberBox = Widget.inherit({

		_construct : function (parent) {
			Widget.call(this, parent, "div");

			//X Text
			this.xText = document.createElement("div");
			this.xText.style.position = "absolute";
			this.xText.style.width = "15px";
			this.xText.style.textAlign = "center";
			this.xText.style.verticalAlign = "middle";
			this.xText.appendChild(document.createTextNode("X"));
			this._elm.appendChild(this.xText);

			function createInput()
			{
				var input = document.createElement("input");
				input.type = "number";
				input.style.backgroundColor = Editor.theme.boxColor;
				input.style.color = Editor.theme.textColor;
				input.style.borderStyle = "none";
				input.style.position = "absolute";
				input.style.boxSizing = "border-box";
				input.style.textIndent = "4px";
				input.style.borderRadius = "4px";
				input.style.outline = "none";
				input.style.MozAppearance = "textfield";
				input.style.webkitAppearance = "caret";
				input.style.appearance = "textfield";
				return input;
			}

			//X
			this.x = createInput();
			this.x.style.left = "15px";
			this._elm.appendChild(this.x);

			//Y Text
			this.yText = document.createElement("div");
			this.yText.style.position = "absolute";
			this.yText.style.width = "15px";
			this.yText.style.textAlign = "center";
			this.yText.style.verticalAlign = "middle";
			this.yText.appendChild(document.createTextNode("Y"));
			this._elm.appendChild(this.yText);

			//Y
			this.y = createInput();
			this._elm.appendChild(this.y);

			//Z Text
			this.zText = document.createElement("div");
			this.zText.style.position = "absolute";
			this.zText.style.width = "15px";
			this.zText.style.textAlign = "center";
			this.zText.style.verticalAlign = "middle";
			this.zText.appendChild(document.createTextNode("Z"));
			this._elm.appendChild(this.zText);

			//Z
			this.z = createInput();
			this._elm.appendChild(this.z);

			//W Text
			this.wText = document.createElement("div");
			this.wText.style.position = "absolute";
			this.wText.style.width = "15px";
			this.wText.style.textAlign = "center";
			this.wText.style.verticalAlign = "middle";
			this.wText.appendChild(document.createTextNode("W"));
			this._elm.appendChild(this.wText);

			//W
			this.w = createInput();
			this._elm.appendChild(this.w);

			//Order
			this.order = "XYZ";
			this.type = VectorBox.VECTOR3;
		},


		/**
		 * Set the type of box, (type of data to use).
		 *  - VectorBox.VECTOR2
		 *  - VectorBox.VECTOR3
		 *  - VectorBox.QUATERNION
		 *
		 * @method setType
		 * @param {Number} type
		 */
		setType : function(type){
			if(this.type !== type){
				this.type = type;
				this._updateInterface();
			}
		},

		/**
		 * Set the values step.
		 *
		 * @method setStep
		 * @param {Number} value
		 */
		setStep : function(value){
			var value = String(value);
			this.x.step = value;
			this.y.step = value;
			this.z.step = value;
			this.w.step = value;
		},

		/**
		 * Set the values range
		 *
		 * @method setRange
		 * @param {Number} min
		 * @param {Number} max
		 */
		setRange : function(min, max){
		 	var min = String(min);
		 	var max = String(max);
			this.x.min = min;
			this.x.max = max;
			this.y.min = min;
			this.y.max = max;
			this.z.min = min;
			this.z.max = max;
			this.w.min = min;
			this.w.max = max;	
		},

		/**
		 * Get a value from the box.
		 *
		 * @method getValue
		 * @return {Object} Value stored.
		 */
		getValue : function() {
			return {
				x: parseFloat(this.x.value), 
				y: parseFloat(this.y.value), 
				z: parseFloat(this.z.value), 
				w: parseFloat(this.w.value), 
				order: this.order
			};
		},

		/**
		 * Set value to the vector box.
		 *
		 * @method setValue
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} z
		 * @param {Number} w
		 * @param {Object} value Value
		 */
		setValue : function(x, y, z, w) {
			if(x.isVector2) {
				this.x.value = x.x;
				this.y.value = x.y;
				this.setType(VectorBox.VECTOR2);
			} else if(x.isVector3) {
				this.x.value = x.x;
				this.y.value = x.y;
				this.z.value = x.z;
				this.setType(VectorBox.VECTOR3);
			} else if(x.isEuler) {
				this.x.value = x.x;
				this.y.value = x.y;
				this.z.value = x.z;
				this.order = x.order;
				this.setType(VectorBox.VECTOR3);
			} else if(x.isQuaternion) {
				this.x.value = x.x;
				this.y.value = x.y;
				this.z.value = x.z;
				this.w.value = x.w;
				this.setType(VectorBox.QUATERNION);
			} else 	{
				this.x.value = x;
				this.y.value = y;
				this.z.value = (z !== undefined) ? z : 0;
				this.w.value = (w !== undefined) ? w : 0;
			}
		},

		/**
		 * Set onchange callback, called after changes.
		 *
		 * @method setOnChange
		 * @param {Function} onChange
		 */
		setOnChange : function(onChange) {
			this.x.onchange = onChange;
			this.y.onchange = onChange;
			this.z.onchange = onChange;
			this.w.onchange = onChange;
		},

		_updateSize : function() {
			Widget.prototype._updateSize.call(this);
			
			var sizeX = Math.round((this.size.x - this.type * 15) / this.type);
			var sizeY = this.size.y + "px";

			this.xText.style.height = sizeY;
			this.xText.style.lineHeight = sizeY;
			this.x.style.width = sizeX + "px";

			this.yText.style.left = (15 + sizeX) + "px";
			this.yText.style.height = sizeY;
			this.yText.style.lineHeight = sizeY;
			this.y.style.left = (30 + sizeX) + "px";
			this.y.style.width = sizeX + "px";

			if(this.type >= VectorBox.VECTOR3){
				this.zText.style.left = (30 + (2 * sizeX)) + "px";
				this.zText.style.height = sizeY;
				this.zText.style.lineHeight = sizeY;
				this.z.style.left = (45 + (2 * sizeX)) + "px";
				this.z.style.width = sizeX + "px";

				if(this.type === VectorBox.QUATERNION){
					this.wText.style.left = (45 + (3 * sizeX)) + "px";
					this.wText.style.height = sizeY;
					this.wText.style.lineHeight = sizeY;
					this.w.style.left = (60 + (3 * sizeX)) + "px";
					this.w.style.width = sizeX + "px";

					this.zText.style.visibility = "visible";
					this.z.style.visibility = "visible";
					this.w.style.visibility = "visible";
					this.wText.style.visibility = "visible";
				}else{
					this.zText.style.visibility = "visible";
					this.z.style.visibility = "visible";
					this.w.style.visibility = "hidden";
					this.wText.style.visibility = "hidden";
				}
			}else{
				this.z.style.visibility = "hidden";
				this.zText.style.visibility = "hidden";
				this.w.style.visibility = "hidden";
				this.wText.style.visibility = "hidden";
			}
		}
	});

	VectorBox.VECTOR2 = 2;
	VectorBox.VECTOR3 = 3;
	VectorBox.QUATERNION = 4;

	return numerics.VectorBox = VectorBox;
});
define('skylark-widgets-numerics/main',[
	"./numerics",
	"./NumberBox",
	"./NumberRow",
	"./Slider",
	"./VectorBox"
],function(numerics){
	return numerics;
});
define('skylark-widgets-numerics', ['skylark-widgets-numerics/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-widgets-numerics.js.map

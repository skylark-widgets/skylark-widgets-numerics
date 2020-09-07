define([
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
	var VectorBox = Widget.inherit({

		_construct : function (parent) {
			Widget.prototype._construct.call(this, parent, "div");

			var skin = this.getSkin();

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
				//input.style.backgroundColor = Editor.theme.boxColor;
				//input.style.color = Editor.theme.textColor;
				input.style.backgroundColor = skin.boxColor;
				input.style.color = skin.textColor;
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
				this.updateInterface();
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

		updateSize : function() {
			Widget.prototype.updateSize.call(this);
			
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
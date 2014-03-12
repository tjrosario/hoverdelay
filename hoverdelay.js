(function ($, undefined) {
	'use strict';
	
	/**
		* Creates an instance of HoverDelay.
		*
		* @constructor
		* @this {HoverDelay}
		* @param {object} $ele The element.
		* @param {object} opts Options.
	*/
	
	var HoverDelay = function ($ele, opts) {
		if ($ele === undefined || !$ele.length) { return; }
		if (!this instanceof HoverDelay) { return new HoverDelay($ele, opts); }
		opts = opts || {};
		var _this = this;
		_this.$ele = $($ele);
		_this.cfg = opts = {
			onMouseEnter: (typeof opts.onMouseEnter === 'function') ? opts.onMouseEnter : function () {},
			onMouseLeave: (typeof opts.onMouseLeave === 'function') ? opts.onMouseLeave : function () {},
			mouseEnterDelay: (typeof opts.mouseEnterDelay === 'number') ? opts.mouseEnterDelay : 0.2, //seconds
			mouseLeaveDelay: (typeof opts.mouseLeaveDelay === 'number') ? opts.mouseLeaveDelay : 0.2 //seconds
		};
		_this.mouseEnterTimer = false;
		_this.mouseLeaveTimer = false;
		_this.init();
	};
	HoverDelay.prototype = {
		init: function () {
			var _this = this,	
				cfg = _this.cfg;
			_this.$ele.on('mouseenter', function (ev) { 
				if (_this.mouseEnterTimer) { return; }
				if (_this.mouseLeaveTimer) { 
					clearTimeout(_this.mouseLeaveTimer); 
					_this.mouseLeaveTimer = false;
				}
				_this.mouseEnterTimer = setTimeout(function () {
					cfg.onMouseEnter(ev);
				}, cfg.mouseEnterDelay * 1000);
			});
			_this.$ele.on('mouseleave', function (ev) {
				if (_this.mouseLeaveTimer) { return; }
				if (_this.mouseEnterTimer) { 
					clearTimeout(_this.mouseEnterTimer);
					_this.mouseEnterTimer = false;
				}
				_this.mouseLeaveTimer = setTimeout(function () {
					cfg.onMouseLeave(ev);
				}, cfg.mouseLeaveDelay * 1000);
			});
		},
		onMouseEnter: function (ev) {
			var _this = this;
			clearTimeout(_this.mouseEnterTimer);
			_this.mouseEnterTimer = false;
			_this.cfg.onMouseEnter(ev);
		},
		onMouseLeave: function (ev) {
			var _this = this;
			clearTimeout(_this.mouseLeaveTimer);
			_this.mouseLeaveTimer = false;
			_this.cfg.onMouseLeave(ev);
		},
		setMouseEnterDelay: function (num) {
			this.cfg.mouseEnterDelay = (typeof num !== 'number') ? this.cfg.mouseEnterDelay : num;
		},
		setMouseLeaveDelay: function (num) {
			this.cfg.mouseLeaveDelay = (typeof num !== 'number') ? this.cfg.mouseLeaveDelay : num;
		}
	};
	
	window.HoverDelay = HoverDelay;
	
}(window.jQuery));
;
(function() {
	var test = document.createElement('input');
	var isPlaceHolderSupported = ('placeholder' in test);

	// Helpers
	function extend(obj1, obj2) {
		var obj = {};
		for (var key in obj1) {
			obj[key] = obj2[key] === undefined ? obj1[key] : obj2[key];
		}
		return obj;
	}

	var defaults = {
		letterDelay: 100, //milliseconds
		sentenceDelay: 1000, //milliseconds
		loop: false,
		startOnFocus: true,
		shuffle: false,
		showCursor: true,
		cursor: '|'
	};

	// Constructor: PlaceHolder
	function PlaceHolder(el, texts, options) {
		this.el = el;
		this.texts = texts;
		options = options || {};
		this.options = extend(defaults, options);
		this.timeouts = [];
		this.begin();
	}

	PlaceHolder.prototype.begin = function() {
		var self = this,
			temp,
			randomIndex,
			ele = self.el,
			dataPlaceholder = el.getAttribute('data-placeholder');
		self.originalPlaceholder = el.getAttribute('placeholder');
		self.texts = self.texts || dataPlaceholder ? dataPlaceholder.split() : [];
		if (self.options.shuffle) {
			for (var i = self.texts.length; i--;) {
				randomIndex = ~~(Math.random() * i);
				temp = self.texts[randomIndex];
				self.texts[randomIndex] = self.texts[i];
				self.texts[i] = temp;
			}
		}

		if (self.options.startOnFocus) {
			el.addEventListener('focus', function() {
				self.processText(0);
			});
			el.addEventListener('blur', function() {
				self.cleanUp();
			});
		} else {
			self.processText(0);
		}
	};

	PlaceHolder.prototype.cleanUp = function(){
		// Stop timeouts
		for (var i = this.timeouts.length; i--;) {
			clearTimeout(this.timeouts[i]);
		}
		this.el.setAttribute('placeholder', this.originalPlaceholder);
		this.timeouts.length = 0;
	};

	PlaceHolder.prototype.typeString = function(str, callback) {
		var self = this,
			timeout;

		if (!str) {
			return false;
		}

		function setTimeoutCallback(index) {
			// Add cursor `|` after current substring unless we are showing last
			// character of the string.
			self.el.setAttribute('placeholder', str.substr(0, index + 1) + (index === str.length - 1 || !self.options.showCursor ? '' : self.options.cursor));
			if (index === str.length - 1) {
				callback();
			}
		}
		for (var i = 0; i < str.length; i++) {
			timeout = setTimeout(setTimeoutCallback, i * self.options.letterDelay, i);
			self.timeouts.push(timeout);
		}
	};

	PlaceHolder.prototype.processText = function(index) {
		var self = this,
			timeout;

		self.typeString(self.texts[index], function() {
			timeout = setTimeout(function() {
				self.processText(self.options.loop ? ((index + 1) % self.texts.length) : (index + 1));
			}, self.options.sentenceDelay);
			self.timeouts.push(timeout);
		});
	};

	var superplaceholder = function(params) {
		if (!isPlaceHolderSupported) {
			return;
		}
		new PlaceHolder(params.el, params.sentences, params.options);
	};

	// open to the world.
	// commonjs
	if (typeof exports === 'object') {
		module.exports = superplaceholder;
	}
	// AMD module
	else if (typeof define === 'function' && define.amd) {
		define(function() {
			return superplaceholder;
		});
	}
	// Browser global
	else {
		window.superplaceholder = superplaceholder;
	}
})();
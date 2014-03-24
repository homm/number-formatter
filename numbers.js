"use strict";

var numberFormatter = (function() {
	function setAttrs(host, attrs) {
		for (var attr in attrs) {
			host[attr] = attrs[attr];
		}
	}

	function defaults(options) {
		function self(value) {
			value = parseInt(value, 10)
			if (isNaN(value)) {
				return self.nan;
			}

			var i = 0,
				threshold = 1000 - 5 * Math.pow(10, 2 - Math.max(self.signs, 3)),
				divider = self.binary ? 1024 : 1000;
			while (value >= threshold && i < self.units.length - 1) {
				i++;
				value /= divider;
			}

			value += 0.000000000000001;

			// number of digits after point: total number minus digits before point
			var fixedTo = Math.max(0, self.signs - Math.floor(value).toFixed(0).length);
			// fixed → number → string, to trim trailing zeroes
			var result = Number(value.toFixed(fixedTo));
			var unit = self.units[i];
			return '' + result + (unit ? self.spacer + unit : '');
		}

		setAttrs(self, defaults);
		setAttrs(self, options || {});
		self.units = self.units.slice();
		return self;
	}

	setAttrs(defaults, {
		// computions
		signs: 3,
		binary: false,
		// formatting
		units: ' k M G T P E Z Y'.split(' '),
		spacer: ' ',  // non-breaking space
		nan: ''
	});

	return defaults;
}) ();

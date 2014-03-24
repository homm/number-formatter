
module("Handling values");

test("Not a number", function() {
	var size = numberFormatter({nan: 'not a number'});

	equal(size(''), 'not a number');
	equal(size(), 'not a number');
	equal(size('test'), 'not a number');
	equal(size('test0'), 'not a number');
	equal(size({}), 'not a number');
	equal(size([]), 'not a number');
});

test("Positive number", function() {
	var size = numberFormatter();

	equal(size('0'), '0');
	equal(size('99'), '99');
	equal(size('  0'), '0');
	equal(size(0), '0');
	equal(size('0test'), '0');
});



module("Preformance");

test("Create formatter", function() {
	for (var i = 10000 - 1; i >= 0; i--) {
		numberFormatter({signs: 2, binary: true, separator: ' '});
	};
	ok(true);
});

test("Format 999", function() {
	var size = numberFormatter({signs: 2, binary: true, separator: ' '});
	for (var i = 10000 - 1; i >= 0; i--) {
		size(999);
	};
	ok(true);
});

test("Format 1020054732", function() {
	var size = numberFormatter({signs: 2, binary: true, separator: ' '});
	for (var i = 10000 - 1; i >= 0; i--) {
		size(1020054732);
	};
	ok(true);
});



module("Binary digits");

test("3 signs", function() {
	var size = numberFormatter({signs: 3, binary: true});

	// 999 -> 0.9765625 overflow
	equal(size(1000 - 1), '999');
	equal(size(1000), '0.98 k');
	// 0.99 -> 1.00 overflow
	equal(size(Math.floor(0.995 * 1024)), '0.99 k');
	equal(size(Math.ceil(0.995 * 1024)), '1 k');
	// 1.00 -> 1.01 overflow
	equal(size(Math.floor(1.005 * 1024)), '1 k');
	equal(size(Math.ceil(1.005 * 1024)), '1.01 k');

	// Same for kk
	equal(size(999.5 * 1024 - 1), '999 k');
	equal(size(999.5 * 1024), '0.98 M');
	equal(size(Math.floor(0.995 * 1024 * 1024)), '0.99 M');
	equal(size(Math.ceil(0.995 * 1024 * 1024)), '1 M');
	equal(size(Math.floor(1.005 * 1024 * 1024)), '1 M');
	equal(size(Math.ceil(1.005 * 1024 * 1024)), '1.01 M');

	// Same for MM
	equal(size(999.5 * 1024 * 1024 - 1), '999 M');
	equal(size(999.5 * 1024 * 1024), '0.98 G');
	equal(size(Math.floor(0.995 * 1024 * 1024 * 1024)), '0.99 G');
	equal(size(Math.ceil(0.995 * 1024 * 1024 * 1024)), '1 G');
	equal(size(Math.floor(1.005 * 1024 * 1024 * 1024)), '1 G');
	equal(size(Math.ceil(1.005 * 1024 * 1024 * 1024)), '1.01 G');

	// 9.99 -> 10.0 overflow
	equal(size(Math.floor(9.995 * 1024)), '9.99 k');
	equal(size(Math.ceil(9.995 * 1024)), '10 k');
	// 99.9 -> 100 overflow
	equal(size(Math.floor(99.95 * 1024)), '99.9 k');
	equal(size(Math.ceil(99.95 * 1024)), '100 k');
});

test("2 signs, ", function() {
	var size = numberFormatter({signs: 2, binary: true});

	equal(size(1000 - 1), '999');
	equal(size(1000), '1 k');
	equal(size(Math.floor(0.95 * 1024)), '972');
	equal(size(Math.ceil(0.95 * 1024)), '973');
	equal(size(Math.floor(1.05 * 1024)), '1 k');
	equal(size(Math.ceil(1.05 * 1024)), '1.1 k');

	equal(size(999.5 * 1024 - 1), '999 k');
	equal(size(999.5 * 1024), '1 M');
	equal(size(Math.floor(0.95 * 1024 * 1024)), '973 k');
	equal(size(Math.ceil(0.95 * 1024 * 1024)), '973 k');
	equal(size(Math.floor(1.05 * 1024 * 1024)), '1 M');
	equal(size(Math.ceil(1.05 * 1024 * 1024)), '1.1 M');

	equal(size(999.5 * 1024 * 1024 - 1), '999 M');
	equal(size(999.5 * 1024 * 1024), '1 G');
	equal(size(Math.floor(0.95 * 1024 * 1024 * 1024)), '973 M');
	equal(size(Math.ceil(0.95 * 1024 * 1024 * 1024)), '973 M');
	equal(size(Math.floor(1.05 * 1024 * 1024 * 1024)), '1 G');
	equal(size(Math.ceil(1.05 * 1024 * 1024 * 1024)), '1.1 G');

	equal(size(Math.floor(9.95 * 1024)), '9.9 k');
	equal(size(Math.ceil(9.95 * 1024)), '10 k');
	equal(size(99.5 * 1024 - 1), '99 k');
	equal(size(99.5 * 1024), '100 k');
});

test("4 signs", function() {
	var size = numberFormatter({signs: 4, binary: true});

	equal(size(1000 - 1), '999');
	equal(size(1000), '0.977 k');
	equal(size(Math.floor(0.9995 * 1024)), '0.999 k');
	equal(size(Math.ceil(0.9995 * 1024)), '1 k');
	equal(size(Math.floor(1.0005 * 1024)), '1 k');
	equal(size(Math.ceil(1.0005 * 1024)), '1.001 k');

	equal(size(Math.floor(999.95 * 1024)), '999.9 k');
	equal(size(Math.ceil(999.95 * 1024)), '0.977 M');
	equal(size(Math.floor(0.9995 * 1024 * 1024)), '0.999 M');
	equal(size(Math.ceil(0.9995 * 1024 * 1024)), '1 M');
	equal(size(Math.floor(1.0005 * 1024 * 1024)), '1 M');
	equal(size(Math.ceil(1.0005 * 1024 * 1024)), '1.001 M');

	equal(size(Math.floor(999.95 * 1024 * 1024)), '999.9 M');
	equal(size(Math.ceil(999.95 * 1024 * 1024)), '0.977 G');
	equal(size(Math.floor(0.9995 * 1024 * 1024 * 1024)), '0.999 G');
	equal(size(Math.ceil(0.9995 * 1024 * 1024 * 1024)), '1 G');
	equal(size(Math.floor(1.0005 * 1024 * 1024 * 1024)), '1 G');
	equal(size(Math.ceil(1.0005 * 1024 * 1024 * 1024)), '1.001 G');

	equal(size(Math.floor(9.9995 * 1024)), '9.999 k');
	equal(size(Math.ceil(9.9995 * 1024)), '10 k');
	equal(size(Math.floor(99.995 * 1024)), '99.99 k');
	equal(size(Math.ceil(99.995 * 1024)), '100 k');
});

test("5 signs", function() {
	var size = numberFormatter({signs: 5, binary: true});

	equal(size(1000 - 1), '999');
	equal(size(1000), '0.9766 k');
	equal(size(Math.floor(0.99995 * 1024)), '0.999 k');
	equal(size(Math.ceil(0.99995 * 1024)), '1 k');
	equal(size(Math.floor(1.00005 * 1024)), '1 k');
	equal(size(Math.ceil(1.00005 * 1024)), '1.001 k');

	equal(size(Math.floor(999.995 * 1024)), '999.99 k');
	equal(size(Math.ceil(999.995 * 1024)), '0.9766 M');
	equal(size(Math.floor(0.99995 * 1024 * 1024)), '0.9999 M');
	equal(size(Math.ceil(0.99995 * 1024 * 1024)), '1 M');
	equal(size(Math.floor(1.00005 * 1024 * 1024)), '1 M');
	equal(size(Math.ceil(1.00005 * 1024 * 1024)), '1.0001 M');

	equal(size(Math.floor(999.995 * 1024 * 1024)), '999.99 M');
	equal(size(Math.ceil(999.995 * 1024 * 1024)), '0.9766 G');
	equal(size(Math.floor(0.99995 * 1024 * 1024 * 1024)), '0.9999 G');
	equal(size(Math.ceil(0.99995 * 1024 * 1024 * 1024)), '1 G');
	equal(size(Math.floor(1.00005 * 1024 * 1024 * 1024)), '1 G');
	equal(size(Math.ceil(1.00005 * 1024 * 1024 * 1024)), '1.0001 G');

	equal(size(Math.floor(9.99995 * 1024)), '9.999 k');  // 9.9990234375
	equal(size(Math.ceil(9.99995 * 1024)), '10 k');
	equal(size(Math.floor(99.9995 * 1024)), '99.999 k');  // 99.999023438
	equal(size(Math.ceil(99.9995 * 1024)), '100 k');
});



module("Si digits");

test("3 signs", function() {
	var size = numberFormatter({signs: 3});

	// 999 -> 1.00 overflow
	equal(size(1000 - 1), '999');
	equal(size(1000), '1 k');
	// 1.00 -> 1.01 overflow
	equal(size(1005 - 1), '1 k');
	equal(size(1005), '1.01 k');  // 1.005 is 1.004999

	// Same for kk
	equal(size(999500 - 1), '999 k');
	equal(size(999500), '1 M');
	equal(size(1005000 - 1), '1 M');
	equal(size(1005000), '1.01 M');  //  1.005 is 1.004999

	// Same for MM
	equal(size(999500000 - 1), '999 M');
	equal(size(999500000), '1 G');
	equal(size(1005000000 - 1), '1 G');
	equal(size(1005000000), '1.01 G');  //  1.005 is 1.004999

	// 9.99 -> 10.0 overflow
	equal(size(9995 - 1), '9.99 k');
	equal(size(9995), '10 k');
	// 99.9 -> 100 overflow
	equal(size(99950 - 1), '99.9 k');
	equal(size(99950), '100 k');
});

test("2 signs", function() {
	var size = numberFormatter({signs: 2});

	equal(size(1000 - 1), '999');
	equal(size(1000), '1 k');
	equal(size(1050 - 1), '1 k');
	equal(size(1050), '1.1 k');

	equal(size(999500 - 1), '999 k');
	equal(size(999500), '1 M');
	equal(size(1050000 - 1), '1 M');
	equal(size(1050000), '1.1 M');

	equal(size(999500000 - 1), '999 M');
	equal(size(999500000), '1 G');
	equal(size(1050000000 - 1), '1 G');
	equal(size(1050000000), '1.1 G');

	equal(size(9950 - 1), '9.9 k');
	equal(size(9950), '10 k');
	equal(size(99500 - 1), '99 k');
	equal(size(99500), '100 k');
});

test("4 signs", function() {
	var size = numberFormatter({signs: 4});

	equal(size(1000 - 1), '999');
	equal(size(1000), '1 k');
	equal(size(1001), '1.001 k');

	equal(size(999950 - 1), '999.9 k');
	equal(size(999950), '1 M');
	equal(size(1000500 - 1), '1 M');
	equal(size(1000500), '1.001 M');

	equal(size(999950000 - 1), '999.9 M');
	equal(size(999950000), '1 G');
	equal(size(1000500000 - 1), '1 G');
	equal(size(1000500000), '1.001 G');

	equal(size(9999500 - 1), '9.999 M');
	equal(size(9999500), '10 M');
	equal(size(99995 - 1), '99.99 k');
	equal(size(99995), '100 k');
});

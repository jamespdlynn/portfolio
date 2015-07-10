/*global define, describe, it, expect*/
define(['app', 'angularAMD'], function (app, angularAMD) {
	'use strict';

	describe('app.js', function () {
		console.log('### Running app.spec.js: ');

		it('app should be defined.', function () {
			expect(app).toBeDefined();
		});

		it('angularAMD must be bootstrapped', function (done) {
			setTimeout(function () {
				angularAMD.appname();
				console.log('### angularAMD boostrapped ');
				done();
			}, 999);
		});
	});
});
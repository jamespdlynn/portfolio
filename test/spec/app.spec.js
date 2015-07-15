/*global define, describe, it, expect*/
/**
 * App Tests
 * Should be run before all other test files to ensure AngularAMD is bootstrapped
 * @author James Lynn
 */
define(['app', 'angularAMD'], function (app, angularAMD) {
	'use strict';

	describe('app.js', function () {
		console.log('### Running app.spec.js: ');

		it('app is defined.', function () {
			expect(app).toBeDefined();
		});

		//Wait a second before ensuring angular amd is bootstrapped properly
		it('angularAMD bootstrapped', function (done) {
			setTimeout(function () {
				console.log('### angularAMD boostrapped ');
				expect(app.name).toBe(angularAMD.appname());
				done();
			}, 1000);
		});
	});
});
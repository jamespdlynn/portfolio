/**
 * RequireJS Config for Karma Tests
 * @author James Lynn
 */
(function () {
	'use strict';

	/*
	 Retrieve list of files test files from karma.
	 Make sure that app_test.js is always the first to run
	 */
	var firstFile, firstFileREGEXP = /app\.js$/i,
		testFiles = [], testFilesREGEXP = /(spec|test)\.js$/i;

	Object.keys(window.__karma__.files).forEach(function (file) {
		if (testFilesREGEXP.test(file)) {
			if (firstFileREGEXP.test(file)) {
				firstFile = file;
			}
			testFiles.push(file);
		}
	});

	if (firstFile) {
		testFiles.unshift(firstFile);
	}

	require.config({
		baseUrl: '/base/src/js/scripts',

		paths: {
			jquery: ['../lib/jquery'],
			angular: ['../lib/angular'],
			angularAnimate: ['../lib/angular-animate'],
			angularUIRouter: ['../lib/angular-ui-router'],
			angularSlick: ['../lib/angular-slick'],
			angularAMD: ['../lib/angularAMD'],
			ngload: ['../lib/ngload'],
			slick: ['../lib/slick']
		},

		shim: {
			angularUIRouter: ['angular'],
			angularAnimate: ['angular'],
			angularSlick: ['angular', 'slick'],
			angularAMD: ['angular'],
			ngload: ['angularAMD']
		},

		config: {
			'config/preload': {
				path: '/base/src/assets'
			},
			'config/states': {
				path: '/base/src/templates'
			}
		},

		deps: testFiles,

		callback: window.__karma__.start
	});

	//Create dummy Audio object for PhantomJS Browser
	window.Audio = window.Audio || function () {
		this.play = this.pause = this.load = this.addEventListener = this.removeEventListener = function () {
		};
		this.readyState = 4;
	};

	/* jshint ignore:start */
	Function.prototype.bind = Function.prototype.bind || function (oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {
			},
			fBound = function () {
				return fToBind.apply(this instanceof fNOP
						? this
						: oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
	/* jshint ignore:end */

}());

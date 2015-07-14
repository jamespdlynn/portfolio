/*global window*/
(function(){
	'use strict';

	/*
	 Create list of file to run in test.  Making sure that app_test.js is
	 always the first to run
	 */
	var firstFile, firstFileREGEXP = /app\.js$/i,
		testFiles = [], testFilesREGEXP = /(spec|test)\.js$/i;

	Object.keys(window.__karma__.files).forEach(function (file) {
		if (testFilesREGEXP.test(file)) {
			if (firstFileREGEXP.test(file)) {
				firstFile = file;
			}
			console.log(file)
			testFiles.push(file);
		}
	});

	if (firstFile) {
		testFiles.unshift(firstFile);
	}

	require.config({
		baseUrl: '/base/src/js/scripts',

		paths: {
			jquery : ['../lib/jquery'],
			angular: ['../lib/angular'],
			angularAnimate : ['../lib/angular-animate'],
			angularUIRouter : ['../lib/angular-ui-router'],
			angularSlick : ['../lib/angular-slick'],
			angularAMD: ['../lib/angularAMD'],
			ngload: ['../lib/ngload'],
			slick : ['../lib/slick']
		},

		shim: {
			angularUIRouter : ['angular'],
			angularAnimate : ['angular'],
			angularSlick : ['angular','slick'],
			angularAMD: ['angular'],
			ngload: ['angularAMD']
		},

		config : {
			'config/preload' : {
				path :  '/base/src/assets'
			},
			'config/states' : {
				path : '/base/src/templates'
			}
		},

		deps: testFiles,

		callback: window.__karma__.start
	});

}());

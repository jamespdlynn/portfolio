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
		baseUrl: '/base/public/js/scripts',

		paths: {
			jquery : ['../lib/jquery.min'],
			angular: ['../lib/angular.min'],
			angularAnimate : ['../lib/angular-animate.min'],
			angularUIRouter : ['../lib/angular-ui-router.min'],
			angularSlick : ['../lib/angular-slick.min'],
			angularAMD: ['../lib/angularAMD.min'],
			ngload: ['../lib/ngload.min'],
			slick : ['../lib/slick.min']
		},

		shim: {
			angularUIRouter : ['angular'],
			angularAnimate : ['angular'],
			angularSlick : ['angular','slick'],
			angularAMD: ['angular'],
			ngload: ['angularAMD']
		},

		deps: testFiles,

		callback: window.__karma__.start
	});

}());

/*global define*/
/**
 * Custom Secret Directive for Contact form
 * @module directive/secret
 * @author James Lynn
 */
define(['angularAMD'], function (angularAMD) {
	'use strict';

	/**@const @readonly @type {number}*/
	var SECRET = 12;

	angularAMD.directive('secret', function() {
		return {
			require: 'ngModel',

			link: function (scope, element, attrs, ctrl) {
				//Perform custom validation
				ctrl.$validators.secret = function(modelValue){
					return parseInt(modelValue, 10) === SECRET;
				};
			}
		};
	});
});
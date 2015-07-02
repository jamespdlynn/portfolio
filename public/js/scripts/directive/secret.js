define(['angularAMD'], function (angularAMD) {
	angularAMD.directive('secret', function() {
		return {
			require: 'ngModel',

			link: function (scope, element, attrs, ctrl) {
				ctrl.$validators.secret = function(modelValue){
					return parseInt(modelValue) === 12;
				}
			}
		}
	});
});
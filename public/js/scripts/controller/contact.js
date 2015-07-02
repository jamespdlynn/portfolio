define(['angularAMD', 'directive/secret'], function (angularAMD) {
	angularAMD.controller('ContactController', function($scope) {
		$scope.submit = function(form, data){
			console.log(form.$valid);
			form.$setTouched();
		}
	});
});
define(['angularAMD', 'directive/secret'], function (angularAMD) {
	angularAMD.controller('ContactController', function($scope, $http) {

		$scope.state = 0;

		$scope.submit = function(data){
			$scope.state = 1;
			$http.post('/mail', data).
				success(function(){
					$scope.state = 2;
				}).
				error(function(){
					$scope.state = 3;
				});
		}
	});
});
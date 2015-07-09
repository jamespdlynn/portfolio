define(['angularAMD', 'directive/secret'], function (angularAMD) {
	angularAMD.controller('ContactController', function($scope, $http, $preloader) {

		$scope.state = 0;

		$scope.submit = function(data){
			$scope.state = 1;
			$http.post('/mail', data).
				success(function(){
					$scope.state = 2;
					$preloader.fetch('mail').play();
				}).
				error(function(){
					$scope.state = 3;
				});
		}
	});
});
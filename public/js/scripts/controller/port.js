define(['angularAMD', 'directive/port'], function (angularAMD) {
	angularAMD.controller('PortfolioController', function($scope, $state, $States) {

		var subStates = $States.find({key:'portfolio'}).states;
		$scope.navItems = subStates.filter(function(value){
			return !value.navDisabled;
		});

		$scope.$on('$stateChangeSuccess', function(event, state){
			var item = $scope.navItems.find({name:state.name});
			$scope.navIndex = $scope.navItems.indexOf(item);
		});

		$scope.$watch('navIndex',function(value) {
			value = Math.abs(value%$scope.navItems.length);
			$state.go('^.'+$scope.navItems[value].key);
		});
	});
});
define(['angularAMD', 'directive/mousewheel'], function (angularAMD) {
	angularAMD.controller('PortfolioController', function($scope, $state, $states, $preloader) {

		var subStates = $states.find({id:'portfolio'}).states;

		$scope.nav = {
			index : 0,

			slides : window.innerWidth > 480 ? 5 : 3,

			lastScroll : 0,

			items : subStates.filter(function(item){
				return !item.navDisabled;
			}),

			onScroll : function(delta, timeStamp){
				if (timeStamp  - $scope.nav.lastScroll > 500){
					$scope.nav.index += delta;
					$scope.nav.lastScroll = timeStamp;
				}
			}
		};

		$scope.$on('$stateChangeSuccess', function(event, state){
			var item = $scope.nav.items.find({name:state.name});
			$scope.nav.index = $scope.nav.items.indexOf(item);
		});

		$scope.$watch('nav.index',function(value) {
			value = Math.abs(value%$scope.nav.items.length);
			$state.go('^.'+$scope.nav.items[value].id);
		});


	});
});
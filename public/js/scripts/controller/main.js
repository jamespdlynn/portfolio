define(['angularAMD', 'directive/avatar', 'directive/nav'], function (angularAMD) {
	angularAMD.controller('MainController', function($scope, $state, $states, $preloader){

		$scope.isLoading = true;

		$scope.avatar = {

			initialized : false,

			isLeft : $state.current.name !== 'home',

			onClick : function(){
				if (this.isWalking()) return;

				if (this.isLeft){
					this.toggle().then(function(){
						$scope.nav.show();
					});
					$state.go('home');
				}
				else{
					$scope.nav.toggle();
				}

			}
		};

		$scope.nav = {

			initialized : false,

			items :  $states.filter(function(value){
				return !value.navDisabled;
			}),

			onClick : function(state){
				if (this.isHidden()) return;

				this.hide().then(function(){
					return $scope.avatar.toggle();
				}).then(function(){
					window.location = '/#/'+state;
				});

				$preloader.load(state);
			}
		};

		$scope.$on('$stateChangeSuccess', function(event, state){
			var isLeft = (state.name !== 'home');

			if ($scope.avatar.initialized && isLeft != $scope.avatar.isLeft){
				$scope.avatar.animateRandom();
			}

			if ($scope.nav.initialized){
				$scope.nav.hide();
			}

			$scope.avatar.isLeft = isLeft;
		});

		$preloader.load('main').then(function(){
			$scope.isLoading = false;
		});

	});
});
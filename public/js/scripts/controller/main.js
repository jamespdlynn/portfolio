define(['angularAMD', 'directive/avatar', 'directive/nav'], function (angularAMD) {
	angularAMD.controller('MainController', function($scope, $state, $states, $preloader){

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

		$scope.isLoading = true;

		$preloader.load('main').finally(function(){
			$scope.isLoading = false;
		});

		$scope.$on('$stateChangeSuccess', function(event, state){
			var isLeft = (state.name !== 'home');

			if ($scope.avatar.initialized && isLeft != $scope.avatar.isLeft){
				$scope.avatar.animateRandom();
			}

			$scope.avatar.isLeft = isLeft;
		});


	});
});
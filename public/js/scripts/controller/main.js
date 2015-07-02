define(['angularAMD', 'directive/avatar', 'directive/nav'], function (angularAMD) {
	angularAMD.controller('MainController', function($scope, $state, $States){

		$scope.avatar = {

			onClick : function(){
				if (this.isWalking()) return;

				if (this.isLeft()){
					this.toggle(function(){
						$scope.nav.show();
					});
					$state.go('home');
				}
				else{
					$scope.nav.toggle();
				}

			}
		}

		$scope.nav = {

			items :  $States.filter(function(value){
				return !value.navDisabled;
			}),

			onClick : function(state){
				if ($scope.nav.isHidden()) return;

				$scope.nav.hide(function(){
					$scope.avatar.toggle(function(){
						window.location = '/#/'+state;
					});
				});
			}
		};

		$scope.$on('$stateChangeSuccess', function(event, state){
			var isLeft = !!(state.template || state.templateUrl);
			if ($scope.avatar.isLeft && $scope.avatar.isLeft() !== isLeft){
				$scope.nav.hide();
				$scope.avatar.toggle();
			}
		});

	});
});
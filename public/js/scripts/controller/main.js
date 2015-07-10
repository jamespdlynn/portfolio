/*global define, window*/
/**
 * Main Avatar/Nav Controller
 * @module controller/main
 * @author James Lynn
 */
define(['angularAMD', 'directive/avatar', 'directive/nav'], function (angularAMD) {
	'use strict';

	angularAMD.controller('MainController', function($scope, $state, $states, $preloader){

		/*
		   Because the a lot of the DOM animations need to be sequenced
		   the avatar and nav directives will actually override their section of the scope
		   with functions and associated callbacks for the controller to call.
		   This is kind of ugly and unangular but it works and it allows me to clump the overhead logic all in one file.
		*/

		$scope.isLoading = true; //Don't allow interaction with avatar or nav while assets are loading

		$scope.avatar = {

			initialized : false, //set to true once directive overrides scopes functionality

			isLeft : ($state.current.name !== 'home'), //Center on home state, left otherwise

			onClick : function(){
				if (!this.isWalking()){

					if (this.isLeft){
						//animate back to center
						this.toggle().then(function(){
							$scope.nav.show();
						});
						$state.go('home'); //trigger state change immediately
					}
					else{
						$scope.nav.toggle();
					}

				}
			}
		};

		$scope.nav = {

			initialized : false, //set to true once directive overrides scopes functionality

			isHidden : true, //Nav starts as hidden

			//Get the list of states for the nav to display from the $states constant
			items :  $states.filter(function(value){
				return value.navEnabled;
			}),

			/** @param {state} state */
			onClick : function(state){
				if (!this.isHidden){
					//Trigger animation change
					this.hide().then(function(){
						return $scope.avatar.toggle();
					})
					//Wait until animation is finished to change state
					.then(function(){
						//Have to alter the state by directly manipulating the browser location since changing to an abstract state throws a ui router error
						window.location = '/#'+state.url;
					});

					//Get ahead start on preloading this state's assets
					$preloader.load(state.id);
					require(state.require);
				}
			}
		};

		//Listen for a state change from the router to manually change the avatar's current position
		$scope.$on('$stateChangeSuccess', function(){
			var isLeft = ($state.current.name !== 'home');

			//Had to do some a bit hacky DOM manipulation here to make sure the sub elements don't get into a weird state
			if ($scope.avatar.initialized && isLeft != $scope.avatar.isLeft){
				$scope.avatar.animateRandom();
			}
			if ($scope.nav.initialized){
				$scope.nav.hide();
			}

			$scope.avatar.isLeft = isLeft;
		});

		//Fully load all the associated assets before allowing interaction with this state
		$preloader.load('main').then(function(){
			$scope.isLoading = false;
		});

	});
});
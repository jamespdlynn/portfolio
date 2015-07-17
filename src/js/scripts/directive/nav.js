/*global define, angular*/
/**
 * Directive associated the main navigation dom element
 * @module directive/file
 * @author James Lynn
 */
define(['angularAMD','service/preloader','service/userAgent'], function (angularAMD) {
	'use strict';

	angularAMD.directive('nav', function () {

		return {

			restrict: 'E',

			scope : true, //Disassociated scope

			controller : function($scope, $timeout, $preloader, $states, $userAgent) {

				/** @const @readonly {Number} Show/hide transition duration in milliseconds*/
				var TRANSITION_DURATION = 300;

				angular.extend($scope, {

					isHidden: true,

					//States displayed in the nav
					items :  $states.filter(function(value){
						return value.navEnabled;
					}),

					/**
					 * Hides nav and plays associated sound
					 * @returns {Promise}
					 */
					hide: function () {
						$scope.isHidden = true;
						$preloader.play('swoosh');
						return $timeout(function(){}, TRANSITION_DURATION);
					},

					/**
					 * Shows nav and plays associated sound
					 * @returns {Promise}
					 */
					show: function () {
						$scope.isHidden = false;
						$preloader.play('bloop');
						return $timeout(function(){}, TRANSITION_DURATION);
					},

					/**
					 * Toggles between show and hide
					 * @returns {Promise}
					 */
					toggle: function () {
						return $scope.isHidden ? $scope.show() : $scope.hide();
					},

					onHover: function () {
						if (!$scope.isHidden && !$userAgent.isMobile()){
							$preloader.fetch('click').play();

						}
					},

					onClick: function (state) {
						if ($scope.isHidden) {
							return;
						}

						//Hide nav
						$scope.hide().then(function () {
							//Trigger an avatar toggle, and have its controller handle the actual state change upon completion
							$scope.emit($scope.Events.AVATAR_TOGGLE, state);
						});

						//Get a head start on preloading this state's modules and assets
						$preloader.load(state.id);
					}

				});

				$scope.on($scope.Events.NAV_TOGGLE, function(){
					$scope.toggle();
				});

				//Always hide nav on state change
				$scope.on($scope.Events.STATE_CHANGE, function(){
					$scope.isHidden = true;
				});
			}
		};
	});
});

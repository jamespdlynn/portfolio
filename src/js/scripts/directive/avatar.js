/*global define, angular, window*/
/**
 * Directive associated with the animated avatar DOM element
 * @module directive/avatar
 * @author James Lynn
 */
define(['angularAMD','service/preloader','service/userAgent'], function (angularAMD) {
	'use strict';

	angularAMD.directive('avatar', function () {


		return {
			restrict: 'E',

			//Disassociated scope
			scope : true,

			controller : function($scope, $rootScope, $timeout, $preloader) {

				/**
				 * CSS animation properties
				 * @typedef {Object} animation
				 * @property {number} duration - Length of animation
				 * @property {audio} Audio - The associated audio file
				 */

				/**
				 * @readonly
				 * @type {animation}
				 */
				var Animations = {

					blink: {duration: 600},

					wave: {duration: 2000},

					dance: {duration: 1600},

					walk: {
						audio: $preloader.fetch('walk'),
						duration: 2000
					},

					exorcist : {
						audio : $preloader.fetch('scream'),
						duration : 2400
					}

				};

				var promise = null;

				//Every five second execute a random animation
				var animateRandom = function () {
					promise = $timeout(function () {
						//70% chance to blink, 15% chance to wave, 15% chance to dance
						var num = Math.random();
						$scope.animate((num >= 0.3 ? 'blink' : (num >= 0.15 ? 'wave' : 'dance')));
					}, 5000);

					return $scope;
				};


				angular.extend($scope, {

					animation: '',

					isLeft: !$scope.isHome(),

					/**
					 * Resets any current animation and associated audio
					 * @returns $scope
					 */
					reset: function () {
						if ($scope.animation) {
							var audio = Animations[$scope.animation].audio;
							//Bug resetting audio on IOS devices
							if (audio && audio.currentTime) {
								audio.pause();
								audio.currentTime = 0;
							}
						}

						$timeout.cancel(promise);
						$scope.animation = '';

						return $scope;
					},

					/**
					 * Sets an animation class on the avatar
					 * @param type {string} One of the predefined animation types
					 * @returns {Promise} Object that resolves on animation completion
					 */
					animate: function (type) {

						if (!Animations.hasOwnProperty(type)){
							console.error('Invalid animation: '+type);
							return null;
						}

						$scope.reset();
						$scope.animation = type;

						if (Animations[type].audio){
							Animations[type].audio.play();
						}

						//When animation completes reset scope
						promise = $timeout(function () {
							$timeout(function(){
								$scope.reset();
								animateRandom();
							});
						}, Animations[type].duration);

						return promise;
					},

					/**
					 * Animates a walk
					 * @returns {Promise}
					 */
					toggle: function () {
						$scope.isLeft = !$scope.isLeft;
						return $scope.animate('walk');
					},


					isWalking : function(){
						return $scope.animation === 'walk';
					},

					onClick: function () {
						if ($scope.isWalking()) {
							return;
						}

						if ($scope.isLeft) {
							//animate back to center
							$scope.toggle().then(function () {
								$scope.emit($scope.Events.NAV_TOGGLE); //on completion nav show
							});
							$scope.goHome(); //trigger state change immediately
						}
						else {
							$scope.emit($scope.Events.NAV_TOGGLE);
						}
					}

				});


				$scope.on($scope.Events.AVATAR_TOGGLE, function(event, state){
					$scope.toggle().then(function(){
						$scope.goToState(state); //On walk animation completion trigger state change
					});
				});


				$scope.on($scope.Events.STATE_CHANGE, function(){
					//If state change does not match avatars current transition state (as in the case of manipulating the state directly through the browser)
					//Override any current animations and manually position the avatar
					if ($scope.isHome() === $scope.isLeft){
						$scope.reset();
						$scope.isLeft = !$scope.isHome();
						animateRandom();
					}
				});

				animateRandom();

				//Add global function so you can animate from the console
				window.animate = function(type){
					$scope.animate(type);
					$scope.$digest();
				};

			},

			link : function(scope, element){

				//Easter Egg!
				element.on('touchstart', function(){
					//Easter egg
					var timeout = setTimeout(function(){
						window.animate('exorcist');
					}, 6000);

					element.on('touchend touchcancel', function(){
						clearTimeout(timeout);
					});
				});

				console.log(
					'Look at you using the developer console, you techno wizard!\n'+
					'Want to see something scary?\n' +
					'Type "animate(\'exorcist\');"'
				);
			}

		};




	});
});


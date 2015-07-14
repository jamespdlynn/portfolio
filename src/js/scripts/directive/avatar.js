/*global define, angular, window*/
/**
 * Directive associated with the animated avatar DOM element
 * @module directive/avatar
 * @author James Lynn
 */
define(['angularAMD'], function (angularAMD) {
	'use strict';

	angularAMD.directive('avatar', function ($timeout, $q, $preloader,$userAgent) {

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
		var animations = {
			blink: {
				duration: 600
			},

			wave: {
				duration: 2000
			},

			dance: {
				duration: 1600
			},

			walk: {
				audio: $preloader.fetch('walk'),
				duration: 2000
			}
		};

		return {
			restrict: 'E',

			link: function (scope, element) {

				//Override the scopes avatar object with additional functionality
				angular.extend(scope.avatar, {

					initialized : true,

					/** @type string **/
					_animation : null,

					/** @type object**/
					_promise : null,

					/**
					 * Resets the element's current animation clears any associated timers
					 * @returns {scope.avatar}
					 */
					reset: function () {

						if (this._animation){
							element.removeClass(this._animation);

							//Pause and reset the audio file if necessary (except in IOS as this was causing a bug)
							var audio = animations[this._animation].audio;
							if (audio && !audio.ended && !$userAgent.isIOS()) {
								audio.pause();
								audio.currentTime = 0;
							}
						}

						$timeout.cancel(this._promise);

						this._animation = null;
						this._promise = null;

						return this;
					},

					/**
					 * Performs associated animation
					 * @param {string} type
					 * @returns {*} Promise object
					 */
					animate: function (type) {
						//Make sure valid type
						if (!animations.hasOwnProperty(type)){
							console.error('Invalid animation: ' + type);
							return null;
						}

						//Reset current animation
						this.reset();

						this._animation = type;
						element.addClass(type);

						if (animations[type].audio){
							animations[type].audio.play();
						}

						//Originally I was using event callbacks to determine when animations finished
						//but, while less dynamic, I found using hardcoded durations to be more reliable
						this._promise = $timeout(function () {
							$timeout(function(){
								scope.avatar.animateRandom();
							});
						}, animations[type].duration || 0);

						return this._promise;
					},

					isWalking: function () {
						return element.hasClass('walk');
					},

					/**
					 * Toggles avatar between left and right
					 * @returns {*} Promise object
					 */
					toggle: function () {
						element.toggleClass('left');
						this.isLeft = !this.isLeft;
						return this.animate('walk');
					},

					/**
					 * Every five seconds make the avatar perform a randomly chosen animation
					 * @returns {scope.avatar}
					 */
					animateRandom: function () {
						this.reset();
						this._promise = $timeout(function(){
							var num = Math.random();
							//70% chance to blink, 15% chance to wave, 15% chance to dance
							scope.avatar.animate((num >= 0.3 ? 'blink' : (num >= 0.15 ? 'wave' : 'dance')));
						}, 5000);

						return this;
					}

				});


				//Start the random animation timer
				window.avatar = scope.avatar.animateRandom();
			}
		};
	});
});


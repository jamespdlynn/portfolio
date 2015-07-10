/*global define, angular*/
/**
 * Directive used for handling mouse wheel events
 * @module directive/file
 * @author James Lynn
 */
define(['angularAMD'], function (angularAMD) {
	'use strict';

	angularAMD.directive('nav', function ($timeout, $q, $preloader, $userAgent) {

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

			show: {
				duration: 900,
				audio: $preloader.fetch('bloop')
			},

			hide: {
				duration: 300,
				audio: $preloader.fetch('swoosh')
			},

			hover: {
				duration: 150,
				audio: $preloader.fetch('click')
			}
		};


		return {
			restrict: 'E',

			link: function (scope) {

				angular.extend(scope.nav, {

					initialized : true,

					/** @type string **/
					_animation : null,

					/** @type number**/
					_timeout : NaN,

					/**
					 * Resets the nav element's current animation audio clears any associated timers
					 * @returns {scope.nav}
					 */
					reset: function () {
						if (this._animation){
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
					 * Performs associated animation audio and attaches a callback
					 * @param {string} type
					 * @returns {*} Promise object
					 */
					animate: function (type) {

						if (!animations.hasOwnProperty(type)) {
							console.error('Invalid animation: ' + type);
							return null;
						}


						this.reset();
						if (animations[type].audio){
							animations[type].audio.play();
						}

						//Originally I was using event callbacks to determine when animations finished
						//but, while less dynamic, I found using hardcoded durations to be more reliable
						this._animation = type;
						this._promise = $timeout(function(){
							$timeout(function(){
								scope.nav.reset();
							});
						},animations[type].duration || 0);

						return this._promise;
					},

					/**
					 * Shows and animates the nav
					 * @returns {*} Promise object
					 */
					show: function () {
						if (!this.isHidden) {
							return $q.defer().resolve();
						}

						this.isHidden = false;
						return this.animate('show');
					},

					/**
					 * Hides and animates the nav
					 * @returns {*} Promise object
					 */
					hide: function () {
						if (this.isHidden) {
							return $q.defer().resolve();
						}

						this.isHidden = true;
						return this.animate('hide');
					},

					/**
					 * Play sound on hover
					 */
					onHover : function(){
						if (!this.isHidden && !this._animation){
							this.animate('hover');
						}
					},

					/**
					 * Animate on or off
					 * @returns {*} Promise object
					 */
					toggle: function () {
						return this.isHidden ? this.show() : this.hide();
					}

				});


			}
		};
	});
});

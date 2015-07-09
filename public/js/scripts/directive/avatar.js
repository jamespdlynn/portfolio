define(['angularAMD'], function (angularAMD) {

	angularAMD.directive('avatar', function ($timeout, $q, $preloader,$userAgent) {

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

				angular.extend(scope.avatar, {

					initialized : true,

					reset: function () {

						if (this._animation){
							element.removeClass(this._animation);

							var audio = animations[this._animation].audio;
							if (audio && !audio.ended && !$userAgent.isIOS()) {
								audio.pause();
								audio.currentTime = 0;
							}
						}

						delete(this._animation);
						clearTimeout(this._timeout)

						return this;
					},

					animate: function (type) {

						if (!animations.hasOwnProperty(type)){
							console.error('Invalid animation: ' + type);
							return null;
						}

						var deferred = $q.defer();
						this.reset();

						element.addClass(type);

						if (animations[type].audio){
							animations[type].audio.play();
						}

						this._animation = type;
						this._timeout = $timeout(function () {
							scope.avatar.animateRandom();
							deferred.resolve();
						}, animations[type].duration || 0);


						return deferred.promise;
					},

					isWalking: function () {
						return element.hasClass('walk');
					},

					toggle: function () {
						element.toggleClass('left');
						this.isLeft = !this.isLeft;
						return this.animate('walk');
					},

					animateRandom: function () {
						this.reset();
						this._timeout = setTimeout(function () {
							var num = Math.random();
							var type = (num >= 0.3 ? 'blink' : (num >= 0.15 ? 'wave' : 'dance'));
							scope.avatar.animate(type);
						}, 5000);

						return this;
					}

				});


				scope.avatar.animateRandom();

			}
		}
	});
});


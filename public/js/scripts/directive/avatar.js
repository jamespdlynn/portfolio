define(['angularAMD'], function (angularAMD) {

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
			audio: new Audio('/assets/sound/walk.mp3'),
			duration: 2000
		}
	};

	angularAMD.directive('avatar', function () {
		return {
			restrict: 'E',

			link: function (scope, element) {

				angular.extend(scope.avatar, {

					reset: function () {
						var type = this._animation;

						if (type) {

							element.removeClass(type);

							var audio = animations[type].audio;
							if (audio && !audio.ended) {
								audio.pause();
								audio.currentTime = 0;
							}

							delete(this._animation);
						}

						clearTimeout(this._timeout)

						return this;
					},

					animate: function (type, callback) {

						if (animations.hasOwnProperty(type)){

							this.reset();

							element.addClass(type);

							if (animations[type].audio){
								animations[type].audio.play();
							}

							this._animation = type;
							this._timeout = setTimeout(function () {
								scope.avatar.reset().animateRandom();
								if (callback) callback();
							}, animations[type].duration || 0);

						} else {
							console.error('Invalid animation: ' + type);
						}

						return this;
					},

					isLeft: function () {
						return element.hasClass('left');
					},

					isWalking: function () {
						return element.hasClass('walk');
					},

					toggle: function (callback) {
						if (callback) {
							this.animate('walk', callback)
							element.toggleClass('left');
						} else {
							this.reset();
							element.toggleClass('left');
							this.animateRandom();
						}
					},

					animateRandom: function () {
						this._timeout = setTimeout(function () {
							var num = Math.random();
							var type = (num >= 0.3 ? 'blink' : (num >= 0.15 ? 'wave' : 'dance'));
							scope.avatar.animate(type);
						}, 5000);

						return this;
					}

				});

			}
		}
	});
});


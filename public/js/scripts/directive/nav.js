define(['angularAMD'], function (angularAMD) {

	var animations = {

		show: {
			duration: 900,
			audio: new Audio('/assets/sound/bloop.mp3')
		},

		hide: {
			duration: 300,
			audio: new Audio('/assets/sound/swoosh.mp3')
		},

		hover: {
			duration: 100,
			audio: new Audio('/assets/sound/click.mp3')
		}
	};

	angularAMD.directive('nav', function () {
		return {
			restrict: 'E',

			templateUrl : 'templates/nav.html',

			link: function (scope, element) {

				angular.extend(scope.nav, {

					reset: function () {
						var type = this._animation;

						if (type) {
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
							if (animations[type].audio){
								animations[type].audio.play();
							}

							this._animation = type;
							this._timeout = setTimeout(function () {
								scope.nav.reset();
								if (callback) callback();
							}, animations[type].duration || 0);

						} else {
							console.error('Invalid animation: ' + type);
						}

						return this;
					},

					isHidden: function () {
						return element.hasClass('hidden');
					},

					show: function (callback) {
						if (this.isHidden()) {
							element.removeClass('hidden');
							this.animate('show', callback);
						}
						else if (callback) {
							callback();
						}

						return this;
					},

					hide: function (callback) {

						if (!this.isHidden()) {
							element.addClass('hidden');
							this.animate('hide', callback);
						}
						else if (callback) {
							callback();
						}

						return this;
					},

					onHover : function(){
						if (!this.isHidden() && !this._animation){
							this.animate('hover');
						}
					},

					toggle: function (callback) {
						if (this.isHidden()) {
							this.show(callback);
						} else {
							this.hide(callback);
						}

						return this;
					}

				});


			}
		}
	});
});

define(['angularAMD'], function (angularAMD) {


	angularAMD.directive('nav', function ($timeout, $q, $preloader, $userAgent) {

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

			link: function (scope, element) {

				angular.extend(scope.nav, {

					initialized : true,

					reset: function () {
						if (this._animation){
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

						if (animations.hasOwnProperty(type)){

							var deferred = $q.defer();
							this.reset();
							if (animations[type].audio){
								animations[type].audio.play();
							}

							this._animation = type;
							this._timeout = $timeout(function(){
								scope.nav.reset();
								deferred.resolve();
							},animations[type].duration || 0);

							return deferred.promise;

						} else {
							console.error('Invalid animation: ' + type);
							return null;
						}

					},

					show: function () {
						if (this.isHidden) {
							this.isHidden = false;
							return this.animate('show');
						}
						else if (callback) {
							return $q.defer().resolve();
						}
					},

					hide: function () {

						if (!this.isHidden) {
							this.isHidden = true;
							return this.animate('hide');
						}
						else{
							return $q.defer().resolve();
						}

					},

					onHover : function(){
						if (!this.isHidden && !this._animation){
							this.animate('hover');
						}
					},

					toggle: function () {
						return this.isHidden ? this.show() : this.hide();
					}

				});


			}
		}
	});
});

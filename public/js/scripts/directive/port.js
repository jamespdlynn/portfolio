define(['angularAMD', 'mouseWheel'], function (angularAMD) {

	var audio = new Audio('/assets/sound/click.mp3');

	angularAMD.directive('portfolio', function ($timeout) {
		return {
			restrict: 'E',

			link: function (scope, element) {
				$timeout(function(){
					var el = element.find('slick');

					var last = 0;

					el.on('afterChange', audio.play.bind(audio));

					el.mousewheel(function(evt){
						if (evt.timeStamp - last > 500){
							scope.navIndex += evt.deltaY;
							scope.$digest();
							last = evt.timeStamp;
						}
					});


				});
			}
		}
	})

});

define(['angularAMD'], function (angularAMD) {


	angularAMD.directive('mouseWheel', function($parse) {
		return function(scope, element, attr) {
			var fn = $parse(attr['mouseWheel'], null,  true);

			element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {

				// cross-browser wheel delta
				var event = window.event || event; // old IE support
				var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));


				scope.$apply(function(){
					fn(scope, {$event: event, $delta: delta});
				});

				event.returnValue = false;
				if(event.preventDefault) {
					event.preventDefault();
				}
			});
		};
	});

});

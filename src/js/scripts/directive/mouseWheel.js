/*global define*/
/**
 * Directive used for handling mouse wheel events
 * @module directive/file
 * @author James Lynn
 */
define(['angularAMD'], function (angularAMD) {

	'use strict';

	angularAMD.directive('mouseWheel', function($parse) {

		return function(scope, element, attr) {

			var fn = $parse(attr.mouseWheel, null,  true);

			element.bind('DOMMouseScroll mousewheel onmousewheel', function(event) {

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

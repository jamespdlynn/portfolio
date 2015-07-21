/*global define, angular, document*/
/**
 * Application wide directive used for dynamically displaying image or embedded assets within templates
 * @module directive/file
 * @author James Lynn
 */
define(['angularAMD'], function (angularAMD) {
	'use strict';

	angularAMD.directive('file', function ($preloader, $userAgent) {

		return {

			scope: {
				src: '=', //Either the preloader identifier or path to an image file
				data: '=' //Either the preloader identifier or path to an embeded file
			},

			link: function (scope, element) {

				// If src is set append an image tag to the DOM element
				scope.$watch('src', function (value) {

					if (value) {
						//First see if this image exists in the preloader
						var image = $preloader.fetch(value);
						if (!image) {
							image = angular.element(document.createElement('img'));
							image.attr('src', value);
						}

						element.empty().append(image);
					}

				});

				scope.$watch('data', function (value) {
					if (value) {

						var data, object, link;

						//See if data is an identifier for a preloader asset
						data = $preloader.fetch(value) ? $preloader.fetch(value).src : value;

						//Create an html object element used to embed this data
						object = angular.element(document.createElement('object'));

						//Embedding files is jacked on IOS so just use the download link instead
						if (!$userAgent.isIOS()) {
							object.attr('data', data);
						}

						//Create a download link to append to the object element, which will only display if the user's browser doesn't have the associated object plugin
						link = angular.element(document.createElement('a'));
						link.attr('href', data);
						link.attr('class', 'btn btn-primary btn-lg');
						link.text('Download');

						object.append(link);

						element.empty().append(object);
					}

				});
			}
		};

	});

});

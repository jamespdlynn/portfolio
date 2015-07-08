define(['angularAMD'], function (angularAMD) {

	angularAMD.directive('file', function($preloader, $userAgent) {

		return {

			scope : {
				src : "=",
				data : "="
			},

			link : function(scope, element) {

				console.log(scope.type);

				scope.$watch('src', function(value){

					if (!value) return;

					var image = $preloader.fetch(value);
					if (!image){
						image = new Image();
						image.src = value;
					}

					element.empty().append(image);
				});

				scope.$watch('data',function(value){
					if (!value) return;

					var data = $preloader.fetch(value) ? $preloader.fetch(value).src : value;

					var object = angular.element(document.createElement("object"));
					object.attr("data", data);

					if ($userAgent.isIOS() && $userAgent.isSafari()){
						object.css('height','auto');
					}

					var link = angular.element(document.createElement("a"));
					link.attr('href', data);
					link.attr('class', 'btn btn-primary btn-lg');
					link.text('Download');

					object.append(link);
					element.empty().append(object);

				});
			}
		};

	});

});

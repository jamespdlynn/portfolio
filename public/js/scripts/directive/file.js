define(['angularAMD'], function (angularAMD) {

	angularAMD.directive('file', function() {

		return {
			restrict : 'AE',

			scope : {
				src : "="
			},

			link : function(scope, element, attr) {
				scope.$watch('src',function(value){
					var object = angular.element(document.createElement("object"));
					object.attr("data", value);

					var link = angular.element(document.createElement("a"));
					link.attr('href', value);
					link.attr('class', 'btn btn-primary btn-lg');
					link.text('Download');

					object.append(link);
					element.append(object);
				});
			}
		};

	});

});

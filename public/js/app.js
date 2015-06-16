var app = angular.module("app", ['ngRoute']);


app.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/about', {
			state : 'about'
		}).
		when('/portfolio', {
			state : 'portfolio'
		}).
		when('/contact', {
			state : 'contact'
		}).
		otherwise({
			state : ''
		});
}]);

app.controller('MainController', function ($scope, $route, $location) {

	$scope.nav = {

		visible: false,

		items: [
			{key: 'about', path: '#/about', target:'_self'},
			{key: 'portfolio', path: '#/portfolio', target:'_self'},
			{key: 'contact', path: '#/contact', target:'_self'},
			{key: 'resume', path: '/resume.pdf', target:'_blank'}
		],

		toggle: function () {
			return (this.visible = !this.visible);
		}
	};

	$scope.avatar = {
		isLeft :  false,

		onClick : function(){

			if (!this.isLeft){
				$scope.nav.toggle();
			} else{
				$location.url('/');
			}
		}
	}

	$scope.$on('$routeChangeSuccess', function() {
		if ($route.current){

			$scope.nav.visible = false;
			$scope.avatar.isLeft = !!$route.current.state;
			console.log($route.current.state+' '+$scope.avatar.isLeft);
		}
	});

}).directive('jlNav', function () {
	return {
		restrict: 'E',

		scope : true,

		templateUrl : 'templates/nav.html'
	}
}).directive('jlAvatar', function () {

	return {
		restrict: 'E',

		link: function (scope, element) {

			var ANIMATIONS = ['wave', 'blink', 'dance', 'walk', 'turn'];
			var ANIMATION_EVENTS = ['webkitAnimationEnd', 'oanimationend', 'msAnimationEnd', 'animationend'];
			var TRANSITION_EVENTS = ['webkitTransitionEnd', 'otransitionend', 'oTransitionEnd', 'msTransitionEnd', 'transitionend'];

			var reset = function () {
				ANIMATIONS.forEach(function (animation) {
					element.removeClass(animation);
				});
				element.removeClass('flip').removeClass('reverse');
			};

			var animate = function(type, callback){
				type = type.toLowerCase();
				callback = callback || reset;

				if (~ANIMATIONS.indexOf(type)) {
					reset();
					element.addClass(type);
					element.one(ANIMATION_EVENTS.join(' '), callback);
				}
				else {
					console.error(type + ' is not a valid animation');
				}
			}

			var togglePosition = function () {
				reset();

				if(!element.hasClass('left')){
					element.addClass('flip');
				}

				element.addClass('turn');

				element.one(ANIMATION_EVENTS.join(' '), function(){
					element.removeClass('turn');
					element.addClass('walk').toggleClass('left');

					element.one(TRANSITION_EVENTS.join(' '), function(){
						element.removeClass('walk');
						element.addClass('turn reverse');

						element.one(ANIMATION_EVENTS.join(' '),reset);
					});
				});
			};

			setInterval(function(){
				var num = Math.random();
				var type = (num >= 0.25 ? 'blink' : (scope >= 0.125 ? 'wave' : 'dance'));
				if (!element.hasClass('walk') && !element.hasClass('turn')){
					animate(type);

				}
			}, 7000);

			window.avatar = {
				blink : animate.bind(this,'blink'),
				wave : animate.bind(this,'dance'),
				dance : animate.bind(this,'dance')
			};

			scope.$watch('avatar.isLeft', function(value){
				console.log(scope.avatar.isLeft);
				if (scope.avatar.isLeft != element.hasClass('left')){
					togglePosition();
				}
			});

		}
	}
});




angular.module("app", ['ngRoute', 'ngAnimate'])

	.config(function($routeProvider) {
		$routeProvider.
			when('/',{
				state: ''
			}).
			when('/about', {
				state : 'about',
				templateUrl : 'templates/about.html'
			}).
			when('/portfolio', {
				state : 'portfolio',
				templateUrl : 'templates/portfolio.html'
			}).
			when('/contact', {
				state : 'contact',
				templateUrl : 'templates/contact.html'
			}).
			otherwise({
				redirectTo :'/'
			});
	}).

	controller('MainController', ['$scope', function($scope){

		$scope.navItems = [
			{key: 'about', path: '#/about', target:'_self'},
			{key: 'portfolio', path: '#/portfolio', target:'_self'},
			{key: 'contact', path: '#/contact', target:'_self'},
			{key: 'resume', path: '/resume.pdf', target:'_blank'}
		];

		$scope.$on('$routeChangeSuccess', function (event, current) {
			$scope.state = current.state;
		});
	}]).

	directive('main', function () {
		return {
			restrict: 'E',

			templateUrl : 'templates/main.html',

			scope : true,

			link: function (scope, element) {

				var avatar = element.find('avatar');
				angular.extend(avatar, {

					animations : ['blink','wave','dance','walk'],

					reset : function(){
						clearTimeout(avatar.timeout);
						avatar.animations.forEach(function(animation){
							avatar.removeClass(animation);
						});
						avatar.removeClass('auto');
						return this;
					},

					animate : function(type, duration, callback){
						if (typeof duration === 'function'){
							callback = duration;
							duration = null;
						}

						duration = duration || 2000;

						if (~avatar.animations.indexOf(type)){
							avatar.reset().addClass(type);
							avatar.timeout = setTimeout(function(){
								avatar.reset().animateRandom();
								if (callback) callback();
							}, duration);
						}else{
							console.error('Invalid animation: '+type);
						}

						return this;
					},

					isLeft : function(){
						return avatar.hasClass('left');
					},

					isWalking : function(){
						return avatar.hasClass('walk');
					},

					togglePosition : function(auto, callback){

						if (auto){
							avatar.reset().addClass('auto');
						}else{
							avatar.animate('walk', callback);
						}

						avatar.toggleClass('left');

						return this;
					},

					animateRandom : function(){
						avatar.timeout = setTimeout(function(){
							var num = Math.random();
							var type = (num >= 0.25 ? 'blink' : (num >= 0.125 ? 'wave' : 'dance'));
							avatar.animate(type);
						}, 5000);

						return this;
					}

				});

				var nav = element.find('nav');
				angular.extend(nav, {

					reset : function(){
						clearTimeout(nav.timeout);
						return this;
					},

					toggle : function(value, callback) {
						if (value != null) {
							value = !value;

							if (nav.hasClass('hidden') === value){
								if (callback) callback();
								return;
							}
						}

						nav.reset().toggleClass('hidden', value);
						if (callback){
							nav.timeout = setTimeout(callback, 350);
						}

						return this;
					}
				});

				var initialized = false;

				avatar.on('click', function() {
					if (avatar.isWalking()) return;

					if (avatar.isLeft()) {
						location.assign('#/');
					} else {
						nav.toggle();
					}
					initialized = true;
				});


				scope.$watch('state', function(state) {
					if (state == null) return;

					if (!!state != avatar.isLeft()){
						if (!initialized || avatar.isWalking()) {
							avatar.togglePosition(true).animateRandom();
						}
						else {
							nav.toggle(false, function(){
								avatar.togglePosition(false, function () {
									nav.toggle(!avatar.isLeft());
								});
							});
						}
					}
					initialized = true;
				});

				avatar.animateRandom();

			}

		}
	});




angular.module("app", ['ngRoute'])
	.config(function($routeProvider) {


		$routeProvider.
			when('/',{
				state: ''
			}).
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
				redirectTo :'/'
			});
	}).

	run(function($rootScope, $route){
		$rootScope.state = '';

		$rootScope.navItems = [
			{key: 'about', path: '#/about', target:'_self'},
			{key: 'portfolio', path: '#/portfolio', target:'_self'},
			{key: 'contact', path: '#/contact', target:'_self'},
			{key: 'resume', path: '/resume.pdf', target:'_blank'}
		];

		$rootScope.$on('$routeChangeSuccess', function (event, current) {
			$rootScope.state = current.state;
		});
	}).

	directive('main', function () {
		return {
			restrict: 'E',

			templateUrl : 'templates/main.html',

			scope : true,

			link: function (scope, element) {

				var avatar = element.find('avatar');
				var nav = element.find('nav');

				angular.extend(avatar, {

					reset : function(){
						clearTimeout(this.timeout);
						this.removeClass('walk').removeClass('notransition');
						return this;
					},

					isLeft : function(){
						return avatar.hasClass('left');
					},

					isMoving : function(){
						return avatar.hasClass('walk');
					},

					togglePosition : function(callback){

						avatar.reset().addClass('walk').toggleClass('left');
						this.timeout = setTimeout(function(){
							avatar.removeClass('walk').animateRandom();
							if (callback) callback();
						}, 2000);


						return this;
					},

					animateRandom : function(){
						this.timeout = setInterval(function(){
							var num = Math.random();
							var type = (num >= 0.2 ? 'blink' : (num >= 0.1 ? 'wave' : 'dance'));
							avatar.animate(type);
						}, 5000);

						return this;
					}

				});

				angular.extend(nav, {

					reset : function(){
						clearTimeout(this.timeout);
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
							setTimeout(callback, 350);
						}

						return this;
					}
				});


				var interval;
				var restartInterval = function(){
					clearInterval(interval);
					interval = setInterval(avatar.animateRandom, 7000);
				};

				avatar.on('click', function() {
					if (avatar.isMoving()) return;

					if (avatar.isLeft()) {
						location.assign('#/');
					} else {
						nav.toggle();
					}
				});

				var initial = true;
				scope.$watch('state', function(state) {

					if (!!state != avatar.isLeft()){

						if (initial || avatar.isMoving()) {
							avatar.reset().addClass('notransition').toggleClass('left', !!state);
							avatar.animateRandom();
						}
						else {
							nav.toggle(false, function(){
								avatar.togglePosition(function () {
									if (!avatar.isLeft()) {
										nav.toggle(true);
									}
								});
							});
						}
					}

					initial = false;
				});

				avatar.animateRandom();

			}


		}
	});




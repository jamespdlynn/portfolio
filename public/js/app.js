Array.prototype.where = function(obj){
	var filter = this.filter(function(value){
		for (var key in obj){
			if (obj.hasOwnProperty(key)){
				if (value[key] !== obj[key]){
					return false;
				}
			}
		}
		return true;
	});
	return filter.length ? filter[0] : null;
};

angular.module("app", ['ui.router', 'ngAnimate', 'slick'])



	.constant("$States", [
		{
			key : 'home',
			url : '/',
			label : 'Home',
			navEnabled : false
		},

		{
			key : 'about',
			label : 'About Me',
			template : 'templates/about.html',
			navEnabled : true
		},

		{
			key : 'portfolio',
			label : 'Portfolio',
			controller : 'PortfolioController',
			template : 'templates/portfolio.html',
			navEnabled : true,
			abstract : true,
			states : [
				{
					url : '',
					key : 'hyper',
					label : 'Hyper Galactic',
					template : 'templates/portfolio/test.html',
					navEnabled : true
				},

				{
					key : 'chess',
					label : 'Chess Chaps',
					template : 'templates/portfolio/test.html',
					navEnabled : true
				},

				{
					key : 'league',
					label : 'League Champs',
					template : 'templates/portfolio/test.html',
					navEnabled : true
				},

				{
					key : 'oracle',
					label : 'Oracle ROI Calculator',
					template : 'templates/portfolio/test.html',
					navEnabled : true
				},

				{
					key : 'emerson',
					label : 'Emerson IO Calculator',
					template : 'templates/portfolio/test.html',
					navEnabled : true
				},

				{
					key : 'lowes',
					label : 'Lowes Digital Coupons',
					template : 'templates/portfolio/test.html',
					navEnabled : true
				}
			]
		},

		{
			key : 'contact',
			label : 'Contact',
			template : 'templates/contact.html',
			navEnabled : true
		},

		{
			key : 'resume',
			label : 'Resume',
			template : 'templates/resume.html',
			navEnabled : true
		}

	])

	.config(function($stateProvider, $urlRouterProvider, $States) {


		var createStates = function(states, path){
			path = path || '';
			states.forEach(function(state){

				state.name = state.name || path+state.key;
				state.url = state.url || '/'+state.key;
				state.abstract = !!state.abstract;

				$stateProvider.state(state.name, {
					url : state.url,
					controller : state.controller,
					templateUrl : state.template,
					abstract : !!state.abstract
				});

				if (state.states){
					createStates(state.states, state.name+'.')

					if (state.abstract){
						$urlRouterProvider.when(state.url, state.url+state.states[0].url);
					}
				}
			});
		};

		createStates($States);


		$urlRouterProvider.otherwise('/');

	}).

	controller('MainController', function($scope, $state, $States){

		$scope.isLeft = false;

		$scope.navItems = $States.filter(function(value){
			return value.navEnabled;
		});

		$scope.home = $state.go.bind($state, 'home');

		$scope.$on('$stateChangeSuccess', function(event, state){
			$scope.isLeft = !!(state.template || state.templateUrl);
		});

	}).

	directive('main', function () {
		return {
			restrict: 'E',

			templateUrl : 'templates/main.html',

			scope : true,

			link: function (scope, element) {

				var avatar = element.find('avatar');
				angular.extend(avatar, {

					animations : {
						blink : 600,
						wave : 2000,
						dance : 1600,
						walk : 2000
					},

					reset : function(){
						clearTimeout(avatar.timeout);
						for (var key in avatar.animations){
							if (avatar.animations.hasOwnProperty(key)){
								avatar.removeClass(key);
							}
						}
						return this;
					},

					animate : function(type, callback){

						if (avatar.animations.hasOwnProperty(type)){

							avatar.reset().addClass(type);

							avatar.timeout = setTimeout(function(){
								avatar.removeClass(type).animateRandom();
								if (callback) callback();
							}, avatar.animations[type]);

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

					togglePosition : function(animate, callback){
						if (animate){
							avatar.toggleClass('left').animate('walk', callback);
						}else{
							avatar.reset().toggleClass('left').animateRandom();
						}
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

							if (nav.hasClass('hidden') == value){
								if (callback) callback();
								return;
							}
						}

						nav.reset().toggleClass('hidden', value);
						if (callback){
							nav.timeout = setTimeout(callback, 400);
						}

						return this;
					}
				});

				var initialized = false;

				avatar.on('click', function() {
					if (!avatar.isWalking()){
						scope.isLeft ? scope.home() : nav.toggle();
					}
					initialized = true;
				});

				scope.$watch('isLeft', function(value) {
					if (value != avatar.isLeft()){
						if (!initialized || avatar.isWalking()) {
							avatar.togglePosition(false);
						}
						else {
							nav.toggle(false, function(){
								avatar.togglePosition(true, function () {
									nav.toggle(!scope.isLeft);
								});
							});
						}
					}
					//initialized = true;
				});

				avatar.animateRandom();

			}

		}
	}).

	controller('PortfolioController', function($scope, $state, $States) {

		var subStates = $States.where({key:'portfolio'}).states;
		$scope.navItems = subStates.filter(function(value){
			return value.navEnabled;
		});

		$scope.$on('$stateChangeSuccess', function(event, state){
			var item = $scope.navItems.where({name:state.name});
			$scope.navIndex = $scope.navItems.indexOf(item);
		});

		$scope.$watch('navIndex',function(value) {
			$state.go('^.'+$scope.navItems[value].key);
		});
	});
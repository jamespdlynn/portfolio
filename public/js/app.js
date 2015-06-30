Array.prototype.find = function(match){
	var i = this.length;
	loop1 : while (i--){
		var obj = this[i];
		for (var key in match){
			if (match.hasOwnProperty(key) && obj[key] !== match[key]){
				continue loop1;
			}
		}
		return obj;
	}
	return null;
};

angular.module("app", ['ngAnimate', 'ui.router', 'slick'])

	.constant("$States", [
		{
			key : 'home',
			url : '/',
			label : 'Home',
			navDisabled : true
		},

		{
			key : 'about',
			label : 'About Me',
			template : 'templates/about.html'
		},

		{
			key : 'portfolio',
			label : 'Portfolio',
			controller : 'PortfolioController',
			template : 'templates/portfolio.html',
			abstract : true,
			states : [
				{
					url : '',
					key : 'hyper-galactic',
					label : 'Hyper Galactic',
					template : 'templates/portfolio/hyper-galactic.html'
				},

				{
					key : 'chess-chaps',
					label : 'Chess Chaps',
					template : 'templates/portfolio/chess-chaps.html'
				},

				{
					key : 'league-champs',
					label : 'League Champs',
					template : 'templates/portfolio/league-champs.html'
				},

				{
					key : 'inmar-digital-coupons',
					label : 'Inmar Digital Coupons',
					template : 'templates/portfolio/inmar-digital-coupons.html'
				},

				{
					key : 'emerson-io',
					label : 'Emerson IO Calculator',
					template : 'templates/portfolio/emerson-io.html'
				},

				{
					key : 'oracle-roi-calculator',
					label : 'Oracle ROI Calculator',
					template : 'templates/portfolio/oracle-roi-calculator.html'
				}

			]
		},

		{
			key : 'contact',
			label : 'Contact',
			template : 'templates/contact.html'
		},

		{
			key : 'resume',
			label : 'Resume',
			template : 'templates/resume.html'
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

		$scope.navItems = $States.filter(function(value){
			return !value.navDisabled;
		});

		$scope.isLeft = false;

		$scope.go = function(state){
			state = state || '';
			window.location = '/#/'+state;
		}

		$scope.$on('$stateChangeSuccess', function(event, state){
			$scope.isLeft = !!(state.template || state.templateUrl);
		});

	}).

	directive('main', function ($timeout) {
		return {
			restrict: 'E',

			templateUrl : 'templates/main.html',

			scope : true,

			link: function (scope, element) {

				$timeout(function(){
					var avatar = element.find('avatar');
					angular.extend(avatar, {

						animations : [
							{
								key : 'blink',
								duration : 600
							},

							{
								key : 'wave',
								duration : 2000
							},

							{
								key : 'dance',
								duration : 1600
							},

							{
								key : 'walk',
								sound : new Audio('/assets/sound/walk.ogg'),
								duration : 2000
							}
						],

						reset : function(){
							var animation = this.animation;
							if (animation){

								this.removeClass(animation.key);

								if (animation.sound && !animation.sound.ended){
									animation.sound.pause();
									animation.sound.currentTime = 0;
								}


								delete(this.animation);
							}

							clearTimeout(this.timeout)
							return this;
						},

						animate : function(type, callback){

							avatar.reset();
							avatar.animation = avatar.animations.find({key:type});

							if (avatar.animation){
								avatar.addClass(type);
								if (avatar.animation.sound) avatar.animation.sound.play();
								avatar.timeout = setTimeout(function(){
									avatar.reset().animateRandom();
									if (callback) callback();
								}, avatar.animation.duration || 0);

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

						toggle : function(callback){
							if (callback){
								avatar.animate('walk', callback).toggleClass('left');
							}else{
								avatar.reset().toggleClass('left').animateRandom();
							}
						},

						animateRandom : function(){
							avatar.timeout = setTimeout(function(){
								var num = Math.random();
								var type = (num >= 0.3 ? 'blink' : (num >= 0.15 ? 'wave' : 'dance'));
								avatar.animate(type);
							}, 5000);

							return this;
						}

					});

					var nav = element.find('nav');
					angular.extend(nav, {

						animations : [
							{
								key : 'show',
								duration : 900,
								sound : new Audio('/assets/sound/bloop.ogg')
							},

							{
								key : 'hide',
								duration : 300,
								sound : new Audio('/assets/sound/swoosh.ogg')
							}
						],

						reset : avatar.reset.bind(nav),


						isHidden : function(){
							return nav.hasClass('hidden');
						},

						show : function(callback){
							nav.reset()

							if (nav.isHidden()){

								nav.removeClass('hidden');

								nav.animation = nav.animations.find({key:'show'});
								nav.animation.sound.play();
								nav.animation.timeout = setTimeout(function(){
									nav.reset();
									if (callback) callback();
								}, nav.animation.duration);
							}
							else if (callback){
								callback();
							}
						},

						hide : function(callback){
							nav.reset();

							if (!nav.isHidden()){

								nav.addClass('hidden');

								nav.animation = nav.animations.find({key:'hide'});
								nav.animation.sound.play();
								nav.timeout = setTimeout(function(){
									nav.reset();
									if (callback) callback();
								}, nav.animation.duration);
							}
							else if (callback){
								callback();
							}
						},

						toggle : function(callback){
							if (nav.hasClass('hidden')){
								nav.show(callback);
							}else{
								nav.hide(callback);
							}
						}

					});

					avatar.click(function() {
						if (avatar.isWalking()) return;
						if (scope.isLeft){
							avatar.toggle(function(){
								nav.show();
							});
							scope.go();
						}else{
							nav.toggle();
						}
					});

					var hoverSound =  new Audio('/assets/sound/click.mp3')
					nav.children('.nav-item').
						mouseenter(function(){
							if (nav.isHidden() || nav.animation) return;
							hoverSound.currentTime = 0;
							hoverSound.play();
						}).
						click(function(evt){
							if (nav.isHidden() || nav.animation) return;
							var state = $(evt.currentTarget).attr('data-id');
							nav.hide(function(){
								avatar.toggle(function(){
									scope.go(state);
								});
							});
						});


					scope.$watch('isLeft', function(value) {
						if (avatar.isLeft() !== value){
							avatar.toggle();
						}
					});


					avatar.animateRandom();
				})

			}

		}
	}).

	controller('PortfolioController', function($scope, $state, $States) {

		var subStates = $States.find({key:'portfolio'}).states;
		$scope.navItems = subStates.filter(function(value){
			return !value.navDisabled;
		});

		$scope.$on('$stateChangeSuccess', function(event, state){
			var item = $scope.navItems.find({name:state.name});
			$scope.navIndex = $scope.navItems.indexOf(item);
		});

		$scope.$watch('navIndex',function(value) {
			value = Math.abs(value%$scope.navItems.length);
			$state.go('^.'+$scope.navItems[value].key);
		});
	}).

	directive('portfolio', function ($timeout) {
		return {
			restrict: 'E',

			link: function (scope, element) {
				$timeout(function(){
					var el = element.find('slick');
					var sound = new Audio('/assets/sound/click.mp3');
					var last = 0;

					el.on('afterChange', sound.play.bind(sound));

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
	});
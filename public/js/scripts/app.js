define(['angularAMD', 'angularAnimate', 'angularUIRouter', 'angularSlick', 'controller/main'], function (angularAMD) {

	var app = angular.module("app", ['ngAnimate', 'ui.router', 'slick'])

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
			controller : 'ContactController',
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
					abstract : !!state.abstract,
					resolve : {
						loadController: function ($q) {
							var deferred = $q.defer();
							require([state.controller], deferred.resolve);
							return deferred.promise;
						}
					}
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

	});


	return angularAMD.bootstrap(app);
});
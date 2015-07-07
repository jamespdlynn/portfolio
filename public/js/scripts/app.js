define(['angularAMD', 'config/states','angularAnimate', 'angularUIRouter', 'angularSlick', 'factory/preloader', 'controller/main'], function (angularAMD, states) {

	var app = angular.module("app", ['ngAnimate', 'ui.router', 'slick']);

	app.constant("$states", states);

	app.config(function($stateProvider, $urlRouterProvider, $states) {

		var createStates = function(states, path){
			path = path || '';
			states.forEach(function(state){

				state.name = state.name || path+state.id;
				state.url = state.url || '/'+state.id;
				state.abstract = !!state.abstract;
				state.require  = state.require || [undefined];

				if (state.template && !state.templateUrl){
					state.templateUrl = 'templates/'+path.replace('.','/') +state.template;
				}

				$stateProvider.state(state.name, {
					url : state.url,
					controller : state.controller,
					templateUrl : state.templateUrl,
					abstract : !!state.abstract,
					resolve : {

						preload : function($preloader){
							return $preloader.load(state.id);
						},

						dependencies: function ($q) {
							var deferred = $q.defer();
							require(state.require, deferred.resolve);
							return deferred.promise;
						}
					},

					onExit : function($preloader){
						$preloader.unload(state.id);
					}
				});

				if (state.default){
					$urlRouterProvider.otherwise('/');
				}

				if (state.states){
					createStates(state.states, state.name+'.')

					if (state.abstract){
						$urlRouterProvider.when(state.url, state.url+state.states[0].url);
					}
				}
			});
		};

		createStates($states);

	});

	app.run(function($rootScope, $preloader) {
		$rootScope.audio = {
			play : function(id){
				$preloader.fetch(id).play();
			},
			pause : function(id){
				$preloader.fetch(id).play();
			}
		};
	});


	return angularAMD.bootstrap(app);
});
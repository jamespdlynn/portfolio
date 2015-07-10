/*global define, angular*/
/**
 * Top level angular application
 * @module app
 * @author James Lynn
 */
define(['angularAMD','config/states','service/preloader','service/userAgent','controller/main','angularAnimate','angularUIRouter'], function (angularAMD, $states) {

	'use strict';
	var app = angular.module("app", ['ngAnimate', 'ui.router']);

	//Save state configuration data to angular constant that can pulled in as a dependency
	app.constant("$states", $states);

	app.config(function($stateProvider, $urlRouterProvider, $states) {

		//Recursive function defining an array of states within the UI router
		var createStates = function(states,  path){
			path = path || '';
			states.forEach(function(state){

				//State defaults
				state.name = state.name || path+state.id;
				state.url = state.url || '/'+state.id;
				state.abstract = !!state.abstract;
				state.require  = state.require || [undefined];
				state.navEnabled = state.navEnabled==null ? true : !!state.navEnabled;

				//Dynamically set the template URL path
				if (state.template && !state.templateUrl){
					state.templateUrl = 'templates/'+path.replace('.','/') +state.template;
				}

				//Actually register the state within the provider
				$stateProvider.state(state.name, {
					url : state.url,
					controller : state.controller,
					templateUrl : state.templateUrl,
					abstract : !!state.abstract,
					resolve : {
						//Before the state resolves preload all associated modules and assets
						preload : function($preloader){
							return $preloader.load(state.id);
						}
					},

					//When state exits unload media assets from memory
					onExit : function($preloader){
						$preloader.unload(state.id);
					}
				});

				if (state.isDefault){
					$urlRouterProvider.otherwise('/');
				}

				if (state.states){
					//If state has a substate array then recursively call this function again
					createStates(state.states, state.name+'.');

					//If state is abstract (not directly accessible) then reroute its url requests to its first child state
					if (state.abstract){
						$urlRouterProvider.when(state.url, state.url+state.states[0].url);
					}
				}
			});
		};

		createStates($states);
	});

	app.run(function($rootScope, $preloader){

		//Attach some helper functions to the root scope to allow templates to manipulate preloaded audio files
		$rootScope.audio = {
			play : function(id){
				$preloader.fetch(id).play();
			},
			pause : function(id){
				$preloader.fetch(id).play();
			}
		};

		$rootScope.initialized = false;

		//Wait for main assets to load and the initial state to initialize before allowing user interaction with the app
		var promise = $preloader.load('main');
		$rootScope.$on('$stateChangeSuccess', function(){
			promise.then(function(){
				$rootScope.initialized = true;
			});
		});
	});

	return angularAMD.bootstrap(app);

});

/**
 * Globally accessible array helper function for quickly finding an object by its property(ies)
 * @param match {object} Object containing key/value pairs to match off of
 * @returns {object} First object in array found that matches all key/value pairs passed in
 */
Array.prototype.find = function(match){
	'use strict';
	var obj, key, i = this.length;
	loop1 : while (i--){
		obj = this[i];
		for (key in match){
			if (match.hasOwnProperty(key) && obj[key] !== match[key]){
				continue loop1;
			}
		}
		return obj;
	}
	return null; //No matches found
};

/*global, define, angular*/
/**
 * App Test File
 * Should be run before all other tests to ensure AngularAMD is bootstrapped
 * @author James Lynn
 */
define(['angularAMD', 'config/states', 'service/preloader', 'controller/main', 'angularAnimate', 'angularUIRouter'], function (angularAMD, states) {

	'use strict';

	var app = angular.module('app', ['ngAnimate', 'ui.router']);

	//Save state configuration data to angular constant that can pulled in as a dependency
	app.constant('$states', states);

	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $states) {

		//! prefix needed for google crawler
		$locationProvider.hashPrefix('!');

		//Recursive function defining an array of states within the UI router
		var createStates = function (states, path) {
			path = path || '';
			states.forEach(function (state) {

				//State defaults
				state.name = state.name || path + state.id;
				state.url = state.url || '/' + state.id;
				state.abstract = !!state.abstract;
				state.require = state.require || [undefined];
				state.navEnabled = state.navEnabled === undefined ? true : !!state.navEnabled;

				//Actually register the state within the provider
				$stateProvider.state(state.name, {
					url: state.url,
					controller: state.controller,
					templateUrl: state.templateUrl,
					abstract: state.abstract,
					data: {navEnabled: state.navEnabled},

					//Before the state resolves preload all associated modules and assets
					resolve: {
						preload: function ($q, $preloader) {
							var deferred = $q.defer();
							$preloader.load(state.id).finally(deferred.resolve);
							return deferred.promise;
						}
					},

					//When state exits unload media assets from memory
					onExit: function ($preloader) {
						$preloader.unload(state.id);
					}
				});

				if (state.isDefault) {
					$urlRouterProvider.otherwise(state.url);
				}

				if (state.states) {
					//If state has a substate array then recursively call this function again with the updated path variable
					createStates(state.states, state.name + '.');

					//If state is abstract (not directly accessible) then reroute its url requests to its first child state
					if (state.abstract) {
						$urlRouterProvider.when(state.url, state.url + state.states[0].url);
					}
				}
			});
		};

		createStates($states);
	});

	app.run(function ($rootScope, $preloader) {

		//Wait for main assets to load and the initial state to initialize before allowing user interaction with the app
		$rootScope.initialized = false;

		var promise = $preloader.load('main');
		$rootScope.$on('$stateChangeSuccess', function () {
			promise.finally(function () {
				$rootScope.initialized = true;
			});
		});
	});

	return angularAMD.bootstrap(app);

});

/**
 * Globally accessible array helper function for quickly finding an object by its property(ies)
 * @global
 * @param match {object} Object containing key/value pairs to match off of
 * @returns {object} First object in array found that matches all key/value pairs passed in
 */
/* jshint ignore:start */
Array.prototype.find = function (match) {
	'use strict';
	var obj, key, i = this.length;
	loop1 : while (i--) {
		obj = this[i];
		for (key in match) {
			if (match.hasOwnProperty(key) && obj[key] !== match[key]) {
				continue loop1;
			}
		}
		return obj;
	}
	return null; //No matches found
};
/* jshint ignore:end */
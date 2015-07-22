/*global define, window*/
/**
 * Main Avatar/Nav Controller
 * @module controller/main
 * @author James Lynn
 */
define(['angularAMD', 'directive/avatar', 'directive/nav'], function (angularAMD) {
	'use strict';

	angularAMD.controller('MainController', function ($scope, $state) {

		//Below are inheritable functions that can be used by any of this controller's child directives

		$scope.isHome = function () {
			return !$state.current.name || $state.current.name === 'home';
		};

		$scope.goHome = function () {
			$state.go('home');
		};

		$scope.goToState = function (state) {
			//Have to manually modify the windows url in order to transition to abstract states
			window.location = $state.href(state.name);
		};

		//These helper functions allow events to be broadcast and received on this hierarchical level of the scope chain
		$scope.on = $scope.$on.bind($scope);

		$scope.emit = $scope.$emit.bind($scope);

		/**
		 * Hardcoded event types
		 * @enum {string}
		 * @readonly
		 */
		$scope.Events = {
			STATE_CHANGE: '$stateChangeSuccess',
			AVATAR_TOGGLE: '$avatarToggle',
			NAV_TOGGLE: '$navToggle'
		};

	});
});
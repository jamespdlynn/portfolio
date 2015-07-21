/*global define*/
/**
 * Controller for the Portfolio State
 * @module controller/portfolio
 * @author James Lynn
 */
//Dynamically bootstrap the angular slick module used for this state's navigation
define(['angularAMD', 'angularSlick', 'service/preloader', 'directive/mouseWheel', 'directive/file'], function (angularAMD) {
	'use strict';

	angularAMD.controller('PortfolioController', function ($scope, $state, $states, $preloader) {

		var subStates = $states.find({id: 'portfolio'}).states;

		angular.extend($scope, {

			//Get the list of substates for the nav to display from the $states constant
			items: subStates.filter(function (item) {
				return item.navEnabled;
			}),

			index: 0, //current slick nav index

			lastScroll: 0, //Timestamp of last mouse wheel scroll event

			/**
			 * Update the nav index on mouse wheel scroll
			 * @param delta {number} scroll direction/amount
			 * @param timeStamp {number} self explanatory
			 */
			onScroll: function (delta, timeStamp) {
				//Make sure scroll events don't fire faster than the animation time otherwise weird stuff will happen
				if (timeStamp - this.lastScroll > 500) {
					$scope.index += delta;
					$scope.lastScroll = timeStamp;
				}
			},

			onChange: function () {
				$preloader.play('click');
			}
		});

		var getNavIndex = function () {
			var item = $scope.items.find({name: $state.current.name});
			$scope.index = item ? $scope.items.indexOf(item) : 0;
		};

		getNavIndex();

		// When the U.I router fires a change event, manually update the nav index to that of the new state
		$scope.$on('$stateChangeSuccess', getNavIndex);

		//When the nav index changes (through bidirectional binding or otherwise) tell the U.I router to navigate to the associated state
		$scope.$watch('index', function (value) {
			value = Math.abs(value % $scope.items.length);
			$state.go('^.' + $scope.items[value].id);
		});

	});

});
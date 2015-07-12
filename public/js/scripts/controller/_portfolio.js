/*global define, window*/
/**
 * Controller for the Portfolio State
 * @module controller/portfolio
 * @author James Lynn
 */
//Dynamically bootstrap the angular slick module used for this state's navigation
define(['angularAMD', 'ngload!angularSlick', 'directive/mouseWheel'], function (angularAMD) {
	'use strict';

	angularAMD.controller('PortfolioController', function($scope, $state, $states) {

		var subStates = $states.find({id:'portfolio'}).states;

		$scope.nav = {

			//Get the list of substates for the nav to display from the $states constant
			items : subStates.filter(function(item){
				return item.navEnabled;
			}),

			index : 0, //current slick nav index

			lastScroll : 0, //Timestamp of last mouse wheel scroll event

			/**
			 * Update the nav index on mouse wheel scroll
			 * @param delta {number} scroll direction/amount
			 * @param timeStamp {number} self explanatory
			 */
			onScroll : function(delta, timeStamp){
				//Make sure scroll events don't fire faster than the animation time otherwise weird stuff will happen
				if (timeStamp  - this.lastScroll > 500){
					$scope.nav.index += delta;
					$scope.nav.lastScroll = timeStamp;
				}
			}
		};

		//When the nav index changes (through bidirectional binding or otherwise) tell the U.I router to navigate to the associated state
		$scope.$watch('nav.index',function(value) {
			value = Math.abs(value%$scope.nav.items.length);
			$state.go('^.'+$scope.nav.items[value].id);
		});

		// When the U.I router fires a change event, manually update the nav index to that of the new state
		$scope.$on('$stateChangeSuccess', function(){
			var item = $scope.nav.items.find({name:$state.current.name});
			$scope.nav.index = $scope.nav.items.indexOf(item);
		});

	});
});
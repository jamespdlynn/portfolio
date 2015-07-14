/*global define*/
/**
 * Controller for the Contact Form
 * @module controller/contact
 * @author James Lynn
 */
define(['angularAMD', 'directive/secret', 'directive/file'], function (angularAMD) {
	'use strict';

	/**@readdonly *@enum {number} */
	var states =  {
		DEFAULT : 0,
		LOADING : 1,
		SUCCESS : 2,
		ERROR : 3
	};

	angularAMD.controller('ContactController', function($scope, $http, $preloader) {

		//Initialize scope variables
		$scope.states = states;
		$scope.currentState = states.DEFAULT;

		/**
		 * On form submit
		 * @param data Form json data
		 */
		$scope.submit = function(data){

			$scope.currentState = states.LOADING;

			$http.post('/mail', data).

				success(function(){
					$scope.currentState = states.SUCCESS;
					$preloader.fetch('mail').play();
				}).

				error(function(){
					$scope.currentState = states.ERROR;
				});
		};
	});
});
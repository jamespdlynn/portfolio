/*global define, describe, it, expect, beforeEach, beforeAll, afterEach*/
 /**
 * Portfolio Controller Tests
 * @author James Lynn
 */
define(['app', 'angularAMD'], function (app, angularAMD) {
	'use strict';

	describe('portfolio.js', function () {
		console.log('### Running portfolio.spec.js: ');

		var scope, ctrl, state;

		//Load controller module using the preloader
		beforeAll(function(done){
			angularAMD.inject(function($preloader){
				$preloader.load('portfolio').then(done);
			});
		});

		beforeEach(function (){
			angularAMD.inject(function($rootScope, $controller, $state){
				scope = $rootScope.$new();
				ctrl = $controller('PortfolioController', {
					$scope : scope
				});
				state = $state;
				state.current = state.get('portfolio');
			});
		});

		afterEach(function(){
			scope.$destroy();
		});

		it('controller is defined', function () {
			expect(ctrl).toBeDefined();
		});

		it('default scope values', function () {
			expect(scope.items).toBeDefined();
			expect(scope.items.length).toBeGreaterThan(0);
			expect(scope.index).toBe(0);
		});

		it('nav index change', function () {
			scope.items.forEach(function(item, index){
				state.current = item;
				scope.$broadcast('$stateChangeSuccess');
				expect(scope.index).toBe(index);
			});
		});

	});
});
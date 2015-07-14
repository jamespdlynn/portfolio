/*global define, describe, it, expect, beforeEach, afterEach*/
define(['app', 'angularAMD', 'controller/main'], function (app, angularAMD) {
	'use strict';

	describe('main.js', function () {
		console.log('### Running main.spec.js: ');

		var scope, ctrl, state;

		beforeEach(function (){
			angularAMD.inject(function($rootScope, $controller, $state){
				scope = $rootScope.$new();
				ctrl = $controller('MainController', {
					$scope : scope
				});
				state = $state;
				state.current = state.get('home');
			});
		});

		afterEach(function(){
			scope.$destroy();
		});

		it('is defined', function () {
			expect(ctrl).toBeDefined();
		});

		it('default scope values', function () {
			expect(scope.avatar).toBeDefined();
			expect(scope.avatar.isLeft).toBe(false);
			expect(scope.nav).toBeDefined();
			expect(scope.nav.isHidden).toBe(true);
			expect(scope.nav.items).toBeDefined();
			expect(scope.nav.items.length).toBeGreaterThan(0);
		});

		it('avatar moves left', function () {
			scope.avatar.isLeft = false;
			state.current = state.get('about');
			scope.$broadcast('$stateChangeSuccess');
			expect(scope.avatar.isLeft).toBe(true);
		});

		it('avatar moves right', function () {
			scope.avatar.isLeft = true;
			state.current = state.get('home');
			scope.$broadcast('$stateChangeSuccess');
			expect(scope.avatar.isLeft).toBe(false);
		});

	});
});
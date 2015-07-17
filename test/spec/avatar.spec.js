/*global define, describe, it, expect, beforeEach, afterEach, spyOn, beforeAll*/
/**
 * Avatar Directive Tests
 * @author James Lynn
 */
define(['app', 'angularAMD', 'controller/main'], function (app, angularAMD) {
	'use strict';

	describe('avatar.js', function () {
		console.log('### Running avatar.spec.js: ');

		var scope, childScope, state;

		beforeAll(function(done){
			angularAMD.inject(function($preloader){
				$preloader.load('main').then(done);
			});
		});

		beforeEach(function (){
			angularAMD.inject(function($rootScope, $controller, $compile, $state){
				scope = $rootScope.$new();
				$controller('MainController', {$scope : scope});

				var element = angular.element('<avatar></avatar>');
				$compile(element)(scope);
				childScope = element.scope();

				state = $state;
				state.current = $state.get('home');
			});
		});

		afterEach(function(){
			scope.$destroy();
			childScope.$destroy();
		});

		it('scopes are defined', function () {
			expect(scope).toBeDefined();
			expect(childScope).toBeDefined();
		});

		it('inherited scope values', function () {
			expect(childScope.Events).toBeDefined();
		});

		it('default scope values', function () {
			expect(childScope.animation).toBe('');
			expect(childScope.isLeft).toBe(false);
		});

		it('toggle nav event fires', function (done) {
			childScope.on(scope.Events.NAV_TOGGLE, done);
			childScope.onClick();
		});

		it('animates left on event', function () {

			childScope.emit(childScope.Events.AVATAR_TOGGLE, state.get('about'));

			expect(childScope.isLeft).toBe(true);
			expect(childScope.isWalking()).toBe(true);
		});

		it('animates right on click', function () {
			spyOn(scope, 'goHome');

			childScope.isLeft = true;
			childScope.onClick();

			expect(childScope.isLeft).toBe(false);
			expect(childScope.isWalking()).toBe(true);
			expect(scope.goHome).toHaveBeenCalled();
		});

		it('force left on state change', function () {
			childScope.isLeft = false;
			state.current = state.get('about');
			scope.$emit(scope.Events.STATE_CHANGE);

			expect(childScope.isLeft).toBe(true);
			expect(childScope.isWalking()).toBe(false);
		});

		it('force right on state change', function () {
			childScope.isLeft = false;
			childScope.toggle(); //toggle to start walking right

			state.current = state.get('home');
			scope.$emit(scope.Events.STATE_CHANGE);

			expect(childScope.isLeft).toBe(false);
			expect(childScope.isWalking()).toBe(false);	 //ensure walk animation also reset

		});



	});


});
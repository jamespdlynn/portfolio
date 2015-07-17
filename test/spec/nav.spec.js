/*global define, describe, it, expect, beforeEach, afterEach, beforeAll*/
/**
 * Avatar Directive Tests
 * @author James Lynn
 */
define(['app', 'angularAMD', 'controller/main'], function (app, angularAMD) {
	'use strict';

	describe('nav.js', function () {
		console.log('### Running nav.spec.js: ');

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

				var element = angular.element('<nav></nav>');
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
			expect(childScope.items).toBeDefined();
			expect(childScope.items.length).toBeGreaterThan(0);
			expect(childScope.isHidden).toBe(true);
		});

		it('isHidden toggles on event', function () {
			childScope.emit(childScope.Events.NAV_TOGGLE);
			expect(childScope.isHidden).toBe(false);

			childScope.emit(childScope.Events.NAV_TOGGLE);
			expect(childScope.isHidden).toBe(true);
		});

		it('toggle avatar event fires on click', function (done) {

			childScope.isHidden = false;
			childScope.onClick(state.get('about'));

			childScope.on(childScope.Events.AVATAR_TOGGLE, function(event, value){
				expect(value).toBe(state.get('about'));
				expect(childScope.isHidden).toBe(true);
				done();
			});
		});

		it('force hidden on state change', function () {

			childScope.isHidden = false;

			state.current = state.get('home');
			scope.$emit(scope.Events.STATE_CHANGE);

			expect(childScope.isHidden).toBe(true);
		});

	});


});
/*global define, describe, it, expect, beforeEach, beforeAll, afterEach, spyOn*/
/**
 * Contact Controller Tests
 * @author James Lynn
 */
define(['app', 'angularAMD'], function (app, angularAMD) {
	'use strict';

	describe('contact.js', function () {
		console.log('### Running contact.spec.js: ');

		var scope, ctrl, httpDeferred;

		//Load controller module through the preloader
		beforeAll(function(done){
			angularAMD.inject(function($preloader){
				$preloader.load('contact').then(done);
			});
		});

		beforeEach(function (){
			angularAMD.inject(function($rootScope, $controller, $http, $q){
				scope = $rootScope.$new();
				ctrl = $controller('ContactController', {
					$scope : scope
				});

				//Unfortunately AngularAMD does not play well with Angular Mocks so I don't get access to mock injections like the $httpBackend
				//Instead I'm overriding the $http services post return value, so I can manually resolve or reject its associated promise
				httpDeferred = $q.defer();
				var promise = httpDeferred.promise;
				promise.success = function(fn){
					promise.then(fn);
					return promise;
				};
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				};
				spyOn($http, 'post').and.returnValue(promise);
			});
		});

		afterEach(function(){
			scope.$destroy();
		});

		it('controller is defined', function () {
			expect(ctrl).toBeDefined();
		});

		it('default scope values', function () {
			expect(scope.states).toBeDefined();
			expect(scope.currentState).toBe(scope.states.DEFAULT);
		});

		it('load state', function () {
			scope.submit({});
			expect(scope.currentState).toBe(scope.states.LOADING);
		});

		it('success state', function (done) {
			scope.submit({});

			httpDeferred.promise.finally(function(){
				expect(scope.currentState).toBe(scope.states.SUCCESS);
				done();
			});
			httpDeferred.resolve();
		});

		it('error state', function (done) {
			scope.submit({});

			httpDeferred.promise.finally(function(){
				expect(scope.currentState).toBe(scope.states.ERROR);
				done();
			});
			httpDeferred.reject();
		});

	});
});
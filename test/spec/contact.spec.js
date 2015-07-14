/*global define, describe, it, expect, beforeEach, beforeAll, afterEach*/
define(['app', 'angularAMD'], function (app, angularAMD) {
	'use strict';

	describe('contact.js', function () {
		console.log('### Running contact.spec.js: ');

		var scope, ctrl, deferred;

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

				deferred = $q.defer();
				$http.post = function(){
					var promise = deferred.promise;
					promise.success = function(fn){
						promise.then(fn);
						return promise;
					};
					promise.error = function(fn){
						promise.then(null, fn);
						return promise;
					};
					return promise;
				};

			});
		});

		it('is defined', function () {
			expect(ctrl).toBeDefined();
		});

		it('default scope values', function () {
			expect(scope.states).toBeDefined();
			expect(scope.currentState).toBe(scope.states.DEFAULT);
		});

		it('validate success', function (done) {
			scope.submit({});
			expect(scope.currentState).toBe(scope.states.LOADING);
			deferred.resolve();
			setTimeout(function(){
				expect(scope.currentState).toBe(scope.states.SUCCESS);
				done();
			}, 0);
		});

		it('validate error', function (done) {
			scope.submit({});
			expect(scope.currentState).toBe(scope.states.LOADING);
			deferred.reject();
			setTimeout(function(){
				expect(scope.currentState).toBe(scope.states.ERROR);
				done();
			}, 0);
		});



	});
});
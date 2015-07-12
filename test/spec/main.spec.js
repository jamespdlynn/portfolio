/*global define, describe, it, expect*/
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
			});
		});


		it('is defined', function () {
			expect(ctrl).toBeDefined();

		});

		it('default scope values', function () {
			expect(scope.avatar).toBeDefined();
			expect(scope.avatar.isLeft).toBe(false);
			expect(scope.nav).toBeDefined();
			expect(scope.nav.isHidden).toBe(true);
		});

		it('avatar to left', function (done) {
			expect(ctrl).toBeDefined();

			scope.$watch('avatar.isLeft', function(value){
				if (value){
					done();
				}
			});

			state.go('contact');
		});

	});
});
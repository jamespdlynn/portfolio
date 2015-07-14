/*global define, describe, it, expect*/
define(['app', 'angularAMD', 'config/preload','service/preloader'], function (app, angularAMD, preload) {
	'use strict';

	/*describe('preloader.js', function () {
		console.log('### Running preloader.spec.js: ');

		var preloader, groups = [];

		//Get list of groups from preloader config
		preload.forEach(function(asset){
			if (asset.group && groups.indexOf(asset.group) === -1){
				groups.push(asset.group);
			}
		});

		beforeEach(function (){
			angularAMD.inject(function($preloader){
				preloader = $preloader;
				preloader.unload();
			});
		});


		it('is defined', function () {
			expect(preloader).toBeDefined();
		});

		//Test loading for each group
		groups.forEach(function(group){
			it('load '+group, function (done) {

				var numAssets = preload.filter(function(asset){
					return asset.group === group;
				}).length;

				preloader.load(group).then(function(){
					expect(Object.keys(preloader.assets).length).toBe(numAssets);
					done();
				});
			});
		});

		it('reload', function (done) {

			preloader.load(groups[0]).then(function(){

				//Reload should be instananeous
				var timeout = setTimeout(function(){
					throw new Error('Reload time limit reached');
				}, 0);

				preloader.load(groups[0]).then(function(){
					clearTimeout(timeout);
					done();
				});

			});
		});

		it('unload', function (done) {
			var numAssets = preload.filter(function(asset){
				return asset.group === groups[0];
			}).length;

			//Load first and second groups
			preloader.load([groups[0], groups[1]]).then(function(){

				//Unload second groups
				preloader.unload(groups[1]);

				//Make sure that the only group 1 assets remain
				expect(Object.keys(preloader.assets).length).toBe(numAssets);

				done();

			});
		});


	});*/
});
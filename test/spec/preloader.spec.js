/*global define, describe, it, expect, beforeEach, afterEach*/
/**
 * Preloader Service Tests
 * @author James Lynn
 */
define(['app', 'angularAMD', 'config/preload','service/preloader'], function (app, angularAMD, config) {
	'use strict';

	describe('preloader.js', function () {
		console.log('### Running preloader.spec.js: ');

		var preloader, groups = [];

		//Get list of group names from preload config array
		config.forEach(function(asset){
			if (asset.group && groups.indexOf(asset.group) === -1){
				groups.push(asset.group);
			}
		});

		beforeEach(function (){
			angularAMD.inject(function($preloader){
				preloader = $preloader;
			});
		});

		afterEach(function(){
			preloader.unload();
		});


		it('preloader is defined', function () {
			expect(preloader).toBeDefined();
		});

		//Test all assets load from server correctly for every configuration group
		groups.forEach(function(group){
			it('load '+group, function (done) {

				//Number of assets that should be accessible after load
				var numAssets = config.filter(function(asset){
					return asset.group === group;
				}).length;

				var loadSuccess = false;
				preloader.load(group).then(function(){
					loadSuccess = true;
				}).finally(function(){
					expect(loadSuccess).toBe(true);
					expect(Object.keys(preloader.assets).length).toBe(numAssets);
					done();
				});
			});
		});

		//Loading invalid url should return a promise rejection
		it('load error', function (done) {
			config.push({id:'invalidAsset', src:'/invalid-url', group:'test'});

			var loadSuccess = false;
			preloader.load('test').then(function(){
				loadSuccess = true;
			}).finally(function(){
				expect(loadSuccess).toBe(false);
				done();
			});
		});

		//Loading an already loaded group should be almost instantaneous
		it('reload', function (done) {

			preloader.load(groups[0]).finally(function(){

				var startTime = Date.now();
				preloader.load(groups[0]).finally(function(){
					expect(Date.now() - startTime).toBeLessThan(2); //ensure no more than a millisecond has passed
					done();
				});

			});

		});

		it('unload', function (done) {

			//Number of assets in first group
			var numAssets = config.filter(function(asset){
				return asset.group === groups[0];
			}).length;

			//Load both first and second groups
			preloader.load([groups[0], groups[1]]).finally(function(){
				preloader.unload(groups[1]); //Unload second group only
				expect(Object.keys(preloader.assets).length).toBe(numAssets); //Make sure that the only first group assets remain
				done();
			});
		});


	});
});
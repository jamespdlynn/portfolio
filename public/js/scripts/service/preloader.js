/*global define, Image, Audio*/
/**
 * Singleton angular factory used for preloading modules, images, audio and other data from server
 * @module service/preloader
 * @author James Lynn
 */
define(['angularAMD', 'config/preload'],function(angularAMD,preload){
	'use strict';

	angularAMD.factory('$preloader',function($q, $http, $userAgent){

		var promises = {}, assets = {};

		return {

			/**
			 * Load a set of assets from the server
			 * @param group {string} batch identifier attached to all the assets to be loaded
			 * @returns {*} promise
			 */
			load : function(group){
				//If this group has already been loaded return the pre-exiting promise
				if (promises[group]){
					return promises[group];
				}

				var promiseArray = [];

				//Loop through configuration file search for objects with the given group identifier
				preload.forEach(function(asset){
					if (asset.group == group){
						var media = null, defer = $q.defer();

						switch (asset.type){

							//Load RequireJS Javascript Module
							case 'module' :
								require([asset.src], function(res){
									media = res;
									defer.resolve();
								});
							break;

							//Load image asset
							case 'image':
								media = new Image();
								media.onload = media.onerror = defer.resolve;
								media.src = asset.src;
								break;

							//Load audio asset
							case 'audio':
								media = new Audio(asset.src);
								media.addEventListener('loadeddata',  defer.resolve, false);
								media.addEventListener('error', defer.resolve, false);

								// IOS does not let us preload HTML audio objects (LAME)
								// Use a regular http get call instead so the browser at least caches the data source
								if ($userAgent.isIOS()){
									$http.get(asset.src).finally(defer.resolve);
								}

								break;

							//For any other asset just use an http get call and save the returned data in whatever format it comes back in
							default :
								$http.get(asset.src).success(function(res){
									media = res;
									defer.resolve();
								}).error(defer.resolve);
								break;
						}

						//If cache is set to true store off the actual JS Module, DOM object, or server return value
						//Otherwise just store the configuration object
						assets[asset.id] = asset.cache ? media : asset;

						//Save the asset load callback to the array
						promiseArray.push(defer.promise);
					}
				});

				//Combine all the load promises for the group into a single promise, then save it off and return it
				promises[group] = $q.all(promiseArray);
				return promises[group];
			},

			/**
			 * Removes a set of assets from cache
			 * @param group {string} batch identifier attached to all the assets to be unloaded
			 */
			unload : function(group){
				preload.forEach(function(data) {
					if (data.group == group) {
						delete assets[data.id];
					}
				});
				delete promises[group];
			},

			/**
			 * Fetch an asset from cache
			 * @param id {string} unique asset identifier
			 * @returns {Image|Audio|asset|*}
			 */
			fetch : function(id){
				return assets[id];
			}

		};
	});

});
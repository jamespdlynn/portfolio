/*global define, Image, Audio*/
/**
 * Singleton angular factory used for preloading modules, images, audio and other data from server
 * @module service/preloader
 * @author James Lynn
 */
define(['angularAMD', 'config/preload', 'service/userAgent', 'directive/file'], function (angularAMD, preload) {
	'use strict';

	angularAMD.service('$preloader', function ($q, $http, $userAgent) {

		var promises = {}, assets = {};

		var $preloader = {

			assets: assets,

			/**
			 * Load a set of assets from the server
			 * @param group {string} batch identifier attached to all the assets to be loaded
			 * @returns {*} promise
			 */
			load: function (group) {

				var promiseArray = [];

				//If passed an array, recursively call this function of each of the values and return the chained promise
				if (Array.isArray(group)) {
					var self = this;
					group.forEach(function (value) {
						promiseArray.push(self.load(value));
					});
					return $q.all(promiseArray);
				}

				//If this group has already been loaded return the pre-exiting promise
				if (promises[group]) {
					return promises[group];
				}

				//Loop through configuration file search for objects with the given group identifier
				preload.forEach(function (asset) {
					if (asset.group !== group) {
						return;
					}

					var deferred = $q.defer();
					var media = null;

					switch (asset.type) {

						//Load RequireJS Javascript Module
						case 'module' :
							require([asset.src], function (res) {
								media = res;
								deferred.resolve();
							}, deferred.reject);
							break;

						//Load image asset
						case 'image':
							media = new Image();
							media.onload = deferred.resolve;
							media.onerror = deferred.reject;
							media.src = asset.src;

							//onload is not supported in some test browsers so use http get to resolve call instead
							if ($userAgent.isTest()){
								$http.get(asset.src).then(deferred.resolve, deferred.reject);
							}
							break;

						//Load audio asset
						case 'audio':
							//Audio tags are not supported in test browsers, so don't bother with them
							if ($userAgent.isTest()) {
								$http.get(asset.src).then(deferred.resolve, deferred.reject);
								break;
							}

							media = new Audio(asset.src);

							if (!isAudioLocked()){
								media.addEventListener('loadeddata', deferred.resolve, false);
								media.addEventListener('error', deferred.reject, false);
								media.load();
							}
							else{
								$http.get(asset.src).then(deferred.resolve, deferred.reject);
							}


						break;

						//For any other asset just use an http get call and save the returned data in whatever format it comes back in
						default :
							$http.get(asset.src).then(function (res) {
								media = res.data;
								deferred.resolve();
							}, deferred.reject);
							break;
					}

					//If cache is set to true store off the actual JS Module, DOM object, or server return value
					//Otherwise just store the configuration object
					assets[asset.id] = asset.cache ? media : asset;

					deferred.promise.then(null, function () {
						console.warn('error loading asset "' + asset.id + '"');
						assets[asset.id].hasError = true;
					});

					//Save the asset load callback to the array
					promiseArray.push(deferred.promise);
				});

				//Combine all the load promises for the group into a single promise, then save it off and return it
				return (promises[group] = $q.all(promiseArray));
			},

			/**
			 * Removes a set of assets from cache
			 * @param [group] {string} batch identifier attached to all the assets to be unloaded, if none specified all are unloaded
			 */
			unload: function (group) {

				//If not passed set group to the array of all active promise values
				if (!group) {
					group = Object.keys(promises);
				}

				//If array recursively call this function on all its values
				if (Array.isArray(group)) {
					var self = this;
					group.forEach(function (value) {
						self.unload(value);
					});
				}
				else {
					preload.forEach(function (data) {
						if (!group || data.group === group) {
							delete assets[data.id];
						}
					});

					delete promises[group];
				}
			},

			/**
			 * Fetch an asset from cache
			 * @param id {string} unique asset identifier
			 * @returns {Image|Audio|asset|*}
			 */
			fetch: function (id) {
				return assets[id];
			},

			/**
			 * Helper play method that only plays the given audio file if it is ready
			 * @param id {string} id of the preloaded audio asset to play
			 * @param [force=false] {boolean} play audio even if not ready
			 */
			play: function (id, force) {
				var audio = assets[id];
				if (!audio || !audio instanceof Audio || audio.hasError) {
					console.warn('cannot play audio: ' + id);
					return;
				}

				if (audio.readyState === 4 || force){
					audio.play();
				}
			}

		};

		//IOS doesn't let us preload audio without a touch event (LAME) so we have use some custom logic

		var audioUnlocked = false;

		function isAudioLocked(){
			return $userAgent.isIOS() && !audioUnlocked;
		}

		function unlockAudio(){
			window.removeEventListener('touchstart', unlockAudio);

			var keys = Object.keys(assets);
			keys.forEach(function(key){
				if (assets[key] instanceof Audio){
					assets[key].load();
				}
			});
			audioUnlocked = true;
		}


		//listen for touch event before fires and then preload any existing audio assets
		if (isAudioLocked()){
			window.addEventListener('touchstart', unlockAudio);
		}

		return $preloader;

	});





});
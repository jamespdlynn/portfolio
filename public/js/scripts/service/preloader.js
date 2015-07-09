define(['angularAMD', 'config/preload'],function(angularAMD, preload){

	angularAMD.factory('$preloader',function($q, $http, $userAgent){

		var promises = {}
		var assets = {};

		return {

			fetch : function(id){
				return assets[id];
			},

			load : function(group){
				if (promises[group]){
					return promises[group];
				}

				var promise = [];
				preload.forEach(function(data){
					if (data.group == group){
						var defer = $q.defer();
						var asset;

						switch (data.type){
							case 'image':
								asset = new Image();
								asset.onload = asset.onerror = defer.resolve;
								asset.src = data.src;
								break;

							case 'audio':
								asset = new Audio(data.src);

								if ($userAgent.isIOS()){
									$http.get(data.src).success(defer.resolve).error(defer.resolve);
								}else{
									asset.addEventListener('loadeddata',  defer.resolve, false);
									asset.addEventListener('error', defer.resolve, false);
								}

								break;

							default :
								asset = data;
								$http.get(data.src).success(function(res){
									asset = res;
									defer.resolve();
								}).error(defer.resolve);
								break;
						}

						assets[data.id] = data.cache ? asset : data;
						promise.push(defer.promise);
					}
				})

				return promises[group] = $q.all(promise);
			},

			unload : function(group){
				preload.forEach(function(data) {
					if (data.group == group) {
						delete assets[data.id];
					}
				});
				delete promises[group];
			}

		}
	});

});
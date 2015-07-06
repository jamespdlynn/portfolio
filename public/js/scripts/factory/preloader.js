define(['angularAMD', 'config/preload'],function(angularAMD, preload){

	var iOS = ( navigator.userAgent.match(/iPad|iPhone|iPod/g) ? true : false );

	angularAMD.factory('$preloader',function($q, $http){

		var promises = {}
		var assets = Object.create({
			src : function(id){
				return this[id] ? this[id].src : null;
			},

			play : function(id) {
				if (this[id] && this[id] instanceof Audio) {
					this[id].play();
				}
			}
		});

		return {

			assets : assets,

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

								if (!iOS){
									asset.addEventListener('loadeddata',  defer.resolve, false);
									asset.addEventListener('error', defer.resolve, false);
								}else{
									$http.get(data.src).success(defer.resolve).error(defer.resolve);
								}

								break;

							default :
								asset = data;
								$http.get(data.src).success(defer.resolve).error(defer.resolve);
								break;
						}

						if (data.cache){
							assets[data.id] = asset;
						}

						defer.promise.then(function(){
							console.log(data.id + " loaded");
						});

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
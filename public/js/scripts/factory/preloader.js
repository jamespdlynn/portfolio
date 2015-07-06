define(['angularAMD', 'config/preload'],function(angularAMD, preload){

	angularAMD.factory('$preloader',function($q){

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
							default :
								asset = new Image();
								asset.onload = asset.onerror = defer.resolve;
								asset.src = data.src;
								break;

							case 'audio':
								asset = new Audio(data.src);
								asset.addEventListener('canplaythrough',  defer.resolve, false);
								asset.addEventListener('load',  defer.resolve, false);
								asset.addEventListener('error', defer.resolve, false);
								break;
						}

						if (data.cache){
							assets[data.id] = asset;
						}

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
require.config({
	baseUrl: 'js/scripts',

	paths: {
		jquery : '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery',
		mousewheel : '../lib/jquery.mousewheel',
		slick : '../lib/slick',

		angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular',
		angularAnimate : '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-animate',
		angularUIRouter : '../lib/angular-ui-router',
		angularSlick : '../lib/angular-slick',
		angularAMD: '../lib/angularAMD',
		ngload: '../lib/ngload'

	},

	shim: {
		angularUIRouter : ['angular'],
		angularAnimate : ['angular'],
		angularSlick : ['angular','slick'],
		angularAMD: ['angular'],
		ngload: ['angularAMD']
	},

	deps: ['app']
});

Array.prototype.find = function(match){
	var i = this.length;
	loop1 : while (i--){
		var obj = this[i];
		for (var key in match){
			if (match.hasOwnProperty(key) && obj[key] !== match[key]){
				continue loop1;
			}
		}
		return obj;
	}
	return null;
};

Array.prototype.where = function(match){
	return this.filter(function(obj){
		for (var key in match){
			if (match.hasOwnProperty(key) && obj[key] !== match[key]){
				return false;
			}
		}
		return true;
	});
}
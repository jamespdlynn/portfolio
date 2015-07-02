require.config({
	baseUrl: 'js/scripts',

	paths: {
		jquery : '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
		mouseWheel : '../vendor/jquery.mousewheel.min',
		slick : '../vendor/slick',

		angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min',
		angularAnimate : '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-animate.min',
		angularUIRouter : '../vendor/angular-ui-router.min',
		angularSlick : '../vendor/angular-slick.min',
		angularAMD: '../vendor/angularAMD.min',
		ngload: '../vendor/ngload.min',

		PortfolioController : 'controller/port',
		ContactController : 'controller/contact'
	},

	shim: {
		slick : ['jquery'],
		mouseWheel : ['jquery'],
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
//RequireJS main configuration
require.config({
	baseUrl: 'js/scripts',

	paths: {
		jquery : ['//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min', '../lib/jquery.min'],
		angular: ['//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min', '../lib/angular.min'],
		angularAnimate : ['//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-animate.min', '../lib/angular-animate.min'],
		angularUIRouter : ['../lib/angular-ui-router.min'],
		angularSlick : ['../lib/angular-slick.min'],
		angularAMD: ['../lib/angularAMD.min'],
		ngload: ['../lib/ngload.min'],
		slick : ['../lib/slick.min']
	},

	shim: {
		angularUIRouter : ['angular'],
		angularAnimate : ['angular'],
		angularSlick : ['angular','slick'],
		angularAMD: ['angular'],
		ngload: ['angularAMD']
	},

	config : {
		'config/preload' : {
			path :  '/assets'
		},
		'config/states' : {
			path : '/templates'
		}
	},

	deps: ['app'] //Load in app file to kick off application
});





/**
 * Main RequireJS config file
 * @author James Lynn
 */
require.config({
	baseUrl: 'js/scripts',

	paths: {
		jquery: ['//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min', '../lib/jquery.min'],
		slick: ['//cdn.jsdelivr.net/jquery.slick/1.5.0/slick.min','../lib/slick.min'],
		angular: ['//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min', '../lib/angular.min'],
		angularAnimate: ['//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-animate.min', '../lib/angular-animate.min'],
		angularUIRouter: ['//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min','../lib/angular-ui-router.min'],
		angularAMD: ['//cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min','../lib/angularAMD.min'],
		angularSlick: ['../lib/angular-slick.min'],
		ngload: ['../lib/ngload.min']
	},

	shim: {
		angularUIRouter: ['angular'],
		angularAnimate: ['angular'],
		angularSlick: ['angular', 'slick'],
		angularAMD: ['angular'],
		ngload: ['angularAMD']
	},

	deps: ['app'] //Load in app.js to kick off the angular application
});





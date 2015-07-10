require.config({
	baseUrl: 'js/scripts',

	paths: {
		jquery : '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery',
		angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular',
		angularAnimate : '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-animate',
		angularUIRouter : '../lib/angular-ui-router',
		angularSlick : '../lib/angular-slick',
		angularAMD: '../lib/angularAMD',
		ngload: '../lib/ngload',
		slick : '../lib/slick'
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
	'use strict';
	var i = this.length, obj, key;
	loop1 : while (i--){
		obj = this[i];
		for (key in match){
			if (match.hasOwnProperty(key) && obj[key] !== match[key]){
				continue loop1;
			}
		}
		return obj;
	}
	return null;
};




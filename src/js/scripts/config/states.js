/*global define*/
/**
 * Configuration data containing all states and sub states used by this applications router
 * @module config/states
 * @author James Lynn
 */
define(function(require, exports, module){
	'use strict';

	var path = module.config().path;

	/**
	 * @typedef {Object} state
	 * @property {string} id - Unique identifier of the state
	 * @property {string} [url=/{id}] - The relative url of the stat
	 * @property {string} [label] - The name of the state as displayed in the nav
	 * @property {string} [require=[]] The javascript file paths needed for requirejs to preload before the state changes
	 * @property {string} [controller] The angular js controller name
	 * @property {string} [templateUrl] The html templateUrl path
	 * @property {boolean} [isDefault=false] - Flag determines whether this is the default state to redirect to
	 * @property {boolean} [navEnabled=true] - Flag determines whether to show this state in the nav
	 * @property {boolean} [abstract=false] - Flag determines whether this is a non directly accessible state
	 * @property {state[]} [states] - Optional array of sub states
	 */

	/**@return state[] */
	return [
		{
			id : 'home',
			url : '/',
			label : 'Home',
			isDefault : true,
			navEnabled : false
		},

		{
			id : 'about',
			label : 'About Me',
			templateUrl : path+'/about.html'
		},

		{
			id : 'portfolio',
			label : 'Portfolio',
			controller : 'PortfolioController',
			templateUrl : path+'/portfolio.html',
			abstract : true,
			states : [
				{
					id : 'hyper',
					url : '/hyper-galactic',
					label : 'Hyper Galactic',
					templateUrl : path+'/portfolio/hyper-galactic.html'
				},

				{
					id : 'chess',
					url : '/chess-chaps',
					label : 'Chess Chaps',
					templateUrl : path+'/portfolio/chess-chaps.html'
				},

				{
					id : 'league',
					url : '/league-champs',
					label : 'League Champs',
					templateUrl : path+'/portfolio/league-champs.html'
				},

				{
					id : 'inmar',
					url : '/inmar-digital-coupons',
					label : 'Inmar Digital Coupons',
					templateUrl : path+'/portfolio/inmar-digital-coupons.html'
				},

				{
					id : 'emerson',
					url : '/emeson-io',
					label : 'Emerson IO Calculator',
					templateUrl : path+'/portfolio/emerson-io.html'
				},

				{
					id : 'oracle',
					url : '/oracle-roi-calculator',
					label : 'Oracle ROI Calculator',
					templateUrl : path+'/portfolio/oracle-roi-calculator.html'
				}

			]
		},

		{
			id : 'resume',
			label : 'Resume',
			templateUrl : path+'/resume.html'
		},

		{
			id : 'contact',
			label : 'Contact',
			controller : 'ContactController',
			templateUrl : path+'/contact.html'
		}

	];
});
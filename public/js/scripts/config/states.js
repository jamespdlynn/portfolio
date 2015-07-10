/*global define*/
/**
 * Configuration json containing all states and sub states used by this applications router
 * @module config/states
 * @author James Lynn
 */
define(function(){
	'use strict';

	/**
	 * @typedef {Object} state
	 * @property {string} id - Unique identifier of the state
	 * @property {string} [url=/{id}] - The relative url of the stat
	 * @property {string} [label] - The name of the state as displayed in the nav
	 * @property {string} [require=[]] The javascript file paths needed for requirejs to preload before the state changes
	 * @property {string} [controller] The angular js controller name
	 * @property {string} [template] The html template file name
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
			template : 'about.html'
		},

		{
			id : 'portfolio',
			label : 'Portfolio',
			controller : 'PortfolioController',
			template : 'portfolio.html',
			abstract : true,
			states : [
				{
					id : 'hyper',
					url : '/hyper-galactic',
					label : 'Hyper Galactic',
					template : 'hyper-galactic.html'
				},

				{
					id : 'chess',
					url : '/chess-chaps',
					label : 'Chess Chaps',
					template : 'chess-chaps.html'
				},

				{
					id : 'league',
					url : '/league-champs',
					label : 'League Champs',
					template : 'league-champs.html'
				},

				{
					id : 'inmar',
					url : '/inmar-digital-coupons',
					label : 'Inmar Digital Coupons',
					template : 'inmar-digital-coupons.html'
				},

				{
					id : 'emerson',
					url : '/emeson-io',
					label : 'Emerson IO Calculator',
					template : 'emerson-io.html'
				},

				{
					id : 'oracle',
					url : '/oracle-roi-calculator',
					label : 'Oracle ROI Calculator',
					template : 'oracle-roi-calculator.html'
				}

			]
		},

		{
			id : 'resume',
			label : 'Resume',
			template : 'resume.html'
		},

		{
			id : 'contact',
			label : 'Contact',
			controller : 'ContactController',
			template : 'contact.html'
		}

	];
});
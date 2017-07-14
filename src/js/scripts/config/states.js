/*global define*/
/**
 * Configuration data containing all states and sub states used by this applications router
 * @module config/states
 * @author James Lynn
 */
define(function (require, exports, module) {
	'use strict';

	var templatePath = module.config().path || '/templates';

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
			id: 'home',
			url: '/',
			label: 'Home',
			isDefault: true,
			navEnabled: false
		},

		{
			id: 'about',
			label: 'About Me',
			templateUrl: templatePath + '/about.html'
		},

		{
			id: 'portfolio',
			label: 'Portfolio',
			controller: 'PortfolioController',
			templateUrl: templatePath + '/portfolio.html',
			abstract: true,
			states: [
				{
					id: 'hyper',
					label: 'Hyper Galactic',
					templateUrl: templatePath + '/portfolio/hyper.html'
				},

				{
					id: 'chess',
					label: 'Chess Chaps',
					templateUrl: templatePath + '/portfolio/chess.html'
				},

				{
					id: 'league',
					label: 'League Champs',
					templateUrl: templatePath + '/portfolio/league.html'
				},

				{
					id: 'inmar',
					label: 'Inmar Digital Coupons',
					templateUrl: templatePath + '/portfolio/inmar.html'
				},

				{
					id: 'emerson',
					label: 'Emerson IO Calculator',
					templateUrl: templatePath + '/portfolio/emerson.html'
				},

				{
					id: 'oracle',
					label: 'Oracle ROI Calculator',
					templateUrl: templatePath + '/portfolio/oracle.html'
				}

			]
		},

		{
			id: 'resume',
			label: 'Resume',
			templateUrl: templatePath + '/resume.html'
		},

		{
			id: 'contact',
			label: 'Contact',
			controller: 'ContactController',
			templateUrl: templatePath + '/contact.html'
		}

	];
});
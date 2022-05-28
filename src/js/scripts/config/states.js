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
			label: '512 Games',
			controller: 'PortfolioController',
			templateUrl: templatePath + '/portfolio.html',
			abstract: true,
			states: [
				{
					id: '512Games',
					label: '512 Games',
					templateUrl: templatePath + '/portfolio/512Games.html'
				},

				{
					id: 'wordJumble',
					label: 'Play Pals: Word Jumble',
					templateUrl: templatePath + '/portfolio/wordJumble.html'
				},

				{
					id: 'aws',
					label: 'AWS Infrastructure',
					templateUrl: templatePath + '/portfolio/aws.html'
				}


			]
		},

		{
			id: 'resume',
			label: 'Resume',
			templateUrl: templatePath + '/resume.html'
		}

	];
});

/*global define*/
/**
 *Configuration json containing all the assets for the app to preload
 * @module config/preload
 * @author James Lynn
 */
define(function(){
	'use strict';

	/**
	 * @typedef {Object} asset
	 * @property {string} id - Unique identifier of the asset
	 * @property {string} type - The type of asset (image, audio, etc)
	 * @property {string} src - The path to this asset from the server root @type string
	 * @property {string} group - Identifier of the batch group this asset belongs to (necessary for loading and unloading in clumps)
	 * @property {boolean} [cache=false] - Flag determining whether to store this object in memory after loading
	 */

	/**@return asset[] */
	 return [


		{
			id:'sprites',
			type:'image',
			src:'/assets/img/sprites.png',
			group : 'main'
		},

		{
			id:'bubble',
			type:'image',
			src:'/assets/img/bubble.png',
			group : 'main'
		},

		{
			id:'click',
			type:'audio',
			src:'/assets/audio/click.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'bloop',
			type:'audio',
			src:'/assets/audio/bloop.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'swoosh',
			type:'audio',
			src:'/assets/audio/swoosh.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'walk',
			type:'audio',
			src:'/assets/audio/walk.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'portrait',
			type:'image',
			src:'/assets/img/portrait.png',
			group : 'about',
			cache : true
		},

		 {
			 id:'PortfolioController',
			 type:'module',
			 src:'controller/portfolio',
			 group : 'portfolio'
		 },

		{
			id:'hyper',
			type:'image',
			src:'/assets/img/portfolio/hyper.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'hyperNav',
			type:'image',
			src:'/assets/img//portfolio/hyper-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'league',
			type:'image',
			src:'/assets/img/portfolio/league.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'leagueNav',
			type:'image',
			src:'/assets/img/portfolio/league-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'chess',
			type:'image',
			src:'/assets/img/portfolio/chess.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'chessNav',
			type:'image',
			src:'/assets/img/portfolio/chess-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'oracle',
			type:'image',
			src:'/assets/img/portfolio/oracle.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'oracleNav',
			type:'image',
			src:'/assets/img/portfolio/oracle-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'emerson',
			type:'image',
			src:'/assets/img/portfolio/emerson.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'emersonNav',
			type:'image',
			src:'/assets/img/portfolio/emerson-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'inmar',
			type:'image',
			src:'/assets/img/portfolio/inmar.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'inmarNav',
			type:'image',
			src:'/assets/img/portfolio/inmar-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'resume',
			type:'pdf',
			src:'/assets/docs/resume.pdf',
			group : 'resume'
		},

		 {
			 id:'ContactController',
			 type:'module',
			 src:'controller/contact',
			 group : 'contact'
		 },

		{
			id : 'check',
			type : 'image',
			src : '/assets/img/check.png',
			group : 'contact'
		},

		{
			id : 'mail',
			type : 'audio',
			src : '/assets/audio/mail.mp3',
			group : 'contact',
			cache : true
		}
	];

});
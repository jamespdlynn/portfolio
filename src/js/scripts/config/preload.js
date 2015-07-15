/*global define*/
/**
 *Configuration dat containing all the assets for the app to preload
 * @module config/preload
 * @author James Lynn
 */
define(function(require, exports, module){
	'use strict';

	var path = module.config().path;

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
			src: path+'/img/sprites.png',
			group : 'main'
		},

		{
			id:'bubble',
			type:'image',
			src: path+'/img/bubble.png',
			group : 'main'
		},

		{
			id:'click',
			type:'audio',
			src: path+'/audio/click.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'bloop',
			type:'audio',
			src: path+'/audio/bloop.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'swoosh',
			type:'audio',
			src: path+'/audio/swoosh.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'walk',
			type:'audio',
			src: path+'/audio/walk.mp3',
			group : 'main',
			cache : true
		},

		{
			id:'portrait',
			type:'image',
			src: path+'/img/portrait.png',
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
			src: path+'/img/portfolio/hyper.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'hyperNav',
			type:'image',
			src: path+'/img/portfolio/hyper-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'league',
			type:'image',
			src: path+'/img/portfolio/league.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'leagueNav',
			type:'image',
			src: path+'/img/portfolio/league-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'chess',
			type:'image',
			src: path+'/img/portfolio/chess.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'chessNav',
			type:'image',
			src: path+'/img/portfolio/chess-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'oracle',
			type:'image',
			src: path+'/img/portfolio/oracle.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'oracleNav',
			type:'image',
			src: path+'/img/portfolio/oracle-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'emerson',
			type:'image',
			src: path+'/img/portfolio/emerson.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'emersonNav',
			type:'image',
			src: path+'/img/portfolio/emerson-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'inmar',
			type:'image',
			src: path+'/img/portfolio/inmar.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'inmarNav',
			type:'image',
			src: path+'/img/portfolio/inmar-nav.png',
			group : 'portfolio',
			cache : true
		},

		{
			id:'resume',
			type:'pdf',
			src: path+'/docs/resume.pdf',
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
			src :  path+'/img/check.png',
			group : 'contact'
		},

		{
			id : 'mail',
			type : 'audio',
			src :  path+'/audio/mail.mp3',
			group : 'contact',
			cache : true
		}
	];

});
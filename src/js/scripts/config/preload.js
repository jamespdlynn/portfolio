/*global define*/
/**
 *Configuration dat containing all the assets for the app to preload
 * @module config/preload
 * @author James Lynn
 */
define(function (require, exports, module) {
  'use strict';

  var assetsPath = module.config().path || '/assets';

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
      id: 'email',
      type: 'image',
      src: assetsPath + '/img/email.png',
      group: 'main',
      cache: true
    },

    {
      id: 'linkedIn',
      type: 'image',
      src: assetsPath + '/img/ln.png',
      group: 'main',
      cache: true
    },

    {
      id: 'sprites',
      type: 'image',
      src: assetsPath + '/img/sprites.png',
      group: 'main'
    },

    {
      id: 'bubble',
      type: 'image',
      src: assetsPath + '/img/bubble.png',
      group: 'main'
    },

    {
      id: 'click',
      type: 'audio',
      src: assetsPath + '/audio/click.mp3',
      group: 'main',
      cache: true
    },

    {
      id: 'bloop',
      type: 'audio',
      src: assetsPath + '/audio/bloop.mp3',
      group: 'main',
      cache: true
    },

    {
      id: 'swoosh',
      type: 'audio',
      src: assetsPath + '/audio/swoosh.mp3',
      group: 'main',
      cache: true
    },

    {
      id: 'walk',
      type: 'audio',
      src: assetsPath + '/audio/walk.mp3',
      group: 'main',
      cache: true
    },

    {
      id: 'scream',
      type: 'audio',
      src: assetsPath + '/audio/scream.mp3',
      group: 'main',
      cache: true
    },

    {
      id: 'portrait',
      type: 'image',
      src: assetsPath + '/img/portrait.png',
      group: 'about',
      cache: true
    },

    {
      id: 'PortfolioController',
      type: 'module',
      src: 'controller/port',
      group: 'portfolio'
    },

    {
      id: '512Games',
      type: 'image',
      src: assetsPath + '/img/portfolio/512games.png',
      group: 'portfolio',
      cache: true
    },

    {
      id: '512GamesNav',
      type: 'image',
      src: assetsPath + '/img/portfolio/512games-nav.png',
      group: 'portfolio',
      cache: true
    },

    {
      id: 'wordJumble',
      type: 'image',
      src: assetsPath + '/img/portfolio/word-jumble.png',
      group: 'portfolio',
      cache: true
    },

    {
      id: 'wordJumbleNav',
      type: 'image',
      src: assetsPath + '/img/portfolio/word-jumble-nav.png',
      group: 'portfolio',
      cache: true
    },

    {
      id: 'appStoreButton',
      type: 'image',
      src: assetsPath + '/img/portfolio/app-store.png',
      group: 'portfolio',
      cache: true
    },

    {
      id: 'playStoreButton',
      type: 'image',
      src: assetsPath + '/img/portfolio/play-store.png',
      group: 'portfolio',
      cache: true
    },


    {
      id: 'aws',
      type: 'image',
      src: assetsPath + '/img/portfolio/aws.png',
      group: 'portfolio',
      cache: true
    },

    {
      id: 'awsNav',
      type: 'image',
      src: assetsPath + '/img/portfolio/aws-nav.png',
      group: 'portfolio',
      cache: true
    },

    {
      id: 'resume',
      type: 'pdf',
      src: assetsPath + '/docs/resume.pdf',
      group: 'resume'
    },

    {
      id: 'ContactController',
      type: 'module',
      src: 'controller/contact',
      group: 'contact'
    },

    {
      id: 'check',
      type: 'image',
      src: assetsPath + '/img/check.png',
      group: 'contact'
    },

    {
      id: 'mail',
      type: 'audio',
      src: assetsPath + '/audio/mail.mp3',
      group: 'contact',
      cache: true
    }
  ];

});

/*global define, navigator*/
/**
 * Helper angular service for determining current browser agent
 * @module service/userAgent
 * @author James Lynn
 */
define(['angularAMD'], function (angularAMD) {
  'use strict';

  angularAMD.service('$userAgent', function () {

    var ua = navigator.userAgent;
    var platform = navigator.platform;

    return {

      isFirefox: function () {
        return ua.match(/Firefox/g);
      },

      isChrome: function () {
        return ua.match(/Chrome/g);
      },

      isSafari: function () {
        return ua.match(/Safari/g);
      },

      isIE: function () {
        return ua.match(/NET4|Trident|MSIE/g);
      },


      isAndroid: function () {
        return ua.match(/Android/g);
      },

      isBlackberry: function () {
        return ua.match(/BlackBerry/i);
      },

      isWindowsPhone: function () {
        return ua.match(/Windows Phone/i);
      },

      isIOS: function () {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
          ].includes(platform) || (ua.includes('Mac') && 'ontouchend' in document);
      },

      isMobile: function () {
        return this.isAndroid() || this.isBlackberry() || this.isWindowsPhone() || this.isIOS();
      },

      isTest: function () {
        return ua.match(/PhantomJS|Zombie/g);
      },

    };
  });

});

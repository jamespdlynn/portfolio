/*global define, navigator*/
/**
 * Helper angular service for determining current browser agent
 * @module service/userAgent
 * @author James Lynn
 */
define(['angularAMD'],function(angularAMD){
	'use strict';

	angularAMD.service('$userAgent',function(){

		var ua = navigator.userAgent;

		return {

			isFirefox : function(){
				return ua.match(/Firefox/g);
			},

			isChrome : function(){
				return ua.match(/Chrome/g);
			},

			isSafari: function(){
				return ua.match(/Safari/g);
			},

			isIE : function(){
				return ua.match(/NET4|Trident|MSIE/g);
			},

			isPhantomJS : function(){
				return ua.match(/PhantomJS/g);
			},

			isAndroid : function(){
				return ua.match(/Android/g);
			},

			isBlackberry: function(){
				return ua.match(/BlackBerry/i);
			},

			isWindowsPhone : function(){
				return ua.match(/Windows Phone/i);
			},

			isIOS : function(){
				return ua.match(/iPad|iPhone|iPod/g);
			},

			isMobile : function(){
				return this.isAndroid() || this.isBlackberry() || this.isWindowsPhone() || this.isIOS();
			}

		};
	});

});
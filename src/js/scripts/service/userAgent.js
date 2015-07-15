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

			isAndroid : function(){
				return ua.match(/Android/g);
			},

			isIOS : function(){
				return ua.match(/iPad|iPhone|iPod/g);
			},

			isPhantomJS : function(){
				return ua.match(/PhantomJS/g);
			}

		};
	});

});
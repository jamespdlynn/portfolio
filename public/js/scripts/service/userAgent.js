/*global define, navigator*/
/**
 * Helper angular factory for determining current browser agent
 * @module service/userAgent
 * @author James Lynn
 */
define(['angularAMD'],function(angularAMD){
	'use strict';

	angularAMD.factory('$userAgent',function(){

		var ua = navigator.userAgent;

		return {

			isFirefox : function(){
				return ua && ua.match(/Firefox/g);
			},

			isChrome : function(){
				return ua && ua.match(/Chrome/g);
			},

			isSafari: function(){
				return ua && ua.match(/Safari/g);
			},

			isIE : function(){
				return ua && ua.match(/NET4|Trident|MSIE/g);
			},

			isAndroid : function(){
				return ua && ua.match(/Android/g);
			},

			isIOS : function(){
				return ua && ua.match(/iPad|iPhone|iPod/g);
			}

		};
	});

});
define(['angularAMD'],function(angularAMD){

	angularAMD.factory('$userAgent',function(){

		var ua = navigator.userAgent;
		console.log(ua);

		return {

			isFirefox : ua.match.bind(ua, /Firefox/g),

			isOpera : ua.match.bind(ua, /Opera/g),

			isChrome : ua.match.bind(ua, /Chrome/g),

			isSafari : ua.match.bind(ua, /Safari/g),

			isWebkit : ua.match.bind(ua, /Webkit/g),

			isIOS : ua.match.bind(ua, /iPad|iPhone|iPod/g),

			isAndroid : ua.match.bind(ua, /Android/g)

		}
	});

});
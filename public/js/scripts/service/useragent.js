define(['angularAMD'],function(angularAMD){

	angularAMD.factory('$userAgent',function(){

		var ua = navigator.userAgent;
		console.log(ua);

		return {

			isFirefox : ua.match.bind(ua, /iPad|iPhone|iPod/g),

			isOpera : ua.match.bind(ua, /iPad|iPhone|iPod/g),

			isChrome : ua.match.bind(ua, /iPad|iPhone|iPod/g),

			isSafari : ua.match.bind(ua, /iPad|iPhone|iPod/g),

			isWebkit : ua.match.bind(ua, /iPad|iPhone|iPod/g),

			isIOS : ua.match.bind(ua, /iPad|iPhone|iPod/g),

			isAndroid : ua.match.bind(ua, /Android/g)
		}
	});

});
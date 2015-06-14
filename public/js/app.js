
 var app = angular.module("app",[]);

 app.controller('MainController', function($scope) {
	 $scope.nav = {
		 items : [
			 {key:'about',path:'/#about-me'},
			 {key:'portfolio',path:'/#portfolio'},
			 {key:'contact', path:'/#contact'},
			 {key:'resume', path:'/resume.pdf'}
		 ],

		 visible : false,

		 toggle : function(){
			 return (this.visible = !this.visible);
		 }
	 };

 }).directive('nav',function(){
	 return {
		 templateUrl : 'templates/nav.html',

		 link : function(scope, element, attrs){
			 /*scope.$watch('nav.visible', function(){
			  angular.forEach(element.children(), function(item){
			  var bubbles = item.children;
			  var i = bubbles.length;
			  while (i--){
			  $animate.hide(bubbles[i]);
			  }
			  });
			  });*/
		 }
	 }
 }).directive('avatar', function(){
	 return{
		 link: function (scope, element) {

			 scope.reset = function(){
				 element.removeClass('wave').removeClass('blink').removeClass('dance');
			 };

			 scope.blink = function(){
				 scope.reset();
				 element.addClass('blink');
				 element[0].addEventListener( 'webkitAnimationEnd',  scope.reset);
			 };

			 scope.wave = function(){
				 scope.reset();
				 element.addClass('wave');
				 element[0].addEventListener( 'webkitAnimationEnd',  scope.reset);
			 };

			 scope.dance = function(){
				 scope.reset();
				 element.addClass('dance');
				 element[0].addEventListener( 'webkitAnimationEnd',  scope.reset);
			 };

			 scope.walk = function(){
				 scope.reset();
				 element.addClass('walk').toggleClass('left');
				 element[0].addEventListener( 'webkitTransitionEnd', scope.reset);
			 };

			 scope.random = function(){
				 var num = Math.random();
				 if (num > 0.4){
					 scope.blink();
				 }else if (num > 0.1){
					 scope.wave();
				 }else{
					 scope.dance();
				 }
			 }

			 scope.onClick = function(){
				 scope.wave();
				 scope.nav.toggle();
				 scope.$apply();
			 };


			 setInterval(scope.random, 6000);
		 }
	 }
 });


var $el = angular.element(document.querySelector('#avatar'));

function reset(){
	var temp = angular.element('<div id="avatar"></div>');
	$el.replaceWith(temp);
	$el = temp;
}


window.Avatar = {

	blink : function(){
		reset();
		$el.addClass('blink');
	},

	walkLeft : function(){
		reset();
		$el.css('transform','scaleX(-1)').addClass('walk');
	}
};
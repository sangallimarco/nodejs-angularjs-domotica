angular.module('app.cam')
.service('camService', ['$log', 'authService',
	function($log, authService){

		this.loadImage = function(src, callback) {
			var img = new Image();
			img.src = src;
			img.onload = function(){
				callback();
			};
		};
	}
]);

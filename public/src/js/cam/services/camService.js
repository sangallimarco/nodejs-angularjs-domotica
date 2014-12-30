angular.module('app.cam')
.service('camService', ['$log', 
	function($log){

		this.loadImage = function(src, callback) {
			var img = new Image();
			img.src = src;
			img.onload = function(){
				callback();
			};
		};
	}
]);
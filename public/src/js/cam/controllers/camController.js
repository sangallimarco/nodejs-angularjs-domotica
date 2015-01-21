angular.module('app.cam')
.controller('camController', ['$scope', '$log', '$window', 'socketIoFactory', 'camService',
	function($scope, $log, $window, socketIoFactory, camService) {
		$scope.title = 'Loaded!';
		$scope.src = null;
		$scope.timestamp = null;

		var canLoad = true;

		//socket.io
		socketIoFactory.on('cam.stream', function (obj) {
			// load only if image has been loaded
			if (canLoad) {
				canLoad = false;

				camService.loadImage(obj.src, function(){
					$scope.src = obj.src;
					$scope.timestamp = new Date().getTime();
					canLoad = true;
				});
			}
		});

		// open image in another tab
		$scope.downloadImage = function () {
			$window.open($scope.src,'_blank');
		};
	}
]);

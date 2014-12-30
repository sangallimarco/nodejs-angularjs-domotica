angular.module('app.cam')
.controller('camController', ['$scope', '$log', 'socketIoFactory', 'camService',
	function($scope, $log, socketIoFactory, camService) {
		$scope.title = 'Loaded!';
		$scope.src = null;

		var canLoad = true;

		//socket.io
		socketIoFactory.on('cam.stream', function (obj) {
			// load only if image has been loaded
			if (canLoad) {
				canLoad = false;

				camService.loadImage(obj.src, function(){
					$scope.src = obj.src;
					canLoad = true;
				});
			}
		});	

	}
]);

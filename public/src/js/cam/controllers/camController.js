angular.module('app.cam')
.controller('camController', ['$scope', '$log', 'socketIoFactory',
	function($scope, $log, socketIoFactory) {
		$scope.title = 'Loaded!';
		$scope.src = null;

		var canLoad = true;

		//socket.io
		socketIoFactory.on('cam.stream', function (obj) {
			// load only if image has been loaded
			if (canLoad) {
				canLoad = false;

				var img = new Image();
				img.src = obj.src;
				img.onload = function () {
					$scope.src = obj.src;
					canLoad = true;
				};
			}
		});	

	}
]);

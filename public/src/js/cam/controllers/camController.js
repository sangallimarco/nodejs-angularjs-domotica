angular.module('app.cam')
.controller('camController', ['$scope', '$log', 'socketIoFactory',
	function($scope, $log, socketIoFactory) {
		$scope.title = 'Loaded!';
		$scope.src = null;

		//socket.io
		socketIoFactory.on('cam.stream', function (obj) {
			$scope.src = obj.src;
		});	

	}
]);

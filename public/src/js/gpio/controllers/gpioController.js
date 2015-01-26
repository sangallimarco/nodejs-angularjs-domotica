angular.module('app.gpio')
.controller('gpioController', ['$scope', '$log', 'gpioService', 'socketIoFactory',
	function($scope, $log, gpioService, socketIoFactory) {
		$scope.title = 'Loaded!';

		// refactor in order to get real statuses
		$scope.switches = {};
		gpioService.initPin($scope.switches, 11, 'Pin 11');
		gpioService.initPin($scope.switches, 12, 'Pin 12');

		$scope.error = null;

		/**
		 * Init pins
		 */
		gpioService.initStatus($scope.switches);

		//socket.io
		socketIoFactory.on('gpio.changed', function (obj) {
			$scope.switches[obj.pin].status = obj.status;
		});
	}
]);

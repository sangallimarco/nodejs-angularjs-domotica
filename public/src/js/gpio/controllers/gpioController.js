angular.module('app.gpio')
.controller('gpioController', function($scope, $log, gpioService, onewireService, socketIoFactory) {
		$scope.title = 'Loaded!';
		$scope.temp = '--';

		// init switches
		$scope.switches = {};
		gpioService.initPin($scope.switches, 11, 'Pin 11');
		gpioService.initPin($scope.switches, 12, 'Pin 12');

		$scope.error = null;

		/**
		 * Init pins
		 */
		gpioService.initStatus($scope.switches);

		/**
		 * Get temperature
		 */
		onewireService.get().then(
			function (ret) {
				$scope.temp = ret.value;
			}
		);

		//socket.io
		socketIoFactory.on('gpio.changed', function (obj) {
			$scope.switches[obj.pin].status = obj.status;
		});
		socketIoFactory.on('onewire.changed', function (obj) {
			$scope.temp = obj.value;
		});
	});

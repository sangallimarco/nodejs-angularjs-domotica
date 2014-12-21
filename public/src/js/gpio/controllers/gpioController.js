angular.module('app.gpio')
.controller('gpioController', ['$scope', '$log', 'gpioService', 'socketIoFactory',
	function($scope, $log, testService, socketIoFactory) {
		$scope.title = 'Loaded!';

		// refactor in order to get real statuses
		$scope.switches = [
			{label: '11', pin:11, status:0},
			{label: '12', pin:12, status:0}
		];
		$scope.error = null;

		/**
		 * Set pin
		 */
		$scope.setPin = function(pin, status){
			gpioService.set(pin, status)
			.then(
				function(obj) {
					$scope.error = null;
				},
				function(err) {
					$scope.error = err.data.error;
				}
			);
		};

	}
]);

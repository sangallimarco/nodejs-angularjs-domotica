angular.module('app.gpio')
.controller('gpioController', ['$scope', '$log', 'gpioService', 'socketIoFactory',
	function($scope, $log, gpioService, socketIoFactory) {
		$scope.title = 'Loaded!';

		// refactor in order to get real statuses
		$scope.switches = [
			{label: '11', pin:11, status:false},
			{label: '12', pin:12, status:false}
		];
		$scope.error = null;

		/**
		 * Init pins
		 */
		gpioService.initStatus($scope.switches);
	}
]);

application.controller('index', ['$scope', '$log', 'weatherService', 'socketIoFactory',
	function($scope, $log, weatherService, socketIoFactory) {
		$scope.title = 'Loaded!';

		$scope.data = {
			humidity: 0,
			temp: 0
		};
		$scope.lastData = {

		};
		$scope.input = {
			postcode: ''
		};

		$scope.getWeather = function(){
			weatherService.getWeather($scope.input.postcode)
			.then(
				function(res) {
					//replace data object
					$scope.data = res;
				}
			);
		};

		weatherService.getLast()
		.then(
			function(res) {
				$scope.lastData = res;
			}
		);

		// https://github.com/btford/angular-socket-io
		$scope.message = {};

		//socket.io
		socketIoFactory.on('new', function (obj) {
			$scope.message = obj;
		});

	}
]);

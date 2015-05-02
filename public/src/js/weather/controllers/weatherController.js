angular.module('app.weather')
.controller('weatherController', function($scope, $log, weatherService, $stateParams, socketIoFactory) {
		$scope.title = 'Loaded!';

		$scope.data = {
			humidity: 0,
			temp: 0
		};
		$scope.items = [];
		$scope.input = {
			postcode: $stateParams.postcode || ''
		};

		$scope.getWeather = function(){
			// if ($scope.form.$valid) {
				// weatherService.getWeather($scope.input.postcode)
				weatherService.getWeather()
				.then(
					function(res) {
						//replace data object
						$scope.data = res;
					}
				);
			// }
		};

		weatherService.getAll()
		.then(
			function(res) {
				$scope.items = res;

				// search if postcode #/app/weather/w45eq
				// if ($scope.input !== '') {
				// 	$scope.getWeather();
				// }
			}
		);

		//socket.io
		socketIoFactory.on('weather.new', function (obj) {
			// prepend to list
			$scope.items.unshift(obj);
		});

	});

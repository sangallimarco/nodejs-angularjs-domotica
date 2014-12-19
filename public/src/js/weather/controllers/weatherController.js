angular.module('app.weather')
.controller('weatherController', ['$scope', '$log', 'weatherService', '$stateParams',
	function($scope, $log, weatherService, $stateParams) {
		$scope.title = 'Loaded!';

		$scope.data = {
			humidity: 0,
			temp: 0
		};
		$scope.lastData = {

		};
		$scope.input = {
			postcode: $stateParams.postcode || ''
		};

		$scope.getWeather = function(){
			if ($scope.form.$valid) {
				weatherService.getWeather($scope.input.postcode)
				.then(
					function(res) {
						//replace data object
						$scope.data = res;
					}
				);
			}
		};

		weatherService.getLast()
		.then(
			function(res) {
				$scope.lastData = res;

				// search is postcode present #/app/weather/w45eq
				if ($scope.input !== '') {
					$scope.getWeather();
				} 
			}
		);

	}
]);

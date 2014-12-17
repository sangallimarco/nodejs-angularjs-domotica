angular.module('app.weather')
.service('weatherService', ['$log', 'weatherApi', 
	function($log, weatherApi){

		this.getWeather = function(postcode) {
			var promise = weatherApi.getCurrent({postcode: postcode})
			.$promise
			.then(
				function (res) {
					$log.info(res);
					return res;
				}
			);
			return promise;
		};

		this.getLast = function(postcode) {
			var promise = weatherApi.getLast()
			.$promise
			.then(
				function (res) {
					$log.info(res);
					return res;
				}
			);
			return promise;
		};

	}
]);
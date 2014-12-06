application.service('weatherService', ['$log', 'weatherApi', 
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

application.factory('weatherApi', ['$resource', 
	function($resource){
		return $resource(
			'/api/weather/:postcode',
			{
				postcode: null
			},
			{
				getCurrent: {
					method: 'GET',
					params: {
					}
				},
				getLast: {
					method: 'GET',
					params: {
					}
				}
			}
		);
	}
]);
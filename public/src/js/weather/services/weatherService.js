angular.module('app.weather')
.service('weatherService', ['$log', 'weatherApi', 'authService',
	function($log, weatherApi, authService){

		this.getWeather = function(postcode) {
			var promise = weatherApi.getCurrent({postcode: postcode})
			.$promise
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
					return res;
				}
			);
			return promise;
		};

		this.getAll = function(limit) {
			var promise = weatherApi.query({limit:10})
			.$promise
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
					return res;
				}
			);
			return promise;
		};

	}
]);

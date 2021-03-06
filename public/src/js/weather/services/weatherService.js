angular.module('app.weather')
.service('weatherService', function($log, weatherApi, authService, $q){

		this.getWeather = function(postcode) {
			var promise = weatherApi.getCurrent()
			.$promise
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
					return $q.reject(res);
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
					return $q.reject(res);
				}
			);
			return promise;
		};

	});

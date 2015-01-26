angular.module('app.gpio')
.service('gpioService', ['$log', 'gpioApi', 'authService', '$q',
	function($log, gpioApi, authService, $q){

		this.get = function(pin) {
			var promise = gpioApi.get({pin: pin})
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

		this.set = function(pin, status) {
			var promise = gpioApi.set({pin: pin},{status: status})
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

		this.initPin = function (pins, pin, label) {
			pins[pin] = {label: label, status: false};
		};

		this.initStatus = function (opins) {
			var promise = gpioApi.get({pin: null})
			.$promise
			.then(
				function(res) {
					angular.forEach(opins, function(data, p){
						data.status = res[p].status;
					});
				},
				function (res) {
					authService.check(res);
					return $q.reject(res);
				}
			);
			return promise;
		};

	}
]);

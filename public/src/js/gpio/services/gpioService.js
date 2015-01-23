angular.module('app.gpio')
.service('gpioService', ['$log', 'gpioApi', 'authService',
	function($log, gpioApi, authService){

		this.get = function(pin) {
			var promise = gpioApi.get({pin: pin})
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

		this.set = function(pin, status) {
			var promise = gpioApi.set({pin: pin},{status: status})
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

		this.initStatus = function (opins) {
			var promise = gpioApi.get({pin: null})
			.$promise
			.then(
				function(res) {
					angular.forEach(opins, function(p){
						p.status = res[p.pin].status;
					});
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

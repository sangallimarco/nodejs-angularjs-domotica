angular.module('app.gpio')
.service('gpioService', ['$log', 'gpioApi',
	function($log, gpioApi){

		this.get = function(pin) {
			var promise = gpioApi.get({pin: pin}).$promise;
			return promise;
		};

		this.set = function(pin, status) {
			// convert to int
			status = status ? 1 : 0;

			var promise = gpioApi.set({pin: pin},{status: status}).$promise;
			return promise;
		};

		this.initStatus = function (opins) {
			var promise = gpioApi.get({pin: null}).$promise.then(
				function(res) {
					angular.forEach(opins, function(p){
						p.status = parseInt(res[p.pin].status);
					});
				}
			);
			return promise;
		};

	}
]);

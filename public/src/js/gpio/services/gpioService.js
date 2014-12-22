angular.module('app.gpio')
.service('gpioService', ['$log', 'gpioApi', 
	function($log, gpioApi){
		this.get = function(pin) {

			var promise = gpioApi.get({
				pin: pin
			});
	
			return promise;
		};

		this.set = function(pin, status) {
			// convert to int
			status = status ? 1 : 0;

			var promise = gpioApi.set({
				pin: pin,
				status: status
			});
	
			return promise;
		};

	}
]);
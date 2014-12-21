angular.module('app.gpio')
.service('gpioService', ['$log', 'gpioApi', 
	function($log, gpioApi){

		this.set = function(pin, status) {
			// convert to int
			status = status ? 1 : 0;

			var promise = gpioApi.query({
				pin: pin, 
				status: status
			}).$promise;
	
			return promise;
		};

	}
]);
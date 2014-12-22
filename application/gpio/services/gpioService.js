var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.service('GpioService', 
	function($http, $q, $gpio) {
		var scope = this,
			allowed = {
				output: [11, 12, 13, 15, 16, 18, 22, 29, 31, 32, 33, 35, 36, 37, 38 ,40],
				status: [0, 1]
			};

		scope.validatePin = function (pin) {
			return allowed.output.indexOf(pin) !== -1;
		};
		scope.validateStatus = function (status) {
			return allowed.status.indexOf(status) !== -1;
		};

		scope.get = function (pin) {
			var deferred = $q.defer();

			pin = parseInt(pin);

			if (scope.validatePin(pin)) {
				$gpio.open(pin, "input pullup", 
					function(err) {   
						if (err) {
							deferred.reject(new Error());
						} else {
							$gpio.read(pin, function(err, value) {
								$gpio.close(pin);							
								deferred.resolve(value);
							});
						} 		
					}
				); 
			} else {
				deferred.reject(new Error());
			}
			
			return deferred.promise;
		};

		scope.set = function (pin, status) {
			var deferred = $q.defer();

			pin = parseInt(pin);
			status = parseInt(status);

			if (scope.validatePin(pin) && scope.validateStatus(status)) {
				$gpio.open(pin, "output", 
					function(err) {   
						if (err) {
							deferred.reject(new Error());
						} else {
							$gpio.write(pin, status, function(err) {
								$gpio.close(pin);							
								deferred.resolve();
							});
						} 		
					}
				); 
			} else {
				deferred.reject(new Error());
			}
			
			return deferred.promise;
		};
	}
);
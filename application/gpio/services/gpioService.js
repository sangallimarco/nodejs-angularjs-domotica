var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.service('GpioService', 
	function($http, $q, $gpio) {
		var scope = this,
			allowed = {
				output: [11, 12, 13, 15, 16, 18, 22, 29, 31, 32, 33, 35, 36, 37, 38 ,40],
				status: [0, 1]
			};

		scope.validateOutput = function (pin, status) {
			return allowed.output.indexOf(pin) !== -1 && allowed.status.indexOf(pin) !== -1;
		};

		scope.get = function (pin, status) {

		};

		scope.set = function (pin, status) {
			var deferred = $q.defer();

			if (scope.validateOutput(pin, status)) {
				$gpio.open(pin, "output", 
					function(err) {   
						if (err) {
							deferred.reject(new Error());
						} else {
							$gpio.write(pin, status, function() {
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
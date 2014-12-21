var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.service('GpioService', 
	function($http, $q, $gpio) {
		var scope = this;

		scope.get = function (pin, status) {

		},
		scope.set = function (pin, status) {
			var deferred = $q.defer();

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
			
			return deferred.promise;
		};
	}
);
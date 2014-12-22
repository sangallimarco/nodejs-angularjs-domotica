var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.service('GpioService', 
	function($http, $q, $gpio) {
		var scope = this,
			available = {
				output: [11, 12, 13, 15, 16, 18, 22, 29, 31, 32, 33, 35, 36, 37, 38 ,40],
				status: [0, 1]
			},
			pins = {};

		// create pins
		available.output.forEach(function(pin){
			pins[pin] = {
				status: 0,
				exp: false,
				mode: null
			};
		});

		/**
		 * Validators
		 */
		scope.validatePin = function (pin) {
			return available.output.indexOf(pin) !== -1;
		};
		scope.validateStatus = function (status) {
			return available.status.indexOf(status) !== -1;
		};

		/**
		 * Reset all pins to 0
		 */
		scope.init = function () {
			available.output.forEach(function(pin){
				scope.set(pin, 0); // reset  pin, do not use promise
			});
		};
		scope.exit = function () {
			available.output.forEach(function(pin){
				$gpio.close(pin);
			});
		};

		/**
		 * Use pin
		 * @param  {int}   pin      
		 * @param  {string}   mode     
		 * @param  {Function} callback 
		 */
		scope.use = function (pin, mode, callback) {
			// if not exported yet
			if (!pins[pin].exp) {
				$gpio.open(pin, mode, function(err) {
					console.log('using open, pin:' + pin + ' mode:' + mode);
					if (!err) {
						pins[pin].exp = true;
						pins[pin].mode = mode;
					} 
					callback(err);
				});
			} else if (pins[pin].mode !== mode){
				$gpio.setDirection(pin, mode, function(err) {
					console.log('using setDirection, pin:' + pin + ' mode:' + mode);
					if (!err) {
						pins[pin].mode = mode;
					} 
					callback(err);
				});
			} else {
				callback(null)
			}
		};

		/**
		 * Get value
		 * @param  {int} pin 
		 * @return {promise}     
		 */
		scope.get = function (pin) {
			var deferred = $q.defer();

			pin = parseInt(pin);

			if (scope.validatePin(pin)) {
				scope.use(pin, "input pullup", 
					function(err) {   
						if (err) {
							deferred.reject(new Error());
						} else {
							$gpio.read(pin, function(err, value) {							
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

		/**
		 * Get stored status for output
		 */
		scope.status = function (pin) {
			return pins[pin].status;
		};

		/**
		 * Set pin to output and assign value
		 * @param {Int} pin    
		 * @param {Int} status 
		 */
		scope.set = function (pin, status) {
			var deferred = $q.defer();

			pin = parseInt(pin);
			status = parseInt(status);

			if (scope.validatePin(pin) && scope.validateStatus(status)) {
				scope.use(pin, "output", 
					function(err) {   
						if (err) {
							console.log('unable to export pin:' + pin);
							deferred.reject(new Error());
						} else {
							$gpio.write(pin, status, function(err) {
								pins[pin].status = status;					
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
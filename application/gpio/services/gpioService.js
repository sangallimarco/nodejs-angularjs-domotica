var pongular = require('pongular').pongular;

// https://www.npmjs.com/package/rpi-gpio
pongular.module('app.gpio')
.factory('GpioService',
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
				status: false, // output status
				mode: null
			};
		});

		// reset channels
		$gpio.destroy();

		/**
		 * Set pin direction
		 */
		function usePin(pin, mode, callback) {
			// if not exported yet
			if (pins[pin].mode !== mode) {
				$gpio.setup(pin, mode, function(err) {
					console.log('using open, pin:' + pin + ' mode:' + mode);
					if (!err) {
						pins[pin].exp = true;
						pins[pin].mode = mode;
					}
					callback(err);
				});
			} else {
				callback(null);
			}
		}

		function validatePin(pin) {
			return available.output.indexOf(pin) !== -1;
		}

		/**
		 * Factory
		 */
		return {
			read: function (pin) {
				var deferred = $q.defer();

				if (validatePin(pin)) {
					usePin(pin, $gpio.DIR_IN,
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
			},
			get: function (pin) {
				return pins[pin].status;
			},
			status: function () {
				return pins;
			},
			set: function (pin, status) {
				var deferred = $q.defer();

				pin = parseInt(pin);

				if (validatePin(pin)) {
					usePin(pin, $gpio.DIR_OUT,
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
			}
		};
	}
);

var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.factory('GpioCtrl',
	function(GpioService) {

		return {
			status: function(req, res){
				res.status(200).json(
					GpioService.status()
				);
			},
			get: function(req, res){
				var pin = parseInt(req.params.pin);

				GpioService.read(pin).then(
					function (status) {
						var data = {
							pin: pin,
							status: status
						};

						//Socket.io send immediately
						req.io.emit('gpio.changed', data);
						res.status(200).json(data);
					},
					function (ret) {
						res.status(500).json({
							error: 'invalid pin or status'
						});
					}
				);
			},
			post: function(req, res){
				var pin = parseInt(req.params.pin),
					status = req.body.status;

				GpioService.set(pin, status).then(
					function (ret) {
						var data = {
							pin: pin,
							status: status
						};

						//Socket.io send immediately
						req.io.emit('gpio.changed', data);
						res.status(200).json(data);
					},
					function (ret) {
						res.status(500).json({
							error: 'invalid pin or status'
						});
					}
				);

			}
		};
	}
);

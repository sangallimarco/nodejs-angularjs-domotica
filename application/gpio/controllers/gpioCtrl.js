var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.factory('GpioCtrl', 
	function(GpioService) {

		return {
			get: function(req, res){
				var pin = req.params.pin;

				GpioService.read(pin).then(
					function (status) {
						res.status(200).json({
							pin: pin,
							status: status
						});
					},
					function (ret) {
						res.status(500).json({
							error: 'invalid pin or status'
						});
					}
				);
			},
			post: function(req, res){
				var pin = req.params.pin,
					status = req.body.status;

				GpioService.set(pin, status).then(
					function (ret) {
						res.status(200).json({
							pin: pin,
							status: status
						});
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

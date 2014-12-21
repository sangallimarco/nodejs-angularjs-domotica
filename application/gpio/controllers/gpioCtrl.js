var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.factory('GpioCtrl', 
	function(GpioService) {
		return {
			set: function(req, res){
				var pin = req.params.pin,
					status = req.params.status;
					
				GpioService.set(pin, status).then(
					function (ret) {
						res.status(200).json({
							pin: pin,
							status: status
						});
					}
				);
				
			}
		};
	}
);

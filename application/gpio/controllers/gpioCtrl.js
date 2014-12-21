var pongular = require('pongular').pongular;

pongular.module('app.gpio')
.factory('GpioCtrl', 
	function(GpioService) {
		return {
			set: function(req, res){
				GpioService.set(req.params.pin, req.params.status).then(
					function (ret) {
						res.status(200).json({status: true});
					}
				);
				
			}
		};
	}
);

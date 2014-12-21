var pongular = require('pongular').pongular;
pongular.module('app.gpio', [])
.factory('GpioRouter', 
	function($express, GpioCtrl) {
		return $express.Router()
			.get('/api/gpio/out/:pin/:status/', GpioCtrl.set)
		;
	}
);
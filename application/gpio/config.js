var pongular = require('pongular').pongular;
pongular.module('app.gpio', [])
.factory('GpioRouter', 
	function($express, GpioCtrl) {
		return $express.Router()
			.post('/api/gpio/:pin', GpioCtrl.post)
			.get('/api/gpio/:pin', GpioCtrl.get)
		;
	}
);
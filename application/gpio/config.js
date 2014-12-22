var pongular = require('pongular').pongular;
pongular.module('app.gpio', [])
.factory('GpioRouter', 
	function($express, GpioCtrl, SocketIo, $events) {

		// listen for pins changes
		var events = new $events();
		events.on('export', function(ret){
			SocketIo.get().emit('gpio.new', {pin: ret});
		});


		return $express.Router()
			.post('/api/gpio/:pin', GpioCtrl.post)
			.get('/api/gpio/:pin', GpioCtrl.get)
		;
	}
);
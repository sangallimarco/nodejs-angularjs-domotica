var pongular = require('pongular').pongular;
pongular.module('app.cam', [])
.factory('CamRouter', 
	function($express, CamCtrl, SocketIo, $events) {

		// activate cam
		CamService.start(SocketIo.get());

		return $express.Router()
			.get('/api/cam', CamCtrl.get)
		;
	}
);
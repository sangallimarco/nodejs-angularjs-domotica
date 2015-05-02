var pongular = require('pongular').pongular;
pongular.module('app.cam', [])
.factory('CamRouter', 
	function($express, CamCtrl, CamService, $events) {

		// activate cam
		CamService.start();

		return $express.Router()
			.get('/api/cam', CamCtrl.get)
		;
	}
);
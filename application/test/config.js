var pongular = require('pongular').pongular;
pongular.module('app.test', ['app.auth'])
.factory('TestRouter',
	function($express, TestCtrl) {
		return $express.Router()
			.get('/api/test', TestCtrl.get)
			.post('/api/test', TestCtrl.post)
		;
	}
);

var pongular = require('pongular').pongular;
pongular.module('app.test', ['app.auth'])
.factory('TestRouter',
	function($express, TestCtrl) {
		return $express.Router()
			.get('/api/:hash/test', TestCtrl.get)
			.post('/api/:hash/test', TestCtrl.post)
		;
	}
);

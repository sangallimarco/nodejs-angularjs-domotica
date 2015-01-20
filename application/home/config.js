var pongular = require('pongular').pongular;
pongular.module('app.home', ['app.libs'])
.factory('HomeRouter',
	function($express, HomeCtrl) {
		return $express.Router()
			.get('/', HomeCtrl.get);
	}
);

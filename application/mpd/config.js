'use strict';

require('pongular')
.pongular.module('app.mpd', [])
.factory('MpdRouter',
	function($express, MpdCtrl) {


		return $express.Router()
			.post('/api/mpd/:command', MpdCtrl.post)
			.get('/api/mpd/:command?', MpdCtrl.get)
		;
	}
);

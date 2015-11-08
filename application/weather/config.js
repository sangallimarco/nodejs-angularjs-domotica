var pongular = require('pongular').pongular;
pongular.module('app.weather', [])
.factory('WeatherRouter',
	function($express, WeatherCtrl) {
		return $express.Router()
			.get('/api/weather', WeatherCtrl.getAll)
			.get('/api/weather/current', WeatherCtrl.get)
		;
	}
);

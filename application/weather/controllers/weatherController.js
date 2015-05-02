var pongular = require('pongular').pongular;

pongular.module('app.weather')
.factory('WeatherCtrl',
	function(WeatherService) {
		return {
			get: function(req, res){
				WeatherService.getData().then(
					function(response) {
						//Socket.io send immediately
						req.io.emit('weather.new', response);
						res.status(200).json(response);
					}
				);
			},

			getAll: function(req, res){
				WeatherService.getAll(req.query.limit).then(
					function(response) {
						//return data
						res.status(200).json(response);
					}
				);
			},

		};
	}
);

var pongular = require('pongular').pongular;

pongular.module('app.weather')
.factory('WeatherCtrl', 
	function(WeatherService) {
		return {
			get: function(req, res){
				var postcode = req.params.postcode;
				if(postcode) {
					WeatherService.getData(postcode, function(response) {
						//save data
						res.json(response);
					});
				} else {
					WeatherService.getLast(function(response) {
						//save data
						res.json(response);
					});
				}
			}
		};
	}
);

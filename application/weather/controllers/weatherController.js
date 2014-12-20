var pongular = require('pongular').pongular;

pongular.module('app.weather')
.factory('WeatherCtrl', 
	function(WeatherService) {
		return {
			get: function(req, res){
				var postcode = req.params.postcode;

				//  if postcode return current values from API
				if(postcode) {
					WeatherService.getData(postcode).then(
						function(response) {
							//Socket.io send immediately
							req.io.emit('weather.new', response);
							res.status(200).json(response);
						}
					);
				} else {
					WeatherService.getAll(req.query.limit).then(
						function(response) {
							//return data
							res.status(200).json(response);
						}
					);
				}
			},

		};
	}
);

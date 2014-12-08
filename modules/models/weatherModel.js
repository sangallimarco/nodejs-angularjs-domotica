var pongular = require('pongular').pongular;

pongular.module('nodejs').factory('WeatherModel', 
	function($mongoose) {
		var schema =  new $mongoose.Schema({
			humidity: Number,
			temp: Number,
			created: {
				type: Date, 
				default: Date.now 
			}
		});

		return $mongoose.model('Weather', schema);
	}
);
var pongular = require('pongular').pongular;
var mongoose     = require('mongoose');

pongular.module('nodejs').factory('WeatherModel', function() {
	var schema =  new mongoose.Schema({
		humidity: Number,
		temp: Number,
		created: {
			type: Date, 
			default: Date.now 
		}
	});

	return mongoose.model('Weather', schema);
});
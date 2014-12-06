var http = require('http'); 
var Weather = require('../models/weather');

function weatherService(){
	this.data = {};
};
weatherService.prototype = {
	
	getData: function(postcode, callback) {
		var scope = this;
		http.get('http://www.myweather2.com/developer/forecast.ashx?uac=.frFFHX1sj&query=' + postcode + '&output=json', function(response){
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				scope.setData(str);
				callback(scope.getWeather());
			});
		})
		.end();
	},
	
	setData: function(d) {
		this.data = JSON.parse(d);

		//save data
		if (this.data.weather) {
			var current = this.data.weather.curren_weather[0];
			var w = new Weather({
				humidity:current.humidity,
				temp: current.temp
			}); 

			w.save(function(err) {
				// no actions lazy insert
			});
		}
	},
	
	getWeather: function() {
		return this.data.weather;
	},
	
	getLast: function(callback){
		Weather
			.findOne()
			.sort({ field: 'asc', _id: -1 })
			.limit(1)
			.find(
				function(err, entity){
					if (err)
						res.send(err);
					callback(entity);
				}
			);
	}
};

module.exports = (function(){
	return new weatherService();
})();

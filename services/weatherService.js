var http = require('http'); 
var Weather = require('../models/weather');

// prototype
function weatherService(){
	this.data = {};
}

weatherService.prototype = {
	
	getData: function(postcode, callback) {
		var scope = this;
		http.get('http://www.myweather2.com/developer/forecast.ashx?uac=.frFFHX1sj&query=' + postcode + '&output=json', function(response){
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				var data = scope.setData(str);
				callback(data);
			});
		})
		.end();
	},
	
	setData: function(d) {
		var temp = JSON.parse(d),
			data = {
				humidity:0,
				temp: 0
			};

		//save data
		if (temp.weather) {
			var current = temp.weather.curren_weather[0];

			data.humidity = current.humidity;
			data.temp = current.temp;
			
			var w = new Weather(data); 
			w.save(function(err) {
				// no actions lazy insert
			});

			return data;
		}

		return {};
	},
	
	getLast: function(callback){
		var scope = this;
		Weather
			.findOne()
			.sort({ field: 'asc', _id: -1 })
			.limit(1)
			.find(
				function(err, entity){
					if (err)
						res.send(err);
					callback(
						scope.formatData(entity[0]) //format data
					);
				}
			);
	},

	formatData: function(data) {
		return {
			humidity: data.humidity,
			temp: data.temp
		};
	}

};

module.exports = (function(){
	return new weatherService();
})();

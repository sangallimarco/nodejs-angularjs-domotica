var http = require('http'); 

function weatherService(){
	var data = {};
};
weatherService.prototype = {
	getData: function(callback) {
		var scope = this;
		http.get('http://www.myweather2.com/developer/forecast.ashx?uac=.frFFHX1sj&query=w45eq&output=json', function(response){
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
		data = JSON.parse(d);
	},
	getWeather: function() {
		return data.weather;
	}
};

module.exports = (function(){
	return new weatherService();
})();

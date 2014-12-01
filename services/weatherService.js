function weatherService(){
	var data = {};
};
weatherService.prototype = {
	setData: function(d) {
		data = JSON.parse(d);
	},
	getWeather: function() {
		return data.weather;
	}
};

module.exports = weatherService;

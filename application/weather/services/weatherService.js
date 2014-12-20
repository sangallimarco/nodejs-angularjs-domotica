var pongular = require('pongular').pongular;

pongular.module('app.weather')
.service('WeatherService', 
	function($http, WeatherModel, $q) {
		var scope = this;

		scope.data = {};

		/**
		 * Get Data from API
		 * @param  String postcode
		 * @return $q
		 */
		scope.getData =  function(postcode) {
			var scope = this,
				deferred = $q.defer();
			
			$http.get('http://www.myweather2.com/developer/forecast.ashx?uac=.frFFHX1sj&query=' + postcode + '&output=json', function(response){
				var str = '';

				response.on('data', function (chunk) {
					str += chunk;
				});

				response.on('end', function () {
					var data = scope.setData(str);
					deferred.resolve(data);
				});
			})
			.end();

			return deferred.promise;
		};
		
		/**
		 * Save to db
		 * @param Object d
		 */
		scope.setData = function(d) {
			var temp = JSON.parse(d),
				data = {
					humidity:0,
					temp: 0
				};

			//save data
			if (temp.weather) {
				var current = temp.weather.curren_weather[0];

				data = {
					humidity: current.humidity,
					temp: current.temp,
					created: new Date()
				};

				// save to mongo
				WeatherModel.create(data,
					function(err){
						if (err) {
							console.log(err);
						}
					}
				); 
				return data;
			}

			return {};
		};
		
		/**
		 * Get all
		 * @return {Q} [promise]
		 */
		scope.getAll = function(limit){
			// set a default limit if undefined
			limit = limit || 5;

			var promise = WeatherModel
				.find()
				.sort({ created: -1})
				.limit(limit)
				.exec();

			return promise;
		};

	}
);
var pongular = require('pongular').pongular;

pongular.module('app.weather')
.service('WeatherService',
	function($request, WeatherModel, $q, $config, $util) {
		var scope = this;

		scope.data = {};

		/**
		 * Get Data from API
		 * @param  String postcode
		 * @return $q
		 */
		scope.getData =  function() {
			var scope = this,
				url = $config.get('weather.url');
				deferred = $q.defer();

			$request(url, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					var data = scope.setData(body);
					deferred.resolve(data);
				}

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
			// https://api.forecast.io/forecast/dbc03034b28dc9a934d3725985f7b8c0/51.495352,-0.2672948
			if (temp.currently) {
				data = {
					humidity: temp.currently.humidity * 100,
					temp: ((temp.currently.temperature - 32) * (5 / 9)).toFixed(1),
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

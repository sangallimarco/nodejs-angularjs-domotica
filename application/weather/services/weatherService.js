var pongular = require('pongular').pongular;

pongular.module('app.weather')
.service('WeatherService',
	function($http, WeatherModel, $q, $config, $util) {
		var scope = this;

		scope.data = {};

		/**
		 * Get Data from API
		 * @param  String postcode
		 * @return $q
		 */
		scope.getData =  function(postcode) {
			var scope = this,
				url = $util.format($config.get('weather.url'), postcode),
				deferred = $q.defer();

			$http.get(url, function(response){
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
			if (temp.main) {
				var current = temp.main;

				data = {
					humidity: current.humidity,
					temp: (current.temp - 273.15).toFixed(1),
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

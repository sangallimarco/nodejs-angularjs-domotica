angular.module('app.weather')
.factory('weatherApi', function($resource){
		return $resource(
			'/api/weather/:postcode',
			{
				postcode: '@postcode'
			},
			{
				getCurrent: {
					method: 'GET',
					params: {
					}
				}
			}
		);
	});
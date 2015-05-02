angular.module('app.weather')
.factory('weatherApi', function($resource){
		return $resource(
			'/api/weather/:action',
			{
				// postcode: '@postcode'
			},
			{
				getCurrent: {
					method: 'GET',
					params: {
						action: 'current'
					}
				}
			}
		);
	});

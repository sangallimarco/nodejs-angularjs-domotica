angular.module('app.weather')
.factory('weatherApi', ['$resource', 
	function($resource){
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
	}
]);
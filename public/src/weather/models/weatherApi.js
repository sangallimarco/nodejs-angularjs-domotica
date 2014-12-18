angular.module('app.weather')
.factory('weatherApi', ['$resource', 
	function($resource){
		return $resource(
			'/api/weather/:postcode',
			{
				postcode: null
			},
			{
				getCurrent: {
					method: 'GET',
					params: {
					}
				},
				getLast: {
					method: 'GET',
					params: {
					}
				}
			}
		);
	}
]);
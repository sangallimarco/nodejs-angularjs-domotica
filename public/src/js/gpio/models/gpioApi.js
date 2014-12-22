angular.module('app.gpio')
.factory('gpioApi', ['$resource', 
	function($resource){
		return $resource(
			'/api/gpio/:pin',
			{
			},
			{
				set: {
					method: 'POST'
				}
			}
		);
	}
]);
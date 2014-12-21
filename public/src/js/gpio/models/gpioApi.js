angular.module('app.gpio')
.factory('gpioApi', ['$resource', 
	function($resource){
		return $resource(
			'/api/gpio/:direction/:pin/:status',
			{
				direction: 'out',
				pin: '@pin',
				status: '@status'
			}
		);
	}
]);
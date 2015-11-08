angular.module('app.gpio')
.factory('gpioApi', function($resource){
		return $resource(
			'/api/gpio/:pin',
			{
				pin: '@pin'
			},
			{
				set: {
					method: 'POST'
				}
			}
		);
	});

angular.module('app.weather', 
	[
		'ngResource',
		'app.socket'
	]
)
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/weather', {
			templateUrl: 'partials/weather/index.html',
			controller: 'weatherController'
		});
	}
]);
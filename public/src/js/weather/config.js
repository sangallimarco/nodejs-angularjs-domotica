angular.module('app.weather', 
	[
		'ngResource',
		'ui.router',
		'app.socket'
	]
)
.config(['$stateProvider',
	function ($stateProvider) {
		$stateProvider
		.state('app.weather', {
			url:'/weather/:postcode',
			templateUrl: 'partials/weather/index.html',
			controller: 'weatherController'
		});
	}
]);
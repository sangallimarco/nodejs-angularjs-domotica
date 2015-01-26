angular.module('app.gpio', 
	[
		'ngResource',
		'ui.router',
		'app.socket'
	]
)
.config(function ($stateProvider) {

		$stateProvider
		.state('app.gpio', {
			url:'/gpio',
			templateUrl: 'partials/gpio/index.html',
			controller: 'gpioController'
		});
	});
angular.module('app.gpio', 
	[
		'ngResource',
		'ui.router',
		'app.socket'
	]
)
.config(['$stateProvider',
	function ($stateProvider) {

		$stateProvider
		.state('app.gpio', {
			url:'/gpio',
			templateUrl: 'partials/test/gpio.html',
			controller: 'gpioController'
		});
	}
]);
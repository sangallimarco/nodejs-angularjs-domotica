angular.module('app.test', 
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
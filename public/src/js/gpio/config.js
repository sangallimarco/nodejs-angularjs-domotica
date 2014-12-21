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
			templateUrl: 'partials/gpio/index.html',
			controller: 'gpioController'
		});
	}
]);
angular.module('app', 
	[
		'ui.router',
		'app.bootstrap',
		'app.home',
		'app.test',
		'app.weather'
	]
)
.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("/");

		$stateProvider
		.state('app', {
			url:'/',
			templateUrl: 'partials/app/index.html',
		});

	}
]);
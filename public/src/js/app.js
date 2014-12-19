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

		$urlRouterProvider.otherwise("/app");

		$stateProvider
		.state('app', {
			url:'/app',
			templateUrl: 'partials/app/index.html',
		});

	}
]);
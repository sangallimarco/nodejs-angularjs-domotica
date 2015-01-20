angular.module('app',
	[
		'ngStorage',
		'ui.router',
		'mgcrea.ngStrap',
		'app.auth',
		'app.bootstrap',
		'app.navigation',
		'app.home',
		'app.test',
		'app.weather',
		'app.gpio',
		'app.cam'
	]
)
.config(['$compileProvider', '$logProvider', '$stateProvider', '$urlRouterProvider',
	function ($compileProvider, $logProvider, $stateProvider, $urlRouterProvider) {

		// dev/production
		$compileProvider.debugInfoEnabled(true);
		$logProvider.debugEnabled(true);

		$urlRouterProvider.otherwise("/app");

		$stateProvider
		.state('app', {
			url:'/app',
			templateUrl: 'partials/app/index.html',
			controller: 'navigationController'
		});

	}
]);

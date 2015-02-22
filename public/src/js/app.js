'use strict';

angular.module('app',
	[
		'ngStorage',
		'ui.router',
		'ui.bootstrap',
		'chart.js',
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
.config(function ($compileProvider, $logProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

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

		$httpProvider.interceptors.push('authInterceptor');

	});

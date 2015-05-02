angular.module('app.cam', 
	[
		'ngResource',
		'ui.router',
		'app.socket'
	]
)
.config(function ($stateProvider) {

		$stateProvider
		.state('app.cam', {
			url:'/cam',
			templateUrl: 'partials/cam/index.html',
			controller: 'camController'
		});
	});
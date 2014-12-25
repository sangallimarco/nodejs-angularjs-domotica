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
		.state('app.cam', {
			url:'/cam',
			templateUrl: 'partials/cam/index.html',
			controller: 'camController'
		});
	}
]);
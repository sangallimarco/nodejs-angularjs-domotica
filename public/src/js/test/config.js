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
		.state('app.test', {
			url:'/test',
			templateUrl: 'partials/test/index.html',
			controller: 'testController'
		});
	}
]);

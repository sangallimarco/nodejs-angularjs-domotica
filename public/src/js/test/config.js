angular.module('app.test', 
	[
		'ngResource',
		'app.socket'
	]
)
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/test', {
			templateUrl: 'partials/test/index.html',
			controller: 'testController'
		});
	}
]);
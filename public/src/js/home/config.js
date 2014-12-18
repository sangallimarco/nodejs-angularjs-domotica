angular.module('app.home', 
	[
		'ngRoute'
	]
)
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/home', {
			templateUrl: 'partials/home/index.html',
			controller: 'homeController'
		});
	}
]);
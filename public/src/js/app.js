angular.module('app', 
	[
		'ngRoute',
		'app.home',
		'app.test',
		'app.weather'
	]
)
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.otherwise({
			redirectTo: '/home'
		});
	}
]);
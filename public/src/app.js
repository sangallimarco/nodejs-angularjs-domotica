angular.module('app', 
	[
		'ngRoute',
		'app.home',
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
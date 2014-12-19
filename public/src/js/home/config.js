angular.module('app.home', 
	[
		'ui.router'
	]
)
.config(['$stateProvider',
	function ($stateProvider) {
		$stateProvider
		.state('app.home', {
			url:'/home',
			templateUrl: 'partials/home/index.html',
			controller: 'homeController'
		});
	}
]);
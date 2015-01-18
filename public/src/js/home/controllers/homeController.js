angular.module('app.home')
.controller('homeController', ['$scope', '$log', 'authService',
	function($scope, $log, authService) {
		$scope.user = authService.getUser();
	}
]);

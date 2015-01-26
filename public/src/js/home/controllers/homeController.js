angular.module('app.home')
.controller('homeController',
	function($scope, $log, authService) {
		$scope.user = authService.getUser();
	}
);

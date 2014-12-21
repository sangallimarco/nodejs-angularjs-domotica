angular.module('app.gpio')
.directive('switchButton', [
	function () {
		return {
			template: '<button class="btn btn-primary btn-lg" ng-class="{active: status}" ng-click="toggle()">{{label}}</button>',
			replace: true,
			restrict: 'E',
			scope: {
				label: '@',
				pin: '@',
				status: '=',
				callback: '=' // use reference to function
			},
			controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

				$scope.toggle = function () {
					$scope.status = $scope.status ? 0 : 1;

					// can use watch on controller
					$scope.callback($scope.pin, $scope.status);
				};

			}]
		};
	}
]);

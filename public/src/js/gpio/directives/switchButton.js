angular.module('app.gpio')
.directive('switchButton', [
	function () {
		return {
			template: '<div><div class="btn-group" role="group"> <button type="button" ng-class="{active: !status, \'btn-danger\':!status}" class="btn" ng-click="toggle(0)">Off</button> <button type="button" class="btn" ng-class="{active: status, \'btn-success\': status}" ng-click="toggle(1)">On</button></div> <span>{{label}}</span> </div>',
			// template: '<button class="btn btn-primary btn-lg" ng-class="{active: status}" ng-click="toggle()"></button>',
			replace: true,
			restrict: 'E',
			scope: {
				label: '@',
				pin: '@',
				status: '=',
				callback: '=' // use reference to function
			},
			controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

				$scope.toggle = function (status) {
					// $scope.status = $scope.status ? 0 : 1;
					$scope.status = status;

					// can use watch on controller
					$scope.callback($scope.pin, $scope.status);
				};

			}]
		};
	}
]);

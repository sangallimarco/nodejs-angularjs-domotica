angular.module('app.gpio')
.directive('switchButton', ['gpioService',
	function (gpioService) {
		return {
			template: '<div><div class="btn-group" role="group"> <button type="button" ng-class="{active: !status, \'btn-danger\':!status}" class="btn" ng-click="toggle(0)">Off</button> <button type="button" class="btn" ng-class="{active: status, \'btn-success\': status}" ng-click="toggle(1)">On</button></div> <span>{{label}}</span> </div>',
			replace: true,
			restrict: 'E',
			scope: {
				label: '@',
				pin: '@',
				status: '=',
				callback: '=' // use reference to function
			},
			link: function (scope, element, attrs) {

				scope.toggle = function (status) {
					// scope.status = scope.status ? 0 : 1;
					var ostatus = status;
					scope.status = status;

					gpioService.set(scope.pin, scope.status)
					.then(
						function(obj) {
							scope.error = null;
						},
						function(err) {
							scope.error = err.data.error;
							scope.status = ostatus;
						}
					);
				};

			}
		};
	}
]);

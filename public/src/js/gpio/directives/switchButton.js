angular.module('app.gpio')
.directive('switchButton', ['gpioService',
	function (gpioService) {
		return {
			template: '<label>'+
							'<div class="switch" ng-class="{checked: status}" ng-click="toggle()">'+
								'<small></small>'+
							'</div>'+
							'<span class="switch-label">{{label}}</span>'+
						'</label>',
			replace: true,
			restrict: 'E',
			scope: {
				label: '@',
				pin: '@',
				status: '='
			},
			link: function (scope, element, attrs) {

				scope.toggle = function () {
					var ostatus = scope.status;
					scope.status = !scope.status;

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

angular.module('app.bootstrap')
.directive('formGroup', [
	function () {
		return {
			template: '<div class="has-feedback form-group" ng-class="{\'has-success\':  $field.$valid && !$field.$forceInvalid && $field.$dirty && $field.$timedout, \'has-error\': ($field.$forceInvalid && $field.$timedout) || ($field.$invalid && $field.$dirty && $field.$timedout)}"><label for=\"{{inputId}}\">{{label}}</label><div ng-transclude class=""></div><p class="help-block" ng-show="(($field.$forceInvalid && $field.$timedout) || ($field.$invalid && $field.$dirty && $field.$timedout)) && help !== undefined">{{help}}</p></div>',
			replace: true,
			restrict: 'E',
			transclude: true,
			scope: {
				help: '@',
				label: '@'
			},
			controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
				this.setField = function (field, id) {
					$scope.$field = field;
					$scope.inputId = id;
				};
			}]
		};
	}
]);

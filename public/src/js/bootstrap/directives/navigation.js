angular.module('app.bootstrap')
/**
 * Page canvas
 */
.directive('navigationCanvas', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="canvas" ng-class="{open: show}" ng-transclude></div>',
        link: function (scope, element, attrs) {
            scope.show = false;

            scope.$on('menuToggle',
                function(event, data){
                    scope.show = data.status;
                }
            );
        }
    };
})
/**
 * Navigation container
 * bind variable to show/hide menu
 */
.directive('navigationContainer', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div ng-class="{open: !show}" id="navbar" class="navbar-collapse slide-right collapse"><ul class="nav navbar-nav" ng-transclude></ul></div>',
        scope: {
            show: '='
        },
        transclude: true,
        link: function (scope, element, attrs) {

            scope.$on('menuToggle',
                function(event, data){
                    scope.show = data.status;
                }
            );

            // watch variable
            scope.$watch('show', function(value){
                scope.$emit('menuToggle', {status: value});
            });
        }
    };
})
/**
 * Navigation Item
 * Force menu to close once selected
 */
.directive('navigationItem', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<li ui-sref-active="active"><a ng-click="collapse()" ui-sref="{{state}}">{{label}}</a></li>',
        scope: {
            state: '@state',
            label: '@label'
        },
        link: function (scope, element, attrs) {

            scope.collapse = function () {
                scope.$emit('menuToggle', {status: false});
            };
        }
    };
})
;

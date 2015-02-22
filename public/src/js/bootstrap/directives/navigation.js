angular.module('app.bootstrap')
.factory('NavigationManager', function(){
    function factory(){
        this.listeners = [];

        this.onChange = function(listener) {
            this.listeners.push(listener);

        };
        this.setValue = function(value) {
            angular.forEach(this.listeners, function(listener){
                listener(value);
            })
        }
    }

    return new factory();
})
/**
 * Page canvas
 */
.directive('navigationCanvas', function (NavigationManager) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="canvas" ng-class="{open: show}" ng-transclude></div>',
        link: function (scope, element, attrs) {
            scope.show = false;

            NavigationManager.onChange(
                function(value){
                    scope.show = value;
                }
            );
        }
    };
})
/**
 * Navigation container
 * bind variable to show/hide menu
 */
.directive('navigationContainer', function (NavigationManager) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div ng-class="{open: !show}" id="navbar" class="navbar-collapse slide-right collapse"><ul class="nav navbar-nav" ng-transclude></ul></div>',
        scope: {
            show: '='
        },
        transclude: true,
        link: function (scope, element, attrs) {

            NavigationManager.onChange(
                function(value){
                    // prevent digest
                    if (scope.show !== value) {
                        scope.show = value;
                    }
                }
            );

            // watch variable
            scope.$watch('show', function(value){
                NavigationManager.setValue(value);
            });
        }
    };
})
/**
 * Navigation Item
 * Force menu to close once selected
 */
.directive('navigationItem', function (NavigationManager) {
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
                NavigationManager.setValue(false);
            };
        }
    };
})
;

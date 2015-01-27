angular.module('app.bootstrap')
    .directive('navigationContainer', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div ng-class="{open: !collapsed}" id="navbar" class="navbar-collapse slide-down"><ul class="nav navbar-nav" ng-transclude></ul></div>',
            scope: {
                collapsed: '=collapsed'
            },
            transclude: true,
            controller: function ($scope, $element, $attrs) {
                this.collapse = function () {
                    $scope.collapsed = true;
                };
            }
        };
    })
    .directive('navigationItem', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<li ui-sref-active="active"><a ng-click="collapse()" ui-sref="{{state}}">{{label}}</a></li>',
            require:['^navigationContainer'],
            scope: {
                state: '@state',
                label: '@label'
            },
            link: function (scope, element, attrs, ctrls) {
                var navigation = ctrls[0];

                scope.collapse = function () {
                    navigation.collapse();
                };
            }
        };
    });
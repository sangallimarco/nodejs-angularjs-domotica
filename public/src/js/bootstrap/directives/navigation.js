angular.module('app.bootstrap')
    .directive('navigationContainer', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div ng-class="{open: !collapsed}" id="navbar" class="navbar-collapse slide-down collapse"><ul class="nav navbar-nav" ng-transclude></ul></div>',
            scope: {
                collapsed: '=collapsed'
            },
            transclude: true,
            controller: function ($scope, $element, $attrs) {
                var self = this;

                self.toggle = function (status) {
                    // use status to force it!!!
                    $scope.collapsed = status !== undefined ? status : !$scope.collapsed;

                    $rootScope.$broadcast('menuToggle',{collapsed: $scope.collapsed});

                };

                $scope.$watch('collapsed',
                    function(newValue, oldValue){
                        if (newValue !== undefined) {
                            self.toggle(newValue);
                        }
                    }
                );
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
                    navigation.toggle(true);

                };
            }
        };
    })
    .directive('navigationCanvas', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="canvas" ng-class="{open: !collapsed}" ng-transclude></div>',
            link: function (scope, element, attrs) {
                scope.collapsed = true;

                $rootScope.$on('menuToggle', function(event, data){
                    scope.collapsed = data.collapsed;
                });
            }
        };
    });

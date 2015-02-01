angular.module('app.bootstrap')
    .directive('watcher', function ($rootScope, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div ng-class="{on: updated}" class="watcher" ng-transclude></div>',
            scope: {
                bindModel: '=ngModel'
            },
            transclude: true,
            link: function (scope, element, attrs) {
                var fx = new Audio('/public/sounds/alert.mp3');

                scope.updated = false;

                scope.$watch('bindModel', function (val) {
                    if (!scope.updated && val) {
                        scope.updated = true;

                        //play sound
                        fx.play();

                        // reset
                        $timeout(function () {
                            scope.updated = false;
                        }, 1000);
                    }
                });
            }
        };
    })
;
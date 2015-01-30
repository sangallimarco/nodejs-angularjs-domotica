angular.module('app.navigation')
    .controller('navigationController', function ($scope, $log, $state, onewireService) {

        $scope.showNav = true;
        $scope.temp = '';

        $scope.toggle = function () {
            $scope.showNav = !$scope.showNav;
        };

        onewireService.get().then(
            function (ret) {
                $scope.temp = ret.value;
            }
        );
    });

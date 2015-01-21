angular.module('app.navigation')
.controller('navigationController', ['$scope', '$log', '$state',
    function($scope, $log, state) {
        
        $scope.showNav = true;

        $scope.toggle = function(){
            $scope.showNav = !$scope.showNav;
        };
    }
]);

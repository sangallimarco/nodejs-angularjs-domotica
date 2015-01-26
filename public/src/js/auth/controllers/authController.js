angular.module('app.auth')
.controller('authController', function($scope, $log, authService, $state) {

    $scope.data = {
        username: '',
        password: ''
    };

    $scope.submit = function(){
        authService.login(
            $scope.data.username,
            $scope.data.password
        ).then(
            function(ret){
                $state.go('app.home');
            }
        );
    };
});

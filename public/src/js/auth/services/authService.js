angular.module('app.auth')
.service('authService', ['$log', 'authApi', '$localStorage',
function($log, authApi, $localStorage){

    this.login = function(name, password) {

        var user = new authApi();
        user.name = name;
        user.password = password;

        var promise = user.$save();
        // .$promise;

        promise.then(
            function(res) {
                $localStorage.user = res;
                return res;
            }
        );

        return promise;
    };

    this.getHash = function(){
        return $localStorage.user.hash;
    };
    this.getUser = function(){
        return $localStorage.user.name;
    };

}
]);

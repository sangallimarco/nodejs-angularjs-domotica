angular.module('app.auth')
.service('authService', ['$log', 'authApi', '$localStorage', '$state', 'jwtHelper',
    function($log, authApi, $localStorage, $state, jwtHelper){

        this.login = function(name, password) {

            var user = new authApi();
            user.name = name;
            user.password = password;

            var promise = user.$save();
            promise.then(
                function(res) {
                    $localStorage.token = res.token;
                    return res;
                }
            );

            return promise;
        };

        // used from APIs
        this.getToken = function(){
            if (!$localStorage.token) {
                this.logout();
                return null;
            }
            return $localStorage.token;
        };

        this.getUser = function(){
            if (!$localStorage.token) {
                this.logout();
                return null;
            }
            return jwtHelper.decodeToken($localStorage.token);
        };

        // test if a hash is already stored
        this.loginRequired = function(){
            if (!this.getToken()) {
                this.logout();
            }
        };

        this.logout = function(){
            delete $localStorage.token;
            $state.go('app.auth');
        };

    }
]);

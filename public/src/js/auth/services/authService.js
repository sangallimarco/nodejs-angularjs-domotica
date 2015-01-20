angular.module('app.auth')
.service('authService', ['$log', 'authApi', '$localStorage', '$state',
    function($log, authApi, $localStorage, $state){

        this.login = function(name, password) {

            var user = new authApi();
            user.name = name;
            user.password = password;

            var promise = user.$save();
            promise.then(
                function(res) {
                    $localStorage.user = res;
                    return res;
                }
            );

            return promise;
        };

        // used from APIs
        this.getHash = function(){
            if (!$localStorage.user) {
                this.logout();
                return null;
            }
            return $localStorage.user.hash;
        };

        this.getUser = function(){
            if (!$localStorage.user) {
                this.logout();
                return null;
            }
            return $localStorage.user;
        };

        // test if a hash is already stored
        this.loginRequired = function(){
            if (!this.getHash()) {
                this.logout();
            }
        };

        this.logout = function(){
            delete $localStorage.user;
            $state.go('app.auth');
        };

    }
]);

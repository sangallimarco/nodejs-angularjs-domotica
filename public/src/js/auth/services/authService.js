angular.module('app.auth')
.service('authService', ['$rootScope', 'authApi', '$localStorage', '$state', 'jwtHelper',
    function($rootScope, authApi, $localStorage, $state, jwtHelper){

        this.login = function(name, password) {

            var user = new authApi();
            user.name = name;
            user.password = password;

            var promise = user.$save();
            promise.then(
                function(res) {
                    $localStorage.token = res.token;
                    $rootScope.$broadcast('$authChanged', res);
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

        // test if a hash is already stored or is invalid
        this.check = function(response){
            if (!this.getToken() || response.status === 401) {
                this.logout();
            }
        };

        this.logout = function(){
            delete $localStorage.token;
            $state.go('app.auth');
        };

    }
]);

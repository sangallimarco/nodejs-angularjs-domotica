angular.module('app.auth')
.factory('authApi', function($resource){
    return $resource(
        '/auth/login',
    {
        hash: '@hash'
    }
);
});

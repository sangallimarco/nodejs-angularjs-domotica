angular.module('app.auth')
.factory('authApi', ['$resource',
function($resource){
    return $resource(
        '/api/auth/login',
    {
        hash: '@hash'
    }
);
}
]);

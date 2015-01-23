angular.module('app.auth')
.factory('authApi', ['$resource',
function($resource){
    return $resource(
        '/auth/login',
    {
        hash: '@hash'
    }
);
}
]);

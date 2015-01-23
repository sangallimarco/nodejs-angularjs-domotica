angular.module('app.auth')
.factory('authInterceptor', ['$rootScope','$q','$localStorage',
function ($rootScope, $q, $localStorage) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            var token = $localStorage.token;
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                //
            }
            return response || $q.when(response);
        }
    };
}
])
;

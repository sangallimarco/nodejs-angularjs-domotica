angular.module('app.auth',
                [
                    'ui.router',
                    'angular-jwt'
                ]
)
.config(function ($stateProvider) {
    $stateProvider
    .state('app.auth', {
        url:'/auth',
        templateUrl: 'partials/auth/index.html',
        controller: 'authController'
    });
});

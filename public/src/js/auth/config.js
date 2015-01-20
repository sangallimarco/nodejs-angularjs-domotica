angular.module('app.auth',
[
'ui.router'
]
)
.config(['$stateProvider',
function ($stateProvider) {
    $stateProvider
    .state('app.auth', {
        url:'/auth',
        templateUrl: 'partials/auth/index.html',
        controller: 'authController'
    });
}
]);

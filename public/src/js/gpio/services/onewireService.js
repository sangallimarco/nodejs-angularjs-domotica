angular.module('app.gpio')
    .service('onewireService', function($log, onewireApi, authService, $q){

        this.get = function(pin) {
            var promise = onewireApi.get()
                .$promise
                .then(
                function (res) {
                    return res;
                },
                function (res) {
                    authService.check(res);
                    return $q.reject(res);
                }
            );
            return promise;
        };

    });

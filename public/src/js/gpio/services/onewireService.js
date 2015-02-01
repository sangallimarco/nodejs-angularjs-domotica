angular.module('app.gpio')
    .service('onewireService', function ($log, onewireApi, authService, $q) {
        var self = this;

        self.get = function (pin) {
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

        self.history = function (pin) {
            var promise = onewireApi.query({id: 'all'})
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

        self.buildChartData = function (data) {
            var result = {
                labels: [],
                values: []
            };
            angular.forEach(data, function (obj) {
                result.labels.push(obj.created);
                result.values.push(self.formatTemp(obj.value));
            });

            return result;
        };

        self.formatTemp = function (value) {
            return (value / 1000).toFixed(1);
        };

    });

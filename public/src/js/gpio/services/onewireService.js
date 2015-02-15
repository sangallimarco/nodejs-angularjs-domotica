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

        self.history = function (from, to, limit) {
            var promise = onewireApi.query(
                {
                    id: 'all',
                    from: from.getTime(),
                    to: to.getTime(),
                    limit: limit
                }
            )
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
                var d = new Date(obj.created),
                    formattedDate = d.toLocaleDateString() + ' ' + d.getUTCHours()
                    ;

                result.labels.push(formattedDate);
                result.values.push(self.formatTemp(obj.value));
            });

            return result;
        };

        self.formatTemp = function (value) {
            return (value / 1000).toFixed(1);
        };

    });

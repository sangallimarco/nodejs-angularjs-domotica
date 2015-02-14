angular.module('app.gpio')
    .controller('tempChartController', function ($scope, $log, onewireService, socketIoFactory) {
        $scope.history = {
            labels: [],
            values: [],
            series: ['T']
        };

        // filters
        $scope.filters = {
            limit: 500,
            from: new Date(
                new Date().getTime() - (1 * 24 * 60 * 60 * 1000)
            )
        };

        /**
         * Get temperature
         */
        onewireService.history($scope.filters.from, $scope.filters.limit).then(
            function (ret) {
                var data = onewireService.buildChartData(ret);
                $scope.history.labels = data.labels;
                $scope.history.values = [data.values];
            }
        );

        socketIoFactory.on('onewire.changed', function (obj) {
            var v = onewireService.formatTemp(obj.value);
            //inject into history
            if ($scope.history.values.length > 0) {
                $scope.history.labels.push(new Date().toISOString());
                $scope.history.values[0].push(v);
            }
        });
    });

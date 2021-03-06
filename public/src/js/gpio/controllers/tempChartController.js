angular.module('app.gpio')
    .controller('tempChartController', function ($scope, $log, onewireService, socketIoFactory, moment) {
        $scope.history = {
            labels: [],
            values: [],
            series: ['T']
        };

        // filters
        $scope.filters = {
            limit: 1000,
            from: moment().startOf('hour').subtract(1, 'day').toDate(),
            to: moment().startOf('hour').toDate()
        };

        /**
         * Get temperature
         */
        $scope.search = function () {
            onewireService.history($scope.filters.from, $scope.filters.to, $scope.filters.limit).then(
                function (ret) {
                    var data = onewireService.buildChartData(ret);
                    $scope.history.labels = data.labels;
                    $scope.history.values = [data.values];
                }
            );
        };
        $scope.search();

        // socketIoFactory.on('onewire.changed', function (obj) {
        //     var v = onewireService.formatTemp(obj.value);
        //     //inject into history
        //     if ($scope.history.values.length > 0) {
        //         $scope.history.labels.push(new Date().toISOString());
        //         $scope.history.values[0].push(v);
        //     }
        // });
    });

angular.module('app.gpio')
    .controller('tempChartController', function ($scope, $log, onewireService, socketIoFactory) {
        $scope.history = {
            labels: [],
            values: [],
            series: ['T']
        };
        $scope.filters = {
            limit: 30,
            date: new Date()
        };

        /**
         * Get temperature
         */
        onewireService.history($scope.filters).then(
            function (ret) {
                var data = onewireService.buildChartData(ret);
                $scope.history.labels = data.labels;
                $scope.history.values = [data.values];
            }
        );

        socketIoFactory.on('onewire.changed', function (obj) {
            var v = onewireService.formatTemp(obj.value);
            //inject into history
            $scope.history.labels.unshift(new Date().toISOString());
            $scope.history.values[0].unshift(v);
        });
    });

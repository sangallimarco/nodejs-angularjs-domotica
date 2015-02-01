angular.module('app.gpio')
    .controller('gpioController', function ($scope, $log, gpioService, onewireService, socketIoFactory) {
        $scope.title = 'Loaded!';
        $scope.temp = '--';
        $scope.history = {
            labels: [],
            values: [],
            series: ['T']
        };

        // init switches
        $scope.switches = {};
        gpioService.initPin($scope.switches, 11, 'Pin 11');
        gpioService.initPin($scope.switches, 12, 'Pin 12');

        $scope.error = null;

        /**
         * Init pins
         */
        gpioService.initStatus($scope.switches);

        /**
         * Get temperature
         */
        onewireService.history().then(
            function (ret) {
                $scope.temp = onewireService.formatTemp(ret[0].value);

                var data = onewireService.buildChartData(ret);
                $scope.history.labels = data.labels;
                $scope.history.values = [data.values];
            }
        );

        //socket.io
        socketIoFactory.on('gpio.changed', function (obj) {
            $scope.switches[obj.pin].status = obj.status;
        });
        socketIoFactory.on('onewire.changed', function (obj) {
            var v = onewireService.formatTemp(obj.value);

            $scope.temp = v;
            //inject into history
            $scope.history.labels.unshift(new Date().toISOString());
            $scope.history.values[0].unshift(v);
        });
    });

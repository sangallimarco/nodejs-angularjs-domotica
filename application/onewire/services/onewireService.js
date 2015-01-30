var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('OnewireService',
    function($http, $q, $fs, $config) {
        var scope = this,
            sensor = '/sys/bus/w1/devices/' + $config.get('onewire.temp') + '/w1_slave'
            ;

        /**
         * Factory
         */
        var factory = {};

        factory.read = function () {
            var deferred = $q.defer();

            $fs.readFile(sensor, 'utf8', function(err, data) {
                if (err) {
                    deferred.reject('Unable to open file');
                }

                var matches = data.match(/t=([0-9]+)/);
                if (!matches) {
                    deferred.reject('Error While Reading');
                }
                deferred.resolve(parseInt(matches[1]) / 1000);
            });
            return deferred.promise;
        };

        return factory;
    }
);

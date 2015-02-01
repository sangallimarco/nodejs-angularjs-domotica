var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('OnewireService',
    function ($http, $q, $fs, $config, $events, $util) {
        var self = this,
            pollFrequency = 5000,
            sensor = $config.get('onewire.temp');


        function Onewire() {

            var self = this;

            self.temperature = 0;

            /**
             * read value
             * @returns {promise}
             */
            self.read = function () {
                var deferred = $q.defer();

                $fs.readFile(sensor, 'utf8', function (err, data) {
                    if (err) {
                        deferred.reject('Unable to open file');
                    }

                    var matches = data.match(/t=([0-9]+)/);
                    if (!matches) {
                        deferred.reject('Error While Reading');
                    }

                    var temp = (parseInt(matches[1]) / 1000).toFixed(1);
                    deferred.resolve(temp);
                });
                return deferred.promise;
            };

            self.init = function () {
                setInterval(
                    function () {
                        self.read().then(
                            function (ret) {
                                if (ret !== self.temperature) {
                                    self.temperature = ret;
                                    self.emit('change', ret);
                                }
                            }
                        );
                    },
                    pollFrequency
                );
            };

            $events.call(self);
        }

        $util.inherits(Onewire, $events);

        /**
         * Factory
         */
        var factory = new Onewire();
        factory.init();
        return factory;
    }
);

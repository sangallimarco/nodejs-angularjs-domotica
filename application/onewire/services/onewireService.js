var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('OnewireService',
    function($http, $q, $fs, $config, $events, $util) {
        var self = this,
            pollFrequency = 2000,
            sensor = $config.get('onewire.temp');


        function Onewire(){

            var self = this;

            /**
             * read value
             * @returns {promise}
             */
            self.read = function() {
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

            self.init = function () {
                $fs.watch(
                    sensor,
                    {
                        persistent: true,
                        interval: pollFrequency
                    },
                    function(current, previous) {
                        self.read().then(
                            function (ret) {
                                self.emit('change', ret);
                            }
                        );
                    }
                );
            }

            $events.call(self);
            //self.reset();
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

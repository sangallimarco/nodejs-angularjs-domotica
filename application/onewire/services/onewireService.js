var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('OnewireService',
    function ($http, $q, $fs, $config, $events, $util, TempModel) {
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

                    var temp = parseInt(matches[1], 10);
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

                                    // log to DB
                                    TempModel.create(
                                        {
                                            value: ret
                                        },
                                        function (err) {

                                        }
                                    );

                                    self.emit('change', ret);
                                }
                            }
                        );
                    },
                    pollFrequency
                );
            };

            self.getAll = function (limit) {
                var promise = TempModel.find()
                    .sort({created: -1})
                    .limit(limit)
                    .exec();
                return promise;
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

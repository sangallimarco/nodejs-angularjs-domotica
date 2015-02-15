var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('OnewireService',
    function ($http, $q, $fs, $config, $events, $util, TempModel) {
        var self = this,
            pollFrequency = 5000,
            sensor = $config.get('onewire.temp'),
            minTemp = $config.get('onewire.min_temp'),
            maxTemp = $config.get('onewire.max_temp')
            ;


        function Onewire() {

            var self = this;

            self.temperature = 0;

            self.getGpioStatus = function () {
                if (self.temperature < minTemp) {
                    return true;
                } else if (self.temperature > maxTemp) {
                    return false;
                }
                return undefined;
            };

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

            self.getAll = function (from, to, limit) {
                var deferred = $q.defer();
                TempModel.aggregate(
                    [
                        {
                            $match: {
                                created: {
                                    $gte: from,
                                    $lte: to

                                }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    y: {$year: "$created"},
                                    m: {$month: "$created"},
                                    d: {$dayOfMonth: "$created"},
                                    h: {$hour: "$created"}
                                },
                                value: {$avg:'$value'},
                                created : { $first : '$created' }
                            }
                        } ,
                        {
                            $sort:{
                                '_id.y': -1,
                                '_id.m': -1,
                                '_id.d': -1,
                                '_id.h': -1
                            }
                        },
                        {
                            $limit : limit
                        }
                    ],
                    function(err, res){
                        if (err) {
                            deferred.reject(res);
                        } else {
                            deferred.resolve(res);
                        }
                    }
                );
                return deferred.promise;
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

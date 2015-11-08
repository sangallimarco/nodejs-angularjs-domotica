var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('OnewireCtrl',
    function(OnewireService) {

        return {
            history: function(req, res){
                var from = parseInt(req.query.from) || new Date().getTime() - 3600000,
                    to = parseInt(req.query.to) || new Date().getTime(),
                    limit = parseInt(req.query.limit) || 100
                ;

                OnewireService.getAll(
                        new Date(from),
                        new Date(to),
                        limit
                    ).then(
                        function(result) {
                            res.status(200).json(result);
                        }
                    );
            },
            get: function(req, res){
                OnewireService.read().then(
                    function (value) {
                        var data = {
                            value: value,
                        };

                        //Socket.io send immediately
                        //req.io.emit('gpio.changed', data);
                        res.status(200).json(data);
                    },
                    function (ret) {
                        res.status(500).json({
                            error: 'error while reading temp'
                        });
                    }
                );
            }
        };
    }
);

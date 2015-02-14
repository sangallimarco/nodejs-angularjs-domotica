var pongular = require('pongular').pongular;
pongular.module('app.onewire', [])
    .factory('OnewireRouter',
    function($express, OnewireCtrl, OnewireService, SocketIo, GpioService, $config) {

        var pin = $config.get('onewire.gpio');

        // listen for temp changes
        OnewireService.on('change', function(ret){

            var status = OnewireService.getGpioStatus();

            GpioService.set(pin, status).then(
                function (ret) {
                    var data = {
                        pin: pin,
                        status: status
                    };

                    //Socket.io send immediately
                    SocketIo.get().emit('gpio.changed', data);
                },
                function (ret) {
                }
            );

            SocketIo.get().emit('onewire.changed', {value: ret});
        });

        return $express.Router()
            .get('/api/temp/all', OnewireCtrl.history)
            .get('/api/temp', OnewireCtrl.get)
            ;
    }
);

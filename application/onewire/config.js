var pongular = require('pongular').pongular;
pongular.module('app.onewire', [])
    .factory('OnewireRouter',
    function($express, OnewireCtrl, OnewireService, SocketIo) {

        // listen for pins changes
        OnewireService.on('change', function(ret){
            SocketIo.get().emit('onewire.changed', {value: ret});
        });

        return $express.Router()
            .get('/api/temp/all', OnewireCtrl.history)
            .get('/api/temp', OnewireCtrl.get)
            ;
    }
);

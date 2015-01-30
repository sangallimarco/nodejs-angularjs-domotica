var pongular = require('pongular').pongular;
pongular.module('app.onewire', [])
    .factory('OnewireRouter',
    function($express, OnewireCtrl, $events) {

        return $express.Router()
            .get('/api/temp', OnewireCtrl.get)
            ;
    }
);

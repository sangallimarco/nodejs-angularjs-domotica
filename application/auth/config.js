var pongular = require('pongular').pongular;
pongular.module('app.auth', [])
.factory('AuthRouter',
    function($express, AuthCtrl) {
        return $express.Router()
        .post('/api/auth/login', AuthCtrl.post)
        ;
    }
);

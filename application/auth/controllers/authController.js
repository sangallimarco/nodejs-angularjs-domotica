var pongular = require('pongular').pongular;

pongular.module('app.auth')
.factory('AuthCtrl',
function(Auth) {
    return {
        post: function(req, res){

            Auth.login(req.body.name, req.body.password)
            .then(
                function(ret) {
                    if(!ret){
                        res.status(500).json({
                            error: 'Validation Error'
                        });
                    } else {
                        res.status(200).json(ret);
                    }
                },
                function(ret) {
                    res.status(500).json({
                        error: 'Validation Error'
                    });
                }
            );
        }
    };
}
);

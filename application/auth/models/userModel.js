var pongular = require('pongular').pongular;

pongular.module('app.auth')
.factory('UserModel',
function($mongoose) {
    var schema =  new $mongoose.Schema({
        name: String,
        password: String
    });

    return $mongoose.model('User', schema);
}
);

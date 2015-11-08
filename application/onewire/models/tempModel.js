var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('TempModel',
    function ($mongoose) {
        var schema = new $mongoose.Schema({
            value: Number,
            created: {
                type: Date,
                default: Date.now
            }
        });

        return $mongoose.model('Temp', schema);
    }
);

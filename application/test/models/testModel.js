var pongular = require('pongular').pongular;

pongular.module('app.test')
.factory('TestModel', 
	function($mongoose) {
		var schema =  new $mongoose.Schema({
			name: String,
			surname: String,
			age: {
				type: Number, 
				max: 100 
			},
			created: {
				type: Date, 
				default: Date.now 
			}
		});

		return $mongoose.model('Test', schema);
	}
);
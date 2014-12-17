var pongular = require('pongular').pongular;

pongular.module('app.test')
.factory('TestModel', 
	function($mongoose) {
		var schema =  new $mongoose.Schema({
			name: String,
			surname: String,
			age: Number
		});

		return $mongoose.model('Test', schema);
	}
);
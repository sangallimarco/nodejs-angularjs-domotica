var pongular = require('pongular').pongular;
var mongoose     = require('mongoose');

pongular.module('nodejs').factory('TestModel', function() {
	var schema =  new mongoose.Schema({
		name: String,
		surname: String,
		age: Number
	});

	return mongoose.model('Test', schema);
});
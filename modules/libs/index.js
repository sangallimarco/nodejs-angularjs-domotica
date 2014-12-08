var pongular = require('pongular').pongular;
var mongoose = require('mongoose');
var http = require('http'); 

pongular.module('nodejs').factory('$mongoose', function() {
	return mongoose;
});

pongular.module('nodejs').factory('$http', function() {
	return http;
});

pongular.module('nodejs').factory('$pongular', function() {
	return pongular;
});




var pongular = require('pongular').pongular;

pongular.module('libs', [])

.factory('$mongoose', function() {
	return require('mongoose');
})

.factory('$express', function() {
	return require('express'); 
})

.factory('$http', function() {
	return require('http');
})

.factory('$pongular', function() {
	return pongular;
});




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

.factory('$bodyParser', function() {
	return require('body-parser');
})

.factory('$path', function() {
	return require('path');
})

.factory('$compression', function() {
	return require('compression');
})

.factory('$pongular', function() {
	return pongular;
});

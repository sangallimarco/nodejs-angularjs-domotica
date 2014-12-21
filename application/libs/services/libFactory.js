var pongular = require('pongular').pongular;

pongular.module('app.libs')

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

.factory('$socket', function() {
	return require('socket.io');
})

.factory('$q', function() {
	return require('q');
})

.factory('$config', function() {
	return require('config');
})


.factory('$pongular', function() {
	return pongular;
});

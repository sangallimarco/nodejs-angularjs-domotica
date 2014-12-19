var pongular = require('pongular').pongular;

pongular.module('app.libs')

.factory('$mongoose', function() {
	return require('mongoose');
})

.factory('$expressnode', function() {
	return require('express.io'); 
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

.factory('$socket', function(app) {
	var http = require('http').Server(app);
	return require('socket.io')(http);
})

.factory('$q', function() {
	return require('q');
})

.factory('$pongular', function() {
	return pongular;
});

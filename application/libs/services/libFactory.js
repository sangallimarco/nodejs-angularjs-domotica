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

.factory('$fs', function() {
	return require('fs');
})

.factory('$config', function() {
	return require('config');
})

.factory('$raspicam', function() {
	return require('raspicam');
})

.factory('$childProcess', function() {
	return require('child_process');
})

.factory('$gpio', function() {
	return require('rpi-gpio');
})

.factory('$events', function() {
	return require("events").EventEmitter;
})

.factory('$expressJwt', function() {
	return require('express-jwt');
})

.factory('$jwt', function() {
	return require('jsonwebtoken');
})

.factory('$socketJwt', function() {
	return require("socketio-jwt");
})


.factory('$pongular', function() {
	return pongular;
});

var pongular = require('pongular').pongular;

pongular.module('app.libs')
.factory('SocketIo', 
	function($http, $socket) {
		var ioSocket = null;

		return {
			create: function (server) {
				ioSocket = $socket(server);

				// inject io into request
				return function (req, res, next) {
					req.io = ioSocket;
					return next();
				};
			},
			get: function () {
				return ioSocket;
			},
			broadcast: function (namespace, obj) {
				console.log(engine.clientsCount);
				if (ioSocket.engine.clientsCount) {
					ioSocket.emit(namespace, obj);
				}
			}

		};
	}
);


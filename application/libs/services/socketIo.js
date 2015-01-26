var pongular = require('pongular').pongular;

pongular.module('app.libs')
.factory('SocketIo',
	function($http, $socket, $config, $socketJwt) {
		var ioSocket = null;

		return {
			create: function (server) {
				ioSocket = $socket(server);
				ioSocket.use($socketJwt.authorize({
					secret: $config.get('app.secret'),
					handshake: true
				}));

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
				if (ioSocket.engine.clientsCount) {
					ioSocket.emit(namespace, obj);
				}
			}

		};
	}
);

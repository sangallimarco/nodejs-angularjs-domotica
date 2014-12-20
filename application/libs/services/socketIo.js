var pongular = require('pongular').pongular;

pongular.module('app.libs')
.factory('SocketIo', 
	function($http, $socket) {
		return {
			io: function (server) {
				var ioSocket = $socket(server);

				// inject io into request
				return function (req, res, next) {
					req.io = ioSocket;
					next();
				};
			}

		};
	}
);


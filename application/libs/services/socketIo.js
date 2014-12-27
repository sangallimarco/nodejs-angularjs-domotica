var pongular = require('pongular').pongular;

pongular.module('app.libs')
.factory('SocketIo', 
	function($http, $socket) {
		var ioSocket = null,
			clients = [];

		return {
			create: function (server) {
				ioSocket = $socket(server);

				ioSocket.on('connection', 
					function(socket) {
						
						clients[socket.id] = socket;

						socket.on('disconnect', function() {
    						delete clients[socket.id];
    					}
					}
				);

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
				if (clients.length){
					forEach(clients, function (client) {
						client.emit(namespace, obj);
					});
				}
			}

		};
	}
);


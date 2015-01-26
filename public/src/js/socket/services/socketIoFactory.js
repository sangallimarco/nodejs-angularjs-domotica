angular.module('app.socket')
.factory('socketIoFactory', function (socketFactory, $rootScope, authService, $window) {

		var socket = null,
			events = [],
			factory = {};
			io = $window.io;

		function connect () {
			if (socket) {
				socket.disconnect(true);
			}
			socket = socketFactory({
				ioSocket: io.connect('', {
					forceNew: true,
					query: 'token=' + authService.getToken()
				})
			});
		}

		// if state changed remove listeners
		$rootScope.$on('$stateChangeStart', function(event){
			angular.forEach(events, function (evt) {
				socket.removeListener(evt);
			});
		});

		// set new token
		$rootScope.$on('$authChanged', function(event){
			connect();
		});

		factory.getSocket = function () {
			return socket;
		};

		factory.on = function (event, callback) {
			socket.on(event, callback);
			events.push(event);
		};

		// force first connection
		connect();

		return factory;
	});

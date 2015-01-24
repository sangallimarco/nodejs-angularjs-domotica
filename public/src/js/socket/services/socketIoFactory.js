angular.module('app.socket')
.factory('socketIoFactory', ['socketFactory', '$rootScope',
	function (socketFactory, $rootScope) {

		var socket = socketFactory(),
			events = [],
			factory = {};

		// if state changed remove listeners
		$rootScope.$on('$stateChangeStart', function(event){
			angular.forEach(events, function (evt) {
				socket.removeListener(evt);
			});
		});

		factory.getSocket = function () {
			return socket;
		};
		factory.on = function (event, callback) {
			socket.on(event, callback);
			events.push(event);
		};

		return factory;
	}
]);

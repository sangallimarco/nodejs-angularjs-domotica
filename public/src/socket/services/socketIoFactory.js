angular.module('app.socket')
.factory('socketIoFactory', ['socketFactory', 
	function (socketFactory) {
		return socketFactory();
	}
]);
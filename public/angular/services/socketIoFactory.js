application.factory('socketIoFactory', ['socketFactory', 
	function (socketFactory) {
		return socketFactory();
	}
]);
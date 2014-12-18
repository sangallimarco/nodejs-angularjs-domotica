angular.module('app.test')
.controller('testController', ['$scope', '$log', 'testService', 'socketIoFactory',
	function($scope, $log, testService, socketIoFactory) {
		$scope.title = 'Loaded!';

		$scope.data = {
			name: '',
			surname: '',
			age: ''
		};
		$scope.input = {
			postcode: ''
		};
		$scope.items = [];

		/**
		 * Add new item
		 */
		$scope.addItem = function(){
			testService.add($scope.data)
			.then(
				function(res) {
					// $scope.getList();
				}
			);
		};

		/**
		 * Load all items
		 */
		$scope.getList = function () {
			testService.getAll()
			.then(
				function(res) {
					$scope.items = res;
				}
			);
		};
		$scope.getList();

		// https://github.com/btford/angular-socket-io
		$scope.message = {};

		//socket.io
		socketIoFactory.on('new', function (obj) {
			$scope.message = obj;
		});

	}
]);

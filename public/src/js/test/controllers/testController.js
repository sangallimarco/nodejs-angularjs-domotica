angular.module('app.test')
.controller('testController', ['$scope', '$log', 'testService', 'socketIoFactory', 'authService',
	function($scope, $log, testService, socketIoFactory, authService) {
		$scope.title = 'Loaded!';

		// force login or redirect to state login
		authService.loginRequired();

		$scope.data = {
			name: '',
			surname: '',
			age: ''
		};
		$scope.input = {
			postcode: ''
		};
		$scope.items = [];
		$scope.error = null;




		/**
		 * Add new item
		 */
		$scope.addItem = function(){
			if (!$scope.form.$valid) {
				$scope.error = 'Check form';
				return false;
			}

			testService.add($scope.data)
			.then(
				function(obj) {
					$scope.error = null;
				},
				function(err) {
					$scope.error = err.data.error;
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
		socketIoFactory.on('test.new', function (obj) {
			$scope.message = obj;
			// prepend to list
			$scope.items.unshift(obj);
		});

	}
]);

angular.module('app.test')
.service('testService', ['$log', 'testApi', 'authService',
	function($log, testApi, authService){

		this.getAll = function() {
			var promise = testApi.query()
			.$promise
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
				}
			);
			return promise;
		};

		this.add = function(item) {
			var resource =  new testApi();

			resource.name = item.name;
			resource.surname = item.surname;
			resource.age = item.age;

			var promise = resource.$save()
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
				}
			);
			return promise;
		};

	}
]);

angular.module('app.test')
.service('testService', function($log, testApi, authService, $q){

		this.getAll = function() {
			var promise = testApi.query()
			.$promise
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
					return $q.reject(res);
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
					return $q.reject(res);
				}
			);
			return promise;
		};

	});

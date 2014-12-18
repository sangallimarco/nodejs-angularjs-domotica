angular.module('app.test')
.service('testService', ['$log', 'testApi', 
	function($log, testApi){

		this.getAll = function() {
			var promise = testApi.query()
			.$promise
			.then(
				function (res) {
					$log.info(res);
					return res;
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
					$log.info(res);
					return res;
				}
			);
			return promise;
		};

	}
]);
var pongular = require('pongular').pongular;

pongular.module('nodejs').service('TestService', 
	function($http, TestModel, $q) {
		var scope = this;

		scope.getAll = function () {
			var promise = TestModel.find().exec();
			return promise;
		};

		scope.getByName = function (query) {
			var promise = TestModel.find({name: query}).exec();
			return promise;
		};

		scope.save = function (doc) {
			var deferred = $q.defer(); 
			
			TestModel.create(
				doc, 
				function(err){
					if (err) {
						deferred.reject(new Error());
					} else {
						deferred.resolve();
					}
				}
			);
			return deferred.promise;
		};
	}
);
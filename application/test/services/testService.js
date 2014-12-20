var pongular = require('pongular').pongular;

pongular.module('app.test')
.service('TestService', 
	function($http, TestModel, $q) {
		var scope = this;

		scope.getAll = function (limit) {
			var promise = TestModel.find()
							.sort({created: -1})
							.limit(limit)
							.exec();
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
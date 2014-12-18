angular.module('app.test')
.factory('testApi', ['$resource', 
	function($resource){
		return $resource(
			'/api/test/:id',
			{
				id: '@id'
			}
		);
	}
]);
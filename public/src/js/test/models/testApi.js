angular.module('app.test')
.factory('testApi', ['$resource', 'authService',
	function($resource, authService){

		return $resource(
			'/api/test/:id',
			{
				id: '@id'
			}
		);
	}
]);

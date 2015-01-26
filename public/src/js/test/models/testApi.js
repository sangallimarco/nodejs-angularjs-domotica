angular.module('app.test')
.factory('testApi', function($resource, authService){

		return $resource(
			'/api/test/:id',
			{
				id: '@id'
			}
		);
	});

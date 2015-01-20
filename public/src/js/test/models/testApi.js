angular.module('app.test')
.factory('testApi', ['$resource', 'authService',
	function($resource, authService){

		return $resource(
			'/api/:hash/test/:id',
			{
				hash: function(){
					return authService.getHash();
				},
				id: '@id'
			}
		);
	}
]);

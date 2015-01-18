angular.module('app.test')
.factory('testApi', ['$resource',
	function($resource){
		return $resource(
			'/api/:hash/test/:id',
			{
				hash: 1234,
				id: '@id'
			}
		);
	}
]);

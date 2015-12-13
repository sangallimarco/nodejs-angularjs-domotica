angular.module('app.mpd')
.factory('mpdApi', function($resource){
		'use strict';

		return $resource(
			'/api/mpd/:command',
			{
				command: '@command'
			},
			{
				get: {
					method: 'GET',
					params: {
					}
				},
				set: {
					method: 'POST',
					params: {
					}
				},
			}
		);
	});

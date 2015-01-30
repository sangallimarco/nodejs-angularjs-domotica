angular.module('app.gpio')
    .factory('onewireApi', function($resource){
        return $resource(
            '/api/temp',
            {
            },
            {
            }
        );
    });

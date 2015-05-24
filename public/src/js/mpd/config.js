angular.module('app.mpd',
	[
		'ngResource',
		'ui.router',
		'app.socket'
	]
)
.config(function ($stateProvider) {

		$stateProvider
		.state('app.mpd', {
			url:'/mpd',
			templateUrl: 'partials/mpd/index.html',
			controller: 'mpdController'
		})
        ;
	});

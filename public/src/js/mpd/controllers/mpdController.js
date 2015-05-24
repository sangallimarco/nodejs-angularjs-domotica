angular.module('app.mpd')
.controller('mpdController',
    function ($scope, $log, mpdService, socketIoFactory) {
        'use strict';

        $scope.items = [];
        $scope.player = {
            state : 'play',
            volumeLabels: ['<', '>'],
            volumeKnob: [50, 50]
        };

        /**
         * Get Playlist
         */
        $scope.init = function () {
            // mpdService.getPlaylists().then(
            //     function (data) {
            //         $scope.items = items;
            //     }
            // );

            mpdService.getStatus().then(
                function (data) {
                    angular.extend($scope.player, data.value);
                    $scope.player.volumeKnob = mpdService.getVolumeControl(data.value.volume);
                }
            );

        };
        $scope.init();

        // controls
        $scope.setState = function () {
            mpdService.setState($scope.player.state).then(
                function () {

                }
            );
        };


        //socket.io
        socketIoFactory.on('mpd.changed', function (obj) {

        });
    }
);

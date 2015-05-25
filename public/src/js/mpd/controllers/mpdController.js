angular.module('app.mpd')
.controller('mpdController',
    function ($scope, $log, mpdService, socketIoFactory) {
        'use strict';

        $scope.items = [];
        $scope.player = {
            state : 'play',
            currentSong: {},
            volumeLabels: ['<', '>'],
            volumeKnob: [50, 50]
        };


        /**
         * Get Playlist
         */
        $scope.init = function () {
            // get song
            mpdService.getCurrentSong().then(
                function (data) {
                    $scope.player.currentSong = data.value;
                }
            );

            //ge status
            mpdService.getStatus().then(
                function (data) {
                    angular.extend($scope.player, data.value);
                    $scope.player.volumeKnob = mpdService.getVolumeControl(data.value.volume);
                }
            );


        };
        $scope.init();

        // controls
        $scope.toggle = function () {
            mpdService.toggleState($scope.player.state).then(
                function (data) {
                    $scope.player.state = data.value;
                }
            );
        };

        $scope.changeVolume =  function (direction) {
            mpdService.changeVolume($scope.player.volume, direction).then(
                function (data) {
                }
            );
        };

        $scope.nextSong = function () {
            mpdService.nextSong().then(
                function (data) {
                }
            );
        };

        $scope.prevSong = function () {
            mpdService.prevSong().then(
                function (data) {
                }
            );
        };


        //socket.io
        socketIoFactory.on('mpd.changed', function (obj) {
            $scope.init();
        });
    }
);

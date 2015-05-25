angular.module('app.mpd')
.service('mpdService',
	function($log, mpdApi, authService, $q){
		'use strict';

		// set values
		this.setCommand = function (label, value) {
			var promise = mpdApi.set(
				{
					command: label,
					value: value
				}
			)
			.$promise
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
					return $q.reject(res);
				}
			);
			return promise;
		};

		// read from status
		this.getCommand = function (label) {
			var promise = mpdApi.get(
				{
					command: label,
					value: null
				}
			)
			.$promise
			.then(
				function (res) {
					return res;
				},
				function (res) {
					authService.check(res);
					return $q.reject(res);
				}
			);
			return promise;
		};

		// utilities
		this.getVolumeControl = function (value) {
			value = parseInt(value);
			return [value, 100 - value];
		};

		// aliases ----------------------------------------
		this.getVolume = function() {
			return this.getCommand('volume');
		};

		this.setVolume = function(value) {
			return this.setCommand('setvol', value);
		};

		this.changeVolume = function(value, direction) {
			// increase 10%
			value = parseInt(value) + (direction * 5);

			if (value < 0) {
				value = 0;
			}
			if (value > 100) {
				value = 100;
			}

			return this.setVolume(value);
		};

		this.getStatus =  function() {
			return this.getCommand('status');
		};

		this.getCurrentSong =  function() {
			return this.getCommand('currentsong');
		};

		this.toggleState = function (value) {
			if (value === 'stop') {
				value = 'play';
			} else {
				value = 'stop';
			}

			return this.setState(value);
		};

		this.setState = function(value) {
			//set filter here
			if (value === 'play' || value === 'stop') {
				return this.setCommand(value, null).then(
					function (ret) {
						return {value: value};
					}
				);
			} else {
				return $q.reject();
			}
		};

		this.nextSong = function() {
			return this.setCommand('next');
		};

		this.prevSong = function() {
			return this.setCommand('previous');
		};

	}
);

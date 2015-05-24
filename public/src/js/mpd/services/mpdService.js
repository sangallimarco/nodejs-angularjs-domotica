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

		// aliases
		this.getVolume = function() {
			return this.getCommand('volume');
		};

		this.setVolume = function(value) {
			return this.setCommand('volume', value);
		};

		this.getStatus =  function() {
			return this.getCommand();
			// return this.getCommand('state');
		};

		this.setState = function(value) {
			//set filter here
			if (value === 'play' || value === 'stop') {
				return this.setCommand(value, null);
			} else {
				return $q.reject();
			}
		};

		this.stop = function() {
			return this.setCommand('stop', null);
		};

	}
);

'use strict';

require('pongular')
.pongular.module('app.mpd')
.service('MpdService',
	function($mpd, $q, $config) {

		//connection
		this.client = $mpd.connect(
			{
				port: $config.get('mpd.port'),
				host: $config.get('mpd.host')
			}
		);

		//send generic command maybe create a filter here
		this.sendCommand = function (label, value) {
			var deferred = $q.defer();

			if (value) {
				value = [value];
			} else {
				value = [];
			}

			this.client.sendCommand(
				$mpd.cmd(label, value),
				function(err, msg) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(
							$mpd.parseKeyValueMessage(msg)
						);
					}
				}
			);

			return deferred.promise;
		};

		// get values from status
		this.getCommand = function (label) {
			return this.sendCommand('status')
			.then(
				function (ret) {
					if (label) {
						return ret[label];
					} else {
						return ret;
					}
				}
			);
		};
	}
);

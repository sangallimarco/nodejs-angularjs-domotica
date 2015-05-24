'use strict';

require('pongular')
.pongular.module('app.mpd')
.factory('MpdCtrl',
	function(MpdService) {

		return {
			get: function(req, res){
				var cmd = req.params.command;

				MpdService.getCommand(cmd).then(
					function (ret) {
						var data = {
							cmd: cmd,
							value: ret
						};
						//Socket.io send immediately
						res.status(200).json(data);
					},
					function (ret) {
						res.status(500).json({
							error: ret
						});
					}
				);
			},
			post: function(req, res){
				var cmd = req.params.command,
					value = req.body.value;

				MpdService.sendCommand(cmd, value).then(
					function (ret) {
						var data = {
							cmd: cmd,
							value: ret
						};

						//Socket.io send immediately
						req.io.emit('mpd.changed', data);
						res.status(200).json(data);
					},
					function (ret) {
						res.status(500).json({
							error: ret
						});
					}
				);
			}
		};
	}
);

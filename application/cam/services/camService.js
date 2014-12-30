var pongular = require('pongular').pongular;

pongular.module('app.cam')
.factory('CamService', 
	function($fs, $config, $childProcess, SocketIo, $raspicam) {
		var file = $config.get('cam.file'),
			proc = null;

		return {
			start: function () {
				if (!proc) {
					proc = new $raspicam({
						output: file,
						mode: 'timelapse',
						w: 640, 
						h: 480, 
						t: 9999999999,
						tl: 1000,
						q: 10
					});

					proc.on("read", function(err, filename){
						var postfix = new Date().getTime(); 
						if (!err) {
							SocketIo.broadcast('cam.stream', {
		  						src: file + '?t=' + postfix
		  					});
						}
					});

					proc.start();
  				}
			},
			stop: function () {
				if (proc) {
					proc.stop();
					prod = null;
				}
			}

		};
	}
);


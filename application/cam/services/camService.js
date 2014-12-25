var pongular = require('pongular').pongular;

pongular.module('app.cam')
.factory('CamService', 
	function($fs, $config, $childProcess) {
		var file = $config.get('cam.file'),
			proc = null;

		return {
			start: function (io) {
				if (!proc) {
					var args = ["-w", "640", "-h", "480", "-o", file, "-t", "999999999", "-tl", "100"];
					proc = $childProcess.spawn('raspistill', args);

					console.log('Watching for changes...');
				
					// watch file and send over websocket
					$fs.watchFile(file, function(current, previous) {
	  					io.emit('cam.stream', {
	  						src: file + '?_t=' + (Math.random() * 100000)
	  					});
	  				});
  				}
			},
			stop: function () {
				if (proc) {
					$fs.unwatchFile(file);
					proc.kill();
				}
			}

		};
	}
);


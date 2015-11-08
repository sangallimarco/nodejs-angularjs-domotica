var pongular = require('pongular').pongular;

pongular.module('app.cam')
.factory('CamCtrl', 
	function(CamService) {

		return {
			get: function(req, res){
			},
		};
	}
);

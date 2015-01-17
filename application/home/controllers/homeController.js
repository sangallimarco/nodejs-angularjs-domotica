var pongular = require('pongular').pongular;

pongular.module('app.home')
.factory('HomeCtrl',
	function() {
		return {
			get: function(req, res){
				res.render('index', { title: 'Express' });
			}
		};
	}
);

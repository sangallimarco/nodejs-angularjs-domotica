var pongular = require('pongular').pongular;

pongular.module('app.home')
.factory('IndexCtrl', 
	function() {
		return {
			index: function(req, res){
				res.render('index', { title: 'Express' });
			}
		};
	}
);

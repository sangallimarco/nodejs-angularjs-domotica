var pongular = require('pongular').pongular;

pongular.module('app.test')
.factory('TestCtrl', 
	function(TestService) {
		return {
			get: function(req, res){
				// req.query contains query params
				TestService.getAll().then(
					function(result) {
						res.json(result);
					}
				);
			},
			post: function(req, res){
				var doc = {
					name: req.body.name,
					surname: req.body.surname,
					age: req.body.age
				};
				
				//send immediately
				req.io.emit('new', doc);
				
				res.json({status: true});

				// using Q
				TestService.save(doc)
				.then(
					function(ret){
						req.io.emit('save', doc);
					}
				); 
			}
		};
	}
);

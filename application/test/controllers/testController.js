var pongular = require('pongular').pongular;

pongular.module('app.test')
.factory('TestCtrl', 
	function(TestService) {
		return {
			get: function(req, res){
				// req.query contains query params
				TestService.getAll(5).then(
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
				
				// using Q
				TestService.save(doc)
				.then(
					function(ret) {
						//Socket.io send immediately
						req.io.emit('new', doc);
						// return object
						res.status(200).json(doc);
					},
					function(ret) {
						res.status(500).json({
							error: 'Validation Error'
						});
					}
				); 
			}
		};
	}
);

var Test = require('../models/test');

module.exports = function(router){
	
	// test API
	router.route('/test')

	// create (accessed at POST http://localhost:8080/api/test)
	.post(function(req, res) {
		var test = new Test(); 

		test.name = req.body.name;  
		test.surname = req.body.surname;
		test.age = req.body.age;

		// save the bear and check for errors
		test.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'created!' });
		});
	})
	.get(function(req, res) {
		// req.query contains query params
		Test.find(
			req.query,
			'name surname age',
			function (err, tests) {
			if (err)
				res.send(err);
			res.json(tests);
		});

	});
};
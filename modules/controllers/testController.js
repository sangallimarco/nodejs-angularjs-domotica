var pongular = require('pongular').pongular;

pongular.module('nodejs').factory('TestCtrl', function(TestModel) {
  return {
    get: function(req, res){
      	// req.query contains query params
		TestModel.find(
			req.query,
			'name surname age',
			function (err, tests) {
			if (err)
				res.send(err);
			res.json(tests);
		});
    },
    post: function(req, res){
      	var test = new TestModel(); 

		test.name = req.body.name;  
		test.surname = req.body.surname;
		test.age = req.body.age;

		// save the bear and check for errors
		test.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'created!' });
		});
    }
  };
});

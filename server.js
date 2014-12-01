// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/testapp');

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var http =	require('http'); 

// services and models
var Test = require('./models/test');
var weatherService = require('./services/weatherService');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8888; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});
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
		// 

		Test.find(
			req.query,
			'name surname age',
			function (err, tests) {
			if (err)
				res.send(err);
			res.json(tests);
		})

	});

// test API
router.route('/ext')
	.get(function(req,res){
		http.get('http://www.myweather2.com/developer/forecast.ashx?uac=.frFFHX1sj&query=w45eq&output=json', function(response){
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				weatherService.setData(str);
				res.json(weatherService.getWeather());
			});
		})
		.end();
	})
;

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
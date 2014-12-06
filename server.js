// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/testapp');

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

require('./routes/weather')(router);
require('./routes/test')(router);
require('./routes/default')(router);


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
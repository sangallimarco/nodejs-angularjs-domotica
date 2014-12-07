// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/testapp');

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');

var app = express(); 
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

var port = process.env.PORT || 9000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
require('./routes/weather')(router);
require('./routes/test')(router);
require('./routes/default')(router);

// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
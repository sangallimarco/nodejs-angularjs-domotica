// BASE SETUP
// =============================================================================
/*



var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');
var pongular = require('pongular').pongular;

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
*/


var express = require('express');
var pongular = require('pongular').pongular;

var module = pongular.module('nodejs', []);
module.uses(
		'modules/libs/*.js',
		'modules/models/*.js', 
		'modules/services/*.js', 
		'modules/controllers/*.js'
	);

pongular.module('nodejs').factory('app', function() {
  	var app = express();

  	var mongoose   = require('mongoose');
	mongoose.connect('mongodb://localhost/testapp');

	var bodyParser = require('body-parser');
	var path = require('path');
	var compression = require('compression');

	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.set('view engine', 'ejs');
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(path.join(__dirname, 'public')));

  	return app;
});

pongular.module('nodejs').run(
	function(app, IndexCtrl, WeatherCtrl, TestCtrl) {

		app.get('/', IndexCtrl.index);
		
		app.get('/api/weather/:postcode?', WeatherCtrl.index);

		app.get('/api/test', TestCtrl.get);
		app.post('/api/test', TestCtrl.post);

		app.listen(app.get('port'), 
			function(){
				console.log("Express server listening on port " + app.get('port'));
			}
		);
	}
);

var injector = pongular.injector(['nodejs']);


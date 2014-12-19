// BASE SETUP
// =============================================================================
var pongular = require('pongular').pongular;

pongular.module('app', [
	'app.libs',
	'app.home',
	'app.test',
	'app.weather'
])
.uses(
		'application/*/config.js',
		'application/*/*/*.js'
)
.factory('app',
	function($mongoose, $bodyParser, $expressnode, $path) {
		
		$mongoose.connect('mongodb://localhost/testapp');

		//use express.io
		var app = $expressnode().http().io();
		app.use($bodyParser.urlencoded({ extended: true }));
		app.use($bodyParser.json());
		app.set('view engine', 'ejs');
		app.use($expressnode.compress({threshold : 10}));
		app.set('port', process.env.PORT || 5000);
		app.use('/public/', $expressnode.static($path.join(__dirname, 'public')));
		app.use('/partials/', $expressnode.static($path.join(__dirname, 'views/partials')));

		// socket io
		app.io.route('ready', function(req) {
			req.io.emit('new', {
			    message: 'io event from an io route on the server'
			})
		})

		return app;
	}
)
.run(
	function(app, HomeRouter, TestRouter, WeatherRouter) {

		/**
		 * Routes
		 */
		app.use(HomeRouter);
		app.use(TestRouter);
		app.use(WeatherRouter);
		
		app.listen(app.get('port'), 
			function(){
				console.log("Express server listening on port " + app.get('port'));
			}
		);
	}
);

// init app
pongular.injector([
	'app'
]);


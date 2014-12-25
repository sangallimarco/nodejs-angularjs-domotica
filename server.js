// BASE SETUP
// =============================================================================
var pongular = require('pongular').pongular;

pongular.module('app', [
	'app.libs',
	'app.home',
	'app.test',
	'app.weather',
	'app.gpio',
	'app.cam'
])
.uses(
		'application/*/config.js',
		'application/*/*/*.js'
)
.factory('app',
	function($mongoose, $bodyParser, $express, $http, $path, $compression, SocketIo, $config) {
		
		$mongoose.connect($config.get('app.mongodb'));

		//use express.io
		var app = $express(),
			server = $http.Server(app);

		app.use($bodyParser.urlencoded({extended: true}));
		app.use($bodyParser.json());
		app.set('view engine', 'ejs');
		app.use($compression({threshold : 10}));
		app.set('port', process.env.PORT || $config.get('app.port'));
		app.use('/tmp/', $express.static('/tmp'));
		app.use('/public/', $express.static($path.join(__dirname, 'public')));
		app.use('/partials/', $express.static($path.join(__dirname, 'views/partials')));

		// socket.io middleware
		app.use(SocketIo.create(server));

		server.listen(app.get('port'), 
			function(){
				console.log('Express server listening on port ' + app.get('port'));
			}
		);
	
		return app;
	}
)
.run(
	function(app, HomeRouter, TestRouter, WeatherRouter, GpioRouter, CamRouter, SocketIo) {
		
		/**
		 * Route middlewares
		 */
		app.use(HomeRouter);
		app.use(TestRouter);
		app.use(WeatherRouter);
		app.use(GpioRouter);
		app.use(CamRouter);

		/**
		 * Socket.io connection
		 */
		SocketIo.get().on('connection', 
			function(socket) {
				console.log('SocketIo Client connected!')
			}
		);

	}
);

// init app
pongular.injector([
	'app'
]);


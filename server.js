// BASE SETUP
// =============================================================================
var pongular = require('pongular').pongular;

pongular.module('app', [
	'app.libs',
	'app.auth',
	'app.home',
	'app.test',
	'app.weather'
])
.uses(
		'application/*/config.js',
		'application/*/*/*.js'
)
.factory('app',
	function($mongoose, $bodyParser, $express, $http, $path, $compression, SocketIo, $config, Auth) {

		$mongoose.connect($config.get('app.mongodb'));

		//use express.io
		var app = $express(),
			server = $http.Server(app);

		app.use($bodyParser.urlencoded({extended: true}));
		app.use($bodyParser.json());
		app.set('view engine', 'ejs');
		app.use($compression({threshold : 10}));
		app.set('port', process.env.PORT || $config.get('app.port'));
		app.use('/public/', $express.static($path.join(__dirname, 'public')));
		app.use('/partials/', $express.static($path.join(__dirname, 'views/partials')));
		app.use('/fonts/', $express.static($path.join(__dirname, 'public/bower_components/bootstrap/fonts')));

		// socket.io middleware
		app.use(SocketIo.create(server));

		// auth
		app.use(Auth.bind());

		server.listen(app.get('port'),
			function(){
				console.log('Express server listening on port ' + app.get('port'));
			}
		);

		return app;
	}
)
.run(
	function(app, AuthRouter, HomeRouter, TestRouter, WeatherRouter, SocketIo) {

		/**
		 * Route middlewares
		 */
		app.use(AuthRouter);
		app.use(HomeRouter);
		app.use(TestRouter);
		app.use(WeatherRouter);

		/**
		 * Socket.io connection
		 */
		SocketIo.get().on('connection',
			function(socket) {
				console.log('SocketIo Client connected!');
			}
		);

	}
);

// init app
pongular.injector([
	'app'
]);

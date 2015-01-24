// BASE SETUP
// =============================================================================
var pongular = require('pongular').pongular;

pongular.module('app', [
	'app.libs',
	'app.auth',
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
	function($mongoose, $bodyParser, $express, $http, $path, $compression, SocketIo, $config, Auth) {

		var db = $mongoose.connect(
			$config.get('app.mongodb'),
		{
			server: {
				socketOptions: {
					keepAlive: 1
				}
			}
		}
	);
	db.connection.on('error',console.error.bind(console, 'connection error:'));

		//use express.io
		var app = $express(),
			server = $http.createServer(app);

		app.use($bodyParser.urlencoded({extended: true}));
		app.use($bodyParser.json());
		app.set('view engine', 'ejs');
		app.use($compression({threshold : 10}));
		app.set('port', process.env.PORT || $config.get('app.port'));
		app.use('/tmp/', $express.static('/tmp'));
		app.use('/public/', $express.static($path.join(__dirname, 'public')));
		app.use('/partials/', $express.static($path.join(__dirname, 'views/partials')));
		app.use('/fonts/', $express.static($path.join(__dirname, 'public/bower_components/bootstrap-less/fonts')));

		// JWT
		app.use('/api', Auth.interceptor());
		app.use('/api', Auth.errorHandler());

		// socket.io middleware
		app.use(SocketIo.create(server));

		// auth
		// app.use(Auth.bind());

		server.listen(app.get('port'),
			function(){
				console.log('Express server listening on port ' + app.get('port'));
			}
		);

		return app;
	}
)
.run(
	function(app, AuthRouter, HomeRouter, TestRouter, WeatherRouter, GpioRouter, CamRouter, SocketIo, CamService) {

		/**
		 * Route middlewares
		 */
		app.use(AuthRouter);
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
				console.log('SocketIo Client connected!');
			}
		);

		// stop camera on exit
		app.on('exit', function() {
			CamService.stop();
		});

	}
);

// init app
pongular.injector([
	'app'
]);

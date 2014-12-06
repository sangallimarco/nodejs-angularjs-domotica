module.exports = function(router){
	// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
	router.get('/', function(req, res) {
		//res.json({ message: 'hooray! welcome to our api!' });	
		res.render('index', { title: 'Express' });
	});
};
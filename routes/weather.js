var weatherService = require('../services/weatherService');

module.exports = function(router){
	// test API
	router.route('/weather/:postcode?')
		.get(function(req,res){
			var postcode = req.params.postcode
			;

			if(postcode) {
				weatherService.getData(postcode, function(response) {
					//save data
					res.json(response);
				});
			} else {
				weatherService.getLast(function(response) {
					//save data
					res.json(response);
				});
			}
		});
};
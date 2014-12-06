var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var weatherSchema   = new Schema({
	humidity: Number,
	temp: Number,
	created: {
		type: Date, 
		default: Date.now 
	}
});

module.exports = mongoose.model('Weather', weatherSchema);

var User = require('../models/db.model.js');
module.exports = function(app) {
	app.get('/count/:major', function(req, res) {
		var major = req.params.major
		User.find({'jwcinfo.major': major}, function(err, users) {
			res.send(users.length + '');
		});
	});
}

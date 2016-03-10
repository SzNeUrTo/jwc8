var User = require('./models/db.model.js');

module.exports = function(app) {
	app.post('/add', function(req, res) {
		console.log(req.body)
		var name = '' || req.body.name;
		var newUser = new User();
		newUser.name = name;
		newUser.save(function(err) {
			if (err) {
				console.log('add_error');
				res.send('add_error')
				throw err;
			}
			console.log('add_success');
			res.send('success save');
		});
	});

	app.get('/list', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	})
}

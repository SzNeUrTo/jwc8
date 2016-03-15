var User = require('../models/db.model.js');
module.exports = function(app, passport) {
    // var register = require('../controllers/register.controller');
    // app.get('/register',register.render);

    app.get('/register', isLoggedIn, function(req, res) {
    	res.render('registerform');
    });

    app.post('/complete', isLoggedIn, function(req, res) {
    	// res.send(req.body);
		User.findOne({'auth.facebook.id': req.user.auth.facebook.id}, function(err, user){
			var data = req.body;
			registerData(user, data);
			if (err) {
				res.redirect('/');
				console.log('err');
				throw err;
			}
			if (!user) {
				res.redirect('/');
			}
			else {
				user.save(function(err) {
					if (err) {
						res.redirect('/');
						throw err;
					}
					// res.redirect('/complete');
					res.send(user);
				});
			}
			// res.send(user);
		});
    });

	app.get('/userdata', isLoggedIn, function(req, res) {
		User.findOne({'auth.facebook.id': req.user.auth.facebook.id}, function(err, user){
			if (err) {
				console.log('err');
				res.send('go_error'); // EditHere
				throw err;
			}
			if (!user) {
				console.log('!user');
				res.send('go_regis'); // editHere
			}
			else {
				res.json(user);
			}
		});
	});

    app.post('/complete', isLoggedIn, function(req, res) {
    	// res.send(req.body);
		User.findOne({'auth.facebook.id': req.user.auth.facebook.id}, function(err, user){
			var data = req.body;
			registerData(user, data);
			if (err) {
				res.redirect('/');
				console.log('err');
				throw err;
			}
			if (!user) {
				res.redirect('/');
			}
			else {
				user.save(function(err) {
					if (err) {
						res.redirect('/');
						throw err;
					}
					// res.redirect('/complete');
					res.send(user);
				});
			}
			// res.send(user);
		});
    });
    
}

function registerData(user, data) {
	var profile = {};
	profile.major = data.major || '';
	profile.firstname = data.firstname;
	profile.lastname = data.lastname;
	profile.nickname = data.nickname;
	profile.sex = data.sex;
	profile.birthdate = data.birthdate;
	profile.religion = data.religion;
	profile.email = data.email;
	profile.tel = data.tel;
	profile.size = data.size;
	profile.position = data.position;
	profile.school = data.school;
	profile.level = data.level;

	profile.contact_person = {};
	profile.contact_person.firstname = data.parent_firstname;
	profile.contact_person.lastname = data.parent_lastname;
	profile.contact_person.relation = data.parent;
	profile.contact_person.emergency_tel = data.emergency_tel;

	var jwcinfo = {};
	jwcinfo.major = data.major || '';

	jwcinfo.generalquestion = {};
	jwcinfo.generalquestion.answers = [];
	jwcinfo.generalquestion.answers.push({answer: data.g_your_experience, point: 0});
	jwcinfo.generalquestion.answers.push({answer: data.g_your_hobbies, point: 0});
	jwcinfo.generalquestion.answers.push({answer: data.g_your_strong_point, point: 0});
	jwcinfo.generalquestion.answers.push({answer: data.g_your_like_unlike, point: 0});
	jwcinfo.generalquestion.answers.push({answer: data.g_your_created_websites, point: 0});

	jwcinfo.specialquestion = {};
	jwcinfo.specialquestion.answers = [];
	
	user.profile = profile;
	user.jwcinfo = jwcinfo;
}

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	// res.redirect('/login');
	res.redirect('/'); // if not login go ???
}
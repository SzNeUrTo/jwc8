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
    
}

function registerData(user, data) {
	user.profile.major = data.major || '';
	user.profile.firstname = data.firstname;
	user.profile.lastname = data.lastname;
	user.profile.nickname = data.nickname;
	user.profile.sex = data.sex;
	user.profile.birthdate = data.birthdate;
	user.profile.religion = data.religion;
	user.profile.email = data.email;
	user.profile.tel = data.tel;
	user.profile.size = data.size;
	user.profile.position = data.position;
	user.profile.school = data.school;
	user.profile.level = data.level;

	user.profile.contact_person = {};
	user.profile.contact_person.firstname = data.parent_firstname;
	user.profile.contact_person.lastname = data.parent_lastname;
	user.profile.contact_person.relation = data.parent;
	user.profile.contact_person.emergency_tel = data.emergency_tel;

	user.jwcinfo = {};
	user.jwcinfo.major = data.major || '';
	user.jwcinfo.generalquestion.answers = [];
	user.jwcinfo.generalquestion.answers.push({answer: data.g_your_experience, point: 0});
	user.jwcinfo.generalquestion.answers.push({answer: data.g_your_hobbies, point: 0});
	user.jwcinfo.generalquestion.answers.push({answer: data.g_your_strong_point, point: 0});
	user.jwcinfo.generalquestion.answers.push({answer: data.g_your_like_unlike, point: 0});
	user.jwcinfo.generalquestion.answers.push({answer: data.g_your_created_websites, point: 0});

	user.jwcinfo.specialquestion = {};
	user.jwcinfo.specialquestion.answers = [];
}

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	// res.redirect('/login');
	res.redirect('/'); // if not login go ???
}
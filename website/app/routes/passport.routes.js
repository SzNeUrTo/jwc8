var User = require('../models/db.model.js'); // routes.js brent --> edit path here
module.exports = function(app, passport){
	app.set('view engine', 'ejs');

	app.get('/testauth', function(req, res){
		res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/testauth',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/profile',
	                                      failureRedirect: '/testauth' }));

	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/profile',
	                                      failureRedirect: '/testauth' }));

	app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }), function(req, res){
		console.log("account" + req.account);
	});
	app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

	app.get('/connect/local', function(req, res){
		res.render('connect-local.ejs', { message: req.flash('signupMessage')});
	});

	app.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/connect/local',
		failureFlash: true
	}));

	app.get('/unlink/facebook', function(req, res){
		var user = req.user;

		user.auth.facebook.token = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		})
	});

	app.get('/unlink/local', function(req, res){
		var user = req.user;

		user.auth.local.username = null;
		user.auth.local.password = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		});

	});

	app.get('/unlink/google', function(req, res){
		var user = req.user;
		user.auth.google.token = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		});
	});






	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/testauth');
	})
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}
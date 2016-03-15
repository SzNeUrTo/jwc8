var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// var User            = require('../app/models/user'); // edit Model
var User = require('../app/models/db.model.js'); // routes.js brent --> edit path here
var configAuth = require('./auth.config.js');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'auth.local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} 
				if(!req.user) {
					var newUser = new User();
					newUser.auth.auth_type = 'local';
					newUser.auth.local.username = email;
					newUser.auth.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				} else {
					var user = req.user;
					var auth = {};
					auth.auth_type = 'local';
					auth.local.username = email;
					auth.local.password = user.generateHash(password);
					user.auth = auth;

					user.save(function(err){
						if(err)
							throw err;
						return done(null, user);
					})
				}
			})

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				User.findOne({ 'auth.local.username': email}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}
					return done(null, user);

				});
			});
		}
	));


	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
	    passReqToCallback: true
	  },
	  function(req, accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		//user is not logged in yet
	    		if(!req.user){
					User.findOne({'auth.facebook.id': profile.id}, function(err, user){
		    			if(err)
		    				return done(err);
		    			if(user){
		    				if(!user.auth.facebook.token){
		    					var auth = {};
		    					auth.auth_type = 'facebook';
		    					auth.facebook.token = accessToken;
		    					auth.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
		    					auth.facebook.email = profile.emails[0].value;
								user.auth = auth;
		    					user.save(function(err){
		    						if(err)
		    							throw err;
		    					});

		    				}
		    				return done(null, user);
		    			}
		    			else {
		    				var newUser = new User();
		    				console.log("======== Debug ==========");
		    				console.log(newUser);
		    				console.log("======== Debug ==========");
		    				var auth = {};
		    				auth.auth_type = 'facebook';
		    				auth.facebook.id = profile.id;
		    				auth.facebook.token = accessToken;
		    				auth.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
		    				auth.facebook.email = profile.emails[0].value;
							newUser.auth = auth;

		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				})
		    			}
		    		});
	    		}

	    		//user is logged in already, and needs to be merged
	    		else {
	    			var user = req.user;
					var auth = {};
	    			auth.auth_type = 'facebook';
	    			auth.facebook.id = profile.id;
	    			auth.facebook.token = accessToken;
	    			auth.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
	    			auth.facebook.email = profile.emails[0].value;
					user.auth = auth;

	    			user.save(function(err){
	    				if(err)
	    					throw err
	    				return done(null, user);
	    			})
	    		}
	    		
	    	});
	    }

	));

	// passport.use(new GoogleStrategy({
	//     clientID: configAuth.googleAuth.clientID,
	//     clientSecret: configAuth.googleAuth.clientSecret,
	//     callbackURL: configAuth.googleAuth.callbackURL,
	//     passReqToCallback: true
	//   },
	//   function(req, accessToken, refreshToken, profile, done) {
	//     	process.nextTick(function(){

	//     		if(!req.user){
	//     			User.findOne({'google.id': profile.id}, function(err, user){
	// 	    			if(err)
	// 	    				return done(err);
	// 	    			if(user){
	// 	    				if(!user.google.token){
	// 	    					user.google.token = accessToken;
	// 	    					user.google.name = profile.displayName;
	// 	    					user.google.email = profile.emails[0].value;
	// 	    					user.save(function(err){
	// 	    						if(err)
	// 	    							throw err;
	// 	    					});
	// 	    				}
	// 	    				return done(null, user);
	// 	    			}
	// 	    			else {
	// 	    				var newUser = new User();
	// 	    				newUser.google.id = profile.id;
	// 	    				newUser.google.token = accessToken;
	// 	    				newUser.google.name = profile.displayName;
	// 	    				newUser.google.email = profile.emails[0].value;

	// 	    				newUser.save(function(err){
	// 	    					if(err)
	// 	    						throw err;
	// 	    					return done(null, newUser);
	// 	    				})
	// 	    			}
	// 	    		});
	//     		} else {
	//     			var user = req.user;
	//     			user.google.id = profile.id;
	// 				user.google.token = accessToken;
	// 				user.google.name = profile.displayName;
	// 				user.google.email = profile.emails[0].value;

	// 				user.save(function(err){
	// 					if(err)
	// 						throw err;
	// 					return done(null, user);
	// 				});
	//     		}
	    		
	//     	});
	//     }

	// ));


	


};
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var configDB = require('./database.config.js');
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

var configDB = require('./database.config.js'); // server.js --> edit path here
mongoose.connect(configDB.url);
require('./passport.config.js')(passport); // server.js --> edit path here

module.exports = function() {
	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({
    	extended: false
  	}));
  	app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true,
				 store: new MongoStore({ mongooseConnection: mongoose.connection,
				 							ttl: 2 * 24 * 60 * 60 })}));

  	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	app.use(function(req, res, next){
		console.log(req.session);
		console.log("===================");
		console.log(req.user);
		next();
	});

	app.set('views', './app/views');
	app.use(express.static('./public'));
	app.engine('html', ejs.renderFile);
	require('../app/routes.app.js')(app, passport);
	return app;
}

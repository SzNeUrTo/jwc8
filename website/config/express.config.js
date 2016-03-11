var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var configDB = require('./database.config.simple.js');
var morgan = require('morgan');

module.exports = function() {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({
    	extended: true
  	}));
	app.set('views', './app/views');
	app.use(express.static('./public'));
	app.engine('.hbs', exphbs({
		defaultLayout: 'main',
	 	extname: '.hbs',
		layoutsDir:'./app/views/layouts'
	}));
	app.set('view engine', '.hbs');
	//mongoose.connect(configDB.url);
	require('../app/routes.app.js')(app);
	return app;
}

var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var configDB = require('./database.config.js');
var morgan = require('morgan');


module.exports = function() {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({
    	extended: true
  	}));
	app.set('views', './app/views');
	app.use(express.static('./public'));
	app.engine('html', ejs.renderFile);
	mongoose.connect(configDB.url);
	require('../app/routes.app.js')(app);
	return app;
}

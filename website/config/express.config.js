var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

module.exports = function() {
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

	require('../app/routes/test.routes')(app);
	require('../app/routes/time.routes')(app);
	require('../app/routes/index.routes')(app);
	return app;
}

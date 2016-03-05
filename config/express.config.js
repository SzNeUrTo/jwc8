var express = require('express');
var app = express();
var ejs = require('ejs');

module.exports = function() {
	app.set('views', './app/views');
	app.use(express.static('./public'));
	app.engine('html', ejs.renderFile);
	
	require('../app/routes/test.routes')(app);
	return app;
}
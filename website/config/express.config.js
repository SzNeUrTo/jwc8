var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

module.exports = function() {
	app.use(bodyParser.urlencoded({
    extended: true
  }));
	app.set('views', './app/views');
	app.use(express.static('./public'));
	app.engine('html', ejs.renderFile);

	require('../app/routes/test.routes')(app);
	require('../app/routes/time.routes')(app);
	require('../app/routes/index.routes')(app);
	return app;
}

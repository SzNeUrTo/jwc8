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

	require('../app/routes/time.routes')(app);
	require('../app/routes/home.routes')(app);
	require('../app/routes/whatis.routes')(app);
	require('../app/routes/register.routes')(app);
	require('../app/routes/calendar.routes')(app);
	require('../app/routes/eventpic.routes')(app);
	require('../app/routes/about.routes')(app);

	return app;
}

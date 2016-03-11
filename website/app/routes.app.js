module.exports = function(app) {
	require('./fortest.app.js')(app);
	require('../app/routes/test.routes')(app);
	require('../app/routes/time.routes')(app);
	require('../app/routes/home.routes')(app);
	require('../app/routes/whatis.routes')(app);
	require('../app/routes/register.routes')(app);
	require('../app/routes/calendar.routes')(app);
	require('../app/routes/eventpic.routes')(app);
	require('../app/routes/about.routes')(app);
}

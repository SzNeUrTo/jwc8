module.exports = function(app, passport) {
	// require('./fortest.app.js')(app);
	// require('../app/routes/test.routes')(app);
	// require('../app/routes/time.routes')(app);
	// require('../app/routes/query.routes')(app, passport);


	require('../app/routes/index.routes')(app);

	require('../app/routes/countregis.routes')(app);
	require('../app/routes/register.routes')(app);
	require('../app/routes/banner.routes')(app);
	require('../app/routes/passport.routes.js')(app, passport);
	require('../app/routes/answer.routes.js')(app, passport);
	require('../app/routes/announce.routes')(app)
}

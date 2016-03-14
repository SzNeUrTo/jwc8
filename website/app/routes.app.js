module.exports = function(app) {
	require('./fortest.app.js')(app);
	require('../app/routes/index.routes')(app);
	require('../app/routes/register.routes')(app);
}

module.exports = function(app) {
	require('../app/routes/test.routes')(app);
	require('../app/routes/time.routes')(app);
}

module.exports = function(app) {
	var test = require('../controllers/test.controller');
	app.get('/test', test.render);
}

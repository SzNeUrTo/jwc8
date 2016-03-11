module.exports = function(app){
    var calendar = require('../controllers/calendar.controller');
    app.get('/calendar',calendar.render);
}

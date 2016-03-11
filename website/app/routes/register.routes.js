module.exports = function(app){
    var register = require('../controllers/register.controller');
    app.get('/register',register.render);
}

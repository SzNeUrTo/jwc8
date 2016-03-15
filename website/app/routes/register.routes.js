module.exports = function(app){
    var register = require('../controllers/register.controller');
    app.post('/register',register.render);
}

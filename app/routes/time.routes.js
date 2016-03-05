module.exports = function(app){
    var time = require('../controllers/time.controller');
    app.get('/',time.render);
    app.post('/',time.sendMail);
}

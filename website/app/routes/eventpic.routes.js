module.exports = function(app){
    var eventpic = require('../controllers/eventpic.controller');
    app.get('/eventpic',eventpic.render);
}

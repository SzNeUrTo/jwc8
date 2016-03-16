module.exports = function(app){
    var complete = require('../controllers/complete.controller');
    app.post('/complete',complete.render);
}

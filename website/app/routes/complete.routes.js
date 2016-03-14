module.exports = function(app){
    var complete = require('../controllers/complete.controller');
    app.get('/complete',complete.render);
}

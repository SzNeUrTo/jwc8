module.exports = function(app){
    var whatis = require('../controllers/whatis.controller');
    app.get('/whatis',whatis.render);
}

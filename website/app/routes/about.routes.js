module.exports = function(app){
    var about = require('../controllers/about.controller');
    app.get('/about',about.render);
}

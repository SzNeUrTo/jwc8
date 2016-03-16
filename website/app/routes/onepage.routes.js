module.exports = function(app){
  var onepage = require('../controllers/onepage.controller');
  app.get('/onepage',onepage.render);
}

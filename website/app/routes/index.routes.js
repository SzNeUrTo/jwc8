module.exports = function(app){
  var index = require('../controllers/index.controller');
  console.log("test");
  app.get('/index',index.render);
}

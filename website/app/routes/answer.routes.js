var User = require('../models/db.model.js');
module.exports = function(app, passport){
  app.get('/api/:major', [isLoggedIn, isInspector], function(req, res){
    var major = req.params.major;
    User.find({'jwcinfo.major': major}, function(err, result){
      if(err)
        res.send(err);
      else {
        res.send(result);
      };
    });
  });
  app.get('/answer/:major', function(req, res){
      res.render('checkanswer', {
        'major': req.params.major
      });
  })
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // res.redirect('/login');
    res.redirect('/auth/facebook'); // + (req.params.major ? '/' + req.params.major : '')); // if not login go ???
}
function isInspector(req, res, next){
  var admin = ['1054396421274449', '851752604887062'];
  User.findOne({'auth.facebook.id': req.user.auth.facebook.id}, function(err, user){
    if(err) {
        throw(err)
        return res.redirect('/');
    }
    for(var i=0 ; i<admin.length ; i++){
      if(user.auth.facebook.id ==admin[i]){
        return next();
      }
    }
    res.send('Permission denied')
    return ;
  });
}

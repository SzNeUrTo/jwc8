var User = require('../models/db.model.js');
module.exports = function(app, passport){
  app.get('/api/:major', [isLoggedIn, isInspector], function(req, res){
    var major = req.params.major;
    User.find({'jwcinfo.major':major}, function(err, result){
      if(err)
        res.send(err);
      else {
        res.send(result);
      };
    });
  });
  app.get('/answer/:major',[isLoggedIn, isInspector], function(req, res){
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
  var admin = ['1070017476387711','10205211876368799','10204941046040685','1054396421274449', '851752604887062','1067698436621377','10153949484311832','785138124919334','10154667655719517','1041454695911408','996216603800899'];
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

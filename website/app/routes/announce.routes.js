var User = require('../models/db.model.js');
var multer = require('multer');
module.exports = function(app, passport) {

  var storage = multer.diskStorage({
      destination: function(req, file, cb) {
          cb(null, './slip')
      },
      filename: function(req, file, cb) {
          cb(null, req.user.auth.facebook.id + '.jpg');
      }
  });
  var multerMiddle = multer({
      storage: storage,
      limits: {
          fileSize: 1000 * 1000 * 10, // not sure 10 MB
          //files: 1,
          //fields: 1
      }
  }).single('slip-pic');

  app.get('/announcement/:major', function(req, res, next){
    var major = req.params.major;
    var img = '/images/landing/register/web'+major+'.png';
    User.find({'jwcinfo.major': major}, function(err, result){
      var users = [];
      var i = 0;
      var num  = 1;//marketing
      if(major == 'content') num = 15;
      else if (mojor == 'design') num = 30;
      for(user of result){
        if(user.jwcinfo.specialquestion.answers[0].point == 1){
          var d = (user.jwcinfo.specialquestion.answers[1].point == 1)? 'ยืนยัน':'ไม่ยืนยัน';
          var data = {
            number: num,
            name: user.profile.firstname+' '+user.profile.lastname,
            money: 300+num/100,
            confirm: d
          }
          console.log(data)
          users.push(data);
          num++;
        }
        if(i == result.length-1){
          res.render('announce', {
            'img': img,
            'users': users,
            'major': major
          });
        }
        i++;
      }
    });
  });
  app.get('/confirm',[isLoggedIn] ,function(req, res, next){
    res.render('confirm');
  })

  app.post('/confirm',[isLoggedIn, multerMiddle], function(req, res){
    res.render('upload_conplete')
  })
  app.get('/update_list',[isLoggedIn, isInspector], function(req, res){
    var data = [
      //'851752604887062',
      '1054396421274449',//tester
      '785138124919334'//tester
    ];
    for(var i=0 ; i<data.length ; i++){
      User.findOne({'auth.facebook.id':data[i]}, function(err, user){
        if(err) res.send(err)
        else{
          user.jwcinfo.specialquestion.answers[0].point = 1;
          user.save(function(err){
            if(err) throw err;
            console.log('update complete');
          });
        }
      })
    }
    res.send('update user point')
  });
  app.get('/confirm/:id',[isLoggedIn, isInspector], function(req, res){
    var data = req.params.id;
      User.findOne({'auth.facebook.id':data}, function(err, user){
        if(err) res.send(err)
        else{
          user.jwcinfo.specialquestion.answers[1].point = 1;
          user.save(function(err){
            if(err) throw err;
            console.log('update slip complete');
          });
        }
      })
    res.send('update slip complete')
  });
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // res.redirect('/login');
    res.redirect('/authen/facebook/confirm'); // + (req.params.major ? '/' + req.params.major : '')); // if not login go ???
}
function isPass(req, res, next){
  User.findOne({'auth.facebook.id': req.user.auth.facebook.id}, function(err, user){
    if(err) {
        throw(err)
        return res.redirect('/');
    }
    if(user.jwcinfo.specialquestion.answers[0].point == 1){
      return next();
    }
    else{
      return res.redirect('/');
    }

  });
}
function isInspector(req, res, next){
  var admin = ['101291023609325','1131451180201008','1070017476387711','10205211876368799','10204941046040685','1054396421274449', '851752604887062','1067698436621377','10153949484311832','785138124919334','10154667655719517','1041454695911408','996216603800899'];
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

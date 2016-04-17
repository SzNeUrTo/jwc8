//var User = require('');
module.exports = function(app, passport) {
  app.get('/announcement/:major', function(req, res, next){
    var major = req.params.major;
    var result = [
      {
        number: '1',
        name: 'cal',
        lastname: 'sujautra',
        money: '300',
        confirm: 'no'
      },
      {
        number: '2',
        name: 'cal',
        lastname: 'sujautra',
        money: '301',
        confirm: 'no'
      }
    ];
    var img = '/images/landing/register/web'+major+'.png';
        res.render('announce', {
          'img': img,
          'users': result,
          'major': major
        });
    // User.find({'_______.major': major}, function(err, result){
    //   if(err) res.send(err);
    //   else{
    //     res.render('announce', {
    //       'users': result
    //     });
    //   }
    // });
  });
}

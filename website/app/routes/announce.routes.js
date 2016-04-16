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
        res.render('announce', {
          'users': result
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

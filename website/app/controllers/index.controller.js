exports.render = function(req, res){
  var pictures = [
    'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
    'https://pixabay.com/static/uploads/photo/2014/03/29/09/17/cat-300572_960_720.jpg',
    'http://pngimg.com/upload/cat_PNG1631.png'
  ];
  res.render('index',{
    'pictures': pictures
  });
}

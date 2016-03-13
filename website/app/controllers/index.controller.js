exports.render = function(req, res){
  var pictures = [
    '/pictures/sponser/Logo_Jankasem.png',
    '/pictures/sponser/Logo_WebSamakom.png'
  ];
  res.render('index',{
    'pictures': pictures
  });
}

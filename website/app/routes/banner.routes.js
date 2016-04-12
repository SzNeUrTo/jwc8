module.exports = function(app){
  app.get('/banner', function(req, res){
    res.render('banner')
  })
}

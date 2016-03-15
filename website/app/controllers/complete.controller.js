exports.render = function(req, res) {
	res.render('test');
}
exports.renderPost = function(req, res){
	console.log(req.body);
	res.render('test');
}

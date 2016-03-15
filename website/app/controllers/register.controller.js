exports.render = function(req, res) {
	res.render('registerform',{
		'major': req.body.major
	});
}

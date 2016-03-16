exports.render = function(req, res) {
	var major = req.params.major;
	res.render('registerform',{
		'major': major
	});
}

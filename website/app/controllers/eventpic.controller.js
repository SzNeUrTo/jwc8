exports.render = function(req, res) {
	var pictures = [''];
	res.render('eventpic',{
		'test': 'test',
		'pictures': pictures
	});
}

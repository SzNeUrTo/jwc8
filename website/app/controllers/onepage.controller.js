exports.render = function(req, res) {
	var pictures = [
		'/pictures/sponser/Logo_Jankasem.png',
			'/pictures/sponser/Logo_WebSamakom.png'
	];
	var eventPic = ['/pictures/sponser/Logo_Jankasem.png',
		'/pictures/sponser/Logo_WebSamakom.png',
		'/pictures/sponser/Logo_WebSamakom.png',
		'/pictures/sponser/Logo_WebSamakom.png',
		'/pictures/sponser/Logo_Jankasem.png',
			'/pictures/sponser/Logo_WebSamakom.png',
			'/pictures/sponser/Logo_WebSamakom.png',
			'/pictures/sponser/Logo_WebSamakom.png',
			'/pictures/sponser/Logo_Jankasem.png',
	      '/pictures/sponser/Logo_WebSamakom.png',
	      '/pictures/sponser/Logo_WebSamakom.png',
	      '/pictures/sponser/Logo_WebSamakom.png'];

	res.render('test',{
		'pictures': pictures,
		'event': eventPic
	});
}

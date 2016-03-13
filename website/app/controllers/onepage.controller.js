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

	res.render('onepage',{
		'pictures': pictures,
		'event': eventPic
	});
}

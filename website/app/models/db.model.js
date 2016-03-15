var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var authSchema = mongoose.Schema({
	auth_type: String,
	local: {
		username: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

var profileSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	nickname: String,
	birthdate: String, // or Date
	sex: String,
	age: Number,
	religion: String,
	school: String,
	level: String,
	major: String,
	position: String,
	tel: String,
	email: String,
	size: String,
	contact_person: {
		firstname: String,
		lastname: String,
		relation: String,
		emergency_tel: String
	}

});

var answerSchema = mongoose.Schema({
	answer: String,
	point: Number
});

var jwcinfoSchema = mongoose.Schema({
	major: String,
	generalquestion : {
		answers : [answerSchema]
	},
	specialquestion : {
		answers : [answerSchema]
	}
});

var userSchema = mongoose.Schema({
	auth: authSchema,
	profile: profileSchema,
	jwcinfo: jwcinfoSchema,
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);

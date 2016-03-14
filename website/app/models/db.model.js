// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var userSchema = new Schema({
// 	name: String
// });

// var User = mongoose.model('User', userSchema);
// module.exports = User;

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
	// auth_type: String,
	auth: {
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
	}
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);

var mongoose = require('mongoose'),
	crypto = require('crypto'); 

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('nodej db opened');	
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		userName: String,
		salt: String,
		hashed_pwd: String
	});
	userSchema.methods = {
		authenticate: function (passwordToMatch) {
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	}
	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function (err, collection) {
		if (collection.length === 0 ) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'gepran');
			User.create({firstName: 'Gari', lastName: 'Epranos', userName: 'gepran', salt: salt, hashed_pwd: hash});
			salt = createSalt();
			hash = hashPwd(salt, 'jvarson');
			User.create({firstName: 'Gio', lastName: 'Jvarson', userName: 'jvarson', salt: salt, hashed_pwd: hash});
			salt = createSalt();
			hash = hashPwd(salt, 'xose');
			User.create({firstName: 'Xose', lastName: 'Rodriges', userName: 'xose', salt: salt, hashed_pwd: hash});
		}
	})
};

function createSalt() {
	return crypto.randomBytes(128).toString('base64')
};

function hashPwd(salt, pwd) {
	hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
};
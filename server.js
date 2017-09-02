var express = require("express");

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'devlopment';

var app = express();

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());	
	
});
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('nodej db opened');	
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
	mongoMessage = messageDoc.message;
});


app.get('/partials/:partialsPath', function (req, res) {	
	res.render('partials/' + req.params.partialsPath);
});

app.get('*', function (req, res) {	
	res.render('index', {
		mongoMessage: mongoMessage
	});
}); 

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listen on Port ' + port + '...');
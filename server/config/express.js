var express = require("express"),
	passport = require('passport');

module.exports = function(app, config) {
	app.configure(function(){
		app.use(express.static(config.rootPath + '/public'));
		app.set('views', config.rootPath + '/server/views');
		app.engine('html', require('ejs').renderFile);
		app.set('view engine', 'html');
		app.use(express.logger('dev'));
		app.use(express.cookieParser());
		app.use(express.bodyParser());		
		app.use(express.session({secret: 'multi vision unicorn'}));
		app.use(passport.initialize());
		app.use(passport.session());
	});
}

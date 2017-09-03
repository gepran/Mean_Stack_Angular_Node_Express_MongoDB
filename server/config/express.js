var express = require("express");

module.exports = function(app, config) {
	app.configure(function(){
		app.use(express.static(config.rootPath + '/public'));
		app.set('views', config.rootPath + '/server/views');
		app.engine('html', require('ejs').renderFile);
		app.set('view engine', 'html');
		app.use(express.logger('dev'));
		app.use(express.bodyParser());		
	});
}
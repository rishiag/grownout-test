'use strict';

var mongoose = require('mongoose');
var passport = require('passport');

module.exports = function(app){
	
	(function register_route (){
		var RegisterCtrl = require('../controllers/register');
		app.post('/api/v1/auth/login', passport.authenticate('local'), RegisterCtrl.login);
		app.post('/api/v1/auth/register', RegisterCtrl.register);
		app.get('/api/v1/auth/logout', RegisterCtrl.logout);
	})();

	(function upload_route (){
		var UploadCtrl = require('../controllers/upload');
		app.post('/api/v1/upload', UploadCtrl.upload);
		app.post('/api/v1/save', UploadCtrl.save);
	})();

	(function contact_route (){
		var ContactCtrl = require('../controllers/contact');
		app.get('/api/v1/allcontacts', ContactCtrl.getAllContacts);
	})();
}
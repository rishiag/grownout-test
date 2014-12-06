var fs = require('fs');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var Contact = mongoose.model('Contact');
var async = require('async');
var path = require('path');

module.exports.upload = function(req, res){
	var newPath = path.normalize(__dirname + '/..' + '/uploaded_files' + req.user._id +'.csv')

	fs.readFile(req.files.file.path, function (err, data) {
	  fs.writeFile(newPath, data, function (err) {
	    res.send(200, {'status': 'success',
                'message' : 'Account created',
                'info' : 'File Uploaded'});
	  });
	});
}
module.exports.save = function(req, res){

	var newPath = path.normalize(__dirname + '/..' + '/uploaded_files' + req.user._id +'.csv')
	var flag = 0;
	csv
	 .fromPath(newPath, {headers : req.body, discardUnmappedColumns:true})
	 .on("data", function(data){
	 	if (flag === 1){
	 	var contact = {};
		contact.email = data.Email || null;
		contact.name = data.Name || null;
		contact.phone = Number(data.Contact) || null;
		contact.location = data.Location || null;
		contact.account = req.user._id;

		var contactObj = new Contact(contact);
			contactObj.save(function (err){
		 		if (err){
		 			console.log(err);
		 		}
		 		else {
		 			console.log("saved")
		 		}
		 	})
		}
		else {
			flag = 1;
		}

	 })
	 .on("end", function(){
	 	res.send(200,{
	 		'status': 'success',
	 		'message': 'successfully saved'
	 	})
	 });
	 
}

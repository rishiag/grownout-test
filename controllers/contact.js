var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var Contact = mongoose.model('Contact');
var async = require('async');

module.exports.get = function(req, res){
	Contact.find({
		account: req.user._id
	}, function(err, contacts){
		if (err){
			res.send(400,{
				'status': 'error',
				'message': 'Error retrieving contacts',
				'info': err
			})
		}
		else {
			res.send(200, {
				'status': 'success',
				'message': 'Contacts Successfully Retrieved',
				'info': contacts
			})
		}
	})
}

module.exports.getAllContacts = function (req, res) {
	var skip = 0, limit = 0, q;
	if(req.query.q) {
		q = {
			'name': new RegExp(req.query.q, "i"),
			'account' : req.user._id
		}
	}
	else {
		q = {
			'account' : req.user._id
		};
	}

	initQuery();

	function initQuery () {
		if(!req.query.totalCountPerPage) {
			limit = 10;
		}
		else {
			limit = req.query.totalCountPerPage;
		}
		if(!req.query.pageNumber) {
			skip = 0;
		}
		else {
			skip = ((req.query.pageNumber * 1) - 1) * limit
		}
	}

	async.parallel({
	    CONTACTS: function(callback) {
	    	getContacts(q, callback);
	    },
	    totalCount: function(callback) {
	    	getCount(q, callback);
	    }
	}, function(err, results) {
	    res.send(200, {
	    	'status' : 'success',
            'message' : 'Got contacts.',
            'info': results
        });
	});

	function getContacts (q, callback) {
		Contact.find(q, 
				{},  
				{sort: { 
					'name' : 1 
				},
				skip: skip, 
				limit: limit
			}, function (err, contacts) {

			callback(null, contacts || []);
		})
	}

	function getCount (q, callback) {
		Contact.count(q, function (err, count) {
			callback(null, count || 0);
		})
	}
}
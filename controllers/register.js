'use strict';
var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var _ = require('underscore');

module.exports.login = function (req, res) {
    res.send(200, {
    	'status': 'success',
        'message': 'Login successful',
        'info': req.user
    });
};

module.exports.register = function(req, res, next) {
    Account.register(new Account({ 
    	username : req.body.username, 
    	email: req.body.email, 
        }), req.body.password, function(err, account) {
        if (err) {
            res.send(400, {'status' : 'error',
                'message' : 'Error creating account',
                'info':  err });
        } else {
            res.send(200, {'status': 'success',
                'message' : 'Account created',
                'info' : account});
        }
    });
};

module.exports.logout = function(req, res) {
    if (req.isAuthenticated()) {
            req.session.destroy(function() {
        });

        req.logout();
    };
    res.send({  'status': 'success',
                'message': 'Logout successful',
                'info': ''
            });
};

module.exports.query = function(req,res) {
    Account.find({}, function(err,users) {
        if (err) {
            res.send(400, { 'status': 'error',
                        'message': 'Error getting list of users',
                        'info': JSON.stringify(err)
            });
        } else {
            res.send(200, { 'status': 'success',
                        'message': 'Got all users',
                        'info': JSON.stringify(users)
            });
        }
    }); 
}

module.exports.read = function(req,res) {
    Account.find({_id: req.params.user_id}, function(err,user) {
        if (err) {
            res.send(400, { 'status': 'error',
                        'message': 'Error getting user id ' + req.params.user_id,
                        'info': JSON.stringify(err)
            });
        } else {
            res.send(200, { 'status': 'success',
                        'message': 'Got user ' + req.params.user_id,
                        'info': JSON.stringify(user)
            });
        }
    });
}

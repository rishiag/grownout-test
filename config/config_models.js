'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

    var account = require('../models/account');
    var contact = require('../models/contact');

    mongoose.model('Account').schema.add({
        account: {type: Schema.ObjectId, ref: 'Account'}
    });
};
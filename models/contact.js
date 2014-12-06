'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
	name: {type: String},
	email: {type: String},
	phone: {type: Number},
	location: {type: String},
	account: {type: Schema.ObjectId, ref: 'Account'}
})

module.exports = mongoose.model('Contact', ContactSchema);
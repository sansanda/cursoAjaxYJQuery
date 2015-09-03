'use strict';
var mongoose = require('../../config/mongoose'),
	Schema = mongoose.Schema;

var schemas = {

	userSchema : new Schema({
		username : {type : String, unique : true},
		password : {type : String}
	})

};

module.exports = schemas;
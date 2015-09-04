'use strict';
var mongoose = require('../../config/mongoose'),
	Schema = mongoose.Schema;

var schemas = {

	bookSchema : new Schema({
		title : {type : String},
		slug : {type : String},
		summary : {type : String},
		author : {type : String},
		image : {type : String}
	}),
	commentSchema : new Schema({
		user : {type : Schema.Types.ObjectId, ref : 'user'},
		book : {type : Schema.Types.ObjectId, ref : 'book'},
		comment : {type : String}
	})

};

module.exports = schemas;
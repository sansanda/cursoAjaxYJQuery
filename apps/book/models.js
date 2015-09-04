'use strict';
var mongoose = require('../../config/mongoose'),
	bookSchema = require('./schemas').bookSchema,
	commentSchema = require('./schemas').commentSchema;

var models = {

	Book : mongoose.model('book', bookSchema),
	Comment : mongoose.model('comment', commentSchema)

};

module.exports = models;
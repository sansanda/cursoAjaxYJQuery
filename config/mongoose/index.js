'use strict';
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + 'Libreria');

module.exports = mongoose;
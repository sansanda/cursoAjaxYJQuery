'use strict';
var express = require('express'),
	router = express.Router(),
	isLoggedIn = require('../user/middlewares').isLoggedIn,
	formidable = require('formidable'),
	path = require('path'),
	slug = require('slug'),
	fs = require('fs'),
	Book = require('./models').Book,
	Comment = require('./models').Comment;

router.route('/libro/:book_slug')

	.get(function (req, res) {
		Book.findOne({slug : req.params.book_slug}).exec()
		.then(function (book) {
			Comment.find({book : book}).exec()
			.then(function (comments) {
				res.render('book/book_detail.html', {book : book, comments : comments});
			});
		});
	})
	.post(function (req, res) {
		Book.findOne({slug : req.params.book_slug}).exec()
		.then(function (book) {
			var comment = new Comment({
				user : req.user,
				book : book,
				comment : req.body.comment
			});
			comment.save(function (err) {
				if (err) {
					console.log(err);
					return;
				};
				res.redirect('/libro/'+ req.params.book_slug +'/');
			});
		});
	});

router.route('/footer/')
	.get( function (req, res){
		res.render('components/footer.html');
	});

router.route('/datos-json/')
	.get( function (req, res){
		var datos = [
			{
				"nombre": "Julio",
				"telefono": "345 567",
				"casado": false
			},
			{
				"nombre": "Kevin",
				"telefono": "678 980",
				"casado": true
			},
			{
				"nombre": "Eduardo",
				"telefono": "345 678",
				"casado": false
			},
			{
				"nombre": "Saul",
				"telefono": "568 456",
				"casado": true
			}
		];

		res.json(datos);
	});

router.route('/admin/crear-libro/')

	.get(isLoggedIn, function (req, res) {
		res.render('book/book_create.html');
	})
	.post(isLoggedIn, function (req, res) {
		var form = new formidable.IncomingForm();
		var path_file = path.join(__dirname, '..', '..', 'media', 'books');
		form.uploadDir = path_file;
		form.parse(req, function (err, fields, files) {
			var book = new Book({
				title : fields.title,
				slug : slug(fields.title.toLowerCase()),
				summary : fields.summary,
				author : fields.author,
				image : req.MEDIA_URL + '/books/' + files.image.name
			});
			book.save(function (err) {
				if (err) {
					console.log(err);
					return;
				};
			});
		});
		form.on('end', function (fields, files) {
			var file_name = this.openedFiles[0].path;
			var new_file_name = this.openedFiles[0].name;
			fs.rename(file_name, path_file + '/' + new_file_name, function (err, stats){
				if (err) {console.log(err)};
				res.redirect('/admin/crear-libro/');
			});
		});
	});

module.exports = router;
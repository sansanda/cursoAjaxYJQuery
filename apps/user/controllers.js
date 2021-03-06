'use strict';
var express = require('express'),
	router = express.Router(),
	User = require('./models').User;


router.route('/salir/')

	.get(function (req, res) {
		req.logout();
		res.redirect('/');
	});

router.route('/ingresar/')

	.get(function (req, res) {
		var context = {
			error_message : req.flash('error')[0]
		};
		res.render('user/login.html', context);
	});


router.route('/registrar/')

	.get(function (req, res) {
		res.render('user/register.html');
	})
	.post(function (req, res) {
		var user = new User({
			username : req.body.username,
			password : req.body.password
		});
		user.save(function (err) {
			if (err) {console.error(err)};
			res.redirect('/');
		});
	});

router.route('/usuario/')

	.get(function (req, res) {
		User.findOne({username: req.query.username})
		.then( function( usuario ){
			if (usuario) {
				res.send(usuario);
			} else {
				res.send('No se encontro');
			}
		});
	});

module.exports = router;
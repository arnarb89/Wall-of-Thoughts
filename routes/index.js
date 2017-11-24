'use strict';

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	if(typeof req.session.user === 'undefined'){
	 res.redirect('login');
	}
	else {
		res.redirect('thewall');
	}
	console.log(req.session);
	res.render('index', {session : req.session });
});

module.exports = router;

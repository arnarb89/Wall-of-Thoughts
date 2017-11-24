'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var bcrypt = require('bcrypt-nodejs');


/* GET home page. */
router.get('/', function(req, res) {
    if(typeof req.session.user !== 'undefined'){
        res.redirect('thewall');
    }
    else {
        res.render('register');
    }
});

/* GET home page. */
router.post('/', function(req, res) {

    bcrypt.hash(req.body.password, null, null, function(err, hash) {


        var queryStr = "INSERT INTO users (username, password) VALUES ($1, $2)";
        dbUtils.queryDb(queryStr, [req.body.username,hash], function(err) {
            if(err) {
                console.error('error fetching client from pool', err);
                res.render('register', 
                    {theError: 'This user already exists. '});
            }
            var renderData = {};
            renderData.msg = 'Welcome to Wall of Thoughts, ';
            renderData.user = req.body.username;
            res.render('register', renderData);
        });
    });
});


module.exports = router;

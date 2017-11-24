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
  res.render('login', { title: 'Welcome!' });
});

/* GET home page. */
router.post('/', function(req, res) {
  //ÞETTA VELDUR SQL INJECTION!!! t.d ' OR '1' = '1
  // var queryStr = "SELECT * from users WHERE username = '"+req.body.username+
  //                "' AND password = '"+ req.body.password+"'";
  // var parameters = null;

  var queryStr = "SELECT * FROM users WHERE username = $1;";


  //var hash = bcrypt.hashSync(req.body.password);
  //console.log('thehash is: '+hash);

  var parameters = [req.body.username];

  dbUtils.queryDb(queryStr, parameters, function(err,result) {
    if(err) {
      return console.error('error fetching client from pool', err);
  }
  var user =  result.rows[0];
  var correctLogin = false;
    if(user){
      correctLogin = bcrypt.compareSync(req.body.password, 
        user.password);
    }
    else {
        console.log('wrong user');
        res.render('login',{theError: 'There is no user with that name. '});
    }

    if (correctLogin) {
      // Regenerate session when signing in
      // to prevent fixation
        console.log('correct user and password');
        req.session.regenerate(function(){
            req.session.user = user;
            //res.redirect('/profile/'+user.username);
            res.redirect('thewall');
            //res.redirect('/');
        });
    }
    else {
        console.log('wrong password');
        res.render('login',{theError: 'Wrong password. '});
    }

});



});


module.exports = router;

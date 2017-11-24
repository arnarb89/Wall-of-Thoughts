'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');

/* GET home page. */
router.get('/:name', function(req, res) {
    var renderData = {};
    //renderData.session = req.session;
    var queryStr = "SELECT * FROM users WHERE username= $1";
    var parameters = [req.params.name];


    dbUtils.queryDb(queryStr, parameters, function(err, results){
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      renderData.user = results.rows[0];

      if(req.session && req.session.user &&
         req.session.user.username === req.params.name) {
           console.info(req.session.user);
        res.render('profile', {
          greeting: 'Velkominn á þitt svæði '+req.session.user.username + '!',
          session: req.session
        });
      } else {
        renderData.greeting = 'Þetta svæði á notandinn '+
                                  req.params.name+ '... pillaðu þér!';
        //renderData.session = req.session;
        res.render('profile', renderData);
      }
    });


});


module.exports = router;

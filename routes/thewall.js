/*jslint maxlen: 130, shadow:true */
'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');

/* GET home page. */
router.get('/', function(req, res) {
    var renderData = {};
    if(typeof req.session.user === 'undefined'){
        res.redirect('login');
    }
    else{
        var queryStr = "DROP VIEW IF EXISTS tempo; "+
            "CREATE VIEW tempo AS SELECT * FROM POSTS WHERE depth = 0 ORDER BY id DESC LIMIT 20; "+
            "WITH RECURSIVE swag AS ( "+
            "SELECT e.*, 0 as newdepth FROM tempo e "+
            "UNION ALL "+
            "SELECT e.*, t.newdepth + 1 as newdepth FROM posts e "+
            "INNER JOIN swag t "+
            "ON t.id = e.parent ) "+
            "SELECT * FROM swag ORDER BY id;";


        dbUtils.queryDb(queryStr, null, function(err, results){

            if(err) {
                console.error(err);
                renderData.searchResults = 'villa kom upp!';
            } 
            else {
                renderData.results = results;
                


                var queryStr2 = "SELECT id FROM POSTS "+
                    "ORDER BY id DESC LIMIT 1;";

                dbUtils.queryDb(queryStr2, null, function(err, results){

                    if(err) {
                        console.error(err);
                        renderData.searchResults = 'villa kom upp!';
                    } 
                    else {
                        renderData.theId = results;
                        renderData.session = req.session;
                        res.render('thewall', renderData);
                    }
                });
            }
        });
    }
});

router.post('/', function(req, res) {
    if(req.body.hiddenparent===""){
        var queryStr = "INSERT INTO posts (theusername, text,date,depth) VALUES ($1, $2, $3, $4)";
        dbUtils.queryDb(queryStr, 
            [req.session.user.username,req.body.hiddentext, 
            new Date(),req.body.hiddendepth], function(err) {
                res.redirect('thewall');
            if(err) {
                return console.error('error fetching client from pool', err);
            }
        });


    }else{
        var queryStr = "INSERT INTO posts (theusername, text,date,depth,parent ) VALUES ($1, $2, $3, $4,$5)";
        dbUtils.queryDb(queryStr, [req.session.user.username,req.body.hiddentext, 
            new Date(),req.body.hiddendepth,req.body.hiddenparent], function(err) {
                res.redirect('thewall');
            if(err) {
                return console.error('error fetching client from pool', err);
            }
        });
    }    
});

module.exports = router;

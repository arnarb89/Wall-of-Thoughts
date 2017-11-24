'use strict';
var pg = require('pg');
//var conString = 'postgres://krkexcjmicdyea:ctHjYGsxEs581nw_TFG-Wc-e8X@ec2-46-137-72-123.eu-west-1.compute.amazonaws.com:5432/d7notqdphhfuja';
//var conString = 'postgres://postgres:swag@localhost:5432/v6';
var conString = 'postgres://vglyrghzsxfzyv:R1HUs_H1ZQc77w6K3XPiPXlIrw@ec2-54-247-170-228.eu-west-1.compute.amazonaws.com:5432/d699rj0p7er7mk';

exports.queryDb = function(queryStr, parameters, then) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(queryStr, parameters, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) {
        return then(err, null);
      }
      then(null, result);
    });
  });
};

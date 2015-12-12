'use strict';
var express = require("express");
//var passport = require("passport");
var gmail = require('./modules/gmail-client');

var app = express();

gmail.setupLoginPages(app)
  
  

//gmail.fetchEmail("some_api_key");

var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = process.env.IP;
  var port = process.env.PORT;

  console.log('Example app listening at http://%s:%s', host, port);
});



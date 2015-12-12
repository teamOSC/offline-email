'use strict';
var express = require("express");
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./.emailDB');
var exotel = require('./modules/exotel-client');

var app = express();

// gmail.setupLoginPages(app)
  
  

//gmail.fetchEmail("some_api_key");

app.get ('/new_email', function(req, res) {
    console.log('email_sender = ' + req.query.email_sender);
    console.log('email_text = ' + req.query.email_text);
    console.log('email_subject = ' + req.query.email_subject);
    localStorage.setItem('email_sender', req.query.email_sender);
    localStorage.setItem('email_text', req.query.email_text);
    localStorage.setItem('email_subject', req.query.email_subject);
    exotel.makeCall('09953778004');
    res.send("easy there boy!");
});

app.get('/email_read', function(req, res) {
   var sender = localStorage.getItem('email_sender');
   var text = localStorage.getItem('email_text');
   var talk = "Hi, You received a new email from " + sender + " which reads as " + text;
   res.set('Content-Type', 'text/plain');
   res.send(talk);
});

app.listen(process.env.PORT);


'use strict';
var secrets = require("./client_secrets.json")
var express = require("express");
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./userDB');

passport.use(new GoogleStrategy({
    clientID: secrets.web.client_id,
    clientSecret: secrets.web.client_secret,
    callbackURL: "https://offline-email-championswimmer.c9users.io/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    localStorage.refreshToken = refreshToken;
    localStorage.accessToken = accessToken;
    console.log("refresh token = " + refreshToken);
    console.log("access token = " + accessToken);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

var GmailClient = {
    globalVar : "aaaa",
}

GmailClient.setupLoginPages = function(app) {
  
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

    app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                          'https://www.googleapis.com/auth/userinfo.email'],
                                  accessType: 'offline', approvalPrompt: 'force' }));

  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("req = " + req);
    // res.redirect('/');
  });
  

}

GmailClient.fetchEmail = function(fetchEmail) {
    console.log('fetching email ' + this.globalVar);
}

GmailClient.passport = passport;

module.exports = GmailClient;

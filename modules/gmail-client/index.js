'use strict';
var secrets = require("./client_secrets.json")
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./userDB');

GoogleStrategy.prototype.userProfile = function(token, done) {
  done(null, {})
}

passport.use(new GoogleStrategy({
    clientID: secrets.web.client_id,
    clientSecret: secrets.web.client_secret,
    callbackURL: "https://offline-email-championswimmer.c9users.io/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    localStorage.refreshToken = refreshToken;
    localStorage.accessToken = accessToken;
    console.log("refresh token = " + localStorage.refreshToken);
    console.log("access token = " + localStorage.accessToken);
  }
));

var GmailClient = {
    globalVar : "aaaa",
}

GmailClient.setupLoginPages = function(expressApp) {
    expressApp.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/gmail.modify' }));
  
  expressApp.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req);
    // res.redirect('/');
  });
  
}

GmailClient.fetchEmail = function(fetchEmail) {
    console.log('fetching email ' + this.globalVar);
}

GmailClient.passport = passport;

module.exports = GmailClient;

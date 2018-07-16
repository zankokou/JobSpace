var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080;
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// passport js

////////////////
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
///


var path = require('path');

app.use('/public',express.static(path.join(__dirname + '/public')))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require("./controllers/burgers_controller.js");
// var indexRoute = require("./controllers/indexRoute.js");
app.use(routes);
// app.use(indexRoute);


console.log('test commit -scott');
console.log('quick push test for git')
console.log("test test test test");

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});


console.log('here is my branch console log.')
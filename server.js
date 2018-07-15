var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080;
var app = express();
var authRoutes = require('/routes/auth-routes');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var register = require('controllers/register.js');
  
//
/*app.use('/register', register);
///
var session = require('express-session');

app.use(session({
 secret: 'secret',
 resave: true,
 saveUninitialized: false,
 cookie: { maxAge: 60000, secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({
    passReqToCallback : true,
    usernameField: 'username'
},
function(req, username, password, done){
console.log('called local');
 pg.connect(connectionString, function (err, client) {
   
   console.log('called local - pg');

   var user = {};

     var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

     query.on('row', function (row) {
       console.log('User obj', row);
       console.log('Password', password)
       user = row;
       if(password == user.password){
         console.log('match!')
         done(null, user);
       } else {
         done(null, false, { message: 'Incorrect username and password.' });
       }
       
     });

     // After all data is returned, close connection and return results
     query.on('end', function () {
         client.end();
     });

     // Handle Errors
     if (err) {
         console.log(err);
     }
 });

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
 });
 
 passport.deserializeUser(function(id, done) {
       console.log('called deserializeUser');
       pg.connect(connection, function (err, client) {
       
         var user = {};
         console.log('called deserializeUser - pg');
           var query = client.query("SELECT * FROM users WHERE id = $1", [id]);
       
           query.on('row', function (row) {
             console.log('User row', row);
             user = row;
             done(null, user);
           });
       
           // After all data is returned, close connection and return results
           query.on('end', function () {
               client.end();
           });
       
           // Handle Errors
           if (err) {
               console.log(err);
           }
       });
 
 });
*/
 
var path = require('path');

app.use('/public',express.static(path.join(__dirname + '/public')))

app.use('/auth',authRoutes)
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
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20");
const keys = require('/keys');

passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
},
function(accessToken, refreshToken, profile, done) {
     User.findOrCreate({ googleId: profile.id }, function (err, user) {
       return done(err, user);
     });
}
));
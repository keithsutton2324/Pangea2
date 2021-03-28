const bcrypt = require("bcrypt");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use("local", new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  (username, password, done) => {
    try {
      db.User.findOne({
        username: username
      }).then(function (dbUser) {
        if (dbUser === null) {
          return done(null, false, { message: 'bad username' });
        } else {
          dbUser.validPassword(password).then(response => {
            if (response !== true) {
              return done(null, false, { message: 'passwords do not match' });
            }
            // note the return needed with passport local - remove this return for passport JWT
            return done(null, dbUser);
          });
        }
      });
    } catch (err) {
      done(err);
    }
  },
),
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;

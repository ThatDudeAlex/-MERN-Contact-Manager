const LocalStrategy = require("passport-local").Strategy;
const User = require("../database/models/User");

const Strategy = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },

      function (username, password, done) {
        User.findOne({ username: username }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (!user.validPassword(password)) {
            return done(null, false);
          }
        //   const userId = user._id
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (_id, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });
};

module.exports = Strategy;

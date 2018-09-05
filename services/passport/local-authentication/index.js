const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
        proxy: true
      },
      async (req, email, password, done) => {
        try {
          const existingUser = await User.findOne({ email });
          // if no user is found, return the message
          if (!existingUser) {
            return done(null, false, {
              error: true,
              errorType: 'form',
              message: 'Invalid email or password. Please try again.'
            });
          }
          // if the user is found but the password is wrong
          if (existingUser.password !== password) {
            return done(null, false, {
              error: true,
              errorType: 'form',
              message: 'Please enter a valid password and try again.'
            });
          }
          // all is well, return successful user
          return done(null, existingUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

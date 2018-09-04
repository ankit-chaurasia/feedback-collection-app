const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../../../config/keys');

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebookAppID,
        clientSecret: keys.facebookAppSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({ facebookId: profile.id }).save();
        done(null, user);
      }
    )
  );
};

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

require('./google-authentication')(passport);
require('./facebook-authentication')(passport);
require('./local-authentication')(passport);

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const status = require('./responses/status');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.post('/auth/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).send(info);
        return;
      }
      res.send(user);
    })(req, res, next);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(status.OK.code).send({
          error: true,
          errorType: 'field',
          errorFieldName: 'email',
          message: 'This email is already taken.'
        });
      } else {
        const user = await new User({
          fullName,
          email,
          password
        }).save();
        res.status(status.OK.code).send(user);
      }
    } catch (err) {
      return res.send(err);
    }
  });
};

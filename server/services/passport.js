const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const JwtStrategy = Strategy;
const LocalStratgey = require('passport-local'); 

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStratgey(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err, false); }
    if (!user) { return done(null, false); }

    return done(null, user);
  });
}); 

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err, false); }
      if (!isMatch) { return done(null, false); }
      
      return done(null, user);
    });
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

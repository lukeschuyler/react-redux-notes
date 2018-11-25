const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(422).json({ error: 'You must provide an email and password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }


    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use.' });
    } 

    const user = new User({ email, password });

    user.save(err => {
      if(err) { return next(err); }
      
      return res.json({ token: tokenForUser(user), userId: user._id });
    });
  }); 
}

exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) { return next(err); }

    if (!user) {
      return res.status(404).send({ error: 'Cannot find user with that email.' });
    } 
    
    user.comparePassword(password, (err, match) => {
      if (err) { return next(err); }
      
      if (match) {
        console.log(user._id)
        return res.json({ token: tokenForUser(req.user), userId: user._id });
      } else {
        return res.status(422).send({ error: 'Incorrect Password.' });
      }
    });
    
  }); 

}

const jwt = require('jwt-simple');
const crypto = require('crypto');
const config = require('../config');
const User = require('../models/user');
const UserToken = require('../models/userToken');

function jwtForUser(user) {
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
      
      return res.json({ token: jwtForUser(user), userId: user._id });
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
        return res.json({ token: jwtForUser(req.user), userId: user._id });
      } else {
        return res.status(422).send({ error: 'Incorrect Password.' });
      }
    });
    
  }); 
}

exports.signupMobile = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!(email && password && firstName && lastName )) {
    return res.status(422).json({ error: 'You must provide an email and password.' });
  }
  
  try {
    const user = await User.findOne({ email });
    console.log('USER', user);
    if (user) {
      return res.status(422).send({
        error: 2,
        msg: 'Email is in use.'
      });
    }
    const newUser = new User({ email, password, firstName, lastName });
    await newUser.save();
    
    const token = await crypto.randomBytes(16).toString('hex');
    await UserToken.create({ token, _user_id: newUser._id });

    return res.json({ token, userId: newUser._id });
  } catch (e) {
    return res.status(401).send({
      error: 2,
      msg: 'Something went wrong.'
    });
  }
}

exports.signinMobile = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email)
  const userRecord = await User.findOne({ email });

  // If no such token exists, or it is expired, bail.
  if (!userRecord) {
    return res.status(404).json({
      error: 2,
      msg: 'Email and password are incorrect.'
    });
  }
  
  // TODO: avoid callback 
  userRecord.comparePassword(password, (err, match) => {
    if (err) { return next(err); }

    if (match) {
      return comapreSuccess(userRecord, res);
    } else {
      return res.json({
        error: 2,
        msg: 'Incorrect password.'
      });
    }
  });
}

exports.logoutMobile = async (req, res, next) => {
  const token = req.param('token');

  try {
    await UserToken.deleteOne({ token });
  } catch (e) {
    console.log(e);
    return res.json({
      error: 2,
      msg: 'Something went wrong.'
    });
  }
  
  return res.json({
    success: true,
  });
}

exports.checkToken = async (req, res, next) => {
  const token = req.param('token');
  
  try {
    var validToken = await UserToken.findOne({ token });
    console.log("VALID", validToken)
  } catch (e) {
    console.log(e);
    return res.json({
      error: 2,
      msg: 'Something went wrong.'
    });
  }

  return res.json({
    success: true,
    userId: validToken._user_id,
  });
}

async function comapreSuccess(userRecord, res) {
  const token = crypto.randomBytes(16).toString('hex');

  try {
    // destroy all existing tokens ensuring there is only one per user at a time
    await UserToken.deleteOne({ _user_id: userRecord._id });

    // create new token
    await UserToken.create({
      token,
      _user_id: userRecord._id
    });

  } catch (e) {
    console.log(e);
    return res.json({
      error: 2,
      msg: 'Something went wrong, please try again later.'
    });
  }
  
  return res.json({
    email: userRecord.email,
    id: userRecord._id,
    token
  });
}

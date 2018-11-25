const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) { return next(err); }
    return res.json({ users });
  }); 
}

exports.deleteUser = (req, res, next) => {
  extendedUserFind(req, res, next, function(req, res, next, user) {
    User.deleteOne({ _id: id }, err => {
      if (err) { return next(err); }
      return res.json({ user });
    });
  });
}

exports.updateUser = (req, res, next) => {
  extendedUserFind(req, res, next, function(req, res, next, user) {
    User.update({ username, password }, err => {
      if (err) { return next(err); }
      return res.json({ user });
    });
  });
}

const extendedUserFind = (req, res, next, action) => {
  const { id } = req.params;
  User.findOne({ _id: id }, (err, user) => {
    if (err) { return next(err); }
    
    if (!user) {
      return res.status('404').json({ message: 'No user found.' });
    }
    
    action(req, res, next, user);
  }); 
}

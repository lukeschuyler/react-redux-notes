const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs'); 

const userTokenSchema = new Schema({
  _user_id: { type: String, ref: 'User' },
  password: String
});

// On save hook encrypt password
userSchema.pre('save', function(next) { // NEEDS ES5 FUNCTION SYNTAX FOR REFERENCE TO THIS!!!!
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) { // NEEDS ES5 FUNCTION SYNTAX FOR REFERENCE TO THIS!!!!
  if (err) { return callback(err); }
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { 
    callback(null, isMatch);
  });
}

const User = mongoose.model('user', userSchema);

module.exports = User;

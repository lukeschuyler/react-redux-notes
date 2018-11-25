const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs'); 

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
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

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { // NEEDS ES5 FUNCTION SYNTAX FOR REFERENCE TO THIS!!!!
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

const User = mongoose.model('user', userSchema);

module.exports = User;

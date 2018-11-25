const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs'); 

const userTokenSchema = new Schema({
  _user_id: { type: String, ref: 'User' },
  token: String
});

const UserToken = mongoose.model('user_token', userTokenSchema);

module.exports = UserToken;

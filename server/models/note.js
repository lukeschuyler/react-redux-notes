const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs'); 

const noteSchema = new Schema({
  _user_id: { type: String, ref: 'User' },
  content: { type: String },
  timestamp: { type: Date, default: Date.now() },
  email: { type: String },
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;

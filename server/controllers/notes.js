const Note = require('../models/note');
const User = require('../models/user');

exports.addNote = (req, res, next) => {
  const { _user_id, content } = req.body;
  const note = new Note({ _user_id, content })
  note.save(err => {
    if (err) { return next(err); }
    return res.json({ note });
  }); 
}

exports.deleteNote = (req, res, next) => {
  const { id } = req.params;

  Note.findOne({ _id: id }, (err, note) => {
    if (err) { return next(err); }
    
    if (!note) {
      return res.status('404').json({ message: 'No Note found.' });
    }
    
    Note.deleteOne({ _id: id }, err => {
      if (err) { return next(err); }
      return res.json({ note });
    });
  }); 
}

exports.getNotes = (req, res, next) => {
  const { userId } = req.params;
  Note.find({ _user_id: userId }, (err, notes) => {
    if (err) { return next(err); }
    User.find((err, users) => {
      let newNotes = assignUserEmails(notes, users);
      return res.json({ notes: newNotes });
    });
  }); 
}

exports.getAllNotes = (req, res, next) => {
  Note.find((err, notes) => {
    if (err) { return next(err); }
    User.find((err, users) => {
      let newNotes = assignUserEmails(notes, users);
      return res.json({ notes: newNotes });
    });
  }); 
}

const assignUserEmails = (notes, users) => 
  notes.map(n => {
    let email;
    users.forEach(u => {
      if (u._id == n._user_id) {
        email = u.email;
      }
    });
    n.email = email;
    return n;
  });

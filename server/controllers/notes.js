const Note = require('../models/note');
const User = require('../models/user');
const UserToken = require('../models/userToken');

exports.addNote = async (req, res, next) => {
  const { content } = req.body;

  let _user_id;
  if (req.param('token')) {
    let token = await UserToken.findOne({ token: req.param('token') });
    _user_id = token._user_id;
  } else {
    _user_id = req.body._user_id;
  }
  
  const note = new Note({ _user_id, content })
  note.save(err => {
    if (err) { return next(err); }
    let ts = new Date(note.timestamp);
    let newNote = { ...note._doc, timestamp: ts.toDateString() }
    return res.json({ note: newNote });
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
  Note.find().sort({timestamp: 'desc'}).exec((err, notes) => {
    if (err) { return next(err); }
    User.find((err, users) => {
      let newNotes = assignUserEmails(notes, users);
      console.log(newNotes)
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

    let timestamp = new Date(n.timestamp);
    timestamp = timestamp.toDateString();

    return { ...n._doc, timestamp, email };
  });

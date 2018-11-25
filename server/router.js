const Authentication = require('./controllers/authentication');

// Users
const { getUsers, deleteUser } = require('./controllers/users.js');

// Notes
const { addNote, deleteNote, getNotes, getAllNotes } = require('./controllers/notes.js');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false  });


module.exports = function (app) {
  // default
  app.get('/', requireAuth, (req, res, next) => {
    res.send({ hi: 'there' });
  });

  // user/auth
  app.post('/signup', Authentication.signup);  
  app.post('/signin', requireSignIn, Authentication.signin);
  app.get('/users', getUsers);
  app.post('/users/delete/:id', deleteUser);
  
  // notes
  app.get('/notes/:userId', getNotes);
  app.get('/notes/', getAllNotes);
  app.post('/notes/add/', addNote);
  app.post('/notes/delete/:id', deleteNote);
}

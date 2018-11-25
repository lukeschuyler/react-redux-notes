// Auth actions
const Authentication = require('./controllers/authentication');

// User actions
const { getUsers, deleteUser } = require('./controllers/users.js');

// Note actions
const { addNote, deleteNote, getNotes, getAllNotes } = require('./controllers/notes.js');


// Passport strats
const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false  });


module.exports = function (app) {
  // default
  // protects react web client
  app.get('/', requireAuth, (req, res, next) => {
    res.send({ hi: 'there' });
  });

  // user/auth WEB
  app.post('/signup', Authentication.signup);  
  app.post('/signin', requireSignIn, Authentication.signin);
  app.get('/users', getUsers);
  app.post('/users/delete/:id', deleteUser);
  
  // user/auth MOBILE
  app.post('/mobile/signup', Authentication.signupMobile);  
  app.post('/mobile/signin', Authentication.signinMobile);

  // notes
  app.get('/notes/:userId', getNotes);
  app.get('/notes/', getAllNotes);
  app.post('/notes/add/', addNote);
  app.post('/notes/delete/:id', deleteNote);
}

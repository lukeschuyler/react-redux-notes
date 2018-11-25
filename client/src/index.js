import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Welcome from './components/Welcome';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import Signup  from './components/auth/Signup';
import Signout  from './components/auth/Signout';
import Signin  from './components/auth/Signin';
import reducers  from './reducers';

import style from './index.css';

const INITIAL_APP_STATE = {
  auth: { 
    authenticated: localStorage.getItem('token'), 
    userId: localStorage.getItem('userId') 
  }
}

const store = createStore(
  reducers,
  INITIAL_APP_STATE,
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Route path="/" exact component={Welcome} />
          <Route path="/signup" component={Signup} />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" component={Signin} />
          <Route path="/notes" component={Notes} />
          <Route path="/add-note" component={AddNote} />
        </App>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

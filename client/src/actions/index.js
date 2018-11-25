import { 

  // USER
  AUTH_USER, 
  AUTH_ERROR, 
  GET_USERS, 
  DELETE_USER, 
  
  // NOTE
  ADD_NOTE, 
  DELETE_NOTE, 
  GET_ALL_NOTES, 
  GET_USER_NOTES, 
  NOTES_ERROR 

} from './types';

import axios from 'axios';

// USER
export const signup = (formProps, cb) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8000/signup', formProps);
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('token', response.data.token);
    cb();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email is in use.' })
  }
};

export const signin = (formProps, cb) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8000/signin', formProps);
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('token', response.data.token);
    cb();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'No user matches these credentials.' });
  }
};


export const deleteUser = id => {
  return { type: DELETE_USER, payload: id }
}

export const signout = () => {
  localStorage.removeItem('token');
  return { type: AUTH_USER, payload: '' }
};



// NOTE

export const addNote = (formProps, cb) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8000/notes/add', formProps);
    dispatch({ type: ADD_NOTE, payload: response.data.note });
    cb();
  } catch (e) {
    console.log(e)
    dispatch({ type: NOTES_ERROR, payload: 'Could Not Add Note.' });
  }
}

export const getAllNotes = () => async dispatch => {
  try {
    const response = await axios.get(`http://localhost:8000/notes`);
    dispatch({ type: GET_ALL_NOTES, payload: response.data.notes });
    // cb(users);
  } catch (e) {
    console.log(e)
    dispatch({ type: NOTES_ERROR, payload: 'Could Not Fetch Note.' })
  }
}

export const getUserNotes = id => async dispatch => {
  try {
    const response = await axios.get(`http://localhost:8000/notes/${id}`);
    dispatch({ type: GET_USER_NOTES, payload: response.data.notes });
    // cb(users);
  } catch (e) {
    console.log(e)
    dispatch({ type: NOTES_ERROR, payload: 'Could Not Fetch Note.' })
  }
}

export const deleteNote = id => async dispatch => {
  try {
    const response = await axios.post(`http://localhost:8000/notes/delete/${id}`);
    dispatch({ type: DELETE_NOTE, payload: id });
  } catch (e) {
    console.log(e)
    dispatch({ type: NOTES_ERROR, payload: 'Could Not Delete Note.' })
  }
}

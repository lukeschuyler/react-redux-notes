import { GET_USER_NOTES, GET_ALL_NOTES, DELETE_NOTE, ADD_NOTE, NOTES_ERROR } from '../actions/types';

const INITIAL_STATE = {
  notes: [],
  errorMessage: '',
  myNotes: true
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_NOTES: 
      return { ...state, notes: action.payload, myNotes: true }       
    case GET_ALL_NOTES: 
      return { ...state, notes: action.payload, myNotes: false }        
    case ADD_NOTE: 
      return { ...state, notes: [...state.notes, action.payload]  }       
    case DELETE_NOTE: 
      return { ...state, notes: state.notes.filter(n => n._id !== action.payload) }      
    case NOTES_ERROR: 
      return { ...state, errorMessage: 'There was an issue.' }    
    default:
      return state;
  }
}

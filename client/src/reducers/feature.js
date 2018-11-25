import { GET_USERS, DELETE_USER } from '../actions/types';

const INITIAL_STATE = {
  users: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS: 
      return { ...state, users: action.payload }       
    case DELETE_USER: 
      return { ...state, users: state.users.filter(u => u._id !== action.payload) }    
    default:
      return state;
  }
}

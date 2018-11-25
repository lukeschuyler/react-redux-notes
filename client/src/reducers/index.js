import { combineReducers } from 'redux';
import auth from './auth';
import feature from './feature';
import note from './notes';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth,
    feature,
    note,
    form: formReducer
});

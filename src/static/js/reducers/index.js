import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './postReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  postReducer,
  userReducer,
  form: formReducer
});

export default reducer;

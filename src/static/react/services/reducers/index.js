import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import postReducer from 'root/scenes/Post/reducer';
import userReducer from './userReducer';
import portalReducer from './portalReducer';

const reducer = combineReducers({
  postReducer,
  userReducer,
  portalReducer,
  form: formReducer
});

export default reducer;

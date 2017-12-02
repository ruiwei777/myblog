import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import postReducer from 'root/scenes/Post/reducer';
import userReducer from './userReducer';
import portalReducer from './portalReducer';

// don't forget to mount formReducer into the store
// if that app requires redux-form


export const postsReducer = combineReducers({
  postReducer,
  userReducer,
  portalReducer,
  form: formReducer
});

export const accountsReducer = combineReducers({
  userReducer,
  portalReducer,
  form: formReducer
});

// export other apps' reducers here...


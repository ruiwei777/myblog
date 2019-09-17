import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';

import postReducer, { PostState } from './postReducer';
import userReducer, { UserState } from './userReducer';
import portalReducer, { PortalState } from './portalReducer';

export interface RootState {
  postReducer: PostState;
  userReducer: UserState;
  portalReducer: PortalState;
  form: any;
}


const rootReducer: Reducer<RootState> = combineReducers({
  postReducer,
  userReducer,
  portalReducer,
  form: formReducer
});

export default rootReducer;

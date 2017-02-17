import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './postReducer';
// import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
  postReducer,
  form: formReducer
});

export default reducer;

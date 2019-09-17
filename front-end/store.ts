import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";

import rootReducer from "root/reducers";

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composedEnhancers = composeWithDevTools(
  middlewareEnhancer,
)

export default createStore(rootReducer, composedEnhancers);

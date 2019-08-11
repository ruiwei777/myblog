import { applyMiddleware, createStore } from "redux"

import thunk from "redux-thunk"

import { postsReducer } from "root/reducers"

const middleware = applyMiddleware(thunk)
export default createStore(postsReducer, undefined, middleware)

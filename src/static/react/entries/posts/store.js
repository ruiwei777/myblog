import { applyMiddleware, createStore } from "redux"

import thunk from "redux-thunk"

import reducer from "root/services/reducers"

const middleware = applyMiddleware(thunk)
export default createStore(reducer, undefined, middleware)

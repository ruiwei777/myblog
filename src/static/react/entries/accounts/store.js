import { applyMiddleware, createStore } from "redux"

// import logger from "redux-logger"
import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import reducer from "root/services/reducers"

// const middleware = applyMiddleware(promise(), thunk, logger())
const middleware = applyMiddleware(thunk)
export default createStore(reducer, undefined, middleware)

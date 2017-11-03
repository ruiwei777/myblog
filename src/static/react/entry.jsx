/**
 * Entry point of the whole React app.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "./App";
import store from "./store";

if (module.hot) {
  module.hot.accept();
}


let app = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , app
);


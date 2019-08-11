/**
 * Entry point of /accounts/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "./App";
import store from "./store";

if (module.hot) {
  module.hot.accept();
}


const app = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , app
);


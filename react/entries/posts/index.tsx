/**
 * Entry point of the whole React app.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "./App";
// @ts-ignore
import store from "./store";

declare var module: any;

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



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";
import store from "./stores";

if (module.hot) {
  module.hot.accept();
}


let app = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/posts">
      <Route path="/" component={App} />
    </BrowserRouter>
    
  </Provider>
, app);








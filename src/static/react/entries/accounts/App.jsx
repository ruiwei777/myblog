/**
 * 
 */
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Account from "root/scenes/Account";
import "root/styles/base.scss";


export default class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter basename="/accounts">
          <Route path="/" component={Account} />
        </BrowserRouter>
      </div>
    );
  }
}

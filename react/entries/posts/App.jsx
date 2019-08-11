/**
 * Routing and shared layout for all SPAs.
 */
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Post from "root/scenes/Post";
import "root/styles/base.scss";


export default class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter basename="/posts">
          <Route path="/" component={Post} />
        </BrowserRouter>
      </div>
    );
  }
}

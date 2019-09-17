import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Post from "root/scenes/Post";
import Login from "root/scenes/Login";
import "root/styles/base.scss";


const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/posts" component={Post} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

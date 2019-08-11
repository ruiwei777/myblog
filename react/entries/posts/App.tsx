import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Post from "root/scenes/Post";
import "root/styles/base.scss";


const App: React.FC<{}> = () => {
  return (
    <BrowserRouter basename="/posts">
      <Route path="/" component={Post} />
    </BrowserRouter>
  );
}

export default App;

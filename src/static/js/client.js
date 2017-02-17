
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from "./components/App";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import PostDetail from "./components/PostDetail";
import PostList from './components/PostList';
import store from "./stores";




let app = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <Router history={ hashHistory }>
      <Route path="/" component={App}>
        <IndexRoute component={PostList}/>
        <Route path="/create" component={CreatePost} />
        <Route path="/:postid" component={PostDetail} />

      </Route>
    </Router>
  </Provider>
  , app);








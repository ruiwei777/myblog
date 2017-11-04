import React from "react";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import { connect } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";

import { fetchPosts } from "./actions";

import "./styles/post_home.scss";

/**
 * Layout of the /posts/ page.
 */
class Post extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {
    const { username, token } = this.props.userState;
    // console.log(this.props.userState)
    return (
      <div className="grid-container">
        <div className="header">
          <div className="header-wrapper">
            <h1 className="brand-title">Ruiwei's blog</h1>
            <h2 className="brand-tagline">dancing with React & Django</h2>
            <nav className="nav">
              <ul className="nav-list">
                <li className="nav-item"><NavLink exact to="/" activeClassName="active">All Posts</NavLink></li>
                <li className="nav-item"><NavLink to="/create/" activeClassName="active">Create</NavLink></li>
                <li className="nav-item"><a target="_blank" rel="noopener noreferrer" href="//github.com/ruiwei777">GitHub</a></li>
                <li className="nav-item"><a href="/">Home</a></li>
              </ul>
            </nav>
          </div>
        </div> {/* .header */}

        <div className="credential-bar">
          {username && token ?
            <div>Welcome back, {username} <button className="btn btn-secondary">Logout</button></div>
            :
            <div><button className="btn btn-trans-white">Login</button></div>
          }
        </div>

        <div className="article">
          <Switch>
            <Route path="/create" render={({ match, location, history }) => <CreatePost history={history} />} />
            <Route path="/:postid" render={({ match, location, history }) => <PostDetail params={match.params} />} />
            <Route exact path="/" render={() => <PostList {...this.props} />} />
          </Switch>
        </div> {/* .article */}


        <div className="footer">
          <nav>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </nav>
        </div> {/* .footer */}


      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    posts: state.postReducer.posts,
    userState: state.userReducer
  };
}
export default connect(mapStateToProps)(Post);
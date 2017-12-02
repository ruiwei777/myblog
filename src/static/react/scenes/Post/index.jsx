import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";

import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import Navbar from "root/components/Navbar";
import Portal from "root/components/Portal";
import LoginForm from "root/components/LoginForm";

import { fetchPosts } from "./actions";
import { login, loginFromCookie, logout, reset, saveUserIntoCookie } from 'root/services/users/actions';
import { mountPortal, unmountPortal } from "root/services/portal/actions";

import "./styles/post_home.scss";

/**
 * Layout of the /posts/ page.
 */
class Post extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(loginFromCookie());
  }

  submit = values => {
    // console.log(values)
    const { username, password } = values;
    this.props.dispatch(login(username, password))
      .then((data) => {
        this.props.dispatch(unmountPortal());
        this.props.dispatch(saveUserIntoCookie(data));
      })
      .catch(err => {
        // TODO: what else should be done in response to error?
        // console.log(err.response.data)
      })
  }

  render() {
    const { username, token } = this.props.user;
    const { shouldPortalMount } = this.props.portal;

    return (
      <div className="grid-container">
        {shouldPortalMount &&
          <Portal title={'Login'}>
            <LoginForm onSubmit={this.submit} />
          </Portal>
        }

        <div className="header">
          <div className="header-wrapper">
            <h1 className="brand-title">Ruiwei&apos;s blog</h1>
            <h2 className="brand-tagline">Dancing with React & Django</h2>
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

        <Navbar className={"credential-bar"} />

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
      </div >
    )
  }
}

Post.propTypes = {
  dispatch: PropTypes.func,
  posts: PropTypes.array,
  user: PropTypes.shape({
    username: PropTypes.string,
    token: PropTypes.string
  }),
  portal: PropTypes.object
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    posts: state.postReducer.posts,
    user: state.userReducer,
    portal: state.portalReducer
  };
}
export default connect(mapStateToProps)(Post);


// about escaping HTML entites in eslint
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
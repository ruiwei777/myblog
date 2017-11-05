import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";

import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import Portal from "root/components/Portal";
import LoginForm from "root/components/LoginForm";

import { fetchPosts } from "./actions";
import { login, logout, reset } from 'root/services/users/actions';
import { mountPortal, unmountPortal } from "root/services/portal/actions";

import "./styles/post_home.scss";

/**
 * Layout of the /posts/ page.
 */
class Post extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPosts())
  }

  onLoginClick(e) {
    e.preventDefault();
    this.props.dispatch(reset());
    this.props.dispatch(mountPortal());
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.dispatch(logout());
  }

  submit = (values) => {
    // console.log(values)
    const { username, password } = values;
    this.props.dispatch(login(username, password))
    .then(() => {
      this.props.dispatch(unmountPortal());
    })
    .catch(err => {
      // TODO: what else should be done in response to error?
      // console.log(err.response.data)
    })
  }

  render() {
    const { username, token } = this.props.user;
    
    return (
      <div className="grid-container">
        {this.props.portal.shouldPortalMount &&
          <Portal title={'Login'}>
            <LoginForm onSubmit={this.submit} />
          </Portal>
        }

        <div className="header">
          <div className="header-wrapper">
            <h1 className="brand-title">Ruiwei's blog</h1>
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

        <div className="credential-bar">
          {username && token ?
            <div>Welcome back, {username}
              <button className="btn btn-secondary" onClick={::this.onLogoutClick}>Logout</button>
            </div>
            :
            <div>
            <button className="btn btn-trans-white" onClick={::this.onLoginClick}>Login</button>
        </div>
        }
        </div> {/* top user navbar */ }

    <div className="article">
      <Switch>
        <Route path="/create" render={({ match, location, history }) => <CreatePost history={history} />} />
        <Route path="/:postid" render={({ match, location, history }) => <PostDetail params={match.params} />} />
        <Route exact path="/" render={() => <PostList {...this.props} />} />
      </Switch>
    </div> {/* .article */ }


    <div className="footer">
      <nav>
        <ul>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </div> {/* .footer */ }

        

      </div >
    )
  }
}

Post.propTypes = {
  dispatch: PropTypes.func,
  posts: PropTypes.array,
  user: PropTypes.object,
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
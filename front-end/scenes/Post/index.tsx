// React & 3rd Party
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Switch, Route, RouteComponentProps } from "react-router-dom";

// App
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import Navbar from "root/components/Navbar";

// @ts-ignore
import { fetchPosts } from "root/actions/postActions";

import "./styles/post_home.scss";


interface PostProps {
  dispatch: Function;
  user: any;
  loading: boolean;
  posts: any[];
}

/**
 * Layout of the /posts/ page.
 */
class Post extends Component<PostProps & RouteComponentProps, {}> {

  componentWillMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { user, loading, posts, match } = this.props;
    const {} = match;

    return (
      <div className="grid-container">
        <div className="header">
          <div className="header-wrapper">
            <h1 className="brand-title">Ruiwei&apos;s blog</h1>
            <h2 className="brand-tagline">Dancing with React & Django</h2>
            <nav className="nav">
              <ul className="nav-list">
                <li className="nav-item"><NavLink exact to="/posts" activeClassName="active">All Posts</NavLink></li>
                <li className="nav-item"><NavLink to="/posts/create" activeClassName="active">Create</NavLink></li>
                <li className="nav-item"><a target="_blank" rel="noopener noreferrer" href="//github.com/ruiwei777">GitHub</a></li>
              </ul>
            </nav>
          </div>
        </div> {/* .header */}

        <Navbar className={"credential-bar"} />

        <div className="article fill-80-viewport">
          <Switch>
            <Route exact path={`${match.url}/`} render={() => <PostList userState={user} loading={loading} posts={posts} />} />
            <Route exact path={`${match.url}/create`} render={({ match, location, history }) => <CreatePost history={history} />} />
            <Route path={`${match.url}/:postid`} render={({ match, location, history }) => <PostDetail params={match.params} />} />
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


function mapStateToProps(state: any) {
  // console.log(state)
  return {
    loading: state.postReducer.fetching,
    posts: state.postReducer.posts,
    user: state.userReducer,
    portal: state.portalReducer
  };
}
export default connect(mapStateToProps)(Post);


// about escaping HTML entites in eslint
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
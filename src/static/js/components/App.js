import React from "react";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";
import { connect } from "react-redux";
import { BrowserRouter, Link, NavLink, Switch, Route } from "react-router-dom";

import { fetchPosts } from "../actions";


class App extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchPosts())
  }

  render(){
    // console.log(this.props)
    return (
      <div className="grid-container">
        <div className="header">
          <div className="header-wrapper">
            <h1 className="brand-title">Ruiwei's blog</h1>
            <h2 className="brand-tagline">A React-Redux SPA</h2>
            <nav className="nav">
              <ul>
                <li><NavLink exact to="/" activeClassName="active">All Posts</NavLink></li>
                <li><NavLink to="/create/" activeClassName="active">Create</NavLink></li>
                <li><a target="_blank" rel="noreferrer" href="//github.com/ruiwei777">GitHub</a></li>
                <li><a href="/">Home</a></li>
              </ul>
            </nav>
          </div>
        </div> {/* .header */}


        <div className="article">
        {/*{this.props.children && React.cloneElement(this.props.children,{
                    posts: this.props.posts,
                    userState: this.props.userState,
                    dispatch: this.props.dispatch
        })}*/}
        
          <Switch>
            <Route path="/create" render={()=><CreatePost /> } />
            <Route path="/:postid" render={(props)=><PostDetail params={props.match.params}/>} />
            <Route exact path="/" render={()=><PostList {...this.props}/>} />
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
export default connect(mapStateToProps)(App);
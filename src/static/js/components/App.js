import React from "react";
import PostList from "./PostList";
import { connect } from "react-redux";

import { fetchPosts } from "../actions"

class App extends React.Component {
  constructor(){
    super();
  }

  navigate(){
    this.props.router.push("/");

  }

  componentDidMount(){
    this.props.dispatch(fetchPosts())
  }

  render(){
    // console.log(this.props)
    

    return (
        <div>
          {this.props.children && React.cloneElement(this.props.children,{
                      posts: this.props.posts,
                      dispatch: this.props.dispatch
                    })}
        </div>
      )
  }
}

function mapStateToProps(state) {
  // console.log(state.postReducer)
    return {posts: state.postReducer.posts};
}
export default connect(mapStateToProps)(App);
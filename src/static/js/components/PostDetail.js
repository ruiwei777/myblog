import { Link } from "react-router";
import Markdown from "react-markdown";
import React from "react";
import { connect } from "react-redux";
import { fetchAPost } from "../actions"
import "../../css/vendor/side-menu.scss"



class PostDetail extends React.Component{
  constructor(){
    super();
  }

  componentWillMount(){
    this.props.dispatch(fetchAPost(this.props.params.postid))
  }


  render(){
    const {post} = this.props;
    if (!post){
      return <div id="main">Trying to fetch data...</div>
    }

    let { subtitle } = post
    

    return (
        <div id="main">
          <div className="header">
            <h1>{post.title}</h1>
            <h2>{subtitle}</h2>
          </div>
          {/*<h2 className="post-title">{post.title} <span className="post-publish">{post.publish}</span></h2>*/}
          
          <div className="content">
            <p>By {post.username}</p>
            <Markdown source={post.content}></Markdown>
          </div>
          
          <Link to="/" className="pure-button button-purple">back</Link>
        </div>
      )
  }

  makeRequest(url){
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          // console.log(request.responseText)
          let data = JSON.parse(request.responseText);
          this.setState({
            post:data
          })
          // console.log(data);
        } else {
          console.log('There was a problem with the request.');
        }
      }

    };
    request.open('GET', url);
    request.send();
  }
}

function mapStateToProps(state) {
  // console.log(state.postReducer)
    return {post: state.postReducer.currentPost};
}
export default connect(mapStateToProps)(PostDetail);
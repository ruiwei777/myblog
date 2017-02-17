import { Link } from "react-router";
import Markdown from "react-markdown";
import React from "react";



export default class PostDetail extends React.Component{
  constructor(){
    super();
    this.state = {
      post:null
    }
  }


  render(){
    
    const {posts} = this.props;
    let post = posts.filter((item)=>{
      return item.id === parseInt(this.props.params.postid)
    }).pop()

    let article = <h1>Trying to fetch data...</h1>


    if (post){
      article = <div>
        <h2 className="post-title">{post.title} <span className="post-publish">{post.publish}</span></h2>
        <p className="post-meta">By {post.username}</p>
        <div className="post-content">
          <Markdown source={post.content}></Markdown>
        </div>
        
        <Link to="/" className="pure-button button-purple">back</Link>
        {/*<div className="post-content">{post.content}</div>*/}
        {/*<h3>Comments</h3>*/}
      </div>
    }

    return (
        <div>
          <div className="positioner">
            
              {article}
            
          </div>
          
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
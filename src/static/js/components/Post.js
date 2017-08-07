import EllipsisText from "react-ellipsis-text";
import { Link } from "react-router";
import React from "react";
import Markdown from "react-markdown"

import "../../css/post.sass"


/**
  A single Post Component inside a PostList
*/
export default class Post extends React.Component{
  constructor(){
    super();
  }


  componentDidMount(){
    let images = document.getElementsByTagName("img");
        for(let i=0; i<images.length; i++){

          images[i].classList.add("img-responsive")
        }
    
    // console.log(this.props)

  }

  render(){
    // console.log(this.props.post)
    let {post} = this.props;

    return (
        <section className="post">
          <header className="post-header">
              <img width="48" height="48" alt="avatar" className="post-avatar" src="/static/images/Code-Monkey.png" />

              <h2 className="post-title">{post.title}</h2>

              <p className="post-meta">
                By <a className="post-author" href="#">{post.username} </a> at {post.publish} under <a className="post-category post-category-js" href="#">JavaScript</a>
                <a className="post-category post-category-design" href="#">CSS</a>
                 
              </p>
          </header>

          { post.image && <div className="post-cover">
            <img src={post.image} className="img-responsive reverse" />
            </div> }

          <div className="post-description word-break">
              
              <p>
                {post.content}
              </p>
              
              <Link to={"" + post.id} className="btn btn-view"> View</Link>
          </div>
        </section>



      );
  }
}
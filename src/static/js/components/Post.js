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
    let image = null;

    if(post.image){
      image = 
      
          <img
          src={post.image}
          className="pure-img-responsive"
          >
          </img>
      
    }

    return (
        <section className="post">
          <header className="post-header">
              {/*<img width="48" height="48" alt="Eric Ferraiuolo&#x27;s avatar" className="post-avatar" src="https://www.codemonkey.in/images/Code-Monkey.png" />*/}
              <img width="48" height="48" alt="avatar" className="post-avatar" src="/static/images/Code-Monkey.png" />

              <h2 className="post-title">{post.title}</h2>

              <p className="post-meta">
                By <a className="post-author" href="#">{post.username} </a> at {post.publish} under <a className="post-category post-category-js" href="#">JavaScript</a><a className="post-category post-category-pure" href="#">Pure</a>
                <a className="post-category post-category-design" href="#">CSS</a>
                 
              </p>
          </header>

          <div className="post-description">
              
              <p>
                {post.content}
              </p>
              
              {/*image*/}
              <Link to={"" + post.id} className="btn btn-view"> View</Link>
          </div>
        </section>



      );
  }
}
import { Link } from "react-router";
import Markdown from "react-markdown";
import React from "react";
import { connect } from "react-redux";
import { fetchAPost } from "../actions";

import "../../css/post_detail.sass";



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
      return <div className="post-detail">Trying to fetch data...</div>
    }

    let { title, subtitle, username, content, image } = post;
    

    return (
        <div className="post-detail">
          <div className="header">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
          </div>
          
          

          <div className="content word-break">
            <p>By {username}</p>

            <div className="cover">
              {image && <img src={image} />}
            </div>
            
            <Markdown escapeHtml={true} source={content} 
            containerProps={{id: "markdown-container"}}></Markdown>
            <Link to="/" className="btn btn-view">back</Link>
          </div>
          
          
        </div>
      )
  }

}

function mapStateToProps(state) {
  // console.log(state.postReducer)
    return {post: state.postReducer.currentPost};
}
export default connect(mapStateToProps)(PostDetail);
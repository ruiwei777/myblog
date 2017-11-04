import { NavLink } from "react-router-dom";
import Markdown from "react-markdown";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchAPost } from "../actions";
import Win8Spinner from "root/components/Win8Spinner";
import PostMeta from "./PostMeta";

import "../styles/post_detail.scss";

class PostDetail extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchAPost(this.props.params.postid))
  }

  render() {
    const { post } = this.props;

    // if not finish fetching, or the post is the previous one, display loading animation
    if (!post || String(post.id) !== this.props.params.postid) {
      return (
      <div className="fetching">
        <Win8Spinner ></Win8Spinner>
      </div>)
    }

    let { title, subtitle, content, image } = post;

    return (
      <div className="post-detail">
        <PostMeta date={post.publish} user={post.user} />

        {image && <img className="cover" src={image} />}

        <h1 className="heading">{title}</h1>
        <h2>{subtitle}</h2>

        <div className="content word-break">
          <Markdown escapeHtml={true} source={content}
            containerProps={{ id: "markdown-container" }}></Markdown>
          <NavLink to="/" className="back">back</NavLink>
        </div>
      </div>
    )
  }
}

PostDetail.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  params: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.userReducer,
    post: state.postReducer.currentPost
  };
}
export default connect(mapStateToProps)(PostDetail);
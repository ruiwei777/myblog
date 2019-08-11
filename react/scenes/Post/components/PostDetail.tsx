import { NavLink } from "react-router-dom";
import Markdown from "react-markdown";
import React from "react";
import { connect } from "react-redux";

// @ts-ignore
import { fetchAPost } from "root/actions/postActions";
import Win8Spinner from "root/components/Win8Spinner";
import PostMeta from "./PostMeta";

import "../styles/post_detail.scss";

interface PostDetailProps {
  dispatch: Function;
  params: any;
  post: any;
}

class PostDetail extends React.Component<PostDetailProps, {}> {

  componentWillMount() {
    this.props.dispatch(fetchAPost(this.props.params.postid))
  }

  render() {
    const { post } = this.props;

    // if not finish fetching, 
    // or the post is the previous one, display loading animation
    if (!post || String(post.id) !== this.props.params.postid) {
      return <Win8Spinner />
    }
    const { title, subtitle, content, image } = post;

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

function mapStateToProps(state: any) {
  // console.log(state)
  return {
    user: state.userReducer,
    post: state.postReducer.currentPost
  };
}
export default connect(mapStateToProps)(PostDetail);
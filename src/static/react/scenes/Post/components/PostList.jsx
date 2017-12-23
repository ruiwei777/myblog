import React from "react";
import PropTypes from "prop-types";

import Win8Spinner from "root/components/Win8Spinner";
import PostItem from "./PostItem";

export default class PostList extends React.Component {

  navigate() {
    this.props.router.push("/");
  }

  render() {
    let content = null;
    if (this.props.posts.length) {
      let { posts } = this.props;
      posts = posts.filter(({ publish }) => new Date(publish) < new Date());
      content = posts.map(function (post, i) {
        return <PostItem post={post} key={i} id={i} />;
      })
    } else {
      content = <Win8Spinner />;
    }
    content = <Win8Spinner />;
    
    return (
      <div className="posts">
        <h1 className="content-subhead">Recent Posts</h1>
        {content}
      </div>
    )
  }
}

PostList.propTypes = {
  dispatch: PropTypes.func,
  router: PropTypes.object,
  userState: PropTypes.object,
  posts: PropTypes.array
}
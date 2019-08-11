import React from "react";
import PropTypes from "prop-types";

import Win8Spinner from "root/components/Win8Spinner";
import PostItem from "./PostItem";

export default class PostList extends React.Component {

  render() {
    const { loading, posts } = this.props;

    return (
      <div className="posts">
        <h1 className="content-subhead">Recent Posts</h1>
        {!loading ? posts
          .filter(({ publish }) => new Date(publish) < new Date())
          .map((post, i) => <PostItem post={post} key={i} id={i} />)
          : <Win8Spinner />
        }
      </div>
    )
  }
}

PostList.propTypes = {
  dispatch: PropTypes.func,
  router: PropTypes.object,
  userState: PropTypes.object,
  loading: PropTypes.bool,
  posts: PropTypes.array
}
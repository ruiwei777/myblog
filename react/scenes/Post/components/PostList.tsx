import React from "react";
import PropTypes from "prop-types";

import Win8Spinner from "root/components/Win8Spinner";
import PostItem from "./PostItem";


interface PostListProps{
  userState: object;
  loading: boolean;
  posts: any[];
}

const PostList: React.FC<PostListProps> = (props) => {
  const { loading, posts } = props;

  return (
    <div className="posts">
      <h1 className="content-subhead">Recent Posts</h1>
      {!loading ? posts
        .filter(({ publish }) => new Date(publish) < new Date())
        .map((post, i) => <PostItem post={post} key={i} />)
        : <Win8Spinner />
      }
    </div>

  )
}

export default PostList;

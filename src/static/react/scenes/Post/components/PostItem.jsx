import { NavLink } from "react-router-dom";
import React from "react";
import removeMd from "remove-markdown"

import "../styles/post_item.scss"


/**
  A single Post Component inside a PostList
*/
export default class PostItem extends React.Component {
  constructor() {
    super();
  }

  processPostBody(body) {
    let processed = removeMd(body);
    const maxLength = 400;

    if (processed.length > maxLength) {
      processed = processed.slice(0, maxLength - 1);
      processed += "...";
    }
    return processed;
  }

  render() {
    let { post } = this.props;
    return (
      <section className="post">
        <header className="post-header">
          <img width="48" height="48" alt="avatar" className="post-avatar" src="/static/images/Code-Monkey.png" />

          <NavLink to={"/" + post.id} className="post-title">
            {post.title}
          </NavLink>

          <p className="post-meta">
            By <a className="post-author" href="#">{post.user.username} </a> at {post.publish} under <a className="post-category post-category-js" href="#">JavaScript</a>
            <a className="post-category post-category-design" href="#">CSS</a>
            <a className="post-category post-category-react" href="#">React</a>

          </p>
        </header>

        {post.image && <div className="post-cover">
          <img src={post.image} className="img-responsive reverse" />
        </div>}

        <div className="post-description word-break">
          <NavLink to={"/" + post.id} className="p">
            {this.processPostBody(post.content)}
          </NavLink>
        </div>
      </section>
    );
  }
}
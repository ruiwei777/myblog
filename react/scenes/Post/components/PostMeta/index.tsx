import React from 'react';

import './styles.scss';

interface PostMetaProps {
  user: any;
  date: string;
}


export default class PostMeta extends React.Component<PostMetaProps, {}> {

  render() {
    const { user, date } = this.props;
    return (
      <div className="meta-wrapper">
        <div className="meta-avatar">
          {user.avatar &&
            <img src={user.avatar} />
            ||
            <p className="avatar-textonly">{ user.username.charAt(0) }</p>
          }
        </div>

        <div className="meta-content">
          <div className="username">{ user.username }</div>
          <div className="introduction">
            { user.introduction ? user.introduction : "This author has not yet set his/her introduction." }
          </div>
          <div className="date">posted at { date }</div>
        </div>
      </div>
    )
  }
}

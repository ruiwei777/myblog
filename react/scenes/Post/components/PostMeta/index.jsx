import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export default class PostMeta extends React.Component {

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





PostMeta.propTypes = {
  user: PropTypes.object,
  date: PropTypes.string
};
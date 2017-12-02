import React from 'react';
import './style.scss';

export default class Navbar extends React.Component {
  render() {
    const { className, username, token, onLogoutClick, onLoginClick } = this.props;

    return (
      <div className={className ? className : 'credential-bar'}>
        {username && token ?
          <div>Welcome back, {username}
            <button className="btn btn-secondary" onClick={onLogoutClick}>Logout</button>
          </div>
          :
          <div>
            <button className="btn btn-trans-white btn-outline-light" onClick={onLoginClick}>Login</button>

          </div>
        }
      </div>
    )

  }
}
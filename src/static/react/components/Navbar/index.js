import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout, reset } from 'root/services/users/actions';
import { mountPortal, unmountPortal } from "root/services/portal/actions";
import './style.scss';

class Navbar extends React.Component {

  onLoginClick = (e) => {
    e.preventDefault();
    this.props.dispatch(reset());
    this.props.dispatch(mountPortal());
  }

  onLogoutClick = () => {
    this.props.dispatch(logout());
  }

  render() {
    const { className, user, token, onLoginClick } = this.props;

    return (
      <div className={className ? className : 'credential-bar'}>
        {user && token ?
          <div>Welcome back, <a href='/accounts/profile'>{user.username}</a>
            <button className="btn btn-info" onClick={this.onLogoutClick}>Logout</button>
          </div>
          :
          <div>
            <button className="btn btn-outline-light" onClick={this.onLoginClick}>Login</button>
          </div>
        }
      </div>
    )

  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.userReducer.user,
    token: state.userReducer.token
  }
}

export default connect(mapStateToProps)(Navbar)
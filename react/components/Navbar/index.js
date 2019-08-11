import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout, reset } from 'root/actions/userActions';
import { mountPortal, unmountPortal } from "root/actions/portalActions";
import './style.scss';

class Navbar extends React.Component {

  onLoginClick = (e) => {
    e.preventDefault();
    this.props.dispatch(reset());
    this.props.dispatch(mountPortal());
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const { className, user, token, onLoginClick } = this.props;

    return (
      <div className={className ? className : 'credential-bar'}>
        <a href="/" className="mr-auto logo"><img src="/static/images/react-logo.png" className="img-fluid-reverse" /></a>
        <a href="/">Home</a>
        <a href="/posts">Blog</a>
        {user && token ?
          <div><a href='/accounts/profile' className="username">{user.username}</a>
            <a href='/' className="logout fa fa-sign-out" onClick={this.onLogoutClick}>&nbsp;Logout</a>
          </div>
          :
          <div>
            <a href="/" className="login fa fa-sign-in" onClick={this.onLoginClick}>&nbsp;Login</a>
            <span className="register">
              <a href="/accounts/register">register</a>
            </span>
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
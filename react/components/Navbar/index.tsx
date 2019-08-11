import React from 'react';
import { connect } from 'react-redux';

// @ts-ignore
import { logout, reset } from 'root/actions/userActions';
// @ts-ignore
import { mountPortal, unmountPortal } from "root/actions/portalActions";
import './style.scss';

interface NavbarProps {
  dispatch: Function;
  className: string;
  user: any;
  token: string;
  onLoginClick: any;
}

class Navbar extends React.Component<NavbarProps, {}> {

  onLoginClick = (e: any) => {
    e.preventDefault();
    this.props.dispatch(reset());
    this.props.dispatch(mountPortal());
  }

  onLogoutClick = (e: any) => {
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

function mapStateToProps(state: any) {
  // console.log(state)
  return {
    user: state.userReducer.user,
    token: state.userReducer.token
  }
}

export default connect(mapStateToProps)(Navbar)
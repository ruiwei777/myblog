import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './profile.scss';


class Profile extends React.Component {
  render() {
    const { user } = this.props;

    if (!user) {
      console.log("Profile", this.props);
      return (
        <Redirect to={{
          pathname: '/register',
          state: { from: this.props.location }
        }} />
      )
    }

    const { first_name, last_name, username, email, is_staff, last_login, date_joined, is_active } = user;
    console.log(user)
    return (
      <div className="container">
        <div className="row fill-80-viewport align-items-center">
          <div className="col-sm-8 offset-sm-2">
            <div className='block-info'>

              <div className="profile-group">
                <div className="profile-title">Username</div>
                <div className="profile-content">{username}</div>
              </div>

              <div className="profile-group">
                <div className="profile-title">Email</div>
                <div className="profile-content">{email}</div>
              </div>

              <div className="profile-group">
                <div className="profile-title">First Name</div>
                <div className="profile-content">{first_name}</div>
              </div>

              <div className="profile-group">
                <div className="profile-title">Last Name</div>
                <div className="profile-content">{last_name}</div>
              </div>

              <div className="profile-group">
                <div className="profile-title">Activated</div>
                <div className="profile-content">{String(is_active)}</div>
              </div>

              <div className="profile-group">
                <div className="profile-title">Is Admin</div>
                <div className="profile-content">{String(is_staff)}</div>
              </div>

              <div className="profile-group">
                <div className="profile-title">Last Login</div>
                <div className="profile-content">{last_login}</div>
              </div>

              <div className="profile-group">
                <div className="profile-title">Date Joined</div>
                <div className="profile-content">{date_joined}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token
  }
}

export default connect(mapStateToProps)(Profile);
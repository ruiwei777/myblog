import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


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
    return (
      <div>
        First Name: {first_name}
        Last Name: {last_name}
        Username: {username}
        Email: {email}
        Is Active: {is_active}
        Is Staff: {is_staff}
        Last Login: {last_login}
        Date Joined: {date_joined}
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
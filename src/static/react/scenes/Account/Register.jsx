import React from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';

import { register, saveUserIntoCookie } from 'root/services/users/actions';

class Register extends React.Component {
  submit = values => {
    // console.log(values);
    this.props.dispatch(register(values))
      .then((data) => {
        // console.log(data)
        this.props.dispatch(saveUserIntoCookie(data))
      })
      .catch(response => {
        console.log(response)
      })
  }

  render() {
    // if already logged in, redirect to /accounts/profile
    const { user } = this.props;

    if (user) {
      return (
        <Redirect to={{ pathname: '/profile' }} />
      )
    }

    return (
      <div className='container'>
        <div className='row justify-content-center align-items-center fill-80-viewport'>
          <div className='col-sm-6 mx-auto'>
            <h2 className='text-center'>Register</h2>
            <RegisterForm onSubmit={this.submit} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(Register)
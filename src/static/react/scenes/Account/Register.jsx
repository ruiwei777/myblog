import React from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';

import { register } from 'root/actions/userActions';

class Register extends React.Component {
  submit = values => {
    // console.log(values);
    this.props.dispatch(register(values))
      .then((data) => {
        // console.log(data)
      })
      .catch(response => {
        // TODO: should render error message here
        console.log(response)
      })
  }

  render() {
    // console.log("Register", this.props)
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
          <div className='col-sm-8 mx-auto'>
            <div className="block-info">
              <h2 className='text-center mb-3'>Register</h2>
              <RegisterForm onSubmit={this.submit} />
            </div>
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
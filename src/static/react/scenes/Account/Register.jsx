import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';

import { register } from 'root/services/users/actions';

class Register extends React.Component {
  submit = values => {
    // console.log(values);
    this.props.dispatch(register(values))
      .then((data) => {
        // console.log(data)
      })
      .catch(response => {
        console.log(response)
      })
  }

  render() {
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

  }
}

export default connect(mapStateToProps)(Register)
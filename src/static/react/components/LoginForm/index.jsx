import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";

import './styles.scss';


class LoginForm extends React.Component{

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { error, fetching } = this.props.user;

    return(
      <form className="login-form" onSubmit={handleSubmit}>
        { error && <p className="error">Username or password not match, please try again.</p> }
        { fetching && <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i> }
        <label>username</label>
        <Field name="username"
               component="input"
               type="text"
               placeholder="user name" />

        <label>password</label>
        <Field name="password"
               component="input"
               type="password"
               placeholder="password" />

        <div>
          <button className="btn btn-view" type="submit" disabled={pristine || submitting}>
            Login
          </button>

          <button className="btn" type="button" disabled={pristine || submitting} onClick={reset}>
            Reset 
          </button>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.userReducer,
  }
}

LoginForm =  connect(mapStateToProps)(LoginForm);

export default reduxForm({
  form: 'login' // a unique identifier for this form
})(LoginForm)
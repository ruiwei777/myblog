import React from 'react';
import { Field, reduxForm } from 'redux-form';


class LoginForm extends React.Component{

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return(
      <form className="login-form" onSubmit={handleSubmit}>
        <Field name="username"
               component="input"
               type="text"
               placeholder="user name" />

        <Field name="password"
               component="input"
               type="password"
               placeholder="password" />

        <div>
          <button className="btn btn-submit" type="submit" disabled={pristine || submitting}>
                    Submit
          </button>

          <button className="btn btn-clear" type="button" disabled={pristine || submitting} onClick={reset}>
            Clear 
          </button>
        </div>
      </form>
    )
  }
}


export default reduxForm({
  form: 'login' // a unique identifier for this form
})(LoginForm)
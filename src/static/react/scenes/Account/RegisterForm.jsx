import React from 'react';
import { Field, reduxForm } from 'redux-form';



const renderField = (props) => (
  <div className="col-sm-9">
    <input type="text" className='form-control' {...props.input}/>
    {props.touched && props.error && !props.disabled && <span className="error">{props.error}</span>}
  </div>
)

class RegisterForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group row'>
          <label htmlFor="email" className='col-sm-3 col-form-label'>Email</label>
          <Field name="email" component={renderField} type="email" />
        </div>
        <div className='form-group row'>
          <label htmlFor="username" className='col-sm-3 col-form-label'>Username</label>
          <Field name="username" component={renderField} type="text" />
        </div>
        <div className='form-group row'>
          <label htmlFor="password" className='col-sm-3 col-form-label'>Password</label>
          <Field name="password" component={renderField} type="password" />
        </div>
        <div className='form-group row'>
          <label htmlFor="firstName" className='col-sm-3 col-form-label'>First Name</label>
          <Field name="first_name" component={renderField} type="text" />
        </div>
        <div className='form-group row'>
          <label htmlFor="lastName" className='col-sm-3 col-form-label'>Last Name</label>
          <Field name="last_name" component={renderField} type="text" />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    )
  }
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);

export default RegisterForm;
import React, { Component } from 'react';
import Snippet from "./Snippet";
import { Field, FieldArray, Fields, reduxForm } from 'redux-form';

class SnippetForm extends Component {

  const renderMembers(fields){
    
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        
        <Field name="lastName" component="input" type="text"/>
        <FieldArray name="blocks" component={Snippet} />
        
      </form>
    );
  }
}

// Decorate the form component
PostForm = reduxForm({
  form: 'snippetForm', // a unique name for this form,
  
  
})(SnippetForm);

export default SnippetForm;
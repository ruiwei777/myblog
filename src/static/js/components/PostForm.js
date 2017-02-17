import React, { Component } from 'react';
import Snippet from "./Snippet";
import { Field, FieldArray, Fields, reduxForm } from 'redux-form';

import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";

const updateCode  = (newCode) => {
  console.log("Update Code " , newCode)
}



class PostForm extends Component {
  

  static renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} type={type} placeholder={label}/>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
      )
  }



  renderBlocks({ fields, meta: { touched, error } }){

    return (
        <div>
          <button className="pure-button pure-button-primary" onClick={()=>{fields.push({text:"", language:"javascript"})}}>Add Block</button>
          <button className="button-success pure-button " type="submit">Submit</button>
          

          {fields.map((block, i) =>
              <section key={i} className="post">
                <header className="post-header">
                  <div className="post-meta">
                    <p className="post-author">Write your code here... </p>
                  </div>
                </header>


                <Fields
                  names={[`${block}.text`, `${block}.language`]}
                  component={Snippet}
                  id={i}
                  remove={()=>{fields.remove(i)}}
                 />
              </section>
              
          )}
        </div>
      )
  }

  

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        
        <FieldArray name="blocks" component={this.renderBlocks} />
        
      </form>
    );
  }
}

// Decorate the form component
PostForm = reduxForm({
  form: 'post', // a unique name for this form,
  
  
})(PostForm);

export default PostForm;
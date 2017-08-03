import DropZone from "react-dropzone";
import React, { Component } from 'react';
import Snippet from "./Snippet";
import { Field, FieldArray, Fields, reduxForm } from 'redux-form';


import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";

import "../../css/post_form.sass";


class PostForm extends Component {
  constructor(props){
    super(props);
  }

  /**
    the returned function is the one being processed by react-dropzone
  */
  onDrop(input){
    return (files, rejectedFile) => {
      input.onChange(files[0]);
    }
  }

  renderDropZone(field){
    // field == { input: { value:any, onChange: func(newVal) } }
    return (
      <div className="dropzone-wrapper">
        <DropZone className="drop-zone" onDrop={::this.onDrop(field.input)} multiple={false} >
          <div className="drop-text">Drop the cover here, or click to to upload.
          </div>
        </DropZone>
        <div className="preview-wrapper">
          <h3 className="preview-header">Image Preview</h3>
          <img className="preview-img" src={field.input.value.preview} />
        </div>
        
        <div className="drop-message">
          {field.touched && field.error && <span className="error">{field.error}</span>}
          {field.touched}
        </div>
        
      </div>
    )
  }

  



  renderBlocks({ fields, meta: { touched, error } }){

    return (
        <div>
          {/*<button className="pure-button pure-button-primary" onClick={()=>{fields.push({text:"", language:"javascript"})}}>Add Block</button>*/}
          {fields.map((block, i) =>
              <section key={i} className="code-section">


                <Fields
                  names={[`${block}.text`, `${block}.language`]}
                  component={Snippet}
                  id={i}
                  remove={()=>{fields.remove(i)}}
                 />
              </section>
              
          )}

          <button className="btn btn-success" type="submit">Submit</button>
        </div>
      )
  }

  

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="" onSubmit={handleSubmit}>
          <label>Title</label>
          <Field name="title" placeholder="title" component="input" />
        
          <label>Publish Date</label>
          <Field name="publish" placeholder="eg. 29/01/2018" component="input" />
        
          <label>Cover</label>
          <Field name="image" component={::this.renderDropZone} />

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
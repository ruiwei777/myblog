import DropZone from "react-dropzone";
import React, { Component } from 'react';
import Snippet from "./Snippet";
import { Field, FieldArray, Fields, reduxForm } from 'redux-form';


import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";

import "../../css/post_form.sass";


class PostForm extends Component {
  constructor(){
    super()
    this.previewImage = {
      preview : null
    }
  }

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

  onDrop(input){
    return (files, rejectedFile) => {
      this.previewImage = files[0]
      input.onChange(files[0])

    }
  }

  renderDropZone(props){
    // console.log(this.props)
    return (
      <div className="dropzone-wrapper">
        <DropZone className="drop-zone" onDrop={::this.onDrop(props.input)} multiple={false} >
          <div className="drop-text">Drop the cover here, or click to to upload.
          </div>
        </DropZone>
        <div className="preview-wrapper">
          <h3 className="preview-header">Image Preview</h3>
          <img className="preview-img" src={this.previewImage.preview} />
        </div>
        
        <div className="drop-message">
          {props.touched && props.error && <span className="error">{props.error}</span>}
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
                {/*<header className="post-header">
                  <div className="post-meta">
                    <p className="post-author">Write your code here... </p>
                  </div>
                </header>*/}


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
          <Field name="publish" placeholder="yyyy-mm-dd" component="input" />
        
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
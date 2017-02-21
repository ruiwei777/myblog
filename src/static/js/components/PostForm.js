import DropZone from "react-dropzone";
import React, { Component } from 'react';
import Snippet from "./Snippet";
import { Field, FieldArray, Fields, reduxForm } from 'redux-form';


import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";


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
    console.log(this.props)
    return (
      <div>
        <DropZone className="pure-u-1-3" onDrop={::this.onDrop(props.input)} multiple={false} >
          <div className="drop-text">Drop the cover here, or click to to upload.</div>
        </DropZone>
        <img className="pure-u-1-3 pure-img-responsive" src={this.previewImage.preview} />
        <div className="pure-u-1-3">
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
              <section key={i} className="post">
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

          <button className="button-success pure-button " type="submit">Submit</button>
        </div>
      )
  }

  

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="pure-form pure-form-stacked pure-g" onSubmit={handleSubmit}>
        <div className="pure-u-1">
          <label>Title</label>
          <Field name="title" className="pure-u-2-3" placeholder="title" component="input" />
        </div>
        
        <div className="pure-u-1">
          <label>Publish Date</label>
          <Field name="publish" className="pure-u-2-3" placeholder="yyyy-mm-dd" component="input" />
        </div>
        
        <div className="pure-u-1">
          <label>Cover</label>
          <Field className="pure-u-1" name="image" component={::this.renderDropZone} />
        </div>

        <div className="pure-u-1">
          <FieldArray name="blocks" component={this.renderBlocks} />
        </div>
        
        
      </form>
    );
  }
}

// Decorate the form component
PostForm = reduxForm({
  form: 'post', // a unique name for this form,
  
  
})(PostForm);

export default PostForm;
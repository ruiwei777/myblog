//@ts-ignore
import DropZone from "react-dropzone";
import React, { Component } from 'react';
import Snippet from "./Snippet";
import { Field, FieldArray, Fields, reduxForm, InjectedFormProps } from 'redux-form';
//@ts-ignore
import { dateTillNow, hasText, hasTextInBlock } from "root/services/validation/form.validate";

// Stateless methods to render redux-form
const renderField = ({ input, label, placeholder, type, meta: { touched, error, warning } }: any) => {
  return (<div className="field">
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>)
}


const renderBlocks = (props: any) => {
  const { fields, meta: { touched, error, submitFailed } } = props;
  // console.log(props);
  return (
    <div className="code-blocks">
      <label>Content*</label>
      {fields.map((name: any, i: any, fields: any) =>
        <section key={i} className="code-section">


          <Fields
            names={[`${name}.text`, `${name}.language`]}
            component={Snippet}
            id={i}
            remove={() => { fields.remove(i) }} />
        </section>
      )}

      {error && <span className="error">{error}</span>}

      {<button id="addBlock" className="btn btn-orange disabled" onClick={() => { fields.push({ text: "", language: "javascript" }) }} title="Currently only support one block" >Add Block</button>}


    </div>
  )
}


/**
 * This function is passed to "renderDropZone".
 * The returned function is processed by react-dropzone.
 * @param {} input - The input component from redux-form. Use input.onChange(newVal) to change its value.
 *
 * @return An anonymous function passed to "renderDropZone".
*/
const onDrop = (input: any) => {
  return (files: any, rejectedFile: any) => {
    input.onChange(files[0]);
  }
}


const renderDropZone = (field: any) => {
  // field == { input: { value:any, onChange: func(newVal) } }
  const clearImage = (event: any) => {
    event.preventDefault();;
    input.onChange(null);
  }

  const { label, input, error, touched } = field;
  return (
    <div>
      <div className="drop-header">
        <label>{label}</label>
        <button className="btn btn-grey" onClick={clearImage}>&#9746;</button>
      </div>


      <div className="dropzone-wrapper">
        <DropZone className="drop-zone" onDrop={onDrop(input)} multiple={false} >
          <div className="drop-text">Drop the cover here, or click to to upload.
            </div>
        </DropZone>
        <div className="preview-wrapper">
          <h3 className="preview-header">Preview</h3>
          <img className="preview-img" src={input.value.preview} />
        </div>

        <div className="drop-message">
          {touched && field.error && <span className="error">{error}</span>}
          {touched}
        </div>
      </div>
    </div>

  )
}

interface PostFormProps {
  handleSubmit: any;
  pristine: boolean;
  reset: any;
  submitting: any;
}


 class PostForm extends Component<any> {

  componentDidMount() {
    // a dirty way to make the  "AddBtn" and "SubmitBtn" same line.
    const btnSubmit = document.getElementById("postSubmit");
    const btnAdd = document.getElementById("addBlock");
    const btnGroup = document.getElementsByClassName("btn-group")[0];

    btnGroup.insertBefore(btnAdd, btnSubmit);
  }

  render() {
    // console.log(this.props);
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className="" onSubmit={handleSubmit}>
        <Field name="title" placeholder="title" component={renderField}
          validate={[hasText]} label="Title*" type="text"
        />

        <Field name="publish" placeholder="dd/mm/yyyy" component={renderField}
          label="Publish Date*" type="date" validate={[dateTillNow]} />

        <Field name="image" component={renderDropZone} label="Cover" />

        <FieldArray name="blocks" component={renderBlocks}
          validate={[hasTextInBlock]} />

        <div className="btn-group">
          <button id="postSubmit" className="btn btn-success" type="submit" disabled={submitting}>Submit</button>
        </div>

      </form>
    );
  }
}

// Decorate the form component
const WrappedPostForm = reduxForm({
  form: 'post', // a unique name for this form,
})(PostForm);

export default WrappedPostForm;
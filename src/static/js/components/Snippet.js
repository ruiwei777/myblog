import { Field } from "redux-form";
import React from "react";
import CodeMirror from "react-codemirror";
// import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";



export default class Snippet extends React.Component{

  handleChange(newText){
    const { id } = this.props
    let { text } = this.props.blocks[id]
    text.input.onChange(newText)
    // console.log(this.refs.codemirror.codeMirror.options.mode)
    // console.log(this.refs.codemirror.codeMirror)
    // console.log(newText, text.input.value)
    // console.log(this.refs.codemirror.getCodeMirror())
  }

  selectChange(event, newValue, previousValue){
    const { id } = this.props
    let { language } = this.props.blocks[id] 
    language.input.onChange(newValue)
  }

  removeBlock(){
    this.props.remove()
  }

  render(){
    let i = this.props.id
    let { text, language } = this.props.blocks[i]
    
    return(
        <div>

        <label>Content</label>
        <Field 
          name={language.input.name} 
          component="select" 
          onChange={::this.selectChange}
          className="pure-button"
          >
          <option value="markdown">markdown</option>
          <option value="javascript">javascript</option>
        </Field>
        {/*<button className="pure-button remove-code button-warning" onClick={::this.removeBlock}>Remove</button>*/}
        
          <CodeMirror 
            options={{ mode:language.input.value, theme:"erlang-dark"}}
            value={text.input.value}
            onChange={::this.handleChange}
            ref="codemirror"
            ></CodeMirror>
        </div>
       
      )
   
  }
}
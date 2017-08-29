import { Field } from "redux-form";
import React from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";




export default class Snippet extends React.Component{

  handleChange(newText){
    const { id } = this.props
    let { text } = this.props.blocks[id]
    text.input.onChange(newText)
    // console.log(this.props);
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
    let i = this.props.id;
    let { text, language } = this.props.blocks[i];
    // console.log(this.props)
    const { touched, error, warning } = text.meta;
    
    return(
        <div className="code-snippet">

          {/*Error message*/}
          {touched &&
            ((error && <span className="error">{error}</span>) ||
              (warning && <span className="warning">{warning}</span>))}

          {/*dropdown menu to select content type*/}
          <div className="code-grid">   
            <div className="code-meta">
              <Field 
                name={language.input.name} 
                component="select" 
                onChange={::this.selectChange}
                className="btn btn-grey code-type">
                <option value="markdown">markdown</option>
                <option value="javascript">javascript</option>
              </Field>

              {i>0 &&<button className="btn btn-danger" onClick={::this.removeBlock}>Remove</button>}
            </div>
            
            
            <CodeMirror
              className="code-content" 
              options={{ 
                lineWrapping: true,
                mode:language.input.value, 
                theme:"mdn-like", 
                lineNumbers: true}}
              value={text.input.value}
              onChange={::this.handleChange}
              ref="codemirror">
            </CodeMirror>
          </div>
          
        </div>
       
      )
   
  }
}
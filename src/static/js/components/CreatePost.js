import { Link } from "react-router";
import React from "react";
import Markdown from "react-markdown"
import PostForm from "./PostForm";
import "../../css/base.scss";

export default class CreatePost extends React.Component{
  constructor(){
    super();
  }


  handleSubmit(formData){
    // console.log(formData)
    console.log("CreatePost", formData)
  }


  render(){
    return (
        <PostForm 
          onSubmit={::this.handleSubmit}
          initialValues={{
            blocks:[{
              text:"",
              language:"javascript"
            }]
          }
            
          }
           />
          
          
          
      )
  }
}

/*function mapStateToProps(state){
  return {
    profile: state.profile.toJS()
  }
}

export default connect(mapStateToProps)(CreatePost)*/
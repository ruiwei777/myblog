import { addPost } from "../actions";
import { Link } from "react-router";
import React from "react";
import Markdown from "react-markdown"
import PostForm from "./PostForm";
import { connect } from "react-redux";
import "../../css/base.scss";

class CreatePost extends React.Component{
  constructor(props){
    super(props);
  }


  handleSubmit(formData){
    let { username } = this.props;
    let confirm = false;
    if (username) this.props.dispatch(addPost(formData));
    else {
      confirm = window.confirm("Your IP address will be logged for reference if you create a post as a non-staff user. Are you sure to proceed?");
      if (confirm) this.props.dispatch(addPost(formData));
    }
  }


  render(){
    return (
        <PostForm 
          onSubmit={::this.handleSubmit}
          initialValues={{
            blocks:[{
              text:"",
              language:"markdown"
            }]
          }}
           />
          
          
          
      )
  }
}

function mapStateToProps(state){
  // console.log(state)
  return {
    username: state.userReducer.username
  }
}

export default connect(mapStateToProps)(CreatePost)
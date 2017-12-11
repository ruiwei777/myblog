import React from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import LoginForm from "root/components/LoginForm";
import { login } from "root/services/users/actions";

import "../styles/create_post.scss";

import { addPost } from "../actions";
import Win8Spinner from "root/components/Win8Spinner";

class CreatePost extends React.Component {

  handleSubmit = (formData) => {
    // console.log(formData);
    const { token } = this.props.user;
    this.props.dispatch(addPost(formData, token))
      .then(data => {
        // data is a post instance
        // console.log(data.id);
        this.props.history.push("/" + data.id);
      }).catch(error => {
        console.log(error)
      });
  }

  onLoginClick = (e) => {
    e.preventDefault();
    this.props.dispatch(mountPortal);
  }

  login = (data) => {
    const { username, password } = data;
    this.props.dispatch(login(username, password))
    .then(() => {

    })
    .catch(err => {
      console.log(this.props.user);
    })
    ;
  }


  render() {
    // console.log(this.props);
    const { adding, added, rejected } = this.props;
    const { user, token } = this.props.user;
    if (!user || !token) {

    }

    return (
      <div className="mt-5">
        {adding && <Win8Spinner title={"Creating the post..."} />}

        {!adding && rejected && <div className="message error">Error: failed to create the post.</div>}



        {(!user || !token) &&
          <div className="prompt-container">
            <div className="mt-10">
              <p className="text-center">You must login first before creating a post</p>
              <div className="form-wrapper">
                <LoginForm onSubmit={this.login} />
              </div>
            </div>
          </div>}

        <PostForm
          onSubmit={this.handleSubmit}
          initialValues={{
            blocks: [{
              text: "",
              language: "markdown"
            }]
          }} />

      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.userReducer,
    adding: state.postReducer.adding,
    added: state.postReducer.added,
    rejected: state.postReducer.rejected
  }
}

export default connect(mapStateToProps)(CreatePost)
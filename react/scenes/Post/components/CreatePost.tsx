import React from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import LoginForm from "root/components/LoginForm";
// @ts-ignore
import { login } from "root/actions/userActions";

import "../styles/create_post.scss";

// @ts-ignore
import { addPost } from "root/actions/postActions";
import Win8Spinner from "root/components/Win8Spinner";

interface CreatePostProps{
  user: any;
  dispatch: Function;
  history: any;
  adding: boolean;
  added: boolean;
  rejected: boolean;
}

class CreatePost extends React.Component<CreatePostProps, {}> {

  handleSubmit = (formData: any) => {
    // console.log(formData);
    const { token } = this.props.user;
    this.props.dispatch(addPost(formData, token))
      .then((data: any) => {
        this.props.history.push("/" + data.id);
      }).catch((error: any) => {
        console.log(error)
      });
  }

  login = (data: any) => {
    const { username, password } = data;
    this.props.dispatch(login(username, password))
    .then(() => {

    })
    .catch((err: any) => {
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
          <div className="prompt-container fade-in">
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

function mapStateToProps(state: any) {
  // console.log(state)
  return {
    user: state.userReducer,
    adding: state.postReducer.adding,
    added: state.postReducer.added,
    rejected: state.postReducer.rejected
  }
}

export default connect(mapStateToProps)(CreatePost)
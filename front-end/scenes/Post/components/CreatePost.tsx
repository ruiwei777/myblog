import React from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";

import "../styles/create_post.scss";

// @ts-ignore
import { addPost } from "root/actions/postActions";
import Win8Spinner from "root/components/Win8Spinner";

interface CreatePostProps {
  user: any;
  dispatch: Function;
  history: any;
  adding: boolean;
  added: boolean;
  rejected: boolean;
}

class CreatePost extends React.Component<CreatePostProps, {}> {

  handleSubmit = (formData: any) => {
    const { token } = this.props.user;
    this.props.dispatch(addPost(formData, token))
      .then((data: any) => {
        this.props.history.push("/" + data.id);
      }).catch((error: any) => {
        console.log(error)
      });
  }


  render() {
    const { adding, added, rejected } = this.props;
    const { user, token } = this.props.user;
    if (!user || !token) {

    }

    return (
      <div className="mt-5">
        {adding && <Win8Spinner title={"Creating the post..."} />}

        {!adding && rejected && <div className="message error">Error: failed to create the post.</div>}



        {(!user || !token) ?
          <div className="prompt-container fade-in">
            <div className="mt-10">
              <p className="text-center">You must login first before creating a post</p>
              <div className="form-wrapper">
                <h1>You must login</h1>
              </div>
            </div>
          </div> :
          <PostForm
            onSubmit={this.handleSubmit}
            initialValues={{
              blocks: [{
                text: "",
                language: "markdown"
              }]
            }} />
        }



      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.userReducer,
    adding: state.postReducer.adding,
    added: state.postReducer.added,
    rejected: state.postReducer.rejected
  }
}

export default connect(mapStateToProps)(CreatePost)
import React from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";

import "../styles/create_post.scss";

import { addPost } from "../actions";
import Win8Spinner from "root/components/Win8Spinner";

class CreatePost extends React.Component {

  handleSubmit(formData) {
    // console.log(formData);

    let { username, token } = this.props;
    let loggedIn = username && token;

    // if not loggined in , prompt to confirm
    let confirmed = false;
    if (!loggedIn) {
      let message = "Your IP address will be logged if creating as a non-staff user. Are you sure to proceed?";
      confirmed = window.confirm(message);
    }

    let requestPromise = null;
    if (loggedIn) requestPromise = this.props.dispatch(addPost(formData, token));
    else if (!loggedIn && confirmed) requestPromise = this.props.dispatch(addPost(formData));

    if (requestPromise !== null) {
      requestPromise
        .then(data => {
          // data is a post instance
          // console.log(data.id);
          this.props.history.push("/" + data.id);
        }).catch(error => {
          console.log(error)
        });
    }

  }


  render() {
    // console.log(this.props);
    let { adding, added, rejected } = this.props;

    return (
      <div>
        {adding && <Win8Spinner title={"Creating the post..."} />}

        {!adding && rejected && <div className="message error">Error: failed to create the post.</div>}

        <PostForm
          onSubmit={::this.handleSubmit}
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
    username: state.userReducer.username,
    token: state.userReducer.token,
    adding: state.postReducer.adding,
    added: state.postReducer.added,
    rejected: state.postReducer.rejected
  }
}

export default connect(mapStateToProps)(CreatePost)
import React from "react";
import Post from "./Post";
import axios from "axios";
import { fetchUser } from "../actions";

import LoginForm from "./redux_forms/LoginForm";


// Homepage for www.domainname.com/posts
export default class PostList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLoginView: false
    }
  }

  navigate(){
    this.props.router.push("/");
  }

  

  componentDidMount(){
    console.log(this.props)
  }

  render(){
    let content = null;
    
    if(this.props.posts.length){
      let {posts} = this.props;
      // console.log(posts)
      content = posts.map(function(post, i){
        return <Post post={post} key={i} id={i} />;
      })
    } else {
      content = <div>Trying to fetch data...</div>;
    }

    return (
        <div>
          <div className={"login-view " + (this.state.showLoginView ? "active" : "")}>
            <div className="login-window">

              <div className="button-wrapper">
                <button className="btn form-close" onClick={::this.closeLoginView}>&#10005;</button>
              </div>
              <h3 className="form-header">Login</h3>
              
              <LoginForm className="login-form" onSubmit={::this.loginSubmit} />
            </div>
            
          </div>


          <div className="login-wrapper">
            <button className="btn btn-login" onClick={::this.loginView}>Login</button>
          </div>

          <div className="posts">
          <h1 className="content-subhead">Recent Posts</h1>
          {content}
        </div>

        </div>
        
      )
  }

  // might be useless
  /*makeRequest(url){
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          let data = JSON.parse(request.responseText);
          this.setState({
            data:data.results
          })
        } else {
          console.log('There was a problem with the request.');
        }
      }

    };
    request.open('GET', url);
    request.send();
  }*/

  loginView(e){
    this.setState({
          showLoginView: true
    });

  }

  loginSubmit(data){
    // console.log(data);
    const { username, password } = data;
    this.props.dispatch(fetchUser(username, password));
    this.setState({
      showLoginView: false
    });
  }

  closeLoginView(e){
    this.setState({
      showLoginView: false
    });
  }

  
}
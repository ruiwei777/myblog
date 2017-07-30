import React from "react";
import Post from "./Post";
import axios from "axios";
import { fetchUser, logout, confirmLoginError } from "../actions";

import LoginForm from "./redux_forms/LoginForm";


// Homepage for www.domainname.com/posts
export default class PostList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLoginView: false,
    }
  }

  navigate(){
    this.props.router.push("/");
  }

  

  componentDidMount(){
    console.log(this.props)
    // this.props.userState == {uesername, token, fetching, fetchded, error}
  }


  getCredentialBlock(){
    let credentialBlock = null;

    const { username, token } = this.props.userState;
    let loginBtn = <button className="btn btn-login" onClick={::this.loginView}>Login</button>;
    let logoutBtn = <button onClick={::this.onLogoutClick} className="btn btn-logout">Logout</button>;

    let btnShowed = username && token ? logoutBtn : loginBtn;

    let welcomeText = username && token ? " back, " + username : ", Anonymous User";

    credentialBlock = <div className="credential-wrapper">
      
     
      <p className="usertext">Welcome{welcomeText}</p>
       {btnShowed}
    </div>
        

    return (credentialBlock);
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

    const { fetching, fetched, error } = this.props.userState;



    return (
        <div>
          <div className={"login-view " + (this.state.showLoginView ? "active" : "")}>
            <div className="login-window">
              <div className="button-wrapper">
                <button className="btn form-close" onClick={::this.closeLoginView}>&#10005;</button>
              </div>
              <div className="form-wrapper">
                <h3 className="form-header">Login</h3>
                <div className={"login-error "+(this.props.userState.error ? "active" : "")}>Username or password not match, please try again.</div>
                <LoginForm className="login-form" onSubmit={::this.loginSubmit} />
              </div>
              
            </div>
            
          </div>


          {this.getCredentialBlock()}
            

          <div className="posts">
          <h1 className="content-subhead">Recent Posts</h1>
          {content}
        </div>

        </div>
        
      )
  }


  loginView(e){
    this.setState({
      showLoginView: true
    });
  }


  loginSubmit(data){
    // console.log(data);
    this.props.dispatch(confirmLoginError());
    const { username, password } = data;

    this.props.dispatch(fetchUser(username, password))
    .then(val => {
      this.setState({
        showLoginView: false
      })
    }).catch(err => {
      console.log(err)
    })
    ;

  }


  setLoginWindowState(){

  }

  onLogoutClick(e){
    this.props.dispatch(logout());
  }

  closeLoginView(e){

    this.props.dispatch(confirmLoginError());
    this.setState({
      showLoginView: false
    })
  }



  
}
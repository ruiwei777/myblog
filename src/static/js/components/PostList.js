import React from "react";
import Post from "./Post";
import axios from "axios";
import cookie from "react-cookies";
import { fetchUser, loginFromCookies, logout, confirmLoginError } from "../actions";
import { baseURL } from "../constants";
import Win8Spinner from "./ui_components/win8-spinner";

import LoginForm from "./redux_forms/LoginForm";

import "../../css/post_home.css";


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

  componentWillMount(){
    // try to get username and token from cookies, and refresh its period
    const username = cookie.load("username");
    const token = cookie.load("token");
    if(username && token){
      this.props.dispatch(loginFromCookies(username, token));
      const oneWeek = 60*60*24*7;
      cookie.save("username", username, {maxAge: oneWeek});
      cookie.save("token", token, {maxAge: oneWeek});
    }
  }
  

  componentDidMount(){
  }


  getCredentialBlock(){
    let credentialBlock = null;

    const { username, token } = this.props.userState;
    let loginBtn = <button className="btn btn-view" onClick={::this.loginView}>Login</button>;
    let logoutBtn = <a onClick={::this.onLogoutClick} className="btn" href="/logout/">Logout</a>;

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
      posts = posts.filter(({publish}) => new Date(publish) < new Date() );
      content = posts.map(function(post, i){
        return <Post post={post} key={i} id={i} />;
      })
    } else {
      content = <div className="fetching">
        <Win8Spinner />
      </div>;
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

          {/* {this.getCredentialBlock()} */}

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
      });
      cookie.save("username", this.props.userState.username);
      cookie.save("token", this.props.userState.token);

    }).catch(err => {
      console.log(err)
    })
    ;

  }


  onLogoutClick(e){
    e.preventDefault();
    this.props.dispatch(logout());
    cookie.remove("username");
    cookie.remove("token");
  }

  closeLoginView(e){

    this.props.dispatch(confirmLoginError());
    this.setState({
      showLoginView: false
    })
  }



  
}
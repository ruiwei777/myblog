import React from "react";
import Post from "./Post";
import axios from "axios";

export default class PostList extends React.Component {
  constructor(){
    super();
  }

  navigate(){
    this.props.router.push("/");
  }

  

  componentDidMount(){    
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
        <div className="posts">
          <h2 className="content-head debug-info">// Contents are dummy and only for test purpose.</h2>
          <h1 className="content-subhead">Recent Posts</h1>
          {content}
        </div>
      )
  }

  makeRequest(url){
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
  }

  
}
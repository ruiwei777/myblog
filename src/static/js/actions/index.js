import axios from "axios";
import { baseURL } from "../constants";
import { reset } from "redux-form";
import request from "superagent";


export function fetchAPost(id) {
  id = "" + id
  return function(dispatch) {
    axios.get(baseURL + "api/posts/" + id + "/")
      .then((response) => {
        dispatch({type: "FETCH_A_POST_FULFILLED", payload: response.data})
        // console.log(response)
      })
      .catch((err) => {
        dispatch({type: "FETCH_A_POST_REJECTED", payload: err})
      })
  }
}

export function fetchPosts() {
  return function(dispatch) {
    axios.get(baseURL + "api/posts")
      .then((response) => {
        dispatch({type: "FETCH_POSTS_FULFILLED", payload: response.data})
        // console.log(response)
      })
      .catch((err) => {
        dispatch({type: "FETCH_POSTS_REJECTED", payload: err})
      })
  }
}


export function fetchUser(username, password){
  return function(dispatch){
    dispatch({
      type:'FETCH_USER', 
    });
    
    return new Promise((resolve, reject) => {
      request.post(baseURL + "api-token-auth/")
      .send({username, password})
      .end((err, res) => {
        if(err || res.statusCode !== 200) {
          handleSAError(err, res);
          reject(
            dispatch({
              type: 'FETCH_USER_REJECTED',
            })
          )
        } else if(res.statusCode === 200){
          // console.log(res.body.token);
          resolve(
            dispatch({
            type:'FETCH_USER_FULFILLED', 
            payload: {
              username,
              token: res.body.token,
            }
            })
          )
          
        }
      })
    })





    
  }



}

export function logout(){
  return function(dispatch){
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export function confirmLoginError(){
  return function(dispatch){
    dispatch({
      type: 'CONFIRM_ERROR'
    })
  }
}



// publish, title, content are required
// image is optional
export function addPost(formData) {
  let {blocks, image, publish, title} = formData

  // for now only using one block
  let content = blocks[0].text
  
  let data = {
        title,
        content,
        publish,
        image
      }


  let fd = new FormData()
  if(title) fd.append("title", data.title)
  if(content) fd.append("content", data.content)
  if(publish) fd.append("publish", data.publish)
  if(image) fd.append("image", data.image)

  
  // console.log("[action/index.js] form data: ")
  for (var item of fd){
    console.log(item)
  }

  return function(dispatch) {
    request.post(baseURL + "api/posts/")
    .send(fd)
    .end((err, res) => {
      if(err){
        handleSAError(err, res)
      } else {
        console.log("Posing a post done!", res)
        dispatch({type:"ADD_POSTS_FULFILLED", payload:res.statusCode})
        dispatch(reset('post'))
        dispatch(fetchPosts())

      }
      
      
    })

  }

  
}



function handleSAError(err, res){
    console.log(err)
    if(res.type === "application/json"){
      console.log(JSON.parse(res.text))
    } else {
      console.log(res)
    }
}
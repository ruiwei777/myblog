import axios from "axios";
import { baseURL } from "../constants";
import { reset } from "redux-form";


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

export function fetchPosts(page=1) {
  return function(dispatch) {
    let url = baseURL + "api/posts/";
     url += "?page=" + page;
    axios.get(url)
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
      axios({
        method: "post",
        url: baseURL + "api-token-auth/",
        data: { username, password }
      })
      .then(response => {
        resolve(
          dispatch({
            type:'FETCH_USER_FULFILLED', 
            payload: {
              username,
              token: response.data.token,
            }
          })
        )
      }).catch(error => {
        console.log(error)
        reject(
          dispatch({
            type: 'FETCH_USER_REJECTED',
          })
        )
      })
    })
  }  // return
}

export function loginFromCookies(username, token){
  return function(dispatch){
    dispatch({
      type: 'LOGIN_FROM_COOKIES',
      payload: {
        username, 
        token
      }
    });
  };
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
export function addPost(formData, token) {
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

  return dispatch => {
    dispatch({type:"ADD_POST"});

    let config = {
      method: "post",
      url: baseURL + "api/posts/",
      data: fd
    }

    if(token) config.headers = {Authorization: "Token " + token};

    return new Promise((resolve, reject) => {
      axios(config).then(response => {
        response = Object.assign({}, response);
        //console.log(response);
        if(response.status === 201){
          // console.log(response.data);
          dispatch({type:"ADD_POST_FULFILLED"});
          dispatch(reset('post'));
          dispatch(fetchPosts());
          resolve(response.data);
        }
      }).catch(error => {
        error = Object.assign({}, error);

        //console.log(error);
        dispatch({type:"ADD_POST_REJECTED"});
        reject(error.response)
      })
    }); // Promise

    
  };
}



function handleSAError(err, res){
    console.log(err)
    if(res.type === "application/json"){
      console.log(JSON.parse(res.text))
    } else {
      console.log(res)
    }
}
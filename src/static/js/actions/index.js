import axios from "axios";
import { baseURL } from "../constants";
import { reset } from "redux-form";
import request from "superagent";

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

export function addPost(formData) {
  let {blocks, image, publish, title} = formData
  let content = blocks[0].text
  let data = {
        title,
        content,
        publish,
        image
      }
  console.log(data)

  

  // console.log(config)

  let fd = new FormData()
  fd.append("title", data.title)
  fd.append("content", data.content)
  fd.append("publish", data.publish)
  fd.append("image", data.image)

  return function(dispatch) {
    request.post(baseURL + "api/posts/")
    .send(fd)
    .end((err, res) => {
      if(err){
        console.log("Post data failed:", err)
      } else {
        console.log("Posing a post done!", res)
        dispatch({type:"ADD_POSTS_FULFILLED", payload:res.statusCode})
        dispatch(reset('post'))
        dispatch(fetchPosts())

      }
      
      
    })


    /*axios.post(baseURL+"api/posts/", data)
      .then((response) => {
        console.log(response)
        dispatch({type: "ADD_POSTS_FULFILLED", payload: response.status})
        fetchPost()
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
        dispatch({type: "ADD_POSTS_REJECTED", payload: err})
      })*/
  }
}
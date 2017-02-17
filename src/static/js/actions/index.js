import axios from "axios";
import { baseURL } from "../constants";

export function fetchPost() {
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

export function addPost(text) {
  return {
    type: 'ADD_POST',
    payload: {
      text,
    },
  }
}
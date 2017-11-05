import axios from "axios";
import { API_ROOT } from "root/services/constants";


export function login(username, password) {
  return function (dispatch) {
    dispatch({
      type: 'LOGIN_PENDING',
    });

    return axios({
      method: "post",
      url: API_ROOT + "api-token-auth/",
      data: { username, password }
    })
      .then(response => {
        dispatch({
          type: 'LOGIN_FULFILLED',
          payload: {
            username,
            token: response.data.token,
          }
        })


      }).catch(error => {
        dispatch({
          type: 'LOGIN_REJECTED',
          payload: { error }
        })

        // when testing loading animation, uncomment it, then enter wrong credentials
        // dispatch({
        //   type: 'LOGIN_PENDING',
        // });

        return Promise.reject(error)
      })

  }
}


export function loginFromCookies(username, token) {
  return function (dispatch) {
    dispatch({
      type: 'LOGIN_FROM_COOKIES',
      payload: {
        username,
        token
      }
    });
  };
}


export function logout() {
  return function (dispatch) {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export function reset() {
  return dispatch => {
    dispatch({
      type: 'LOGIN_RESET'
    })
  }
}

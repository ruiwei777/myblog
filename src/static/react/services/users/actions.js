import axios from "axios";
import { API_ROOT } from "root/services/constants";
import { reset as resetForm } from 'redux-form';


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

/**
 * 
 * @param {{username: string, password: string, email: string, first_name: string, last_name: string}} user - 
 */
export function register(userData) {
  return dispatch => {
    dispatch({
      type: 'REGISTER_PENDING'
    });

    const url = API_ROOT + 'api/users/';
    return axios.post(url, userData)
    .then(response => {
      dispatch({
        type: 'REGISTER_FULFILLED',
        payload: response.data
      });
      dispatch(resetForm('register'));
      return response.data
    })
    .catch(error => {
      dispatch({
        type: 'REGISTER_REJECTED',
        payload: error.response.data
      });
      return Promise.reject(error.response.data);
    });
  }
}

export function reset() {
  return dispatch => {
    dispatch({
      type: 'LOGIN_RESET'
    })
  }
}

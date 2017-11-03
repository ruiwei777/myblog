
export default function userReducer(state={
    username: null,
    token: null,
    fetching: false,
    fetched: false,
    error: false
  }, action) {

    switch (action.type) {
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          ...action.payload,
          fetching: false,
          fetched: true
        }
      }

      case "FETCH_USER": {
        return {...state, fetching: true}
      }

      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: true}
      }

      case "LOGOUT_USER": {
        return {...state, username: null, token: null, fetched: false}
      }

      case "LOGIN_FROM_COOKIES": {
        return {...state, username: action.payload.username, token: action.payload.token};
      }

      case "CONFIRM_ERROR": {
        return {...state, error: false}
      }
    }

    return state;
}

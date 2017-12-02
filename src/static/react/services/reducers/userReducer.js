
export default function userReducer(state = {
  user: null,
  username: null,
  token: null,
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch (action.type) {
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        ...action.payload,
        fetching: false,
        fetched: true,
        error: null
      }
    }

    case "LOGIN_PENDING": {
      return { ...state, fetching: true, fetched: false, error: null }
    }

    case "LOGIN_REJECTED": {
      return { ...state, ...action.payload, fetching: false, fetched: false }
    }

    case "LOGIN_RESET": {
      return { ...state, fetching: false, fetched: false, error: null }
    }

    case "LOGOUT": {
      return { ...state, username: null, token: null, fetched: false, error: null }
    }

    case "LOGIN_FROM_COOKIES": {
      return { ...state, ...action.payload };
    }

  }

  return state;
}

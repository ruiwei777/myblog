
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

    case "REGISTER_PENDING": {
      return { ...state, ...action.payload, fetching: true, fetched: false, error: null };
    }

    case "REGISTER_FULFILLED": {
      return { ...state, ...action.payload, fetching: false, fetched: true, error: null };
    }

    // error is something like 
    // { first_name: ["this field is required"], username: ["A user with that username already exists."] }
    case "REGISTER_REJECTED": {
      return { ...state, ...action.payload, fetching: false, fetched: false };
    }

    case "REGISTER_RESET": {
      return { ...state, fetching: false, fetched: false, error: null };
    }

  }

  return state;
}

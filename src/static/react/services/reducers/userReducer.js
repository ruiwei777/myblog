import cookie from 'react-cookies';

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
      // automatically save user into cookies
      const oneDay = 60 * 60 * 24;
      const config = { maxAge: oneDay, path: '/' }
      cookie.save('user', action.payload.user, config);
      cookie.save('token', action.payload.token, config);

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
      const config = { path: '/' };
      cookie.remove('user', config);
      cookie.remove('token', config);
      return { ...state, user: null, token: null, fetched: false, error: null }
    }

    case "LOGIN_FROM_COOKIE": {
      const user = cookie.load('user');
      const token = cookie.load('token');

      return user && token ? { ...state, user, token } : { ...state };
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

    case "SAVE_USER_TO_COOKIE": {
      const oneDay = 60 * 60 * 24;
      const config = { maxAge: oneDay, path: '/' }
      cookie.save('user', action.payload.user, config);
      cookie.save('token', action.payload.token, config);

      return { ...state }
    }
  }

  return state;
}

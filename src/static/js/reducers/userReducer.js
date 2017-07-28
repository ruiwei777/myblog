
export default function userReducer(state={
    user: null,
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
    }

    return state;
}
